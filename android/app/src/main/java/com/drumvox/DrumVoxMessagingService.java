package com.drumvox;
import android.util.Log;
import com.google.firebase.messaging.RemoteMessage;
import java.util.Map;
import io.intercom.android.sdk.push.IntercomPushClient;

public class DrumVoxMessagingService extends com.google.firebase.messaging.FirebaseMessagingService {
    private final IntercomPushClient intercomPushClient = new IntercomPushClient();

    @Override public void onNewToken(String refreshedToken) {
        super.onNewToken(refreshedToken);
        
        intercomPushClient.sendTokenToIntercom(getApplication(), refreshedToken);

        Log.i("drumvox", "DrumVoxMessagingService.onNewToken="+refreshedToken);
        //DO HOST LOGIC HERE
    }

    @Override public void onMessageReceived(RemoteMessage remoteMessage) {
        super.onMessageReceived(remoteMessage);

        Map message = remoteMessage.getData();
        Log.i("drumvox", "DrumVoxMessagingService.onMessageReceived="+message.toString());
        if (intercomPushClient.isIntercomPush(message)) {
            intercomPushClient.handlePush(getApplication(), message);
        }
    }
}
