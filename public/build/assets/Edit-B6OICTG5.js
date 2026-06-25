import{r as d,j as e,H as m,L as n,a as c}from"./app-CMP-OJpj.js";import{L as x,H as u,B as h}from"./Layout-DkjX0mWG.js";import{P as p}from"./pencil-ChWlUNOs.js";import{U as j}from"./users-Dt4_79lW.js";import{S as f}from"./save-CVTweCis.js";import{A as b}from"./arrow-left-D20l-obb.js";import"./ApplicationLogo-WbsvYeOB.js";import"./transition-BlMG_pN0.js";import"./sun-BJKJG8o_.js";import"./createLucideIcon-DLz2avA7.js";import"./shield-check-FSxcNj7F.js";function S({logement:a,types:t}){const[l,i]=d.useState({name:a.name,nbrPlace:a.nbrPlace,type_logement_id:a.type_logement_id}),r=s=>{i({...l,[s.target.name]:s.target.value})},o=s=>{s.preventDefault(),c.put(`/logements/${a.id}`,l)};return e.jsxs(x,{header:e.jsxs("div",{className:"flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4",children:[e.jsxs("div",{children:[e.jsx("h2",{className:"text-2xl font-black",children:"Modifier un logement"}),e.jsx("p",{className:"text-sm opacity-60",children:"Mettre à jour les informations du logement"})]}),e.jsxs(n,{href:route("logements.index"),className:"btn btn-ghost rounded-full",children:[e.jsx(b,{className:"w-4 h-4"}),"Tous les logements"]})]}),children:[e.jsx(m,{title:"Modifier un logement"}),e.jsxs("div",{className:"max-w-3xl mx-auto space-y-6",children:[e.jsx("div",{className:"rounded-3xl bg-gradient-to-r from-warning to-orange-500 text-white p-6 md:p-8 shadow-xl",children:e.jsxs("div",{className:"flex items-center gap-5",children:[e.jsx("div",{className:"w-16 h-16 rounded-3xl bg-white/15 flex items-center justify-center",children:e.jsx(p,{className:"w-8 h-8"})}),e.jsxs("div",{children:[e.jsx("h1",{className:"text-3xl font-black",children:"Modifier le logement"}),e.jsx("p",{className:"mt-1 text-white/80",children:"Mettez à jour les informations du logement sélectionné."})]})]})}),e.jsx("div",{className:"card bg-base-100 border border-base-300 shadow-sm",children:e.jsx("div",{className:"card-body p-6 md:p-8",children:e.jsxs("form",{onSubmit:o,className:"space-y-5",children:[e.jsxs("div",{className:"form-control",children:[e.jsx("label",{className:"label",children:e.jsx("span",{className:"label-text font-semibold",children:"Nom du logement"})}),e.jsxs("div",{className:"relative",children:[e.jsx(u,{className:`\r
                                        absolute left-4 top-1/2\r
                                        -translate-y-1/2\r
                                        w-5 h-5 opacity-40\r
                                    `}),e.jsx("input",{type:"text",name:"name",className:`\r
                                            input input-bordered\r
                                            w-full\r
                                            rounded-2xl\r
                                            pl-12\r
                                        `,value:l.name,onChange:r,placeholder:"Ex : Bloc A, Chambre 12...",required:!0})]})]}),e.jsxs("div",{className:"form-control",children:[e.jsx("label",{className:"label",children:e.jsx("span",{className:"label-text font-semibold",children:"Nombre de places"})}),e.jsxs("div",{className:"relative",children:[e.jsx(j,{className:`\r
                                        absolute left-4 top-1/2\r
                                        -translate-y-1/2\r
                                        w-5 h-5 opacity-40\r
                                    `}),e.jsx("input",{type:"number",name:"nbrPlace",className:`\r
                                            input input-bordered\r
                                            w-full\r
                                            rounded-2xl\r
                                            pl-12\r
                                        `,value:l.nbrPlace,onChange:r,placeholder:"Ex : 4",min:"1",required:!0})]})]}),e.jsxs("div",{className:"form-control",children:[e.jsx("label",{className:"label",children:e.jsx("span",{className:"label-text font-semibold",children:"Type de logement"})}),e.jsxs("div",{className:"relative",children:[e.jsx(h,{className:`\r
                                        absolute left-4 top-1/2\r
                                        -translate-y-1/2\r
                                        w-5 h-5 opacity-40 z-10\r
                                    `}),e.jsx("select",{name:"type_logement_id",className:`\r
                                            select select-bordered\r
                                            w-full\r
                                            rounded-2xl\r
                                            pl-12\r
                                        `,value:l.type_logement_id,onChange:r,required:!0,children:t.map(s=>e.jsx("option",{value:s.id,children:s.type},s.id))})]})]}),e.jsxs("div",{className:`\r
                                flex flex-col sm:flex-row\r
                                sm:justify-end\r
                                gap-3\r
                                pt-4\r
                            `,children:[e.jsx(n,{href:route("logements.index"),className:"btn btn-ghost rounded-2xl",children:"Annuler"}),e.jsxs("button",{type:"submit",className:"btn btn-warning rounded-2xl text-white",children:[e.jsx(f,{className:"w-4 h-4"}),"Mettre à jour"]})]})]})})})]})]})}export{S as default};
