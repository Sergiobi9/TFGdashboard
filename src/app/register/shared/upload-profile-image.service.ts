import * as AWS from 'aws-sdk/global';
import * as S3 from 'aws-sdk/clients/s3';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

Injectable({
    providedIn: 'root'
})
export class AwsProfileImageService {
  s3Bucket = "artists-tfg";
  s3Region = "us-east-2";
  s3IdentityPool = "us-east-2:973c9e9f-c633-448d-8e99-91b3d61ad7d2";

  uploadConcertImagesToS3(file, id, page) {
    const AWSService = AWS;

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
        Key: id + "." + fileType,
        Bucket: this.s3Bucket,
        Body: file,
        ContentType: file.type,
        ContentEncoding: "base64",
        ACL: "private",
      },
      function (err, data) {
        this.fileuploading = false;
        if (err) {
          console.log(err, "there was an error uploading your file");
        } else {
          console.log(data, "data");
          page.uploadSuccess();
        }
      }
    );
  }
}
