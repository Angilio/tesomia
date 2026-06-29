import{u as o,j as e,H as c,L as x}from"./app-CzPvY-ZR.js";import{I as u}from"./InputError-Byl_50aL.js";import{P as p}from"./PrimaryButton-CFShFDr5.js";import{T as h}from"./TextInput-BMLceaL3.js";import{G as j}from"./GuestLayout-B16J-vQG.js";import{A as b}from"./arrow-left-DYgHWr69.js";import{M as l}from"./mail-BWK3Cp-4.js";import"./ApplicationLogo-DKp0eFBQ.js";import"./sun-CJ2kNJ5c.js";import"./createLucideIcon-DtDUKIa-.js";function F({status:a}){const{data:t,setData:n,post:i,processing:r,errors:m}=o({email:""}),d=s=>{s.preventDefault(),i(route("password.email"))};return e.jsxs(j,{children:[e.jsx(c,{title:"Mot de passe oublié"}),e.jsx("div",{className:`
                min-h-[80vh]
                flex items-center justify-center
                px-4
            `,children:e.jsxs("div",{className:"w-full max-w-md",children:[e.jsx("div",{className:"flex items-center justify-between mb-5",children:e.jsxs(x,{href:"/",className:"btn btn-ghost rounded-full",children:[e.jsx(b,{className:"w-4 h-4"}),"Accueil"]})}),e.jsx("div",{className:`
                        card
                        bg-base-100
                        border border-base-300
                        shadow-2xl
                    `,children:e.jsxs("div",{className:"card-body p-8",children:[e.jsxs("div",{className:"text-center mb-8",children:[e.jsx("div",{className:`
                                    w-16 h-16 mx-auto mb-5
                                    rounded-3xl
                                    bg-primary/10
                                    text-primary
                                    flex items-center justify-center
                                `,children:e.jsx(l,{className:"w-8 h-8"})}),e.jsx("h1",{className:"text-3xl font-black",children:"Mot de passe oublié"}),e.jsx("p",{className:"mt-3 text-base-content/60 leading-relaxed",children:"Entrez votre adresse email pour recevoir un lien de réinitialisation du mot de passe."})]}),a&&e.jsx("div",{className:"alert alert-success mb-6",children:e.jsx("span",{children:a})}),e.jsxs("form",{onSubmit:d,className:"space-y-5",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-semibold",children:"Adresse email"}),e.jsxs("div",{className:"relative",children:[e.jsx(l,{className:`
                                            absolute left-4 top-1/2
                                            -translate-y-1/2
                                            w-5 h-5 opacity-50
                                        `}),e.jsx(h,{id:"email",type:"email",name:"email",value:t.email,className:`
                                                input input-bordered
                                                w-full
                                                pl-12
                                                rounded-2xl
                                            `,isFocused:!0,placeholder:"Votre adresse email",onChange:s=>n("email",s.target.value)})]}),e.jsx(u,{message:m.email,className:"mt-2"})]}),e.jsx(p,{className:`
                                        btn btn-primary
                                        w-full
                                        rounded-2xl
                                        text-base
                                        border-none
                                    `,disabled:r,children:r?"Envoi...":"Envoyer le lien"})]}),e.jsx("div",{className:"divider my-7",children:"TESOMIA"}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm opacity-60",children:"Plateforme sécurisée"}),e.jsx("p",{className:"mt-2 text-lg font-bold",children:"TESOMIA"})]})]})})]})})]})}export{F as default};
