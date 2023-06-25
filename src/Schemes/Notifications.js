import notifee from '@notifee/react-native';

export const initializeNotifications = async () => {
    await notifee.requestPermission()
}

export const displayNotification = async (title, body) => {
    const channelId = await notifee.createChannel({
        id: 'default',
        name: 'Default Channel',
    });
    await notifee.displayNotification({
        title: title,
        body: body,
        android: {
            channelId,
            pressAction: {
                id: 'default',
            },
        },
    });
}
