# sf-2-sftp[^1]
Provides a node.js server that connects to an sftp site and can drop a file in a specified path.

## Remote Site Settings
### (Setup > Security > Remote Site Settings)
  In salesforce you will need to add a remote site setting, the Remote Site URL should be the url of the node server.
  
  (ex. https://node-server.herokuapp.com/ or https://8e44-97-101-87-109.ngrok.io) 
  ![image](https://user-images.githubusercontent.com/36901822/160464406-97c83ce9-8be6-416f-a287-4752272c3445.png)

## Apex
In apex class `SendDataAttributesSFTP.cls`, on line 5 query the data you want to send. Dont forget to change your variable name on line 12 in case you dont have any data to send.

![image](https://user-images.githubusercontent.com/36901822/160465519-c9dab91b-822b-457d-b008-b9edba1997e8.png)


## Environment Keys: 
```
  FTP_USER,
  FTP_PASSWORD,
  FTP_HOST,
  FTP_DIR,
  SECRET,
  ENC_KEY,
  IV,
  ALLOWED
```

If you need to support more than one `ALLOWED` url, create another environemnt variable called `ALLOWED_02` and so on.

ENC_KEY, IV should be 128 bits (I used https://www.allkeysgenerator.com/Random/Security-Encryption-Key-Generator.aspx)

SECRET - can be any key of any length

[^1]: Written with tokyo 🐱‍👤🐾
