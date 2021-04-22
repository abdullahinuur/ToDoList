(()=>{"use strict";var e={d:(t,n)=>{for(var o in n)e.o(n,o)&&!e.o(t,o)&&Object.defineProperty(t,o,{enumerable:!0,get:n[o]})},o:(e,t)=>Object.prototype.hasOwnProperty.call(e,t)};function t(e,t,n,o){let l=e,i=t,a=n,r=o,c=!1;return{getTitle:()=>l,getDate:()=>i,getDescription:()=>a,getPriority:()=>r,isDone:()=>c,setTitle:e=>l=e,setDate:e=>i=e,setDescription:e=>a=e,setPriority:e=>r=e,toggleDone:()=>c=!c}}function n(e){let t=e,n=[],o=!1;return{getName:()=>t,getItems:()=>n,isOpen:()=>o,setName:e=>t=e,addItem:e=>n.push(e),removeItem:e=>{n.indexOf(e)>-1&&n.splice(n.indexOf(e),1)},emptyItems:()=>n=[],toggleOpen:()=>o=!o}}function o(e){return JSON.stringify(e.map((e=>function(e){let t=e.getName(),n=e.getItems().map((e=>function(e){let t=e.getTitle(),n=e.getDate(),o=e.getDescription(),l=e.getPriority(),i=e.isDone();return JSON.stringify({title:t,date:n,description:o,priority:l,done:i})}(e))),o=e.isOpen();return JSON.stringify({name:t,items:n,open:o})}(e))))}function l(e,t){t.querySelector(".openTitle").value=e.getTitle(),t.querySelector(".openDate").value=e.getDate(),t.querySelector(".openDesc").value=e.getDescription(),t.querySelector(".itemTitle").textContent=e.getTitle(),t.querySelector(".itemDate").textContent=e.getDate()}function i(e,t){let n=t.querySelector(".openItem");l(e,t),n.classList.contains("closed")?n.classList.remove("closed"):n.classList.add("closed")}e.d({},{C:()=>C});const a=document.querySelector("#items"),r=document.querySelector("#openProjName");function c(e){let t=C(e);if(!t)return null;u(),d(t.getName()),t.getItems().forEach((t=>s(e,0,t)))}function d(e){r.textContent=e}function s(e,t,n){let r=document.createElement("div");r.classList.add("item");let c=function(e,t,n){let l=document.createElement("input");return l.type="checkbox",l.checked=t.isDone(),t.isDone()&&n.classList.add("itemDone"),l.addEventListener("change",(()=>function(e,t,n){t.toggleDone(),t.isDone()?n.classList.add("itemDone"):n.classList.remove("itemDone"),localStorage.setItem("projects",o(e))}(e,t,n))),l}(e,n,r),d=function(e){let t=document.createElement("h2");return t.classList.add("itemTitle"),t.textContent=e.getTitle(),t}(n),s=function(e){let t=document.createElement("h2");return t.classList.add("itemDate"),t.textContent=e.getDate(),t}(n),u=function(e,t){let n=document.createElement("select");n.classList.add("priority");let l=document.createElement("option");l.value="High",l.textContent="High";let i=document.createElement("option");i.value="Medium",i.textContent="Medium";let a=document.createElement("option");return a.value="Low",a.textContent="Low",n.appendChild(l),n.appendChild(i),n.appendChild(a),n.value=t.getPriority(),n.addEventListener("change",(()=>{t.setPriority(n.value),localStorage.setItem("projects",o(e))})),n}(e,n),m=function(e,t,n){C(e);let l=document.createElement("div");l.classList.add("itemBtns");let r=document.createElement("button");r.classList.add("editItem"),r.textContent="Open/Edit",r.addEventListener("click",(()=>function(e,t){i(e,t)}(t,n)));let c=document.createElement("button");return c.classList.add("deleteItem"),c.textContent="Delete",c.addEventListener("click",(()=>function(e,t,n){C(e).removeItem(t),function(e){a.removeChild(e)}(n),localStorage.setItem("projects",o(e))}(e,t,n))),l.appendChild(r),l.appendChild(c),l}(e,n,r),p=function(e,t,n){let a=document.createElement("div");a.classList.add("openItem","closed");let r=function(e){let t=document.createElement("label"),n=document.createElement("input");return n.type="text",n.classList.add("openTitle"),n.value=e.getTitle(),t.textContent="Title",t.appendChild(n),t}(t),c=function(e){let t=document.createElement("label"),n=document.createElement("input");return n.type="date",n.classList.add("openDate"),n.value=e.getDate(),t.textContent="Date",t.appendChild(n),t}(t),d=function(e){let t=document.createElement("label"),n=document.createElement("textarea");return n.classList.add("openDesc"),n.value=e.getDescription(),t.textContent="Description",t.appendChild(n),t}(t),s=function(e,t,n){let a=document.createElement("div");a.classList.add("openItemBtns");let r=document.createElement("button");r.classList.add("saveItem"),r.textContent="Save",r.addEventListener("click",(()=>function(e,t,n){let i=n.querySelector(".openTitle").value,a=n.querySelector(".openDate").value,r=n.querySelector(".openDesc").value;t.setTitle(i),t.setDate(a),t.setDescription(r),l(t,n),localStorage.setItem("projects",o(e))}(e,t,n)));let c=document.createElement("button");return c.classList.add("cancelItem"),c.textContent="Cancel",c.addEventListener("click",(()=>i(t,n))),a.appendChild(r),a.appendChild(c),a}(e,t,n);return a.appendChild(r),a.appendChild(c),a.appendChild(d),a.appendChild(s),a}(e,n,r);return r.appendChild(c),r.appendChild(d),r.appendChild(s),r.appendChild(u),r.appendChild(m),r.appendChild(p),a.appendChild(r),r}function u(){for(;a.lastChild;)a.removeChild(a.lastChild)}const m=document.querySelector("#projects");function p(e,t){let n=t.getName(),l=document.createElement("div");l.id=n,l.classList.add("project");let i=function(e,t){let n=document.createElement("button");return n.classList.add("projName"),n.textContent=t.getName(),n.addEventListener("click",(()=>function(e,t){let n=C(e);n&&n.toggleOpen(),t.toggleOpen(),c(e),localStorage.setItem("projects",o(e))}(e,t))),n}(e,t),a=function(e,t,n){let l=document.createElement("div");l.classList.add("projBtns");let i=document.createElement("button");i.classList.add("editProj"),i.textContent="Edit",i.addEventListener("click",(()=>{let l=window.prompt(`Edit ${n.id} to:`);null!=l&&g(e,l)&&function(e,t,n,l){(function(e,t){e.id=t,e.querySelector(".projName").textContent=t})(n,l),t.setName(l),t.isOpen()&&d(l),localStorage.setItem("projects",o(e))}(e,t,n,l)}));let a=document.createElement("button");return a.classList.add("deleteProj"),a.textContent="Delete",a.addEventListener("click",(()=>function(e,t,n){n.remove(),function(e,t){let n=e.indexOf(t);n>-1&&e.splice(n,1)}(e,t),t.isOpen()&&(t.toggleOpen(),t.emptyItems(),r.textContent="",u()),localStorage.setItem("projects",o(e))}(e,t,n))),l.appendChild(i),l.appendChild(a),l}(e,t,l);return l.appendChild(i),l.appendChild(a),m.appendChild(l),l}function g(e,t){return t?!e.map((e=>e.getName().toLowerCase().trim())).includes(t)||(window.alert("A project with this name already exists."),!1):(window.alert("Please enter a name."),!1)}let f=[];document.querySelector("#addProjBtn").addEventListener("click",h);let v=document.querySelector("#addProjText");function C(e){let t=e.filter((e=>e.isOpen()));return 0===t.length?null:t.length>1?(window.alert("More than one project is open!"),null):t[0]}function h(){let e=v.value;g(f,e.toLowerCase().trim())&&(E(e),v.value=""),v.focus()}function E(e){let t=n(e);return f.push(t),p(f,t),localStorage.setItem("projects",o(f)),t}function y(e,n,l,i,a){let r=C(f);if(!r)return window.alert("There is no open project to add the item to."),null;let c=t(e,n,l,i,r.getName());return r.addItem(c),s(f,0,c),localStorage.setItem("projects",o(f)),c}v.addEventListener("keyup",(function(e){"Enter"===e.key&&h()})),document.querySelector("#addItemForm").addEventListener("submit",(function(e){e.preventDefault();let t=document.querySelector("#addTitle"),n=document.querySelector("#addDate"),o=document.querySelector("#addDesc"),l=document.querySelector("#addPriority");y(t.value,n.value,o.value,l.value),t.value="",n.value="",o.value=""}));let D=localStorage.getItem("projects");var L;D?(L=D,f=JSON.parse(L).map((e=>function(e){let o=JSON.parse(e),l=o.items.map((e=>function(e){let n=JSON.parse(e),o=t(n.title,n.date,n.description,n.priority);return n.done&&o.toggleDone(),o}(e))),i=n(o.name);return l.forEach((e=>i.addItem(e))),o.open&&i.toggleOpen(),i}(e))),f.forEach((e=>p(f,e))),C(f)&&c(f)):(E("Default Project").toggleOpen(),C(f)&&(c(f),y("example 1","2021-02-01","random description","Medium"),y("example 2","2020-02-01","desc random too","High")),localStorage.setItem("projects",o(f)))})();