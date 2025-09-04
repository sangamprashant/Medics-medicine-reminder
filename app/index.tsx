import { useAppData } from '@/providers/appDataProvider';
import { _colors } from '@/theme';
import { getUserName } from '@/utils/storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

SplashScreen.preventAutoHideAsync();

const OnboardingScreen = () => {
    const router = useRouter();
    const { handleName } = useAppData()

    useEffect(() => {
        fetchName()
    }, [])

    const fetchName = async () => {
        await getUserName().then(async (name: string | null) => {
            if (name) {
                await handleName(name)
                router.replace("/(main)/home");
            }
            SplashScreen.hide()
        })
    }

    const click = () => router.replace('/name');

    const Skip = ({ ...props }) => (
        <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
            <Text style={{ fontSize: 16, color: _colors.primary }}>Skip</Text>
        </TouchableOpacity>
    );

    const Next = ({ ...props }) => (
        <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
            <View style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: _colors.primary,
                padding: 6,
                borderRadius: 50,
            }}>
                <AntDesign name="arrowright" size={22} color="white" />
            </View>
        </TouchableOpacity>
    );

    const Done = ({ ...props }) => (
        <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: _colors.primary }}>Get Started</Text>
        </TouchableOpacity>
    );

    return (
        <Onboarding
            onSkip={click}
            onDone={click}
            SkipButtonComponent={Skip}
            NextButtonComponent={Next}
            DoneButtonComponent={Done}
            bottomBarHighlight={false}
            titleStyles={{
                fontSize: 20,
                fontWeight: 'bold',
                color: '#333',
                textAlign: 'center',
                marginTop: 10,
            }}
            imageContainerStyles={{
                paddingBottom: 0,
                marginBottom: -10,
            }}
            containerStyles={{ paddingBottom: 60 }}
            pages={[
                {
                    backgroundColor: '#fff',
                    image: (
                        <Image
                            source={require('@/assets/images/doctor1.jpg')}
                            style={{ width: 189, height: 284 }}
                            resizeMode="contain"
                        />
                    ),
                    title: 'Consult only with a doctor you trust',
                    subtitle: '',
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <Image
                            source={require('@/assets/images/doctor2.jpg')}
                            style={{ width: 189, height: 284 }}
                            resizeMode="contain"
                        />
                    ),
                    title: 'Find a lot of specialist doctors in one place',
                    subtitle: '',
                },
                {
                    backgroundColor: '#fff',
                    image: (
                        <Image
                            source={require('@/assets/images/doctor3.png')}
                            style={{ width: 189, height: 284 }}
                            resizeMode="contain"
                        />
                    ),
                    title: 'Get connected to our Online Consultation',
                    subtitle: '',
                },
            ]}
        />
    );
};

export default OnboardingScreen;
