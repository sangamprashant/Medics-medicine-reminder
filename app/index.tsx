import { useAppData } from '@/providers/appDataProvider';
import { _colors } from '@/theme';
import { getUserName } from '@/utils/storage';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import React, { useLayoutEffect } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import Onboarding from 'react-native-onboarding-swiper';

SplashScreen.preventAutoHideAsync();

const OnboardingScreen = () => {
    const router = useRouter();
    const { handleName } = useAppData()

    useLayoutEffect(() => {
        fetchName()
    }, [])

    const fetchName = async () => {
        const name = await getUserName();
        if (name) {
            await handleName(name);
            setTimeout(() => router.replace("/(main)/home"), 0);
        }
        await SplashScreen.hideAsync();
    };

    const click = () => router.replace('/name');

    const Skip = ({ ...props }) => (
        <ButtonText text="Skip" {...props} />
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
                <AntDesign name="arrow-right" size={22} color="white" />
            </View>
        </TouchableOpacity>
    );

    const Done = ({ ...props }) => (
        <ButtonText text="Get Started" {...props} />
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
                    image: <ImageContainer name="doctor1" />,
                    title: <TitleContainer title='Consult only with a doctor you trust' />,
                    subtitle: '',
                },
                {
                    backgroundColor: '#fff',
                    image: <ImageContainer name="doctor2" />,
                    title: <TitleContainer title='Find a lot of specialist doctors in one place' />,
                    subtitle: '',
                },
                {
                    backgroundColor: '#fff',
                    image: <ImageContainer name="doctor3" />,
                    title: <TitleContainer title='Get connected to our Online Consultation' />,
                    subtitle: '',
                },
            ]}
        />
    );
};

export default OnboardingScreen;

export const images: Record<string, any> = {
    doctor1: require("@/assets/images/doctor1.png"),
    doctor2: require("@/assets/images/doctor2.png"),
    doctor3: require("@/assets/images/doctor3.png"),
};

const ImageContainer = ({ name }: { name: keyof typeof images }) => {
    return (
        <View
            style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#fcfcfcff", // soft background for contrast
                borderRadius: "100%",
                padding: 0,
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 3,
                overflow: "hidden"
            }}
        >
            <Image
                source={images[name]}
                style={{ width: 220, height: 220, borderRadius: 16 }}
                resizeMode="contain"
            />
        </View>
    );
};

const TitleContainer = ({ title }: { title: string }) => {
    return (
        <View style={{ marginTop: 24, paddingHorizontal: 20 }}>
            <Text
                style={{
                    fontSize: 25,
                    fontWeight: "600",
                    color: _colors.primary,
                    textAlign: "center",
                    lineHeight: 30,
                }}
            >
                {title}
            </Text>
        </View>
    );
};

const ButtonText = ({ text, ...props }: { text: string }) => {
    return (
        <TouchableOpacity style={{ marginHorizontal: 10 }} {...props}>
            <Text style={{ fontSize: 16, fontWeight: 'bold', color: _colors.primary }}>{text}</Text>
        </TouchableOpacity>
    );
}