var _m=Object.defineProperty;var wc=(n,e)=>{for(var t in e)_m(n,t,{get:e[t],enumerable:!0})};var He={version:"0.0.0",date:"2026-11-08",commit:"bd89b25",dirty:!1,dev:!1};var ws={};wc(ws,{KINDS:()=>Fh,SCHEMA:()=>Cc,SCHEMA_VERSION:()=>wr,SECONDS_PER_DAY:()=>Uh,blendPosition:()=>qi,chunkFor:()=>Ic,decodeBinary:()=>Mi,eclLonLat:()=>ym,eraFromDu:()=>ed,formatTDB:()=>Xa,formatUTC:()=>Mr,galToEcl:()=>Pc,inertialToRot:()=>Tc,instantLagrange:()=>Lc,lab:()=>Hr,littleEndian:()=>Bh,makeContext:()=>Ms,makeHermiteGroup:()=>Tr,makeOrient:()=>Wr,makeSolarEphem:()=>Ar,makeUnits:()=>Ec,mul:()=>wi,nowNodeTdb:()=>Sr,pulsatingAxes:()=>ii,rotAngle:()=>to,rotToInertial:()=>vr,rotateMany:()=>br,rotationAngle:()=>Yi,runGolden:()=>nd,segmentIndex:()=>bi,starAt:()=>Rc,tdbToUnix:()=>ti,toPulsatingPos:()=>Ji,transpose:()=>Yc,unixToTdb:()=>Ac,validateDataset:()=>ni,validateManifest:()=>Er});var Uh=86400;function Ec({length_km:n,time_days:e}){let t=e*86400,i=n/t*1e3;return{length_km:n,time_days:e,time_s:t,velocity_m_s:i,nd_to_km:s=>s*n,km_to_nd:s=>s/n,nd_to_days:s=>s*e,days_to_nd:s=>s/e,nd_to_m_s:s=>s*i,m_s_to_nd:s=>s/i}}function vr(n,e){let[t,i,s,r,a,o]=n,l=Math.cos(e),c=Math.sin(e),u=r-i,d=a+t;return[l*t-c*i,c*t+l*i,s,l*u-c*d,c*u+l*d,o]}function Tc(n,e){let[t,i,s,r,a,o]=n,l=Math.cos(e),c=Math.sin(e),u=l*t+c*i,d=-c*t+l*i,h=l*r+c*a,f=-c*r+l*a;return[u,d,s,h+d,f-u,o]}function qi(n,e,t){let[i,s,r]=n,a=t*e,o=Math.cos(a),l=Math.sin(a);return[o*i-l*s,l*i+o*s,r]}function br(n,e,t){let i=Math.cos(e),s=Math.sin(e);for(let r=0;r<n.length;r+=3){let a=n[r],o=n[r+1];t[r]=i*a-s*o,t[r+1]=s*a+i*o,t[r+2]=n[r+2]}return t}function Yi(n,e){return n/e}function bi(n,e){let t=0,i=n.length;for(;t<i;){let s=t+i>>1;n[s]<=e?t=s+1:i=s}return Math.min(Math.max(t-1,0),n.length-2)}function ti(n,e){let t=e.t,i=e.u;if(!(n>=t[0]&&n<=t[t.length-1]))throw new RangeError("UTC \uD658\uC0B0\uD45C \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01");let s=bi(t,n);return i[s]+(n-t[s])/(t[s+1]-t[s])*(i[s+1]-i[s])}function Sr(n,e){let t=n.u;return e<t[0]?n.t[0]:e>=t[t.length-1]?n.t[t.length-1]:n.t[bi(t,e)]}function Ac(n,e){let t=e.t,i=e.u;if(!(n>=i[0]&&n<=i[i.length-1]))throw new RangeError("UTC \uD658\uC0B0\uD45C \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01");let s=bi(i,n);return t[s]+(n-i[s])/(i[s+1]-i[s])*(t[s+1]-t[s])}function Mr(n){return new Date(Math.floor(n/60)*6e4).toISOString().slice(0,16).replace("T"," ")}function Xa(n){let e=Date.UTC(2e3,0,1,12,0,0);return new Date(e+Math.round(n)*1e3).toISOString().slice(0,19).replace("T"," ")}var Cc="lagrange-web",wr="1.0.0",Fh=["points","vectors","trajectory","ensemble","ephemeris","grid2d","scalars","stars","image","model"],Si=n=>n!==null&&typeof n=="object"&&!Array.isArray(n),ja=n=>parseInt(String(n).split(".")[0],10),Oh=n=>typeof n=="string"&&n.split(".").length===3;function Er(n){let e=[];if(!Si(n))return["manifest \uAC00 \uAC1D\uCCB4\uAC00 \uC544\uB2D8"];n.schema!==Cc&&e.push(`schema \uAC00 ${Cc} \uAC00 \uC544\uB2D8`);let t=n.schema_version;Oh(t)?ja(t)!==ja(wr)&&e.push(`\uC8FC \uBC88\uD638 \uB2E4\uB984 (${t}, \uC77D\uB294 \uCABD ${wr})`):e.push("schema_version \uD615\uC2DD (\uC8FC.\uBD80.\uC218) \uC544\uB2D8");let i=n.constants;if(!Si(i))e.push("constants \uC5C6\uC74C");else for(let r of["mu","length_unit_km","time_unit_days"])typeof i[r]=="number"&&i[r]>0||e.push(`constants.${r} \uAC00 \uC591\uC218\uAC00 \uC544\uB2D8`);let s=n.datasets;if(!Array.isArray(s))e.push("datasets \uAC00 \uBAA9\uB85D\uC774 \uC544\uB2D8");else{let r=s.map(a=>Si(a)?a.id:null);new Set(r).size!==r.length&&e.push("datasets id \uC911\uBCF5");for(let a of s)(!Si(a)||typeof a.id!="string"||typeof a.file!="string")&&e.push("datasets \uD56D\uBAA9\uC5D0 id\xB7file \uC5C6\uC74C")}return e}function ni(n,e){let t=[],i=[];if(!Si(n))return{errors:["\uC790\uB8CC\uAC00 \uAC1D\uCCB4\uAC00 \uC544\uB2D8"],warnings:i};let s=n.schema_version;Oh(s)?ja(s)!==ja(wr)&&t.push(`\uC8FC \uBC88\uD638 \uB2E4\uB984 (${s}, \uC77D\uB294 \uCABD ${wr})`):t.push("schema_version \uD615\uC2DD (\uC8FC.\uBD80.\uC218) \uC544\uB2D8"),typeof n.id!="string"&&t.push("id \uC5C6\uC74C"),Fh.includes(n.kind)||i.push(`\uBAA8\uB974\uB294 kind: ${JSON.stringify(n.kind)}`);let r=n.provenance;if(!Si(r))t.push("provenance \uC5C6\uC74C");else{let a=r.verification;(!Si(a)||!Object.prototype.hasOwnProperty.call(e,a.detail)||e[a.detail].tag!==a.tag)&&t.push("provenance.verification \uC758 tag\xB7detail \uC774 \uAF2C\uB9AC\uD45C \uD45C\uC640 \uB9DE\uC9C0 \uC54A\uC74C"),(!Array.isArray(r.source)||r.source.length===0)&&t.push("provenance.source \uC5C6\uC74C")}if(n.kind==="scalars"){let a=Array.isArray(n.items)?n.items:[null];for(let o of a)(!Si(o)||typeof o.text!="string"||!("provenance"in o))&&t.push("scalars \uD56D\uBAA9\uC5D0 text\xB7provenance \uC5C6\uC74C")}return{errors:t,warnings:i}}function Bh(){return new Uint8Array(new Float64Array([1]).buffer)[7]===63}function Mi(n,e){if(!Bh())throw new Error("\uBE45\uC5D4\uB514\uC5B8 \uAE30\uACC4\uB294 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC74C (\uC790\uB8CC\uB294 float64 \uB9AC\uD2C0\uC5D4\uB514\uC5B8)");let t=n.byteOffset%8===0?n.buffer:n.slice().buffer,i=n.byteOffset%8===0?n.byteOffset:0,s={};for(let[r,{offset:a,shape:o}]of Object.entries(e)){let l=o.reduce((c,u)=>c*u,1);s[r]={data:new Float64Array(t,i+a*8,l),shape:o}}return s}function Tr(n,e,t,i){let s=n.length;function r(a){if(!(a>=n[0]&&a<=n[s-1]))throw new RangeError(`\uBCF4\uAC04 \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01 ${a}`);let o=bi(n,a),l=n[o+1]-n[o],c=(a-n[o])/l,u=c*c,d=c*c*c,h=2*d-3*u+1,f=d-2*u+c,m=-2*d+3*u,v=d-u,p=6*u-6*c,g=3*u-4*c+1,A=-6*u+6*c,C=3*u-2*c,y=[],T=[];for(let b=0;b<i;b++){let w=[0,0,0],x=[0,0,0];for(let M=0;M<3;M++){let L=(o*i+b)*3+M,R=((o+1)*i+b)*3+M,P=e[L],B=e[R],N=t[L]*l,H=t[R]*l;w[M]=h*P+f*N+m*B+v*H,x[M]=(p*P+g*N+A*B+C*H)/l}y.push(w),T.push(x)}return{pos:y,vel:T}}return{evaluate:r,tMin:n[0],tMax:n[s-1],k:i}}var kh=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],zh=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);function ii(n,e,t,i){let s=[t[0]-n[0],t[1]-n[1],t[2]-n[2]],r=[i[0]-e[0],i[1]-e[1],i[2]-e[2]],a=zh(s),o=[s[0]/a,s[1]/a,s[2]/a],l=kh(s,r),c=zh(l),u=[l[0]/c,l[1]/c,l[2]/c],d=kh(u,o);return{x:o,y:d,z:u,d:a,origin:t}}function Ji(n,e){let t=[n[0]-e.origin[0],n[1]-e.origin[1],n[2]-e.origin[2]],i=s=>s[0]*t[0]+s[1]*t[1]+s[2]*t[2];return[i(e.x)/e.d,i(e.y)/e.d,i(e.z)/e.d]}function Rc(n,e){let t=n.dir.data;return{dir:[t[3*e],t[3*e+1],t[3*e+2]],mag:n.mag.data[e],ci:n.ci.data[e],hyg_id:n.hyg_id.data[e]}}function Pc(n,e){return[0,1,2].map(t=>n[t][0]*e[0]+n[t][1]*e[1]+n[t][2]*e[2])}function ym(n){let e=Math.atan2(n[1],n[0])*180/Math.PI;return[e<0?e+360:e,Math.asin(n[2])*180/Math.PI]}function Ic(n,e){let t=n.chunks;if(e<t[0].t_from_tdb_s)return t[0];for(let i of t)if(e<=i.t_to_tdb_s)return i;return t[t.length-1]}function Ar(n,e={}){let t={};function i(s,r){let a=n.chunks.find(l=>l.year===s);if(!a)throw new Error(`\uC870\uAC01 ${s} \uC5C6\uC74C`);let o={};for(let l of n.bodies){let[c,u]=a.index[l.name],d=new Float64Array(u-c+1);for(let h=c;h<=u;h++)d[h-c]=l.t0_tdb_s+h*l.step_s;o[l.name]=Tr(d,r["R_"+l.name].data,r["V_"+l.name].data,1)}t[s]=o}for(let[s,r]of Object.entries(e))i(Number(s),r);return{bodies:n.bodies,range:n.range_tdb_s,chunks:n.chunks,addChunk:i,hasChunk:s=>!!t[s],chunkFor:s=>Ic(n,s),evaluate(s,r,a){let o=a??Ic(n,r).year;if(!t[o])throw new Error(`\uC870\uAC01 ${o} \uB97C \uC544\uC9C1 \uBD88\uB7EC\uC624\uC9C0 \uC54A\uC558\uB2E4`);let l=t[o][s].evaluate(r);return{pos:l.pos[0],vel:l.vel[0]}}}}function Lc(n,e,t,i,s,r){let a=ii(n,e,t,i),o=[r[0]-(1-s),r[1],0];return[0,1,2].map(l=>t[l]+a.d*(a.x[l]*o[0]+a.y[l]*o[1]+a.z[l]*o[2]))}var Hr={};wc(Hr,{Dop853:()=>kr,GELU_C:()=>Lr,brentq:()=>Za,clampToRange:()=>Ur,components:()=>$i,correctedEu:()=>Cr,createRun:()=>zr,efoldState:()=>eo,escapeRun:()=>Gc,fromSliders:()=>Ja,inTrainingRange:()=>Zi,integrateOne:()=>Qa,integrateTo:()=>Ka,jacobi:()=>Ki,labFlags:()=>xs,lnT3:()=>Rr,makeLab:()=>Vr,nextUp:()=>Hc,omega:()=>Fc,positionBound:()=>Pr,predict:()=>vs,predictD24:()=>Ir,predictMLP:()=>Nr,predictMLPSeeds:()=>Dr,predictState:()=>Wc,readForest:()=>Nc,rhs:()=>Fr,rhsDelta:()=>Or,roomFor:()=>Uc,stateOf:()=>qa,toSliders:()=>$a});function $i(n,e){let t=new Array(6);for(let s=0;s<6;s++)t[s]=e[s]-n.s_ref[s];let i=new Array(6);for(let s=0;s<6;s++){let r=0;for(let a=0;a<6;a++)r+=t[a]*n.P_inv[6*s+a];i[s]=r}return i}function qa(n,e){let t=new Array(6);for(let i=0;i<6;i++){let s=0;for(let r=0;r<6;r++)s+=e[r]*n.P[6*i+r];t[i]=n.s_ref[i]+s}return t}function Cr(n,e){let t=n.frame.gamma,i=[e[1]/t,e[2]/t,e[3]/t,e[4]/t,e[5]/t],s=0;for(let r=0;r<5;r++)for(let a=0;a<5;a++)s+=i[r]*n.M[5*r+a]*i[a];return e[0]+t*s}function Dc(n,e,t,i){let{lam:s,w_p:r,w_z:a}=n.frame,o=Math.cos(r*t),l=Math.sin(r*t),c=Math.cos(a*t),u=Math.sin(a*t),d=[e[0]*Math.exp(s*t),e[1]*Math.exp(-s*t),e[2]*o+e[3]*l,-e[2]*l+e[3]*o,e[4]*c+e[5]*u,-e[4]*u+e[5]*c],h=0;for(let f=0;f<3;f++){let m=0;for(let v=0;v<6;v++)m+=d[v]*n.P[6*f+v];h+=m*m}return Math.sqrt(h)-i}function vm(n,e,t,i=60){let s=n.frame.lam,r=Math.log(t/Math.abs(e[0]))/s,a=Math.max(r-.25/s,0),o=r+.25/s,l=Dc(n,e,a,t)<0&&Dc(n,e,o,t)>0;for(let c=0;c<i;c++){let u=.5*(a+o);Dc(n,e,u,t)>0?o=u:a=u}return l?.5*(a+o)*n.frame.time_unit_days:NaN}function Rr(n,e,t){let i=[t,e[1],e[2],e[3],e[4],e[5]];return n.R.map(s=>Math.log(vm(n,i,s)))}function Pr(n,e){let{env_p:t,env_z:i}=n.frame;return Math.abs(e[0])+Math.abs(e[1])+t*Math.hypot(e[2],e[3])+i*Math.hypot(e[4],e[5])}function Zi(n,e){let t=n.frame.gamma,i=n.range,s=Math.abs(e[0])/t;return s>=i.eu_gamma[0]*(1-i.rtol)&&s<=i.eu_gamma[1]*(1+i.rtol)&&Pr(n,e)/t<=i.disp_max_gamma*(1+i.rtol)}var bm=new TextDecoder("utf-8");function Nc(n){let e=n.indexOf(10),t=JSON.parse(bm.decode(n.subarray(0,e)));if(t.\uD615\uC2DD!=="lagrange-forest"||t.\uD310!==1||t.\uC885\uB958!=="RF"||t.\uC232_\uC218!==1)throw new Error("\uBAA8\uB974\uB294 \uC232 \uD615\uC2DD");let i=t.\uCD9C\uB825_\uC218,s=e+1,r=(l,c,u)=>{let d=new u(n.slice(s,s+l*c).buffer);return s+=l*c,d},a=new DataView(n.buffer,n.byteOffset,n.byteLength),o=[];for(let l=0;l<t.\uB098\uBB34_\uC218[0];l++){let c=a.getInt32(s,!0);s+=4;let u=r(c,1,Int8Array),d=r(c,8,Float64Array),h=r(c,4,Int32Array),f=r(c,4,Int32Array),m=0;for(let p=0;p<c;p++)u[p]<0&&m++;let v=r(m*i,8,Float64Array);o.push({F:u,T:d,L:h,R:f,V:v})}if(s!==n.length)throw new Error(`\uC232 \uBC14\uC774\uD2B8\uAC00 ${n.length-s} \uB0A8\uC74C`);return{head:t,trees:o,nOut:i,mean:t.\uD45C\uC900\uD654_\uD3C9\uADE0,std:t.\uD45C\uC900\uD654_\uD45C\uC900\uD3B8\uCC28,residual:!!t.\uC794\uCC28}}function Ya(n,e,t={}){let i=t.float32!==!1,s=new Array(e.length);for(let a=0;a<e.length;a++)s[a]=i?Math.fround(e[a]):e[a];let r=new Array(n.nOut).fill(0);for(let a of n.trees){let o=0;for(;a.F[o]>=0;)o=s[a.F[o]]<=a.T[o]?a.L[o]:a.R[o];let l=a.L[o]*n.nOut;for(let c=0;c<n.nOut;c++)r[c]+=a.V[l+c]}for(let a=0;a<n.nOut;a++)r[a]/=n.trees.length;return r}function Sm(n,e){return e.map((t,i)=>(t-n.mean[i])/n.std[i])}function Ir(n,e,t){let i=Ya(n,Sm(n,e));return n.residual?i.map((s,r)=>t[r]+s):i}var Lr=.7071067690849304,Mm=1.1283791670955126,wm=.5641895835477563;function Em(n){let e=n*n,t=n,i=n;for(let s=1;s<200&&(t*=2*e/(2*s+1),i+=t,!(Math.abs(t)<1e-17*Math.abs(i)));s++);return Mm*Math.exp(-e)*i}function Tm(n){let t=n,i=n,s=0;for(let r=1;r<500;r++){let a=r/2;s=n+a*s,s===0&&(s=1e-300),s=1/s,i=n+a/i,i===0&&(i=1e-300);let o=i*s;if(t*=o,Math.abs(o-1)<1e-17)break}return wm*Math.exp(-n*n)/t}function Am(n){if(Number.isNaN(n))return NaN;let e=Math.abs(n),t;return e<3?t=1-Em(e):t=Tm(e),n<0?2-t:t}function Cm(n,e,t){let i=e.map((o,l)=>(o-n.x_mean[l])/n.x_std[l]);for(let o=0;o<n.W.length;o++){let[l,c]=n.dims[o],u=n.W[o],d=n.b[o],h=new Array(c);for(let f=0;f<c;f++){let m=0;for(let v=0;v<l;v++)m+=i[v]*u[v*c+f];h[f]=m+d[f]}i=h.map(f=>.5*f*Am(-f*t))}let s=i.length,r=n.bo.length,a=new Array(r);for(let o=0;o<r;o++){let l=0;for(let c=0;c<s;c++)l+=i[c]*n.Wo[c*r+o];a[o]=(l+n.bo[o])*n.y_std[o]+n.y_mean[o]}return a}function Dr(n,e){let t=e[0],i=[Math.sign(t),Math.log(Math.abs(t)),...e.slice(1)];return n.seeds.map(s=>Cm(s,i,Lr))}function Nr(n,e){let t=Dr(n,e);return t[0].map((i,s)=>{let r=0;for(let a of t)r+=a[s];return r/t.length})}function Ja(n,e){let t=n.frame.gamma;return[e.sign*e.eu*t,e.es*t,e.ap*t*Math.cos(e.phip),e.ap*t*Math.sin(e.phip),e.az*t*Math.cos(e.phiz),e.az*t*Math.sin(e.phiz)]}function $a(n,e){let t=n.frame.gamma,i=s=>{let r=Math.atan2(s[1],s[0]);return r<0?r+2*Math.PI:r};return{sign:e[0]<0?-1:1,eu:Math.abs(e[0])/t,es:e[1]/t,ap:Math.hypot(e[2],e[3])/t,phip:i([e[2],e[3]]),az:Math.hypot(e[4],e[5])/t,phiz:i([e[4],e[5]])}}function Uc(n,e,t){let{env_p:i,env_z:s}=n.frame,r=n.range.disp_max_gamma,a={eu:e.eu,es:Math.abs(e.es),ap:i*e.ap,az:s*e.az},o=r;for(let[c,u]of Object.entries(a))c!==t&&(o-=u);let l={eu:1,es:1,ap:i,az:s}[t];return Math.max(0,o)/l}function Ur(n,e,t){let i={...e},s=Uc(n,e,t);return t==="eu"?i.eu=Math.min(Math.max(e.eu,n.range.eu_gamma[0]),Math.min(n.range.eu_gamma[1],s)):t==="es"?i.es=Math.sign(e.es)*Math.min(Math.abs(e.es),s):(t==="ap"||t==="az")&&(i[t]=Math.min(e[t],s)),i}function xs(n,e){let t=n.uncertain,i=Dr(n.mlp,e.x),s=i.length,r=e.MLP.map((l,c)=>{let u=0;for(let d of i)u+=(d[c]-l)**2;return Math.sqrt(u/(s-1))}),a=e.MLP.map((l,c)=>Math.abs(l-e.T3[c])>t.factor*t.rmse_log_mlp[c]),o=r.map((l,c)=>l>t.factor*t.spread_median[c]);return{inRange:Zi(n,e.x.slice(0,6)),mismatch:a,spread:o,uncertain:a.map((l,c)=>l||o[c]),seedStd:r,positionBound:Pr(n,e.x.slice(0,6))}}function Vh(n,e,t,i){let s=Math.sqrt((n+i)**2+e**2+t**2),r=Math.sqrt((n-1+i)**2+e**2+t**2);return[s,r]}function Fc(n,e){let[t,i,s]=n,[r,a]=Vh(t,i,s,e);return .5*(t**2+i**2)+(1-e)/r+e/a}function Fr(n,e){let[t,i,s,r,a,o]=n,[l,c]=Vh(t,i,s,e),u=l**3,d=c**3,h=t-(1-e)*(t+e)/u-e*(t-1+e)/d,f=i-(1-e)*i/u-e*i/d,m=-(1-e)*s/u-e*s/d;return[r,a,o,2*a+h,-2*r+f,m]}function Ki(n,e){return 2*Fc(n,e)-(n[3]**2+n[4]**2+n[5]**2)}function Or(n,e,t){let i=new Array(6);for(let s=0;s<6;s++)i[s]=t[s]+n[s];return Fr(i,e)}var Oc=[0,.05260015195876773,.0789002279381516,.1183503419072274,.2816496580927726,.3333333333333333,.25,.3076923076923077,.6512820512820513,.6,.8571428571428571,1,1,.1,.2,.7777777777777778],Hh=[.054293734116568765,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,.3111643669578199,-.1521609496625161,.20136540080403034,.04471061572777259],Gh=[-.18980075407240762,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,-.4226823213237919,-.1521609496625161,.20136540080403034,.02265179219836082,0],Wh=[.01312004499419488,0,0,0,0,-1.2251564463762044,-.4957589496572502,1.6643771824549864,-.35032884874997366,.3341791187130175,.08192320648511571,-.022355307863886294,0],Bc=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.05260015195876773,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.0197250569845379,.0591751709536137,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.02958758547680685,0,.08876275643042054,0,0,0,0,0,0,0,0,0,0,0,0,0],[.2413651341592667,0,-.8845494793282861,.924834003261792,0,0,0,0,0,0,0,0,0,0,0,0],[.037037037037037035,0,0,.17082860872947386,.12546768756682242,0,0,0,0,0,0,0,0,0,0,0],[.037109375,0,0,.17025221101954405,.06021653898045596,-.017578125,0,0,0,0,0,0,0,0,0,0],[.03709200011850479,0,0,.17038392571223998,.10726203044637328,-.015319437748624402,.008273789163814023,0,0,0,0,0,0,0,0,0],[.6241109587160757,0,0,-3.3608926294469414,-.868219346841726,27.59209969944671,20.154067550477894,-43.48988418106996,0,0,0,0,0,0,0,0],[.47766253643826434,0,0,-2.4881146199716677,-.590290826836843,21.230051448181193,15.279233632882423,-33.28821096898486,-.020331201708508627,0,0,0,0,0,0,0],[-.9371424300859873,0,0,5.186372428844064,1.0914373489967295,-8.149787010746927,-18.52006565999696,22.739487099350505,2.4936055526796523,-3.0467644718982196,0,0,0,0,0,0],[2.273310147516538,0,0,-10.53449546673725,-2.0008720582248625,-17.9589318631188,27.94888452941996,-2.8589982771350235,-8.87285693353063,12.360567175794303,.6433927460157636,0,0,0,0,0],[.054293734116568765,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,.3111643669578199,-.1521609496625161,.20136540080403034,.04471061572777259,0,0,0,0],[.056167502283047954,0,0,0,0,0,.25350021021662483,-.2462390374708025,-.12419142326381637,.15329179827876568,.00820105229563469,.007567897660545699,-.008298,0,0,0],[.03183464816350214,0,0,0,0,.028300909672366776,.053541988307438566,-.05492374857139099,0,0,-.00010834732869724932,.0003825710908356584,-.00034046500868740456,.1413124436746325,0,0],[-.42889630158379194,0,0,0,0,-4.697621415361164,7.683421196062599,4.06898981839711,.3567271874552811,0,0,0,-.0013990241651590145,2.9475147891527724,-9.15095847217987,0]],Xh=[[-8.428938276109013,0,0,0,0,.5667149535193777,-3.0689499459498917,2.38466765651207,2.117034582445028,-.871391583777973,2.2404374302607883,.6315787787694688,-.08899033645133331,18.148505520854727,-9.194632392478356,-4.436036387594894],[10.427508642579134,0,0,0,0,242.28349177525817,165.20045171727028,-374.5467547226902,-22.113666853125306,7.733432668472264,-30.674084731089398,-9.332130526430229,15.697238121770845,-31.139403219565178,-9.35292435884448,35.81684148639408],[19.985053242002433,0,0,0,0,-387.0373087493518,-189.17813819516758,527.8081592054236,-11.57390253995963,6.8812326946963,-1.0006050966910838,.7777137798053443,-2.778205752353508,-60.19669523126412,84.32040550667716,11.99229113618279],[-25.69393346270375,0,0,0,0,-154.18974869023643,-231.5293791760455,357.6391179106141,93.40532418362432,-37.45832313645163,104.0996495089623,29.8402934266605,-43.53345659001114,96.32455395918828,-39.17726167561544,-149.72683625798564]];function Za(n,e,t,i,s,r=100){let a=e,o=t,l=0,c=0,u=0,d=0,h=n(a),f=n(o);if(h===0)return a;if(f===0)return o;let m=v=>v<0||Object.is(v,-0);if(m(h)===m(f))throw new Error("brentq: \uAD6C\uAC04 \uB05D\uC758 \uBD80\uD638\uAC00 \uAC19\uB2E4");for(let v=0;v<r;v++){h!==0&&f!==0&&m(h)!==m(f)&&(l=a,c=h,u=d=o-a),Math.abs(c)<Math.abs(f)&&(a=o,o=l,l=a,h=f,f=c,c=h);let p=(i+s*Math.abs(o))/2,g=(l-o)/2;if(f===0||Math.abs(g)<p)return o;if(Math.abs(u)>p&&Math.abs(f)<Math.abs(h)){let A;if(a===l)A=-f*(o-a)/(f-h);else{let C=(h-f)/(a-o),y=(c-f)/(l-o);A=-f*(c*y-h*C)/(y*C*(c-h))}2*Math.abs(A)<Math.min(Math.abs(u),3*Math.abs(g)-p)?(u=d,d=A):(u=g,d=g)}else u=g,d=g;a=o,h=f,Math.abs(d)>p?o+=d:o+=g>0?p:-p,f=n(o)}throw new Error("brentq: \uC218\uB834 \uC548 \uD568")}var qh=.9,Im=.2,Yh=10,Jh=2220446049250313e-31,Br=12,$h=-1/8;function Hc(n){if(Number.isNaN(n)||n===1/0)return n;if(n===0)return Number.MIN_VALUE;let e=new DataView(new ArrayBuffer(8));e.setFloat64(0,n);let t=e.getUint32(0),i=e.getUint32(4);return n>0?i===4294967295?(e.setUint32(0,t+1),e.setUint32(4,0)):e.setUint32(4,i+1):i===0?(e.setUint32(0,t-1),e.setUint32(4,4294967295)):e.setUint32(4,i-1),e.getFloat64(0)}var Vc=n=>{let e=0;for(let t of n)e+=t*t;return Math.sqrt(e)},zc=n=>Vc(n)/n.length**.5;function Lm(n,e,t,i,s,r,a,o,l){let c=t.length,u=Math.abs(i-e);if(u===0)return 0;let d=t.map(C=>l+Math.abs(C)*o),h=zc(t.map((C,y)=>C/d[y])),f=zc(r.map((C,y)=>C/d[y])),m=h<1e-5||f<1e-5?1e-6:.01*h/f;m=Math.min(m,u);let v=new Array(c);for(let C=0;C<c;C++)v[C]=t[C]+m*1*r[C];let p=n(e+m*1,v),g=zc(p.map((C,y)=>(C-r[y])/d[y]))/m,A=f<=1e-15&&g<=1e-15?Math.max(1e-6,m*.001):(.01/Math.max(f,g))**(1/(a+1));return Math.min(100*m,A,u,s)}var kr=class{constructor(e,t,i,s,r,a,o=1/0){this.nfev=0,this.fun=(l,c)=>(this.nfev++,e(l,c)),this.t=t,this.y=i.slice(),this.tBound=s,this.rtol=r,this.atol=a,this.maxStep=o,this.n=i.length,this.status="running",this.tOld=null,this.yOld=null,this.hPrevious=null,this.f=this.fun(this.t,this.y),this.hAbs=Lm(this.fun,this.t,this.y,s,o,this.f,7,r,a),this.Kx=Array.from({length:16},()=>new Array(this.n).fill(0))}_rkStep(e,t,i,s){let r=this.n,a=this.Kx,o=Bc,l=Oc,c=Hh;a[0]=i.slice();for(let h=1;h<Br;h++){let f=new Array(r);for(let m=0;m<r;m++){let v=0;for(let p=0;p<h;p++)v+=a[p][m]*o[h][p];f[m]=t[m]+v*s}a[h]=this.fun(e+l[h]*s,f)}let u=new Array(r);for(let h=0;h<r;h++){let f=0;for(let m=0;m<Br;m++)f+=a[m][h]*c[m];u[h]=t[h]+s*f}let d=this.fun(e+s,u);return a[Br]=d,[u,d]}_errorNorm(e,t){let i=this.n,s=this.Kx,r=new Array(i),a=new Array(i);for(let u=0;u<i;u++){let d=0,h=0;for(let f=0;f<=Br;f++)d+=s[f][u]*Wh[f],h+=s[f][u]*Gh[f];r[u]=d/t[u],a[u]=h/t[u]}let o=Vc(r)**2,l=Vc(a)**2;if(o===0&&l===0)return 0;let c=o+.01*l;return Math.abs(e)*o/Math.sqrt(c*i)}step(){if(this.status!=="running")throw new Error("\uB05D\uB09C \uD480\uC774\uAE30");if(this.t===this.tBound)return this.tOld=this.t,this.status="finished",this.status;let e=this.t,t=this.y,i=10*Math.abs(Hc(e)-e),s=this.hAbs>this.maxStep?this.maxStep:this.hAbs<i?i:this.hAbs,r=!1,a=!1,o,l,c,u;for(;!r;){if(s<i)return this.status="failed",this.message="\uAC78\uC74C\uC774 \uB108\uBB34 \uC791\uC74C",this.status;u=s,c=e+u,c-this.tBound>0&&(c=this.tBound),u=c-e,s=Math.abs(u),[o,l]=this._rkStep(e,t,this.f,u);let d=new Array(this.n);for(let f=0;f<this.n;f++)d[f]=this.atol+Math.max(Math.abs(t[f]),Math.abs(o[f]))*this.rtol;let h=this._errorNorm(u,d);if(h<1){let f=h===0?Yh:Math.min(Yh,qh*h**$h);a&&(f=Math.min(1,f)),s*=f,r=!0}else s*=Math.max(Im,qh*h**$h),a=!0}return this.hPrevious=u,this.yOld=t,this.t=c,this.y=o,this.hAbs=s,this.f=l,this.tOld=e,this.t-this.tBound>=0&&(this.status="finished"),this.status}dense(){let e=this.n,t=this.Kx,i=Bc,s=Oc,r=this.hPrevious,a=this.tOld,o=this.yOld;for(let u=Br+1;u<16;u++){let d=new Array(e);for(let h=0;h<e;h++){let f=0;for(let m=0;m<u;m++)f+=t[m][h]*i[u][m];d[h]=o[h]+f*r}t[u]=this.fun(a+s[u]*r,d)}let l=Array.from({length:7},()=>new Array(e)),c=t[0];for(let u=0;u<e;u++){let d=this.y[u]-o[u];l[0][u]=d,l[1][u]=r*c[u]-d,l[2][u]=2*d-r*(this.f[u]+c[u])}for(let u=0;u<4;u++)for(let d=0;d<e;d++){let h=0;for(let f=0;f<16;f++)h+=Xh[u][f]*t[f][d];l[3+u][d]=r*h}return Dm(a,this.t,o,l)}};function Dm(n,e,t,i){let s=e-n,r=t.length;return a=>{let o=(a-n)/s,l=new Array(r).fill(0);for(let c=0;c<i.length;c++){let u=i[i.length-1-c],d=c%2===0?o:1-o;for(let h=0;h<r;h++)l[h]=(l[h]+u[h])*d}for(let c=0;c<r;c++)l[c]+=t[c];return l}}function zr(n,e,t,i,s,r,a=[],o=null){let l=new kr(n,e,t,i,s,r),c=a.map(v=>v.terminal?1:1/0),u=a.map(()=>0),d=a.map(()=>[]),h=a.map(()=>[]),f=a.map(v=>v.g(e,t)),m={solver:l,tEvents:d,yEvents:h,status:"running",t:e,y:t.slice(),nsteps:0};return m.advance=(v=1/0)=>{for(let p=0;p<v&&m.status==="running";p++){if(l.step(),m.nsteps++,l.status==="failed"){m.status="failed",m.message=l.message;break}let g=l.t,A=l.y,C=l.tOld;if(a.length){let y=a.map(b=>b.g(g,A)),T=[];for(let b=0;b<a.length;b++){let w=f[b]<=0&&y[b]>=0,x=f[b]>=0&&y[b]<=0,M=a[b].direction;(w&&M>0||x&&M<0||(w||x)&&M===0)&&T.push(b)}if(T.length){let b=l.dense();for(let L of T)u[L]++;let w=T.slice(),x=w.map(L=>Za(R=>a[L].g(R,b(R)),C,g,4*Jh,4*Jh)),M=!1;if(w.some(L=>u[L]>=c[L])){let L=x.map((P,B)=>B).sort((P,B)=>x[P]-x[B]);w=L.map(P=>w[P]),x=L.map(P=>x[P]);let R=w.findIndex(P=>u[P]>=c[P]);w=w.slice(0,R+1),x=x.slice(0,R+1),M=!0}w.forEach((L,R)=>{d[L].push(x[R]),h[L].push(b(x[R]))}),M&&(m.status="event",g=x[x.length-1],A=b(g))}f=y}if(o){let y=l.nfev,T=l.dense();l.nfev=y,o(T,C,g)}m.t=g,m.y=A,m.status==="running"&&l.status==="finished"&&(m.status="finished")}return m.nfev=l.nfev,m.status},m}function Ka(n,e,t,i,s,r){let a=zr(n,e,t,i,s,r);if(a.advance(),a.status!=="finished")throw new Error("\uC801\uBD84 \uC2E4\uD328: "+a.message);return{y:a.y,nfev:a.nfev,nsteps:a.nsteps}}var Nm=1,Um=-1;function Fm(n,e,t=2e4,i=12){let s=[n[0],n[1],n[2]],r=0,a=(l,c,u)=>{let d=[c[0]-l[0],c[1]-l[1],c[2]-l[2]],h=[u[0]-l[0],u[1]-l[1],u[2]-l[2]],f=d[0]*d[0]+d[1]*d[1]+d[2]*d[2],m=f>0?Math.min(1,Math.max(0,(h[0]*d[0]+h[1]*d[1]+h[2]*d[2])/f)):0;return Math.hypot(h[0]-m*d[0],h[1]-m*d[1],h[2]-m*d[2])},o=(l,c,u,d,h,f)=>{let m=[.25,.5,.75].some(v=>a(u,h,l(c+v*(d-c)))>e/2);if(m&&f<i){let v=.5*(c+d),p=l(v);o(l,c,u,v,p,f+1),o(l,v,p,d,h,f+1)}else m&&r++,s.push(h[0],h[1],h[2])};return{add(l,c,u){u>c&&o(l,c,l(c),u,l(u),0)},finish(){let l=s.length/3,c=new Uint8Array(l);c[0]=1,c[l-1]=1;let u=p=>[s[3*p],s[3*p+1],s[3*p+2]],d=[[0,l-1]];for(;d.length;){let[p,g]=d.pop(),A=-1,C=0,y=u(p),T=u(g);for(let b=p+1;b<g;b++){let w=a(y,T,u(b));w>C&&(C=w,A=b)}A>=0&&C>e/2&&(c[A]=1,d.push([p,A],[A,g]))}let h=0;for(let p=0;p<l;p++)h+=c[p];let f=h>t?Math.ceil(h/t):1,m=[],v=0;for(let p=0;p<l;p++)c[p]&&((v%f===0||p===l-1)&&m.push(s[3*p],s[3*p+1],s[3*p+2]),v++);return{points:Float64Array.from(m),n_raw:l,n_kept:h,n:m.length/3,capped:f>1,depth_capped:r,tol:e}}}}function Gc(n,e,t={}){let i=[n.x_L2,0,0,0,0,0],s=n.R_over_gamma.map(u=>u*n.gamma),r=s.map((u,d)=>({g:(h,f)=>Math.sqrt(f[0]**2+f[1]**2+f[2]**2)-u,terminal:d===s.length-1,direction:1})),a=e.map((u,d)=>u-i[d]),o=n.t_max_days/n.time_unit_days,l=t.trajTol?Fm(a,t.trajTol,t.trajMax):null,c=zr((u,d)=>Or(d,n.mu,i),0,a,o,n.rtol,n.atol,r,l?(u,d,h)=>l.add(u,d,h):null);return c.tEndNd=o,c.result=()=>{let u=s.map((f,m)=>c.tEvents[m].length?c.tEvents[m][0]*n.time_unit_days:NaN),d=s.map((f,m)=>c.tEvents[m].length?c.yEvents[m][0][0]>0?Nm:Um:0),h={t_days:u,dir:d,nfev:c.solver.nfev,status:c.status,t_reached_days:c.t*n.time_unit_days};return l&&(h.traj=l.finish()),h},c}function Qa(n,e){let t=Gc(n,e);if(t.advance(),t.status==="failed")throw new Error("\uC801\uBD84 \uC2E4\uD328: "+t.message);return t.result()}function eo(n,e,t,i){let s=e.map((o,l)=>o-t[l]),{y:r}=Ka((o,l)=>Or(l,n.mu,t),0,s,i,n.rtol,n.atol),a=r.map((o,l)=>t[l]+o);return{delta:r,jacobi_drift:Ki(a,n.mu)-Ki(e,n.mu)}}var ys=(n,e)=>{if(!n[e])throw new Error(`\uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uC5D0 ${e} \uC5C6\uC74C`);return n[e].data};function Vr(n,e,t=null){if(n.mlp.gelu_c!==Lr)throw new Error(`gelu \uC0C1\uC218\uAC00 \uB2E4\uB974\uB2E4: \uC790\uB8CC ${n.mlp.gelu_c} \uB300 JS ${Lr}`);let i=n.frame_l2,s={frame:i,P:ys(e,"P"),P_inv:ys(e,"P_inv"),s_ref:Array.from(ys(e,"s_ref")),M:ys(e,"M"),R_over_gamma:n.criteria.R_over_gamma,R:n.criteria.R_over_gamma.map(r=>r*i.gamma),labels:n.criteria.labels,range:n.range,uncertain:n.uncertain||null,examples:n.examples||[],sliders:n.sliders||null};return s.mlp={seeds:n.mlp.seeds.map(r=>{let a=[],o=[],l=[];for(let u=0;u<n.mlp.layers;u++){let d=e[`s${r}_W${u}`];a.push(d.data),o.push(ys(e,`s${r}_b${u}`)),l.push(d.shape)}let c=u=>ys(e,`s${r}_${u}`);return{W:a,b:o,dims:l,Wo:c("Wo"),bo:c("bo"),x_mean:c("x_mean"),x_std:c("x_std"),y_mean:c("y_mean"),y_std:c("y_std")}})},s.forest=t?Nc(t):null,s.escapeParams=(r={})=>({mu:i.mu,x_L2:i.x,gamma:i.gamma,R_over_gamma:s.R_over_gamma,time_unit_days:i.time_unit_days,t_max_days:r.t_max_days??n.integrate.t_max_days,rtol:r.rtol??n.integrate.rtol,atol:r.atol??n.integrate.atol}),s}function vs(n,e){let t=Cr(n,e),i=Rr(n,e,t),s=[...e,t];return{eus:t,x:s,inRange:Zi(n,e),T3:i,MLP:Nr(n.mlp,s),D24:n.forest?Ir(n.forest,s,i):null,dirT3:Math.sign(t)}}function Wc(n,e){return vs(n,$i(n,e))}var Zh=n=>n===null?NaN:n,Xc=n=>Math.sqrt(n.reduce((e,t)=>e+t*t,0)),bs={max_err:NaN,failures:[{reason:"\uC2E4\uD5D8\uC2E4 \uC790\uB8CC (m3.lab) \uC5C6\uC74C"}]};function jc(n,e,t){let i=0,s=!1;for(let r=0;r<e.length;r++){let a=n[r],o=Zh(e[r]);if(Number.isNaN(a)||Number.isNaN(o)){Number.isNaN(a)!==Number.isNaN(o)&&(s=!0);continue}i=Math.max(i,Math.abs(a-o))}return{err:i,bad:s||!(i<=t)}}var Kh={m3_eigen(n,e){if(!e.lab)return bs;let t=0,i=0,s=[];for(let r of n.cases){let a=$i(e.lab,r.state),o=Cr(e.lab,a),l=Math.max(...a.map((c,u)=>Math.abs(c-r.E[u])),Math.abs(o-r.eus));t=Math.max(t,l),i=Math.max(i,l/r.tol),l<=r.tol||s.push({state:r.state,err:l,tol:r.tol})}return{max_err:t,max_ratio_to_tol:i,failures:s,measure:"abs (\uC131\uBD84\uB9C8\uB2E4 100 \u03B5 \u2016\u03B4\u2016)"}},m3_t3(n,e){if(!e.lab)return bs;let t=0,i=0,s=[];for(let r of n.cases){let a=Rr(e.lab,r.E,r.eus),o=jc(a,r.lt3,n.tolerance.abs);i+=r.lt3.filter(l=>l===null).length,t=Math.max(t,o.err),o.bad&&s.push({E:r.E,js:a,py:r.lt3})}return{max_err:t,n_nan_expected:i,failures:s,measure:"abs ln \uC77C"}},m3_uncertain(n,e){if(!e.lab)return bs;let t=[],i=0,s=0;for(let r of n.cases){let a=xs(e.lab,vs(e.lab,r.E)),o=Math.max(...a.seedStd.map((c,u)=>Math.abs(c-r.seed_std[u])));i=Math.max(i,o),a.uncertain.some(Boolean)&&s++,(!(a.mismatch.every((c,u)=>c===r.mismatch[u])&&a.spread.every((c,u)=>c===r.spread[u]))||!(o<=n.tolerance.seed_std_abs))&&t.push({E:r.E,js:{mismatch:a.mismatch,spread:a.spread},py:{mismatch:r.mismatch,spread:r.spread},std_err:o})}return{max_err:t.length,max_err_std:i,n_uncertain:s,failures:t,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},m3_range(n,e){if(!e.lab)return bs;let t=[],i=0;for(let s of n.cases){let r=Zi(e.lab,s.E);s.in&&i++,r!==s.in&&t.push({E:s.E,js:r,py:s.in})}return{max_err:t.length,n_in:i,n_out:n.cases.length-i,failures:t,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},m3_d24(n,e){if(!e.lab||!e.lab.forest)return bs;let t=n.tolerance.abs,i=e.lab.forest,s=0,r=0,a=0,o=0,l=0,c=[];for(let u of n.cases)if(u.what==="predict"){let d=jc(Ir(i,u.X,u.lt3),u.lnt,t);s=Math.max(s,d.err),d.bad&&c.push({what:u.what,X:u.X,err:d.err})}else{l++;let d=Ya(i,u.z),h=Ya(i,u.z,{float32:!1}),f=Math.max(...d.map((v,p)=>Math.abs(v-u.out_f32[p])),...h.map((v,p)=>Math.abs(v-u.out_f64[p])));r=Math.max(r,f);let m=d.some((v,p)=>v!==h[p]);m&&a++,u.differs&&o++,(!(f<=t)||m!==u.differs)&&c.push({what:u.what,err:f,js_differs:m,py_differs:u.differs})}return(o===0||a===0)&&c.push({reason:"\uB300\uC870\uAD70\uC774 \uD558\uB098\uB3C4 \uAC08\uB9AC\uC9C0 \uC54A\uC74C \u2014 \uBB38\uD131 \uC704 \uC785\uB825 \uC2DC\uD5D8\uC774 \uBB34\uB825",jsDiffers:a,pyDiffers:o}),{max_err:Math.max(s,r),max_err_predict:s,max_err_probe:r,control:{probes:l,py_differs:o,js_differs:a},failures:c,measure:"abs ln \uC77C"}},m3_mlp(n,e){if(!e.lab)return bs;let t=0,i=[];for(let s of n.cases){let r=jc(Nr(e.lab.mlp,s.X),s.lnt,n.tolerance.abs);t=Math.max(t,r.err),r.bad&&i.push({X:s.X,err:r.err})}return{max_err:t,failures:i,measure:"abs ln \uC77C (\uC2DC\uB4DC 3 \uD3C9\uADE0)"}},m3_cr3bp(n){let e=0,t=[];for(let i of n.cases){let s=Fr(i.state,n.mu),r=Ki(i.state,n.mu),a=Math.max(Xc(s.map((o,l)=>o-i.rhs[l]))/Xc(i.rhs),Math.abs(r-i.jacobi)/Math.abs(i.jacobi));e=Math.max(e,a),a<=n.tolerance.rel||t.push({state:i.state,err:a})}return{max_err:e,failures:t,measure:"rel (\uC6B0\uBCC0 \uBCA1\uD130 \uD06C\uAE30 \uB300\uBE44, \uC57C\uCF54\uBE44)"}},m3_dop853(n){let e={mu:n.mu,x_L2:n.x_L2,gamma:n.gamma,R_over_gamma:n.R_over_gamma,time_unit_days:n.time_unit_days,t_max_days:n.t_max_days,rtol:n.rtol,atol:n.atol},t=0,i=0,s=0,r=0,a=0,o=0,l=0,c=[];for(let u of n.cases){let d=Qa(e,u.state),h=eo(e,u.state,n.s_ref,n.efold_nd),f=Xc(h.delta.map((p,g)=>p-u.delta_efold[g]));r=Math.max(r,f),t=Math.max(t,f/u.L_delta);let m=!(f<=u.L_delta);for(let p=0;p<u.t_days.length;p++){let g=Zh(u.t_days[p]),A=d.t_days[p];if(Number.isNaN(g)&&l++,Number.isNaN(g)||Number.isNaN(A)){Number.isNaN(g)!==Number.isNaN(A)&&(m=!0);continue}let C=Math.abs(A-g);a=Math.max(a,C),i=Math.max(i,C/u.L_t_days[p]),C<=u.L_t_days[p]||(m=!0),d.dir[p]!==u.dir[p]&&(m=!0,o++)}let v=10*Math.max(Math.abs(u.jacobi_drift),u.jacobi_drift_jit_rms);s=Math.max(s,v>0?Math.abs(h.jacobi_drift)/v:h.jacobi_drift===0?0:1/0),Math.abs(h.jacobi_drift)<=v||(m=!0),m&&c.push({eu_gamma:u.eu_gamma,eD:f,L_delta:u.L_delta,t_js:d.t_days,t_py:u.t_days,L_t:u.L_t_days,dir_js:d.dir,dir_py:u.dir,cj_js:h.jacobi_drift,cj_lim:v})}return{max_err:Math.max(t,i,s),ratio_to_line:{delta_efold:t,escape_time:i,jacobi:s},max_abs:{delta_efold:r,escape_time_days:a},direction_mismatch:o,no_escape_entries:l,failures:c,measure:"8-1 \uD310\uC815\uC120 \uB300\uBE44 \uBE44 (\u2264 1 \uC774\uBA74 \uD1B5\uACFC)"}}};var Gr=Math.PI/180,Qh=n=>{let e=Math.cos(n),t=Math.sin(n);return[[1,0,0],[0,e,t],[0,-t,e]]},qc=n=>{let e=Math.cos(n),t=Math.sin(n);return[[e,t,0],[-t,e,0],[0,0,1]]};function wi(n,e){let t=[[0,0,0],[0,0,0],[0,0,0]];for(let i=0;i<3;i++)for(let s=0;s<3;s++)t[i][s]=n[i][0]*e[0][s]+n[i][1]*e[1][s]+n[i][2]*e[2][s];return t}var Yc=n=>[[n[0][0],n[1][0],n[2][0]],[n[0][1],n[1][1],n[2][1]],[n[0][2],n[1][2],n[2][2]]];function ed(n){let e=n-Math.floor(n),t=2*Math.PI*(e+.779057273264+.00273781191135448*n);return t=t%(2*Math.PI),t<0?t+2*Math.PI:t}function to(n,e){let t=0;for(let i=0;i<3;i++)for(let s=0;s<3;s++)t+=(n[i][s]-e[i][s])**2;return Math.sqrt(t/2)}function Wr(n){let e=n._arrays,t=e.t.data,i=e.du.data,s=e.q.data,r=n.orient.earth.eps_arcsec/3600*Gr,a=Qh(r),o=n.orient.moon.coef;function l(d){if(!(d>=t[0]&&d<=t[t.length-1]))throw new RangeError("\uC9C0\uAD6C \uC790\uC138 \uD45C \uBC94\uC704 \uBC16");let h=bi(t,d),f=(d-t[h])/(t[h+1]-t[h]),m=[[0,0,0],[0,0,0],[0,0,0]];for(let p=0;p<3;p++)for(let g=0;g<3;g++){let A=s[9*h+3*p+g],C=s[9*(h+1)+3*p+g];m[p][g]=A+f*(C-A)}let v=i[h]+f*(i[h+1]-i[h]);return wi(wi(a,Yc(m)),qc(-ed(v)))}function c(d){let h=d/86400,f=h/36525,m=o.pole_ra[0]+o.pole_ra[1]*f+o.pole_ra[2]*f*f,v=o.pole_dec[0]+o.pole_dec[1]*f+o.pole_dec[2]*f*f,p=o.pm[0]+o.pm[1]*h+o.pm[2]*h*h;return o.angles.forEach(([g,A],C)=>{let y=(g+A*f)*Gr;m+=o.ra[C]*Math.sin(y),v+=o.dec[C]*Math.cos(y),p+=o.pmt[C]*Math.sin(y)}),[m,v,p]}function u(d){let[h,f,m]=c(d),v=wi(wi(qc(m*Gr),Qh((90-f)*Gr)),qc((90+h)*Gr));return wi(a,Yc(v))}return{earth:l,moon:u,moonAngles:c,range:[t[0],t[t.length-1]]}}var td=(n,e)=>e===0?Math.abs(n-e):Math.abs(n-e)/Math.abs(e),no=n=>Math.sqrt(n.reduce((e,t)=>e+t*t,0)),gn=(n,e)=>no(n.map((t,i)=>t-e[i]));function Ms(n){let e={},t=n["ephem.earth_moon"];t&&t._arrays&&(e.ephem=Tr(t._arrays.t.data,t._arrays.R.data,t._arrays.V.data,t.bodies.length));let i=n["time.utc"];i&&i._arrays&&(e.utc={t:i._arrays.t_tdb_s.data,u:i._arrays.unix_utc_s.data});let s=n["m3.lab"];s&&s._arrays&&(e.lab=Vr(s,s._arrays,s._forest||null));let r=n["m4.ephem"];r&&r._chunks&&(e.solar=Ar(r,r._chunks)),n["m5.stars"]&&n["m5.milkyway"]&&(e.sky={stars:n["m5.stars"],milkyway:n["m5.milkyway"]});let a=n["m4.textures"];return a&&a._arrays&&a.orient&&(e.orient=Wr(a)),e}function Ss(n,e,t){let i=0,s=[];for(let r of n){let{err:a,js:o}=e(r);i=Math.max(i,a),a<=t||s.push({...r,js:o,err:a})}return{max_err:i,failures:s}}var Om={units(n){let e=Ec(n.units);return{...Ss(n.cases,t=>({err:td(e[t.fn](t.in),t.out),js:e[t.fn](t.in)}),n.tolerance.rel),measure:"rel"}},timeline(n){return{...Ss(n.cases,e=>{let t=Yi(e.t_days,n.time_unit_days);return{err:Math.abs(t-e.theta),js:t}},n.tolerance.abs),measure:"abs rad"}},schema(n){let e=[],t=n.cases.find(i=>i.what==="manifest").obj.verification.details;for(let i of n.cases){let s,r;if(i.what==="manifest")s=Er(i.obj).length,r=0;else{let a=ni(i.obj,t);s=a.errors.length,r=a.warnings.length}(s!==i.errors||r!==i.warnings)&&e.push({name:i.name,py:[i.errors,i.warnings],js:[s,r]})}return{max_err:e.length,failures:e,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},frames(n){return{...Ss(n.cases,e=>{let t=vr(e.state,e.theta),i=Tc(e.state,e.theta),s=qi(e.state.slice(0,3),e.theta,e.s),r=no(e.state);return{err:Math.max(gn(t,e.to_inertial),gn(i,e.to_rot),gn(s,e.blend))/r,js:{a:t,b:i,p:s}}},n.tolerance.rel),measure:"rel (\uC0C1\uD0DC \uD06C\uAE30 \uB300\uBE44)"}},interp(n,e){if(!e.ephem)return{max_err:NaN,failures:[{reason:"\uCC9C\uCCB4\uB825 \uC790\uB8CC \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=e.ephem.evaluate(r.t);for(let o=0;o<r.pos.length;o++){let l=gn(a.pos[o],r.pos[o]),c=gn(a.vel[o],r.vel[o]);t=Math.max(t,l),i=Math.max(i,c),l<=n.tolerance.pos_km&&c<=n.tolerance.vel_km_s||s.push({t:r.t,body:o,ep:l,ev:c})}}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},pulsating(n,e){return e.ephem?{...Ss(n.cases,t=>{let i=e.ephem.evaluate(t.t),s=ii(i.pos[0],i.vel[0],i.pos[3],i.vel[3]),r=Ji(i.pos[1],s),a=Ji(i.pos[2],s);return{err:Math.max(gn(r,t.earth)/no(t.earth),gn(a,t.moon)/no(t.moon),td(s.d,t.d_km)),js:{e:r,m:a,d:s.d}}},n.tolerance.rel),measure:"rel"}:{max_err:NaN,failures:[{reason:"\uCC9C\uCCB4\uB825 \uC790\uB8CC \uC5C6\uC74C"}]}},utc(n,e){return e.utc?{...Ss(n.cases,t=>{let i=ti(t.t,e.utc);return{err:Math.abs(i-t.unix),js:i}},n.tolerance.abs_s),measure:"abs s"}:{max_err:NaN,failures:[{reason:"UTC \uD45C \uC5C6\uC74C"}]}},m4_interp(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=e.solar.evaluate(r.body,r.t),o=gn(a.pos,r.pos),l=gn(a.vel,r.vel);t=Math.max(t,o),i=Math.max(i,l),o<=n.tolerance.pos_km&&l<=n.tolerance.vel_km_s||s.push({body:r.body,t:r.t,ep:o,ev:l})}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},m4_chunks(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases)for(let a of r.years){let o=e.solar.evaluate(r.body,r.t,a),l=gn(o.pos,r.pos),c=gn(o.vel,r.vel);t=Math.max(t,l),i=Math.max(i,c),l<=n.tolerance.pos_km&&c<=n.tolerance.vel_km_s||s.push({body:r.body,t:r.t,year:a,ep:l,ev:c})}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},m4_lpoints(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=[];for(let s of n.cases){let r=e.solar.evaluate("sun",s.t),a=e.solar.evaluate("emb",s.t);for(let[o,l]of Object.entries(n.points)){let c=gn(Lc(r.pos,r.vel,a.pos,a.vel,n.mu,l),s.L[o]);t=Math.max(t,c),c<=n.tolerance.pos_km||i.push({t:s.t,point:o,err:c})}}return{max_err:t,failures:i,measure:"pos km"}},m4_orient(n,e){if(!e.orient)return{max_err:NaN,failures:[{reason:"\uC790\uC138 \uC790\uB8CC (m4.textures) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=to(e.orient.earth(r.t),r.earth),o=to(e.orient.moon(r.t),r.moon);t=Math.max(t,a),i=Math.max(i,o),a<=n.tolerance.earth_rad&&o<=n.tolerance.moon_rad||s.push({t:r.t,ee:a,em:o})}return{max_err:t,max_err_moon:i,failures:s,measure:"rad (\uC9C0\uAD6C; \uB2EC\uC740 max_err_moon)"}},m5_sky(n,e){if(!e.sky||!e.sky.stars._arrays)return{max_err:NaN,failures:[{reason:"\uD558\uB298 \uC790\uB8CC (m5.stars\xB7m5.milkyway) \uC5C6\uC74C"}]};let t=e.sky.stars._arrays,i=e.sky.milkyway.gal_to_ecl,s=new Map;for(let l=0;l<t.hyg_id.data.length;l++)s.set(t.hyg_id.data[l],l);let r=0,a=0,o=[];for(let l of n.cases)if(l.what==="star"){let c=s.get(l.hyg_id);if(c===void 0){o.push({name:l.name,reason:"\uC790\uB8CC\uC5D0 \uC5C6\uC74C"});continue}let u=Rc(t,c),d=Math.max(gn(u.dir,l.dir),Math.abs(u.mag-l.mag));r=Math.max(r,d),d<=n.tolerance.star_abs||o.push({name:l.name,err:d})}else{let c=gn(Pc(i,l.gal),l.ecl);a=Math.max(a,c),c<=n.tolerance.rot_abs||o.push({gal:l.gal,err:c})}return{max_err:Math.max(r,a),max_err_star:r,max_err_rot:a,failures:o,measure:"abs (\uB2E8\uC704 \uBCA1\uD130)"}},revolution(n){return{...Ss(n.cases,e=>{let t=n.time_unit_days,i=Yi(e.t0_days,t),s=Yi(e.t1_days,t),r=vr([...n.emb,0,0,0],i),a=vr([...n.emb,0,0,0],s),o=Math.atan2(a[1],a[0])-Math.atan2(r[1],r[0]);return{err:Math.abs(Math.atan2(Math.sin(o),Math.cos(o))),js:{a0:i,a1:s}}},n.tolerance.abs_rad),measure:"abs rad"}}};function nd(n,e={}){return n.map(t=>{let i=Om[t.id]||Kh[t.id];if(!i)return{id:t.id,n:0,failures:[{reason:"JS \uCABD \uB300\uC870 \uD568\uC218 \uC5C6\uC74C"}],max_err:NaN,ok:!1};let s=i(t,e);return{id:t.id,n:t.cases.length,tolerance:t.tolerance,...s,ok:s.failures.length===0}})}var Qi="fetch";async function id(n){let e=`data/${n}`;if(typeof navigator<"u"&&navigator.onLine===!1&&typeof caches<"u"){let i=await caches.match(new URL(e,location.href).href);if(!i)throw new Error(`\uC624\uD504\uB77C\uC778 \u2014 \uB2F4\uC544 \uB454 \uD30C\uC77C\uC774 \uC544\uB2D8: ${n}`);return i}let t=await fetch(e);if(!t.ok)throw new Error(`\uC790\uB8CC\uB97C \uC77D\uC9C0 \uBABB\uD568: ${n} (${t.status})`);return t}async function es(n){return(await id(n)).json()}async function Hn(n){return new Uint8Array(await(await id(n)).arrayBuffer())}var Zc={};wc(Zc,{DICTS:()=>Xr,apply:()=>zt,getLang:()=>Ti,init:()=>Jc,initialLang:()=>ld,onChange:()=>so,pick:()=>Tt,setLang:()=>$c,t:()=>Oe});var sd={"app.title":"\uD0DC\uC591\u2013\uC9C0\uAD6C\uB2EC L2","app.subtitle":"7\uB2E8\uACC4 3D \uC2DC\uAC01\uD654 \xB7 M2 JWST \uCE35","lang.switch":"English","lang.switch_title":"\uC5B8\uC5B4 \uBC14\uAFB8\uAE30","version.commit":"\uCEE4\uBC0B","version.dirty":"\uC218\uC815 \uC911","version.title":"\uBC84\uC804 \xB7 \uBE4C\uB4DC \uB0A0\uC9DC (\uD55C\uAD6D \uC2DC\uAC04) \xB7 \uCEE4\uBC0B","panel.samples":"\uAF2C\uB9AC\uD45C \uC2DC\uD5D8 \uC22B\uC790","panel.samples_note":"\uC22B\uC790\uB97C \uB204\uB974\uBA74 \uCD9C\uCC98 \uCC3D\uC774 \uC5F4\uB9B0\uB2E4. \uAF2C\uB9AC\uD45C\uC5D0 \uB9C8\uC6B0\uC2A4\uB97C \uC62C\uB9AC\uBA74 \uC138\uBD80 \uBD84\uB958\uAC00 \uBCF4\uC778\uB2E4.","tag.weak":"\uC57D\uD568","tag.display_approx":"\uD45C\uC2DC\uC6A9 \uADFC\uC0AC","source.title":"\uCD9C\uCC98","source.value":"\uAC12","source.unit":"\uB2E8\uC704","source.file":"\uD30C\uC77C","source.key":"\uD0A4","source.commit":"\uACC4\uC0B0","source.source_hash":"\uC18C\uC2A4 \uD574\uC2DC (\uC55E 12 \uC790\uB9AC)","source.ref_commit":"\uCC38\uACE0 \uCEE4\uBC0B","source.build":"\uD654\uBA74 \uD310","source.stage":"\uB2E8\uACC4","source.model":"\uBAA8\uB378","source.verification":"\uAC80\uC99D \uAF2C\uB9AC\uD45C","source.note":"\uC124\uBA85","source.close":"\uB2EB\uAE30","source.browser_calc":"\uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0 (Python \uC77C\uCE58 \uD14C\uC2A4\uD2B8 \uD1B5\uACFC, \uD5C8\uC6A9 \uC624\uCC28 {tol})","source.time_scale":"\uC2DC\uAC04 \uCCB4\uACC4","pwa.update":"\uC0C8 \uBC84\uC804 \uC788\uC74C \u2014 \uB2E4\uC2DC \uBD88\uB7EC\uC624\uAE30","pwa.offline_ready":"\uC624\uD504\uB77C\uC778 \uC900\uBE44\uB428","error.load":"\uC790\uB8CC\uB97C \uC77D\uC9C0 \uBABB\uD588\uB2E4: {msg}","error.schema":"\uC790\uB8CC \uD615\uC2DD \uC624\uB958: {msg}","body.sun":"\uD0DC\uC591","body.emb":"EMB (\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC)","body.earth":"\uC9C0\uAD6C","body.moon":"\uB2EC","l2.panel":"L2 \uC7A5\uBA74","l2.mode":"\uC88C\uD45C\uACC4","l2.mode_rot":"\uD68C\uC804 \uC88C\uD45C","l2.mode_inertial":"\uAD00\uC131 \uC88C\uD45C","l2.view":"\uBCF4\uAE30","l2.view_all":"\uC804\uCCB4","l2.view_emb":"\uC9C0\uAD6C\u2013\uB2EC\u2013L1\xB7L2","l2.view_l2":"L2 \uADFC\uCC98","l2.view_l2zoom":"L2 \uD655\uB300","l2.time":"\uC2DC\uAC01","l2.play":"\uC7AC\uC0DD","l2.pause":"\uBA48\uCDA4","l2.speed":"{n} \uC77C/\uCD08","l2.layer_lpoints":"\uB77C\uADF8\uB791\uC8FC \uC810","l2.layer_bodies":"\uD0DC\uC591\xB7EMB","l2.layer_dirs":"L2 \uBD88\uC548\uC815\xB7\uC548\uC815 \uBC29\uD5A5","l2.layer_earthmoon":"\uC9C0\uAD6C\xB7\uB2EC (\uC2E4\uC81C \uCC9C\uCCB4\uB825)","l2.layer_halo":"3-C \uD5E4\uC77C\uB85C \uC871","l2.layer_escape":"3-B \uC774\uD0C8 \uADA4\uC801","l2.layer_burns":"\uC218\uC815 \uC704\uCE58 (3-A\xB73-C\xB74-C)","l2.layer_ref":"4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4","l2.unstable":"\uBD88\uC548\uC815","l2.stable":"\uC548\uC815","l2.halo_main":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4","l2.g_lpoints":"\uB77C\uADF8\uB791\uC8FC \uC810 (1\uB2E8\uACC4)","l2.g_dirs":"L2 \uBC29\uD5A5 (2\uB2E8\uACC4)","l2.g_halo":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4 (3-C)","l2.g_annual":"\uC5F0\uAC04 \u0394v (3-A\xB73-C\xB74-C)","l2.g_ref":"\uAE30\uC900 \uADA4\uB3C4\uC640 \uD5E4\uC77C\uB85C (4-C\xB74-D)","l2.g_escape":"\uC774\uD0C8 \uC2DC\uAC01 (3-B)","l2.g_interp":"\uCC9C\uCCB4\uB825 \uBCF4\uAC04 \uC790\uCCB4 \uC624\uCC28 (4-A)","l2.g_m0":"\uAF2C\uB9AC\uD45C \uC2DC\uD5D8 \uC22B\uC790 (M0)","l2.legend_markers":"\uD45C\uC9C0 \uD06C\uAE30\xB7\uD654\uC0B4 \uAE38\uC774\uB294 \uC2E4\uC81C \uD06C\uAE30\uAC00 \uC544\uB2D8 (\uD45C\uC2DC\uC6A9). \uC22B\uC790\uB97C \uB204\uB974\uBA74 \uCD9C\uCC98 \uCC3D.","l2.legend_pulsating":"\uC9C0\uAD6C\xB7\uB2EC: \uC2E4\uC81C \uCC9C\uCCB4\uB825 (DE441) \uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C \u2014 \uAE38\uC774 \uB2E8\uC704 = \uADF8 \uC21C\uAC04\uC758 \uD0DC\uC591\u2013EMB \uAC70\uB9AC. 4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4\uB3C4 \uAC19\uC740 \uC88C\uD45C.","l2.legend_inertial":"\uAD00\uC131 \uC88C\uD45C: x \uCD95 = \uD669\uB3C4 J2000 X, z \uCD95 = \uADA4\uB3C4\uBA74 \uBC95\uC120 (\u2248 \uD669\uB3C4 \uBD81\uADF9). CR3BP \uD68C\uC804\uC88C\uD45C\uB97C \u03B8 = \u03B8\u2080 + (t \u2212 2026-01-01 TDB)/\uC2DC\uAC04 \uB2E8\uC704 \uB9CC\uD07C \uB3CC\uB9B0 \uAC83 (\u03B8\u2080 = \uADF8\uB0A0 EMB \uC758 \uD669\uACBD).","source.browser":"\uACC4\uC0B0 \uC704\uCE58","l2.escape_rule":"\uD45C\uC2DC\uC6A9\uC73C\uB85C \uACE0\uB978 \uC608 (\uADDC\uCE59: e_u* \uBD80\uD638\uB9C8\uB2E4 |e_u*|/\u03B3 \uAC00 1e-9\xB71e-7\xB71e-5 \uC5D0 \uAC00\uC7A5 \uAC00\uAE4C\uC6B4 \uC8FC \uD45C\uBCF8 \uD558\uB098\uC529, 0.316\u03B3 \uC774\uD0C8\xB7\uC7A1\uC74C \uC9C0\uBC30 \uD45C\uBCF8 \uC81C\uC678)","panel.open":"\uD328\uB110 \uD3B4\uAE30","panel.close":"\uD328\uB110 \uC811\uAE30","ui.layers":"\uB808\uC774\uC5B4","ui.legend":"\uBC94\uB840","ui.numbers":"\uBAA8\uB4E0 \uC22B\uC790","ui.menu":"\uBA54\uB274","card.sphere_note":"\uAD6C\uB294 \uBCF4\uC774\uAC8C \uD0A4\uC6CC \uADF8\uB838\uB2E4 (\uC2E4\uC81C \uBC18\uC9C0\uB984: Horizons \uBA38\uB9AC\uB9D0)","card.no_numbers":"\uC774 \uCC9C\uCCB4\uC5D0 \uB538\uB9B0 \uACB0\uACFC \uC22B\uC790\uB294 \uC544\uC9C1 \uC5C6\uB2E4","l2.family_all":"\uD5E4\uC77C\uB85C \uC871 \uC804\uCCB4 \uBCF4\uAE30 (\uAE30\uBCF8\uC740 \uC77C\uBD80\uB9CC)","l2.legend_spheres":"\uD0DC\uC591\xB7\uC9C0\uAD6C\xB7\uB2EC\uC740 \uD06C\uAE30 \uC788\uB294 \uAD6C \u2014 \uC791\uC73C\uBA74 \uBCF4\uC774\uAC8C \uD0A4\uC6B4\uB2E4","tag.short_impl":"\uAD6C\uD604","tag.short_external":"\uC678\uBD80","tag.short_physical":"\uBB3C\uB9AC","preset.clean":"\uAE54\uB054","preset.explore":"\uD0D0\uC0C9","preset.research":"\uC5F0\uAD6C","preset.custom":"\uC0AC\uC6A9\uC790 \uC124\uC815","preset.zooming":"\uD655\uB300 \uC911","layer.g_bodies":"\uCC9C\uCCB4\xB7\uC810","layer.g_orbits":"\uADA4\uB3C4\xB7\uADA4\uC801","layer.g_numbers":"\uBB3C\uB9AC \uC218\uCE58\xB7\uAF2C\uB9AC\uD45C","layer.g_aux":"\uBCF4\uC870","layer.sun":"\uD0DC\uC591","layer.earth":"\uC9C0\uAD6C","layer.moon":"\uB2EC","layer.emb":"EMB (\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC)","layer.lpoints":"L1 ~ L5","layer.halo_main":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4","layer.halo_family":"\uD5E4\uC77C\uB85C \uC871","layer.escape":"3-B \uC774\uD0C8 \uADA4\uC801","layer.ref":"4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4","layer.burns":"\uC218\uC815 (\u0394v) \uC704\uCE58","layer.moon_orbit":"\uB2EC \uADA4\uB3C4 (\uC9C0\uB09C 30 \uC77C \uC790\uCDE8)","layer.dirs":"L2 \uBC29\uD5A5\uC120 (\uBD88\uC548\uC815\xB7\uC548\uC815)","layer.n_distance":"\uAC70\uB9AC","layer.n_period":"\uC8FC\uAE30","layer.n_angle":"\uBC29\uD5A5 \uAC01\uB3C4","layer.n_annual":"\uC5F0\uAC04 \u0394v","layer.n_escape":"\uC774\uD0C8 \uC2DC\uAC01","layer.n_tags":"\uAC80\uC99D \uAF2C\uB9AC\uD45C","layer.labels":"\uC774\uB984\uD45C","layer.scale":"\uAC70\uB9AC \uB208\uAE08","layer.grid":"\uAE30\uC900 \uD3C9\uBA74 \uACA9\uC790 (\uADA4\uB3C4\uBA74)","layer.axes":"\uC88C\uD45C\uCD95","layer.tags_note":"\uAF2C\uB9AC\uD45C\uB97C \uB044\uBA74 \uC22B\uC790\uB3C4 \uBAA8\uB450 \uC228\uB294\uB2E4 \u2014 \uC22B\uC790\uB294 \uC5B8\uC81C\uB098 \uAF2C\uB9AC\uD45C\uC640 \uD568\uAED8","key.labels":"\uC774\uB984\uD45C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_orbits":"\uADA4\uB3C4\xB7\uADA4\uC801 \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_numbers":"\uBB3C\uB9AC \uC218\uCE58\xB7\uAF2C\uB9AC\uD45C \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_bodies":"\uCC9C\uCCB4\xB7\uC810 \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.grid":"\uAE30\uC900 \uD3C9\uBA74 \uACA9\uC790","key.p_clean":"\uD504\uB9AC\uC14B: \uAE54\uB054","key.p_explore":"\uD504\uB9AC\uC14B: \uD0D0\uC0C9","key.p_research":"\uD504\uB9AC\uC14B: \uC5F0\uAD6C","key.help":"\uC774 \uB3C4\uC6C0\uB9D0","help.title":"\uB2E8\uCD95\uD0A4","help.button":"\uB2E8\uCD95\uD0A4 (?)","help.note":"\uB808\uC774\uC5B4 \uB2E8\uCD95\uD0A4\uB294 \uB9C9\uB300\uB97C \uAEBC\uB0B4\uC9C0 \uC54A\uB294\uB2E4. Esc = \uB9C9\uB300 \uC228\uAE30\uAE30. \uCF20 \uC0C1\uD0DC\uB294 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uAE30\uC5B5\uB41C\uB2E4.","help.keys_line":"L \uC774\uB984\uD45C \xB7 O \uADA4\uB3C4 \xB7 N \uC218\uCE58 \xB7 1 2 3 \uD504\uB9AC\uC14B","time.start":"\uCC98\uC74C\uC73C\uB85C","time.now":"\uD604\uC7AC","card.numbers_off":"\uCF1C\uC9C4 \uC218\uCE58 \uB808\uC774\uC5B4\uAC00 \uC5C6\uC5B4 \uC22B\uC790\uB97C \uC228\uACBC\uB2E4 (\uB808\uC774\uC5B4 \u2192 \uBB3C\uB9AC \uC218\uCE58)","desc.Sun":"\uD0DC\uC591. CR3BP \uC758 \uD070 \uC9C8\uB7C9 (\uCCAB\uC9F8 \uCC9C\uCCB4).","desc.EMB":"\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC. CR3BP \uC758 \uB458\uC9F8 \uCC9C\uCCB4 (\uC9C0\uAD6C\uC640 \uB2EC\uC744 \uD55C \uC810\uC73C\uB85C \uBCF8 \uAC83).","desc.Earth":"\uC9C0\uAD6C. \uC2E4\uC81C \uCC9C\uCCB4\uB825 (DE441) \uC704\uCE58\uB97C \uB9E5\uB3D9 \uC88C\uD45C\uB85C \uADF8\uB838\uB2E4. \uB0AE\xB7\uBC24 \uACBD\uACC4\uB294 \uD587\uBE5B \uBC29\uD5A5.","desc.Moon":`\uB2EC. \uC2E4\uC81C \uCC9C\uCCB4\uB825 \uC704\uCE58. \uB4A4\uC758 \uAF2C\uB9AC\uB294 \uC9C0\uB09C \uC790\uCDE8 (\uB4A4\uB85C \uAC08\uC218\uB85D \uD750\uB9BC). \uD45C\uBA74 \uADF8\uB9BC: NASA SVS CGI Moon Kit (LRO LROC, \uACF5\uACF5 \uC601\uC5ED \u2014 \uCD9C\uCC98 "NASA's Scientific Visualization Studio"). \uADF8\uB9BC \uBC29\uD5A5\uC740 \uD45C\uC2DC\uC6A9 \uADFC\uC0AC (\uD3C9\uADE0 \uC9C0\uAD6C \uCABD \uBA74\uC744 \uC9C0\uAD6C \uCABD\uC73C\uB85C, \uCE6D\uB3D9 \uC5C6\uC74C).`,"desc.L1":"\uD0DC\uC591 \uCABD \uB77C\uADF8\uB791\uC8FC \uC810 (CR3BP \uD3C9\uD615\uC810, 1\uB2E8\uACC4). \uBD88\uC548\uC815 \u2014 \uC774 \uC5F0\uAD6C\uC5D0\uC11C \uC9C1\uC811 \uACC4\uC0B0\uD558\uC9C0\uB294 \uC54A\uC558\uB2E4 (\uACF5\uC120 \uD3C9\uD615\uC810\uC774 \uBD88\uC548\uC815\uD558\uB2E4\uB294 \uC11C\uC220\uC758 \uCABD\uC218\uB294 \uD655\uC778 \uD544\uC694).","desc.L2":"\uC774 \uC5F0\uAD6C\uC758 \uB300\uC0C1. \uD0DC\uC591 \uBC18\uB300\uCABD \uD3C9\uD615\uC810 \u2014 \uBD88\uC548\uC815\uD574\uC11C \uADA4\uB3C4 \uC720\uC9C0 (\u0394v) \uAC00 \uD544\uC694\uD558\uB2E4.","desc.L3":"\uD0DC\uC591 \uB108\uBA38 \uBC18\uB300\uD3B8\uC758 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC548\uC815\uC131\uC740 \uC774 \uC5F0\uAD6C\uC5D0\uC11C \uACC4\uC0B0\uD558\uC9C0 \uC54A\uC558\uB2E4 (\uD655\uC778 \uD544\uC694).","desc.L4":"\uC55E\uC11C\uAC00\uB294 \uC0BC\uAC01 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC120\uD615 \uC548\uC815 \u2014 1\uB2E8\uACC4 Routh \uD310\uC815 (\u03BC \uAC00 \uC784\uACC4 \uC9C8\uB7C9\uBE44 (Sicardy 2010) \uBCF4\uB2E4 \uD6E8\uC52C \uC791\uC74C, \uAD6C\uD604 \uAC80\uC99D \u2014 \uBB38\uD5CC \uB300\uC870).","desc.L5":"\uB4A4\uB530\uB974\uB294 \uC0BC\uAC01 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC120\uD615 \uC548\uC815 \u2014 1\uB2E8\uACC4 Routh \uD310\uC815 (L4 \uC640 \uAC19\uC74C).","desc.halo_main":"3-C \uC5D0\uC11C \uB9CC\uB4E0 \uD5E4\uC77C\uB85C \uADA4\uB3C4 \uC871\uC758 \uC8FC \uADA4\uB3C4 \u2014 \uADA4\uB3C4 \uC720\uC9C0 \uACC4\uC0B0\uC758 \uAE30\uC900.","l2.view_jwst":"JWST","l2.layer_jwst":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","l2.layer_jwst_ext":"JWST \uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC \uBE44\uAD50","l2.layer_jwst_phys":"JWST \uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC \uBE44\uAD50","l2.legend_jwst":"JWST (\uAE08\uBE5B): \uC810 = \uBC1B\uC740 \uC810 (\uD558\uB8E8 \uAC04\uACA9), \uC810\uC120 = \uADF8 \uC0AC\uC774 \uBCF4\uAC04 (4-A \uC5D0\uB974\uBBF8\uD2B8), \uC2E4\uC120 = 10 \uBD84 \uAC04\uACA9 \uBC1B\uC740 \uC810. \uC608\uCE21: \uC8FC\uD669 = JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (\uC678\uBD80 \uB300\uC870), \uCD08\uB85D = \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (\uBB3C\uB9AC \uAC80\uC99D), \uC9C4\uD55C \uC120 = \uBE44\uAD50 \uB300\uC0C1, \uC605\uC740 \uC120 = \uB0B4 \uBAA8\uD615","layer.jwst":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","layer.jwst_ext":"\uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (\uC678\uBD80 \uB300\uC870)","layer.jwst_phys":"\uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (\uBB3C\uB9AC \uAC80\uC99D)","layer.n_jwst":"\uC608\uCE21 \uC624\uCC28","body.jwst":"JWST","desc.JWST":"\uC81C\uC784\uC2A4 \uC6F9 \uC6B0\uC8FC\uB9DD\uC6D0\uACBD. \uAE08\uBE5B \uC120 = \uC7AC\uAD6C\uC131\uD55C \uC2E4\uC81C \uBE44\uD589 \uADA4\uC801 (Horizons, 4-A \uC790\uB8CC): \uC810 = \uBC1B\uC740 \uC810 (\uD558\uB8E8 \uAC04\uACA9), \uC810\uC120 = \uD558\uB8E8 \uB9C8\uB514 \uC0AC\uC774 \uBCF4\uAC04, \uC2E4\uC120 = 10 \uBD84 \uAC04\uACA9 \uBC1B\uC740 \uC810. \uD45C\uC9C0 = \uC7AC\uAD6C\uC131 \uB05D. \uC544\uB798\uB294 5\uB2E8\uACC4 \uC608\uCE21\uC758 \uB450 \uBE44\uAD50 \u2014 \uAF2C\uB9AC\uD45C\uAC00 \uB2E4\uB974\uB2E4.","desc.jwst_period":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801\uC758 \uD55C \uBC14\uD034 \uAE38\uC774\uB97C NASA \uC6D0\uBB38, \uAC19\uC740 \uD06C\uAE30\uC758 CR3BP \uD5E4\uC77C\uB85C\uC640 \uBE44\uAD50\uD55C\uB2E4.","jwst.orbit_label":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","jwst.layer_ext_short":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC \uBE44\uAD50","jwst.layer_phys_short":"\uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC \uBE44\uAD50","jwst.layer_ext":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50","jwst.layer_phys":"\uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50","jwst.rep_5d":"5 \uC77C","jwst.axis_note":"\uC138\uB85C = \uC704\uCE58 \uCC28 (km, \uB85C\uADF8), \uAC00\uB85C = \uC2DC\uC791 \uB4A4 (\uC77C). \uC810 = results/stage5.json \uC5D0 \uC801\uD78C \uAC12","jwst.period_button":"\uC8FC\uAE30 \uC124\uBA85 \uCE74\uB4DC \uC5F4\uAE30","jwst.period_title":"JWST \uC8FC\uAE30 \u2014 \uC7AC\uAD6C\uC131 \uB300 NASA\xB7\uD5E4\uC77C\uB85C","jwst.period_class":"\uBD84\uB958","jwst.no_predictions":"\uC608\uCE21 \uC790\uB8CC\uAC00 \uC5C6\uB2E4","jwst.g_ext":"JWST \uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (5\uB2E8\uACC4)","jwst.g_phys":"JWST \uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (5\uB2E8\uACC4)","jwst.g_period":"JWST \uC8FC\uAE30 (4-A)","l2.view_jwstzoom":"JWST \uD655\uB300","l2.legend_jwstzoom":"JWST \uD655\uB300 (\uC608\uCE21 \uB05D \uB458\uB808 \uC218\uC2ED km): \uD070 \uC810 = \uAC19\uC740 \uC2DC\uAC01\uC758 \uC810, \uD770 \uC120\uBD84 = \uADF8 \uB458 \uC0AC\uC774 \uC704\uCE58 \uCC28 (\uC22B\uC790\uB294 Python \uAC12\uACFC \uAF2C\uB9AC\uD45C). \uC120\uC740 \uC800\uC7A5\uD55C \uC810 (1 \uC2DC\uAC04 \uAC04\uACA9, JPL 01U \uB294 \uD558\uB8E8 \uAC04\uACA9) \uC744 \uACE7\uAC8C \uC774\uC74C. \uADF8\uB9AC\uB294 \uC704\uCE58\uB294 \uB9E5\uB3D9 \uC88C\uD45C\uB77C \uC2E4\uC81C \uAC70\uB9AC\uC640 1 % \uC548\uC5D0\uC11C \uB2E4\uB974\uB2E4","jwst.marker_fixed":"{date} \uC704\uCE58 (\uACE0\uC815)","jwst.zoom_phys":"\uD655\uB300\uD574\uC11C \uBCF4\uAE30 \u2014 \uB300\uD45C 5 \uC77C \uC9C0\uC810 (\uC138 \uC120)","jwst.zoom_ext":"\uD655\uB300\uD574\uC11C \uBCF4\uAE30 \u2014 \uCC3D \uB05D:","jwst.zoom_focus_R5":"JWST \uD655\uB300 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50, \uB300\uD45C 5 \uC77C \uC9C0\uC810","jwst.zoom_focus_A":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D A \uB05D","jwst.zoom_focus_B":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D B \uB05D","jwst.zoom_focus_C":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D C \uB05D","jwst.zoom_norecon":"\uC2E4\uC81C \uADA4\uC801 \uC790\uB8CC \uC5C6\uC74C (2026-10-05 \uC774\uD6C4)","jwst.zl_recon":"\uC7AC\uAD6C\uC131 \uADA4\uC801 (03U)","jwst.zl_mine_kB":"\uB0B4 \uBAA8\uD615 (k_B)","jwst.zl_jpl01U":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21 (01U)","jwst.zl_jpl":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21","jwst.gap_mine_recon":"\uB0B4 \uBAA8\uD615 \u2194 \uC7AC\uAD6C\uC131","jwst.gap_jpl_recon":"JPL \u2194 \uC7AC\uAD6C\uC131","jwst.gap_mine_jpl":"\uB0B4 \uBAA8\uD615 \u2194 JPL","source.join":"\uC7AC\uAD6C\uC131 \uADA4\uC801 \uC774\uC74C","l2.view_lab":"\uC2E4\uD5D8\uC2E4","lab.title":"\uC2E4\uD5D8\uC2E4 \u2014 L2 \uADFC\uCC98 \uCD08\uAE30 \uC0C1\uD0DC\uC758 \uC774\uD0C8","lab.scope":"CR3BP \uBAA8\uD615 \uC548\uC758 \uACB0\uACFC (\uAD6C\uD604 \uAC80\uC99D \uC131\uACA9 \u2014 \uBB3C\uB9AC \uAC80\uC99D \uC544\uB2D8). \uC22B\uC790\uB294 \uBAA8\uB450 \uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0 (Python \uC77C\uCE58 \uC2DC\uD5D8 \uD1B5\uACFC)","lab.fold":"\uC811\uAE30","lab.unfold":"\uD3BC\uCE58\uAE30","lab.loading":"\uC2E4\uD5D8\uC2E4 \uC790\uB8CC \uBD88\uB7EC\uC624\uB294 \uC911\u2026 (\uCC98\uC74C \uD55C \uBC88, \uC57D 17 MB)","lab.examples":"\uC608\uC2DC","lab.ex_q10":"\uBE60\uB978 \uC774\uD0C8 (10 %)","lab.ex_q50":"\uC911\uAC04 (50 %)","lab.ex_q90":"\uB290\uB9B0 \uC774\uD0C8 (90 %)","lab.ex_out":"\uBC94\uC704 \uBC16 \uC2DC\uC5F0","lab.ex_noise":"\uC7A1\uC74C \uBC14\uB2E5 \uADFC\uCC98","lab.ex_src":"\uC608\uC2DC \uCD9C\uCC98: {src} (3-B \uD45C\uBCF8 \uBC88\uD638 {no})","lab.s_sign":"e_u \uBD80\uD638","lab.s_eu":"|e_u| (\uBD88\uC548\uC815)","lab.s_es":"e_s (\uC548\uC815)","lab.s_ap":"\uBA74\uB0B4 \uC9C4\uD3ED A_p","lab.s_phip":"\uBA74\uB0B4 \uC704\uC0C1","lab.s_az":"\uBA74\uC678 \uC9C4\uD3ED A_z","lab.s_phiz":"\uBA74\uC678 \uC704\uC0C1","lab.sign_out":"+ \uBC14\uAE65\uCABD","lab.sign_in":"\u2212 \uC9C0\uAD6C \uCABD","lab.outside":"\uBC94\uC704 \uBC16 \uD5C8\uC6A9 (\uC678\uC0BD \u2014 \uC5F0\uAD6C \uD504\uB9AC\uC14B\uB9CC)","lab.col_r":"\uAE30\uC900 R","lab.col_truth":"\uC815\uB2F5 [\uC77C]","lab.col_t3":"T3 [\uC77C]","lab.col_d24":"D24 [\uC77C]","lab.col_mlp":"MLP-C_ln [\uC77C]","lab.col_hybrid":"\uD558\uC774\uBE0C\uB9AC\uB4DC [\uC77C] \u2014 \uD310\uC815: \uAE30\uAC01","lab.col_dt3":"T3 \uCC28 \u0394ln t","lab.col_dd24":"D24 \uCC28 \u0394ln t","lab.col_dmlp":"MLP \uCC28 \u0394ln t","lab.col_dir":"\uBC29\uD5A5 (e_u*)","lab.col_flag":"\uC2E0\uB8B0\uB3C4","lab.flag_extrap":"\uC678\uC0BD","lab.flag_unc":"\uBD88\uD655\uC2E4","lab.flag_unc_mismatch":"MLP-C_ln \uACFC T3 \uC758 \uCC28\uAC00 \uAC80\uC99D RMSE_log \uC758 3 \uBC30\uB97C \uB118\uC74C (\uC0AC\uC804 \uB4F1\uB85D 5\uC808)","lab.flag_unc_spread":"MLP \uC2DC\uB4DC 3 \uAC1C\uC758 \uD37C\uC9D0\uC774 \uAC80\uC99D \uC911\uC559\uAC12\uC758 3 \uBC30\uB97C \uB118\uC74C (\uC0AC\uC804 \uB4F1\uB85D 5\uC808)","lab.extrap_long":"\uC678\uC0BD \u2014 \uC2E0\uB8B0\uD558\uC9C0 \uC54A\uC74C (\uD559\uC2B5 \uBC94\uC704 \uBC16)","lab.no_escape":"\uBBF8\uC774\uD0C8","lab.dir_hit":"\uB9DE\uC74C","lab.dir_miss":"\uD2C0\uB9BC","lab.waiting":"\uC190\uC744 \uB193\uC73C\uBA74 \uC815\uB2F5 \uC801\uBD84 \uC2DC\uC791","lab.integrating":"\uC815\uB2F5 \uC801\uBD84 \uC911 (Worker)\u2026","lab.integrating_days":"\uC815\uB2F5 \uC801\uBD84 \uC911 \u2014 {d} \uC77C","lab.done":"\uC815\uB2F5 \uC801\uBD84 \uB05D ({ms} ms, \uADA4\uC801 \uC810 {n} \uAC1C)","lab.error":"\uC624\uB958: {msg}","lab.hybrid_note":"\uD558\uC774\uBE0C\uB9AC\uB4DC = T3\xB7D24 \uB97C R \uB9C8\uB2E4 \uC774\uC5B4 \uBD99\uC778 \uAC83 \u2014 \uBB34\uAC8C w_R 6 \uAC1C\uAC00 \uBAA8\uB450 0 \uC774\uB77C D24 \uC640 \uAC19\uB2E4. \uC0AC\uC804 \uB4F1\uB85D \uD310\uC815 (H): \uAE30\uAC01 (\uAD6C\uC870\uC801), \uC794\uCC28 \uBAA8\uB378 \uD310\uC815 (R): \uC9C0\uC9C0. ","lab.foot":"T3 = \uC120\uD615 \uC774\uB860 + 2\uCC28 \uBCF4\uC815 e_u*, D24 = T3 + RF \uC794\uCC28 (50 \uADF8\uB8E8), MLP-C_ln = \uC2E0\uACBD\uB9DD \uC2DC\uB4DC 3 \uD3C9\uADE0. \uC815\uB2F5 = DOP853 \uC801\uBD84 (rtol 1e-12, \uCD5C\uB300 730.5 \uC77C, 0.316\u03B3 \uC5D0\uC11C \uBA48\uCDA4). \u0394ln t = \uC608\uCE21 \u2212 \uC815\uB2F5.","lab.mobile_note":"\uC2E4\uD5D8\uC2E4\uC740 \uCEF4\uD4E8\uD130\uC5D0\uC11C \uC774\uC6A9\uD574 \uC8FC\uC138\uC694. \uD734\uB300\uD3F0 \uD654\uBA74\uC5D0\uC11C\uB294 \uC2AC\uB77C\uC774\uB354\uC640 \uACB0\uACFC \uD45C\uAC00 \uC881\uC544 \uCD08\uAE30 \uC0C1\uD0DC\uB97C \uC815\uD655\uD788 \uB193\uAE30 \uC5B4\uB835\uC2B5\uB2C8\uB2E4. (\uC548\uB0B4 \uBB38\uAD6C \uCD08\uC548 \u2014 \uC0AC\uC6A9\uC790 \uD655\uC778 \uB300\uAE30)","time.go":"\uC774\uB3D9","time.out_of_range":"\uC790\uB8CC \uAE30\uAC04 \uBC16 (2022-01-01 ~ 2049-12-31)","time.loading":"\uCC9C\uCCB4\uB825 \uBD88\uB7EC\uC624\uB294 \uC911\u2026","l2.view_solar":"\uD0DC\uC591\uACC4","body.mercury":"\uC218\uC131\uACC4","body.venus":"\uAE08\uC131\uACC4","body.mars":"\uD654\uC131\uACC4","body.jupiter":"\uBAA9\uC131\uACC4","body.saturn":"\uD1A0\uC131\uACC4","body.uranus":"\uCC9C\uC655\uC131\uACC4","body.neptune":"\uD574\uC655\uC131\uACC4","desc.Mercury":"\uC218\uC131 (\uD589\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC \u2014 \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 12 \uC2DC\uAC04 \uAC04\uACA9) \uBCF4\uAC04\uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C.","desc.Venus":"\uAE08\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 2 \uC77C \uAC04\uACA9) \uBCF4\uAC04\uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C.","desc.Mars":"\uD654\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 4 \uC77C \uAC04\uACA9).","desc.Jupiter":"\uBAA9\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 16 \uC77C \uAC04\uACA9).","desc.Saturn":"\uD1A0\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","desc.Uranus":"\uCC9C\uC655\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","desc.Neptune":"\uD574\uC655\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","view.true_size":"\uC2E4\uC81C \uD06C\uAE30","view.true_size_title":"\uCC9C\uCCB4 \uD06C\uAE30 \uACFC\uC7A5 (\uD654\uBA74\uC5D0\uC11C \uC791\uC73C\uBA74 \uD0A4\uC6C0 \u2014 \uD45C\uC2DC\uC6A9 \uADFC\uC0AC) \uB044\uAE30","layer.planets":"\uD589\uC131\uACC4","layer.stars":"\uBCC4","layer.milkyway":"\uC740\uD558\uC218","layer.nightlights":"\uC9C0\uAD6C \uBC24 \uBD88\uBE5B","layer.sunglow":"\uD0DC\uC591 \uBE5B \uBC88\uC9D0","sky.credits_stars":"\uBCC4: HYG v4.4 (David Nash, CC BY-SA 4.0)","sky.credits_mw":"\uC740\uD558\uC218: ESA/Gaia/DPAC (CC BY-SA 3.0 IGO)","sky.credits_moon":"\uB2EC: NASA SVS (\uACF5\uACF5 \uC601\uC5ED)","sky.credits_horizons":"\uADA4\uB3C4: JPL Horizons","sky.credits_earth":"\uC9C0\uAD6C \uD45C\uBA74: NASA Earth Observatory (Blue Marble\xB7Black Marble)","credits.images":"\uADF8\uB9BC\xB7\uC790\uB8CC \uCD9C\uCC98","credits.open":"\uADF8\uB9BC\xB7\uC790\uB8CC \uCD9C\uCC98 \uBCF4\uAE30 (\uCD9C\uCC98 \uCC3D)","credits.ui_pending":"UI \uD655\uC778 \uB300\uAE30 \u2014 \uBAA8\uB4E0 \uADF8\uB9BC\uACFC \uADA4\uB3C4 \uC790\uB8CC\uC758 \uCD9C\uCC98\xB7\uB77C\uC774\uC120\uC2A4\xB7\uC8FC\uC18C","credits.nasa_rule":"NASA \uD45C\uAE30 \uADFC\uAC70 (\uC6D0\uBB38):"};var rd={"app.title":"Sun\u2013Earth/Moon L2","app.subtitle":"Stage 7 3D visualization \xB7 M2 JWST layer","lang.switch":"\uD55C\uAD6D\uC5B4","lang.switch_title":"Switch language","version.commit":"commit","version.dirty":"uncommitted changes","version.title":"Version \xB7 build date (KST) \xB7 commit","panel.samples":"Tag test numbers","panel.samples_note":"Click a number to open its source window. Hover a tag to see the detailed category.","tag.weak":"weak","tag.display_approx":"display approximation","source.title":"Source","source.value":"Value","source.unit":"Unit","source.file":"File","source.key":"Key","source.commit":"Computed by","source.source_hash":"Source hash (first 12)","source.ref_commit":"Reference commit","source.build":"App build","source.stage":"Stage","source.model":"Model","source.verification":"Verification tag","source.note":"Note","source.close":"Close","source.browser_calc":"Browser calculation (passed the Python match test, tolerance {tol})","source.time_scale":"Time scale","pwa.update":"New version available \u2014 reload","pwa.offline_ready":"Ready offline","error.load":"Could not read data: {msg}","error.schema":"Data format error: {msg}","body.sun":"Sun","body.emb":"EMB (Earth\u2013Moon barycenter)","body.earth":"Earth","body.moon":"Moon","l2.panel":"L2 scene","l2.mode":"Frame","l2.mode_rot":"Rotating","l2.mode_inertial":"Inertial","l2.view":"View","l2.view_all":"Whole","l2.view_emb":"Earth\u2013Moon\u2013L1/L2","l2.view_l2":"Near L2","l2.view_l2zoom":"L2 close-up","l2.time":"Time","l2.play":"Play","l2.pause":"Pause","l2.speed":"{n} d/s","l2.layer_lpoints":"Lagrange points","l2.layer_bodies":"Sun & EMB","l2.layer_dirs":"L2 unstable/stable directions","l2.layer_earthmoon":"Earth & Moon (real ephemeris)","l2.layer_halo":"3-C halo family","l2.layer_escape":"3-B escape trajectories","l2.layer_burns":"Correction maneuvers (3-A, 3-C, 4-C)","l2.layer_ref":"4-C/4-D reference orbits","l2.unstable":"unstable","l2.stable":"stable","l2.halo_main":"Main halo orbit","l2.g_lpoints":"Lagrange points (stage 1)","l2.g_dirs":"L2 directions (stage 2)","l2.g_halo":"Main halo orbit (3-C)","l2.g_annual":"Annual \u0394v (3-A, 3-C, 4-C)","l2.g_ref":"Reference orbits vs halo (4-C, 4-D)","l2.g_escape":"Escape times (3-B)","l2.g_interp":"Ephemeris interpolation error (4-A)","l2.g_m0":"Tag test numbers (M0)","l2.legend_markers":"Marker sizes and arrow lengths are not to scale (display only). Click a number for its source.","l2.legend_pulsating":"Earth & Moon: real ephemeris (DE441) in the pulsating frame \u2014 length unit = instantaneous Sun\u2013EMB distance. The 4-C/4-D reference orbits use the same frame.","l2.legend_inertial":"Inertial frame: x = ecliptic J2000 X, z = orbit normal (\u2248 ecliptic north). The CR3BP rotating frame turned by \u03B8 = \u03B8\u2080 + (t \u2212 2026-01-01 TDB)/time unit (\u03B8\u2080 = EMB's ecliptic longitude on that date).","source.browser":"Computed in","l2.escape_rule":"Examples picked for display (rule: for each sign of e_u*, the main sample whose |e_u*|/\u03B3 is closest to 1e-9, 1e-7, 1e-5; escaped past 0.316\u03B3, noise-dominated samples excluded)","panel.open":"Show panel","panel.close":"Hide panel","ui.layers":"Layers","ui.legend":"Legend","ui.numbers":"All numbers","ui.menu":"Menu","card.sphere_note":"Spheres are enlarged to be visible (true radius: Horizons header)","card.no_numbers":"No result numbers for this object yet","l2.family_all":"Show the whole halo family (default: a subset)","l2.legend_spheres":"Sun, Earth and Moon are spheres \u2014 enlarged when too small to see","tag.short_impl":"impl.","tag.short_external":"ext.","tag.short_physical":"phys.","preset.clean":"Clean","preset.explore":"Explore","preset.research":"Research","preset.custom":"Custom","preset.zooming":"Zoomed in","layer.g_bodies":"Bodies & points","layer.g_orbits":"Orbits & paths","layer.g_numbers":"Physical values & tags","layer.g_aux":"Aids","layer.sun":"Sun","layer.earth":"Earth","layer.moon":"Moon","layer.emb":"EMB (Earth\u2013Moon barycentre)","layer.lpoints":"L1 \u2013 L5","layer.halo_main":"Main halo orbit","layer.halo_family":"Halo family","layer.escape":"3-B escape paths","layer.ref":"4-C / 4-D reference orbits","layer.burns":"Correction (\u0394v) points","layer.moon_orbit":"Moon orbit (past 30-day trail)","layer.dirs":"L2 direction lines (unstable / stable)","layer.n_distance":"Distances","layer.n_period":"Periods","layer.n_angle":"Direction angles","layer.n_annual":"Annual \u0394v","layer.n_escape":"Escape times","layer.n_tags":"Verification tags","layer.labels":"Labels","layer.scale":"Distance scale","layer.grid":"Reference-plane grid (orbit plane)","layer.axes":"Coordinate axes","layer.tags_note":"Turning tags off hides every number \u2014 numbers always come with their tag","key.labels":"Labels on / off","key.g_orbits":"Orbits & paths on / off","key.g_numbers":"Physical values & tags on / off","key.g_bodies":"Bodies & points on / off","key.grid":"Reference-plane grid","key.p_clean":"Preset: Clean","key.p_explore":"Preset: Explore","key.p_research":"Preset: Research","key.help":"This help","help.title":"Keyboard shortcuts","help.button":"Shortcuts (?)","help.note":"Layer shortcuts do not bring up the bars. Esc hides the bars. Your layer choice is remembered in this browser.","help.keys_line":"L labels \xB7 O orbits \xB7 N values \xB7 1 2 3 presets","time.start":"To start","time.now":"Now","card.numbers_off":"No value layer is on, so the numbers are hidden (Layers \u2192 Physical values)","desc.Sun":"The Sun \u2014 the larger primary of the CR3BP.","desc.EMB":"The Earth\u2013Moon barycentre \u2014 the CR3BP's second primary (Earth and Moon as one point).","desc.Earth":"Earth, at its real ephemeris (DE441) position in pulsating coordinates. The day\u2013night line follows the sunlight.","desc.Moon":`The Moon. Real ephemeris position. The tail behind is its recent track (fading with age). Surface map: NASA SVS CGI Moon Kit (LRO LROC, public domain \u2014 credit "NASA's Scientific Visualization Studio"). Map orientation is a display approximation (mean Earth-facing side toward Earth, no libration).`,"desc.L1":"Sunward Lagrange point (CR3BP equilibrium, stage 1). Unstable \u2014 not computed directly in this study (page reference for the instability of collinear points still to be confirmed).","desc.L2":"The subject of this study: the anti-sunward equilibrium. It is unstable, so station-keeping (\u0394v) is needed.","desc.L3":"Equilibrium point on the far side of the Sun (CR3BP, stage 1). Its stability was not computed in this study (to be confirmed).","desc.L4":"Leading triangular equilibrium point (CR3BP, stage 1). Linearly stable \u2014 stage 1 Routh test (\u03BC far below the critical mass ratio of Sicardy 2010; implementation verification against literature).","desc.L5":"Trailing triangular equilibrium point (CR3BP, stage 1). Linearly stable \u2014 stage 1 Routh test (same as L4).","desc.halo_main":"The main orbit of the 3-C halo family \u2014 the reference for station-keeping.","l2.view_jwst":"JWST","l2.layer_jwst":"JWST reconstructed trajectory","l2.layer_jwst_ext":"JWST prediction \u2014 vs JPL no-burn prediction","l2.layer_jwst_phys":"JWST prediction \u2014 vs reconstructed trajectory","l2.legend_jwst":"JWST (gold): dots = received points (daily), dashed = interpolation between them (4-A Hermite), solid = received 10-minute points. Predictions: orange = vs JPL's no-burn prediction (external comparison), green = vs the reconstructed trajectory (physical validation); dark = reference, light = my model","layer.jwst":"JWST reconstructed trajectory","layer.jwst_ext":"Prediction \u2014 vs JPL no-burn prediction (external)","layer.jwst_phys":"Prediction \u2014 vs reconstructed trajectory (physical)","layer.n_jwst":"Prediction error","body.jwst":"JWST","desc.JWST":"James Webb Space Telescope. Gold line = reconstructed as-flown trajectory (Horizons, 4-A data): dots = received points (daily), dashed = interpolation between daily nodes, solid = received 10-minute points. Marker = end of the reconstruction. Below: the two comparisons of the stage 5 prediction \u2014 with different tags.","desc.jwst_period":"Compares the length of one circuit of JWST's reconstructed trajectory with NASA's text and with CR3BP halos of the same size.","jwst.orbit_label":"JWST reconstructed","jwst.layer_ext_short":"vs JPL no-burn prediction","jwst.layer_phys_short":"vs reconstructed trajectory","jwst.layer_ext":"Comparison with JPL's no-burn prediction","jwst.layer_phys":"Comparison with the reconstructed trajectory","jwst.rep_5d":"5 d","jwst.axis_note":"Vertical = position difference (km, log), horizontal = days after start. Dots = values written in results/stage5.json","jwst.period_button":"Open the period card","jwst.period_title":"JWST period \u2014 reconstruction vs NASA and halo","jwst.period_class":"Classification","jwst.no_predictions":"No prediction data","jwst.g_ext":"JWST prediction \u2014 vs JPL no-burn prediction (stage 5)","jwst.g_phys":"JWST prediction \u2014 vs reconstructed trajectory (stage 5)","jwst.g_period":"JWST period (4-A)","l2.view_jwstzoom":"JWST zoom","l2.legend_jwstzoom":"JWST zoom (tens of km around a prediction end): big dots = points at the same time, white segments = the position difference between them (numbers are Python values with tags). Lines connect the stored points straight (hourly; JPL 01U daily). Positions are drawn in pulsating coordinates, so drawn distances differ from real ones by under 1 %","jwst.marker_fixed":"position on {date} (fixed)","jwst.zoom_phys":"Zoom in \u2014 representative 5-day point (three lines)","jwst.zoom_ext":"Zoom in \u2014 window end:","jwst.zoom_focus_R5":"JWST zoom \u2014 vs the reconstructed trajectory, representative 5-day point","jwst.zoom_focus_A":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window A","jwst.zoom_focus_B":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window B","jwst.zoom_focus_C":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window C","jwst.zoom_norecon":"No actual-trajectory data (after 2026-10-05)","jwst.zl_recon":"Reconstructed trajectory (03U)","jwst.zl_mine_kB":"My model (k_B)","jwst.zl_jpl01U":"JPL no-burn prediction (01U)","jwst.zl_jpl":"JPL no-burn prediction","jwst.gap_mine_recon":"my model \u2194 reconstruction","jwst.gap_jpl_recon":"JPL \u2194 reconstruction","jwst.gap_mine_jpl":"my model \u2194 JPL","source.join":"Reconstruction join","l2.view_lab":"Lab","lab.title":"Lab \u2014 escape of initial states near L2","lab.scope":"Results inside the CR3BP model (implementation verification \u2014 not physical validation). All numbers are browser calculations (passed Python match tests)","lab.fold":"Fold","lab.unfold":"Unfold","lab.loading":"Loading lab data\u2026 (first time only, about 17 MB)","lab.examples":"Examples","lab.ex_q10":"Fast escape (10 %)","lab.ex_q50":"Middle (50 %)","lab.ex_q90":"Slow escape (90 %)","lab.ex_out":"Out-of-range demo","lab.ex_noise":"Near the noise floor","lab.ex_src":"Example source: {src} (3-B sample no. {no})","lab.s_sign":"Sign of e_u","lab.s_eu":"|e_u| (unstable)","lab.s_es":"e_s (stable)","lab.s_ap":"In-plane amplitude A_p","lab.s_phip":"In-plane phase","lab.s_az":"Out-of-plane amplitude A_z","lab.s_phiz":"Out-of-plane phase","lab.sign_out":"+ outward","lab.sign_in":"\u2212 Earthward","lab.outside":"Allow out of range (extrapolation \u2014 research preset only)","lab.col_r":"Criterion R","lab.col_truth":"Truth [d]","lab.col_t3":"T3 [d]","lab.col_d24":"D24 [d]","lab.col_mlp":"MLP-C_ln [d]","lab.col_hybrid":"Hybrid [d] \u2014 verdict: rejected","lab.col_dt3":"T3 error \u0394ln t","lab.col_dd24":"D24 error \u0394ln t","lab.col_dmlp":"MLP error \u0394ln t","lab.col_dir":"Direction (e_u*)","lab.col_flag":"Confidence","lab.flag_extrap":"extrapolated","lab.flag_unc":"uncertain","lab.flag_unc_mismatch":"MLP-C_ln and T3 differ by more than 3 \xD7 validation RMSE_log (pre-registration \xA75)","lab.flag_unc_spread":"Spread of the 3 MLP seeds exceeds 3 \xD7 the validation median (pre-registration \xA75)","lab.extrap_long":"Extrapolation \u2014 not trusted (outside the training range)","lab.no_escape":"no escape","lab.dir_hit":"correct","lab.dir_miss":"wrong","lab.waiting":"Release to start the truth integration","lab.integrating":"Integrating the truth (Worker)\u2026","lab.integrating_days":"Integrating the truth \u2014 day {d}","lab.done":"Truth integration done ({ms} ms, {n} trajectory points)","lab.error":"Error: {msg}","lab.hybrid_note":"Hybrid = T3 and D24 joined per R \u2014 all six weights w_R are 0, so it equals D24. Pre-registered verdict (H): rejected (structural); residual-model verdict (R): supported. ","lab.foot":"T3 = linear theory + second-order correction e_u*, D24 = T3 + RF residual (50 trees), MLP-C_ln = neural net, mean of 3 seeds. Truth = DOP853 integration (rtol 1e-12, up to 730.5 days, stops at 0.316\u03B3). \u0394ln t = prediction \u2212 truth.","lab.mobile_note":"Please use the lab on a computer. On a phone screen the sliders and result table are too narrow to place an initial state precisely. (Draft notice \u2014 awaiting user confirmation)","time.go":"Go","time.out_of_range":"Outside the data period (2022-01-01 \u2013 2049-12-31)","time.loading":"Loading ephemeris\u2026","l2.view_solar":"Solar system","body.mercury":"Mercury system","body.venus":"Venus system","body.mars":"Mars system","body.jupiter":"Jupiter system","body.saturn":"Saturn system","body.uranus":"Uranus system","body.neptune":"Neptune system","desc.Mercury":"Mercury (system barycenter \u2014 decision \u246E). Position = interpolated M4 ephemeris (DE441, 12 h step) in pulsating coordinates.","desc.Venus":"Venus system barycenter (decision \u246E). Position = interpolated M4 ephemeris (DE441, 2 d step) in pulsating coordinates.","desc.Mars":"Mars system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 4 d step).","desc.Jupiter":"Jupiter system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 16 d step).","desc.Saturn":"Saturn system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","desc.Uranus":"Uranus system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","desc.Neptune":"Neptune system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","view.true_size":"True size","view.true_size_title":"Turn off size exaggeration (bodies enlarged when small on screen \u2014 display approximation)","layer.planets":"Planet systems","layer.stars":"Stars","layer.milkyway":"Milky Way","layer.nightlights":"Earth night lights","layer.sunglow":"Sun glow","sky.credits_stars":"Stars: HYG v4.4 (David Nash, CC BY-SA 4.0)","sky.credits_mw":"Milky Way: ESA/Gaia/DPAC (CC BY-SA 3.0 IGO)","sky.credits_moon":"Moon: NASA SVS (public domain)","sky.credits_horizons":"Orbits: JPL Horizons","sky.credits_earth":"Earth surface: NASA Earth Observatory (Blue Marble, Black Marble)","credits.images":"Image and data sources","credits.open":"Show image and data sources (source panel)","credits.ui_pending":"Pending UI review \u2014 sources, licenses and addresses of all images and orbit data","credits.nasa_rule":"NASA credit rules (verbatim):"};var Xr={ko:sd,en:rd},ad="lagrange.lang",Ei="en",od=[];function ld(n,e){return e==="ko"||e==="en"?e:typeof n=="string"&&n.toLowerCase().startsWith("ko")?"ko":"en"}function zm(){try{return localStorage.getItem(ad)}catch{return null}}function Jc(){return Ei=ld(typeof navigator<"u"?navigator.language:"",zm()),document.documentElement.lang=Ei,Ei}function Ti(){return Ei}function $c(n){Ei=n,document.documentElement.lang=n;try{localStorage.setItem(ad,n)}catch{}zt();for(let e of od)e(n)}function so(n){od.push(n)}function Oe(n,e={}){let t=Xr[Ei][n];if(t===void 0)throw new Error(`\uC0AC\uC804\uC5D0 \uC5C6\uB294 \uD0A4: ${n} (${Ei})`);return t.replace(/\{(\w+)\}/g,(i,s)=>String(e[s]))}function Tt(n){return n&&typeof n=="object"?n[Ei]??n.ko??"":String(n??"")}function zt(n=document){for(let e of n.querySelectorAll("[data-i18n]"))e.textContent=Oe(e.dataset.i18n);for(let e of n.querySelectorAll("[data-i18n-title]"))e.title=Oe(e.dataset.i18nTitle)}var ro=new Set,cd=()=>!0;function Vm(n){return/^jwst_err_/.test(n)?"n_jwst":/_dist$|zmax|^shift_|^holdout_|_km$/.test(n)?"n_distance":/period/.test(n)?"n_period":/_deg$/.test(n)?"n_angle":/^annual_|^wrong_ref_|^dv_ratio/.test(n)?"n_annual":/^t316_/.test(n)?"n_escape":"n_other"}function ao(n,e,t){return n.dataset.cat=Vm(e),n.dataset.ctx=t,ro.add(n),n}function ud(n){ro.delete(n)}function hd(n){cd=n}function Hm(n,e){e?n._ph&&n._ph.parentNode&&n._ph.replaceWith(n):n.parentNode&&(n._ph||(n._ph=document.createComment("num-off")),n.replaceWith(n._ph))}function oo(){for(let n of ro)Hm(n,cd(n.dataset.cat,n.dataset.ctx))}function dd(){let n={};for(let e of ro){let t=`${e.dataset.ctx}:${e.dataset.cat}`;n[t]=n[t]||{on:0,off:0},e.parentNode&&!(e._ph&&e._ph.parentNode)?n[t].on++:n[t].off++}return n}var pd=["","\u2460","\u2461","\u2462","\u2463","\u2464","\u2465","\u2466"];function Gm(n){return n.source.map(e=>`${e.file}>${e.key}`).join(" | ")}function Es(n,e){let t=document.createElement("span");t.className=`tag tag-${n.tag}`,t.tabIndex=0,t.dataset.tag=n.tag,t.dataset.detail=n.detail;let i=document.createElement("span");i.className="tag-name";let s=document.createElement("span");s.className="tag-tip",s.setAttribute("role","tooltip");let r=()=>{let a=e.details[n.detail];i.textContent=Tt(e.tags[n.tag])+(n.weak!==void 0?` (${Oe("tag.weak")})`:""),s.textContent=`${pd[a.no]} ${Tt(a)}`+(n.weak?` \u2014 ${Tt(n.weak)}`:"")};return r(),t.append(i,s),t._render=r,t}function Ai(n,e){let t=document.createElement("span");t.className=`tag mini tag-${n.tag}`,t.tabIndex=0,t.dataset.tag=n.tag,t.dataset.detail=n.detail;let i=document.createElement("span");i.className="tag-name";let s=document.createElement("span");return s.className="tag-tip",s.setAttribute("role","tooltip"),t._render=()=>{let r=e.details[n.detail];i.textContent=Oe("tag.short_"+n.tag),s.textContent=`${Tt(e.tags[n.tag])} \u2014 ${pd[r.no]} ${Tt(r)}`},t._render(),t.append(i,s),t}function Ci(){let n=document.createElement("span");return n.className="tag tag-approx",n.dataset.i18n="tag.display_approx",n.textContent=Oe("tag.display_approx"),n}function Ri(n,e,t){let i=document.createElement("div");i.className="num-row";let s=document.createElement("div");s.className="num-label";let r=document.createElement("button");r.type="button",r.className="num",r.dataset.source=Gm(n.provenance),r.dataset.verification=`${n.provenance.verification.tag}/${n.provenance.verification.detail}`,r.dataset.id=n.id,r.addEventListener("click",()=>t(n)),i.dataset.source=r.dataset.source,i.dataset.verification=r.dataset.verification;let a=Es(n.provenance.verification,e),o=()=>{let l=n.unit&&typeof n.unit=="object"?Tt(n.unit):n.unit;r.textContent=n.text+(l?l==="\xB0"||l==="\xD7"?l:` ${l}`:""),s.textContent=Tt(n.label),a._render()};return o(),i.append(s,r,a),i._render=o,ao(i,n.id,"row"),i}var dn=null,jr=null,Kc=null,_d=()=>"",lo=null;function xd(n){lo=n||null}function Wm(){let n=document.createElement("span");n.className="join-line",n.append(document.createTextNode(Tt(lo.text)+" "));for(let e of lo.items){let t=document.createElement("span");t.className="join-num",t.dataset.source=e.provenance.source.map(r=>`${r.file}>${r.key}`).join(" | "),t.dataset.verification=`${e.provenance.verification.tag}/${e.provenance.verification.detail}`;let i=document.createElement("span");i.dataset.meta="",i.textContent=Tt(e.label)+" ";let s=document.createElement("b");s.textContent=`${e.text} ${e.unit}`,s.title=Tt(e.note),t.append(i,s,document.createTextNode(" "),Ai(e.provenance.verification,Kc)),n.append(t)}return n}function _n(n,e){let t=document.createElement("tr"),i=document.createElement("th");i.textContent=Oe(n);let s=document.createElement("td");return s.append(e),t.append(i,s),t}function si(n){let e=document.createElement("code");return e.dataset.literal="",e.textContent=n,e}function yd(){if(!jr)return;let n=jr,e=n.provenance;dn.dataset.source=e.source.map(r=>`${r.file}>${r.key}`).join(" | "),dn.dataset.verification=`${e.verification.tag}/${e.verification.detail}`,dn.querySelector("h2").textContent=`${Oe("source.title")} \u2014 ${Tt(n.label)}`;let t=dn.querySelector("tbody");t.replaceChildren(),t.append(_n("source.value",si(String(n.value)))),t.append(_n("source.unit",document.createTextNode(n.unit||"-")));for(let r of e.source)t.append(_n("source.file",si(r.file))),t.append(_n("source.key",si(r.key)));if(t.append(_n("source.commit",si(e.computed_by))),e.source_hash){let r=si(e.source_hash.slice(0,12));r.title=e.source_hash,t.append(_n("source.source_hash",r))}e.ref_commit&&t.append(_n("source.ref_commit",si(e.ref_commit))),t.append(_n("source.stage",si(e.stage)));let i=document.createElement("span");i.append(si(e.model)),e.model_ko&&e.model_ko!=="-"&&i.append(document.createTextNode(Tt({ko:` \u2014 ${e.model_ko}`,en:""}))),t.append(_n("source.model",i));let s=Es(e.verification,Kc);s.classList.add("tag-open"),t.append(_n("source.verification",s)),t.append(_n("source.build",si(_d()))),n.browser_calc&&t.append(_n("source.browser",document.createTextNode(Oe("source.browser_calc",{tol:n.browser_calc.tolerance})))),t.append(_n("source.note",document.createTextNode(Tt(n.note)))),lo&&/^jwst_/.test(n.id||"")&&t.append(_n("source.join",Wm())),dn.querySelector(".close").textContent=Oe("source.close")}function vd(n,e){Kc=n,e&&(_d=e),dn=document.getElementById("source"),dn.querySelector(".close").addEventListener("click",md),document.addEventListener("keydown",t=>{t.key==="Escape"&&md()})}function co(n){jr=n,qr=null,yd(),dn.hidden=!1}function md(){jr=null,qr=null,dn.hidden=!0}function bd(){qr?Qc(qr):yd()}var qr=null;function Qc(n){qr=n,jr=null,delete dn.dataset.source,delete dn.dataset.verification,dn.querySelector("h2").textContent=`${Oe("source.title")} \u2014 ${Oe("credits.images")}`;let e=dn.querySelector("tbody");e.replaceChildren(gd("tr",gd("td",n()))),e.firstChild.firstChild.colSpan=2,dn.querySelector(".close").textContent=Oe("source.close"),dn.hidden=!1}var gd=(n,...e)=>{let t=document.createElement(n);return t.append(...e),t};var Xm=[{what:{ko:"\uC9C0\uAD6C \uB0AE \uD45C\uBA74",en:"Earth day surface"},credit:{ko:"NASA Earth Observatory \u2014 Blue Marble Next Generation (2004\uB144 7\uC6D4 \uC601\uC0C1)",en:"NASA Earth Observatory \u2014 Blue Marble Next Generation (July 2004 imagery)"},approx:{ko:"\uD55C \uB2EC (2004\uB144 7\uC6D4) \uC601\uC0C1 \uACE0\uC815 \u2014 \uACC4\uC808 \uB208\xB7\uC2DD\uC0DD\uC740 \uB0A0\uC9DC\uC640 \uB2E4\uB984",en:"one month (July 2004) fixed \u2014 seasonal snow and vegetation do not follow the date"},license:{ko:"NASA \uC790\uB8CC \u2014 \uBBF8\uAD6D \uC800\uC791\uAD8C \uB300\uC0C1 \uC544\uB2D8. \uD45C\uAE30 \uC758\uBB34\uB294 NASA (Earth Observatory \uC9C0\uCE68)",en:"NASA material \u2014 not subject to US copyright. Mandatory credit: NASA (Earth Observatory policy)"},url:"https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-map"},{what:{ko:"\uC9C0\uAD6C \uBC24 \uBD88\uBE5B",en:"Earth night lights"},credit:{ko:"NASA Earth Observatory \u2014 Black Marble 2016 (Suomi NPP VIIRS)",en:"NASA Earth Observatory \u2014 Black Marble 2016 (Suomi NPP VIIRS)"},approx:{ko:"\uBD88\uBE5B \uBC1D\uAE30 \uACE1\uC120\xB7\uB0AE\uBC24 \uACBD\uACC4 \uC11E\uAE30\uB294 \uD45C\uC2DC\uC6A9",en:"light curve and day\u2013night blending are for display"},license:{ko:"NASA \uC790\uB8CC \u2014 \uBBF8\uAD6D \uC800\uC791\uAD8C \uB300\uC0C1 \uC544\uB2D8. \uD45C\uAE30 \uC758\uBB34\uB294 NASA (Earth Observatory \uC9C0\uCE68)",en:"NASA material \u2014 not subject to US copyright. Mandatory credit: NASA (Earth Observatory policy)"},url:"https://science.nasa.gov/earth/earth-observatory/earth-at-night/maps"},{what:{ko:"\uB2EC \uD45C\uBA74",en:"Moon surface"},credit:{ko:"NASA's Scientific Visualization Studio \u2014 CGI Moon Kit (LRO LROC \uC0C9 \uBAA8\uC790\uC774\uD06C)",en:"NASA's Scientific Visualization Studio \u2014 CGI Moon Kit (LRO LROC color mosaic)"},license:{ko:"\uACF5\uACF5 \uC601\uC5ED (NASA SVS)",en:"Public domain (NASA SVS)"},url:"https://svs.gsfc.nasa.gov/4720/"},{what:{ko:"\uC740\uD558\uC218",en:"Milky Way"},credit:{ko:"ESA/Gaia/DPAC \u2014 Gaia DR2 sky in colour. \uAC10\uC0AC: Gaia DPAC; A. Moitinho / A. F. Silva / M. Barros / C. Barata (University of Lisbon); H. Savietto (Fork Research)",en:"ESA/Gaia/DPAC \u2014 Gaia DR2 sky in colour. Acknowledgement: Gaia DPAC; A. Moitinho / A. F. Silva / M. Barros / C. Barata (University of Lisbon); H. Savietto (Fork Research)"},approx:{ko:"\uBC1D\uAE30 \uBC30\uC728\uC740 \uD45C\uC2DC\uC6A9",en:"brightness gain is for display"},license:{ko:"CC BY-SA 3.0 IGO (\uC904\uC778 \uADF8\uB9BC\uB3C4 \uAC19\uC740 \uC870\uAC74)",en:"CC BY-SA 3.0 IGO (resized copies under the same terms)"},url:"https://sci.esa.int/web/gaia/-/60196-gaia-s-sky-in-colour-equirectangular-projection"},{what:{ko:"\uBCC4",en:"Stars"},credit:{ko:"HYG Database v4.4 \u2014 David Nash (astronexus)",en:"HYG Database v4.4 \u2014 David Nash (astronexus)"},approx:{ko:"\uBCC4 \uD06C\uAE30\xB7\uC0C9\uC740 \uD45C\uC2DC\uC6A9",en:"star size and color are for display"},license:{ko:"CC BY-SA 4.0 (\uACE0\uB978 \uBCC4 \uD30C\uC77C\uB3C4 \uAC19\uC740 \uC870\uAC74)",en:"CC BY-SA 4.0 (derived star file under the same terms)"},url:"https://codeberg.org/astronexus/hyg"},{what:{ko:"\uCC9C\uCCB4 \uC704\uCE58\xB7JWST \uADA4\uC801",en:"Body positions and JWST trajectory"},credit:{ko:"NASA/JPL Horizons System (\uCC9C\uCCB4\uB825 DE441, JWST \uC7AC\uAD6C\uC131\xB7\uBB34\uBD84\uC0AC \uC608\uCE21 \uADA4\uC801)",en:"NASA/JPL Horizons System (DE441 ephemeris, JWST reconstructed and no-burn predicted trajectories)"},license:{ko:"\uBBF8\uB9AC \uBC1B\uC544 \uB454 \uC790\uB8CC \u2014 \uC2E4\uD589 \uC911 Horizons \uB97C \uBD80\uB974\uC9C0 \uC54A\uC74C. \uCD9C\uCC98 \uD45C\uAE30",en:"Retrieved in advance \u2014 Horizons is not called at run time. Credit given"},url:"https://ssd.jpl.nasa.gov/horizons/"}],jm=[{text:"NASA should be acknowledged as the source of the material.",url:"https://www.nasa.gov/nasa-brand-center/images-and-media/"},{text:"We ask that NASA's Earth Observatory be given credit for its original materials; the only mandatory credit is NASA.",url:"https://earthobservatory.nasa.gov/ImageUse"}],yn=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))i.setAttribute(s,r);return i.append(...t),i},Sd=n=>yn("code",{"data-literal":""},n);function Md(n){let e=yn("div",{class:"image-credits","data-meta":""});e.append(yn("p",{class:"note"},Oe("credits.ui_pending")));let t=yn("tbody");for(let s of Xm){let r=yn("td",{},Tt(s.credit),yn("br"),Tt(s.license),yn("br"),Sd(s.url));s.approx&&r.append(yn("br"),n(),document.createTextNode(" "+Tt(s.approx))),t.append(yn("tr",{},yn("th",{},Tt(s.what)),r))}e.append(yn("table",{class:"src"},t));let i=yn("p",{class:"note"},Oe("credits.nasa_rule")+" ");for(let s of jm)i.append(yn("q",{},s.text),document.createTextNode(" "),Sd(s.url),document.createTextNode(" "));return e.append(i),e}var Qd=0,Iu=1,ef=2;var Aa=1,tf=2,ar=3,Vi=0,Kt=1,Jn=2,$n=0,or=1,pi=2,Lu=3,Du=4,nf=5;var us=100,sf=101,rf=102,af=103,of=104,lf=200,cf=201,uf=202,hf=203,Nu=204,Uu=205,df=206,ff=207,pf=208,mf=209,gf=210,_f=211,xf=212,yf=213,vf=214,Bo=0,ko=1,zo=2,js=3,Vo=4,Ho=5,Go=6,Wo=7,fl=0,bf=1,Sf=2,Un=0,Fu=1,Ou=2,Bu=3,ku=4,zu=5,Vu=6,Hu=7;var Gu=300,Hi=301,hs=302,pl=303,ml=304,Ca=306,qs=1e3,An=1001,Xo=1002,Zt=1003,Mf=1004;var Ra=1005;var Ct=1006,gl=1007;var Fn=1008;var Qt=1009,Wu=1010,Xu=1011,lr=1012,_l=1013,On=1014,Bn=1015,kn=1016,xl=1017,yl=1018,cr=1020,ju=35902,qu=35899,Yu=1021,Ju=1022,pn=1023,Wn=1026,Gi=1027,$u=1028,vl=1029,Wi=1030,bl=1031;var Sl=1033,Pa=33776,Ia=33777,La=33778,Da=33779,Ml=35840,wl=35841,El=35842,Tl=35843,Al=36196,Cl=37492,Rl=37496,Pl=37488,Il=37489,Na=37490,Ll=37491,Dl=37808,Nl=37809,Ul=37810,Fl=37811,Ol=37812,Bl=37813,kl=37814,zl=37815,Vl=37816,Hl=37817,Gl=37818,Wl=37819,Xl=37820,jl=37821,ql=36492,Yl=36494,Jl=36495,$l=36283,Zl=36284,Ua=36285,Kl=36286;var ia=2300,jo=2301,Fo=2302,Mu=2303,wu=2400,Eu=2401,Tu=2402;var wf=3200;var Ql=0,Ef=1,mi="",Ft="srgb",sa="srgb-linear",ra="linear",yt="srgb";var Oo=7680;var Tf=519,Af=512,Cf=513,Rf=514,ec=515,Pf=516,If=517,tc=518,Lf=519,Zu=35044;var Ku="300 es",Dn=2e3,Ys=2001;function qm(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Ym(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function aa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Df(){let n=aa("canvas");return n.style.display="block",n}var wd={},Js=null;function oa(...n){let e="THREE."+n.shift();Js?Js("log",e,...n):console.log(e,...n)}function Nf(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ye(...n){n=Nf(n);let e="THREE."+n.shift();if(Js)Js("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function $e(...n){n=Nf(n);let e="THREE."+n.shift();if(Js)Js("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function as(...n){let e=n.join(" ");e in wd||(wd[e]=!0,Ye(...n))}function Uf(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var Ff={[Bo]:ko,[zo]:Go,[Vo]:Wo,[js]:Ho,[ko]:Bo,[Go]:zo,[Wo]:Vo,[Ho]:js},Xn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Ed=1234567,ta=Math.PI/180,$s=180/Math.PI;function hi(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(rn[n&255]+rn[n>>8&255]+rn[n>>16&255]+rn[n>>24&255]+"-"+rn[e&255]+rn[e>>8&255]+"-"+rn[e>>16&15|64]+rn[e>>24&255]+"-"+rn[t&63|128]+rn[t>>8&255]+"-"+rn[t>>16&255]+rn[t>>24&255]+rn[i&255]+rn[i>>8&255]+rn[i>>16&255]+rn[i>>24&255]).toLowerCase()}function it(n,e,t){return Math.max(e,Math.min(t,n))}function Qu(n,e){return(n%e+e)%e}function Jm(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function $m(n,e,t){return n!==e?(t-n)/(e-n):0}function na(n,e,t){return(1-t)*n+t*e}function Zm(n,e,t,i){return na(n,e,1-Math.exp(-t*i))}function Km(n,e=1){return e-Math.abs(Qu(n,e*2)-e)}function Qm(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function eg(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function tg(n,e){return n+Math.floor(Math.random()*(e-n+1))}function ng(n,e){return n+Math.random()*(e-n)}function ig(n){return n*(.5-Math.random())}function sg(n){n!==void 0&&(Ed=n);let e=Ed+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function rg(n){return n*ta}function ag(n){return n*$s}function og(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function lg(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function cg(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function ug(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),u=a((e+i)/2),d=r((e-i)/2),h=a((e-i)/2),f=r((i-e)/2),m=a((i-e)/2);switch(s){case"XYX":n.set(o*u,l*d,l*h,o*c);break;case"YZY":n.set(l*h,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*h,o*u,o*c);break;case"XZX":n.set(o*u,l*m,l*f,o*c);break;case"YXY":n.set(l*f,o*u,l*m,o*c);break;case"ZYZ":n.set(l*m,l*f,o*u,o*c);break;default:Ye("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Ln(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function bt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var eh={DEG2RAD:ta,RAD2DEG:$s,generateUUID:hi,clamp:it,euclideanModulo:Qu,mapLinear:Jm,inverseLerp:$m,lerp:na,damp:Zm,pingpong:Km,smoothstep:Qm,smootherstep:eg,randInt:tg,randFloat:ng,randFloatSpread:ig,seededRandom:sg,degToRad:rg,radToDeg:ag,isPowerOfTwo:og,ceilPowerOfTwo:lg,floorPowerOfTwo:cg,setQuaternionFromProperEuler:ug,normalize:bt,denormalize:Ln},We=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(it(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},jn=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],h=r[a+0],f=r[a+1],m=r[a+2],v=r[a+3];if(d!==v||l!==h||c!==f||u!==m){let p=l*h+c*f+u*m+d*v;p<0&&(h=-h,f=-f,m=-m,v=-v,p=-p);let g=1-o;if(p<.9995){let A=Math.acos(p),C=Math.sin(A);g=Math.sin(g*A)/C,o=Math.sin(o*A)/C,l=l*g+h*o,c=c*g+f*o,u=u*g+m*o,d=d*g+v*o}else{l=l*g+h*o,c=c*g+f*o,u=u*g+m*o,d=d*g+v*o;let A=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=A,c*=A,u*=A,d*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[a],h=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+u*d+l*f-c*h,e[t+1]=l*m+u*h+c*d-o*f,e[t+2]=c*m+u*f+o*h-l*d,e[t+3]=u*m-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(r/2),h=l(i/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"YZX":this._x=h*u*d+c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d-h*f*m;break;case"XZY":this._x=h*u*d-c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d+h*f*m;break;default:Ye("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(it(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},W=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Td.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Td.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+l*c+a*d-o*u,this.y=i+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return eu.copy(this).projectOnVector(e),this.sub(eu)}reflect(e){return this.sub(eu.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(it(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},eu=new W,Td=new jn,Ze=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],m=i[8],v=s[0],p=s[3],g=s[6],A=s[1],C=s[4],y=s[7],T=s[2],b=s[5],w=s[8];return r[0]=a*v+o*A+l*T,r[3]=a*p+o*C+l*b,r[6]=a*g+o*y+l*w,r[1]=c*v+u*A+d*T,r[4]=c*p+u*C+d*b,r[7]=c*g+u*y+d*w,r[2]=h*v+f*A+m*T,r[5]=h*p+f*C+m*b,r[8]=h*g+f*y+m*w,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*r,f=c*r-a*l,m=t*d+i*h+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/m;return e[0]=d*v,e[1]=(s*c-u*i)*v,e[2]=(o*i-s*a)*v,e[3]=h*v,e[4]=(u*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return as("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(tu.makeScale(e,t)),this}rotate(e){return as("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(tu.makeRotation(-e)),this}translate(e,t){return as("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(tu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},tu=new Ze,Ad=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Cd=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function hg(){let n={enabled:!0,workingColorSpace:sa,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===yt&&(s.r=di(s.r),s.g=di(s.g),s.b=di(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===yt&&(s.r=Xs(s.r),s.g=Xs(s.g),s.b=Xs(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===mi?ra:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return as("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return as("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[sa]:{primaries:e,whitePoint:i,transfer:ra,toXYZ:Ad,fromXYZ:Cd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ft},outputColorSpaceConfig:{drawingBufferColorSpace:Ft}},[Ft]:{primaries:e,whitePoint:i,transfer:yt,toXYZ:Ad,fromXYZ:Cd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ft}}}),n}var lt=hg();function di(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Xs(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Ts,qo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Ts===void 0&&(Ts=aa("canvas")),Ts.width=e.width,Ts.height=e.height;let s=Ts.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Ts}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=aa("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=di(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(di(t[i]/255)*255):t[i]=di(t[i]);return{data:t,width:e.width,height:e.height}}else return Ye("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},dg=0,Zs=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:dg++}),this.uuid=hi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(nu(s[a].image)):r.push(nu(s[a]))}else r=nu(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function nu(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?qo.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ye("Texture: Unable to serialize Texture."),{})}var fg=0,iu=new W,Ot=class n extends Xn{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=An,s=An,r=Ct,a=Fn,o=pn,l=Qt,c=n.DEFAULT_ANISOTROPY,u=mi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:fg++}),this.uuid=hi(),this.name="",this.source=new Zs(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(iu).x}get height(){return this.source.getSize(iu).y}get depth(){return this.source.getSize(iu).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Ye(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ye(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Gu)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case qs:e.x=e.x-Math.floor(e.x);break;case An:e.x=e.x<0?0:1;break;case Xo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case qs:e.y=e.y-Math.floor(e.y);break;case An:e.y=e.y<0?0:1;break;case Xo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=Gu;Ot.DEFAULT_ANISOTROPY=1;var gt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],m=l[9],v=l[2],p=l[6],g=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(m-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let C=(c+1)/2,y=(f+1)/2,T=(g+1)/2,b=(u+h)/4,w=(d+v)/4,x=(m+p)/4;return C>y&&C>T?C<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(C),s=b/i,r=w/i):y>T?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=b/s,r=x/s):T<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(T),i=w/r,s=x/r),this.set(i,s,r,t),this}let A=Math.sqrt((p-m)*(p-m)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(A)<.001&&(A=1),this.x=(p-m)/A,this.y=(d-v)/A,this.z=(h-u)/A,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=it(this.x,e.x,t.x),this.y=it(this.y,e.y,t.y),this.z=it(this.z,e.z,t.z),this.w=it(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=it(this.x,e,t),this.y=it(this.y,e,t),this.z=it(this.z,e,t),this.w=it(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(it(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Yo=class extends Xn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ct,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new gt(0,0,e,t),this.scissorTest=!1,this.viewport=new gt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:i.depth},r=new Ot(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Ct,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Zs(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},xn=class extends Yo{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},la=class extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Jo=class extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=An,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var pt=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,l,c,u,d,h,f,m,v,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,d,h,f,m,v,p)}set(e,t,i,s,r,a,o,l,c,u,d,h,f,m,v,p){let g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=d,g[14]=h,g[3]=f,g[7]=m,g[11]=v,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/As.setFromMatrixColumn(e,0).length(),r=1/As.setFromMatrixColumn(e,1).length(),a=1/As.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=a*u,f=a*d,m=o*u,v=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+m*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,f=l*d,m=c*u,v=c*d;t[0]=h+v*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,f=l*d,m=c*u,v=c*d;t[0]=h-v*o,t[4]=-a*d,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,f=a*d,m=o*u,v=o*d;t[0]=l*u,t[4]=m*c-f,t[8]=h*c+v,t[1]=l*d,t[5]=v*c+h,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,f=a*c,m=o*l,v=o*c;t[0]=l*u,t[4]=v-h*d,t[8]=m*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+m,t[10]=h-v*d}else if(e.order==="XZY"){let h=a*l,f=a*c,m=o*l,v=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+v,t[5]=a*u,t[9]=f*d-m,t[2]=m*d-f,t[6]=o*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(pg,e,mg)}lookAt(e,t,i){let s=this.elements;return vn.subVectors(e,t),vn.lengthSq()===0&&(vn.z=1),vn.normalize(),Pi.crossVectors(i,vn),Pi.lengthSq()===0&&(Math.abs(i.z)===1?vn.x+=1e-4:vn.z+=1e-4,vn.normalize(),Pi.crossVectors(i,vn)),Pi.normalize(),uo.crossVectors(vn,Pi),s[0]=Pi.x,s[4]=uo.x,s[8]=vn.x,s[1]=Pi.y,s[5]=uo.y,s[9]=vn.y,s[2]=Pi.z,s[6]=uo.z,s[10]=vn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],m=i[2],v=i[6],p=i[10],g=i[14],A=i[3],C=i[7],y=i[11],T=i[15],b=s[0],w=s[4],x=s[8],M=s[12],L=s[1],R=s[5],P=s[9],B=s[13],N=s[2],H=s[6],j=s[10],Y=s[14],X=s[3],U=s[7],q=s[11],Q=s[15];return r[0]=a*b+o*L+l*N+c*X,r[4]=a*w+o*R+l*H+c*U,r[8]=a*x+o*P+l*j+c*q,r[12]=a*M+o*B+l*Y+c*Q,r[1]=u*b+d*L+h*N+f*X,r[5]=u*w+d*R+h*H+f*U,r[9]=u*x+d*P+h*j+f*q,r[13]=u*M+d*B+h*Y+f*Q,r[2]=m*b+v*L+p*N+g*X,r[6]=m*w+v*R+p*H+g*U,r[10]=m*x+v*P+p*j+g*q,r[14]=m*M+v*B+p*Y+g*Q,r[3]=A*b+C*L+y*N+T*X,r[7]=A*w+C*R+y*H+T*U,r[11]=A*x+C*P+y*j+T*q,r[15]=A*M+C*B+y*Y+T*Q,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],m=e[3],v=e[7],p=e[11],g=e[15],A=l*f-c*h,C=o*f-c*d,y=o*h-l*d,T=a*f-c*u,b=a*h-l*u,w=a*d-o*u;return t*(v*A-p*C+g*y)-i*(m*A-p*T+g*b)+s*(m*C-v*T+g*w)-r*(m*y-v*b+p*w)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],m=e[12],v=e[13],p=e[14],g=e[15],A=t*o-i*a,C=t*l-s*a,y=t*c-r*a,T=i*l-s*o,b=i*c-r*o,w=s*c-r*l,x=u*v-d*m,M=u*p-h*m,L=u*g-f*m,R=d*p-h*v,P=d*g-f*v,B=h*g-f*p,N=A*B-C*P+y*R+T*L-b*M+w*x;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let H=1/N;return e[0]=(o*B-l*P+c*R)*H,e[1]=(s*P-i*B-r*R)*H,e[2]=(v*w-p*b+g*T)*H,e[3]=(h*b-d*w-f*T)*H,e[4]=(l*L-a*B-c*M)*H,e[5]=(t*B-s*L+r*M)*H,e[6]=(p*y-m*w-g*C)*H,e[7]=(u*w-h*y+f*C)*H,e[8]=(a*P-o*L+c*x)*H,e[9]=(i*L-t*P-r*x)*H,e[10]=(m*b-v*y+g*A)*H,e[11]=(d*y-u*b-f*A)*H,e[12]=(o*M-a*R-l*x)*H,e[13]=(t*R-i*M+s*x)*H,e[14]=(v*C-m*T-p*A)*H,e[15]=(u*T-d*C+h*A)*H,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,h=r*c,f=r*u,m=r*d,v=a*u,p=a*d,g=o*d,A=l*c,C=l*u,y=l*d,T=i.x,b=i.y,w=i.z;return s[0]=(1-(v+g))*T,s[1]=(f+y)*T,s[2]=(m-C)*T,s[3]=0,s[4]=(f-y)*b,s[5]=(1-(h+g))*b,s[6]=(p+A)*b,s[7]=0,s[8]=(m+C)*w,s[9]=(p-A)*w,s[10]=(1-(h+v))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=As.set(s[0],s[1],s[2]).length(),o=As.set(s[4],s[5],s[6]).length(),l=As.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Cn.copy(this);let c=1/a,u=1/o,d=1/l;return Cn.elements[0]*=c,Cn.elements[1]*=c,Cn.elements[2]*=c,Cn.elements[4]*=u,Cn.elements[5]*=u,Cn.elements[6]*=u,Cn.elements[8]*=d,Cn.elements[9]*=d,Cn.elements[10]*=d,t.setFromRotationMatrix(Cn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=Dn,l=!1){let c=this.elements,u=2*r/(t-e),d=2*r/(i-s),h=(t+e)/(t-e),f=(i+s)/(i-s),m,v;if(l)m=r/(a-r),v=a*r/(a-r);else if(o===Dn)m=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===Ys)m=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Dn,l=!1){let c=this.elements,u=2/(t-e),d=2/(i-s),h=-(t+e)/(t-e),f=-(i+s)/(i-s),m,v;if(l)m=1/(a-r),v=a/(a-r);else if(o===Dn)m=-2/(a-r),v=-(a+r)/(a-r);else if(o===Ys)m=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},As=new W,Cn=new pt,pg=new W(0,0,0),mg=new W(1,1,1),Pi=new W,uo=new W,vn=new W,Rd=new pt,Pd=new jn,fi=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(it(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-it(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(it(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-it(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(it(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-it(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ye("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Rd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Rd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Pd.setFromEuler(this),this.setFromQuaternion(Pd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};fi.DEFAULT_ORDER="XYZ";var ca=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},gg=0,Id=new W,Cs=new jn,ri=new pt,ho=new W,Yr=new W,_g=new W,xg=new jn,Ld=new W(1,0,0),Dd=new W(0,1,0),Nd=new W(0,0,1),Ud={type:"added"},yg={type:"removed"},Rs={type:"childadded",child:null},su={type:"childremoved",child:null},jt=class n extends Xn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:gg++}),this.uuid=hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new W,t=new fi,i=new jn,s=new W(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new pt},normalMatrix:{value:new Ze}}),this.matrix=new pt,this.matrixWorld=new pt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ca,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Cs.setFromAxisAngle(e,t),this.quaternion.multiply(Cs),this}rotateOnWorldAxis(e,t){return Cs.setFromAxisAngle(e,t),this.quaternion.premultiply(Cs),this}rotateX(e){return this.rotateOnAxis(Ld,e)}rotateY(e){return this.rotateOnAxis(Dd,e)}rotateZ(e){return this.rotateOnAxis(Nd,e)}translateOnAxis(e,t){return Id.copy(e).applyQuaternion(this.quaternion),this.position.add(Id.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Ld,e)}translateY(e){return this.translateOnAxis(Dd,e)}translateZ(e){return this.translateOnAxis(Nd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ri.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?ho.copy(e):ho.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Yr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ri.lookAt(Yr,ho,this.up):ri.lookAt(ho,Yr,this.up),this.quaternion.setFromRotationMatrix(ri),s&&(ri.extractRotation(s.matrixWorld),Cs.setFromRotationMatrix(ri),this.quaternion.premultiply(Cs.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?($e("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Ud),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null):$e("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(yg),su.child=e,this.dispatchEvent(su),su.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ri.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ri.multiply(e.parent.matrixWorld)),e.applyMatrix4(ri),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Ud),Rs.child=e,this.dispatchEvent(Rs),Rs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yr,e,_g),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yr,xg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=s,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};jt.DEFAULT_UP=new W(0,1,0);jt.DEFAULT_MATRIX_AUTO_UPDATE=!0;jt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var rs=class extends jt{constructor(){super(),this.isGroup=!0,this.type="Group"}},vg={type:"move"},Ks=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new rs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new rs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new W,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new W),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new rs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new W,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new W,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let p=t.getJointPose(v,i),g=this._getHandJoint(c,v);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&h>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(vg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new rs;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Of={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ii={h:0,s:0,l:0},fo={h:0,s:0,l:0};function ru(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Ke=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,lt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=lt.workingColorSpace){return this.r=e,this.g=t,this.b=i,lt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=lt.workingColorSpace){if(e=Qu(e,1),t=it(t,0,1),i=it(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=ru(a,r,e+1/3),this.g=ru(a,r,e),this.b=ru(a,r,e-1/3)}return lt.colorSpaceToWorking(this,s),this}setStyle(e,t=Ft){function i(r){r!==void 0&&parseFloat(r)<1&&Ye("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ye("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ye("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ft){let i=Of[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ye("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=di(e.r),this.g=di(e.g),this.b=di(e.b),this}copyLinearToSRGB(e){return this.r=Xs(e.r),this.g=Xs(e.g),this.b=Xs(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ft){return lt.workingToColorSpace(an.copy(this),e),Math.round(it(an.r*255,0,255))*65536+Math.round(it(an.g*255,0,255))*256+Math.round(it(an.b*255,0,255))}getHexString(e=Ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=lt.workingColorSpace){lt.workingToColorSpace(an.copy(this),t);let i=an.r,s=an.g,r=an.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=lt.workingColorSpace){return lt.workingToColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=Ft){lt.workingToColorSpace(an.copy(this),e);let t=an.r,i=an.g,s=an.b;return e!==Ft?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Ii),this.setHSL(Ii.h+e,Ii.s+t,Ii.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Ii),e.getHSL(fo);let i=na(Ii.h,fo.h,t),s=na(Ii.s,fo.s,t),r=na(Ii.l,fo.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},an=new Ke;Ke.NAMES=Of;var Qs=class extends jt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new fi,this.environmentIntensity=1,this.environmentRotation=new fi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Rn=new W,ai=new W,au=new W,oi=new W,Ps=new W,Is=new W,Fd=new W,ou=new W,lu=new W,cu=new W,uu=new gt,hu=new gt,du=new gt,ui=class n{constructor(e=new W,t=new W,i=new W){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Rn.subVectors(e,t),s.cross(Rn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Rn.subVectors(s,t),ai.subVectors(i,t),au.subVectors(e,t);let a=Rn.dot(Rn),o=Rn.dot(ai),l=Rn.dot(au),c=ai.dot(ai),u=ai.dot(au),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(c*l-o*u)*h,m=(a*u-o*l)*h;return r.set(1-f-m,m,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,oi)===null?!1:oi.x>=0&&oi.y>=0&&oi.x+oi.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,oi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,oi.x),l.addScaledVector(a,oi.y),l.addScaledVector(o,oi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return uu.setScalar(0),hu.setScalar(0),du.setScalar(0),uu.fromBufferAttribute(e,t),hu.fromBufferAttribute(e,i),du.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(uu,r.x),a.addScaledVector(hu,r.y),a.addScaledVector(du,r.z),a}static isFrontFacing(e,t,i,s){return Rn.subVectors(i,t),ai.subVectors(e,t),Rn.cross(ai).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Rn.subVectors(this.c,this.b),ai.subVectors(this.a,this.b),Rn.cross(ai).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;Ps.subVectors(s,i),Is.subVectors(r,i),ou.subVectors(e,i);let l=Ps.dot(ou),c=Is.dot(ou);if(l<=0&&c<=0)return t.copy(i);lu.subVectors(e,s);let u=Ps.dot(lu),d=Is.dot(lu);if(u>=0&&d<=u)return t.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Ps,a);cu.subVectors(e,r);let f=Ps.dot(cu),m=Is.dot(cu);if(m>=0&&f<=m)return t.copy(r);let v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(Is,o);let p=u*m-f*d;if(p<=0&&d-u>=0&&f-m>=0)return Fd.subVectors(r,s),o=(d-u)/(d-u+(f-m)),t.copy(s).addScaledVector(Fd,o);let g=1/(p+v+h);return a=v*g,o=h*g,t.copy(i).addScaledVector(Ps,a).addScaledVector(Is,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Sn=class{constructor(e=new W(1/0,1/0,1/0),t=new W(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Pn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Pn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Pn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Pn):Pn.fromBufferAttribute(r,a),Pn.applyMatrix4(e.matrixWorld),this.expandByPoint(Pn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),po.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),po.copy(i.boundingBox)),po.applyMatrix4(e.matrixWorld),this.union(po)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Pn),Pn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Jr),mo.subVectors(this.max,Jr),Ls.subVectors(e.a,Jr),Ds.subVectors(e.b,Jr),Ns.subVectors(e.c,Jr),Li.subVectors(Ds,Ls),Di.subVectors(Ns,Ds),ts.subVectors(Ls,Ns);let t=[0,-Li.z,Li.y,0,-Di.z,Di.y,0,-ts.z,ts.y,Li.z,0,-Li.x,Di.z,0,-Di.x,ts.z,0,-ts.x,-Li.y,Li.x,0,-Di.y,Di.x,0,-ts.y,ts.x,0];return!fu(t,Ls,Ds,Ns,mo)||(t=[1,0,0,0,1,0,0,0,1],!fu(t,Ls,Ds,Ns,mo))?!1:(go.crossVectors(Li,Di),t=[go.x,go.y,go.z],fu(t,Ls,Ds,Ns,mo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Pn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Pn).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(li[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),li[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),li[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),li[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),li[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),li[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),li[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),li[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(li),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},li=[new W,new W,new W,new W,new W,new W,new W,new W],Pn=new W,po=new Sn,Ls=new W,Ds=new W,Ns=new W,Li=new W,Di=new W,ts=new W,Jr=new W,mo=new W,go=new W,ns=new W;function fu(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){ns.fromArray(n,r);let o=s.x*Math.abs(ns.x)+s.y*Math.abs(ns.y)+s.z*Math.abs(ns.z),l=e.dot(ns),c=t.dot(ns),u=i.dot(ns);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Vt=new W,_o=new We,bg=0,Ht=class extends Xn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:bg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Zu,this.updateRanges=[],this.gpuType=Bn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)_o.fromBufferAttribute(this,t),_o.applyMatrix3(e),this.setXY(t,_o.x,_o.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix3(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Ln(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Ln(t,this.array)),t}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Ln(t,this.array)),t}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Ln(t,this.array)),t}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Ln(t,this.array)),t}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var ua=class extends Ht{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var ha=class extends Ht{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Xt=class extends Ht{constructor(e,t,i){super(new Float32Array(e),t,i)}},Sg=new Sn,$r=new W,pu=new W,Nn=class{constructor(e=new W,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Sg.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;$r.subVectors(e,this.center);let t=$r.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector($r,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(pu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint($r.copy(e.center).add(pu)),this.expandByPoint($r.copy(e.center).sub(pu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},Mg=0,Tn=new pt,mu=new jt,Us=new W,bn=new Sn,Zr=new Sn,$t=new W,Gt=class n extends Xn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Mg++}),this.uuid=hi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(qm(e)?ha:ua)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ze().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Tn.makeRotationFromQuaternion(e),this.applyMatrix4(Tn),this}rotateX(e){return Tn.makeRotationX(e),this.applyMatrix4(Tn),this}rotateY(e){return Tn.makeRotationY(e),this.applyMatrix4(Tn),this}rotateZ(e){return Tn.makeRotationZ(e),this.applyMatrix4(Tn),this}translate(e,t,i){return Tn.makeTranslation(e,t,i),this.applyMatrix4(Tn),this}scale(e,t,i){return Tn.makeScale(e,t,i),this.applyMatrix4(Tn),this}lookAt(e){return mu.lookAt(e),mu.updateMatrix(),this.applyMatrix4(mu.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Us).negate(),this.translate(Us.x,Us.y,Us.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Xt(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ye("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new W(-1/0,-1/0,-1/0),new W(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];bn.setFromBufferAttribute(r),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,bn.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,bn.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(bn.min),this.boundingBox.expandByPoint(bn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&$e('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){$e("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new W,1/0);return}if(e){let i=this.boundingSphere.center;if(bn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Zr.setFromBufferAttribute(o),this.morphTargetsRelative?($t.addVectors(bn.min,Zr.min),bn.expandByPoint($t),$t.addVectors(bn.max,Zr.max),bn.expandByPoint($t)):(bn.expandByPoint(Zr.min),bn.expandByPoint(Zr.max))}bn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)$t.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared($t));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)$t.fromBufferAttribute(o,c),l&&(Us.fromBufferAttribute(e,c),$t.add(Us)),s=Math.max(s,i.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&$e('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){$e("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ht(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new W,l[x]=new W;let c=new W,u=new W,d=new W,h=new We,f=new We,m=new We,v=new W,p=new W;function g(x,M,L){c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,M),d.fromBufferAttribute(i,L),h.fromBufferAttribute(r,x),f.fromBufferAttribute(r,M),m.fromBufferAttribute(r,L),u.sub(c),d.sub(c),f.sub(h),m.sub(h);let R=1/(f.x*m.y-m.x*f.y);isFinite(R)&&(v.copy(u).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(R),p.copy(d).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(R),o[x].add(v),o[M].add(v),o[L].add(v),l[x].add(p),l[M].add(p),l[L].add(p))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let x=0,M=A.length;x<M;++x){let L=A[x],R=L.start,P=L.count;for(let B=R,N=R+P;B<N;B+=3)g(e.getX(B+0),e.getX(B+1),e.getX(B+2))}let C=new W,y=new W,T=new W,b=new W;function w(x){T.fromBufferAttribute(s,x),b.copy(T);let M=o[x];C.copy(M),C.sub(T.multiplyScalar(T.dot(M))).normalize(),y.crossVectors(b,M);let R=y.dot(l[x])<0?-1:1;a.setXYZW(x,C.x,C.y,C.z,R)}for(let x=0,M=A.length;x<M;++x){let L=A[x],R=L.start,P=L.count;for(let B=R,N=R+P;B<N;B+=3)w(e.getX(B+0)),w(e.getX(B+1)),w(e.getX(B+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);let s=new W,r=new W,a=new W,o=new W,l=new W,c=new W,u=new W,d=new W;if(e)for(let h=0,f=e.count;h<f;h+=3){let m=e.getX(h+0),v=e.getX(h+1),p=e.getX(h+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,p),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,p),o.add(u),l.add(u),c.add(u),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),f=0,m=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*u;for(let g=0;g<u;g++)h[m++]=c[f++]}return new Ht(h,u,d)}if(this.index===null)return Ye("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],f=e(h,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},da=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Zu,this.updateRanges=[],this.version=0,this.uuid=hi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=hi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},fn=new W,ln=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.applyMatrix4(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.applyNormalMatrix(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.transformDirection(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Ln(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=bt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=bt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Ln(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Ln(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Ln(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Ln(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=bt(t,this.array),i=bt(i,this.array),s=bt(s,this.array),r=bt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){oa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){oa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},gu=new W,wg=new W,Eg=new Ze,In=class{constructor(e=new W(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=gu.subVectors(i,t).cross(wg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(gu),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Eg.getNormalMatrix(e),s=this.coplanarPoint(gu).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Tg=0,qn=class extends Xn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Tg++}),this.uuid=hi(),this.name="",this.type="Material",this.blending=or,this.side=Vi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Nu,this.blendDst=Uu,this.blendEquation=us,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ke(0,0,0),this.blendAlpha=0,this.depthFunc=js,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Tf,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Oo,this.stencilZFail=Oo,this.stencilZPass=Oo,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ye(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ye(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new Ke().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new In().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new We().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new We().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},er=class extends qn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Fs,Kr=new W,Os=new W,Bs=new W,ks=new We,Qr=new We,Bf=new pt,xo=new W,ea=new W,yo=new W,Od=new We,_u=new We,Bd=new We,fa=class extends jt{constructor(e=new er){if(super(),this.isSprite=!0,this.type="Sprite",Fs===void 0){Fs=new Gt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new da(t,5);Fs.setIndex([0,1,2,0,2,3]),Fs.setAttribute("position",new ln(i,3,0,!1)),Fs.setAttribute("uv",new ln(i,2,3,!1))}this.geometry=Fs,this.material=e,this.center=new We(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&$e('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Os.setFromMatrixScale(this.matrixWorld),Bf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Bs.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Os.multiplyScalar(-Bs.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let a=this.center;vo(xo.set(-.5,-.5,0),Bs,a,Os,s,r),vo(ea.set(.5,-.5,0),Bs,a,Os,s,r),vo(yo.set(.5,.5,0),Bs,a,Os,s,r),Od.set(0,0),_u.set(1,0),Bd.set(1,1);let o=e.ray.intersectTriangle(xo,ea,yo,!1,Kr);if(o===null&&(vo(ea.set(-.5,.5,0),Bs,a,Os,s,r),_u.set(0,1),o=e.ray.intersectTriangle(xo,yo,ea,!1,Kr),o===null))return;let l=e.ray.origin.distanceTo(Kr);l<e.near||l>e.far||t.push({distance:l,point:Kr.clone(),uv:ui.getInterpolation(Kr,xo,ea,yo,Od,_u,Bd,new We),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function vo(n,e,t,i,s,r){ks.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Qr.x=r*ks.x-s*ks.y,Qr.y=s*ks.x+r*ks.y):Qr.copy(ks),n.copy(e),n.x+=Qr.x,n.y+=Qr.y,n.applyMatrix4(Bf)}var ci=new W,xu=new W,bo=new W,So=new W,pa=class{constructor(e=new W,t=new W(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ci)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ci.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ci.copy(this.origin).addScaledVector(this.direction,t),ci.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){xu.copy(e).add(t).multiplyScalar(.5),bo.copy(t).sub(e).normalize(),So.copy(this.origin).sub(xu);let r=e.distanceTo(t)*.5,a=-this.direction.dot(bo),o=So.dot(this.direction),l=-So.dot(bo),c=So.lengthSq(),u=Math.abs(1-a*a),d,h,f,m;if(u>0)if(d=a*l-o,h=a*o-l,m=r*u,d>=0)if(h>=-m)if(h<=m){let v=1/u;d*=v,h*=v,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-m?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=m?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(xu).addScaledVector(bo,h),f}intersectSphere(e,t){if(e.radius<0)return null;ci.subVectors(e.center,this.origin);let i=ci.dot(this.direction),s=ci.dot(ci)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ci)!==null}intersectTriangle(e,t,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,f=e.z-a.z,m=t.x-a.x,v=t.y-a.y,p=t.z-a.z,g=i.x-a.x,A=i.y-a.y,C=i.z-a.z,y=Math.abs(l),T=Math.abs(c),b=Math.abs(u),w,x,M,L,R,P,B,N,H,j,Y,X;if(y>=T&&y>=b?(M=l,P=d,H=m,X=g,l>=0?(w=c,x=u,L=h,R=f,B=v,N=p,j=A,Y=C):(w=u,x=c,L=f,R=h,B=p,N=v,j=C,Y=A)):T>=b?(M=c,P=h,H=v,X=A,c>=0?(w=u,x=l,L=f,R=d,B=p,N=m,j=C,Y=g):(w=l,x=u,L=d,R=f,B=m,N=p,j=g,Y=C)):(M=u,P=f,H=p,X=C,u>=0?(w=l,x=c,L=d,R=h,B=m,N=v,j=g,Y=A):(w=c,x=l,L=h,R=d,B=v,N=m,j=A,Y=g)),M===0)return null;let U=w/M,q=x/M,Q=1/M,ee=L-U*P,ue=R-q*P,xe=B-U*H,_e=N-q*H,De=j-U*X,te=Y-q*X,oe=De*_e-te*xe,me=ee*te-ue*De,Re=xe*ue-_e*ee;if(s){if(oe<0||me<0||Re<0)return null}else if((oe<0||me<0||Re<0)&&(oe>0||me>0||Re>0))return null;let we=oe+me+Re;if(we===0)return null;let Je=Q*(oe*P+me*H+Re*X);return(we>0?Je<0:Je>0)?null:this.at(Je/we,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},os=class extends qn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=fl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},kd=new pt,is=new pa,Mo=new Nn,zd=new W,wo=new W,Eo=new W,To=new W,yu=new W,Ao=new W,Vd=new W,Co=new W,qt=class extends jt{constructor(e=new Gt,t=new os){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Ao.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],d=r[l];u!==0&&(yu.fromBufferAttribute(d,e),a?Ao.addScaledVector(yu,u):Ao.addScaledVector(yu.sub(t),u))}t.add(Ao)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Mo.copy(i.boundingSphere),Mo.applyMatrix4(r),is.copy(e.ray).recast(e.near),!(Mo.containsPoint(is.origin)===!1&&(is.intersectSphere(Mo,zd)===null||is.origin.distanceToSquared(zd)>(e.far-e.near)**2))&&(kd.copy(r).invert(),is.copy(e.ray).applyMatrix4(kd),!(i.boundingBox!==null&&is.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,is)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=h.length;m<v;m++){let p=h[m],g=a[p.materialIndex],A=Math.max(p.start,f.start),C=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let y=A,T=C;y<T;y+=3){let b=o.getX(y),w=o.getX(y+1),x=o.getX(y+2);s=Ro(this,g,e,i,c,u,d,b,w,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let p=m,g=v;p<g;p+=3){let A=o.getX(p),C=o.getX(p+1),y=o.getX(p+2);s=Ro(this,a,e,i,c,u,d,A,C,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=h.length;m<v;m++){let p=h[m],g=a[p.materialIndex],A=Math.max(p.start,f.start),C=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let y=A,T=C;y<T;y+=3){let b=y,w=y+1,x=y+2;s=Ro(this,g,e,i,c,u,d,b,w,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let p=m,g=v;p<g;p+=3){let A=p,C=p+1,y=p+2;s=Ro(this,a,e,i,c,u,d,A,C,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function Ag(n,e,t,i,s,r,a,o){let l;if(e.side===Kt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Vi,o),l===null)return null;Co.copy(o),Co.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(Co);return c<t.near||c>t.far?null:{distance:c,point:Co.clone(),object:n}}function Ro(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,wo),n.getVertexPosition(l,Eo),n.getVertexPosition(c,To);let u=Ag(n,e,t,i,wo,Eo,To,Vd);if(u){let d=new W;ui.getBarycoord(Vd,wo,Eo,To,d),s&&(u.uv=ui.getInterpolatedAttribute(s,o,l,c,d,new We)),r&&(u.uv1=ui.getInterpolatedAttribute(r,o,l,c,d,new We)),a&&(u.normal=ui.getInterpolatedAttribute(a,o,l,c,d,new W),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new W,materialIndex:0};ui.getNormal(wo,Eo,To,h.normal),u.face=h,u.barycoord=d}return u}var ls=class extends Ot{constructor(e=null,t=1,i=1,s,r,a,o,l,c=Zt,u=Zt,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ss=new Nn,Cg=new We(.5,.5),Po=new W,tr=class{constructor(e=new In,t=new In,i=new In,s=new In,r=new In,a=new In){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Dn,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],m=r[8],v=r[9],p=r[10],g=r[11],A=r[12],C=r[13],y=r[14],T=r[15];if(s[0].setComponents(c-a,f-u,g-m,T-A).normalize(),s[1].setComponents(c+a,f+u,g+m,T+A).normalize(),s[2].setComponents(c+o,f+d,g+v,T+C).normalize(),s[3].setComponents(c-o,f-d,g-v,T-C).normalize(),i)s[4].setComponents(l,h,p,y).normalize(),s[5].setComponents(c-l,f-h,g-p,T-y).normalize();else if(s[4].setComponents(c-l,f-h,g-p,T-y).normalize(),t===Dn)s[5].setComponents(c+l,f+h,g+p,T+y).normalize();else if(t===Ys)s[5].setComponents(l,h,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ss.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ss.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ss)}intersectsSprite(e){ss.center.set(0,0,0);let t=Cg.distanceTo(e.center);return ss.radius=.7071067811865476+t,ss.applyMatrix4(e.matrixWorld),this.intersectsSphere(ss)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Po.x=s.normal.x>0?e.max.x:e.min.x,Po.y=s.normal.y>0?e.max.y:e.min.y,Po.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Po)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var cs=class extends qn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new Ke(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Hd=new pt,Au=new pa,Io=new Nn,Lo=new W,Ui=class extends jt{constructor(e=new Gt,t=new cs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Io.copy(i.boundingSphere),Io.applyMatrix4(s),Io.radius+=r,e.ray.intersectsSphere(Io)===!1)return;Hd.copy(s).invert(),Au.copy(e.ray).applyMatrix4(Hd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=h,v=f;m<v;m++){let p=c.getX(m);Lo.fromBufferAttribute(d,p),Gd(Lo,p,l,s,e,t,this)}}else{let h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let m=h,v=f;m<v;m++)Lo.fromBufferAttribute(d,m),Gd(Lo,m,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Gd(n,e,t,i,s,r,a){let o=Au.distanceSqToPoint(n);if(o<t){let l=new W;Au.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ma=class extends Ot{constructor(e=[],t=Hi,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},nr=class extends Ot{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Fi=class extends Ot{constructor(e,t,i=On,s,r,a,o=Zt,l=Zt,c,u=Wn,d=1){if(u!==Wn&&u!==Gi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Zs(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},$o=class extends Fi{constructor(e,t=On,i=Hi,s,r,a=Zt,o=Zt,l,c=Wn){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ga=class extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ir=class n extends Gt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,f=0;m("z","y","x",-1,-1,i,t,e,a,r,0),m("z","y","x",1,-1,i,t,-e,a,r,1),m("x","z","y",1,1,e,i,t,s,a,2),m("x","z","y",1,-1,e,i,-t,s,a,3),m("x","y","z",1,-1,e,t,i,s,r,4),m("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Xt(c,3)),this.setAttribute("normal",new Xt(u,3)),this.setAttribute("uv",new Xt(d,2));function m(v,p,g,A,C,y,T,b,w,x,M){let L=y/w,R=T/x,P=y/2,B=T/2,N=b/2,H=w+1,j=x+1,Y=0,X=0,U=new W;for(let q=0;q<j;q++){let Q=q*R-B;for(let ee=0;ee<H;ee++){let ue=ee*L-P;U[v]=ue*A,U[p]=Q*C,U[g]=N,c.push(U.x,U.y,U.z),U[v]=0,U[p]=0,U[g]=b>0?1:-1,u.push(U.x,U.y,U.z),d.push(ee/w),d.push(1-q/x),Y+=1}}for(let q=0;q<x;q++)for(let Q=0;Q<w;Q++){let ee=h+Q+H*q,ue=h+Q+H*(q+1),xe=h+(Q+1)+H*(q+1),_e=h+(Q+1)+H*q;l.push(ee,ue,_e),l.push(ue,xe,_e),X+=6}o.addGroup(f,X,M),f+=X,h+=Y}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var _a=class n extends Gt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=e/o,h=t/l,f=[],m=[],v=[],p=[];for(let g=0;g<u;g++){let A=g*h-a;for(let C=0;C<c;C++){let y=C*d-r;m.push(y,-A,0),v.push(0,0,1),p.push(C/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let A=0;A<o;A++){let C=A+c*g,y=A+c*(g+1),T=A+1+c*(g+1),b=A+1+c*g;f.push(C,y,b),f.push(y,T,b)}this.setIndex(f),this.setAttribute("position",new Xt(m,3)),this.setAttribute("normal",new Xt(v,3)),this.setAttribute("uv",new Xt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var Oi=class n extends Gt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,u=[],d=new W,h=new W,f=[],m=[],v=[],p=[];for(let g=0;g<=i;g++){let A=[],C=g/i,y=a+C*o,T=e*Math.cos(y),b=Math.sqrt(e*e-T*T),w=0;g===0&&a===0?w=.5/t:g===i&&l===Math.PI&&(w=-.5/t);for(let x=0;x<=t;x++){let M=x/t,L=s+M*r;d.x=-b*Math.cos(L),d.y=T,d.z=b*Math.sin(L),m.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),p.push(M+w,1-C),A.push(c++)}u.push(A)}for(let g=0;g<i;g++)for(let A=0;A<t;A++){let C=u[g][A+1],y=u[g][A],T=u[g+1][A],b=u[g+1][A+1];(g!==0||a>0)&&f.push(C,y,b),(g!==i-1||l<Math.PI)&&f.push(y,T,b)}this.setIndex(f),this.setAttribute("position",new Xt(m,3)),this.setAttribute("normal",new Xt(v,3)),this.setAttribute("uv",new Xt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var xa=class extends Gt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],i=new Set,s=new W,r=new W;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){let d=l[c],h=d.start,f=d.count;for(let m=h,v=h+f;m<v;m+=3)for(let p=0;p<3;p++){let g=o.getX(m+p),A=o.getX(m+(p+1)%3);s.fromBufferAttribute(a,g),r.fromBufferAttribute(a,A),Wd(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let u=3*o+c,d=3*o+(c+1)%3;s.fromBufferAttribute(a,u),r.fromBufferAttribute(a,d),Wd(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new Xt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Wd(n,e,t){let i=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(i)===!0||t.has(s)===!0?!1:(t.add(i),t.add(s),!0)}function ds(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(Xd(s))s.isRenderTargetTexture?(Ye("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Xd(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function cn(n){let e={};for(let t=0;t<n.length;t++){let i=ds(n[t]);for(let s in i)e[s]=i[s]}return e}function Xd(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Rg(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function th(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:lt.workingColorSpace}var Fa={clone:ds,merge:cn},Pg=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Ig=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Dt=class extends qn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Pg,this.fragmentShader=Ig,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ds(e.uniforms),this.uniformsGroups=Rg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new Ke().setHex(s.value);break;case"v2":this.uniforms[i].value=new We().fromArray(s.value);break;case"v3":this.uniforms[i].value=new W().fromArray(s.value);break;case"v4":this.uniforms[i].value=new gt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ze().fromArray(s.value);break;case"m4":this.uniforms[i].value=new pt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Zo=class extends Dt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ya=class extends qn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new Ke(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ke(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ql,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new fi,this.combine=fl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Ko=class extends qn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=wf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Qo=class extends qn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function zs(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function vu(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var Bi=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},el=class extends Bi{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wu,endingEnd:wu}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Eu:r=e,o=2*t-i;break;case Tu:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Eu:a=e,l=2*i-t;break;case Tu:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,m=(i-t)/(s-t),v=m*m,p=v*m,g=-h*p+2*h*v-h*m,A=(1+h)*p+(-1.5-2*h)*v+(-.5+h)*m+1,C=(-1-f)*p+(1.5+f)*v+.5*m,y=f*p-f*v;for(let T=0;T!==o;++T)r[T]=g*a[u+T]+A*a[c+T]+C*a[l+T]+y*a[d+T];return r}},tl=class extends Bi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(i-t)/(s-t),d=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*d+a[l+h]*u;return r}},nl=class extends Bi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},il=class extends Bi{interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let m=(i-t)/(s-t),v=1-m;for(let p=0;p!==o;++p)r[p]=a[c+p]*v+a[l+p]*m;return r}let h=o*2,f=e-1;for(let m=0;m!==o;++m){let v=a[c+m],p=a[l+m],g=f*h+m*2,A=d[g],C=d[g+1],y=e*h+m*2,T=u[y],b=u[y+1],w=Dg(i,t,A,T,s);r[m]=kf(w,v,C,b,p)}return r}};function kf(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function Lg(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function Dg(n,e,t,i,s){let r=(n-e)/(s-e);for(let a=0;a<8;a++){let o=kf(r,e,t,i,s)-n;if(Math.abs(o)<1e-10)break;let l=Lg(r,e,t,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Mn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=zs(t,this.TimeBufferType),this.values=zs(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:zs(e.times,Array),values:zs(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),vu(e.settings)&&(i.settings={inTangents:zs(e.settings.inTangents,Array),outTangents:zs(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new nl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new tl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new el(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new il(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ia:t=this.InterpolantFactoryMethodDiscrete;break;case jo:t=this.InterpolantFactoryMethodLinear;break;case Fo:t=this.InterpolantFactoryMethodSmooth;break;case Mu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ye("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ia;case this.InterpolantFactoryMethodLinear:return jo;case this.InterpolantFactoryMethodSmooth:return Fo;case this.InterpolantFactoryMethodBezier:return Mu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;vu(this.settings)&&(jd(this.settings.inTangents,e),jd(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&($e("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&($e("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){$e("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){$e("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Ym(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){$e("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Fo,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*i,h=d-i,f=d+i;for(let m=0;m!==i;++m){let v=t[d+m];if(v!==t[h+m]||v!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*i,h=a*i;for(let f=0;f!==i;++f)t[h+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,vu(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function jd(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}Mn.prototype.ValueTypeName="";Mn.prototype.TimeBufferType=Float32Array;Mn.prototype.ValueBufferType=Float32Array;Mn.prototype.DefaultInterpolation=jo;var ki=class extends Mn{constructor(e,t,i){super(e,t,i)}};ki.prototype.ValueTypeName="bool";ki.prototype.ValueBufferType=Array;ki.prototype.DefaultInterpolation=ia;ki.prototype.InterpolantFactoryMethodLinear=void 0;ki.prototype.InterpolantFactoryMethodSmooth=void 0;var sl=class extends Mn{constructor(e,t,i,s){super(e,t,i,s)}};sl.prototype.ValueTypeName="color";var rl=class extends Mn{constructor(e,t,i,s){super(e,t,i,s)}};rl.prototype.ValueTypeName="number";var al=class extends Bi{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)jn.slerpFlat(r,0,a,c-o,a,c,l);return r}},va=class extends Mn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new al(this.times,this.values,this.getValueSize(),e)}};va.prototype.ValueTypeName="quaternion";va.prototype.InterpolantFactoryMethodSmooth=void 0;var zi=class extends Mn{constructor(e,t,i){super(e,t,i)}};zi.prototype.ValueTypeName="string";zi.prototype.ValueBufferType=Array;zi.prototype.DefaultInterpolation=ia;zi.prototype.InterpolantFactoryMethodLinear=void 0;zi.prototype.InterpolantFactoryMethodSmooth=void 0;var ol=class extends Mn{constructor(e,t,i,s){super(e,t,i,s)}};ol.prototype.ValueTypeName="vector";var ll=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let f=c[d],m=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},zf=new ll,cl=class{constructor(e){this.manager=e!==void 0?e:zf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};cl.DEFAULT_MATERIAL_NAME="__DEFAULT";var ba=class extends jt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Ke(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var bu=new pt,qd=new W,Yd=new W,ul=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.mapType=Qt,this.map=null,this.mapPass=null,this.matrix=new pt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new tr,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new gt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;qd.setFromMatrixPosition(e.matrixWorld),t.position.copy(qd),Yd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Yd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){bu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(bu,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Ys||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(bu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Do=new W,No=new jn,Gn=new W,Sa=class extends jt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new pt,this.projectionMatrix=new pt,this.projectionMatrixInverse=new pt,this.coordinateSystem=Dn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Do,No,Gn),Gn.x===1&&Gn.y===1&&Gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Do,No,Gn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Do,No,Gn),Gn.x===1&&Gn.y===1&&Gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Do,No,Gn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ni=new W,Jd=new We,$d=new We,on=class extends Sa{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=$s*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ta*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return $s*2*Math.atan(Math.tan(ta*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ni.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z),Ni.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ni.x,Ni.y).multiplyScalar(-e/Ni.z)}getViewSize(e,t){return this.getViewBounds(e,Jd,$d),t.subVectors($d,Jd)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ta*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var sr=class extends Sa{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Cu=class extends ul{constructor(){super(new sr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ma=class extends ba{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(jt.DEFAULT_UP),this.updateMatrix(),this.target=new jt,this.shadow=new Cu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},wa=class extends ba{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ea=class extends Gt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var Vs=-90,Hs=1,hl=class extends jt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new on(Vs,Hs,e,t);s.layers=this.layers,this.add(s);let r=new on(Vs,Hs,e,t);r.layers=this.layers,this.add(r);let a=new on(Vs,Hs,e,t);a.layers=this.layers,this.add(a);let o=new on(Vs,Hs,e,t);o.layers=this.layers,this.add(o);let l=new on(Vs,Hs,e,t);l.layers=this.layers,this.add(l);let c=new on(Vs,Hs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Dn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Ys)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},dl=class extends on{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var nh="\\[\\]\\.:\\/",Ng=new RegExp("["+nh+"]","g"),ih="[^"+nh+"]",Ug="[^"+nh.replace("\\.","")+"]",Fg=/((?:WC+[\/:])*)/.source.replace("WC",ih),Og=/(WCOD+)?/.source.replace("WCOD",Ug),Bg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",ih),kg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",ih),zg=new RegExp("^"+Fg+Og+Bg+kg+"$"),Vg=["material","materials","bones","map"],Ru=class{constructor(e,t,i){let s=i||Pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Pt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ng,"")}static parseTrackName(e){let t=zg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Vg.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ye("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){$e("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){$e("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){$e("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){$e("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){$e("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){$e("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;$e("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){$e("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Pt.Composite=Ru;Pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Pt.prototype.GetterByBindingType=[Pt.prototype._getValue_direct,Pt.prototype._getValue_array,Pt.prototype._getValue_arrayElement,Pt.prototype._getValue_toArray];Pt.prototype.SetterByBindingTypeAndVersioning=[[Pt.prototype._setValue_direct,Pt.prototype._setValue_direct_setNeedsUpdate,Pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_array,Pt.prototype._setValue_array_setNeedsUpdate,Pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_arrayElement,Pt.prototype._setValue_arrayElement_setNeedsUpdate,Pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Pt.prototype._setValue_fromArray,Pt.prototype._setValue_fromArray_setNeedsUpdate,Pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var sM=new Float32Array(1);var Yn=class extends da{constructor(e,t,i=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var Pu=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}},Zd=new We,rr=class{constructor(e=new We(1/0,1/0),t=new We(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Zd.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Zd).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},Kd=new W,Uo=new W,Gs=new W,Ws=new W,Su=new W,Hg=new W,Gg=new W,Ta=class{constructor(e=new W,t=new W){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){Kd.subVectors(e,this.start),Uo.subVectors(this.end,this.start);let i=Uo.dot(Uo);if(i===0)return 0;let r=Uo.dot(Kd)/i;return t&&(r=it(r,0,1)),r}closestPointToPoint(e,t,i){let s=this.closestPointToPointParameter(e,t);return this.delta(i).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=Hg,i=Gg){let s=10000000000000001e-32,r,a,o=this.start,l=e.start,c=this.end,u=e.end;Gs.subVectors(c,o),Ws.subVectors(u,l),Su.subVectors(o,l);let d=Gs.dot(Gs),h=Ws.dot(Ws),f=Ws.dot(Su);if(d<=s&&h<=s)return t.copy(o),i.copy(l),t.sub(i),t.dot(t);if(d<=s)r=0,a=f/h,a=it(a,0,1);else{let m=Gs.dot(Su);if(h<=s)a=0,r=it(-m/d,0,1);else{let v=Gs.dot(Ws),p=d*h-v*v;p!==0?r=it((v*f-m*h)/p,0,1):r=0,a=(v*r+f)/h,a<0?(a=0,r=it(-m/d,0,1)):a>1&&(a=1,r=it((v-m)/d,0,1))}}return t.copy(o).addScaledVector(Gs,r),i.copy(l).addScaledVector(Ws,a),t.distanceToSquared(i)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function sh(n,e,t,i){let s=Wg(i);switch(t){case Yu:return n*e;case $u:return n*e/s.components*s.byteLength;case vl:return n*e/s.components*s.byteLength;case Wi:return n*e*2/s.components*s.byteLength;case bl:return n*e*2/s.components*s.byteLength;case Ju:return n*e*3/s.components*s.byteLength;case pn:return n*e*4/s.components*s.byteLength;case Sl:return n*e*4/s.components*s.byteLength;case Pa:case Ia:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case La:case Da:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case wl:case Tl:return Math.max(n,16)*Math.max(e,8)/4;case Ml:case El:return Math.max(n,8)*Math.max(e,8)/2;case Al:case Cl:case Pl:case Il:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Rl:case Na:case Ll:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Dl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Nl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Ul:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Fl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Ol:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Bl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case kl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case zl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Vl:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Hl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Gl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Wl:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Xl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case jl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case ql:case Yl:case Jl:return Math.ceil(n/4)*Math.ceil(e/4)*16;case $l:case Zl:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ua:case Kl:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Wg(n){switch(n){case Qt:case Wu:return{byteLength:1,components:1};case lr:case Xu:case kn:return{byteLength:2,components:1};case xl:case yl:return{byteLength:2,components:4};case On:case _l:case Bn:return{byteLength:4,components:1};case ju:case qu:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ye("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function lp(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function jg(n){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<d.length;f++){let m=d[h],v=d[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++h,d[h]=v)}d.length=h+1;for(let f=0,m=d.length;f<m;f++){let v=d[f];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var qg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Yg=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,Jg=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,$g=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Zg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Kg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Qg=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,e0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,t0=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec4 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 );
	}
#endif`,n0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,i0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,s0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,r0=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,a0=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,o0=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,l0=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,c0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,d0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,f0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,p0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,m0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec4( 1.0 );
#endif
#ifdef USE_COLOR_ALPHA
	vColor *= color;
#elif defined( USE_COLOR )
	vColor.rgb *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.rgb *= instanceColor.rgb;
#endif
#ifdef USE_BATCHING_COLOR
	vColor *= getBatchingColor( getIndirectIndex( gl_DrawID ) );
#endif`,g0=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
#define inverseTransformDirection transformDirectionByInverseViewMatrix
vec3 transformNormalByInverseViewMatrix( in vec3 normal, in mat4 viewMatrix ) {
	return normalize( ( vec4( normal, 0.0 ) * viewMatrix ).xyz );
}
vec3 transformDirectionByInverseViewMatrix( in vec3 dir, in mat4 viewMatrix ) {
	return normalize( ( vec4( dir, 0.0 ) * viewMatrix ).xyz );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,_0=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,x0=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
#endif`,y0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,v0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,b0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,S0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,M0="gl_FragColor = linearToOutputTexel( gl_FragColor );",w0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,E0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * reflectVec );
		#ifdef ENVMAP_BLENDING_MULTIPLY
			outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_MIX )
			outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
		#elif defined( ENVMAP_BLENDING_ADD )
			outgoingLight += envColor.xyz * specularStrength * reflectivity;
		#endif
	#endif
#endif`,T0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,A0=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,C0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,R0=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,P0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,I0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,L0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,D0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,N0=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,U0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,F0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,O0=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,B0=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_SUN_LIGHTS > 0
	struct SunLight {
		vec3 direction;
		vec3 color;
	};
	uniform SunLight sunLights[ NUM_SUN_LIGHTS ];
	void getSunLightInfo( const in SunLight sunLight, out IncidentLight light ) {
		light.color = sunLight.color;
		light.direction = sunLight.direction;
		light.visible = true;
	}
#endif
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif
#include <lightprobes_pars_fragment>`,k0=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = transformNormalByInverseViewMatrix( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, pow4( roughness ) ) );
			reflectVec = transformDirectionByInverseViewMatrix( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_RETROREFLECTION
		vec3 getIBLRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 retroVec = normalize( mix( viewDir, normal, pow4( roughness ) ) );
				retroVec = transformDirectionByInverseViewMatrix( retroVec, viewMatrix );
				vec4 envMapColor = textureCubeUV( envMap, envMapRotation * retroVec, roughness );
				return envMapColor.rgb * envMapIntensity;
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
		#ifdef USE_RETROREFLECTION
			vec3 getIBLAnisotropyRetroRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
				#ifdef ENVMAP_TYPE_CUBE_UV
					vec3 bentNormal = cross( bitangent, viewDir );
					bentNormal = normalize( cross( bentNormal, bitangent ) );
					bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
					return getIBLRetroRadiance( viewDir, bentNormal, roughness );
				#else
					return vec3( 0.0 );
				#endif
			}
		#endif
	#endif
#endif`,z0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,V0=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,H0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,G0=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,W0=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.diffuseContribution = diffuseColor.rgb * ( 1.0 - metalnessFactor );
material.metalness = metalnessFactor;
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor;
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = vec3( 0.04 );
	material.specularColorBlended = mix( material.specularColor, diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_RETROREFLECTION
	material.retroreflectivity = retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.0001, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,X0=`uniform sampler2D dfgLUT;
struct PhysicalMaterial {
	vec3 diffuseColor;
	vec3 diffuseContribution;
	vec3 specularColor;
	vec3 specularColorBlended;
	float roughness;
	float metalness;
	float specularF90;
	float dispersion;
	vec2 dfg;
	vec3 multiScatteringCompensation;
	#ifdef USE_RETROREFLECTION
		float retroreflectivity;
	#endif
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0Dielectric;
		vec3 iridescenceF0Metallic;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		return 0.5 / max( gv + gl, EPSILON );
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColorBlended;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transpose( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float rInv = 1.0 / ( roughness + 0.1 );
	float a = -1.9362 + 1.0678 * roughness + 0.4573 * r2 - 0.8469 * rInv;
	float b = -0.6014 + 0.5538 * roughness - 0.4670 * r2 - 0.1255 * rInv;
	float DG = exp( a * dotNV + b );
	return saturate( DG );
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	vec2 fab = texture2D( dfgLUT, vec2( roughness, dotNV ) ).rg;
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec2 fab, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec2 fab, const in vec3 specularColor, const in float specularF90, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColorBlended * t2.x + ( material.specularF90 - material.specularColorBlended ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseContribution * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
		#ifdef USE_CLEARCOAT
			vec3 Ncc = geometryClearcoatNormal;
			vec2 uvClearcoat = LTC_Uv( Ncc, viewDir, material.clearcoatRoughness );
			vec4 t1Clearcoat = texture2D( ltc_1, uvClearcoat );
			vec4 t2Clearcoat = texture2D( ltc_2, uvClearcoat );
			mat3 mInvClearcoat = mat3(
				vec3( t1Clearcoat.x, 0, t1Clearcoat.y ),
				vec3(             0, 1,             0 ),
				vec3( t1Clearcoat.z, 0, t1Clearcoat.w )
			);
			vec3 fresnelClearcoat = material.clearcoatF0 * t2Clearcoat.x + ( material.clearcoatF90 - material.clearcoatF0 ) * t2Clearcoat.y;
			clearcoatSpecularDirect += lightColor * fresnelClearcoat * LTC_Evaluate( Ncc, viewDir, position, mInvClearcoat, rectCoords );
		#endif
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
 
 		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
 
 		float sheenAlbedoV = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
 		float sheenAlbedoL = IBLSheenBRDF( geometryNormal, directLight.direction, material.sheenRoughness );
 
 		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * max( sheenAlbedoV, sheenAlbedoL );
 
 		irradiance *= sheenEnergyComp;
 
 	#endif
	vec3 specularBRDF = BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	#ifdef USE_RETROREFLECTION
		vec3 retroViewDir = reflect( - geometryViewDir, geometryNormal );
		vec3 retroSpecularBRDF = BRDF_GGX( directLight.direction, retroViewDir, geometryNormal, material );
		specularBRDF = mix( specularBRDF, retroSpecularBRDF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directSpecular += irradiance * specularBRDF * material.multiScatteringCompensation;
	vec3 halfDir = normalize( directLight.direction + geometryViewDir );
	float dotVH = saturate( dot( geometryViewDir, halfDir ) );
	vec3 F = F_Schlick( material.specularColor, material.specularF90, dotVH );
	#ifdef USE_RETROREFLECTION
		vec3 retroHalfDir = normalize( directLight.direction + retroViewDir );
		float dotRetroVH = saturate( dot( retroViewDir, retroHalfDir ) );
		vec3 retroF = F_Schlick( material.specularColor, material.specularF90, dotRetroVH );
		F = mix( F, retroF, saturate( material.retroreflectivity ) );
	#endif
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - F );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScattering, multiScattering );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScattering, multiScattering );
	#endif
	vec3 diffuse = irradiance * BRDF_Lambert( material.diffuseContribution ) * ( 1.0 - singleScattering - multiScattering );
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		sheenSpecularIndirect += irradiance * material.sheenColor * sheenAlbedo * RECIPROCAL_PI;
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		diffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectDiffuse += diffuse;
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness ) * RECIPROCAL_PI;
 	#endif
	vec3 singleScatteringDielectric = vec3( 0.0 );
	vec3 multiScatteringDielectric = vec3( 0.0 );
	vec3 singleScatteringMetallic = vec3( 0.0 );
	vec3 multiScatteringMetallic = vec3( 0.0 );
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( material.dfg, material.specularColor, material.specularF90, material.iridescence, material.iridescenceF0Dielectric, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscatteringIridescence( material.dfg, material.diffuseColor, material.specularF90, material.iridescence, material.iridescenceF0Metallic, singleScatteringMetallic, multiScatteringMetallic );
	#else
		computeMultiscattering( material.dfg, material.specularColor, material.specularF90, singleScatteringDielectric, multiScatteringDielectric );
		computeMultiscattering( material.dfg, material.diffuseColor, material.specularF90, singleScatteringMetallic, multiScatteringMetallic );
	#endif
	vec3 singleScattering = mix( singleScatteringDielectric, singleScatteringMetallic, material.metalness );
	vec3 multiScattering = mix( multiScatteringDielectric, multiScatteringMetallic, material.metalness );
	vec3 totalScatteringDielectric = singleScatteringDielectric + multiScatteringDielectric;
	vec3 diffuse = material.diffuseContribution * ( 1.0 - totalScatteringDielectric );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	vec3 indirectSpecular = radiance * singleScattering;
	indirectSpecular += multiScattering * cosineWeightedIrradiance;
	vec3 indirectDiffuse = diffuse * cosineWeightedIrradiance;
	#ifdef USE_SHEEN
		float sheenAlbedo = IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
		float sheenEnergyComp = 1.0 - max3( material.sheenColor ) * sheenAlbedo;
		indirectSpecular *= sheenEnergyComp;
		indirectDiffuse *= sheenEnergyComp;
	#endif
	reflectedLight.indirectSpecular += indirectSpecular;
	reflectedLight.indirectDiffuse += indirectDiffuse;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,j0=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		vec3 iridescenceFresnelDielectric = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		vec3 iridescenceFresnelMetallic = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.diffuseColor );
		material.iridescenceFresnel = mix( iridescenceFresnelDielectric, iridescenceFresnelMetallic, material.metalness );
		material.iridescenceF0Dielectric = Schlick_to_F0( iridescenceFresnelDielectric, 1.0, dotNVi );
		material.iridescenceF0Metallic = Schlick_to_F0( iridescenceFresnelMetallic, 1.0, dotNVi );
	}
#endif
#ifdef STANDARD
	float dotNVms = saturate( dot( geometryNormal, geometryViewDir ) );
	material.dfg = texture2D( dfgLUT, vec2( material.roughness, dotNVms ) ).rg;
	#if ( NUM_SUN_LIGHTS > 0 || NUM_DIR_LIGHTS > 0 || NUM_POINT_LIGHTS > 0 || NUM_SPOT_LIGHTS > 0 )
		float EssMs = material.dfg.x + material.dfg.y;
		material.multiScatteringCompensation = 1.0 + material.specularColorBlended * ( 1.0 / EssMs - 1.0 );
	#endif
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS ) && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SUN_LIGHTS > 0 ) && defined( RE_Direct )
	SunLight sunLight;
	#if defined( USE_SHADOWMAP ) && NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHTS; i ++ ) {
		sunLight = sunLights[ i ];
		getSunLightInfo( sunLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SUN_LIGHT_SHADOWS )
		sunLightShadow = sunLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getSunShadow( sunShadowMap[ i ], sunLightShadow, UNROLLED_LOOP_INDEX ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
	#ifdef USE_LIGHT_PROBES_GRID
		vec3 probeWorldPos = ( ( vec4( geometryPosition, 1.0 ) - viewMatrix[ 3 ] ) * viewMatrix ).xyz;
		vec3 probeWorldNormal = transformNormalByInverseViewMatrix( geometryNormal, viewMatrix );
		irradiance += getLightProbeGridIrradiance( probeWorldPos, probeWorldNormal );
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,q0=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( ENVMAP_TYPE_CUBE_UV )
		#if defined( STANDARD ) || defined( LAMBERT ) || defined( PHONG )
			iblIrradiance += getIBLIrradiance( geometryNormal );
		#endif
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		vec3 iblRadiance = getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		vec3 iblRadiance = getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_RETROREFLECTION
		#ifdef USE_ANISOTROPY
			vec3 retroIBLRadiance = getIBLAnisotropyRetroRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
		#else
			vec3 retroIBLRadiance = getIBLRetroRadiance( geometryViewDir, geometryNormal, material.roughness );
		#endif
		iblRadiance = mix( iblRadiance, retroIBLRadiance, saturate( material.retroreflectivity ) );
	#endif
	radiance += iblRadiance;
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,Y0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,J0=`#ifdef USE_LIGHT_PROBES_GRID
uniform highp sampler3D probesSH;
uniform vec3 probesMin;
uniform vec3 probesMax;
uniform vec3 probesResolution;
vec3 getLightProbeGridIrradiance( vec3 worldPos, vec3 worldNormal ) {
	vec3 res = probesResolution;
	vec3 gridRange = probesMax - probesMin;
	vec3 resMinusOne = res - 1.0;
	vec3 probeSpacing = gridRange / resMinusOne;
	vec3 samplePos = worldPos + worldNormal * probeSpacing * 0.5;
	vec3 uvw = clamp( ( samplePos - probesMin ) / gridRange, 0.0, 1.0 );
	uvw = uvw * resMinusOne / res + 0.5 / res;
	float nz          = res.z;
	float paddedSlices = nz + 2.0;
	float atlasDepth  = 7.0 * paddedSlices;
	float uvZBase     = uvw.z * nz + 1.0;
	vec4 s0 = texture( probesSH, vec3( uvw.xy, ( uvZBase                       ) / atlasDepth ) );
	vec4 s1 = texture( probesSH, vec3( uvw.xy, ( uvZBase +       paddedSlices   ) / atlasDepth ) );
	vec4 s2 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 2.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s3 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 3.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s4 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 4.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s5 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 5.0 * paddedSlices   ) / atlasDepth ) );
	vec4 s6 = texture( probesSH, vec3( uvw.xy, ( uvZBase + 6.0 * paddedSlices   ) / atlasDepth ) );
	vec3 c0 = s0.xyz;
	vec3 c1 = vec3( s0.w, s1.xy );
	vec3 c2 = vec3( s1.zw, s2.x );
	vec3 c3 = s2.yzw;
	vec3 c4 = s3.xyz;
	vec3 c5 = vec3( s3.w, s4.xy );
	vec3 c6 = vec3( s4.zw, s5.x );
	vec3 c7 = s5.yzw;
	vec3 c8 = s6.xyz;
	float x = worldNormal.x, y = worldNormal.y, z = worldNormal.z;
	vec3 result = c0 * 0.886227;
	result += c1 * 2.0 * 0.511664 * y;
	result += c2 * 2.0 * 0.511664 * z;
	result += c3 * 2.0 * 0.511664 * x;
	result += c4 * 2.0 * 0.429043 * x * y;
	result += c5 * 2.0 * 0.429043 * y * z;
	result += c6 * ( 0.743125 * z * z - 0.247708 );
	result += c7 * 2.0 * 0.429043 * x * z;
	result += c8 * 0.429043 * ( x * x - y * y );
	return max( result, vec3( 0.0 ) );
}
#endif`,$0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Z0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,K0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,e_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,t_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,n_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,i_=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,s_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,r_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,a_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,o_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,l_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,c_=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,u_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,h_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#ifdef DOUBLE_SIDED
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#ifdef DOUBLE_SIDED
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,d_=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#if defined( USE_PACKED_NORMALMAP )
		mapN = vec3( mapN.xy, sqrt( saturate( 1.0 - dot( mapN.xy, mapN.xy ) ) ) );
	#endif
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,f_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,p_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,m_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,g_=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,__=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,x_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,y_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,v_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,b_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,S_=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	#ifdef USE_REVERSED_DEPTH_BUFFER
	
		return depth * ( far - near ) - far;
	#else
		return depth * ( near - far ) - near;
	#endif
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	
	#ifdef USE_REVERSED_DEPTH_BUFFER
		return ( near * far ) / ( ( near - far ) * depth - near );
	#else
		return ( near * far ) / ( ( far - near ) * depth - far );
	#endif
}`,M_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,w_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,E_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,T_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,A_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,C_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,R_=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		#define SUN_LIGHT_CASCADES 2
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#else
			uniform sampler2D sunShadowMap[ NUM_SUN_LIGHT_SHADOWS ];
		#endif
		uniform mat4 sunShadowMatrix[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		uniform vec4 sunShadowCascade[ NUM_SUN_LIGHT_SHADOWS * SUN_LIGHT_CASCADES ];
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
		struct SunLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SunLightShadow sunLightShadows[ NUM_SUN_LIGHT_SHADOWS ];
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#else
			uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		#endif
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform sampler2DShadow spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#else
			uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		#endif
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#if defined( SHADOWMAP_TYPE_PCF )
			uniform samplerCubeShadow pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#elif defined( SHADOWMAP_TYPE_BASIC )
			uniform samplerCube pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		#endif
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float interleavedGradientNoise( vec2 position ) {
			return fract( 52.9829189 * fract( dot( position, vec2( 0.06711056, 0.00583715 ) ) ) );
		}
		vec2 vogelDiskSample( int sampleIndex, int samplesCount, float phi ) {
			const float goldenAngle = 2.399963229728653;
			float r = sqrt( ( float( sampleIndex ) + 0.5 ) / float( samplesCount ) );
			float theta = float( sampleIndex ) * goldenAngle + phi;
			return vec2( cos( theta ), sin( theta ) ) * r;
		}
	#endif
	#if defined( SHADOWMAP_TYPE_PCF )
		float getShadow( sampler2DShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			shadowCoord.z += shadowBias;
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
				float radius = shadowRadius * texelSize.x;
				float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
				shadow = (
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 0, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 1, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 2, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 3, 5, phi ) * radius, shadowCoord.z ) ) +
					texture( shadowMap, vec3( shadowCoord.xy + vogelDiskSample( 4, 5, phi ) * radius, shadowCoord.z ) )
				) * 0.2;
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#elif defined( SHADOWMAP_TYPE_VSM )
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				vec2 distribution = texture2D( shadowMap, shadowCoord.xy ).rg;
				float mean = distribution.x;
				float variance = distribution.y * distribution.y;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					float hard_shadow = step( mean, shadowCoord.z );
				#else
					float hard_shadow = step( shadowCoord.z, mean );
				#endif
				
				if ( hard_shadow == 1.0 ) {
					shadow = 1.0;
				} else {
					variance = max( variance, 0.0000001 );
					float d = shadowCoord.z - mean;
					float p_max = variance / ( variance + d * d );
					p_max = clamp( ( p_max - 0.3 ) / 0.65, 0.0, 1.0 );
					shadow = max( hard_shadow, p_max );
				}
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#else
		float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
			float shadow = 1.0;
			shadowCoord.xyz /= shadowCoord.w;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				shadowCoord.z -= shadowBias;
			#else
				shadowCoord.z += shadowBias;
			#endif
			bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
			bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
			if ( frustumTest ) {
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;
				#ifdef USE_REVERSED_DEPTH_BUFFER
					shadow = step( depth, shadowCoord.z );
				#else
					shadow = step( shadowCoord.z, depth );
				#endif
			}
			return mix( 1.0, shadow, shadowIntensity );
		}
	#endif
	#if NUM_SUN_LIGHT_SHADOWS > 0
		float getSunShadow(
			#if defined( SHADOWMAP_TYPE_PCF )
				sampler2DShadow shadowMap,
			#else
				sampler2D shadowMap,
			#endif
			SunLightShadow sunLightShadow,
			int shadowIndex
		) {
			vec4 shadowWorldPosition = vec4( vSunShadowWorldPosition.xyz + vSunShadowWorldNormal * sunLightShadow.shadowNormalBias, 1.0 );
			float viewDepth = vSunShadowWorldPosition.w;
			int cascadeOffset = shadowIndex * SUN_LIGHT_CASCADES;
			float shadow = 1.0;
			for ( int i = SUN_LIGHT_CASCADES - 1; i >= 0; i -- ) {
				vec4 cascade = sunShadowCascade[ cascadeOffset + i ];
				if ( viewDepth >= cascade.x && viewDepth < cascade.y ) {
					float cascadeShadow = getShadow(
						shadowMap,
						sunLightShadow.shadowMapSize,
						sunLightShadow.shadowIntensity,
						sunLightShadow.shadowBias,
						sunLightShadow.shadowRadius,
						sunShadowMatrix[ cascadeOffset + i ] * shadowWorldPosition
					);
					shadow = mix( cascadeShadow, shadow, smoothstep( cascade.z, cascade.y, viewDepth ) );
				}
			}
			return shadow;
		}
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	#if defined( SHADOWMAP_TYPE_PCF )
	float getPointShadow( samplerCubeShadow shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 bd3D = normalize( lightToPosition );
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			#ifdef USE_REVERSED_DEPTH_BUFFER
				float dp = ( shadowCameraNear * ( shadowCameraFar - viewSpaceZ ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp -= shadowBias;
			#else
				float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
				dp += shadowBias;
			#endif
			float texelSize = shadowRadius / shadowMapSize.x;
			vec3 absDir = abs( bd3D );
			vec3 tangent = absDir.x > absDir.z ? vec3( 0.0, 1.0, 0.0 ) : vec3( 1.0, 0.0, 0.0 );
			tangent = normalize( cross( bd3D, tangent ) );
			vec3 bitangent = cross( bd3D, tangent );
			float phi = interleavedGradientNoise( gl_FragCoord.xy ) * PI2;
			vec2 sample0 = vogelDiskSample( 0, 5, phi );
			vec2 sample1 = vogelDiskSample( 1, 5, phi );
			vec2 sample2 = vogelDiskSample( 2, 5, phi );
			vec2 sample3 = vogelDiskSample( 3, 5, phi );
			vec2 sample4 = vogelDiskSample( 4, 5, phi );
			shadow = (
				texture( shadowMap, vec4( bd3D + ( tangent * sample0.x + bitangent * sample0.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample1.x + bitangent * sample1.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample2.x + bitangent * sample2.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample3.x + bitangent * sample3.y ) * texelSize, dp ) ) +
				texture( shadowMap, vec4( bd3D + ( tangent * sample4.x + bitangent * sample4.y ) * texelSize, dp ) )
			) * 0.2;
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#elif defined( SHADOWMAP_TYPE_BASIC )
	float getPointShadow( samplerCube shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		vec3 absVec = abs( lightToPosition );
		float viewSpaceZ = max( max( absVec.x, absVec.y ), absVec.z );
		if ( viewSpaceZ - shadowCameraFar <= 0.0 && viewSpaceZ - shadowCameraNear >= 0.0 ) {
			float dp = ( shadowCameraFar * ( viewSpaceZ - shadowCameraNear ) ) / ( viewSpaceZ * ( shadowCameraFar - shadowCameraNear ) );
			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			float depth = textureCube( shadowMap, bd3D ).r;
			#ifdef USE_REVERSED_DEPTH_BUFFER
				depth = 1.0 - depth;
			#endif
			shadow = step( dp, depth );
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	#endif
	#endif
#endif`,P_=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
		varying vec4 vSunShadowWorldPosition;
		varying vec3 vSunShadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,I_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	#ifdef HAS_NORMAL
		vec3 shadowWorldNormal = transformNormalByInverseViewMatrix( transformedNormal, viewMatrix );
	#else
		vec3 shadowWorldNormal = vec3( 0.0 );
	#endif
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_SUN_LIGHT_SHADOWS > 0
		vSunShadowWorldPosition = vec4( worldPosition.xyz, - mvPosition.z );
		vSunShadowWorldNormal = shadowWorldNormal;
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,L_=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_SUN_LIGHT_SHADOWS > 0
	SunLightShadow sunLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SUN_LIGHT_SHADOWS; i ++ ) {
		sunLight = sunLightShadows[ i ];
		shadow *= receiveShadow ? getSunShadow( sunShadowMap[ i ], sunLight, UNROLLED_LOOP_INDEX ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0 && ( defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_BASIC ) )
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,D_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,N_=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,U_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,F_=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,O_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,B_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,k_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,z_=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,V_=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = transformNormalByInverseViewMatrix( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseContribution, material.specularColorBlended, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,H_=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,G_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,W_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,X_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,j_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,q_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,Y_=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,J_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,$_=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vWorldDirection );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Z_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,K_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Q_=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,ex=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSED_DEPTH_BUFFER
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,tx=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,nx=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = vec4( dist, 0.0, 0.0, 1.0 );
}`,ix=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,sx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rx=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,ax=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,ox=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,lx=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,cx=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,ux=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,hx=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,dx=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,fx=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,px=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( normalize( normal ) * 0.5 + 0.5, diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,mx=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,gx=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_x=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,xx=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_RETROREFLECTION
	uniform float retroreflectivity;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
 
		outgoingLight = outgoingLight + sheenSpecularDirect + sheenSpecularIndirect;
 
 	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yx=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,vx=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,bx=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Sx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Mx=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,wx=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Ex=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Tx=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,rt={alphahash_fragment:qg,alphahash_pars_fragment:Yg,alphamap_fragment:Jg,alphamap_pars_fragment:$g,alphatest_fragment:Zg,alphatest_pars_fragment:Kg,aomap_fragment:Qg,aomap_pars_fragment:e0,batching_pars_vertex:t0,batching_vertex:n0,begin_vertex:i0,beginnormal_vertex:s0,bsdfs:r0,iridescence_fragment:a0,bumpmap_pars_fragment:o0,clipping_planes_fragment:l0,clipping_planes_pars_fragment:c0,clipping_planes_pars_vertex:u0,clipping_planes_vertex:h0,color_fragment:d0,color_pars_fragment:f0,color_pars_vertex:p0,color_vertex:m0,common:g0,cube_uv_reflection_fragment:_0,defaultnormal_vertex:x0,displacementmap_pars_vertex:y0,displacementmap_vertex:v0,emissivemap_fragment:b0,emissivemap_pars_fragment:S0,colorspace_fragment:M0,colorspace_pars_fragment:w0,envmap_fragment:E0,envmap_common_pars_fragment:T0,envmap_pars_fragment:A0,envmap_pars_vertex:C0,envmap_physical_pars_fragment:k0,envmap_vertex:R0,fog_vertex:P0,fog_pars_vertex:I0,fog_fragment:L0,fog_pars_fragment:D0,gradientmap_pars_fragment:N0,lightmap_pars_fragment:U0,lights_lambert_fragment:F0,lights_lambert_pars_fragment:O0,lights_pars_begin:B0,lights_toon_fragment:z0,lights_toon_pars_fragment:V0,lights_phong_fragment:H0,lights_phong_pars_fragment:G0,lights_physical_fragment:W0,lights_physical_pars_fragment:X0,lights_fragment_begin:j0,lights_fragment_maps:q0,lights_fragment_end:Y0,lightprobes_pars_fragment:J0,logdepthbuf_fragment:$0,logdepthbuf_pars_fragment:Z0,logdepthbuf_pars_vertex:K0,logdepthbuf_vertex:Q0,map_fragment:e_,map_pars_fragment:t_,map_particle_fragment:n_,map_particle_pars_fragment:i_,metalnessmap_fragment:s_,metalnessmap_pars_fragment:r_,morphinstance_vertex:a_,morphcolor_vertex:o_,morphnormal_vertex:l_,morphtarget_pars_vertex:c_,morphtarget_vertex:u_,normal_fragment_begin:h_,normal_fragment_maps:d_,normal_pars_fragment:f_,normal_pars_vertex:p_,normal_vertex:m_,normalmap_pars_fragment:g_,clearcoat_normal_fragment_begin:__,clearcoat_normal_fragment_maps:x_,clearcoat_pars_fragment:y_,iridescence_pars_fragment:v_,opaque_fragment:b_,packing:S_,premultiplied_alpha_fragment:M_,project_vertex:w_,dithering_fragment:E_,dithering_pars_fragment:T_,roughnessmap_fragment:A_,roughnessmap_pars_fragment:C_,shadowmap_pars_fragment:R_,shadowmap_pars_vertex:P_,shadowmap_vertex:I_,shadowmask_pars_fragment:L_,skinbase_vertex:D_,skinning_pars_vertex:N_,skinning_vertex:U_,skinnormal_vertex:F_,specularmap_fragment:O_,specularmap_pars_fragment:B_,tonemapping_fragment:k_,tonemapping_pars_fragment:z_,transmission_fragment:V_,transmission_pars_fragment:H_,uv_pars_fragment:G_,uv_pars_vertex:W_,uv_vertex:X_,worldpos_vertex:j_,background_vert:q_,background_frag:Y_,backgroundCube_vert:J_,backgroundCube_frag:$_,cube_vert:Z_,cube_frag:K_,depth_vert:Q_,depth_frag:ex,distance_vert:tx,distance_frag:nx,equirect_vert:ix,equirect_frag:sx,linedashed_vert:rx,linedashed_frag:ax,meshbasic_vert:ox,meshbasic_frag:lx,meshlambert_vert:cx,meshlambert_frag:ux,meshmatcap_vert:hx,meshmatcap_frag:dx,meshnormal_vert:fx,meshnormal_frag:px,meshphong_vert:mx,meshphong_frag:gx,meshphysical_vert:_x,meshphysical_frag:xx,meshtoon_vert:yx,meshtoon_frag:vx,points_vert:bx,points_frag:Sx,shadow_vert:Mx,shadow_frag:wx,sprite_vert:Ex,sprite_frag:Tx},Se={common:{diffuse:{value:new Ke(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ke(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new W},probesMax:{value:new W},probesResolution:{value:new W}},points:{diffuse:{value:new Ke(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new Ke(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},mn={basic:{uniforms:cn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:cn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ke(0)},envMapIntensity:{value:1}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:cn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new Ke(0)},specular:{value:new Ke(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:cn([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new Ke(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:cn([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new Ke(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:cn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:cn([Se.points,Se.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:cn([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:cn([Se.common,Se.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:cn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:cn([Se.sprite,Se.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distance:{uniforms:cn([Se.common,Se.displacementmap,{referencePosition:{value:new W},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distance_vert,fragmentShader:rt.distance_frag},shadow:{uniforms:cn([Se.lights,Se.fog,{color:{value:new Ke(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};mn.physical={uniforms:cn([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new Ke(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new Ke(0)},specularColor:{value:new Ke(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};var nc={r:0,b:0,g:0},Ax=new pt,cp=new Ze;cp.set(-1,0,0,0,1,0,0,0,1);function Cx(n,e,t,i,s,r){let a=new Ke(0),o=s===!0?0:1,l,c,u=null,d=0,h=null;function f(A){let C=A.isScene===!0?A.background:null;if(C&&C.isTexture){let y=A.backgroundBlurriness>0;C=e.get(C,y)}return C}function m(A){let C=!1,y=f(A);y===null?p(a,o):y&&y.isColor&&(p(y,1),C=!0);let T=n.xr.getEnvironmentBlendMode();T==="additive"?t.buffers.color.setClear(0,0,0,1,r):T==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(A,C){let y=f(C);y&&(y.isCubeTexture||y.mapping===Ca)?(c===void 0&&(c=new qt(new ir(1,1,1),new Dt({name:"BackgroundCubeMaterial",uniforms:ds(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(T,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Ax.makeRotationFromEuler(C.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(cp),c.material.toneMapped=lt.getTransfer(y.colorSpace)!==yt,(u!==y||d!==y.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,h=n.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new qt(new _a(2,2),new Dt({name:"BackgroundMaterial",uniforms:ds(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Vi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=lt.getTransfer(y.colorSpace)!==yt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,h=n.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function p(A,C){A.getRGB(nc,th(n)),t.buffers.color.setClear(nc.r,nc.g,nc.b,C,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,C=1){a.set(A),o=C,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(A){o=A,p(a,o)},render:m,addToRenderList:v,dispose:g}}function Rx(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,a=!1;function o(R,P,B,N,H){let j=!1,Y=d(R,N,B,P);r!==Y&&(r=Y,c(r.object)),j=f(R,N,B,H),j&&m(R,N,B,H),H!==null&&e.update(H,n.ELEMENT_ARRAY_BUFFER),(j||a)&&(a=!1,y(R,P,B,N),H!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function l(){return n.createVertexArray()}function c(R){return n.bindVertexArray(R)}function u(R){return n.deleteVertexArray(R)}function d(R,P,B,N){let H=N.wireframe===!0,j=i[P.id];j===void 0&&(j={},i[P.id]=j);let Y=R.isInstancedMesh===!0?R.id:0,X=j[Y];X===void 0&&(X={},j[Y]=X);let U=X[B.id];U===void 0&&(U={},X[B.id]=U);let q=U[H];return q===void 0&&(q=h(l()),U[H]=q),q}function h(R){let P=[],B=[],N=[];for(let H=0;H<t;H++)P[H]=0,B[H]=0,N[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:B,attributeDivisors:N,object:R,attributes:{},index:null}}function f(R,P,B,N){let H=r.attributes,j=P.attributes,Y=0,X=B.getAttributes();for(let U in X)if(X[U].location>=0){let Q=H[U],ee=j[U];if(ee===void 0&&(U==="instanceMatrix"&&R.instanceMatrix&&(ee=R.instanceMatrix),U==="instanceColor"&&R.instanceColor&&(ee=R.instanceColor)),Q===void 0||Q.attribute!==ee||ee&&Q.data!==ee.data)return!0;Y++}return r.attributesNum!==Y||r.index!==N}function m(R,P,B,N){let H={},j=P.attributes,Y=0,X=B.getAttributes();for(let U in X)if(X[U].location>=0){let Q=j[U];Q===void 0&&(U==="instanceMatrix"&&R.instanceMatrix&&(Q=R.instanceMatrix),U==="instanceColor"&&R.instanceColor&&(Q=R.instanceColor));let ee={};ee.attribute=Q,Q&&Q.data&&(ee.data=Q.data),H[U]=ee,Y++}r.attributes=H,r.attributesNum=Y,r.index=N}function v(){let R=r.newAttributes;for(let P=0,B=R.length;P<B;P++)R[P]=0}function p(R){g(R,0)}function g(R,P){let B=r.newAttributes,N=r.enabledAttributes,H=r.attributeDivisors;B[R]=1,N[R]===0&&(n.enableVertexAttribArray(R),N[R]=1),H[R]!==P&&(n.vertexAttribDivisor(R,P),H[R]=P)}function A(){let R=r.newAttributes,P=r.enabledAttributes;for(let B=0,N=P.length;B<N;B++)P[B]!==R[B]&&(n.disableVertexAttribArray(B),P[B]=0)}function C(R,P,B,N,H,j,Y){Y===!0?n.vertexAttribIPointer(R,P,B,H,j):n.vertexAttribPointer(R,P,B,N,H,j)}function y(R,P,B,N){v();let H=N.attributes,j=B.getAttributes(),Y=P.defaultAttributeValues;for(let X in j){let U=j[X];if(U.location>=0){let q=H[X];if(q===void 0&&(X==="instanceMatrix"&&R.instanceMatrix&&(q=R.instanceMatrix),X==="instanceColor"&&R.instanceColor&&(q=R.instanceColor)),q!==void 0){let Q=q.normalized,ee=q.itemSize,ue=e.get(q);if(ue===void 0)continue;let xe=ue.buffer,_e=ue.type,De=ue.bytesPerElement,te=_e===n.INT||_e===n.UNSIGNED_INT||q.gpuType===_l;if(q.isInterleavedBufferAttribute){let oe=q.data,me=oe.stride,Re=q.offset;if(oe.isInstancedInterleavedBuffer){for(let we=0;we<U.locationSize;we++)g(U.location+we,oe.meshPerAttribute);R.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=oe.meshPerAttribute*oe.count)}else for(let we=0;we<U.locationSize;we++)p(U.location+we);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let we=0;we<U.locationSize;we++)C(U.location+we,ee/U.locationSize,_e,Q,me*De,(Re+ee/U.locationSize*we)*De,te)}else{if(q.isInstancedBufferAttribute){for(let oe=0;oe<U.locationSize;oe++)g(U.location+oe,q.meshPerAttribute);R.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let oe=0;oe<U.locationSize;oe++)p(U.location+oe);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let oe=0;oe<U.locationSize;oe++)C(U.location+oe,ee/U.locationSize,_e,Q,ee*De,ee/U.locationSize*oe*De,te)}}else if(Y!==void 0){let Q=Y[X];if(Q!==void 0)switch(Q.length){case 2:n.vertexAttrib2fv(U.location,Q);break;case 3:n.vertexAttrib3fv(U.location,Q);break;case 4:n.vertexAttrib4fv(U.location,Q);break;default:n.vertexAttrib1fv(U.location,Q)}}}}A()}function T(){M();for(let R in i){let P=i[R];for(let B in P){let N=P[B];for(let H in N){let j=N[H];for(let Y in j)u(j[Y].object),delete j[Y];delete N[H]}}delete i[R]}}function b(R){if(i[R.id]===void 0)return;let P=i[R.id];for(let B in P){let N=P[B];for(let H in N){let j=N[H];for(let Y in j)u(j[Y].object),delete j[Y];delete N[H]}}delete i[R.id]}function w(R){for(let P in i){let B=i[P];for(let N in B){let H=B[N];if(H[R.id]===void 0)continue;let j=H[R.id];for(let Y in j)u(j[Y].object),delete j[Y];delete H[R.id]}}}function x(R){for(let P in i){let B=i[P],N=R.isInstancedMesh===!0?R.id:0,H=B[N];if(H!==void 0){for(let j in H){let Y=H[j];for(let X in Y)u(Y[X].object),delete Y[X];delete H[j]}delete B[N],Object.keys(B).length===0&&delete i[P]}}}function M(){L(),a=!0,r!==s&&(r=s,c(r.object))}function L(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:M,resetDefaultState:L,dispose:T,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:p,disableUnusedAttributes:A}}function Px(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let f=0;f<u;f++)h+=c[f];t.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Ix(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let w=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==pn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){let x=w===kn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Qt&&w!==Bn&&!x&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Ye("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Ye("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),C=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),T=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:A,maxVaryings:C,maxFragmentUniforms:y,maxSamples:T,samples:b}}function Lx(n){let e=this,t=null,i=0,s=!1,r=!1,a=new In,o=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){let m=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,g=n.get(d);if(!s||m===null||m.length===0||r&&!p)r?u(null):c();else{let A=r?0:i,C=A*4,y=g.clippingState||null;l.value=y,y=u(m,h,C,f);for(let T=0;T!==C;++T)y[T]=t[T];g.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,f,m){let v=d!==null?d.length:0,p=null;if(v!==0){if(p=l.value,m!==!0||p===null){let g=f+v*4,A=h.matrixWorldInverse;o.getNormalMatrix(A),(p===null||p.length<g)&&(p=new Float32Array(g));for(let C=0,y=f;C!==v;++C,y+=4)a.copy(d[C]).applyMatrix4(A,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}var hr=4,Dx=6,Nx=20,Ux=256,Oa=new sr,Vf=new Ke,rh=null,ah=0,oh=0,lh=!1,Fx=new W,fs=new W,sc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=Fx}=r;rh=this._renderer.getRenderTarget(),ah=this._renderer.getActiveCubeFace(),oh=this._renderer.getActiveMipmapLevel(),lh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Wf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Gf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(rh,ah,oh),this._renderer.xr.enabled=lh,e.scissorTest=!1,ur(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Hi||e.mapping===hs?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),rh=this._renderer.getRenderTarget(),ah=this._renderer.getActiveCubeFace(),oh=this._renderer.getActiveMipmapLevel(),lh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Ct,minFilter:Ct,generateMipmaps:!1,type:kn,format:pn,colorSpace:sa,depthBuffer:!1},s=Hf(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Hf(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Ox(r)),this._blurMaterial=kx(r,e,t),this._ggxMaterial=Bx(r,e,t)}return s}_compileMaterial(e){let t=new qt(new Gt,e);this._renderer.compile(t,Oa)}_sceneToCubeUV(e,t,i,s,r){let l=new on(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(Vf),d.toneMapping=Un,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new qt(new ir,new os({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,p=v.material,g=!1,A=e.background;A?A.isColor&&(p.color.copy(A),e.background=null,g=!0):(p.color.copy(Vf),g=!0);for(let C=0;C<6;C++){let y=C%3;y===0?(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[C],r.y,r.z)):y===1?(l.up.set(0,0,c[C]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[C],r.z)):(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[C]));let T=this._cubeSize;ur(s,y*T,C>2?T:0,T,T),d.setRenderTarget(s),g&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=h,e.background=A}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===Hi||e.mapping===hs;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Wf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Gf());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;ur(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Oa)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,f=d*h,{_lodMax:m}=this,v=this._sizeLods[i],p=3*v*(i>m-hr?i-m+hr:0),g=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,ur(r,p,g,3*v,2*v),s.setRenderTarget(r),s.render(o,Oa),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-i,ur(e,p,g,3*v,2*v),s.setRenderTarget(e),s.render(o,Oa)}_blur(e,t,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-hr?s-this._lodMax+hr:0),h=4*(this._cubeSize-u);ur(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(l,Oa)}};function Ox(n){let e=[],t=[],i=n,s=n-hr+1+Dx;for(let r=0;r<s;r++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,f=3,m=new Float32Array(f*h*d),v=new Float32Array(f*h*d);for(let g=0;g<d;g++){let A=g%3*2/3-1,C=g>2?0:-1,y=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];m.set(y,f*h*g);for(let T=0;T<h;T++){let b=u[T*2]*2-1,w=u[T*2+1]*2-1;g===0?fs.set(1,w,b):g===1?fs.set(-b,1,-w):g===2?fs.set(-b,w,1):g===3?fs.set(-1,w,-b):g===4?fs.set(-b,-1,w):fs.set(b,w,-1),fs.toArray(v,(g*h+T)*f)}}let p=new Gt;p.setAttribute("position",new Ht(m,f)),p.setAttribute("outputDirection",new Ht(v,f)),t.push(new qt(p,null)),i>hr&&i--}return{lodMeshes:t,sizeLods:e}}function Hf(n,e,t){let i=new xn(n,e,t);return i.texture.mapping=Ca,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function ur(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function Bx(n,e,t){return new Dt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Ux,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:oc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float roughness;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359

			// Van der Corput radical inverse
			float radicalInverse_VdC(uint bits) {
				bits = (bits << 16u) | (bits >> 16u);
				bits = ((bits & 0x55555555u) << 1u) | ((bits & 0xAAAAAAAAu) >> 1u);
				bits = ((bits & 0x33333333u) << 2u) | ((bits & 0xCCCCCCCCu) >> 2u);
				bits = ((bits & 0x0F0F0F0Fu) << 4u) | ((bits & 0xF0F0F0F0u) >> 4u);
				bits = ((bits & 0x00FF00FFu) << 8u) | ((bits & 0xFF00FF00u) >> 8u);
				return float(bits) * 2.3283064365386963e-10; // / 0x100000000
			}

			// Hammersley sequence
			vec2 hammersley(uint i, uint N) {
				return vec2(float(i) / float(N), radicalInverse_VdC(i));
			}

			// GGX VNDF importance sampling (Eric Heitz 2018)
			// "Sampling the GGX Distribution of Visible Normals"
			// https://jcgt.org/published/0007/04/01/
			vec3 importanceSampleGGX_VNDF(vec2 Xi, vec3 V, float roughness) {
				float alpha = roughness * roughness;

				// Section 4.1: Orthonormal basis
				vec3 T1 = vec3(1.0, 0.0, 0.0);
				vec3 T2 = cross(V, T1);

				// Section 4.2: Parameterization of projected area
				float r = sqrt(Xi.x);
				float phi = 2.0 * PI * Xi.y;
				float t1 = r * cos(phi);
				float t2 = r * sin(phi);
				float s = 0.5 * (1.0 + V.z);
				t2 = (1.0 - s) * sqrt(1.0 - t1 * t1) + s * t2;

				// Section 4.3: Reprojection onto hemisphere
				vec3 Nh = t1 * T1 + t2 * T2 + sqrt(max(0.0, 1.0 - t1 * t1 - t2 * t2)) * V;

				// Section 3.4: Transform back to ellipsoid configuration
				return normalize(vec3(alpha * Nh.x, alpha * Nh.y, max(0.0, Nh.z)));
			}

			void main() {
				vec3 N = normalize(vOutputDirection);
				vec3 V = N; // Assume view direction equals normal for pre-filtering

				vec3 prefilteredColor = vec3(0.0);
				float totalWeight = 0.0;

				// For very low roughness, just sample the environment directly
				if (roughness < 0.001) {
					gl_FragColor = vec4(bilinearCubeUV(envMap, N, mipInt), 1.0);
					return;
				}

				// Tangent space basis for VNDF sampling
				vec3 up = abs(N.z) < 0.999 ? vec3(0.0, 0.0, 1.0) : vec3(1.0, 0.0, 0.0);
				vec3 tangent = normalize(cross(up, N));
				vec3 bitangent = cross(N, tangent);

				for(uint i = 0u; i < uint(GGX_SAMPLES); i++) {
					vec2 Xi = hammersley(i, uint(GGX_SAMPLES));

					// For PMREM, V = N, so in tangent space V is always (0, 0, 1)
					vec3 H_tangent = importanceSampleGGX_VNDF(Xi, vec3(0.0, 0.0, 1.0), roughness);

					// Transform H back to world space
					vec3 H = normalize(tangent * H_tangent.x + bitangent * H_tangent.y + N * H_tangent.z);
					vec3 L = normalize(2.0 * dot(V, H) * H - V);

					float NdotL = max(dot(N, L), 0.0);

					if(NdotL > 0.0) {
						// Sample environment at fixed mip level
						// VNDF importance sampling handles the distribution filtering
						vec3 sampleColor = bilinearCubeUV(envMap, L, mipInt);

						// Weight by NdotL for the split-sum approximation
						// VNDF PDF naturally accounts for the visible microfacet distribution
						prefilteredColor += sampleColor * NdotL;
						totalWeight += NdotL;
					}
				}

				if (totalWeight > 0.0) {
					prefilteredColor = prefilteredColor / totalWeight;
				}

				gl_FragColor = vec4(prefilteredColor, 1.0);
			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function kx(n,e,t){return new Dt({name:"SphericalGaussianBlur",defines:{SAMPLES:Nx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:oc(),fragmentShader:`

			precision highp float;
			precision highp int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform float sigma;
			uniform float mipInt;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			#define PI 3.14159265359
			#define GOLDEN_ANGLE 2.39996322973

			void main() {

				if ( sigma == 0.0 ) {

					gl_FragColor = vec4( bilinearCubeUV( envMap, vOutputDirection, mipInt ), 1.0 );
					return;

				}

				vec3 outputDirection = normalize( vOutputDirection );

				vec3 up = abs( outputDirection.z ) < 0.999 ? vec3( 0.0, 0.0, 1.0 ) : vec3( 1.0, 0.0, 0.0 );
				vec3 tangent = normalize( cross( up, outputDirection ) );
				vec3 bitangent = cross( outputDirection, tangent );

				// Truncate the kernel at three standard deviations or at the antipode.
				float thetaMax = min( 3.0 * sigma, PI );
				float truncation = 1.0 - exp( - 0.5 * thetaMax * thetaMax / ( sigma * sigma ) );

				vec3 accumColor = vec3( 0.0 );
				float accumWeight = 0.0;

				for ( int i = 0; i < SAMPLES; i ++ ) {

					// Stratified inverse-CDF sampling of the Gaussian, placed on a golden-angle spiral.
					float stratum = ( float( i ) + 0.5 ) / float( SAMPLES );
					float theta = sigma * sqrt( - 2.0 * log( 1.0 - stratum * truncation ) );
					float phi = float( i ) * GOLDEN_ANGLE;

					vec3 offset = cos( phi ) * tangent + sin( phi ) * bitangent;
					vec3 sampleDirection = cos( theta ) * outputDirection + sin( theta ) * offset;

					// Correct the planar sample density to solid angle.
					float weight = sin( theta ) / theta;

					accumColor += weight * bilinearCubeUV( envMap, sampleDirection, mipInt );
					accumWeight += weight;

				}

				gl_FragColor = vec4( accumColor / accumWeight, 1.0 );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Gf(){return new Dt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Wf(){return new Dt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:oc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function oc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var rc=class extends xn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new ma(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},s=new ir(5,5,5),r=new Dt({name:"CubemapFromEquirect",uniforms:ds(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Kt,blending:$n});r.uniforms.tEquirect.value=t;let a=new qt(s,r),o=t.minFilter;return t.minFilter===Fn&&(t.minFilter=Ct),new hl(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}};function zx(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,f=!1){return h==null?null:f?a(h):r(h)}function r(h){if(h&&h.isTexture){let f=h.mapping;if(f===pl||f===ml)if(e.has(h)){let m=e.get(h).texture;return o(m,h.mapping)}else{let m=h.image;if(m&&m.height>0){let v=new rc(m.height);return v.fromEquirectangularTexture(n,h),e.set(h,v),h.addEventListener("dispose",c),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let f=h.mapping,m=f===pl||f===ml,v=f===Hi||f===hs;if(m||v){let p=t.get(h),g=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==g)return i===null&&(i=new sc(n)),p=m?i.fromEquirectangular(h,p):i.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),p.texture;if(p!==void 0)return p.texture;{let A=h.image;return m&&A&&A.height>0||v&&A&&l(A)?(i===null&&(i=new sc(n)),p=m?i.fromEquirectangular(h):i.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function o(h,f){return f===pl?h.mapping=Hi:f===ml&&(h.mapping=hs),h}function l(h){let f=0,m=6;for(let v=0;v<m;v++)h[v]!==void 0&&f++;return f===m}function c(h){let f=h.target;f.removeEventListener("dispose",c);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(h){let f=h.target;f.removeEventListener("dispose",u);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function Vx(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&as("WebGLRenderer: "+i+" extension not supported."),s}}}function Hx(n,e,t,i){let s={},r=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let m in h.attributes)e.remove(h.attributes[m]);h.removeEventListener("dispose",a),delete s[h.id];let f=r.get(h);f&&(e.remove(f),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let f in h)e.update(h[f],n.ARRAY_BUFFER)}function c(d){let h=[],f=d.index,m=d.attributes.position,v=0;if(m===void 0)return;if(f!==null){let A=f.array;v=f.version;for(let C=0,y=A.length;C<y;C+=3){let T=A[C+0],b=A[C+1],w=A[C+2];h.push(T,b,b,w,w,T)}}else{let A=m.array;v=m.version;for(let C=0,y=A.length/3-1;C<y;C+=3){let T=C+0,b=C+1,w=C+2;h.push(T,b,b,w,w,T)}}let p=new(m.count>=65535?ha:ua)(h,1);p.version=v;let g=r.get(d);g&&e.remove(g),r.set(d,p)}function u(d){let h=r.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Gx(n,e,t){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,h){n.drawElements(i,h,r,d*a),t.update(h,i,1)}function c(d,h,f){f!==0&&(n.drawElementsInstanced(i,h,r,d*a,f),t.update(h,i,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,d,0,f);let v=0;for(let p=0;p<f;p++)v+=h[p];t.update(v,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Wx(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:$e("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Xx(n,e,t){let i=new WeakMap,s=new gt;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=i.get(o);if(h===void 0||h.count!==d){let M=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",M)};h!==void 0&&h.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],A=o.morphAttributes.color||[],C=0;f===!0&&(C=1),m===!0&&(C=2),v===!0&&(C=3);let y=o.attributes.position.count*C,T=1;y>e.maxTextureSize&&(T=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let b=new Float32Array(y*T*4*d),w=new la(b,y,T,d);w.type=Bn,w.needsUpdate=!0;let x=C*4;for(let L=0;L<d;L++){let R=p[L],P=g[L],B=A[L],N=y*T*4*L;for(let H=0;H<R.count;H++){let j=H*x;f===!0&&(s.fromBufferAttribute(R,H),b[N+j+0]=s.x,b[N+j+1]=s.y,b[N+j+2]=s.z,b[N+j+3]=0),m===!0&&(s.fromBufferAttribute(P,H),b[N+j+4]=s.x,b[N+j+5]=s.y,b[N+j+6]=s.z,b[N+j+7]=0),v===!0&&(s.fromBufferAttribute(B,H),b[N+j+8]=s.x,b[N+j+9]=s.y,b[N+j+10]=s.z,b[N+j+11]=B.itemSize===4?s.w:1)}}h={count:d,texture:w,size:new We(y,T)},i.set(o,h),o.addEventListener("dispose",M)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function jx(n,e,t,i,s){let r=new WeakMap;function a(c){let u=s.render.frame,d=c.geometry,h=e.get(c,d);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var qx={[Fu]:"LINEAR_TONE_MAPPING",[Ou]:"REINHARD_TONE_MAPPING",[Bu]:"CINEON_TONE_MAPPING",[ku]:"ACES_FILMIC_TONE_MAPPING",[Vu]:"AGX_TONE_MAPPING",[Hu]:"NEUTRAL_TONE_MAPPING",[zu]:"CUSTOM_TONE_MAPPING"};function Yx(n,e,t,i,s,r){let a=new xn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Gt;c.setAttribute("position",new Xt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Xt([0,2,0,0,2,0],2));let u=new Zo({uniforms:{tDiffuse:{value:null}},vertexShader:`
			precision highp float;

			uniform mat4 modelViewMatrix;
			uniform mat4 projectionMatrix;

			attribute vec3 position;
			attribute vec2 uv;

			varying vec2 vUv;

			void main() {
				vUv = uv;
				gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			}`,fragmentShader:`
			precision highp float;

			uniform sampler2D tDiffuse;

			varying vec2 vUv;

			#include <tonemapping_pars_fragment>
			#include <colorspace_pars_fragment>

			void main() {
				gl_FragColor = texture2D( tDiffuse, vUv );

				#ifdef LINEAR_TONE_MAPPING
					gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );
				#elif defined( REINHARD_TONE_MAPPING )
					gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );
				#elif defined( CINEON_TONE_MAPPING )
					gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );
				#elif defined( ACES_FILMIC_TONE_MAPPING )
					gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );
				#elif defined( AGX_TONE_MAPPING )
					gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );
				#elif defined( NEUTRAL_TONE_MAPPING )
					gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );
				#elif defined( CUSTOM_TONE_MAPPING )
					gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );
				#endif

				#ifdef SRGB_TRANSFER
					gl_FragColor = sRGBTransferOETF( gl_FragColor );
				#endif
			}`,depthTest:!1,depthWrite:!1}),d=new qt(c,u),h=new sr(-1,1,1,-1,0,1),f=null,m=null,v=!1,p,g=null,A=[],C=!1;this.setSize=function(y,T){a.setSize(y,T),o!==null&&o.setSize(y,T),l!==null&&l.setSize(y,T);for(let b=0;b<A.length;b++){let w=A[b];w.setSize&&w.setSize(y,T)}},this.setEffects=function(y){A=y,C=A.length>0&&A[0].isRenderPass===!0;let T=a.width,b=a.height;A.length>0&&o===null&&(o=new xn(T,b,{type:kn,depthBuffer:!1,stencilBuffer:!1}),l=new xn(T,b,{type:kn,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<A.length;w++){let x=A[w];x.setSize&&x.setSize(T,b)}},this.begin=function(y,T){if(v||y.toneMapping===Un&&A.length===0)return!1;if(g=T,T!==null){let b=T.width,w=T.height;(a.width!==b||a.height!==w)&&this.setSize(b,w)}return C===!1&&y.setRenderTarget(a),p=y.toneMapping,y.toneMapping=Un,!0},this.hasRenderPass=function(){return C},this.end=function(y,T){y.toneMapping=p,v=!0;let b=a,w=o;for(let x=0;x<A.length;x++){let M=A[x];M.enabled!==!1&&(M.render(y,w,b,T),M.needsSwap!==!1&&(b=w,w=w===o?l:o))}if(f!==y.outputColorSpace||m!==y.toneMapping){f=y.outputColorSpace,m=y.toneMapping,u.defines={},lt.getTransfer(f)===yt&&(u.defines.SRGB_TRANSFER="");let x=qx[m];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=b.texture,y.setRenderTarget(g),y.render(d,h),g=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var up=new Ot,hh=new Fi(1,1),hp=new la,dp=new Jo,fp=new ma,Xf=[],jf=[],qf=new Float32Array(16),Yf=new Float32Array(9),Jf=new Float32Array(4);function fr(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=Xf[s];if(r===void 0&&(r=new Float32Array(s),Xf[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Jt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function lc(n,e){let t=jf[e];t===void 0&&(t=new Int32Array(e),jf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Jx(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function $x(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2fv(this.addr,e),Jt(t,e)}}function Zx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;n.uniform3fv(this.addr,e),Jt(t,e)}}function Kx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4fv(this.addr,e),Jt(t,e)}}function Qx(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Jt(t,e)}else{if(Yt(t,i))return;Jf.set(i),n.uniformMatrix2fv(this.addr,!1,Jf),Jt(t,i)}}function ey(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Jt(t,e)}else{if(Yt(t,i))return;Yf.set(i),n.uniformMatrix3fv(this.addr,!1,Yf),Jt(t,i)}}function ty(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Jt(t,e)}else{if(Yt(t,i))return;qf.set(i),n.uniformMatrix4fv(this.addr,!1,qf),Jt(t,i)}}function ny(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function iy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2iv(this.addr,e),Jt(t,e)}}function sy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3iv(this.addr,e),Jt(t,e)}}function ry(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4iv(this.addr,e),Jt(t,e)}}function ay(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function oy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2uiv(this.addr,e),Jt(t,e)}}function ly(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3uiv(this.addr,e),Jt(t,e)}}function cy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4uiv(this.addr,e),Jt(t,e)}}function uy(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(hh.compareFunction=t.isReversedDepthBuffer()?tc:ec,r=hh):r=up,t.setTexture2D(e||r,s)}function hy(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||dp,s)}function dy(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||fp,s)}function fy(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||hp,s)}function py(n){switch(n){case 5126:return Jx;case 35664:return $x;case 35665:return Zx;case 35666:return Kx;case 35674:return Qx;case 35675:return ey;case 35676:return ty;case 5124:case 35670:return ny;case 35667:case 35671:return iy;case 35668:case 35672:return sy;case 35669:case 35673:return ry;case 5125:return ay;case 36294:return oy;case 36295:return ly;case 36296:return cy;case 35678:case 36198:case 36298:case 36306:case 35682:return uy;case 35679:case 36299:case 36307:return hy;case 35680:case 36300:case 36308:case 36293:return dy;case 36289:case 36303:case 36311:case 36292:return fy}}function my(n,e){n.uniform1fv(this.addr,e)}function gy(n,e){let t=fr(e,this.size,2);n.uniform2fv(this.addr,t)}function _y(n,e){let t=fr(e,this.size,3);n.uniform3fv(this.addr,t)}function xy(n,e){let t=fr(e,this.size,4);n.uniform4fv(this.addr,t)}function yy(n,e){let t=fr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function vy(n,e){let t=fr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function by(n,e){let t=fr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Sy(n,e){n.uniform1iv(this.addr,e)}function My(n,e){n.uniform2iv(this.addr,e)}function wy(n,e){n.uniform3iv(this.addr,e)}function Ey(n,e){n.uniform4iv(this.addr,e)}function Ty(n,e){n.uniform1uiv(this.addr,e)}function Ay(n,e){n.uniform2uiv(this.addr,e)}function Cy(n,e){n.uniform3uiv(this.addr,e)}function Ry(n,e){n.uniform4uiv(this.addr,e)}function Py(n,e,t){let i=this.cache,s=e.length,r=lc(t,s);Yt(i,r)||(n.uniform1iv(this.addr,r),Jt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=hh:a=up;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Iy(n,e,t){let i=this.cache,s=e.length,r=lc(t,s);Yt(i,r)||(n.uniform1iv(this.addr,r),Jt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||dp,r[a])}function Ly(n,e,t){let i=this.cache,s=e.length,r=lc(t,s);Yt(i,r)||(n.uniform1iv(this.addr,r),Jt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||fp,r[a])}function Dy(n,e,t){let i=this.cache,s=e.length,r=lc(t,s);Yt(i,r)||(n.uniform1iv(this.addr,r),Jt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||hp,r[a])}function Ny(n){switch(n){case 5126:return my;case 35664:return gy;case 35665:return _y;case 35666:return xy;case 35674:return yy;case 35675:return vy;case 35676:return by;case 5124:case 35670:return Sy;case 35667:case 35671:return My;case 35668:case 35672:return wy;case 35669:case 35673:return Ey;case 5125:return Ty;case 36294:return Ay;case 36295:return Cy;case 36296:return Ry;case 35678:case 36198:case 36298:case 36306:case 35682:return Py;case 35679:case 36299:case 36307:return Iy;case 35680:case 36300:case 36308:case 36293:return Ly;case 36289:case 36303:case 36311:case 36292:return Dy}}var dh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=py(t.type)}},fh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Ny(t.type)}},ph=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},ch=/(\w+)(\])?(\[|\.)?/g;function $f(n,e){n.seq.push(e),n.map[e.id]=e}function Uy(n,e,t){let i=n.name,s=i.length;for(ch.lastIndex=0;;){let r=ch.exec(i),a=ch.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){$f(t,c===void 0?new dh(o,n,e):new fh(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new ph(o),$f(t,d)),t=d}}}var dr=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Uy(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function Zf(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Fy=37297,Oy=0;function By(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var Kf=new Ze;function ky(n){lt._getMatrix(Kf,lt.workingColorSpace,n);let e=`mat3( ${Kf.elements.map(t=>t.toFixed(4))} )`;switch(lt.getTransfer(n)){case ra:return[e,"LinearTransferOETF"];case yt:return[e,"sRGBTransferOETF"];default:return Ye("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function Qf(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+By(n.getShaderSource(e),o)}else return r}function zy(n,e){let t=ky(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Vy={[Fu]:"Linear",[Ou]:"Reinhard",[Bu]:"Cineon",[ku]:"ACESFilmic",[Vu]:"AgX",[Hu]:"Neutral",[zu]:"Custom"};function Hy(n,e){let t=Vy[e];return t===void 0?(Ye("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ic=new W;function Gy(){lt.getLuminanceCoefficients(ic);let n=ic.x.toFixed(4),e=ic.y.toFixed(4),t=ic.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Wy(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ka).join(`
`)}function Xy(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function jy(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function ka(n){return n!==""}function ep(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function tp(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var qy=/^[ \t]*#include +<([\w\d./]+)>/gm;function mh(n){return n.replace(qy,Jy)}var Yy=new Map;function Jy(n,e){let t=rt[e];if(t===void 0){let i=Yy.get(e);if(i!==void 0)t=rt[i],Ye('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return mh(t)}var $y=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function np(n){return n.replace($y,Zy)}function Zy(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function ip(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}var Ky={[Aa]:"SHADOWMAP_TYPE_PCF",[ar]:"SHADOWMAP_TYPE_VSM"};function Qy(n){return Ky[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var ev={[Hi]:"ENVMAP_TYPE_CUBE",[hs]:"ENVMAP_TYPE_CUBE",[Ca]:"ENVMAP_TYPE_CUBE_UV"};function tv(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":ev[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var nv={[hs]:"ENVMAP_MODE_REFRACTION"};function iv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":nv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var sv={[fl]:"ENVMAP_BLENDING_MULTIPLY",[bf]:"ENVMAP_BLENDING_MIX",[Sf]:"ENVMAP_BLENDING_ADD"};function rv(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":sv[n.combine]||"ENVMAP_BLENDING_NONE"}function av(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function ov(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=Qy(t),c=tv(t),u=iv(t),d=rv(t),h=av(t),f=Wy(t),m=Xy(r),v=s.createProgram(),p,g,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ka).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ka).join(`
`),g.length>0&&(g+=`
`)):(p=[ip(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ka).join(`
`),g=[ip(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Un?"#define TONE_MAPPING":"",t.toneMapping!==Un?rt.tonemapping_pars_fragment:"",t.toneMapping!==Un?Hy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,zy("linearToOutputTexel",t.outputColorSpace),Gy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ka).join(`
`)),a=mh(a),a=ep(a,t),a=tp(a,t),o=mh(o),o=ep(o,t),o=tp(o,t),a=np(a),o=np(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",t.glslVersion===Ku?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Ku?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let C=A+p+a,y=A+g+o,T=Zf(s,s.VERTEX_SHADER,C),b=Zf(s,s.FRAGMENT_SHADER,y);s.attachShader(v,T),s.attachShader(v,b),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function w(R){if(n.debug.checkShaderErrors){let P=s.getProgramInfoLog(v)||"",B=s.getShaderInfoLog(T)||"",N=s.getShaderInfoLog(b)||"",H=P.trim(),j=B.trim(),Y=N.trim(),X=!0,U=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(X=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,T,b);else{let q=Qf(s,T,"vertex"),Q=Qf(s,b,"fragment");$e("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+R.name+`
Material Type: `+R.type+`

Program Info Log: `+H+`
`+q+`
`+Q)}else H!==""?Ye("WebGLProgram: Program Info Log:",H):(j===""||Y==="")&&(U=!1);U&&(R.diagnostics={runnable:X,programLog:H,vertexShader:{log:j,prefix:p},fragmentShader:{log:Y,prefix:g}})}s.deleteShader(T),s.deleteShader(b),x=new dr(s,v),M=jy(s,v)}let x;this.getUniforms=function(){return x===void 0&&w(this),x};let M;this.getAttributes=function(){return M===void 0&&w(this),M};let L=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=s.getProgramParameter(v,Fy)),L},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=Oy++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=T,this.fragmentShader=b,this}var lv=0,gh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new _h(e),t.set(e,i)),i}},_h=class{constructor(e){this.id=lv++,this.code=e,this.usedTimes=0}};function cv(n){return n===Wi||n===Na||n===Ua}function uv(n,e,t,i,s,r){let a=new ca,o=new gh,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer,h=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function v(x,M,L,R,P,B){let N=R.fog,H=P.geometry,j=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?R.environment:null,Y=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,X=e.get(x.envMap||j,Y),U=X&&X.mapping===Ca?X.image.height:null,q=f[x.type];x.precision!==null&&(h=i.getMaxPrecision(x.precision),h!==x.precision&&Ye("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let Q=H.morphAttributes.position||H.morphAttributes.normal||H.morphAttributes.color,ee=Q!==void 0?Q.length:0,ue=0;H.morphAttributes.position!==void 0&&(ue=1),H.morphAttributes.normal!==void 0&&(ue=2),H.morphAttributes.color!==void 0&&(ue=3);let xe,_e,De,te;if(q){let St=mn[q];xe=St.vertexShader,_e=St.fragmentShader}else{xe=x.vertexShader,_e=x.fragmentShader;let St=o.getVertexShaderStage(x),mt=o.getFragmentShaderStage(x);o.update(x,St,mt),De=St.id,te=mt.id}let oe=n.getRenderTarget(),me=n.state.buffers.depth.getReversed(),Re=P.isInstancedMesh===!0,we=P.isBatchedMesh===!0,Je=!!x.map,et=!!x.matcap,je=!!X,tt=!!x.aoMap,ct=!!x.lightMap,Qe=!!x.bumpMap&&x.wireframe===!1,_t=!!x.normalMap,de=!!x.displacementMap,qe=!!x.emissiveMap,ut=!!x.metalnessMap,ht=!!x.roughnessMap,k=x.anisotropy>0,dt=x.clearcoat>0,at=x.dispersion>0,S=x.retroreflectivity>0,_=x.iridescence>0,D=x.sheen>0,O=x.transmission>0,J=k&&!!x.anisotropyMap,he=dt&&!!x.clearcoatMap,fe=dt&&!!x.clearcoatNormalMap,re=dt&&!!x.clearcoatRoughnessMap,ce=_&&!!x.iridescenceMap,ge=_&&!!x.iridescenceThicknessMap,Be=D&&!!x.sheenColorMap,Me=D&&!!x.sheenRoughnessMap,ye=!!x.specularMap,ke=!!x.specularColorMap,Le=!!x.specularIntensityMap,nt=O&&!!x.transmissionMap,z=O&&!!x.thicknessMap,ve=!!x.gradientMap,ae=!!x.alphaMap,be=x.alphaTest>0,Ee=!!x.alphaHash,pe=!!x.extensions,Ve=Un;x.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(Ve=n.toneMapping);let Ne={shaderID:q,shaderType:x.type,shaderName:x.name,vertexShader:xe,fragmentShader:_e,defines:x.defines,customVertexShaderID:De,customFragmentShaderID:te,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:we,batchingColor:we&&P._colorsTexture!==null,instancing:Re,instancingColor:Re&&P.instanceColor!==null,instancingMorph:Re&&P.morphTexture!==null,outputColorSpace:oe===null?n.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:lt.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:Je,matcap:et,envMap:je,envMapMode:je&&X.mapping,envMapCubeUVHeight:U,aoMap:tt,lightMap:ct,bumpMap:Qe,normalMap:_t,displacementMap:de,emissiveMap:qe,normalMapObjectSpace:_t&&x.normalMapType===Ef,normalMapTangentSpace:_t&&x.normalMapType===Ql,packedNormalMap:_t&&x.normalMapType===Ql&&cv(x.normalMap.format),metalnessMap:ut,roughnessMap:ht,anisotropy:k,anisotropyMap:J,clearcoat:dt,clearcoatMap:he,clearcoatNormalMap:fe,clearcoatRoughnessMap:re,dispersion:at,retroreflection:S,iridescence:_,iridescenceMap:ce,iridescenceThicknessMap:ge,sheen:D,sheenColorMap:Be,sheenRoughnessMap:Me,specularMap:ye,specularColorMap:ke,specularIntensityMap:Le,transmission:O,transmissionMap:nt,thicknessMap:z,gradientMap:ve,opaque:x.transparent===!1&&x.blending===or&&x.alphaToCoverage===!1,alphaMap:ae,alphaTest:be,alphaHash:Ee,combine:x.combine,mapUv:Je&&m(x.map.channel),aoMapUv:tt&&m(x.aoMap.channel),lightMapUv:ct&&m(x.lightMap.channel),bumpMapUv:Qe&&m(x.bumpMap.channel),normalMapUv:_t&&m(x.normalMap.channel),displacementMapUv:de&&m(x.displacementMap.channel),emissiveMapUv:qe&&m(x.emissiveMap.channel),metalnessMapUv:ut&&m(x.metalnessMap.channel),roughnessMapUv:ht&&m(x.roughnessMap.channel),anisotropyMapUv:J&&m(x.anisotropyMap.channel),clearcoatMapUv:he&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:fe&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:re&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ce&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:ge&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:Be&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:Me&&m(x.sheenRoughnessMap.channel),specularMapUv:ye&&m(x.specularMap.channel),specularColorMapUv:ke&&m(x.specularColorMap.channel),specularIntensityMapUv:Le&&m(x.specularIntensityMap.channel),transmissionMapUv:nt&&m(x.transmissionMap.channel),thicknessMapUv:z&&m(x.thicknessMap.channel),alphaMapUv:ae&&m(x.alphaMap.channel),vertexTangents:!!H.attributes.tangent&&(_t||k),vertexNormals:!!H.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!H.attributes.color&&H.attributes.color.itemSize===4,pointsUvs:P.isPoints===!0&&!!H.attributes.uv&&(Je||ae),fog:!!N,useFog:x.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||H.attributes.normal===void 0&&_t===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:me,skinning:P.isSkinnedMesh===!0,hasPositionAttribute:H.attributes.position!==void 0,morphTargets:H.morphAttributes.position!==void 0,morphNormals:H.morphAttributes.normal!==void 0,morphColors:H.morphAttributes.color!==void 0,morphTargetsCount:ee,morphTextureStride:ue,numSunLights:M.sun.length,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numSunLightShadows:M.sunShadowMap.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numLightProbeGrids:B.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&L.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ve,decodeVideoTexture:Je&&x.map.isVideoTexture===!0&&lt.getTransfer(x.map.colorSpace)===yt,decodeVideoTextureEmissive:qe&&x.emissiveMap.isVideoTexture===!0&&lt.getTransfer(x.emissiveMap.colorSpace)===yt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Jn,flipSided:x.side===Kt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:pe&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pe&&x.extensions.multiDraw===!0||we)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Ne.vertexUv1s=l.has(1),Ne.vertexUv2s=l.has(2),Ne.vertexUv3s=l.has(3),l.clear(),Ne}function p(x){let M=[];if(x.shaderID?M.push(x.shaderID):(M.push(x.customVertexShaderID),M.push(x.customFragmentShaderID)),x.defines!==void 0)for(let L in x.defines)M.push(L),M.push(x.defines[L]);return x.isRawShaderMaterial===!1&&(g(M,x),A(M,x),M.push(n.outputColorSpace)),M.push(x.customProgramCacheKey),M.join()}function g(x,M){x.push(M.precision),x.push(M.outputColorSpace),x.push(M.envMapMode),x.push(M.envMapCubeUVHeight),x.push(M.mapUv),x.push(M.alphaMapUv),x.push(M.lightMapUv),x.push(M.aoMapUv),x.push(M.bumpMapUv),x.push(M.normalMapUv),x.push(M.displacementMapUv),x.push(M.emissiveMapUv),x.push(M.metalnessMapUv),x.push(M.roughnessMapUv),x.push(M.anisotropyMapUv),x.push(M.clearcoatMapUv),x.push(M.clearcoatNormalMapUv),x.push(M.clearcoatRoughnessMapUv),x.push(M.iridescenceMapUv),x.push(M.iridescenceThicknessMapUv),x.push(M.sheenColorMapUv),x.push(M.sheenRoughnessMapUv),x.push(M.specularMapUv),x.push(M.specularColorMapUv),x.push(M.specularIntensityMapUv),x.push(M.transmissionMapUv),x.push(M.thicknessMapUv),x.push(M.combine),x.push(M.fogExp2),x.push(M.sizeAttenuation),x.push(M.morphTargetsCount),x.push(M.morphAttributeCount),x.push(M.numSunLights),x.push(M.numDirLights),x.push(M.numPointLights),x.push(M.numSpotLights),x.push(M.numSpotLightMaps),x.push(M.numHemiLights),x.push(M.numRectAreaLights),x.push(M.numSunLightShadows),x.push(M.numDirLightShadows),x.push(M.numPointLightShadows),x.push(M.numSpotLightShadows),x.push(M.numSpotLightShadowsWithMaps),x.push(M.numLightProbes),x.push(M.shadowMapType),x.push(M.toneMapping),x.push(M.numClippingPlanes),x.push(M.numClipIntersection),x.push(M.depthPacking)}function A(x,M){a.disableAll(),M.instancing&&a.enable(0),M.instancingColor&&a.enable(1),M.instancingMorph&&a.enable(2),M.matcap&&a.enable(3),M.envMap&&a.enable(4),M.normalMapObjectSpace&&a.enable(5),M.normalMapTangentSpace&&a.enable(6),M.clearcoat&&a.enable(7),M.iridescence&&a.enable(8),M.alphaTest&&a.enable(9),M.vertexColors&&a.enable(10),M.vertexAlphas&&a.enable(11),M.vertexUv1s&&a.enable(12),M.vertexUv2s&&a.enable(13),M.vertexUv3s&&a.enable(14),M.vertexTangents&&a.enable(15),M.anisotropy&&a.enable(16),M.alphaHash&&a.enable(17),M.batching&&a.enable(18),M.dispersion&&a.enable(19),M.retroreflection&&a.enable(24),M.batchingColor&&a.enable(20),M.gradientMap&&a.enable(21),M.packedNormalMap&&a.enable(22),M.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.reversedDepthBuffer&&a.enable(4),M.skinning&&a.enable(5),M.morphTargets&&a.enable(6),M.morphNormals&&a.enable(7),M.morphColors&&a.enable(8),M.premultipliedAlpha&&a.enable(9),M.shadowMapEnabled&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.decodeVideoTextureEmissive&&a.enable(20),M.alphaToCoverage&&a.enable(21),M.numLightProbeGrids>0&&a.enable(22),M.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function C(x){let M=f[x.type],L;if(M){let R=mn[M];L=Fa.clone(R.uniforms)}else L=x.uniforms;return L}function y(x,M){let L=u.get(M);return L!==void 0?++L.usedTimes:(L=new ov(n,M,x,s),c.push(L),u.set(M,L)),L}function T(x){if(--x.usedTimes===0){let M=c.indexOf(x);c[M]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function b(x){o.remove(x)}function w(){o.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:C,acquireProgram:y,releaseProgram:T,releaseShaderCache:b,programs:c,dispose:w}}function hv(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function dv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function sp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function rp(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,m,v,p,g){let A=n[e];return A===void 0?(A={id:h.id,object:h,geometry:f,material:m,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:p,group:g},n[e]=A):(A.id=h.id,A.object=h,A.geometry=f,A.material=m,A.materialVariant=a(h),A.groupOrder=v,A.renderOrder=h.renderOrder,A.z=p,A.group=g),e++,A}function l(h,f,m,v,p,g,A){A.reversedDepth===!0&&(p=-p);let C=o(h,f,m,v,p,g);m.transmission>0?i.push(C):m.transparent===!0?s.push(C):t.push(C)}function c(h,f,m,v,p,g){let A=o(h,f,m,v,p,g);m.transmission>0?i.unshift(A):m.transparent===!0?s.unshift(A):t.unshift(A)}function u(h,f){t.length>1&&t.sort(h||dv),i.length>1&&i.sort(f||sp),s.length>1&&s.sort(f||sp)}function d(){for(let h=e,f=n.length;h<f;h++){let m=n[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function fv(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new rp,n.set(i,[a])):s>=r.length?(a=new rp,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function pv(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new W,color:new Ke};break;case"SpotLight":t={position:new W,direction:new W,color:new Ke,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new W,color:new Ke,distance:0,decay:0};break;case"HemisphereLight":t={direction:new W,skyColor:new Ke,groundColor:new Ke};break;case"RectAreaLight":t={color:new Ke,position:new W,halfWidth:new W,halfHeight:new W};break}return n[e.id]=t,t}}}function mv(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var gv=0;function _v(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function xv(n){let e=new pv,t=mv(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new W);let s=new W,r=new pt,a=new pt;function o(c){let u=0,d=0,h=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let f=0,m=0,v=0,p=0,g=0,A=0,C=0,y=0,T=0,b=0,w=0,x=0,M=0,L=0;c.sort(_v);for(let P=0,B=c.length;P<B;P++){let N=c[P],H=N.color,j=N.intensity,Y=N.distance,X=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Wi?X=N.shadow.map.texture:X=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=H.r*j,d+=H.g*j,h+=H.b*j;else if(N.isLightProbe){for(let U=0;U<9;U++)i.probe[U].addScaledVector(N.sh.coefficients[U],j);L++}else if(N.isSunLight){let U=e.get(N);if(U.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let q=N.shadow,Q=t.get(N);Q.shadowIntensity=q.intensity,Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize.copy(q.mapSize).multiply(q.getFrameExtents()),i.sunShadow[m]=Q,i.sunShadowMap[m]=X;let ee=q.getViewportCount();for(let ue=0;ue<ee;ue++)i.sunShadowMatrix[v+ue]=q.getMatrix(ue),i.sunShadowCascade[v+ue]=q._cascadeData[ue];v+=ee,m++}i.sun[f]=U,f++}else if(N.isDirectionalLight){let U=e.get(N);if(U.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let q=N.shadow,Q=t.get(N);Q.shadowIntensity=q.intensity,Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,i.directionalShadow[p]=Q,i.directionalShadowMap[p]=X,i.directionalShadowMatrix[p]=N.shadow.matrix,T++}i.directional[p]=U,p++}else if(N.isSpotLight){let U=e.get(N);U.position.setFromMatrixPosition(N.matrixWorld),U.color.copy(H).multiplyScalar(j),U.distance=Y,U.coneCos=Math.cos(N.angle),U.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),U.decay=N.decay,i.spot[A]=U;let q=N.shadow;if(N.map&&(i.spotLightMap[x]=N.map,x++,q.updateMatrices(N),N.castShadow&&M++),i.spotLightMatrix[A]=q.matrix,N.castShadow){let Q=t.get(N);Q.shadowIntensity=q.intensity,Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,i.spotShadow[A]=Q,i.spotShadowMap[A]=X,w++}A++}else if(N.isRectAreaLight){let U=e.get(N);U.color.copy(H).multiplyScalar(j),U.halfWidth.set(N.width*.5,0,0),U.halfHeight.set(0,N.height*.5,0),i.rectArea[C]=U,C++}else if(N.isPointLight){let U=e.get(N);if(U.color.copy(N.color).multiplyScalar(N.intensity),U.distance=N.distance,U.decay=N.decay,N.castShadow){let q=N.shadow,Q=t.get(N);Q.shadowIntensity=q.intensity,Q.shadowBias=q.bias,Q.shadowNormalBias=q.normalBias,Q.shadowRadius=q.radius,Q.shadowMapSize=q.mapSize,Q.shadowCameraNear=q.camera.near,Q.shadowCameraFar=q.camera.far,i.pointShadow[g]=Q,i.pointShadowMap[g]=X,i.pointShadowMatrix[g]=N.shadow.matrix,b++}i.point[g]=U,g++}else if(N.isHemisphereLight){let U=e.get(N);U.skyColor.copy(N.color).multiplyScalar(j),U.groundColor.copy(N.groundColor).multiplyScalar(j),i.hemi[y]=U,y++}}C>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Se.LTC_FLOAT_1,i.rectAreaLTC2=Se.LTC_FLOAT_2):(i.rectAreaLTC1=Se.LTC_HALF_1,i.rectAreaLTC2=Se.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;let R=i.hash;(R.sunLength!==f||R.directionalLength!==p||R.pointLength!==g||R.spotLength!==A||R.rectAreaLength!==C||R.hemiLength!==y||R.numSunShadows!==m||R.numDirectionalShadows!==T||R.numPointShadows!==b||R.numSpotShadows!==w||R.numSpotMaps!==x||R.numLightProbes!==L)&&(i.sun.length=f,i.directional.length=p,i.spot.length=A,i.rectArea.length=C,i.point.length=g,i.hemi.length=y,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.directionalShadowMatrix.length=T,i.pointShadow.length=b,i.pointShadowMap.length=b,i.pointShadowMatrix.length=b,i.spotShadow.length=w,i.spotShadowMap.length=w,i.spotLightMatrix.length=w+x-M,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=L,R.sunLength=f,R.directionalLength=p,R.pointLength=g,R.spotLength=A,R.rectAreaLength=C,R.hemiLength=y,R.numSunShadows=m,R.numDirectionalShadows=T,R.numPointShadows=b,R.numSpotShadows=w,R.numSpotMaps=x,R.numLightProbes=L,i.version=gv++)}function l(c,u){let d=0,h=0,f=0,m=0,v=0,p=0,g=u.matrixWorldInverse;for(let A=0,C=c.length;A<C;A++){let y=c[A];if(y.isSunLight){let T=i.sun[d];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(g),d++}else if(y.isDirectionalLight){let T=i.directional[h];T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(g),h++}else if(y.isSpotLight){let T=i.spot[m];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(g),T.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),T.direction.sub(s),T.direction.transformDirection(g),m++}else if(y.isRectAreaLight){let T=i.rectArea[v];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(g),a.identity(),r.copy(y.matrixWorld),r.premultiply(g),a.extractRotation(r),T.halfWidth.set(y.width*.5,0,0),T.halfHeight.set(0,y.height*.5,0),T.halfWidth.applyMatrix4(a),T.halfHeight.applyMatrix4(a),v++}else if(y.isPointLight){let T=i.point[f];T.position.setFromMatrixPosition(y.matrixWorld),T.position.applyMatrix4(g),f++}else if(y.isHemisphereLight){let T=i.hemi[p];T.direction.setFromMatrixPosition(y.matrixWorld),T.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:i}}function ap(n){let e=new xv(n),t=[],i=[],s=[];function r(h){d.camera=h,t.length=0,i.length=0,s.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function yv(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new ap(n),e.set(s,[o])):r>=a.length?(o=new ap(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var vv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ).rg;
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ).r;
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( max( 0.0, squared_mean - mean * mean ) );
	gl_FragColor = vec4( mean, std_dev, 0.0, 1.0 );
}`,Sv=[new W(1,0,0),new W(-1,0,0),new W(0,1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1)],Mv=[new W(0,-1,0),new W(0,-1,0),new W(0,0,1),new W(0,0,-1),new W(0,-1,0),new W(0,-1,0)],op=new pt,Ba=new W,uh=new W;function wv(n,e,t){let i=new tr,s=new We,r=new We,a=new gt,o=new Ko,l=new Qo,c={},u=t.maxTextureSize,d={[Vi]:Kt,[Kt]:Vi,[Jn]:Jn},h=new Dt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:vv,fragmentShader:bv}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let m=new Gt;m.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new qt(m,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Aa;let g=this.type;this.render=function(b,w,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;this.type===tf&&(Ye("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Aa);let M=n.getRenderTarget(),L=n.getActiveCubeFace(),R=n.getActiveMipmapLevel(),P=n.state;P.setBlending($n),P.buffers.depth.getReversed()===!0?P.buffers.color.setClear(0,0,0,0):P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);let B=g!==this.type;B&&w.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(H=>H.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,H=b.length;N<H;N++){let j=b[N],Y=j.shadow;if(Y===void 0){Ye("WebGLShadowMap:",j,"has no shadow.");continue}if(Y.autoUpdate===!1&&Y.needsUpdate===!1)continue;s.copy(Y.mapSize);let X=Y.getFrameExtents();s.multiply(X),r.copy(Y.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/X.x),s.x=r.x*X.x,Y.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/X.y),s.y=r.y*X.y,Y.mapSize.y=r.y));let U=n.state.buffers.depth.getReversed();if(Y.camera._reversedDepth=U,Y.map===null||B===!0){if(Y.map!==null&&(Y.map.depthTexture!==null&&(Y.map.depthTexture.dispose(),Y.map.depthTexture=null),Y.map.dispose()),this.type===ar){if(j.isPointLight){Ye("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Y.map=new xn(s.x,s.y,{format:Wi,type:kn,minFilter:Ct,magFilter:Ct,generateMipmaps:!1}),Y.map.texture.name=j.name+".shadowMap",Y.map.depthTexture=new Fi(s.x,s.y,Bn),Y.map.depthTexture.name=j.name+".shadowMapDepth",Y.map.depthTexture.format=Wn,Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Zt,Y.map.depthTexture.magFilter=Zt}else j.isPointLight?(Y.map=new rc(s.x),Y.map.depthTexture=new $o(s.x,On)):(Y.map=new xn(s.x,s.y),Y.map.depthTexture=new Fi(s.x,s.y,On)),Y.map.depthTexture.name=j.name+".shadowMap",Y.map.depthTexture.format=Wn,this.type===Aa?(Y.map.depthTexture.compareFunction=U?tc:ec,Y.map.depthTexture.minFilter=Ct,Y.map.depthTexture.magFilter=Ct):(Y.map.depthTexture.compareFunction=null,Y.map.depthTexture.minFilter=Zt,Y.map.depthTexture.magFilter=Zt);Y.camera.updateProjectionMatrix()}Y.map.isWebGLCubeRenderTarget!==!0&&(Y.map.width!==s.x||Y.map.height!==s.y)&&Y.map.setSize(s.x,s.y);let q=Y.map.isWebGLCubeRenderTarget?6:Y.getViewportCount();j.isPointLight!==!0&&Y.updateMatrices(j,x);for(let Q=0;Q<q;Q++){let ee=Y.getCamera(Q);if(j.isPointLight){let ue=Y.camera,xe=Y.matrix,_e=j.distance||ue.far;_e!==ue.far&&(ue.far=_e,ue.updateProjectionMatrix()),Ba.setFromMatrixPosition(j.matrixWorld),ue.position.copy(Ba),uh.copy(ue.position),uh.add(Sv[Q]),ue.up.copy(Mv[Q]),ue.lookAt(uh),ue.updateMatrixWorld(),xe.makeTranslation(-Ba.x,-Ba.y,-Ba.z),op.multiplyMatrices(ue.projectionMatrix,ue.matrixWorldInverse),Y._frustum.setFromProjectionMatrix(op,ue.coordinateSystem,ue.reversedDepth)}if(Y.map.isWebGLCubeRenderTarget)n.setRenderTarget(Y.map,Q),n.clear();else{Q===0&&(n.setRenderTarget(Y.map),n.clear());let ue=Y.getViewport(Q);a.set(r.x*ue.x,r.y*ue.y,r.x*ue.z,r.y*ue.w),P.viewport(a)}i=Y.getFrustum(Q),y(w,x,ee,j,this.type)}Y.isPointLightShadow!==!0&&this.type===ar&&A(Y,x),Y.needsUpdate=!1}g=this.type,p.needsUpdate=!1,n.setRenderTarget(M,L,R)};function A(b,w){let x=e.update(v);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null?b.mapPass=new xn(s.x,s.y,{format:Wi,type:kn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),h.uniforms.shadow_pass.value=b.map.depthTexture,h.uniforms.resolution.value.set(b.map.width,b.map.height),h.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(w,null,x,h,v,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(w,null,x,f,v,null)}function C(b,w,x,M){let L=null,R=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(R!==void 0)L=R;else if(L=x.isPointLight===!0?l:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let P=L.uuid,B=w.uuid,N=c[P];N===void 0&&(N={},c[P]=N);let H=N[B];H===void 0&&(H=L.clone(),N[B]=H,w.addEventListener("dispose",T)),L=H}if(L.visible=w.visible,L.wireframe=w.wireframe,M===ar?L.side=w.shadowSide!==null?w.shadowSide:w.side:L.side=w.shadowSide!==null?w.shadowSide:d[w.side],L.alphaMap=w.alphaMap,L.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,L.map=w.map,L.clipShadows=w.clipShadows,L.clippingPlanes=w.clippingPlanes,L.clipIntersection=w.clipIntersection,L.displacementMap=w.displacementMap,L.displacementScale=w.displacementScale,L.displacementBias=w.displacementBias,L.wireframeLinewidth=w.wireframeLinewidth,L.linewidth=w.linewidth,x.isPointLight===!0&&L.isMeshDistanceMaterial===!0){let P=n.properties.get(L);P.light=x}return L}function y(b,w,x,M,L){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&L===ar)&&(!b.frustumCulled||b.intersectsFrustum(i))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);let B=e.update(b),N=b.material;if(Array.isArray(N)){let H=B.groups;for(let j=0,Y=H.length;j<Y;j++){let X=H[j],U=N[X.materialIndex];if(U&&U.visible){let q=C(b,U,M,L);b.onBeforeShadow(n,b,w,x,B,q,X),n.renderBufferDirect(x,null,B,q,b,X),b.onAfterShadow(n,b,w,x,B,q,X)}}}else if(N.visible){let H=C(b,N,M,L);b.onBeforeShadow(n,b,w,x,B,H,null),n.renderBufferDirect(x,null,B,H,b,null),b.onAfterShadow(n,b,w,x,B,H,null)}}let P=b.children;for(let B=0,N=P.length;B<N;B++)y(P[B],w,x,M,L)}function T(b){b.target.removeEventListener("dispose",T);for(let x in c){let M=c[x],L=b.target.uuid;L in M&&(M[L].dispose(),delete M[L])}}}function Ev(n,e){function t(){let z=!1,ve=new gt,ae=null,be=new gt(0,0,0,0);return{setMask:function(Ee){ae!==Ee&&!z&&(n.colorMask(Ee,Ee,Ee,Ee),ae=Ee)},setLocked:function(Ee){z=Ee},setClear:function(Ee,pe,Ve,Ne,St){St===!0&&(Ee*=Ne,pe*=Ne,Ve*=Ne),ve.set(Ee,pe,Ve,Ne),be.equals(ve)===!1&&(n.clearColor(Ee,pe,Ve,Ne),be.copy(ve))},reset:function(){z=!1,ae=null,be.set(-1,0,0,0)}}}function i(){let z=!1,ve=!1,ae=null,be=null,Ee=null;return{setReversed:function(pe){if(ve!==pe){let Ve=e.get("EXT_clip_control");pe?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),ve=pe;let Ne=Ee;Ee=null,this.setClear(Ne)}},getReversed:function(){return ve},setTest:function(pe){pe?oe(n.DEPTH_TEST):me(n.DEPTH_TEST)},setMask:function(pe){ae!==pe&&!z&&(n.depthMask(pe),ae=pe)},setFunc:function(pe){if(ve&&(pe=Ff[pe]),be!==pe){switch(pe){case Bo:n.depthFunc(n.NEVER);break;case ko:n.depthFunc(n.ALWAYS);break;case zo:n.depthFunc(n.LESS);break;case js:n.depthFunc(n.LEQUAL);break;case Vo:n.depthFunc(n.EQUAL);break;case Ho:n.depthFunc(n.GEQUAL);break;case Go:n.depthFunc(n.GREATER);break;case Wo:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}be=pe}},setLocked:function(pe){z=pe},setClear:function(pe){Ee!==pe&&(Ee=pe,ve&&(pe=1-pe),n.clearDepth(pe))},reset:function(){z=!1,ae=null,be=null,Ee=null,ve=!1}}}function s(){let z=!1,ve=null,ae=null,be=null,Ee=null,pe=null,Ve=null,Ne=null,St=null;return{setTest:function(mt){z||(mt?oe(n.STENCIL_TEST):me(n.STENCIL_TEST))},setMask:function(mt){ve!==mt&&!z&&(n.stencilMask(mt),ve=mt)},setFunc:function(mt,Wt,I){(ae!==mt||be!==Wt||Ee!==I)&&(n.stencilFunc(mt,Wt,I),ae=mt,be=Wt,Ee=I)},setOp:function(mt,Wt,I){(pe!==mt||Ve!==Wt||Ne!==I)&&(n.stencilOp(mt,Wt,I),pe=mt,Ve=Wt,Ne=I)},setLocked:function(mt){z=mt},setClear:function(mt){St!==mt&&(n.clearStencil(mt),St=mt)},reset:function(){z=!1,ve=null,ae=null,be=null,Ee=null,pe=null,Ve=null,Ne=null,St=null}}}let r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap,u={},d={},h={},f=new WeakMap,m=[],v=null,p=!1,g=null,A=null,C=null,y=null,T=null,b=null,w=null,x=new Ke(0,0,0),M=0,L=!1,R=null,P=null,B=null,N=null,H=null,j=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Y=!1,X=0,U=n.getParameter(n.VERSION);U.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(U)[1]),Y=X>=1):U.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),Y=X>=2);let q=null,Q={},ee=n.getParameter(n.SCISSOR_BOX),ue=n.getParameter(n.VIEWPORT),xe=new gt().fromArray(ee),_e=new gt().fromArray(ue);function De(z,ve,ae,be){let Ee=new Uint8Array(4),pe=n.createTexture();n.bindTexture(z,pe),n.texParameteri(z,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(z,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ve=0;Ve<ae;Ve++)z===n.TEXTURE_3D||z===n.TEXTURE_2D_ARRAY?n.texImage3D(ve,0,n.RGBA,1,1,be,0,n.RGBA,n.UNSIGNED_BYTE,Ee):n.texImage2D(ve+Ve,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ee);return pe}let te={};te[n.TEXTURE_2D]=De(n.TEXTURE_2D,n.TEXTURE_2D,1),te[n.TEXTURE_CUBE_MAP]=De(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[n.TEXTURE_2D_ARRAY]=De(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),te[n.TEXTURE_3D]=De(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),oe(n.DEPTH_TEST),a.setFunc(js),Qe(!1),_t(Iu),oe(n.CULL_FACE),tt($n);function oe(z){u[z]!==!0&&(n.enable(z),u[z]=!0)}function me(z){u[z]!==!1&&(n.disable(z),u[z]=!1)}function Re(z,ve){return h[z]!==ve?(n.bindFramebuffer(z,ve),h[z]=ve,z===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=ve),z===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=ve),!0):!1}function we(z,ve){let ae=m,be=!1;if(z){ae=f.get(ve),ae===void 0&&(ae=[],f.set(ve,ae));let Ee=z.textures;if(ae.length!==Ee.length||ae[0]!==n.COLOR_ATTACHMENT0){for(let pe=0,Ve=Ee.length;pe<Ve;pe++)ae[pe]=n.COLOR_ATTACHMENT0+pe;ae.length=Ee.length,be=!0}}else ae[0]!==n.BACK&&(ae[0]=n.BACK,be=!0);be&&n.drawBuffers(ae)}function Je(z){return v!==z?(n.useProgram(z),v=z,!0):!1}let et={[us]:n.FUNC_ADD,[sf]:n.FUNC_SUBTRACT,[rf]:n.FUNC_REVERSE_SUBTRACT};et[af]=n.MIN,et[of]=n.MAX;let je={[lf]:n.ZERO,[cf]:n.ONE,[uf]:n.SRC_COLOR,[Nu]:n.SRC_ALPHA,[gf]:n.SRC_ALPHA_SATURATE,[pf]:n.DST_COLOR,[df]:n.DST_ALPHA,[hf]:n.ONE_MINUS_SRC_COLOR,[Uu]:n.ONE_MINUS_SRC_ALPHA,[mf]:n.ONE_MINUS_DST_COLOR,[ff]:n.ONE_MINUS_DST_ALPHA,[_f]:n.CONSTANT_COLOR,[xf]:n.ONE_MINUS_CONSTANT_COLOR,[yf]:n.CONSTANT_ALPHA,[vf]:n.ONE_MINUS_CONSTANT_ALPHA};function tt(z,ve,ae,be,Ee,pe,Ve,Ne,St,mt){if(z===$n){p===!0&&(me(n.BLEND),p=!1);return}if(p===!1&&(oe(n.BLEND),p=!0),z!==nf){if(z!==g||mt!==L){if((A!==us||T!==us)&&(n.blendEquation(n.FUNC_ADD),A=us,T=us),mt)switch(z){case or:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pi:n.blendFunc(n.ONE,n.ONE);break;case Lu:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Du:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:$e("WebGLState: Invalid blending: ",z);break}else switch(z){case or:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case pi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Lu:$e("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Du:$e("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:$e("WebGLState: Invalid blending: ",z);break}C=null,y=null,b=null,w=null,x.set(0,0,0),M=0,g=z,L=mt}return}Ee=Ee||ve,pe=pe||ae,Ve=Ve||be,(ve!==A||Ee!==T)&&(n.blendEquationSeparate(et[ve],et[Ee]),A=ve,T=Ee),(ae!==C||be!==y||pe!==b||Ve!==w)&&(n.blendFuncSeparate(je[ae],je[be],je[pe],je[Ve]),C=ae,y=be,b=pe,w=Ve),(Ne.equals(x)===!1||St!==M)&&(n.blendColor(Ne.r,Ne.g,Ne.b,St),x.copy(Ne),M=St),g=z,L=!1}function ct(z,ve){z.side===Jn?me(n.CULL_FACE):oe(n.CULL_FACE);let ae=z.side===Kt;ve&&(ae=!ae),Qe(ae),z.blending===or&&z.transparent===!1?tt($n):tt(z.blending,z.blendEquation,z.blendSrc,z.blendDst,z.blendEquationAlpha,z.blendSrcAlpha,z.blendDstAlpha,z.blendColor,z.blendAlpha,z.premultipliedAlpha),a.setFunc(z.depthFunc),a.setTest(z.depthTest),a.setMask(z.depthWrite),r.setMask(z.colorWrite);let be=z.stencilWrite;o.setTest(be),be&&(o.setMask(z.stencilWriteMask),o.setFunc(z.stencilFunc,z.stencilRef,z.stencilFuncMask),o.setOp(z.stencilFail,z.stencilZFail,z.stencilZPass)),qe(z.polygonOffset,z.polygonOffsetFactor,z.polygonOffsetUnits),z.alphaToCoverage===!0?oe(n.SAMPLE_ALPHA_TO_COVERAGE):me(n.SAMPLE_ALPHA_TO_COVERAGE)}function Qe(z){R!==z&&(z?n.frontFace(n.CW):n.frontFace(n.CCW),R=z)}function _t(z){z!==Qd?(oe(n.CULL_FACE),z!==P&&(z===Iu?n.cullFace(n.BACK):z===ef?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):me(n.CULL_FACE),P=z}function de(z){z!==B&&(Y&&n.lineWidth(z),B=z)}function qe(z,ve,ae){z?(oe(n.POLYGON_OFFSET_FILL),(N!==ve||H!==ae)&&(N=ve,H=ae,a.getReversed()&&(ve=-ve),n.polygonOffset(ve,ae))):me(n.POLYGON_OFFSET_FILL)}function ut(z){z?oe(n.SCISSOR_TEST):me(n.SCISSOR_TEST)}function ht(z){z===void 0&&(z=n.TEXTURE0+j-1),q!==z&&(n.activeTexture(z),q=z)}function k(z,ve,ae){ae===void 0&&(q===null?ae=n.TEXTURE0+j-1:ae=q);let be=Q[ae];be===void 0&&(be={type:void 0,texture:void 0},Q[ae]=be),(be.type!==z||be.texture!==ve)&&(q!==ae&&(n.activeTexture(ae),q=ae),n.bindTexture(z,ve||te[z]),be.type=z,be.texture=ve)}function dt(){let z=Q[q];z!==void 0&&z.type!==void 0&&(n.bindTexture(z.type,null),z.type=void 0,z.texture=void 0)}function at(){try{n.compressedTexImage2D(...arguments)}catch(z){$e("WebGLState:",z)}}function S(){try{n.compressedTexImage3D(...arguments)}catch(z){$e("WebGLState:",z)}}function _(){try{n.texSubImage2D(...arguments)}catch(z){$e("WebGLState:",z)}}function D(){try{n.texSubImage3D(...arguments)}catch(z){$e("WebGLState:",z)}}function O(){try{n.compressedTexSubImage2D(...arguments)}catch(z){$e("WebGLState:",z)}}function J(){try{n.compressedTexSubImage3D(...arguments)}catch(z){$e("WebGLState:",z)}}function he(){try{n.texStorage2D(...arguments)}catch(z){$e("WebGLState:",z)}}function fe(){try{n.texStorage3D(...arguments)}catch(z){$e("WebGLState:",z)}}function re(){try{n.texImage2D(...arguments)}catch(z){$e("WebGLState:",z)}}function ce(){try{n.texImage3D(...arguments)}catch(z){$e("WebGLState:",z)}}function ge(z){return d[z]!==void 0?d[z]:n.getParameter(z)}function Be(z,ve){d[z]!==ve&&(n.pixelStorei(z,ve),d[z]=ve)}function Me(z){xe.equals(z)===!1&&(n.scissor(z.x,z.y,z.z,z.w),xe.copy(z))}function ye(z){_e.equals(z)===!1&&(n.viewport(z.x,z.y,z.z,z.w),_e.copy(z))}function ke(z,ve){let ae=c.get(ve);ae===void 0&&(ae=new WeakMap,c.set(ve,ae));let be=ae.get(z);be===void 0&&(be=n.getUniformBlockIndex(ve,z.name),ae.set(z,be))}function Le(z,ve){let be=c.get(ve).get(z);l.get(ve)!==be&&(n.uniformBlockBinding(ve,be,z.__bindingPointIndex),l.set(ve,be))}function nt(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},q=null,Q={},h={},f=new WeakMap,m=[],v=null,p=!1,g=null,A=null,C=null,y=null,T=null,b=null,w=null,x=new Ke(0,0,0),M=0,L=!1,R=null,P=null,B=null,N=null,H=null,xe.set(0,0,n.canvas.width,n.canvas.height),_e.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:oe,disable:me,bindFramebuffer:Re,drawBuffers:we,useProgram:Je,setBlending:tt,setMaterial:ct,setFlipSided:Qe,setCullFace:_t,setLineWidth:de,setPolygonOffset:qe,setScissorTest:ut,activeTexture:ht,bindTexture:k,unbindTexture:dt,compressedTexImage2D:at,compressedTexImage3D:S,texImage2D:re,texImage3D:ce,pixelStorei:Be,getParameter:ge,updateUBOMapping:ke,uniformBlockBinding:Le,texStorage2D:he,texStorage3D:fe,texSubImage2D:_,texSubImage3D:D,compressedTexSubImage2D:O,compressedTexSubImage3D:J,scissor:Me,viewport:ye,reset:nt}}function Tv(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new We,u=new WeakMap,d=new Set,h,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(S,_){return m?new OffscreenCanvas(S,_):aa("canvas")}function p(S,_,D){let O=1,J=at(S);if((J.width>D||J.height>D)&&(O=D/Math.max(J.width,J.height)),O<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){let he=Math.floor(O*J.width),fe=Math.floor(O*J.height);h===void 0&&(h=v(he,fe));let re=_?v(he,fe):h;return re.width=he,re.height=fe,re.getContext("2d").drawImage(S,0,0,he,fe),Ye("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+he+"x"+fe+")."),re}else return"data"in S&&Ye("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),S;return S}function g(S){return S.generateMipmaps}function A(S){n.generateMipmap(S)}function C(S){return S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?n.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(S,_,D,O,J,he=!1){if(S!==null){if(n[S]!==void 0)return n[S];Ye("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let fe;O&&(fe=e.get("EXT_texture_norm16"),fe||Ye("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let re=_;if(_===n.RED&&(D===n.FLOAT&&(re=n.R32F),D===n.HALF_FLOAT&&(re=n.R16F),D===n.UNSIGNED_BYTE&&(re=n.R8),D===n.UNSIGNED_SHORT&&fe&&(re=fe.R16_EXT),D===n.SHORT&&fe&&(re=fe.R16_SNORM_EXT)),_===n.RED_INTEGER&&(D===n.UNSIGNED_BYTE&&(re=n.R8UI),D===n.UNSIGNED_SHORT&&(re=n.R16UI),D===n.UNSIGNED_INT&&(re=n.R32UI),D===n.BYTE&&(re=n.R8I),D===n.SHORT&&(re=n.R16I),D===n.INT&&(re=n.R32I)),_===n.RG&&(D===n.FLOAT&&(re=n.RG32F),D===n.HALF_FLOAT&&(re=n.RG16F),D===n.UNSIGNED_BYTE&&(re=n.RG8),D===n.UNSIGNED_SHORT&&fe&&(re=fe.RG16_EXT),D===n.SHORT&&fe&&(re=fe.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(D===n.UNSIGNED_BYTE&&(re=n.RG8UI),D===n.UNSIGNED_SHORT&&(re=n.RG16UI),D===n.UNSIGNED_INT&&(re=n.RG32UI),D===n.BYTE&&(re=n.RG8I),D===n.SHORT&&(re=n.RG16I),D===n.INT&&(re=n.RG32I)),_===n.RGB_INTEGER&&(D===n.UNSIGNED_BYTE&&(re=n.RGB8UI),D===n.UNSIGNED_SHORT&&(re=n.RGB16UI),D===n.UNSIGNED_INT&&(re=n.RGB32UI),D===n.BYTE&&(re=n.RGB8I),D===n.SHORT&&(re=n.RGB16I),D===n.INT&&(re=n.RGB32I)),_===n.RGBA_INTEGER&&(D===n.UNSIGNED_BYTE&&(re=n.RGBA8UI),D===n.UNSIGNED_SHORT&&(re=n.RGBA16UI),D===n.UNSIGNED_INT&&(re=n.RGBA32UI),D===n.BYTE&&(re=n.RGBA8I),D===n.SHORT&&(re=n.RGBA16I),D===n.INT&&(re=n.RGBA32I)),_===n.RGB&&(D===n.UNSIGNED_SHORT&&fe&&(re=fe.RGB16_EXT),D===n.SHORT&&fe&&(re=fe.RGB16_SNORM_EXT),D===n.UNSIGNED_INT_5_9_9_9_REV&&(re=n.RGB9_E5),D===n.UNSIGNED_INT_10F_11F_11F_REV&&(re=n.R11F_G11F_B10F)),_===n.RGBA){let ce=he?ra:lt.getTransfer(J);D===n.FLOAT&&(re=n.RGBA32F),D===n.HALF_FLOAT&&(re=n.RGBA16F),D===n.UNSIGNED_BYTE&&(re=ce===yt?n.SRGB8_ALPHA8:n.RGBA8),D===n.UNSIGNED_SHORT&&fe&&(re=fe.RGBA16_EXT),D===n.SHORT&&fe&&(re=fe.RGBA16_SNORM_EXT),D===n.UNSIGNED_SHORT_4_4_4_4&&(re=n.RGBA4),D===n.UNSIGNED_SHORT_5_5_5_1&&(re=n.RGB5_A1)}return(re===n.R16F||re===n.R32F||re===n.RG16F||re===n.RG32F||re===n.RGBA16F||re===n.RGBA32F)&&e.get("EXT_color_buffer_float"),re}function T(S,_){let D;return S?_===null||_===On||_===cr?D=n.DEPTH24_STENCIL8:_===Bn?D=n.DEPTH32F_STENCIL8:_===lr&&(D=n.DEPTH24_STENCIL8,Ye("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===On||_===cr?D=n.DEPTH_COMPONENT24:_===Bn?D=n.DEPTH_COMPONENT32F:_===lr&&(D=n.DEPTH_COMPONENT16),D}function b(S,_){return g(S)===!0||S.isFramebufferTexture&&S.minFilter!==Zt&&S.minFilter!==Ct?Math.log2(Math.max(_.width,_.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?_.mipmaps.length:1}function w(S){let _=S.target;_.removeEventListener("dispose",w),M(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&d.delete(_)}function x(S){let _=S.target;_.removeEventListener("dispose",x),R(_)}function M(S){let _=i.get(S);if(_.__webglInit===void 0)return;let D=S.source,O=f.get(D);if(O){let J=O[_.__cacheKey];J.usedTimes--,J.usedTimes===0&&L(S),Object.keys(O).length===0&&f.delete(D)}i.remove(S)}function L(S){let _=i.get(S);n.deleteTexture(_.__webglTexture);let D=S.source,O=f.get(D);delete O[_.__cacheKey],a.memory.textures--}function R(S){let _=i.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),i.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let O=0;O<6;O++){if(Array.isArray(_.__webglFramebuffer[O]))for(let J=0;J<_.__webglFramebuffer[O].length;J++)n.deleteFramebuffer(_.__webglFramebuffer[O][J]);else n.deleteFramebuffer(_.__webglFramebuffer[O]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[O])}else{if(Array.isArray(_.__webglFramebuffer))for(let O=0;O<_.__webglFramebuffer.length;O++)n.deleteFramebuffer(_.__webglFramebuffer[O]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let O=0;O<_.__webglColorRenderbuffer.length;O++)_.__webglColorRenderbuffer[O]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[O]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let D=S.textures;for(let O=0,J=D.length;O<J;O++){let he=i.get(D[O]);he.__webglTexture&&(n.deleteTexture(he.__webglTexture),a.memory.textures--),i.remove(D[O])}i.remove(S)}let P=0;function B(){P=0}function N(){return P}function H(S){P=S}function j(){let S=P;return S>=s.maxTextures&&Ye("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+s.maxTextures),P+=1,S}function Y(S){let _=[];return _.push(S.wrapS),_.push(S.wrapT),_.push(S.wrapR||0),_.push(S.magFilter),_.push(S.minFilter),_.push(S.anisotropy),_.push(S.internalFormat),_.push(S.format),_.push(S.type),_.push(S.generateMipmaps),_.push(S.premultiplyAlpha),_.push(S.flipY),_.push(S.unpackAlignment),_.push(S.colorSpace),_.join()}function X(S,_){let D=i.get(S);if(S.isVideoTexture&&k(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&D.__version!==S.version){let O=S.image;if(O===null)Ye("WebGLRenderer: Texture marked for update but no image data found.");else if(O.complete===!1)Ye("WebGLRenderer: Texture marked for update but image is incomplete");else{me(D,S,_);return}}else S.isExternalTexture&&(D.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,D.__webglTexture,n.TEXTURE0+_)}function U(S,_){let D=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&D.__version!==S.version){me(D,S,_);return}else S.isExternalTexture&&(D.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,D.__webglTexture,n.TEXTURE0+_)}function q(S,_){let D=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&D.__version!==S.version){me(D,S,_);return}t.bindTexture(n.TEXTURE_3D,D.__webglTexture,n.TEXTURE0+_)}function Q(S,_){let D=i.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&D.__version!==S.version){Re(D,S,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+_)}let ee={[qs]:n.REPEAT,[An]:n.CLAMP_TO_EDGE,[Xo]:n.MIRRORED_REPEAT},ue={[Zt]:n.NEAREST,[Mf]:n.NEAREST_MIPMAP_NEAREST,[Ra]:n.NEAREST_MIPMAP_LINEAR,[Ct]:n.LINEAR,[gl]:n.LINEAR_MIPMAP_NEAREST,[Fn]:n.LINEAR_MIPMAP_LINEAR},xe={[Af]:n.NEVER,[Lf]:n.ALWAYS,[Cf]:n.LESS,[ec]:n.LEQUAL,[Rf]:n.EQUAL,[tc]:n.GEQUAL,[Pf]:n.GREATER,[If]:n.NOTEQUAL};function _e(S,_){if(_.type===Bn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Ct||_.magFilter===gl||_.magFilter===Ra||_.magFilter===Fn||_.minFilter===Ct||_.minFilter===gl||_.minFilter===Ra||_.minFilter===Fn)&&Ye("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(S,n.TEXTURE_WRAP_S,ee[_.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,ee[_.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,ee[_.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,ue[_.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,ue[_.minFilter]),_.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,xe[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Zt||_.minFilter!==Ra&&_.minFilter!==Fn||_.type===Bn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let D=e.get("EXT_texture_filter_anisotropic");n.texParameterf(S,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function De(S,_){let D=!1;S.__webglInit===void 0&&(S.__webglInit=!0,_.addEventListener("dispose",w));let O=_.source,J=f.get(O);J===void 0&&(J={},f.set(O,J));let he=Y(_);if(he!==S.__cacheKey){J[he]===void 0&&(J[he]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,D=!0),J[he].usedTimes++;let fe=J[S.__cacheKey];fe!==void 0&&(J[S.__cacheKey].usedTimes--,fe.usedTimes===0&&L(_)),S.__cacheKey=he,S.__webglTexture=J[he].texture}return D}function te(S,_,D){return Math.floor(Math.floor(S/D)/_)}function oe(S,_,D,O){let he=S.updateRanges;if(he.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,D,O,_.data);else{he.sort((Be,Me)=>Be.start-Me.start);let fe=0;for(let Be=1;Be<he.length;Be++){let Me=he[fe],ye=he[Be],ke=Me.start+Me.count,Le=te(ye.start,_.width,4),nt=te(Me.start,_.width,4);ye.start<=ke+1&&Le===nt&&te(ye.start+ye.count-1,_.width,4)===Le?Me.count=Math.max(Me.count,ye.start+ye.count-Me.start):(++fe,he[fe]=ye)}he.length=fe+1;let re=t.getParameter(n.UNPACK_ROW_LENGTH),ce=t.getParameter(n.UNPACK_SKIP_PIXELS),ge=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let Be=0,Me=he.length;Be<Me;Be++){let ye=he[Be],ke=Math.floor(ye.start/4),Le=Math.ceil(ye.count/4),nt=ke%_.width,z=Math.floor(ke/_.width),ve=Le,ae=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,nt),t.pixelStorei(n.UNPACK_SKIP_ROWS,z),t.texSubImage2D(n.TEXTURE_2D,0,nt,z,ve,ae,D,O,_.data)}S.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,re),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ce),t.pixelStorei(n.UNPACK_SKIP_ROWS,ge)}}function me(S,_,D){let O=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(O=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(O=n.TEXTURE_3D);let J=De(S,_),he=_.source;t.bindTexture(O,S.__webglTexture,n.TEXTURE0+D);let fe=i.get(he);if(he.version!==fe.__version||J===!0){if(t.activeTexture(n.TEXTURE0+D),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let ae=lt.getPrimaries(lt.workingColorSpace),be=_.colorSpace===mi?null:lt.getPrimaries(_.colorSpace),Ee=_.colorSpace===mi||ae===be?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ee)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let ce=p(_.image,!1,s.maxTextureSize);ce=dt(_,ce);let ge=r.convert(_.format,_.colorSpace),Be=r.convert(_.type),Me=y(_.internalFormat,ge,Be,_.normalized,_.colorSpace,_.isVideoTexture);_e(O,_);let ye,ke=_.mipmaps,Le=_.isVideoTexture!==!0,nt=fe.__version===void 0||J===!0,z=he.dataReady,ve=b(_,ce);if(_.isDepthTexture)Me=T(_.format===Gi,_.type),nt&&(Le?t.texStorage2D(n.TEXTURE_2D,1,Me,ce.width,ce.height):t.texImage2D(n.TEXTURE_2D,0,Me,ce.width,ce.height,0,ge,Be,null));else if(_.isDataTexture)if(ke.length>0){Le&&nt&&t.texStorage2D(n.TEXTURE_2D,ve,Me,ke[0].width,ke[0].height);for(let ae=0,be=ke.length;ae<be;ae++)ye=ke[ae],Le?z&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,ye.width,ye.height,ge,Be,ye.data):t.texImage2D(n.TEXTURE_2D,ae,Me,ye.width,ye.height,0,ge,Be,ye.data);_.generateMipmaps=!1}else Le?(nt&&t.texStorage2D(n.TEXTURE_2D,ve,Me,ce.width,ce.height),z&&oe(_,ce,ge,Be)):t.texImage2D(n.TEXTURE_2D,0,Me,ce.width,ce.height,0,ge,Be,ce.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Le&&nt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,Me,ke[0].width,ke[0].height,ce.depth);for(let ae=0,be=ke.length;ae<be;ae++)if(ye=ke[ae],_.format!==pn)if(ge!==null)if(Le){if(z)if(_.layerUpdates.size>0){let Ee=sh(ye.width,ye.height,_.format,_.type);for(let pe of _.layerUpdates){let Ve=ye.data.subarray(pe*Ee/ye.data.BYTES_PER_ELEMENT,(pe+1)*Ee/ye.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,pe,ye.width,ye.height,1,ge,Ve)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,ye.width,ye.height,ce.depth,ge,ye.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ae,Me,ye.width,ye.height,ce.depth,0,ye.data,0,0);else Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Le?z&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ae,0,0,0,ye.width,ye.height,ce.depth,ge,Be,ye.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ae,Me,ye.width,ye.height,ce.depth,0,ge,Be,ye.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Le&&nt&&t.texStorage2D(n.TEXTURE_2D,ve,Me,ke[0].width,ke[0].height);for(let ae=0,be=ke.length;ae<be;ae++)ye=ke[ae],_.format!==pn?ge!==null?Le?z&&t.compressedTexSubImage2D(n.TEXTURE_2D,ae,0,0,ye.width,ye.height,ge,ye.data):t.compressedTexImage2D(n.TEXTURE_2D,ae,Me,ye.width,ye.height,0,ye.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Le?z&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,ye.width,ye.height,ge,Be,ye.data):t.texImage2D(n.TEXTURE_2D,ae,Me,ye.width,ye.height,0,ge,Be,ye.data)}else if(_.isDataArrayTexture)if(Le){if(nt&&t.texStorage3D(n.TEXTURE_2D_ARRAY,ve,Me,ce.width,ce.height,ce.depth),z)if(_.layerUpdates.size>0){let ae=sh(ce.width,ce.height,_.format,_.type);for(let be of _.layerUpdates){let Ee=ce.data.subarray(be*ae/ce.data.BYTES_PER_ELEMENT,(be+1)*ae/ce.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,be,ce.width,ce.height,1,ge,Be,Ee)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ce.width,ce.height,ce.depth,ge,Be,ce.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Me,ce.width,ce.height,ce.depth,0,ge,Be,ce.data);else if(_.isData3DTexture)Le?(nt&&t.texStorage3D(n.TEXTURE_3D,ve,Me,ce.width,ce.height,ce.depth),z&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ce.width,ce.height,ce.depth,ge,Be,ce.data)):t.texImage3D(n.TEXTURE_3D,0,Me,ce.width,ce.height,ce.depth,0,ge,Be,ce.data);else if(_.isFramebufferTexture){if(nt)if(Le)t.texStorage2D(n.TEXTURE_2D,ve,Me,ce.width,ce.height);else{let ae=ce.width,be=ce.height;for(let Ee=0;Ee<ve;Ee++)t.texImage2D(n.TEXTURE_2D,Ee,Me,ae,be,0,ge,Be,null),ae>>=1,be>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){let ae=n.canvas;if(ae.hasAttribute("layoutsubtree")||ae.setAttribute("layoutsubtree","true"),ce.parentNode!==ae){ae.appendChild(ce),d.add(_),ae.onpaint=be=>{let Ee=be.changedElements;for(let pe of d)Ee.includes(pe.image)&&(pe.needsUpdate=!0)},ae.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ce);else{let Ee=n.RGBA,pe=n.RGBA,Ve=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ee,pe,Ve,ce)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(ke.length>0){if(Le&&nt){let ae=at(ke[0]);t.texStorage2D(n.TEXTURE_2D,ve,Me,ae.width,ae.height)}for(let ae=0,be=ke.length;ae<be;ae++)ye=ke[ae],Le?z&&t.texSubImage2D(n.TEXTURE_2D,ae,0,0,ge,Be,ye):t.texImage2D(n.TEXTURE_2D,ae,Me,ge,Be,ye);_.generateMipmaps=!1}else if(Le){if(nt){let ae=at(ce);t.texStorage2D(n.TEXTURE_2D,ve,Me,ae.width,ae.height)}z&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,ge,Be,ce)}else t.texImage2D(n.TEXTURE_2D,0,Me,ge,Be,ce);g(_)&&A(O),fe.__version=he.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function Re(S,_,D){if(_.image.length!==6)return;let O=De(S,_),J=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+D);let he=i.get(J);if(J.version!==he.__version||O===!0){t.activeTexture(n.TEXTURE0+D);let fe=lt.getPrimaries(lt.workingColorSpace),re=_.colorSpace===mi?null:lt.getPrimaries(_.colorSpace),ce=_.colorSpace===mi||fe===re?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ce);let ge=_.isCompressedTexture||_.image[0].isCompressedTexture,Be=_.image[0]&&_.image[0].isDataTexture,Me=[];for(let pe=0;pe<6;pe++)!ge&&!Be?Me[pe]=p(_.image[pe],!0,s.maxCubemapSize):Me[pe]=Be?_.image[pe].image:_.image[pe],Me[pe]=dt(_,Me[pe]);let ye=Me[0],ke=r.convert(_.format,_.colorSpace),Le=r.convert(_.type),nt=y(_.internalFormat,ke,Le,_.normalized,_.colorSpace),z=_.isVideoTexture!==!0,ve=he.__version===void 0||O===!0,ae=J.dataReady,be=b(_,ye);_e(n.TEXTURE_CUBE_MAP,_);let Ee;if(ge){z&&ve&&t.texStorage2D(n.TEXTURE_CUBE_MAP,be,nt,ye.width,ye.height);for(let pe=0;pe<6;pe++){Ee=Me[pe].mipmaps;for(let Ve=0;Ve<Ee.length;Ve++){let Ne=Ee[Ve];_.format!==pn?ke!==null?z?ae&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ve,0,0,Ne.width,Ne.height,ke,Ne.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ve,nt,Ne.width,Ne.height,0,Ne.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):z?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ve,0,0,Ne.width,Ne.height,ke,Le,Ne.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ve,nt,Ne.width,Ne.height,0,ke,Le,Ne.data)}}}else{if(Ee=_.mipmaps,z&&ve){Ee.length>0&&be++;let pe=at(Me[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,be,nt,pe.width,pe.height)}for(let pe=0;pe<6;pe++)if(Be){z?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,Me[pe].width,Me[pe].height,ke,Le,Me[pe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,nt,Me[pe].width,Me[pe].height,0,ke,Le,Me[pe].data);for(let Ve=0;Ve<Ee.length;Ve++){let St=Ee[Ve].image[pe].image;z?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ve+1,0,0,St.width,St.height,ke,Le,St.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ve+1,nt,St.width,St.height,0,ke,Le,St.data)}}else{z?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,ke,Le,Me[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,nt,ke,Le,Me[pe]);for(let Ve=0;Ve<Ee.length;Ve++){let Ne=Ee[Ve];z?ae&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ve+1,0,0,ke,Le,Ne.image[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,Ve+1,nt,ke,Le,Ne.image[pe])}}}g(_)&&A(n.TEXTURE_CUBE_MAP),he.__version=J.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function we(S,_,D,O,J,he){let fe=r.convert(D.format,D.colorSpace),re=r.convert(D.type),ce=y(D.internalFormat,fe,re,D.normalized,D.colorSpace),ge=i.get(_),Be=i.get(D);if(Be.__renderTarget=_,!ge.__hasExternalTextures){let Me=Math.max(1,_.width>>he),ye=Math.max(1,_.height>>he);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,he,ce,Me,ye,_.depth,0,fe,re,null):t.texImage2D(J,he,ce,Me,ye,0,fe,re,null)}t.bindFramebuffer(n.FRAMEBUFFER,S),ht(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,O,J,Be.__webglTexture,0,ut(_)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,O,J,Be.__webglTexture,he),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Je(S,_,D){if(n.bindRenderbuffer(n.RENDERBUFFER,S),_.depthBuffer){let O=_.depthTexture,J=O&&O.isDepthTexture?O.type:null,he=T(_.stencilBuffer,J),fe=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;ht(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ut(_),he,_.width,_.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,ut(_),he,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,he,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,fe,n.RENDERBUFFER,S)}else{let O=_.textures;for(let J=0;J<O.length;J++){let he=O[J],fe=r.convert(he.format,he.colorSpace),re=r.convert(he.type),ce=y(he.internalFormat,fe,re,he.normalized,he.colorSpace);ht(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,ut(_),ce,_.width,_.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,ut(_),ce,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ce,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function et(S,_,D){let O=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,S),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let J=i.get(_.depthTexture);if(J.__renderTarget=_,(!J.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),O){if(J.__webglInit===void 0&&(J.__webglInit=!0,_.depthTexture.addEventListener("dispose",w)),J.__webglTexture===void 0){J.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),_e(n.TEXTURE_CUBE_MAP,_.depthTexture);let ge=r.convert(_.depthTexture.format),Be=r.convert(_.depthTexture.type),Me;_.depthTexture.format===Wn?Me=n.DEPTH_COMPONENT24:_.depthTexture.format===Gi&&(Me=n.DEPTH24_STENCIL8);for(let ye=0;ye<6;ye++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ye,0,Me,_.width,_.height,0,ge,Be,null)}}else X(_.depthTexture,0);let he=J.__webglTexture,fe=ut(_),re=O?n.TEXTURE_CUBE_MAP_POSITIVE_X+D:n.TEXTURE_2D,ce=_.depthTexture.format===Gi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Wn)ht(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,re,he,0,fe):n.framebufferTexture2D(n.FRAMEBUFFER,ce,re,he,0);else if(_.depthTexture.format===Gi)ht(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ce,re,he,0,fe):n.framebufferTexture2D(n.FRAMEBUFFER,ce,re,he,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function je(S){let _=i.get(S),D=S.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==S.depthTexture){let O=S.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),O){let J=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,O.removeEventListener("dispose",J)};O.addEventListener("dispose",J),_.__depthDisposeCallback=J}_.__boundDepthTexture=O}if(S.depthTexture&&!_.__autoAllocateDepthBuffer)if(D)for(let O=0;O<6;O++)et(_.__webglFramebuffer[O],S,O);else{let O=S.texture.mipmaps;O&&O.length>0?et(_.__webglFramebuffer[0],S,0):et(_.__webglFramebuffer,S,0)}else if(D){_.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[O]),_.__webglDepthbuffer[O]===void 0)_.__webglDepthbuffer[O]=n.createRenderbuffer(),Je(_.__webglDepthbuffer[O],S,!1);else{let J=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=_.__webglDepthbuffer[O];n.bindRenderbuffer(n.RENDERBUFFER,he),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,he)}}else{let O=S.texture.mipmaps;if(O&&O.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Je(_.__webglDepthbuffer,S,!1);else{let J=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,he),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,he)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function tt(S,_,D){let O=i.get(S);_!==void 0&&we(O.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),D!==void 0&&je(S)}function ct(S){let _=S.texture,D=i.get(S),O=i.get(_);S.addEventListener("dispose",x);let J=S.textures,he=S.isWebGLCubeRenderTarget===!0,fe=J.length>1;if(fe||(O.__webglTexture===void 0&&(O.__webglTexture=n.createTexture()),O.__version=_.version,a.memory.textures++),he){D.__webglFramebuffer=[];for(let re=0;re<6;re++)if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer[re]=[];for(let ce=0;ce<_.mipmaps.length;ce++)D.__webglFramebuffer[re][ce]=n.createFramebuffer()}else D.__webglFramebuffer[re]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer=[];for(let re=0;re<_.mipmaps.length;re++)D.__webglFramebuffer[re]=n.createFramebuffer()}else D.__webglFramebuffer=n.createFramebuffer();if(fe)for(let re=0,ce=J.length;re<ce;re++){let ge=i.get(J[re]);ge.__webglTexture===void 0&&(ge.__webglTexture=n.createTexture(),a.memory.textures++)}if(S.samples>0&&ht(S)===!1){D.__webglMultisampledFramebuffer=n.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let re=0;re<J.length;re++){let ce=J[re];D.__webglColorRenderbuffer[re]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,D.__webglColorRenderbuffer[re]);let ge=r.convert(ce.format,ce.colorSpace),Be=r.convert(ce.type),Me=y(ce.internalFormat,ge,Be,ce.normalized,ce.colorSpace,S.isXRRenderTarget===!0),ye=ut(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,ye,Me,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+re,n.RENDERBUFFER,D.__webglColorRenderbuffer[re])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(D.__webglDepthRenderbuffer=n.createRenderbuffer(),Je(D.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(he){t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture),_e(n.TEXTURE_CUBE_MAP,_);for(let re=0;re<6;re++)if(_.mipmaps&&_.mipmaps.length>0)for(let ce=0;ce<_.mipmaps.length;ce++)we(D.__webglFramebuffer[re][ce],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,ce);else we(D.__webglFramebuffer[re],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+re,0);g(_)&&A(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(fe){for(let re=0,ce=J.length;re<ce;re++){let ge=J[re],Be=i.get(ge),Me=n.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(Me=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Me,Be.__webglTexture),_e(Me,ge),we(D.__webglFramebuffer,S,ge,n.COLOR_ATTACHMENT0+re,Me,0),g(ge)&&A(Me)}t.unbindTexture()}else{let re=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(re=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(re,O.__webglTexture),_e(re,_),_.mipmaps&&_.mipmaps.length>0)for(let ce=0;ce<_.mipmaps.length;ce++)we(D.__webglFramebuffer[ce],S,_,n.COLOR_ATTACHMENT0,re,ce);else we(D.__webglFramebuffer,S,_,n.COLOR_ATTACHMENT0,re,0);g(_)&&A(re),t.unbindTexture()}S.depthBuffer&&je(S)}function Qe(S){let _=S.textures;for(let D=0,O=_.length;D<O;D++){let J=_[D];if(g(J)){let he=C(S),fe=i.get(J).__webglTexture;t.bindTexture(he,fe),A(he),t.unbindTexture()}}}let _t=[],de=[];function qe(S){if(S.samples>0){if(ht(S)===!1){let _=S.textures,D=S.width,O=S.height,J=n.COLOR_BUFFER_BIT,he=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,fe=i.get(S),re=_.length>1;if(re)for(let ge=0;ge<_.length;ge++)t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,fe.__webglMultisampledFramebuffer);let ce=S.texture.mipmaps;ce&&ce.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglFramebuffer);for(let ge=0;ge<_.length;ge++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),re){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,fe.__webglColorRenderbuffer[ge]);let Be=i.get(_[ge]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,Be,0)}n.blitFramebuffer(0,0,D,O,0,0,D,O,J,n.NEAREST),l===!0&&(_t.length=0,de.length=0,_t.push(n.COLOR_ATTACHMENT0+ge),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&(_t.push(he),de.push(he),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,de)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,_t))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),re)for(let ge=0;ge<_.length;ge++){t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.RENDERBUFFER,fe.__webglColorRenderbuffer[ge]);let Be=i.get(_[ge]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,fe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+ge,n.TEXTURE_2D,Be,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,fe.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&l){let _=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function ut(S){return Math.min(s.maxSamples,S.samples)}function ht(S){let _=i.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function k(S){let _=a.render.frame;u.get(S)!==_&&(u.set(S,_),S.update())}function dt(S,_){let D=S.colorSpace,O=S.format,J=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||D!==sa&&D!==mi&&(lt.getTransfer(D)===yt?(O!==pn||J!==Qt)&&Ye("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):$e("WebGLTextures: Unsupported texture color space:",D)),_}function at(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=j,this.resetTextureUnits=B,this.getTextureUnits=N,this.setTextureUnits=H,this.setTexture2D=X,this.setTexture2DArray=U,this.setTexture3D=q,this.setTextureCube=Q,this.rebindTextures=tt,this.setupRenderTarget=ct,this.updateRenderTargetMipmap=Qe,this.updateMultisampleRenderTarget=qe,this.setupDepthRenderbuffer=je,this.setupFrameBufferTexture=we,this.useMultisampledRTT=ht,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Av(n,e){function t(i,s=mi){let r,a=lt.getTransfer(s);if(i===Qt)return n.UNSIGNED_BYTE;if(i===xl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===yl)return n.UNSIGNED_SHORT_5_5_5_1;if(i===ju)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===qu)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Wu)return n.BYTE;if(i===Xu)return n.SHORT;if(i===lr)return n.UNSIGNED_SHORT;if(i===_l)return n.INT;if(i===On)return n.UNSIGNED_INT;if(i===Bn)return n.FLOAT;if(i===kn)return n.HALF_FLOAT;if(i===Yu)return n.ALPHA;if(i===Ju)return n.RGB;if(i===pn)return n.RGBA;if(i===Wn)return n.DEPTH_COMPONENT;if(i===Gi)return n.DEPTH_STENCIL;if(i===$u)return n.RED;if(i===vl)return n.RED_INTEGER;if(i===Wi)return n.RG;if(i===bl)return n.RG_INTEGER;if(i===Sl)return n.RGBA_INTEGER;if(i===Pa||i===Ia||i===La||i===Da)if(a===yt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Pa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===La)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Pa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ia)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===La)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Da)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Ml||i===wl||i===El||i===Tl)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Ml)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===wl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===El)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Tl)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Al||i===Cl||i===Rl||i===Pl||i===Il||i===Na||i===Ll)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Al||i===Cl)return a===yt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Rl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Pl)return r.COMPRESSED_R11_EAC;if(i===Il)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Na)return r.COMPRESSED_RG11_EAC;if(i===Ll)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Dl||i===Nl||i===Ul||i===Fl||i===Ol||i===Bl||i===kl||i===zl||i===Vl||i===Hl||i===Gl||i===Wl||i===Xl||i===jl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Dl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Nl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Ul)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Fl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Ol)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Bl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===kl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===zl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Vl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Hl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Gl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Wl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Xl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===jl)return a===yt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===ql||i===Yl||i===Jl)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===ql)return a===yt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Yl)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Jl)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===$l||i===Zl||i===Ua||i===Kl)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===$l)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Zl)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ua)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Kl)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===cr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var Cv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Rv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,xh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new ga(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Dt({vertexShader:Cv,fragmentShader:Rv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new qt(new _a(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},yh=class extends Xn{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,m=null,v=typeof XRWebGLBinding<"u",p=new xh,g={},A=t.getContextAttributes(),C=null,y=null,T=[],b=[],w=new We,x=null,M=null,L=new on;L.viewport=new gt;let R=new on;R.viewport=new gt;let P=[L,R],B=new dl,N=null,H=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let oe=T[te];return oe===void 0&&(oe=new Ks,T[te]=oe),oe.getTargetRaySpace()},this.getControllerGrip=function(te){let oe=T[te];return oe===void 0&&(oe=new Ks,T[te]=oe),oe.getGripSpace()},this.getHand=function(te){let oe=T[te];return oe===void 0&&(oe=new Ks,T[te]=oe),oe.getHandSpace()};function j(te){let oe=b.indexOf(te.inputSource);if(oe===-1)return;let me=T[oe];me!==void 0&&(me.update(te.inputSource,te.frame,c||a),me.dispatchEvent({type:te.type,data:te.inputSource}))}function Y(){s.removeEventListener("select",j),s.removeEventListener("selectstart",j),s.removeEventListener("selectend",j),s.removeEventListener("squeeze",j),s.removeEventListener("squeezestart",j),s.removeEventListener("squeezeend",j),s.removeEventListener("end",Y),s.removeEventListener("inputsourceschange",X);for(let te=0;te<T.length;te++){let oe=b[te];oe!==null&&(b[te]=null,T[te].disconnect(oe))}N=null,H=null,p.reset();for(let te in g)delete g[te];if(e.setRenderTarget(C),f=null,h=null,d=null,s=null,y=null,De.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(w.width,w.height,!1),M!==null){let te=M.camera;te.fov=M.fov,te.zoom=M.zoom,te.updateProjectionMatrix(),M=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){r=te,i.isPresenting===!0&&Ye("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){o=te,i.isPresenting===!0&&Ye("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(te){if(s=te,s!==null){if(C=e.getRenderTarget(),s.addEventListener("select",j),s.addEventListener("selectstart",j),s.addEventListener("selectend",j),s.addEventListener("squeeze",j),s.addEventListener("squeezestart",j),s.addEventListener("squeezeend",j),s.addEventListener("end",Y),s.addEventListener("inputsourceschange",X),A.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(w),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let me=null,Re=null,we=null;A.depth&&(we=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,me=A.stencil?Gi:Wn,Re=A.stencil?cr:On);let Je={colorFormat:t.RGBA8,depthFormat:we,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(Je),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new xn(h.textureWidth,h.textureHeight,{format:pn,type:Qt,depthTexture:new Fi(h.textureWidth,h.textureHeight,Re,void 0,void 0,void 0,void 0,void 0,void 0,me),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let me={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,me),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new xn(f.framebufferWidth,f.framebufferHeight,{format:pn,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),De.setContext(s),De.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function X(te){for(let oe=0;oe<te.removed.length;oe++){let me=te.removed[oe],Re=b.indexOf(me);Re>=0&&(b[Re]=null,T[Re].disconnect(me))}for(let oe=0;oe<te.added.length;oe++){let me=te.added[oe],Re=b.indexOf(me);if(Re===-1){for(let Je=0;Je<T.length;Je++)if(Je>=b.length){b.push(me),Re=Je;break}else if(b[Je]===null){b[Je]=me,Re=Je;break}if(Re===-1)break}let we=T[Re];we&&we.connect(me)}}let U=new W,q=new W;function Q(te,oe,me){U.setFromMatrixPosition(oe.matrixWorld),q.setFromMatrixPosition(me.matrixWorld);let Re=U.distanceTo(q),we=oe.projectionMatrix.elements,Je=me.projectionMatrix.elements,et=we[14]/(we[10]-1),je=we[14]/(we[10]+1),tt=(we[9]+1)/we[5],ct=(we[9]-1)/we[5],Qe=(we[8]-1)/we[0],_t=(Je[8]+1)/Je[0],de=et*Qe,qe=et*_t,ut=Re/(-Qe+_t),ht=ut*-Qe;if(oe.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(ht),te.translateZ(ut),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),we[10]===-1)te.projectionMatrix.copy(oe.projectionMatrix),te.projectionMatrixInverse.copy(oe.projectionMatrixInverse);else{let k=et+ut,dt=je+ut,at=de-ht,S=qe+(Re-ht),_=tt*je/dt*k,D=ct*je/dt*k;te.projectionMatrix.makePerspective(at,S,_,D,k,dt),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function ee(te,oe){oe===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(oe.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(s===null)return;let oe=te.near,me=te.far;p.texture!==null&&(p.depthNear>0&&(oe=p.depthNear),p.depthFar>0&&(me=p.depthFar)),B.near=R.near=L.near=oe,B.far=R.far=L.far=me,(N!==B.near||H!==B.far)&&(s.updateRenderState({depthNear:B.near,depthFar:B.far}),N=B.near,H=B.far),B.layers.mask=te.layers.mask|6,L.layers.mask=B.layers.mask&-5,R.layers.mask=B.layers.mask&-3;let Re=te.parent,we=B.cameras;ee(B,Re);for(let Je=0;Je<we.length;Je++)ee(we[Je],Re);we.length===2?Q(B,L,R):B.projectionMatrix.copy(L.projectionMatrix),M===null&&te.isPerspectiveCamera&&(M={camera:te,fov:te.fov,zoom:te.zoom}),ue(te,B,Re)};function ue(te,oe,me){me===null?te.matrix.copy(oe.matrixWorld):(te.matrix.copy(me.matrixWorld),te.matrix.invert(),te.matrix.multiply(oe.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(oe.projectionMatrix),te.projectionMatrixInverse.copy(oe.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=$s*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return B},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(te){l=te,h!==null&&(h.fixedFoveation=te),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=te)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(B)},this.getCameraTexture=function(te){return g[te]};let xe=null;function _e(te,oe){if(u=oe.getViewerPose(c||a),m=oe,u!==null){let me=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Re=!1;me.length!==B.cameras.length&&(B.cameras.length=0,Re=!0);for(let je=0;je<me.length;je++){let tt=me[je],ct=null;if(f!==null)ct=f.getViewport(tt);else{let _t=d.getViewSubImage(h,tt);ct=_t.viewport,je===0&&(e.setRenderTargetTextures(y,_t.colorTexture,_t.depthStencilTexture),e.setRenderTarget(y))}let Qe=P[je];Qe===void 0&&(Qe=new on,Qe.layers.enable(je),Qe.viewport=new gt,P[je]=Qe),Qe.matrix.fromArray(tt.transform.matrix),Qe.matrix.decompose(Qe.position,Qe.quaternion,Qe.scale),Qe.projectionMatrix.fromArray(tt.projectionMatrix),Qe.projectionMatrixInverse.copy(Qe.projectionMatrix).invert(),Qe.viewport.set(ct.x,ct.y,ct.width,ct.height),je===0&&(B.matrix.copy(Qe.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale)),Re===!0&&B.cameras.push(Qe)}let we=s.enabledFeatures;if(we&&we.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=i.getBinding();let je=d.getDepthInformation(me[0]);je&&je.isValid&&je.texture&&p.init(je,s.renderState)}if(we&&we.includes("camera-access")&&v){e.state.unbindTexture(),d=i.getBinding();for(let je=0;je<me.length;je++){let tt=me[je].camera;if(tt){let ct=g[tt];ct||(ct=new ga,g[tt]=ct);let Qe=d.getCameraImage(tt);ct.sourceTexture=Qe}}}}for(let me=0;me<T.length;me++){let Re=b[me],we=T[me];Re!==null&&we!==void 0&&we.update(Re,oe,c||a)}xe&&xe(te,oe),oe.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:oe}),m=null}let De=new lp;De.setAnimationLoop(_e),this.setAnimationLoop=function(te){xe=te},this.dispose=function(){}}},Pv=new pt,pp=new Ze;pp.set(-1,0,0,0,1,0,0,0,1);function Iv(n,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function i(p,g){g.color.getRGB(p.fogColor.value,th(n)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,A,C,y){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),d(p,g)):g.isMeshPhongMaterial?(r(p,g),u(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),h(p,g),g.isMeshPhysicalMaterial&&f(p,g,y)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),v(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,A,C):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Kt&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Kt&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let A=e.get(g),C=A.envMap,y=A.envMapRotation;C&&(p.envMap.value=C,p.envMapRotation.value.setFromMatrix4(Pv.makeRotationFromEuler(y)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(pp),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,A,C){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*A,p.scale.value=C*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function u(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function h(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,A){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Kt&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=A.texture,p.transmissionSamplerSize.value.set(A.width,A.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function v(p,g){let A=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(A.matrixWorld),p.nearDistance.value=A.shadow.camera.near,p.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Lv(n,e,t,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,T){let b=T.program;i.uniformBlockBinding(y,b)}function c(y,T){let b=s[y.id];b===void 0&&(p(y),b=u(y),s[y.id]=b,y.addEventListener("dispose",A));let w=T.program;i.updateUBOMapping(y,w);let x=e.render.frame;r[y.id]!==x&&(h(y),r[y.id]=x)}function u(y){let T=d();y.__bindingPointIndex=T;let b=n.createBuffer(),w=y.__size,x=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,w,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,T,b),b}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return $e("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){let T=s[y.id],b=y.uniforms,w=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,T);for(let x=0,M=b.length;x<M;x++){let L=b[x];if(Array.isArray(L))for(let R=0,P=L.length;R<P;R++)f(L[R],x,R,w);else f(L,x,0,w)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,T,b,w){if(v(y,T,b,w)===!0){let x=y.__offset,M=y.value;if(Array.isArray(M)){let L=0;for(let R=0;R<M.length;R++){let P=M[R],B=g(P);m(P,y.__data,L),typeof P!="number"&&typeof P!="boolean"&&!P.isMatrix3&&!ArrayBuffer.isView(P)&&(L+=B.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(M,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,y.__data)}}function m(y,T,b){typeof y=="number"||typeof y=="boolean"?T[0]=y:y.isMatrix3?(T[0]=y.elements[0],T[1]=y.elements[1],T[2]=y.elements[2],T[3]=0,T[4]=y.elements[3],T[5]=y.elements[4],T[6]=y.elements[5],T[7]=0,T[8]=y.elements[6],T[9]=y.elements[7],T[10]=y.elements[8],T[11]=0):ArrayBuffer.isView(y)?T.set(new y.constructor(y.buffer,y.byteOffset,T.length)):y.toArray(T,b)}function v(y,T,b,w){let x=y.value,M=T+"_"+b;if(w[M]===void 0)return typeof x=="number"||typeof x=="boolean"?w[M]=x:ArrayBuffer.isView(x)?w[M]=x.slice():w[M]=x.clone(),!0;{let L=w[M];if(typeof x=="number"||typeof x=="boolean"){if(L!==x)return w[M]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(L.equals(x)===!1)return L.copy(x),!0}}return!1}function p(y){let T=y.uniforms,b=0,w=16;for(let M=0,L=T.length;M<L;M++){let R=Array.isArray(T[M])?T[M]:[T[M]];for(let P=0,B=R.length;P<B;P++){let N=R[P],H=Array.isArray(N.value)?N.value:[N.value];for(let j=0,Y=H.length;j<Y;j++){let X=H[j],U=g(X),q=b%w,Q=q%U.boundary,ee=q+Q;b+=Q,ee!==0&&w-ee<U.storage&&(b+=w-ee),N.__data=new Float32Array(U.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=b,b+=U.storage}}}let x=b%w;return x>0&&(b+=w-x),y.__size=b,y.__cache={},this}function g(y){let T={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(T.boundary=4,T.storage=4):y.isVector2?(T.boundary=8,T.storage=8):y.isVector3||y.isColor?(T.boundary=16,T.storage=12):y.isVector4?(T.boundary=16,T.storage=16):y.isMatrix3?(T.boundary=48,T.storage=48):y.isMatrix4?(T.boundary=64,T.storage=64):y.isTexture?Ye("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(T.boundary=16,T.storage=y.byteLength):Ye("WebGLRenderer: Unsupported uniform value type.",y),T}function A(y){let T=y.target;T.removeEventListener("dispose",A);let b=a.indexOf(T.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(s[T.id]),delete s[T.id],delete r[T.id]}function C(){for(let y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:C}}var Dv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Zn=null;function Nv(){return Zn===null&&(Zn=new ls(Dv,16,16,Wi,kn),Zn.name="DFG_LUT",Zn.minFilter=Ct,Zn.magFilter=Ct,Zn.wrapS=An,Zn.wrapT=An,Zn.generateMipmaps=!1,Zn.needsUpdate=!0),Zn}var ac=class{constructor(e={}){let{canvas:t=Df(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=Qt}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;let v=f,p=new Set([Sl,bl,vl]),g=new Set([Qt,On,lr,cr,xl,yl]),A=new Uint32Array(4),C=new Int32Array(4),y=new W,T=null,b=null,w=[],x=[],M=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Un,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let L=this,R=!1,P=null,B=null,N=null,H=null;this._outputColorSpace=Ft;let j=0,Y=0,X=null,U=-1,q=null,Q=new gt,ee=new gt,ue=null,xe=new Ke(0),_e=0,De=t.width,te=t.height,oe=1,me=null,Re=null,we=new gt(0,0,De,te),Je=new gt(0,0,De,te),et=!1,je=new tr,tt=!1,ct=!1,Qe=new pt,_t=new W,de=new gt,qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},ut=!1;function ht(){return X===null?oe:1}let k=i;function dt(E,V){return t.getContext(E,V)}let at,S,_,D,O,J,he,fe,re,ce,ge,Be,Me,ye,ke,Le,nt,z,ve,ae,be,Ee,pe;try{let E={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",St,!1),t.addEventListener("webglcontextrestored",mt,!1),t.addEventListener("webglcontextcreationerror",Wt,!1),k===null){let V="webgl2";if(k=dt(V,E),k===null)throw dt(V)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ve()}catch(E){throw t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",mt,!1),t.removeEventListener("webglcontextcreationerror",Wt,!1),$e("WebGLRenderer: "+E.message),E}function Ve(){at=new Vx(k),at.init(),be=new Av(k,at),S=new Ix(k,at,e,be),_=new Ev(k,at),S.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),B=k.createFramebuffer(),N=k.createFramebuffer(),H=k.createFramebuffer(),D=new Wx(k),O=new hv,J=new Tv(k,at,_,O,S,be,D),he=new zx(L),fe=new jg(k),Ee=new Rx(k,fe),re=new Hx(k,fe,D,Ee),ce=new jx(k,re,fe,Ee,D),z=new Xx(k,S,J),ke=new Lx(O),ge=new uv(L,he,at,S,Ee,ke),Be=new Iv(L,O),Me=new fv,ye=new yv(at),nt=new Cx(L,he,_,ce,m,l),Le=new wv(L,ce,S),pe=new Lv(k,D,S,_),ve=new Px(k,at,D),ae=new Gx(k,at,D),D.programs=ge.programs,L.capabilities=S,L.extensions=at,L.properties=O,L.renderLists=Me,L.shadowMap=Le,L.state=_,L.info=D}v!==Qt&&(M=new Yx(v,t.width,t.height,o,s,r));let Ne=new yh(L,k);this.xr=Ne,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let E=at.get("WEBGL_lose_context");E&&E.loseContext()},this.forceContextRestore=function(){let E=at.get("WEBGL_lose_context");E&&E.restoreContext()},this.getPixelRatio=function(){return oe},this.setPixelRatio=function(E){E!==void 0&&(oe=E,this.setSize(De,te,!1))},this.getSize=function(E){return E.set(De,te)},this.setSize=function(E,V,ne=!0){if(Ne.isPresenting){Ye("WebGLRenderer: Can't change size while VR device is presenting.");return}De=E,te=V,t.width=Math.floor(E*oe),t.height=Math.floor(V*oe),ne===!0&&(t.style.width=E+"px",t.style.height=V+"px"),M!==null&&M.setSize(t.width,t.height),this.setViewport(0,0,E,V)},this.getDrawingBufferSize=function(E){return E.set(De*oe,te*oe).floor()},this.setDrawingBufferSize=function(E,V,ne){De=E,te=V,oe=ne,t.width=Math.floor(E*ne),t.height=Math.floor(V*ne),this.setViewport(0,0,E,V)},this.setEffects=function(E){if(v===Qt){$e("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(E){for(let V=0;V<E.length;V++)if(E[V].isOutputPass===!0){Ye("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}M.setEffects(E||[])},this.getCurrentViewport=function(E){return E.copy(Q)},this.getViewport=function(E){return E.copy(we)},this.setViewport=function(E,V,ne,Z){E.isVector4?we.set(E.x,E.y,E.z,E.w):we.set(E,V,ne,Z),_.viewport(Q.copy(we).multiplyScalar(oe).round())},this.getScissor=function(E){return E.copy(Je)},this.setScissor=function(E,V,ne,Z){E.isVector4?Je.set(E.x,E.y,E.z,E.w):Je.set(E,V,ne,Z),_.scissor(ee.copy(Je).multiplyScalar(oe).round())},this.getScissorTest=function(){return et},this.setScissorTest=function(E){_.setScissorTest(et=E)},this.setOpaqueSort=function(E){me=E},this.setTransparentSort=function(E){Re=E},this.getClearColor=function(E){return E.copy(nt.getClearColor())},this.setClearColor=function(){nt.setClearColor(...arguments)},this.getClearAlpha=function(){return nt.getClearAlpha()},this.setClearAlpha=function(){nt.setClearAlpha(...arguments)},this.clear=function(E=!0,V=!0,ne=!0){let Z=0;if(E){let K=!1;if(X!==null){let Ae=X.texture.format;K=p.has(Ae)}if(K){let Ae=X.texture.type,Pe=g.has(Ae),Te=nt.getClearColor(),Ue=nt.getClearAlpha(),ze=Te.r,st=Te.g,ot=Te.b;Pe?(A[0]=ze,A[1]=st,A[2]=ot,A[3]=Ue,k.clearBufferuiv(k.COLOR,0,A)):(C[0]=ze,C[1]=st,C[2]=ot,C[3]=Ue,k.clearBufferiv(k.COLOR,0,C))}else Z|=k.COLOR_BUFFER_BIT}V&&(Z|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),ne&&(Z|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&k.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(E){E.setRenderer(this),P=E},this.dispose=function(){t.removeEventListener("webglcontextlost",St,!1),t.removeEventListener("webglcontextrestored",mt,!1),t.removeEventListener("webglcontextcreationerror",Wt,!1),nt.dispose(),Me.dispose(),ye.dispose(),O.dispose(),he.dispose(),ce.dispose(),Ee.dispose(),pe.dispose(),ge.dispose(),Ne.dispose(),Ne.removeEventListener("sessionstart",Ie),Ne.removeEventListener("sessionend",Xe),Ge.stop()};function St(E){E.preventDefault(),oa("WebGLRenderer: Context Lost."),R=!0}function mt(){oa("WebGLRenderer: Context Restored."),R=!1;let E=D.autoReset,V=Le.enabled,ne=Le.autoUpdate,Z=Le.needsUpdate,K=Le.type;Ve(),D.autoReset=E,Le.enabled=V,Le.autoUpdate=ne,Le.needsUpdate=Z,Le.type=K}function Wt(E){$e("WebGLRenderer: A WebGL context could not be created. Reason: ",E.statusMessage)}function I(E){let V=E.target;V.removeEventListener("dispose",I),F(V)}function F(E){G(E),O.remove(E)}function G(E){let V=O.get(E).programs;V!==void 0&&(V.forEach(function(ne){ge.releaseProgram(ne)}),E.isShaderMaterial&&ge.releaseShaderCache(E))}this.renderBufferDirect=function(E,V,ne,Z,K,Ae){V===null&&(V=qe);let Pe=K.isMesh&&K.matrixWorld.determinantAffine()<0,Te=pm(E,V,ne,Z,K);_.setMaterial(Z,Pe);let Ue=ne.index,ze=1;if(Z.wireframe===!0){if(Ue=re.getWireframeAttribute(ne),Ue===void 0)return;ze=2}let st=ne.drawRange,ot=ne.attributes.position,Fe=st.start*ze,xt=(st.start+st.count)*ze;Ae!==null&&(Fe=Math.max(Fe,Ae.start*ze),xt=Math.min(xt,(Ae.start+Ae.count)*ze)),Ue!==null?(Fe=Math.max(Fe,0),xt=Math.min(xt,Ue.count)):ot!=null&&(Fe=Math.max(Fe,0),xt=Math.min(xt,ot.count));let kt=xt-Fe;if(kt<0||kt===1/0)return;Ee.setup(K,Z,Te,ne,Ue);let Rt,Et=ve;if(Ue!==null&&(Rt=fe.get(Ue),Et=ae,Et.setIndex(Rt)),K.isMesh)Z.wireframe===!0?(_.setLineWidth(Z.wireframeLinewidth*ht()),Et.setMode(k.LINES)):Et.setMode(k.TRIANGLES);else if(K.isLine){let sn=Z.linewidth;sn===void 0&&(sn=1),_.setLineWidth(sn*ht()),K.isLineSegments?Et.setMode(k.LINES):K.isLineLoop?Et.setMode(k.LINE_LOOP):Et.setMode(k.LINE_STRIP)}else K.isPoints?Et.setMode(k.POINTS):K.isSprite&&Et.setMode(k.TRIANGLES);if(K.isBatchedMesh)if(at.get("WEBGL_multi_draw"))Et.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else{let sn=K._multiDrawStarts,Ce=K._multiDrawCounts,hn=K._multiDrawCount,ft=Ue?fe.get(Ue).bytesPerElement:1,En=O.get(Z).currentProgram.getUniforms();for(let Vn=0;Vn<hn;Vn++)En.setValue(k,"_gl_DrawID",Vn),Et.render(sn[Vn]/ft,Ce[Vn])}else if(K.isInstancedMesh)Et.renderInstances(Fe,kt,K.count);else if(ne.isInstancedBufferGeometry){let sn=ne._maxInstanceCount!==void 0?ne._maxInstanceCount:1/0,Ce=Math.min(ne.instanceCount,sn);Et.renderInstances(Fe,kt,Ce)}else Et.render(Fe,kt)};function ie(E,V,ne,Z){P!==null&&E.isNodeMaterial&&P.setObject(Z,E),tt===!0&&ke.setState(E,ne,!1),E.transparent===!0&&E.side===Jn&&E.forceSinglePass===!1?(E.side=Kt,E.needsUpdate=!0,un(E,V,Z),E.side=Vi,E.needsUpdate=!0,un(E,V,Z),E.side=Jn):un(E,V,Z)}this.compile=function(E,V,ne=null){ne===null&&(ne=E),P!==null&&P.renderStart(E,V,ne),b=ye.get(ne),b.init(V),x.push(b),ne.traverseVisible(function(K){K.isLight&&K.layers.test(V.layers)&&(b.pushLight(K),K.castShadow&&b.pushShadow(K))}),E!==ne&&E.traverseVisible(function(K){K.isLight&&K.layers.test(V.layers)&&(b.pushLight(K),K.castShadow&&b.pushShadow(K))}),b.setupLights(),P!==null&&P.updateLights(b.state.lightsArray),ct=this.localClippingEnabled,tt=ke.init(this.clippingPlanes,ct),tt===!0&&ke.setGlobalState(this.clippingPlanes,V),P!==null&&Le.render(b.state.shadowsArray,ne,V);let Z=new Set;return E.traverse(function(K){if(!(K.isMesh||K.isPoints||K.isLine||K.isSprite))return;let Ae=K.material;if(Ae)if(Array.isArray(Ae))for(let Pe=0;Pe<Ae.length;Pe++){let Te=Ae[Pe];ie(Te,ne,V,K),Z.add(Te)}else ie(Ae,ne,V,K),Z.add(Ae)}),b=x.pop(),P!==null&&P.renderEnd(),Z},this.compileAsync=function(E,V,ne=null){let Z=this.compile(E,V,ne);return new Promise(K=>{function Ae(){if(Z.forEach(function(Pe){let Ue=O.get(Pe).currentProgram;(Ue===void 0||Ue.isReady())&&Z.delete(Pe)}),Z.size===0){K(E);return}setTimeout(Ae,10)}at.get("KHR_parallel_shader_compile")!==null?Ae():setTimeout(Ae,10)})};let $=null;function se(E){$&&$(E)}function Ie(){Ge.stop()}function Xe(){Ge.start()}let Ge=new lp;Ge.setAnimationLoop(se),typeof self<"u"&&Ge.setContext(self),this.setAnimationLoop=function(E){$=E,Ne.setAnimationLoop(E),E===null?Ge.stop():Ge.start()},Ne.addEventListener("sessionstart",Ie),Ne.addEventListener("sessionend",Xe),this.render=function(E,V){if(V!==void 0&&V.isCamera!==!0){$e("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;P!==null&&P.renderStart(E,V);let ne=Ne.enabled===!0&&Ne.isPresenting===!0,Z=M!==null&&(X===null||ne)&&M.begin(L,X);if(E.matrixWorldAutoUpdate===!0&&E.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),Ne.enabled===!0&&Ne.isPresenting===!0&&(M===null||M.isCompositing()===!1)&&(Ne.cameraAutoUpdate===!0&&Ne.updateCamera(V),V=Ne.getCamera()),E.isScene===!0&&E.onBeforeRender(L,E,V,X),b=ye.get(E,x.length),b.init(V),b.state.textureUnits=J.getTextureUnits(),x.push(b),Qe.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),je.setFromProjectionMatrix(Qe,Dn,V.reversedDepth),ct=this.localClippingEnabled,tt=ke.init(this.clippingPlanes,ct),T=Me.get(E,w.length),T.init(),w.push(T),Ne.enabled===!0&&Ne.isPresenting===!0){let Pe=L.xr.getDepthSensingMesh();Pe!==null&&It(Pe,V,-1/0,L.sortObjects)}It(E,V,0,L.sortObjects),T.finish(),P!==null&&P.updateLights(b.state.lightsArray),L.sortObjects===!0&&T.sort(me,Re),ut=Ne.enabled===!1||Ne.isPresenting===!1||Ne.hasDepthSensing()===!1,ut&&nt.addToRenderList(T,E),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),tt===!0&&ke.beginShadows();let K=b.state.shadowsArray;if(Le.render(K,E,V),tt===!0&&ke.endShadows(),(Z&&M.hasRenderPass())===!1){let Pe=T.opaque,Te=T.transmissive;if(b.setupLights(),V.isArrayCamera){let Ue=V.cameras;if(Te.length>0)for(let ze=0,st=Ue.length;ze<st;ze++){let ot=Ue[ze];zn(Pe,Te,E,ot)}ut&&nt.render(E);for(let ze=0,st=Ue.length;ze<st;ze++){let ot=Ue[ze];wt(T,E,ot,ot.viewport)}}else Te.length>0&&zn(Pe,Te,E,V),ut&&nt.render(E),wt(T,E,V)}X!==null&&Y===0&&(J.updateMultisampleRenderTarget(X),J.updateRenderTargetMipmap(X)),Z&&M.end(L),E.isScene===!0&&E.onAfterRender(L,E,V),Ee.resetDefaultState(),U=-1,q=null,x.pop(),x.length>0?(b=x[x.length-1],J.setTextureUnits(b.state.textureUnits),tt===!0&&ke.setGlobalState(L.clippingPlanes,b.state.camera)):b=null,w.pop(),w.length>0?T=w[w.length-1]:T=null,P!==null&&P.renderEnd()};function It(E,V,ne,Z){if(E.visible===!1)return;if(E.layers.test(V.layers)){if(E.isGroup)ne=E.renderOrder;else if(E.isLOD)E.autoUpdate===!0&&E.update(V);else if(E.isLightProbeGrid)b.pushLightProbeGrid(E);else if(E.isLight)b.pushLight(E),E.castShadow&&b.pushShadow(E);else if(E.isSprite){if(!E.frustumCulled||E.intersectsFrustum(je)){Z&&de.setFromMatrixPosition(E.matrixWorld).applyMatrix4(Qe);let Pe=ce.update(E),Te=E.material;Te.visible&&T.push(E,Pe,Te,ne,de.z,null,V)}}else if((E.isMesh||E.isLine||E.isPoints)&&(!E.frustumCulled||E.intersectsFrustum(je))){let Pe=ce.update(E),Te=E.material;if(Z&&(E.boundingSphere!==void 0?(E.boundingSphere===null&&E.computeBoundingSphere(),de.copy(E.boundingSphere.center)):(Pe.boundingSphere===null&&Pe.computeBoundingSphere(),de.copy(Pe.boundingSphere.center)),de.applyMatrix4(E.matrixWorld).applyMatrix4(Qe)),Array.isArray(Te)){let Ue=Pe.groups;for(let ze=0,st=Ue.length;ze<st;ze++){let ot=Ue[ze],Fe=Te[ot.materialIndex];Fe&&Fe.visible&&T.push(E,Pe,Fe,ne,de.z,ot,V)}}else Te.visible&&T.push(E,Pe,Te,ne,de.z,null,V)}}let Ae=E.children;for(let Pe=0,Te=Ae.length;Pe<Te;Pe++)It(Ae[Pe],V,ne,Z)}function wt(E,V,ne,Z){let{opaque:K,transmissive:Ae,transparent:Pe}=E;b.setupLightsView(ne),tt===!0&&ke.setGlobalState(L.clippingPlanes,ne),Z&&_.viewport(Q.copy(Z)),K.length>0&&wn(K,V,ne),Ae.length>0&&wn(Ae,V,ne),Pe.length>0&&wn(Pe,V,ne),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function zn(E,V,ne,Z){if((ne.isScene===!0?ne.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[Z.id]===void 0){let Fe=at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[Z.id]=new xn(1,1,{generateMipmaps:!0,type:Fe?kn:Qt,minFilter:Fn,samples:Math.max(4,S.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:lt.workingColorSpace})}let Ae=b.state.transmissionRenderTarget[Z.id],Pe=Z.viewport||Q;Ae.setSize(Pe.z*L.transmissionResolutionScale,Pe.w*L.transmissionResolutionScale);let Te=L.getRenderTarget(),Ue=L.getActiveCubeFace(),ze=L.getActiveMipmapLevel();L.setRenderTarget(Ae),L.getClearColor(xe),_e=L.getClearAlpha(),_e<1&&L.setClearColor(16777215,.5),L.clear(),ut&&nt.render(ne);let st=L.toneMapping;L.toneMapping=Un;let ot=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),b.setupLightsView(Z),tt===!0&&ke.setGlobalState(L.clippingPlanes,Z),wn(E,ne,Z),J.updateMultisampleRenderTarget(Ae),J.updateRenderTargetMipmap(Ae),at.has("WEBGL_multisampled_render_to_texture")===!1){let Fe=!1;for(let xt=0,kt=V.length;xt<kt;xt++){let Rt=V[xt],{object:Et,geometry:sn,material:Ce,group:hn}=Rt;if(Ce.side===Jn&&Et.layers.test(Z.layers)){let ft=Ce.side;Ce.side=Kt,Ce.needsUpdate=!0,Lt(Et,ne,Z,sn,Ce,hn),Ce.side=ft,Ce.needsUpdate=!0,Fe=!0}}Fe===!0&&(J.updateMultisampleRenderTarget(Ae),J.updateRenderTargetMipmap(Ae))}L.setRenderTarget(Te,Ue,ze),L.setClearColor(xe,_e),ot!==void 0&&(Z.viewport=ot),L.toneMapping=st}function wn(E,V,ne){let Z=V.isScene===!0?V.overrideMaterial:null;for(let K=0,Ae=E.length;K<Ae;K++){let Pe=E[K],{object:Te,geometry:Ue,group:ze}=Pe,st=Pe.material;st.allowOverride===!0&&Z!==null&&(st=Z),Te.layers.test(ne.layers)&&Lt(Te,V,ne,Ue,st,ze)}}function Lt(E,V,ne,Z,K,Ae){P!==null&&K.isNodeMaterial&&P.setObject(E,K),E.onBeforeRender(L,V,ne,Z,K,Ae),E.modelViewMatrix.multiplyMatrices(ne.matrixWorldInverse,E.matrixWorld),E.normalMatrix.getNormalMatrix(E.modelViewMatrix),K.onBeforeRender(L,V,ne,Z,E,Ae),K.transparent===!0&&K.side===Jn&&K.forceSinglePass===!1?(K.side=Kt,K.needsUpdate=!0,L.renderBufferDirect(ne,V,Z,K,E,Ae),K.side=Vi,K.needsUpdate=!0,L.renderBufferDirect(ne,V,Z,K,E,Ae),K.side=Jn):L.renderBufferDirect(ne,V,Z,K,E,Ae),E.onAfterRender(L,V,ne,Z,K,Ae)}function un(E,V,ne){V.isScene!==!0&&(V=qe);let Z=O.get(E),K=b.state.lights,Ae=b.state.shadowsArray,Pe=K.state.version,Te=ge.getParameters(E,K.state,Ae,V,ne,b.state.lightProbeGridArray),Ue=ge.getProgramCacheKey(Te),ze=Z.programs;Z.environment=E.isMeshStandardMaterial||E.isMeshLambertMaterial||E.isMeshPhongMaterial?V.environment:null,Z.fog=V.fog;let st=E.isMeshStandardMaterial||E.isMeshLambertMaterial&&!E.envMap||E.isMeshPhongMaterial&&!E.envMap;Z.envMap=he.get(E.envMap||Z.environment,st),Z.envMapRotation=Z.environment!==null&&E.envMap===null?V.environmentRotation:E.envMapRotation,ze===void 0&&(E.addEventListener("dispose",I),ze=new Map,Z.programs=ze);let ot=ze.get(Ue);if(ot!==void 0){if(Z.currentProgram===ot&&Z.lightsStateVersion===Pe)return Lh(E,Te),ot}else Te.uniforms=ge.getUniforms(E),P!==null&&E.isNodeMaterial&&P.build(E,ne,Te),E.onBeforeCompile(Te,L),ot=ge.acquireProgram(Te,Ue),ze.set(Ue,ot),Z.uniforms=Te.uniforms;let Fe=Z.uniforms;return(!E.isShaderMaterial&&!E.isRawShaderMaterial||E.clipping===!0)&&(Fe.clippingPlanes=ke.uniform),Lh(E,Te),Z.needsLights=gm(E),Z.lightsStateVersion=Pe,Z.needsLights&&(Fe.ambientLightColor.value=K.state.ambient,Fe.lightProbe.value=K.state.probe,Fe.sunLights.value=K.state.sun,Fe.sunLightShadows.value=K.state.sunShadow,Fe.directionalLights.value=K.state.directional,Fe.directionalLightShadows.value=K.state.directionalShadow,Fe.spotLights.value=K.state.spot,Fe.spotLightShadows.value=K.state.spotShadow,Fe.rectAreaLights.value=K.state.rectArea,Fe.ltc_1.value=K.state.rectAreaLTC1,Fe.ltc_2.value=K.state.rectAreaLTC2,Fe.pointLights.value=K.state.point,Fe.pointLightShadows.value=K.state.pointShadow,Fe.hemisphereLights.value=K.state.hemi,Fe.sunShadowMatrix.value=K.state.sunShadowMatrix,Fe.sunShadowCascade.value=K.state.sunShadowCascade,Fe.directionalShadowMatrix.value=K.state.directionalShadowMatrix,Fe.spotLightMatrix.value=K.state.spotLightMatrix,Fe.spotLightMap.value=K.state.spotLightMap,Fe.pointShadowMatrix.value=K.state.pointShadowMatrix),Z.lightProbeGrid=b.state.lightProbeGridArray.length>0,Z.currentProgram=ot,Z.uniformsList=null,ot}function _i(E){if(E.uniformsList===null){let V=E.currentProgram.getUniforms();E.uniformsList=dr.seqWithValue(V.seq,E.uniforms)}return E.uniformsList}function Lh(E,V){let ne=O.get(E);ne.outputColorSpace=V.outputColorSpace,ne.batching=V.batching,ne.batchingColor=V.batchingColor,ne.instancing=V.instancing,ne.instancingColor=V.instancingColor,ne.instancingMorph=V.instancingMorph,ne.skinning=V.skinning,ne.morphTargets=V.morphTargets,ne.morphNormals=V.morphNormals,ne.morphColors=V.morphColors,ne.morphTargetsCount=V.morphTargetsCount,ne.numClippingPlanes=V.numClippingPlanes,ne.numIntersection=V.numClipIntersection,ne.vertexAlphas=V.vertexAlphas,ne.vertexTangents=V.vertexTangents,ne.toneMapping=V.toneMapping}function fm(E,V){if(E.length===0)return null;if(E.length===1)return E[0].texture!==null?E[0]:null;y.setFromMatrixPosition(V.matrixWorld);for(let ne=0,Z=E.length;ne<Z;ne++){let K=E[ne];if(K.texture!==null&&K.boundingBox.containsPoint(y))return K}return null}function pm(E,V,ne,Z,K){V.isScene!==!0&&(V=qe),J.resetTextureUnits();let Ae=V.fog,Pe=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?V.environment:null,Te=X===null?L.outputColorSpace:X.isXRRenderTarget===!0?X.texture.colorSpace:lt.workingColorSpace,Ue=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,ze=he.get(Z.envMap||Pe,Ue),st=Z.vertexColors===!0&&!!ne.attributes.color&&ne.attributes.color.itemSize===4,ot=!!ne.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Fe=!!ne.morphAttributes.position,xt=!!ne.morphAttributes.normal,kt=!!ne.morphAttributes.color,Rt=Un;Z.toneMapped&&(X===null||X.isXRRenderTarget===!0)&&(Rt=L.toneMapping);let Et=ne.morphAttributes.position||ne.morphAttributes.normal||ne.morphAttributes.color,sn=Et!==void 0?Et.length:0,Ce=O.get(Z),hn=b.state.lights;if(tt===!0&&(ct===!0||E!==q)){let At=E===q&&Z.id===U;ke.setState(Z,E,At)}let ft=!1;Z.version===Ce.__version?(Ce.needsLights&&Ce.lightsStateVersion!==hn.state.version||Ce.outputColorSpace!==Te||K.isBatchedMesh&&Ce.batching===!1||!K.isBatchedMesh&&Ce.batching===!0||K.isBatchedMesh&&Ce.batchingColor===!0&&K._colorsTexture===null||K.isBatchedMesh&&Ce.batchingColor===!1&&K._colorsTexture!==null||K.isInstancedMesh&&Ce.instancing===!1||!K.isInstancedMesh&&Ce.instancing===!0||K.isSkinnedMesh&&Ce.skinning===!1||!K.isSkinnedMesh&&Ce.skinning===!0||K.isInstancedMesh&&Ce.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Ce.instancingColor===!1&&K.instanceColor!==null||K.isInstancedMesh&&Ce.instancingMorph===!0&&K.morphTexture===null||K.isInstancedMesh&&Ce.instancingMorph===!1&&K.morphTexture!==null||Ce.envMap!==ze||Z.fog===!0&&Ce.fog!==Ae||Ce.numClippingPlanes!==void 0&&(Ce.numClippingPlanes!==ke.numPlanes||Ce.numIntersection!==ke.numIntersection)||Ce.vertexAlphas!==st||Ce.vertexTangents!==ot||Ce.morphTargets!==Fe||Ce.morphNormals!==xt||Ce.morphColors!==kt||Ce.toneMapping!==Rt||Ce.morphTargetsCount!==sn||!!Ce.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(ft=!0):(ft=!0,Ce.__version=Z.version);let En=Ce.currentProgram;ft===!0&&(En=un(Z,V,K),P&&Z.isNodeMaterial&&P.onUpdateProgram(Z,En,Ce));let Vn=!1,xi=!1,gs=!1,Mt=En.getUniforms(),Ut=Ce.uniforms;if(_.useProgram(En.program)&&(Vn=!0,xi=!0,gs=!0),Z.id!==U&&(U=Z.id,xi=!0),Ce.needsLights){let At=fm(b.state.lightProbeGridArray,K);Ce.lightProbeGrid!==At&&(Ce.lightProbeGrid=At,xi=!0)}if(Vn||q!==E){_.buffers.depth.getReversed()&&E.reversedDepth!==!0&&(E._reversedDepth=!0,E.updateProjectionMatrix()),Mt.setValue(k,"projectionMatrix",E.projectionMatrix),Mt.setValue(k,"viewMatrix",E.matrixWorldInverse);let vi=Mt.map.cameraPosition;vi!==void 0&&vi.setValue(k,_t.setFromMatrixPosition(E.matrixWorld)),S.logarithmicDepthBuffer&&Mt.setValue(k,"logDepthBufFC",2/(Math.log(E.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Mt.setValue(k,"isOrthographic",E.isOrthographicCamera===!0),q!==E&&(q=E,xi=!0,gs=!0)}if(Ce.needsLights&&(hn.state.sunShadowMap.length>0&&Mt.setValue(k,"sunShadowMap",hn.state.sunShadowMap,J),hn.state.directionalShadowMap.length>0&&Mt.setValue(k,"directionalShadowMap",hn.state.directionalShadowMap,J),hn.state.spotShadowMap.length>0&&Mt.setValue(k,"spotShadowMap",hn.state.spotShadowMap,J),hn.state.pointShadowMap.length>0&&Mt.setValue(k,"pointShadowMap",hn.state.pointShadowMap,J)),K.isSkinnedMesh){Mt.setOptional(k,K,"bindMatrix"),Mt.setOptional(k,K,"bindMatrixInverse");let At=K.skeleton;At&&(At.boneTexture===null&&At.computeBoneTexture(),Mt.setValue(k,"boneTexture",At.boneTexture,J))}K.isBatchedMesh&&(Mt.setOptional(k,K,"batchingTexture"),Mt.setValue(k,"batchingTexture",K._matricesTexture,J),Mt.setOptional(k,K,"batchingIdTexture"),Mt.setValue(k,"batchingIdTexture",K._indirectTexture,J),Mt.setOptional(k,K,"batchingColorTexture"),K._colorsTexture!==null&&Mt.setValue(k,"batchingColorTexture",K._colorsTexture,J));let yi=ne.morphAttributes;if((yi.position!==void 0||yi.normal!==void 0||yi.color!==void 0)&&z.update(K,ne,En),(xi||Ce.receiveShadow!==K.receiveShadow)&&(Ce.receiveShadow=K.receiveShadow,Mt.setValue(k,"receiveShadow",K.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&V.environment!==null&&(Ut.envMapIntensity.value=V.environmentIntensity),Ut.dfgLUT!==void 0&&(Ut.dfgLUT.value=Nv()),xi){if(Mt.setValue(k,"toneMappingExposure",L.toneMappingExposure),Ce.needsLights&&mm(Ut,gs),Ae&&Z.fog===!0&&Be.refreshFogUniforms(Ut,Ae),Be.refreshMaterialUniforms(Ut,Z,oe,te,b.state.transmissionRenderTarget[E.id]),Ce.needsLights&&Ce.lightProbeGrid){let At=Ce.lightProbeGrid;Ut.probesSH.value=At.texture,Ut.probesMin.value.copy(At.boundingBox.min),Ut.probesMax.value.copy(At.boundingBox.max),Ut.probesResolution.value.copy(At.resolution)}dr.upload(k,_i(Ce),Ut,J)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(dr.upload(k,_i(Ce),Ut,J),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Mt.setValue(k,"center",K.center),Mt.setValue(k,"modelViewMatrix",K.modelViewMatrix),Mt.setValue(k,"normalMatrix",K.normalMatrix),Mt.setValue(k,"modelMatrix",K.matrixWorld),Z.uniformsGroups!==void 0){let At=Z.uniformsGroups;for(let vi=0,_s=At.length;vi<_s;vi++){let Nh=At[vi];pe.update(Nh,En),pe.bind(Nh,En)}}return En}function mm(E,V){E.ambientLightColor.needsUpdate=V,E.lightProbe.needsUpdate=V,E.sunLights.needsUpdate=V,E.sunLightShadows.needsUpdate=V,E.directionalLights.needsUpdate=V,E.directionalLightShadows.needsUpdate=V,E.pointLights.needsUpdate=V,E.pointLightShadows.needsUpdate=V,E.spotLights.needsUpdate=V,E.spotLightShadows.needsUpdate=V,E.rectAreaLights.needsUpdate=V,E.hemisphereLights.needsUpdate=V}function gm(E){return E.isMeshLambertMaterial||E.isMeshToonMaterial||E.isMeshPhongMaterial||E.isMeshStandardMaterial||E.isShadowMaterial||E.isShaderMaterial&&E.lights===!0}this.getActiveCubeFace=function(){return j},this.getActiveMipmapLevel=function(){return Y},this.getRenderTarget=function(){return X},this.setRenderTargetTextures=function(E,V,ne){let Z=O.get(E);Z.__autoAllocateDepthBuffer=E.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),O.get(E.texture).__webglTexture=V,O.get(E.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:ne,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(E,V){let ne=O.get(E);ne.__webglFramebuffer=V,ne.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(E,V=0,ne=0){X=E,j=V,Y=ne;let Z=null,K=!1,Ae=!1;if(E){let Te=O.get(E);if(Te.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(k.FRAMEBUFFER,Te.__webglFramebuffer),Q.copy(E.viewport),ee.copy(E.scissor),ue=E.scissorTest,_.viewport(Q),_.scissor(ee),_.setScissorTest(ue),U=-1;return}else if(Te.__webglFramebuffer===void 0)J.setupRenderTarget(E);else if(Te.__hasExternalTextures)J.rebindTextures(E,O.get(E.texture).__webglTexture,O.get(E.depthTexture).__webglTexture);else if(E.depthBuffer){let st=E.depthTexture;if(Te.__boundDepthTexture!==st){if(st!==null&&O.has(st)&&(E.width!==st.image.width||E.height!==st.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(E)}}let Ue=E.texture;(Ue.isData3DTexture||Ue.isDataArrayTexture||Ue.isCompressedArrayTexture)&&(Ae=!0);let ze=O.get(E).__webglFramebuffer;E.isWebGLCubeRenderTarget?(Array.isArray(ze[V])?Z=ze[V][ne]:Z=ze[V],K=!0):E.samples>0&&J.useMultisampledRTT(E)===!1?Z=O.get(E).__webglMultisampledFramebuffer:Array.isArray(ze)?Z=ze[ne]:Z=ze,Q.copy(E.viewport),ee.copy(E.scissor),ue=E.scissorTest}else Q.copy(we).multiplyScalar(oe).floor(),ee.copy(Je).multiplyScalar(oe).floor(),ue=et;if(ne!==0&&(Z=B),_.bindFramebuffer(k.FRAMEBUFFER,Z)&&_.drawBuffers(E,Z),_.viewport(Q),_.scissor(ee),_.setScissorTest(ue),K){let Te=O.get(E.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+V,Te.__webglTexture,ne)}else if(Ae){let Te=V;for(let Ue=0;Ue<E.textures.length;Ue++){let ze=O.get(E.textures[Ue]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+Ue,ze.__webglTexture,ne,Te)}}else if(E!==null&&ne!==0){let Te=O.get(E.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Te.__webglTexture,ne)}U=-1};function Dh(E){let V=O.get(E);return(V.__readFormat!==E.format||V.__readType!==E.type)&&(V.__readFormat=E.format,V.__readType=E.type,V.__formatReadable=S.textureFormatReadable(E.format),V.__typeReadable=S.textureTypeReadable(E.type)),V}this.readRenderTargetPixels=function(E,V,ne,Z,K,Ae,Pe,Te=0){if(!(E&&E.isWebGLRenderTarget)){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=O.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Pe!==void 0&&(Ue=Ue[Pe]),Ue){_.bindFramebuffer(k.FRAMEBUFFER,Ue);try{let ze=E.textures[Te],st=ze.format,ot=ze.type;E.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Te);let Fe=Dh(ze);if(Fe.__formatReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Fe.__typeReadable===!1){$e("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=E.width-Z&&ne>=0&&ne<=E.height-K&&k.readPixels(V,ne,Z,K,be.convert(st),be.convert(ot),Ae)}finally{let ze=X!==null?O.get(X).__webglFramebuffer:null;_.bindFramebuffer(k.FRAMEBUFFER,ze)}}},this.readRenderTargetPixelsAsync=async function(E,V,ne,Z,K,Ae,Pe,Te=0){if(!(E&&E.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=O.get(E).__webglFramebuffer;if(E.isWebGLCubeRenderTarget&&Pe!==void 0&&(Ue=Ue[Pe]),Ue)if(V>=0&&V<=E.width-Z&&ne>=0&&ne<=E.height-K){_.bindFramebuffer(k.FRAMEBUFFER,Ue);let ze=E.textures[Te],st=ze.format,ot=ze.type;E.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Te);let Fe=Dh(ze);if(Fe.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Fe.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let xt=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,xt),k.bufferData(k.PIXEL_PACK_BUFFER,Ae.byteLength,k.STREAM_READ),k.readPixels(V,ne,Z,K,be.convert(st),be.convert(ot),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);let kt=X!==null?O.get(X).__webglFramebuffer:null;_.bindFramebuffer(k.FRAMEBUFFER,kt);let Rt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await Uf(k,Rt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,xt),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Ae),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(xt),k.deleteSync(Rt),Ae}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(E,V=null,ne=0){let Z=Math.pow(2,-ne),K=Math.floor(E.image.width*Z),Ae=Math.floor(E.image.height*Z),Pe=V!==null?V.x:0,Te=V!==null?V.y:0;J.setTexture2D(E,0),k.copyTexSubImage2D(k.TEXTURE_2D,ne,0,0,Pe,Te,K,Ae),_.unbindTexture()},this.copyTextureToTexture=function(E,V,ne=null,Z=null,K=0,Ae=0){let Pe,Te,Ue,ze,st,ot,Fe,xt,kt,Rt=E.isCompressedTexture?E.mipmaps[Ae]:E.image;if(ne!==null)Pe=ne.max.x-ne.min.x,Te=ne.max.y-ne.min.y,Ue=ne.isBox3?ne.max.z-ne.min.z:1,ze=ne.min.x,st=ne.min.y,ot=ne.isBox3?ne.min.z:0;else{let Ut=Math.pow(2,-K);Pe=Math.floor(Rt.width*Ut),Te=Math.floor(Rt.height*Ut),E.isDataArrayTexture?Ue=Rt.depth:E.isData3DTexture?Ue=Math.floor(Rt.depth*Ut):Ue=1,ze=0,st=0,ot=0}Z!==null?(Fe=Z.x,xt=Z.y,kt=Z.z):(Fe=0,xt=0,kt=0);let Et=be.convert(V.format),sn=be.convert(V.type),Ce;V.isData3DTexture?(J.setTexture3D(V,0),Ce=k.TEXTURE_3D):V.isDataArrayTexture||V.isCompressedArrayTexture?(J.setTexture2DArray(V,0),Ce=k.TEXTURE_2D_ARRAY):(J.setTexture2D(V,0),Ce=k.TEXTURE_2D),_.activeTexture(k.TEXTURE0),_.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,V.flipY),_.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),_.pixelStorei(k.UNPACK_ALIGNMENT,V.unpackAlignment);let hn=_.getParameter(k.UNPACK_ROW_LENGTH),ft=_.getParameter(k.UNPACK_IMAGE_HEIGHT),En=_.getParameter(k.UNPACK_SKIP_PIXELS),Vn=_.getParameter(k.UNPACK_SKIP_ROWS),xi=_.getParameter(k.UNPACK_SKIP_IMAGES);_.pixelStorei(k.UNPACK_ROW_LENGTH,Rt.width),_.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Rt.height),_.pixelStorei(k.UNPACK_SKIP_PIXELS,ze),_.pixelStorei(k.UNPACK_SKIP_ROWS,st),_.pixelStorei(k.UNPACK_SKIP_IMAGES,ot);let gs=E.isDataArrayTexture||E.isData3DTexture,Mt=V.isDataArrayTexture||V.isData3DTexture;if(E.isDepthTexture){let Ut=O.get(E),yi=O.get(V),At=O.get(Ut.__renderTarget),vi=O.get(yi.__renderTarget);_.bindFramebuffer(k.READ_FRAMEBUFFER,At.__webglFramebuffer),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,vi.__webglFramebuffer);for(let _s=0;_s<Ue;_s++)gs&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,O.get(E).__webglTexture,K,ot+_s),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,O.get(V).__webglTexture,Ae,kt+_s)),k.blitFramebuffer(ze,st,Pe,Te,Fe,xt,Pe,Te,k.DEPTH_BUFFER_BIT,k.NEAREST);_.bindFramebuffer(k.READ_FRAMEBUFFER,null),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(K!==0||E.isRenderTargetTexture||O.has(E)){let Ut=O.get(E),yi=O.get(V);_.bindFramebuffer(k.READ_FRAMEBUFFER,N),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,H);for(let At=0;At<Ue;At++)gs?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ut.__webglTexture,K,ot+At):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ut.__webglTexture,K),Mt?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,yi.__webglTexture,Ae,kt+At):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,yi.__webglTexture,Ae),K!==0?k.blitFramebuffer(ze,st,Pe,Te,Fe,xt,Pe,Te,k.COLOR_BUFFER_BIT,k.NEAREST):Mt?k.copyTexSubImage3D(Ce,Ae,Fe,xt,kt+At,ze,st,Pe,Te):k.copyTexSubImage2D(Ce,Ae,Fe,xt,ze,st,Pe,Te);_.bindFramebuffer(k.READ_FRAMEBUFFER,null),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else Mt?E.isDataTexture||E.isData3DTexture?k.texSubImage3D(Ce,Ae,Fe,xt,kt,Pe,Te,Ue,Et,sn,Rt.data):V.isCompressedArrayTexture?k.compressedTexSubImage3D(Ce,Ae,Fe,xt,kt,Pe,Te,Ue,Et,Rt.data):k.texSubImage3D(Ce,Ae,Fe,xt,kt,Pe,Te,Ue,Et,sn,Rt):E.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Ae,Fe,xt,Pe,Te,Et,sn,Rt.data):E.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Ae,Fe,xt,Rt.width,Rt.height,Et,Rt.data):k.texSubImage2D(k.TEXTURE_2D,Ae,Fe,xt,Pe,Te,Et,sn,Rt);_.pixelStorei(k.UNPACK_ROW_LENGTH,hn),_.pixelStorei(k.UNPACK_IMAGE_HEIGHT,ft),_.pixelStorei(k.UNPACK_SKIP_PIXELS,En),_.pixelStorei(k.UNPACK_SKIP_ROWS,Vn),_.pixelStorei(k.UNPACK_SKIP_IMAGES,xi),Ae===0&&V.generateMipmaps&&k.generateMipmap(Ce),_.unbindTexture()},this.initRenderTarget=function(E){O.get(E).__webglFramebuffer===void 0&&J.setupRenderTarget(E)},this.initTexture=function(E){E.isCubeTexture?J.setTextureCube(E,0):E.isData3DTexture?J.setTexture3D(E,0):E.isDataArrayTexture||E.isCompressedArrayTexture?J.setTexture2DArray(E,0):J.setTexture2D(E,0),_.unbindTexture()},this.resetState=function(){j=0,Y=0,X=null,_.reset(),Ee.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Dn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=lt._getDrawingBufferColorSpace(e),t.unpackColorSpace=lt._getUnpackColorSpace()}};var cc=class extends jt{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new We(.5,.5),this.rotation2D=0,this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this.rotation2D=e.rotation2D,this}},pr=new W,mp=new pt,gp=new pt,_p=new W,xp=new W,uc=class{constructor(e={}){let t=this,i,s,r,a,o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.sortObjects=!0,this.getSize=function(){return{width:i,height:s}},this.render=function(m,v){m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),mp.copy(v.matrixWorldInverse),gp.multiplyMatrices(v.projectionMatrix,mp),u(m,m,v),this.sortObjects&&f(m)},this.setSize=function(m,v){i=m,s=v,r=i/2,a=s/2,l.style.width=m+"px",l.style.height=v+"px"};function c(m){m.isCSS2DObject&&(m.element.style.display="none");for(let v=0,p=m.children.length;v<p;v++)c(m.children[v])}function u(m,v,p){if(m.visible===!1){c(m);return}if(m.isCSS2DObject){pr.setFromMatrixPosition(m.matrixWorld),pr.applyMatrix4(gp);let g=pr.z>=-1&&pr.z<=1&&m.layers.test(p.layers)===!0,A=m.element;if(A.style.display=g===!0?"":"none",g===!0){m.onBeforeRender(t,v,p);let y=100*m.center.x,T=100*m.center.y;A.style.transformOrigin=`${y}% ${T}%`;let b=-m.rotation2D,w=pr.x*r+r,x=-pr.y*a+a;A.style.transform=`translate(${-y}%, ${-T}%) translate(${w}px, ${x}px) rotate(${b}rad)`,A.parentNode!==l&&l.appendChild(A),m.onAfterRender(t,v,p)}let C={distanceToCameraSquared:d(p,m)};o.objects.set(m,C)}for(let g=0,A=m.children.length;g<A;g++)u(m.children[g],v,p)}function d(m,v){return _p.setFromMatrixPosition(m.matrixWorld),xp.setFromMatrixPosition(v.matrixWorld),_p.distanceToSquared(xp)}function h(m){let v=[];return m.traverseVisible(function(p){p.isCSS2DObject&&v.push(p)}),v}function f(m){let v=h(m).sort(function(g,A){if(g.renderOrder!==A.renderOrder)return A.renderOrder-g.renderOrder;let C=o.objects.get(g).distanceToCameraSquared,y=o.objects.get(A).distanceToCameraSquared;return C-y}),p=v.length;for(let g=0,A=v.length;g<A;g++)v[g].element.style.zIndex=p-g}}};var yp=new Sn,hc=new W,mr=class extends Ea{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Xt(e,3)),this.setAttribute("uv",new Xt(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new Yn(t,6,1);return this.setAttribute("instanceStart",new ln(i,3,0)),this.setAttribute("instanceEnd",new ln(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new Yn(t,6,1);return this.setAttribute("instanceColorStart",new ln(i,3,0)),this.setAttribute("instanceColorEnd",new ln(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new xa(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Sn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),yp.setFromBufferAttribute(t),this.boundingBox.union(yp))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Nn),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)hc.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(hc)),hc.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(hc));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};Se.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new We},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};mn.line={uniforms:Fa.merge([Se.common,Se.fog,Se.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		float trimSegmentAlpha( const in vec4 start, const in vec4 end ) {

			// compute the interpolation factor needed to trim the segment so it terminates
			// between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column

			// we need different nearEstimate formula for reversed and default depth buffer
			// a is positive with a reversed depth buffer so it can be used for controlling the code flow
			float nearEstimate = ( a > 0.0 ) ? ( - b / ( a + 1.0 ) ) : ( - 0.5 * b / a );

			return ( nearEstimate - start.z ) / ( end.z - start.z );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef USE_DASH

				float lineDistanceStart = dashScale * instanceDistanceStart;
				float lineDistanceEnd = dashScale * instanceDistanceEnd;

			#endif

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( start, end );
					end.xyz = mix( start.xyz, end.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceEnd = mix( lineDistanceStart, lineDistanceEnd, alpha );

					#endif

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					float alpha = trimSegmentAlpha( end, start );
					start.xyz = mix( end.xyz, start.xyz, alpha );

					#ifdef USE_DASH

						lineDistanceStart = mix( lineDistanceEnd, lineDistanceStart, alpha );

					#endif

				}

			}

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? lineDistanceStart : lineDistanceEnd;
				vUv = uv;

			#endif

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};var gr=class extends Dt{constructor(e){super({type:"LineMaterial",uniforms:Fa.clone(mn.line.uniforms),vertexShader:mn.line.vertexShader,fragmentShader:mn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var bh=new gt,vp=new W,bp=new W,en=new gt,tn=new gt,Kn=new gt,Sh=new W,Mh=new pt,nn=new Ta,Sp=new W,dc=new Sn,fc=new Nn,Qn=new gt,ei,ps;function Mp(n,e,t){return Qn.set(0,0,-e,1).applyMatrix4(n.projectionMatrix),Qn.multiplyScalar(1/Qn.w),Qn.x=ps/t.width,Qn.y=ps/t.height,Qn.applyMatrix4(n.projectionMatrixInverse),Qn.multiplyScalar(1/Qn.w),Math.abs(Math.max(Qn.x,Qn.y))}function Uv(n,e){let t=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,a=Math.min(i.instanceCount,s.count);for(let o=0,l=a;o<l;o++){nn.start.fromBufferAttribute(s,o),nn.end.fromBufferAttribute(r,o),nn.applyMatrix4(t);let c=new W,u=new W;ei.distanceSqToSegment(nn.start,nn.end,u,c),u.distanceTo(c)<ps*.5&&e.push({point:u,pointOnLine:c,distance:ei.origin.distanceTo(u),object:n,face:null,faceIndex:o,uv:null,uv1:null})}}function Fv(n,e,t){let i=e.projectionMatrix,r=n.material.resolution,a=n.matrixWorld,o=n.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,u=Math.min(o.instanceCount,l.count),d=-e.near;ei.at(1,Kn),Kn.w=1,Kn.applyMatrix4(e.matrixWorldInverse),Kn.applyMatrix4(i),Kn.multiplyScalar(1/Kn.w),Kn.x*=r.x/2,Kn.y*=r.y/2,Kn.z=0,Sh.copy(Kn),Mh.multiplyMatrices(e.matrixWorldInverse,a);for(let h=0,f=u;h<f;h++){if(en.fromBufferAttribute(l,h),tn.fromBufferAttribute(c,h),en.w=1,tn.w=1,en.applyMatrix4(Mh),tn.applyMatrix4(Mh),en.z>d&&tn.z>d)continue;if(en.z>d){let C=en.z-tn.z,y=(en.z-d)/C;en.lerp(tn,y)}else if(tn.z>d){let C=tn.z-en.z,y=(tn.z-d)/C;tn.lerp(en,y)}en.applyMatrix4(i),tn.applyMatrix4(i),en.multiplyScalar(1/en.w),tn.multiplyScalar(1/tn.w),en.x*=r.x/2,en.y*=r.y/2,tn.x*=r.x/2,tn.y*=r.y/2,nn.start.copy(en),nn.start.z=0,nn.end.copy(tn),nn.end.z=0;let v=nn.closestPointToPointParameter(Sh,!0);nn.at(v,Sp);let p=eh.lerp(en.z,tn.z,v),g=p>=-1&&p<=1,A=Sh.distanceTo(Sp)<ps*.5;if(g&&A){nn.start.fromBufferAttribute(l,h),nn.end.fromBufferAttribute(c,h),nn.start.applyMatrix4(a),nn.end.applyMatrix4(a);let C=new W,y=new W;ei.distanceSqToSegment(nn.start,nn.end,y,C),t.push({point:y,pointOnLine:C,distance:ei.origin.distanceTo(y),object:n,face:null,faceIndex:h,uv:null,uv1:null})}}}var pc=class extends qt{constructor(e=new mr,t=new gr({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)vp.fromBufferAttribute(t,a),bp.fromBufferAttribute(i,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+vp.distanceTo(bp);let r=new Yn(s,2,1);return e.setAttribute("instanceDistanceStart",new ln(r,1,0)),e.setAttribute("instanceDistanceEnd",new ln(r,1,1)),this}raycast(e,t){let i=this.material.worldUnits,s=e.camera;if(s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),i===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;ei=e.ray;let a=this.matrixWorld,o=this.geometry,l=this.material;ps=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),fc.copy(o.boundingSphere).applyMatrix4(a);let c;if(i)c=ps*.5;else{let d=Math.max(s.near,fc.distanceToPoint(ei.origin));c=Mp(s,d,l.resolution)}if(fc.radius+=c,ei.intersectsSphere(fc)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),dc.copy(o.boundingBox).applyMatrix4(a);let u;if(i)u=ps*.5;else{let d=Math.max(s.near,dc.distanceToPoint(ei.origin));u=Mp(s,d,l.resolution)}dc.expandByScalar(u),ei.intersectsBox(dc)!==!1&&(i?Uv(this,t):Fv(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(bh),this.material.uniforms.resolution.value.set(bh.z,bh.w))}};var ms=n=>typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:120}):setTimeout(()=>n({timeRemaining:()=>8,didTimeout:!0}),16),wp=n=>typeof cancelIdleCallback=="function"?cancelIdleCallback(n):clearTimeout(n);function wh(n){return n.repeat.set(1,-1),n.offset.set(0,1),n.userData.topDown=!0,n}function Ep(n,e,t={}){let i=e.width,s=e.height,r=t.mipmaps!==!1,a=t.rows||256,o=r?Math.floor(Math.log2(Math.max(i,s)))+1:1,l=M=>[Math.max(1,i>>M),Math.max(1,s>>M)],c=new ls(null,i,s,pn,Qt);c.colorSpace=t.colorSpace??Ft,c.flipY=!1,c.premultiplyAlpha=!1,c.unpackAlignment=4,c.generateMipmaps=!1,c.magFilter=Ct,c.minFilter=r?Fn:Ct,r&&(c.mipmaps=Array.from({length:o},(M,L)=>({data:null,width:l(L)[0],height:l(L)[1]}))),c.anisotropy=t.anisotropy??1,t.wrapS&&(c.wrapS=t.wrapS),wh(c),c.source.dataReady=!1,c.needsUpdate=!0;let u={w:i,h:s,levels:o,chunks:[],blits:[],fence_waits:0,done:!1,cancelled:!1,t0:performance.now(),t_done:null,alloc_ms:null},d=n.getContext(),h=null,f=null,m=!1,v=null,p=null,g=new Ot,A=[];for(let M=0;M<s;M+=a)A.push({kind:"upload",level:0,y0:M,y1:Math.min(s,M+a)});for(let M=1;M<o;M++){let[L,R]=l(M),P=Math.max(1,Math.floor(a*i/L/2));for(let B=0;B<R;B+=P)A.push({kind:"blit",level:M,y0:B,y1:Math.min(R,B+P)})}let C=new rr(new We,new We),y=new We;function T(M){let L=n.properties.get(c).__webglTexture,[R,P]=l(M.level-1),[B,N]=l(M.level),H=Math.round(M.y0*P/N),j=Math.round(M.y1*P/N);v=v||d.createFramebuffer(),p=p||d.createFramebuffer(),d.bindFramebuffer(d.READ_FRAMEBUFFER,v),d.framebufferTexture2D(d.READ_FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,L,M.level-1),d.bindFramebuffer(d.DRAW_FRAMEBUFFER,p),d.framebufferTexture2D(d.DRAW_FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,L,M.level),d.blitFramebuffer(0,H,R,j,0,M.y0,B,M.y1,d.COLOR_BUFFER_BIT,d.LINEAR),d.framebufferTexture2D(d.READ_FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,null,0),d.framebufferTexture2D(d.DRAW_FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,null,0),d.bindFramebuffer(d.READ_FRAMEBUFFER,null),d.bindFramebuffer(d.DRAW_FRAMEBUFFER,null),n.resetState()}function b(){h&&(d.deleteSync(h),h=null),v&&(d.deleteFramebuffer(v),v=null),p&&(d.deleteFramebuffer(p),p=null)}let w=new Promise((M,L)=>{let R=async()=>{if(f=null,!m)try{if(u.alloc_ms===null){let N=performance.now();n.initTexture(c),u.alloc_ms=performance.now()-N,f=ms(R);return}if(h){if(d.getSyncParameter(h,d.SYNC_STATUS)!==d.SIGNALED){u.fence_waits++,f=ms(R);return}d.deleteSync(h),h=null}if(!A.length){b(),u.done=!0,u.t_done=performance.now(),M(c);return}let P=A.shift(),B=performance.now();if(P.kind==="upload"){let N=await createImageBitmap(e,0,P.y0,i,P.y1-P.y0);if(m){N.close&&N.close();return}let H=performance.now();g.image=N,y.set(0,P.y0),n.copyTextureToTexture(g,c,null,y,0,0),N.close&&N.close(),u.chunks.push({level:0,rows:P.y1-P.y0,at:B,crop_ms:H-B,ms:performance.now()-H})}else T(P),u.blits.push({level:P.level,rows:P.y1-P.y0,at:B,ms:performance.now()-B});h=d.fenceSync(d.SYNC_GPU_COMMANDS_COMPLETE,0),d.flush(),f=ms(R)}catch(P){b(),L(P)}};f=ms(R)});function x(){u.done||m||(m=!0,u.cancelled=!0,f!==null&&wp(f),b(),c.dispose())}return{texture:c,promise:w,cancel:x,state:u}}function Tp(n,e,t={}){let i=e.width,s=e.height,r=t.nx||4,a=t.ny||2,o=t.border??8,l=i/r,c=s/a,u=l+2*o,d=c+2*o,h=t.mipmaps!==!1,f=t.rows||256,m=h?Math.floor(Math.log2(Math.max(u,d)))+1:1,v=U=>[Math.max(1,u>>U),Math.max(1,d>>U)],p=n.getContext(),g=[],A={isTiled:!0,tiles:g,nx:r,ny:a,cw:l,ch:c,border:o,size:[u,d],image:{width:i,height:s},levels:m,bytes:r*a*u*d*4*(h?4/3:1),dispose(){for(let U of g)U.dispose()}},C={w:i,h:s,nx:r,ny:a,levels:m,chunks:[],blits:[],allocs:[],fence_waits:0,done:!1,cancelled:!1,t0:performance.now(),t_done:null},y=null,T=null,b=!1,w=null,x=null,M=new Ot,L=new rr(new We,new We),R=new We,P=[],B=(U,q)=>{let Q=[],ee=0,ue=(U%i+i)%i,xe=q;for(;xe>0;){let _e=Math.min(xe,i-ue);Q.push([ue,_e,ee]),ee+=_e,xe-=_e,ue=0}return Q};for(let U=0;U<a;U++)for(let q=0;q<r;q++){let Q=U*r+q;P.push({kind:"alloc",ti:Q});let ee=B(q*l-o,u);for(let ue=0;ue<d;){let xe=U*c-o+ue;if(xe<0||xe>=s){P.push({kind:"upload",ti:Q,sy:xe<0?0:s-1,h:1,dy:ue,sx:ee}),ue++;continue}let _e=Math.min(f,d-ue,s-xe);P.push({kind:"upload",ti:Q,sy:xe,h:_e,dy:ue,sx:ee}),ue+=_e}for(let ue=1;ue<m;ue++){let[xe,_e]=v(ue),De=Math.max(1,Math.floor(f*u/xe/2));for(let te=0;te<_e;te+=De)P.push({kind:"blit",ti:Q,level:ue,y0:te,y1:Math.min(_e,te+De)})}}function N(){let U=new ls(null,u,d,pn,Qt);return U.colorSpace=t.colorSpace??Ft,U.flipY=!1,U.premultiplyAlpha=!1,U.unpackAlignment=4,U.generateMipmaps=!1,U.magFilter=Ct,U.minFilter=h?Fn:Ct,U.wrapS=U.wrapT=An,h&&(U.mipmaps=Array.from({length:m},(q,Q)=>({data:null,width:v(Q)[0],height:v(Q)[1]}))),U.anisotropy=t.anisotropy??1,U.source.dataReady=!1,U.needsUpdate=!0,U}function H(U){let q=n.properties.get(g[U.ti]).__webglTexture,[Q,ee]=v(U.level-1),[ue,xe]=v(U.level),_e=Math.round(U.y0*ee/xe),De=Math.round(U.y1*ee/xe);w=w||p.createFramebuffer(),x=x||p.createFramebuffer(),p.bindFramebuffer(p.READ_FRAMEBUFFER,w),p.framebufferTexture2D(p.READ_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,q,U.level-1),p.bindFramebuffer(p.DRAW_FRAMEBUFFER,x),p.framebufferTexture2D(p.DRAW_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,q,U.level),p.blitFramebuffer(0,_e,Q,De,0,U.y0,ue,U.y1,p.COLOR_BUFFER_BIT,p.LINEAR),p.framebufferTexture2D(p.READ_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,null,0),p.framebufferTexture2D(p.DRAW_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,null,0),p.bindFramebuffer(p.READ_FRAMEBUFFER,null),p.bindFramebuffer(p.DRAW_FRAMEBUFFER,null),n.resetState()}function j(){y&&(p.deleteSync(y),y=null),w&&(p.deleteFramebuffer(w),w=null),x&&(p.deleteFramebuffer(x),x=null)}let Y=new Promise((U,q)=>{let Q=()=>{if(T=null,!b)try{if(y){if(p.getSyncParameter(y,p.SYNC_STATUS)!==p.SIGNALED){C.fence_waits++,T=ms(Q);return}p.deleteSync(y),y=null}if(!P.length){j(),C.done=!0,C.t_done=performance.now(),U(A);return}let ee=P.shift(),ue=performance.now();if(ee.kind==="alloc"){let xe=N();g[ee.ti]=xe,n.initTexture(xe),C.allocs.push({ti:ee.ti,at:ue,ms:performance.now()-ue})}else if(ee.kind==="upload"){M.image=e;for(let[xe,_e,De]of ee.sx)L.min.set(xe,ee.sy),L.max.set(xe+_e,ee.sy+ee.h),R.set(De,ee.dy),n.copyTextureToTexture(M,g[ee.ti],L,R,0,0);C.chunks.push({ti:ee.ti,rows:ee.h,at:ue,ms:performance.now()-ue})}else H(ee),C.blits.push({ti:ee.ti,level:ee.level,at:ue,ms:performance.now()-ue});y=p.fenceSync(p.SYNC_GPU_COMMANDS_COMPLETE,0),p.flush(),T=ms(Q)}catch(ee){j(),q(ee)}};T=ms(Q)});function X(){C.done||b||(b=!0,C.cancelled=!0,T!==null&&wp(T),j(),A.dispose())}return{texture:A,promise:Y,cancel:X,state:C}}function za(n,e=!1){let t=s=>e?`textureLod(${s}, q, 0.0)`:`textureGrad(${s}, q, gx, gy)`,i=[0,1,2,3,4,5,6,7].map(s=>`${s?"else ":""}if (i == ${s}) c = ${t(n+"T"+s)};`).join(" ");return[...[0,1,2,3,4,5,6,7].map(s=>`uniform sampler2D ${n}T${s};`),`uniform float ${n}Tiled; uniform vec4 ${n}Geo;`,`vec4 ${n}_pick(int i, vec2 q, vec2 gx, vec2 gy) { vec4 c = vec4(0.0); ${i} return c; }`,`vec4 ${n}_sample(vec2 uv) {`,"  vec2 gx = dFdx(uv), gy = dFdy(uv);",`  if (${n}Tiled < 0.5) { vec2 q = uv; return ${t(n+"T0")}; }`,`  vec2 n = ${n}Geo.xy; float C = ${n}Geo.z, B = ${n}Geo.w, s = C / (C + 2.0 * B);`,"  vec2 g = uv * n; vec2 ip = floor(g); vec2 f = g - ip;","  ip.x = mod(ip.x, n.x); if (ip.y > n.y - 1.0) { ip.y = n.y - 1.0; f.y = 1.0; } if (ip.y < 0.0) { ip.y = 0.0; f.y = 0.0; }","  vec2 q = (B + f * C) / (C + 2.0 * B);",`  return ${n}_pick(int(ip.y * n.x + ip.x), q, gx * n * s, gy * n * s);`,"}"].join(`
`)}function Va(n){let e={[n+"Tiled"]:{value:0},[n+"Geo"]:{value:new gt(4,2,2048,8)}};for(let t=0;t<8;t++)e[n+"T"+t]={value:null};return e}function mc(n,e,t){if(t&&t.isTiled){for(let i=0;i<8;i++)n[e+"T"+i].value=t.tiles[i]||null;n[e+"Tiled"].value=1,n[e+"Geo"].value.set(t.nx,t.ny,t.cw,t.border)}else{n[e+"T0"].value=t;for(let i=1;i<8;i++)n[e+"T"+i].value=null;n[e+"Tiled"].value=0}}var _r=[{pr:2,family:!0,glow:!0,hiTex:!0},{pr:1.5,family:!0,glow:!0,hiTex:!0},{pr:1,family:!0,glow:!0,hiTex:!1},{pr:1,family:!1,glow:!1,hiTex:!1}],Ov=50;function Bv(){let n=document.createElement("canvas");n.width=n.height=64;let e=n.getContext("2d");e.fillStyle="#fff",e.beginPath(),e.arc(32,32,30,0,Math.PI*2),e.fill();let t=new nr(n);return t.colorSpace=Ft,t}function kv(){let n=document.createElement("canvas");n.width=n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.18,"rgba(255,255,255,0.55)"),t.addColorStop(.45,"rgba(255,255,255,0.12)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128);let i=new nr(n);return i.colorSpace=Ft,i}var zv=2e5;function Eh(){try{return window.matchMedia("(pointer: coarse)").matches&&!window.matchMedia("(pointer: fine)").matches||window.innerWidth<768}catch{return!1}}function Ap(n,e,t,i){let s=t.constants,r=s.length_unit_km,a=i.scene,o=a.colors,l=new ac({canvas:n,antialias:!0,logarithmicDepthBuffer:!0}),u=Eh()?1.5:2,d={level:0,auto:!navigator.webdriver,log:[],deviceCap:u},h=()=>Math.min(window.devicePixelRatio||1,u,_r[d.level].pr);l.setPixelRatio(h());let f=new uc({element:e}),m=new Qs,v=new Qs;v.background=new Ke(a.background),l.autoClear=!1;let p=new on(45,1,1e-4,1e11);p.up.set(0,0,1),m.add(new wa(16777215,.06));let g=new Ma(16777215,2.2);m.add(g,g.target);let A=Bv(),C=kv(),y={t:t.tStart,s:0,sTarget:0,precision:"relative",paused:!1,cam:{target:"L2",dist:32e5,az:-1.2,el:.9},fly:null},T=[],b={},w={bary:[0,0,0]},x={},M=null,L=[],R={nightlights:!0,sunglow:!0},P=!1,B=[];function N(I,F,G,ie,$={}){let se={name:I,layer:F,obj:G,src:ie,kind:$.kind||"line",poly:!!$.poly,label:$.label||null,labelAt:$.labelAt,priority:$.priority||0,pick:$.pick||null,radius:$.radius,minPx:$.minPx,glow:$.glow};return se.work=new Float64Array(ie.length),(se.kind==="sky"?v:m).add(G),se.label&&(se.labelObj=new cc(se.label),se.labelObj.center.set(-.08,.5),m.add(se.labelObj),se.label.style.display="none",e.appendChild(se.label)),T.push(se),se}function H(I,F,G,ie=1,$=null){let se=new mr;se.setPositions(new Float32Array(I*6)),$&&se.setColors($);let Ie=new gr({color:$?16777215:F,vertexColors:!!$,linewidth:G,transparent:ie<1,opacity:ie,depthWrite:ie>=1});L.push(Ie);let Xe=new pc(se,Ie);return Xe.frustumCulled=!1,Xe}function j(I,F,G){let ie=new Gt;return ie.setAttribute("position",new Ht(new Float32Array(I*3),3)),new Ui(ie,new cs({color:F,size:G,sizeAttenuation:!1,map:A,alphaTest:.5,transparent:!0}))}let Y=I=>{let F=new Float64Array(I.length);for(let G=0;G<I.length;G++)F[G]=I[G]*r;return F};function X(I,F,G,ie,$,se={}){let Ie=se.hidden?0:se.size||a.points.lpt,Xe=N(I,F,j(1,ie,Ie),Y(G),{kind:"point",label:$,priority:se.priority,pick:se.pick||I});if(se.hidden&&(Xe.obj.material.opacity=0,Xe.obj.material.alphaTest=0),se.glowPx){let Ge=new Ui(new Gt,new cs({color:ie,size:se.glowPx,sizeAttenuation:!1,map:C,transparent:!0,blending:pi,depthWrite:!1,opacity:.85}));Ge.geometry.setAttribute("position",new Ht(new Float32Array(3),3)),N(I+"_glow",F,Ge,Xe.src,{kind:"point"})}return b[I]=Xe,w[I]=Xe.src,Xe}function U(I,F){let G=F.length/3-1,ie=new Float32Array(2*G),$=0;for(let Xe=0;Xe<G;Xe++){let Ge=3*Xe;ie[2*Xe]=$,$+=Math.hypot(F[Ge+3]-F[Ge],F[Ge+4]-F[Ge+1],F[Ge+5]-F[Ge+2]),ie[2*Xe+1]=$}let se=new Yn(ie,2,1);I.geometry.setAttribute("instanceDistanceStart",new ln(se,1,0)),I.geometry.setAttribute("instanceDistanceEnd",new ln(se,1,1));let Ie=I.material;Ie.dashed=!0,Ie.dashSize=a.lines.dashPx??7,Ie.gapSize=a.lines.gapPx??5,Ie.needsUpdate=!0,Ie.userData.dashMaxKm=$,B.push(Ie)}function q(I,F,G,ie,$=a.lines.traj,se=1,Ie={}){let Xe=G.length/3-1,Ge=null;if(Ie.fade){let wt=new Ke(ie),zn=new Ke(a.background),wn=new Ke;Ge=new Float32Array(Xe*6);for(let Lt=0;Lt<Xe;Lt++)for(let[un,_i]of[[0,Lt/Xe],[3,(Lt+1)/Xe]])wn.copy(zn).lerp(wt,_i**1.6),Ge[Lt*6+un]=wn.r,Ge[Lt*6+un+1]=wn.g,Ge[Lt*6+un+2]=wn.b}let It=N(I,F,H(Xe,ie,$,se,Ge),Y(G),{poly:!0});return Ie.dashed&&U(It.obj,It.src),It}function Q(I,F,G,ie,$=a.lines.traj,se=1){return N(I,F,H(G.length/6,ie,$,se),Y(G))}function ee(I,F,G,ie,$=a.points.burn){return N(I,F,j(G.length/3,ie,$),Y(G),{kind:"point"})}function ue(I,F,G,ie,$={}){let se=N(I,F,j(1,16777215,0),Y(G),{kind:"label",label:ie,priority:$.priority,pick:$.pick});return se.obj.material.opacity=0,se.obj.material.alphaTest=0,$.pick&&(w[$.pick]=w[$.pick]||se.src),se}function xe(I,F,G,ie,$,se={}){let Ie=se.surface?te($,se.surface):se.limb?De($):se.emissive?new os({color:$}):new ya({color:$}),Xe=new qt(new Oi(1,64,40),Ie),Ge=null;se.glow&&(Ge=new fa(new er({map:C,color:$,blending:pi,depthWrite:!1,transparent:!0,opacity:a.glow.strength})),Ge.scale.setScalar(2*se.glow),Xe.add(Ge));let It=null;se.atmosphere&&(It=new qt(new Oi(1.06,64,40),_e(se.atmosphere)),Xe.add(It));let wt=N(I,F,Xe,G.src,{kind:"sphere",radius:ie,minPx:se.minPx||5,glow:se.glow,pick:se.pick||I});return wt.glowObj=Ge,wt.atmoObj=It,wt.surface=se.surface||null,wt.exaggeration=1,wt}function _e(I){return new Dt({uniforms:{color:{value:new Ke(I)},strength:{value:a.glow.atmosphere??.9},sunDir:{value:new W(1,0,0)},sunOn:{value:0}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec3 vN; varying vec3 vV; varying vec3 vNW;","void main() {","  vec4 mv = modelViewMatrix * vec4(position, 1.0);","  vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vNW = normalize(mat3(modelMatrix) * normal);","  gl_Position = projectionMatrix * mv;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>","uniform vec3 color; uniform float strength; uniform vec3 sunDir; uniform float sunOn; varying vec3 vN; varying vec3 vV; varying vec3 vNW;","void main() {","#include <logdepthbuf_fragment>","  float f = pow(1.0 - max(dot(normalize(vN), normalize(vV)), 0.0), 2.6) * strength;","  f *= mix(1.0, 0.18 + 0.82 * smoothstep(-0.35, 0.25, dot(normalize(vNW), sunDir)), sunOn);","  gl_FragColor = vec4(color * f, f);","}"].join(`
`),blending:pi,transparent:!0,depthWrite:!1})}function De(I){let F=a.sunLimb||{};return new Dt({uniforms:{base:{value:new Ke(I)},u:{value:new W(...F.u??[.5,.6,.72])}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec3 vN; varying vec3 vV;","void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);","  gl_Position = projectionMatrix * mv;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>","uniform vec3 base; uniform vec3 u; varying vec3 vN; varying vec3 vV;","void main() {","#include <logdepthbuf_fragment>","  float mu = clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0);","  gl_FragColor = vec4(base * (vec3(1.0) - u * (1.0 - mu)), 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`)})}function te(I,F){let G=a.surface||{};return new Dt({uniforms:{...Va("map"),...Va("night"),mapOn:{value:0},nightMapOn:{value:0},base:{value:new Ke(I)},sunDir:{value:new W(1,0,0)},sun:{value:G.sun??(F==="earth"?1.3:1.6)},ambient:{value:G.ambient??.004},night:{value:F==="earth"?G.night??1:0},nightOn:{value:1}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec2 vUv; varying vec3 vNW;","void main() { vUv = uv; vNW = normalize(mat3(modelMatrix) * normal);","  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",za("map"),za("night"),"uniform float mapOn; uniform float nightMapOn; uniform vec3 base;","uniform vec3 sunDir; uniform float sun; uniform float ambient; uniform float night; uniform float nightOn; varying vec2 vUv; varying vec3 vNW;","void main() {","#include <logdepthbuf_fragment>","  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);","  vec4 dayS = map_sample(uv); vec4 nightS = night_sample(uv);","  vec3 day = mapOn > 0.5 ? dayS.rgb : base;","  float ndl = dot(normalize(vNW), sunDir);","  vec3 c = day * (max(ndl, 0.0) * sun + ambient);","  if (night > 0.0 && nightMapOn > 0.5 && nightOn > 0.5) {","    vec3 n = nightS.rgb; float lum = dot(n, vec3(0.2126, 0.7152, 0.0722));","    c += n * (0.12 + 0.88 * smoothstep(0.05, 0.30, lum)) * night * (1.0 - smoothstep(-0.1, 0.1, ndl));","  }","  gl_FragColor = vec4(c, 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`)})}let oe=6,me={grid:null,axes:[],key:"",gridStep:0};function Re(){let I=(2*oe+1)*2;me.grid=N("grid","aux",H(I,a.colors.grid??2766160,a.lines.grid??1,a.lines.gridOpacity??.5),new Float64Array(I*6),{});let F=a.colors.axes??[12611696,7385200,7377104];me.axes=["x","y","z"].map((G,ie)=>N("axes_"+G,"aux",H(1,F[ie],a.lines.axes??1.6),new Float64Array(6),{}));for(let G of[me.grid,...me.axes])G.on=!1,G.obj.visible=!1}function we(){if(!me.grid)return;let I=Qe(),F=y.cam.dist;if(me.grid.obj.visible){let G=10**Math.floor(Math.log10(F/3)),ie=Math.round(I[0]/G)*G,$=Math.round(I[1]/G)*G,se=I[2],Ie=`${G}|${ie}|${$}|${se}`;if(Ie!==me.key){me.key=Ie;let Xe=me.grid.src,Ge=oe*G,It=0;for(let wt=-oe;wt<=oe;wt++)Xe.set([ie+wt*G,$-Ge,se,ie+wt*G,$+Ge,se],It),It+=6,Xe.set([ie-Ge,$+wt*G,se,ie+Ge,$+wt*G,se],It),It+=6;me.gridStep=G}}if(me.axes[0].obj.visible){let G=F*.12;me.axes.forEach((ie,$)=>{ie.src.set([I[0],I[1],I[2],I[0]+($===0)*G,I[1]+($===1)*G,I[2]+($===2)*G])})}}function Je(){let I=y.cam.dist;for(let F of T){if(!F.labelObj||!F.labelObj.visible)continue;let G=F.labelObj.position,ie=y.precision==="relative"?Math.hypot(G.x,G.y,G.z):Math.hypot(G.x-et[0],G.y-et[1],G.z-et[2]),$=Math.log10(Math.max(ie/I,.001)),se=Math.min(1.08,Math.max(.84,1-.16*$)),Ie=Math.min(1,Math.max(.62,1-.3*$)),Xe=se.toFixed(2),Ge=Ie.toFixed(2);F._lk!==Xe&&(F.label.style.setProperty("--lbl-k",Xe),F._lk=Xe),F._lo!==Ge&&(F.label.style.opacity=Ge,F._lo=Ge)}}let et=[0,0,0],je=I=>t.thetaOffset+Yi((I-t.thetaEpoch)/86400,tt());function tt(){return s.time_unit_days}let ct=()=>y.s*je(y.t);function Qe(){return y.fly?y.fly.pos:w[y.cam.target]||[0,0,0]}function _t(){let I=ct(),F=qi(Qe(),je(y.t),y.s),{dist:G,az:ie,el:$}=y.cam,se=[Math.cos($)*Math.cos(ie),Math.cos($)*Math.sin(ie),Math.sin($)];return et[0]=F[0]+G*se[0],et[1]=F[1]+G*se[1],et[2]=F[2]+G*se[2],{a:I,tg:F}}let de=y;function qe(I,F,G,ie){de.precision==="relative"?(G[ie]=I[F]-et[0],G[ie+1]=I[F+1]-et[1],G[ie+2]=I[F+2]-et[2]):(G[ie]=I[F],G[ie+1]=I[F+1],G[ie+2]=I[F+2])}let ut=1,ht=new Float64Array(3),k=new pt,dt=new pt().makeRotationX(Math.PI/2);function at(I){let F=t.frameF,G=Math.cos(I),ie=Math.sin(I);if(F){let Xe=[F.x,F.y,F.z];return[[0,1,2].map(Ge=>G*Xe[0][Ge]-ie*Xe[1][Ge]),[0,1,2].map(Ge=>ie*Xe[0][Ge]+G*Xe[1][Ge]),[...Xe[2]]]}let $=I-je(y.t),se=Math.cos($),Ie=Math.sin($);return[[se,-Ie,0],[Ie,se,0],[0,0,1]]}function S(I,F){let G;try{G=I.orientFn(y.t)}catch{return}let ie=at(F),$=wi(ie,G);k.set($[0][0],$[0][1],$[0][2],0,$[1][0],$[1][1],$[1][2],0,$[2][0],$[2][1],$[2][2],0,0,0,0,1).multiply(dt),I.obj.quaternion.setFromRotationMatrix(k),I.orientNow=$}function _(I,F){let G=br(I.src,F,I.work);if(I.kind==="sphere"){let ie=[0,0,0];qe(G,0,ie,0),I.obj.position.set(ie[0],ie[1],ie[2]);let $=Math.hypot(G[0]-et[0],G[1]-et[1],G[2]-et[2]),se=P?I.radius:Math.max(I.radius,I.minPx*$/ut);if(I.exaggeration=se/I.radius,I.camDist=$,I.obj.scale.setScalar(se),I.orientFn)S(I,F);else if(I.faceTo&&b[I.faceTo]){let Ie=br(b[I.faceTo].src,F,new Float64Array(3));I.obj.rotation.set(Math.PI/2,0,Math.atan2(Ie[1]-G[1],Ie[0]-G[0]),"ZYX")}if(I.surface||I.atmoObj){let Ie=b.Sun?br(b.Sun.src,F,ht):null;if(Ie){let Xe=Ie[0]-G[0],Ge=Ie[1]-G[1],It=Ie[2]-G[2],wt=Math.hypot(Xe,Ge,It)||1;I.surface&&I.obj.material.uniforms.sunDir.value.set(Xe/wt,Ge/wt,It/wt),I.atmoObj&&(I.atmoObj.material.uniforms.sunDir.value.set(Xe/wt,Ge/wt,It/wt),I.atmoObj.material.uniforms.sunOn.value=I.surface?1:0)}}I.glowObj&&(I.glowObj.visible=_r[d.level].glow&&!(I.name==="Sun_sphere"&&R.sunglow===!1)),I.atmoObj&&(I.atmoObj.visible=_r[d.level].glow);return}if(I.obj.isLineSegments2){let ie=I.obj.geometry.attributes.instanceStart.data,$=ie.array;if(I.poly)for(let se=0,Ie=0;se+3<G.length;se+=3,Ie+=6)qe(G,se,$,Ie),qe(G,se+3,$,Ie+3);else for(let se=0;se<G.length;se+=3)qe(G,se,$,se);ie.needsUpdate=!0}else{let ie=I.obj.geometry.attributes.position;for(let $=0;$<G.length;$+=3)qe(G,$,ie.array,$);ie.needsUpdate=!0,I.obj.geometry.computeBoundingSphere()}if(I.labelObj){let ie=I.labelAt===void 0?0:I.labelAt*3,$=[0,0,0];qe(G,ie,$,0),I.labelObj.position.set($[0],$[1],$[2])}}function D(){let I=x[y.fly?y.fly.to:y.cam.target]||null;if(I!==M){M=I;for(let F of T)F.zoom&&(F.obj.visible=z(F),F.labelObj&&(F.labelObj.visible=F.on!==!1&&F.zoom===M));for(let F of O)F(M)}}let O=[];function J(){D(),t.onTime&&t.onTime(y.t,Wt);let{a:I,tg:F}=_t();ut=Math.max(n.clientHeight,1)/(2*Math.tan(p.fov*Math.PI/360)),we();for(let se of B){se.dashScale=ut/y.cam.dist;let Ie=se.dashScale*se.userData.dashMaxKm<=zv;se.dashed!==Ie&&(se.dashed=Ie,se.needsUpdate=!0)}for(let se of T)se.kind!=="sky"&&(se.obj.visible||se.labelObj)&&_(se,I);Je(),y.precision==="relative"?(p.position.set(0,0,0),p.lookAt(F[0]-et[0],F[1]-et[1],F[2]-et[2])):(p.position.set(et[0],et[1],et[2]),p.lookAt(F[0],F[1],F[2]));let ie=b.Sun?qi(b.Sun.src,je(y.t),y.s):[0,0,0];g.position.set(ie[0]-F[0],ie[1]-F[1],ie[2]-F[2]).normalize(),g.target.position.set(0,0,0);let $=Math.max(y.cam.dist*1e-4,.001);p.near!==$&&(p.near=$,p.updateProjectionMatrix());for(let se of T)se.kind==="sky"&&se.obj.visible&&(se.obj.position.copy(p.position),se.obj.rotation.set(0,0,I-je(y.t)),se.frame&&se.frame(Wt,I-je(y.t)))}function he(I){if(!I||I.hidden)return null;let F=getComputedStyle(I);if(F.display==="none"||F.visibility==="hidden"||Number(F.opacity)<.05)return null;let G=I.getBoundingClientRect();return G.width>0&&G.height>0?G:null}let fe=(I,F)=>I.left<F.right&&F.left<I.right&&I.top<F.bottom&&F.top<I.bottom;function re(){let I=[...document.querySelectorAll("[data-obstacle]")].map(he).filter(Boolean),F=T.filter(se=>se.label&&se.labelObj&&se.labelObj.visible&&se.label.style.display!=="none").sort((se,Ie)=>Ie.priority-se.priority),G=[],ie=window.innerWidth,$=window.innerHeight;for(let se of F){se.label.style.visibility="";let Ie=se.label.getBoundingClientRect();Ie.left<0||Ie.top<0||Ie.right>ie||Ie.bottom>$||I.some(Ge=>fe(Ie,Ge))||G.some(Ge=>fe(Ie,Ge))?se.label.style.visibility="hidden":G.push(Ie)}}function ce(){let I=h();l.getPixelRatio()!==I&&l.setPixelRatio(I);let F=n.clientWidth,G=n.clientHeight;(n.width!==Math.floor(F*I)||n.height!==Math.floor(G*I))&&(l.setSize(F,G,!1),f.setSize(F,G),p.aspect=F/Math.max(G,1),p.updateProjectionMatrix());for(let ie of L)ie.resolution.set(F,G)}function ge(){ce(),J(),l.clear(),l.render(v,p),l.clearDepth(),l.render(m,p),f.render(m,p),re();for(let I of Be)I(Wt)}let Be=[],Me=performance.now(),ye={speedDaysPerSec:0};function ke(I){if(y.s!==y.sTarget){let F=I/1.5;y.s=y.sTarget>y.s?Math.min(y.sTarget,y.s+F):Math.max(y.sTarget,y.s-F)}if(ye.speedDaysPerSec){let F=y.t+ye.speedDaysPerSec*86400*I;y.t=Math.min(Math.max(F,t.tMin),t.tMax),(y.t===t.tMax||y.t===t.tMin)&&(ye.speedDaysPerSec=0),t.onTimeChange&&t.onTimeChange(y.t)}if(y.fly){let F=y.fly;F.k=Math.min(1,F.k+I/F.dur);let G=F.k<.5?4*F.k**3:1-(-2*F.k+2)**3/2,ie=w[F.to]||[0,0,0];for(let $=0;$<3;$++)F.pos[$]=F.from[$]+(ie[$]-F.from[$])*G;y.cam.dist=Math.exp(Math.log(F.d0)+(Math.log(F.d1)-Math.log(F.d0))*G),F.k>=1&&(y.cam.target=F.to,y.fly=null)}}let Le={frames:0,t0:performance.now(),low:0,history:[]};function nt(I){Le.frames++;let F=I-Le.t0;if(F<2e3)return;let G=Le.frames*1e3/F;if(Le.history.push(G),Le.frames=0,Le.t0=I,!(!d.auto||Le.history.length<2)&&(Le.low=G<Ov?Le.low+1:0,Le.low>=2&&d.level<_r.length-1)){let ie={at:new Date().toISOString(),from:d.level,to:d.level+1,fps:Math.round(G*10)/10};d.level++,d.log.push(ie),Le.low=0,ve(),console.info("[\uD654\uC9C8] \uC790\uB3D9\uC73C\uB85C \uB0AE\uCDA4",JSON.stringify(ie))}}function z(I){return I.on===!1||I.zoom&&I.zoom!==M?!1:I.familyLine?I.wanted!==!1&&_r[d.level].family:!0}function ve(){for(let I of T)I.familyLine&&(I.obj.visible=z(I))}l.setAnimationLoop(()=>{let I=performance.now(),F=Math.min((I-Me)/1e3,.1);Me=I,y.paused||ke(F),ge(),nt(I)});let ae=null;n.addEventListener("pointerdown",I=>{ae={x:I.clientX,y:I.clientY,x0:I.clientX,y0:I.clientY},n.setPointerCapture(I.pointerId)}),n.addEventListener("pointermove",I=>{ae&&(y.cam.az-=(I.clientX-ae.x)*.006,y.cam.el=Math.min(1.55,Math.max(-1.55,y.cam.el+(I.clientY-ae.y)*.006)),ae.x=I.clientX,ae.y=I.clientY)}),n.addEventListener("pointerup",I=>{if(ae&&Math.hypot(I.clientX-ae.x0,I.clientY-ae.y0)<5){let F=be(I.clientX,I.clientY);F&&t.onPick&&t.onPick(F)}ae=null}),n.addEventListener("wheel",I=>{I.preventDefault(),y.fly=null,y.cam.dist=Math.min(2e9,Math.max(.05,y.cam.dist*Math.exp(I.deltaY*.0012)))},{passive:!1});function be(I,F){let G=null,ie=22,$=new W;for(let se of T){if(!se.pick||!se.obj.visible)continue;if(se.kind==="sphere")$.copy(se.obj.position);else if(se.labelObj)$.copy(se.labelObj.position);else continue;if($.project(p),$.z<-1||$.z>1)continue;let Ie=($.x+1)/2*n.clientWidth,Xe=(1-$.y)/2*n.clientHeight,Ge=Math.hypot(Ie-I,Xe-F);Ge<ie&&(ie=Ge,G=se.pick)}return G}function Ee(){let I=l.getContext(),F=I.drawingBufferWidth,G=I.drawingBufferHeight,ie=new Uint8Array(F*G*4);return I.readPixels(0,0,F,G,I.RGBA,I.UNSIGNED_BYTE,ie),{px:ie,w:F,h:G}}function pe(){ge();let{px:I,w:F,h:G}=Ee(),ie=new Set;for(let $=0;$<I.length;$+=388)ie.add(I[$]<<16|I[$+1]<<8|I[$+2]);return{width:F,height:G,distinctColors:ie.size,webgl2:l.capabilities.isWebGL2}}function Ve(I){let F=T.map(Lt=>Lt.obj.visible),G=b[I],ie=G.obj.material.color.getHex();for(let Lt of T)Lt.obj.visible=Lt===G;G.obj.material.color.setHex(16777215);let $=e.style.display;e.style.display="none";let se=v.background;v.background=new Ke(0),ge();let{px:Ie,w:Xe,h:Ge}=Ee(),It=0,wt=0,zn=0;for(let Lt=0;Lt<Ge;Lt++)for(let un=0;un<Xe;un++){let _i=(Lt*Xe+un)*4;Ie[_i]>200&&Ie[_i+1]>200&&Ie[_i+2]>200&&(It+=un,wt+=Ge-1-Lt,zn++)}T.forEach((Lt,un)=>{Lt.obj.visible=F[un]}),G.obj.material.color.setHex(ie),e.style.display=$,v.background=se,ge();let wn=l.getPixelRatio();return zn?{x:It/zn/wn,y:wt/zn/wn,n:zn}:null}function Ne(I){return qi(b[I].src,je(y.t),y.s)}function St(I=3e3){return new Promise(F=>{let G=d.auto;d.auto=!1;let ie=0,$=performance.now(),se=()=>{ie++,performance.now()-$<I?requestAnimationFrame(se):(d.auto=G,F({fps:ie*1e3/(performance.now()-$),level:d.level,pr:l.getPixelRatio()}))};requestAnimationFrame(se)})}function mt(I=120){let F=l.getContext(),G=new Uint8Array(4);ge(),F.readPixels(0,0,1,1,F.RGBA,F.UNSIGNED_BYTE,G);let ie=performance.now();for(let se=0;se<I;se++)ge(),F.readPixels(0,0,1,1,F.RGBA,F.UNSIGNED_BYTE,G);let $=(performance.now()-ie)/I;return{ms:$,fpsUnlocked:1e3/$,pr:l.getPixelRatio()}}Re();let Wt={renderer:l,scene:m,skyScene:v,camera:p,state:y,items:T,markers:b,anchors:w,COLORS:o,anim:ye,model:t,tokens:i,quality:d,addMarker:X,addPolyline:q,addSegments:Q,addPoints:ee,addLabel:ue,addSphere:xe,addItem:N,ndToKm:Y,theta:je,angle:ct,render:ge,update:J,setLayer(I,F){Wt.setItemsVisible(G=>G.layer===I,F)},removeItem(I){let F=T.findIndex($=>$.name===I);if(F<0)return!1;let G=T[F];G.obj.parent&&G.obj.parent.remove(G.obj),G.obj.geometry.dispose();let ie=G.obj.material;for(let $ of[L,B]){let se=$.indexOf(ie);se>=0&&$.splice(se,1)}return ie.dispose(),G.labelObj&&(m.remove(G.labelObj),G.label.remove()),b[I]===G&&delete b[I],T.splice(F,1),!0},setItemsVisible(I,F){for(let G of T)I(G)&&(G.on=F,G.obj.visible=z(G),G.labelObj&&(G.labelObj.visible=F&&(!G.zoom||G.zoom===M)))},wantVisible:z,setItemsDimmed(I,F,G=.32){for(let ie of T)if(I(ie)&&ie.kind!=="label"&&ie.kind!=="sphere"){let $=ie.obj.material;if(ie.base===void 0&&(ie.base={opacity:$.opacity,transparent:$.transparent,depthWrite:$.depthWrite,alphaTest:$.alphaTest}),!!ie.dimmed===F)continue;ie.dimmed=F,$.opacity=F?ie.base.opacity*G:ie.base.opacity,$.transparent=F||ie.base.transparent,$.depthWrite=F?!1:ie.base.depthWrite,ie.base.alphaTest&&($.alphaTest=F?ie.base.alphaTest*G*.5:ie.base.alphaTest),$.needsUpdate=!0}},setLabelsVisible(I){e.style.display=I?"":"none"},addZoomTarget(I,F){x[I]=F},onZoomChange(I){O.push(I)},get zoomNow(){return M},setSphereTexture(I,F,G){let ie=T.find(Ie=>Ie.name===I&&Ie.kind==="sphere");if(!ie)return!1;let $=new Ot(F);$.colorSpace=Ft,$.anisotropy=l.capabilities.getMaxAnisotropy(),$.needsUpdate=!0;let se=ie.obj.material;return se.map&&se.map.dispose(),se.map=$,se.color.set(16777215),se.needsUpdate=!0,ie.texture={label:G,w:F.width,h:F.height},!0},maxTextureSize:()=>l.capabilities.maxTextureSize,makeTexture(I,F={}){let G=new Ot(I);return G.colorSpace=F.colorSpace??Ft,G.anisotropy=l.capabilities.getMaxAnisotropy(),F.mipmaps===!1&&(G.generateMipmaps=!1,G.minFilter=Ct),F.wrapS&&(G.wrapS=F.wrapS),wh(G),G.needsUpdate=!0,G},setSphereMap(I,F,G,ie="map"){let $=T.find(Xe=>Xe.name===I&&Xe.kind==="sphere");if(!$)return!1;let se=$.obj.material,Ie=ie==="nightMap"?"night":ie;return se.uniforms&&se.uniforms[Ie+"T0"]?(mc(se.uniforms,Ie,F),se.uniforms[ie+"On"]&&(se.uniforms[ie+"On"].value=1)):(se.map=F,se.color.set(16777215),se.needsUpdate=!0),$.textures=$.textures||{},$.textures[ie]={label:G,w:F.image.width,h:F.image.height},$.texture=$.textures.map||$.textures[ie],!0},sphereScreenPx(I){let F=T.find(G=>G.name===I&&G.kind==="sphere");return!F||!F.obj.visible||!F.camDist?0:F.obj.scale.x*ut/F.camDist*l.getPixelRatio()},qualityAllowsHiTex:()=>_r[d.level].hiTex!==!1,setSphereOrient(I,F){let G=T.find(ie=>ie.name===I&&ie.kind==="sphere");G&&(G.orientFn=F)},setGraphic(I,F){R[I]=F,I==="nightlights"&&Wt.setSurface("Earth_sphere","nightOn",F?1:0)},graphic:()=>({...R}),setSurface(I,F,G){let ie=T.find($=>$.name===I&&$.kind==="sphere");ie&&ie.surface&&ie.obj.material.uniforms[F]&&(ie.obj.material.uniforms[F].value=G)},setFaceTo(I,F){let G=T.find(ie=>ie.name===I&&ie.kind==="sphere");G&&(G.faceTo=F)},addSky(I,F,G,ie){G.renderOrder=-10,G.frustumCulled=!1;let $=N(I,F,G,new Float64Array(3),{kind:"sky"});return $.frame=ie||null,$},setTrueSize(I){P=!!I},get trueSize(){return P},kmPerPx(){return y.cam.dist/ut},helper:me,onRender:Be,setTime(I){y.t=Math.min(Math.max(I,t.tMin),t.tMax),t.onTime&&t.onTime(y.t,Wt),t.onTimeChange&&t.onTimeChange(y.t)},setMode(I,F=!1){y.sTarget=I==="inertial"?1:0,F&&(y.s=y.sTarget)},setCamera(I){y.fly=null,Object.assign(y.cam,I)},flyTo(I,F,G=Math.min(2,Math.max(1,1+.08*Math.abs(Math.log(F/y.cam.dist))))){y.fly={from:[...Qe()],pos:[...Qe()],to:I,d0:y.cam.dist,d1:F,k:0,dur:G}},pickAt:be,debug:{canvasStats:pe,markerCentroid:Ve,worldOf:Ne,measureFps:St,measureFrameCost:mt,declutter:re,pause(I=!0){y.paused=I},step(I){ke(I),ge()},setPrecision(I){y.precision=I,ge()},setQuality(I,F=!1){d.level=I,d.auto=F,ve(),ge()},enableAutoQuality(I=!0){d.auto=I}}};return Wt}var Nt=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=Oe(r)):s.startsWith("data-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},Ha=[];function Rp(){for(let n of Ha)n()}function Pp(n,e){let t=Ai(n,e);return Ha.push(t._render),t}function Cp(n,e){let t=Pp(n,e);return t.classList.add("layer-tag"),t}function xr(n,e,t){let i=Nt("button",{type:"button",class:"lbl-num"});i.dataset.source=n.provenance.source.map(a=>`${a.file}>${a.key}`).join(" | "),i.dataset.verification=`${n.provenance.verification.tag}/${n.provenance.verification.detail}`;let s=()=>{i.textContent=n.text+(typeof t=="function"?t():t)};s(),Ha.push(s),i.addEventListener("click",a=>{a.stopPropagation(),e.openSource(n)});let r=Nt("span",{class:"lbl-numwrap"},i,Pp(n.provenance.verification,e.table));return r.dataset.source=i.dataset.source,r.dataset.verification=i.dataset.verification,ao(r,n.id,"label"),r}function Ip(n,e,t){let i=n.COLORS,s=n.tokens.scene.lines,r=n.tokens.scene.spheres,a=n.tokens.scene.glow,o=t.constants.mu,l=t.constants.length_unit_km,c=(X,U,...q)=>{let Q=Nt("div",{class:`lbl ${X}`},...q);if(U){Q.dataset.pick=U;let ee=Q.firstChild;ee.classList.add("lbl-name"),ee.addEventListener("click",()=>t.onPick&&t.onPick(U))}return Q},u=n.addMarker("Sun","bodies",[-o,0,0],i.sun,c("lbl-body","Sun",Nt("span",{i18n:"body.sun"})),{hidden:!0,priority:10});n.addSphere("Sun_sphere","bodies",u,t.radii.sun.km,i.sun,{emissive:!0,limb:!0,glow:a.sun,minPx:r.sunMinPx,pick:"Sun"}),n.addMarker("EMB","bodies",[1-o,0,0],i.emb,c("lbl-body","EMB",Nt("span",{i18n:"body.emb"})),{size:n.tokens.scene.points.emb,priority:6});let d={L1:8,L2:9,L3:5,L4:5,L5:5};for(let X of e["stage1.points"].items){let U=c("lbl-lpt",X.id,Nt("b",{"data-meta":""},X.id),xr(X.dist,t," km"));U.dataset.lpt=X.id,n.addMarker(X.id,"lpoints",[X.x,X.y,X.z],i.lpt,U,{priority:d[X.id],glowPx:n.tokens.scene.points.lptGlow??22})}let h=e["stage2.l2_directions"],f=h.origin,m=Math.abs(f[0]-(1-o));for(let X of h.items){let U=X.angle_deg*Math.PI/180,q=.25*m,Q=[f[0]+q*Math.cos(U),f[1]+q*Math.sin(U),0];n.addSegments("dir_"+X.id,"dirs",[f[0]-q*Math.cos(U),f[1]-q*Math.sin(U),0,...Q],X.id==="unstable"?i.unstable:i.stable,s.dir),n.addLabel("dirlabel_"+X.id,"dirs",Q,c("lbl-dir","L2",Nt("span",{i18n:X.id==="unstable"?"l2.unstable":"l2.stable"}),xr(X.num,t,"\xB0")),{priority:3})}let v=e["stage3c.halo_family"],p=n.tokens.scene.familyEvery;for(let X of["\uBD81\uCABD","\uB0A8\uCABD"]){let U=v._arrays[v.family[X].array],[q,Q]=U.shape;for(let ee of["some","all"]){let ue=[];for(let te=0;te<q;te++)(ee==="some"?te%p===0:te%p!==0)&&ue.push(te);let xe=new Float64Array(ue.length*(Q-1)*6),_e=0;for(let te of ue)for(let oe=0;oe<Q-1;oe++)for(let me of[(te*Q+oe)*3,(te*Q+oe+1)*3])xe[_e++]=U.data[me],xe[_e++]=U.data[me+1],xe[_e++]=U.data[me+2];let De=n.addSegments(ee==="some"?"halo_"+X:"halo_rest_"+X,"halo",xe,i.haloFam,s.family,s.familyOpacity);De.familyLine=!0,ee==="all"&&(De.wanted=!1,De.obj.visible=!1,De.familyRest=!0)}}{let X=v._arrays[v.family[v.main.side].array],U=X.shape[1],q=X.data.slice(v.main.index*U*3,(v.main.index+1)*U*3);n.addPolyline("halo_main","halo",q,i.haloMain,s.main),n.addLabel("halo_main_label","halo",Array.from(q.slice(Math.floor(U/4)*3,Math.floor(U/4)*3+3)),c("lbl-orbit","halo_main",Nt("span",{i18n:"l2.halo_main"}),xr(v.main.period,t,()=>` ${Gv(v.main.period.unit)}`)),{priority:7,pick:"halo_main"})}let g=e["stage3b.escape_samples"];for(let X of g.items)n.addPolyline("esc_"+X.\uBC88\uD638,"escape",g._arrays[X.array].data,X.direction_316>0?i.escOut:i.escIn,s.escape);let A=e["stage3.burns"],C={"3-A":i.a3,"3-C":i.c3,"4-C":i.c4};for(let[X,U]of Object.entries(A.runs)){n.addPolyline("traj_"+X,"burns",A._arrays[U.array_traj].data,C[X],s.traj,.7);let q=A._arrays[U.array_pos].data,Q=A._arrays[U.array_dv].data,ee=new Float64Array(q.length*2),ue=3e3/l;for(let xe=0;xe<q.length;xe+=3){let _e=Math.hypot(Q[xe],Q[xe+1],Q[xe+2])||1;ee.set([q[xe],q[xe+1],q[xe+2],q[xe]+ue*Q[xe]/_e,q[xe+1]+ue*Q[xe+1]/_e,q[xe+2]+ue*Q[xe+2]/_e],xe*2)}n.addSegments("dv_"+X,"burns",ee,C[X],s.dv),n.addPoints("burnpts_"+X,"burns",q,C[X])}let y=e["stage4.reference"];n.addPolyline("ref_4C","ref",y._arrays["4C"].data,i.ref4c,s.ref),n.addPolyline("ref_4D","ref",y._arrays["4D"].data,i.ref4d,s.ref);let T=t.screenEph||(()=>{let X=Ms(e).ephem;return{evaluate:U=>X.evaluate(U),tMin:X.tMin}})(),b=t.screenEph?t.screenEph.tMin:T.tMin,w=n.addMarker("Earth","earthmoon",[1-o,0,0],i.earth,c("lbl-body","Earth",Nt("span",{i18n:"body.earth"})),{hidden:!0,priority:7}),x=n.addMarker("Moon","earthmoon",[1-o,0,0],i.moon,c("lbl-body","Moon",Nt("span",{i18n:"body.moon"})),{hidden:!0,priority:4});n.addSphere("Earth_sphere","earthmoon",w,t.radii.earth.km,i.earth,{glow:a.earth,minPx:r.earthMinPx,pick:"Earth",atmosphere:i.atmosphere??7320831,surface:"earth"}),n.addSphere("Moon_sphere","earthmoon",x,t.radii.moon.km,i.moon,{glow:a.moon,minPx:r.moonMinPx,pick:"Moon",surface:"moon"});let M=121,L=30,R=n.addPolyline("moon_trail","earthmoon",new Float64Array(M*3),i.moonTrail,s.trail,1,{fade:!0}),P=(X,U)=>{let q=ii(X.pos[0],X.vel[0],X.pos[3],X.vel[3]),Q=Ji(X.pos[U],q);return[(Q[0]+1-o)*l,Q[1]*l,Q[2]*l]};Vv(n,e,t,c,i,s);let B=[["mercury_bary","Mercury"],["venus_bary","Venus"],["mars_bary","Mars"],["jupiter_bary","Jupiter"],["saturn_bary","Saturn"],["uranus_bary","Uranus"],["neptune_bary","Neptune"]],N={Mercury:11053224,Venus:15256992,Mars:13656634,Jupiter:14201994,Saturn:14929818,Uranus:10475744,Neptune:7048432},H=t.screenEph?t.screenEph.solar():null,j=[];if(H)for(let[X,U]of B){let q=H.bodies.find(ue=>ue.name===X);if(!q)continue;let Q=(i.planets&&i.planets[U])??N[U],ee=n.addMarker(U,"planets",[0,0,0],Q,c("lbl-body",U,Nt("span",{i18n:"body."+U.toLowerCase()})),{hidden:!0,priority:3});n.addSphere(U+"_sphere","planets",ee,q.radius_km,Q,{minPx:r.planetMinPx??4,pick:U}),j.push({key:X,mk:ee})}let Y=null;return t.onTime=X=>{if(X===Y)return;let U=T.evaluate(X),q=Math.max(b,X-L*86400),Q=T.evaluate(q);if(!(!U||!Q)){if(Y=X,t.frameF=ii(U.pos[0],U.vel[0],U.pos[3],U.vel[3]),w.src.set(P(U,1)),x.src.set(P(U,2)),j.length){let ee=ii(U.pos[0],U.vel[0],U.pos[3],U.vel[3]),ue=t.screenEph.solar().chunkFor(X).year;for(let xe of j){let _e=Ji(H.evaluate(xe.key,X,ue).pos,ee);xe.mk.src.set([(_e[0]+1-o)*l,_e[1]*l,_e[2]*l])}}for(let ee=0;ee<M;ee++){let ue=Math.max(b,X-L*86400*(M-1-ee)/(M-1));R.src.set(P(T.evaluate(ue),2),ee*3)}}},{eph:T,toScene:P}}function Vv(n,e,t,i,s,r){let a=e["stage4a.jwst"];if(!a)return;let o=n.tokens.scene.points,l=a._arrays;n.addPoints("jwst_pts","jwst",l.daily.data,s.jwst,o.jwst),n.addPolyline("jwst_interp","jwst",l.interp.data,s.jwst,r.jwstInterp,.85,{dashed:!0}),n.addPolyline("jwst_10m","jwst",l.tenmin.data,s.jwst,r.jwst);let c=Array.from(l.tenmin.data.slice(-3)),u=Nt("small",{class:"lbl-fixed","data-meta":""}),d=()=>{u.textContent=Oe("jwst.marker_fixed",{date:a.marker.text.ko.slice(0,10)}),u.title=document.documentElement.lang==="ko"?a.marker.text.ko:a.marker.text.en};d(),Ha.push(d),n.addMarker("JWST","jwst",c,s.jwst,i("lbl-body lbl-jwst","JWST",Nt("span",{"data-meta":""},"JWST")),{size:o.jwstMarker,priority:8}),n.addLabel("jwst_fixed","jwst",c,Nt("div",{class:"lbl lbl-fixed-wrap"},u),{priority:2}).labelObj.center.set(-.08,-.45);let f=Math.floor(l.daily.data.length/6)*3;n.addLabel("jwst_orbit_label","jwst",Array.from(l.daily.data.slice(f,f+3)),i("lbl-orbit","jwst_period",Nt("span",{i18n:"jwst.orbit_label"})),{priority:2,pick:"jwst_period"});let m=e["stage5.jwst"];if(!m)return;let v=m._arrays,p=m.layers.ext,g=m.layers.phys;for(let[w,x]of Object.entries(p.windows))n.addPolyline("jpl_"+w,"jwst_ext",v[x.array].data,s.extJpl,r.pred);for(let w of p.curves){let x=v[w.array_pos].data;n.addPolyline("mine_"+w.id,"jwst_ext",x,s.extMine,r.traj),n.addPoints("mine_end_"+w.id,"jwst_ext",x.slice(-3),s.extMine,o.predEnd)}let A=v[g.arrays_pos.recon].data,C=v[g.arrays_pos.mine].data;n.addPolyline("recon_R","jwst_phys",A,s.physRecon,r.pred),n.addPolyline("mine_R","jwst_phys",C,s.physMine,r.traj),n.addPoints("mine_end_R","jwst_phys",C.slice(-3),s.physMine,o.predEnd),n.addPolyline("jpl01U_R","jwst_phys",v[g.arrays_pos.jpl].data,s.physJpl,r.traj,1,{dashed:!0});let y=p.items.find(w=>w.id==="jwst_err_range"),T=g.items.find(w=>w.id==="jwst_err_R5"),b=v[p.windows.B.array].data;n.addLabel("jwst_ext_label","jwst_ext",Array.from(b.slice(-3)),i("lbl-pred lbl-ext","JWST",Nt("span",{i18n:"jwst.layer_ext_short"}),Cp(p.verification,t.table),xr(y,t," km")),{priority:6,pick:"JWST"}),n.addLabel("jwst_phys_label","jwst_phys",Array.from(A.slice(-3)),i("lbl-pred lbl-phys","JWST",Nt("span",{i18n:"jwst.layer_phys_short"}),Cp(g.verification,t.table),xr(T,t,()=>` km (${Oe("jwst.rep_5d")})`)),{priority:6,pick:"JWST"}),Hv(n,m,t,s,o,r)}function Hv(n,e,t,i,s,r){let a=e._arrays,o=e.layers.ext,l=e.layers.phys,c=t.constants.length_unit_km,u=(b,w)=>{let x=a[b].data,M=x.length/3,L=w<0?M+w:w;return{arr:b,k:L,p:[x[3*L],x[3*L+1],x[3*L+2]]}},d=(b,w)=>{let x=a[b].data;for(let M=0;M<x.length;M++)if(Math.abs(x[M]-w)<1e-9)return M;return-1},h=(b,w)=>b.items.find(x=>x.id===w),f=(Date.parse(l.window.rep_end.replace(" ","T")+"Z")-Date.parse(l.window.start.replace(" ","T")+"Z"))/864e5,m=[{id:"R5",layer:"jwst_phys",lines:["recon_R","mine_R","mine_end_R","jpl01U_R"],base:{...u(l.arrays_pos.recon,d("days_R",f)),name:"jwst.zl_recon",color:i.physRecon},others:[{...u(l.arrays_pos.mine,d("days_R",f)),name:"jwst.zl_mine_kB",color:i.physMine,item:h(l,"jwst_err_R5"),gap:"jwst.gap_mine_recon"},{...u(l.arrays_pos.jpl,d("days_R_jpl",f)),name:"jwst.zl_jpl01U",color:i.physJpl,item:h(l,"jwst_err_R5_jpl"),gap:"jwst.gap_jpl_recon"}]}];for(let b of["A","B","C"]){let w=o.curves.filter(x=>x.window===b);w.length&&m.push({id:b,layer:"jwst_ext",lines:["jpl_"+b,...w.flatMap(x=>["mine_"+x.id,"mine_end_"+x.id])],base:{...u(o.windows[b].array,-1),name:"jwst.zl_jpl",color:i.extJpl},others:w.map(x=>({...u(x.array_pos,-1),text:x.label,color:i.extMine,item:h(o,"jwst_err_"+x.id),gap:"jwst.gap_mine_jpl"}))})}n.zoomStops={};let v=(b,w)=>[b[0]-w[0],b[1]-w[1],b[2]-w[2]],p=(b,w)=>[b[1]*w[2]-b[2]*w[1],b[2]*w[0]-b[0]*w[2],b[0]*w[1]-b[1]*w[0]],g=b=>{let w=Math.hypot(...b)||1;return b.map(x=>x/w)},A=(b,w)=>(b.zoom=w,b.obj.visible=!1,b.labelObj&&(b.labelObj.visible=!1),b.pick=null,b),C=b=>document.documentElement.lang==="ko"?b.ko:b.en;for(let b of m){if(b.base.k<0||b.others.some(ee=>ee.k<0||!ee.item))continue;let w=[b.base,...b.others],x=[0,1,2].map(ee=>w.reduce((ue,xe)=>ue+xe.p[ee],0)/w.length),M=b.others.map(ee=>Math.hypot(...v(ee.p,b.base.p))*c),L=Math.max(25,4.5*Math.max(...M)),R=a[b.base.arr].data,P=b.base.k,B=R.length/3,N=Math.min(P+1,B-1),H=Math.max(P-1,0),j=g(v(Array.from(R.slice(3*N,3*N+3)),Array.from(R.slice(3*H,3*H+3)))),Y=v(b.others[M.indexOf(Math.max(...M))].p,b.base.p),X=p(j,Y);Math.hypot(...X)<1e-6*Math.hypot(...Y)&&(X=p(j,[0,0,1])),X=g(X),X[2]<0&&(X=X.map(ee=>-ee));let U="zoom_"+b.id;n.anchors[U]=n.ndToKm(x),n.addZoomTarget(U,b.id),n.zoomStops[b.id]={layer:b.layer,cam:{target:U,dist:L,az:Math.atan2(X[1],X[0]),el:Math.asin(X[2])},gapsDrawnKm:M,points:w.map(ee=>ee.p),items:b.others.map(ee=>ee.item.id)},w.forEach((ee,ue)=>A(n.addMarker(`zoompt_${b.id}_${ue}`,b.layer,ee.p,ee.color,null,{size:s.zoomPt}),b.id));let q=new Float64Array(6*b.others.length);b.others.forEach((ee,ue)=>q.set([...b.base.p,...ee.p],6*ue)),A(n.addSegments("zoomgap_"+b.id,b.layer,q,i.zoomGap,r.zoomGap,.9),b.id);let Q=.18*L/c;w.forEach((ee,ue)=>{let xe=a[ee.arr].data,_e=xe.length/3,De=ee.k>0?ee.k-1:Math.min(ee.k+1,_e-1),te=g(v(Array.from(xe.slice(3*De,3*De+3)),ee.p)),oe=ee.p.map((we,Je)=>we+Q*te[Je]),me=ee.text?Nt("span",{class:"lbl-name-only","data-meta":""},C(ee.text)):Nt("span",{class:"lbl-name-only","data-meta":"",i18n:ee.name});ee.text&&Ha.push(()=>{me.textContent=C(ee.text)});let Re=Nt("div",{class:"lbl lbl-zoomline"},me);Re.style.setProperty("--zl-color","#"+ee.color.toString(16).padStart(6,"0")),A(n.addLabel(`zoomname_${b.id}_${ue}`,b.layer,oe,Re,{priority:8}),b.id)}),b.others.forEach((ee,ue)=>{let xe=Nt("div",{class:"lbl lbl-gap"},Nt("span",{class:"lbl-name-only","data-meta":"",i18n:ee.gap}),xr(ee.item,t," km"));xe.dataset.gap=ee.item.id,A(n.addLabel(`zoomgapl_${b.id}_${ue}`,b.layer,ee.p,xe,{priority:9}),b.id)})}let y=Object.fromEntries(m.map(b=>[b.id,new Set(b.lines)])),T=b=>(b.layer==="jwst_ext"||b.layer==="jwst_phys")&&!b.zoom&&b.kind!=="label";n.onZoomChange(b=>{n.setItemsDimmed(T,!1),b&&y[b]&&n.setItemsDimmed(w=>T(w)&&!y[b].has(w.name),!0,.18)})}function Gv(n){return n&&typeof n=="object"?document.documentElement.lang==="ko"?n.ko:n.en:n||""}var Wv=(()=>{let n=document.createElement("div");return n.innerHTML="<svg></svg>",n.firstChild.namespaceURI})(),gi=(n,e={},...t)=>{let i=document.createElementNS(Wv,n);for(let[s,r]of Object.entries(e))i.setAttribute(s,r);return i.append(...t),i},Bt=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=Oe(r)):s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i};function Xv(n,e,t,i){let u=t.days[0],d=t.days[t.days.length-1],h=Math.log10(t.km[0]),f=Math.log10(t.km[t.km.length-1]),m=y=>40+(y-u)/(d-u)*252,v=y=>8+(1-(Math.log10(Math.min(Math.max(y,t.km[0]),t.km[t.km.length-1]))-h)/(f-h))*116,p=gi("svg",{viewBox:"0 0 300 150",width:300,height:150,class:"err-chart",role:"img","aria-label":Tt(n.title)});if(n.outside_from_day!==void 0){let y=m(n.outside_from_day),T=m(n.outside_to_day);p.append(gi("rect",{x:y,y:8,width:T-y,height:116,class:"err-outside"}))}let g=gi("g",{class:"err-axes","data-aux":"tick","data-source":t.source,"data-verification":"display/axis"});for(let y of t.km)g.append(gi("line",{x1:40,x2:292,y1:v(y),y2:v(y),class:"err-grid"})),g.append(gi("text",{x:36,y:v(y)+4,"text-anchor":"end"},t.km_text[t.km.indexOf(y)]));for(let y of t.days)g.append(gi("line",{x1:m(y),x2:m(y),y1:8,y2:124,class:"err-grid"})),g.append(gi("text",{x:m(y),y:138,"text-anchor":"middle"},String(y)));p.append(g);for(let y of n.curves){let T=e[y.array_days].data,b=e[y.array_km].data,w="";for(let x=0;x<T.length;x++)b[x]>0&&(w+=`${w?"L":"M"}${m(T[x]).toFixed(2)},${v(b[x]).toFixed(2)}`);p.append(gi("path",{d:w,class:"err-line",stroke:y.color,"stroke-dasharray":y.dashed?"4 3":"none","data-curve":y.id}));for(let x of y.marks)p.append(gi("circle",{cx:m(x.day),cy:v(x.km),r:2.6,fill:y.color,"data-mark":`${y.id}@${x.day}`}))}let A=Bt("figure",{class:"err-fig","data-layer":i.key});A.append(p);let C=Bt("figcaption",{class:"err-legend","data-meta":""});for(let y of n.curves){let T=Bt("span",{class:"err-swatch"+(y.dashed?" dashed":"")});T.style.borderColor=y.color,C.append(Bt("span",{class:"err-key"},T,document.createTextNode(Tt(y.label))))}return C.append(Bt("span",{class:"err-axis-note",i18n:"jwst.axis_note"})),A.append(C),A}function Lp(n,e,t,i,s){let r=e?Bt("button",{type:"button",id:n,class:"link-btn zoom-btn",i18n:e}):Bt("button",{type:"button",id:n,class:"link-btn zoom-btn"},s);return r.addEventListener("click",()=>t(i)),r}function Dp(n,e,t,i,s,r){let a=Bt("div",{class:"jwst-body"}),o=n["stage5.jwst"];if(!o)return a.append(Bt("p",{class:"note",i18n:"jwst.no_predictions"})),a;for(let c of["ext","phys"]){let u=o.layers[c],d=Bt("section",{class:`jwst-layer jwst-${c}`,"data-layer":c}),h=Bt("h4",{"data-meta":""},Bt("span",{i18n:`jwst.layer_${c}`}),Es(u.verification,e));d.append(h,Bt("p",{class:"desc","data-meta":""},Tt(u.note))),d.append(Xv(u,o._arrays,o.axes,{key:c}));for(let f of u.items){let m=Ri(f,e,t);i.push(m),d.append(m)}if(r){let f=Bt("div",{class:"zoom-row","data-meta":""});if(c==="phys")f.append(Lp("zoom-R5","jwst.zoom_phys",r,"R5"));else{f.append(Bt("span",{i18n:"jwst.zoom_ext"}));for(let m of Object.keys(u.windows))f.append(Lp("zoom-"+m,null,r,m,m))}d.append(f)}a.append(d)}let l=Bt("button",{type:"button",id:"open-period",class:"link-btn",i18n:"jwst.period_button"});return l.addEventListener("click",s),a.append(l),a}function Np(n,e,t,i){let r=n["stage4a.jwst"].period_card,a=Bt("div",{class:"period-body"}),o=Bt("p",{class:"period-class","data-meta":""},Bt("span",{i18n:"jwst.period_class"}),Es(r.verification,e));a.append(o,Bt("p",{class:"desc","data-meta":""},Tt(r.summary)));for(let l of r.items){let c=Ri(l,e,t);i.push(c),a.append(c)}return a.append(Bt("p",{class:"note period-unknown","data-meta":""},Tt(r.unknown))),a}var le=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?i.dataset.i18n=r:s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},gc={all:{target:"bary",dist:42e7,az:-1.5708,el:1.2},emb:{target:"EMB",dist:75e5,az:-1.5708,el:1.1},l2:{target:"L2",dist:32e5,az:-1.2,el:.6},l2zoom:{target:"L2",dist:300,az:-1.2,el:.6},jwst:{target:"L2",dist:29e5,az:-.45,el:.42},solar:{target:"bary",dist:125e8,az:-1.5708,el:1.15}},Up={Sun:["Sun",6e6],EMB:["EMB",25e5],Earth:["Earth",12e4],Moon:["Moon",12e4],L1:["L1",25e5],L2:["L2",32e5],L3:["L3",6e7],L4:["L4",6e7],L5:["L5",6e7],halo_main:["L2",32e5],JWST:["JWST",12e5],jwst_period:["L2",29e5],Mercury:["Mercury",6e6],Venus:["Venus",15e6],Mars:["Mars",1e7],Jupiter:["Jupiter",12e7],Saturn:["Saturn",1e8],Uranus:["Uranus",5e7],Neptune:["Neptune",5e7]},jv=["lpoints","bodies","dirs","earthmoon","halo","escape","burns","ref","jwst","jwst_ext","jwst_phys"],qv=[1,10,30];function Fp(n,e,t){let i=[],s=t.manifest.verification,r=le("button",{type:"button",id:"mode-rot",class:"on",i18n:"l2.mode_rot"}),a=le("button",{type:"button",id:"mode-in",i18n:"l2.mode_inertial"});r.addEventListener("click",()=>{n.setMode("rot"),r.classList.add("on"),a.classList.remove("on")}),a.addEventListener("click",()=>{n.setMode("inertial"),a.classList.add("on"),r.classList.remove("on")});let o=le("div",{class:"ctl-row","data-meta":""},le("span",{class:"ctl-h",i18n:"l2.mode"}),r,a),l=le("div",{class:"ctl-row","data-meta":""},le("span",{class:"ctl-h",i18n:"l2.view"}));for(let de of Object.keys(gc)){let qe=le("button",{type:"button",id:"view-"+de,i18n:"l2.view_"+de});qe.addEventListener("click",()=>n.setCamera({...gc[de]})),l.append(qe)}let c=le("button",{type:"button",id:"true-size",i18n:"view.true_size","aria-pressed":"false"});if(c.title=Oe("view.true_size_title"),c.addEventListener("click",()=>{n.setTrueSize(!n.trueSize),c.setAttribute("aria-pressed",String(n.trueSize)),c.classList.toggle("on",n.trueSize)}),l.append(c),n.zoomStops&&n.zoomStops.R5){let de=le("button",{type:"button",id:"view-jwstzoom",i18n:"l2.view_jwstzoom"});de.addEventListener("click",()=>n.model.onZoom&&n.model.onZoom("R5")),l.append(de)}let u=le("input",{type:"range",id:"time",min:String(n.model.tMin),max:String(n.model.tMax),step:"3600","aria-label":"time"});u.value=String(n.state.t),u.addEventListener("input",()=>n.setTime(Number(u.value)));let d=le("button",{type:"button",id:"play",i18n:"l2.play"}),h=10;d.addEventListener("click",()=>{let de=!n.anim.speedDaysPerSec;n.anim.speedDaysPerSec=de?h:0,d.dataset.i18n=de?"l2.pause":"l2.play",d.textContent=Oe(d.dataset.i18n)});let f=le("select",{id:"speed","aria-label":"speed"});for(let de of qv){let qe=le("option",{value:String(de)});qe.dataset.speed=String(de),f.append(qe)}f.value=String(h),f.addEventListener("change",()=>{h=Number(f.value),n.anim.speedDaysPerSec&&(n.anim.speedDaysPerSec=h)});let m=e["time.utc"],v={t:m._arrays.t_tdb_s.data,u:m._arrays.unix_utc_s.data},p=le("button",{type:"button",id:"date",class:"num"});p.dataset.source="time.utc (results/web) | "+m.provenance.source.map(de=>`${de.file}>${de.key}`).join(" | "),p.dataset.verification=`${m.provenance.verification.tag}/${m.provenance.verification.detail}`;let g=de=>({id:"date",value:de,text:Mr(ti(de,v)),unit:"UTC",label:{ko:"\uD654\uBA74 \uC2DC\uAC01 (UTC)",en:"Displayed time (UTC)"},note:{ko:`TDB ${Xa(de)} (J2000 TDB ${de} \uCD08). UTC = Python \uC774 \uB0B4\uBCF4\uB0B8 \uD558\uB8E8 \uAC04\uACA9 \uD658\uC0B0\uD45C (astropy) \uB97C \uC120\uD615 \uBCF4\uAC04 \u2014 \uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0`,en:`TDB ${Xa(de)} (J2000 TDB ${de} s). UTC = linear interpolation of the daily table exported by Python (astropy) \u2014 browser calculation`},provenance:m.provenance,browser_calc:{tolerance:"1e-3 s (golden utc)"}});p.addEventListener("click",()=>t.openSource(g(n.state.t)));let A=()=>{for(let de of f.options)de.textContent=Oe("l2.speed",{n:de.dataset.speed})},C=()=>{p.textContent=`${Mr(ti(n.state.t,v))} UTC`},y=le("button",{type:"button",id:"t-start",i18n:"time.start"});y.addEventListener("click",()=>n.setTime(n.model.tMin));let T=le("button",{type:"button",id:"t-now",i18n:"time.now"});T.addEventListener("click",()=>n.setTime(Sr(v,Date.now()/1e3)));let b=de=>Mr(ti(de,v)).slice(0,10),w=le("input",{type:"date",id:"date-jump","aria-label":"date"}),x=ti(n.model.tMin,v),M=ti(n.model.tMax,v),L=new Date(Math.ceil(x/86400)*864e5).toISOString().slice(0,10),R=new Date(Math.floor(M/86400)*864e5).toISOString().slice(0,10);w.min=L,w.max=R;let P=le("button",{type:"button",id:"date-go",i18n:"time.go"}),B=le("span",{id:"date-range-note",class:"note",hidden:!0,i18n:"time.out_of_range"}),N=()=>{let de=w.value,qe=!!de&&de>=L&&de<=R;return P.disabled=!qe,B.hidden=!de||qe,qe};w.addEventListener("input",N),P.addEventListener("click",()=>{N()&&n.setTime(Ac(Date.parse(w.value+"T00:00:00Z")/1e3,v))}),P.disabled=!0,w.dataset.range=`${L} ~ ${R}`;let H=le("div",{class:"ctl-row","data-meta":""},le("span",{class:"ctl-h",i18n:"l2.time"}),y,d,T,f,w,P,B,le("span",{id:"ephem-busy-slot"})),j=le("div",{class:"ctl-row slider-row"},u),Y=Ai(m.provenance.verification,s),X=le("div",{class:"ctl-row date-row"},p,Y);X.dataset.source=p.dataset.source,X.dataset.verification=p.dataset.verification,n.model.onTimeChange=de=>{u.value=String(de),C()};let U=le("div",{class:"layers","data-meta":""});for(let de of jv){let qe=le("input",{type:"checkbox",id:"layer-"+de,checked:!0});qe.addEventListener("change",()=>n.setLayer(de,qe.checked)),U.append(le("label",{},qe,le("span",{i18n:"l2.layer_"+de})))}let q=le("input",{type:"checkbox",id:"family-all"});q.addEventListener("change",()=>{for(let de of n.items)de.familyRest&&(de.wanted=q.checked,de.obj.visible=q.checked&&document.getElementById("layer-halo").checked)}),U.append(le("label",{class:"fam"},q,le("span",{i18n:"l2.family_all"})));let Q=le("div",{class:"nums"}),ee=(de,qe,ut=!1)=>{let ht=le("details",{open:ut});ht.append(le("summary",{"data-meta":"",i18n:de}));for(let k of qe){let dt=Ri(k,s,t.openSource);i.push(dt),ht.append(dt)}return Q.append(ht),ht},ue=e["ephem.earth_moon"];ee("l2.g_lpoints",e["stage1.points"].items.map(de=>de.dist),!0),ee("l2.g_dirs",e["stage2.l2_directions"].items.map(de=>de.num),!0),ee("l2.g_halo",[e["stage3c.halo_family"].main.period,e["stage3c.halo_family"].main.zmax],!0),ee("l2.g_annual",e["stage3.burns"].annual,!0),ee("l2.g_ref",e["stage4.reference"].numbers,!0),ee("l2.g_escape",e["stage3b.escape_samples"].items.map(de=>de.t316)).querySelector("summary").after(le("p",{class:"note","data-meta":"",i18n:"l2.escape_rule"}));let _e=n.model.screenEph&&e["m4.ephem"];ee("l2.g_interp",_e&&_e.holdout?[_e.holdout.earth,_e.holdout.moon]:["\uC9C0\uAD6C","\uB2EC"].map(de=>ue.holdout[de]));let De=e["stage5.jwst"],te=e["stage4a.jwst"];De&&(ee("jwst.g_ext",De.layers.ext.items),ee("jwst.g_phys",De.layers.phys.items)),te&&ee("jwst.g_period",te.period_card.items),ee("l2.g_m0",[]).append(document.getElementById("samples"));let me=le("div",{class:"legend"},le("p",{"data-meta":""},Ci(),le("span",{i18n:"l2.legend_spheres"})),le("p",{"data-meta":"",i18n:"l2.legend_markers"}),le("p",{"data-meta":"",i18n:"l2.legend_pulsating"}),le("p",{"data-meta":"",i18n:"l2.legend_inertial"}),le("p",{"data-meta":"",i18n:"l2.legend_jwst"}),le("p",{"data-meta":"",i18n:"l2.legend_jwstzoom"})),Re={};for(let de of e["stage1.points"].items)Re[de.id]=[de.dist];let we=e["stage2.l2_directions"].items.map(de=>de.num),Je=e["stage3c.halo_family"],et=Object.fromEntries(e["stage3.burns"].annual.map(de=>[de.id,de]));Re.L2=[...Re.L2,...we,et.annual_3A,...e["stage3b.escape_samples"].items.map(de=>de.t316)],Re.halo_main=[Je.main.period,Je.main.zmax,et.annual_3C,et.annual_4C,...e["stage4.reference"].numbers],Re.Earth=[_e&&_e.holdout?_e.holdout.earth:ue.holdout.\uC9C0\uAD6C],Re.Moon=[_e&&_e.holdout?_e.holdout.moon:ue.holdout.\uB2EC],Re.Sun=[],Re.EMB=[];for(let de of["Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune"])Re[de]=[];let je={Sun:"body.sun",EMB:"body.emb",Earth:"body.earth",Moon:"body.moon",halo_main:"l2.halo_main",JWST:"body.jwst",jwst_period:"jwst.period_title",Mercury:"body.mercury",Venus:"body.venus",Mars:"body.mars",Jupiter:"body.jupiter",Saturn:"body.saturn",Uranus:"body.uranus",Neptune:"body.neptune"},tt=[],ct=de=>je[de]?Oe(je[de]):de;function Qe(de){let qe=le("div",{class:"card-body"});qe.append(le("h3",je[de]?{i18n:je[de]}:{"data-meta":""},ct(de))),qe.append(le("p",{class:"desc","data-meta":"",i18n:"desc."+de},Oe("desc."+de))),n.items.find(dt=>dt.kind==="sphere"&&dt.pick===de)&&qe.append(le("p",{class:"note","data-meta":""},Ci(),le("span",{i18n:"card.sphere_note"},Oe("card.sphere_note"))));let ht=Re[de]||[];for(let dt of tt)ud(dt);tt.length=0;for(let dt of ht){let at=Ri(dt,s,t.openSource);tt.push(at),qe.append(at)}return de==="JWST"&&qe.append(Dp(e,s,t.openSource,tt,()=>n.model.onPick&&n.model.onPick("jwst_period"),n.zoomStops?dt=>n.model.onZoom&&n.model.onZoom(dt):null)),de==="jwst_period"&&qe.append(Np(e,s,t.openSource,tt)),oo(),ht.length||de==="JWST"||de==="jwst_period"?qe.querySelector(".num-row")||qe.append(le("p",{class:"note",id:"card-numbers-off",i18n:"card.numbers_off"},Oe("card.numbers_off"))):qe.append(le("p",{class:"note",i18n:"card.no_numbers"},Oe("card.no_numbers"))),qe}return{mode:o,views:l,timeHead:H,timeSlider:j,timeDate:X,layers:U,nums:Q,legend:me,rows:i,rerender:()=>{A(),C(),Y._render(),d.textContent=Oe(d.dataset.i18n);for(let de of i)de._render();for(let de of tt)de._render()},dateItem:g,card:Qe,nameOf:ct}}var Op="lagrange.panel",Bp={get(){try{return localStorage.getItem(Op)}catch{return null}},set(n){try{localStorage.setItem(Op,n)}catch{}}};function kp(n,e,...t){let i=le("div",{class:"pop",id:e,hidden:!0,"data-obstacle":""},...t),s=le("button",{type:"button",class:"pop-btn",i18n:n,"aria-expanded":"false"});return s.addEventListener("click",r=>{r.stopPropagation(),i.hidden=!i.hidden,s.setAttribute("aria-expanded",String(!i.hidden))}),{btn:s,pop:i}}function zp(n,e,t,i,s){let r=document.body,a=document.getElementById("top"),o=document.getElementById("panel");a.dataset.obstacle="",document.getElementById("version").dataset.obstacle="",document.getElementById("source").dataset.obstacle="";let l=R=>s.setLabelNumbers(R);s.labelNumbersDefault=n.label.numbers,r.append(s.elements.scalebar,s.elements.help);let c={pick:()=>{},layout:n.layout},u=R=>s.handleKey(R);if(n.layout==="panel"){o.dataset.obstacle="";let R=le("button",{type:"button",id:"panel-toggle",class:"panel-toggle","aria-expanded":"true"}),P=le("div",{class:"panel-inner"},le("h2",{id:"panel-h",i18n:"l2.panel"}),le("div",{class:"ctl"},e.mode,e.views,e.timeHead,e.timeSlider,e.timeDate),e.layers,e.nums,e.legend);o.replaceChildren(R,P);let B=(H,j=!0)=>{r.classList.toggle("panel-collapsed",H),R.setAttribute("aria-expanded",String(!H)),R.dataset.i18n=H?"panel.open":"panel.close",R.textContent=Oe(R.dataset.i18n),j&&Bp.set(H?"collapsed":"open")},N=Bp.get();return B(N?N==="collapsed":i,!1),R.addEventListener("click",()=>B(!r.classList.contains("panel-collapsed"))),c.setCollapsed=B,window.addEventListener("keydown",u),l(n.label.numbers),c}o.hidden=!0;let d=le("aside",{id:"card",class:"card",hidden:!0,"data-obstacle":"","aria-live":"polite"}),h=le("button",{type:"button",class:"close",i18n:"source.close"});h.addEventListener("click",()=>{d.hidden=!0});let f=kp("ui.layers","pop-layers",s.panel()),m=kp("ui.legend","pop-legend",e.legend);if(r.append(d,f.pop,m.pop),n.layout==="minimal"){let R=le("div",{id:"chrome",class:"chrome","data-obstacle":""},le("div",{class:"ctl"},e.mode,e.views,e.timeHead,e.timeSlider,e.timeDate),le("div",{class:"ctl-row","data-meta":""},f.btn,m.btn));r.append(R);let P=le("div",{hidden:!0},e.nums);r.append(P);let B=null,N="",H=j=>{if(j&&j.type==="pointermove"){let Y=`${j.clientX},${j.clientY}`;if(Y===N)return;N=Y}r.classList.remove("ui-idle"),clearTimeout(B),B=setTimeout(()=>{!R.matches(":hover")&&f.pop.hidden&&m.pop.hidden&&r.classList.add("ui-idle")},n.ui.autoHideMs)};r.classList.add("ui-idle");for(let j of["pointermove","pointerdown","keydown","touchstart"])window.addEventListener(j,H,{passive:!0});return c.pick=j=>{d.replaceChildren(h,e.card(j)),zt(d),d.hidden=!1},c.wake=H,window.addEventListener("keydown",u),l(n.label.numbers),c}let v=le("button",{type:"button",id:"all-numbers",i18n:"ui.numbers"}),p=le("div",{class:"menu-body"},e.views,e.mode,le("div",{class:"ctl-row","data-meta":""},f.btn,m.btn,v)),g=le("nav",{id:"menu",class:"menu","data-obstacle":""},p);if(i){let R=le("button",{type:"button",id:"menu-toggle",class:"menu-toggle",i18n:"ui.menu","aria-expanded":"false","aria-controls":"menu"}),P=B=>{g.classList.toggle("collapsed",!B),R.setAttribute("aria-expanded",String(B))};R.addEventListener("click",B=>{B.stopPropagation(),P(g.classList.contains("collapsed"))}),e.views.addEventListener("click",B=>{B.target.closest("button")&&P(!1)}),g.prepend(R),g.classList.add("menu-mobile"),P(!1),c.setMenuOpen=P}let A=le("div",{id:"timebar",class:"timebar","data-obstacle":""},e.timeHead,e.timeSlider,e.timeDate),C=le("aside",{id:"info",class:"info",hidden:!0,"data-obstacle":""}),y=le("button",{type:"button",class:"close",i18n:"source.close"});y.addEventListener("click",()=>{C.hidden=!0});let T=le("details",{class:"all-numbers"},le("summary",{"data-meta":"",i18n:"ui.numbers"}),e.nums),b=null,w=R=>{b=R,C.replaceChildren(y,...R?[e.card(R)]:[],T),T.open=!R,zt(C),C.hidden=!1};s.onChange(()=>{C.hidden||w(b)}),v.addEventListener("click",()=>w(null));let x=le("div",{id:"focus",class:"focus",hidden:!0,"data-meta":"","data-obstacle":"","aria-live":"polite"});r.append(g,A,C,x),d.remove();let M=()=>{let R=g.getBoundingClientRect();x.style.top=r.classList.contains("chrome-hidden")||!R.height?"":`${Math.round(R.bottom+6)}px`};window.addEventListener("resize",M),c.pick=R=>{let P=Up[R];P&&t.flyTo(P[0],P[1]),w(R),x.dataset.name=R,x.textContent=e.nameOf(R),x.hidden=!1,M()};let L=R=>{let P=[le("span",{},Oe("jwst.zoom_focus_"+R))];R!=="R5"&&P.push(le("span",{id:"zoom-norecon",class:"focus-note"},Oe("jwst.zoom_norecon"))),x.replaceChildren(...P)};if(c.renameFocus=()=>{x.dataset.name&&(x.dataset.name.startsWith("zoom:")?L(x.dataset.name.slice(5)):x.textContent=e.nameOf(x.dataset.name))},c.zoom=R=>{let P=t.zoomStops&&t.zoomStops[R];P&&(s.setTemp([P.layer,"n_jwst","n_tags","labels"]),t.setCamera({...P.cam}),x.dataset.name="zoom:"+R,L(R),x.hidden=!1,M())},t.onZoomChange&&t.onZoomChange(R=>{R||(s.clearTemp(),(x.dataset.name||"").startsWith("zoom:")&&(x.hidden=!0,delete x.dataset.name))}),n.layout==="hybrid"){r.classList.add("chrome-hidden");let R=()=>{r.classList.contains("chrome-hidden")&&(r.classList.remove("chrome-hidden"),l(!0))},P=()=>{r.classList.add("chrome-hidden"),C.hidden=!0,l(!1)};document.getElementById("scene").addEventListener("pointerup",R),window.addEventListener("keydown",N=>{u(N)||(N.key==="Escape"?P():R())}),l(!1);let B=c.pick;c.pick=N=>{R(),B(N)},c.reveal=R,c.hide=P}else window.addEventListener("keydown",u),l(n.label.numbers);return c}var vt=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=Oe(r)):s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},Ah=[{id:"bodies",layers:["sun","earth","moon","emb","planets","lpoints"]},{id:"orbits",layers:["halo_main","halo_family","escape","ref","burns","moon_orbit","dirs","jwst","jwst_ext","jwst_phys"]},{id:"numbers",layers:["n_distance","n_period","n_angle","n_annual","n_escape","n_jwst","n_tags"]},{id:"aux",layers:["labels","scale","grid","axes","stars","milkyway","nightlights","sunglow"]}],yc=Ah.flatMap(n=>n.layers),_c=n=>Object.fromEntries(yc.map(e=>[e,n.includes(e)])),xc=Object.fromEntries(Ah.map(n=>[n.id,n.layers])),Yv={clean:_c(["sun","earth","moon","emb","planets","lpoints","halo_main","moon_orbit","jwst","stars","milkyway","nightlights","sunglow"]),explore:_c([...xc.bodies,...xc.orbits,"labels","scale","stars","milkyway","nightlights","sunglow"]),research:_c(yc)},Jv={m1:_c(yc.filter(n=>!["scale","grid","axes","stars","milkyway","nightlights","sunglow"].includes(n)))},Th=["clean","explore","research"],Vp=[["L","labels"],["O","g:orbits"],["N","g:numbers"],["B","g:bodies"],["G","grid"],["1","p:clean"],["2","p:explore"],["3","p:research"],["?","help"]],Hp={sun:n=>n.name==="Sun"||n.name==="Sun_sphere",earth:n=>n.name==="Earth"||n.name==="Earth_sphere",moon:n=>n.name==="Moon"||n.name==="Moon_sphere",emb:n=>n.name==="EMB",planets:n=>n.layer==="planets",lpoints:n=>n.layer==="lpoints",halo_main:n=>n.name==="halo_main"||n.name==="halo_main_label",halo_family:n=>!!n.familyLine,escape:n=>n.layer==="escape",ref:n=>n.layer==="ref",burns:n=>n.layer==="burns",moon_orbit:n=>n.name==="moon_trail",dirs:n=>n.layer==="dirs",jwst:n=>n.layer==="jwst",jwst_ext:n=>n.layer==="jwst_ext",jwst_phys:n=>n.layer==="jwst_phys",grid:n=>n.name==="grid",axes:n=>n.name.startsWith("axes_"),stars:n=>n.name==="stars",milkyway:n=>n.name==="milkyway"},$v=["nightlights","sunglow"],Gp={clean:["jwst"]},Wp="lagrange.layers",Xp={get(){try{return JSON.parse(localStorage.getItem(Wp)||"null")}catch{return null}},set(n){try{localStorage.setItem(Wp,JSON.stringify(n))}catch{}}};function Zv(n){let e=n*110,t=10**Math.floor(Math.log10(e)),i=e/t;return(i>=5?5:i>=2?2:1)*t}var Kv=n=>n>=1?Math.round(n).toLocaleString("en-US"):String(Number(n.toPrecision(1)));function jp(n,e){let t={...Yv,...Jv},i=e.persist?Xp.get():null,s={preset:e.initial,state:{...t[e.initial]},labelNumbers:!0,familyAll:!1,temp:null,zoomOn:!1},r=()=>s.temp?{...s.state,...Object.fromEntries([...s.temp].map(w=>[w,!0]))}:s.state;if(i&&i.state&&typeof i.state=="object"){for(let w of yc)typeof i.state[w]=="boolean"&&(s.state[w]=i.state[w]);s.preset=Th.includes(i.preset)||i.preset==="custom"?i.preset:"custom",s.familyAll=!!i.familyAll}let a=[],o=vt("span",{class:"sb-bar"}),l=vt("span",{class:"sb-text"}),c=vt("div",{id:"scalebar",class:"scalebar",hidden:!0,"data-obstacle":"","data-aux":"tick","data-source":"screen scale (camera distance, field of view \u2014 browser drawing aid)","data-verification":"display/approx"},o,l,Ci()),u="";n.onRender.push(w=>{if(c.hidden)return;let x=w.kmPerPx(),M=Zv(x),L=M/x,R=`${M}|${L.toFixed(1)}`;R!==u&&(u=R,o.style.width=`${L.toFixed(1)}px`,l.textContent=`${Kv(M)} km`,c.dataset.km=String(M))});let d=vt("div",{id:"help",class:"help",hidden:!0,role:"dialog","data-obstacle":"","data-meta":""});function h(){d.replaceChildren(vt("h3",{i18n:"help.title"}),vt("table",{},vt("tbody",{},...Vp.map(([x,M])=>vt("tr",{},vt("th",{},vt("kbd",{},x)),vt("td",{i18n:"key."+M.replace(":","_")}))))),vt("p",{class:"note",i18n:"help.note"}));let w=vt("button",{type:"button",class:"close",i18n:"source.close"});w.addEventListener("click",()=>{d.hidden=!0}),d.prepend(w)}h();function f(){for(let w of n.items)w.familyRest&&(w.wanted=s.familyAll,w.obj.visible=n.wantVisible(w))}function m(){let w=r();for(let[x,M]of Object.entries(Hp))n.setItemsVisible(M,!!w[x]);if(n.setGraphic)for(let x of $v)n.setGraphic(x,!!w[x]);for(let x of new Set(Object.values(Gp).flat()))n.setItemsDimmed(Hp[x],(Gp[s.preset]||[]).includes(x));f(),n.setLabelsVisible(w.labels),hd((x,M)=>!w.n_tags||x!=="n_other"&&!w[x]?!1:M==="label"?w.labels&&(s.labelNumbers||s.zoomOn&&x==="n_jwst"):!0),oo(),c.hidden=!w.scale,u="",e.persist&&Xp.set({preset:s.preset,state:s.state,familyAll:s.familyAll}),document.body.dataset.preset=s.preset,s.temp?document.body.dataset.zoomTemp="":delete document.body.dataset.zoomTemp;for(let x of a)x(s)}function v(w){s.preset=w,s.state={...t[w]},m()}function p(w,x){s.state[w]=x,s.preset="custom",s.temp&&s.temp.delete(w),m()}function g(w){let x=new Set(w.filter(M=>!s.state[M]));s.temp=x.size?x:null,s.zoomOn=!0,m()}function A(){!s.temp&&!s.zoomOn||(s.temp=null,s.zoomOn=!1,m())}function C(w){let x=xc[w],M=x.some(L=>s.state[L]);for(let L of x)s.state[L]=!M,s.temp&&s.temp.delete(L);s.preset="custom",m()}function y(w){s.labelNumbers=w,m()}function T(w){if(w.ctrlKey||w.metaKey||w.altKey)return!1;let x=w.target&&w.target.tagName||"";if(x==="INPUT"||x==="SELECT"||x==="TEXTAREA")return!1;let M=w.key.length===1?w.key.toUpperCase():w.key,L=Vp.find(([P])=>P===M);if(!L)return!1;let R=L[1];return e.mobile&&!R.startsWith("p:")&&R!=="help"?!1:(R==="help"?(d.hidden=!d.hidden,d.hidden||zt(d)):R.startsWith("p:")?v(R.slice(2)):R.startsWith("g:")?C(R.slice(2)):p(R,!s.state[R]),!0)}function b(){let w=vt("div",{class:"layer-panel"}),x=vt("div",{class:"preset-row",role:"group"}),M={};for(let H of Th){let j=vt("button",{type:"button",id:"preset-"+H,i18n:"preset."+H});j.addEventListener("click",()=>v(H)),M[H]=j,x.append(j)}let L=vt("span",{id:"preset-status",class:"preset-status",i18n:"preset.custom"}),R=vt("span",{id:"preset-zoom",class:"preset-status",i18n:"preset.zooming",hidden:!0});x.append(L,R),w.append(x);let P={},B=null;if(!e.mobile){for(let j of Ah){let Y=vt("fieldset",{class:"layer-group","data-meta":""},vt("legend",{i18n:"layer.g_"+j.id}));for(let X of j.layers){let U=vt("input",{type:"checkbox",id:"lay-"+X});U.addEventListener("change",()=>p(X,U.checked)),P[X]=U,Y.append(vt("label",{},U,vt("span",{i18n:"layer."+X}))),X==="halo_family"&&(B=vt("input",{type:"checkbox",id:"lay-family-all"}),B.addEventListener("change",()=>{s.familyAll=B.checked,m()}),Y.append(vt("label",{class:"sub"},B,vt("span",{i18n:"l2.family_all"}))))}j.id==="numbers"&&Y.append(vt("p",{class:"note",i18n:"layer.tags_note"})),w.append(Y)}let H=vt("button",{type:"button",id:"help-btn",class:"help-btn",i18n:"help.button"});H.addEventListener("click",()=>{d.hidden=!d.hidden,d.hidden||zt(d)}),w.append(vt("div",{class:"keys-line","data-meta":""},vt("span",{i18n:"help.keys_line"}),H))}let N=()=>{for(let j of Th)M[j].classList.toggle("on",s.preset===j);L.hidden=s.preset!=="custom",R.hidden=!s.temp;let H=r();for(let[j,Y]of Object.entries(P))Y.checked=!!H[j],Y.parentElement.classList.toggle("temp-on",!!(s.temp&&s.temp.has(j)));for(let j of xc.numbers)P[j]&&j!=="n_tags"&&(P[j].disabled=!H.n_tags);B&&(B.checked=s.familyAll,B.disabled=!s.state.halo_family)};return a.push(N),N(),w}return{get state(){return s.state},get preset(){return s.preset},get labelNumbers(){return s.labelNumbers},get effective(){return r()},get temp(){return s.temp?[...s.temp].sort():[]},applyAll:m,setPreset:v,set:p,toggleGroup:C,setLabelNumbers:y,handleKey:T,panel:b,setTemp:g,clearTemp:A,onChange(w){a.push(w)},elements:{scalebar:c,help:d},rerender(){h()},census:dd}}var qp={name:"default",layout:"panel",css:{"--bg":"#04060c","--fg":"#e7ecf5","--muted":"#a3aec4","--panel":"rgba(12, 18, 32, 0.92)","--line":"#26324c","--impl":"#5aa5ff","--external":"#f0a23b","--physical":"#3fca7f","--approx":"#9aa0aa","--accent":"#5aa5ff","--font":"'Pretendard', system-ui, 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif","--panel-radius":"10px","--panel-blur":"0px","--panel-width":"340px","--btn-bg":"#1b2740","--btn-on":"#2d4a7a","--label-bg":"rgba(12, 18, 32, 0.72)","--label-border":"1px dashed #26324c","--label-radius":"4px","--label-size":"12px","--fs-body":"13px","--fs-small":"12px","--label-min":"12px"},scene:{background:263692,colors:{sun:16765562,emb:8369151,earth:5217791,moon:13620966,lpt:16743129,unstable:16734810,stable:4180607,haloFam:3824266,haloMain:9425919,escOut:15770171,escIn:5822146,a3:13079274,c3:16763755,c4:16747109,ref4c:11583173,ref4d:8440772,moonTrail:7109270,jwst:15255666,extJpl:15770171,extMine:16767392,physRecon:4180607,physMine:11728335,physJpl:3120739,zoomGap:16777215},lines:{main:2.6,family:1,familyOpacity:.35,traj:1.6,dir:2.2,ref:1.8,dv:1.4,trail:1.4,escape:1.8,jwst:1.6,jwstInterp:1.3,pred:2,zoomGap:1.4,dashPx:7,gapPx:5},points:{lpt:9,emb:8,burn:6,jwst:3.5,jwstMarker:9,predEnd:6,zoomPt:10},spheres:{sunMinPx:9,earthMinPx:6,moonMinPx:4},glow:{sun:3.2,earth:1.8,moon:1.4,strength:.55},familyEvery:10},label:{numbers:!0},layers:{initial:"m1",persist:!1}};var Yp={name:"A",layout:"minimal",css:{"--bg":"#000000","--fg":"#f2f4f8","--muted":"#b4bccb","--panel":"rgba(18, 20, 26, 0.72)","--line":"rgba(255, 255, 255, 0.14)","--accent":"#e8ecf4","--panel-radius":"16px","--panel-blur":"18px","--btn-bg":"rgba(255, 255, 255, 0.08)","--btn-on":"rgba(255, 255, 255, 0.22)","--label-bg":"transparent","--label-border":"none","--label-radius":"0","--label-size":"12px"},scene:{background:0,colors:{haloFam:2898514,haloMain:14674175,lpt:16777215,emb:12571903},lines:{main:2.2,family:.8,familyOpacity:.22,traj:1.2,dir:1.6,ref:1.4,dv:1,trail:1.2,escape:1.4},points:{lpt:7,emb:6,burn:5},glow:{sun:4.2,earth:2.4,moon:1.8,strength:.75},familyEvery:15},label:{numbers:!1},ui:{autoHideMs:2600}};var Jp={name:"B",layout:"explore",css:{"--bg":"#02040a","--fg":"#eef3fb","--muted":"#a9b6cc","--panel":"rgba(8, 14, 26, 0.94)","--line":"#2a3a58","--accent":"#4fd1ff","--panel-radius":"8px","--panel-width":"360px","--btn-bg":"#14223a","--btn-on":"#1f4f73","--label-bg":"rgba(6, 12, 24, 0.82)","--label-border":"1px solid #2f4a70","--label-radius":"999px","--label-size":"12px"},scene:{background:132106,colors:{haloFam:2707578,haloMain:5231103,lpt:16747232},lines:{main:3,family:1,familyOpacity:.3,traj:1.8,dir:2.4,ref:2,dv:1.6,trail:1.6,escape:2},glow:{sun:3,earth:1.8,moon:1.4,strength:.6},familyEvery:10},label:{numbers:!0}};var $p={name:"C",layout:"hybrid",css:{"--bg":"#000000","--fg":"#f0f4fa","--muted":"#adb8cb","--panel":"rgba(10, 14, 22, 0.86)","--line":"#2a3650","--accent":"#7fc8ff","--panel-radius":"12px","--panel-blur":"12px","--panel-width":"350px","--btn-bg":"rgba(255, 255, 255, 0.07)","--btn-on":"rgba(127, 200, 255, 0.28)","--label-bg":"rgba(0, 0, 0, 0.45)","--label-border":"none","--label-radius":"6px","--label-size":"12px"},scene:{background:0,colors:{haloFam:2834528,haloMain:12575743},lines:{main:2.6,family:.9,familyOpacity:.26,traj:1.5,dir:2,ref:1.7,dv:1.2,trail:1.3,escape:1.7},glow:{sun:3.8,earth:2.2,moon:1.6,strength:.7},familyEvery:12},label:{numbers:!1},ui:{autoHideMs:0},layers:{initial:"clean",persist:!0}};var Qv="C",Zp={A:Yp,B:Jp,C:$p,PANEL:{name:"panel"}};function Kp(n,e){let t={...n};for(let[i,s]of Object.entries(e||{}))t[i]=s&&typeof s=="object"&&!Array.isArray(s)?Kp(n[i]||{},s):s;return t}function Qp(n){let e=null;try{e=new URLSearchParams(n).get("style")}catch{e=null}let t=e&&Zp[e.toUpperCase()]||Zp[Qv];return Kp(qp,t)}function em(n,e=document.documentElement){for(let[t,i]of Object.entries(n.css))e.style.setProperty(t,i);document.body.classList.add(`layout-${n.layout}`,`style-${n.name}`),document.body.dataset.style=n.name}function tm(n){if(!("serviceWorker"in navigator))return Promise.resolve(null);let e=i=>{i.waiting&&navigator.serviceWorker.controller&&(n.hidden=!1)};n.addEventListener("click",async()=>{let i=await navigator.serviceWorker.getRegistration();i&&i.waiting&&i.waiting.postMessage({type:"SKIP_WAITING"})});let t=!1;return navigator.serviceWorker.addEventListener("controllerchange",()=>{t||!n.dataset.armed||(t=!0,location.reload())}),n.addEventListener("click",()=>{n.dataset.armed="1"},{capture:!0}),navigator.serviceWorker.register("./sw.js").then(i=>(e(i),i.addEventListener("updatefound",()=>{let s=i.installing;s&&s.addEventListener("statechange",()=>{s.state==="installed"&&e(i)})}),i))}function Ch(n,e){let t=n.dirty?` + ${e["version.dirty"]}`:"";return`v${n.version} \xB7 ${n.date} \xB7 ${e["version.commit"]} ${n.commit}${t}`}var nm=null;function im(n){let e=null,t=null,i=null,s=0,r=null,a={};async function o(){if(e)return e;if(t)return t;if(!n.lab)throw new Error("\uC774 \uD310\uC5D0\uB294 \uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uAC00 \uC5C6\uB2E4 (manifest.lab)");return t=(async()=>{for(let d of n.lab.datasets){let h=await es(d.file),f=ni(h,n.verification.details);if(f.errors.length)throw new Error(`${d.id}: ${f.errors.join("; ")}`);h.binary&&(h._arrays=Mi(await Hn(h.binary.file),h.binary.arrays)),h.d24&&(h._forest=await Hn(h.d24.file)),a[d.id]=h}let u=a["m3.lab"];return e=Vr(u,u._arrays,u._forest),e})(),t}function l(){if(i)return i;if(Qi==="embedded"){let u=URL.createObjectURL(new Blob([nm],{type:"text/javascript"}));i=new Worker(u)}else i=new Worker("lab-worker.js");return i.onmessage=u=>{let d=u.data;if(!r||d.id!==r.id)return;if(d.type==="progress"){r.onProgress&&r.onProgress(d);return}let h=r;r=null,d.type==="done"?h.resolve({...d.result,wall_ms:performance.now()-h.t0}):h.reject(new Error(d.message))},i.onerror=u=>{if(r){let d=r;r=null,d.reject(new Error(u.message||"Worker \uC624\uB958"))}},i}function c(u,d={}){if(!e)return Promise.reject(new Error("\uBA3C\uC800 lab.load()"));let h=l();if(r){let m=r;r=null,m.reject(new Error("\uBC84\uB9BC"))}let f=++s;return new Promise((m,v)=>{r={id:f,resolve:m,reject:v,onProgress:d.onProgress,t0:performance.now()},h.postMessage({id:f,params:e.escapeParams(d),s0:Array.from(u),chunk:d.chunk,trajTol:d.trajTol,trajMax:d.trajMax})})}return{load:o,integrate:c,get loaded(){return!!e},get lab(){return e},datasets:a,predict:u=>vs(e,u),predictState:u=>Wc(e,u),components:u=>$i(e,u),stateOf:u=>qa(e,u)}}function Ga(n,e){let t={},i=null;async function s(){if(i)return i;let l=n[e];if(!l)throw new Error(`\uC774 \uD310\uC5D0\uB294 ${e} \uC790\uB8CC\uAC00 \uC5C6\uB2E4`);return i=(async()=>{for(let c of l.datasets){let u=await es(c.file),d=ni(u,n.verification.details);if(d.errors.length)throw new Error(`${c.id}: ${d.errors.join("; ")}`);u.binary&&(u._arrays=Mi(await Hn(u.binary.file),u.binary.arrays)),u.chunks&&(u._chunks={}),t[c.id]=u}return t})(),i}let r={};async function a(l,c){await s();let u=t[l];if(!u||!u.chunks)throw new Error(`${l}: \uC870\uAC01 \uC790\uB8CC\uAC00 \uC544\uB2C8\uB2E4`);if(u._chunks[c])return u._chunks[c];let d=l+":"+c;if(!r[d]){let h=u.chunks.find(f=>f.year===c);if(!h)throw new Error(`${l}: \uC870\uAC01 ${c} \uC5C6\uC74C`);r[d]=Hn(h.file).then(f=>(u._chunks[c]=Mi(f,h.arrays),u._chunks[c]))}return r[d]}async function o(){await s();for(let[l,c]of Object.entries(t))if(c.chunks)for(let u of c.chunks)await a(l,u.year);return t}return{load:s,loadChunk:a,loadAllChunks:o,datasets:t,get loaded(){return Object.keys(t).length>0},available:!!n[e]}}var eb={target:"L2",dist:17e5,az:-1.25,el:.8},tb=300,Rh=900,Xi=2e3,nb={tag:"impl",detail:"implementation"},vc=[{id:"truth",key:"lab.col_truth",src:"m3.lab.json>integrate (core/lab/escape.js DOP853, Worker)"},{id:"T3",key:"lab.col_t3",src:"m3.lab.json>t3 (core/lab/eigen.js lnT3)"},{id:"D24",key:"lab.col_d24",src:"m3.lab.json>d24 (core/lab/forest.js predictD24)"},{id:"MLP",key:"lab.col_mlp",src:"m3.lab.json>mlp (core/lab/mlp.js predictMLP)"},{id:"HYB",key:"lab.col_hybrid",src:"m3.lab.json>d24>w_R (\uD558\uC774\uBE0C\uB9AC\uB4DC = D24, w_R \uBAA8\uB450 0)",only:["research"]},{id:"dT3",key:"lab.col_dt3",src:"core/lab \u2014 ln t_T3 \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"T3"},{id:"dD24",key:"lab.col_dd24",src:"core/lab \u2014 ln t_D24 \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"D24"},{id:"dMLP",key:"lab.col_dmlp",src:"core/lab \u2014 ln t_MLP \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"MLP"},{id:"dir",key:"lab.col_dir",src:"core/lab \u2014 e_u* \uBD80\uD638 \uB300 \uC815\uB2F5 \uC774\uD0C8 \uBC29\uD5A5",only:["research"]}],Wa=n=>{if(!Number.isFinite(n))return"\u2014";let e=Math.exp(n);return e>=100?e.toFixed(1):e>=10?e.toFixed(2):e.toFixed(3)},ib=n=>Number.isFinite(n)?(n>=0?"+":"\u2212")+Math.abs(n).toExponential(1):"\u2014",bc=n=>{if(n===0)return"0";let e=Math.floor(Math.log10(Math.abs(n)));return`${(n/10**e).toFixed(2)}e${e}`};function sm({view:n,labApi:e,layers:t,mobile:i,onOpen:s}){let r=le("aside",{id:"lab",class:"lab",hidden:!0,"data-obstacle":"","aria-live":"polite"}),a=le("button",{type:"button",id:"view-lab",i18n:"l2.view_lab"}),o={v:null,E:null,pred:null,flags:null,truth:null,outside:!1,timer:null,job:0,built:!1,example:null,lastResult:null},l=null;if(i){let S=le("div",{id:"lab-mobile",class:"lab-mobile"},le("p",{i18n:"lab.mobile_note"})),_=le("button",{type:"button",class:"close",i18n:"source.close"});return _.addEventListener("click",()=>{r.hidden=!0}),r.append(_,le("h3",{i18n:"lab.title"}),S),a.addEventListener("click",()=>{r.hidden=!1,zt(r),s&&s()}),{panel:r,button:a,open:async()=>{r.hidden=!1,zt(r)},state:o}}let c=le("button",{type:"button",class:"close",id:"lab-close",i18n:"source.close"}),u=le("div",{id:"lab-status",class:"lab-status","data-meta":"",i18n:"lab.loading"}),d=[],h=()=>{let S=Ai(nb,n.model.table);return d.push(S),S},f=le("div",{class:"lab-scope","data-meta":""},h(),le("span",{i18n:"lab.scope"})),m=le("div",{id:"lab-examples",class:"lab-examples","data-meta":""}),v=le("div",{id:"lab-example-src",class:"lab-note","data-meta":""}),p=le("div",{id:"lab-controls",class:"lab-controls","data-meta":""}),g=le("div",{id:"lab-flags",class:"lab-flags"}),A=le("div",{id:"lab-progress",class:"lab-progress","data-meta":""}),C=le("progress",{id:"lab-bar",max:1,value:0}),y=le("span",{id:"lab-progtext"});A.append(C,y);let T=le("table",{id:"lab-table",class:"lab-table"}),b=le("div",{class:"lab-table-wrap"},T),w=le("div",{id:"lab-foot",class:"lab-note","data-meta":""}),x=le("button",{type:"button",class:"lab-fold",id:"lab-fold","aria-expanded":"true"}),M="lagrange.lab.folded",L={get(){try{return localStorage.getItem(M)==="1"}catch{return!1}},set(S){try{localStorage.setItem(M,S?"1":"0")}catch{}}};function R(S,_=!0){r.dataset.folded=S?"1":"0",x.setAttribute("aria-expanded",S?"false":"true"),x.dataset.i18n=S?"lab.unfold":"lab.fold";try{x.textContent=Oe(x.dataset.i18n)}catch{}_&&L.set(S)}x.addEventListener("click",()=>R(r.dataset.folded!=="1")),R(L.get(),!1),r.append(c,x,le("h3",{i18n:"lab.title"}),f,u,m,v,p,g,A,b,w),c.addEventListener("click",()=>at());let P={};function B(S,_,D,O){let J=le("input",{type:"range",id:"lab-"+S,min:String(_),max:String(D),step:String(O),"aria-label":S}),he=le("span",{class:"lab-val",id:"lab-"+S+"-val"}),fe=le("label",{class:"lab-row"},le("span",{class:"lab-name",i18n:"lab.s_"+S}),J,he);return J.addEventListener("input",()=>Q(S)),J.addEventListener("change",()=>we()),P[S]={input:J,val:he,row:fe},fe}let N=le("button",{type:"button",id:"lab-sign-out",i18n:"lab.sign_out"}),H=le("button",{type:"button",id:"lab-sign-in",i18n:"lab.sign_in"}),j=le("input",{type:"checkbox",id:"lab-outside"}),Y=le("label",{class:"lab-outside",id:"lab-outside-row"},j,le("span",{i18n:"lab.outside"}));function X(){let S=l.sliders,_=o.outside?S.out_factor:1;return{es:S.es_in*_,ap:S.ap_in*_,az:S.az_in*_}}function U(){let S=o.v,_=X(),D=l.sliders;P.eu.input.value=String(Math.round((Math.log10(Math.max(S.eu,1e-300))-D.eu_log10[0])/(D.eu_log10[1]-D.eu_log10[0])*Rh)),P.es.input.value=String(Math.round(S.es/_.es*Xi)),P.ap.input.value=String(Math.round(S.ap/_.ap*Xi)),P.az.input.value=String(Math.round(S.az/_.az*Xi)),P.phip.input.value=String(Math.round(S.phip*180/Math.PI)),P.phiz.input.value=String(Math.round(S.phiz*180/Math.PI)),P.eu.val.textContent=`${bc(S.eu)} \u03B3`,P.es.val.textContent=`${bc(S.es)} \u03B3`,P.ap.val.textContent=`${bc(S.ap)} \u03B3`,P.az.val.textContent=`${bc(S.az)} \u03B3`,P.phip.val.textContent=`${(S.phip*180/Math.PI).toFixed(0)}\xB0`,P.phiz.val.textContent=`${(S.phiz*180/Math.PI).toFixed(0)}\xB0`,N.classList.toggle("on",S.sign>0),H.classList.toggle("on",S.sign<0)}function q(S){let _=Number(P[S].input.value),D=X(),O=l.sliders;return S==="eu"?10**(O.eu_log10[0]+_/Rh*(O.eu_log10[1]-O.eu_log10[0])):S==="phip"||S==="phiz"?_*Math.PI/180:_/Xi*D[S]}function Q(S){o.example=null;let _={...o.v,[S]:q(S)};!o.outside&&S!=="phip"&&S!=="phiz"&&(_=Ur(l,_,S)),o.v=_,U(),me(),Re()}function ee(S){o.example=null,o.v={...o.v,sign:S},U(),me(),Re(),we()}N.addEventListener("click",()=>ee(1)),H.addEventListener("click",()=>ee(-1)),j.addEventListener("change",()=>ue(j.checked));function ue(S){if(o.outside=S&&t.preset==="research",j.checked=o.outside,!o.outside&&o.v&&!o.example){let _=o.v;for(let D of["eu","es","ap","az"])_=Ur(l,_,D);o.v=_}l&&(U(),me(),we())}function xe(){let S=le("tr",{},le("th",{"data-meta":"",i18n:"lab.col_r"}));for(let D of vc){let O=le("th",{class:"c-"+D.id,"data-col":D.id,"data-meta":""},le("span",{i18n:D.key}));D.id!=="dir"&&O.append(h()),S.append(O)}S.append(le("th",{class:"c-flag","data-meta":"",i18n:"lab.col_flag"}));let _=le("tbody");l.R_over_gamma.forEach((D,O)=>{let J=le("tr",{"data-k":String(O)},le("td",{"data-meta":""},`${l.labels[O]} \u03B3`));for(let he of vc){let fe=le("td",{class:"num c-"+he.id,"data-col":he.id,"data-source":he.src,"data-verification":"impl/implementation","data-browser":"1"});J.append(fe)}J.append(le("td",{class:"c-flag","data-col":"flag"})),_.append(J)}),T.replaceChildren(le("thead",{},S),_)}function _e(S,_){return T.querySelector(`tbody tr[data-k="${S}"] td[data-col="${_}"]`)}function De(S,_,D){S.dataset.value=String(_),S.textContent=D}function te(){let S=o.pred,_=o.flags;l.R_over_gamma.forEach((D,O)=>{De(_e(O,"T3"),S.T3[O],Wa(S.T3[O])),De(_e(O,"D24"),S.D24?S.D24[O]:NaN,S.D24?Wa(S.D24[O]):"\u2014"),De(_e(O,"MLP"),S.MLP[O],Wa(S.MLP[O])),De(_e(O,"HYB"),S.D24?S.D24[O]:NaN,S.D24?Wa(S.D24[O]):"\u2014");let J=_e(O,"flag"),he=[];_.inRange||he.push(le("span",{class:"flag flag-extrap",i18n:"lab.flag_extrap"})),_.uncertain[O]&&he.push(le("span",{class:"flag flag-unc",i18n:"lab.flag_unc",title:Oe(_.mismatch[O]?"lab.flag_unc_mismatch":"lab.flag_unc_spread")})),J.replaceChildren(...he),J.dataset.uncertain=_.uncertain[O]?"1":"0"}),g.replaceChildren(..._.inRange?[]:[le("span",{id:"lab-extrap",class:"flag flag-extrap",i18n:"lab.extrap_long"})]),oe(),zt(r)}function oe(){let S=o.truth;l.R_over_gamma.forEach((_,D)=>{if(!S){De(_e(D,"truth"),NaN,"\u2026");for(let he of vc)(he.diff||he.id==="dir")&&De(_e(D,he.id),NaN,"\u2026");return}let O=Math.log(S.t_days[D]);De(_e(D,"truth"),O,Number.isFinite(O)?Wa(O):Oe("lab.no_escape"));for(let he of vc)if(he.diff){let fe=o.pred[he.diff],re=fe?fe[D]-O:NaN;De(_e(D,he.id),re,ib(re))}let J=S.dir[D]===0?null:Math.sign(o.pred.eus)===S.dir[D];De(_e(D,"dir"),J===null?NaN:J?1:0,J===null?"\u2014":Oe(J?"lab.dir_hit":"lab.dir_miss"))})}function me(){o.E=o.example!==null?l.examples[o.example].E.slice():Ja(l,o.v),o.pred=e.predict(o.E),o.flags=xs(l,o.pred),o.truth=null,te()}function Re(){clearTimeout(o.timer),o.timer=null}function we(){Re(),o.timer=setTimeout(et,tb),y.textContent=Oe("lab.waiting")}function Je(){let S=n.model.constants.length_unit_km,_=n.state.cam.dist,D=l.frame.gamma*l.R_over_gamma[l.R_over_gamma.length-1]*S,O=Math.max(.05,(_-D)/_);return n.kmPerPx()*O/n.renderer.getPixelRatio()/S}async function et(){o.timer=null;let S=++o.job,_=l.escapeParams().t_max_days;C.max=_,C.value=0,y.textContent=Oe("lab.integrating"),r.dataset.integrating="1";let D=Je();try{let O=await e.integrate(e.stateOf(o.E),{trajTol:D,onProgress:J=>{S===o.job&&(C.value=J.t_days,y.textContent=Oe("lab.integrating_days",{d:J.t_days.toFixed(0)}))}});if(S!==o.job)return;o.truth=O,o.lastResult=O,o.trajTolUsed=D,o.trajE=o.E,C.value=O.t_reached_days,y.textContent=Oe("lab.done",{ms:O.wall_ms.toFixed(0),n:O.traj?O.traj.n:0}),oe(),tt(O),ct(O),zt(r),r.dataset.integrating="0",r.dataset.done=String(S)}catch(O){if(String(O.message)==="\uBC84\uB9BC")return;y.textContent=Oe("lab.error",{msg:O.message}),r.dataset.integrating="0"}}function je(){let S=l.s_ref,_=l.frame.gamma,D=160;l.R_over_gamma.forEach((O,J)=>{let he=new Float64Array(3*(D+1));for(let fe=0;fe<=D;fe++){let re=2*Math.PI*fe/D;he[3*fe]=S[0]+O*_*Math.cos(re),he[3*fe+1]=S[1]+O*_*Math.sin(re),he[3*fe+2]=S[2]}n.addPolyline("lab_ring_"+J,"lab",he,7109270,1,.55,{dashed:!0})})}function tt(S){if(n.removeItem&&n.removeItem("lab_traj"),!S.traj||S.traj.n<2)return;let _=S.traj.points,D=l.s_ref,O=new Float64Array(_.length);for(let fe=0;fe<_.length;fe+=3)O[fe]=D[0]+_[fe],O[fe+1]=D[1]+_[fe+1],O[fe+2]=D[2]+_[fe+2];let J=S.dir.filter(fe=>fe!==0).pop(),he=J>0?n.COLORS.escOut:J<0?n.COLORS.escIn:13686498;n.addPolyline("lab_traj","lab",O,he,2.2),r.dataset.trajN=String(S.traj.n),n.render()}function ct(S){if(!S.traj||S.traj.n<2||r.hidden||n.state.cam.target!=="L2"||n.state.fly)return;let _=S.traj.points,D=0;for(let ce=0;ce<_.length;ce+=3)D=Math.max(D,Math.hypot(_[ce],_[ce+1],_[ce+2]));if(!(D>0))return;let O=D*n.model.constants.length_unit_km,J=n.camera,he=J.fov*Math.PI/360,fe=Math.atan(Math.tan(he)*J.aspect),re=O/Math.sin(Math.min(he,fe))*1.1;o.fitDist=re,!(Math.abs(Math.log(re/n.state.cam.dist))<.01)&&n.flyTo("L2",re,.8)}let Qe=null,_t=0,de=!1;n.onRender.push(()=>{if(!l||r.hidden||!o.lastResult||de)return;let S=n.state.cam,_=`${S.dist}|${S.target}|${n.state.fly?1:0}`,D=performance.now();if(_!==Qe){Qe=_,_t=D;return}D-_t<250||n.state.fly||o.timer||r.dataset.integrating==="1"||o.trajE!==o.E||!(Je()<o.trajTolUsed/1.5)||qe()});async function qe(){de=!0;let S=Je(),_=o.E;try{let D=await e.integrate(e.stateOf(_),{trajTol:S});if(o.E!==_||r.dataset.integrating==="1")return;o.lastResult={...o.lastResult,traj:D.traj},o.trajTolUsed=S,tt(D),r.dataset.resampled=String((Number(r.dataset.resampled)||0)+1)}catch(D){String(D.message)!=="\uBC84\uB9BC"&&console.warn("\uADA4\uC801 \uB2E4\uC2DC \uBF51\uAE30 \uC2E4\uD328",D)}finally{de=!1}}function ut(){m.replaceChildren(le("span",{class:"ctl-h",i18n:"lab.examples"})),l.examples.forEach((S,_)=>{let D=le("button",{type:"button",class:"lab-ex",id:"lab-ex-"+_,"data-ex":String(_),i18n:"lab.ex_"+S.kind});D.addEventListener("click",()=>ht(_)),m.append(D)})}function ht(S){let _=l.examples[S];o.example=S,o.v=$a(l,_.E),U();for(let D of m.querySelectorAll(".lab-ex"))D.classList.toggle("on",D.dataset.ex===String(S));v.textContent=Oe("lab.ex_src",{no:_.sample_no??"\u2014",src:Ti()==="en"?_.source_en:_.source}),me(),Re(),et()}function k(){let S=t.preset;r.dataset.preset=S,Y.hidden=S!=="research",S!=="research"&&o.outside&&ue(!1),w.replaceChildren(...S==="research"?[le("span",{i18n:"lab.hybrid_note"})]:[],le("span",{i18n:"lab.foot"})),zt(w)}async function dt(){if(r.hidden=!1,s&&s(),n.setCamera({...eb}),n.setLayer("lab",!0),o.built)return k(),o;if(u.hidden=!1,zt(r),l=await e.load(),!l.uncertain||!l.sliders||l.examples.length!==5)throw new Error("\uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uC5D0 uncertain\xB7sliders\xB7examples \uAC00 \uC5C6\uB2E4 (main.py web \uB2E4\uC2DC)");p.replaceChildren(le("div",{class:"lab-row lab-sign"},le("span",{class:"lab-name",i18n:"lab.s_sign"}),N,H),B("eu",0,Rh,1),B("es",-Xi,Xi,1),B("ap",0,Xi,1),B("phip",0,359,1),B("az",0,Xi,1),B("phiz",0,359,1),Y);let S=l.sliders,_=(Math.log10(S.eu_train[0])-S.eu_log10[0])/(S.eu_log10[1]-S.eu_log10[0])*100,D=(Math.log10(S.eu_train[1])-S.eu_log10[0])/(S.eu_log10[1]-S.eu_log10[0])*100;return P.eu.input.style.setProperty("--band-a",_+"%"),P.eu.input.style.setProperty("--band-b",D+"%"),P.eu.input.classList.add("banded"),xe(),ut(),je(),u.hidden=!0,o.built=!0,t.onChange(k),k(),ht(l.examples.findIndex(O=>O.kind==="q50")),o}function at(){r.hidden=!0,Re(),n.setLayer("lab",!1)}return a.addEventListener("click",()=>{dt().catch(S=>{u.hidden=!1,u.textContent=Oe("lab.error",{msg:S.message})})}),{panel:r,button:a,open:dt,close:at,state:o,rerender(){for(let S of d)S._render();if(o.example!==null&&l){let S=l.examples[o.example];v.textContent=Oe("lab.ex_src",{no:S.sample_no??"\u2014",src:Ti()==="en"?S.source_en:S.source})}},get lab(){return l},slide(S,_,D=!0){P[S].input.value=String(_),Q(S),D&&we()},useExample:ht,setOutside:ue}}var sb=["sun","earth","moon","emb"];function rm(n,e=()=>{}){let t=null,i=null,s=new Set;async function r(){return await n.load(),t=n.datasets["m4.ephem"],i=Ar(t,{}),c}function a(u){return i.chunkFor(u).year}function o(u){i.hasChunk(u)||s.has(u)||(s.add(u),e(!0),n.loadChunk("m4.ephem",u).then(d=>{i.hasChunk(u)||i.addChunk(u,d),s.delete(u),e(s.size>0)}).catch(d=>{s.delete(u),e(s.size>0),console.warn("\uCC9C\uCCB4\uB825 \uC870\uAC01 \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",u,d)}))}async function l(u){let d=a(u);if(!i.hasChunk(d))for(o(d);!i.hasChunk(d);)await new Promise(h=>setTimeout(h,10))}let c={init:r,ensure:l,get range(){return t.range_tdb_s},get tMin(){return t.range_tdb_s[0]},get tMax(){return t.range_tdb_s[1]},ready:u=>i.hasChunk(a(u)),loadedYears:()=>t.chunks.map(u=>u.year).filter(u=>i.hasChunk(u)),evaluate(u){let d=a(u);if(!i.hasChunk(d))return o(d),null;let h=[],f=[];for(let m of sb){let v=i.evaluate(m,u,d);h.push(v.pos),f.push(v.vel)}return{pos:h,vel:f}},solar:()=>i};return c}var Sc={startPx:160,releasePx:80,holdMs:2e3};function am(n,e={}){let t={},i=[],s=e.mobile?"mobile":e.single?"single":null;function r(h){return s||(globalThis.__LAGRANGE_TEX2K?"test2k":h.hi?h.hiPx&&n.maxTextureSize()<Math.max(...h.hiPx)?"maxTextureSize "+n.maxTextureSize():n.qualityAllowsHiTex()?null:"quality":"no_hi")}async function a(h){let f={...h,level:null,pending:null,hiTex:null,loTex:null,px:0,belowSince:null,loads:0,releases:0,last_upload:null,steps:[],blocked:null,hiBitmap:null};t[h.id]=f,i.push(f);let m=performance.now(),v=await h.lo(),p=[v.width,v.height];return f.loTex=n.makeTexture(v,{mipmaps:h.mipmaps!==!1,wrapS:h.wrapS}),n.renderer.initTexture(f.loTex),v.close&&v.close(),h.apply(f.loTex,"2k"),f.level="2k",f.steps.push({level:"2k",ms:performance.now()-m,px:p}),f}function o(h){let f={cancelled:!1,stream:null};h.pending=f,(async()=>{let m=performance.now(),v=await h.hi();if(f.cancelled){v.close&&v.close();return}let p=performance.now()-m,g={mipmaps:h.mipmaps!==!1,wrapS:h.wrapS,anisotropy:n.renderer.capabilities.getMaxAnisotropy()};f.stream=globalThis.__LAGRANGE_TILES===!1?Ep(n.renderer,v,g):Tp(n.renderer,v,{...g,nx:4,ny:2,border:8});let A=await f.stream.promise;if(v.close&&v.close(),f.cancelled){A.dispose();return}h.hiTex=A,h.pending=null,h.level="8k",h.loads++,h.apply(A,"8k");let C=f.stream.state;h.last_upload={tiled:!!A.isTiled,allocs:C.allocs?C.allocs.map(y=>Math.round(y.ms*10)/10):null,decode_ms:p,alloc_ms:C.alloc_ms??null,chunks:C.chunks.length,chunk_max_ms:Math.max(...C.chunks.map(y=>y.ms)),chunk_ms:C.chunks.map(y=>[y.level,Math.round(y.ms*10)/10,Math.round(y.at)]),blits:C.blits.length,blit_max_ms:C.blits.length?Math.max(...C.blits.map(y=>y.ms)):0,fence_waits:C.fence_waits,decode_at:[Math.round(m),Math.round(m+p)],total_ms:performance.now()-m,px:[C.w,C.h],levels:C.levels},h.steps.push({level:"8k",ms:performance.now()-m,px:[C.w,C.h]})})().catch(m=>{console.warn("8K \uADF8\uB9BC \uC62C\uB9AC\uAE30 \uC2E4\uD328",h.id,m),h.pending=null,h.blocked=String(m)})}function l(h){h.pending&&(h.pending.cancelled=!0,h.pending.stream&&h.pending.stream.cancel(),h.pending=null),h.hiTex&&(h.apply(h.loTex,"2k"),h.hiTex.dispose(),h.hiTex=null,h.releases++),h.level="2k"}function c(){let h=performance.now();for(let f of i)if(f.level){if(f.blocked=r(f),f.blocked){(f.hiTex||f.pending)&&l(f);continue}f.px=f.sphere?n.sphereScreenPx(f.sphere):1/0,f.px>=Sc.startPx?(f.belowSince=null,!f.hiTex&&!f.pending&&o(f)):f.px<Sc.releasePx&&(f.hiTex||f.pending)?f.belowSince===null?f.belowSince=h:h-f.belowSince>=Sc.holdMs&&(l(f),f.belowSince=null):f.belowSince=null}}n.onRender.push(c);function u(h,f,m=6e4){return new Promise((v,p)=>{let g=performance.now(),A=()=>{let C=t[h];C&&C.level===f&&!C.pending?v(d()[h]):performance.now()-g>m?p(new Error(`${h} ${f} \uAE30\uB2E4\uB9BC \uC2DC\uAC04 \uB118\uC74C (${C&&C.level})`)):setTimeout(A,50)};A()})}function d(){let h={};for(let f of i)h[f.id]={level:f.level,pending:!!f.pending,px:f.px,loads:f.loads,releases:f.releases,blocked:f.blocked,last_upload:f.last_upload,steps:f.steps};return h}return{add:a,tick:c,slots:t,snapshot:d,waitLevel:u,rule:Sc,gpuTextures:()=>n.renderer.info.memory.textures}}var Ph={};async function yr(n,e={}){Ph[n]||(Ph[n]=Hn(n).then(i=>new Blob([i],{type:"image/webp"})));let t=await Ph[n];return createImageBitmap(t,{imageOrientation:"from-image",premultiplyAlpha:"none",colorSpaceConversion:"none",...e})}function om(n,e,t,i){let s=Qi==="embedded",r=am(t,{mobile:i,single:s}),a={moon:null,steps:[],gpu_bytes:0,skipped8k:i?"mobile":s?"single":null,lod:null};t.onRender.push(()=>{let l=r.slots.earth_day;l&&(a.earth=l.level);let c=r.slots.moon;if(c&&a.moon!==c.level){a.moon=c.level,c.level==="8k"&&!a.steps.some(d=>d.moon==="8k")&&a.steps.push({moon:"8k",ms:c.steps[c.steps.length-1].ms,px:c.steps[c.steps.length-1].px});let u=c.level==="8k"?(c.last_upload||{}).px||[8192,4096]:c.steps[0].px;a.gpu_bytes=u[0]*u[1]*4*4/3}});async function o(){if(!e.available)return a;let c=(await e.load())["m4.textures"];if(!c||!c.moon)return a;if(c.orient&&c._arrays){let d=Wr(c);a.orient=d,t.setSphereOrient("Moon_sphere",h=>d.moon(h)),c.earth&&c.earth.earth_day&&t.setSphereOrient("Earth_sphere",h=>d.earth(h))}else t.setFaceTo("Moon_sphere","Earth");let u=await r.add({id:"moon",sphere:"Moon_sphere",lo:()=>yr(c.moon.lo.file),hi:()=>yr(c.moon.hi.file),hiPx:c.moon.hi.size_px,apply:(d,h)=>t.setSphereMap("Moon_sphere",d,h)});if(c.earth&&c.earth.earth_day){for(let[d,h]of[["earth_day","map"],["earth_night","nightMap"]]){let f=c.earth[d];await r.add({id:d,sphere:"Earth_sphere",lo:()=>yr(f.lo.file),hi:()=>yr(f.hi.file),hiPx:f.hi.size_px,apply:(m,v)=>t.setSphereMap("Earth_sphere",m,v,h)})}a.earth="2k"}return a.moon="2k",a.gpu_bytes=u.steps[0].px[0]*u.steps[0].px[1]*4*4/3,a.steps.push({moon:"2k",ms:u.steps[0].ms,px:u.steps[0].px}),!a.skipped8k&&t.maxTextureSize()<c.moon.hi.size_px[0]&&(a.skipped8k="maxTextureSize "+t.maxTextureSize()),a}return{run:o,state:a,lod:r}}var lm=5e10,ji=[[-.4,[.61,.69,1]],[0,[.79,.84,1]],[.4,[.97,.97,1]],[.6,[1,.96,.91]],[.8,[1,.91,.8]],[1.2,[1,.82,.63]],[1.6,[1,.73,.46]],[2,[1,.62,.35]]];function rb(n){if(n<=ji[0][0])return ji[0][1];for(let e=1;e<ji.length;e++)if(n<=ji[e][0]){let[t,i]=ji[e-1],[s,r]=ji[e],a=(n-t)/(s-t);return i.map((o,l)=>o+a*(r[l]-o))}return ji[ji.length-1][1]}function cm(n,e,t){let i=e._arrays,s=i.dir.data,r=i.mag.data,a=i.ci.data,o=t?e.mag_limit_mobile:e.mag_limit,l=[];for(let p=0;p<r.length;p++)r[p]<=o&&l.push(p);let c=new Float32Array(l.length*3),u=new Float32Array(l.length*3),d=new Float32Array(l.length);l.forEach((p,g)=>{for(let y=0;y<3;y++)c[3*g+y]=s[3*p+y]*lm;let A=rb(a[p]),C=Math.min(1,.35+.65*Math.max(0,(o-r[p])/(o+1.5)));u.set(A.map(y=>y*C),3*g),d[g]=Math.min(9,1.2+2.4*Math.max(0,6.5-r[p])**.8)});let h=new Gt;h.setAttribute("position",new Ht(c,3)),h.setAttribute("color",new Ht(u,3)),h.setAttribute("psize",new Ht(d,1));let f=new Dt({uniforms:{pr:{value:n.renderer.getPixelRatio()}},vertexShader:["attribute float psize; varying vec3 vC; uniform float pr;","#include <common>","#include <logdepthbuf_pars_vertex>","void main() { vC = color; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = psize * pr;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["varying vec3 vC;","#include <common>","#include <logdepthbuf_pars_fragment>","void main() {","#include <logdepthbuf_fragment>","vec2 q = gl_PointCoord - 0.5; float r = length(q) * 2.0; if (r > 1.0) discard;","float a = smoothstep(1.0, 0.0, r); gl_FragColor = vec4(vC * a, a); }"].join(`
`),vertexColors:!0,transparent:!0,depthTest:!1,depthWrite:!1,blending:pi}),m=new Ui(h,f),v=n.addSky("stars","sky",m,p=>{f.uniforms.pr.value=p.renderer.getPixelRatio()});return v.count=l.length,v}function um(n,e){let t=e.gal_to_ecl,i=new Ze().set(t[0][0],t[1][0],t[2][0],t[0][1],t[1][1],t[2][1],t[0][2],t[1][2],t[2][2]),s=new Dt({uniforms:{...Va("map"),Gt:{value:i},gain:{value:0}},vertexShader:["varying vec3 vD;","#include <common>","#include <logdepthbuf_pars_vertex>","void main() { vD = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:[za("map",!0),"uniform mat3 Gt; uniform float gain; varying vec3 vD;","#include <common>","#include <logdepthbuf_pars_fragment>","void main() {","#include <logdepthbuf_fragment>","vec3 g = normalize(Gt * normalize(vD));","float l = atan(g.y, g.x); float b = asin(clamp(g.z, -1.0, 1.0));","vec2 uv = vec2(0.5 - l / (2.0 * PI), 0.5 - b / PI);","gl_FragColor = vec4(map_sample(uv).rgb * gain, 1.0);","#include <colorspace_fragment>","}"].join(`
`),side:Kt,depthTest:!1,depthWrite:!1}),r=new qt(new Oi(lm*1.02,96,48),s),a=n.addSky("milkyway","sky",r);return a.renderOrder=-20,r.renderOrder=-20,a.level=null,a.setTexture=(o,l)=>{o.isTiled||(o.magFilter=Ct),mc(s.uniforms,"map",o),s.uniforms.gain.value=n.tokens.scene.milkyWayGain??.1,a.level=l,a.px=[o.image.width,o.image.height]},a}async function hm(n,e,t,i,s){let r=e.variants,a=r.hi.level||"4k_lossless",o=await i.add({id:"milkyway",sphere:null,mipmaps:!1,wrapS:qs,lo:()=>s(r.lo.file),hi:()=>s(r.hi.file),hiPx:r.hi.size_px,apply:(u,d)=>n.setTexture(u,d==="8k"?a:"2k")}),l=[{level:"2k",ms:o.steps[0].ms}];if(i.tick(),o.blocked)return{level:"2k",steps:l,skipped:o.blocked,hi:Promise.resolve({level:"2k",steps:l,skipped:o.blocked})};let c=i.waitLevel("milkyway","8k",6e5).then(()=>({level:n.level,steps:[...l,{level:n.level,ms:o.steps[o.steps.length-1].ms,upload:o.last_upload}]}));return{level:"2k",steps:l,hi:c}}var Mc=He;function Ih(n,e){let t=document.getElementById("error");t.textContent=Oe(n,{msg:e}),t.hidden=!1}function dm(){let n=document.getElementById("version");n.textContent=Ch(Mc,Xr[Ti()]),document.title=Oe("app.title")}async function ab(){let n=Qp(location.search);em(n),Jc(),zt(),dm();let e,t={};try{e=await es("manifest.json");let M=Er(e);if(M.length){Ih("error.schema",M.join("; "));return}for(let L of e.datasets){let R=await es(L.file),P=ni(R,e.verification.details);if(P.errors.length){Ih("error.schema",`${L.id}: ${P.errors.join("; ")}`);return}for(let B of P.warnings)console.warn(L.id,B);R.binary&&(R._arrays=Mi(await Hn(R.binary.file),R.binary.arrays)),t[L.id]=R}}catch(M){Ih("error.load",M.message);return}let i=e.verification;vd(i,()=>Ch(Mc,Xr[Ti()])),xd(t["stage4a.jwst"]&&t["stage4a.jwst"].join);let s=t["m0.tag_samples"].items.map(M=>Ri(M,i,co));document.getElementById("samples").replaceChildren(...s);let r=Ga(e,"solar"),a=Ga(e,"sky"),o=Ga(e,"m1test"),l=t["time.utc"],c={t:l._arrays.t_tdb_s.data,u:l._arrays.unix_utc_s.data},u=document.getElementById("ephem-busy"),d=null,h,f;if(r.available)d=rm(r,M=>{u&&(u.hidden=!M)}),await d.init(),h=d.tMin,f=d.tMax;else{let M=t["ephem.earth_moon"]._arrays.t.data;h=M[0],f=M[M.length-1]}let m=Math.min(Math.max(Sr(c,Date.now()/1e3),h),f);d&&(await d.ensure(m),await d.ensure(Math.max(h,m-30*86400)));let v={constants:e.constants,thetaEpoch:e.scene.theta_epoch_tdb_s,thetaOffset:e.scene.theta_offset_rad,radii:e.scene.radii_km,table:i,screenEph:d,tMin:h,tMax:f,tStart:m,openSource:co},p=Eh(),g=Ap(document.getElementById("scene"),document.getElementById("labels"),v,n);Ip(g,t,v);let A=Fp(g,{...t,...r.datasets},{manifest:e,openSource:co}),C=jp(g,{initial:n.layers.initial,persist:n.layers.persist,mobile:p}),y=zp(n,A,g,p,C);C.applyAll(),v.onPick=M=>y.pick(M),v.onZoom=M=>y.zoom(M),g.setCamera({...gc.l2}),zt(),A.rerender(),g.render(),zt(),so(()=>{dm();for(let M of s)M._render();A.rerender(),Rp(),bd(),C.rerender(),y.renameFocus&&y.renameFocus(),b&&b.rerender&&b.rerender()}),document.getElementById("lang").addEventListener("click",()=>$c(Ti()==="ko"?"en":"ko"));let T=im(e),b=e.lab?sm({view:g,labApi:T,layers:C,mobile:p,onOpen:()=>{y.reveal&&y.reveal();let M=document.getElementById("info");M&&(M.hidden=!0)}}):null;b&&(A.views.append(b.button),document.body.append(b.panel),zt()),window.lagrange={core:ws,build:Mc,loaderMode:Qi,manifest:e,datasets:t,i18n:Zc,view:g,tokens:n,layout:y,layers:C,lab:T,labUi:b,solar:r,sky:a,m1test:o,screenEph:d,debug:{...g.debug,context:()=>Ms({...t,...T.datasets,...r.datasets,...a.datasets,...o.datasets,...w.datasets})}};let w=Ga(e,"textures"),x=om(e,w,g,p);if(window.lagrange.textures=x,window.lagrange.texGroup=w,window.lagrange.texturesDone=x.run().catch(M=>(console.warn("\uD45C\uBA74 \uADF8\uB9BC \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",M),x.state)),window.lagrange.skyDone=(async()=>{if(!a.available)return null;let M=await a.load(),L=cm(g,M["m5.stars"],p),R=um(g,M["m5.milkyway"]);C.applyAll();let P=document.getElementById("credits"),B=()=>{let Y=C.state.stars||C.state.milkyway;P.hidden=!Y,P.replaceChildren(document.createTextNode(Oe("sky.credits_stars")+" \xB7 "+Oe("sky.credits_mw")+" "),Ci(),document.createTextNode(" \xB7 "+Oe("sky.credits_moon")+" \xB7 "+Oe("sky.credits_horizons")))};B(),P.style.cursor="pointer",P.title=Oe("credits.open"),P.addEventListener("click",()=>Qc(()=>Md(Ci))),C.onChange(B),so(B);let N=await hm(R,M["m5.milkyway"],p,x.lod,yr);window.lagrange.skyHiDone=N.hi.then(Y=>({stars:L.count,milkyway:Y}));let{hi:H,...j}=N;return{stars:L.count,milkyway:j}})().catch(M=>(console.warn("\uD558\uB298 \uBC30\uACBD \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",M),null)),Qi==="fetch"&&!Mc.dev)try{await tm(document.getElementById("update"))}catch(M){console.warn("\uC11C\uBE44\uC2A4 \uC6CC\uCEE4 \uB4F1\uB85D \uC2E4\uD328",M)}document.body.dataset.ready="1"}ab();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
