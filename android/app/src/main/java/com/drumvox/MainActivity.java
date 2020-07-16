package com.drumvox;

import android.os.Bundle;
import android.util.Log;

import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.google.firebase.iid.FirebaseInstanceId;
import com.google.firebase.messaging.FirebaseMessaging;

import java.util.ArrayList;

import io.intercom.android.sdk.push.IntercomPushClient;
import com.getcapacitor.community.intercom.IntercomPlugin;

public class MainActivity extends BridgeActivity {

  private final IntercomPushClient intercomPushClient = new IntercomPushClient();

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    FirebaseMessaging.getInstance().setAutoInitEnabled(true);

    this.sendFCMTokenToIntercom();

    // Initializes the Bridge
    this.init(savedInstanceState, new ArrayList<Class<? extends Plugin>>() {{
      // Additional plugins you've installed go here
      // Ex: add(TotallyAwesomePlugin.class);
      add(GoogleAuth.class);
      add(IntercomPlugin.class);
    }});
  }

  private void sendFCMTokenToIntercom(){
    FirebaseInstanceId.getInstance().getInstanceId()
            .addOnCompleteListener(task -> {
              if (!task.isSuccessful()) {
                Log.w("drumvox", "getInstanceId failed", task.getException());
                return;
              }

              // Get new Instance ID token
              String token = task.getResult().getToken();
              Log.i("drumvox", "FCM TOKEN = " + token);
              intercomPushClient.sendTokenToIntercom(getApplication(), token);
            });
  }
}
