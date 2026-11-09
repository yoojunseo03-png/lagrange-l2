var xm=Object.defineProperty;var Pc=(n,e)=>{for(var t in e)xm(n,t,{get:e[t],enumerable:!0})};var He={version:"0.0.0",date:"2026-11-09",commit:"a7bcf23",dirty:!1,dev:!1};var Ms={};Pc(Ms,{KINDS:()=>Vh,SCHEMA:()=>Nc,SCHEMA_VERSION:()=>wr,SECONDS_PER_DAY:()=>zh,blendPosition:()=>Yi,chunkFor:()=>Bc,decodeBinary:()=>wi,eclLonLat:()=>vm,eraFromDu:()=>rd,formatTDB:()=>Za,formatUTC:()=>Mr,galToEcl:()=>Oc,inertialToRot:()=>Lc,instantLagrange:()=>kc,lab:()=>Hr,littleEndian:()=>Gh,makeContext:()=>Ss,makeHermiteGroup:()=>Tr,makeOrient:()=>Wr,makeSolarEphem:()=>Ar,makeUnits:()=>Ic,mul:()=>Ei,nowNodeTdb:()=>Sr,pulsatingAxes:()=>ii,rotAngle:()=>oo,rotToInertial:()=>vr,rotateMany:()=>br,rotationAngle:()=>Ji,runGolden:()=>od,segmentIndex:()=>Si,starAt:()=>Fc,tdbToUnix:()=>ti,toPulsatingMany:()=>Uc,toPulsatingPos:()=>$i,transpose:()=>tu,unixToTdb:()=>Dc,validateDataset:()=>ni,validateManifest:()=>Er});var zh=86400;function Ic({length_km:n,time_days:e}){let t=e*86400,i=n/t*1e3;return{length_km:n,time_days:e,time_s:t,velocity_m_s:i,nd_to_km:s=>s*n,km_to_nd:s=>s/n,nd_to_days:s=>s*e,days_to_nd:s=>s/e,nd_to_m_s:s=>s*i,m_s_to_nd:s=>s/i}}function vr(n,e){let[t,i,s,r,a,o]=n,l=Math.cos(e),c=Math.sin(e),u=r-i,d=a+t;return[l*t-c*i,c*t+l*i,s,l*u-c*d,c*u+l*d,o]}function Lc(n,e){let[t,i,s,r,a,o]=n,l=Math.cos(e),c=Math.sin(e),u=l*t+c*i,d=-c*t+l*i,h=l*r+c*a,f=-c*r+l*a;return[u,d,s,h+d,f-u,o]}function Yi(n,e,t){let[i,s,r]=n,a=t*e,o=Math.cos(a),l=Math.sin(a);return[o*i-l*s,l*i+o*s,r]}function br(n,e,t){let i=Math.cos(e),s=Math.sin(e);for(let r=0;r<n.length;r+=3){let a=n[r],o=n[r+1];t[r]=i*a-s*o,t[r+1]=s*a+i*o,t[r+2]=n[r+2]}return t}function Ji(n,e){return n/e}function Si(n,e){let t=0,i=n.length;for(;t<i;){let s=t+i>>1;n[s]<=e?t=s+1:i=s}return Math.min(Math.max(t-1,0),n.length-2)}function ti(n,e){let t=e.t,i=e.u;if(!(n>=t[0]&&n<=t[t.length-1]))throw new RangeError("UTC \uD658\uC0B0\uD45C \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01");let s=Si(t,n);return i[s]+(n-t[s])/(t[s+1]-t[s])*(i[s+1]-i[s])}function Sr(n,e){let t=n.u;return e<t[0]?n.t[0]:e>=t[t.length-1]?n.t[t.length-1]:n.t[Si(t,e)]}function Dc(n,e){let t=e.t,i=e.u;if(!(n>=i[0]&&n<=i[i.length-1]))throw new RangeError("UTC \uD658\uC0B0\uD45C \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01");let s=Si(i,n);return t[s]+(n-i[s])/(i[s+1]-i[s])*(t[s+1]-t[s])}function Mr(n){return new Date(Math.floor(n/60)*6e4).toISOString().slice(0,16).replace("T"," ")}function Za(n){let e=Date.UTC(2e3,0,1,12,0,0);return new Date(e+Math.round(n)*1e3).toISOString().slice(0,19).replace("T"," ")}var Nc="lagrange-web",wr="1.0.0",Vh=["points","vectors","trajectory","ensemble","ephemeris","grid2d","scalars","stars","image","model"],Mi=n=>n!==null&&typeof n=="object"&&!Array.isArray(n),Ka=n=>parseInt(String(n).split(".")[0],10),Hh=n=>typeof n=="string"&&n.split(".").length===3;function Er(n){let e=[];if(!Mi(n))return["manifest \uAC00 \uAC1D\uCCB4\uAC00 \uC544\uB2D8"];n.schema!==Nc&&e.push(`schema \uAC00 ${Nc} \uAC00 \uC544\uB2D8`);let t=n.schema_version;Hh(t)?Ka(t)!==Ka(wr)&&e.push(`\uC8FC \uBC88\uD638 \uB2E4\uB984 (${t}, \uC77D\uB294 \uCABD ${wr})`):e.push("schema_version \uD615\uC2DD (\uC8FC.\uBD80.\uC218) \uC544\uB2D8");let i=n.constants;if(!Mi(i))e.push("constants \uC5C6\uC74C");else for(let r of["mu","length_unit_km","time_unit_days"])typeof i[r]=="number"&&i[r]>0||e.push(`constants.${r} \uAC00 \uC591\uC218\uAC00 \uC544\uB2D8`);let s=n.datasets;if(!Array.isArray(s))e.push("datasets \uAC00 \uBAA9\uB85D\uC774 \uC544\uB2D8");else{let r=s.map(a=>Mi(a)?a.id:null);new Set(r).size!==r.length&&e.push("datasets id \uC911\uBCF5");for(let a of s)(!Mi(a)||typeof a.id!="string"||typeof a.file!="string")&&e.push("datasets \uD56D\uBAA9\uC5D0 id\xB7file \uC5C6\uC74C")}return e}function ni(n,e){let t=[],i=[];if(!Mi(n))return{errors:["\uC790\uB8CC\uAC00 \uAC1D\uCCB4\uAC00 \uC544\uB2D8"],warnings:i};let s=n.schema_version;Hh(s)?Ka(s)!==Ka(wr)&&t.push(`\uC8FC \uBC88\uD638 \uB2E4\uB984 (${s}, \uC77D\uB294 \uCABD ${wr})`):t.push("schema_version \uD615\uC2DD (\uC8FC.\uBD80.\uC218) \uC544\uB2D8"),typeof n.id!="string"&&t.push("id \uC5C6\uC74C"),Vh.includes(n.kind)||i.push(`\uBAA8\uB974\uB294 kind: ${JSON.stringify(n.kind)}`);let r=n.provenance;if(!Mi(r))t.push("provenance \uC5C6\uC74C");else{let a=r.verification;(!Mi(a)||!Object.prototype.hasOwnProperty.call(e,a.detail)||e[a.detail].tag!==a.tag)&&t.push("provenance.verification \uC758 tag\xB7detail \uC774 \uAF2C\uB9AC\uD45C \uD45C\uC640 \uB9DE\uC9C0 \uC54A\uC74C"),(!Array.isArray(r.source)||r.source.length===0)&&t.push("provenance.source \uC5C6\uC74C")}if(n.kind==="scalars"){let a=Array.isArray(n.items)?n.items:[null];for(let o of a)(!Mi(o)||typeof o.text!="string"||!("provenance"in o))&&t.push("scalars \uD56D\uBAA9\uC5D0 text\xB7provenance \uC5C6\uC74C")}return{errors:t,warnings:i}}function Gh(){return new Uint8Array(new Float64Array([1]).buffer)[7]===63}function wi(n,e){if(!Gh())throw new Error("\uBE45\uC5D4\uB514\uC5B8 \uAE30\uACC4\uB294 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC74C (\uC790\uB8CC\uB294 float64 \uB9AC\uD2C0\uC5D4\uB514\uC5B8)");let t=n.byteOffset%8===0?n.buffer:n.slice().buffer,i=n.byteOffset%8===0?n.byteOffset:0,s={};for(let[r,{offset:a,shape:o}]of Object.entries(e)){let l=o.reduce((c,u)=>c*u,1);s[r]={data:new Float64Array(t,i+a*8,l),shape:o}}return s}function Tr(n,e,t,i){let s=n.length;function r(a){if(!(a>=n[0]&&a<=n[s-1]))throw new RangeError(`\uBCF4\uAC04 \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01 ${a}`);let o=Si(n,a),l=n[o+1]-n[o],c=(a-n[o])/l,u=c*c,d=c*c*c,h=2*d-3*u+1,f=d-2*u+c,m=-2*d+3*u,v=d-u,p=6*u-6*c,g=3*u-4*c+1,A=-6*u+6*c,C=3*u-2*c,y=[],E=[];for(let b=0;b<i;b++){let w=[0,0,0],x=[0,0,0];for(let T=0;T<3;T++){let R=(o*i+b)*3+T,I=((o+1)*i+b)*3+T,L=e[R],U=e[I],N=t[R]*l,G=t[I]*l;w[T]=h*L+f*N+m*U+v*G,x[T]=(p*L+g*N+A*U+C*G)/l}y.push(w),E.push(x)}return{pos:y,vel:E}}return{evaluate:r,tMin:n[0],tMax:n[s-1],k:i}}var Wh=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Xh=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);function ii(n,e,t,i){let s=[t[0]-n[0],t[1]-n[1],t[2]-n[2]],r=[i[0]-e[0],i[1]-e[1],i[2]-e[2]],a=Xh(s),o=[s[0]/a,s[1]/a,s[2]/a],l=Wh(s,r),c=Xh(l),u=[l[0]/c,l[1]/c,l[2]/c],d=Wh(u,o);return{x:o,y:d,z:u,d:a,origin:t}}function $i(n,e){let t=[n[0]-e.origin[0],n[1]-e.origin[1],n[2]-e.origin[2]],i=s=>s[0]*t[0]+s[1]*t[1]+s[2]*t[2];return[i(e.x)/e.d,i(e.y)/e.d,i(e.z)/e.d]}function Uc(n,e,t,i){let[s,r,a]=[e[0]-t.origin[0],e[1]-t.origin[1],e[2]-t.origin[2]],{x:o,y:l,z:c,d:u}=t;for(let d=0;d<n.length;d+=3){let h=n[d]+s,f=n[d+1]+r,m=n[d+2]+a;i[d]=(o[0]*h+o[1]*f+o[2]*m)/u,i[d+1]=(l[0]*h+l[1]*f+l[2]*m)/u,i[d+2]=(c[0]*h+c[1]*f+c[2]*m)/u}return i}function Fc(n,e){let t=n.dir.data;return{dir:[t[3*e],t[3*e+1],t[3*e+2]],mag:n.mag.data[e],ci:n.ci.data[e],hyg_id:n.hyg_id.data[e]}}function Oc(n,e){return[0,1,2].map(t=>n[t][0]*e[0]+n[t][1]*e[1]+n[t][2]*e[2])}function vm(n){let e=Math.atan2(n[1],n[0])*180/Math.PI;return[e<0?e+360:e,Math.asin(n[2])*180/Math.PI]}function Bc(n,e){let t=n.chunks;if(e<t[0].t_from_tdb_s)return t[0];for(let i of t)if(e<=i.t_to_tdb_s)return i;return t[t.length-1]}function Ar(n,e={}){let t={};function i(s,r){let a=n.chunks.find(l=>l.year===s);if(!a)throw new Error(`\uC870\uAC01 ${s} \uC5C6\uC74C`);let o={};for(let l of n.bodies){let[c,u]=a.index[l.name],d=new Float64Array(u-c+1);for(let h=c;h<=u;h++)d[h-c]=l.t0_tdb_s+h*l.step_s;o[l.name]=Tr(d,r["R_"+l.name].data,r["V_"+l.name].data,1)}t[s]=o}for(let[s,r]of Object.entries(e))i(Number(s),r);return{bodies:n.bodies,range:n.range_tdb_s,chunks:n.chunks,addChunk:i,hasChunk:s=>!!t[s],chunkFor:s=>Bc(n,s),evaluate(s,r,a){let o=a??Bc(n,r).year;if(!t[o])throw new Error(`\uC870\uAC01 ${o} \uB97C \uC544\uC9C1 \uBD88\uB7EC\uC624\uC9C0 \uC54A\uC558\uB2E4`);let l=t[o][s].evaluate(r);return{pos:l.pos[0],vel:l.vel[0]}}}}function kc(n,e,t,i,s,r){let a=ii(n,e,t,i),o=[r[0]-(1-s),r[1],0];return[0,1,2].map(l=>t[l]+a.d*(a.x[l]*o[0]+a.y[l]*o[1]+a.z[l]*o[2]))}var Hr={};Pc(Hr,{Dop853:()=>kr,GELU_C:()=>Lr,brentq:()=>io,clampToRange:()=>Ur,components:()=>Zi,correctedEu:()=>Cr,createRun:()=>zr,efoldState:()=>ao,escapeRun:()=>$c,fromSliders:()=>to,inTrainingRange:()=>Ki,integrateOne:()=>ro,integrateTo:()=>so,jacobi:()=>Qi,labFlags:()=>_s,lnT3:()=>Rr,makeLab:()=>Vr,nextUp:()=>Jc,omega:()=>Gc,positionBound:()=>Pr,predict:()=>ys,predictD24:()=>Ir,predictMLP:()=>Nr,predictMLPSeeds:()=>Dr,predictState:()=>Zc,readForest:()=>Vc,rhs:()=>Fr,rhsDelta:()=>Or,roomFor:()=>Hc,stateOf:()=>Qa,toSliders:()=>no});function Zi(n,e){let t=new Array(6);for(let s=0;s<6;s++)t[s]=e[s]-n.s_ref[s];let i=new Array(6);for(let s=0;s<6;s++){let r=0;for(let a=0;a<6;a++)r+=t[a]*n.P_inv[6*s+a];i[s]=r}return i}function Qa(n,e){let t=new Array(6);for(let i=0;i<6;i++){let s=0;for(let r=0;r<6;r++)s+=e[r]*n.P[6*i+r];t[i]=n.s_ref[i]+s}return t}function Cr(n,e){let t=n.frame.gamma,i=[e[1]/t,e[2]/t,e[3]/t,e[4]/t,e[5]/t],s=0;for(let r=0;r<5;r++)for(let a=0;a<5;a++)s+=i[r]*n.M[5*r+a]*i[a];return e[0]+t*s}function zc(n,e,t,i){let{lam:s,w_p:r,w_z:a}=n.frame,o=Math.cos(r*t),l=Math.sin(r*t),c=Math.cos(a*t),u=Math.sin(a*t),d=[e[0]*Math.exp(s*t),e[1]*Math.exp(-s*t),e[2]*o+e[3]*l,-e[2]*l+e[3]*o,e[4]*c+e[5]*u,-e[4]*u+e[5]*c],h=0;for(let f=0;f<3;f++){let m=0;for(let v=0;v<6;v++)m+=d[v]*n.P[6*f+v];h+=m*m}return Math.sqrt(h)-i}function bm(n,e,t,i=60){let s=n.frame.lam,r=Math.log(t/Math.abs(e[0]))/s,a=Math.max(r-.25/s,0),o=r+.25/s,l=zc(n,e,a,t)<0&&zc(n,e,o,t)>0;for(let c=0;c<i;c++){let u=.5*(a+o);zc(n,e,u,t)>0?o=u:a=u}return l?.5*(a+o)*n.frame.time_unit_days:NaN}function Rr(n,e,t){let i=[t,e[1],e[2],e[3],e[4],e[5]];return n.R.map(s=>Math.log(bm(n,i,s)))}function Pr(n,e){let{env_p:t,env_z:i}=n.frame;return Math.abs(e[0])+Math.abs(e[1])+t*Math.hypot(e[2],e[3])+i*Math.hypot(e[4],e[5])}function Ki(n,e){let t=n.frame.gamma,i=n.range,s=Math.abs(e[0])/t;return s>=i.eu_gamma[0]*(1-i.rtol)&&s<=i.eu_gamma[1]*(1+i.rtol)&&Pr(n,e)/t<=i.disp_max_gamma*(1+i.rtol)}var Sm=new TextDecoder("utf-8");function Vc(n){let e=n.indexOf(10),t=JSON.parse(Sm.decode(n.subarray(0,e)));if(t.\uD615\uC2DD!=="lagrange-forest"||t.\uD310!==1||t.\uC885\uB958!=="RF"||t.\uC232_\uC218!==1)throw new Error("\uBAA8\uB974\uB294 \uC232 \uD615\uC2DD");let i=t.\uCD9C\uB825_\uC218,s=e+1,r=(l,c,u)=>{let d=new u(n.slice(s,s+l*c).buffer);return s+=l*c,d},a=new DataView(n.buffer,n.byteOffset,n.byteLength),o=[];for(let l=0;l<t.\uB098\uBB34_\uC218[0];l++){let c=a.getInt32(s,!0);s+=4;let u=r(c,1,Int8Array),d=r(c,8,Float64Array),h=r(c,4,Int32Array),f=r(c,4,Int32Array),m=0;for(let p=0;p<c;p++)u[p]<0&&m++;let v=r(m*i,8,Float64Array);o.push({F:u,T:d,L:h,R:f,V:v})}if(s!==n.length)throw new Error(`\uC232 \uBC14\uC774\uD2B8\uAC00 ${n.length-s} \uB0A8\uC74C`);return{head:t,trees:o,nOut:i,mean:t.\uD45C\uC900\uD654_\uD3C9\uADE0,std:t.\uD45C\uC900\uD654_\uD45C\uC900\uD3B8\uCC28,residual:!!t.\uC794\uCC28}}function eo(n,e,t={}){let i=t.float32!==!1,s=new Array(e.length);for(let a=0;a<e.length;a++)s[a]=i?Math.fround(e[a]):e[a];let r=new Array(n.nOut).fill(0);for(let a of n.trees){let o=0;for(;a.F[o]>=0;)o=s[a.F[o]]<=a.T[o]?a.L[o]:a.R[o];let l=a.L[o]*n.nOut;for(let c=0;c<n.nOut;c++)r[c]+=a.V[l+c]}for(let a=0;a<n.nOut;a++)r[a]/=n.trees.length;return r}function Mm(n,e){return e.map((t,i)=>(t-n.mean[i])/n.std[i])}function Ir(n,e,t){let i=eo(n,Mm(n,e));return n.residual?i.map((s,r)=>t[r]+s):i}var Lr=.7071067690849304,wm=1.1283791670955126,Em=.5641895835477563;function Tm(n){let e=n*n,t=n,i=n;for(let s=1;s<200&&(t*=2*e/(2*s+1),i+=t,!(Math.abs(t)<1e-17*Math.abs(i)));s++);return wm*Math.exp(-e)*i}function Am(n){let t=n,i=n,s=0;for(let r=1;r<500;r++){let a=r/2;s=n+a*s,s===0&&(s=1e-300),s=1/s,i=n+a/i,i===0&&(i=1e-300);let o=i*s;if(t*=o,Math.abs(o-1)<1e-17)break}return Em*Math.exp(-n*n)/t}function Cm(n){if(Number.isNaN(n))return NaN;let e=Math.abs(n),t;return e<3?t=1-Tm(e):t=Am(e),n<0?2-t:t}function Rm(n,e,t){let i=e.map((o,l)=>(o-n.x_mean[l])/n.x_std[l]);for(let o=0;o<n.W.length;o++){let[l,c]=n.dims[o],u=n.W[o],d=n.b[o],h=new Array(c);for(let f=0;f<c;f++){let m=0;for(let v=0;v<l;v++)m+=i[v]*u[v*c+f];h[f]=m+d[f]}i=h.map(f=>.5*f*Cm(-f*t))}let s=i.length,r=n.bo.length,a=new Array(r);for(let o=0;o<r;o++){let l=0;for(let c=0;c<s;c++)l+=i[c]*n.Wo[c*r+o];a[o]=(l+n.bo[o])*n.y_std[o]+n.y_mean[o]}return a}function Dr(n,e){let t=e[0],i=[Math.sign(t),Math.log(Math.abs(t)),...e.slice(1)];return n.seeds.map(s=>Rm(s,i,Lr))}function Nr(n,e){let t=Dr(n,e);return t[0].map((i,s)=>{let r=0;for(let a of t)r+=a[s];return r/t.length})}function to(n,e){let t=n.frame.gamma;return[e.sign*e.eu*t,e.es*t,e.ap*t*Math.cos(e.phip),e.ap*t*Math.sin(e.phip),e.az*t*Math.cos(e.phiz),e.az*t*Math.sin(e.phiz)]}function no(n,e){let t=n.frame.gamma,i=s=>{let r=Math.atan2(s[1],s[0]);return r<0?r+2*Math.PI:r};return{sign:e[0]<0?-1:1,eu:Math.abs(e[0])/t,es:e[1]/t,ap:Math.hypot(e[2],e[3])/t,phip:i([e[2],e[3]]),az:Math.hypot(e[4],e[5])/t,phiz:i([e[4],e[5]])}}function Hc(n,e,t){let{env_p:i,env_z:s}=n.frame,r=n.range.disp_max_gamma,a={eu:e.eu,es:Math.abs(e.es),ap:i*e.ap,az:s*e.az},o=r;for(let[c,u]of Object.entries(a))c!==t&&(o-=u);let l={eu:1,es:1,ap:i,az:s}[t];return Math.max(0,o)/l}function Ur(n,e,t){let i={...e},s=Hc(n,e,t);return t==="eu"?i.eu=Math.min(Math.max(e.eu,n.range.eu_gamma[0]),Math.min(n.range.eu_gamma[1],s)):t==="es"?i.es=Math.sign(e.es)*Math.min(Math.abs(e.es),s):(t==="ap"||t==="az")&&(i[t]=Math.min(e[t],s)),i}function _s(n,e){let t=n.uncertain,i=Dr(n.mlp,e.x),s=i.length,r=e.MLP.map((l,c)=>{let u=0;for(let d of i)u+=(d[c]-l)**2;return Math.sqrt(u/(s-1))}),a=e.MLP.map((l,c)=>Math.abs(l-e.T3[c])>t.factor*t.rmse_log_mlp[c]),o=r.map((l,c)=>l>t.factor*t.spread_median[c]);return{inRange:Ki(n,e.x.slice(0,6)),mismatch:a,spread:o,uncertain:a.map((l,c)=>l||o[c]),seedStd:r,positionBound:Pr(n,e.x.slice(0,6))}}function jh(n,e,t,i){let s=Math.sqrt((n+i)**2+e**2+t**2),r=Math.sqrt((n-1+i)**2+e**2+t**2);return[s,r]}function Gc(n,e){let[t,i,s]=n,[r,a]=jh(t,i,s,e);return .5*(t**2+i**2)+(1-e)/r+e/a}function Fr(n,e){let[t,i,s,r,a,o]=n,[l,c]=jh(t,i,s,e),u=l**3,d=c**3,h=t-(1-e)*(t+e)/u-e*(t-1+e)/d,f=i-(1-e)*i/u-e*i/d,m=-(1-e)*s/u-e*s/d;return[r,a,o,2*a+h,-2*r+f,m]}function Qi(n,e){return 2*Gc(n,e)-(n[3]**2+n[4]**2+n[5]**2)}function Or(n,e,t){let i=new Array(6);for(let s=0;s<6;s++)i[s]=t[s]+n[s];return Fr(i,e)}var Wc=[0,.05260015195876773,.0789002279381516,.1183503419072274,.2816496580927726,.3333333333333333,.25,.3076923076923077,.6512820512820513,.6,.8571428571428571,1,1,.1,.2,.7777777777777778],qh=[.054293734116568765,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,.3111643669578199,-.1521609496625161,.20136540080403034,.04471061572777259],Yh=[-.18980075407240762,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,-.4226823213237919,-.1521609496625161,.20136540080403034,.02265179219836082,0],Jh=[.01312004499419488,0,0,0,0,-1.2251564463762044,-.4957589496572502,1.6643771824549864,-.35032884874997366,.3341791187130175,.08192320648511571,-.022355307863886294,0],Xc=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.05260015195876773,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.0197250569845379,.0591751709536137,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.02958758547680685,0,.08876275643042054,0,0,0,0,0,0,0,0,0,0,0,0,0],[.2413651341592667,0,-.8845494793282861,.924834003261792,0,0,0,0,0,0,0,0,0,0,0,0],[.037037037037037035,0,0,.17082860872947386,.12546768756682242,0,0,0,0,0,0,0,0,0,0,0],[.037109375,0,0,.17025221101954405,.06021653898045596,-.017578125,0,0,0,0,0,0,0,0,0,0],[.03709200011850479,0,0,.17038392571223998,.10726203044637328,-.015319437748624402,.008273789163814023,0,0,0,0,0,0,0,0,0],[.6241109587160757,0,0,-3.3608926294469414,-.868219346841726,27.59209969944671,20.154067550477894,-43.48988418106996,0,0,0,0,0,0,0,0],[.47766253643826434,0,0,-2.4881146199716677,-.590290826836843,21.230051448181193,15.279233632882423,-33.28821096898486,-.020331201708508627,0,0,0,0,0,0,0],[-.9371424300859873,0,0,5.186372428844064,1.0914373489967295,-8.149787010746927,-18.52006565999696,22.739487099350505,2.4936055526796523,-3.0467644718982196,0,0,0,0,0,0],[2.273310147516538,0,0,-10.53449546673725,-2.0008720582248625,-17.9589318631188,27.94888452941996,-2.8589982771350235,-8.87285693353063,12.360567175794303,.6433927460157636,0,0,0,0,0],[.054293734116568765,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,.3111643669578199,-.1521609496625161,.20136540080403034,.04471061572777259,0,0,0,0],[.056167502283047954,0,0,0,0,0,.25350021021662483,-.2462390374708025,-.12419142326381637,.15329179827876568,.00820105229563469,.007567897660545699,-.008298,0,0,0],[.03183464816350214,0,0,0,0,.028300909672366776,.053541988307438566,-.05492374857139099,0,0,-.00010834732869724932,.0003825710908356584,-.00034046500868740456,.1413124436746325,0,0],[-.42889630158379194,0,0,0,0,-4.697621415361164,7.683421196062599,4.06898981839711,.3567271874552811,0,0,0,-.0013990241651590145,2.9475147891527724,-9.15095847217987,0]],$h=[[-8.428938276109013,0,0,0,0,.5667149535193777,-3.0689499459498917,2.38466765651207,2.117034582445028,-.871391583777973,2.2404374302607883,.6315787787694688,-.08899033645133331,18.148505520854727,-9.194632392478356,-4.436036387594894],[10.427508642579134,0,0,0,0,242.28349177525817,165.20045171727028,-374.5467547226902,-22.113666853125306,7.733432668472264,-30.674084731089398,-9.332130526430229,15.697238121770845,-31.139403219565178,-9.35292435884448,35.81684148639408],[19.985053242002433,0,0,0,0,-387.0373087493518,-189.17813819516758,527.8081592054236,-11.57390253995963,6.8812326946963,-1.0006050966910838,.7777137798053443,-2.778205752353508,-60.19669523126412,84.32040550667716,11.99229113618279],[-25.69393346270375,0,0,0,0,-154.18974869023643,-231.5293791760455,357.6391179106141,93.40532418362432,-37.45832313645163,104.0996495089623,29.8402934266605,-43.53345659001114,96.32455395918828,-39.17726167561544,-149.72683625798564]];function io(n,e,t,i,s,r=100){let a=e,o=t,l=0,c=0,u=0,d=0,h=n(a),f=n(o);if(h===0)return a;if(f===0)return o;let m=v=>v<0||Object.is(v,-0);if(m(h)===m(f))throw new Error("brentq: \uAD6C\uAC04 \uB05D\uC758 \uBD80\uD638\uAC00 \uAC19\uB2E4");for(let v=0;v<r;v++){h!==0&&f!==0&&m(h)!==m(f)&&(l=a,c=h,u=d=o-a),Math.abs(c)<Math.abs(f)&&(a=o,o=l,l=a,h=f,f=c,c=h);let p=(i+s*Math.abs(o))/2,g=(l-o)/2;if(f===0||Math.abs(g)<p)return o;if(Math.abs(u)>p&&Math.abs(f)<Math.abs(h)){let A;if(a===l)A=-f*(o-a)/(f-h);else{let C=(h-f)/(a-o),y=(c-f)/(l-o);A=-f*(c*y-h*C)/(y*C*(c-h))}2*Math.abs(A)<Math.min(Math.abs(u),3*Math.abs(g)-p)?(u=d,d=A):(u=g,d=g)}else u=g,d=g;a=o,h=f,Math.abs(d)>p?o+=d:o+=g>0?p:-p,f=n(o)}throw new Error("brentq: \uC218\uB834 \uC548 \uD568")}var Kh=.9,Lm=.2,Qh=10,ed=2220446049250313e-31,Br=12,td=-1/8;function Jc(n){if(Number.isNaN(n)||n===1/0)return n;if(n===0)return Number.MIN_VALUE;let e=new DataView(new ArrayBuffer(8));e.setFloat64(0,n);let t=e.getUint32(0),i=e.getUint32(4);return n>0?i===4294967295?(e.setUint32(0,t+1),e.setUint32(4,0)):e.setUint32(4,i+1):i===0?(e.setUint32(0,t-1),e.setUint32(4,4294967295)):e.setUint32(4,i-1),e.getFloat64(0)}var Yc=n=>{let e=0;for(let t of n)e+=t*t;return Math.sqrt(e)},qc=n=>Yc(n)/n.length**.5;function Dm(n,e,t,i,s,r,a,o,l){let c=t.length,u=Math.abs(i-e);if(u===0)return 0;let d=t.map(C=>l+Math.abs(C)*o),h=qc(t.map((C,y)=>C/d[y])),f=qc(r.map((C,y)=>C/d[y])),m=h<1e-5||f<1e-5?1e-6:.01*h/f;m=Math.min(m,u);let v=new Array(c);for(let C=0;C<c;C++)v[C]=t[C]+m*1*r[C];let p=n(e+m*1,v),g=qc(p.map((C,y)=>(C-r[y])/d[y]))/m,A=f<=1e-15&&g<=1e-15?Math.max(1e-6,m*.001):(.01/Math.max(f,g))**(1/(a+1));return Math.min(100*m,A,u,s)}var kr=class{constructor(e,t,i,s,r,a,o=1/0){this.nfev=0,this.fun=(l,c)=>(this.nfev++,e(l,c)),this.t=t,this.y=i.slice(),this.tBound=s,this.rtol=r,this.atol=a,this.maxStep=o,this.n=i.length,this.status="running",this.tOld=null,this.yOld=null,this.hPrevious=null,this.f=this.fun(this.t,this.y),this.hAbs=Dm(this.fun,this.t,this.y,s,o,this.f,7,r,a),this.Kx=Array.from({length:16},()=>new Array(this.n).fill(0))}_rkStep(e,t,i,s){let r=this.n,a=this.Kx,o=Xc,l=Wc,c=qh;a[0]=i.slice();for(let h=1;h<Br;h++){let f=new Array(r);for(let m=0;m<r;m++){let v=0;for(let p=0;p<h;p++)v+=a[p][m]*o[h][p];f[m]=t[m]+v*s}a[h]=this.fun(e+l[h]*s,f)}let u=new Array(r);for(let h=0;h<r;h++){let f=0;for(let m=0;m<Br;m++)f+=a[m][h]*c[m];u[h]=t[h]+s*f}let d=this.fun(e+s,u);return a[Br]=d,[u,d]}_errorNorm(e,t){let i=this.n,s=this.Kx,r=new Array(i),a=new Array(i);for(let u=0;u<i;u++){let d=0,h=0;for(let f=0;f<=Br;f++)d+=s[f][u]*Jh[f],h+=s[f][u]*Yh[f];r[u]=d/t[u],a[u]=h/t[u]}let o=Yc(r)**2,l=Yc(a)**2;if(o===0&&l===0)return 0;let c=o+.01*l;return Math.abs(e)*o/Math.sqrt(c*i)}step(){if(this.status!=="running")throw new Error("\uB05D\uB09C \uD480\uC774\uAE30");if(this.t===this.tBound)return this.tOld=this.t,this.status="finished",this.status;let e=this.t,t=this.y,i=10*Math.abs(Jc(e)-e),s=this.hAbs>this.maxStep?this.maxStep:this.hAbs<i?i:this.hAbs,r=!1,a=!1,o,l,c,u;for(;!r;){if(s<i)return this.status="failed",this.message="\uAC78\uC74C\uC774 \uB108\uBB34 \uC791\uC74C",this.status;u=s,c=e+u,c-this.tBound>0&&(c=this.tBound),u=c-e,s=Math.abs(u),[o,l]=this._rkStep(e,t,this.f,u);let d=new Array(this.n);for(let f=0;f<this.n;f++)d[f]=this.atol+Math.max(Math.abs(t[f]),Math.abs(o[f]))*this.rtol;let h=this._errorNorm(u,d);if(h<1){let f=h===0?Qh:Math.min(Qh,Kh*h**td);a&&(f=Math.min(1,f)),s*=f,r=!0}else s*=Math.max(Lm,Kh*h**td),a=!0}return this.hPrevious=u,this.yOld=t,this.t=c,this.y=o,this.hAbs=s,this.f=l,this.tOld=e,this.t-this.tBound>=0&&(this.status="finished"),this.status}dense(){let e=this.n,t=this.Kx,i=Xc,s=Wc,r=this.hPrevious,a=this.tOld,o=this.yOld;for(let u=Br+1;u<16;u++){let d=new Array(e);for(let h=0;h<e;h++){let f=0;for(let m=0;m<u;m++)f+=t[m][h]*i[u][m];d[h]=o[h]+f*r}t[u]=this.fun(a+s[u]*r,d)}let l=Array.from({length:7},()=>new Array(e)),c=t[0];for(let u=0;u<e;u++){let d=this.y[u]-o[u];l[0][u]=d,l[1][u]=r*c[u]-d,l[2][u]=2*d-r*(this.f[u]+c[u])}for(let u=0;u<4;u++)for(let d=0;d<e;d++){let h=0;for(let f=0;f<16;f++)h+=$h[u][f]*t[f][d];l[3+u][d]=r*h}return Nm(a,this.t,o,l)}};function Nm(n,e,t,i){let s=e-n,r=t.length;return a=>{let o=(a-n)/s,l=new Array(r).fill(0);for(let c=0;c<i.length;c++){let u=i[i.length-1-c],d=c%2===0?o:1-o;for(let h=0;h<r;h++)l[h]=(l[h]+u[h])*d}for(let c=0;c<r;c++)l[c]+=t[c];return l}}function zr(n,e,t,i,s,r,a=[],o=null){let l=new kr(n,e,t,i,s,r),c=a.map(v=>v.terminal?1:1/0),u=a.map(()=>0),d=a.map(()=>[]),h=a.map(()=>[]),f=a.map(v=>v.g(e,t)),m={solver:l,tEvents:d,yEvents:h,status:"running",t:e,y:t.slice(),nsteps:0};return m.advance=(v=1/0)=>{for(let p=0;p<v&&m.status==="running";p++){if(l.step(),m.nsteps++,l.status==="failed"){m.status="failed",m.message=l.message;break}let g=l.t,A=l.y,C=l.tOld;if(a.length){let y=a.map(b=>b.g(g,A)),E=[];for(let b=0;b<a.length;b++){let w=f[b]<=0&&y[b]>=0,x=f[b]>=0&&y[b]<=0,T=a[b].direction;(w&&T>0||x&&T<0||(w||x)&&T===0)&&E.push(b)}if(E.length){let b=l.dense();for(let R of E)u[R]++;let w=E.slice(),x=w.map(R=>io(I=>a[R].g(I,b(I)),C,g,4*ed,4*ed)),T=!1;if(w.some(R=>u[R]>=c[R])){let R=x.map((L,U)=>U).sort((L,U)=>x[L]-x[U]);w=R.map(L=>w[L]),x=R.map(L=>x[L]);let I=w.findIndex(L=>u[L]>=c[L]);w=w.slice(0,I+1),x=x.slice(0,I+1),T=!0}w.forEach((R,I)=>{d[R].push(x[I]),h[R].push(b(x[I]))}),T&&(m.status="event",g=x[x.length-1],A=b(g))}f=y}if(o){let y=l.nfev,E=l.dense();l.nfev=y,o(E,C,g)}m.t=g,m.y=A,m.status==="running"&&l.status==="finished"&&(m.status="finished")}return m.nfev=l.nfev,m.status},m}function so(n,e,t,i,s,r){let a=zr(n,e,t,i,s,r);if(a.advance(),a.status!=="finished")throw new Error("\uC801\uBD84 \uC2E4\uD328: "+a.message);return{y:a.y,nfev:a.nfev,nsteps:a.nsteps}}var Um=1,Fm=-1;function Om(n,e,t=2e4,i=12){let s=[n[0],n[1],n[2]],r=0,a=(l,c,u)=>{let d=[c[0]-l[0],c[1]-l[1],c[2]-l[2]],h=[u[0]-l[0],u[1]-l[1],u[2]-l[2]],f=d[0]*d[0]+d[1]*d[1]+d[2]*d[2],m=f>0?Math.min(1,Math.max(0,(h[0]*d[0]+h[1]*d[1]+h[2]*d[2])/f)):0;return Math.hypot(h[0]-m*d[0],h[1]-m*d[1],h[2]-m*d[2])},o=(l,c,u,d,h,f)=>{let m=[.25,.5,.75].some(v=>a(u,h,l(c+v*(d-c)))>e/2);if(m&&f<i){let v=.5*(c+d),p=l(v);o(l,c,u,v,p,f+1),o(l,v,p,d,h,f+1)}else m&&r++,s.push(h[0],h[1],h[2])};return{add(l,c,u){u>c&&o(l,c,l(c),u,l(u),0)},finish(){let l=s.length/3,c=new Uint8Array(l);c[0]=1,c[l-1]=1;let u=p=>[s[3*p],s[3*p+1],s[3*p+2]],d=[[0,l-1]];for(;d.length;){let[p,g]=d.pop(),A=-1,C=0,y=u(p),E=u(g);for(let b=p+1;b<g;b++){let w=a(y,E,u(b));w>C&&(C=w,A=b)}A>=0&&C>e/2&&(c[A]=1,d.push([p,A],[A,g]))}let h=0;for(let p=0;p<l;p++)h+=c[p];let f=h>t?Math.ceil(h/t):1,m=[],v=0;for(let p=0;p<l;p++)c[p]&&((v%f===0||p===l-1)&&m.push(s[3*p],s[3*p+1],s[3*p+2]),v++);return{points:Float64Array.from(m),n_raw:l,n_kept:h,n:m.length/3,capped:f>1,depth_capped:r,tol:e}}}}function $c(n,e,t={}){let i=[n.x_L2,0,0,0,0,0],s=n.R_over_gamma.map(u=>u*n.gamma),r=s.map((u,d)=>({g:(h,f)=>Math.sqrt(f[0]**2+f[1]**2+f[2]**2)-u,terminal:d===s.length-1,direction:1})),a=e.map((u,d)=>u-i[d]),o=n.t_max_days/n.time_unit_days,l=t.trajTol?Om(a,t.trajTol,t.trajMax):null,c=zr((u,d)=>Or(d,n.mu,i),0,a,o,n.rtol,n.atol,r,l?(u,d,h)=>l.add(u,d,h):null);return c.tEndNd=o,c.result=()=>{let u=s.map((f,m)=>c.tEvents[m].length?c.tEvents[m][0]*n.time_unit_days:NaN),d=s.map((f,m)=>c.tEvents[m].length?c.yEvents[m][0][0]>0?Um:Fm:0),h={t_days:u,dir:d,nfev:c.solver.nfev,status:c.status,t_reached_days:c.t*n.time_unit_days};return l&&(h.traj=l.finish()),h},c}function ro(n,e){let t=$c(n,e);if(t.advance(),t.status==="failed")throw new Error("\uC801\uBD84 \uC2E4\uD328: "+t.message);return t.result()}function ao(n,e,t,i){let s=e.map((o,l)=>o-t[l]),{y:r}=so((o,l)=>Or(l,n.mu,t),0,s,i,n.rtol,n.atol),a=r.map((o,l)=>t[l]+o);return{delta:r,jacobi_drift:Qi(a,n.mu)-Qi(e,n.mu)}}var xs=(n,e)=>{if(!n[e])throw new Error(`\uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uC5D0 ${e} \uC5C6\uC74C`);return n[e].data};function Vr(n,e,t=null){if(n.mlp.gelu_c!==Lr)throw new Error(`gelu \uC0C1\uC218\uAC00 \uB2E4\uB974\uB2E4: \uC790\uB8CC ${n.mlp.gelu_c} \uB300 JS ${Lr}`);let i=n.frame_l2,s={frame:i,P:xs(e,"P"),P_inv:xs(e,"P_inv"),s_ref:Array.from(xs(e,"s_ref")),M:xs(e,"M"),R_over_gamma:n.criteria.R_over_gamma,R:n.criteria.R_over_gamma.map(r=>r*i.gamma),labels:n.criteria.labels,range:n.range,uncertain:n.uncertain||null,examples:n.examples||[],sliders:n.sliders||null};return s.mlp={seeds:n.mlp.seeds.map(r=>{let a=[],o=[],l=[];for(let u=0;u<n.mlp.layers;u++){let d=e[`s${r}_W${u}`];a.push(d.data),o.push(xs(e,`s${r}_b${u}`)),l.push(d.shape)}let c=u=>xs(e,`s${r}_${u}`);return{W:a,b:o,dims:l,Wo:c("Wo"),bo:c("bo"),x_mean:c("x_mean"),x_std:c("x_std"),y_mean:c("y_mean"),y_std:c("y_std")}})},s.forest=t?Vc(t):null,s.escapeParams=(r={})=>({mu:i.mu,x_L2:i.x,gamma:i.gamma,R_over_gamma:s.R_over_gamma,time_unit_days:i.time_unit_days,t_max_days:r.t_max_days??n.integrate.t_max_days,rtol:r.rtol??n.integrate.rtol,atol:r.atol??n.integrate.atol}),s}function ys(n,e){let t=Cr(n,e),i=Rr(n,e,t),s=[...e,t];return{eus:t,x:s,inRange:Ki(n,e),T3:i,MLP:Nr(n.mlp,s),D24:n.forest?Ir(n.forest,s,i):null,dirT3:Math.sign(t)}}function Zc(n,e){return ys(n,Zi(n,e))}var nd=n=>n===null?NaN:n,Kc=n=>Math.sqrt(n.reduce((e,t)=>e+t*t,0)),vs={max_err:NaN,failures:[{reason:"\uC2E4\uD5D8\uC2E4 \uC790\uB8CC (m3.lab) \uC5C6\uC74C"}]};function Qc(n,e,t){let i=0,s=!1;for(let r=0;r<e.length;r++){let a=n[r],o=nd(e[r]);if(Number.isNaN(a)||Number.isNaN(o)){Number.isNaN(a)!==Number.isNaN(o)&&(s=!0);continue}i=Math.max(i,Math.abs(a-o))}return{err:i,bad:s||!(i<=t)}}var id={m3_eigen(n,e){if(!e.lab)return vs;let t=0,i=0,s=[];for(let r of n.cases){let a=Zi(e.lab,r.state),o=Cr(e.lab,a),l=Math.max(...a.map((c,u)=>Math.abs(c-r.E[u])),Math.abs(o-r.eus));t=Math.max(t,l),i=Math.max(i,l/r.tol),l<=r.tol||s.push({state:r.state,err:l,tol:r.tol})}return{max_err:t,max_ratio_to_tol:i,failures:s,measure:"abs (\uC131\uBD84\uB9C8\uB2E4 100 \u03B5 \u2016\u03B4\u2016)"}},m3_t3(n,e){if(!e.lab)return vs;let t=0,i=0,s=[];for(let r of n.cases){let a=Rr(e.lab,r.E,r.eus),o=Qc(a,r.lt3,n.tolerance.abs);i+=r.lt3.filter(l=>l===null).length,t=Math.max(t,o.err),o.bad&&s.push({E:r.E,js:a,py:r.lt3})}return{max_err:t,n_nan_expected:i,failures:s,measure:"abs ln \uC77C"}},m3_uncertain(n,e){if(!e.lab)return vs;let t=[],i=0,s=0;for(let r of n.cases){let a=_s(e.lab,ys(e.lab,r.E)),o=Math.max(...a.seedStd.map((c,u)=>Math.abs(c-r.seed_std[u])));i=Math.max(i,o),a.uncertain.some(Boolean)&&s++,(!(a.mismatch.every((c,u)=>c===r.mismatch[u])&&a.spread.every((c,u)=>c===r.spread[u]))||!(o<=n.tolerance.seed_std_abs))&&t.push({E:r.E,js:{mismatch:a.mismatch,spread:a.spread},py:{mismatch:r.mismatch,spread:r.spread},std_err:o})}return{max_err:t.length,max_err_std:i,n_uncertain:s,failures:t,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},m3_range(n,e){if(!e.lab)return vs;let t=[],i=0;for(let s of n.cases){let r=Ki(e.lab,s.E);s.in&&i++,r!==s.in&&t.push({E:s.E,js:r,py:s.in})}return{max_err:t.length,n_in:i,n_out:n.cases.length-i,failures:t,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},m3_d24(n,e){if(!e.lab||!e.lab.forest)return vs;let t=n.tolerance.abs,i=e.lab.forest,s=0,r=0,a=0,o=0,l=0,c=[];for(let u of n.cases)if(u.what==="predict"){let d=Qc(Ir(i,u.X,u.lt3),u.lnt,t);s=Math.max(s,d.err),d.bad&&c.push({what:u.what,X:u.X,err:d.err})}else{l++;let d=eo(i,u.z),h=eo(i,u.z,{float32:!1}),f=Math.max(...d.map((v,p)=>Math.abs(v-u.out_f32[p])),...h.map((v,p)=>Math.abs(v-u.out_f64[p])));r=Math.max(r,f);let m=d.some((v,p)=>v!==h[p]);m&&a++,u.differs&&o++,(!(f<=t)||m!==u.differs)&&c.push({what:u.what,err:f,js_differs:m,py_differs:u.differs})}return(o===0||a===0)&&c.push({reason:"\uB300\uC870\uAD70\uC774 \uD558\uB098\uB3C4 \uAC08\uB9AC\uC9C0 \uC54A\uC74C \u2014 \uBB38\uD131 \uC704 \uC785\uB825 \uC2DC\uD5D8\uC774 \uBB34\uB825",jsDiffers:a,pyDiffers:o}),{max_err:Math.max(s,r),max_err_predict:s,max_err_probe:r,control:{probes:l,py_differs:o,js_differs:a},failures:c,measure:"abs ln \uC77C"}},m3_mlp(n,e){if(!e.lab)return vs;let t=0,i=[];for(let s of n.cases){let r=Qc(Nr(e.lab.mlp,s.X),s.lnt,n.tolerance.abs);t=Math.max(t,r.err),r.bad&&i.push({X:s.X,err:r.err})}return{max_err:t,failures:i,measure:"abs ln \uC77C (\uC2DC\uB4DC 3 \uD3C9\uADE0)"}},m3_cr3bp(n){let e=0,t=[];for(let i of n.cases){let s=Fr(i.state,n.mu),r=Qi(i.state,n.mu),a=Math.max(Kc(s.map((o,l)=>o-i.rhs[l]))/Kc(i.rhs),Math.abs(r-i.jacobi)/Math.abs(i.jacobi));e=Math.max(e,a),a<=n.tolerance.rel||t.push({state:i.state,err:a})}return{max_err:e,failures:t,measure:"rel (\uC6B0\uBCC0 \uBCA1\uD130 \uD06C\uAE30 \uB300\uBE44, \uC57C\uCF54\uBE44)"}},m3_dop853(n){let e={mu:n.mu,x_L2:n.x_L2,gamma:n.gamma,R_over_gamma:n.R_over_gamma,time_unit_days:n.time_unit_days,t_max_days:n.t_max_days,rtol:n.rtol,atol:n.atol},t=0,i=0,s=0,r=0,a=0,o=0,l=0,c=[];for(let u of n.cases){let d=ro(e,u.state),h=ao(e,u.state,n.s_ref,n.efold_nd),f=Kc(h.delta.map((p,g)=>p-u.delta_efold[g]));r=Math.max(r,f),t=Math.max(t,f/u.L_delta);let m=!(f<=u.L_delta);for(let p=0;p<u.t_days.length;p++){let g=nd(u.t_days[p]),A=d.t_days[p];if(Number.isNaN(g)&&l++,Number.isNaN(g)||Number.isNaN(A)){Number.isNaN(g)!==Number.isNaN(A)&&(m=!0);continue}let C=Math.abs(A-g);a=Math.max(a,C),i=Math.max(i,C/u.L_t_days[p]),C<=u.L_t_days[p]||(m=!0),d.dir[p]!==u.dir[p]&&(m=!0,o++)}let v=10*Math.max(Math.abs(u.jacobi_drift),u.jacobi_drift_jit_rms);s=Math.max(s,v>0?Math.abs(h.jacobi_drift)/v:h.jacobi_drift===0?0:1/0),Math.abs(h.jacobi_drift)<=v||(m=!0),m&&c.push({eu_gamma:u.eu_gamma,eD:f,L_delta:u.L_delta,t_js:d.t_days,t_py:u.t_days,L_t:u.L_t_days,dir_js:d.dir,dir_py:u.dir,cj_js:h.jacobi_drift,cj_lim:v})}return{max_err:Math.max(t,i,s),ratio_to_line:{delta_efold:t,escape_time:i,jacobi:s},max_abs:{delta_efold:r,escape_time_days:a},direction_mismatch:o,no_escape_entries:l,failures:c,measure:"8-1 \uD310\uC815\uC120 \uB300\uBE44 \uBE44 (\u2264 1 \uC774\uBA74 \uD1B5\uACFC)"}}};var Gr=Math.PI/180,sd=n=>{let e=Math.cos(n),t=Math.sin(n);return[[1,0,0],[0,e,t],[0,-t,e]]},eu=n=>{let e=Math.cos(n),t=Math.sin(n);return[[e,t,0],[-t,e,0],[0,0,1]]};function Ei(n,e){let t=[[0,0,0],[0,0,0],[0,0,0]];for(let i=0;i<3;i++)for(let s=0;s<3;s++)t[i][s]=n[i][0]*e[0][s]+n[i][1]*e[1][s]+n[i][2]*e[2][s];return t}var tu=n=>[[n[0][0],n[1][0],n[2][0]],[n[0][1],n[1][1],n[2][1]],[n[0][2],n[1][2],n[2][2]]];function rd(n){let e=n-Math.floor(n),t=2*Math.PI*(e+.779057273264+.00273781191135448*n);return t=t%(2*Math.PI),t<0?t+2*Math.PI:t}function oo(n,e){let t=0;for(let i=0;i<3;i++)for(let s=0;s<3;s++)t+=(n[i][s]-e[i][s])**2;return Math.sqrt(t/2)}function Wr(n){let e=n._arrays,t=e.t.data,i=e.du.data,s=e.q.data,r=n.orient.earth.eps_arcsec/3600*Gr,a=sd(r),o=n.orient.moon.coef;function l(d){if(!(d>=t[0]&&d<=t[t.length-1]))throw new RangeError("\uC9C0\uAD6C \uC790\uC138 \uD45C \uBC94\uC704 \uBC16");let h=Si(t,d),f=(d-t[h])/(t[h+1]-t[h]),m=[[0,0,0],[0,0,0],[0,0,0]];for(let p=0;p<3;p++)for(let g=0;g<3;g++){let A=s[9*h+3*p+g],C=s[9*(h+1)+3*p+g];m[p][g]=A+f*(C-A)}let v=i[h]+f*(i[h+1]-i[h]);return Ei(Ei(a,tu(m)),eu(-rd(v)))}function c(d){let h=d/86400,f=h/36525,m=o.pole_ra[0]+o.pole_ra[1]*f+o.pole_ra[2]*f*f,v=o.pole_dec[0]+o.pole_dec[1]*f+o.pole_dec[2]*f*f,p=o.pm[0]+o.pm[1]*h+o.pm[2]*h*h;return o.angles.forEach(([g,A],C)=>{let y=(g+A*f)*Gr;m+=o.ra[C]*Math.sin(y),v+=o.dec[C]*Math.cos(y),p+=o.pmt[C]*Math.sin(y)}),[m,v,p]}function u(d){let[h,f,m]=c(d),v=Ei(Ei(eu(m*Gr),sd((90-f)*Gr)),eu((90+h)*Gr));return Ei(a,tu(v))}return{earth:l,moon:u,moonAngles:c,range:[t[0],t[t.length-1]]}}var ad=(n,e)=>e===0?Math.abs(n-e):Math.abs(n-e)/Math.abs(e),lo=n=>Math.sqrt(n.reduce((e,t)=>e+t*t,0)),xn=(n,e)=>lo(n.map((t,i)=>t-e[i]));function Ss(n){let e={},t=n["ephem.earth_moon"];t&&t._arrays&&(e.ephem=Tr(t._arrays.t.data,t._arrays.R.data,t._arrays.V.data,t.bodies.length));let i=n["time.utc"];i&&i._arrays&&(e.utc={t:i._arrays.t_tdb_s.data,u:i._arrays.unix_utc_s.data});let s=n["m3.lab"];s&&s._arrays&&(e.lab=Vr(s,s._arrays,s._forest||null));let r=n["m4.ephem"];r&&r._chunks&&(e.solar=Ar(r,r._chunks)),n["m5.stars"]&&n["m5.milkyway"]&&(e.sky={stars:n["m5.stars"],milkyway:n["m5.milkyway"]});let a=n["m4.textures"];return a&&a._arrays&&a.orient&&(e.orient=Wr(a)),e}function bs(n,e,t){let i=0,s=[];for(let r of n){let{err:a,js:o}=e(r);i=Math.max(i,a),a<=t||s.push({...r,js:o,err:a})}return{max_err:i,failures:s}}var Bm={units(n){let e=Ic(n.units);return{...bs(n.cases,t=>({err:ad(e[t.fn](t.in),t.out),js:e[t.fn](t.in)}),n.tolerance.rel),measure:"rel"}},timeline(n){return{...bs(n.cases,e=>{let t=Ji(e.t_days,n.time_unit_days);return{err:Math.abs(t-e.theta),js:t}},n.tolerance.abs),measure:"abs rad"}},schema(n){let e=[],t=n.cases.find(i=>i.what==="manifest").obj.verification.details;for(let i of n.cases){let s,r;if(i.what==="manifest")s=Er(i.obj).length,r=0;else{let a=ni(i.obj,t);s=a.errors.length,r=a.warnings.length}(s!==i.errors||r!==i.warnings)&&e.push({name:i.name,py:[i.errors,i.warnings],js:[s,r]})}return{max_err:e.length,failures:e,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},frames(n){return{...bs(n.cases,e=>{let t=vr(e.state,e.theta),i=Lc(e.state,e.theta),s=Yi(e.state.slice(0,3),e.theta,e.s),r=lo(e.state);return{err:Math.max(xn(t,e.to_inertial),xn(i,e.to_rot),xn(s,e.blend))/r,js:{a:t,b:i,p:s}}},n.tolerance.rel),measure:"rel (\uC0C1\uD0DC \uD06C\uAE30 \uB300\uBE44)"}},interp(n,e){if(!e.ephem)return{max_err:NaN,failures:[{reason:"\uCC9C\uCCB4\uB825 \uC790\uB8CC \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=e.ephem.evaluate(r.t);for(let o=0;o<r.pos.length;o++){let l=xn(a.pos[o],r.pos[o]),c=xn(a.vel[o],r.vel[o]);t=Math.max(t,l),i=Math.max(i,c),l<=n.tolerance.pos_km&&c<=n.tolerance.vel_km_s||s.push({t:r.t,body:o,ep:l,ev:c})}}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},pulsating(n,e){return e.ephem?{...bs(n.cases,t=>{let i=e.ephem.evaluate(t.t),s=ii(i.pos[0],i.vel[0],i.pos[3],i.vel[3]),r=$i(i.pos[1],s),a=$i(i.pos[2],s);return{err:Math.max(xn(r,t.earth)/lo(t.earth),xn(a,t.moon)/lo(t.moon),ad(s.d,t.d_km)),js:{e:r,m:a,d:s.d}}},n.tolerance.rel),measure:"rel"}:{max_err:NaN,failures:[{reason:"\uCC9C\uCCB4\uB825 \uC790\uB8CC \uC5C6\uC74C"}]}},utc(n,e){return e.utc?{...bs(n.cases,t=>{let i=ti(t.t,e.utc);return{err:Math.abs(i-t.unix),js:i}},n.tolerance.abs_s),measure:"abs s"}:{max_err:NaN,failures:[{reason:"UTC \uD45C \uC5C6\uC74C"}]}},m4_interp(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=e.solar.evaluate(r.body,r.t),o=xn(a.pos,r.pos),l=xn(a.vel,r.vel);t=Math.max(t,o),i=Math.max(i,l),o<=n.tolerance.pos_km&&l<=n.tolerance.vel_km_s||s.push({body:r.body,t:r.t,ep:o,ev:l})}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},m4_chunks(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases)for(let a of r.years){let o=e.solar.evaluate(r.body,r.t,a),l=xn(o.pos,r.pos),c=xn(o.vel,r.vel);t=Math.max(t,l),i=Math.max(i,c),l<=n.tolerance.pos_km&&c<=n.tolerance.vel_km_s||s.push({body:r.body,t:r.t,year:a,ep:l,ev:c})}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},m4_lpoints(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=[];for(let s of n.cases){let r=e.solar.evaluate("sun",s.t),a=e.solar.evaluate("emb",s.t);for(let[o,l]of Object.entries(n.points)){let c=xn(kc(r.pos,r.vel,a.pos,a.vel,n.mu,l),s.L[o]);t=Math.max(t,c),c<=n.tolerance.pos_km||i.push({t:s.t,point:o,err:c})}}return{max_err:t,failures:i,measure:"pos km"}},m4_orient(n,e){if(!e.orient)return{max_err:NaN,failures:[{reason:"\uC790\uC138 \uC790\uB8CC (m4.textures) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=oo(e.orient.earth(r.t),r.earth),o=oo(e.orient.moon(r.t),r.moon);t=Math.max(t,a),i=Math.max(i,o),a<=n.tolerance.earth_rad&&o<=n.tolerance.moon_rad||s.push({t:r.t,ee:a,em:o})}return{max_err:t,max_err_moon:i,failures:s,measure:"rad (\uC9C0\uAD6C; \uB2EC\uC740 max_err_moon)"}},m5_sky(n,e){if(!e.sky||!e.sky.stars._arrays)return{max_err:NaN,failures:[{reason:"\uD558\uB298 \uC790\uB8CC (m5.stars\xB7m5.milkyway) \uC5C6\uC74C"}]};let t=e.sky.stars._arrays,i=e.sky.milkyway.gal_to_ecl,s=new Map;for(let l=0;l<t.hyg_id.data.length;l++)s.set(t.hyg_id.data[l],l);let r=0,a=0,o=[];for(let l of n.cases)if(l.what==="star"){let c=s.get(l.hyg_id);if(c===void 0){o.push({name:l.name,reason:"\uC790\uB8CC\uC5D0 \uC5C6\uC74C"});continue}let u=Fc(t,c),d=Math.max(xn(u.dir,l.dir),Math.abs(u.mag-l.mag));r=Math.max(r,d),d<=n.tolerance.star_abs||o.push({name:l.name,err:d})}else{let c=xn(Oc(i,l.gal),l.ecl);a=Math.max(a,c),c<=n.tolerance.rot_abs||o.push({gal:l.gal,err:c})}return{max_err:Math.max(r,a),max_err_star:r,max_err_rot:a,failures:o,measure:"abs (\uB2E8\uC704 \uBCA1\uD130)"}},revolution(n){return{...bs(n.cases,e=>{let t=n.time_unit_days,i=Ji(e.t0_days,t),s=Ji(e.t1_days,t),r=vr([...n.emb,0,0,0],i),a=vr([...n.emb,0,0,0],s),o=Math.atan2(a[1],a[0])-Math.atan2(r[1],r[0]);return{err:Math.abs(Math.atan2(Math.sin(o),Math.cos(o))),js:{a0:i,a1:s}}},n.tolerance.abs_rad),measure:"abs rad"}}};function od(n,e={}){return n.map(t=>{let i=Bm[t.id]||id[t.id];if(!i)return{id:t.id,n:0,failures:[{reason:"JS \uCABD \uB300\uC870 \uD568\uC218 \uC5C6\uC74C"}],max_err:NaN,ok:!1};let s=i(t,e);return{id:t.id,n:t.cases.length,tolerance:t.tolerance,...s,ok:s.failures.length===0}})}var es="fetch";async function ld(n){let e=`data/${n}`;if(typeof navigator<"u"&&navigator.onLine===!1&&typeof caches<"u"){let i=await caches.match(new URL(e,location.href).href);if(!i)throw new Error(`\uC624\uD504\uB77C\uC778 \u2014 \uB2F4\uC544 \uB454 \uD30C\uC77C\uC774 \uC544\uB2D8: ${n}`);return i}let t=await fetch(e);if(!t.ok)throw new Error(`\uC790\uB8CC\uB97C \uC77D\uC9C0 \uBABB\uD568: ${n} (${t.status})`);return t}async function Ti(n){return(await ld(n)).json()}async function Hn(n){return new Uint8Array(await(await ld(n)).arrayBuffer())}var su={};Pc(su,{DICTS:()=>Xr,apply:()=>zt,getLang:()=>Ci,init:()=>nu,initialLang:()=>fd,onChange:()=>uo,pick:()=>At,setLang:()=>iu,t:()=>Fe});var cd={"app.title":"\uD0DC\uC591\u2013\uC9C0\uAD6C\uB2EC L2","app.subtitle":"7\uB2E8\uACC4 3D \uC2DC\uAC01\uD654 \xB7 M2 JWST \uCE35","lang.switch":"English","lang.switch_title":"\uC5B8\uC5B4 \uBC14\uAFB8\uAE30","version.commit":"\uCEE4\uBC0B","version.dirty":"\uC218\uC815 \uC911","version.title":"\uBC84\uC804 \xB7 \uBE4C\uB4DC \uB0A0\uC9DC (\uD55C\uAD6D \uC2DC\uAC04) \xB7 \uCEE4\uBC0B","panel.samples":"\uAF2C\uB9AC\uD45C \uC2DC\uD5D8 \uC22B\uC790","panel.samples_note":"\uC22B\uC790\uB97C \uB204\uB974\uBA74 \uCD9C\uCC98 \uCC3D\uC774 \uC5F4\uB9B0\uB2E4. \uAF2C\uB9AC\uD45C\uC5D0 \uB9C8\uC6B0\uC2A4\uB97C \uC62C\uB9AC\uBA74 \uC138\uBD80 \uBD84\uB958\uAC00 \uBCF4\uC778\uB2E4.","tag.weak":"\uC57D\uD568","tag.display_approx":"\uD45C\uC2DC\uC6A9 \uADFC\uC0AC","source.title":"\uCD9C\uCC98","source.value":"\uAC12","source.unit":"\uB2E8\uC704","source.file":"\uD30C\uC77C","source.key":"\uD0A4","source.commit":"\uACC4\uC0B0","source.source_hash":"\uC18C\uC2A4 \uD574\uC2DC (\uC55E 12 \uC790\uB9AC)","source.ref_commit":"\uCC38\uACE0 \uCEE4\uBC0B","source.build":"\uD654\uBA74 \uD310","source.stage":"\uB2E8\uACC4","source.model":"\uBAA8\uB378","source.verification":"\uAC80\uC99D \uAF2C\uB9AC\uD45C","source.note":"\uC124\uBA85","source.close":"\uB2EB\uAE30","source.browser_calc":"\uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0 (Python \uC77C\uCE58 \uD14C\uC2A4\uD2B8 \uD1B5\uACFC, \uD5C8\uC6A9 \uC624\uCC28 {tol})","source.time_scale":"\uC2DC\uAC04 \uCCB4\uACC4","pwa.update":"\uC0C8 \uBC84\uC804 \uC788\uC74C \u2014 \uB2E4\uC2DC \uBD88\uB7EC\uC624\uAE30","pwa.offline_ready":"\uC624\uD504\uB77C\uC778 \uC900\uBE44\uB428","error.load":"\uC790\uB8CC\uB97C \uC77D\uC9C0 \uBABB\uD588\uB2E4: {msg}","error.schema":"\uC790\uB8CC \uD615\uC2DD \uC624\uB958: {msg}","body.sun":"\uD0DC\uC591","body.emb":"EMB (\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC)","body.earth":"\uC9C0\uAD6C","body.moon":"\uB2EC","l2.panel":"L2 \uC7A5\uBA74","l2.mode":"\uC88C\uD45C\uACC4","l2.mode_rot":"\uD68C\uC804 \uC88C\uD45C","l2.mode_inertial":"\uAD00\uC131 \uC88C\uD45C","l2.view":"\uBCF4\uAE30","l2.view_all":"\uC804\uCCB4","l2.view_emb":"\uC9C0\uAD6C\u2013\uB2EC\u2013L1\xB7L2","l2.view_l2":"L2 \uADFC\uCC98","l2.view_l2zoom":"L2 \uD655\uB300","l2.time":"\uC2DC\uAC01","l2.play":"\uC7AC\uC0DD","l2.pause":"\uBA48\uCDA4","l2.speed":"{n} \uC77C/\uCD08","l2.layer_lpoints":"\uB77C\uADF8\uB791\uC8FC \uC810","l2.layer_bodies":"\uD0DC\uC591\xB7EMB","l2.layer_dirs":"L2 \uBD88\uC548\uC815\xB7\uC548\uC815 \uBC29\uD5A5","l2.layer_earthmoon":"\uC9C0\uAD6C\xB7\uB2EC (\uC2E4\uC81C \uCC9C\uCCB4\uB825)","l2.layer_halo":"3-C \uD5E4\uC77C\uB85C \uC871","l2.layer_escape":"3-B \uC774\uD0C8 \uADA4\uC801","l2.layer_burns":"\uC218\uC815 \uC704\uCE58 (3-A\xB73-C\xB74-C)","l2.layer_ref":"4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4","l2.unstable":"\uBD88\uC548\uC815","l2.stable":"\uC548\uC815","l2.halo_main":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4","l2.g_lpoints":"\uB77C\uADF8\uB791\uC8FC \uC810 (1\uB2E8\uACC4)","l2.g_dirs":"L2 \uBC29\uD5A5 (2\uB2E8\uACC4)","l2.g_halo":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4 (3-C)","l2.g_annual":"\uC5F0\uAC04 \u0394v (3-A\xB73-C\xB74-C)","l2.g_ref":"\uAE30\uC900 \uADA4\uB3C4\uC640 \uD5E4\uC77C\uB85C (4-C\xB74-D)","l2.g_escape":"\uC774\uD0C8 \uC2DC\uAC01 (3-B)","l2.g_interp":"\uCC9C\uCCB4\uB825 \uBCF4\uAC04 \uC790\uCCB4 \uC624\uCC28 (4-A)","l2.g_m0":"\uAF2C\uB9AC\uD45C \uC2DC\uD5D8 \uC22B\uC790 (M0)","l2.legend_markers":"\uD45C\uC9C0 \uD06C\uAE30\xB7\uD654\uC0B4 \uAE38\uC774\uB294 \uC2E4\uC81C \uD06C\uAE30\uAC00 \uC544\uB2D8 (\uD45C\uC2DC\uC6A9). \uC22B\uC790\uB97C \uB204\uB974\uBA74 \uCD9C\uCC98 \uCC3D.","l2.legend_pulsating":"\uC9C0\uAD6C\xB7\uB2EC: \uC2E4\uC81C \uCC9C\uCCB4\uB825 (DE441) \uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C \u2014 \uAE38\uC774 \uB2E8\uC704 = \uADF8 \uC21C\uAC04\uC758 \uD0DC\uC591\u2013EMB \uAC70\uB9AC. 4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4\uB3C4 \uAC19\uC740 \uC88C\uD45C.","l2.legend_inertial":"\uAD00\uC131 \uC88C\uD45C: x \uCD95 = \uD669\uB3C4 J2000 X, z \uCD95 = \uADA4\uB3C4\uBA74 \uBC95\uC120 (\u2248 \uD669\uB3C4 \uBD81\uADF9). CR3BP \uD68C\uC804\uC88C\uD45C\uB97C \u03B8 = \u03B8\u2080 + (t \u2212 2026-01-01 TDB)/\uC2DC\uAC04 \uB2E8\uC704 \uB9CC\uD07C \uB3CC\uB9B0 \uAC83 (\u03B8\u2080 = \uADF8\uB0A0 EMB \uC758 \uD669\uACBD).","source.browser":"\uACC4\uC0B0 \uC704\uCE58","l2.escape_rule":"\uD45C\uC2DC\uC6A9\uC73C\uB85C \uACE0\uB978 \uC608 (\uADDC\uCE59: e_u* \uBD80\uD638\uB9C8\uB2E4 |e_u*|/\u03B3 \uAC00 1e-9\xB71e-7\xB71e-5 \uC5D0 \uAC00\uC7A5 \uAC00\uAE4C\uC6B4 \uC8FC \uD45C\uBCF8 \uD558\uB098\uC529, 0.316\u03B3 \uC774\uD0C8\xB7\uC7A1\uC74C \uC9C0\uBC30 \uD45C\uBCF8 \uC81C\uC678)","panel.open":"\uD328\uB110 \uD3B4\uAE30","panel.close":"\uD328\uB110 \uC811\uAE30","ui.layers":"\uB808\uC774\uC5B4","ui.legend":"\uBC94\uB840","ui.numbers":"\uBAA8\uB4E0 \uC22B\uC790","ui.menu":"\uBA54\uB274","card.sphere_note":"\uAD6C\uB294 \uBCF4\uC774\uAC8C \uD0A4\uC6CC \uADF8\uB838\uB2E4 (\uC2E4\uC81C \uBC18\uC9C0\uB984: Horizons \uBA38\uB9AC\uB9D0)","card.no_numbers":"\uC774 \uCC9C\uCCB4\uC5D0 \uB538\uB9B0 \uACB0\uACFC \uC22B\uC790\uB294 \uC544\uC9C1 \uC5C6\uB2E4","l2.family_all":"\uD5E4\uC77C\uB85C \uC871 \uC804\uCCB4 \uBCF4\uAE30 (\uAE30\uBCF8\uC740 \uC77C\uBD80\uB9CC)","l2.legend_spheres":"\uD0DC\uC591\xB7\uC9C0\uAD6C\xB7\uB2EC\uC740 \uD06C\uAE30 \uC788\uB294 \uAD6C \u2014 \uC791\uC73C\uBA74 \uBCF4\uC774\uAC8C \uD0A4\uC6B4\uB2E4","tag.short_impl":"\uAD6C\uD604","tag.short_external":"\uC678\uBD80","tag.short_physical":"\uBB3C\uB9AC","preset.clean":"\uAE54\uB054","preset.explore":"\uD0D0\uC0C9","preset.research":"\uC5F0\uAD6C","preset.custom":"\uC0AC\uC6A9\uC790 \uC124\uC815","preset.zooming":"\uD655\uB300 \uC911","layer.g_bodies":"\uCC9C\uCCB4\xB7\uC810","layer.g_orbits":"\uADA4\uB3C4\xB7\uADA4\uC801","layer.g_numbers":"\uBB3C\uB9AC \uC218\uCE58\xB7\uAF2C\uB9AC\uD45C","layer.g_aux":"\uBCF4\uC870","layer.sun":"\uD0DC\uC591","layer.earth":"\uC9C0\uAD6C","layer.moon":"\uB2EC","layer.emb":"EMB (\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC)","layer.lpoints":"L1 ~ L5","layer.halo_main":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4","layer.halo_family":"\uD5E4\uC77C\uB85C \uC871","layer.escape":"3-B \uC774\uD0C8 \uADA4\uC801","layer.ref":"4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4","layer.burns":"\uC218\uC815 (\u0394v) \uC704\uCE58","layer.moon_orbit":"\uB2EC \uADA4\uB3C4 (\uC9C0\uB09C 30 \uC77C \uC790\uCDE8)","layer.planet_orbits":"\uACF5\uC804 \uADA4\uB3C4","layer.dirs":"L2 \uBC29\uD5A5\uC120 (\uBD88\uC548\uC815\xB7\uC548\uC815)","layer.n_distance":"\uAC70\uB9AC","layer.n_period":"\uC8FC\uAE30","layer.n_angle":"\uBC29\uD5A5 \uAC01\uB3C4","layer.n_annual":"\uC5F0\uAC04 \u0394v","layer.n_escape":"\uC774\uD0C8 \uC2DC\uAC01","layer.n_tags":"\uAC80\uC99D \uAF2C\uB9AC\uD45C","layer.labels":"\uC774\uB984\uD45C","layer.scale":"\uAC70\uB9AC \uB208\uAE08","layer.grid":"\uAE30\uC900 \uD3C9\uBA74 \uACA9\uC790 (\uADA4\uB3C4\uBA74)","layer.axes":"\uC88C\uD45C\uCD95","layer.tags_note":"\uAF2C\uB9AC\uD45C\uB97C \uB044\uBA74 \uC22B\uC790\uB3C4 \uBAA8\uB450 \uC228\uB294\uB2E4 \u2014 \uC22B\uC790\uB294 \uC5B8\uC81C\uB098 \uAF2C\uB9AC\uD45C\uC640 \uD568\uAED8","key.labels":"\uC774\uB984\uD45C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_orbits":"\uADA4\uB3C4\xB7\uADA4\uC801 \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_numbers":"\uBB3C\uB9AC \uC218\uCE58\xB7\uAF2C\uB9AC\uD45C \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_bodies":"\uCC9C\uCCB4\xB7\uC810 \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.grid":"\uAE30\uC900 \uD3C9\uBA74 \uACA9\uC790","key.p_clean":"\uD504\uB9AC\uC14B: \uAE54\uB054","key.p_explore":"\uD504\uB9AC\uC14B: \uD0D0\uC0C9","key.p_research":"\uD504\uB9AC\uC14B: \uC5F0\uAD6C","key.help":"\uC774 \uB3C4\uC6C0\uB9D0","help.title":"\uB2E8\uCD95\uD0A4","help.button":"\uB2E8\uCD95\uD0A4 (?)","help.note":"\uB808\uC774\uC5B4 \uB2E8\uCD95\uD0A4\uB294 \uB9C9\uB300\uB97C \uAEBC\uB0B4\uC9C0 \uC54A\uB294\uB2E4. Esc = \uB9C9\uB300 \uC228\uAE30\uAE30. \uCF20 \uC0C1\uD0DC\uB294 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uAE30\uC5B5\uB41C\uB2E4.","help.keys_line":"L \uC774\uB984\uD45C \xB7 O \uADA4\uB3C4 \xB7 N \uC218\uCE58 \xB7 1 2 3 \uD504\uB9AC\uC14B","time.start":"\uCC98\uC74C\uC73C\uB85C","time.now":"\uD604\uC7AC","card.numbers_off":"\uCF1C\uC9C4 \uC218\uCE58 \uB808\uC774\uC5B4\uAC00 \uC5C6\uC5B4 \uC22B\uC790\uB97C \uC228\uACBC\uB2E4 (\uB808\uC774\uC5B4 \u2192 \uBB3C\uB9AC \uC218\uCE58)","desc.Sun":"\uD0DC\uC591. CR3BP \uC758 \uD070 \uC9C8\uB7C9 (\uCCAB\uC9F8 \uCC9C\uCCB4).","desc.EMB":"\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC. CR3BP \uC758 \uB458\uC9F8 \uCC9C\uCCB4 (\uC9C0\uAD6C\uC640 \uB2EC\uC744 \uD55C \uC810\uC73C\uB85C \uBCF8 \uAC83).","desc.Earth":"\uC9C0\uAD6C. \uC2E4\uC81C \uCC9C\uCCB4\uB825 (DE441) \uC704\uCE58\uB97C \uB9E5\uB3D9 \uC88C\uD45C\uB85C \uADF8\uB838\uB2E4. \uB0AE\xB7\uBC24 \uACBD\uACC4\uB294 \uD587\uBE5B \uBC29\uD5A5.","desc.Moon":`\uB2EC. \uC2E4\uC81C \uCC9C\uCCB4\uB825 \uC704\uCE58. \uB4A4\uC758 \uAF2C\uB9AC\uB294 \uC9C0\uB09C \uC790\uCDE8 (\uB4A4\uB85C \uAC08\uC218\uB85D \uD750\uB9BC). \uD45C\uBA74 \uADF8\uB9BC: NASA SVS CGI Moon Kit (LRO LROC, \uACF5\uACF5 \uC601\uC5ED \u2014 \uCD9C\uCC98 "NASA's Scientific Visualization Studio"). \uADF8\uB9BC \uBC29\uD5A5\uC740 \uD45C\uC2DC\uC6A9 \uADFC\uC0AC (\uD3C9\uADE0 \uC9C0\uAD6C \uCABD \uBA74\uC744 \uC9C0\uAD6C \uCABD\uC73C\uB85C, \uCE6D\uB3D9 \uC5C6\uC74C).`,"desc.L1":"\uD0DC\uC591 \uCABD \uB77C\uADF8\uB791\uC8FC \uC810 (CR3BP \uD3C9\uD615\uC810, 1\uB2E8\uACC4). \uBD88\uC548\uC815 \u2014 \uC774 \uC5F0\uAD6C\uC5D0\uC11C \uC9C1\uC811 \uACC4\uC0B0\uD558\uC9C0\uB294 \uC54A\uC558\uB2E4 (\uACF5\uC120 \uD3C9\uD615\uC810\uC774 \uBD88\uC548\uC815\uD558\uB2E4\uB294 \uC11C\uC220\uC758 \uCABD\uC218\uB294 \uD655\uC778 \uD544\uC694).","desc.L2":"\uC774 \uC5F0\uAD6C\uC758 \uB300\uC0C1. \uD0DC\uC591 \uBC18\uB300\uCABD \uD3C9\uD615\uC810 \u2014 \uBD88\uC548\uC815\uD574\uC11C \uADA4\uB3C4 \uC720\uC9C0 (\u0394v) \uAC00 \uD544\uC694\uD558\uB2E4.","desc.L3":"\uD0DC\uC591 \uB108\uBA38 \uBC18\uB300\uD3B8\uC758 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC548\uC815\uC131\uC740 \uC774 \uC5F0\uAD6C\uC5D0\uC11C \uACC4\uC0B0\uD558\uC9C0 \uC54A\uC558\uB2E4 (\uD655\uC778 \uD544\uC694).","desc.L4":"\uC55E\uC11C\uAC00\uB294 \uC0BC\uAC01 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC120\uD615 \uC548\uC815 \u2014 1\uB2E8\uACC4 Routh \uD310\uC815 (\u03BC \uAC00 \uC784\uACC4 \uC9C8\uB7C9\uBE44 (Sicardy 2010) \uBCF4\uB2E4 \uD6E8\uC52C \uC791\uC74C, \uAD6C\uD604 \uAC80\uC99D \u2014 \uBB38\uD5CC \uB300\uC870).","desc.L5":"\uB4A4\uB530\uB974\uB294 \uC0BC\uAC01 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC120\uD615 \uC548\uC815 \u2014 1\uB2E8\uACC4 Routh \uD310\uC815 (L4 \uC640 \uAC19\uC74C).","desc.halo_main":"3-C \uC5D0\uC11C \uB9CC\uB4E0 \uD5E4\uC77C\uB85C \uADA4\uB3C4 \uC871\uC758 \uC8FC \uADA4\uB3C4 \u2014 \uADA4\uB3C4 \uC720\uC9C0 \uACC4\uC0B0\uC758 \uAE30\uC900.","l2.view_jwst":"JWST","l2.layer_jwst":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","l2.layer_jwst_ext":"JWST \uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC \uBE44\uAD50","l2.layer_jwst_phys":"JWST \uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC \uBE44\uAD50","l2.legend_jwst":"JWST (\uAE08\uBE5B): \uC810 = \uBC1B\uC740 \uC810 (\uD558\uB8E8 \uAC04\uACA9), \uC810\uC120 = \uADF8 \uC0AC\uC774 \uBCF4\uAC04 (4-A \uC5D0\uB974\uBBF8\uD2B8), \uC2E4\uC120 = 10 \uBD84 \uAC04\uACA9 \uBC1B\uC740 \uC810. \uC608\uCE21: \uC8FC\uD669 = JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (\uC678\uBD80 \uB300\uC870), \uCD08\uB85D = \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (\uBB3C\uB9AC \uAC80\uC99D), \uC9C4\uD55C \uC120 = \uBE44\uAD50 \uB300\uC0C1, \uC605\uC740 \uC120 = \uB0B4 \uBAA8\uD615","layer.jwst":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","layer.jwst_ext":"\uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (\uC678\uBD80 \uB300\uC870)","layer.jwst_phys":"\uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (\uBB3C\uB9AC \uAC80\uC99D)","layer.n_jwst":"\uC608\uCE21 \uC624\uCC28","body.jwst":"JWST","desc.JWST":"\uC81C\uC784\uC2A4 \uC6F9 \uC6B0\uC8FC\uB9DD\uC6D0\uACBD. \uAE08\uBE5B \uC120 = \uC7AC\uAD6C\uC131\uD55C \uC2E4\uC81C \uBE44\uD589 \uADA4\uC801 (Horizons, 4-A \uC790\uB8CC): \uC810 = \uBC1B\uC740 \uC810 (\uD558\uB8E8 \uAC04\uACA9), \uC810\uC120 = \uD558\uB8E8 \uB9C8\uB514 \uC0AC\uC774 \uBCF4\uAC04, \uC2E4\uC120 = 10 \uBD84 \uAC04\uACA9 \uBC1B\uC740 \uC810. \uD45C\uC9C0 = \uC7AC\uAD6C\uC131 \uB05D. \uC544\uB798\uB294 5\uB2E8\uACC4 \uC608\uCE21\uC758 \uB450 \uBE44\uAD50 \u2014 \uAF2C\uB9AC\uD45C\uAC00 \uB2E4\uB974\uB2E4.","desc.jwst_period":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801\uC758 \uD55C \uBC14\uD034 \uAE38\uC774\uB97C NASA \uC6D0\uBB38, \uAC19\uC740 \uD06C\uAE30\uC758 CR3BP \uD5E4\uC77C\uB85C\uC640 \uBE44\uAD50\uD55C\uB2E4.","jwst.orbit_label":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","jwst.layer_ext_short":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC \uBE44\uAD50","jwst.layer_phys_short":"\uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC \uBE44\uAD50","jwst.layer_ext":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50","jwst.layer_phys":"\uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50","jwst.rep_5d":"5 \uC77C","jwst.axis_note":"\uC138\uB85C = \uC704\uCE58 \uCC28 (km, \uB85C\uADF8), \uAC00\uB85C = \uC2DC\uC791 \uB4A4 (\uC77C). \uC810 = results/stage5.json \uC5D0 \uC801\uD78C \uAC12","jwst.period_button":"\uC8FC\uAE30 \uC124\uBA85 \uCE74\uB4DC \uC5F4\uAE30","jwst.period_title":"JWST \uC8FC\uAE30 \u2014 \uC7AC\uAD6C\uC131 \uB300 NASA\xB7\uD5E4\uC77C\uB85C","jwst.period_class":"\uBD84\uB958","jwst.no_predictions":"\uC608\uCE21 \uC790\uB8CC\uAC00 \uC5C6\uB2E4","jwst.g_ext":"JWST \uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (5\uB2E8\uACC4)","jwst.g_phys":"JWST \uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (5\uB2E8\uACC4)","jwst.g_period":"JWST \uC8FC\uAE30 (4-A)","l2.view_jwstzoom":"JWST \uD655\uB300","l2.legend_jwstzoom":"JWST \uD655\uB300 (\uC608\uCE21 \uB05D \uB458\uB808 \uC218\uC2ED km): \uD070 \uC810 = \uAC19\uC740 \uC2DC\uAC01\uC758 \uC810, \uD770 \uC120\uBD84 = \uADF8 \uB458 \uC0AC\uC774 \uC704\uCE58 \uCC28 (\uC22B\uC790\uB294 Python \uAC12\uACFC \uAF2C\uB9AC\uD45C). \uC120\uC740 \uC800\uC7A5\uD55C \uC810 (1 \uC2DC\uAC04 \uAC04\uACA9, JPL 01U \uB294 \uD558\uB8E8 \uAC04\uACA9) \uC744 \uACE7\uAC8C \uC774\uC74C. \uADF8\uB9AC\uB294 \uC704\uCE58\uB294 \uB9E5\uB3D9 \uC88C\uD45C\uB77C \uC2E4\uC81C \uAC70\uB9AC\uC640 1 % \uC548\uC5D0\uC11C \uB2E4\uB974\uB2E4","jwst.marker_fixed":"{date} \uC704\uCE58 (\uACE0\uC815)","jwst.zoom_phys":"\uD655\uB300\uD574\uC11C \uBCF4\uAE30 \u2014 \uB300\uD45C 5 \uC77C \uC9C0\uC810 (\uC138 \uC120)","jwst.zoom_ext":"\uD655\uB300\uD574\uC11C \uBCF4\uAE30 \u2014 \uCC3D \uB05D:","jwst.zoom_focus_R5":"JWST \uD655\uB300 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50, \uB300\uD45C 5 \uC77C \uC9C0\uC810","jwst.zoom_focus_A":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D A \uB05D","jwst.zoom_focus_B":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D B \uB05D","jwst.zoom_focus_C":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D C \uB05D","jwst.zoom_norecon":"\uC2E4\uC81C \uADA4\uC801 \uC790\uB8CC \uC5C6\uC74C (2026-10-05 \uC774\uD6C4)","jwst.zl_recon":"\uC7AC\uAD6C\uC131 \uADA4\uC801 (03U)","jwst.zl_mine_kB":"\uB0B4 \uBAA8\uD615 (k_B)","jwst.zl_jpl01U":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21 (01U)","jwst.zl_jpl":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21","jwst.gap_mine_recon":"\uB0B4 \uBAA8\uD615 \u2194 \uC7AC\uAD6C\uC131","jwst.gap_jpl_recon":"JPL \u2194 \uC7AC\uAD6C\uC131","jwst.gap_mine_jpl":"\uB0B4 \uBAA8\uD615 \u2194 JPL","source.join":"\uC7AC\uAD6C\uC131 \uADA4\uC801 \uC774\uC74C","l2.view_lab":"\uC2E4\uD5D8\uC2E4","lab.title":"\uC2E4\uD5D8\uC2E4 \u2014 L2 \uADFC\uCC98 \uCD08\uAE30 \uC0C1\uD0DC\uC758 \uC774\uD0C8","lab.scope":"CR3BP \uBAA8\uD615 \uC548\uC758 \uACB0\uACFC (\uAD6C\uD604 \uAC80\uC99D \uC131\uACA9 \u2014 \uBB3C\uB9AC \uAC80\uC99D \uC544\uB2D8). \uC22B\uC790\uB294 \uBAA8\uB450 \uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0 (Python \uC77C\uCE58 \uC2DC\uD5D8 \uD1B5\uACFC)","lab.fold":"\uC811\uAE30","lab.unfold":"\uD3BC\uCE58\uAE30","lab.loading":"\uC2E4\uD5D8\uC2E4 \uC790\uB8CC \uBD88\uB7EC\uC624\uB294 \uC911\u2026 (\uCC98\uC74C \uD55C \uBC88, \uC57D 17 MB)","lab.examples":"\uC608\uC2DC","lab.ex_q10":"\uBE60\uB978 \uC774\uD0C8 (10 %)","lab.ex_q50":"\uC911\uAC04 (50 %)","lab.ex_q90":"\uB290\uB9B0 \uC774\uD0C8 (90 %)","lab.ex_out":"\uBC94\uC704 \uBC16 \uC2DC\uC5F0","lab.ex_noise":"\uC7A1\uC74C \uBC14\uB2E5 \uADFC\uCC98","lab.ex_src":"\uC608\uC2DC \uCD9C\uCC98: {src} (3-B \uD45C\uBCF8 \uBC88\uD638 {no})","lab.s_sign":"e_u \uBD80\uD638","lab.s_eu":"|e_u| (\uBD88\uC548\uC815)","lab.s_es":"e_s (\uC548\uC815)","lab.s_ap":"\uBA74\uB0B4 \uC9C4\uD3ED A_p","lab.s_phip":"\uBA74\uB0B4 \uC704\uC0C1","lab.s_az":"\uBA74\uC678 \uC9C4\uD3ED A_z","lab.s_phiz":"\uBA74\uC678 \uC704\uC0C1","lab.sign_out":"+ \uBC14\uAE65\uCABD","lab.sign_in":"\u2212 \uC9C0\uAD6C \uCABD","lab.outside":"\uBC94\uC704 \uBC16 \uD5C8\uC6A9 (\uC678\uC0BD \u2014 \uC5F0\uAD6C \uD504\uB9AC\uC14B\uB9CC)","lab.col_r":"\uAE30\uC900 R","lab.col_truth":"\uC815\uB2F5 [\uC77C]","lab.col_t3":"T3 [\uC77C]","lab.col_d24":"D24 [\uC77C]","lab.col_mlp":"MLP-C_ln [\uC77C]","lab.col_hybrid":"\uD558\uC774\uBE0C\uB9AC\uB4DC [\uC77C] \u2014 \uD310\uC815: \uAE30\uAC01","lab.col_dt3":"T3 \uCC28 \u0394ln t","lab.col_dd24":"D24 \uCC28 \u0394ln t","lab.col_dmlp":"MLP \uCC28 \u0394ln t","lab.col_dir":"\uBC29\uD5A5 (e_u*)","lab.col_flag":"\uC2E0\uB8B0\uB3C4","lab.flag_extrap":"\uC678\uC0BD","lab.flag_unc":"\uBD88\uD655\uC2E4","lab.flag_unc_mismatch":"MLP-C_ln \uACFC T3 \uC758 \uCC28\uAC00 \uAC80\uC99D RMSE_log \uC758 3 \uBC30\uB97C \uB118\uC74C (\uC0AC\uC804 \uB4F1\uB85D 5\uC808)","lab.flag_unc_spread":"MLP \uC2DC\uB4DC 3 \uAC1C\uC758 \uD37C\uC9D0\uC774 \uAC80\uC99D \uC911\uC559\uAC12\uC758 3 \uBC30\uB97C \uB118\uC74C (\uC0AC\uC804 \uB4F1\uB85D 5\uC808)","lab.extrap_long":"\uC678\uC0BD \u2014 \uC2E0\uB8B0\uD558\uC9C0 \uC54A\uC74C (\uD559\uC2B5 \uBC94\uC704 \uBC16)","lab.no_escape":"\uBBF8\uC774\uD0C8","lab.dir_hit":"\uB9DE\uC74C","lab.dir_miss":"\uD2C0\uB9BC","lab.waiting":"\uC190\uC744 \uB193\uC73C\uBA74 \uC815\uB2F5 \uC801\uBD84 \uC2DC\uC791","lab.integrating":"\uC815\uB2F5 \uC801\uBD84 \uC911 (Worker)\u2026","lab.integrating_days":"\uC815\uB2F5 \uC801\uBD84 \uC911 \u2014 {d} \uC77C","lab.done":"\uC815\uB2F5 \uC801\uBD84 \uB05D ({ms} ms, \uADA4\uC801 \uC810 {n} \uAC1C)","lab.error":"\uC624\uB958: {msg}","lab.hybrid_note":"\uD558\uC774\uBE0C\uB9AC\uB4DC = T3\xB7D24 \uB97C R \uB9C8\uB2E4 \uC774\uC5B4 \uBD99\uC778 \uAC83 \u2014 \uBB34\uAC8C w_R 6 \uAC1C\uAC00 \uBAA8\uB450 0 \uC774\uB77C D24 \uC640 \uAC19\uB2E4. \uC0AC\uC804 \uB4F1\uB85D \uD310\uC815 (H): \uAE30\uAC01 (\uAD6C\uC870\uC801), \uC794\uCC28 \uBAA8\uB378 \uD310\uC815 (R): \uC9C0\uC9C0. ","lab.foot":"T3 = \uC120\uD615 \uC774\uB860 + 2\uCC28 \uBCF4\uC815 e_u*, D24 = T3 + RF \uC794\uCC28 (50 \uADF8\uB8E8), MLP-C_ln = \uC2E0\uACBD\uB9DD \uC2DC\uB4DC 3 \uD3C9\uADE0. \uC815\uB2F5 = DOP853 \uC801\uBD84 (rtol 1e-12, \uCD5C\uB300 730.5 \uC77C, 0.316\u03B3 \uC5D0\uC11C \uBA48\uCDA4). \u0394ln t = \uC608\uCE21 \u2212 \uC815\uB2F5.","lab.mobile_note":"\uC2E4\uD5D8\uC2E4\uC740 \uCEF4\uD4E8\uD130\uC5D0\uC11C \uC774\uC6A9\uD574 \uC8FC\uC138\uC694. \uD734\uB300\uD3F0 \uD654\uBA74\uC5D0\uC11C\uB294 \uC2AC\uB77C\uC774\uB354\uC640 \uACB0\uACFC \uD45C\uAC00 \uC881\uC544 \uCD08\uAE30 \uC0C1\uD0DC\uB97C \uC815\uD655\uD788 \uB193\uAE30 \uC5B4\uB835\uC2B5\uB2C8\uB2E4. (\uC548\uB0B4 \uBB38\uAD6C \uCD08\uC548 \u2014 \uC0AC\uC6A9\uC790 \uD655\uC778 \uB300\uAE30)","time.go":"\uC774\uB3D9","time.out_of_range":"\uC790\uB8CC \uAE30\uAC04 \uBC16 (2022-01-01 ~ 2049-12-31)","time.loading":"\uCC9C\uCCB4\uB825 \uBD88\uB7EC\uC624\uB294 \uC911\u2026","l2.view_solar":"\uD0DC\uC591\uACC4","body.mercury":"\uC218\uC131\uACC4","body.venus":"\uAE08\uC131\uACC4","body.mars":"\uD654\uC131\uACC4","body.jupiter":"\uBAA9\uC131\uACC4","body.saturn":"\uD1A0\uC131\uACC4","body.uranus":"\uCC9C\uC655\uC131\uACC4","body.neptune":"\uD574\uC655\uC131\uACC4","desc.Mercury":"\uC218\uC131 (\uD589\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC \u2014 \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 12 \uC2DC\uAC04 \uAC04\uACA9) \uBCF4\uAC04\uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C.","desc.Venus":"\uAE08\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 2 \uC77C \uAC04\uACA9) \uBCF4\uAC04\uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C.","desc.Mars":"\uD654\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 4 \uC77C \uAC04\uACA9).","desc.Jupiter":"\uBAA9\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 16 \uC77C \uAC04\uACA9).","desc.Saturn":"\uD1A0\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","desc.Uranus":"\uCC9C\uC655\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","desc.Neptune":"\uD574\uC655\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","view.true_size":"\uC2E4\uC81C \uD06C\uAE30","view.true_size_title":"\uCC9C\uCCB4 \uD06C\uAE30 \uACFC\uC7A5 (\uD654\uBA74\uC5D0\uC11C \uC791\uC73C\uBA74 \uD0A4\uC6C0 \u2014 \uD45C\uC2DC\uC6A9 \uADFC\uC0AC) \uB044\uAE30","layer.planets":"\uD589\uC131\uACC4","layer.stars":"\uBCC4","layer.milkyway":"\uC740\uD558\uC218","layer.nightlights":"\uC9C0\uAD6C \uBC24 \uBD88\uBE5B","layer.sunglow":"\uD0DC\uC591 \uBE5B \uBC88\uC9D0","sky.credits_stars":"\uBCC4: HYG v4.4 (David Nash, CC BY-SA 4.0)","sky.credits_mw":"\uC740\uD558\uC218: ESA/Gaia/DPAC (CC BY-SA 3.0 IGO)","sky.credits_moon":"\uB2EC: NASA SVS (\uACF5\uACF5 \uC601\uC5ED)","sky.credits_horizons":"\uADA4\uB3C4: JPL Horizons","sky.credits_earth":"\uC9C0\uAD6C \uD45C\uBA74: NASA Earth Observatory (Blue Marble\xB7Black Marble)","credits.short":"\uCD9C\uCC98","credits.images":"\uADF8\uB9BC\xB7\uC790\uB8CC \uCD9C\uCC98","credits.open":"\uADF8\uB9BC\xB7\uC790\uB8CC \uCD9C\uCC98 \uBCF4\uAE30 (\uCD9C\uCC98 \uCC3D)","credits.nasa_rule":"NASA \uD45C\uAE30 \uADFC\uAC70 (\uC6D0\uBB38):"};var ud={"app.title":"Sun\u2013Earth/Moon L2","app.subtitle":"Stage 7 3D visualization \xB7 M2 JWST layer","lang.switch":"\uD55C\uAD6D\uC5B4","lang.switch_title":"Switch language","version.commit":"commit","version.dirty":"uncommitted changes","version.title":"Version \xB7 build date (KST) \xB7 commit","panel.samples":"Tag test numbers","panel.samples_note":"Click a number to open its source window. Hover a tag to see the detailed category.","tag.weak":"weak","tag.display_approx":"display approximation","source.title":"Source","source.value":"Value","source.unit":"Unit","source.file":"File","source.key":"Key","source.commit":"Computed by","source.source_hash":"Source hash (first 12)","source.ref_commit":"Reference commit","source.build":"App build","source.stage":"Stage","source.model":"Model","source.verification":"Verification tag","source.note":"Note","source.close":"Close","source.browser_calc":"Browser calculation (passed the Python match test, tolerance {tol})","source.time_scale":"Time scale","pwa.update":"New version available \u2014 reload","pwa.offline_ready":"Ready offline","error.load":"Could not read data: {msg}","error.schema":"Data format error: {msg}","body.sun":"Sun","body.emb":"EMB (Earth\u2013Moon barycenter)","body.earth":"Earth","body.moon":"Moon","l2.panel":"L2 scene","l2.mode":"Frame","l2.mode_rot":"Rotating","l2.mode_inertial":"Inertial","l2.view":"View","l2.view_all":"Whole","l2.view_emb":"Earth\u2013Moon\u2013L1/L2","l2.view_l2":"Near L2","l2.view_l2zoom":"L2 close-up","l2.time":"Time","l2.play":"Play","l2.pause":"Pause","l2.speed":"{n} d/s","l2.layer_lpoints":"Lagrange points","l2.layer_bodies":"Sun & EMB","l2.layer_dirs":"L2 unstable/stable directions","l2.layer_earthmoon":"Earth & Moon (real ephemeris)","l2.layer_halo":"3-C halo family","l2.layer_escape":"3-B escape trajectories","l2.layer_burns":"Correction maneuvers (3-A, 3-C, 4-C)","l2.layer_ref":"4-C/4-D reference orbits","l2.unstable":"unstable","l2.stable":"stable","l2.halo_main":"Main halo orbit","l2.g_lpoints":"Lagrange points (stage 1)","l2.g_dirs":"L2 directions (stage 2)","l2.g_halo":"Main halo orbit (3-C)","l2.g_annual":"Annual \u0394v (3-A, 3-C, 4-C)","l2.g_ref":"Reference orbits vs halo (4-C, 4-D)","l2.g_escape":"Escape times (3-B)","l2.g_interp":"Ephemeris interpolation error (4-A)","l2.g_m0":"Tag test numbers (M0)","l2.legend_markers":"Marker sizes and arrow lengths are not to scale (display only). Click a number for its source.","l2.legend_pulsating":"Earth & Moon: real ephemeris (DE441) in the pulsating frame \u2014 length unit = instantaneous Sun\u2013EMB distance. The 4-C/4-D reference orbits use the same frame.","l2.legend_inertial":"Inertial frame: x = ecliptic J2000 X, z = orbit normal (\u2248 ecliptic north). The CR3BP rotating frame turned by \u03B8 = \u03B8\u2080 + (t \u2212 2026-01-01 TDB)/time unit (\u03B8\u2080 = EMB's ecliptic longitude on that date).","source.browser":"Computed in","l2.escape_rule":"Examples picked for display (rule: for each sign of e_u*, the main sample whose |e_u*|/\u03B3 is closest to 1e-9, 1e-7, 1e-5; escaped past 0.316\u03B3, noise-dominated samples excluded)","panel.open":"Show panel","panel.close":"Hide panel","ui.layers":"Layers","ui.legend":"Legend","ui.numbers":"All numbers","ui.menu":"Menu","card.sphere_note":"Spheres are enlarged to be visible (true radius: Horizons header)","card.no_numbers":"No result numbers for this object yet","l2.family_all":"Show the whole halo family (default: a subset)","l2.legend_spheres":"Sun, Earth and Moon are spheres \u2014 enlarged when too small to see","tag.short_impl":"impl.","tag.short_external":"ext.","tag.short_physical":"phys.","preset.clean":"Clean","preset.explore":"Explore","preset.research":"Research","preset.custom":"Custom","preset.zooming":"Zoomed in","layer.g_bodies":"Bodies & points","layer.g_orbits":"Orbits & paths","layer.g_numbers":"Physical values & tags","layer.g_aux":"Aids","layer.sun":"Sun","layer.earth":"Earth","layer.moon":"Moon","layer.emb":"EMB (Earth\u2013Moon barycentre)","layer.lpoints":"L1 \u2013 L5","layer.halo_main":"Main halo orbit","layer.halo_family":"Halo family","layer.escape":"3-B escape paths","layer.ref":"4-C / 4-D reference orbits","layer.burns":"Correction (\u0394v) points","layer.moon_orbit":"Moon orbit (past 30-day trail)","layer.planet_orbits":"Planet orbits","layer.dirs":"L2 direction lines (unstable / stable)","layer.n_distance":"Distances","layer.n_period":"Periods","layer.n_angle":"Direction angles","layer.n_annual":"Annual \u0394v","layer.n_escape":"Escape times","layer.n_tags":"Verification tags","layer.labels":"Labels","layer.scale":"Distance scale","layer.grid":"Reference-plane grid (orbit plane)","layer.axes":"Coordinate axes","layer.tags_note":"Turning tags off hides every number \u2014 numbers always come with their tag","key.labels":"Labels on / off","key.g_orbits":"Orbits & paths on / off","key.g_numbers":"Physical values & tags on / off","key.g_bodies":"Bodies & points on / off","key.grid":"Reference-plane grid","key.p_clean":"Preset: Clean","key.p_explore":"Preset: Explore","key.p_research":"Preset: Research","key.help":"This help","help.title":"Keyboard shortcuts","help.button":"Shortcuts (?)","help.note":"Layer shortcuts do not bring up the bars. Esc hides the bars. Your layer choice is remembered in this browser.","help.keys_line":"L labels \xB7 O orbits \xB7 N values \xB7 1 2 3 presets","time.start":"To start","time.now":"Now","card.numbers_off":"No value layer is on, so the numbers are hidden (Layers \u2192 Physical values)","desc.Sun":"The Sun \u2014 the larger primary of the CR3BP.","desc.EMB":"The Earth\u2013Moon barycentre \u2014 the CR3BP's second primary (Earth and Moon as one point).","desc.Earth":"Earth, at its real ephemeris (DE441) position in pulsating coordinates. The day\u2013night line follows the sunlight.","desc.Moon":`The Moon. Real ephemeris position. The tail behind is its recent track (fading with age). Surface map: NASA SVS CGI Moon Kit (LRO LROC, public domain \u2014 credit "NASA's Scientific Visualization Studio"). Map orientation is a display approximation (mean Earth-facing side toward Earth, no libration).`,"desc.L1":"Sunward Lagrange point (CR3BP equilibrium, stage 1). Unstable \u2014 not computed directly in this study (page reference for the instability of collinear points still to be confirmed).","desc.L2":"The subject of this study: the anti-sunward equilibrium. It is unstable, so station-keeping (\u0394v) is needed.","desc.L3":"Equilibrium point on the far side of the Sun (CR3BP, stage 1). Its stability was not computed in this study (to be confirmed).","desc.L4":"Leading triangular equilibrium point (CR3BP, stage 1). Linearly stable \u2014 stage 1 Routh test (\u03BC far below the critical mass ratio of Sicardy 2010; implementation verification against literature).","desc.L5":"Trailing triangular equilibrium point (CR3BP, stage 1). Linearly stable \u2014 stage 1 Routh test (same as L4).","desc.halo_main":"The main orbit of the 3-C halo family \u2014 the reference for station-keeping.","l2.view_jwst":"JWST","l2.layer_jwst":"JWST reconstructed trajectory","l2.layer_jwst_ext":"JWST prediction \u2014 vs JPL no-burn prediction","l2.layer_jwst_phys":"JWST prediction \u2014 vs reconstructed trajectory","l2.legend_jwst":"JWST (gold): dots = received points (daily), dashed = interpolation between them (4-A Hermite), solid = received 10-minute points. Predictions: orange = vs JPL's no-burn prediction (external comparison), green = vs the reconstructed trajectory (physical validation); dark = reference, light = my model","layer.jwst":"JWST reconstructed trajectory","layer.jwst_ext":"Prediction \u2014 vs JPL no-burn prediction (external)","layer.jwst_phys":"Prediction \u2014 vs reconstructed trajectory (physical)","layer.n_jwst":"Prediction error","body.jwst":"JWST","desc.JWST":"James Webb Space Telescope. Gold line = reconstructed as-flown trajectory (Horizons, 4-A data): dots = received points (daily), dashed = interpolation between daily nodes, solid = received 10-minute points. Marker = end of the reconstruction. Below: the two comparisons of the stage 5 prediction \u2014 with different tags.","desc.jwst_period":"Compares the length of one circuit of JWST's reconstructed trajectory with NASA's text and with CR3BP halos of the same size.","jwst.orbit_label":"JWST reconstructed","jwst.layer_ext_short":"vs JPL no-burn prediction","jwst.layer_phys_short":"vs reconstructed trajectory","jwst.layer_ext":"Comparison with JPL's no-burn prediction","jwst.layer_phys":"Comparison with the reconstructed trajectory","jwst.rep_5d":"5 d","jwst.axis_note":"Vertical = position difference (km, log), horizontal = days after start. Dots = values written in results/stage5.json","jwst.period_button":"Open the period card","jwst.period_title":"JWST period \u2014 reconstruction vs NASA and halo","jwst.period_class":"Classification","jwst.no_predictions":"No prediction data","jwst.g_ext":"JWST prediction \u2014 vs JPL no-burn prediction (stage 5)","jwst.g_phys":"JWST prediction \u2014 vs reconstructed trajectory (stage 5)","jwst.g_period":"JWST period (4-A)","l2.view_jwstzoom":"JWST zoom","l2.legend_jwstzoom":"JWST zoom (tens of km around a prediction end): big dots = points at the same time, white segments = the position difference between them (numbers are Python values with tags). Lines connect the stored points straight (hourly; JPL 01U daily). Positions are drawn in pulsating coordinates, so drawn distances differ from real ones by under 1 %","jwst.marker_fixed":"position on {date} (fixed)","jwst.zoom_phys":"Zoom in \u2014 representative 5-day point (three lines)","jwst.zoom_ext":"Zoom in \u2014 window end:","jwst.zoom_focus_R5":"JWST zoom \u2014 vs the reconstructed trajectory, representative 5-day point","jwst.zoom_focus_A":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window A","jwst.zoom_focus_B":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window B","jwst.zoom_focus_C":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window C","jwst.zoom_norecon":"No actual-trajectory data (after 2026-10-05)","jwst.zl_recon":"Reconstructed trajectory (03U)","jwst.zl_mine_kB":"My model (k_B)","jwst.zl_jpl01U":"JPL no-burn prediction (01U)","jwst.zl_jpl":"JPL no-burn prediction","jwst.gap_mine_recon":"my model \u2194 reconstruction","jwst.gap_jpl_recon":"JPL \u2194 reconstruction","jwst.gap_mine_jpl":"my model \u2194 JPL","source.join":"Reconstruction join","l2.view_lab":"Lab","lab.title":"Lab \u2014 escape of initial states near L2","lab.scope":"Results inside the CR3BP model (implementation verification \u2014 not physical validation). All numbers are browser calculations (passed Python match tests)","lab.fold":"Fold","lab.unfold":"Unfold","lab.loading":"Loading lab data\u2026 (first time only, about 17 MB)","lab.examples":"Examples","lab.ex_q10":"Fast escape (10 %)","lab.ex_q50":"Middle (50 %)","lab.ex_q90":"Slow escape (90 %)","lab.ex_out":"Out-of-range demo","lab.ex_noise":"Near the noise floor","lab.ex_src":"Example source: {src} (3-B sample no. {no})","lab.s_sign":"Sign of e_u","lab.s_eu":"|e_u| (unstable)","lab.s_es":"e_s (stable)","lab.s_ap":"In-plane amplitude A_p","lab.s_phip":"In-plane phase","lab.s_az":"Out-of-plane amplitude A_z","lab.s_phiz":"Out-of-plane phase","lab.sign_out":"+ outward","lab.sign_in":"\u2212 Earthward","lab.outside":"Allow out of range (extrapolation \u2014 research preset only)","lab.col_r":"Criterion R","lab.col_truth":"Truth [d]","lab.col_t3":"T3 [d]","lab.col_d24":"D24 [d]","lab.col_mlp":"MLP-C_ln [d]","lab.col_hybrid":"Hybrid [d] \u2014 verdict: rejected","lab.col_dt3":"T3 error \u0394ln t","lab.col_dd24":"D24 error \u0394ln t","lab.col_dmlp":"MLP error \u0394ln t","lab.col_dir":"Direction (e_u*)","lab.col_flag":"Confidence","lab.flag_extrap":"extrapolated","lab.flag_unc":"uncertain","lab.flag_unc_mismatch":"MLP-C_ln and T3 differ by more than 3 \xD7 validation RMSE_log (pre-registration \xA75)","lab.flag_unc_spread":"Spread of the 3 MLP seeds exceeds 3 \xD7 the validation median (pre-registration \xA75)","lab.extrap_long":"Extrapolation \u2014 not trusted (outside the training range)","lab.no_escape":"no escape","lab.dir_hit":"correct","lab.dir_miss":"wrong","lab.waiting":"Release to start the truth integration","lab.integrating":"Integrating the truth (Worker)\u2026","lab.integrating_days":"Integrating the truth \u2014 day {d}","lab.done":"Truth integration done ({ms} ms, {n} trajectory points)","lab.error":"Error: {msg}","lab.hybrid_note":"Hybrid = T3 and D24 joined per R \u2014 all six weights w_R are 0, so it equals D24. Pre-registered verdict (H): rejected (structural); residual-model verdict (R): supported. ","lab.foot":"T3 = linear theory + second-order correction e_u*, D24 = T3 + RF residual (50 trees), MLP-C_ln = neural net, mean of 3 seeds. Truth = DOP853 integration (rtol 1e-12, up to 730.5 days, stops at 0.316\u03B3). \u0394ln t = prediction \u2212 truth.","lab.mobile_note":"Please use the lab on a computer. On a phone screen the sliders and result table are too narrow to place an initial state precisely. (Draft notice \u2014 awaiting user confirmation)","time.go":"Go","time.out_of_range":"Outside the data period (2022-01-01 \u2013 2049-12-31)","time.loading":"Loading ephemeris\u2026","l2.view_solar":"Solar system","body.mercury":"Mercury system","body.venus":"Venus system","body.mars":"Mars system","body.jupiter":"Jupiter system","body.saturn":"Saturn system","body.uranus":"Uranus system","body.neptune":"Neptune system","desc.Mercury":"Mercury (system barycenter \u2014 decision \u246E). Position = interpolated M4 ephemeris (DE441, 12 h step) in pulsating coordinates.","desc.Venus":"Venus system barycenter (decision \u246E). Position = interpolated M4 ephemeris (DE441, 2 d step) in pulsating coordinates.","desc.Mars":"Mars system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 4 d step).","desc.Jupiter":"Jupiter system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 16 d step).","desc.Saturn":"Saturn system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","desc.Uranus":"Uranus system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","desc.Neptune":"Neptune system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","view.true_size":"True size","view.true_size_title":"Turn off size exaggeration (bodies enlarged when small on screen \u2014 display approximation)","layer.planets":"Planet systems","layer.stars":"Stars","layer.milkyway":"Milky Way","layer.nightlights":"Earth night lights","layer.sunglow":"Sun glow","sky.credits_stars":"Stars: HYG v4.4 (David Nash, CC BY-SA 4.0)","sky.credits_mw":"Milky Way: ESA/Gaia/DPAC (CC BY-SA 3.0 IGO)","sky.credits_moon":"Moon: NASA SVS (public domain)","sky.credits_horizons":"Orbits: JPL Horizons","sky.credits_earth":"Earth surface: NASA Earth Observatory (Blue Marble, Black Marble)","credits.short":"Sources","credits.images":"Image and data sources","credits.open":"Show image and data sources (source panel)","credits.nasa_rule":"NASA credit rules (verbatim):"};var Xr={ko:cd,en:ud},hd="lagrange.lang",Ai="en",dd=[];function fd(n,e){return e==="ko"||e==="en"?e:typeof n=="string"&&n.toLowerCase().startsWith("ko")?"ko":"en"}function Vm(){try{return localStorage.getItem(hd)}catch{return null}}function nu(){return Ai=fd(typeof navigator<"u"?navigator.language:"",Vm()),document.documentElement.lang=Ai,Ai}function Ci(){return Ai}function iu(n){Ai=n,document.documentElement.lang=n;try{localStorage.setItem(hd,n)}catch{}zt();for(let e of dd)e(n)}function uo(n){dd.push(n)}function Fe(n,e={}){let t=Xr[Ai][n];if(t===void 0)throw new Error(`\uC0AC\uC804\uC5D0 \uC5C6\uB294 \uD0A4: ${n} (${Ai})`);return t.replace(/\{(\w+)\}/g,(i,s)=>String(e[s]))}function At(n){return n&&typeof n=="object"?n[Ai]??n.ko??"":String(n??"")}function zt(n=document){for(let e of n.querySelectorAll("[data-i18n]"))e.textContent=Fe(e.dataset.i18n);for(let e of n.querySelectorAll("[data-i18n-title]"))e.title=Fe(e.dataset.i18nTitle)}var ho=new Set,pd=()=>!0;function Hm(n){return/^jwst_err_/.test(n)?"n_jwst":/_dist$|zmax|^shift_|^holdout_|_km$/.test(n)?"n_distance":/period/.test(n)?"n_period":/_deg$/.test(n)?"n_angle":/^annual_|^wrong_ref_|^dv_ratio/.test(n)?"n_annual":/^t316_/.test(n)?"n_escape":"n_other"}function fo(n,e,t){return n.dataset.cat=Hm(e),n.dataset.ctx=t,ho.add(n),n}function md(n){ho.delete(n)}function gd(n){pd=n}function Gm(n,e){e?n._ph&&n._ph.parentNode&&n._ph.replaceWith(n):n.parentNode&&(n._ph||(n._ph=document.createComment("num-off")),n.replaceWith(n._ph))}function po(){for(let n of ho)Gm(n,pd(n.dataset.cat,n.dataset.ctx))}function _d(){let n={};for(let e of ho){let t=`${e.dataset.ctx}:${e.dataset.cat}`;n[t]=n[t]||{on:0,off:0},e.parentNode&&!(e._ph&&e._ph.parentNode)?n[t].on++:n[t].off++}return n}var yd=["","\u2460","\u2461","\u2462","\u2463","\u2464","\u2465","\u2466"];function Wm(n){return n.source.map(e=>`${e.file}>${e.key}`).join(" | ")}function ws(n,e){let t=document.createElement("span");t.className=`tag tag-${n.tag}`,t.tabIndex=0,t.dataset.tag=n.tag,t.dataset.detail=n.detail;let i=document.createElement("span");i.className="tag-name";let s=document.createElement("span");s.className="tag-tip",s.setAttribute("role","tooltip");let r=()=>{let a=e.details[n.detail];i.textContent=At(e.tags[n.tag])+(n.weak!==void 0?` (${Fe("tag.weak")})`:""),s.textContent=`${yd[a.no]} ${At(a)}`+(n.weak?` \u2014 ${At(n.weak)}`:"")};return r(),t.append(i,s),t._render=r,t}function Ri(n,e){let t=document.createElement("span");t.className=`tag mini tag-${n.tag}`,t.tabIndex=0,t.dataset.tag=n.tag,t.dataset.detail=n.detail;let i=document.createElement("span");i.className="tag-name";let s=document.createElement("span");return s.className="tag-tip",s.setAttribute("role","tooltip"),t._render=()=>{let r=e.details[n.detail];i.textContent=Fe("tag.short_"+n.tag),s.textContent=`${At(e.tags[n.tag])} \u2014 ${yd[r.no]} ${At(r)}`},t._render(),t.append(i,s),t}function si(){let n=document.createElement("span");return n.className="tag tag-approx",n.dataset.i18n="tag.display_approx",n.textContent=Fe("tag.display_approx"),n}function Pi(n,e,t){let i=document.createElement("div");i.className="num-row";let s=document.createElement("div");s.className="num-label";let r=document.createElement("button");r.type="button",r.className="num",r.dataset.source=Wm(n.provenance),r.dataset.verification=`${n.provenance.verification.tag}/${n.provenance.verification.detail}`,r.dataset.id=n.id,r.addEventListener("click",()=>t(n)),i.dataset.source=r.dataset.source,i.dataset.verification=r.dataset.verification;let a=ws(n.provenance.verification,e),o=()=>{let l=n.unit&&typeof n.unit=="object"?At(n.unit):n.unit;r.textContent=n.text+(l?l==="\xB0"||l==="\xD7"?l:` ${l}`:""),s.textContent=At(n.label),a._render()};return o(),i.append(s,r,a),i._render=o,fo(i,n.id,"row"),i}var dn=null,jr=null,ru=null,Sd=()=>"",mo=null;function Md(n){mo=n||null}function Xm(){let n=document.createElement("span");n.className="join-line",n.append(document.createTextNode(At(mo.text)+" "));for(let e of mo.items){let t=document.createElement("span");t.className="join-num",t.dataset.source=e.provenance.source.map(r=>`${r.file}>${r.key}`).join(" | "),t.dataset.verification=`${e.provenance.verification.tag}/${e.provenance.verification.detail}`;let i=document.createElement("span");i.dataset.meta="",i.textContent=At(e.label)+" ";let s=document.createElement("b");s.textContent=`${e.text} ${e.unit}`,s.title=At(e.note),t.append(i,s,document.createTextNode(" "),Ri(e.provenance.verification,ru)),n.append(t)}return n}function yn(n,e){let t=document.createElement("tr"),i=document.createElement("th");i.textContent=Fe(n);let s=document.createElement("td");return s.append(e),t.append(i,s),t}function ri(n){let e=document.createElement("code");return e.dataset.literal="",e.textContent=n,e}function wd(){if(!jr)return;let n=jr,e=n.provenance;dn.dataset.source=e.source.map(r=>`${r.file}>${r.key}`).join(" | "),dn.dataset.verification=`${e.verification.tag}/${e.verification.detail}`,dn.querySelector("h2").textContent=`${Fe("source.title")} \u2014 ${At(n.label)}`;let t=dn.querySelector("tbody");t.replaceChildren(),t.append(yn("source.value",ri(String(n.value)))),t.append(yn("source.unit",document.createTextNode(n.unit||"-")));for(let r of e.source)t.append(yn("source.file",ri(r.file))),t.append(yn("source.key",ri(r.key)));if(t.append(yn("source.commit",ri(e.computed_by))),e.source_hash){let r=ri(e.source_hash.slice(0,12));r.title=e.source_hash,t.append(yn("source.source_hash",r))}e.ref_commit&&t.append(yn("source.ref_commit",ri(e.ref_commit))),t.append(yn("source.stage",ri(e.stage)));let i=document.createElement("span");i.append(ri(e.model)),e.model_ko&&e.model_ko!=="-"&&i.append(document.createTextNode(At({ko:` \u2014 ${e.model_ko}`,en:""}))),t.append(yn("source.model",i));let s=ws(e.verification,ru);s.classList.add("tag-open"),t.append(yn("source.verification",s)),t.append(yn("source.build",ri(Sd()))),n.browser_calc&&t.append(yn("source.browser",document.createTextNode(Fe("source.browser_calc",{tol:n.browser_calc.tolerance})))),t.append(yn("source.note",document.createTextNode(At(n.note)))),mo&&/^jwst_/.test(n.id||"")&&t.append(yn("source.join",Xm())),dn.querySelector(".close").textContent=Fe("source.close")}function Ed(n,e){ru=n,e&&(Sd=e),dn=document.getElementById("source"),dn.querySelector(".close").addEventListener("click",vd),document.addEventListener("keydown",t=>{t.key==="Escape"&&vd()})}function go(n){jr=n,qr=null,wd(),dn.hidden=!1}function vd(){jr=null,qr=null,dn.hidden=!0}function Td(){qr?au(qr):wd()}var qr=null;function au(n){qr=n,jr=null,delete dn.dataset.source,delete dn.dataset.verification,dn.querySelector("h2").textContent=`${Fe("source.title")} \u2014 ${Fe("credits.images")}`;let e=dn.querySelector("tbody");e.replaceChildren(bd("tr",bd("td",n()))),e.firstChild.firstChild.colSpan=2,dn.querySelector(".close").textContent=Fe("source.close"),dn.hidden=!1}var bd=(n,...e)=>{let t=document.createElement(n);return t.append(...e),t};var jm=[{what:{ko:"\uC9C0\uAD6C \uB0AE \uD45C\uBA74",en:"Earth day surface"},credit:{ko:"NASA Earth Observatory \u2014 Blue Marble Next Generation (2004\uB144 7\uC6D4 \uC601\uC0C1)",en:"NASA Earth Observatory \u2014 Blue Marble Next Generation (July 2004 imagery)"},approx:{ko:"\uD55C \uB2EC (2004\uB144 7\uC6D4) \uC601\uC0C1 \uACE0\uC815 \u2014 \uACC4\uC808 \uB208\xB7\uC2DD\uC0DD\uC740 \uB0A0\uC9DC\uC640 \uB2E4\uB984",en:"one month (July 2004) fixed \u2014 seasonal snow and vegetation do not follow the date"},license:{ko:"NASA \uC790\uB8CC \u2014 \uBBF8\uAD6D \uC800\uC791\uAD8C \uB300\uC0C1 \uC544\uB2D8. \uD45C\uAE30 \uC758\uBB34\uB294 NASA (Earth Observatory \uC9C0\uCE68)",en:"NASA material \u2014 not subject to US copyright. Mandatory credit: NASA (Earth Observatory policy)"},url:"https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-map"},{what:{ko:"\uC9C0\uAD6C \uBC24 \uBD88\uBE5B",en:"Earth night lights"},credit:{ko:"NASA Earth Observatory \u2014 Black Marble 2016 (Suomi NPP VIIRS)",en:"NASA Earth Observatory \u2014 Black Marble 2016 (Suomi NPP VIIRS)"},approx:{ko:"\uBD88\uBE5B \uBC1D\uAE30 \uACE1\uC120\xB7\uB0AE\uBC24 \uACBD\uACC4 \uC11E\uAE30\uB294 \uD45C\uC2DC\uC6A9",en:"light curve and day\u2013night blending are for display"},license:{ko:"NASA \uC790\uB8CC \u2014 \uBBF8\uAD6D \uC800\uC791\uAD8C \uB300\uC0C1 \uC544\uB2D8. \uD45C\uAE30 \uC758\uBB34\uB294 NASA (Earth Observatory \uC9C0\uCE68)",en:"NASA material \u2014 not subject to US copyright. Mandatory credit: NASA (Earth Observatory policy)"},url:"https://science.nasa.gov/earth/earth-observatory/earth-at-night/maps"},{what:{ko:"\uB2EC \uD45C\uBA74",en:"Moon surface"},credit:{ko:"NASA's Scientific Visualization Studio \u2014 CGI Moon Kit (LRO LROC \uC0C9 \uBAA8\uC790\uC774\uD06C)",en:"NASA's Scientific Visualization Studio \u2014 CGI Moon Kit (LRO LROC color mosaic)"},license:{ko:"\uACF5\uACF5 \uC601\uC5ED (NASA SVS)",en:"Public domain (NASA SVS)"},url:"https://svs.gsfc.nasa.gov/4720/"},{what:{ko:"\uC740\uD558\uC218",en:"Milky Way"},credit:{ko:"ESA/Gaia/DPAC \u2014 Gaia DR2 sky in colour. \uAC10\uC0AC: Gaia DPAC; A. Moitinho / A. F. Silva / M. Barros / C. Barata (University of Lisbon); H. Savietto (Fork Research)",en:"ESA/Gaia/DPAC \u2014 Gaia DR2 sky in colour. Acknowledgement: Gaia DPAC; A. Moitinho / A. F. Silva / M. Barros / C. Barata (University of Lisbon); H. Savietto (Fork Research)"},approx:{ko:"\uBC1D\uAE30 \uBC30\uC728\uC740 \uD45C\uC2DC\uC6A9",en:"brightness gain is for display"},license:{ko:"CC BY-SA 3.0 IGO (\uC904\uC778 \uADF8\uB9BC\uB3C4 \uAC19\uC740 \uC870\uAC74)",en:"CC BY-SA 3.0 IGO (resized copies under the same terms)"},url:"https://sci.esa.int/web/gaia/-/60196-gaia-s-sky-in-colour-equirectangular-projection"},{what:{ko:"\uBCC4",en:"Stars"},credit:{ko:"HYG Database v4.4 \u2014 David Nash (astronexus)",en:"HYG Database v4.4 \u2014 David Nash (astronexus)"},approx:{ko:"\uBCC4 \uD06C\uAE30\xB7\uC0C9\uC740 \uD45C\uC2DC\uC6A9",en:"star size and color are for display"},license:{ko:"CC BY-SA 4.0 (\uACE0\uB978 \uBCC4 \uD30C\uC77C\uB3C4 \uAC19\uC740 \uC870\uAC74)",en:"CC BY-SA 4.0 (derived star file under the same terms)"},url:"https://codeberg.org/astronexus/hyg"},{what:{ko:"\uCC9C\uCCB4 \uC704\uCE58\xB7JWST \uADA4\uC801",en:"Body positions and JWST trajectory"},credit:{ko:"NASA/JPL Horizons System (\uCC9C\uCCB4\uB825 DE441, JWST \uC7AC\uAD6C\uC131\xB7\uBB34\uBD84\uC0AC \uC608\uCE21 \uADA4\uC801)",en:"NASA/JPL Horizons System (DE441 ephemeris, JWST reconstructed and no-burn predicted trajectories)"},license:{ko:"\uBBF8\uB9AC \uBC1B\uC544 \uB454 \uC790\uB8CC \u2014 \uC2E4\uD589 \uC911 Horizons \uB97C \uBD80\uB974\uC9C0 \uC54A\uC74C. \uCD9C\uCC98 \uD45C\uAE30",en:"Retrieved in advance \u2014 Horizons is not called at run time. Credit given"},url:"https://ssd.jpl.nasa.gov/horizons/"},{what:{ko:"\uD589\uC131 \uACF5\uC804 \uADA4\uB3C4\uC120",en:"Planet orbit lines"},credit:{ko:"JPL Solar System Dynamics \u2014 \uD589\uC131\uC758 \uADFC\uC0AC \uC704\uCE58\uC6A9 \uCF00\uD50C\uB7EC \uADA4\uB3C4 \uC694\uC18C (E. M. Standish)",en:"JPL Solar System Dynamics \u2014 Keplerian elements for approximate positions of the major planets (E. M. Standish)"},approx:{ko:"\uADA4\uB3C4 \uBAA8\uC591\uB9CC \uADF8\uB9B0 \uAC83 \u2014 \uCC9C\uCCB4 \uC704\uCE58 \uACC4\uC0B0\uC5D0 \uC4F0\uC9C0 \uC54A\uC74C",en:"draws the orbit shape only \u2014 not used to compute positions"},license:{ko:"\uADA4\uB3C4 \uC694\uC18C \uC218\uCE58 \u2014 \uCD9C\uCC98 \uD45C\uAE30",en:"Numerical orbital elements \u2014 credit given"},url:"https://ssd.jpl.nasa.gov/planets/approx_pos.html"}],qm=[{text:"NASA should be acknowledged as the source of the material.",url:"https://www.nasa.gov/nasa-brand-center/images-and-media/"},{text:"We ask that NASA's Earth Observatory be given credit for its original materials; the only mandatory credit is NASA.",url:"https://earthobservatory.nasa.gov/ImageUse"}],Tn=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))i.setAttribute(s,r);return i.append(...t),i},Ad=n=>Tn("code",{"data-literal":""},n);function Cd(n){let e=Tn("div",{class:"image-credits","data-meta":""}),t=Tn("tbody");for(let s of jm){let r=Tn("td",{},At(s.credit),Tn("br"),At(s.license),Tn("br"),Ad(s.url));s.approx&&r.append(Tn("br"),n(),document.createTextNode(" "+At(s.approx))),t.append(Tn("tr",{},Tn("th",{},At(s.what)),r))}e.append(Tn("table",{class:"src"},t));let i=Tn("p",{class:"note"},Fe("credits.nasa_rule")+" ");for(let s of qm)i.append(Tn("q",{},s.text),document.createTextNode(" "),Ad(s.url),document.createTextNode(" "));return e.append(i),e}var rf=0,Bu=1,af=2;var Aa=1,of=2,rr=3,Hi=0,Kt=1,Jn=2,$n=0,ar=1,gi=2,ku=3,zu=4,lf=5;var cs=100,cf=101,uf=102,hf=103,df=104,ff=200,pf=201,mf=202,gf=203,Vu=204,Hu=205,_f=206,xf=207,yf=208,vf=209,bf=210,Sf=211,Mf=212,wf=213,Ef=214,Wo=0,Xo=1,jo=2,Xs=3,qo=4,Yo=5,Jo=6,$o=7,yl=0,Tf=1,Af=2,Fn=0,Gu=1,Wu=2,Xu=3,ju=4,qu=5,Yu=6,Ju=7;var $u=300,Gi=301,us=302,vl=303,bl=304,Ca=306,js=1e3,Cn=1001,Zo=1002,Zt=1003,Cf=1004;var Ra=1005;var Rt=1006,Sl=1007;var On=1008;var Qt=1009,Zu=1010,Ku=1011,or=1012,Ml=1013,Bn=1014,kn=1015,zn=1016,wl=1017,El=1018,lr=1020,Qu=35902,eh=35899,th=1021,nh=1022,pn=1023,Wn=1026,Wi=1027,ih=1028,Tl=1029,Xi=1030,Al=1031;var Cl=1033,Pa=33776,Ia=33777,La=33778,Da=33779,Rl=35840,Pl=35841,Il=35842,Ll=35843,Dl=36196,Nl=37492,Ul=37496,Fl=37488,Ol=37489,Na=37490,Bl=37491,kl=37808,zl=37809,Vl=37810,Hl=37811,Gl=37812,Wl=37813,Xl=37814,jl=37815,ql=37816,Yl=37817,Jl=37818,$l=37819,Zl=37820,Kl=37821,Ql=36492,ec=36494,tc=36495,nc=36283,ic=36284,Ua=36285,sc=36286;var ia=2300,Ko=2301,Ho=2302,Pu=2303,Iu=2400,Lu=2401,Du=2402;var Rf=3200;var rc=0,Pf=1,_i="",Ft="srgb",sa="srgb-linear",ra="linear",vt="srgb";var Go=7680;var If=519,Lf=512,Df=513,Nf=514,ac=515,Uf=516,Ff=517,oc=518,Of=519,sh=35044;var rh="300 es",Nn=2e3,qs=2001;function Ym(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Jm(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function aa(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Bf(){let n=aa("canvas");return n.style.display="block",n}var Rd={},Ys=null;function oa(...n){let e="THREE."+n.shift();Ys?Ys("log",e,...n):console.log(e,...n)}function kf(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function Ye(...n){n=kf(n);let e="THREE."+n.shift();if(Ys)Ys("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function Je(...n){n=kf(n);let e="THREE."+n.shift();if(Ys)Ys("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function as(...n){let e=n.join(" ");e in Rd||(Rd[e]=!0,Ye(...n))}function zf(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var Vf={[Wo]:Xo,[jo]:Jo,[qo]:$o,[Xs]:Yo,[Xo]:Wo,[Jo]:jo,[$o]:qo,[Yo]:Xs},Xn=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},rn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pd=1234567,ta=Math.PI/180,Js=180/Math.PI;function di(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(rn[n&255]+rn[n>>8&255]+rn[n>>16&255]+rn[n>>24&255]+"-"+rn[e&255]+rn[e>>8&255]+"-"+rn[e>>16&15|64]+rn[e>>24&255]+"-"+rn[t&63|128]+rn[t>>8&255]+"-"+rn[t>>16&255]+rn[t>>24&255]+rn[i&255]+rn[i>>8&255]+rn[i>>16&255]+rn[i>>24&255]).toLowerCase()}function nt(n,e,t){return Math.max(e,Math.min(t,n))}function ah(n,e){return(n%e+e)%e}function $m(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Zm(n,e,t){return n!==e?(t-n)/(e-n):0}function na(n,e,t){return(1-t)*n+t*e}function Km(n,e,t,i){return na(n,e,1-Math.exp(-t*i))}function Qm(n,e=1){return e-Math.abs(ah(n,e*2)-e)}function eg(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function tg(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function ng(n,e){return n+Math.floor(Math.random()*(e-n+1))}function ig(n,e){return n+Math.random()*(e-n)}function sg(n){return n*(.5-Math.random())}function rg(n){n!==void 0&&(Pd=n);let e=Pd+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function ag(n){return n*ta}function og(n){return n*Js}function lg(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function cg(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function ug(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function hg(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),u=a((e+i)/2),d=r((e-i)/2),h=a((e-i)/2),f=r((i-e)/2),m=a((i-e)/2);switch(s){case"XYX":n.set(o*u,l*d,l*h,o*c);break;case"YZY":n.set(l*h,o*u,l*d,o*c);break;case"ZXZ":n.set(l*d,l*h,o*u,o*c);break;case"XZX":n.set(o*u,l*m,l*f,o*c);break;case"YXY":n.set(l*f,o*u,l*m,o*c);break;case"ZYZ":n.set(l*m,l*f,o*u,o*c);break;default:Ye("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function Dn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function St(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var oh={DEG2RAD:ta,RAD2DEG:Js,generateUUID:di,clamp:nt,euclideanModulo:ah,mapLinear:$m,inverseLerp:Zm,lerp:na,damp:Km,pingpong:Qm,smoothstep:eg,smootherstep:tg,randInt:ng,randFloat:ig,randFloatSpread:sg,seededRandom:rg,degToRad:ag,radToDeg:og,isPowerOfTwo:lg,ceilPowerOfTwo:cg,floorPowerOfTwo:ug,setQuaternionFromProperEuler:hg,normalize:St,denormalize:Dn},We=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},jn=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],d=i[s+3],h=r[a+0],f=r[a+1],m=r[a+2],v=r[a+3];if(d!==v||l!==h||c!==f||u!==m){let p=l*h+c*f+u*m+d*v;p<0&&(h=-h,f=-f,m=-m,v=-v,p=-p);let g=1-o;if(p<.9995){let A=Math.acos(p),C=Math.sin(A);g=Math.sin(g*A)/C,o=Math.sin(o*A)/C,l=l*g+h*o,c=c*g+f*o,u=u*g+m*o,d=d*g+v*o}else{l=l*g+h*o,c=c*g+f*o,u=u*g+m*o,d=d*g+v*o;let A=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=A,c*=A,u*=A,d*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],d=r[a],h=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+u*d+l*f-c*h,e[t+1]=l*m+u*h+c*d-o*f,e[t+2]=c*m+u*f+o*h-l*d,e[t+3]=u*m-o*d-l*h-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),d=o(r/2),h=l(i/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"YXZ":this._x=h*u*d+c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"ZXY":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d-h*f*m;break;case"ZYX":this._x=h*u*d-c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d+h*f*m;break;case"YZX":this._x=h*u*d+c*f*m,this._y=c*f*d+h*u*m,this._z=c*u*m-h*f*d,this._w=c*u*d-h*f*m;break;case"XZY":this._x=h*u*d-c*f*m,this._y=c*f*d-h*u*m,this._z=c*u*m+h*f*d,this._w=c*u*d+h*f*m;break;default:Ye("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=i+o+d;if(h>0){let f=.5/Math.sqrt(h+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>d){let f=2*Math.sqrt(1+i-o-d);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>d){let f=2*Math.sqrt(1+o-i-d);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+d-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(nt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},X=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Id.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Id.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),d=2*(r*i-a*t);return this.x=t+l*c+a*d-o*u,this.y=i+l*u+o*c-r*d,this.z=s+l*d+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return ou.copy(this).projectOnVector(e),this.sub(ou)}reflect(e){return this.sub(ou.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(nt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},ou=new X,Id=new jn,Ze=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],d=i[7],h=i[2],f=i[5],m=i[8],v=s[0],p=s[3],g=s[6],A=s[1],C=s[4],y=s[7],E=s[2],b=s[5],w=s[8];return r[0]=a*v+o*A+l*E,r[3]=a*p+o*C+l*b,r[6]=a*g+o*y+l*w,r[1]=c*v+u*A+d*E,r[4]=c*p+u*C+d*b,r[7]=c*g+u*y+d*w,r[2]=h*v+f*A+m*E,r[5]=h*p+f*C+m*b,r[8]=h*g+f*y+m*w,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=u*a-o*c,h=o*l-u*r,f=c*r-a*l,m=t*d+i*h+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/m;return e[0]=d*v,e[1]=(s*c-u*i)*v,e[2]=(o*i-s*a)*v,e[3]=h*v,e[4]=(u*t-s*l)*v,e[5]=(s*r-o*t)*v,e[6]=f*v,e[7]=(i*l-c*t)*v,e[8]=(a*t-i*r)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return as("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(lu.makeScale(e,t)),this}rotate(e){return as("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(lu.makeRotation(-e)),this}translate(e,t){return as("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(lu.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},lu=new Ze,Ld=new Ze().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Dd=new Ze().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function dg(){let n={enabled:!0,workingColorSpace:sa,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===vt&&(s.r=fi(s.r),s.g=fi(s.g),s.b=fi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===vt&&(s.r=Ws(s.r),s.g=Ws(s.g),s.b=Ws(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===_i?ra:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return as("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return as("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[sa]:{primaries:e,whitePoint:i,transfer:ra,toXYZ:Ld,fromXYZ:Dd,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ft},outputColorSpaceConfig:{drawingBufferColorSpace:Ft}},[Ft]:{primaries:e,whitePoint:i,transfer:vt,toXYZ:Ld,fromXYZ:Dd,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ft}}}),n}var ct=dg();function fi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Ws(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Es,Qo=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Es===void 0&&(Es=aa("canvas")),Es.width=e.width,Es.height=e.height;let s=Es.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Es}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=aa("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=fi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(fi(t[i]/255)*255):t[i]=fi(t[i]);return{data:t,width:e.width,height:e.height}}else return Ye("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},fg=0,$s=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:fg++}),this.uuid=di(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(cu(s[a].image)):r.push(cu(s[a]))}else r=cu(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function cu(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?Qo.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(Ye("Texture: Unable to serialize Texture."),{})}var pg=0,uu=new X,Ot=class n extends Xn{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=Cn,s=Cn,r=Rt,a=On,o=pn,l=Qt,c=n.DEFAULT_ANISOTROPY,u=_i){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:pg++}),this.uuid=di(),this.name="",this.source=new $s(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new We(0,0),this.repeat=new We(1,1),this.center=new We(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ze,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(uu).x}get height(){return this.source.getSize(uu).y}get depth(){return this.source.getSize(uu).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){Ye(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ye(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$u)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case js:e.x=e.x-Math.floor(e.x);break;case Cn:e.x=e.x<0?0:1;break;case Zo:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case js:e.y=e.y-Math.floor(e.y);break;case Cn:e.y=e.y<0?0:1;break;case Zo:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Ot.DEFAULT_IMAGE=null;Ot.DEFAULT_MAPPING=$u;Ot.DEFAULT_ANISOTROPY=1;var xt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],f=l[5],m=l[9],v=l[2],p=l[6],g=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(m-p)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let C=(c+1)/2,y=(f+1)/2,E=(g+1)/2,b=(u+h)/4,w=(d+v)/4,x=(m+p)/4;return C>y&&C>E?C<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(C),s=b/i,r=w/i):y>E?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=b/s,r=x/s):E<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(E),i=w/r,s=x/r),this.set(i,s,r,t),this}let A=Math.sqrt((p-m)*(p-m)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(A)<.001&&(A=1),this.x=(p-m)/A,this.y=(d-v)/A,this.z=(h-u)/A,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=nt(this.x,e.x,t.x),this.y=nt(this.y,e.y,t.y),this.z=nt(this.z,e.z,t.z),this.w=nt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=nt(this.x,e,t),this.y=nt(this.y,e,t),this.z=nt(this.z,e,t),this.w=nt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(nt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},el=class extends Xn{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Rt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new xt(0,0,e,t),this.scissorTest=!1,this.viewport=new xt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:i.depth},r=new Ot(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Rt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new $s(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},vn=class extends el{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},la=class extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var tl=class extends Ot{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=Zt,this.minFilter=Zt,this.wrapR=Cn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var _t=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,l,c,u,d,h,f,m,v,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,d,h,f,m,v,p)}set(e,t,i,s,r,a,o,l,c,u,d,h,f,m,v,p){let g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=d,g[14]=h,g[3]=f,g[7]=m,g[11]=v,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/Ts.setFromMatrixColumn(e,0).length(),r=1/Ts.setFromMatrixColumn(e,1).length(),a=1/Ts.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){let h=a*u,f=a*d,m=o*u,v=o*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=f+m*c,t[5]=h-v*c,t[9]=-o*l,t[2]=v-h*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){let h=l*u,f=l*d,m=c*u,v=c*d;t[0]=h+v*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*d,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=v+h*o,t[10]=a*l}else if(e.order==="ZXY"){let h=l*u,f=l*d,m=c*u,v=c*d;t[0]=h-v*o,t[4]=-a*d,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=v-h*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let h=a*u,f=a*d,m=o*u,v=o*d;t[0]=l*u,t[4]=m*c-f,t[8]=h*c+v,t[1]=l*d,t[5]=v*c+h,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let h=a*l,f=a*c,m=o*l,v=o*c;t[0]=l*u,t[4]=v-h*d,t[8]=m*d+f,t[1]=d,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*d+m,t[10]=h-v*d}else if(e.order==="XZY"){let h=a*l,f=a*c,m=o*l,v=o*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+v,t[5]=a*u,t[9]=f*d-m,t[2]=m*d-f,t[6]=o*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(mg,e,gg)}lookAt(e,t,i){let s=this.elements;return bn.subVectors(e,t),bn.lengthSq()===0&&(bn.z=1),bn.normalize(),Ii.crossVectors(i,bn),Ii.lengthSq()===0&&(Math.abs(i.z)===1?bn.x+=1e-4:bn.z+=1e-4,bn.normalize(),Ii.crossVectors(i,bn)),Ii.normalize(),_o.crossVectors(bn,Ii),s[0]=Ii.x,s[4]=_o.x,s[8]=bn.x,s[1]=Ii.y,s[5]=_o.y,s[9]=bn.y,s[2]=Ii.z,s[6]=_o.z,s[10]=bn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],d=i[5],h=i[9],f=i[13],m=i[2],v=i[6],p=i[10],g=i[14],A=i[3],C=i[7],y=i[11],E=i[15],b=s[0],w=s[4],x=s[8],T=s[12],R=s[1],I=s[5],L=s[9],U=s[13],N=s[2],G=s[6],q=s[10],Z=s[14],ae=s[3],z=s[7],V=s[11],j=s[15];return r[0]=a*b+o*R+l*N+c*ae,r[4]=a*w+o*I+l*G+c*z,r[8]=a*x+o*L+l*q+c*V,r[12]=a*T+o*U+l*Z+c*j,r[1]=u*b+d*R+h*N+f*ae,r[5]=u*w+d*I+h*G+f*z,r[9]=u*x+d*L+h*q+f*V,r[13]=u*T+d*U+h*Z+f*j,r[2]=m*b+v*R+p*N+g*ae,r[6]=m*w+v*I+p*G+g*z,r[10]=m*x+v*L+p*q+g*V,r[14]=m*T+v*U+p*Z+g*j,r[3]=A*b+C*R+y*N+E*ae,r[7]=A*w+C*I+y*G+E*z,r[11]=A*x+C*L+y*q+E*V,r[15]=A*T+C*U+y*Z+E*j,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],f=e[14],m=e[3],v=e[7],p=e[11],g=e[15],A=l*f-c*h,C=o*f-c*d,y=o*h-l*d,E=a*f-c*u,b=a*h-l*u,w=a*d-o*u;return t*(v*A-p*C+g*y)-i*(m*A-p*E+g*b)+s*(m*C-v*E+g*w)-r*(m*y-v*b+p*w)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],f=e[11],m=e[12],v=e[13],p=e[14],g=e[15],A=t*o-i*a,C=t*l-s*a,y=t*c-r*a,E=i*l-s*o,b=i*c-r*o,w=s*c-r*l,x=u*v-d*m,T=u*p-h*m,R=u*g-f*m,I=d*p-h*v,L=d*g-f*v,U=h*g-f*p,N=A*U-C*L+y*I+E*R-b*T+w*x;if(N===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let G=1/N;return e[0]=(o*U-l*L+c*I)*G,e[1]=(s*L-i*U-r*I)*G,e[2]=(v*w-p*b+g*E)*G,e[3]=(h*b-d*w-f*E)*G,e[4]=(l*R-a*U-c*T)*G,e[5]=(t*U-s*R+r*T)*G,e[6]=(p*y-m*w-g*C)*G,e[7]=(u*w-h*y+f*C)*G,e[8]=(a*L-o*R+c*x)*G,e[9]=(i*R-t*L-r*x)*G,e[10]=(m*b-v*y+g*A)*G,e[11]=(d*y-u*b-f*A)*G,e[12]=(o*T-a*I-l*x)*G,e[13]=(t*I-i*T+s*x)*G,e[14]=(v*C-m*E-p*A)*G,e[15]=(u*E-d*C+h*A)*G,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,d=o+o,h=r*c,f=r*u,m=r*d,v=a*u,p=a*d,g=o*d,A=l*c,C=l*u,y=l*d,E=i.x,b=i.y,w=i.z;return s[0]=(1-(v+g))*E,s[1]=(f+y)*E,s[2]=(m-C)*E,s[3]=0,s[4]=(f-y)*b,s[5]=(1-(h+g))*b,s[6]=(p+A)*b,s[7]=0,s[8]=(m+C)*w,s[9]=(p-A)*w,s[10]=(1-(h+v))*w,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=Ts.set(s[0],s[1],s[2]).length(),o=Ts.set(s[4],s[5],s[6]).length(),l=Ts.set(s[8],s[9],s[10]).length();r<0&&(a=-a),Rn.copy(this);let c=1/a,u=1/o,d=1/l;return Rn.elements[0]*=c,Rn.elements[1]*=c,Rn.elements[2]*=c,Rn.elements[4]*=u,Rn.elements[5]*=u,Rn.elements[6]*=u,Rn.elements[8]*=d,Rn.elements[9]*=d,Rn.elements[10]*=d,t.setFromRotationMatrix(Rn),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=Nn,l=!1){let c=this.elements,u=2*r/(t-e),d=2*r/(i-s),h=(t+e)/(t-e),f=(i+s)/(i-s),m,v;if(l)m=r/(a-r),v=a*r/(a-r);else if(o===Nn)m=-(a+r)/(a-r),v=-2*a*r/(a-r);else if(o===qs)m=-a/(a-r),v=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Nn,l=!1){let c=this.elements,u=2/(t-e),d=2/(i-s),h=-(t+e)/(t-e),f=-(i+s)/(i-s),m,v;if(l)m=1/(a-r),v=a/(a-r);else if(o===Nn)m=-2/(a-r),v=-(a+r)/(a-r);else if(o===qs)m=-1/(a-r),v=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},Ts=new X,Rn=new _t,mg=new X(0,0,0),gg=new X(1,1,1),Ii=new X,_o=new X,bn=new X,Nd=new _t,Ud=new jn,pi=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],d=s[2],h=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(nt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-nt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(nt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-nt(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(nt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-nt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:Ye("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Nd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Nd,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ud.setFromEuler(this),this.setFromQuaternion(Ud,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};pi.DEFAULT_ORDER="XYZ";var ca=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},_g=0,Fd=new X,As=new jn,ai=new _t,xo=new X,Yr=new X,xg=new X,yg=new jn,Od=new X(1,0,0),Bd=new X(0,1,0),kd=new X(0,0,1),zd={type:"added"},vg={type:"removed"},Cs={type:"childadded",child:null},hu={type:"childremoved",child:null},qt=class n extends Xn{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_g++}),this.uuid=di(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new X,t=new pi,i=new jn,s=new X(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new _t},normalMatrix:{value:new Ze}}),this.matrix=new _t,this.matrixWorld=new _t,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new ca,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.multiply(As),this}rotateOnWorldAxis(e,t){return As.setFromAxisAngle(e,t),this.quaternion.premultiply(As),this}rotateX(e){return this.rotateOnAxis(Od,e)}rotateY(e){return this.rotateOnAxis(Bd,e)}rotateZ(e){return this.rotateOnAxis(kd,e)}translateOnAxis(e,t){return Fd.copy(e).applyQuaternion(this.quaternion),this.position.add(Fd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Od,e)}translateY(e){return this.translateOnAxis(Bd,e)}translateZ(e){return this.translateOnAxis(kd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ai.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?xo.copy(e):xo.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Yr.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ai.lookAt(Yr,xo,this.up):ai.lookAt(xo,Yr,this.up),this.quaternion.setFromRotationMatrix(ai),s&&(ai.extractRotation(s.matrixWorld),As.setFromRotationMatrix(ai),this.quaternion.premultiply(As.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(Je("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zd),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null):Je("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(vg),hu.child=e,this.dispatchEvent(hu),hu.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ai.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ai.multiply(e.parent.matrixWorld)),e.applyMatrix4(ai),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zd),Cs.child=e,this.dispatchEvent(Cs),Cs.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yr,e,xg),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Yr,yg,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),d=a(e.shapes),h=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),d.length>0&&(i.shapes=d),h.length>0&&(i.skeletons=h),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=s,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};qt.DEFAULT_UP=new X(0,1,0);qt.DEFAULT_MATRIX_AUTO_UPDATE=!0;qt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var rs=class extends qt{constructor(){super(),this.isGroup=!0,this.type="Group"}},bg={type:"move"},Zs=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new rs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new rs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new X,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new X),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new rs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new X,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new X,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let p=t.getJointPose(v,i),g=this._getHandJoint(c,v);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),f=.02,m=.005;c.inputState.pinching&&h>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(bg)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new rs;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Hf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Li={h:0,s:0,l:0},yo={h:0,s:0,l:0};function du(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var $e=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ft){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,ct.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=ct.workingColorSpace){return this.r=e,this.g=t,this.b=i,ct.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=ct.workingColorSpace){if(e=ah(e,1),t=nt(t,0,1),i=nt(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=du(a,r,e+1/3),this.g=du(a,r,e),this.b=du(a,r,e-1/3)}return ct.colorSpaceToWorking(this,s),this}setStyle(e,t=Ft){function i(r){r!==void 0&&parseFloat(r)<1&&Ye("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:Ye("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);Ye("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ft){let i=Hf[e.toLowerCase()];return i!==void 0?this.setHex(i,t):Ye("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=fi(e.r),this.g=fi(e.g),this.b=fi(e.b),this}copyLinearToSRGB(e){return this.r=Ws(e.r),this.g=Ws(e.g),this.b=Ws(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ft){return ct.workingToColorSpace(an.copy(this),e),Math.round(nt(an.r*255,0,255))*65536+Math.round(nt(an.g*255,0,255))*256+Math.round(nt(an.b*255,0,255))}getHexString(e=Ft){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=ct.workingColorSpace){ct.workingToColorSpace(an.copy(this),t);let i=an.r,s=an.g,r=an.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let d=a-o;switch(c=u<=.5?d/(a+o):d/(2-a-o),a){case i:l=(s-r)/d+(s<r?6:0);break;case s:l=(r-i)/d+2;break;case r:l=(i-s)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=ct.workingColorSpace){return ct.workingToColorSpace(an.copy(this),t),e.r=an.r,e.g=an.g,e.b=an.b,e}getStyle(e=Ft){ct.workingToColorSpace(an.copy(this),e);let t=an.r,i=an.g,s=an.b;return e!==Ft?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Li),this.setHSL(Li.h+e,Li.s+t,Li.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Li),e.getHSL(yo);let i=na(Li.h,yo.h,t),s=na(Li.s,yo.s,t),r=na(Li.l,yo.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},an=new $e;$e.NAMES=Hf;var Ks=class extends qt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new pi,this.environmentIntensity=1,this.environmentRotation=new pi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},Pn=new X,oi=new X,fu=new X,li=new X,Rs=new X,Ps=new X,Vd=new X,pu=new X,mu=new X,gu=new X,_u=new xt,xu=new xt,yu=new xt,hi=class n{constructor(e=new X,t=new X,i=new X){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),Pn.subVectors(e,t),s.cross(Pn);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){Pn.subVectors(s,t),oi.subVectors(i,t),fu.subVectors(e,t);let a=Pn.dot(Pn),o=Pn.dot(oi),l=Pn.dot(fu),c=oi.dot(oi),u=oi.dot(fu),d=a*c-o*o;if(d===0)return r.set(0,0,0),null;let h=1/d,f=(c*l-o*u)*h,m=(a*u-o*l)*h;return r.set(1-f-m,m,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,li)===null?!1:li.x>=0&&li.y>=0&&li.x+li.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,li)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,li.x),l.addScaledVector(a,li.y),l.addScaledVector(o,li.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return _u.setScalar(0),xu.setScalar(0),yu.setScalar(0),_u.fromBufferAttribute(e,t),xu.fromBufferAttribute(e,i),yu.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(_u,r.x),a.addScaledVector(xu,r.y),a.addScaledVector(yu,r.z),a}static isFrontFacing(e,t,i,s){return Pn.subVectors(i,t),oi.subVectors(e,t),Pn.cross(oi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Pn.subVectors(this.c,this.b),oi.subVectors(this.a,this.b),Pn.cross(oi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;Rs.subVectors(s,i),Ps.subVectors(r,i),pu.subVectors(e,i);let l=Rs.dot(pu),c=Ps.dot(pu);if(l<=0&&c<=0)return t.copy(i);mu.subVectors(e,s);let u=Rs.dot(mu),d=Ps.dot(mu);if(u>=0&&d<=u)return t.copy(s);let h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(Rs,a);gu.subVectors(e,r);let f=Rs.dot(gu),m=Ps.dot(gu);if(m>=0&&f<=m)return t.copy(r);let v=f*c-l*m;if(v<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(Ps,o);let p=u*m-f*d;if(p<=0&&d-u>=0&&f-m>=0)return Vd.subVectors(r,s),o=(d-u)/(d-u+(f-m)),t.copy(s).addScaledVector(Vd,o);let g=1/(p+v+h);return a=v*g,o=h*g,t.copy(i).addScaledVector(Rs,a).addScaledVector(Ps,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Mn=class{constructor(e=new X(1/0,1/0,1/0),t=new X(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(In.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(In.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=In.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,In):In.fromBufferAttribute(r,a),In.applyMatrix4(e.matrixWorld),this.expandByPoint(In);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),vo.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),vo.copy(i.boundingBox)),vo.applyMatrix4(e.matrixWorld),this.union(vo)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,In),In.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Jr),bo.subVectors(this.max,Jr),Is.subVectors(e.a,Jr),Ls.subVectors(e.b,Jr),Ds.subVectors(e.c,Jr),Di.subVectors(Ls,Is),Ni.subVectors(Ds,Ls),ts.subVectors(Is,Ds);let t=[0,-Di.z,Di.y,0,-Ni.z,Ni.y,0,-ts.z,ts.y,Di.z,0,-Di.x,Ni.z,0,-Ni.x,ts.z,0,-ts.x,-Di.y,Di.x,0,-Ni.y,Ni.x,0,-ts.y,ts.x,0];return!vu(t,Is,Ls,Ds,bo)||(t=[1,0,0,0,1,0,0,0,1],!vu(t,Is,Ls,Ds,bo))?!1:(So.crossVectors(Di,Ni),t=[So.x,So.y,So.z],vu(t,Is,Ls,Ds,bo))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,In).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(In).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ci[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ci[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ci[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ci[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ci[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ci[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ci[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ci[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ci),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ci=[new X,new X,new X,new X,new X,new X,new X,new X],In=new X,vo=new Mn,Is=new X,Ls=new X,Ds=new X,Di=new X,Ni=new X,ts=new X,Jr=new X,bo=new X,So=new X,ns=new X;function vu(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){ns.fromArray(n,r);let o=s.x*Math.abs(ns.x)+s.y*Math.abs(ns.y)+s.z*Math.abs(ns.z),l=e.dot(ns),c=t.dot(ns),u=i.dot(ns);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var Vt=new X,Mo=new We,Sg=0,Ht=class extends Xn{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Sg++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=sh,this.updateRanges=[],this.gpuType=kn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Mo.fromBufferAttribute(this,t),Mo.applyMatrix3(e),this.setXY(t,Mo.x,Mo.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix3(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyMatrix4(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.applyNormalMatrix(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Vt.fromBufferAttribute(this,t),Vt.transformDirection(e),this.setXYZ(t,Vt.x,Vt.y,Vt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=Dn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=St(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Dn(t,this.array)),t}setX(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Dn(t,this.array)),t}setY(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Dn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Dn(t,this.array)),t}setW(e,t){return this.normalized&&(t=St(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),i=St(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),i=St(i,this.array),s=St(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=St(t,this.array),i=St(i,this.array),s=St(s,this.array),r=St(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var ua=class extends Ht{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var ha=class extends Ht{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var jt=class extends Ht{constructor(e,t,i){super(new Float32Array(e),t,i)}},Mg=new Mn,$r=new X,bu=new X,Un=class{constructor(e=new X,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):Mg.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;$r.subVectors(e,this.center);let t=$r.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector($r,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(bu.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint($r.copy(e.center).add(bu)),this.expandByPoint($r.copy(e.center).sub(bu))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},wg=0,An=new _t,Su=new qt,Ns=new X,Sn=new Mn,Zr=new Mn,$t=new X,Gt=class n extends Xn{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:wg++}),this.uuid=di(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ym(e)?ha:ua)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new Ze().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return An.makeRotationFromQuaternion(e),this.applyMatrix4(An),this}rotateX(e){return An.makeRotationX(e),this.applyMatrix4(An),this}rotateY(e){return An.makeRotationY(e),this.applyMatrix4(An),this}rotateZ(e){return An.makeRotationZ(e),this.applyMatrix4(An),this}translate(e,t,i){return An.makeTranslation(e,t,i),this.applyMatrix4(An),this}scale(e,t,i){return An.makeScale(e,t,i),this.applyMatrix4(An),this}lookAt(e){return Su.lookAt(e),Su.updateMatrix(),this.applyMatrix4(Su.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ns).negate(),this.translate(Ns.x,Ns.y,Ns.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new jt(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&Ye("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new X(-1/0,-1/0,-1/0),new X(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];Sn.setFromBufferAttribute(r),this.morphTargetsRelative?($t.addVectors(this.boundingBox.min,Sn.min),this.boundingBox.expandByPoint($t),$t.addVectors(this.boundingBox.max,Sn.max),this.boundingBox.expandByPoint($t)):(this.boundingBox.expandByPoint(Sn.min),this.boundingBox.expandByPoint(Sn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&Je('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){Je("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new X,1/0);return}if(e){let i=this.boundingSphere.center;if(Sn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Zr.setFromBufferAttribute(o),this.morphTargetsRelative?($t.addVectors(Sn.min,Zr.min),Sn.expandByPoint($t),$t.addVectors(Sn.max,Zr.max),Sn.expandByPoint($t)):(Sn.expandByPoint(Zr.min),Sn.expandByPoint(Zr.max))}Sn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)$t.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared($t));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)$t.fromBufferAttribute(o,c),l&&(Ns.fromBufferAttribute(e,c),$t.add(Ns)),s=Math.max(s,i.distanceToSquared($t))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&Je('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){Je("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Ht(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let x=0;x<i.count;x++)o[x]=new X,l[x]=new X;let c=new X,u=new X,d=new X,h=new We,f=new We,m=new We,v=new X,p=new X;function g(x,T,R){c.fromBufferAttribute(i,x),u.fromBufferAttribute(i,T),d.fromBufferAttribute(i,R),h.fromBufferAttribute(r,x),f.fromBufferAttribute(r,T),m.fromBufferAttribute(r,R),u.sub(c),d.sub(c),f.sub(h),m.sub(h);let I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(v.copy(u).multiplyScalar(m.y).addScaledVector(d,-f.y).multiplyScalar(I),p.copy(d).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(I),o[x].add(v),o[T].add(v),o[R].add(v),l[x].add(p),l[T].add(p),l[R].add(p))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let x=0,T=A.length;x<T;++x){let R=A[x],I=R.start,L=R.count;for(let U=I,N=I+L;U<N;U+=3)g(e.getX(U+0),e.getX(U+1),e.getX(U+2))}let C=new X,y=new X,E=new X,b=new X;function w(x){E.fromBufferAttribute(s,x),b.copy(E);let T=o[x];C.copy(T),C.sub(E.multiplyScalar(E.dot(T))).normalize(),y.crossVectors(b,T);let I=y.dot(l[x])<0?-1:1;a.setXYZW(x,C.x,C.y,C.z,I)}for(let x=0,T=A.length;x<T;++x){let R=A[x],I=R.start,L=R.count;for(let U=I,N=I+L;U<N;U+=3)w(e.getX(U+0)),w(e.getX(U+1)),w(e.getX(U+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Ht(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let h=0,f=i.count;h<f;h++)i.setXYZ(h,0,0,0);let s=new X,r=new X,a=new X,o=new X,l=new X,c=new X,u=new X,d=new X;if(e)for(let h=0,f=e.count;h<f;h+=3){let m=e.getX(h+0),v=e.getX(h+1),p=e.getX(h+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,v),a.fromBufferAttribute(t,p),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,v),c.fromBufferAttribute(i,p),o.add(u),l.add(u),c.add(u),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(v,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let h=0,f=t.count;h<f;h+=3)s.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),a.fromBufferAttribute(t,h+2),u.subVectors(a,r),d.subVectors(s,r),u.cross(d),i.setXYZ(h+0,u.x,u.y,u.z),i.setXYZ(h+1,u.x,u.y,u.z),i.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)$t.fromBufferAttribute(e,t),$t.normalize(),e.setXYZ(t,$t.x,$t.y,$t.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,d=o.normalized,h=new c.constructor(l.length*u),f=0,m=0;for(let v=0,p=l.length;v<p;v++){o.isInterleavedBufferAttribute?f=l[v]*o.data.stride+o.offset:f=l[v]*u;for(let g=0;g<u;g++)h[m++]=c[f++]}return new Ht(h,u,d)}if(this.index===null)return Ye("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,d=c.length;u<d;u++){let h=c[u],f=e(h,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){let f=c[d];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],d=r[c];for(let h=0,f=d.length;h<f;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let d=a[c];this.addGroup(d.start,d.count,d.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},da=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=sh,this.updateRanges=[],this.version=0,this.uuid=di()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=di()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},fn=new X,ln=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.applyMatrix4(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.applyNormalMatrix(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)fn.fromBufferAttribute(this,t),fn.transformDirection(e),this.setXYZ(t,fn.x,fn.y,fn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=Dn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=St(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=St(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Dn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Dn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Dn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Dn(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=St(t,this.array),i=St(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=St(t,this.array),i=St(i,this.array),s=St(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=St(t,this.array),i=St(i,this.array),s=St(s,this.array),r=St(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){oa("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Ht(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){oa("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Mu=new X,Eg=new X,Tg=new Ze,Ln=class{constructor(e=new X(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=Mu.subVectors(i,t).cross(Eg.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(Mu),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||Tg.getNormalMatrix(e),s=this.coplanarPoint(Mu).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},Ag=0,qn=class extends Xn{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Ag++}),this.uuid=di(),this.name="",this.type="Material",this.blending=ar,this.side=Hi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vu,this.blendDst=Hu,this.blendEquation=cs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new $e(0,0,0),this.blendAlpha=0,this.depthFunc=Xs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=If,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Go,this.stencilZFail=Go,this.stencilZPass=Go,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){Ye(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){Ye(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new $e().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Ln().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new We().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new We().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Qs=class extends qn{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Us,Kr=new X,Fs=new X,Os=new X,Bs=new We,Qr=new We,Gf=new _t,wo=new X,ea=new X,Eo=new X,Hd=new We,wu=new We,Gd=new We,fa=class extends qt{constructor(e=new Qs){if(super(),this.isSprite=!0,this.type="Sprite",Us===void 0){Us=new Gt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new da(t,5);Us.setIndex([0,1,2,0,2,3]),Us.setAttribute("position",new ln(i,3,0,!1)),Us.setAttribute("uv",new ln(i,2,3,!1))}this.geometry=Us,this.material=e,this.center=new We(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&Je('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Fs.setFromMatrixScale(this.matrixWorld),Gf.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Os.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Fs.multiplyScalar(-Os.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let a=this.center;To(wo.set(-.5,-.5,0),Os,a,Fs,s,r),To(ea.set(.5,-.5,0),Os,a,Fs,s,r),To(Eo.set(.5,.5,0),Os,a,Fs,s,r),Hd.set(0,0),wu.set(1,0),Gd.set(1,1);let o=e.ray.intersectTriangle(wo,ea,Eo,!1,Kr);if(o===null&&(To(ea.set(-.5,.5,0),Os,a,Fs,s,r),wu.set(0,1),o=e.ray.intersectTriangle(wo,Eo,ea,!1,Kr),o===null))return;let l=e.ray.origin.distanceTo(Kr);l<e.near||l>e.far||t.push({distance:l,point:Kr.clone(),uv:hi.getInterpolation(Kr,wo,ea,Eo,Hd,wu,Gd,new We),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function To(n,e,t,i,s,r){Bs.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Qr.x=r*Bs.x-s*Bs.y,Qr.y=s*Bs.x+r*Bs.y):Qr.copy(Bs),n.copy(e),n.x+=Qr.x,n.y+=Qr.y,n.applyMatrix4(Gf)}var ui=new X,Eu=new X,Ao=new X,Co=new X,pa=class{constructor(e=new X,t=new X(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ui)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ui.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ui.copy(this.origin).addScaledVector(this.direction,t),ui.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Eu.copy(e).add(t).multiplyScalar(.5),Ao.copy(t).sub(e).normalize(),Co.copy(this.origin).sub(Eu);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Ao),o=Co.dot(this.direction),l=-Co.dot(Ao),c=Co.lengthSq(),u=Math.abs(1-a*a),d,h,f,m;if(u>0)if(d=a*l-o,h=a*o-l,m=r*u,d>=0)if(h>=-m)if(h<=m){let v=1/u;d*=v,h*=v,f=d*(d+a*h+2*o)+h*(a*d+h+2*l)+c}else h=r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;else h<=-m?(d=Math.max(0,-(-a*r+o)),h=d>0?-r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c):h<=m?(d=0,h=Math.min(Math.max(-r,-l),r),f=h*(h+2*l)+c):(d=Math.max(0,-(a*r+o)),h=d>0?r:Math.min(Math.max(-r,-l),r),f=-d*d+h*(h+2*l)+c);else h=a>0?-r:r,d=Math.max(0,-(a*h+o)),f=-d*d+h*(h+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,d),s&&s.copy(Eu).addScaledVector(Ao,h),f}intersectSphere(e,t){if(e.radius<0)return null;ui.subVectors(e.center,this.origin);let i=ui.dot(this.direction),s=ui.dot(ui)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(i=(e.min.x-h.x)*c,s=(e.max.x-h.x)*c):(i=(e.max.x-h.x)*c,s=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,a=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,a=(e.min.y-h.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),d>=0?(o=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(o=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,ui)!==null}intersectTriangle(e,t,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,d=e.x-a.x,h=e.y-a.y,f=e.z-a.z,m=t.x-a.x,v=t.y-a.y,p=t.z-a.z,g=i.x-a.x,A=i.y-a.y,C=i.z-a.z,y=Math.abs(l),E=Math.abs(c),b=Math.abs(u),w,x,T,R,I,L,U,N,G,q,Z,ae;if(y>=E&&y>=b?(T=l,L=d,G=m,ae=g,l>=0?(w=c,x=u,R=h,I=f,U=v,N=p,q=A,Z=C):(w=u,x=c,R=f,I=h,U=p,N=v,q=C,Z=A)):E>=b?(T=c,L=h,G=v,ae=A,c>=0?(w=u,x=l,R=f,I=d,U=p,N=m,q=C,Z=g):(w=l,x=u,R=d,I=f,U=m,N=p,q=g,Z=C)):(T=u,L=f,G=p,ae=C,u>=0?(w=l,x=c,R=d,I=h,U=m,N=v,q=g,Z=A):(w=c,x=l,R=h,I=d,U=v,N=m,q=A,Z=g)),T===0)return null;let z=w/T,V=x/T,j=1/T,Y=R-z*L,re=I-V*L,xe=U-z*G,me=N-V*G,_e=q-z*ae,ee=Z-V*ae,le=_e*me-ee*xe,ge=Y*ee-re*_e,Pe=xe*re-me*Y;if(s){if(le<0||ge<0||Pe<0)return null}else if((le<0||ge<0||Pe<0)&&(le>0||ge>0||Pe>0))return null;let ye=le+ge+Pe;if(ye===0)return null;let je=j*(le*L+ge*G+Pe*ae);return(ye>0?je<0:je>0)?null:this.at(je/ye,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Fi=class extends qn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pi,this.combine=yl,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Wd=new _t,is=new pa,Ro=new Un,Xd=new X,Po=new X,Io=new X,Lo=new X,Tu=new X,Do=new X,jd=new X,No=new X,Wt=class extends qt{constructor(e=new Gt,t=new Fi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){Do.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],d=r[l];u!==0&&(Tu.fromBufferAttribute(d,e),a?Do.addScaledVector(Tu,u):Do.addScaledVector(Tu.sub(t),u))}t.add(Do)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ro.copy(i.boundingSphere),Ro.applyMatrix4(r),is.copy(e.ray).recast(e.near),!(Ro.containsPoint(is.origin)===!1&&(is.intersectSphere(Ro,Xd)===null||is.origin.distanceToSquared(Xd)>(e.far-e.near)**2))&&(Wd.copy(r).invert(),is.copy(e.ray).applyMatrix4(Wd),!(i.boundingBox!==null&&is.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,is)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,v=h.length;m<v;m++){let p=h[m],g=a[p.materialIndex],A=Math.max(p.start,f.start),C=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let y=A,E=C;y<E;y+=3){let b=o.getX(y),w=o.getX(y+1),x=o.getX(y+2);s=Uo(this,g,e,i,c,u,d,b,w,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),v=Math.min(o.count,f.start+f.count);for(let p=m,g=v;p<g;p+=3){let A=o.getX(p),C=o.getX(p+1),y=o.getX(p+2);s=Uo(this,a,e,i,c,u,d,A,C,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,v=h.length;m<v;m++){let p=h[m],g=a[p.materialIndex],A=Math.max(p.start,f.start),C=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let y=A,E=C;y<E;y+=3){let b=y,w=y+1,x=y+2;s=Uo(this,g,e,i,c,u,d,b,w,x),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let p=m,g=v;p<g;p+=3){let A=p,C=p+1,y=p+2;s=Uo(this,a,e,i,c,u,d,A,C,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function Cg(n,e,t,i,s,r,a,o){let l;if(e.side===Kt?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Hi,o),l===null)return null;No.copy(o),No.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(No);return c<t.near||c>t.far?null:{distance:c,point:No.clone(),object:n}}function Uo(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Po),n.getVertexPosition(l,Io),n.getVertexPosition(c,Lo);let u=Cg(n,e,t,i,Po,Io,Lo,jd);if(u){let d=new X;hi.getBarycoord(jd,Po,Io,Lo,d),s&&(u.uv=hi.getInterpolatedAttribute(s,o,l,c,d,new We)),r&&(u.uv1=hi.getInterpolatedAttribute(r,o,l,c,d,new We)),a&&(u.normal=hi.getInterpolatedAttribute(a,o,l,c,d,new X),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let h={a:o,b:l,c,normal:new X,materialIndex:0};hi.getNormal(Po,Io,Lo,h.normal),u.face=h,u.barycoord=d}return u}var os=class extends Ot{constructor(e=null,t=1,i=1,s,r,a,o,l,c=Zt,u=Zt,d,h){super(null,a,o,l,c,u,s,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ss=new Un,Rg=new We(.5,.5),Fo=new X,er=class{constructor(e=new Ln,t=new Ln,i=new Ln,s=new Ln,r=new Ln,a=new Ln){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Nn,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],f=r[7],m=r[8],v=r[9],p=r[10],g=r[11],A=r[12],C=r[13],y=r[14],E=r[15];if(s[0].setComponents(c-a,f-u,g-m,E-A).normalize(),s[1].setComponents(c+a,f+u,g+m,E+A).normalize(),s[2].setComponents(c+o,f+d,g+v,E+C).normalize(),s[3].setComponents(c-o,f-d,g-v,E-C).normalize(),i)s[4].setComponents(l,h,p,y).normalize(),s[5].setComponents(c-l,f-h,g-p,E-y).normalize();else if(s[4].setComponents(c-l,f-h,g-p,E-y).normalize(),t===Nn)s[5].setComponents(c+l,f+h,g+p,E+y).normalize();else if(t===qs)s[5].setComponents(l,h,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ss.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ss.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ss)}intersectsSprite(e){ss.center.set(0,0,0);let t=Rg.distanceTo(e.center);return ss.radius=.7071067811865476+t,ss.applyMatrix4(e.matrixWorld),this.intersectsSphere(ss)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Fo.x=s.normal.x>0?e.max.x:e.min.x,Fo.y=s.normal.y>0?e.max.y:e.min.y,Fo.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Fo)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var ls=class extends qn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new $e(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},qd=new _t,Nu=new pa,Oo=new Un,Bo=new X,Oi=class extends qt{constructor(e=new Gt,t=new ls){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Oo.copy(i.boundingSphere),Oo.applyMatrix4(s),Oo.radius+=r,e.ray.intersectsSphere(Oo)===!1)return;qd.copy(s).invert(),Nu.copy(e.ray).applyMatrix4(qd);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,d=i.attributes.position;if(c!==null){let h=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=h,v=f;m<v;m++){let p=c.getX(m);Bo.fromBufferAttribute(d,p),Yd(Bo,p,l,s,e,t,this)}}else{let h=Math.max(0,a.start),f=Math.min(d.count,a.start+a.count);for(let m=h,v=f;m<v;m++)Bo.fromBufferAttribute(d,m),Yd(Bo,m,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function Yd(n,e,t,i,s,r,a){let o=Nu.distanceSqToPoint(n);if(o<t){let l=new X;Nu.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ma=class extends Ot{constructor(e=[],t=Gi,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},tr=class extends Ot{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Bi=class extends Ot{constructor(e,t,i=Bn,s,r,a,o=Zt,l=Zt,c,u=Wn,d=1){if(u!==Wn&&u!==Wi)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let h={width:e,height:t,depth:d};super(h,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new $s(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},nl=class extends Bi{constructor(e,t=Bn,i=Gi,s,r,a=Zt,o=Zt,l,c=Wn){let u={width:e,height:e,depth:1},d=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,l,c),this.image=d,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},ga=class extends Ot{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},nr=class n extends Gt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],d=[],h=0,f=0;m("z","y","x",-1,-1,i,t,e,a,r,0),m("z","y","x",1,-1,i,t,-e,a,r,1),m("x","z","y",1,1,e,i,t,s,a,2),m("x","z","y",1,-1,e,i,-t,s,a,3),m("x","y","z",1,-1,e,t,i,s,r,4),m("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new jt(c,3)),this.setAttribute("normal",new jt(u,3)),this.setAttribute("uv",new jt(d,2));function m(v,p,g,A,C,y,E,b,w,x,T){let R=y/w,I=E/x,L=y/2,U=E/2,N=b/2,G=w+1,q=x+1,Z=0,ae=0,z=new X;for(let V=0;V<q;V++){let j=V*I-U;for(let Y=0;Y<G;Y++){let re=Y*R-L;z[v]=re*A,z[p]=j*C,z[g]=N,c.push(z.x,z.y,z.z),z[v]=0,z[p]=0,z[g]=b>0?1:-1,u.push(z.x,z.y,z.z),d.push(Y/w),d.push(1-V/x),Z+=1}}for(let V=0;V<x;V++)for(let j=0;j<w;j++){let Y=h+j+G*V,re=h+j+G*(V+1),xe=h+(j+1)+G*(V+1),me=h+(j+1)+G*V;l.push(Y,re,me),l.push(re,xe,me),ae+=6}o.addGroup(f,ae,T),f+=ae,h+=Z}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var _a=class n extends Gt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,d=e/o,h=t/l,f=[],m=[],v=[],p=[];for(let g=0;g<u;g++){let A=g*h-a;for(let C=0;C<c;C++){let y=C*d-r;m.push(y,-A,0),v.push(0,0,1),p.push(C/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let A=0;A<o;A++){let C=A+c*g,y=A+c*(g+1),E=A+1+c*(g+1),b=A+1+c*g;f.push(C,y,b),f.push(y,E,b)}this.setIndex(f),this.setAttribute("position",new jt(m,3)),this.setAttribute("normal",new jt(v,3)),this.setAttribute("uv",new jt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var mi=class n extends Gt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,u=[],d=new X,h=new X,f=[],m=[],v=[],p=[];for(let g=0;g<=i;g++){let A=[],C=g/i,y=a+C*o,E=e*Math.cos(y),b=Math.sqrt(e*e-E*E),w=0;g===0&&a===0?w=.5/t:g===i&&l===Math.PI&&(w=-.5/t);for(let x=0;x<=t;x++){let T=x/t,R=s+T*r;d.x=-b*Math.cos(R),d.y=E,d.z=b*Math.sin(R),m.push(d.x,d.y,d.z),h.copy(d).normalize(),v.push(h.x,h.y,h.z),p.push(T+w,1-C),A.push(c++)}u.push(A)}for(let g=0;g<i;g++)for(let A=0;A<t;A++){let C=u[g][A+1],y=u[g][A],E=u[g+1][A],b=u[g+1][A+1];(g!==0||a>0)&&f.push(C,y,b),(g!==i-1||l<Math.PI)&&f.push(y,E,b)}this.setIndex(f),this.setAttribute("position",new jt(m,3)),this.setAttribute("normal",new jt(v,3)),this.setAttribute("uv",new jt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var xa=class extends Gt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],i=new Set,s=new X,r=new X;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){let d=l[c],h=d.start,f=d.count;for(let m=h,v=h+f;m<v;m+=3)for(let p=0;p<3;p++){let g=o.getX(m+p),A=o.getX(m+(p+1)%3);s.fromBufferAttribute(a,g),r.fromBufferAttribute(a,A),Jd(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let u=3*o+c,d=3*o+(c+1)%3;s.fromBufferAttribute(a,u),r.fromBufferAttribute(a,d),Jd(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new jt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Jd(n,e,t){let i=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(i)===!0||t.has(s)===!0?!1:(t.add(i),t.add(s),!0)}function hs(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if($d(s))s.isRenderTargetTexture?(Ye("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if($d(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function cn(n){let e={};for(let t=0;t<n.length;t++){let i=hs(n[t]);for(let s in i)e[s]=i[s]}return e}function $d(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function Pg(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function lh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:ct.workingColorSpace}var Fa={clone:hs,merge:cn},Ig=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Lg=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Lt=class extends qn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Ig,this.fragmentShader=Lg,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=hs(e.uniforms),this.uniformsGroups=Pg(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new $e().setHex(s.value);break;case"v2":this.uniforms[i].value=new We().fromArray(s.value);break;case"v3":this.uniforms[i].value=new X().fromArray(s.value);break;case"v4":this.uniforms[i].value=new xt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new Ze().fromArray(s.value);break;case"m4":this.uniforms[i].value=new _t().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},il=class extends Lt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var ya=class extends qn{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new $e(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new $e(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rc,this.normalScale=new We(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new pi,this.combine=yl,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},sl=class extends qn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Rf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},rl=class extends qn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function ks(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Au(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var ki=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},al=class extends ki{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Iu,endingEnd:Iu}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case Lu:r=e,o=2*t-i;break;case Du:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case Lu:a=e,l=2*i-t;break;case Du:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,f=this._weightNext,m=(i-t)/(s-t),v=m*m,p=v*m,g=-h*p+2*h*v-h*m,A=(1+h)*p+(-1.5-2*h)*v+(-.5+h)*m+1,C=(-1-f)*p+(1.5+f)*v+.5*m,y=f*p-f*v;for(let E=0;E!==o;++E)r[E]=g*a[u+E]+A*a[c+E]+C*a[l+E]+y*a[d+E];return r}},ol=class extends ki{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(i-t)/(s-t),d=1-u;for(let h=0;h!==o;++h)r[h]=a[c+h]*d+a[l+h]*u;return r}},ll=class extends ki{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},cl=class extends ki{interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.inTangents,d=this.outTangents;if(!u||!d){let m=(i-t)/(s-t),v=1-m;for(let p=0;p!==o;++p)r[p]=a[c+p]*v+a[l+p]*m;return r}let h=o*2,f=e-1;for(let m=0;m!==o;++m){let v=a[c+m],p=a[l+m],g=f*h+m*2,A=d[g],C=d[g+1],y=e*h+m*2,E=u[y],b=u[y+1],w=Ng(i,t,A,E,s);r[m]=Wf(w,v,C,b,p)}return r}};function Wf(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function Dg(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function Ng(n,e,t,i,s){let r=(n-e)/(s-e);for(let a=0;a<8;a++){let o=Wf(r,e,t,i,s)-n;if(Math.abs(o)<1e-10)break;let l=Dg(r,e,t,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var wn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ks(t,this.TimeBufferType),this.values=ks(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:ks(e.times,Array),values:ks(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),Au(e.settings)&&(i.settings={inTangents:ks(e.settings.inTangents,Array),outTangents:ks(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new ll(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new ol(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new al(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new cl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case ia:t=this.InterpolantFactoryMethodDiscrete;break;case Ko:t=this.InterpolantFactoryMethodLinear;break;case Ho:t=this.InterpolantFactoryMethodSmooth;break;case Pu:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return Ye("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ia;case this.InterpolantFactoryMethodLinear:return Ko;case this.InterpolantFactoryMethodSmooth:return Ho;case this.InterpolantFactoryMethodBezier:return Pu}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;Au(this.settings)&&(Zd(this.settings.inTangents,e),Zd(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(Je("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(Je("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){Je("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){Je("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&Jm(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){Je("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Ho,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let d=o*i,h=d-i,f=d+i;for(let m=0;m!==i;++m){let v=t[d+m];if(v!==t[h+m]||v!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let d=o*i,h=a*i;for(let f=0;f!==i;++f)t[h+f]=t[d+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,Au(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Zd(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}wn.prototype.ValueTypeName="";wn.prototype.TimeBufferType=Float32Array;wn.prototype.ValueBufferType=Float32Array;wn.prototype.DefaultInterpolation=Ko;var zi=class extends wn{constructor(e,t,i){super(e,t,i)}};zi.prototype.ValueTypeName="bool";zi.prototype.ValueBufferType=Array;zi.prototype.DefaultInterpolation=ia;zi.prototype.InterpolantFactoryMethodLinear=void 0;zi.prototype.InterpolantFactoryMethodSmooth=void 0;var ul=class extends wn{constructor(e,t,i,s){super(e,t,i,s)}};ul.prototype.ValueTypeName="color";var hl=class extends wn{constructor(e,t,i,s){super(e,t,i,s)}};hl.prototype.ValueTypeName="number";var dl=class extends ki{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)jn.slerpFlat(r,0,a,c-o,a,c,l);return r}},va=class extends wn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new dl(this.times,this.values,this.getValueSize(),e)}};va.prototype.ValueTypeName="quaternion";va.prototype.InterpolantFactoryMethodSmooth=void 0;var Vi=class extends wn{constructor(e,t,i){super(e,t,i)}};Vi.prototype.ValueTypeName="string";Vi.prototype.ValueBufferType=Array;Vi.prototype.DefaultInterpolation=ia;Vi.prototype.InterpolantFactoryMethodLinear=void 0;Vi.prototype.InterpolantFactoryMethodSmooth=void 0;var fl=class extends wn{constructor(e,t,i,s){super(e,t,i,s)}};fl.prototype.ValueTypeName="vector";var pl=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){let d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){let f=c[d],m=c[d+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Xf=new pl,ml=class{constructor(e){this.manager=e!==void 0?e:Xf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};ml.DEFAULT_MATERIAL_NAME="__DEFAULT";var ba=class extends qt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new $e(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var Cu=new _t,Kd=new X,Qd=new X,gl=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new We(512,512),this.mapType=Qt,this.map=null,this.mapPass=null,this.matrix=new _t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new er,this._frameExtents=new We(1,1),this._viewportCount=1,this._viewports=[new xt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Kd.setFromMatrixPosition(e.matrixWorld),t.position.copy(Kd),Qd.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Qd),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){Cu.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(Cu,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===qs||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(Cu)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},ko=new X,zo=new jn,Gn=new X,Sa=class extends qt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new _t,this.projectionMatrix=new _t,this.projectionMatrixInverse=new _t,this.coordinateSystem=Nn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(ko,zo,Gn),Gn.x===1&&Gn.y===1&&Gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ko,zo,Gn.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(ko,zo,Gn),Gn.x===1&&Gn.y===1&&Gn.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(ko,zo,Gn.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Ui=new X,ef=new We,tf=new We,on=class extends Sa{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Js*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(ta*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Js*2*Math.atan(Math.tan(ta*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Ui.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z),Ui.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Ui.x,Ui.y).multiplyScalar(-e/Ui.z)}getViewSize(e,t){return this.getViewBounds(e,ef,tf),t.subVectors(tf,ef)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(ta*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var ir=class extends Sa{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Uu=class extends gl{constructor(){super(new ir(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Ma=class extends ba{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(qt.DEFAULT_UP),this.updateMatrix(),this.target=new qt,this.shadow=new Uu}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},wa=class extends ba{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var Ea=class extends Gt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var zs=-90,Vs=1,_l=class extends qt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new on(zs,Vs,e,t);s.layers=this.layers,this.add(s);let r=new on(zs,Vs,e,t);r.layers=this.layers,this.add(r);let a=new on(zs,Vs,e,t);a.layers=this.layers,this.add(a);let o=new on(zs,Vs,e,t);o.layers=this.layers,this.add(o);let l=new on(zs,Vs,e,t);l.layers=this.layers,this.add(l);let c=new on(zs,Vs,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Nn)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===qs)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let v=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=v,e.setRenderTarget(i,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(d,h,f),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},xl=class extends on{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var ch="\\[\\]\\.:\\/",Ug=new RegExp("["+ch+"]","g"),uh="[^"+ch+"]",Fg="[^"+ch.replace("\\.","")+"]",Og=/((?:WC+[\/:])*)/.source.replace("WC",uh),Bg=/(WCOD+)?/.source.replace("WCOD",Fg),kg=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",uh),zg=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",uh),Vg=new RegExp("^"+Og+Bg+kg+zg+"$"),Hg=["material","materials","bones","map"],Fu=class{constructor(e,t,i){let s=i||It.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},It=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Ug,"")}static parseTrackName(e){let t=Vg.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);Hg.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){Ye("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){Je("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){Je("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){Je("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){Je("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){Je("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){Je("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;Je("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){Je("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};It.Composite=Fu;It.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};It.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};It.prototype.GetterByBindingType=[It.prototype._getValue_direct,It.prototype._getValue_array,It.prototype._getValue_arrayElement,It.prototype._getValue_toArray];It.prototype.SetterByBindingTypeAndVersioning=[[It.prototype._setValue_direct,It.prototype._setValue_direct_setNeedsUpdate,It.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[It.prototype._setValue_array,It.prototype._setValue_array_setNeedsUpdate,It.prototype._setValue_array_setMatrixWorldNeedsUpdate],[It.prototype._setValue_arrayElement,It.prototype._setValue_arrayElement_setNeedsUpdate,It.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[It.prototype._setValue_fromArray,It.prototype._setValue_fromArray_setNeedsUpdate,It.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var rM=new Float32Array(1);var Yn=class extends da{constructor(e,t,i=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var Ou=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}},nf=new We,sr=class{constructor(e=new We(1/0,1/0),t=new We(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=nf.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nf).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},sf=new X,Vo=new X,Hs=new X,Gs=new X,Ru=new X,Gg=new X,Wg=new X,Ta=class{constructor(e=new X,t=new X){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){sf.subVectors(e,this.start),Vo.subVectors(this.end,this.start);let i=Vo.dot(Vo);if(i===0)return 0;let r=Vo.dot(sf)/i;return t&&(r=nt(r,0,1)),r}closestPointToPoint(e,t,i){let s=this.closestPointToPointParameter(e,t);return this.delta(i).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=Gg,i=Wg){let s=10000000000000001e-32,r,a,o=this.start,l=e.start,c=this.end,u=e.end;Hs.subVectors(c,o),Gs.subVectors(u,l),Ru.subVectors(o,l);let d=Hs.dot(Hs),h=Gs.dot(Gs),f=Gs.dot(Ru);if(d<=s&&h<=s)return t.copy(o),i.copy(l),t.sub(i),t.dot(t);if(d<=s)r=0,a=f/h,a=nt(a,0,1);else{let m=Hs.dot(Ru);if(h<=s)a=0,r=nt(-m/d,0,1);else{let v=Hs.dot(Gs),p=d*h-v*v;p!==0?r=nt((v*f-m*h)/p,0,1):r=0,a=(v*r+f)/h,a<0?(a=0,r=nt(-m/d,0,1)):a>1&&(a=1,r=nt((v-m)/d,0,1))}}return t.copy(o).addScaledVector(Hs,r),i.copy(l).addScaledVector(Gs,a),t.distanceToSquared(i)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function hh(n,e,t,i){let s=Xg(i);switch(t){case th:return n*e;case ih:return n*e/s.components*s.byteLength;case Tl:return n*e/s.components*s.byteLength;case Xi:return n*e*2/s.components*s.byteLength;case Al:return n*e*2/s.components*s.byteLength;case nh:return n*e*3/s.components*s.byteLength;case pn:return n*e*4/s.components*s.byteLength;case Cl:return n*e*4/s.components*s.byteLength;case Pa:case Ia:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case La:case Da:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Pl:case Ll:return Math.max(n,16)*Math.max(e,8)/4;case Rl:case Il:return Math.max(n,8)*Math.max(e,8)/2;case Dl:case Nl:case Fl:case Ol:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Ul:case Na:case Bl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case kl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case zl:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Vl:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Hl:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Gl:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Wl:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Xl:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case jl:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case ql:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Yl:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Jl:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case $l:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case Zl:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Kl:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case Ql:case ec:case tc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case nc:case ic:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Ua:case sc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Xg(n){switch(n){case Qt:case Zu:return{byteLength:1,components:1};case or:case Ku:case zn:return{byteLength:2,components:1};case wl:case El:return{byteLength:2,components:4};case Bn:case Ml:case kn:return{byteLength:4,components:1};case Qu:case eh:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?Ye("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function fp(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function qg(n){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,d=c.byteLength,h=n.createBuffer();n.bindBuffer(l,h),n.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:d}}function i(o,l,c){let u=l.array,d=l.updateRanges;if(n.bindBuffer(c,o),d.length===0)n.bufferSubData(c,0,u);else{d.sort((f,m)=>f.start-m.start);let h=0;for(let f=1;f<d.length;f++){let m=d[h],v=d[f];v.start<=m.start+m.count+1?m.count=Math.max(m.count,v.start+v.count-m.start):(++h,d[h]=v)}d.length=h+1;for(let f=0,m=d.length;f<m;f++){let v=d[f];n.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Yg=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Jg=`#ifdef USE_ALPHAHASH
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
#endif`,$g=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Zg=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Kg=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Qg=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,e0=`#ifdef USE_AOMAP
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
#endif`,t0=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,n0=`#ifdef USE_BATCHING
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
#endif`,i0=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,s0=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,r0=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,a0=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,o0=`#ifdef USE_IRIDESCENCE
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
#endif`,l0=`#ifdef USE_BUMPMAP
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
#endif`,c0=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,u0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,h0=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,d0=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,f0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,p0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,m0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,g0=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,_0=`#define PI 3.141592653589793
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
} // validated`,x0=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,y0=`vec3 transformedNormal = objectNormal;
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
#endif`,v0=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,b0=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,S0=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,M0=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,w0="gl_FragColor = linearToOutputTexel( gl_FragColor );",E0=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,T0=`#ifdef USE_ENVMAP
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
#endif`,A0=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,C0=`#ifdef USE_ENVMAP
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
#endif`,R0=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,P0=`#ifdef USE_ENVMAP
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
#endif`,I0=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,L0=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,D0=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,N0=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,U0=`#ifdef USE_GRADIENTMAP
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
}`,F0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,O0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,B0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,k0=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,z0=`#ifdef USE_ENVMAP
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
#endif`,V0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,H0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,G0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,W0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,X0=`PhysicalMaterial material;
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
#endif`,j0=`uniform sampler2D dfgLUT;
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
}`,q0=`
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
#endif`,Y0=`#if defined( RE_IndirectDiffuse )
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
#endif`,J0=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,$0=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Z0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,K0=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q0=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,e_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,t_=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,n_=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,i_=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,s_=`#if defined( USE_POINTS_UV )
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
#endif`,r_=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,a_=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,o_=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,l_=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,c_=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,u_=`#ifdef USE_MORPHTARGETS
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
#endif`,h_=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,d_=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,f_=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,p_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,m_=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,g_=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,__=`#ifdef USE_NORMALMAP
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
#endif`,x_=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,y_=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,v_=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,b_=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,S_=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,M_=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,w_=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,E_=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,T_=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,A_=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,C_=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,R_=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,P_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,I_=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,L_=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,D_=`float getShadowMask() {
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
}`,N_=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,U_=`#ifdef USE_SKINNING
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
#endif`,F_=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,O_=`#ifdef USE_SKINNING
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
#endif`,B_=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,k_=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,z_=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,V_=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,H_=`#ifdef USE_TRANSMISSION
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
#endif`,G_=`#ifdef USE_TRANSMISSION
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
#endif`,W_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,X_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,j_=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,q_=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Y_=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,J_=`uniform sampler2D t2D;
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
}`,$_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Z_=`#ifdef ENVMAP_TYPE_CUBE
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
}`,K_=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Q_=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ex=`#include <common>
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
}`,tx=`#if DEPTH_PACKING == 3200
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
}`,nx=`#define DISTANCE
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
}`,ix=`#define DISTANCE
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
}`,sx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,rx=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ax=`uniform float scale;
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
}`,ox=`uniform vec3 diffuse;
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
}`,lx=`#include <common>
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
}`,cx=`uniform vec3 diffuse;
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
}`,ux=`#define LAMBERT
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
}`,hx=`#define LAMBERT
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
}`,dx=`#define MATCAP
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
}`,fx=`#define MATCAP
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
}`,px=`#define NORMAL
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
}`,mx=`#define NORMAL
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
}`,gx=`#define PHONG
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
}`,_x=`#define PHONG
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
}`,xx=`#define STANDARD
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
}`,yx=`#define STANDARD
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
}`,vx=`#define TOON
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
}`,bx=`#define TOON
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
}`,Sx=`uniform float size;
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
}`,Mx=`uniform vec3 diffuse;
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
}`,wx=`#include <common>
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
}`,Ex=`uniform vec3 color;
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
}`,Tx=`uniform float rotation;
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
}`,Ax=`uniform vec3 diffuse;
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
}`,rt={alphahash_fragment:Yg,alphahash_pars_fragment:Jg,alphamap_fragment:$g,alphamap_pars_fragment:Zg,alphatest_fragment:Kg,alphatest_pars_fragment:Qg,aomap_fragment:e0,aomap_pars_fragment:t0,batching_pars_vertex:n0,batching_vertex:i0,begin_vertex:s0,beginnormal_vertex:r0,bsdfs:a0,iridescence_fragment:o0,bumpmap_pars_fragment:l0,clipping_planes_fragment:c0,clipping_planes_pars_fragment:u0,clipping_planes_pars_vertex:h0,clipping_planes_vertex:d0,color_fragment:f0,color_pars_fragment:p0,color_pars_vertex:m0,color_vertex:g0,common:_0,cube_uv_reflection_fragment:x0,defaultnormal_vertex:y0,displacementmap_pars_vertex:v0,displacementmap_vertex:b0,emissivemap_fragment:S0,emissivemap_pars_fragment:M0,colorspace_fragment:w0,colorspace_pars_fragment:E0,envmap_fragment:T0,envmap_common_pars_fragment:A0,envmap_pars_fragment:C0,envmap_pars_vertex:R0,envmap_physical_pars_fragment:z0,envmap_vertex:P0,fog_vertex:I0,fog_pars_vertex:L0,fog_fragment:D0,fog_pars_fragment:N0,gradientmap_pars_fragment:U0,lightmap_pars_fragment:F0,lights_lambert_fragment:O0,lights_lambert_pars_fragment:B0,lights_pars_begin:k0,lights_toon_fragment:V0,lights_toon_pars_fragment:H0,lights_phong_fragment:G0,lights_phong_pars_fragment:W0,lights_physical_fragment:X0,lights_physical_pars_fragment:j0,lights_fragment_begin:q0,lights_fragment_maps:Y0,lights_fragment_end:J0,lightprobes_pars_fragment:$0,logdepthbuf_fragment:Z0,logdepthbuf_pars_fragment:K0,logdepthbuf_pars_vertex:Q0,logdepthbuf_vertex:e_,map_fragment:t_,map_pars_fragment:n_,map_particle_fragment:i_,map_particle_pars_fragment:s_,metalnessmap_fragment:r_,metalnessmap_pars_fragment:a_,morphinstance_vertex:o_,morphcolor_vertex:l_,morphnormal_vertex:c_,morphtarget_pars_vertex:u_,morphtarget_vertex:h_,normal_fragment_begin:d_,normal_fragment_maps:f_,normal_pars_fragment:p_,normal_pars_vertex:m_,normal_vertex:g_,normalmap_pars_fragment:__,clearcoat_normal_fragment_begin:x_,clearcoat_normal_fragment_maps:y_,clearcoat_pars_fragment:v_,iridescence_pars_fragment:b_,opaque_fragment:S_,packing:M_,premultiplied_alpha_fragment:w_,project_vertex:E_,dithering_fragment:T_,dithering_pars_fragment:A_,roughnessmap_fragment:C_,roughnessmap_pars_fragment:R_,shadowmap_pars_fragment:P_,shadowmap_pars_vertex:I_,shadowmap_vertex:L_,shadowmask_pars_fragment:D_,skinbase_vertex:N_,skinning_pars_vertex:U_,skinning_vertex:F_,skinnormal_vertex:O_,specularmap_fragment:B_,specularmap_pars_fragment:k_,tonemapping_fragment:z_,tonemapping_pars_fragment:V_,transmission_fragment:H_,transmission_pars_fragment:G_,uv_pars_fragment:W_,uv_pars_vertex:X_,uv_vertex:j_,worldpos_vertex:q_,background_vert:Y_,background_frag:J_,backgroundCube_vert:$_,backgroundCube_frag:Z_,cube_vert:K_,cube_frag:Q_,depth_vert:ex,depth_frag:tx,distance_vert:nx,distance_frag:ix,equirect_vert:sx,equirect_frag:rx,linedashed_vert:ax,linedashed_frag:ox,meshbasic_vert:lx,meshbasic_frag:cx,meshlambert_vert:ux,meshlambert_frag:hx,meshmatcap_vert:dx,meshmatcap_frag:fx,meshnormal_vert:px,meshnormal_frag:mx,meshphong_vert:gx,meshphong_frag:_x,meshphysical_vert:xx,meshphysical_frag:yx,meshtoon_vert:vx,meshtoon_frag:bx,points_vert:Sx,points_frag:Mx,shadow_vert:wx,shadow_frag:Ex,sprite_vert:Tx,sprite_frag:Ax},Se={common:{diffuse:{value:new $e(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ze}},envmap:{envMap:{value:null},envMapRotation:{value:new Ze},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ze}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ze}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ze},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ze},normalScale:{value:new We(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ze},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ze}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ze}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ze}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new $e(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new X},probesMax:{value:new X},probesResolution:{value:new X}},points:{diffuse:{value:new $e(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0},uvTransform:{value:new Ze}},sprite:{diffuse:{value:new $e(16777215)},opacity:{value:1},center:{value:new We(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ze},alphaMap:{value:null},alphaMapTransform:{value:new Ze},alphaTest:{value:0}}},mn={basic:{uniforms:cn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.fog]),vertexShader:rt.meshbasic_vert,fragmentShader:rt.meshbasic_frag},lambert:{uniforms:cn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new $e(0)},envMapIntensity:{value:1}}]),vertexShader:rt.meshlambert_vert,fragmentShader:rt.meshlambert_frag},phong:{uniforms:cn([Se.common,Se.specularmap,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,Se.lights,{emissive:{value:new $e(0)},specular:{value:new $e(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:rt.meshphong_vert,fragmentShader:rt.meshphong_frag},standard:{uniforms:cn([Se.common,Se.envmap,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.roughnessmap,Se.metalnessmap,Se.fog,Se.lights,{emissive:{value:new $e(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag},toon:{uniforms:cn([Se.common,Se.aomap,Se.lightmap,Se.emissivemap,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.gradientmap,Se.fog,Se.lights,{emissive:{value:new $e(0)}}]),vertexShader:rt.meshtoon_vert,fragmentShader:rt.meshtoon_frag},matcap:{uniforms:cn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,Se.fog,{matcap:{value:null}}]),vertexShader:rt.meshmatcap_vert,fragmentShader:rt.meshmatcap_frag},points:{uniforms:cn([Se.points,Se.fog]),vertexShader:rt.points_vert,fragmentShader:rt.points_frag},dashed:{uniforms:cn([Se.common,Se.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:rt.linedashed_vert,fragmentShader:rt.linedashed_frag},depth:{uniforms:cn([Se.common,Se.displacementmap]),vertexShader:rt.depth_vert,fragmentShader:rt.depth_frag},normal:{uniforms:cn([Se.common,Se.bumpmap,Se.normalmap,Se.displacementmap,{opacity:{value:1}}]),vertexShader:rt.meshnormal_vert,fragmentShader:rt.meshnormal_frag},sprite:{uniforms:cn([Se.sprite,Se.fog]),vertexShader:rt.sprite_vert,fragmentShader:rt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ze},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:rt.background_vert,fragmentShader:rt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ze}},vertexShader:rt.backgroundCube_vert,fragmentShader:rt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:rt.cube_vert,fragmentShader:rt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:rt.equirect_vert,fragmentShader:rt.equirect_frag},distance:{uniforms:cn([Se.common,Se.displacementmap,{referencePosition:{value:new X},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:rt.distance_vert,fragmentShader:rt.distance_frag},shadow:{uniforms:cn([Se.lights,Se.fog,{color:{value:new $e(0)},opacity:{value:1}}]),vertexShader:rt.shadow_vert,fragmentShader:rt.shadow_frag}};mn.physical={uniforms:cn([mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ze},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ze},clearcoatNormalScale:{value:new We(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ze},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ze},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ze},sheen:{value:0},sheenColor:{value:new $e(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ze},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ze},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ze},transmissionSamplerSize:{value:new We},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ze},attenuationDistance:{value:0},attenuationColor:{value:new $e(0)},specularColor:{value:new $e(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ze},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ze},anisotropyVector:{value:new We},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ze}}]),vertexShader:rt.meshphysical_vert,fragmentShader:rt.meshphysical_frag};var lc={r:0,b:0,g:0},Cx=new _t,pp=new Ze;pp.set(-1,0,0,0,1,0,0,0,1);function Rx(n,e,t,i,s,r){let a=new $e(0),o=s===!0?0:1,l,c,u=null,d=0,h=null;function f(A){let C=A.isScene===!0?A.background:null;if(C&&C.isTexture){let y=A.backgroundBlurriness>0;C=e.get(C,y)}return C}function m(A){let C=!1,y=f(A);y===null?p(a,o):y&&y.isColor&&(p(y,1),C=!0);let E=n.xr.getEnvironmentBlendMode();E==="additive"?t.buffers.color.setClear(0,0,0,1,r):E==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||C)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function v(A,C){let y=f(C);y&&(y.isCubeTexture||y.mapping===Ca)?(c===void 0&&(c=new Wt(new nr(1,1,1),new Lt({name:"BackgroundCubeMaterial",uniforms:hs(mn.backgroundCube.uniforms),vertexShader:mn.backgroundCube.vertexShader,fragmentShader:mn.backgroundCube.fragmentShader,side:Kt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(E,b,w){this.matrixWorld.copyPosition(w.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=C.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Cx.makeRotationFromEuler(C.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(pp),c.material.toneMapped=ct.getTransfer(y.colorSpace)!==vt,(u!==y||d!==y.version||h!==n.toneMapping)&&(c.material.needsUpdate=!0,u=y,d=y.version,h=n.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new Wt(new _a(2,2),new Lt({name:"BackgroundMaterial",uniforms:hs(mn.background.uniforms),vertexShader:mn.background.vertexShader,fragmentShader:mn.background.fragmentShader,side:Hi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=C.backgroundIntensity,l.material.toneMapped=ct.getTransfer(y.colorSpace)!==vt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||h!==n.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,h=n.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function p(A,C){A.getRGB(lc,lh(n)),t.buffers.color.setClear(lc.r,lc.g,lc.b,C,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,C=1){a.set(A),o=C,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(A){o=A,p(a,o)},render:m,addToRenderList:v,dispose:g}}function Px(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=h(null),r=s,a=!1;function o(I,L,U,N,G){let q=!1,Z=d(I,N,U,L);r!==Z&&(r=Z,c(r.object)),q=f(I,N,U,G),q&&m(I,N,U,G),G!==null&&e.update(G,n.ELEMENT_ARRAY_BUFFER),(q||a)&&(a=!1,y(I,L,U,N),G!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function l(){return n.createVertexArray()}function c(I){return n.bindVertexArray(I)}function u(I){return n.deleteVertexArray(I)}function d(I,L,U,N){let G=N.wireframe===!0,q=i[L.id];q===void 0&&(q={},i[L.id]=q);let Z=I.isInstancedMesh===!0?I.id:0,ae=q[Z];ae===void 0&&(ae={},q[Z]=ae);let z=ae[U.id];z===void 0&&(z={},ae[U.id]=z);let V=z[G];return V===void 0&&(V=h(l()),z[G]=V),V}function h(I){let L=[],U=[],N=[];for(let G=0;G<t;G++)L[G]=0,U[G]=0,N[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:N,object:I,attributes:{},index:null}}function f(I,L,U,N){let G=r.attributes,q=L.attributes,Z=0,ae=U.getAttributes();for(let z in ae)if(ae[z].location>=0){let j=G[z],Y=q[z];if(Y===void 0&&(z==="instanceMatrix"&&I.instanceMatrix&&(Y=I.instanceMatrix),z==="instanceColor"&&I.instanceColor&&(Y=I.instanceColor)),j===void 0||j.attribute!==Y||Y&&j.data!==Y.data)return!0;Z++}return r.attributesNum!==Z||r.index!==N}function m(I,L,U,N){let G={},q=L.attributes,Z=0,ae=U.getAttributes();for(let z in ae)if(ae[z].location>=0){let j=q[z];j===void 0&&(z==="instanceMatrix"&&I.instanceMatrix&&(j=I.instanceMatrix),z==="instanceColor"&&I.instanceColor&&(j=I.instanceColor));let Y={};Y.attribute=j,j&&j.data&&(Y.data=j.data),G[z]=Y,Z++}r.attributes=G,r.attributesNum=Z,r.index=N}function v(){let I=r.newAttributes;for(let L=0,U=I.length;L<U;L++)I[L]=0}function p(I){g(I,0)}function g(I,L){let U=r.newAttributes,N=r.enabledAttributes,G=r.attributeDivisors;U[I]=1,N[I]===0&&(n.enableVertexAttribArray(I),N[I]=1),G[I]!==L&&(n.vertexAttribDivisor(I,L),G[I]=L)}function A(){let I=r.newAttributes,L=r.enabledAttributes;for(let U=0,N=L.length;U<N;U++)L[U]!==I[U]&&(n.disableVertexAttribArray(U),L[U]=0)}function C(I,L,U,N,G,q,Z){Z===!0?n.vertexAttribIPointer(I,L,U,G,q):n.vertexAttribPointer(I,L,U,N,G,q)}function y(I,L,U,N){v();let G=N.attributes,q=U.getAttributes(),Z=L.defaultAttributeValues;for(let ae in q){let z=q[ae];if(z.location>=0){let V=G[ae];if(V===void 0&&(ae==="instanceMatrix"&&I.instanceMatrix&&(V=I.instanceMatrix),ae==="instanceColor"&&I.instanceColor&&(V=I.instanceColor)),V!==void 0){let j=V.normalized,Y=V.itemSize,re=e.get(V);if(re===void 0)continue;let xe=re.buffer,me=re.type,_e=re.bytesPerElement,ee=me===n.INT||me===n.UNSIGNED_INT||V.gpuType===Ml;if(V.isInterleavedBufferAttribute){let le=V.data,ge=le.stride,Pe=V.offset;if(le.isInstancedInterleavedBuffer){for(let ye=0;ye<z.locationSize;ye++)g(z.location+ye,le.meshPerAttribute);I.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let ye=0;ye<z.locationSize;ye++)p(z.location+ye);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let ye=0;ye<z.locationSize;ye++)C(z.location+ye,Y/z.locationSize,me,j,ge*_e,(Pe+Y/z.locationSize*ye)*_e,ee)}else{if(V.isInstancedBufferAttribute){for(let le=0;le<z.locationSize;le++)g(z.location+le,V.meshPerAttribute);I.isInstancedMesh!==!0&&N._maxInstanceCount===void 0&&(N._maxInstanceCount=V.meshPerAttribute*V.count)}else for(let le=0;le<z.locationSize;le++)p(z.location+le);n.bindBuffer(n.ARRAY_BUFFER,xe);for(let le=0;le<z.locationSize;le++)C(z.location+le,Y/z.locationSize,me,j,Y*_e,Y/z.locationSize*le*_e,ee)}}else if(Z!==void 0){let j=Z[ae];if(j!==void 0)switch(j.length){case 2:n.vertexAttrib2fv(z.location,j);break;case 3:n.vertexAttrib3fv(z.location,j);break;case 4:n.vertexAttrib4fv(z.location,j);break;default:n.vertexAttrib1fv(z.location,j)}}}}A()}function E(){T();for(let I in i){let L=i[I];for(let U in L){let N=L[U];for(let G in N){let q=N[G];for(let Z in q)u(q[Z].object),delete q[Z];delete N[G]}}delete i[I]}}function b(I){if(i[I.id]===void 0)return;let L=i[I.id];for(let U in L){let N=L[U];for(let G in N){let q=N[G];for(let Z in q)u(q[Z].object),delete q[Z];delete N[G]}}delete i[I.id]}function w(I){for(let L in i){let U=i[L];for(let N in U){let G=U[N];if(G[I.id]===void 0)continue;let q=G[I.id];for(let Z in q)u(q[Z].object),delete q[Z];delete G[I.id]}}}function x(I){for(let L in i){let U=i[L],N=I.isInstancedMesh===!0?I.id:0,G=U[N];if(G!==void 0){for(let q in G){let Z=G[q];for(let ae in Z)u(Z[ae].object),delete Z[ae];delete G[q]}delete U[N],Object.keys(U).length===0&&delete i[L]}}}function T(){R(),a=!0,r!==s&&(r=s,c(r.object))}function R(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:R,dispose:E,releaseStatesOfGeometry:b,releaseStatesOfObject:x,releaseStatesOfProgram:w,initAttributes:v,enableAttribute:p,disableUnusedAttributes:A}}function Ix(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let h=0;for(let f=0;f<u;f++)h+=c[f];t.update(h,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Lx(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let w=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(w.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(w){return!(w!==pn&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(w){let x=w===zn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(w!==Qt&&w!==kn&&!x&&i.convert(w)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(w){if(w==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";w="mediump"}return w==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(Ye("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&h===!1&&Ye("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),C=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),E=n.getParameter(n.MAX_SAMPLES),b=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:f,maxVertexTextures:m,maxTextureSize:v,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:A,maxVaryings:C,maxFragmentUniforms:y,maxSamples:E,samples:b}}function Dx(n){let e=this,t=null,i=0,s=!1,r=!1,a=new Ln,o=new Ze,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){let f=d.length!==0||h||i!==0||s;return s=h,i=d.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,f){let m=d.clippingPlanes,v=d.clipIntersection,p=d.clipShadows,g=n.get(d);if(!s||m===null||m.length===0||r&&!p)r?u(null):c();else{let A=r?0:i,C=A*4,y=g.clippingState||null;l.value=y,y=u(m,h,C,f);for(let E=0;E!==C;++E)y[E]=t[E];g.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(d,h,f,m){let v=d!==null?d.length:0,p=null;if(v!==0){if(p=l.value,m!==!0||p===null){let g=f+v*4,A=h.matrixWorldInverse;o.getNormalMatrix(A),(p===null||p.length<g)&&(p=new Float32Array(g));for(let C=0,y=f;C!==v;++C,y+=4)a.copy(d[C]).applyMatrix4(A,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,p}}var ur=4,Nx=6,Ux=20,Fx=256,Oa=new ir,jf=new $e,dh=null,fh=0,ph=0,mh=!1,Ox=new X,ds=new X,uc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=Ox}=r;dh=this._renderer.getRenderTarget(),fh=this._renderer.getActiveCubeFace(),ph=this._renderer.getActiveMipmapLevel(),mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Jf(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Yf(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(dh,fh,ph),this._renderer.xr.enabled=mh,e.scissorTest=!1,cr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Gi||e.mapping===us?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),dh=this._renderer.getRenderTarget(),fh=this._renderer.getActiveCubeFace(),ph=this._renderer.getActiveMipmapLevel(),mh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Rt,minFilter:Rt,generateMipmaps:!1,type:zn,format:pn,colorSpace:sa,depthBuffer:!1},s=qf(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=qf(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=Bx(r)),this._blurMaterial=zx(r,e,t),this._ggxMaterial=kx(r,e,t)}return s}_compileMaterial(e){let t=new Wt(new Gt,e);this._renderer.compile(t,Oa)}_sceneToCubeUV(e,t,i,s,r){let l=new on(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,f=d.toneMapping;d.getClearColor(jf),d.toneMapping=Fn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(s),d.clearDepth(),d.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Wt(new nr,new Fi({name:"PMREM.Background",side:Kt,depthWrite:!1,depthTest:!1})));let v=this._backgroundBox,p=v.material,g=!1,A=e.background;A?A.isColor&&(p.color.copy(A),e.background=null,g=!0):(p.color.copy(jf),g=!0);for(let C=0;C<6;C++){let y=C%3;y===0?(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[C],r.y,r.z)):y===1?(l.up.set(0,0,c[C]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[C],r.z)):(l.up.set(0,c[C],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[C]));let E=this._cubeSize;cr(s,y*E,C>2?E:0,E,E),d.setRenderTarget(s),g&&d.render(v,l),d.render(e,l)}d.toneMapping=f,d.autoClear=h,e.background=A}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===Gi||e.mapping===us;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=Jf()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Yf());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;cr(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Oa)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),d=Math.sqrt(c*c-u*u),h=c*1.25,f=d*h,{_lodMax:m}=this,v=this._sizeLods[i],p=3*v*(i>m-ur?i-m+ur:0),g=4*(this._cubeSize-v);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,cr(r,p,g,3*v,2*v),s.setRenderTarget(r),s.render(o,Oa),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-i,cr(e,p,g,3*v,2*v),s.setRenderTarget(e),s.render(o,Oa)}_blur(e,t,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let u=this._sizeLods[s],d=3*u*(s>this._lodMax-ur?s-this._lodMax+ur:0),h=4*(this._cubeSize-u);cr(t,d,h,3*u,2*u),a.setRenderTarget(t),a.render(l,Oa)}};function Bx(n){let e=[],t=[],i=n,s=n-ur+1+Nx;for(let r=0;r<s;r++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],d=6,h=6,f=3,m=new Float32Array(f*h*d),v=new Float32Array(f*h*d);for(let g=0;g<d;g++){let A=g%3*2/3-1,C=g>2?0:-1,y=[A,C,0,A+2/3,C,0,A+2/3,C+1,0,A,C,0,A+2/3,C+1,0,A,C+1,0];m.set(y,f*h*g);for(let E=0;E<h;E++){let b=u[E*2]*2-1,w=u[E*2+1]*2-1;g===0?ds.set(1,w,b):g===1?ds.set(-b,1,-w):g===2?ds.set(-b,w,1):g===3?ds.set(-1,w,-b):g===4?ds.set(-b,-1,w):ds.set(b,w,-1),ds.toArray(v,(g*h+E)*f)}}let p=new Gt;p.setAttribute("position",new Ht(m,f)),p.setAttribute("outputDirection",new Ht(v,f)),t.push(new Wt(p,null)),i>ur&&i--}return{lodMeshes:t,sizeLods:e}}function qf(n,e,t){let i=new vn(n,e,t);return i.texture.mapping=Ca,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function cr(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function kx(n,e,t){return new Lt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Fx,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:fc(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function zx(n,e,t){return new Lt({name:"SphericalGaussianBlur",defines:{SAMPLES:Ux,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:fc(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Yf(){return new Lt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:fc(),fragmentShader:`

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
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Jf(){return new Lt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:fc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function fc(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var hc=class extends vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new ma(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new nr(5,5,5),r=new Lt({name:"CubemapFromEquirect",uniforms:hs(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:Kt,blending:$n});r.uniforms.tEquirect.value=t;let a=new Wt(s,r),o=t.minFilter;return t.minFilter===On&&(t.minFilter=Rt),new _l(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}};function Vx(n){let e=new WeakMap,t=new WeakMap,i=null;function s(h,f=!1){return h==null?null:f?a(h):r(h)}function r(h){if(h&&h.isTexture){let f=h.mapping;if(f===vl||f===bl)if(e.has(h)){let m=e.get(h).texture;return o(m,h.mapping)}else{let m=h.image;if(m&&m.height>0){let v=new hc(m.height);return v.fromEquirectangularTexture(n,h),e.set(h,v),h.addEventListener("dispose",c),o(v.texture,h.mapping)}else return null}}return h}function a(h){if(h&&h.isTexture){let f=h.mapping,m=f===vl||f===bl,v=f===Gi||f===us;if(m||v){let p=t.get(h),g=p!==void 0?p.texture.pmremVersion:0;if(h.isRenderTargetTexture&&h.pmremVersion!==g)return i===null&&(i=new uc(n)),p=m?i.fromEquirectangular(h,p):i.fromCubemap(h,p),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),p.texture;if(p!==void 0)return p.texture;{let A=h.image;return m&&A&&A.height>0||v&&A&&l(A)?(i===null&&(i=new uc(n)),p=m?i.fromEquirectangular(h):i.fromCubemap(h),p.texture.pmremVersion=h.pmremVersion,t.set(h,p),h.addEventListener("dispose",u),p.texture):null}}}return h}function o(h,f){return f===vl?h.mapping=Gi:f===bl&&(h.mapping=us),h}function l(h){let f=0,m=6;for(let v=0;v<m;v++)h[v]!==void 0&&f++;return f===m}function c(h){let f=h.target;f.removeEventListener("dispose",c);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(h){let f=h.target;f.removeEventListener("dispose",u);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function d(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:d}}function Hx(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&as("WebGLRenderer: "+i+" extension not supported."),s}}}function Gx(n,e,t,i){let s={},r=new WeakMap;function a(d){let h=d.target;h.index!==null&&e.remove(h.index);for(let m in h.attributes)e.remove(h.attributes[m]);h.removeEventListener("dispose",a),delete s[h.id];let f=r.get(h);f&&(e.remove(f),r.delete(h)),i.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function o(d,h){return s[h.id]===!0||(h.addEventListener("dispose",a),s[h.id]=!0,t.memory.geometries++),h}function l(d){let h=d.attributes;for(let f in h)e.update(h[f],n.ARRAY_BUFFER)}function c(d){let h=[],f=d.index,m=d.attributes.position,v=0;if(m===void 0)return;if(f!==null){let A=f.array;v=f.version;for(let C=0,y=A.length;C<y;C+=3){let E=A[C+0],b=A[C+1],w=A[C+2];h.push(E,b,b,w,w,E)}}else{let A=m.array;v=m.version;for(let C=0,y=A.length/3-1;C<y;C+=3){let E=C+0,b=C+1,w=C+2;h.push(E,b,b,w,w,E)}}let p=new(m.count>=65535?ha:ua)(h,1);p.version=v;let g=r.get(d);g&&e.remove(g),r.set(d,p)}function u(d){let h=r.get(d);if(h){let f=d.index;f!==null&&h.version<f.version&&c(d)}else c(d);return r.get(d)}return{get:o,update:l,getWireframeAttribute:u}}function Wx(n,e,t){let i;function s(d){i=d}let r,a;function o(d){r=d.type,a=d.bytesPerElement}function l(d,h){n.drawElements(i,h,r,d*a),t.update(h,i,1)}function c(d,h,f){f!==0&&(n.drawElementsInstanced(i,h,r,d*a,f),t.update(h,i,f))}function u(d,h,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,h,0,r,d,0,f);let v=0;for(let p=0;p<f;p++)v+=h[p];t.update(v,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function Xx(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:Je("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function jx(n,e,t){let i=new WeakMap,s=new xt;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,d=u!==void 0?u.length:0,h=i.get(o);if(h===void 0||h.count!==d){let T=function(){w.dispose(),i.delete(o),o.removeEventListener("dispose",T)};h!==void 0&&h.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,v=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],A=o.morphAttributes.color||[],C=0;f===!0&&(C=1),m===!0&&(C=2),v===!0&&(C=3);let y=o.attributes.position.count*C,E=1;y>e.maxTextureSize&&(E=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let b=new Float32Array(y*E*4*d),w=new la(b,y,E,d);w.type=kn,w.needsUpdate=!0;let x=C*4;for(let R=0;R<d;R++){let I=p[R],L=g[R],U=A[R],N=y*E*4*R;for(let G=0;G<I.count;G++){let q=G*x;f===!0&&(s.fromBufferAttribute(I,G),b[N+q+0]=s.x,b[N+q+1]=s.y,b[N+q+2]=s.z,b[N+q+3]=0),m===!0&&(s.fromBufferAttribute(L,G),b[N+q+4]=s.x,b[N+q+5]=s.y,b[N+q+6]=s.z,b[N+q+7]=0),v===!0&&(s.fromBufferAttribute(U,G),b[N+q+8]=s.x,b[N+q+9]=s.y,b[N+q+10]=s.z,b[N+q+11]=U.itemSize===4?s.w:1)}}h={count:d,texture:w,size:new We(y,E)},i.set(o,h),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let v=0;v<c.length;v++)f+=c[v];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",h.size)}return{update:r}}function qx(n,e,t,i,s){let r=new WeakMap;function a(c){let u=s.render.frame,d=c.geometry,h=e.get(c,d);if(r.get(h)!==u&&(e.update(h),r.set(h,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return h}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var Yx={[Gu]:"LINEAR_TONE_MAPPING",[Wu]:"REINHARD_TONE_MAPPING",[Xu]:"CINEON_TONE_MAPPING",[ju]:"ACES_FILMIC_TONE_MAPPING",[Yu]:"AGX_TONE_MAPPING",[Ju]:"NEUTRAL_TONE_MAPPING",[qu]:"CUSTOM_TONE_MAPPING"};function Jx(n,e,t,i,s,r){let a=new vn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Gt;c.setAttribute("position",new jt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new jt([0,2,0,0,2,0],2));let u=new il({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),d=new Wt(c,u),h=new ir(-1,1,1,-1,0,1),f=null,m=null,v=!1,p,g=null,A=[],C=!1;this.setSize=function(y,E){a.setSize(y,E),o!==null&&o.setSize(y,E),l!==null&&l.setSize(y,E);for(let b=0;b<A.length;b++){let w=A[b];w.setSize&&w.setSize(y,E)}},this.setEffects=function(y){A=y,C=A.length>0&&A[0].isRenderPass===!0;let E=a.width,b=a.height;A.length>0&&o===null&&(o=new vn(E,b,{type:zn,depthBuffer:!1,stencilBuffer:!1}),l=new vn(E,b,{type:zn,depthBuffer:!1,stencilBuffer:!1}));for(let w=0;w<A.length;w++){let x=A[w];x.setSize&&x.setSize(E,b)}},this.begin=function(y,E){if(v||y.toneMapping===Fn&&A.length===0)return!1;if(g=E,E!==null){let b=E.width,w=E.height;(a.width!==b||a.height!==w)&&this.setSize(b,w)}return C===!1&&y.setRenderTarget(a),p=y.toneMapping,y.toneMapping=Fn,!0},this.hasRenderPass=function(){return C},this.end=function(y,E){y.toneMapping=p,v=!0;let b=a,w=o;for(let x=0;x<A.length;x++){let T=A[x];T.enabled!==!1&&(T.render(y,w,b,E),T.needsSwap!==!1&&(b=w,w=w===o?l:o))}if(f!==y.outputColorSpace||m!==y.toneMapping){f=y.outputColorSpace,m=y.toneMapping,u.defines={},ct.getTransfer(f)===vt&&(u.defines.SRGB_TRANSFER="");let x=Yx[m];x&&(u.defines[x]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=b.texture,y.setRenderTarget(g),y.render(d,h),g=null,v=!1},this.isCompositing=function(){return v},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var mp=new Ot,xh=new Bi(1,1),gp=new la,_p=new tl,xp=new ma,$f=[],Zf=[],Kf=new Float32Array(16),Qf=new Float32Array(9),ep=new Float32Array(4);function dr(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=$f[s];if(r===void 0&&(r=new Float32Array(s),$f[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Yt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function Jt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function pc(n,e){let t=Zf[e];t===void 0&&(t=new Int32Array(e),Zf[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function $x(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Zx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2fv(this.addr,e),Jt(t,e)}}function Kx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Yt(t,e))return;n.uniform3fv(this.addr,e),Jt(t,e)}}function Qx(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4fv(this.addr,e),Jt(t,e)}}function ey(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),Jt(t,e)}else{if(Yt(t,i))return;ep.set(i),n.uniformMatrix2fv(this.addr,!1,ep),Jt(t,i)}}function ty(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),Jt(t,e)}else{if(Yt(t,i))return;Qf.set(i),n.uniformMatrix3fv(this.addr,!1,Qf),Jt(t,i)}}function ny(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Yt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),Jt(t,e)}else{if(Yt(t,i))return;Kf.set(i),n.uniformMatrix4fv(this.addr,!1,Kf),Jt(t,i)}}function iy(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function sy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2iv(this.addr,e),Jt(t,e)}}function ry(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3iv(this.addr,e),Jt(t,e)}}function ay(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4iv(this.addr,e),Jt(t,e)}}function oy(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function ly(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Yt(t,e))return;n.uniform2uiv(this.addr,e),Jt(t,e)}}function cy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Yt(t,e))return;n.uniform3uiv(this.addr,e),Jt(t,e)}}function uy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Yt(t,e))return;n.uniform4uiv(this.addr,e),Jt(t,e)}}function hy(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(xh.compareFunction=t.isReversedDepthBuffer()?oc:ac,r=xh):r=mp,t.setTexture2D(e||r,s)}function dy(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||_p,s)}function fy(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||xp,s)}function py(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||gp,s)}function my(n){switch(n){case 5126:return $x;case 35664:return Zx;case 35665:return Kx;case 35666:return Qx;case 35674:return ey;case 35675:return ty;case 35676:return ny;case 5124:case 35670:return iy;case 35667:case 35671:return sy;case 35668:case 35672:return ry;case 35669:case 35673:return ay;case 5125:return oy;case 36294:return ly;case 36295:return cy;case 36296:return uy;case 35678:case 36198:case 36298:case 36306:case 35682:return hy;case 35679:case 36299:case 36307:return dy;case 35680:case 36300:case 36308:case 36293:return fy;case 36289:case 36303:case 36311:case 36292:return py}}function gy(n,e){n.uniform1fv(this.addr,e)}function _y(n,e){let t=dr(e,this.size,2);n.uniform2fv(this.addr,t)}function xy(n,e){let t=dr(e,this.size,3);n.uniform3fv(this.addr,t)}function yy(n,e){let t=dr(e,this.size,4);n.uniform4fv(this.addr,t)}function vy(n,e){let t=dr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function by(n,e){let t=dr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Sy(n,e){let t=dr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function My(n,e){n.uniform1iv(this.addr,e)}function wy(n,e){n.uniform2iv(this.addr,e)}function Ey(n,e){n.uniform3iv(this.addr,e)}function Ty(n,e){n.uniform4iv(this.addr,e)}function Ay(n,e){n.uniform1uiv(this.addr,e)}function Cy(n,e){n.uniform2uiv(this.addr,e)}function Ry(n,e){n.uniform3uiv(this.addr,e)}function Py(n,e){n.uniform4uiv(this.addr,e)}function Iy(n,e,t){let i=this.cache,s=e.length,r=pc(t,s);Yt(i,r)||(n.uniform1iv(this.addr,r),Jt(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=xh:a=mp;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Ly(n,e,t){let i=this.cache,s=e.length,r=pc(t,s);Yt(i,r)||(n.uniform1iv(this.addr,r),Jt(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||_p,r[a])}function Dy(n,e,t){let i=this.cache,s=e.length,r=pc(t,s);Yt(i,r)||(n.uniform1iv(this.addr,r),Jt(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||xp,r[a])}function Ny(n,e,t){let i=this.cache,s=e.length,r=pc(t,s);Yt(i,r)||(n.uniform1iv(this.addr,r),Jt(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||gp,r[a])}function Uy(n){switch(n){case 5126:return gy;case 35664:return _y;case 35665:return xy;case 35666:return yy;case 35674:return vy;case 35675:return by;case 35676:return Sy;case 5124:case 35670:return My;case 35667:case 35671:return wy;case 35668:case 35672:return Ey;case 35669:case 35673:return Ty;case 5125:return Ay;case 36294:return Cy;case 36295:return Ry;case 36296:return Py;case 35678:case 36198:case 36298:case 36306:case 35682:return Iy;case 35679:case 36299:case 36307:return Ly;case 35680:case 36300:case 36308:case 36293:return Dy;case 36289:case 36303:case 36311:case 36292:return Ny}}var yh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=my(t.type)}},vh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Uy(t.type)}},bh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},gh=/(\w+)(\])?(\[|\.)?/g;function tp(n,e){n.seq.push(e),n.map[e.id]=e}function Fy(n,e,t){let i=n.name,s=i.length;for(gh.lastIndex=0;;){let r=gh.exec(i),a=gh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){tp(t,c===void 0?new yh(o,n,e):new vh(o,n,e));break}else{let d=t.map[o];d===void 0&&(d=new bh(o),tp(t,d)),t=d}}}var hr=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Fy(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function np(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Oy=37297,By=0;function ky(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var ip=new Ze;function zy(n){ct._getMatrix(ip,ct.workingColorSpace,n);let e=`mat3( ${ip.elements.map(t=>t.toFixed(4))} )`;switch(ct.getTransfer(n)){case ra:return[e,"LinearTransferOETF"];case vt:return[e,"sRGBTransferOETF"];default:return Ye("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function sp(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+ky(n.getShaderSource(e),o)}else return r}function Vy(n,e){let t=zy(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Hy={[Gu]:"Linear",[Wu]:"Reinhard",[Xu]:"Cineon",[ju]:"ACESFilmic",[Yu]:"AgX",[Ju]:"Neutral",[qu]:"Custom"};function Gy(n,e){let t=Hy[e];return t===void 0?(Ye("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var cc=new X;function Wy(){ct.getLuminanceCoefficients(cc);let n=cc.x.toFixed(4),e=cc.y.toFixed(4),t=cc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Xy(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ka).join(`
`)}function jy(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function qy(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function ka(n){return n!==""}function rp(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function ap(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Yy=/^[ \t]*#include +<([\w\d./]+)>/gm;function Sh(n){return n.replace(Yy,$y)}var Jy=new Map;function $y(n,e){let t=rt[e];if(t===void 0){let i=Jy.get(e);if(i!==void 0)t=rt[i],Ye('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return Sh(t)}var Zy=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function op(n){return n.replace(Zy,Ky)}function Ky(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function lp(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var Qy={[Aa]:"SHADOWMAP_TYPE_PCF",[rr]:"SHADOWMAP_TYPE_VSM"};function ev(n){return Qy[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var tv={[Gi]:"ENVMAP_TYPE_CUBE",[us]:"ENVMAP_TYPE_CUBE",[Ca]:"ENVMAP_TYPE_CUBE_UV"};function nv(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":tv[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var iv={[us]:"ENVMAP_MODE_REFRACTION"};function sv(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":iv[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var rv={[yl]:"ENVMAP_BLENDING_MULTIPLY",[Tf]:"ENVMAP_BLENDING_MIX",[Af]:"ENVMAP_BLENDING_ADD"};function av(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":rv[n.combine]||"ENVMAP_BLENDING_NONE"}function ov(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function lv(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=ev(t),c=nv(t),u=sv(t),d=av(t),h=ov(t),f=Xy(t),m=jy(r),v=s.createProgram(),p,g,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ka).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ka).join(`
`),g.length>0&&(g+=`
`)):(p=[lp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ka).join(`
`),g=[lp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Fn?"#define TONE_MAPPING":"",t.toneMapping!==Fn?rt.tonemapping_pars_fragment:"",t.toneMapping!==Fn?Gy("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",rt.colorspace_pars_fragment,Vy("linearToOutputTexel",t.outputColorSpace),Wy(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ka).join(`
`)),a=Sh(a),a=rp(a,t),a=ap(a,t),o=Sh(o),o=rp(o,t),o=ap(o,t),a=op(a),o=op(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",t.glslVersion===rh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===rh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let C=A+p+a,y=A+g+o,E=np(s,s.VERTEX_SHADER,C),b=np(s,s.FRAGMENT_SHADER,y);s.attachShader(v,E),s.attachShader(v,b),t.index0AttributeName!==void 0?s.bindAttribLocation(v,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(v,0,"position"),s.linkProgram(v);function w(I){if(n.debug.checkShaderErrors){let L=s.getProgramInfoLog(v)||"",U=s.getShaderInfoLog(E)||"",N=s.getShaderInfoLog(b)||"",G=L.trim(),q=U.trim(),Z=N.trim(),ae=!0,z=!0;if(s.getProgramParameter(v,s.LINK_STATUS)===!1)if(ae=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,v,E,b);else{let V=sp(s,E,"vertex"),j=sp(s,b,"fragment");Je("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(v,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+G+`
`+V+`
`+j)}else G!==""?Ye("WebGLProgram: Program Info Log:",G):(q===""||Z==="")&&(z=!1);z&&(I.diagnostics={runnable:ae,programLog:G,vertexShader:{log:q,prefix:p},fragmentShader:{log:Z,prefix:g}})}s.deleteShader(E),s.deleteShader(b),x=new hr(s,v),T=qy(s,v)}let x;this.getUniforms=function(){return x===void 0&&w(this),x};let T;this.getAttributes=function(){return T===void 0&&w(this),T};let R=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return R===!1&&(R=s.getProgramParameter(v,Oy)),R},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=By++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=E,this.fragmentShader=b,this}var cv=0,Mh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new wh(e),t.set(e,i)),i}},wh=class{constructor(e){this.id=cv++,this.code=e,this.usedTimes=0}};function uv(n){return n===Xi||n===Na||n===Ua}function hv(n,e,t,i,s,r){let a=new ca,o=new Mh,l=new Set,c=[],u=new Map,d=i.logarithmicDepthBuffer,h=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(x){return l.add(x),x===0?"uv":`uv${x}`}function v(x,T,R,I,L,U){let N=I.fog,G=L.geometry,q=x.isMeshStandardMaterial||x.isMeshLambertMaterial||x.isMeshPhongMaterial?I.environment:null,Z=x.isMeshStandardMaterial||x.isMeshLambertMaterial&&!x.envMap||x.isMeshPhongMaterial&&!x.envMap,ae=e.get(x.envMap||q,Z),z=ae&&ae.mapping===Ca?ae.image.height:null,V=f[x.type];x.precision!==null&&(h=i.getMaxPrecision(x.precision),h!==x.precision&&Ye("WebGLProgram.getParameters:",x.precision,"not supported, using",h,"instead."));let j=G.morphAttributes.position||G.morphAttributes.normal||G.morphAttributes.color,Y=j!==void 0?j.length:0,re=0;G.morphAttributes.position!==void 0&&(re=1),G.morphAttributes.normal!==void 0&&(re=2),G.morphAttributes.color!==void 0&&(re=3);let xe,me,_e,ee;if(V){let Mt=mn[V];xe=Mt.vertexShader,me=Mt.fragmentShader}else{xe=x.vertexShader,me=x.fragmentShader;let Mt=o.getVertexShaderStage(x),ut=o.getFragmentShaderStage(x);o.update(x,Mt,ut),_e=Mt.id,ee=ut.id}let le=n.getRenderTarget(),ge=n.state.buffers.depth.getReversed(),Pe=L.isInstancedMesh===!0,ye=L.isBatchedMesh===!0,je=!!x.map,it=!!x.matcap,Ke=!!ae,tt=!!x.aoMap,ft=!!x.lightMap,Oe=!!x.bumpMap&&x.wireframe===!1,ot=!!x.normalMap,de=!!x.displacementMap,Qe=!!x.emissiveMap,pt=!!x.metalnessMap,dt=!!x.roughnessMap,k=x.anisotropy>0,mt=x.clearcoat>0,at=x.dispersion>0,S=x.retroreflectivity>0,_=x.iridescence>0,D=x.sheen>0,F=x.transmission>0,J=k&&!!x.anisotropyMap,he=mt&&!!x.clearcoatMap,pe=mt&&!!x.clearcoatNormalMap,se=mt&&!!x.clearcoatRoughnessMap,ue=_&&!!x.iridescenceMap,Me=_&&!!x.iridescenceThicknessMap,ke=D&&!!x.sheenColorMap,Ee=D&&!!x.sheenRoughnessMap,ve=!!x.specularMap,Be=!!x.specularColorMap,Xe=!!x.specularIntensityMap,et=F&&!!x.transmissionMap,H=F&&!!x.thicknessMap,we=!!x.gradientMap,oe=!!x.alphaMap,be=x.alphaTest>0,Te=!!x.alphaHash,fe=!!x.extensions,ze=Fn;x.toneMapped&&(le===null||le.isXRRenderTarget===!0)&&(ze=n.toneMapping);let Re={shaderID:V,shaderType:x.type,shaderName:x.name,vertexShader:xe,fragmentShader:me,defines:x.defines,customVertexShaderID:_e,customFragmentShaderID:ee,isRawShaderMaterial:x.isRawShaderMaterial===!0,glslVersion:x.glslVersion,precision:h,batching:ye,batchingColor:ye&&L._colorsTexture!==null,instancing:Pe,instancingColor:Pe&&L.instanceColor!==null,instancingMorph:Pe&&L.morphTexture!==null,outputColorSpace:le===null?n.outputColorSpace:le.isXRRenderTarget===!0?le.texture.colorSpace:ct.workingColorSpace,alphaToCoverage:!!x.alphaToCoverage,map:je,matcap:it,envMap:Ke,envMapMode:Ke&&ae.mapping,envMapCubeUVHeight:z,aoMap:tt,lightMap:ft,bumpMap:Oe,normalMap:ot,displacementMap:de,emissiveMap:Qe,normalMapObjectSpace:ot&&x.normalMapType===Pf,normalMapTangentSpace:ot&&x.normalMapType===rc,packedNormalMap:ot&&x.normalMapType===rc&&uv(x.normalMap.format),metalnessMap:pt,roughnessMap:dt,anisotropy:k,anisotropyMap:J,clearcoat:mt,clearcoatMap:he,clearcoatNormalMap:pe,clearcoatRoughnessMap:se,dispersion:at,retroreflection:S,iridescence:_,iridescenceMap:ue,iridescenceThicknessMap:Me,sheen:D,sheenColorMap:ke,sheenRoughnessMap:Ee,specularMap:ve,specularColorMap:Be,specularIntensityMap:Xe,transmission:F,transmissionMap:et,thicknessMap:H,gradientMap:we,opaque:x.transparent===!1&&x.blending===ar&&x.alphaToCoverage===!1,alphaMap:oe,alphaTest:be,alphaHash:Te,combine:x.combine,mapUv:je&&m(x.map.channel),aoMapUv:tt&&m(x.aoMap.channel),lightMapUv:ft&&m(x.lightMap.channel),bumpMapUv:Oe&&m(x.bumpMap.channel),normalMapUv:ot&&m(x.normalMap.channel),displacementMapUv:de&&m(x.displacementMap.channel),emissiveMapUv:Qe&&m(x.emissiveMap.channel),metalnessMapUv:pt&&m(x.metalnessMap.channel),roughnessMapUv:dt&&m(x.roughnessMap.channel),anisotropyMapUv:J&&m(x.anisotropyMap.channel),clearcoatMapUv:he&&m(x.clearcoatMap.channel),clearcoatNormalMapUv:pe&&m(x.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:se&&m(x.clearcoatRoughnessMap.channel),iridescenceMapUv:ue&&m(x.iridescenceMap.channel),iridescenceThicknessMapUv:Me&&m(x.iridescenceThicknessMap.channel),sheenColorMapUv:ke&&m(x.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&m(x.sheenRoughnessMap.channel),specularMapUv:ve&&m(x.specularMap.channel),specularColorMapUv:Be&&m(x.specularColorMap.channel),specularIntensityMapUv:Xe&&m(x.specularIntensityMap.channel),transmissionMapUv:et&&m(x.transmissionMap.channel),thicknessMapUv:H&&m(x.thicknessMap.channel),alphaMapUv:oe&&m(x.alphaMap.channel),vertexTangents:!!G.attributes.tangent&&(ot||k),vertexNormals:!!G.attributes.normal,vertexColors:x.vertexColors,vertexAlphas:x.vertexColors===!0&&!!G.attributes.color&&G.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!G.attributes.uv&&(je||oe),fog:!!N,useFog:x.fog===!0,fogExp2:!!N&&N.isFogExp2,flatShading:x.wireframe===!1&&(x.flatShading===!0||G.attributes.normal===void 0&&ot===!1&&(x.isMeshLambertMaterial||x.isMeshPhongMaterial||x.isMeshStandardMaterial||x.isMeshPhysicalMaterial)),sizeAttenuation:x.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:ge,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:G.attributes.position!==void 0,morphTargets:G.morphAttributes.position!==void 0,morphNormals:G.morphAttributes.normal!==void 0,morphColors:G.morphAttributes.color!==void 0,morphTargetsCount:Y,morphTextureStride:re,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:U.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:x.dithering,shadowMapEnabled:n.shadowMap.enabled&&R.length>0,shadowMapType:n.shadowMap.type,toneMapping:ze,decodeVideoTexture:je&&x.map.isVideoTexture===!0&&ct.getTransfer(x.map.colorSpace)===vt,decodeVideoTextureEmissive:Qe&&x.emissiveMap.isVideoTexture===!0&&ct.getTransfer(x.emissiveMap.colorSpace)===vt,premultipliedAlpha:x.premultipliedAlpha,doubleSided:x.side===Jn,flipSided:x.side===Kt,useDepthPacking:x.depthPacking>=0,depthPacking:x.depthPacking||0,index0AttributeName:x.index0AttributeName,extensionClipCullDistance:fe&&x.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(fe&&x.extensions.multiDraw===!0||ye)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:x.customProgramCacheKey()};return Re.vertexUv1s=l.has(1),Re.vertexUv2s=l.has(2),Re.vertexUv3s=l.has(3),l.clear(),Re}function p(x){let T=[];if(x.shaderID?T.push(x.shaderID):(T.push(x.customVertexShaderID),T.push(x.customFragmentShaderID)),x.defines!==void 0)for(let R in x.defines)T.push(R),T.push(x.defines[R]);return x.isRawShaderMaterial===!1&&(g(T,x),A(T,x),T.push(n.outputColorSpace)),T.push(x.customProgramCacheKey),T.join()}function g(x,T){x.push(T.precision),x.push(T.outputColorSpace),x.push(T.envMapMode),x.push(T.envMapCubeUVHeight),x.push(T.mapUv),x.push(T.alphaMapUv),x.push(T.lightMapUv),x.push(T.aoMapUv),x.push(T.bumpMapUv),x.push(T.normalMapUv),x.push(T.displacementMapUv),x.push(T.emissiveMapUv),x.push(T.metalnessMapUv),x.push(T.roughnessMapUv),x.push(T.anisotropyMapUv),x.push(T.clearcoatMapUv),x.push(T.clearcoatNormalMapUv),x.push(T.clearcoatRoughnessMapUv),x.push(T.iridescenceMapUv),x.push(T.iridescenceThicknessMapUv),x.push(T.sheenColorMapUv),x.push(T.sheenRoughnessMapUv),x.push(T.specularMapUv),x.push(T.specularColorMapUv),x.push(T.specularIntensityMapUv),x.push(T.transmissionMapUv),x.push(T.thicknessMapUv),x.push(T.combine),x.push(T.fogExp2),x.push(T.sizeAttenuation),x.push(T.morphTargetsCount),x.push(T.morphAttributeCount),x.push(T.numSunLights),x.push(T.numDirLights),x.push(T.numPointLights),x.push(T.numSpotLights),x.push(T.numSpotLightMaps),x.push(T.numHemiLights),x.push(T.numRectAreaLights),x.push(T.numSunLightShadows),x.push(T.numDirLightShadows),x.push(T.numPointLightShadows),x.push(T.numSpotLightShadows),x.push(T.numSpotLightShadowsWithMaps),x.push(T.numLightProbes),x.push(T.shadowMapType),x.push(T.toneMapping),x.push(T.numClippingPlanes),x.push(T.numClipIntersection),x.push(T.depthPacking)}function A(x,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),x.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),x.push(a.mask)}function C(x){let T=f[x.type],R;if(T){let I=mn[T];R=Fa.clone(I.uniforms)}else R=x.uniforms;return R}function y(x,T){let R=u.get(T);return R!==void 0?++R.usedTimes:(R=new lv(n,T,x,s),c.push(R),u.set(T,R)),R}function E(x){if(--x.usedTimes===0){let T=c.indexOf(x);c[T]=c[c.length-1],c.pop(),u.delete(x.cacheKey),x.destroy()}}function b(x){o.remove(x)}function w(){o.dispose()}return{getParameters:v,getProgramCacheKey:p,getUniforms:C,acquireProgram:y,releaseProgram:E,releaseShaderCache:b,programs:c,dispose:w}}function dv(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function fv(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function cp(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function up(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(h){let f=0;return h.isInstancedMesh&&(f+=2),h.isSkinnedMesh&&(f+=1),f}function o(h,f,m,v,p,g){let A=n[e];return A===void 0?(A={id:h.id,object:h,geometry:f,material:m,materialVariant:a(h),groupOrder:v,renderOrder:h.renderOrder,z:p,group:g},n[e]=A):(A.id=h.id,A.object=h,A.geometry=f,A.material=m,A.materialVariant=a(h),A.groupOrder=v,A.renderOrder=h.renderOrder,A.z=p,A.group=g),e++,A}function l(h,f,m,v,p,g,A){A.reversedDepth===!0&&(p=-p);let C=o(h,f,m,v,p,g);m.transmission>0?i.push(C):m.transparent===!0?s.push(C):t.push(C)}function c(h,f,m,v,p,g){let A=o(h,f,m,v,p,g);m.transmission>0?i.unshift(A):m.transparent===!0?s.unshift(A):t.unshift(A)}function u(h,f){t.length>1&&t.sort(h||fv),i.length>1&&i.sort(f||cp),s.length>1&&s.sort(f||cp)}function d(){for(let h=e,f=n.length;h<f;h++){let m=n[h];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:d,sort:u}}function pv(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new up,n.set(i,[a])):s>=r.length?(a=new up,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function mv(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new X,color:new $e};break;case"SpotLight":t={position:new X,direction:new X,color:new $e,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new X,color:new $e,distance:0,decay:0};break;case"HemisphereLight":t={direction:new X,skyColor:new $e,groundColor:new $e};break;case"RectAreaLight":t={color:new $e,position:new X,halfWidth:new X,halfHeight:new X};break}return n[e.id]=t,t}}}function gv(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new We,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var _v=0;function xv(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function yv(n){let e=new mv,t=gv(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new X);let s=new X,r=new _t,a=new _t;function o(c){let u=0,d=0,h=0;for(let L=0;L<9;L++)i.probe[L].set(0,0,0);let f=0,m=0,v=0,p=0,g=0,A=0,C=0,y=0,E=0,b=0,w=0,x=0,T=0,R=0;c.sort(xv);for(let L=0,U=c.length;L<U;L++){let N=c[L],G=N.color,q=N.intensity,Z=N.distance,ae=null;if(N.shadow&&N.shadow.map&&(N.shadow.map.texture.format===Xi?ae=N.shadow.map.texture:ae=N.shadow.map.depthTexture||N.shadow.map.texture),N.isAmbientLight)u+=G.r*q,d+=G.g*q,h+=G.b*q;else if(N.isLightProbe){for(let z=0;z<9;z++)i.probe[z].addScaledVector(N.sh.coefficients[z],q);R++}else if(N.isSunLight){let z=e.get(N);if(z.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let V=N.shadow,j=t.get(N);j.shadowIntensity=V.intensity,j.shadowBias=V.bias,j.shadowNormalBias=V.normalBias,j.shadowRadius=V.radius,j.shadowMapSize.copy(V.mapSize).multiply(V.getFrameExtents()),i.sunShadow[m]=j,i.sunShadowMap[m]=ae;let Y=V.getViewportCount();for(let re=0;re<Y;re++)i.sunShadowMatrix[v+re]=V.getMatrix(re),i.sunShadowCascade[v+re]=V._cascadeData[re];v+=Y,m++}i.sun[f]=z,f++}else if(N.isDirectionalLight){let z=e.get(N);if(z.color.copy(N.color).multiplyScalar(N.intensity),N.castShadow){let V=N.shadow,j=t.get(N);j.shadowIntensity=V.intensity,j.shadowBias=V.bias,j.shadowNormalBias=V.normalBias,j.shadowRadius=V.radius,j.shadowMapSize=V.mapSize,i.directionalShadow[p]=j,i.directionalShadowMap[p]=ae,i.directionalShadowMatrix[p]=N.shadow.matrix,E++}i.directional[p]=z,p++}else if(N.isSpotLight){let z=e.get(N);z.position.setFromMatrixPosition(N.matrixWorld),z.color.copy(G).multiplyScalar(q),z.distance=Z,z.coneCos=Math.cos(N.angle),z.penumbraCos=Math.cos(N.angle*(1-N.penumbra)),z.decay=N.decay,i.spot[A]=z;let V=N.shadow;if(N.map&&(i.spotLightMap[x]=N.map,x++,V.updateMatrices(N),N.castShadow&&T++),i.spotLightMatrix[A]=V.matrix,N.castShadow){let j=t.get(N);j.shadowIntensity=V.intensity,j.shadowBias=V.bias,j.shadowNormalBias=V.normalBias,j.shadowRadius=V.radius,j.shadowMapSize=V.mapSize,i.spotShadow[A]=j,i.spotShadowMap[A]=ae,w++}A++}else if(N.isRectAreaLight){let z=e.get(N);z.color.copy(G).multiplyScalar(q),z.halfWidth.set(N.width*.5,0,0),z.halfHeight.set(0,N.height*.5,0),i.rectArea[C]=z,C++}else if(N.isPointLight){let z=e.get(N);if(z.color.copy(N.color).multiplyScalar(N.intensity),z.distance=N.distance,z.decay=N.decay,N.castShadow){let V=N.shadow,j=t.get(N);j.shadowIntensity=V.intensity,j.shadowBias=V.bias,j.shadowNormalBias=V.normalBias,j.shadowRadius=V.radius,j.shadowMapSize=V.mapSize,j.shadowCameraNear=V.camera.near,j.shadowCameraFar=V.camera.far,i.pointShadow[g]=j,i.pointShadowMap[g]=ae,i.pointShadowMatrix[g]=N.shadow.matrix,b++}i.point[g]=z,g++}else if(N.isHemisphereLight){let z=e.get(N);z.skyColor.copy(N.color).multiplyScalar(q),z.groundColor.copy(N.groundColor).multiplyScalar(q),i.hemi[y]=z,y++}}C>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Se.LTC_FLOAT_1,i.rectAreaLTC2=Se.LTC_FLOAT_2):(i.rectAreaLTC1=Se.LTC_HALF_1,i.rectAreaLTC2=Se.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=d,i.ambient[2]=h;let I=i.hash;(I.sunLength!==f||I.directionalLength!==p||I.pointLength!==g||I.spotLength!==A||I.rectAreaLength!==C||I.hemiLength!==y||I.numSunShadows!==m||I.numDirectionalShadows!==E||I.numPointShadows!==b||I.numSpotShadows!==w||I.numSpotMaps!==x||I.numLightProbes!==R)&&(i.sun.length=f,i.directional.length=p,i.spot.length=A,i.rectArea.length=C,i.point.length=g,i.hemi.length=y,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=v,i.sunShadowCascade.length=v,i.directionalShadow.length=E,i.directionalShadowMap.length=E,i.directionalShadowMatrix.length=E,i.pointShadow.length=b,i.pointShadowMap.length=b,i.pointShadowMatrix.length=b,i.spotShadow.length=w,i.spotShadowMap.length=w,i.spotLightMatrix.length=w+x-T,i.spotLightMap.length=x,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=R,I.sunLength=f,I.directionalLength=p,I.pointLength=g,I.spotLength=A,I.rectAreaLength=C,I.hemiLength=y,I.numSunShadows=m,I.numDirectionalShadows=E,I.numPointShadows=b,I.numSpotShadows=w,I.numSpotMaps=x,I.numLightProbes=R,i.version=_v++)}function l(c,u){let d=0,h=0,f=0,m=0,v=0,p=0,g=u.matrixWorldInverse;for(let A=0,C=c.length;A<C;A++){let y=c[A];if(y.isSunLight){let E=i.sun[d];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(g),d++}else if(y.isDirectionalLight){let E=i.directional[h];E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(g),h++}else if(y.isSpotLight){let E=i.spot[m];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(g),E.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),E.direction.sub(s),E.direction.transformDirection(g),m++}else if(y.isRectAreaLight){let E=i.rectArea[v];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(g),a.identity(),r.copy(y.matrixWorld),r.premultiply(g),a.extractRotation(r),E.halfWidth.set(y.width*.5,0,0),E.halfHeight.set(0,y.height*.5,0),E.halfWidth.applyMatrix4(a),E.halfHeight.applyMatrix4(a),v++}else if(y.isPointLight){let E=i.point[f];E.position.setFromMatrixPosition(y.matrixWorld),E.position.applyMatrix4(g),f++}else if(y.isHemisphereLight){let E=i.hemi[p];E.direction.setFromMatrixPosition(y.matrixWorld),E.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:i}}function hp(n){let e=new yv(n),t=[],i=[],s=[];function r(h){d.camera=h,t.length=0,i.length=0,s.length=0}function a(h){t.push(h)}function o(h){i.push(h)}function l(h){s.push(h)}function c(){e.setup(t)}function u(h){e.setupView(t,h)}let d={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:d,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function vv(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new hp(n),e.set(s,[o])):r>=a.length?(o=new hp(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var bv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sv=`uniform sampler2D shadow_pass;
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
}`,Mv=[new X(1,0,0),new X(-1,0,0),new X(0,1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1)],wv=[new X(0,-1,0),new X(0,-1,0),new X(0,0,1),new X(0,0,-1),new X(0,-1,0),new X(0,-1,0)],dp=new _t,Ba=new X,_h=new X;function Ev(n,e,t){let i=new er,s=new We,r=new We,a=new xt,o=new sl,l=new rl,c={},u=t.maxTextureSize,d={[Hi]:Kt,[Kt]:Hi,[Jn]:Jn},h=new Lt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new We},radius:{value:4}},vertexShader:bv,fragmentShader:Sv}),f=h.clone();f.defines.HORIZONTAL_PASS=1;let m=new Gt;m.setAttribute("position",new Ht(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new Wt(m,h),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Aa;let g=this.type;this.render=function(b,w,x){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||b.length===0)return;this.type===of&&(Ye("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Aa);let T=n.getRenderTarget(),R=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),L=n.state;L.setBlending($n),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let U=g!==this.type;U&&w.traverse(function(N){N.material&&(Array.isArray(N.material)?N.material.forEach(G=>G.needsUpdate=!0):N.material.needsUpdate=!0)});for(let N=0,G=b.length;N<G;N++){let q=b[N],Z=q.shadow;if(Z===void 0){Ye("WebGLShadowMap:",q,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;s.copy(Z.mapSize);let ae=Z.getFrameExtents();s.multiply(ae),r.copy(Z.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/ae.x),s.x=r.x*ae.x,Z.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/ae.y),s.y=r.y*ae.y,Z.mapSize.y=r.y));let z=n.state.buffers.depth.getReversed();if(Z.camera._reversedDepth=z,Z.map===null||U===!0){if(Z.map!==null&&(Z.map.depthTexture!==null&&(Z.map.depthTexture.dispose(),Z.map.depthTexture=null),Z.map.dispose()),this.type===rr){if(q.isPointLight){Ye("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}Z.map=new vn(s.x,s.y,{format:Xi,type:zn,minFilter:Rt,magFilter:Rt,generateMipmaps:!1}),Z.map.texture.name=q.name+".shadowMap",Z.map.depthTexture=new Bi(s.x,s.y,kn),Z.map.depthTexture.name=q.name+".shadowMapDepth",Z.map.depthTexture.format=Wn,Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Zt,Z.map.depthTexture.magFilter=Zt}else q.isPointLight?(Z.map=new hc(s.x),Z.map.depthTexture=new nl(s.x,Bn)):(Z.map=new vn(s.x,s.y),Z.map.depthTexture=new Bi(s.x,s.y,Bn)),Z.map.depthTexture.name=q.name+".shadowMap",Z.map.depthTexture.format=Wn,this.type===Aa?(Z.map.depthTexture.compareFunction=z?oc:ac,Z.map.depthTexture.minFilter=Rt,Z.map.depthTexture.magFilter=Rt):(Z.map.depthTexture.compareFunction=null,Z.map.depthTexture.minFilter=Zt,Z.map.depthTexture.magFilter=Zt);Z.camera.updateProjectionMatrix()}Z.map.isWebGLCubeRenderTarget!==!0&&(Z.map.width!==s.x||Z.map.height!==s.y)&&Z.map.setSize(s.x,s.y);let V=Z.map.isWebGLCubeRenderTarget?6:Z.getViewportCount();q.isPointLight!==!0&&Z.updateMatrices(q,x);for(let j=0;j<V;j++){let Y=Z.getCamera(j);if(q.isPointLight){let re=Z.camera,xe=Z.matrix,me=q.distance||re.far;me!==re.far&&(re.far=me,re.updateProjectionMatrix()),Ba.setFromMatrixPosition(q.matrixWorld),re.position.copy(Ba),_h.copy(re.position),_h.add(Mv[j]),re.up.copy(wv[j]),re.lookAt(_h),re.updateMatrixWorld(),xe.makeTranslation(-Ba.x,-Ba.y,-Ba.z),dp.multiplyMatrices(re.projectionMatrix,re.matrixWorldInverse),Z._frustum.setFromProjectionMatrix(dp,re.coordinateSystem,re.reversedDepth)}if(Z.map.isWebGLCubeRenderTarget)n.setRenderTarget(Z.map,j),n.clear();else{j===0&&(n.setRenderTarget(Z.map),n.clear());let re=Z.getViewport(j);a.set(r.x*re.x,r.y*re.y,r.x*re.z,r.y*re.w),L.viewport(a)}i=Z.getFrustum(j),y(w,x,Y,q,this.type)}Z.isPointLightShadow!==!0&&this.type===rr&&A(Z,x),Z.needsUpdate=!1}g=this.type,p.needsUpdate=!1,n.setRenderTarget(T,R,I)};function A(b,w){let x=e.update(v);h.defines.VSM_SAMPLES!==b.blurSamples&&(h.defines.VSM_SAMPLES=b.blurSamples,f.defines.VSM_SAMPLES=b.blurSamples,h.needsUpdate=!0,f.needsUpdate=!0),b.mapPass===null?b.mapPass=new vn(s.x,s.y,{format:Xi,type:zn}):(b.mapPass.width!==b.map.width||b.mapPass.height!==b.map.height)&&b.mapPass.setSize(b.map.width,b.map.height),h.uniforms.shadow_pass.value=b.map.depthTexture,h.uniforms.resolution.value.set(b.map.width,b.map.height),h.uniforms.radius.value=b.radius,n.setRenderTarget(b.mapPass),n.clear(),n.renderBufferDirect(w,null,x,h,v,null),f.uniforms.shadow_pass.value=b.mapPass.texture,f.uniforms.resolution.value.set(b.map.width,b.map.height),f.uniforms.radius.value=b.radius,n.setRenderTarget(b.map),n.clear(),n.renderBufferDirect(w,null,x,f,v,null)}function C(b,w,x,T){let R=null,I=x.isPointLight===!0?b.customDistanceMaterial:b.customDepthMaterial;if(I!==void 0)R=I;else if(R=x.isPointLight===!0?l:o,n.localClippingEnabled&&w.clipShadows===!0&&Array.isArray(w.clippingPlanes)&&w.clippingPlanes.length!==0||w.displacementMap&&w.displacementScale!==0||w.alphaMap&&w.alphaTest>0||w.map&&w.alphaTest>0||w.alphaToCoverage===!0){let L=R.uuid,U=w.uuid,N=c[L];N===void 0&&(N={},c[L]=N);let G=N[U];G===void 0&&(G=R.clone(),N[U]=G,w.addEventListener("dispose",E)),R=G}if(R.visible=w.visible,R.wireframe=w.wireframe,T===rr?R.side=w.shadowSide!==null?w.shadowSide:w.side:R.side=w.shadowSide!==null?w.shadowSide:d[w.side],R.alphaMap=w.alphaMap,R.alphaTest=w.alphaToCoverage===!0?.5:w.alphaTest,R.map=w.map,R.clipShadows=w.clipShadows,R.clippingPlanes=w.clippingPlanes,R.clipIntersection=w.clipIntersection,R.displacementMap=w.displacementMap,R.displacementScale=w.displacementScale,R.displacementBias=w.displacementBias,R.wireframeLinewidth=w.wireframeLinewidth,R.linewidth=w.linewidth,x.isPointLight===!0&&R.isMeshDistanceMaterial===!0){let L=n.properties.get(R);L.light=x}return R}function y(b,w,x,T,R){if(b.visible===!1)return;if(b.layers.test(w.layers)&&(b.isMesh||b.isLine||b.isPoints)&&(b.castShadow||b.receiveShadow&&R===rr)&&(!b.frustumCulled||b.intersectsFrustum(i))){b.modelViewMatrix.multiplyMatrices(x.matrixWorldInverse,b.matrixWorld);let U=e.update(b),N=b.material;if(Array.isArray(N)){let G=U.groups;for(let q=0,Z=G.length;q<Z;q++){let ae=G[q],z=N[ae.materialIndex];if(z&&z.visible){let V=C(b,z,T,R);b.onBeforeShadow(n,b,w,x,U,V,ae),n.renderBufferDirect(x,null,U,V,b,ae),b.onAfterShadow(n,b,w,x,U,V,ae)}}}else if(N.visible){let G=C(b,N,T,R);b.onBeforeShadow(n,b,w,x,U,G,null),n.renderBufferDirect(x,null,U,G,b,null),b.onAfterShadow(n,b,w,x,U,G,null)}}let L=b.children;for(let U=0,N=L.length;U<N;U++)y(L[U],w,x,T,R)}function E(b){b.target.removeEventListener("dispose",E);for(let x in c){let T=c[x],R=b.target.uuid;R in T&&(T[R].dispose(),delete T[R])}}}function Tv(n,e){function t(){let H=!1,we=new xt,oe=null,be=new xt(0,0,0,0);return{setMask:function(Te){oe!==Te&&!H&&(n.colorMask(Te,Te,Te,Te),oe=Te)},setLocked:function(Te){H=Te},setClear:function(Te,fe,ze,Re,Mt){Mt===!0&&(Te*=Re,fe*=Re,ze*=Re),we.set(Te,fe,ze,Re),be.equals(we)===!1&&(n.clearColor(Te,fe,ze,Re),be.copy(we))},reset:function(){H=!1,oe=null,be.set(-1,0,0,0)}}}function i(){let H=!1,we=!1,oe=null,be=null,Te=null;return{setReversed:function(fe){if(we!==fe){let ze=e.get("EXT_clip_control");fe?ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.ZERO_TO_ONE_EXT):ze.clipControlEXT(ze.LOWER_LEFT_EXT,ze.NEGATIVE_ONE_TO_ONE_EXT),we=fe;let Re=Te;Te=null,this.setClear(Re)}},getReversed:function(){return we},setTest:function(fe){fe?le(n.DEPTH_TEST):ge(n.DEPTH_TEST)},setMask:function(fe){oe!==fe&&!H&&(n.depthMask(fe),oe=fe)},setFunc:function(fe){if(we&&(fe=Vf[fe]),be!==fe){switch(fe){case Wo:n.depthFunc(n.NEVER);break;case Xo:n.depthFunc(n.ALWAYS);break;case jo:n.depthFunc(n.LESS);break;case Xs:n.depthFunc(n.LEQUAL);break;case qo:n.depthFunc(n.EQUAL);break;case Yo:n.depthFunc(n.GEQUAL);break;case Jo:n.depthFunc(n.GREATER);break;case $o:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}be=fe}},setLocked:function(fe){H=fe},setClear:function(fe){Te!==fe&&(Te=fe,we&&(fe=1-fe),n.clearDepth(fe))},reset:function(){H=!1,oe=null,be=null,Te=null,we=!1}}}function s(){let H=!1,we=null,oe=null,be=null,Te=null,fe=null,ze=null,Re=null,Mt=null;return{setTest:function(ut){H||(ut?le(n.STENCIL_TEST):ge(n.STENCIL_TEST))},setMask:function(ut){we!==ut&&!H&&(n.stencilMask(ut),we=ut)},setFunc:function(ut,gn,Nt){(oe!==ut||be!==gn||Te!==Nt)&&(n.stencilFunc(ut,gn,Nt),oe=ut,be=gn,Te=Nt)},setOp:function(ut,gn,Nt){(fe!==ut||ze!==gn||Re!==Nt)&&(n.stencilOp(ut,gn,Nt),fe=ut,ze=gn,Re=Nt)},setLocked:function(ut){H=ut},setClear:function(ut){Mt!==ut&&(n.clearStencil(ut),Mt=ut)},reset:function(){H=!1,we=null,oe=null,be=null,Te=null,fe=null,ze=null,Re=null,Mt=null}}}let r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap,u={},d={},h={},f=new WeakMap,m=[],v=null,p=!1,g=null,A=null,C=null,y=null,E=null,b=null,w=null,x=new $e(0,0,0),T=0,R=!1,I=null,L=null,U=null,N=null,G=null,q=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),Z=!1,ae=0,z=n.getParameter(n.VERSION);z.indexOf("WebGL")!==-1?(ae=parseFloat(/^WebGL (\d)/.exec(z)[1]),Z=ae>=1):z.indexOf("OpenGL ES")!==-1&&(ae=parseFloat(/^OpenGL ES (\d)/.exec(z)[1]),Z=ae>=2);let V=null,j={},Y=n.getParameter(n.SCISSOR_BOX),re=n.getParameter(n.VIEWPORT),xe=new xt().fromArray(Y),me=new xt().fromArray(re);function _e(H,we,oe,be){let Te=new Uint8Array(4),fe=n.createTexture();n.bindTexture(H,fe),n.texParameteri(H,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(H,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let ze=0;ze<oe;ze++)H===n.TEXTURE_3D||H===n.TEXTURE_2D_ARRAY?n.texImage3D(we,0,n.RGBA,1,1,be,0,n.RGBA,n.UNSIGNED_BYTE,Te):n.texImage2D(we+ze,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Te);return fe}let ee={};ee[n.TEXTURE_2D]=_e(n.TEXTURE_2D,n.TEXTURE_2D,1),ee[n.TEXTURE_CUBE_MAP]=_e(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),ee[n.TEXTURE_2D_ARRAY]=_e(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),ee[n.TEXTURE_3D]=_e(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),le(n.DEPTH_TEST),a.setFunc(Xs),Oe(!1),ot(Bu),le(n.CULL_FACE),tt($n);function le(H){u[H]!==!0&&(n.enable(H),u[H]=!0)}function ge(H){u[H]!==!1&&(n.disable(H),u[H]=!1)}function Pe(H,we){return h[H]!==we?(n.bindFramebuffer(H,we),h[H]=we,H===n.DRAW_FRAMEBUFFER&&(h[n.FRAMEBUFFER]=we),H===n.FRAMEBUFFER&&(h[n.DRAW_FRAMEBUFFER]=we),!0):!1}function ye(H,we){let oe=m,be=!1;if(H){oe=f.get(we),oe===void 0&&(oe=[],f.set(we,oe));let Te=H.textures;if(oe.length!==Te.length||oe[0]!==n.COLOR_ATTACHMENT0){for(let fe=0,ze=Te.length;fe<ze;fe++)oe[fe]=n.COLOR_ATTACHMENT0+fe;oe.length=Te.length,be=!0}}else oe[0]!==n.BACK&&(oe[0]=n.BACK,be=!0);be&&n.drawBuffers(oe)}function je(H){return v!==H?(n.useProgram(H),v=H,!0):!1}let it={[cs]:n.FUNC_ADD,[cf]:n.FUNC_SUBTRACT,[uf]:n.FUNC_REVERSE_SUBTRACT};it[hf]=n.MIN,it[df]=n.MAX;let Ke={[ff]:n.ZERO,[pf]:n.ONE,[mf]:n.SRC_COLOR,[Vu]:n.SRC_ALPHA,[bf]:n.SRC_ALPHA_SATURATE,[yf]:n.DST_COLOR,[_f]:n.DST_ALPHA,[gf]:n.ONE_MINUS_SRC_COLOR,[Hu]:n.ONE_MINUS_SRC_ALPHA,[vf]:n.ONE_MINUS_DST_COLOR,[xf]:n.ONE_MINUS_DST_ALPHA,[Sf]:n.CONSTANT_COLOR,[Mf]:n.ONE_MINUS_CONSTANT_COLOR,[wf]:n.CONSTANT_ALPHA,[Ef]:n.ONE_MINUS_CONSTANT_ALPHA};function tt(H,we,oe,be,Te,fe,ze,Re,Mt,ut){if(H===$n){p===!0&&(ge(n.BLEND),p=!1);return}if(p===!1&&(le(n.BLEND),p=!0),H!==lf){if(H!==g||ut!==R){if((A!==cs||E!==cs)&&(n.blendEquation(n.FUNC_ADD),A=cs,E=cs),ut)switch(H){case ar:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gi:n.blendFunc(n.ONE,n.ONE);break;case ku:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case zu:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:Je("WebGLState: Invalid blending: ",H);break}else switch(H){case ar:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case gi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case ku:Je("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case zu:Je("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:Je("WebGLState: Invalid blending: ",H);break}C=null,y=null,b=null,w=null,x.set(0,0,0),T=0,g=H,R=ut}return}Te=Te||we,fe=fe||oe,ze=ze||be,(we!==A||Te!==E)&&(n.blendEquationSeparate(it[we],it[Te]),A=we,E=Te),(oe!==C||be!==y||fe!==b||ze!==w)&&(n.blendFuncSeparate(Ke[oe],Ke[be],Ke[fe],Ke[ze]),C=oe,y=be,b=fe,w=ze),(Re.equals(x)===!1||Mt!==T)&&(n.blendColor(Re.r,Re.g,Re.b,Mt),x.copy(Re),T=Mt),g=H,R=!1}function ft(H,we){H.side===Jn?ge(n.CULL_FACE):le(n.CULL_FACE);let oe=H.side===Kt;we&&(oe=!oe),Oe(oe),H.blending===ar&&H.transparent===!1?tt($n):tt(H.blending,H.blendEquation,H.blendSrc,H.blendDst,H.blendEquationAlpha,H.blendSrcAlpha,H.blendDstAlpha,H.blendColor,H.blendAlpha,H.premultipliedAlpha),a.setFunc(H.depthFunc),a.setTest(H.depthTest),a.setMask(H.depthWrite),r.setMask(H.colorWrite);let be=H.stencilWrite;o.setTest(be),be&&(o.setMask(H.stencilWriteMask),o.setFunc(H.stencilFunc,H.stencilRef,H.stencilFuncMask),o.setOp(H.stencilFail,H.stencilZFail,H.stencilZPass)),Qe(H.polygonOffset,H.polygonOffsetFactor,H.polygonOffsetUnits),H.alphaToCoverage===!0?le(n.SAMPLE_ALPHA_TO_COVERAGE):ge(n.SAMPLE_ALPHA_TO_COVERAGE)}function Oe(H){I!==H&&(H?n.frontFace(n.CW):n.frontFace(n.CCW),I=H)}function ot(H){H!==rf?(le(n.CULL_FACE),H!==L&&(H===Bu?n.cullFace(n.BACK):H===af?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ge(n.CULL_FACE),L=H}function de(H){H!==U&&(Z&&n.lineWidth(H),U=H)}function Qe(H,we,oe){H?(le(n.POLYGON_OFFSET_FILL),(N!==we||G!==oe)&&(N=we,G=oe,a.getReversed()&&(we=-we),n.polygonOffset(we,oe))):ge(n.POLYGON_OFFSET_FILL)}function pt(H){H?le(n.SCISSOR_TEST):ge(n.SCISSOR_TEST)}function dt(H){H===void 0&&(H=n.TEXTURE0+q-1),V!==H&&(n.activeTexture(H),V=H)}function k(H,we,oe){oe===void 0&&(V===null?oe=n.TEXTURE0+q-1:oe=V);let be=j[oe];be===void 0&&(be={type:void 0,texture:void 0},j[oe]=be),(be.type!==H||be.texture!==we)&&(V!==oe&&(n.activeTexture(oe),V=oe),n.bindTexture(H,we||ee[H]),be.type=H,be.texture=we)}function mt(){let H=j[V];H!==void 0&&H.type!==void 0&&(n.bindTexture(H.type,null),H.type=void 0,H.texture=void 0)}function at(){try{n.compressedTexImage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function S(){try{n.compressedTexImage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function _(){try{n.texSubImage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function D(){try{n.texSubImage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function F(){try{n.compressedTexSubImage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function J(){try{n.compressedTexSubImage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function he(){try{n.texStorage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function pe(){try{n.texStorage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function se(){try{n.texImage2D(...arguments)}catch(H){Je("WebGLState:",H)}}function ue(){try{n.texImage3D(...arguments)}catch(H){Je("WebGLState:",H)}}function Me(H){return d[H]!==void 0?d[H]:n.getParameter(H)}function ke(H,we){d[H]!==we&&(n.pixelStorei(H,we),d[H]=we)}function Ee(H){xe.equals(H)===!1&&(n.scissor(H.x,H.y,H.z,H.w),xe.copy(H))}function ve(H){me.equals(H)===!1&&(n.viewport(H.x,H.y,H.z,H.w),me.copy(H))}function Be(H,we){let oe=c.get(we);oe===void 0&&(oe=new WeakMap,c.set(we,oe));let be=oe.get(H);be===void 0&&(be=n.getUniformBlockIndex(we,H.name),oe.set(H,be))}function Xe(H,we){let be=c.get(we).get(H);l.get(we)!==be&&(n.uniformBlockBinding(we,be,H.__bindingPointIndex),l.set(we,be))}function et(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},d={},V=null,j={},h={},f=new WeakMap,m=[],v=null,p=!1,g=null,A=null,C=null,y=null,E=null,b=null,w=null,x=new $e(0,0,0),T=0,R=!1,I=null,L=null,U=null,N=null,G=null,xe.set(0,0,n.canvas.width,n.canvas.height),me.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:le,disable:ge,bindFramebuffer:Pe,drawBuffers:ye,useProgram:je,setBlending:tt,setMaterial:ft,setFlipSided:Oe,setCullFace:ot,setLineWidth:de,setPolygonOffset:Qe,setScissorTest:pt,activeTexture:dt,bindTexture:k,unbindTexture:mt,compressedTexImage2D:at,compressedTexImage3D:S,texImage2D:se,texImage3D:ue,pixelStorei:ke,getParameter:Me,updateUBOMapping:Be,uniformBlockBinding:Xe,texStorage2D:he,texStorage3D:pe,texSubImage2D:_,texSubImage3D:D,compressedTexSubImage2D:F,compressedTexSubImage3D:J,scissor:Ee,viewport:ve,reset:et}}function Av(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new We,u=new WeakMap,d=new Set,h,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function v(S,_){return m?new OffscreenCanvas(S,_):aa("canvas")}function p(S,_,D){let F=1,J=at(S);if((J.width>D||J.height>D)&&(F=D/Math.max(J.width,J.height)),F<1)if(typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&S instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&S instanceof ImageBitmap||typeof VideoFrame<"u"&&S instanceof VideoFrame){let he=Math.floor(F*J.width),pe=Math.floor(F*J.height);h===void 0&&(h=v(he,pe));let se=_?v(he,pe):h;return se.width=he,se.height=pe,se.getContext("2d").drawImage(S,0,0,he,pe),Ye("WebGLRenderer: Texture has been resized from ("+J.width+"x"+J.height+") to ("+he+"x"+pe+")."),se}else return"data"in S&&Ye("WebGLRenderer: Image in DataTexture is too big ("+J.width+"x"+J.height+")."),S;return S}function g(S){return S.generateMipmaps}function A(S){n.generateMipmap(S)}function C(S){return S.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:S.isWebGL3DRenderTarget?n.TEXTURE_3D:S.isWebGLArrayRenderTarget||S.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(S,_,D,F,J,he=!1){if(S!==null){if(n[S]!==void 0)return n[S];Ye("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+S+"'")}let pe;F&&(pe=e.get("EXT_texture_norm16"),pe||Ye("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let se=_;if(_===n.RED&&(D===n.FLOAT&&(se=n.R32F),D===n.HALF_FLOAT&&(se=n.R16F),D===n.UNSIGNED_BYTE&&(se=n.R8),D===n.UNSIGNED_SHORT&&pe&&(se=pe.R16_EXT),D===n.SHORT&&pe&&(se=pe.R16_SNORM_EXT)),_===n.RED_INTEGER&&(D===n.UNSIGNED_BYTE&&(se=n.R8UI),D===n.UNSIGNED_SHORT&&(se=n.R16UI),D===n.UNSIGNED_INT&&(se=n.R32UI),D===n.BYTE&&(se=n.R8I),D===n.SHORT&&(se=n.R16I),D===n.INT&&(se=n.R32I)),_===n.RG&&(D===n.FLOAT&&(se=n.RG32F),D===n.HALF_FLOAT&&(se=n.RG16F),D===n.UNSIGNED_BYTE&&(se=n.RG8),D===n.UNSIGNED_SHORT&&pe&&(se=pe.RG16_EXT),D===n.SHORT&&pe&&(se=pe.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(D===n.UNSIGNED_BYTE&&(se=n.RG8UI),D===n.UNSIGNED_SHORT&&(se=n.RG16UI),D===n.UNSIGNED_INT&&(se=n.RG32UI),D===n.BYTE&&(se=n.RG8I),D===n.SHORT&&(se=n.RG16I),D===n.INT&&(se=n.RG32I)),_===n.RGB_INTEGER&&(D===n.UNSIGNED_BYTE&&(se=n.RGB8UI),D===n.UNSIGNED_SHORT&&(se=n.RGB16UI),D===n.UNSIGNED_INT&&(se=n.RGB32UI),D===n.BYTE&&(se=n.RGB8I),D===n.SHORT&&(se=n.RGB16I),D===n.INT&&(se=n.RGB32I)),_===n.RGBA_INTEGER&&(D===n.UNSIGNED_BYTE&&(se=n.RGBA8UI),D===n.UNSIGNED_SHORT&&(se=n.RGBA16UI),D===n.UNSIGNED_INT&&(se=n.RGBA32UI),D===n.BYTE&&(se=n.RGBA8I),D===n.SHORT&&(se=n.RGBA16I),D===n.INT&&(se=n.RGBA32I)),_===n.RGB&&(D===n.UNSIGNED_SHORT&&pe&&(se=pe.RGB16_EXT),D===n.SHORT&&pe&&(se=pe.RGB16_SNORM_EXT),D===n.UNSIGNED_INT_5_9_9_9_REV&&(se=n.RGB9_E5),D===n.UNSIGNED_INT_10F_11F_11F_REV&&(se=n.R11F_G11F_B10F)),_===n.RGBA){let ue=he?ra:ct.getTransfer(J);D===n.FLOAT&&(se=n.RGBA32F),D===n.HALF_FLOAT&&(se=n.RGBA16F),D===n.UNSIGNED_BYTE&&(se=ue===vt?n.SRGB8_ALPHA8:n.RGBA8),D===n.UNSIGNED_SHORT&&pe&&(se=pe.RGBA16_EXT),D===n.SHORT&&pe&&(se=pe.RGBA16_SNORM_EXT),D===n.UNSIGNED_SHORT_4_4_4_4&&(se=n.RGBA4),D===n.UNSIGNED_SHORT_5_5_5_1&&(se=n.RGB5_A1)}return(se===n.R16F||se===n.R32F||se===n.RG16F||se===n.RG32F||se===n.RGBA16F||se===n.RGBA32F)&&e.get("EXT_color_buffer_float"),se}function E(S,_){let D;return S?_===null||_===Bn||_===lr?D=n.DEPTH24_STENCIL8:_===kn?D=n.DEPTH32F_STENCIL8:_===or&&(D=n.DEPTH24_STENCIL8,Ye("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Bn||_===lr?D=n.DEPTH_COMPONENT24:_===kn?D=n.DEPTH_COMPONENT32F:_===or&&(D=n.DEPTH_COMPONENT16),D}function b(S,_){return g(S)===!0||S.isFramebufferTexture&&S.minFilter!==Zt&&S.minFilter!==Rt?Math.log2(Math.max(_.width,_.height))+1:S.mipmaps!==void 0&&S.mipmaps.length>0?S.mipmaps.length:S.isCompressedTexture&&Array.isArray(S.image)?_.mipmaps.length:1}function w(S){let _=S.target;_.removeEventListener("dispose",w),T(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&d.delete(_)}function x(S){let _=S.target;_.removeEventListener("dispose",x),I(_)}function T(S){let _=i.get(S);if(_.__webglInit===void 0)return;let D=S.source,F=f.get(D);if(F){let J=F[_.__cacheKey];J.usedTimes--,J.usedTimes===0&&R(S),Object.keys(F).length===0&&f.delete(D)}i.remove(S)}function R(S){let _=i.get(S);n.deleteTexture(_.__webglTexture);let D=S.source,F=f.get(D);delete F[_.__cacheKey],a.memory.textures--}function I(S){let _=i.get(S);if(S.depthTexture&&(S.depthTexture.dispose(),i.remove(S.depthTexture)),S.isWebGLCubeRenderTarget)for(let F=0;F<6;F++){if(Array.isArray(_.__webglFramebuffer[F]))for(let J=0;J<_.__webglFramebuffer[F].length;J++)n.deleteFramebuffer(_.__webglFramebuffer[F][J]);else n.deleteFramebuffer(_.__webglFramebuffer[F]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[F])}else{if(Array.isArray(_.__webglFramebuffer))for(let F=0;F<_.__webglFramebuffer.length;F++)n.deleteFramebuffer(_.__webglFramebuffer[F]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let F=0;F<_.__webglColorRenderbuffer.length;F++)_.__webglColorRenderbuffer[F]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[F]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let D=S.textures;for(let F=0,J=D.length;F<J;F++){let he=i.get(D[F]);he.__webglTexture&&(n.deleteTexture(he.__webglTexture),a.memory.textures--),i.remove(D[F])}i.remove(S)}let L=0;function U(){L=0}function N(){return L}function G(S){L=S}function q(){let S=L;return S>=s.maxTextures&&Ye("WebGLTextures: Trying to use "+(S+1)+" texture units while this GPU supports only "+s.maxTextures),L+=1,S}function Z(S){let _=[];return _.push(S.wrapS),_.push(S.wrapT),_.push(S.wrapR||0),_.push(S.magFilter),_.push(S.minFilter),_.push(S.anisotropy),_.push(S.internalFormat),_.push(S.format),_.push(S.type),_.push(S.generateMipmaps),_.push(S.premultiplyAlpha),_.push(S.flipY),_.push(S.unpackAlignment),_.push(S.colorSpace),_.join()}function ae(S,_){let D=i.get(S);if(S.isVideoTexture&&k(S),S.isRenderTargetTexture===!1&&S.isExternalTexture!==!0&&S.version>0&&D.__version!==S.version){let F=S.image;if(F===null)Ye("WebGLRenderer: Texture marked for update but no image data found.");else if(F.complete===!1)Ye("WebGLRenderer: Texture marked for update but image is incomplete");else{ge(D,S,_);return}}else S.isExternalTexture&&(D.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,D.__webglTexture,n.TEXTURE0+_)}function z(S,_){let D=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&D.__version!==S.version){ge(D,S,_);return}else S.isExternalTexture&&(D.__webglTexture=S.sourceTexture?S.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,D.__webglTexture,n.TEXTURE0+_)}function V(S,_){let D=i.get(S);if(S.isRenderTargetTexture===!1&&S.version>0&&D.__version!==S.version){ge(D,S,_);return}t.bindTexture(n.TEXTURE_3D,D.__webglTexture,n.TEXTURE0+_)}function j(S,_){let D=i.get(S);if(S.isCubeDepthTexture!==!0&&S.version>0&&D.__version!==S.version){Pe(D,S,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,D.__webglTexture,n.TEXTURE0+_)}let Y={[js]:n.REPEAT,[Cn]:n.CLAMP_TO_EDGE,[Zo]:n.MIRRORED_REPEAT},re={[Zt]:n.NEAREST,[Cf]:n.NEAREST_MIPMAP_NEAREST,[Ra]:n.NEAREST_MIPMAP_LINEAR,[Rt]:n.LINEAR,[Sl]:n.LINEAR_MIPMAP_NEAREST,[On]:n.LINEAR_MIPMAP_LINEAR},xe={[Lf]:n.NEVER,[Of]:n.ALWAYS,[Df]:n.LESS,[ac]:n.LEQUAL,[Nf]:n.EQUAL,[oc]:n.GEQUAL,[Uf]:n.GREATER,[Ff]:n.NOTEQUAL};function me(S,_){if(_.type===kn&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Rt||_.magFilter===Sl||_.magFilter===Ra||_.magFilter===On||_.minFilter===Rt||_.minFilter===Sl||_.minFilter===Ra||_.minFilter===On)&&Ye("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(S,n.TEXTURE_WRAP_S,Y[_.wrapS]),n.texParameteri(S,n.TEXTURE_WRAP_T,Y[_.wrapT]),(S===n.TEXTURE_3D||S===n.TEXTURE_2D_ARRAY)&&n.texParameteri(S,n.TEXTURE_WRAP_R,Y[_.wrapR]),n.texParameteri(S,n.TEXTURE_MAG_FILTER,re[_.magFilter]),n.texParameteri(S,n.TEXTURE_MIN_FILTER,re[_.minFilter]),_.compareFunction&&(n.texParameteri(S,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(S,n.TEXTURE_COMPARE_FUNC,xe[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===Zt||_.minFilter!==Ra&&_.minFilter!==On||_.type===kn&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let D=e.get("EXT_texture_filter_anisotropic");n.texParameterf(S,D.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function _e(S,_){let D=!1;S.__webglInit===void 0&&(S.__webglInit=!0,_.addEventListener("dispose",w));let F=_.source,J=f.get(F);J===void 0&&(J={},f.set(F,J));let he=Z(_);if(he!==S.__cacheKey){J[he]===void 0&&(J[he]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,D=!0),J[he].usedTimes++;let pe=J[S.__cacheKey];pe!==void 0&&(J[S.__cacheKey].usedTimes--,pe.usedTimes===0&&R(_)),S.__cacheKey=he,S.__webglTexture=J[he].texture}return D}function ee(S,_,D){return Math.floor(Math.floor(S/D)/_)}function le(S,_,D,F){let he=S.updateRanges;if(he.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,D,F,_.data);else{he.sort((ke,Ee)=>ke.start-Ee.start);let pe=0;for(let ke=1;ke<he.length;ke++){let Ee=he[pe],ve=he[ke],Be=Ee.start+Ee.count,Xe=ee(ve.start,_.width,4),et=ee(Ee.start,_.width,4);ve.start<=Be+1&&Xe===et&&ee(ve.start+ve.count-1,_.width,4)===Xe?Ee.count=Math.max(Ee.count,ve.start+ve.count-Ee.start):(++pe,he[pe]=ve)}he.length=pe+1;let se=t.getParameter(n.UNPACK_ROW_LENGTH),ue=t.getParameter(n.UNPACK_SKIP_PIXELS),Me=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let ke=0,Ee=he.length;ke<Ee;ke++){let ve=he[ke],Be=Math.floor(ve.start/4),Xe=Math.ceil(ve.count/4),et=Be%_.width,H=Math.floor(Be/_.width),we=Xe,oe=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,et),t.pixelStorei(n.UNPACK_SKIP_ROWS,H),t.texSubImage2D(n.TEXTURE_2D,0,et,H,we,oe,D,F,_.data)}S.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,se),t.pixelStorei(n.UNPACK_SKIP_PIXELS,ue),t.pixelStorei(n.UNPACK_SKIP_ROWS,Me)}}function ge(S,_,D){let F=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(F=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(F=n.TEXTURE_3D);let J=_e(S,_),he=_.source;t.bindTexture(F,S.__webglTexture,n.TEXTURE0+D);let pe=i.get(he);if(he.version!==pe.__version||J===!0){if(t.activeTexture(n.TEXTURE0+D),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let oe=ct.getPrimaries(ct.workingColorSpace),be=_.colorSpace===_i?null:ct.getPrimaries(_.colorSpace),Te=_.colorSpace===_i||oe===be?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let ue=p(_.image,!1,s.maxTextureSize);ue=mt(_,ue);let Me=r.convert(_.format,_.colorSpace),ke=r.convert(_.type),Ee=y(_.internalFormat,Me,ke,_.normalized,_.colorSpace,_.isVideoTexture);me(F,_);let ve,Be=_.mipmaps,Xe=_.isVideoTexture!==!0,et=pe.__version===void 0||J===!0,H=he.dataReady,we=b(_,ue);if(_.isDepthTexture)Ee=E(_.format===Wi,_.type),et&&(Xe?t.texStorage2D(n.TEXTURE_2D,1,Ee,ue.width,ue.height):t.texImage2D(n.TEXTURE_2D,0,Ee,ue.width,ue.height,0,Me,ke,null));else if(_.isDataTexture)if(Be.length>0){Xe&&et&&t.texStorage2D(n.TEXTURE_2D,we,Ee,Be[0].width,Be[0].height);for(let oe=0,be=Be.length;oe<be;oe++)ve=Be[oe],Xe?H&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,ve.width,ve.height,Me,ke,ve.data):t.texImage2D(n.TEXTURE_2D,oe,Ee,ve.width,ve.height,0,Me,ke,ve.data);_.generateMipmaps=!1}else Xe?(et&&t.texStorage2D(n.TEXTURE_2D,we,Ee,ue.width,ue.height),H&&le(_,ue,Me,ke)):t.texImage2D(n.TEXTURE_2D,0,Ee,ue.width,ue.height,0,Me,ke,ue.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){Xe&&et&&t.texStorage3D(n.TEXTURE_2D_ARRAY,we,Ee,Be[0].width,Be[0].height,ue.depth);for(let oe=0,be=Be.length;oe<be;oe++)if(ve=Be[oe],_.format!==pn)if(Me!==null)if(Xe){if(H)if(_.layerUpdates.size>0){let Te=hh(ve.width,ve.height,_.format,_.type);for(let fe of _.layerUpdates){let ze=ve.data.subarray(fe*Te/ve.data.BYTES_PER_ELEMENT,(fe+1)*Te/ve.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,fe,ve.width,ve.height,1,Me,ze)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,ve.width,ve.height,ue.depth,Me,ve.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,oe,Ee,ve.width,ve.height,ue.depth,0,ve.data,0,0);else Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else Xe?H&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,oe,0,0,0,ve.width,ve.height,ue.depth,Me,ke,ve.data):t.texImage3D(n.TEXTURE_2D_ARRAY,oe,Ee,ve.width,ve.height,ue.depth,0,Me,ke,ve.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{Xe&&et&&t.texStorage2D(n.TEXTURE_2D,we,Ee,Be[0].width,Be[0].height);for(let oe=0,be=Be.length;oe<be;oe++)ve=Be[oe],_.format!==pn?Me!==null?Xe?H&&t.compressedTexSubImage2D(n.TEXTURE_2D,oe,0,0,ve.width,ve.height,Me,ve.data):t.compressedTexImage2D(n.TEXTURE_2D,oe,Ee,ve.width,ve.height,0,ve.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Xe?H&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,ve.width,ve.height,Me,ke,ve.data):t.texImage2D(n.TEXTURE_2D,oe,Ee,ve.width,ve.height,0,Me,ke,ve.data)}else if(_.isDataArrayTexture)if(Xe){if(et&&t.texStorage3D(n.TEXTURE_2D_ARRAY,we,Ee,ue.width,ue.height,ue.depth),H)if(_.layerUpdates.size>0){let oe=hh(ue.width,ue.height,_.format,_.type);for(let be of _.layerUpdates){let Te=ue.data.subarray(be*oe/ue.data.BYTES_PER_ELEMENT,(be+1)*oe/ue.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,be,ue.width,ue.height,1,Me,ke,Te)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,ue.width,ue.height,ue.depth,Me,ke,ue.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ee,ue.width,ue.height,ue.depth,0,Me,ke,ue.data);else if(_.isData3DTexture)Xe?(et&&t.texStorage3D(n.TEXTURE_3D,we,Ee,ue.width,ue.height,ue.depth),H&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,ue.width,ue.height,ue.depth,Me,ke,ue.data)):t.texImage3D(n.TEXTURE_3D,0,Ee,ue.width,ue.height,ue.depth,0,Me,ke,ue.data);else if(_.isFramebufferTexture){if(et)if(Xe)t.texStorage2D(n.TEXTURE_2D,we,Ee,ue.width,ue.height);else{let oe=ue.width,be=ue.height;for(let Te=0;Te<we;Te++)t.texImage2D(n.TEXTURE_2D,Te,Ee,oe,be,0,Me,ke,null),oe>>=1,be>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){let oe=n.canvas;if(oe.hasAttribute("layoutsubtree")||oe.setAttribute("layoutsubtree","true"),ue.parentNode!==oe){oe.appendChild(ue),d.add(_),oe.onpaint=be=>{let Te=be.changedElements;for(let fe of d)Te.includes(fe.image)&&(fe.needsUpdate=!0)},oe.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,ue);else{let Te=n.RGBA,fe=n.RGBA,ze=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Te,fe,ze,ue)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Be.length>0){if(Xe&&et){let oe=at(Be[0]);t.texStorage2D(n.TEXTURE_2D,we,Ee,oe.width,oe.height)}for(let oe=0,be=Be.length;oe<be;oe++)ve=Be[oe],Xe?H&&t.texSubImage2D(n.TEXTURE_2D,oe,0,0,Me,ke,ve):t.texImage2D(n.TEXTURE_2D,oe,Ee,Me,ke,ve);_.generateMipmaps=!1}else if(Xe){if(et){let oe=at(ue);t.texStorage2D(n.TEXTURE_2D,we,Ee,oe.width,oe.height)}H&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Me,ke,ue)}else t.texImage2D(n.TEXTURE_2D,0,Ee,Me,ke,ue);g(_)&&A(F),pe.__version=he.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function Pe(S,_,D){if(_.image.length!==6)return;let F=_e(S,_),J=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,S.__webglTexture,n.TEXTURE0+D);let he=i.get(J);if(J.version!==he.__version||F===!0){t.activeTexture(n.TEXTURE0+D);let pe=ct.getPrimaries(ct.workingColorSpace),se=_.colorSpace===_i?null:ct.getPrimaries(_.colorSpace),ue=_.colorSpace===_i||pe===se?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,ue);let Me=_.isCompressedTexture||_.image[0].isCompressedTexture,ke=_.image[0]&&_.image[0].isDataTexture,Ee=[];for(let fe=0;fe<6;fe++)!Me&&!ke?Ee[fe]=p(_.image[fe],!0,s.maxCubemapSize):Ee[fe]=ke?_.image[fe].image:_.image[fe],Ee[fe]=mt(_,Ee[fe]);let ve=Ee[0],Be=r.convert(_.format,_.colorSpace),Xe=r.convert(_.type),et=y(_.internalFormat,Be,Xe,_.normalized,_.colorSpace),H=_.isVideoTexture!==!0,we=he.__version===void 0||F===!0,oe=J.dataReady,be=b(_,ve);me(n.TEXTURE_CUBE_MAP,_);let Te;if(Me){H&&we&&t.texStorage2D(n.TEXTURE_CUBE_MAP,be,et,ve.width,ve.height);for(let fe=0;fe<6;fe++){Te=Ee[fe].mipmaps;for(let ze=0;ze<Te.length;ze++){let Re=Te[ze];_.format!==pn?Be!==null?H?oe&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,ze,0,0,Re.width,Re.height,Be,Re.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,ze,et,Re.width,Re.height,0,Re.data):Ye("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):H?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,ze,0,0,Re.width,Re.height,Be,Xe,Re.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,ze,et,Re.width,Re.height,0,Be,Xe,Re.data)}}}else{if(Te=_.mipmaps,H&&we){Te.length>0&&be++;let fe=at(Ee[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,be,et,fe.width,fe.height)}for(let fe=0;fe<6;fe++)if(ke){H?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Ee[fe].width,Ee[fe].height,Be,Xe,Ee[fe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,et,Ee[fe].width,Ee[fe].height,0,Be,Xe,Ee[fe].data);for(let ze=0;ze<Te.length;ze++){let Mt=Te[ze].image[fe].image;H?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,ze+1,0,0,Mt.width,Mt.height,Be,Xe,Mt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,ze+1,et,Mt.width,Mt.height,0,Be,Xe,Mt.data)}}else{H?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,0,0,Be,Xe,Ee[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,0,et,Be,Xe,Ee[fe]);for(let ze=0;ze<Te.length;ze++){let Re=Te[ze];H?oe&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,ze+1,0,0,Be,Xe,Re.image[fe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+fe,ze+1,et,Be,Xe,Re.image[fe])}}}g(_)&&A(n.TEXTURE_CUBE_MAP),he.__version=J.version,_.onUpdate&&_.onUpdate(_)}S.__version=_.version}function ye(S,_,D,F,J,he){let pe=r.convert(D.format,D.colorSpace),se=r.convert(D.type),ue=y(D.internalFormat,pe,se,D.normalized,D.colorSpace),Me=i.get(_),ke=i.get(D);if(ke.__renderTarget=_,!Me.__hasExternalTextures){let Ee=Math.max(1,_.width>>he),ve=Math.max(1,_.height>>he);J===n.TEXTURE_3D||J===n.TEXTURE_2D_ARRAY?t.texImage3D(J,he,ue,Ee,ve,_.depth,0,pe,se,null):t.texImage2D(J,he,ue,Ee,ve,0,pe,se,null)}t.bindFramebuffer(n.FRAMEBUFFER,S),dt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,F,J,ke.__webglTexture,0,pt(_)):(J===n.TEXTURE_2D||J>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&J<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,F,J,ke.__webglTexture,he),t.bindFramebuffer(n.FRAMEBUFFER,null)}function je(S,_,D){if(n.bindRenderbuffer(n.RENDERBUFFER,S),_.depthBuffer){let F=_.depthTexture,J=F&&F.isDepthTexture?F.type:null,he=E(_.stencilBuffer,J),pe=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;dt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pt(_),he,_.width,_.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,pt(_),he,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,he,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,pe,n.RENDERBUFFER,S)}else{let F=_.textures;for(let J=0;J<F.length;J++){let he=F[J],pe=r.convert(he.format,he.colorSpace),se=r.convert(he.type),ue=y(he.internalFormat,pe,se,he.normalized,he.colorSpace);dt(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,pt(_),ue,_.width,_.height):D?n.renderbufferStorageMultisample(n.RENDERBUFFER,pt(_),ue,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,ue,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function it(S,_,D){let F=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,S),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let J=i.get(_.depthTexture);if(J.__renderTarget=_,(!J.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),F){if(J.__webglInit===void 0&&(J.__webglInit=!0,_.depthTexture.addEventListener("dispose",w)),J.__webglTexture===void 0){J.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,J.__webglTexture),me(n.TEXTURE_CUBE_MAP,_.depthTexture);let Me=r.convert(_.depthTexture.format),ke=r.convert(_.depthTexture.type),Ee;_.depthTexture.format===Wn?Ee=n.DEPTH_COMPONENT24:_.depthTexture.format===Wi&&(Ee=n.DEPTH24_STENCIL8);for(let ve=0;ve<6;ve++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ve,0,Ee,_.width,_.height,0,Me,ke,null)}}else ae(_.depthTexture,0);let he=J.__webglTexture,pe=pt(_),se=F?n.TEXTURE_CUBE_MAP_POSITIVE_X+D:n.TEXTURE_2D,ue=_.depthTexture.format===Wi?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Wn)dt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ue,se,he,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,ue,se,he,0);else if(_.depthTexture.format===Wi)dt(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,ue,se,he,0,pe):n.framebufferTexture2D(n.FRAMEBUFFER,ue,se,he,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function Ke(S){let _=i.get(S),D=S.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==S.depthTexture){let F=S.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),F){let J=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,F.removeEventListener("dispose",J)};F.addEventListener("dispose",J),_.__depthDisposeCallback=J}_.__boundDepthTexture=F}if(S.depthTexture&&!_.__autoAllocateDepthBuffer)if(D)for(let F=0;F<6;F++)it(_.__webglFramebuffer[F],S,F);else{let F=S.texture.mipmaps;F&&F.length>0?it(_.__webglFramebuffer[0],S,0):it(_.__webglFramebuffer,S,0)}else if(D){_.__webglDepthbuffer=[];for(let F=0;F<6;F++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[F]),_.__webglDepthbuffer[F]===void 0)_.__webglDepthbuffer[F]=n.createRenderbuffer(),je(_.__webglDepthbuffer[F],S,!1);else{let J=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=_.__webglDepthbuffer[F];n.bindRenderbuffer(n.RENDERBUFFER,he),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,he)}}else{let F=S.texture.mipmaps;if(F&&F.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),je(_.__webglDepthbuffer,S,!1);else{let J=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,he=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,he),n.framebufferRenderbuffer(n.FRAMEBUFFER,J,n.RENDERBUFFER,he)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function tt(S,_,D){let F=i.get(S);_!==void 0&&ye(F.__webglFramebuffer,S,S.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),D!==void 0&&Ke(S)}function ft(S){let _=S.texture,D=i.get(S),F=i.get(_);S.addEventListener("dispose",x);let J=S.textures,he=S.isWebGLCubeRenderTarget===!0,pe=J.length>1;if(pe||(F.__webglTexture===void 0&&(F.__webglTexture=n.createTexture()),F.__version=_.version,a.memory.textures++),he){D.__webglFramebuffer=[];for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer[se]=[];for(let ue=0;ue<_.mipmaps.length;ue++)D.__webglFramebuffer[se][ue]=n.createFramebuffer()}else D.__webglFramebuffer[se]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){D.__webglFramebuffer=[];for(let se=0;se<_.mipmaps.length;se++)D.__webglFramebuffer[se]=n.createFramebuffer()}else D.__webglFramebuffer=n.createFramebuffer();if(pe)for(let se=0,ue=J.length;se<ue;se++){let Me=i.get(J[se]);Me.__webglTexture===void 0&&(Me.__webglTexture=n.createTexture(),a.memory.textures++)}if(S.samples>0&&dt(S)===!1){D.__webglMultisampledFramebuffer=n.createFramebuffer(),D.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,D.__webglMultisampledFramebuffer);for(let se=0;se<J.length;se++){let ue=J[se];D.__webglColorRenderbuffer[se]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,D.__webglColorRenderbuffer[se]);let Me=r.convert(ue.format,ue.colorSpace),ke=r.convert(ue.type),Ee=y(ue.internalFormat,Me,ke,ue.normalized,ue.colorSpace,S.isXRRenderTarget===!0),ve=pt(S);n.renderbufferStorageMultisample(n.RENDERBUFFER,ve,Ee,S.width,S.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+se,n.RENDERBUFFER,D.__webglColorRenderbuffer[se])}n.bindRenderbuffer(n.RENDERBUFFER,null),S.depthBuffer&&(D.__webglDepthRenderbuffer=n.createRenderbuffer(),je(D.__webglDepthRenderbuffer,S,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(he){t.bindTexture(n.TEXTURE_CUBE_MAP,F.__webglTexture),me(n.TEXTURE_CUBE_MAP,_);for(let se=0;se<6;se++)if(_.mipmaps&&_.mipmaps.length>0)for(let ue=0;ue<_.mipmaps.length;ue++)ye(D.__webglFramebuffer[se][ue],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,ue);else ye(D.__webglFramebuffer[se],S,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+se,0);g(_)&&A(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(pe){for(let se=0,ue=J.length;se<ue;se++){let Me=J[se],ke=i.get(Me),Ee=n.TEXTURE_2D;(S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(Ee=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ee,ke.__webglTexture),me(Ee,Me),ye(D.__webglFramebuffer,S,Me,n.COLOR_ATTACHMENT0+se,Ee,0),g(Me)&&A(Ee)}t.unbindTexture()}else{let se=n.TEXTURE_2D;if((S.isWebGL3DRenderTarget||S.isWebGLArrayRenderTarget)&&(se=S.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(se,F.__webglTexture),me(se,_),_.mipmaps&&_.mipmaps.length>0)for(let ue=0;ue<_.mipmaps.length;ue++)ye(D.__webglFramebuffer[ue],S,_,n.COLOR_ATTACHMENT0,se,ue);else ye(D.__webglFramebuffer,S,_,n.COLOR_ATTACHMENT0,se,0);g(_)&&A(se),t.unbindTexture()}S.depthBuffer&&Ke(S)}function Oe(S){let _=S.textures;for(let D=0,F=_.length;D<F;D++){let J=_[D];if(g(J)){let he=C(S),pe=i.get(J).__webglTexture;t.bindTexture(he,pe),A(he),t.unbindTexture()}}}let ot=[],de=[];function Qe(S){if(S.samples>0){if(dt(S)===!1){let _=S.textures,D=S.width,F=S.height,J=n.COLOR_BUFFER_BIT,he=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,pe=i.get(S),se=_.length>1;if(se)for(let Me=0;Me<_.length;Me++)t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,pe.__webglMultisampledFramebuffer);let ue=S.texture.mipmaps;ue&&ue.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglFramebuffer);for(let Me=0;Me<_.length;Me++){if(S.resolveDepthBuffer&&(S.depthBuffer&&(J|=n.DEPTH_BUFFER_BIT),S.stencilBuffer&&S.resolveStencilBuffer&&(J|=n.STENCIL_BUFFER_BIT)),se){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,pe.__webglColorRenderbuffer[Me]);let ke=i.get(_[Me]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,ke,0)}n.blitFramebuffer(0,0,D,F,0,0,D,F,J,n.NEAREST),l===!0&&(ot.length=0,de.length=0,ot.push(n.COLOR_ATTACHMENT0+Me),S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&(ot.push(he),de.push(he),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,de)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,ot))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),se)for(let Me=0;Me<_.length;Me++){t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.RENDERBUFFER,pe.__webglColorRenderbuffer[Me]);let ke=i.get(_[Me]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,pe.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Me,n.TEXTURE_2D,ke,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,pe.__webglMultisampledFramebuffer)}else if(S.depthBuffer&&S.storeMultisampledDepthBuffer===!1&&l){let _=S.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function pt(S){return Math.min(s.maxSamples,S.samples)}function dt(S){let _=i.get(S);return S.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function k(S){let _=a.render.frame;u.get(S)!==_&&(u.set(S,_),S.update())}function mt(S,_){let D=S.colorSpace,F=S.format,J=S.type;return S.isCompressedTexture===!0||S.isVideoTexture===!0||D!==sa&&D!==_i&&(ct.getTransfer(D)===vt?(F!==pn||J!==Qt)&&Ye("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):Je("WebGLTextures: Unsupported texture color space:",D)),_}function at(S){return typeof HTMLImageElement<"u"&&S instanceof HTMLImageElement?(c.width=S.naturalWidth||S.width,c.height=S.naturalHeight||S.height):typeof VideoFrame<"u"&&S instanceof VideoFrame?(c.width=S.displayWidth,c.height=S.displayHeight):(c.width=S.width,c.height=S.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=U,this.getTextureUnits=N,this.setTextureUnits=G,this.setTexture2D=ae,this.setTexture2DArray=z,this.setTexture3D=V,this.setTextureCube=j,this.rebindTextures=tt,this.setupRenderTarget=ft,this.updateRenderTargetMipmap=Oe,this.updateMultisampleRenderTarget=Qe,this.setupDepthRenderbuffer=Ke,this.setupFrameBufferTexture=ye,this.useMultisampledRTT=dt,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Cv(n,e){function t(i,s=_i){let r,a=ct.getTransfer(s);if(i===Qt)return n.UNSIGNED_BYTE;if(i===wl)return n.UNSIGNED_SHORT_4_4_4_4;if(i===El)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Qu)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===eh)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Zu)return n.BYTE;if(i===Ku)return n.SHORT;if(i===or)return n.UNSIGNED_SHORT;if(i===Ml)return n.INT;if(i===Bn)return n.UNSIGNED_INT;if(i===kn)return n.FLOAT;if(i===zn)return n.HALF_FLOAT;if(i===th)return n.ALPHA;if(i===nh)return n.RGB;if(i===pn)return n.RGBA;if(i===Wn)return n.DEPTH_COMPONENT;if(i===Wi)return n.DEPTH_STENCIL;if(i===ih)return n.RED;if(i===Tl)return n.RED_INTEGER;if(i===Xi)return n.RG;if(i===Al)return n.RG_INTEGER;if(i===Cl)return n.RGBA_INTEGER;if(i===Pa||i===Ia||i===La||i===Da)if(a===vt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Pa)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ia)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===La)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Da)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Pa)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ia)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===La)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Da)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Rl||i===Pl||i===Il||i===Ll)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Rl)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Pl)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Il)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Ll)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Dl||i===Nl||i===Ul||i===Fl||i===Ol||i===Na||i===Bl)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===Dl||i===Nl)return a===vt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Ul)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Fl)return r.COMPRESSED_R11_EAC;if(i===Ol)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Na)return r.COMPRESSED_RG11_EAC;if(i===Bl)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===kl||i===zl||i===Vl||i===Hl||i===Gl||i===Wl||i===Xl||i===jl||i===ql||i===Yl||i===Jl||i===$l||i===Zl||i===Kl)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===kl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===zl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Vl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Hl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Gl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Wl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Xl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===jl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===ql)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Yl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Jl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===$l)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===Zl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Kl)return a===vt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===Ql||i===ec||i===tc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===Ql)return a===vt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===ec)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===tc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===nc||i===ic||i===Ua||i===sc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===nc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===ic)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Ua)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===sc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===lr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var Rv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pv=`
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

}`,Eh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new ga(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Lt({vertexShader:Rv,fragmentShader:Pv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Wt(new _a(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Th=class extends Xn{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,d=null,h=null,f=null,m=null,v=typeof XRWebGLBinding<"u",p=new Eh,g={},A=t.getContextAttributes(),C=null,y=null,E=[],b=[],w=new We,x=null,T=null,R=new on;R.viewport=new xt;let I=new on;I.viewport=new xt;let L=[R,I],U=new xl,N=null,G=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(ee){let le=E[ee];return le===void 0&&(le=new Zs,E[ee]=le),le.getTargetRaySpace()},this.getControllerGrip=function(ee){let le=E[ee];return le===void 0&&(le=new Zs,E[ee]=le),le.getGripSpace()},this.getHand=function(ee){let le=E[ee];return le===void 0&&(le=new Zs,E[ee]=le),le.getHandSpace()};function q(ee){let le=b.indexOf(ee.inputSource);if(le===-1)return;let ge=E[le];ge!==void 0&&(ge.update(ee.inputSource,ee.frame,c||a),ge.dispatchEvent({type:ee.type,data:ee.inputSource}))}function Z(){s.removeEventListener("select",q),s.removeEventListener("selectstart",q),s.removeEventListener("selectend",q),s.removeEventListener("squeeze",q),s.removeEventListener("squeezestart",q),s.removeEventListener("squeezeend",q),s.removeEventListener("end",Z),s.removeEventListener("inputsourceschange",ae);for(let ee=0;ee<E.length;ee++){let le=b[ee];le!==null&&(b[ee]=null,E[ee].disconnect(le))}N=null,G=null,p.reset();for(let ee in g)delete g[ee];if(e.setRenderTarget(C),f=null,h=null,d=null,s=null,y=null,_e.stop(),i.isPresenting=!1,e.setPixelRatio(x),e.setSize(w.width,w.height,!1),T!==null){let ee=T.camera;ee.fov=T.fov,ee.zoom=T.zoom,ee.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(ee){r=ee,i.isPresenting===!0&&Ye("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(ee){o=ee,i.isPresenting===!0&&Ye("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(ee){c=ee},this.getBaseLayer=function(){return h!==null?h:f},this.getBinding=function(){return d===null&&v&&(d=new XRWebGLBinding(s,t)),d},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(ee){if(s=ee,s!==null){if(C=e.getRenderTarget(),s.addEventListener("select",q),s.addEventListener("selectstart",q),s.addEventListener("selectend",q),s.addEventListener("squeeze",q),s.addEventListener("squeezestart",q),s.addEventListener("squeezeend",q),s.addEventListener("end",Z),s.addEventListener("inputsourceschange",ae),A.xrCompatible!==!0&&await t.makeXRCompatible(),x=e.getPixelRatio(),e.getSize(w),v&&"createProjectionLayer"in XRWebGLBinding.prototype){let ge=null,Pe=null,ye=null;A.depth&&(ye=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ge=A.stencil?Wi:Wn,Pe=A.stencil?lr:Bn);let je={colorFormat:t.RGBA8,depthFormat:ye,scaleFactor:r};d=this.getBinding(),h=d.createProjectionLayer(je),s.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),y=new vn(h.textureWidth,h.textureHeight,{format:pn,type:Qt,depthTexture:new Bi(h.textureWidth,h.textureHeight,Pe,void 0,void 0,void 0,void 0,void 0,void 0,ge),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1,storeMultisampledDepthBuffer:h.ignoreDepthValues===!1,storeMultisampledStencilBuffer:h.ignoreDepthValues===!1})}else{let ge={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ge),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new vn(f.framebufferWidth,f.framebufferHeight,{format:pn,type:Qt,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),_e.setContext(s),_e.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function ae(ee){for(let le=0;le<ee.removed.length;le++){let ge=ee.removed[le],Pe=b.indexOf(ge);Pe>=0&&(b[Pe]=null,E[Pe].disconnect(ge))}for(let le=0;le<ee.added.length;le++){let ge=ee.added[le],Pe=b.indexOf(ge);if(Pe===-1){for(let je=0;je<E.length;je++)if(je>=b.length){b.push(ge),Pe=je;break}else if(b[je]===null){b[je]=ge,Pe=je;break}if(Pe===-1)break}let ye=E[Pe];ye&&ye.connect(ge)}}let z=new X,V=new X;function j(ee,le,ge){z.setFromMatrixPosition(le.matrixWorld),V.setFromMatrixPosition(ge.matrixWorld);let Pe=z.distanceTo(V),ye=le.projectionMatrix.elements,je=ge.projectionMatrix.elements,it=ye[14]/(ye[10]-1),Ke=ye[14]/(ye[10]+1),tt=(ye[9]+1)/ye[5],ft=(ye[9]-1)/ye[5],Oe=(ye[8]-1)/ye[0],ot=(je[8]+1)/je[0],de=it*Oe,Qe=it*ot,pt=Pe/(-Oe+ot),dt=pt*-Oe;if(le.matrixWorld.decompose(ee.position,ee.quaternion,ee.scale),ee.translateX(dt),ee.translateZ(pt),ee.matrixWorld.compose(ee.position,ee.quaternion,ee.scale),ee.matrixWorldInverse.copy(ee.matrixWorld).invert(),ye[10]===-1)ee.projectionMatrix.copy(le.projectionMatrix),ee.projectionMatrixInverse.copy(le.projectionMatrixInverse);else{let k=it+pt,mt=Ke+pt,at=de-dt,S=Qe+(Pe-dt),_=tt*Ke/mt*k,D=ft*Ke/mt*k;ee.projectionMatrix.makePerspective(at,S,_,D,k,mt),ee.projectionMatrixInverse.copy(ee.projectionMatrix).invert()}}function Y(ee,le){le===null?ee.matrixWorld.copy(ee.matrix):ee.matrixWorld.multiplyMatrices(le.matrixWorld,ee.matrix),ee.matrixWorldInverse.copy(ee.matrixWorld).invert()}this.updateCamera=function(ee){if(s===null)return;let le=ee.near,ge=ee.far;p.texture!==null&&(p.depthNear>0&&(le=p.depthNear),p.depthFar>0&&(ge=p.depthFar)),U.near=I.near=R.near=le,U.far=I.far=R.far=ge,(N!==U.near||G!==U.far)&&(s.updateRenderState({depthNear:U.near,depthFar:U.far}),N=U.near,G=U.far),U.layers.mask=ee.layers.mask|6,R.layers.mask=U.layers.mask&-5,I.layers.mask=U.layers.mask&-3;let Pe=ee.parent,ye=U.cameras;Y(U,Pe);for(let je=0;je<ye.length;je++)Y(ye[je],Pe);ye.length===2?j(U,R,I):U.projectionMatrix.copy(R.projectionMatrix),T===null&&ee.isPerspectiveCamera&&(T={camera:ee,fov:ee.fov,zoom:ee.zoom}),re(ee,U,Pe)};function re(ee,le,ge){ge===null?ee.matrix.copy(le.matrixWorld):(ee.matrix.copy(ge.matrixWorld),ee.matrix.invert(),ee.matrix.multiply(le.matrixWorld)),ee.matrix.decompose(ee.position,ee.quaternion,ee.scale),ee.updateMatrixWorld(!0),ee.projectionMatrix.copy(le.projectionMatrix),ee.projectionMatrixInverse.copy(le.projectionMatrixInverse),ee.isPerspectiveCamera&&(ee.fov=Js*2*Math.atan(1/ee.projectionMatrix.elements[5]),ee.zoom=1)}this.getCamera=function(){return U},this.getFoveation=function(){if(!(h===null&&f===null))return l},this.setFoveation=function(ee){l=ee,h!==null&&(h.fixedFoveation=ee),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=ee)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(U)},this.getCameraTexture=function(ee){return g[ee]};let xe=null;function me(ee,le){if(u=le.getViewerPose(c||a),m=le,u!==null){let ge=u.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Pe=!1;ge.length!==U.cameras.length&&(U.cameras.length=0,Pe=!0);for(let Ke=0;Ke<ge.length;Ke++){let tt=ge[Ke],ft=null;if(f!==null)ft=f.getViewport(tt);else{let ot=d.getViewSubImage(h,tt);ft=ot.viewport,Ke===0&&(e.setRenderTargetTextures(y,ot.colorTexture,ot.depthStencilTexture),e.setRenderTarget(y))}let Oe=L[Ke];Oe===void 0&&(Oe=new on,Oe.layers.enable(Ke),Oe.viewport=new xt,L[Ke]=Oe),Oe.matrix.fromArray(tt.transform.matrix),Oe.matrix.decompose(Oe.position,Oe.quaternion,Oe.scale),Oe.projectionMatrix.fromArray(tt.projectionMatrix),Oe.projectionMatrixInverse.copy(Oe.projectionMatrix).invert(),Oe.viewport.set(ft.x,ft.y,ft.width,ft.height),Ke===0&&(U.matrix.copy(Oe.matrix),U.matrix.decompose(U.position,U.quaternion,U.scale)),Pe===!0&&U.cameras.push(Oe)}let ye=s.enabledFeatures;if(ye&&ye.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&v){d=i.getBinding();let Ke=d.getDepthInformation(ge[0]);Ke&&Ke.isValid&&Ke.texture&&p.init(Ke,s.renderState)}if(ye&&ye.includes("camera-access")&&v){e.state.unbindTexture(),d=i.getBinding();for(let Ke=0;Ke<ge.length;Ke++){let tt=ge[Ke].camera;if(tt){let ft=g[tt];ft||(ft=new ga,g[tt]=ft);let Oe=d.getCameraImage(tt);ft.sourceTexture=Oe}}}}for(let ge=0;ge<E.length;ge++){let Pe=b[ge],ye=E[ge];Pe!==null&&ye!==void 0&&ye.update(Pe,le,c||a)}xe&&xe(ee,le),le.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:le}),m=null}let _e=new fp;_e.setAnimationLoop(me),this.setAnimationLoop=function(ee){xe=ee},this.dispose=function(){}}},Iv=new _t,yp=new Ze;yp.set(-1,0,0,0,1,0,0,0,1);function Lv(n,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function i(p,g){g.color.getRGB(p.fogColor.value,lh(n)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,A,C,y){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),d(p,g)):g.isMeshPhongMaterial?(r(p,g),u(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),h(p,g),g.isMeshPhysicalMaterial&&f(p,g,y)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),v(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,A,C):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===Kt&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===Kt&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let A=e.get(g),C=A.envMap,y=A.envMapRotation;C&&(p.envMap.value=C,p.envMapRotation.value.setFromMatrix4(Iv.makeRotationFromEuler(y)).transpose(),C.isCubeTexture&&C.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(yp),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,A,C){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*A,p.scale.value=C*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function u(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function d(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function h(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,A){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===Kt&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=A.texture,p.transmissionSamplerSize.value.set(A.width,A.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function v(p,g){let A=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(A.matrixWorld),p.nearDistance.value=A.shadow.camera.near,p.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Dv(n,e,t,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,E){let b=E.program;i.uniformBlockBinding(y,b)}function c(y,E){let b=s[y.id];b===void 0&&(p(y),b=u(y),s[y.id]=b,y.addEventListener("dispose",A));let w=E.program;i.updateUBOMapping(y,w);let x=e.render.frame;r[y.id]!==x&&(h(y),r[y.id]=x)}function u(y){let E=d();y.__bindingPointIndex=E;let b=n.createBuffer(),w=y.__size,x=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,b),n.bufferData(n.UNIFORM_BUFFER,w,x),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,E,b),b}function d(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return Je("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(y){let E=s[y.id],b=y.uniforms,w=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,E);for(let x=0,T=b.length;x<T;x++){let R=b[x];if(Array.isArray(R))for(let I=0,L=R.length;I<L;I++)f(R[I],x,I,w);else f(R,x,0,w)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,E,b,w){if(v(y,E,b,w)===!0){let x=y.__offset,T=y.value;if(Array.isArray(T)){let R=0;for(let I=0;I<T.length;I++){let L=T[I],U=g(L);m(L,y.__data,R),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(R+=U.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(T,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,x,y.__data)}}function m(y,E,b){typeof y=="number"||typeof y=="boolean"?E[0]=y:y.isMatrix3?(E[0]=y.elements[0],E[1]=y.elements[1],E[2]=y.elements[2],E[3]=0,E[4]=y.elements[3],E[5]=y.elements[4],E[6]=y.elements[5],E[7]=0,E[8]=y.elements[6],E[9]=y.elements[7],E[10]=y.elements[8],E[11]=0):ArrayBuffer.isView(y)?E.set(new y.constructor(y.buffer,y.byteOffset,E.length)):y.toArray(E,b)}function v(y,E,b,w){let x=y.value,T=E+"_"+b;if(w[T]===void 0)return typeof x=="number"||typeof x=="boolean"?w[T]=x:ArrayBuffer.isView(x)?w[T]=x.slice():w[T]=x.clone(),!0;{let R=w[T];if(typeof x=="number"||typeof x=="boolean"){if(R!==x)return w[T]=x,!0}else{if(ArrayBuffer.isView(x))return!0;if(R.equals(x)===!1)return R.copy(x),!0}}return!1}function p(y){let E=y.uniforms,b=0,w=16;for(let T=0,R=E.length;T<R;T++){let I=Array.isArray(E[T])?E[T]:[E[T]];for(let L=0,U=I.length;L<U;L++){let N=I[L],G=Array.isArray(N.value)?N.value:[N.value];for(let q=0,Z=G.length;q<Z;q++){let ae=G[q],z=g(ae),V=b%w,j=V%z.boundary,Y=V+j;b+=j,Y!==0&&w-Y<z.storage&&(b+=w-Y),N.__data=new Float32Array(z.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=b,b+=z.storage}}}let x=b%w;return x>0&&(b+=w-x),y.__size=b,y.__cache={},this}function g(y){let E={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(E.boundary=4,E.storage=4):y.isVector2?(E.boundary=8,E.storage=8):y.isVector3||y.isColor?(E.boundary=16,E.storage=12):y.isVector4?(E.boundary=16,E.storage=16):y.isMatrix3?(E.boundary=48,E.storage=48):y.isMatrix4?(E.boundary=64,E.storage=64):y.isTexture?Ye("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(E.boundary=16,E.storage=y.byteLength):Ye("WebGLRenderer: Unsupported uniform value type.",y),E}function A(y){let E=y.target;E.removeEventListener("dispose",A);let b=a.indexOf(E.__bindingPointIndex);a.splice(b,1),n.deleteBuffer(s[E.id]),delete s[E.id],delete r[E.id]}function C(){for(let y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:C}}var Nv=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Zn=null;function Uv(){return Zn===null&&(Zn=new os(Nv,16,16,Xi,zn),Zn.name="DFG_LUT",Zn.minFilter=Rt,Zn.magFilter=Rt,Zn.wrapS=Cn,Zn.wrapT=Cn,Zn.generateMipmaps=!1,Zn.needsUpdate=!0),Zn}var dc=class{constructor(e={}){let{canvas:t=Bf(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1,outputBufferType:f=Qt}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;let v=f,p=new Set([Cl,Al,Tl]),g=new Set([Qt,Bn,or,lr,wl,El]),A=new Uint32Array(4),C=new Int32Array(4),y=new X,E=null,b=null,w=[],x=[],T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Fn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let R=this,I=!1,L=null,U=null,N=null,G=null;this._outputColorSpace=Ft;let q=0,Z=0,ae=null,z=-1,V=null,j=new xt,Y=new xt,re=null,xe=new $e(0),me=0,_e=t.width,ee=t.height,le=1,ge=null,Pe=null,ye=new xt(0,0,_e,ee),je=new xt(0,0,_e,ee),it=!1,Ke=new er,tt=!1,ft=!1,Oe=new _t,ot=new X,de=new xt,Qe={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},pt=!1;function dt(){return ae===null?le:1}let k=i;function mt(M,B){return t.getContext(M,B)}let at,S,_,D,F,J,he,pe,se,ue,Me,ke,Ee,ve,Be,Xe,et,H,we,oe,be,Te,fe;try{let M={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",Mt,!1),t.addEventListener("webglcontextrestored",ut,!1),t.addEventListener("webglcontextcreationerror",gn,!1),k===null){let B="webgl2";if(k=mt(B,M),k===null)throw mt(B)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}ze()}catch(M){throw t.removeEventListener("webglcontextlost",Mt,!1),t.removeEventListener("webglcontextrestored",ut,!1),t.removeEventListener("webglcontextcreationerror",gn,!1),Je("WebGLRenderer: "+M.message),M}function ze(){at=new Hx(k),at.init(),be=new Cv(k,at),S=new Lx(k,at,e,be),_=new Tv(k,at),S.reversedDepthBuffer&&h&&_.buffers.depth.setReversed(!0),U=k.createFramebuffer(),N=k.createFramebuffer(),G=k.createFramebuffer(),D=new Xx(k),F=new dv,J=new Av(k,at,_,F,S,be,D),he=new Vx(R),pe=new qg(k),Te=new Px(k,pe),se=new Gx(k,pe,D,Te),ue=new qx(k,se,pe,Te,D),H=new jx(k,S,J),Be=new Dx(F),Me=new hv(R,he,at,S,Te,Be),ke=new Lv(R,F),Ee=new pv,ve=new vv(at),et=new Rx(R,he,_,ue,m,l),Xe=new Ev(R,ue,S),fe=new Dv(k,D,S,_),we=new Ix(k,at,D),oe=new Wx(k,at,D),D.programs=Me.programs,R.capabilities=S,R.extensions=at,R.properties=F,R.renderLists=Ee,R.shadowMap=Xe,R.state=_,R.info=D}v!==Qt&&(T=new Jx(v,t.width,t.height,o,s,r));let Re=new Th(R,k);this.xr=Re,this.getContext=function(){return k},this.getContextAttributes=function(){return k.getContextAttributes()},this.forceContextLoss=function(){let M=at.get("WEBGL_lose_context");M&&M.loseContext()},this.forceContextRestore=function(){let M=at.get("WEBGL_lose_context");M&&M.restoreContext()},this.getPixelRatio=function(){return le},this.setPixelRatio=function(M){M!==void 0&&(le=M,this.setSize(_e,ee,!1))},this.getSize=function(M){return M.set(_e,ee)},this.setSize=function(M,B,te=!0){if(Re.isPresenting){Ye("WebGLRenderer: Can't change size while VR device is presenting.");return}_e=M,ee=B,t.width=Math.floor(M*le),t.height=Math.floor(B*le),te===!0&&(t.style.width=M+"px",t.style.height=B+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,M,B)},this.getDrawingBufferSize=function(M){return M.set(_e*le,ee*le).floor()},this.setDrawingBufferSize=function(M,B,te){_e=M,ee=B,le=te,t.width=Math.floor(M*te),t.height=Math.floor(B*te),this.setViewport(0,0,M,B)},this.setEffects=function(M){if(v===Qt){Je("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(M){for(let B=0;B<M.length;B++)if(M[B].isOutputPass===!0){Ye("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(M||[])},this.getCurrentViewport=function(M){return M.copy(j)},this.getViewport=function(M){return M.copy(ye)},this.setViewport=function(M,B,te,K){M.isVector4?ye.set(M.x,M.y,M.z,M.w):ye.set(M,B,te,K),_.viewport(j.copy(ye).multiplyScalar(le).round())},this.getScissor=function(M){return M.copy(je)},this.setScissor=function(M,B,te,K){M.isVector4?je.set(M.x,M.y,M.z,M.w):je.set(M,B,te,K),_.scissor(Y.copy(je).multiplyScalar(le).round())},this.getScissorTest=function(){return it},this.setScissorTest=function(M){_.setScissorTest(it=M)},this.setOpaqueSort=function(M){ge=M},this.setTransparentSort=function(M){Pe=M},this.getClearColor=function(M){return M.copy(et.getClearColor())},this.setClearColor=function(){et.setClearColor(...arguments)},this.getClearAlpha=function(){return et.getClearAlpha()},this.setClearAlpha=function(){et.setClearAlpha(...arguments)},this.clear=function(M=!0,B=!0,te=!0){let K=0;if(M){let Q=!1;if(ae!==null){let Ce=ae.texture.format;Q=p.has(Ce)}if(Q){let Ce=ae.texture.type,Le=g.has(Ce),Ae=et.getClearColor(),De=et.getClearAlpha(),Ve=Ae.r,st=Ae.g,lt=Ae.b;Le?(A[0]=Ve,A[1]=st,A[2]=lt,A[3]=De,k.clearBufferuiv(k.COLOR,0,A)):(C[0]=Ve,C[1]=st,C[2]=lt,C[3]=De,k.clearBufferiv(k.COLOR,0,C))}else K|=k.COLOR_BUFFER_BIT}B&&(K|=k.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),te&&(K|=k.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),K!==0&&k.clear(K)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(M){M.setRenderer(this),L=M},this.dispose=function(){t.removeEventListener("webglcontextlost",Mt,!1),t.removeEventListener("webglcontextrestored",ut,!1),t.removeEventListener("webglcontextcreationerror",gn,!1),et.dispose(),Ee.dispose(),ve.dispose(),F.dispose(),he.dispose(),ue.dispose(),Te.dispose(),fe.dispose(),Me.dispose(),Re.dispose(),Re.removeEventListener("sessionstart",Ja),Re.removeEventListener("sessionend",$a),un.stop()};function Mt(M){M.preventDefault(),oa("WebGLRenderer: Context Lost."),I=!0}function ut(){oa("WebGLRenderer: Context Restored."),I=!1;let M=D.autoReset,B=Xe.enabled,te=Xe.autoUpdate,K=Xe.needsUpdate,Q=Xe.type;ze(),D.autoReset=M,Xe.enabled=B,Xe.autoUpdate=te,Xe.needsUpdate=K,Xe.type=Q}function gn(M){Je("WebGLRenderer: A WebGL context could not be created. Reason: ",M.statusMessage)}function Nt(M){let B=M.target;B.removeEventListener("dispose",Nt),ja(B)}function ja(M){qa(M),F.remove(M)}function qa(M){let B=F.get(M).programs;B!==void 0&&(B.forEach(function(te){Me.releaseProgram(te)}),M.isShaderMaterial&&Me.releaseShaderCache(M))}this.renderBufferDirect=function(M,B,te,K,Q,Ce){B===null&&(B=Qe);let Le=Q.isMesh&&Q.matrixWorld.determinantAffine()<0,Ae=ht(M,B,te,K,Q);_.setMaterial(K,Le);let De=te.index,Ve=1;if(K.wireframe===!0){if(De=se.getWireframeAttribute(te),De===void 0)return;Ve=2}let st=te.drawRange,lt=te.attributes.position,Ne=st.start*Ve,yt=(st.start+st.count)*Ve;Ce!==null&&(Ne=Math.max(Ne,Ce.start*Ve),yt=Math.min(yt,(Ce.start+Ce.count)*Ve)),De!==null?(Ne=Math.max(Ne,0),yt=Math.min(yt,De.count)):lt!=null&&(Ne=Math.max(Ne,0),yt=Math.min(yt,lt.count));let kt=yt-Ne;if(kt<0||kt===1/0)return;Te.setup(Q,K,Ae,te,De);let Pt,Tt=we;if(De!==null&&(Pt=pe.get(De),Tt=oe,Tt.setIndex(Pt)),Q.isMesh)K.wireframe===!0?(_.setLineWidth(K.wireframeLinewidth*dt()),Tt.setMode(k.LINES)):Tt.setMode(k.TRIANGLES);else if(Q.isLine){let sn=K.linewidth;sn===void 0&&(sn=1),_.setLineWidth(sn*dt()),Q.isLineSegments?Tt.setMode(k.LINES):Q.isLineLoop?Tt.setMode(k.LINE_LOOP):Tt.setMode(k.LINE_STRIP)}else Q.isPoints?Tt.setMode(k.POINTS):Q.isSprite&&Tt.setMode(k.TRIANGLES);if(Q.isBatchedMesh)if(at.get("WEBGL_multi_draw"))Tt.renderMultiDraw(Q._multiDrawStarts,Q._multiDrawCounts,Q._multiDrawCount);else{let sn=Q._multiDrawStarts,Ie=Q._multiDrawCounts,hn=Q._multiDrawCount,gt=De?pe.get(De).bytesPerElement:1,En=F.get(K).currentProgram.getUniforms();for(let Vn=0;Vn<hn;Vn++)En.setValue(k,"_gl_DrawID",Vn),Tt.render(sn[Vn]/gt,Ie[Vn])}else if(Q.isInstancedMesh)Tt.renderInstances(Ne,kt,Q.count);else if(te.isInstancedBufferGeometry){let sn=te._maxInstanceCount!==void 0?te._maxInstanceCount:1/0,Ie=Math.min(te.instanceCount,sn);Tt.renderInstances(Ne,kt,Ie)}else Tt.render(Ne,kt)};function Ya(M,B,te,K){L!==null&&M.isNodeMaterial&&L.setObject(K,M),tt===!0&&Be.setState(M,te,!1),M.transparent===!0&&M.side===Jn&&M.forceSinglePass===!1?(M.side=Kt,M.needsUpdate=!0,ne(M,B,K),M.side=Hi,M.needsUpdate=!0,ne(M,B,K),M.side=Jn):ne(M,B,K)}this.compile=function(M,B,te=null){te===null&&(te=M),L!==null&&L.renderStart(M,B,te),b=ve.get(te),b.init(B),x.push(b),te.traverseVisible(function(Q){Q.isLight&&Q.layers.test(B.layers)&&(b.pushLight(Q),Q.castShadow&&b.pushShadow(Q))}),M!==te&&M.traverseVisible(function(Q){Q.isLight&&Q.layers.test(B.layers)&&(b.pushLight(Q),Q.castShadow&&b.pushShadow(Q))}),b.setupLights(),L!==null&&L.updateLights(b.state.lightsArray),ft=this.localClippingEnabled,tt=Be.init(this.clippingPlanes,ft),tt===!0&&Be.setGlobalState(this.clippingPlanes,B),L!==null&&Xe.render(b.state.shadowsArray,te,B);let K=new Set;return M.traverse(function(Q){if(!(Q.isMesh||Q.isPoints||Q.isLine||Q.isSprite))return;let Ce=Q.material;if(Ce)if(Array.isArray(Ce))for(let Le=0;Le<Ce.length;Le++){let Ae=Ce[Le];Ya(Ae,te,B,Q),K.add(Ae)}else Ya(Ce,te,B,Q),K.add(Ce)}),b=x.pop(),L!==null&&L.renderEnd(),K},this.compileAsync=function(M,B,te=null){let K=this.compile(M,B,te);return new Promise(Q=>{function Ce(){if(K.forEach(function(Le){let De=F.get(Le).currentProgram;(De===void 0||De.isReady())&&K.delete(Le)}),K.size===0){Q(M);return}setTimeout(Ce,10)}at.get("KHR_parallel_shader_compile")!==null?Ce():setTimeout(Ce,10)})};let yr=null;function Rc(M){yr&&yr(M)}function Ja(){un.stop()}function $a(){un.start()}let un=new fp;un.setAnimationLoop(Rc),typeof self<"u"&&un.setContext(self),this.setAnimationLoop=function(M){yr=M,Re.setAnimationLoop(M),M===null?un.stop():un.start()},Re.addEventListener("sessionstart",Ja),Re.addEventListener("sessionend",$a),this.render=function(M,B){if(B!==void 0&&B.isCamera!==!0){Je("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;L!==null&&L.renderStart(M,B);let te=Re.enabled===!0&&Re.isPresenting===!0,K=T!==null&&(ae===null||te)&&T.begin(R,ae);if(M.matrixWorldAutoUpdate===!0&&M.updateMatrixWorld(),B.parent===null&&B.matrixWorldAutoUpdate===!0&&B.updateMatrixWorld(),Re.enabled===!0&&Re.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(Re.cameraAutoUpdate===!0&&Re.updateCamera(B),B=Re.getCamera()),M.isScene===!0&&M.onBeforeRender(R,M,B,ae),b=ve.get(M,x.length),b.init(B),b.state.textureUnits=J.getTextureUnits(),x.push(b),Oe.multiplyMatrices(B.projectionMatrix,B.matrixWorldInverse),Ke.setFromProjectionMatrix(Oe,Nn,B.reversedDepth),ft=this.localClippingEnabled,tt=Be.init(this.clippingPlanes,ft),E=Ee.get(M,w.length),E.init(),w.push(E),Re.enabled===!0&&Re.isPresenting===!0){let Le=R.xr.getDepthSensingMesh();Le!==null&&P(Le,B,-1/0,R.sortObjects)}P(M,B,0,R.sortObjects),E.finish(),L!==null&&L.updateLights(b.state.lightsArray),R.sortObjects===!0&&E.sort(ge,Pe),pt=Re.enabled===!1||Re.isPresenting===!1||Re.hasDepthSensing()===!1,pt&&et.addToRenderList(E,M),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),tt===!0&&Be.beginShadows();let Q=b.state.shadowsArray;if(Xe.render(Q,M,B),tt===!0&&Be.endShadows(),(K&&T.hasRenderPass())===!1){let Le=E.opaque,Ae=E.transmissive;if(b.setupLights(),B.isArrayCamera){let De=B.cameras;if(Ae.length>0)for(let Ve=0,st=De.length;Ve<st;Ve++){let lt=De[Ve];W(Le,Ae,M,lt)}pt&&et.render(M);for(let Ve=0,st=De.length;Ve<st;Ve++){let lt=De[Ve];O(E,M,lt,lt.viewport)}}else Ae.length>0&&W(Le,Ae,M,B),pt&&et.render(M),O(E,M,B)}ae!==null&&Z===0&&(J.updateMultisampleRenderTarget(ae),J.updateRenderTargetMipmap(ae)),K&&T.end(R),M.isScene===!0&&M.onAfterRender(R,M,B),Te.resetDefaultState(),z=-1,V=null,x.pop(),x.length>0?(b=x[x.length-1],J.setTextureUnits(b.state.textureUnits),tt===!0&&Be.setGlobalState(R.clippingPlanes,b.state.camera)):b=null,w.pop(),w.length>0?E=w[w.length-1]:E=null,L!==null&&L.renderEnd()};function P(M,B,te,K){if(M.visible===!1)return;if(M.layers.test(B.layers)){if(M.isGroup)te=M.renderOrder;else if(M.isLOD)M.autoUpdate===!0&&M.update(B);else if(M.isLightProbeGrid)b.pushLightProbeGrid(M);else if(M.isLight)b.pushLight(M),M.castShadow&&b.pushShadow(M);else if(M.isSprite){if(!M.frustumCulled||M.intersectsFrustum(Ke)){K&&de.setFromMatrixPosition(M.matrixWorld).applyMatrix4(Oe);let Le=ue.update(M),Ae=M.material;Ae.visible&&E.push(M,Le,Ae,te,de.z,null,B)}}else if((M.isMesh||M.isLine||M.isPoints)&&(!M.frustumCulled||M.intersectsFrustum(Ke))){let Le=ue.update(M),Ae=M.material;if(K&&(M.boundingSphere!==void 0?(M.boundingSphere===null&&M.computeBoundingSphere(),de.copy(M.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),de.copy(Le.boundingSphere.center)),de.applyMatrix4(M.matrixWorld).applyMatrix4(Oe)),Array.isArray(Ae)){let De=Le.groups;for(let Ve=0,st=De.length;Ve<st;Ve++){let lt=De[Ve],Ne=Ae[lt.materialIndex];Ne&&Ne.visible&&E.push(M,Le,Ne,te,de.z,lt,B)}}else Ae.visible&&E.push(M,Le,Ae,te,de.z,null,B)}}let Ce=M.children;for(let Le=0,Ae=Ce.length;Le<Ae;Le++)P(Ce[Le],B,te,K)}function O(M,B,te,K){let{opaque:Q,transmissive:Ce,transparent:Le}=M;b.setupLightsView(te),tt===!0&&Be.setGlobalState(R.clippingPlanes,te),K&&_.viewport(j.copy(K)),Q.length>0&&ie(Q,B,te),Ce.length>0&&ie(Ce,B,te),Le.length>0&&ie(Le,B,te),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function W(M,B,te,K){if((te.isScene===!0?te.overrideMaterial:null)!==null)return;if(b.state.transmissionRenderTarget[K.id]===void 0){let Ne=at.has("EXT_color_buffer_half_float")||at.has("EXT_color_buffer_float");b.state.transmissionRenderTarget[K.id]=new vn(1,1,{generateMipmaps:!0,type:Ne?zn:Qt,minFilter:On,samples:Math.max(4,S.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:ct.workingColorSpace})}let Ce=b.state.transmissionRenderTarget[K.id],Le=K.viewport||j;Ce.setSize(Le.z*R.transmissionResolutionScale,Le.w*R.transmissionResolutionScale);let Ae=R.getRenderTarget(),De=R.getActiveCubeFace(),Ve=R.getActiveMipmapLevel();R.setRenderTarget(Ce),R.getClearColor(xe),me=R.getClearAlpha(),me<1&&R.setClearColor(16777215,.5),R.clear(),pt&&et.render(te);let st=R.toneMapping;R.toneMapping=Fn;let lt=K.viewport;if(K.viewport!==void 0&&(K.viewport=void 0),b.setupLightsView(K),tt===!0&&Be.setGlobalState(R.clippingPlanes,K),ie(M,te,K),J.updateMultisampleRenderTarget(Ce),J.updateRenderTargetMipmap(Ce),at.has("WEBGL_multisampled_render_to_texture")===!1){let Ne=!1;for(let yt=0,kt=B.length;yt<kt;yt++){let Pt=B[yt],{object:Tt,geometry:sn,material:Ie,group:hn}=Pt;if(Ie.side===Jn&&Tt.layers.test(K.layers)){let gt=Ie.side;Ie.side=Kt,Ie.needsUpdate=!0,$(Tt,te,K,sn,Ie,hn),Ie.side=gt,Ie.needsUpdate=!0,Ne=!0}}Ne===!0&&(J.updateMultisampleRenderTarget(Ce),J.updateRenderTargetMipmap(Ce))}R.setRenderTarget(Ae,De,Ve),R.setClearColor(xe,me),lt!==void 0&&(K.viewport=lt),R.toneMapping=st}function ie(M,B,te){let K=B.isScene===!0?B.overrideMaterial:null;for(let Q=0,Ce=M.length;Q<Ce;Q++){let Le=M[Q],{object:Ae,geometry:De,group:Ve}=Le,st=Le.material;st.allowOverride===!0&&K!==null&&(st=K),Ae.layers.test(te.layers)&&$(Ae,B,te,De,st,Ve)}}function $(M,B,te,K,Q,Ce){L!==null&&Q.isNodeMaterial&&L.setObject(M,Q),M.onBeforeRender(R,B,te,K,Q,Ce),M.modelViewMatrix.multiplyMatrices(te.matrixWorldInverse,M.matrixWorld),M.normalMatrix.getNormalMatrix(M.modelViewMatrix),Q.onBeforeRender(R,B,te,K,M,Ce),Q.transparent===!0&&Q.side===Jn&&Q.forceSinglePass===!1?(Q.side=Kt,Q.needsUpdate=!0,R.renderBufferDirect(te,B,K,Q,M,Ce),Q.side=Hi,Q.needsUpdate=!0,R.renderBufferDirect(te,B,K,Q,M,Ce),Q.side=Jn):R.renderBufferDirect(te,B,K,Q,M,Ce),M.onAfterRender(R,B,te,K,Q,Ce)}function ne(M,B,te){B.isScene!==!0&&(B=Qe);let K=F.get(M),Q=b.state.lights,Ce=b.state.shadowsArray,Le=Q.state.version,Ae=Me.getParameters(M,Q.state,Ce,B,te,b.state.lightProbeGridArray),De=Me.getProgramCacheKey(Ae),Ve=K.programs;K.environment=M.isMeshStandardMaterial||M.isMeshLambertMaterial||M.isMeshPhongMaterial?B.environment:null,K.fog=B.fog;let st=M.isMeshStandardMaterial||M.isMeshLambertMaterial&&!M.envMap||M.isMeshPhongMaterial&&!M.envMap;K.envMap=he.get(M.envMap||K.environment,st),K.envMapRotation=K.environment!==null&&M.envMap===null?B.environmentRotation:M.envMapRotation,Ve===void 0&&(M.addEventListener("dispose",Nt),Ve=new Map,K.programs=Ve);let lt=Ve.get(De);if(lt!==void 0){if(K.currentProgram===lt&&K.lightsStateVersion===Le)return Ge(M,Ae),lt}else Ae.uniforms=Me.getUniforms(M),L!==null&&M.isNodeMaterial&&L.build(M,te,Ae),M.onBeforeCompile(Ae,R),lt=Me.acquireProgram(Ae,De),Ve.set(De,lt),K.uniforms=Ae.uniforms;let Ne=K.uniforms;return(!M.isShaderMaterial&&!M.isRawShaderMaterial||M.clipping===!0)&&(Ne.clippingPlanes=Be.uniform),Ge(M,Ae),K.needsLights=Xt(M),K.lightsStateVersion=Le,K.needsLights&&(Ne.ambientLightColor.value=Q.state.ambient,Ne.lightProbe.value=Q.state.probe,Ne.sunLights.value=Q.state.sun,Ne.sunLightShadows.value=Q.state.sunShadow,Ne.directionalLights.value=Q.state.directional,Ne.directionalLightShadows.value=Q.state.directionalShadow,Ne.spotLights.value=Q.state.spot,Ne.spotLightShadows.value=Q.state.spotShadow,Ne.rectAreaLights.value=Q.state.rectArea,Ne.ltc_1.value=Q.state.rectAreaLTC1,Ne.ltc_2.value=Q.state.rectAreaLTC2,Ne.pointLights.value=Q.state.point,Ne.pointLightShadows.value=Q.state.pointShadow,Ne.hemisphereLights.value=Q.state.hemi,Ne.sunShadowMatrix.value=Q.state.sunShadowMatrix,Ne.sunShadowCascade.value=Q.state.sunShadowCascade,Ne.directionalShadowMatrix.value=Q.state.directionalShadowMatrix,Ne.spotLightMatrix.value=Q.state.spotLightMatrix,Ne.spotLightMap.value=Q.state.spotLightMap,Ne.pointShadowMatrix.value=Q.state.pointShadowMatrix),K.lightProbeGrid=b.state.lightProbeGridArray.length>0,K.currentProgram=lt,K.uniformsList=null,lt}function Ue(M){if(M.uniformsList===null){let B=M.currentProgram.getUniforms();M.uniformsList=hr.seqWithValue(B.seq,M.uniforms)}return M.uniformsList}function Ge(M,B){let te=F.get(M);te.outputColorSpace=B.outputColorSpace,te.batching=B.batching,te.batchingColor=B.batchingColor,te.instancing=B.instancing,te.instancingColor=B.instancingColor,te.instancingMorph=B.instancingMorph,te.skinning=B.skinning,te.morphTargets=B.morphTargets,te.morphNormals=B.morphNormals,te.morphColors=B.morphColors,te.morphTargetsCount=B.morphTargetsCount,te.numClippingPlanes=B.numClippingPlanes,te.numIntersection=B.numClipIntersection,te.vertexAlphas=B.vertexAlphas,te.vertexTangents=B.vertexTangents,te.toneMapping=B.toneMapping}function qe(M,B){if(M.length===0)return null;if(M.length===1)return M[0].texture!==null?M[0]:null;y.setFromMatrixPosition(B.matrixWorld);for(let te=0,K=M.length;te<K;te++){let Q=M[te];if(Q.texture!==null&&Q.boundingBox.containsPoint(y))return Q}return null}function ht(M,B,te,K,Q){B.isScene!==!0&&(B=Qe),J.resetTextureUnits();let Ce=B.fog,Le=K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial?B.environment:null,Ae=ae===null?R.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:ct.workingColorSpace,De=K.isMeshStandardMaterial||K.isMeshLambertMaterial&&!K.envMap||K.isMeshPhongMaterial&&!K.envMap,Ve=he.get(K.envMap||Le,De),st=K.vertexColors===!0&&!!te.attributes.color&&te.attributes.color.itemSize===4,lt=!!te.attributes.tangent&&(!!K.normalMap||K.anisotropy>0),Ne=!!te.morphAttributes.position,yt=!!te.morphAttributes.normal,kt=!!te.morphAttributes.color,Pt=Fn;K.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Pt=R.toneMapping);let Tt=te.morphAttributes.position||te.morphAttributes.normal||te.morphAttributes.color,sn=Tt!==void 0?Tt.length:0,Ie=F.get(K),hn=b.state.lights;if(tt===!0&&(ft===!0||M!==V)){let Ct=M===V&&K.id===z;Be.setState(K,M,Ct)}let gt=!1;K.version===Ie.__version?(Ie.needsLights&&Ie.lightsStateVersion!==hn.state.version||Ie.outputColorSpace!==Ae||Q.isBatchedMesh&&Ie.batching===!1||!Q.isBatchedMesh&&Ie.batching===!0||Q.isBatchedMesh&&Ie.batchingColor===!0&&Q._colorsTexture===null||Q.isBatchedMesh&&Ie.batchingColor===!1&&Q._colorsTexture!==null||Q.isInstancedMesh&&Ie.instancing===!1||!Q.isInstancedMesh&&Ie.instancing===!0||Q.isSkinnedMesh&&Ie.skinning===!1||!Q.isSkinnedMesh&&Ie.skinning===!0||Q.isInstancedMesh&&Ie.instancingColor===!0&&Q.instanceColor===null||Q.isInstancedMesh&&Ie.instancingColor===!1&&Q.instanceColor!==null||Q.isInstancedMesh&&Ie.instancingMorph===!0&&Q.morphTexture===null||Q.isInstancedMesh&&Ie.instancingMorph===!1&&Q.morphTexture!==null||Ie.envMap!==Ve||K.fog===!0&&Ie.fog!==Ce||Ie.numClippingPlanes!==void 0&&(Ie.numClippingPlanes!==Be.numPlanes||Ie.numIntersection!==Be.numIntersection)||Ie.vertexAlphas!==st||Ie.vertexTangents!==lt||Ie.morphTargets!==Ne||Ie.morphNormals!==yt||Ie.morphColors!==kt||Ie.toneMapping!==Pt||Ie.morphTargetsCount!==sn||!!Ie.lightProbeGrid!=b.state.lightProbeGridArray.length>0)&&(gt=!0):(gt=!0,Ie.__version=K.version);let En=Ie.currentProgram;gt===!0&&(En=ne(K,B,Q),L&&K.isNodeMaterial&&L.onUpdateProgram(K,En,Ie));let Vn=!1,yi=!1,ms=!1,wt=En.getUniforms(),Ut=Ie.uniforms;if(_.useProgram(En.program)&&(Vn=!0,yi=!0,ms=!0),K.id!==z&&(z=K.id,yi=!0),Ie.needsLights){let Ct=qe(b.state.lightProbeGridArray,Q);Ie.lightProbeGrid!==Ct&&(Ie.lightProbeGrid=Ct,yi=!0)}if(Vn||V!==M){_.buffers.depth.getReversed()&&M.reversedDepth!==!0&&(M._reversedDepth=!0,M.updateProjectionMatrix()),wt.setValue(k,"projectionMatrix",M.projectionMatrix),wt.setValue(k,"viewMatrix",M.matrixWorldInverse);let bi=wt.map.cameraPosition;bi!==void 0&&bi.setValue(k,ot.setFromMatrixPosition(M.matrixWorld)),S.logarithmicDepthBuffer&&wt.setValue(k,"logDepthBufFC",2/(Math.log(M.far+1)/Math.LN2)),(K.isMeshPhongMaterial||K.isMeshToonMaterial||K.isMeshLambertMaterial||K.isMeshBasicMaterial||K.isMeshStandardMaterial||K.isShaderMaterial)&&wt.setValue(k,"isOrthographic",M.isOrthographicCamera===!0),V!==M&&(V=M,yi=!0,ms=!0)}if(Ie.needsLights&&(hn.state.sunShadowMap.length>0&&wt.setValue(k,"sunShadowMap",hn.state.sunShadowMap,J),hn.state.directionalShadowMap.length>0&&wt.setValue(k,"directionalShadowMap",hn.state.directionalShadowMap,J),hn.state.spotShadowMap.length>0&&wt.setValue(k,"spotShadowMap",hn.state.spotShadowMap,J),hn.state.pointShadowMap.length>0&&wt.setValue(k,"pointShadowMap",hn.state.pointShadowMap,J)),Q.isSkinnedMesh){wt.setOptional(k,Q,"bindMatrix"),wt.setOptional(k,Q,"bindMatrixInverse");let Ct=Q.skeleton;Ct&&(Ct.boneTexture===null&&Ct.computeBoneTexture(),wt.setValue(k,"boneTexture",Ct.boneTexture,J))}Q.isBatchedMesh&&(wt.setOptional(k,Q,"batchingTexture"),wt.setValue(k,"batchingTexture",Q._matricesTexture,J),wt.setOptional(k,Q,"batchingIdTexture"),wt.setValue(k,"batchingIdTexture",Q._indirectTexture,J),wt.setOptional(k,Q,"batchingColorTexture"),Q._colorsTexture!==null&&wt.setValue(k,"batchingColorTexture",Q._colorsTexture,J));let vi=te.morphAttributes;if((vi.position!==void 0||vi.normal!==void 0||vi.color!==void 0)&&H.update(Q,te,En),(yi||Ie.receiveShadow!==Q.receiveShadow)&&(Ie.receiveShadow=Q.receiveShadow,wt.setValue(k,"receiveShadow",Q.receiveShadow)),(K.isMeshStandardMaterial||K.isMeshLambertMaterial||K.isMeshPhongMaterial)&&K.envMap===null&&B.environment!==null&&(Ut.envMapIntensity.value=B.environmentIntensity),Ut.dfgLUT!==void 0&&(Ut.dfgLUT.value=Uv()),yi){if(wt.setValue(k,"toneMappingExposure",R.toneMappingExposure),Ie.needsLights&&Et(Ut,ms),Ce&&K.fog===!0&&ke.refreshFogUniforms(Ut,Ce),ke.refreshMaterialUniforms(Ut,K,le,ee,b.state.transmissionRenderTarget[M.id]),Ie.needsLights&&Ie.lightProbeGrid){let Ct=Ie.lightProbeGrid;Ut.probesSH.value=Ct.texture,Ut.probesMin.value.copy(Ct.boundingBox.min),Ut.probesMax.value.copy(Ct.boundingBox.max),Ut.probesResolution.value.copy(Ct.resolution)}hr.upload(k,Ue(Ie),Ut,J)}if(K.isShaderMaterial&&K.uniformsNeedUpdate===!0&&(hr.upload(k,Ue(Ie),Ut,J),K.uniformsNeedUpdate=!1),K.isSpriteMaterial&&wt.setValue(k,"center",Q.center),wt.setValue(k,"modelViewMatrix",Q.modelViewMatrix),wt.setValue(k,"normalMatrix",Q.normalMatrix),wt.setValue(k,"modelMatrix",Q.matrixWorld),K.uniformsGroups!==void 0){let Ct=K.uniformsGroups;for(let bi=0,gs=Ct.length;bi<gs;bi++){let kh=Ct[bi];fe.update(kh,En),fe.bind(kh,En)}}return En}function Et(M,B){M.ambientLightColor.needsUpdate=B,M.lightProbe.needsUpdate=B,M.sunLights.needsUpdate=B,M.sunLightShadows.needsUpdate=B,M.directionalLights.needsUpdate=B,M.directionalLightShadows.needsUpdate=B,M.pointLights.needsUpdate=B,M.pointLightShadows.needsUpdate=B,M.spotLights.needsUpdate=B,M.spotLightShadows.needsUpdate=B,M.rectAreaLights.needsUpdate=B,M.hemisphereLights.needsUpdate=B}function Xt(M){return M.isMeshLambertMaterial||M.isMeshToonMaterial||M.isMeshPhongMaterial||M.isMeshStandardMaterial||M.isShadowMaterial||M.isShaderMaterial&&M.lights===!0}this.getActiveCubeFace=function(){return q},this.getActiveMipmapLevel=function(){return Z},this.getRenderTarget=function(){return ae},this.setRenderTargetTextures=function(M,B,te){let K=F.get(M);K.__autoAllocateDepthBuffer=M.resolveDepthBuffer===!1,K.__autoAllocateDepthBuffer===!1&&(K.__useRenderToTexture=!1),F.get(M.texture).__webglTexture=B,F.get(M.depthTexture).__webglTexture=K.__autoAllocateDepthBuffer?void 0:te,K.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(M,B){let te=F.get(M);te.__webglFramebuffer=B,te.__useDefaultFramebuffer=B===void 0},this.setRenderTarget=function(M,B=0,te=0){ae=M,q=B,Z=te;let K=null,Q=!1,Ce=!1;if(M){let Ae=F.get(M);if(Ae.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(k.FRAMEBUFFER,Ae.__webglFramebuffer),j.copy(M.viewport),Y.copy(M.scissor),re=M.scissorTest,_.viewport(j),_.scissor(Y),_.setScissorTest(re),z=-1;return}else if(Ae.__webglFramebuffer===void 0)J.setupRenderTarget(M);else if(Ae.__hasExternalTextures)J.rebindTextures(M,F.get(M.texture).__webglTexture,F.get(M.depthTexture).__webglTexture);else if(M.depthBuffer){let st=M.depthTexture;if(Ae.__boundDepthTexture!==st){if(st!==null&&F.has(st)&&(M.width!==st.image.width||M.height!==st.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");J.setupDepthRenderbuffer(M)}}let De=M.texture;(De.isData3DTexture||De.isDataArrayTexture||De.isCompressedArrayTexture)&&(Ce=!0);let Ve=F.get(M).__webglFramebuffer;M.isWebGLCubeRenderTarget?(Array.isArray(Ve[B])?K=Ve[B][te]:K=Ve[B],Q=!0):M.samples>0&&J.useMultisampledRTT(M)===!1?K=F.get(M).__webglMultisampledFramebuffer:Array.isArray(Ve)?K=Ve[te]:K=Ve,j.copy(M.viewport),Y.copy(M.scissor),re=M.scissorTest}else j.copy(ye).multiplyScalar(le).floor(),Y.copy(je).multiplyScalar(le).floor(),re=it;if(te!==0&&(K=U),_.bindFramebuffer(k.FRAMEBUFFER,K)&&_.drawBuffers(M,K),_.viewport(j),_.scissor(Y),_.setScissorTest(re),Q){let Ae=F.get(M.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_CUBE_MAP_POSITIVE_X+B,Ae.__webglTexture,te)}else if(Ce){let Ae=B;for(let De=0;De<M.textures.length;De++){let Ve=F.get(M.textures[De]);k.framebufferTextureLayer(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0+De,Ve.__webglTexture,te,Ae)}}else if(M!==null&&te!==0){let Ae=F.get(M.texture);k.framebufferTexture2D(k.FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ae.__webglTexture,te)}z=-1};function _n(M){let B=F.get(M);return(B.__readFormat!==M.format||B.__readType!==M.type)&&(B.__readFormat=M.format,B.__readType=M.type,B.__formatReadable=S.textureFormatReadable(M.format),B.__typeReadable=S.textureTypeReadable(M.type)),B}this.readRenderTargetPixels=function(M,B,te,K,Q,Ce,Le,Ae=0){if(!(M&&M.isWebGLRenderTarget)){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let De=F.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Le!==void 0&&(De=De[Le]),De){_.bindFramebuffer(k.FRAMEBUFFER,De);try{let Ve=M.textures[Ae],st=Ve.format,lt=Ve.type;M.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Ae);let Ne=_n(Ve);if(Ne.__formatReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ne.__typeReadable===!1){Je("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}B>=0&&B<=M.width-K&&te>=0&&te<=M.height-Q&&k.readPixels(B,te,K,Q,be.convert(st),be.convert(lt),Ce)}finally{let Ve=ae!==null?F.get(ae).__webglFramebuffer:null;_.bindFramebuffer(k.FRAMEBUFFER,Ve)}}},this.readRenderTargetPixelsAsync=async function(M,B,te,K,Q,Ce,Le,Ae=0){if(!(M&&M.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let De=F.get(M).__webglFramebuffer;if(M.isWebGLCubeRenderTarget&&Le!==void 0&&(De=De[Le]),De)if(B>=0&&B<=M.width-K&&te>=0&&te<=M.height-Q){_.bindFramebuffer(k.FRAMEBUFFER,De);let Ve=M.textures[Ae],st=Ve.format,lt=Ve.type;M.textures.length>1&&k.readBuffer(k.COLOR_ATTACHMENT0+Ae);let Ne=_n(Ve);if(Ne.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ne.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let yt=k.createBuffer();k.bindBuffer(k.PIXEL_PACK_BUFFER,yt),k.bufferData(k.PIXEL_PACK_BUFFER,Ce.byteLength,k.STREAM_READ),k.readPixels(B,te,K,Q,be.convert(st),be.convert(lt),0),k.bindBuffer(k.PIXEL_PACK_BUFFER,null);let kt=ae!==null?F.get(ae).__webglFramebuffer:null;_.bindFramebuffer(k.FRAMEBUFFER,kt);let Pt=k.fenceSync(k.SYNC_GPU_COMMANDS_COMPLETE,0);return k.flush(),await zf(k,Pt,4),k.bindBuffer(k.PIXEL_PACK_BUFFER,yt),k.getBufferSubData(k.PIXEL_PACK_BUFFER,0,Ce),k.bindBuffer(k.PIXEL_PACK_BUFFER,null),k.deleteBuffer(yt),k.deleteSync(Pt),Ce}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(M,B=null,te=0){let K=Math.pow(2,-te),Q=Math.floor(M.image.width*K),Ce=Math.floor(M.image.height*K),Le=B!==null?B.x:0,Ae=B!==null?B.y:0;J.setTexture2D(M,0),k.copyTexSubImage2D(k.TEXTURE_2D,te,0,0,Le,Ae,Q,Ce),_.unbindTexture()},this.copyTextureToTexture=function(M,B,te=null,K=null,Q=0,Ce=0){let Le,Ae,De,Ve,st,lt,Ne,yt,kt,Pt=M.isCompressedTexture?M.mipmaps[Ce]:M.image;if(te!==null)Le=te.max.x-te.min.x,Ae=te.max.y-te.min.y,De=te.isBox3?te.max.z-te.min.z:1,Ve=te.min.x,st=te.min.y,lt=te.isBox3?te.min.z:0;else{let Ut=Math.pow(2,-Q);Le=Math.floor(Pt.width*Ut),Ae=Math.floor(Pt.height*Ut),M.isDataArrayTexture?De=Pt.depth:M.isData3DTexture?De=Math.floor(Pt.depth*Ut):De=1,Ve=0,st=0,lt=0}K!==null?(Ne=K.x,yt=K.y,kt=K.z):(Ne=0,yt=0,kt=0);let Tt=be.convert(B.format),sn=be.convert(B.type),Ie;B.isData3DTexture?(J.setTexture3D(B,0),Ie=k.TEXTURE_3D):B.isDataArrayTexture||B.isCompressedArrayTexture?(J.setTexture2DArray(B,0),Ie=k.TEXTURE_2D_ARRAY):(J.setTexture2D(B,0),Ie=k.TEXTURE_2D),_.activeTexture(k.TEXTURE0),_.pixelStorei(k.UNPACK_FLIP_Y_WEBGL,B.flipY),_.pixelStorei(k.UNPACK_PREMULTIPLY_ALPHA_WEBGL,B.premultiplyAlpha),_.pixelStorei(k.UNPACK_ALIGNMENT,B.unpackAlignment);let hn=_.getParameter(k.UNPACK_ROW_LENGTH),gt=_.getParameter(k.UNPACK_IMAGE_HEIGHT),En=_.getParameter(k.UNPACK_SKIP_PIXELS),Vn=_.getParameter(k.UNPACK_SKIP_ROWS),yi=_.getParameter(k.UNPACK_SKIP_IMAGES);_.pixelStorei(k.UNPACK_ROW_LENGTH,Pt.width),_.pixelStorei(k.UNPACK_IMAGE_HEIGHT,Pt.height),_.pixelStorei(k.UNPACK_SKIP_PIXELS,Ve),_.pixelStorei(k.UNPACK_SKIP_ROWS,st),_.pixelStorei(k.UNPACK_SKIP_IMAGES,lt);let ms=M.isDataArrayTexture||M.isData3DTexture,wt=B.isDataArrayTexture||B.isData3DTexture;if(M.isDepthTexture){let Ut=F.get(M),vi=F.get(B),Ct=F.get(Ut.__renderTarget),bi=F.get(vi.__renderTarget);_.bindFramebuffer(k.READ_FRAMEBUFFER,Ct.__webglFramebuffer),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,bi.__webglFramebuffer);for(let gs=0;gs<De;gs++)ms&&(k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,F.get(M).__webglTexture,Q,lt+gs),k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,F.get(B).__webglTexture,Ce,kt+gs)),k.blitFramebuffer(Ve,st,Le,Ae,Ne,yt,Le,Ae,k.DEPTH_BUFFER_BIT,k.NEAREST);_.bindFramebuffer(k.READ_FRAMEBUFFER,null),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else if(Q!==0||M.isRenderTargetTexture||F.has(M)){let Ut=F.get(M),vi=F.get(B);_.bindFramebuffer(k.READ_FRAMEBUFFER,N),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,G);for(let Ct=0;Ct<De;Ct++)ms?k.framebufferTextureLayer(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,Ut.__webglTexture,Q,lt+Ct):k.framebufferTexture2D(k.READ_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,Ut.__webglTexture,Q),wt?k.framebufferTextureLayer(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,vi.__webglTexture,Ce,kt+Ct):k.framebufferTexture2D(k.DRAW_FRAMEBUFFER,k.COLOR_ATTACHMENT0,k.TEXTURE_2D,vi.__webglTexture,Ce),Q!==0?k.blitFramebuffer(Ve,st,Le,Ae,Ne,yt,Le,Ae,k.COLOR_BUFFER_BIT,k.NEAREST):wt?k.copyTexSubImage3D(Ie,Ce,Ne,yt,kt+Ct,Ve,st,Le,Ae):k.copyTexSubImage2D(Ie,Ce,Ne,yt,Ve,st,Le,Ae);_.bindFramebuffer(k.READ_FRAMEBUFFER,null),_.bindFramebuffer(k.DRAW_FRAMEBUFFER,null)}else wt?M.isDataTexture||M.isData3DTexture?k.texSubImage3D(Ie,Ce,Ne,yt,kt,Le,Ae,De,Tt,sn,Pt.data):B.isCompressedArrayTexture?k.compressedTexSubImage3D(Ie,Ce,Ne,yt,kt,Le,Ae,De,Tt,Pt.data):k.texSubImage3D(Ie,Ce,Ne,yt,kt,Le,Ae,De,Tt,sn,Pt):M.isDataTexture?k.texSubImage2D(k.TEXTURE_2D,Ce,Ne,yt,Le,Ae,Tt,sn,Pt.data):M.isCompressedTexture?k.compressedTexSubImage2D(k.TEXTURE_2D,Ce,Ne,yt,Pt.width,Pt.height,Tt,Pt.data):k.texSubImage2D(k.TEXTURE_2D,Ce,Ne,yt,Le,Ae,Tt,sn,Pt);_.pixelStorei(k.UNPACK_ROW_LENGTH,hn),_.pixelStorei(k.UNPACK_IMAGE_HEIGHT,gt),_.pixelStorei(k.UNPACK_SKIP_PIXELS,En),_.pixelStorei(k.UNPACK_SKIP_ROWS,Vn),_.pixelStorei(k.UNPACK_SKIP_IMAGES,yi),Ce===0&&B.generateMipmaps&&k.generateMipmap(Ie),_.unbindTexture()},this.initRenderTarget=function(M){F.get(M).__webglFramebuffer===void 0&&J.setupRenderTarget(M)},this.initTexture=function(M){M.isCubeTexture?J.setTextureCube(M,0):M.isData3DTexture?J.setTexture3D(M,0):M.isDataArrayTexture||M.isCompressedArrayTexture?J.setTexture2DArray(M,0):J.setTexture2D(M,0),_.unbindTexture()},this.resetState=function(){q=0,Z=0,ae=null,_.reset(),Te.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Nn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=ct._getDrawingBufferColorSpace(e),t.unpackColorSpace=ct._getUnpackColorSpace()}};var mc=class extends qt{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new We(.5,.5),this.rotation2D=0,this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this.rotation2D=e.rotation2D,this}},fr=new X,vp=new _t,bp=new _t,Sp=new X,Mp=new X,gc=class{constructor(e={}){let t=this,i,s,r,a,o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.sortObjects=!0,this.getSize=function(){return{width:i,height:s}},this.render=function(m,v){m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),v.parent===null&&v.matrixWorldAutoUpdate===!0&&v.updateMatrixWorld(),vp.copy(v.matrixWorldInverse),bp.multiplyMatrices(v.projectionMatrix,vp),u(m,m,v),this.sortObjects&&f(m)},this.setSize=function(m,v){i=m,s=v,r=i/2,a=s/2,l.style.width=m+"px",l.style.height=v+"px"};function c(m){m.isCSS2DObject&&(m.element.style.display="none");for(let v=0,p=m.children.length;v<p;v++)c(m.children[v])}function u(m,v,p){if(m.visible===!1){c(m);return}if(m.isCSS2DObject){fr.setFromMatrixPosition(m.matrixWorld),fr.applyMatrix4(bp);let g=fr.z>=-1&&fr.z<=1&&m.layers.test(p.layers)===!0,A=m.element;if(A.style.display=g===!0?"":"none",g===!0){m.onBeforeRender(t,v,p);let y=100*m.center.x,E=100*m.center.y;A.style.transformOrigin=`${y}% ${E}%`;let b=-m.rotation2D,w=fr.x*r+r,x=-fr.y*a+a;A.style.transform=`translate(${-y}%, ${-E}%) translate(${w}px, ${x}px) rotate(${b}rad)`,A.parentNode!==l&&l.appendChild(A),m.onAfterRender(t,v,p)}let C={distanceToCameraSquared:d(p,m)};o.objects.set(m,C)}for(let g=0,A=m.children.length;g<A;g++)u(m.children[g],v,p)}function d(m,v){return Sp.setFromMatrixPosition(m.matrixWorld),Mp.setFromMatrixPosition(v.matrixWorld),Sp.distanceToSquared(Mp)}function h(m){let v=[];return m.traverseVisible(function(p){p.isCSS2DObject&&v.push(p)}),v}function f(m){let v=h(m).sort(function(g,A){if(g.renderOrder!==A.renderOrder)return A.renderOrder-g.renderOrder;let C=o.objects.get(g).distanceToCameraSquared,y=o.objects.get(A).distanceToCameraSquared;return C-y}),p=v.length;for(let g=0,A=v.length;g<A;g++)v[g].element.style.zIndex=p-g}}};var wp=new Mn,_c=new X,pr=class extends Ea{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new jt(e,3)),this.setAttribute("uv",new jt(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new Yn(t,6,1);return this.setAttribute("instanceStart",new ln(i,3,0)),this.setAttribute("instanceEnd",new ln(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new Yn(t,6,1);return this.setAttribute("instanceColorStart",new ln(i,3,0)),this.setAttribute("instanceColorEnd",new ln(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new xa(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Mn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),wp.setFromBufferAttribute(t),this.boundingBox.union(wp))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Un),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)_c.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(_c)),_c.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(_c));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};Se.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new We},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};mn.line={uniforms:Fa.merge([Se.common,Se.fog,Se.line]),vertexShader:`
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
		`};var mr=class extends Lt{constructor(e){super({type:"LineMaterial",uniforms:Fa.clone(mn.line.uniforms),vertexShader:mn.line.vertexShader,fragmentShader:mn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var Ch=new xt,Ep=new X,Tp=new X,en=new xt,tn=new xt,Kn=new xt,Rh=new X,Ph=new _t,nn=new Ta,Ap=new X,xc=new Mn,yc=new Un,Qn=new xt,ei,fs;function Cp(n,e,t){return Qn.set(0,0,-e,1).applyMatrix4(n.projectionMatrix),Qn.multiplyScalar(1/Qn.w),Qn.x=fs/t.width,Qn.y=fs/t.height,Qn.applyMatrix4(n.projectionMatrixInverse),Qn.multiplyScalar(1/Qn.w),Math.abs(Math.max(Qn.x,Qn.y))}function Fv(n,e){let t=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,a=Math.min(i.instanceCount,s.count);for(let o=0,l=a;o<l;o++){nn.start.fromBufferAttribute(s,o),nn.end.fromBufferAttribute(r,o),nn.applyMatrix4(t);let c=new X,u=new X;ei.distanceSqToSegment(nn.start,nn.end,u,c),u.distanceTo(c)<fs*.5&&e.push({point:u,pointOnLine:c,distance:ei.origin.distanceTo(u),object:n,face:null,faceIndex:o,uv:null,uv1:null})}}function Ov(n,e,t){let i=e.projectionMatrix,r=n.material.resolution,a=n.matrixWorld,o=n.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,u=Math.min(o.instanceCount,l.count),d=-e.near;ei.at(1,Kn),Kn.w=1,Kn.applyMatrix4(e.matrixWorldInverse),Kn.applyMatrix4(i),Kn.multiplyScalar(1/Kn.w),Kn.x*=r.x/2,Kn.y*=r.y/2,Kn.z=0,Rh.copy(Kn),Ph.multiplyMatrices(e.matrixWorldInverse,a);for(let h=0,f=u;h<f;h++){if(en.fromBufferAttribute(l,h),tn.fromBufferAttribute(c,h),en.w=1,tn.w=1,en.applyMatrix4(Ph),tn.applyMatrix4(Ph),en.z>d&&tn.z>d)continue;if(en.z>d){let C=en.z-tn.z,y=(en.z-d)/C;en.lerp(tn,y)}else if(tn.z>d){let C=tn.z-en.z,y=(tn.z-d)/C;tn.lerp(en,y)}en.applyMatrix4(i),tn.applyMatrix4(i),en.multiplyScalar(1/en.w),tn.multiplyScalar(1/tn.w),en.x*=r.x/2,en.y*=r.y/2,tn.x*=r.x/2,tn.y*=r.y/2,nn.start.copy(en),nn.start.z=0,nn.end.copy(tn),nn.end.z=0;let v=nn.closestPointToPointParameter(Rh,!0);nn.at(v,Ap);let p=oh.lerp(en.z,tn.z,v),g=p>=-1&&p<=1,A=Rh.distanceTo(Ap)<fs*.5;if(g&&A){nn.start.fromBufferAttribute(l,h),nn.end.fromBufferAttribute(c,h),nn.start.applyMatrix4(a),nn.end.applyMatrix4(a);let C=new X,y=new X;ei.distanceSqToSegment(nn.start,nn.end,y,C),t.push({point:y,pointOnLine:C,distance:ei.origin.distanceTo(y),object:n,face:null,faceIndex:h,uv:null,uv1:null})}}}var vc=class extends Wt{constructor(e=new pr,t=new mr({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)Ep.fromBufferAttribute(t,a),Tp.fromBufferAttribute(i,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+Ep.distanceTo(Tp);let r=new Yn(s,2,1);return e.setAttribute("instanceDistanceStart",new ln(r,1,0)),e.setAttribute("instanceDistanceEnd",new ln(r,1,1)),this}raycast(e,t){let i=this.material.worldUnits,s=e.camera;if(s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),i===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;ei=e.ray;let a=this.matrixWorld,o=this.geometry,l=this.material;fs=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),yc.copy(o.boundingSphere).applyMatrix4(a);let c;if(i)c=fs*.5;else{let d=Math.max(s.near,yc.distanceToPoint(ei.origin));c=Cp(s,d,l.resolution)}if(yc.radius+=c,ei.intersectsSphere(yc)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),xc.copy(o.boundingBox).applyMatrix4(a);let u;if(i)u=fs*.5;else{let d=Math.max(s.near,xc.distanceToPoint(ei.origin));u=Cp(s,d,l.resolution)}xc.expandByScalar(u),ei.intersectsBox(xc)!==!1&&(i?Fv(this,t):Ov(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Ch),this.material.uniforms.resolution.value.set(Ch.z,Ch.w))}};var ps=n=>typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:120}):setTimeout(()=>n({timeRemaining:()=>8,didTimeout:!0}),16),Rp=n=>typeof cancelIdleCallback=="function"?cancelIdleCallback(n):clearTimeout(n);function Ih(n){return n.repeat.set(1,-1),n.offset.set(0,1),n.userData.topDown=!0,n}function Pp(n,e,t={}){let i=e.width,s=e.height,r=t.mipmaps!==!1,a=t.rows||256,o=r?Math.floor(Math.log2(Math.max(i,s)))+1:1,l=T=>[Math.max(1,i>>T),Math.max(1,s>>T)],c=new os(null,i,s,pn,Qt);c.colorSpace=t.colorSpace??Ft,c.flipY=!1,c.premultiplyAlpha=!1,c.unpackAlignment=4,c.generateMipmaps=!1,c.magFilter=Rt,c.minFilter=r?On:Rt,r&&(c.mipmaps=Array.from({length:o},(T,R)=>({data:null,width:l(R)[0],height:l(R)[1]}))),c.anisotropy=t.anisotropy??1,t.wrapS&&(c.wrapS=t.wrapS),Ih(c),c.source.dataReady=!1,c.needsUpdate=!0;let u={w:i,h:s,levels:o,chunks:[],blits:[],fence_waits:0,done:!1,cancelled:!1,t0:performance.now(),t_done:null,alloc_ms:null},d=n.getContext(),h=null,f=null,m=!1,v=null,p=null,g=new Ot,A=[];for(let T=0;T<s;T+=a)A.push({kind:"upload",level:0,y0:T,y1:Math.min(s,T+a)});for(let T=1;T<o;T++){let[R,I]=l(T),L=Math.max(1,Math.floor(a*i/R/2));for(let U=0;U<I;U+=L)A.push({kind:"blit",level:T,y0:U,y1:Math.min(I,U+L)})}let C=new sr(new We,new We),y=new We;function E(T){let R=n.properties.get(c).__webglTexture,[I,L]=l(T.level-1),[U,N]=l(T.level),G=Math.round(T.y0*L/N),q=Math.round(T.y1*L/N);v=v||d.createFramebuffer(),p=p||d.createFramebuffer(),d.bindFramebuffer(d.READ_FRAMEBUFFER,v),d.framebufferTexture2D(d.READ_FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,R,T.level-1),d.bindFramebuffer(d.DRAW_FRAMEBUFFER,p),d.framebufferTexture2D(d.DRAW_FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,R,T.level),d.blitFramebuffer(0,G,I,q,0,T.y0,U,T.y1,d.COLOR_BUFFER_BIT,d.LINEAR),d.framebufferTexture2D(d.READ_FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,null,0),d.framebufferTexture2D(d.DRAW_FRAMEBUFFER,d.COLOR_ATTACHMENT0,d.TEXTURE_2D,null,0),d.bindFramebuffer(d.READ_FRAMEBUFFER,null),d.bindFramebuffer(d.DRAW_FRAMEBUFFER,null),n.resetState()}function b(){h&&(d.deleteSync(h),h=null),v&&(d.deleteFramebuffer(v),v=null),p&&(d.deleteFramebuffer(p),p=null)}let w=new Promise((T,R)=>{let I=async()=>{if(f=null,!m)try{if(u.alloc_ms===null){let N=performance.now();n.initTexture(c),u.alloc_ms=performance.now()-N,f=ps(I);return}if(h){if(d.getSyncParameter(h,d.SYNC_STATUS)!==d.SIGNALED){u.fence_waits++,f=ps(I);return}d.deleteSync(h),h=null}if(!A.length){b(),u.done=!0,u.t_done=performance.now(),T(c);return}let L=A.shift(),U=performance.now();if(L.kind==="upload"){let N=await createImageBitmap(e,0,L.y0,i,L.y1-L.y0);if(m){N.close&&N.close();return}let G=performance.now();g.image=N,y.set(0,L.y0),n.copyTextureToTexture(g,c,null,y,0,0),N.close&&N.close(),u.chunks.push({level:0,rows:L.y1-L.y0,at:U,crop_ms:G-U,ms:performance.now()-G})}else E(L),u.blits.push({level:L.level,rows:L.y1-L.y0,at:U,ms:performance.now()-U});h=d.fenceSync(d.SYNC_GPU_COMMANDS_COMPLETE,0),d.flush(),f=ps(I)}catch(L){b(),R(L)}};f=ps(I)});function x(){u.done||m||(m=!0,u.cancelled=!0,f!==null&&Rp(f),b(),c.dispose())}return{texture:c,promise:w,cancel:x,state:u}}function Ip(n,e,t={}){let i=e.width,s=e.height,r=t.nx||4,a=t.ny||2,o=t.border??8,l=i/r,c=s/a,u=l+2*o,d=c+2*o,h=t.mipmaps!==!1,f=t.rows||256,m=h?Math.floor(Math.log2(Math.max(u,d)))+1:1,v=z=>[Math.max(1,u>>z),Math.max(1,d>>z)],p=n.getContext(),g=[],A={isTiled:!0,tiles:g,nx:r,ny:a,cw:l,ch:c,border:o,size:[u,d],image:{width:i,height:s},levels:m,bytes:r*a*u*d*4*(h?4/3:1),dispose(){for(let z of g)z.dispose()}},C={w:i,h:s,nx:r,ny:a,levels:m,chunks:[],blits:[],allocs:[],fence_waits:0,done:!1,cancelled:!1,t0:performance.now(),t_done:null},y=null,E=null,b=!1,w=null,x=null,T=new Ot,R=new sr(new We,new We),I=new We,L=[],U=(z,V)=>{let j=[],Y=0,re=(z%i+i)%i,xe=V;for(;xe>0;){let me=Math.min(xe,i-re);j.push([re,me,Y]),Y+=me,xe-=me,re=0}return j};for(let z=0;z<a;z++)for(let V=0;V<r;V++){let j=z*r+V;L.push({kind:"alloc",ti:j});let Y=U(V*l-o,u);for(let re=0;re<d;){let xe=z*c-o+re;if(xe<0||xe>=s){L.push({kind:"upload",ti:j,sy:xe<0?0:s-1,h:1,dy:re,sx:Y}),re++;continue}let me=Math.min(f,d-re,s-xe);L.push({kind:"upload",ti:j,sy:xe,h:me,dy:re,sx:Y}),re+=me}for(let re=1;re<m;re++){let[xe,me]=v(re),_e=Math.max(1,Math.floor(f*u/xe/2));for(let ee=0;ee<me;ee+=_e)L.push({kind:"blit",ti:j,level:re,y0:ee,y1:Math.min(me,ee+_e)})}}function N(){let z=new os(null,u,d,pn,Qt);return z.colorSpace=t.colorSpace??Ft,z.flipY=!1,z.premultiplyAlpha=!1,z.unpackAlignment=4,z.generateMipmaps=!1,z.magFilter=Rt,z.minFilter=h?On:Rt,z.wrapS=z.wrapT=Cn,h&&(z.mipmaps=Array.from({length:m},(V,j)=>({data:null,width:v(j)[0],height:v(j)[1]}))),z.anisotropy=t.anisotropy??1,z.source.dataReady=!1,z.needsUpdate=!0,z}function G(z){let V=n.properties.get(g[z.ti]).__webglTexture,[j,Y]=v(z.level-1),[re,xe]=v(z.level),me=Math.round(z.y0*Y/xe),_e=Math.round(z.y1*Y/xe);w=w||p.createFramebuffer(),x=x||p.createFramebuffer(),p.bindFramebuffer(p.READ_FRAMEBUFFER,w),p.framebufferTexture2D(p.READ_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,V,z.level-1),p.bindFramebuffer(p.DRAW_FRAMEBUFFER,x),p.framebufferTexture2D(p.DRAW_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,V,z.level),p.blitFramebuffer(0,me,j,_e,0,z.y0,re,z.y1,p.COLOR_BUFFER_BIT,p.LINEAR),p.framebufferTexture2D(p.READ_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,null,0),p.framebufferTexture2D(p.DRAW_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,null,0),p.bindFramebuffer(p.READ_FRAMEBUFFER,null),p.bindFramebuffer(p.DRAW_FRAMEBUFFER,null),n.resetState()}function q(){y&&(p.deleteSync(y),y=null),w&&(p.deleteFramebuffer(w),w=null),x&&(p.deleteFramebuffer(x),x=null)}let Z=new Promise((z,V)=>{let j=()=>{if(E=null,!b)try{if(y){if(p.getSyncParameter(y,p.SYNC_STATUS)!==p.SIGNALED){C.fence_waits++,E=ps(j);return}p.deleteSync(y),y=null}if(!L.length){q(),C.done=!0,C.t_done=performance.now(),z(A);return}let Y=L.shift(),re=performance.now();if(Y.kind==="alloc"){let xe=N();g[Y.ti]=xe,n.initTexture(xe),C.allocs.push({ti:Y.ti,at:re,ms:performance.now()-re})}else if(Y.kind==="upload"){T.image=e;for(let[xe,me,_e]of Y.sx)R.min.set(xe,Y.sy),R.max.set(xe+me,Y.sy+Y.h),I.set(_e,Y.dy),n.copyTextureToTexture(T,g[Y.ti],R,I,0,0);C.chunks.push({ti:Y.ti,rows:Y.h,at:re,ms:performance.now()-re})}else G(Y),C.blits.push({ti:Y.ti,level:Y.level,at:re,ms:performance.now()-re});y=p.fenceSync(p.SYNC_GPU_COMMANDS_COMPLETE,0),p.flush(),E=ps(j)}catch(Y){q(),V(Y)}};E=ps(j)});function ae(){C.done||b||(b=!0,C.cancelled=!0,E!==null&&Rp(E),q(),A.dispose())}return{texture:A,promise:Z,cancel:ae,state:C}}function za(n,e=!1){let t=s=>e?`textureLod(${s}, q, 0.0)`:`textureGrad(${s}, q, gx, gy)`,i=[0,1,2,3,4,5,6,7].map(s=>`${s?"else ":""}if (i == ${s}) c = ${t(n+"T"+s)};`).join(" ");return[...[0,1,2,3,4,5,6,7].map(s=>`uniform sampler2D ${n}T${s};`),`uniform float ${n}Tiled; uniform vec4 ${n}Geo;`,`vec4 ${n}_pick(int i, vec2 q, vec2 gx, vec2 gy) { vec4 c = vec4(0.0); ${i} return c; }`,`vec4 ${n}_sample(vec2 uv) {`,"  vec2 gx = dFdx(uv), gy = dFdy(uv);",`  if (${n}Tiled < 0.5) { vec2 q = uv; return ${t(n+"T0")}; }`,`  vec2 n = ${n}Geo.xy; float C = ${n}Geo.z, B = ${n}Geo.w, s = C / (C + 2.0 * B);`,"  vec2 g = uv * n; vec2 ip = floor(g); vec2 f = g - ip;","  ip.x = mod(ip.x, n.x); if (ip.y > n.y - 1.0) { ip.y = n.y - 1.0; f.y = 1.0; } if (ip.y < 0.0) { ip.y = 0.0; f.y = 0.0; }","  vec2 q = (B + f * C) / (C + 2.0 * B);",`  return ${n}_pick(int(ip.y * n.x + ip.x), q, gx * n * s, gy * n * s);`,"}"].join(`
`)}function Va(n){let e={[n+"Tiled"]:{value:0},[n+"Geo"]:{value:new xt(4,2,2048,8)}};for(let t=0;t<8;t++)e[n+"T"+t]={value:null};return e}function bc(n,e,t){if(t&&t.isTiled){for(let i=0;i<8;i++)n[e+"T"+i].value=t.tiles[i]||null;n[e+"Tiled"].value=1,n[e+"Geo"].value.set(t.nx,t.ny,t.cw,t.border)}else{n[e+"T0"].value=t;for(let i=1;i<8;i++)n[e+"T"+i].value=null;n[e+"Tiled"].value=0}}var gr=[{pr:2,family:!0,glow:!0,hiTex:!0},{pr:1.5,family:!0,glow:!0,hiTex:!0},{pr:1,family:!0,glow:!0,hiTex:!1},{pr:1,family:!1,glow:!1,hiTex:!1}],Bv=50;function kv(){let n=document.createElement("canvas");n.width=n.height=64;let e=n.getContext("2d");e.fillStyle="#fff",e.beginPath(),e.arc(32,32,30,0,Math.PI*2),e.fill();let t=new tr(n);return t.colorSpace=Ft,t}function zv(){let n=document.createElement("canvas");n.width=n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.18,"rgba(255,255,255,0.55)"),t.addColorStop(.45,"rgba(255,255,255,0.12)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128);let i=new tr(n);return i.colorSpace=Ft,i}var Vv=2e5;function Lh(){try{return window.matchMedia("(pointer: coarse)").matches&&!window.matchMedia("(pointer: fine)").matches||window.innerWidth<768}catch{return!1}}function Lp(n,e,t,i){let s=t.constants,r=s.length_unit_km,a=i.scene,o=a.colors,l=new dc({canvas:n,antialias:!0,logarithmicDepthBuffer:!0}),u=Lh()?1.5:2,d={level:0,auto:!navigator.webdriver,log:[],deviceCap:u},h=()=>Math.min(window.devicePixelRatio||1,u,gr[d.level].pr);l.setPixelRatio(h());let f=new gc({element:e}),m=new Ks,v=new Ks;v.background=new $e(a.background),l.autoClear=!1;let p=new on(45,1,1e-4,1e11);p.up.set(0,0,1),m.add(new wa(16777215,.06));let g=new Ma(16777215,2.2);m.add(g,g.target);let A=kv(),C=zv(),y={t:t.tStart,s:0,sTarget:0,precision:"relative",paused:!1,cam:{target:"L2",dist:32e5,az:-1.2,el:.9},fly:null},E=[],b={},w={bary:[0,0,0]},x={},T=null,R=[],I={nightlights:!0,sunglow:!0},L=!1,U=[];function N(P,O,W,ie,$={}){let ne={name:P,layer:O,obj:W,src:ie,kind:$.kind||"line",poly:!!$.poly,label:$.label||null,labelAt:$.labelAt,priority:$.priority||0,pick:$.pick||null,radius:$.radius,minPx:$.minPx,glow:$.glow};return ne.work=new Float64Array(ie.length),(ne.kind==="sky"?v:m).add(W),ne.label&&(ne.labelObj=new mc(ne.label),ne.labelObj.center.set(-.08,.5),m.add(ne.labelObj),ne.label.style.display="none",e.appendChild(ne.label)),E.push(ne),ne}function G(P,O,W,ie=1,$=null){let ne=new pr;ne.setPositions(new Float32Array(P*6)),$&&ne.setColors($);let Ue=new mr({color:$?16777215:O,vertexColors:!!$,linewidth:W,transparent:ie<1,opacity:ie,depthWrite:ie>=1});R.push(Ue);let Ge=new vc(ne,Ue);return Ge.frustumCulled=!1,Ge}function q(P,O,W){let ie=new Gt;return ie.setAttribute("position",new Ht(new Float32Array(P*3),3)),new Oi(ie,new ls({color:O,size:W,sizeAttenuation:!1,map:A,alphaTest:.5,transparent:!0}))}let Z=P=>{let O=new Float64Array(P.length);for(let W=0;W<P.length;W++)O[W]=P[W]*r;return O};function ae(P,O,W,ie,$,ne={}){let Ue=ne.hidden?0:ne.size||a.points.lpt,Ge=N(P,O,q(1,ie,Ue),Z(W),{kind:"point",label:$,priority:ne.priority,pick:ne.pick||P});if(ne.hidden?(Ge.obj.material.opacity=0,Ge.obj.material.alphaTest=0):Ge.baseSize=Ue,ne.glowPx){let qe=new Oi(new Gt,new ls({color:ie,size:ne.glowPx,sizeAttenuation:!1,map:C,transparent:!0,blending:gi,depthWrite:!1,opacity:.85}));qe.geometry.setAttribute("position",new Ht(new Float32Array(3),3)),N(P+"_glow",O,qe,Ge.src,{kind:"point"}).baseSize=ne.glowPx}return b[P]=Ge,w[P]=Ge.src,Ge}function z(P,O){let W=O.length/3-1,ie=new Float32Array(2*W),$=0;for(let Ge=0;Ge<W;Ge++){let qe=3*Ge;ie[2*Ge]=$,$+=Math.hypot(O[qe+3]-O[qe],O[qe+4]-O[qe+1],O[qe+5]-O[qe+2]),ie[2*Ge+1]=$}let ne=new Yn(ie,2,1);P.geometry.setAttribute("instanceDistanceStart",new ln(ne,1,0)),P.geometry.setAttribute("instanceDistanceEnd",new ln(ne,1,1));let Ue=P.material;Ue.dashed=!0,Ue.dashSize=a.lines.dashPx??7,Ue.gapSize=a.lines.gapPx??5,Ue.needsUpdate=!0,Ue.userData.dashMaxKm=$,U.push(Ue)}function V(P,O,W,ie,$=a.lines.traj,ne=1,Ue={}){let Ge=W.length/3-1,qe=null;if(Ue.fade){let Et=new $e(ie),Xt=new $e(a.background),_n=new $e;qe=new Float32Array(Ge*6);for(let M=0;M<Ge;M++)for(let[B,te]of[[0,M/Ge],[3,(M+1)/Ge]])_n.copy(Xt).lerp(Et,te**1.6),qe[M*6+B]=_n.r,qe[M*6+B+1]=_n.g,qe[M*6+B+2]=_n.b}let ht=N(P,O,G(Ge,ie,$,ne,qe),Z(W),{poly:!0});return Ue.dashed&&z(ht.obj,ht.src),ht}function j(P,O,W,ie,$=a.lines.traj,ne=1){return N(P,O,G(W.length/6,ie,$,ne),Z(W))}function Y(P,O,W,ie,$=a.points.burn){return N(P,O,q(W.length/3,ie,$),Z(W),{kind:"point"})}function re(P,O,W,ie,$={}){let ne=N(P,O,q(1,16777215,0),Z(W),{kind:"label",label:ie,priority:$.priority,pick:$.pick});return ne.obj.material.opacity=0,ne.obj.material.alphaTest=0,$.pick&&(w[$.pick]=w[$.pick]||ne.src),ne}let xe=new mi(1,20,14),me=1e8,_e=null,ee=0;function le(P,O,W,ie,$,ne={}){let Ue=ne.surface?ye($,ne.surface):ne.limb?Pe($):ne.emissive?new Fi({color:$}):new ya({color:$}),Ge=new Wt(new mi(1,64,40),Ue),qe=null;ne.glow&&(qe=new fa(new Qs({map:C,color:$,blending:gi,depthWrite:!1,transparent:!0,opacity:a.glow.strength})),qe.scale.setScalar(2*ne.glow),Ge.add(qe));let ht=null;ne.atmosphere&&(ht=new Wt(new mi(1.06,64,40),ge(ne.atmosphere)),Ge.add(ht));let Et=N(P,O,Ge,W.src,{kind:"sphere",radius:ie,minPx:ne.minPx||5,glow:ne.glow,pick:ne.pick||P});if(Et.glowObj=qe,Et.atmoObj=ht,Et.surface=ne.surface||null,Et.exaggeration=1,Et.capFrac=ne.capFrac||0,Et.capFloorDev=ne.capFloorDev||0,ne.dot){let Xt=new Wt(xe,new Fi({color:new $e($).lerp(new $e(16777215),.2),depthTest:!1,depthWrite:!1,transparent:!0}));Xt.renderOrder=20+ne.dot,Xt.scale.setScalar(1.03),Xt.visible=!1,Ge.add(Xt),Et.dotObj=Xt}return P==="Sun_sphere"&&(_e=Et),Et}function ge(P){return new Lt({uniforms:{color:{value:new $e(P)},strength:{value:a.glow.atmosphere??.9},sunDir:{value:new X(1,0,0)},sunOn:{value:0}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec3 vN; varying vec3 vV; varying vec3 vNW;","void main() {","  vec4 mv = modelViewMatrix * vec4(position, 1.0);","  vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vNW = normalize(mat3(modelMatrix) * normal);","  gl_Position = projectionMatrix * mv;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>","uniform vec3 color; uniform float strength; uniform vec3 sunDir; uniform float sunOn; varying vec3 vN; varying vec3 vV; varying vec3 vNW;","void main() {","#include <logdepthbuf_fragment>","  float f = pow(1.0 - max(dot(normalize(vN), normalize(vV)), 0.0), 2.6) * strength;","  f *= mix(1.0, 0.18 + 0.82 * smoothstep(-0.35, 0.25, dot(normalize(vNW), sunDir)), sunOn);","  gl_FragColor = vec4(color * f, f);","}"].join(`
`),blending:gi,transparent:!0,depthWrite:!1})}function Pe(P){let O=a.sunLimb||{};return new Lt({uniforms:{base:{value:new $e(P)},u:{value:new X(...O.u??[.5,.6,.72])}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec3 vN; varying vec3 vV;","void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);","  gl_Position = projectionMatrix * mv;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>","uniform vec3 base; uniform vec3 u; varying vec3 vN; varying vec3 vV;","void main() {","#include <logdepthbuf_fragment>","  float mu = clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0);","  gl_FragColor = vec4(base * (vec3(1.0) - u * (1.0 - mu)), 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`)})}function ye(P,O){let W=a.surface||{};return new Lt({uniforms:{...Va("map"),...Va("night"),mapOn:{value:0},nightMapOn:{value:0},base:{value:new $e(P)},sunDir:{value:new X(1,0,0)},sun:{value:W.sun??(O==="earth"?1.3:1.6)},ambient:{value:W.ambient??.004},night:{value:O==="earth"?W.night??1:0},nightOn:{value:1}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec2 vUv; varying vec3 vNW;","void main() { vUv = uv; vNW = normalize(mat3(modelMatrix) * normal);","  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",za("map"),za("night"),"uniform float mapOn; uniform float nightMapOn; uniform vec3 base;","uniform vec3 sunDir; uniform float sun; uniform float ambient; uniform float night; uniform float nightOn; varying vec2 vUv; varying vec3 vNW;","void main() {","#include <logdepthbuf_fragment>","  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);","  vec4 dayS = map_sample(uv); vec4 nightS = night_sample(uv);","  vec3 day = mapOn > 0.5 ? dayS.rgb : base;","  float ndl = dot(normalize(vNW), sunDir);","  vec3 c = day * (max(ndl, 0.0) * sun + ambient);","  if (night > 0.0 && nightMapOn > 0.5 && nightOn > 0.5) {","    vec3 n = nightS.rgb; float lum = dot(n, vec3(0.2126, 0.7152, 0.0722));","    c += n * (0.12 + 0.88 * smoothstep(0.05, 0.30, lum)) * night * (1.0 - smoothstep(-0.1, 0.1, ndl));","  }","  gl_FragColor = vec4(c, 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`)})}let je=6,it={grid:null,axes:[],key:"",gridStep:0};function Ke(){let P=(2*je+1)*2;it.grid=N("grid","aux",G(P,a.colors.grid??2766160,a.lines.grid??1,a.lines.gridOpacity??.5),new Float64Array(P*6),{});let O=a.colors.axes??[12611696,7385200,7377104];it.axes=["x","y","z"].map((W,ie)=>N("axes_"+W,"aux",G(1,O[ie],a.lines.axes??1.6),new Float64Array(6),{}));for(let W of[it.grid,...it.axes])W.on=!1,W.obj.visible=!1}function tt(){if(!it.grid)return;let P=pt(),O=y.cam.dist;if(it.grid.obj.visible){let W=10**Math.floor(Math.log10(O/3)),ie=Math.round(P[0]/W)*W,$=Math.round(P[1]/W)*W,ne=P[2],Ue=`${W}|${ie}|${$}|${ne}`;if(Ue!==it.key){it.key=Ue;let Ge=it.grid.src,qe=je*W,ht=0;for(let Et=-je;Et<=je;Et++)Ge.set([ie+Et*W,$-qe,ne,ie+Et*W,$+qe,ne],ht),ht+=6,Ge.set([ie-qe,$+Et*W,ne,ie+qe,$+Et*W,ne],ht),ht+=6;it.gridStep=W}}if(it.axes[0].obj.visible){let W=O*.12;it.axes.forEach((ie,$)=>{ie.src.set([P[0],P[1],P[2],P[0]+($===0)*W,P[1]+($===1)*W,P[2]+($===2)*W])})}}function ft(){let P=y.cam.dist;for(let O of E){if(!O.labelObj||!O.labelObj.visible)continue;let W=O.labelObj.position,ie=y.precision==="relative"?Math.hypot(W.x,W.y,W.z):Math.hypot(W.x-Oe[0],W.y-Oe[1],W.z-Oe[2]),$=Math.log10(Math.max(ie/P,.001)),ne=Math.min(1.08,Math.max(.84,1-.16*$)),Ue=Math.min(1,Math.max(.62,1-.3*$)),Ge=ne.toFixed(2),qe=Ue.toFixed(2);O._lk!==Ge&&(O.label.style.setProperty("--lbl-k",Ge),O._lk=Ge),O._lo!==qe&&(O.label.style.opacity=qe,O._lo=qe)}}let Oe=[0,0,0],ot=P=>t.thetaOffset+Ji((P-t.thetaEpoch)/86400,de());function de(){return s.time_unit_days}let Qe=()=>y.s*ot(y.t);function pt(){return y.fly?y.fly.pos:w[y.cam.target]||[0,0,0]}function dt(){let P=Qe(),O=Yi(pt(),ot(y.t),y.s),{dist:W,az:ie,el:$}=y.cam,ne=[Math.cos($)*Math.cos(ie),Math.cos($)*Math.sin(ie),Math.sin($)];return Oe[0]=O[0]+W*ne[0],Oe[1]=O[1]+W*ne[1],Oe[2]=O[2]+W*ne[2],{a:P,tg:O}}let k=0,mt=()=>{let P=Math.tan(p.fov*Math.PI/360);return Math.min(P,P*(n.clientWidth/Math.max(n.clientHeight,1)))},at=P=>P*k/mt(),S=()=>k?Math.max(2e9,at(1.5)):2e9,_=y;function D(P,O,W,ie){_.precision==="relative"?(W[ie]=P[O]-Oe[0],W[ie+1]=P[O+1]-Oe[1],W[ie+2]=P[O+2]-Oe[2]):(W[ie]=P[O],W[ie+1]=P[O+1],W[ie+2]=P[O+2])}let F=1,J=1,he=new Float64Array(3),pe=new _t,se=new _t().makeRotationX(Math.PI/2);function ue(P){let O=t.frameF,W=Math.cos(P),ie=Math.sin(P);if(O){let Ge=[O.x,O.y,O.z];return[[0,1,2].map(qe=>W*Ge[0][qe]-ie*Ge[1][qe]),[0,1,2].map(qe=>ie*Ge[0][qe]+W*Ge[1][qe]),[...Ge[2]]]}let $=P-ot(y.t),ne=Math.cos($),Ue=Math.sin($);return[[ne,-Ue,0],[Ue,ne,0],[0,0,1]]}function Me(P,O){let W;try{W=P.orientFn(y.t)}catch{return}let ie=ue(O),$=Ei(ie,W);pe.set($[0][0],$[0][1],$[0][2],0,$[1][0],$[1][1],$[1][2],0,$[2][0],$[2][1],$[2][2],0,0,0,0,1).multiply(se),P.obj.quaternion.setFromRotationMatrix(pe),P.orientNow=$}function ke(P,O){let W=br(P.src,O,P.work);if(P.kind==="sphere"){let ie=[0,0,0];D(W,0,ie,0),P.obj.position.set(ie[0],ie[1],ie[2]);let $=Math.hypot(W[0]-Oe[0],W[1]-Oe[1],W[2]-Oe[2]),ne=$/F,Ue=P.minPx*ne,Ge=Ue;if(!L&&P.capFrac&&ee){let ht=P.capFrac*ee;Ge>ht&&(Ge=Math.min(Ue,Math.max(ht,P.capFloorDev/l.getPixelRatio()*ne)))}let qe=L?P.radius:Math.max(P.radius,Ge);if(P.exaggeration=qe/P.radius,P.camDist=$,P.obj.scale.setScalar(qe),P.orientFn)Me(P,O);else if(P.faceTo&&b[P.faceTo]){let ht=br(b[P.faceTo].src,O,new Float64Array(3));P.obj.rotation.set(Math.PI/2,0,Math.atan2(ht[1]-W[1],ht[0]-W[0]),"ZYX")}if(P.surface||P.atmoObj){let ht=b.Sun?br(b.Sun.src,O,he):null;if(ht){let Et=ht[0]-W[0],Xt=ht[1]-W[1],_n=ht[2]-W[2],M=Math.hypot(Et,Xt,_n)||1;P.surface&&P.obj.material.uniforms.sunDir.value.set(Et/M,Xt/M,_n/M),P.atmoObj&&(P.atmoObj.material.uniforms.sunDir.value.set(Et/M,Xt/M,_n/M),P.atmoObj.material.uniforms.sunOn.value=P.surface?1:0)}}if(P.glowObj&&(P.glowObj.visible=gr[d.level].glow&&!(P.name==="Sun_sphere"&&I.sunglow===!1)),P.atmoObj&&(P.atmoObj.visible=gr[d.level].glow),P.glowObj&&P.name==="Sun_sphere"){let ht=qe/Math.max(P.radius,Ue);P.glowObj.scale.setScalar(2*(1+(P.glow-1)*ht)),P.glowObj.material.opacity=a.glow.strength*(.4+.6*ht)}if(P.dotObj){let ht=!L&&P.exaggeration>1&&$>me&&(!_e||_e.exaggeration>1);P.dotObj.visible=ht,ht&&P.glowObj&&(P.glowObj.visible=!1),ht&&P.atmoObj&&(P.atmoObj.visible=!1)}return}if(P.baseSize&&(P.obj.material.size=P.baseSize*J),P.obj.isLineSegments2){let ie=P.obj.geometry.attributes.instanceStart.data,$=ie.array;if(P.poly)for(let ne=0,Ue=0;ne+3<W.length;ne+=3,Ue+=6)D(W,ne,$,Ue),D(W,ne+3,$,Ue+3);else for(let ne=0;ne<W.length;ne+=3)D(W,ne,$,ne);ie.needsUpdate=!0}else{let ie=P.obj.geometry.attributes.position;for(let $=0;$<W.length;$+=3)D(W,$,ie.array,$);ie.needsUpdate=!0,P.obj.geometry.computeBoundingSphere()}if(P.labelObj){let ie=P.labelAt===void 0?0:P.labelAt*3,$=[0,0,0];D(W,ie,$,0),P.labelObj.position.set($[0],$[1],$[2])}}function Ee(){let P=x[y.fly?y.fly.to:y.cam.target]||null;if(P!==T){T=P;for(let O of E)O.zoom&&(O.obj.visible=ut(O),O.labelObj&&(O.labelObj.visible=O.on!==!1&&O.zoom===T));for(let O of ve)O(T)}}let ve=[];function Be(){Ee(),t.onTime&&t.onTime(y.t,un);let{a:P,tg:O}=dt();F=Math.max(n.clientHeight,1)/(2*Math.tan(p.fov*Math.PI/360)),J=Math.min(1,Math.max(.18,r*F/y.cam.dist/120)),tt();for(let ne of U){ne.dashScale=F/y.cam.dist;let Ue=ne.dashScale*ne.userData.dashMaxKm<=Vv;ne.dashed!==Ue&&(ne.dashed=Ue,ne.needsUpdate=!0)}for(let ne of E)ne.kind!=="sky"&&(ne.obj.visible||ne.labelObj)&&ke(ne,P);ft(),y.precision==="relative"?(p.position.set(0,0,0),p.lookAt(O[0]-Oe[0],O[1]-Oe[1],O[2]-Oe[2])):(p.position.set(Oe[0],Oe[1],Oe[2]),p.lookAt(O[0],O[1],O[2]));let ie=b.Sun?Yi(b.Sun.src,ot(y.t),y.s):[0,0,0];g.position.set(ie[0]-O[0],ie[1]-O[1],ie[2]-O[2]).normalize(),g.target.position.set(0,0,0);let $=Math.max(y.cam.dist*1e-4,.001);p.near!==$&&(p.near=$,p.updateProjectionMatrix());for(let ne of E)ne.kind==="sky"&&ne.obj.visible&&(ne.obj.position.copy(p.position),ne.obj.rotation.set(0,0,P-ot(y.t)),ne.frame&&ne.frame(un,P-ot(y.t)))}function Xe(P){if(!P||P.hidden)return null;let O=getComputedStyle(P);if(O.display==="none"||O.visibility==="hidden"||Number(O.opacity)<.05)return null;let W=P.getBoundingClientRect();return W.width>0&&W.height>0?W:null}let et=(P,O)=>P.left<O.right&&O.left<P.right&&P.top<O.bottom&&O.top<P.bottom;function H(){let P=[...document.querySelectorAll("[data-obstacle]")].map(Xe).filter(Boolean),O=E.filter(ne=>ne.label&&ne.labelObj&&ne.labelObj.visible&&ne.label.style.display!=="none").sort((ne,Ue)=>Ue.priority-ne.priority),W=[],ie=window.innerWidth,$=window.innerHeight;for(let ne of O){ne.label.style.visibility="";let Ue=ne.label.getBoundingClientRect();Ue.left<0||Ue.top<0||Ue.right>ie||Ue.bottom>$||P.some(qe=>et(Ue,qe))||W.some(qe=>et(Ue,qe))?ne.label.style.visibility="hidden":W.push(Ue)}}function we(){let P=h();l.getPixelRatio()!==P&&l.setPixelRatio(P);let O=n.clientWidth,W=n.clientHeight;(n.width!==Math.floor(O*P)||n.height!==Math.floor(W*P))&&(l.setSize(O,W,!1),f.setSize(O,W),p.aspect=O/Math.max(W,1),p.updateProjectionMatrix());for(let ie of R)ie.resolution.set(O,W)}function oe(){we(),Be(),l.clear(),l.render(v,p),l.clearDepth(),l.render(m,p),f.render(m,p),H();for(let P of be)P(un)}let be=[],Te=performance.now(),fe={speedDaysPerSec:0};function ze(P){if(y.s!==y.sTarget){let O=P/1.5;y.s=y.sTarget>y.s?Math.min(y.sTarget,y.s+O):Math.max(y.sTarget,y.s-O)}if(fe.speedDaysPerSec){let O=y.t+fe.speedDaysPerSec*86400*P;y.t=Math.min(Math.max(O,t.tMin),t.tMax),(y.t===t.tMax||y.t===t.tMin)&&(fe.speedDaysPerSec=0),t.onTimeChange&&t.onTimeChange(y.t)}if(y.fly){let O=y.fly;O.k=Math.min(1,O.k+P/O.dur);let W=O.k<.5?4*O.k**3:1-(-2*O.k+2)**3/2,ie=w[O.to]||[0,0,0];for(let $=0;$<3;$++)O.pos[$]=O.from[$]+(ie[$]-O.from[$])*W;y.cam.dist=Math.exp(Math.log(O.d0)+(Math.log(O.d1)-Math.log(O.d0))*W),O.k>=1&&(y.cam.target=O.to,y.fly=null)}}let Re={frames:0,t0:performance.now(),low:0,history:[]};function Mt(P){Re.frames++;let O=P-Re.t0;if(O<2e3)return;let W=Re.frames*1e3/O;if(Re.history.push(W),Re.frames=0,Re.t0=P,!(!d.auto||Re.history.length<2)&&(Re.low=W<Bv?Re.low+1:0,Re.low>=2&&d.level<gr.length-1)){let ie={at:new Date().toISOString(),from:d.level,to:d.level+1,fps:Math.round(W*10)/10};d.level++,d.log.push(ie),Re.low=0,gn(),console.info("[\uD654\uC9C8] \uC790\uB3D9\uC73C\uB85C \uB0AE\uCDA4",JSON.stringify(ie))}}function ut(P){return P.on===!1||P.zoom&&P.zoom!==T?!1:P.familyLine?P.wanted!==!1&&gr[d.level].family:!0}function gn(){for(let P of E)P.familyLine&&(P.obj.visible=ut(P))}l.setAnimationLoop(()=>{let P=performance.now(),O=Math.min((P-Te)/1e3,.1);Te=P,y.paused||ze(O),oe(),Mt(P)});let Nt=null;n.addEventListener("pointerdown",P=>{Nt={x:P.clientX,y:P.clientY,x0:P.clientX,y0:P.clientY},n.setPointerCapture(P.pointerId)}),n.addEventListener("pointermove",P=>{Nt&&(y.cam.az-=(P.clientX-Nt.x)*.006,y.cam.el=Math.min(1.55,Math.max(-1.55,y.cam.el+(P.clientY-Nt.y)*.006)),Nt.x=P.clientX,Nt.y=P.clientY)}),n.addEventListener("pointerup",P=>{if(Nt&&Math.hypot(P.clientX-Nt.x0,P.clientY-Nt.y0)<5){let O=ja(P.clientX,P.clientY);O&&t.onPick&&t.onPick(O)}Nt=null}),n.addEventListener("wheel",P=>{P.preventDefault(),y.fly=null,y.cam.dist=Math.min(S(),Math.max(.05,y.cam.dist*Math.exp(P.deltaY*.0012)))},{passive:!1});function ja(P,O){let W=null,ie=22,$=new X;for(let ne of E){if(!ne.pick||!ne.obj.visible)continue;if(ne.kind==="sphere")$.copy(ne.obj.position);else if(ne.labelObj)$.copy(ne.labelObj.position);else continue;if($.project(p),$.z<-1||$.z>1)continue;let Ue=($.x+1)/2*n.clientWidth,Ge=(1-$.y)/2*n.clientHeight,qe=Math.hypot(Ue-P,Ge-O);qe<ie&&(ie=qe,W=ne.pick)}return W}function qa(){let P=l.getContext(),O=P.drawingBufferWidth,W=P.drawingBufferHeight,ie=new Uint8Array(O*W*4);return P.readPixels(0,0,O,W,P.RGBA,P.UNSIGNED_BYTE,ie),{px:ie,w:O,h:W}}function Ya(){oe();let{px:P,w:O,h:W}=qa(),ie=new Set;for(let $=0;$<P.length;$+=388)ie.add(P[$]<<16|P[$+1]<<8|P[$+2]);return{width:O,height:W,distinctColors:ie.size,webgl2:l.capabilities.isWebGL2}}function yr(P){let O=E.map(M=>M.obj.visible),W=b[P],ie=W.obj.material.color.getHex();for(let M of E)M.obj.visible=M===W;W.obj.material.color.setHex(16777215);let $=e.style.display;e.style.display="none";let ne=v.background;v.background=new $e(0),oe();let{px:Ue,w:Ge,h:qe}=qa(),ht=0,Et=0,Xt=0;for(let M=0;M<qe;M++)for(let B=0;B<Ge;B++){let te=(M*Ge+B)*4;Ue[te]>200&&Ue[te+1]>200&&Ue[te+2]>200&&(ht+=B,Et+=qe-1-M,Xt++)}E.forEach((M,B)=>{M.obj.visible=O[B]}),W.obj.material.color.setHex(ie),e.style.display=$,v.background=ne,oe();let _n=l.getPixelRatio();return Xt?{x:ht/Xt/_n,y:Et/Xt/_n,n:Xt}:null}function Rc(P){return Yi(b[P].src,ot(y.t),y.s)}function Ja(P=3e3){return new Promise(O=>{let W=d.auto;d.auto=!1;let ie=0,$=performance.now(),ne=()=>{ie++,performance.now()-$<P?requestAnimationFrame(ne):(d.auto=W,O({fps:ie*1e3/(performance.now()-$),level:d.level,pr:l.getPixelRatio()}))};requestAnimationFrame(ne)})}function $a(P=120){let O=l.getContext(),W=new Uint8Array(4);oe(),O.readPixels(0,0,1,1,O.RGBA,O.UNSIGNED_BYTE,W);let ie=performance.now();for(let ne=0;ne<P;ne++)oe(),O.readPixels(0,0,1,1,O.RGBA,O.UNSIGNED_BYTE,W);let $=(performance.now()-ie)/P;return{ms:$,fpsUnlocked:1e3/$,pr:l.getPixelRatio()}}Ke();let un={renderer:l,scene:m,skyScene:v,camera:p,state:y,items:E,markers:b,anchors:w,COLORS:o,anim:fe,model:t,tokens:i,quality:d,addMarker:ae,addPolyline:V,addSegments:j,addPoints:Y,addLabel:re,addSphere:le,addItem:N,ndToKm:Z,theta:ot,angle:Qe,render:oe,update:Be,setLayer(P,O){un.setItemsVisible(W=>W.layer===P,O)},removeItem(P){let O=E.findIndex($=>$.name===P);if(O<0)return!1;let W=E[O];W.obj.parent&&W.obj.parent.remove(W.obj),W.obj.geometry.dispose();let ie=W.obj.material;for(let $ of[R,U]){let ne=$.indexOf(ie);ne>=0&&$.splice(ne,1)}return ie.dispose(),W.labelObj&&(m.remove(W.labelObj),W.label.remove()),b[P]===W&&delete b[P],E.splice(O,1),!0},setItemsVisible(P,O){for(let W of E)P(W)&&(W.on=O,W.obj.visible=ut(W),W.labelObj&&(W.labelObj.visible=O&&(!W.zoom||W.zoom===T)))},wantVisible:ut,setItemsDimmed(P,O,W=.32){for(let ie of E)if(P(ie)&&ie.kind!=="label"&&ie.kind!=="sphere"){let $=ie.obj.material;if(ie.base===void 0&&(ie.base={opacity:$.opacity,transparent:$.transparent,depthWrite:$.depthWrite,alphaTest:$.alphaTest}),!!ie.dimmed===O)continue;ie.dimmed=O,$.opacity=O?ie.base.opacity*W:ie.base.opacity,$.transparent=O||ie.base.transparent,$.depthWrite=O?!1:ie.base.depthWrite,ie.base.alphaTest&&($.alphaTest=O?ie.base.alphaTest*W*.5:ie.base.alphaTest),$.needsUpdate=!0}},setLabelsVisible(P){e.style.display=P?"":"none"},addZoomTarget(P,O){x[P]=O},onZoomChange(P){ve.push(P)},get zoomNow(){return T},setSphereTexture(P,O,W){let ie=E.find(Ue=>Ue.name===P&&Ue.kind==="sphere");if(!ie)return!1;let $=new Ot(O);$.colorSpace=Ft,$.anisotropy=l.capabilities.getMaxAnisotropy(),$.needsUpdate=!0;let ne=ie.obj.material;return ne.map&&ne.map.dispose(),ne.map=$,ne.color.set(16777215),ne.needsUpdate=!0,ie.texture={label:W,w:O.width,h:O.height},!0},maxTextureSize:()=>l.capabilities.maxTextureSize,makeTexture(P,O={}){let W=new Ot(P);return W.colorSpace=O.colorSpace??Ft,W.anisotropy=l.capabilities.getMaxAnisotropy(),O.mipmaps===!1&&(W.generateMipmaps=!1,W.minFilter=Rt),O.wrapS&&(W.wrapS=O.wrapS),Ih(W),W.needsUpdate=!0,W},setSphereMap(P,O,W,ie="map"){let $=E.find(Ge=>Ge.name===P&&Ge.kind==="sphere");if(!$)return!1;let ne=$.obj.material,Ue=ie==="nightMap"?"night":ie;return ne.uniforms&&ne.uniforms[Ue+"T0"]?(bc(ne.uniforms,Ue,O),ne.uniforms[ie+"On"]&&(ne.uniforms[ie+"On"].value=1)):(ne.map=O,ne.color.set(16777215),ne.needsUpdate=!0),$.textures=$.textures||{},$.textures[ie]={label:W,w:O.image.width,h:O.image.height},$.texture=$.textures.map||$.textures[ie],!0},sphereScreenPx(P){let O=E.find(W=>W.name===P&&W.kind==="sphere");return!O||!O.obj.visible||!O.camDist?0:O.obj.scale.x*F/O.camDist*l.getPixelRatio()},qualityAllowsHiTex:()=>gr[d.level].hiTex!==!1,setSphereOrient(P,O){let W=E.find(ie=>ie.name===P&&ie.kind==="sphere");W&&(W.orientFn=O)},setGraphic(P,O){I[P]=O,P==="nightlights"&&un.setSurface("Earth_sphere","nightOn",O?1:0)},graphic:()=>({...I}),setSurface(P,O,W){let ie=E.find($=>$.name===P&&$.kind==="sphere");ie&&ie.surface&&ie.obj.material.uniforms[O]&&(ie.obj.material.uniforms[O].value=W)},setFaceTo(P,O){let W=E.find(ie=>ie.name===P&&ie.kind==="sphere");W&&(W.faceTo=O)},addSky(P,O,W,ie){W.renderOrder=-10,W.frustumCulled=!1;let $=N(P,O,W,new Float64Array(3),{kind:"sky"});return $.frame=ie||null,$},setTrueSize(P){L=!!P},get trueSize(){return L},kmPerPx(){return y.cam.dist/F},helper:it,onRender:be,setTime(P){y.t=Math.min(Math.max(P,t.tMin),t.tMax),t.onTime&&t.onTime(y.t,un),t.onTimeChange&&t.onTimeChange(y.t)},setMode(P,O=!1){y.sTarget=P==="inertial"?1:0,O&&(y.s=y.sTarget)},setCamera(P){y.fly=null,Object.assign(y.cam,P)},setOrbitOuter(P){k=P},setOrbitInner(P){ee=P},zoomOutMax:S,orbitFitDist:at,flyTo(P,O,W=Math.min(2,Math.max(1,1+.08*Math.abs(Math.log(O/y.cam.dist))))){y.fly={from:[...pt()],pos:[...pt()],to:P,d0:y.cam.dist,d1:O,k:0,dur:W}},pickAt:ja,debug:{canvasStats:Ya,markerCentroid:yr,worldOf:Rc,measureFps:Ja,measureFrameCost:$a,declutter:H,pause(P=!0){y.paused=P},step(P){ze(P),oe()},setPrecision(P){y.precision=P,oe()},setQuality(P,O=!1){d.level=P,d.auto=O,gn(),oe()},enableAutoQuality(P=!0){d.auto=P}}};return un}var Dt=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=Fe(r)):s.startsWith("data-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},Ha=[];function Np(){for(let n of Ha)n()}function Up(n,e){let t=Ri(n,e);return Ha.push(t._render),t}function Dp(n,e){let t=Up(n,e);return t.classList.add("layer-tag"),t}function _r(n,e,t){let i=Dt("button",{type:"button",class:"lbl-num"});i.dataset.source=n.provenance.source.map(a=>`${a.file}>${a.key}`).join(" | "),i.dataset.verification=`${n.provenance.verification.tag}/${n.provenance.verification.detail}`;let s=()=>{i.textContent=n.text+(typeof t=="function"?t():t)};s(),Ha.push(s),i.addEventListener("click",a=>{a.stopPropagation(),e.openSource(n)});let r=Dt("span",{class:"lbl-numwrap"},i,Up(n.provenance.verification,e.table));return r.dataset.source=i.dataset.source,r.dataset.verification=i.dataset.verification,fo(r,n.id,"label"),r}function Fp(n,e,t){let i=n.COLORS,s=n.tokens.scene.lines,r=n.tokens.scene.spheres,a=n.tokens.scene.glow,o=t.constants.mu,l=t.constants.length_unit_km,c=(V,j,...Y)=>{let re=Dt("div",{class:`lbl ${V}`},...Y);if(j){re.dataset.pick=j;let xe=re.firstChild;xe.classList.add("lbl-name"),xe.addEventListener("click",()=>t.onPick&&t.onPick(j))}return re},u=n.addMarker("Sun","bodies",[-o,0,0],i.sun,c("lbl-body","Sun",Dt("span",{i18n:"body.sun"})),{hidden:!0,priority:10});n.addSphere("Sun_sphere","bodies",u,t.radii.sun.km,i.sun,{emissive:!0,limb:!0,glow:a.sun,minPx:r.sunMinPx,pick:"Sun",capFrac:.5,capFloorDev:1.2}),n.addMarker("EMB","bodies",[1-o,0,0],i.emb,c("lbl-body","EMB",Dt("span",{i18n:"body.emb"})),{size:n.tokens.scene.points.emb,priority:6});let d={L1:8,L2:9,L3:5,L4:5,L5:5};for(let V of e["stage1.points"].items){let j=c("lbl-lpt",V.id,Dt("b",{"data-meta":""},V.id),_r(V.dist,t," km"));j.dataset.lpt=V.id,n.addMarker(V.id,"lpoints",[V.x,V.y,V.z],i.lpt,j,{priority:d[V.id],glowPx:n.tokens.scene.points.lptGlow??22})}let h=e["stage2.l2_directions"],f=h.origin,m=Math.abs(f[0]-(1-o));for(let V of h.items){let j=V.angle_deg*Math.PI/180,Y=.25*m,re=[f[0]+Y*Math.cos(j),f[1]+Y*Math.sin(j),0];n.addSegments("dir_"+V.id,"dirs",[f[0]-Y*Math.cos(j),f[1]-Y*Math.sin(j),0,...re],V.id==="unstable"?i.unstable:i.stable,s.dir),n.addLabel("dirlabel_"+V.id,"dirs",re,c("lbl-dir","L2",Dt("span",{i18n:V.id==="unstable"?"l2.unstable":"l2.stable"}),_r(V.num,t,"\xB0")),{priority:3})}let v=e["stage3c.halo_family"],p=n.tokens.scene.familyEvery;for(let V of["\uBD81\uCABD","\uB0A8\uCABD"]){let j=v._arrays[v.family[V].array],[Y,re]=j.shape;for(let xe of["some","all"]){let me=[];for(let ge=0;ge<Y;ge++)(xe==="some"?ge%p===0:ge%p!==0)&&me.push(ge);let _e=new Float64Array(me.length*(re-1)*6),ee=0;for(let ge of me)for(let Pe=0;Pe<re-1;Pe++)for(let ye of[(ge*re+Pe)*3,(ge*re+Pe+1)*3])_e[ee++]=j.data[ye],_e[ee++]=j.data[ye+1],_e[ee++]=j.data[ye+2];let le=n.addSegments(xe==="some"?"halo_"+V:"halo_rest_"+V,"halo",_e,i.haloFam,s.family,s.familyOpacity);le.familyLine=!0,xe==="all"&&(le.wanted=!1,le.obj.visible=!1,le.familyRest=!0)}}{let V=v._arrays[v.family[v.main.side].array],j=V.shape[1],Y=V.data.slice(v.main.index*j*3,(v.main.index+1)*j*3);n.addPolyline("halo_main","halo",Y,i.haloMain,s.main),n.addLabel("halo_main_label","halo",Array.from(Y.slice(Math.floor(j/4)*3,Math.floor(j/4)*3+3)),c("lbl-orbit","halo_main",Dt("span",{i18n:"l2.halo_main"}),_r(v.main.period,t,()=>` ${Wv(v.main.period.unit)}`)),{priority:7,pick:"halo_main"})}let g=e["stage3b.escape_samples"];for(let V of g.items)n.addPolyline("esc_"+V.\uBC88\uD638,"escape",g._arrays[V.array].data,V.direction_316>0?i.escOut:i.escIn,s.escape);let A=e["stage3.burns"],C={"3-A":i.a3,"3-C":i.c3,"4-C":i.c4};for(let[V,j]of Object.entries(A.runs)){n.addPolyline("traj_"+V,"burns",A._arrays[j.array_traj].data,C[V],s.traj,.7);let Y=A._arrays[j.array_pos].data,re=A._arrays[j.array_dv].data,xe=new Float64Array(Y.length*2),me=3e3/l;for(let _e=0;_e<Y.length;_e+=3){let ee=Math.hypot(re[_e],re[_e+1],re[_e+2])||1;xe.set([Y[_e],Y[_e+1],Y[_e+2],Y[_e]+me*re[_e]/ee,Y[_e+1]+me*re[_e+1]/ee,Y[_e+2]+me*re[_e+2]/ee],_e*2)}n.addSegments("dv_"+V,"burns",xe,C[V],s.dv),n.addPoints("burnpts_"+V,"burns",Y,C[V])}let y=e["stage4.reference"];n.addPolyline("ref_4C","ref",y._arrays["4C"].data,i.ref4c,s.ref),n.addPolyline("ref_4D","ref",y._arrays["4D"].data,i.ref4d,s.ref);let E=t.screenEph||(()=>{let V=Ss(e).ephem;return{evaluate:j=>V.evaluate(j),tMin:V.tMin}})(),b=t.screenEph?t.screenEph.tMin:E.tMin,w=n.addMarker("Earth","earthmoon",[1-o,0,0],i.earth,c("lbl-body","Earth",Dt("span",{i18n:"body.earth"})),{hidden:!0,priority:7}),x=n.addMarker("Moon","earthmoon",[1-o,0,0],i.moon,c("lbl-body","Moon",Dt("span",{i18n:"body.moon"})),{hidden:!0,priority:4});n.addSphere("Earth_sphere","earthmoon",w,t.radii.earth.km,i.earth,{glow:a.earth,minPx:r.earthMinPx,pick:"Earth",dot:6,capFrac:.6,capFloorDev:3.01,atmosphere:i.atmosphere??7320831,surface:"earth"}),n.addSphere("Moon_sphere","earthmoon",x,t.radii.moon.km,i.moon,{glow:a.moon,minPx:r.moonMinPx,pick:"Moon",capFrac:.3,capFloorDev:1.5,surface:"moon"});let T=121,R=30,I=n.addPolyline("moon_trail","earthmoon",new Float64Array(T*3),i.moonTrail,s.trail,1,{fade:!0}),L=(V,j)=>{let Y=ii(V.pos[0],V.vel[0],V.pos[3],V.vel[3]),re=$i(V.pos[j],Y);return[(re[0]+1-o)*l,re[1]*l,re[2]*l]};Hv(n,e,t,c,i,s);let U=[["mercury_bary","Mercury"],["venus_bary","Venus"],["mars_bary","Mars"],["jupiter_bary","Jupiter"],["saturn_bary","Saturn"],["uranus_bary","Uranus"],["neptune_bary","Neptune"]],N={Mercury:1,Venus:2,Earth:3,Mars:4,Jupiter:5,Saturn:6,Uranus:7,Neptune:8},G={Mercury:11053224,Venus:15256992,Mars:13656634,Jupiter:14201994,Saturn:14929818,Uranus:10475744,Neptune:7048432},q=t.screenEph?t.screenEph.solar():null,Z=[];if(q)for(let[V,j]of U){let Y=q.bodies.find(me=>me.name===V);if(!Y)continue;let re=(i.planets&&i.planets[j])??G[j],xe=n.addMarker(j,"planets",[0,0,0],re,c("lbl-body",j,Dt("span",{i18n:"body."+j.toLowerCase()})),{hidden:!0,priority:3});n.addSphere(j+"_sphere","planets",xe,Y.radius_km,re,{minPx:r.planetMinPx??4,pick:j,dot:9-N[j],capFrac:.6,capFloorDev:3.01}),Z.push({key:V,mk:xe})}let ae=[];if(t.orbitShapes&&q){let V=0,j=1/0;for(let Y of t.orbitShapes.orbits){let re=Float64Array.from(Y.xyz_km),xe=n.addPolyline("orbit_"+Y.name,"planet_orbits",new Float64Array(re.length),i.planetOrbit??11123926,s.planetOrbit??1,s.planetOrbitOpacity??.42);ae.push({it:xe,p:re,rho:new Float64Array(re.length)}),V=Math.max(V,Y.aphelion_km);for(let me=0;me<re.length;me+=3)j=Math.min(j,Math.hypot(re[me],re[me+1],re[me+2]))}n.setOrbitOuter(V),n.setOrbitInner(j)}let z=null;return t.onTime=V=>{if(V===z)return;let j=E.evaluate(V),Y=Math.max(b,V-R*86400),re=E.evaluate(Y);if(!(!j||!re)){if(z=V,t.frameF=ii(j.pos[0],j.vel[0],j.pos[3],j.vel[3]),w.src.set(L(j,1)),x.src.set(L(j,2)),Z.length){let xe=ii(j.pos[0],j.vel[0],j.pos[3],j.vel[3]),me=t.screenEph.solar().chunkFor(V).year;for(let _e of Z){let ee=$i(q.evaluate(_e.key,V,me).pos,xe);_e.mk.src.set([(ee[0]+1-o)*l,ee[1]*l,ee[2]*l])}for(let _e of ae){Uc(_e.p,j.pos[0],xe,_e.rho);let ee=_e.it.src,le=_e.rho;for(let ge=0;ge<le.length;ge+=3)ee[ge]=(le[ge]+1-o)*l,ee[ge+1]=le[ge+1]*l,ee[ge+2]=le[ge+2]*l}}for(let xe=0;xe<T;xe++){let me=Math.max(b,V-R*86400*(T-1-xe)/(T-1));I.src.set(L(E.evaluate(me),2),xe*3)}}},{eph:E,toScene:L}}function Hv(n,e,t,i,s,r){let a=e["stage4a.jwst"];if(!a)return;let o=n.tokens.scene.points,l=a._arrays;n.addPoints("jwst_pts","jwst",l.daily.data,s.jwst,o.jwst),n.addPolyline("jwst_interp","jwst",l.interp.data,s.jwst,r.jwstInterp,.85,{dashed:!0}),n.addPolyline("jwst_10m","jwst",l.tenmin.data,s.jwst,r.jwst);let c=Array.from(l.tenmin.data.slice(-3)),u=Dt("small",{class:"lbl-fixed","data-meta":""}),d=()=>{u.textContent=Fe("jwst.marker_fixed",{date:a.marker.text.ko.slice(0,10)}),u.title=document.documentElement.lang==="ko"?a.marker.text.ko:a.marker.text.en};d(),Ha.push(d),n.addMarker("JWST","jwst",c,s.jwst,i("lbl-body lbl-jwst","JWST",Dt("span",{"data-meta":""},"JWST")),{size:o.jwstMarker,priority:8}),n.addLabel("jwst_fixed","jwst",c,Dt("div",{class:"lbl lbl-fixed-wrap"},u),{priority:2}).labelObj.center.set(-.08,-.45);let f=Math.floor(l.daily.data.length/6)*3;n.addLabel("jwst_orbit_label","jwst",Array.from(l.daily.data.slice(f,f+3)),i("lbl-orbit","jwst_period",Dt("span",{i18n:"jwst.orbit_label"})),{priority:2,pick:"jwst_period"});let m=e["stage5.jwst"];if(!m)return;let v=m._arrays,p=m.layers.ext,g=m.layers.phys;for(let[w,x]of Object.entries(p.windows))n.addPolyline("jpl_"+w,"jwst_ext",v[x.array].data,s.extJpl,r.pred);for(let w of p.curves){let x=v[w.array_pos].data;n.addPolyline("mine_"+w.id,"jwst_ext",x,s.extMine,r.traj),n.addPoints("mine_end_"+w.id,"jwst_ext",x.slice(-3),s.extMine,o.predEnd)}let A=v[g.arrays_pos.recon].data,C=v[g.arrays_pos.mine].data;n.addPolyline("recon_R","jwst_phys",A,s.physRecon,r.pred),n.addPolyline("mine_R","jwst_phys",C,s.physMine,r.traj),n.addPoints("mine_end_R","jwst_phys",C.slice(-3),s.physMine,o.predEnd),n.addPolyline("jpl01U_R","jwst_phys",v[g.arrays_pos.jpl].data,s.physJpl,r.traj,1,{dashed:!0});let y=p.items.find(w=>w.id==="jwst_err_range"),E=g.items.find(w=>w.id==="jwst_err_R5"),b=v[p.windows.B.array].data;n.addLabel("jwst_ext_label","jwst_ext",Array.from(b.slice(-3)),i("lbl-pred lbl-ext","JWST",Dt("span",{i18n:"jwst.layer_ext_short"}),Dp(p.verification,t.table),_r(y,t," km")),{priority:6,pick:"JWST"}),n.addLabel("jwst_phys_label","jwst_phys",Array.from(A.slice(-3)),i("lbl-pred lbl-phys","JWST",Dt("span",{i18n:"jwst.layer_phys_short"}),Dp(g.verification,t.table),_r(E,t,()=>` km (${Fe("jwst.rep_5d")})`)),{priority:6,pick:"JWST"}),Gv(n,m,t,s,o,r)}function Gv(n,e,t,i,s,r){let a=e._arrays,o=e.layers.ext,l=e.layers.phys,c=t.constants.length_unit_km,u=(b,w)=>{let x=a[b].data,T=x.length/3,R=w<0?T+w:w;return{arr:b,k:R,p:[x[3*R],x[3*R+1],x[3*R+2]]}},d=(b,w)=>{let x=a[b].data;for(let T=0;T<x.length;T++)if(Math.abs(x[T]-w)<1e-9)return T;return-1},h=(b,w)=>b.items.find(x=>x.id===w),f=(Date.parse(l.window.rep_end.replace(" ","T")+"Z")-Date.parse(l.window.start.replace(" ","T")+"Z"))/864e5,m=[{id:"R5",layer:"jwst_phys",lines:["recon_R","mine_R","mine_end_R","jpl01U_R"],base:{...u(l.arrays_pos.recon,d("days_R",f)),name:"jwst.zl_recon",color:i.physRecon},others:[{...u(l.arrays_pos.mine,d("days_R",f)),name:"jwst.zl_mine_kB",color:i.physMine,item:h(l,"jwst_err_R5"),gap:"jwst.gap_mine_recon"},{...u(l.arrays_pos.jpl,d("days_R_jpl",f)),name:"jwst.zl_jpl01U",color:i.physJpl,item:h(l,"jwst_err_R5_jpl"),gap:"jwst.gap_jpl_recon"}]}];for(let b of["A","B","C"]){let w=o.curves.filter(x=>x.window===b);w.length&&m.push({id:b,layer:"jwst_ext",lines:["jpl_"+b,...w.flatMap(x=>["mine_"+x.id,"mine_end_"+x.id])],base:{...u(o.windows[b].array,-1),name:"jwst.zl_jpl",color:i.extJpl},others:w.map(x=>({...u(x.array_pos,-1),text:x.label,color:i.extMine,item:h(o,"jwst_err_"+x.id),gap:"jwst.gap_mine_jpl"}))})}n.zoomStops={};let v=(b,w)=>[b[0]-w[0],b[1]-w[1],b[2]-w[2]],p=(b,w)=>[b[1]*w[2]-b[2]*w[1],b[2]*w[0]-b[0]*w[2],b[0]*w[1]-b[1]*w[0]],g=b=>{let w=Math.hypot(...b)||1;return b.map(x=>x/w)},A=(b,w)=>(b.zoom=w,b.obj.visible=!1,b.labelObj&&(b.labelObj.visible=!1),b.pick=null,b),C=b=>document.documentElement.lang==="ko"?b.ko:b.en;for(let b of m){if(b.base.k<0||b.others.some(Y=>Y.k<0||!Y.item))continue;let w=[b.base,...b.others],x=[0,1,2].map(Y=>w.reduce((re,xe)=>re+xe.p[Y],0)/w.length),T=b.others.map(Y=>Math.hypot(...v(Y.p,b.base.p))*c),R=Math.max(25,4.5*Math.max(...T)),I=a[b.base.arr].data,L=b.base.k,U=I.length/3,N=Math.min(L+1,U-1),G=Math.max(L-1,0),q=g(v(Array.from(I.slice(3*N,3*N+3)),Array.from(I.slice(3*G,3*G+3)))),Z=v(b.others[T.indexOf(Math.max(...T))].p,b.base.p),ae=p(q,Z);Math.hypot(...ae)<1e-6*Math.hypot(...Z)&&(ae=p(q,[0,0,1])),ae=g(ae),ae[2]<0&&(ae=ae.map(Y=>-Y));let z="zoom_"+b.id;n.anchors[z]=n.ndToKm(x),n.addZoomTarget(z,b.id),n.zoomStops[b.id]={layer:b.layer,cam:{target:z,dist:R,az:Math.atan2(ae[1],ae[0]),el:Math.asin(ae[2])},gapsDrawnKm:T,points:w.map(Y=>Y.p),items:b.others.map(Y=>Y.item.id)},w.forEach((Y,re)=>A(n.addMarker(`zoompt_${b.id}_${re}`,b.layer,Y.p,Y.color,null,{size:s.zoomPt}),b.id));let V=new Float64Array(6*b.others.length);b.others.forEach((Y,re)=>V.set([...b.base.p,...Y.p],6*re)),A(n.addSegments("zoomgap_"+b.id,b.layer,V,i.zoomGap,r.zoomGap,.9),b.id);let j=.18*R/c;w.forEach((Y,re)=>{let xe=a[Y.arr].data,me=xe.length/3,_e=Y.k>0?Y.k-1:Math.min(Y.k+1,me-1),ee=g(v(Array.from(xe.slice(3*_e,3*_e+3)),Y.p)),le=Y.p.map((ye,je)=>ye+j*ee[je]),ge=Y.text?Dt("span",{class:"lbl-name-only","data-meta":""},C(Y.text)):Dt("span",{class:"lbl-name-only","data-meta":"",i18n:Y.name});Y.text&&Ha.push(()=>{ge.textContent=C(Y.text)});let Pe=Dt("div",{class:"lbl lbl-zoomline"},ge);Pe.style.setProperty("--zl-color","#"+Y.color.toString(16).padStart(6,"0")),A(n.addLabel(`zoomname_${b.id}_${re}`,b.layer,le,Pe,{priority:8}),b.id)}),b.others.forEach((Y,re)=>{let xe=Dt("div",{class:"lbl lbl-gap"},Dt("span",{class:"lbl-name-only","data-meta":"",i18n:Y.gap}),_r(Y.item,t," km"));xe.dataset.gap=Y.item.id,A(n.addLabel(`zoomgapl_${b.id}_${re}`,b.layer,Y.p,xe,{priority:9}),b.id)})}let y=Object.fromEntries(m.map(b=>[b.id,new Set(b.lines)])),E=b=>(b.layer==="jwst_ext"||b.layer==="jwst_phys")&&!b.zoom&&b.kind!=="label";n.onZoomChange(b=>{n.setItemsDimmed(E,!1),b&&y[b]&&n.setItemsDimmed(w=>E(w)&&!y[b].has(w.name),!0,.18)})}function Wv(n){return n&&typeof n=="object"?document.documentElement.lang==="ko"?n.ko:n.en:n||""}var Xv=(()=>{let n=document.createElement("div");return n.innerHTML="<svg></svg>",n.firstChild.namespaceURI})(),xi=(n,e={},...t)=>{let i=document.createElementNS(Xv,n);for(let[s,r]of Object.entries(e))i.setAttribute(s,r);return i.append(...t),i},Bt=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=Fe(r)):s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i};function jv(n,e,t,i){let u=t.days[0],d=t.days[t.days.length-1],h=Math.log10(t.km[0]),f=Math.log10(t.km[t.km.length-1]),m=y=>40+(y-u)/(d-u)*252,v=y=>8+(1-(Math.log10(Math.min(Math.max(y,t.km[0]),t.km[t.km.length-1]))-h)/(f-h))*116,p=xi("svg",{viewBox:"0 0 300 150",width:300,height:150,class:"err-chart",role:"img","aria-label":At(n.title)});if(n.outside_from_day!==void 0){let y=m(n.outside_from_day),E=m(n.outside_to_day);p.append(xi("rect",{x:y,y:8,width:E-y,height:116,class:"err-outside"}))}let g=xi("g",{class:"err-axes","data-aux":"tick","data-source":t.source,"data-verification":"display/axis"});for(let y of t.km)g.append(xi("line",{x1:40,x2:292,y1:v(y),y2:v(y),class:"err-grid"})),g.append(xi("text",{x:36,y:v(y)+4,"text-anchor":"end"},t.km_text[t.km.indexOf(y)]));for(let y of t.days)g.append(xi("line",{x1:m(y),x2:m(y),y1:8,y2:124,class:"err-grid"})),g.append(xi("text",{x:m(y),y:138,"text-anchor":"middle"},String(y)));p.append(g);for(let y of n.curves){let E=e[y.array_days].data,b=e[y.array_km].data,w="";for(let x=0;x<E.length;x++)b[x]>0&&(w+=`${w?"L":"M"}${m(E[x]).toFixed(2)},${v(b[x]).toFixed(2)}`);p.append(xi("path",{d:w,class:"err-line",stroke:y.color,"stroke-dasharray":y.dashed?"4 3":"none","data-curve":y.id}));for(let x of y.marks)p.append(xi("circle",{cx:m(x.day),cy:v(x.km),r:2.6,fill:y.color,"data-mark":`${y.id}@${x.day}`}))}let A=Bt("figure",{class:"err-fig","data-layer":i.key});A.append(p);let C=Bt("figcaption",{class:"err-legend","data-meta":""});for(let y of n.curves){let E=Bt("span",{class:"err-swatch"+(y.dashed?" dashed":"")});E.style.borderColor=y.color,C.append(Bt("span",{class:"err-key"},E,document.createTextNode(At(y.label))))}return C.append(Bt("span",{class:"err-axis-note",i18n:"jwst.axis_note"})),A.append(C),A}function Op(n,e,t,i,s){let r=e?Bt("button",{type:"button",id:n,class:"link-btn zoom-btn",i18n:e}):Bt("button",{type:"button",id:n,class:"link-btn zoom-btn"},s);return r.addEventListener("click",()=>t(i)),r}function Bp(n,e,t,i,s,r){let a=Bt("div",{class:"jwst-body"}),o=n["stage5.jwst"];if(!o)return a.append(Bt("p",{class:"note",i18n:"jwst.no_predictions"})),a;for(let c of["ext","phys"]){let u=o.layers[c],d=Bt("section",{class:`jwst-layer jwst-${c}`,"data-layer":c}),h=Bt("h4",{"data-meta":""},Bt("span",{i18n:`jwst.layer_${c}`}),ws(u.verification,e));d.append(h,Bt("p",{class:"desc","data-meta":""},At(u.note))),d.append(jv(u,o._arrays,o.axes,{key:c}));for(let f of u.items){let m=Pi(f,e,t);i.push(m),d.append(m)}if(r){let f=Bt("div",{class:"zoom-row","data-meta":""});if(c==="phys")f.append(Op("zoom-R5","jwst.zoom_phys",r,"R5"));else{f.append(Bt("span",{i18n:"jwst.zoom_ext"}));for(let m of Object.keys(u.windows))f.append(Op("zoom-"+m,null,r,m,m))}d.append(f)}a.append(d)}let l=Bt("button",{type:"button",id:"open-period",class:"link-btn",i18n:"jwst.period_button"});return l.addEventListener("click",s),a.append(l),a}function kp(n,e,t,i){let r=n["stage4a.jwst"].period_card,a=Bt("div",{class:"period-body"}),o=Bt("p",{class:"period-class","data-meta":""},Bt("span",{i18n:"jwst.period_class"}),ws(r.verification,e));a.append(o,Bt("p",{class:"desc","data-meta":""},At(r.summary)));for(let l of r.items){let c=Pi(l,e,t);i.push(c),a.append(c)}return a.append(Bt("p",{class:"note period-unknown","data-meta":""},At(r.unknown))),a}var ce=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?i.dataset.i18n=r:s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},Ga={all:{target:"bary",dist:42e7,az:-1.5708,el:1.2},emb:{target:"EMB",dist:75e5,az:-1.5708,el:1.1},l2:{target:"L2",dist:32e5,az:-1.2,el:.6},l2zoom:{target:"L2",dist:300,az:-1.2,el:.6},jwst:{target:"L2",dist:29e5,az:-.45,el:.42},solar:{target:"bary",dist:125e8,az:-1.5708,el:1.15}},zp={Sun:["Sun",6e6],EMB:["EMB",25e5],Earth:["Earth",12e4],Moon:["Moon",12e4],L1:["L1",25e5],L2:["L2",32e5],L3:["L3",6e7],L4:["L4",6e7],L5:["L5",6e7],halo_main:["L2",32e5],JWST:["JWST",12e5],jwst_period:["L2",29e5],Mercury:["Mercury",6e6],Venus:["Venus",15e6],Mars:["Mars",1e7],Jupiter:["Jupiter",12e7],Saturn:["Saturn",1e8],Uranus:["Uranus",5e7],Neptune:["Neptune",5e7]},qv=["lpoints","bodies","dirs","earthmoon","halo","escape","burns","ref","jwst","jwst_ext","jwst_phys"],Yv=[1,10,30];function Vp(n,e,t){let i=[],s=t.manifest.verification,r=ce("button",{type:"button",id:"mode-rot",class:"on",i18n:"l2.mode_rot"}),a=ce("button",{type:"button",id:"mode-in",i18n:"l2.mode_inertial"});r.addEventListener("click",()=>{n.setMode("rot"),r.classList.add("on"),a.classList.remove("on")}),a.addEventListener("click",()=>{n.setMode("inertial"),a.classList.add("on"),r.classList.remove("on")});let o=ce("div",{class:"ctl-row","data-meta":""},ce("span",{class:"ctl-h",i18n:"l2.mode"}),r,a),l=ce("div",{class:"ctl-row","data-meta":""},ce("span",{class:"ctl-h",i18n:"l2.view"}));for(let de of Object.keys(Ga)){let Qe=ce("button",{type:"button",id:"view-"+de,i18n:"l2.view_"+de});Qe.addEventListener("click",()=>n.setCamera({...Ga[de],...de==="solar"?{dist:Math.max(Ga.solar.dist,n.orbitFitDist(1.2))}:{}})),l.append(Qe)}let c=ce("button",{type:"button",id:"true-size",i18n:"view.true_size","aria-pressed":"false"});if(c.title=Fe("view.true_size_title"),c.addEventListener("click",()=>{n.setTrueSize(!n.trueSize),c.setAttribute("aria-pressed",String(n.trueSize)),c.classList.toggle("on",n.trueSize)}),l.append(c),n.zoomStops&&n.zoomStops.R5){let de=ce("button",{type:"button",id:"view-jwstzoom",i18n:"l2.view_jwstzoom"});de.addEventListener("click",()=>n.model.onZoom&&n.model.onZoom("R5")),l.append(de)}let u=ce("input",{type:"range",id:"time",min:String(n.model.tMin),max:String(n.model.tMax),step:"3600","aria-label":"time"});u.value=String(n.state.t),u.addEventListener("input",()=>n.setTime(Number(u.value)));let d=ce("button",{type:"button",id:"play",i18n:"l2.play"}),h=10;d.addEventListener("click",()=>{let de=!n.anim.speedDaysPerSec;n.anim.speedDaysPerSec=de?h:0,d.dataset.i18n=de?"l2.pause":"l2.play",d.textContent=Fe(d.dataset.i18n)});let f=ce("select",{id:"speed","aria-label":"speed"});for(let de of Yv){let Qe=ce("option",{value:String(de)});Qe.dataset.speed=String(de),f.append(Qe)}f.value=String(h),f.addEventListener("change",()=>{h=Number(f.value),n.anim.speedDaysPerSec&&(n.anim.speedDaysPerSec=h)});let m=e["time.utc"],v={t:m._arrays.t_tdb_s.data,u:m._arrays.unix_utc_s.data},p=ce("button",{type:"button",id:"date",class:"num"});p.dataset.source="time.utc (results/web) | "+m.provenance.source.map(de=>`${de.file}>${de.key}`).join(" | "),p.dataset.verification=`${m.provenance.verification.tag}/${m.provenance.verification.detail}`;let g=de=>({id:"date",value:de,text:Mr(ti(de,v)),unit:"UTC",label:{ko:"\uD654\uBA74 \uC2DC\uAC01 (UTC)",en:"Displayed time (UTC)"},note:{ko:`TDB ${Za(de)} (J2000 TDB ${de} \uCD08). UTC = Python \uC774 \uB0B4\uBCF4\uB0B8 \uD558\uB8E8 \uAC04\uACA9 \uD658\uC0B0\uD45C (astropy) \uB97C \uC120\uD615 \uBCF4\uAC04 \u2014 \uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0`,en:`TDB ${Za(de)} (J2000 TDB ${de} s). UTC = linear interpolation of the daily table exported by Python (astropy) \u2014 browser calculation`},provenance:m.provenance,browser_calc:{tolerance:"1e-3 s (golden utc)"}});p.addEventListener("click",()=>t.openSource(g(n.state.t)));let A=()=>{for(let de of f.options)de.textContent=Fe("l2.speed",{n:de.dataset.speed})},C=()=>{p.textContent=`${Mr(ti(n.state.t,v))} UTC`},y=ce("button",{type:"button",id:"t-start",i18n:"time.start"});y.addEventListener("click",()=>n.setTime(n.model.tMin));let E=ce("button",{type:"button",id:"t-now",i18n:"time.now"});E.addEventListener("click",()=>n.setTime(Sr(v,Date.now()/1e3)));let b=de=>Mr(ti(de,v)).slice(0,10),w=ce("input",{type:"date",id:"date-jump","aria-label":"date"}),x=ti(n.model.tMin,v),T=ti(n.model.tMax,v),R=new Date(Math.ceil(x/86400)*864e5).toISOString().slice(0,10),I=new Date(Math.floor(T/86400)*864e5).toISOString().slice(0,10);w.min=R,w.max=I;let L=ce("button",{type:"button",id:"date-go",i18n:"time.go"}),U=ce("span",{id:"date-range-note",class:"note",hidden:!0,i18n:"time.out_of_range"}),N=()=>{let de=w.value,Qe=!!de&&de>=R&&de<=I;return L.disabled=!Qe,U.hidden=!de||Qe,Qe};w.addEventListener("input",N),L.addEventListener("click",()=>{N()&&n.setTime(Dc(Date.parse(w.value+"T00:00:00Z")/1e3,v))}),L.disabled=!0,w.dataset.range=`${R} ~ ${I}`;let G=ce("div",{class:"ctl-row","data-meta":""},ce("span",{class:"ctl-h",i18n:"l2.time"}),y,d,E,f,w,L,U,ce("span",{id:"ephem-busy-slot"})),q=ce("div",{class:"ctl-row slider-row"},u),Z=Ri(m.provenance.verification,s),ae=ce("div",{class:"ctl-row date-row"},p,Z);ae.dataset.source=p.dataset.source,ae.dataset.verification=p.dataset.verification,n.model.onTimeChange=de=>{u.value=String(de),C()};let z=ce("div",{class:"layers","data-meta":""});for(let de of qv){let Qe=ce("input",{type:"checkbox",id:"layer-"+de,checked:!0});Qe.addEventListener("change",()=>n.setLayer(de,Qe.checked)),z.append(ce("label",{},Qe,ce("span",{i18n:"l2.layer_"+de})))}let V=ce("input",{type:"checkbox",id:"family-all"});V.addEventListener("change",()=>{for(let de of n.items)de.familyRest&&(de.wanted=V.checked,de.obj.visible=V.checked&&document.getElementById("layer-halo").checked)}),z.append(ce("label",{class:"fam"},V,ce("span",{i18n:"l2.family_all"})));let j=ce("div",{class:"nums"}),Y=(de,Qe,pt=!1)=>{let dt=ce("details",{open:pt});dt.append(ce("summary",{"data-meta":"",i18n:de}));for(let k of Qe){let mt=Pi(k,s,t.openSource);i.push(mt),dt.append(mt)}return j.append(dt),dt},re=e["ephem.earth_moon"];Y("l2.g_lpoints",e["stage1.points"].items.map(de=>de.dist),!0),Y("l2.g_dirs",e["stage2.l2_directions"].items.map(de=>de.num),!0),Y("l2.g_halo",[e["stage3c.halo_family"].main.period,e["stage3c.halo_family"].main.zmax],!0),Y("l2.g_annual",e["stage3.burns"].annual,!0),Y("l2.g_ref",e["stage4.reference"].numbers,!0),Y("l2.g_escape",e["stage3b.escape_samples"].items.map(de=>de.t316)).querySelector("summary").after(ce("p",{class:"note","data-meta":"",i18n:"l2.escape_rule"}));let me=n.model.screenEph&&e["m4.ephem"];Y("l2.g_interp",me&&me.holdout?[me.holdout.earth,me.holdout.moon]:["\uC9C0\uAD6C","\uB2EC"].map(de=>re.holdout[de]));let _e=e["stage5.jwst"],ee=e["stage4a.jwst"];_e&&(Y("jwst.g_ext",_e.layers.ext.items),Y("jwst.g_phys",_e.layers.phys.items)),ee&&Y("jwst.g_period",ee.period_card.items),Y("l2.g_m0",[]).append(document.getElementById("samples"));let ge=ce("div",{class:"legend"},ce("p",{"data-meta":""},si(),ce("span",{i18n:"l2.legend_spheres"})),ce("p",{"data-meta":"",i18n:"l2.legend_markers"}),ce("p",{"data-meta":"",i18n:"l2.legend_pulsating"}),ce("p",{"data-meta":"",i18n:"l2.legend_inertial"}),ce("p",{"data-meta":"",i18n:"l2.legend_jwst"}),ce("p",{"data-meta":"",i18n:"l2.legend_jwstzoom"})),Pe={};for(let de of e["stage1.points"].items)Pe[de.id]=[de.dist];let ye=e["stage2.l2_directions"].items.map(de=>de.num),je=e["stage3c.halo_family"],it=Object.fromEntries(e["stage3.burns"].annual.map(de=>[de.id,de]));Pe.L2=[...Pe.L2,...ye,it.annual_3A,...e["stage3b.escape_samples"].items.map(de=>de.t316)],Pe.halo_main=[je.main.period,je.main.zmax,it.annual_3C,it.annual_4C,...e["stage4.reference"].numbers],Pe.Earth=[me&&me.holdout?me.holdout.earth:re.holdout.\uC9C0\uAD6C],Pe.Moon=[me&&me.holdout?me.holdout.moon:re.holdout.\uB2EC],Pe.Sun=[],Pe.EMB=[];for(let de of["Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune"])Pe[de]=[];let Ke={Sun:"body.sun",EMB:"body.emb",Earth:"body.earth",Moon:"body.moon",halo_main:"l2.halo_main",JWST:"body.jwst",jwst_period:"jwst.period_title",Mercury:"body.mercury",Venus:"body.venus",Mars:"body.mars",Jupiter:"body.jupiter",Saturn:"body.saturn",Uranus:"body.uranus",Neptune:"body.neptune"},tt=[],ft=de=>Ke[de]?Fe(Ke[de]):de;function Oe(de){let Qe=ce("div",{class:"card-body"});Qe.append(ce("h3",Ke[de]?{i18n:Ke[de]}:{"data-meta":""},ft(de))),Qe.append(ce("p",{class:"desc","data-meta":"",i18n:"desc."+de},Fe("desc."+de))),n.items.find(mt=>mt.kind==="sphere"&&mt.pick===de)&&Qe.append(ce("p",{class:"note","data-meta":""},si(),ce("span",{i18n:"card.sphere_note"},Fe("card.sphere_note"))));let dt=Pe[de]||[];for(let mt of tt)md(mt);tt.length=0;for(let mt of dt){let at=Pi(mt,s,t.openSource);tt.push(at),Qe.append(at)}return de==="JWST"&&Qe.append(Bp(e,s,t.openSource,tt,()=>n.model.onPick&&n.model.onPick("jwst_period"),n.zoomStops?mt=>n.model.onZoom&&n.model.onZoom(mt):null)),de==="jwst_period"&&Qe.append(kp(e,s,t.openSource,tt)),po(),dt.length||de==="JWST"||de==="jwst_period"?Qe.querySelector(".num-row")||Qe.append(ce("p",{class:"note",id:"card-numbers-off",i18n:"card.numbers_off"},Fe("card.numbers_off"))):Qe.append(ce("p",{class:"note",i18n:"card.no_numbers"},Fe("card.no_numbers"))),Qe}return{mode:o,views:l,timeHead:G,timeSlider:q,timeDate:ae,layers:z,nums:j,legend:ge,rows:i,rerender:()=>{A(),C(),Z._render(),d.textContent=Fe(d.dataset.i18n);for(let de of i)de._render();for(let de of tt)de._render()},dateItem:g,card:Oe,nameOf:ft}}var Hp="lagrange.panel",Gp={get(){try{return localStorage.getItem(Hp)}catch{return null}},set(n){try{localStorage.setItem(Hp,n)}catch{}}};function Wp(n,e,...t){let i=ce("div",{class:"pop",id:e,hidden:!0,"data-obstacle":""},...t),s=ce("button",{type:"button",class:"pop-btn",i18n:n,"aria-expanded":"false"});return s.addEventListener("click",r=>{r.stopPropagation(),i.hidden=!i.hidden,s.setAttribute("aria-expanded",String(!i.hidden))}),{btn:s,pop:i}}function Xp(n,e,t,i,s){let r=document.body,a=document.getElementById("top"),o=document.getElementById("panel");a.dataset.obstacle="",document.getElementById("version").dataset.obstacle="",document.getElementById("source").dataset.obstacle="";let l=I=>s.setLabelNumbers(I);s.labelNumbersDefault=n.label.numbers,r.append(s.elements.scalebar,s.elements.help);let c={pick:()=>{},layout:n.layout},u=I=>s.handleKey(I);if(n.layout==="panel"){o.dataset.obstacle="";let I=ce("button",{type:"button",id:"panel-toggle",class:"panel-toggle","aria-expanded":"true"}),L=ce("div",{class:"panel-inner"},ce("h2",{id:"panel-h",i18n:"l2.panel"}),ce("div",{class:"ctl"},e.mode,e.views,e.timeHead,e.timeSlider,e.timeDate),e.layers,e.nums,e.legend);o.replaceChildren(I,L);let U=(G,q=!0)=>{r.classList.toggle("panel-collapsed",G),I.setAttribute("aria-expanded",String(!G)),I.dataset.i18n=G?"panel.open":"panel.close",I.textContent=Fe(I.dataset.i18n),q&&Gp.set(G?"collapsed":"open")},N=Gp.get();return U(N?N==="collapsed":i,!1),I.addEventListener("click",()=>U(!r.classList.contains("panel-collapsed"))),c.setCollapsed=U,window.addEventListener("keydown",u),l(n.label.numbers),c}o.hidden=!0;let d=ce("aside",{id:"card",class:"card",hidden:!0,"data-obstacle":"","aria-live":"polite"}),h=ce("button",{type:"button",class:"close",i18n:"source.close"});h.addEventListener("click",()=>{d.hidden=!0});let f=Wp("ui.layers","pop-layers",s.panel()),m=Wp("ui.legend","pop-legend",e.legend);if(r.append(d,f.pop,m.pop),n.layout==="minimal"){let I=ce("div",{id:"chrome",class:"chrome","data-obstacle":""},ce("div",{class:"ctl"},e.mode,e.views,e.timeHead,e.timeSlider,e.timeDate),ce("div",{class:"ctl-row","data-meta":""},f.btn,m.btn));r.append(I);let L=ce("div",{hidden:!0},e.nums);r.append(L);let U=null,N="",G=q=>{if(q&&q.type==="pointermove"){let Z=`${q.clientX},${q.clientY}`;if(Z===N)return;N=Z}r.classList.remove("ui-idle"),clearTimeout(U),U=setTimeout(()=>{!I.matches(":hover")&&f.pop.hidden&&m.pop.hidden&&r.classList.add("ui-idle")},n.ui.autoHideMs)};r.classList.add("ui-idle");for(let q of["pointermove","pointerdown","keydown","touchstart"])window.addEventListener(q,G,{passive:!0});return c.pick=q=>{d.replaceChildren(h,e.card(q)),zt(d),d.hidden=!1},c.wake=G,window.addEventListener("keydown",u),l(n.label.numbers),c}let v=ce("button",{type:"button",id:"all-numbers",i18n:"ui.numbers"}),p=ce("div",{class:"menu-body"},e.views,e.mode,ce("div",{class:"ctl-row","data-meta":""},f.btn,m.btn,v)),g=ce("nav",{id:"menu",class:"menu","data-obstacle":""},p);if(i){let I=ce("button",{type:"button",id:"menu-toggle",class:"menu-toggle",i18n:"ui.menu","aria-expanded":"false","aria-controls":"menu"}),L=U=>{g.classList.toggle("collapsed",!U),I.setAttribute("aria-expanded",String(U))};I.addEventListener("click",U=>{U.stopPropagation(),L(g.classList.contains("collapsed"))}),e.views.addEventListener("click",U=>{U.target.closest("button")&&L(!1)}),g.prepend(I),g.classList.add("menu-mobile"),L(!1),c.setMenuOpen=L}let A=ce("div",{id:"timebar",class:"timebar","data-obstacle":""},e.timeHead,e.timeSlider,e.timeDate),C=ce("aside",{id:"info",class:"info",hidden:!0,"data-obstacle":""}),y=ce("button",{type:"button",class:"close",i18n:"source.close"});y.addEventListener("click",()=>{C.hidden=!0});let E=ce("details",{class:"all-numbers"},ce("summary",{"data-meta":"",i18n:"ui.numbers"}),e.nums),b=null,w=I=>{b=I,C.replaceChildren(y,...I?[e.card(I)]:[],E),E.open=!I,zt(C),C.hidden=!1};s.onChange(()=>{C.hidden||w(b)}),v.addEventListener("click",()=>w(null));let x=ce("div",{id:"focus",class:"focus",hidden:!0,"data-meta":"","data-obstacle":"","aria-live":"polite"});r.append(g,A,C,x),d.remove();let T=()=>{let I=g.getBoundingClientRect();x.style.top=r.classList.contains("chrome-hidden")||!I.height?"":`${Math.round(I.bottom+6)}px`};window.addEventListener("resize",T),c.pick=I=>{let L=zp[I];L&&t.flyTo(L[0],L[1]),w(I),x.dataset.name=I,x.textContent=e.nameOf(I),x.hidden=!1,T()};let R=I=>{let L=[ce("span",{},Fe("jwst.zoom_focus_"+I))];I!=="R5"&&L.push(ce("span",{id:"zoom-norecon",class:"focus-note"},Fe("jwst.zoom_norecon"))),x.replaceChildren(...L)};if(c.renameFocus=()=>{x.dataset.name&&(x.dataset.name.startsWith("zoom:")?R(x.dataset.name.slice(5)):x.textContent=e.nameOf(x.dataset.name))},c.zoom=I=>{let L=t.zoomStops&&t.zoomStops[I];L&&(s.setTemp([L.layer,"n_jwst","n_tags","labels"]),t.setCamera({...L.cam}),x.dataset.name="zoom:"+I,R(I),x.hidden=!1,T())},t.onZoomChange&&t.onZoomChange(I=>{I||(s.clearTemp(),(x.dataset.name||"").startsWith("zoom:")&&(x.hidden=!0,delete x.dataset.name))}),n.layout==="hybrid"){r.classList.add("chrome-hidden");let I=()=>{r.classList.contains("chrome-hidden")&&(r.classList.remove("chrome-hidden"),l(!0))},L=()=>{r.classList.add("chrome-hidden"),C.hidden=!0,l(!1)};document.getElementById("scene").addEventListener("pointerup",I),window.addEventListener("keydown",N=>{u(N)||(N.key==="Escape"?L():I())}),l(!1);let U=c.pick;c.pick=N=>{I(),U(N)},c.reveal=I,c.hide=L}else window.addEventListener("keydown",u),l(n.label.numbers);return c}var bt=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=Fe(r)):s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},Nh=[{id:"bodies",layers:["sun","earth","moon","emb","planets","lpoints"]},{id:"orbits",layers:["halo_main","halo_family","escape","ref","burns","moon_orbit","planet_orbits","dirs","jwst","jwst_ext","jwst_phys"]},{id:"numbers",layers:["n_distance","n_period","n_angle","n_annual","n_escape","n_jwst","n_tags"]},{id:"aux",layers:["labels","scale","grid","axes","stars","milkyway","nightlights","sunglow"]}],wc=Nh.flatMap(n=>n.layers),Sc=n=>Object.fromEntries(wc.map(e=>[e,n.includes(e)])),Mc=Object.fromEntries(Nh.map(n=>[n.id,n.layers])),Jv={clean:Sc(["sun","earth","moon","emb","planets","lpoints","halo_main","moon_orbit","planet_orbits","jwst","stars","milkyway","nightlights","sunglow"]),explore:Sc([...Mc.bodies,...Mc.orbits,"labels","scale","stars","milkyway","nightlights","sunglow"]),research:Sc(wc)},$v={m1:Sc(wc.filter(n=>!["scale","grid","axes","stars","milkyway","nightlights","sunglow","planet_orbits"].includes(n)))},Dh=["clean","explore","research"],jp=[["L","labels"],["O","g:orbits"],["N","g:numbers"],["B","g:bodies"],["G","grid"],["1","p:clean"],["2","p:explore"],["3","p:research"],["?","help"]],qp={sun:n=>n.name==="Sun"||n.name==="Sun_sphere",earth:n=>n.name==="Earth"||n.name==="Earth_sphere",moon:n=>n.name==="Moon"||n.name==="Moon_sphere",emb:n=>n.name==="EMB",planets:n=>n.layer==="planets",lpoints:n=>n.layer==="lpoints",halo_main:n=>n.name==="halo_main"||n.name==="halo_main_label",halo_family:n=>!!n.familyLine,escape:n=>n.layer==="escape",ref:n=>n.layer==="ref",burns:n=>n.layer==="burns",moon_orbit:n=>n.name==="moon_trail",planet_orbits:n=>n.layer==="planet_orbits",dirs:n=>n.layer==="dirs",jwst:n=>n.layer==="jwst",jwst_ext:n=>n.layer==="jwst_ext",jwst_phys:n=>n.layer==="jwst_phys",grid:n=>n.name==="grid",axes:n=>n.name.startsWith("axes_"),stars:n=>n.name==="stars",milkyway:n=>n.name==="milkyway"},Zv=["nightlights","sunglow"],Yp={clean:["jwst"]},Jp="lagrange.layers",$p={get(){try{return JSON.parse(localStorage.getItem(Jp)||"null")}catch{return null}},set(n){try{localStorage.setItem(Jp,JSON.stringify(n))}catch{}}};function Kv(n){let e=n*110,t=10**Math.floor(Math.log10(e)),i=e/t;return(i>=5?5:i>=2?2:1)*t}var Qv=n=>n>=1?Math.round(n).toLocaleString("en-US"):String(Number(n.toPrecision(1)));function Zp(n,e){let t={...Jv,...$v},i=e.persist?$p.get():null,s={preset:e.initial,state:{...t[e.initial]},labelNumbers:!0,familyAll:!1,temp:null,zoomOn:!1},r=()=>s.temp?{...s.state,...Object.fromEntries([...s.temp].map(w=>[w,!0]))}:s.state;if(i&&i.state&&typeof i.state=="object"){for(let w of wc)typeof i.state[w]=="boolean"&&(s.state[w]=i.state[w]);s.preset=Dh.includes(i.preset)||i.preset==="custom"?i.preset:"custom",s.familyAll=!!i.familyAll}let a=[],o=bt("span",{class:"sb-bar"}),l=bt("span",{class:"sb-text"}),c=bt("div",{id:"scalebar",class:"scalebar",hidden:!0,"data-obstacle":"","data-aux":"tick","data-source":"screen scale (camera distance, field of view \u2014 browser drawing aid)","data-verification":"display/approx"},o,l,si()),u="";n.onRender.push(w=>{if(c.hidden)return;let x=w.kmPerPx(),T=Kv(x),R=T/x,I=`${T}|${R.toFixed(1)}`;I!==u&&(u=I,o.style.width=`${R.toFixed(1)}px`,l.textContent=`${Qv(T)} km`,c.dataset.km=String(T))});let d=bt("div",{id:"help",class:"help",hidden:!0,role:"dialog","data-obstacle":"","data-meta":""});function h(){d.replaceChildren(bt("h3",{i18n:"help.title"}),bt("table",{},bt("tbody",{},...jp.map(([x,T])=>bt("tr",{},bt("th",{},bt("kbd",{},x)),bt("td",{i18n:"key."+T.replace(":","_")}))))),bt("p",{class:"note",i18n:"help.note"}));let w=bt("button",{type:"button",class:"close",i18n:"source.close"});w.addEventListener("click",()=>{d.hidden=!0}),d.prepend(w)}h();function f(){for(let w of n.items)w.familyRest&&(w.wanted=s.familyAll,w.obj.visible=n.wantVisible(w))}function m(){let w=r();for(let[x,T]of Object.entries(qp))n.setItemsVisible(T,!!w[x]);if(n.setGraphic)for(let x of Zv)n.setGraphic(x,!!w[x]);for(let x of new Set(Object.values(Yp).flat()))n.setItemsDimmed(qp[x],(Yp[s.preset]||[]).includes(x));f(),n.setLabelsVisible(w.labels),gd((x,T)=>!w.n_tags||x!=="n_other"&&!w[x]?!1:T==="label"?w.labels&&(s.labelNumbers||s.zoomOn&&x==="n_jwst"):!0),po(),c.hidden=!w.scale,u="",e.persist&&$p.set({preset:s.preset,state:s.state,familyAll:s.familyAll}),document.body.dataset.preset=s.preset,s.temp?document.body.dataset.zoomTemp="":delete document.body.dataset.zoomTemp;for(let x of a)x(s)}function v(w){s.preset=w,s.state={...t[w]},m()}function p(w,x){s.state[w]=x,s.preset="custom",s.temp&&s.temp.delete(w),m()}function g(w){let x=new Set(w.filter(T=>!s.state[T]));s.temp=x.size?x:null,s.zoomOn=!0,m()}function A(){!s.temp&&!s.zoomOn||(s.temp=null,s.zoomOn=!1,m())}function C(w){let x=Mc[w],T=x.some(R=>s.state[R]);for(let R of x)s.state[R]=!T,s.temp&&s.temp.delete(R);s.preset="custom",m()}function y(w){s.labelNumbers=w,m()}function E(w){if(w.ctrlKey||w.metaKey||w.altKey)return!1;let x=w.target&&w.target.tagName||"";if(x==="INPUT"||x==="SELECT"||x==="TEXTAREA")return!1;let T=w.key.length===1?w.key.toUpperCase():w.key,R=jp.find(([L])=>L===T);if(!R)return!1;let I=R[1];return e.mobile&&!I.startsWith("p:")&&I!=="help"?!1:(I==="help"?(d.hidden=!d.hidden,d.hidden||zt(d)):I.startsWith("p:")?v(I.slice(2)):I.startsWith("g:")?C(I.slice(2)):p(I,!s.state[I]),!0)}function b(){let w=bt("div",{class:"layer-panel"}),x=bt("div",{class:"preset-row",role:"group"}),T={};for(let G of Dh){let q=bt("button",{type:"button",id:"preset-"+G,i18n:"preset."+G});q.addEventListener("click",()=>v(G)),T[G]=q,x.append(q)}let R=bt("span",{id:"preset-status",class:"preset-status",i18n:"preset.custom"}),I=bt("span",{id:"preset-zoom",class:"preset-status",i18n:"preset.zooming",hidden:!0});x.append(R,I),w.append(x);let L={},U=null;if(!e.mobile){for(let q of Nh){let Z=bt("fieldset",{class:"layer-group","data-meta":""},bt("legend",{i18n:"layer.g_"+q.id}));for(let ae of q.layers){let z=bt("input",{type:"checkbox",id:"lay-"+ae});z.addEventListener("change",()=>p(ae,z.checked)),L[ae]=z,Z.append(bt("label",{},z,bt("span",{i18n:"layer."+ae}),...ae==="planet_orbits"?[document.createTextNode(" "),si()]:[])),ae==="halo_family"&&(U=bt("input",{type:"checkbox",id:"lay-family-all"}),U.addEventListener("change",()=>{s.familyAll=U.checked,m()}),Z.append(bt("label",{class:"sub"},U,bt("span",{i18n:"l2.family_all"}))))}q.id==="numbers"&&Z.append(bt("p",{class:"note",i18n:"layer.tags_note"})),w.append(Z)}let G=bt("button",{type:"button",id:"help-btn",class:"help-btn",i18n:"help.button"});G.addEventListener("click",()=>{d.hidden=!d.hidden,d.hidden||zt(d)}),w.append(bt("div",{class:"keys-line","data-meta":""},bt("span",{i18n:"help.keys_line"}),G))}let N=()=>{for(let q of Dh)T[q].classList.toggle("on",s.preset===q);R.hidden=s.preset!=="custom",I.hidden=!s.temp;let G=r();for(let[q,Z]of Object.entries(L))Z.checked=!!G[q],Z.parentElement.classList.toggle("temp-on",!!(s.temp&&s.temp.has(q)));for(let q of Mc.numbers)L[q]&&q!=="n_tags"&&(L[q].disabled=!G.n_tags);U&&(U.checked=s.familyAll,U.disabled=!s.state.halo_family)};return a.push(N),N(),w}return{get state(){return s.state},get preset(){return s.preset},get labelNumbers(){return s.labelNumbers},get effective(){return r()},get temp(){return s.temp?[...s.temp].sort():[]},applyAll:m,setPreset:v,set:p,toggleGroup:C,setLabelNumbers:y,handleKey:E,panel:b,setTemp:g,clearTemp:A,onChange(w){a.push(w)},elements:{scalebar:c,help:d},rerender(){h()},census:_d}}var Kp={name:"default",layout:"panel",css:{"--bg":"#04060c","--fg":"#e7ecf5","--muted":"#a3aec4","--panel":"rgba(12, 18, 32, 0.92)","--line":"#26324c","--impl":"#5aa5ff","--external":"#f0a23b","--physical":"#3fca7f","--approx":"#9aa0aa","--accent":"#5aa5ff","--font":"'Pretendard', system-ui, 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif","--panel-radius":"10px","--panel-blur":"0px","--panel-width":"340px","--btn-bg":"#1b2740","--btn-on":"#2d4a7a","--label-bg":"rgba(12, 18, 32, 0.72)","--label-border":"1px dashed #26324c","--label-radius":"4px","--label-size":"12px","--fs-body":"13px","--fs-small":"12px","--label-min":"12px"},scene:{background:263692,colors:{sun:16765562,emb:8369151,earth:5217791,moon:13620966,lpt:16743129,unstable:16734810,stable:4180607,haloFam:3824266,haloMain:9425919,escOut:15770171,escIn:5822146,a3:13079274,c3:16763755,c4:16747109,ref4c:11583173,ref4d:8440772,moonTrail:7109270,jwst:15255666,extJpl:15770171,extMine:16767392,physRecon:4180607,physMine:11728335,physJpl:3120739,zoomGap:16777215},lines:{main:2.6,family:1,familyOpacity:.35,traj:1.6,dir:2.2,ref:1.8,dv:1.4,trail:1.4,escape:1.8,jwst:1.6,jwstInterp:1.3,pred:2,zoomGap:1.4,dashPx:7,gapPx:5},points:{lpt:9,emb:8,burn:6,jwst:3.5,jwstMarker:9,predEnd:6,zoomPt:10},spheres:{sunMinPx:9,earthMinPx:6,moonMinPx:4},glow:{sun:3.2,earth:1.8,moon:1.4,strength:.55},familyEvery:10},label:{numbers:!0},layers:{initial:"m1",persist:!1}};var Qp={name:"A",layout:"minimal",css:{"--bg":"#000000","--fg":"#f2f4f8","--muted":"#b4bccb","--panel":"rgba(18, 20, 26, 0.72)","--line":"rgba(255, 255, 255, 0.14)","--accent":"#e8ecf4","--panel-radius":"16px","--panel-blur":"18px","--btn-bg":"rgba(255, 255, 255, 0.08)","--btn-on":"rgba(255, 255, 255, 0.22)","--label-bg":"transparent","--label-border":"none","--label-radius":"0","--label-size":"12px"},scene:{background:0,colors:{haloFam:2898514,haloMain:14674175,lpt:16777215,emb:12571903},lines:{main:2.2,family:.8,familyOpacity:.22,traj:1.2,dir:1.6,ref:1.4,dv:1,trail:1.2,escape:1.4},points:{lpt:7,emb:6,burn:5},glow:{sun:4.2,earth:2.4,moon:1.8,strength:.75},familyEvery:15},label:{numbers:!1},ui:{autoHideMs:2600}};var em={name:"B",layout:"explore",css:{"--bg":"#02040a","--fg":"#eef3fb","--muted":"#a9b6cc","--panel":"rgba(8, 14, 26, 0.94)","--line":"#2a3a58","--accent":"#4fd1ff","--panel-radius":"8px","--panel-width":"360px","--btn-bg":"#14223a","--btn-on":"#1f4f73","--label-bg":"rgba(6, 12, 24, 0.82)","--label-border":"1px solid #2f4a70","--label-radius":"999px","--label-size":"12px"},scene:{background:132106,colors:{haloFam:2707578,haloMain:5231103,lpt:16747232},lines:{main:3,family:1,familyOpacity:.3,traj:1.8,dir:2.4,ref:2,dv:1.6,trail:1.6,escape:2},glow:{sun:3,earth:1.8,moon:1.4,strength:.6},familyEvery:10},label:{numbers:!0}};var tm={name:"C",layout:"hybrid",css:{"--bg":"#000000","--fg":"#f0f4fa","--muted":"#adb8cb","--panel":"rgba(10, 14, 22, 0.86)","--line":"#2a3650","--accent":"#7fc8ff","--panel-radius":"12px","--panel-blur":"12px","--panel-width":"350px","--btn-bg":"rgba(255, 255, 255, 0.07)","--btn-on":"rgba(127, 200, 255, 0.28)","--label-bg":"rgba(0, 0, 0, 0.45)","--label-border":"none","--label-radius":"6px","--label-size":"12px"},scene:{background:0,colors:{haloFam:2834528,haloMain:12575743},lines:{main:2.6,family:.9,familyOpacity:.26,traj:1.5,dir:2,ref:1.7,dv:1.2,trail:1.3,escape:1.7},glow:{sun:3.8,earth:2.2,moon:1.6,strength:.7},familyEvery:12},label:{numbers:!1},ui:{autoHideMs:0},layers:{initial:"clean",persist:!0}};var eb="C",nm={A:Qp,B:em,C:tm,PANEL:{name:"panel"}};function im(n,e){let t={...n};for(let[i,s]of Object.entries(e||{}))t[i]=s&&typeof s=="object"&&!Array.isArray(s)?im(n[i]||{},s):s;return t}function sm(n){let e=null;try{e=new URLSearchParams(n).get("style")}catch{e=null}let t=e&&nm[e.toUpperCase()]||nm[eb];return im(Kp,t)}function rm(n,e=document.documentElement){for(let[t,i]of Object.entries(n.css))e.style.setProperty(t,i);document.body.classList.add(`layout-${n.layout}`,`style-${n.name}`),document.body.dataset.style=n.name}function am(n){if(!("serviceWorker"in navigator))return Promise.resolve(null);let e=i=>{i.waiting&&navigator.serviceWorker.controller&&(n.hidden=!1)};n.addEventListener("click",async()=>{let i=await navigator.serviceWorker.getRegistration();i&&i.waiting&&i.waiting.postMessage({type:"SKIP_WAITING"})});let t=!1;return navigator.serviceWorker.addEventListener("controllerchange",()=>{t||!n.dataset.armed||(t=!0,location.reload())}),n.addEventListener("click",()=>{n.dataset.armed="1"},{capture:!0}),navigator.serviceWorker.register("./sw.js").then(i=>(e(i),i.addEventListener("updatefound",()=>{let s=i.installing;s&&s.addEventListener("statechange",()=>{s.state==="installed"&&e(i)})}),i))}function Uh(n,e){let t=n.dirty?` + ${e["version.dirty"]}`:"";return`v${n.version} \xB7 ${n.date} \xB7 ${e["version.commit"]} ${n.commit}${t}`}var om=null;function lm(n){let e=null,t=null,i=null,s=0,r=null,a={};async function o(){if(e)return e;if(t)return t;if(!n.lab)throw new Error("\uC774 \uD310\uC5D0\uB294 \uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uAC00 \uC5C6\uB2E4 (manifest.lab)");return t=(async()=>{for(let d of n.lab.datasets){let h=await Ti(d.file),f=ni(h,n.verification.details);if(f.errors.length)throw new Error(`${d.id}: ${f.errors.join("; ")}`);h.binary&&(h._arrays=wi(await Hn(h.binary.file),h.binary.arrays)),h.d24&&(h._forest=await Hn(h.d24.file)),a[d.id]=h}let u=a["m3.lab"];return e=Vr(u,u._arrays,u._forest),e})(),t}function l(){if(i)return i;if(es==="embedded"){let u=URL.createObjectURL(new Blob([om],{type:"text/javascript"}));i=new Worker(u)}else i=new Worker("lab-worker.js");return i.onmessage=u=>{let d=u.data;if(!r||d.id!==r.id)return;if(d.type==="progress"){r.onProgress&&r.onProgress(d);return}let h=r;r=null,d.type==="done"?h.resolve({...d.result,wall_ms:performance.now()-h.t0}):h.reject(new Error(d.message))},i.onerror=u=>{if(r){let d=r;r=null,d.reject(new Error(u.message||"Worker \uC624\uB958"))}},i}function c(u,d={}){if(!e)return Promise.reject(new Error("\uBA3C\uC800 lab.load()"));let h=l();if(r){let m=r;r=null,m.reject(new Error("\uBC84\uB9BC"))}let f=++s;return new Promise((m,v)=>{r={id:f,resolve:m,reject:v,onProgress:d.onProgress,t0:performance.now()},h.postMessage({id:f,params:e.escapeParams(d),s0:Array.from(u),chunk:d.chunk,trajTol:d.trajTol,trajMax:d.trajMax})})}return{load:o,integrate:c,get loaded(){return!!e},get lab(){return e},datasets:a,predict:u=>ys(e,u),predictState:u=>Zc(e,u),components:u=>Zi(e,u),stateOf:u=>Qa(e,u)}}function Wa(n,e){let t={},i=null;async function s(){if(i)return i;let l=n[e];if(!l)throw new Error(`\uC774 \uD310\uC5D0\uB294 ${e} \uC790\uB8CC\uAC00 \uC5C6\uB2E4`);return i=(async()=>{for(let c of l.datasets){let u=await Ti(c.file),d=ni(u,n.verification.details);if(d.errors.length)throw new Error(`${c.id}: ${d.errors.join("; ")}`);u.binary&&(u._arrays=wi(await Hn(u.binary.file),u.binary.arrays)),u.chunks&&(u._chunks={}),t[c.id]=u}return t})(),i}let r={};async function a(l,c){await s();let u=t[l];if(!u||!u.chunks)throw new Error(`${l}: \uC870\uAC01 \uC790\uB8CC\uAC00 \uC544\uB2C8\uB2E4`);if(u._chunks[c])return u._chunks[c];let d=l+":"+c;if(!r[d]){let h=u.chunks.find(f=>f.year===c);if(!h)throw new Error(`${l}: \uC870\uAC01 ${c} \uC5C6\uC74C`);r[d]=Hn(h.file).then(f=>(u._chunks[c]=wi(f,h.arrays),u._chunks[c]))}return r[d]}async function o(){await s();for(let[l,c]of Object.entries(t))if(c.chunks)for(let u of c.chunks)await a(l,u.year);return t}return{load:s,loadChunk:a,loadAllChunks:o,datasets:t,get loaded(){return Object.keys(t).length>0},available:!!n[e]}}var tb={target:"L2",dist:17e5,az:-1.25,el:.8},nb=300,Fh=900,ji=2e3,ib={tag:"impl",detail:"implementation"},Ec=[{id:"truth",key:"lab.col_truth",src:"m3.lab.json>integrate (core/lab/escape.js DOP853, Worker)"},{id:"T3",key:"lab.col_t3",src:"m3.lab.json>t3 (core/lab/eigen.js lnT3)"},{id:"D24",key:"lab.col_d24",src:"m3.lab.json>d24 (core/lab/forest.js predictD24)"},{id:"MLP",key:"lab.col_mlp",src:"m3.lab.json>mlp (core/lab/mlp.js predictMLP)"},{id:"HYB",key:"lab.col_hybrid",src:"m3.lab.json>d24>w_R (\uD558\uC774\uBE0C\uB9AC\uB4DC = D24, w_R \uBAA8\uB450 0)",only:["research"]},{id:"dT3",key:"lab.col_dt3",src:"core/lab \u2014 ln t_T3 \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"T3"},{id:"dD24",key:"lab.col_dd24",src:"core/lab \u2014 ln t_D24 \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"D24"},{id:"dMLP",key:"lab.col_dmlp",src:"core/lab \u2014 ln t_MLP \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"MLP"},{id:"dir",key:"lab.col_dir",src:"core/lab \u2014 e_u* \uBD80\uD638 \uB300 \uC815\uB2F5 \uC774\uD0C8 \uBC29\uD5A5",only:["research"]}],Xa=n=>{if(!Number.isFinite(n))return"\u2014";let e=Math.exp(n);return e>=100?e.toFixed(1):e>=10?e.toFixed(2):e.toFixed(3)},sb=n=>Number.isFinite(n)?(n>=0?"+":"\u2212")+Math.abs(n).toExponential(1):"\u2014",Tc=n=>{if(n===0)return"0";let e=Math.floor(Math.log10(Math.abs(n)));return`${(n/10**e).toFixed(2)}e${e}`};function cm({view:n,labApi:e,layers:t,mobile:i,onOpen:s}){let r=ce("aside",{id:"lab",class:"lab",hidden:!0,"data-obstacle":"","aria-live":"polite"}),a=ce("button",{type:"button",id:"view-lab",i18n:"l2.view_lab"}),o={v:null,E:null,pred:null,flags:null,truth:null,outside:!1,timer:null,job:0,built:!1,example:null,lastResult:null},l=null;if(i){let S=ce("div",{id:"lab-mobile",class:"lab-mobile"},ce("p",{i18n:"lab.mobile_note"})),_=ce("button",{type:"button",class:"close",i18n:"source.close"});return _.addEventListener("click",()=>{r.hidden=!0}),r.append(_,ce("h3",{i18n:"lab.title"}),S),a.addEventListener("click",()=>{r.hidden=!1,zt(r),s&&s()}),{panel:r,button:a,open:async()=>{r.hidden=!1,zt(r)},state:o}}let c=ce("button",{type:"button",class:"close",id:"lab-close",i18n:"source.close"}),u=ce("div",{id:"lab-status",class:"lab-status","data-meta":"",i18n:"lab.loading"}),d=[],h=()=>{let S=Ri(ib,n.model.table);return d.push(S),S},f=ce("div",{class:"lab-scope","data-meta":""},h(),ce("span",{i18n:"lab.scope"})),m=ce("div",{id:"lab-examples",class:"lab-examples","data-meta":""}),v=ce("div",{id:"lab-example-src",class:"lab-note","data-meta":""}),p=ce("div",{id:"lab-controls",class:"lab-controls","data-meta":""}),g=ce("div",{id:"lab-flags",class:"lab-flags"}),A=ce("div",{id:"lab-progress",class:"lab-progress","data-meta":""}),C=ce("progress",{id:"lab-bar",max:1,value:0}),y=ce("span",{id:"lab-progtext"});A.append(C,y);let E=ce("table",{id:"lab-table",class:"lab-table"}),b=ce("div",{class:"lab-table-wrap"},E),w=ce("div",{id:"lab-foot",class:"lab-note","data-meta":""}),x=ce("button",{type:"button",class:"lab-fold",id:"lab-fold","aria-expanded":"true"}),T="lagrange.lab.folded",R={get(){try{return localStorage.getItem(T)==="1"}catch{return!1}},set(S){try{localStorage.setItem(T,S?"1":"0")}catch{}}};function I(S,_=!0){r.dataset.folded=S?"1":"0",x.setAttribute("aria-expanded",S?"false":"true"),x.dataset.i18n=S?"lab.unfold":"lab.fold";try{x.textContent=Fe(x.dataset.i18n)}catch{}_&&R.set(S)}x.addEventListener("click",()=>I(r.dataset.folded!=="1")),I(R.get(),!1),r.append(c,x,ce("h3",{i18n:"lab.title"}),f,u,m,v,p,g,A,b,w),c.addEventListener("click",()=>at());let L={};function U(S,_,D,F){let J=ce("input",{type:"range",id:"lab-"+S,min:String(_),max:String(D),step:String(F),"aria-label":S}),he=ce("span",{class:"lab-val",id:"lab-"+S+"-val"}),pe=ce("label",{class:"lab-row"},ce("span",{class:"lab-name",i18n:"lab.s_"+S}),J,he);return J.addEventListener("input",()=>j(S)),J.addEventListener("change",()=>ye()),L[S]={input:J,val:he,row:pe},pe}let N=ce("button",{type:"button",id:"lab-sign-out",i18n:"lab.sign_out"}),G=ce("button",{type:"button",id:"lab-sign-in",i18n:"lab.sign_in"}),q=ce("input",{type:"checkbox",id:"lab-outside"}),Z=ce("label",{class:"lab-outside",id:"lab-outside-row"},q,ce("span",{i18n:"lab.outside"}));function ae(){let S=l.sliders,_=o.outside?S.out_factor:1;return{es:S.es_in*_,ap:S.ap_in*_,az:S.az_in*_}}function z(){let S=o.v,_=ae(),D=l.sliders;L.eu.input.value=String(Math.round((Math.log10(Math.max(S.eu,1e-300))-D.eu_log10[0])/(D.eu_log10[1]-D.eu_log10[0])*Fh)),L.es.input.value=String(Math.round(S.es/_.es*ji)),L.ap.input.value=String(Math.round(S.ap/_.ap*ji)),L.az.input.value=String(Math.round(S.az/_.az*ji)),L.phip.input.value=String(Math.round(S.phip*180/Math.PI)),L.phiz.input.value=String(Math.round(S.phiz*180/Math.PI)),L.eu.val.textContent=`${Tc(S.eu)} \u03B3`,L.es.val.textContent=`${Tc(S.es)} \u03B3`,L.ap.val.textContent=`${Tc(S.ap)} \u03B3`,L.az.val.textContent=`${Tc(S.az)} \u03B3`,L.phip.val.textContent=`${(S.phip*180/Math.PI).toFixed(0)}\xB0`,L.phiz.val.textContent=`${(S.phiz*180/Math.PI).toFixed(0)}\xB0`,N.classList.toggle("on",S.sign>0),G.classList.toggle("on",S.sign<0)}function V(S){let _=Number(L[S].input.value),D=ae(),F=l.sliders;return S==="eu"?10**(F.eu_log10[0]+_/Fh*(F.eu_log10[1]-F.eu_log10[0])):S==="phip"||S==="phiz"?_*Math.PI/180:_/ji*D[S]}function j(S){o.example=null;let _={...o.v,[S]:V(S)};!o.outside&&S!=="phip"&&S!=="phiz"&&(_=Ur(l,_,S)),o.v=_,z(),ge(),Pe()}function Y(S){o.example=null,o.v={...o.v,sign:S},z(),ge(),Pe(),ye()}N.addEventListener("click",()=>Y(1)),G.addEventListener("click",()=>Y(-1)),q.addEventListener("change",()=>re(q.checked));function re(S){if(o.outside=S&&t.preset==="research",q.checked=o.outside,!o.outside&&o.v&&!o.example){let _=o.v;for(let D of["eu","es","ap","az"])_=Ur(l,_,D);o.v=_}l&&(z(),ge(),ye())}function xe(){let S=ce("tr",{},ce("th",{"data-meta":"",i18n:"lab.col_r"}));for(let D of Ec){let F=ce("th",{class:"c-"+D.id,"data-col":D.id,"data-meta":""},ce("span",{i18n:D.key}));D.id!=="dir"&&F.append(h()),S.append(F)}S.append(ce("th",{class:"c-flag","data-meta":"",i18n:"lab.col_flag"}));let _=ce("tbody");l.R_over_gamma.forEach((D,F)=>{let J=ce("tr",{"data-k":String(F)},ce("td",{"data-meta":""},`${l.labels[F]} \u03B3`));for(let he of Ec){let pe=ce("td",{class:"num c-"+he.id,"data-col":he.id,"data-source":he.src,"data-verification":"impl/implementation","data-browser":"1"});J.append(pe)}J.append(ce("td",{class:"c-flag","data-col":"flag"})),_.append(J)}),E.replaceChildren(ce("thead",{},S),_)}function me(S,_){return E.querySelector(`tbody tr[data-k="${S}"] td[data-col="${_}"]`)}function _e(S,_,D){S.dataset.value=String(_),S.textContent=D}function ee(){let S=o.pred,_=o.flags;l.R_over_gamma.forEach((D,F)=>{_e(me(F,"T3"),S.T3[F],Xa(S.T3[F])),_e(me(F,"D24"),S.D24?S.D24[F]:NaN,S.D24?Xa(S.D24[F]):"\u2014"),_e(me(F,"MLP"),S.MLP[F],Xa(S.MLP[F])),_e(me(F,"HYB"),S.D24?S.D24[F]:NaN,S.D24?Xa(S.D24[F]):"\u2014");let J=me(F,"flag"),he=[];_.inRange||he.push(ce("span",{class:"flag flag-extrap",i18n:"lab.flag_extrap"})),_.uncertain[F]&&he.push(ce("span",{class:"flag flag-unc",i18n:"lab.flag_unc",title:Fe(_.mismatch[F]?"lab.flag_unc_mismatch":"lab.flag_unc_spread")})),J.replaceChildren(...he),J.dataset.uncertain=_.uncertain[F]?"1":"0"}),g.replaceChildren(..._.inRange?[]:[ce("span",{id:"lab-extrap",class:"flag flag-extrap",i18n:"lab.extrap_long"})]),le(),zt(r)}function le(){let S=o.truth;l.R_over_gamma.forEach((_,D)=>{if(!S){_e(me(D,"truth"),NaN,"\u2026");for(let he of Ec)(he.diff||he.id==="dir")&&_e(me(D,he.id),NaN,"\u2026");return}let F=Math.log(S.t_days[D]);_e(me(D,"truth"),F,Number.isFinite(F)?Xa(F):Fe("lab.no_escape"));for(let he of Ec)if(he.diff){let pe=o.pred[he.diff],se=pe?pe[D]-F:NaN;_e(me(D,he.id),se,sb(se))}let J=S.dir[D]===0?null:Math.sign(o.pred.eus)===S.dir[D];_e(me(D,"dir"),J===null?NaN:J?1:0,J===null?"\u2014":Fe(J?"lab.dir_hit":"lab.dir_miss"))})}function ge(){o.E=o.example!==null?l.examples[o.example].E.slice():to(l,o.v),o.pred=e.predict(o.E),o.flags=_s(l,o.pred),o.truth=null,ee()}function Pe(){clearTimeout(o.timer),o.timer=null}function ye(){Pe(),o.timer=setTimeout(it,nb),y.textContent=Fe("lab.waiting")}function je(){let S=n.model.constants.length_unit_km,_=n.state.cam.dist,D=l.frame.gamma*l.R_over_gamma[l.R_over_gamma.length-1]*S,F=Math.max(.05,(_-D)/_);return n.kmPerPx()*F/n.renderer.getPixelRatio()/S}async function it(){o.timer=null;let S=++o.job,_=l.escapeParams().t_max_days;C.max=_,C.value=0,y.textContent=Fe("lab.integrating"),r.dataset.integrating="1";let D=je();try{let F=await e.integrate(e.stateOf(o.E),{trajTol:D,onProgress:J=>{S===o.job&&(C.value=J.t_days,y.textContent=Fe("lab.integrating_days",{d:J.t_days.toFixed(0)}))}});if(S!==o.job)return;o.truth=F,o.lastResult=F,o.trajTolUsed=D,o.trajE=o.E,C.value=F.t_reached_days,y.textContent=Fe("lab.done",{ms:F.wall_ms.toFixed(0),n:F.traj?F.traj.n:0}),le(),tt(F),ft(F),zt(r),r.dataset.integrating="0",r.dataset.done=String(S)}catch(F){if(String(F.message)==="\uBC84\uB9BC")return;y.textContent=Fe("lab.error",{msg:F.message}),r.dataset.integrating="0"}}function Ke(){let S=l.s_ref,_=l.frame.gamma,D=160;l.R_over_gamma.forEach((F,J)=>{let he=new Float64Array(3*(D+1));for(let pe=0;pe<=D;pe++){let se=2*Math.PI*pe/D;he[3*pe]=S[0]+F*_*Math.cos(se),he[3*pe+1]=S[1]+F*_*Math.sin(se),he[3*pe+2]=S[2]}n.addPolyline("lab_ring_"+J,"lab",he,7109270,1,.55,{dashed:!0})})}function tt(S){if(n.removeItem&&n.removeItem("lab_traj"),!S.traj||S.traj.n<2)return;let _=S.traj.points,D=l.s_ref,F=new Float64Array(_.length);for(let pe=0;pe<_.length;pe+=3)F[pe]=D[0]+_[pe],F[pe+1]=D[1]+_[pe+1],F[pe+2]=D[2]+_[pe+2];let J=S.dir.filter(pe=>pe!==0).pop(),he=J>0?n.COLORS.escOut:J<0?n.COLORS.escIn:13686498;n.addPolyline("lab_traj","lab",F,he,2.2),r.dataset.trajN=String(S.traj.n),n.render()}function ft(S){if(!S.traj||S.traj.n<2||r.hidden||n.state.cam.target!=="L2"||n.state.fly)return;let _=S.traj.points,D=0;for(let ue=0;ue<_.length;ue+=3)D=Math.max(D,Math.hypot(_[ue],_[ue+1],_[ue+2]));if(!(D>0))return;let F=D*n.model.constants.length_unit_km,J=n.camera,he=J.fov*Math.PI/360,pe=Math.atan(Math.tan(he)*J.aspect),se=F/Math.sin(Math.min(he,pe))*1.1;o.fitDist=se,!(Math.abs(Math.log(se/n.state.cam.dist))<.01)&&n.flyTo("L2",se,.8)}let Oe=null,ot=0,de=!1;n.onRender.push(()=>{if(!l||r.hidden||!o.lastResult||de)return;let S=n.state.cam,_=`${S.dist}|${S.target}|${n.state.fly?1:0}`,D=performance.now();if(_!==Oe){Oe=_,ot=D;return}D-ot<250||n.state.fly||o.timer||r.dataset.integrating==="1"||o.trajE!==o.E||!(je()<o.trajTolUsed/1.5)||Qe()});async function Qe(){de=!0;let S=je(),_=o.E;try{let D=await e.integrate(e.stateOf(_),{trajTol:S});if(o.E!==_||r.dataset.integrating==="1")return;o.lastResult={...o.lastResult,traj:D.traj},o.trajTolUsed=S,tt(D),r.dataset.resampled=String((Number(r.dataset.resampled)||0)+1)}catch(D){String(D.message)!=="\uBC84\uB9BC"&&console.warn("\uADA4\uC801 \uB2E4\uC2DC \uBF51\uAE30 \uC2E4\uD328",D)}finally{de=!1}}function pt(){m.replaceChildren(ce("span",{class:"ctl-h",i18n:"lab.examples"})),l.examples.forEach((S,_)=>{let D=ce("button",{type:"button",class:"lab-ex",id:"lab-ex-"+_,"data-ex":String(_),i18n:"lab.ex_"+S.kind});D.addEventListener("click",()=>dt(_)),m.append(D)})}function dt(S){let _=l.examples[S];o.example=S,o.v=no(l,_.E),z();for(let D of m.querySelectorAll(".lab-ex"))D.classList.toggle("on",D.dataset.ex===String(S));v.textContent=Fe("lab.ex_src",{no:_.sample_no??"\u2014",src:Ci()==="en"?_.source_en:_.source}),ge(),Pe(),it()}function k(){let S=t.preset;r.dataset.preset=S,Z.hidden=S!=="research",S!=="research"&&o.outside&&re(!1),w.replaceChildren(...S==="research"?[ce("span",{i18n:"lab.hybrid_note"})]:[],ce("span",{i18n:"lab.foot"})),zt(w)}async function mt(){if(r.hidden=!1,s&&s(),n.setCamera({...tb}),n.setLayer("lab",!0),o.built)return k(),o;if(u.hidden=!1,zt(r),l=await e.load(),!l.uncertain||!l.sliders||l.examples.length!==5)throw new Error("\uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uC5D0 uncertain\xB7sliders\xB7examples \uAC00 \uC5C6\uB2E4 (main.py web \uB2E4\uC2DC)");p.replaceChildren(ce("div",{class:"lab-row lab-sign"},ce("span",{class:"lab-name",i18n:"lab.s_sign"}),N,G),U("eu",0,Fh,1),U("es",-ji,ji,1),U("ap",0,ji,1),U("phip",0,359,1),U("az",0,ji,1),U("phiz",0,359,1),Z);let S=l.sliders,_=(Math.log10(S.eu_train[0])-S.eu_log10[0])/(S.eu_log10[1]-S.eu_log10[0])*100,D=(Math.log10(S.eu_train[1])-S.eu_log10[0])/(S.eu_log10[1]-S.eu_log10[0])*100;return L.eu.input.style.setProperty("--band-a",_+"%"),L.eu.input.style.setProperty("--band-b",D+"%"),L.eu.input.classList.add("banded"),xe(),pt(),Ke(),u.hidden=!0,o.built=!0,t.onChange(k),k(),dt(l.examples.findIndex(F=>F.kind==="q50")),o}function at(){r.hidden=!0,Pe(),n.setLayer("lab",!1)}return a.addEventListener("click",()=>{mt().catch(S=>{u.hidden=!1,u.textContent=Fe("lab.error",{msg:S.message})})}),{panel:r,button:a,open:mt,close:at,state:o,rerender(){for(let S of d)S._render();if(o.example!==null&&l){let S=l.examples[o.example];v.textContent=Fe("lab.ex_src",{no:S.sample_no??"\u2014",src:Ci()==="en"?S.source_en:S.source})}},get lab(){return l},slide(S,_,D=!0){L[S].input.value=String(_),j(S),D&&ye()},useExample:dt,setOutside:re}}var rb=["sun","earth","moon","emb"];function um(n,e=()=>{}){let t=null,i=null,s=new Set;async function r(){return await n.load(),t=n.datasets["m4.ephem"],i=Ar(t,{}),c}function a(u){return i.chunkFor(u).year}function o(u){i.hasChunk(u)||s.has(u)||(s.add(u),e(!0),n.loadChunk("m4.ephem",u).then(d=>{i.hasChunk(u)||i.addChunk(u,d),s.delete(u),e(s.size>0)}).catch(d=>{s.delete(u),e(s.size>0),console.warn("\uCC9C\uCCB4\uB825 \uC870\uAC01 \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",u,d)}))}async function l(u){let d=a(u);if(!i.hasChunk(d))for(o(d);!i.hasChunk(d);)await new Promise(h=>setTimeout(h,10))}let c={init:r,ensure:l,get range(){return t.range_tdb_s},get tMin(){return t.range_tdb_s[0]},get tMax(){return t.range_tdb_s[1]},ready:u=>i.hasChunk(a(u)),loadedYears:()=>t.chunks.map(u=>u.year).filter(u=>i.hasChunk(u)),evaluate(u){let d=a(u);if(!i.hasChunk(d))return o(d),null;let h=[],f=[];for(let m of rb){let v=i.evaluate(m,u,d);h.push(v.pos),f.push(v.vel)}return{pos:h,vel:f}},solar:()=>i};return c}var Ac={startPx:160,releasePx:80,holdMs:2e3};function hm(n,e={}){let t={},i=[],s=e.mobile?"mobile":e.single?"single":null;function r(h){return s||(globalThis.__LAGRANGE_TEX2K?"test2k":h.hi?h.hiPx&&n.maxTextureSize()<Math.max(...h.hiPx)?"maxTextureSize "+n.maxTextureSize():n.qualityAllowsHiTex()?null:"quality":"no_hi")}async function a(h){let f={...h,level:null,pending:null,hiTex:null,loTex:null,px:0,belowSince:null,loads:0,releases:0,last_upload:null,steps:[],blocked:null,hiBitmap:null};t[h.id]=f,i.push(f);let m=performance.now(),v=await h.lo(),p=[v.width,v.height];return f.loTex=n.makeTexture(v,{mipmaps:h.mipmaps!==!1,wrapS:h.wrapS}),n.renderer.initTexture(f.loTex),v.close&&v.close(),h.apply(f.loTex,"2k"),f.level="2k",f.steps.push({level:"2k",ms:performance.now()-m,px:p}),f}function o(h){let f={cancelled:!1,stream:null};h.pending=f,(async()=>{let m=performance.now(),v=await h.hi();if(f.cancelled){v.close&&v.close();return}let p=performance.now()-m,g={mipmaps:h.mipmaps!==!1,wrapS:h.wrapS,anisotropy:n.renderer.capabilities.getMaxAnisotropy()};f.stream=globalThis.__LAGRANGE_TILES===!1?Pp(n.renderer,v,g):Ip(n.renderer,v,{...g,nx:4,ny:2,border:8});let A=await f.stream.promise;if(v.close&&v.close(),f.cancelled){A.dispose();return}h.hiTex=A,h.pending=null,h.level="8k",h.loads++,h.apply(A,"8k");let C=f.stream.state;h.last_upload={tiled:!!A.isTiled,allocs:C.allocs?C.allocs.map(y=>Math.round(y.ms*10)/10):null,decode_ms:p,alloc_ms:C.alloc_ms??null,chunks:C.chunks.length,chunk_max_ms:Math.max(...C.chunks.map(y=>y.ms)),chunk_ms:C.chunks.map(y=>[y.level,Math.round(y.ms*10)/10,Math.round(y.at)]),blits:C.blits.length,blit_max_ms:C.blits.length?Math.max(...C.blits.map(y=>y.ms)):0,fence_waits:C.fence_waits,decode_at:[Math.round(m),Math.round(m+p)],total_ms:performance.now()-m,px:[C.w,C.h],levels:C.levels},h.steps.push({level:"8k",ms:performance.now()-m,px:[C.w,C.h]})})().catch(m=>{console.warn("8K \uADF8\uB9BC \uC62C\uB9AC\uAE30 \uC2E4\uD328",h.id,m),h.pending=null,h.blocked=String(m)})}function l(h){h.pending&&(h.pending.cancelled=!0,h.pending.stream&&h.pending.stream.cancel(),h.pending=null),h.hiTex&&(h.apply(h.loTex,"2k"),h.hiTex.dispose(),h.hiTex=null,h.releases++),h.level="2k"}function c(){let h=performance.now();for(let f of i)if(f.level){if(f.blocked=r(f),f.blocked){(f.hiTex||f.pending)&&l(f);continue}f.px=f.sphere?n.sphereScreenPx(f.sphere):1/0,f.px>=Ac.startPx?(f.belowSince=null,!f.hiTex&&!f.pending&&o(f)):f.px<Ac.releasePx&&(f.hiTex||f.pending)?f.belowSince===null?f.belowSince=h:h-f.belowSince>=Ac.holdMs&&(l(f),f.belowSince=null):f.belowSince=null}}n.onRender.push(c);function u(h,f,m=6e4){return new Promise((v,p)=>{let g=performance.now(),A=()=>{let C=t[h];C&&C.level===f&&!C.pending?v(d()[h]):performance.now()-g>m?p(new Error(`${h} ${f} \uAE30\uB2E4\uB9BC \uC2DC\uAC04 \uB118\uC74C (${C&&C.level})`)):setTimeout(A,50)};A()})}function d(){let h={};for(let f of i)h[f.id]={level:f.level,pending:!!f.pending,px:f.px,loads:f.loads,releases:f.releases,blocked:f.blocked,last_upload:f.last_upload,steps:f.steps};return h}return{add:a,tick:c,slots:t,snapshot:d,waitLevel:u,rule:Ac,gpuTextures:()=>n.renderer.info.memory.textures}}var Oh={};async function xr(n,e={}){Oh[n]||(Oh[n]=Hn(n).then(i=>new Blob([i],{type:"image/webp"})));let t=await Oh[n];return createImageBitmap(t,{imageOrientation:"from-image",premultiplyAlpha:"none",colorSpaceConversion:"none",...e})}function dm(n,e,t,i){let s=es==="embedded",r=hm(t,{mobile:i,single:s}),a={moon:null,steps:[],gpu_bytes:0,skipped8k:i?"mobile":s?"single":null,lod:null};t.onRender.push(()=>{let l=r.slots.earth_day;l&&(a.earth=l.level);let c=r.slots.moon;if(c&&a.moon!==c.level){a.moon=c.level,c.level==="8k"&&!a.steps.some(d=>d.moon==="8k")&&a.steps.push({moon:"8k",ms:c.steps[c.steps.length-1].ms,px:c.steps[c.steps.length-1].px});let u=c.level==="8k"?(c.last_upload||{}).px||[8192,4096]:c.steps[0].px;a.gpu_bytes=u[0]*u[1]*4*4/3}});async function o(){if(!e.available)return a;let c=(await e.load())["m4.textures"];if(!c||!c.moon)return a;if(c.orient&&c._arrays){let d=Wr(c);a.orient=d,t.setSphereOrient("Moon_sphere",h=>d.moon(h)),c.earth&&c.earth.earth_day&&t.setSphereOrient("Earth_sphere",h=>d.earth(h))}else t.setFaceTo("Moon_sphere","Earth");let u=await r.add({id:"moon",sphere:"Moon_sphere",lo:()=>xr(c.moon.lo.file),hi:()=>xr(c.moon.hi.file),hiPx:c.moon.hi.size_px,apply:(d,h)=>t.setSphereMap("Moon_sphere",d,h)});if(c.earth&&c.earth.earth_day){for(let[d,h]of[["earth_day","map"],["earth_night","nightMap"]]){let f=c.earth[d];await r.add({id:d,sphere:"Earth_sphere",lo:()=>xr(f.lo.file),hi:()=>xr(f.hi.file),hiPx:f.hi.size_px,apply:(m,v)=>t.setSphereMap("Earth_sphere",m,v,h)})}a.earth="2k"}return a.moon="2k",a.gpu_bytes=u.steps[0].px[0]*u.steps[0].px[1]*4*4/3,a.steps.push({moon:"2k",ms:u.steps[0].ms,px:u.steps[0].px}),!a.skipped8k&&t.maxTextureSize()<c.moon.hi.size_px[0]&&(a.skipped8k="maxTextureSize "+t.maxTextureSize()),a}return{run:o,state:a,lod:r}}var fm=5e10,qi=[[-.4,[.61,.69,1]],[0,[.79,.84,1]],[.4,[.97,.97,1]],[.6,[1,.96,.91]],[.8,[1,.91,.8]],[1.2,[1,.82,.63]],[1.6,[1,.73,.46]],[2,[1,.62,.35]]];function ab(n){if(n<=qi[0][0])return qi[0][1];for(let e=1;e<qi.length;e++)if(n<=qi[e][0]){let[t,i]=qi[e-1],[s,r]=qi[e],a=(n-t)/(s-t);return i.map((o,l)=>o+a*(r[l]-o))}return qi[qi.length-1][1]}function pm(n,e,t){let i=e._arrays,s=i.dir.data,r=i.mag.data,a=i.ci.data,o=t?e.mag_limit_mobile:e.mag_limit,l=[];for(let p=0;p<r.length;p++)r[p]<=o&&l.push(p);let c=new Float32Array(l.length*3),u=new Float32Array(l.length*3),d=new Float32Array(l.length);l.forEach((p,g)=>{for(let y=0;y<3;y++)c[3*g+y]=s[3*p+y]*fm;let A=ab(a[p]),C=Math.min(1,.35+.65*Math.max(0,(o-r[p])/(o+1.5)));u.set(A.map(y=>y*C),3*g),d[g]=Math.min(9,1.2+2.4*Math.max(0,6.5-r[p])**.8)});let h=new Gt;h.setAttribute("position",new Ht(c,3)),h.setAttribute("color",new Ht(u,3)),h.setAttribute("psize",new Ht(d,1));let f=new Lt({uniforms:{pr:{value:n.renderer.getPixelRatio()}},vertexShader:["attribute float psize; varying vec3 vC; uniform float pr;","#include <common>","#include <logdepthbuf_pars_vertex>","void main() { vC = color; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = psize * pr;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["varying vec3 vC;","#include <common>","#include <logdepthbuf_pars_fragment>","void main() {","#include <logdepthbuf_fragment>","vec2 q = gl_PointCoord - 0.5; float r = length(q) * 2.0; if (r > 1.0) discard;","float a = smoothstep(1.0, 0.0, r); gl_FragColor = vec4(vC * a, a); }"].join(`
`),vertexColors:!0,transparent:!0,depthTest:!1,depthWrite:!1,blending:gi}),m=new Oi(h,f),v=n.addSky("stars","sky",m,p=>{f.uniforms.pr.value=p.renderer.getPixelRatio()});return v.count=l.length,v}function mm(n,e){let t=e.gal_to_ecl,i=new Ze().set(t[0][0],t[1][0],t[2][0],t[0][1],t[1][1],t[2][1],t[0][2],t[1][2],t[2][2]),s=new Lt({uniforms:{...Va("map"),Gt:{value:i},gain:{value:0}},vertexShader:["varying vec3 vD;","#include <common>","#include <logdepthbuf_pars_vertex>","void main() { vD = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:[za("map",!0),"uniform mat3 Gt; uniform float gain; varying vec3 vD;","#include <common>","#include <logdepthbuf_pars_fragment>","void main() {","#include <logdepthbuf_fragment>","vec3 g = normalize(Gt * normalize(vD));","float l = atan(g.y, g.x); float b = asin(clamp(g.z, -1.0, 1.0));","vec2 uv = vec2(0.5 - l / (2.0 * PI), 0.5 - b / PI);","gl_FragColor = vec4(map_sample(uv).rgb * gain, 1.0);","#include <colorspace_fragment>","}"].join(`
`),side:Kt,depthTest:!1,depthWrite:!1}),r=new Wt(new mi(fm*1.02,96,48),s),a=n.addSky("milkyway","sky",r);return a.renderOrder=-20,r.renderOrder=-20,a.level=null,a.setTexture=(o,l)=>{o.isTiled||(o.magFilter=Rt),bc(s.uniforms,"map",o),s.uniforms.gain.value=n.tokens.scene.milkyWayGain??.1,a.level=l,a.px=[o.image.width,o.image.height]},a}async function gm(n,e,t,i,s){let r=e.variants,a=r.hi.level||"4k_lossless",o=await i.add({id:"milkyway",sphere:null,mipmaps:!1,wrapS:js,lo:()=>s(r.lo.file),hi:()=>s(r.hi.file),hiPx:r.hi.size_px,apply:(u,d)=>n.setTexture(u,d==="8k"?a:"2k")}),l=[{level:"2k",ms:o.steps[0].ms}];if(i.tick(),o.blocked)return{level:"2k",steps:l,skipped:o.blocked,hi:Promise.resolve({level:"2k",steps:l,skipped:o.blocked})};let c=i.waitLevel("milkyway","8k",6e5).then(()=>({level:n.level,steps:[...l,{level:n.level,ms:o.steps[o.steps.length-1].ms,upload:o.last_upload}]}));return{level:"2k",steps:l,hi:c}}var Cc=He;function Bh(n,e){let t=document.getElementById("error");t.textContent=Fe(n,{msg:e}),t.hidden=!1}function _m(){let n=document.getElementById("version");n.textContent=Uh(Cc,Xr[Ci()]),document.title=Fe("app.title")}async function ob(){let n=sm(location.search);rm(n),nu(),zt(),_m();let e,t={};try{e=await Ti("manifest.json");let R=Er(e);if(R.length){Bh("error.schema",R.join("; "));return}for(let I of e.datasets){let L=await Ti(I.file),U=ni(L,e.verification.details);if(U.errors.length){Bh("error.schema",`${I.id}: ${U.errors.join("; ")}`);return}for(let N of U.warnings)console.warn(I.id,N);L.binary&&(L._arrays=wi(await Hn(L.binary.file),L.binary.arrays)),t[I.id]=L}}catch(R){Bh("error.load",R.message);return}let i=e.verification;Ed(i,()=>Uh(Cc,Xr[Ci()])),Md(t["stage4a.jwst"]&&t["stage4a.jwst"].join);let s=t["m0.tag_samples"].items.map(R=>Pi(R,i,go));document.getElementById("samples").replaceChildren(...s);let r=Wa(e,"solar"),a=Wa(e,"sky"),o=Wa(e,"m1test"),l=t["time.utc"],c={t:l._arrays.t_tdb_s.data,u:l._arrays.unix_utc_s.data},u=document.getElementById("ephem-busy"),d=null,h,f;if(r.available)d=um(r,R=>{u&&(u.hidden=!R)}),await d.init(),h=d.tMin,f=d.tMax;else{let R=t["ephem.earth_moon"]._arrays.t.data;h=R[0],f=R[R.length-1]}let m=Math.min(Math.max(Sr(c,Date.now()/1e3),h),f);d&&(await d.ensure(m),await d.ensure(Math.max(h,m-30*86400)));let v=null;try{v=await Ti("m4.orbits.json")}catch(R){console.warn("\uACF5\uC804 \uADA4\uB3C4\uC120 \uC790\uB8CC \uC5C6\uC74C",R.message)}let p={constants:e.constants,thetaEpoch:e.scene.theta_epoch_tdb_s,thetaOffset:e.scene.theta_offset_rad,radii:e.scene.radii_km,table:i,screenEph:d,orbitShapes:v,tMin:h,tMax:f,tStart:m,openSource:go},g=Lh(),A=Lp(document.getElementById("scene"),document.getElementById("labels"),p,n);Fp(A,t,p);let C=Vp(A,{...t,...r.datasets},{manifest:e,openSource:go}),y=Zp(A,{initial:n.layers.initial,persist:n.layers.persist,mobile:g}),E=Xp(n,C,A,g,y);y.applyAll(),p.onPick=R=>E.pick(R),p.onZoom=R=>E.zoom(R),A.setCamera({...Ga.l2}),zt(),C.rerender(),A.render(),zt(),uo(()=>{_m();for(let R of s)R._render();C.rerender(),Np(),Td(),y.rerender(),E.renameFocus&&E.renameFocus(),w&&w.rerender&&w.rerender()}),document.getElementById("lang").addEventListener("click",()=>iu(Ci()==="ko"?"en":"ko"));let b=lm(e),w=e.lab?cm({view:A,labApi:b,layers:y,mobile:g,onOpen:()=>{E.reveal&&E.reveal();let R=document.getElementById("info");R&&(R.hidden=!0)}}):null;w&&(C.views.append(w.button),document.body.append(w.panel),zt()),window.lagrange={core:Ms,build:Cc,loaderMode:es,manifest:e,datasets:t,i18n:su,view:A,tokens:n,layout:E,layers:y,lab:b,labUi:w,solar:r,sky:a,m1test:o,screenEph:d,debug:{...A.debug,context:()=>Ss({...t,...b.datasets,...r.datasets,...a.datasets,...o.datasets,...x.datasets})}};let x=Wa(e,"textures"),T=dm(e,x,A,g);if(window.lagrange.textures=T,window.lagrange.texGroup=x,window.lagrange.texturesDone=T.run().catch(R=>(console.warn("\uD45C\uBA74 \uADF8\uB9BC \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",R),T.state)),window.lagrange.skyDone=(async()=>{if(!a.available)return null;let R=await a.load(),I=pm(A,R["m5.stars"],g),L=mm(A,R["m5.milkyway"]);y.applyAll();let U=document.getElementById("credits"),N=()=>{let z=y.state.stars||y.state.milkyway;U.hidden=!z,U.classList.remove("credits-compact"),U.replaceChildren(document.createTextNode(Fe("sky.credits_stars")+" \xB7 "+Fe("sky.credits_mw")+" "),si(),document.createTextNode(" \xB7 "+Fe("sky.credits_moon")+" \xB7 "+Fe("sky.credits_horizons"))),z&&U.getBoundingClientRect().height>1.5*parseFloat(getComputedStyle(U).lineHeight)&&(U.classList.add("credits-compact"),U.replaceChildren(document.createTextNode(Fe("credits.short"))))};N(),U.style.cursor="pointer",U.title=Fe("credits.open"),U.tabIndex=0,U.setAttribute("role","button");let G=()=>au(()=>Cd(si));U.addEventListener("click",G),U.addEventListener("keydown",z=>{(z.key==="Enter"||z.key===" ")&&(z.preventDefault(),G())}),window.addEventListener("resize",N),document.fonts&&document.fonts.ready&&document.fonts.ready.then(N),y.onChange(N),uo(N);let q=await gm(L,R["m5.milkyway"],g,T.lod,xr);window.lagrange.skyHiDone=q.hi.then(z=>({stars:I.count,milkyway:z}));let{hi:Z,...ae}=q;return{stars:I.count,milkyway:ae}})().catch(R=>(console.warn("\uD558\uB298 \uBC30\uACBD \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",R),null)),es==="fetch"&&!Cc.dev)try{await am(document.getElementById("update"))}catch(R){console.warn("\uC11C\uBE44\uC2A4 \uC6CC\uCEE4 \uB4F1\uB85D \uC2E4\uD328",R)}document.body.dataset.ready="1"}ob();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
