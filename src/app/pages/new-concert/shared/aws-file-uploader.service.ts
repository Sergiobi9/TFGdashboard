import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';

export class AwsFileUploaderService {

  s3Bucket = "concerts-images-tfg";
  s3Region = "us-east-2";
  s3IdentityPool = "us-east-2:973c9e9f-c633-448d-8e99-91b3d61ad7d2";

  uploadConcertPlaceImagesToS3(file, id, position, isLastItem, page) {
    const AWSService = AWS;

    console.log("file", file);
    AWSService.config.update({
      region: this.s3Region,
      credentials: new AWSService.CognitoIdentityCredentials({
        IdentityPoolId: this.s3IdentityPool,
      }),
    });

    const s3 = new S3({
      apiVersion: "2012-10-17",
      params: { Bucket: this.s3Bucket },
    });

    //var fileType = file.type.split("/")[1];
    var fileType = "png";
    file = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), "base64");

    s3.upload(
      {
        Key: id + "_" + (position + 1) + "." + fileType,
        Bucket: this.s3Bucket,
        Body: file,
        ContentType: file.type,
        ContentEncoding: "base64",
        ACL: "private",
      },
      function (err, data) {
        this.fileuploading = false;
        if (err) {
          this.showErrorMessage("Vaya algo ha ido mal subiendo las imagenes del sitio del concierto, prueba de nuevo más tarde")
        } else {
          console.log(data, "data");
          if (isLastItem){
            page.successRegister();
          }
        }
      }
    );
  }

  uploadConcertImageToS3(file, id, page) {
    const AWSService = AWS;

    console.log("file", file);
    AWSService.config.update({
      region: this.s3Region,
      credentials: new AWSService.CognitoIdentityCredentials({
        IdentityPoolId: this.s3IdentityPool,
      }),
    });

    const s3 = new S3({
      apiVersion: "2012-10-17",
      params: { Bucket: this.s3Bucket },
    });

    //var fileType = file.type.split("/")[1];
    var fileType = "png";
    file = Buffer.from(file.replace(/^data:image\/\w+;base64,/, ""), "base64");

    s3.upload(
      {
        Key: id + "_cover." + fileType,
        Bucket: this.s3Bucket,
        Body: file,
        ContentType: file.type,
        ContentEncoding: "base64",
        ACL: "private",
      },
      function (err, data) {
        this.fileuploading = false;
        if (err) {
          this.showErrorMessage("Vaya algo ha ido mal subiendo la imagen cover de tu concierto, prueba de nuevo más tarde")
        } else {
          page.uploadConcertPlaceImages(id)
        }
      }
    );
  }}
