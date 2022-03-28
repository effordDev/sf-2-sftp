public class SendDataAttributesSFTP {
    
    @future(callout=true)
    public static void go() {
        List<Contact> contacts = [
            SELECT Id,
                FirstName,
                LastName
            FROM Contact
        ];

        String data = !contacts.isEmpty() ? JSON.serialize(cases) : '{"Action": "No Records Found"}';

        system.debug('data');
        system.debug(data);

        Datetime dt = System.now();
        String formatedDt = dt.formatGMT('yyyy-MM-dd\'T\'HH:mm:ss\'Z\'');
        system.debug(formatedDt);

        JSONGenerator gen = JSON.createGenerator(true);
        gen.writeStartObject();
            gen.writeStringField('code', 'YOUR_SECRET');
            gen.writeStringField('timestamp', formatedDt);
        gen.writeEndObject();
        
        String headerText = gen.getAsString();

        Blob key = Blob.valueOf('YOUR_KEY');
        Blob iv = Blob.valueOf('YOUR_IV');

        Blob encryptedHeaderText = Crypto.encrypt('AES128', key, iv, Blob.valueOf(headerText));
        String encodedHeaderCipherText = EncodingUtil.base64Encode(encryptedHeaderText);
        system.debug(encodedHeaderCipherText);

        Blob encryptedDataText = Crypto.encrypt('AES128', key, iv, Blob.valueOf(data));
        String encodedDataCipherText = EncodingUtil.base64Encode(encryptedDataText);
       
        JSONGenerator dataGen = JSON.createGenerator(true);
        dataGen.writeStartObject();
            dataGen.writeStringField('data', encodedDataCipherText);
        dataGen.writeEndObject();
        String dataJsonText = dataGen.getAsString();

        HttpRequest req = new HttpRequest();
            req.setMethod('POST');
            req.setHeader('Content-Type', 'application/json;charset=UTF-8');
        	req.setHeader('origin', 'https://' + URL.getSalesforceBaseUrl().getHost());
            req.setHeader('sffromapex', encodedHeaderCipherText);
            
            req.setEndpoint('YOUR_ENDPOINT');

            req.setBody(dataJsonText);

            system.debug('dataJsonText');
            system.debug(dataJsonText);

        Http http = new Http();
        
        try {

            HTTPResponse res = Test.isRunningTest() ? new HTTPResponse() : http.send(req);
            if (test.isRunningTest()) {res.setBody('{"status": "success"}');}

            system.debug('response');
            system.debug(res);

        } catch (Exception e) {
            system.debug('error');
            system.debug(e);
        }
    }
}