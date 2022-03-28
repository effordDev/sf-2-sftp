global class ScheduleSendDataAttributesSFTP implements Schedulable {
    
    global void execute(SchedulableContext sc) {
        system.debug('go go go... node node node');
        SendDataAttributesSFTP.go();
    }
}