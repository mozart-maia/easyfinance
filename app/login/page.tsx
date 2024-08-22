import Image from "next/image";

import { Box, Button, Checkbox, Flex, Separator, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";

export default function Login() {

    

    return (
    <main className="flex flex-row min-h-screen w-full bg-slate-200">
      <div className="px-24 bg-slate-200 w-full lg:w-1/2 m-auto">        
          <div id="logo" className="flex flex-row">
            <Image src={"/moneylogo.png"} alt={"logo of money"} width={60} height={10}></Image>
            <p className="text-3xl font-bold ml-5 mt-3">Easy Finance</p>
          </div>
          <h1 className="text-xl font-bold mt-10">Acesse a plataforma</h1>
          <div>
            <p className="font-light text-sm">Faça login para acessar suas ferramentas de controle financeiro e manter suas finanças em dia.</p>
          </div>

          <div id="login" className="text-sm font-bold mt-5 justify-center">
            <p className="mb-1">
              E-mail 
            </p>
            <Box maxWidth={{ md: '80vw', xl: '30vw' }}>
              <TextField.Root size="3" placeholder="Digite seu e-mail" />
            </Box>
          </div>

          <div id="senha" className="text-sm font-bold mt-5 justify-center">
            <p className="mb-1">
              Senha 
            </p>
            <Box maxWidth={{ md: '80vw', xl: '30vw' }}>
              <TextField.Root size="3" type="password" placeholder="Digite sua senha" />
            </Box>
          </div>
          <div id="conectadosenha" className="flex flex-row max-w-xl mt-5 justify-between">
            <Text as="label" size="1">
              <Flex gap="2">
                <Checkbox  />
                Permanecer conectado?
              </Flex>
            </Text>
          
            <Text as="label" size="1" align={"left"}><Link href="/">Esqueceu sua senha?</Link></Text>
            
          </div>
          <div id="buttonentrar" className="mt-5">
            <Link href="/">
              <button className="bg-blue-500 w-[95%] xl:w-[75%] h-12 rounded-md text-white font-bold  hover:bg-blue-400"> Entrar</button>
            </Link>
          </div>
          
        <div className="hidden xl:block mt-5 px-40">
          <Flex direction="row" gap="3" >    
            <Separator orientation="horizontal" size="3"/>    
            <p className="text-xs -mt-2 mx-3">ou continue com</p>
            <Separator orientation="horizontal" size="3"/>  
          </Flex>
        </div>


        <div id="logingoogle" className="mt-5">
          <Link href="/">
              <button className="bg-slate-100 w-[95%] xl:w-[75%]  h-12 rounded-md border border-blue-300 text-black font-bold hover:bg-slate-300"> Entrar com o Google</button>
          </Link>
        </div>

          <div id="loginapple" className="mt-5">
            <Link href="/">
              <button className="bg-slate-100 w-[95%] xl:w-[75%] h-12 rounded-md border border-blue-300 text-black font-bold  hover:bg-slate-300"> Entrar com o Apple ID</button>
            </Link>
          </div>              
      </div>
      <div className="min-h-screen w-0 lg:w-1/2 bg-blue-500 ">
        <div className=""></div>
      </div>
    </main>
    )
  }