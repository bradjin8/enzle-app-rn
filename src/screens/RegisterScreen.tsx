import React, {memo, useState} from "react";
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import Background from "../components/Background";
import Button from "../components/Button";
import TextInput from "../components/TextInput";
import BackButton from "../components/BackButton";
import {theme} from "../core/theme";
import {Navigation} from "../types";
import {
    emailValidator,
    passwordValidator,
    mlsIdValidator
} from "../core/utils";
import {signInUser} from "../api/auth-api";
import Toast from "../components/Toast";
import {fetchMlsInfoByMlsId} from "../api/utahrealestate-api";
import { useAppSelector, useAppDispatch } from "../hooks";
import {setMlsInfo, setMlsId as setStoreMlsId, setUid} from "../store/userReducer";

type Props = {
    navigation: Navigation;
};

const RegisterScreen = ({navigation}: Props) => {
    const [email, setEmail] = useState({value: "", error: ""});
    const [password, setPassword] = useState({value: "", error: ""});
    const [mlsId, setMlsId] = useState({value: "", error: ""})
    const [mlsSubscription, setMlsSubscription] = useState("Select MLS Subscription");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");


    const _onSignUpPressed = async () => {
        if (loading) return;

        const emailError = emailValidator(email.value);
        const passwordError = passwordValidator(password.value);
        const mlsIdError = mlsIdValidator(mlsId.value);

        if (emailError || passwordError || mlsIdError) {
            setEmail({...email, error: emailError});
            setPassword({...password, error: passwordError});
            setMlsId({...mlsId, error: mlsIdError});
            return;
        }

        setLoading(true);
        console.log('mlsId', mlsId)
        const mlsRes = await fetchMlsInfoByMlsId(mlsId.value)
        console.log('register-mls', mlsRes);
        if (!mlsRes.success) {
            setMlsId({...mlsId, error: mlsRes.error})
            setLoading(false);
            return;
        }

        setMlsSubscription(mlsRes.data.mlsSubscription);
        const response = await signInUser({
          email: email.value,
          password: password.value
        });
        //
        if (response.error) {
          setError(response.error);
        }

        setStoreMlsId(mlsId.value);
        setMlsInfo(mlsRes.data);

        setLoading(false);
    };

    return (
        <Background>
            {/*<BackButton goBack={() => navigation.navigate("HomeScreen")} />*/}
            <TextInput
                label="Email Address"
                returnKeyType="next"
                value={email.value}
                onChangeText={text => setEmail({value: text, error: ""})}
                error={!!email.error}
                errorText={email.error}
                autoCapitalize="none"
                autoCompleteType="email"
                textContentType="emailAddress"
                keyboardType="email-address"
            />

            <TextInput
                label="Password"
                returnKeyType="done"
                value={password.value}
                onChangeText={text => setPassword({value: text, error: ""})}
                error={!!password.error}
                errorText={password.error}
                secureTextEntry
                autoCapitalize="none"
            />

            <View style={styles.space}/>
            <Text style={styles.selectMls}>{mlsSubscription}</Text>
            <Text style={styles.domain}>UtahRealEstate.com</Text>

            <TextInput
                label="MLS ID"
                returnKeyType="done"
                value={mlsId.value}
                onChangeText={text => setMlsId({value: text, error: ""})}
                error={!!mlsId.error}
                errorText={mlsId.error}
                autoCapitalize="none"
            />

            <Button
                loading={loading}
                mode="contained"
                onPress={_onSignUpPressed}
                style={styles.button}
            >
                Sign Up
            </Button>

            <View style={styles.row}>
                <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
                    <Text style={styles.link}>Go To Login</Text>
                </TouchableOpacity>
            </View>

            <Toast message={error} onDismiss={() => setError("")}/>
        </Background>
    );
};

const styles = StyleSheet.create({
    label: {
        color: theme.colors.secondary
    },
    button: {
        marginTop: 24
    },
    row: {
        flexDirection: "row",
        marginTop: 4
    },
    link: {
        fontWeight: "bold",
        color: theme.colors.primary
    },
    selectMls: {
        width: '100%',
        backgroundColor: 'rgba(200,200,200,0.6)',
        borderRadius: 4,
        paddingVertical: 4,
        color: theme.colors.secondary,
        textAlign: 'center'
    },
    domain: {
        color: 'rgba(200,200,200,0.8)'
    },
    space: {
        height: '10%'
    }
});

export default memo(RegisterScreen);
