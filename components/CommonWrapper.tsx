// components/CommonWrapper.tsx
import React, { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type CommonWrapperProps = {
    children: ReactNode;
    backgroundColor?: string;
    padding?: number;
};

const CommonWrapper = ({
    children,
    backgroundColor = '#fff',
    padding = 16,
}: CommonWrapperProps) => {
    return (
        <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
            <View style={{ flex: 1, padding }}>
                {children}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        position: "relative"
    },
});

export default CommonWrapper;
