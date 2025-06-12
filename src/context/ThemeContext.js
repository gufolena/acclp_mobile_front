// src/context/ThemeContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance, useColorScheme } from 'react-native'; // Para tema do sistema

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const systemColorScheme = useColorScheme(); // 'light' ou 'dark' ou null
    const [theme, setTheme] = useState(systemColorScheme || 'light'); // Começa com o tema do sistema ou 'light'

    useEffect(() => {
        const loadTheme = async () => {
            try {
                const storedTheme = await AsyncStorage.getItem('appTheme');
                if (storedTheme) {
                    setTheme(storedTheme);
                } else if (systemColorScheme) {
                    setTheme(systemColorScheme); // Usa o tema do sistema se não houver preferência salva
                }
            } catch (error) {
                console.error("Erro ao carregar tema do AsyncStorage:", error);
            }
        };
        loadTheme();
    }, [systemColorScheme]); // Recarrega se o tema do sistema mudar

    // Listener para mudanças no tema do sistema enquanto o app está aberto
    useEffect(() => {
        const subscription = Appearance.addChangeListener(({ colorScheme }) => {
            // Se o usuário não definiu uma preferência manual, siga o sistema
            // Ou você pode optar por sempre usar a preferência do usuário se houver
            // Por simplicidade, se o tema salvo é diferente do sistema, mantém o salvo.
            // Se o tema salvo é igual ao sistema, e o sistema muda, atualiza.
            AsyncStorage.getItem('appTheme').then(storedTheme => {
                if (!storedTheme) { // Se não há preferência manual, siga o sistema
                    setTheme(colorScheme);
                }
            }).catch(e => console.error(e));
        });

        return () => subscription.remove();
    }, []);

    const toggleTheme = async () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        try {
            await AsyncStorage.setItem('appTheme', newTheme);
            setTheme(newTheme);
        } catch (error) {
            console.error("Erro ao salvar tema no AsyncStorage:", error);
        }
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};