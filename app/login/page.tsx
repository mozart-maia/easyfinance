"use client";
import { ReactElement, useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [imageList, setImageList] = useState<ReactElement[]>(
    [<Image className="h-full w-full object-cover" key={1} width={500} height={500} src="/jocke-wulcan-qvn1lOKi45o-unsplash.jpg" alt="Empty glasses. Image of Jocke Wulcan in Unsplash" />,
    <Image className="h-full w-full object-cover" key={2} width={500} height={500} src="/john-mcarthur-ROQzKIAdY78-unsplash.jpg" alt="Empty glasses. Image of Jocke Wulcan in Unsplash" />,
    <Image className="h-full w-full object-cover" key={3} width={500} height={500} src="/kelvin-zyteng-LMq-rTluKfQ-unsplash.jpg" alt="Empty glasses. Image of Jocke Wulcan in Unsplash" />,
    <Image className="h-full w-full object-cover" key={4} width={500} height={500} src="/optical-chemist-uz7dXgkdvkU-unsplash.jpg" alt="Empty glasses. Image of Jocke Wulcan in Unsplash" />,
  ]);

  const [image, setImage] = useState<any>();

  useEffect(() => {
    const randomImage = () => {
      let randomNumber = Math.floor(Math.random() * 10);
      if (randomNumber === 1 || randomNumber === 2 || randomNumber === 9) {
          setImage(imageList[0]);
      }
      if (randomNumber === 3 || randomNumber === 4 || randomNumber === 0) {
        setImage(imageList[1]);    
      }
      if (randomNumber === 5 || randomNumber === 6 || randomNumber === 10) {
        setImage(imageList[2]);
      }
      if (randomNumber === 7 || randomNumber === 8) {
        setImage(imageList[3]);  
      }      
    }

    randomImage();
  },[])

  const handleSubmit = async () => {
    //TODO ccolocar try catch e criar pagina alternativa para cadastro de usuario
    const res = await fetch('/api/login', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });
    
    const data = res.json();

  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="bg-slate-900 text-primary-foreground p-4 flex items-center justify-center lg:justify-start">
        <div className="flex items-center max-w-7xl w-full">
          <h1 className="text-3xl font-bold">Easy Finance</h1>
        </div>
      </header>

      <div className="flex flex-1">
        

        {/* Left side - Login form */}
        <div className="flex w-full items-center justify-center bg-white lg:w-1/2">
          <div className="max-w-md space-y-8 px-4 py-12 sm:px-6 lg:px-8">
            <div className="space-y-5">
              <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">Acesse a plataforma</h2>
              <p className="text-sm text-gray-500">
              Faça login para acessar suas ferramentas de controle financeiro e manter suas finanças em dia
  
              </p>
            </div>

            <form className="mt-8 space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email" className="sr-only">
                    Email
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="seuemail@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full"
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="sr-only">
                    Senha
                  </Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    placeholder="senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <Label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Manter acesso
                  </Label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-primary hover:underline">
                    Esqueceu sua senha?
                  </a>
                </div>
              </div>

              <Button type="button" className="w-full bg-blue-950" onClick={() => handleSubmit()}>
                Acessar
              </Button>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Ou acesse com</span>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <Button variant="outline" className="w-full">

                  Google
                </Button>
                <Button variant="outline" className="w-full">

                  Apple ID
                </Button>
              </div>
            </div>
          </div>
        </div>
        {/* Left side - Image */}
        <div className="hidden w-1/2 bg-gray-100 lg:block">
          {image}
        </div>
      </div>
    </div>
  )
}