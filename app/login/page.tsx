import Image from "next/image";

import { Box, Button, Checkbox, Flex, Text, TextField } from "@radix-ui/themes";
import Link from "next/link";

export default function Login() {
    return (
    <main className="flex flex-row min-h-screen w-full">
      <div className="p-20 bg-slate-200 w-full lg:w-1/2">        
          <div id="logo" className="flex flex-row">
            <Image src={"/moneylogo.png"} alt={"logo of money"} width={60} height={10}></Image>
            <p className="text-3xl font-bold ml-5 mt-3">Easy Finance</p>
          </div>
          <h1 className="text-xl font-bold mt-14">Acesse a plataforma</h1>
          <div>
            <p className="font-light text-sm">Faça login para acessar suas ferramentas de controle financeiro e manter suas finanças em dia.</p>
          </div>

          <div id="login" className="text-sm font-bold mt-5 justify-center">
            <p className="mb-1">
              E-mail 
            </p>
            <Box maxWidth="577px">
              <TextField.Root size="2" placeholder="Digite seu e-mail" />
            </Box>
          </div>

          <div id="senha" className="text-sm font-bold mt-5 justify-center">
            <p className="mb-1">
              Senha 
            </p>
            <Box maxWidth="577px">
              <TextField.Root size="2" type="password" placeholder="Digite sua senha" />
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
            <Button size={"3"} variant="solid" >Entrar</Button>
          </div>
          
          
              
      </div>
      <div className="min-h-screen w-0 lg:w-1/2 bg-blue-500 ">
        <div className=""></div>
      </div>
    </main>
    )
  }