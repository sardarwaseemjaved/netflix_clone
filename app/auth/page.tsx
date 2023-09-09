"use client"
import axios, { AxiosError, AxiosResponse } from 'axios';
import { FormEvent, useCallback, useState } from "react";
import { signIn } from 'next-auth/react';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import Input from "@/components/Input";
import { useRouter } from 'next/navigation';
import { errorHandler } from '@/utils/errorHandler';
import SpinnerOverlay from '@/components/SpinnerOverlay';


type VariantT = 'login' | 'register'
type FormT = {
    name: string,
    email: string,
    password: string
}
type ProvidersT = 'google' | 'github';

const Auth = () => {

    const router = useRouter();

    const [variant, setVariant] = useState<VariantT>('login')

    const [formData, setFormData] = useState<FormT>({
        name: '',
        email: '',
        password: ''
    });
    const [isLoading, setLoading] = useState(false);

    const toggleVariant = useCallback(() => {
        setVariant((currentVariant) => currentVariant === 'login' ? 'register' : 'login');
    }, []);

    const onChange = (e: any) => setFormData(prevState => ({ ...prevState, [e.target.name]: e.target.value }));

    const onLogin = useCallback(async () => {
        try {
            setLoading(true)
            await signIn('credentials', {
                email: formData.email,
                password: formData.password,
                redirect: false,
                callbackUrl: '/'
            });
            setLoading(false)
            router.push('/');
        } catch (error) {
            setLoading(false)
            errorHandler(error)
        }
    }, [JSON.stringify(formData), router]);

    const onRegister = useCallback(async () => {
        try {
            setLoading(true)
            await axios.post('/api/register', {
                email: formData.email,
                name: formData.name,
                password: formData.password,
            });

            setLoading(false)
            onLogin();

        } catch (error) {
            setLoading(false)
            errorHandler(error)
        }
    }, [JSON.stringify(formData), onLogin]);

    const handleSumbit = useCallback((e: FormEvent) => {
        e.preventDefault();
        variant === 'login' ? onLogin() : onRegister()
    }, [variant, onLogin, onRegister])

    const onSocialLogin = useCallback(async (provider: ProvidersT) => {
        setLoading(true)
        await signIn(provider, { callbackUrl: '/' })
        setLoading(false)
    }, [])

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
            <SpinnerOverlay visible={isLoading} />
            <div className="bg-black w-full h-full lg:bg-opacity-50">
                <nav className="px-12 py-5">
                    <img src="/images/logo.png" className="h-12" alt="Logo" />
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-semibold">
                            Sign in
                        </h2>
                        <form onSubmit={handleSumbit}>
                            <div className="flex flex-col gap-4">
                                {variant === 'register' && (
                                    <Input
                                        id="name"
                                        name="name"
                                        type="text"
                                        label="Username"
                                        value={formData.name}
                                        onChange={onChange}
                                        required
                                    />
                                )}
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    label="Email address or phone number"
                                    value={formData.email}
                                    onChange={onChange}
                                    required
                                />
                                <Input
                                    id="password"
                                    name="password"
                                    type="password"
                                    label="Password"
                                    value={formData.password}
                                    onChange={onChange}
                                    required
                                />
                            </div>
                            <button type='submit' className="bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition">
                                {variant === 'login' ? 'Login' : 'Sign up'}
                            </button>
                        </form>
                        <div className="flex flex-row items-center gap-4 mt-8 justify-center">
                            <div onClick={() => onSocialLogin('google')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FcGoogle size={32} />
                            </div>
                            <div onClick={() => onSocialLogin('github')} className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition">
                                <FaGithub size={32} />
                            </div>
                        </div>
                        <p className="text-neutral-500 mt-12">
                            {variant === 'login' ? 'First time using Netflix?' : 'Already have an account?'}
                            <span onClick={toggleVariant} className="text-white ml-1 hover:underline cursor-pointer">
                                {variant === 'login' ? 'Create an account' : 'Login'}
                            </span>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Auth;