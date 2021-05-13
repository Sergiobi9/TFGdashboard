import {Component, OnDestroy, OnInit} from "@angular/core";
import {
    NbMediaBreakpointsService,
    NbMenuService,
    NbSidebarService,
    NbThemeService,
} from "@nebular/theme";

import {UserData} from "../../../@core/data/users";
import {LayoutService} from "../../../@core/utils";
import {map, takeUntil} from "rxjs/operators";
import {Subject} from "rxjs";
import {
    faVial,
    faBuilding,
    faHeartbeat,
    faUserTie,
    faUsers,
    faQuestion,
    faHome,
    faClipboardList,
    faMicrophoneAlt,
    faFire
} from "@fortawesome/free-solid-svg-icons";
import {Router} from "@angular/router";
import { StorageService } from "../../../services/storage.service";

@Component({
    selector: "ngx-header",
    styleUrls: ["./header.component.scss"],
    templateUrl: "./header.component.html",
    providers:[StorageService]
})
export class HeaderComponent implements OnInit, OnDestroy {
    private destroy$: Subject<void> = new Subject<void>();
    userPictureOnly: boolean = false;
    user: any;

    faVial = faVial;
    faUsers = faUsers;
    faBuilding = faBuilding;
    faHeartbeat = faHeartbeat;
    faUserTie = faUserTie;
    faQuestion = faQuestion;
    faHome = faHome;
    faClipboardList = faClipboardList;
    faMicrophoneAlt = faMicrophoneAlt;
    faFire = faFire;

    themes = [
        {
            value: "default",
            name: "Light",
        },
        {
            value: "dark",
            name: "Dark",
        },
        {
            value: "cosmic",
            name: "Cosmic",
        },
        {
            value: "corporate",
            name: "Corporate",
        },
    ];

    currentTheme = "default";

    userMenu = [{title: "Profile"}, {title: "Log out"}];

    constructor(
        private sidebarService: NbSidebarService,
        private menuService: NbMenuService,
        private themeService: NbThemeService,
        private userService: UserData,
        private layoutService: LayoutService,
        private breakpointService: NbMediaBreakpointsService,
        private router: Router,
        private menu: NbMenuService,
        private storage: StorageService
    ) {
      menu.onItemClick().subscribe((data) => {
        if (data.item.title == "Log out"){
          this.storage.logout();
        }
      });
    
    }

    ngOnInit() {
        this.currentTheme = this.themeService.currentTheme;

        this.userService
            .getUsers()
            .pipe(takeUntil(this.destroy$))
            .subscribe((users: any) => (this.user = users.nick));

        const {xl} = this.breakpointService.getBreakpointsMap();
        this.themeService
            .onMediaQueryChange()
            .pipe(
                map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
                takeUntil(this.destroy$)
            )
            .subscribe(
                (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
            );

        this.themeService
            .onThemeChange()
            .pipe(
                map(({name}) => name),
                takeUntil(this.destroy$)
            )
            .subscribe((themeName) => (this.currentTheme = themeName));
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    changeTheme(themeName: string) {
        this.themeService.changeTheme(themeName);
    }

    toggleSidebar(): boolean {
        this.sidebarService.toggle(true, "menu-sidebar");
        this.layoutService.changeLayoutSize();

        return false;
    }

    navigateHome() {
        this.menuService.navigateHome();
        return false;
    }

    navigatePage(page: string) {
        switch (page) {
            case "HOME":
                this.router.navigate(["/pages/home"]);
                break;
            case "CONCERTS":
                this.router.navigate(["/pages/concerts"]);
                break;
            case "LEGAL":
                this.router.navigate(["/pages/legal"]);
                break;
        }
    }
}
