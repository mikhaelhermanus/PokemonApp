import React from 'react';
import { View, Button } from 'react-native';
import analytics from '@react-native-firebase/analytics';

const TrackButton = () => {
  return (
    <View>
      <Button
        title="Add Tracking Events"
        onPress={ () =>
           analytics().logEvent('TrackEvents', {
            item: 'It Worked',
          })
        }
      />
    </View>
  );
}
export default TrackButton