import{j as e,u as w,r as o,H as v,L as h}from"./app-CzPvY-ZR.js";import{I as u}from"./InputError-Byl_50aL.js";import{P as y}from"./PrimaryButton-CFShFDr5.js";import{T as p}from"./TextInput-BMLceaL3.js";import{U as S}from"./users-ya3DeBZK.js";import{W as k}from"./wallet-GrsVfKFn.js";import{C as A}from"./calendar-days-B_po8lTW.js";import{S as C}from"./shield-check-DK_ITHp4.js";import{A as E}from"./arrow-left-DYgHWr69.js";import{M,S as I}from"./sun-CJ2kNJ5c.js";import{M as T}from"./mail-BWK3Cp-4.js";import{L as F,E as L,a as O}from"./lock-ilx07W6f.js";import"./createLucideIcon-DtDUKIa-.js";function P({className:t="",...a}){return e.jsx("input",{...a,type:"checkbox",className:"rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 "+t})}function V({status:t,canResetPassword:a}){const{data:n,setData:i,post:b,processing:c,errors:m,reset:j}=w({email:"",password:"",remember:!1}),[d,x]=o.useState("light"),[l,f]=o.useState(!1);o.useEffect(()=>{const s=localStorage.getItem("theme")||"light";x(s),document.documentElement.setAttribute("data-theme",s)},[]);const g=()=>{const s=d==="light"?"dark":"light";x(s),document.documentElement.setAttribute("data-theme",s),localStorage.setItem("theme",s)},N=s=>{s.preventDefault(),b(route("login"),{onFinish:()=>j("password")})};return e.jsxs(e.Fragment,{children:[e.jsx(v,{title:"Connexion"}),e.jsx("div",{className:"min-h-screen bg-base-200 flex items-center justify-center",children:e.jsxs("div",{className:"w-full min-h-screen grid grid-cols-1 lg:grid-cols-2",children:[e.jsxs("div",{className:`
                        hidden lg:flex
                        relative overflow-hidden
                        bg-gradient-to-br
                        from-green-600
                        via-blue-500
                        to-pink-500
                        text-white
                        items-center
                        justify-center
                        p-12
                    `,children:[e.jsx("div",{className:"absolute top-10 left-10 w-32 h-32 bg-white/20 rounded-full blur-2xl"}),e.jsx("div",{className:"absolute bottom-10 right-10 w-52 h-52 bg-yellow-300/20 rounded-full blur-3xl"}),e.jsxs("div",{className:"relative z-10 max-w-xl",children:[e.jsxs("div",{className:"mb-8",children:[e.jsxs("h1",{className:"text-5xl font-extrabold leading-tight",children:["Bienvenue sur ",e.jsx("br",{}),e.jsx("span",{className:"text-yellow-300",children:"TESOMIA"})]}),e.jsx("p",{className:"mt-5 text-lg text-white/90 leading-relaxed",children:"Gérez facilement les membres, les cotisations, les événements et les activités de votre association."})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-5",children:[e.jsx(r,{icon:e.jsx(S,{className:"w-9 h-9 mb-3"}),title:"Membres",text:"Gestion complète"}),e.jsx(r,{icon:e.jsx(k,{className:"w-9 h-9 mb-3"}),title:"Finances",text:"Suivi des cotisations"}),e.jsx(r,{icon:e.jsx(A,{className:"w-9 h-9 mb-3"}),title:"Événements",text:"Activités organisées"}),e.jsx(r,{icon:e.jsx(C,{className:"w-9 h-9 mb-3"}),title:"Sécurité",text:"Accès protégé"})]})]})]}),e.jsx("div",{className:"flex items-center justify-center px-6 py-10",children:e.jsxs("div",{className:"w-full max-w-md",children:[e.jsxs("div",{className:"flex items-center justify-between mb-5",children:[e.jsxs(h,{href:"/",className:"btn btn-ghost rounded-full",children:[e.jsx(E,{className:"w-4 h-4"}),"Accueil"]}),e.jsx("button",{type:"button",onClick:g,className:"btn btn-circle btn-ghost",children:d==="light"?e.jsx(M,{className:"w-5 h-5"}):e.jsx(I,{className:"w-5 h-5"})})]}),e.jsxs("div",{className:"lg:hidden text-center mb-8",children:[e.jsx("h1",{className:"text-4xl font-extrabold text-primary",children:"TESOMIA"}),e.jsx("p",{className:"text-base-content/60 mt-2",children:"Gestion interne de l'association"})]}),e.jsxs("div",{className:`
                                bg-base-100
                                rounded-3xl
                                shadow-2xl
                                border border-base-300
                                p-8
                            `,children:[e.jsxs("div",{className:"mb-8 text-center",children:[e.jsx("h2",{className:"text-3xl font-extrabold",children:"Se connecter"}),e.jsx("p",{className:"mt-2 text-base-content/60",children:"Accédez à votre espace de gestion"})]}),t&&e.jsx("div",{className:"alert alert-success mb-5",children:e.jsx("span",{children:t})}),e.jsxs("form",{onSubmit:N,className:"space-y-5",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block mb-2 text-sm font-semibold",children:"Adresse email"}),e.jsxs("div",{className:"relative",children:[e.jsx(T,{className:`
                                                absolute left-4 top-1/2
                                                -translate-y-1/2
                                                w-5 h-5 opacity-50
                                            `}),e.jsx(p,{id:"email",type:"email",name:"email",value:n.email,className:`
                                                    input input-bordered
                                                    w-full
                                                    pl-12
                                                    rounded-2xl
                                                `,autoComplete:"username",isFocused:!0,placeholder:"E-mail ou numéro de mobile",onChange:s=>i("email",s.target.value)})]}),e.jsx(u,{message:m.email,className:"mt-2"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"password",className:"block mb-2 text-sm font-semibold",children:"Mot de passe"}),e.jsxs("div",{className:"relative",children:[e.jsx(F,{className:`
                                                absolute left-4 top-1/2
                                                -translate-y-1/2
                                                w-5 h-5 opacity-50
                                            `}),e.jsx(p,{id:"password",type:l?"text":"password",name:"password",value:n.password,className:`
                                                    input input-bordered
                                                    w-full
                                                    pl-12
                                                    pr-12
                                                    rounded-2xl
                                                `,autoComplete:"current-password",placeholder:"Mot de passe",onChange:s=>i("password",s.target.value)}),e.jsx("button",{type:"button",onClick:()=>f(!l),className:`
                                                    absolute right-3 top-1/2
                                                    -translate-y-1/2
                                                    btn btn-ghost btn-sm btn-circle
                                                    text-base-content/60
                                                    hover:text-primary
                                                `,"aria-label":l?"Masquer le mot de passe":"Afficher le mot de passe",children:l?e.jsx(L,{className:"w-5 h-5"}):e.jsx(O,{className:"w-5 h-5"})})]}),e.jsx(u,{message:m.password,className:"mt-2"})]}),e.jsxs("div",{className:"flex items-center justify-between gap-4",children:[e.jsxs("label",{className:"flex items-center gap-2 cursor-pointer",children:[e.jsx(P,{name:"remember",checked:n.remember,onChange:s=>i("remember",s.target.checked)}),e.jsx("span",{className:"text-sm opacity-70",children:"Se souvenir de moi"})]}),a&&e.jsx(h,{href:route("password.request"),className:"text-sm link link-hover text-primary",children:"Mot de passe oublié ?"})]}),e.jsx(y,{className:`
                                            btn btn-primary
                                            w-full
                                            rounded-2xl
                                            text-base
                                            border-none
                                        `,disabled:c,children:c?"Connexion...":"Se connecter"})]}),e.jsx("div",{className:"divider my-7",children:"TESOMIA"}),e.jsxs("div",{className:"text-center",children:[e.jsx("p",{className:"text-sm opacity-60",children:"Plateforme sécurisée"}),e.jsx("p",{className:"mt-2 text-lg font-bold",children:"TESOMIA"})]})]})]})})]})})]})}function r({icon:t,title:a,text:n}){return e.jsxs("div",{className:`
            bg-white/15
            backdrop-blur-md
            rounded-3xl
            p-5
            shadow-lg
        `,children:[t,e.jsx("h3",{className:"font-bold",children:a}),e.jsx("p",{className:"text-sm text-white/80",children:n})]})}export{V as default};
