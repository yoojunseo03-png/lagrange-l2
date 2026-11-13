var B0=Object.defineProperty;var sd=(n,e)=>{for(var t in e)B0(n,t,{get:e[t],enumerable:!0})};var nt={version:"0.0.0",date:"2026-11-14",commit:"3b15c17",dirty:!1,dev:!1};var sr={};sd(sr,{KINDS:()=>Bf,ORBIT_GROW:()=>jf,ORBIT_SAG_FRAC:()=>Wf,ORBIT_STALE_STEPS:()=>fd,SCHEMA:()=>od,SCHEMA_VERSION:()=>Oa,SECONDS_PER_DAY:()=>Ff,blendPosition:()=>Es,chunkFor:()=>dd,decodeBinary:()=>Cs,eclLonLat:()=>V0,eraFromDu:()=>rp,formatTDB:()=>Sl,formatUTC:()=>Vi,galToEcl:()=>ud,inertialToRot:()=>ad,instantLagrange:()=>hd,lab:()=>no,littleEndian:()=>Vf,makeContext:()=>kr,makeHermiteGroup:()=>Ba,makeOrient:()=>ao,makePlanetOrient:()=>lo,makeSolarEphem:()=>za,makeUnits:()=>rd,mul:()=>ni,nowNodeTdb:()=>ka,orbitGrid:()=>pd,osculatingPoints:()=>Va,planetAngles:()=>lp,pulsatingAxes:()=>rs,rotAngle:()=>ro,rotToInertial:()=>Ua,rotateMany:()=>Pr,rotationAngle:()=>Qs,runGolden:()=>up,segmentIndex:()=>Ts,starAt:()=>cd,tdbToUnix:()=>Sn,toPulsatingMany:()=>ld,toPulsatingPos:()=>er,transpose:()=>so,unixToTdb:()=>zi,validateDataset:()=>ss,validateManifest:()=>Fa});var Ff=86400;function rd({length_km:n,time_days:e}){let t=e*86400,i=n/t*1e3;return{length_km:n,time_days:e,time_s:t,velocity_m_s:i,nd_to_km:s=>s*n,km_to_nd:s=>s/n,nd_to_days:s=>s*e,days_to_nd:s=>s/e,nd_to_m_s:s=>s*i,m_s_to_nd:s=>s/i}}function Ua(n,e){let[t,i,s,r,a,o]=n,l=Math.cos(e),c=Math.sin(e),d=r-i,h=a+t;return[l*t-c*i,c*t+l*i,s,l*d-c*h,c*d+l*h,o]}function ad(n,e){let[t,i,s,r,a,o]=n,l=Math.cos(e),c=Math.sin(e),d=l*t+c*i,h=-c*t+l*i,u=l*r+c*a,f=-c*r+l*a;return[d,h,s,u+h,f-d,o]}function Es(n,e,t){let[i,s,r]=n,a=t*e,o=Math.cos(a),l=Math.sin(a);return[o*i-l*s,l*i+o*s,r]}function Pr(n,e,t){let i=Math.cos(e),s=Math.sin(e);for(let r=0;r<n.length;r+=3){let a=n[r],o=n[r+1];t[r]=i*a-s*o,t[r+1]=s*a+i*o,t[r+2]=n[r+2]}return t}function Qs(n,e){return n/e}function Ts(n,e){let t=0,i=n.length;for(;t<i;){let s=t+i>>1;n[s]<=e?t=s+1:i=s}return Math.min(Math.max(t-1,0),n.length-2)}function Sn(n,e){let t=e.t,i=e.u;if(!(n>=t[0]&&n<=t[t.length-1]))throw new RangeError("UTC \uD658\uC0B0\uD45C \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01");let s=Ts(t,n);return i[s]+(n-t[s])/(t[s+1]-t[s])*(i[s+1]-i[s])}function ka(n,e){let t=n.u;return e<t[0]?n.t[0]:e>=t[t.length-1]?n.t[t.length-1]:n.t[Ts(t,e)]}function zi(n,e){let t=e.t,i=e.u;if(!(n>=i[0]&&n<=i[i.length-1]))throw new RangeError("UTC \uD658\uC0B0\uD45C \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01");let s=Ts(i,n);return t[s]+(n-i[s])/(i[s+1]-i[s])*(t[s+1]-t[s])}function Vi(n){return new Date(Math.floor(n/60)*6e4).toISOString().slice(0,16).replace("T"," ")}function Sl(n){let e=Date.UTC(2e3,0,1,12,0,0);return new Date(e+Math.round(n)*1e3).toISOString().slice(0,19).replace("T"," ")}var od="lagrange-web",Oa="1.0.0",Bf=["points","vectors","trajectory","ensemble","ephemeris","grid2d","scalars","stars","image","model"],As=n=>n!==null&&typeof n=="object"&&!Array.isArray(n),Ml=n=>parseInt(String(n).split(".")[0],10),zf=n=>typeof n=="string"&&n.split(".").length===3;function Fa(n){let e=[];if(!As(n))return["manifest \uAC00 \uAC1D\uCCB4\uAC00 \uC544\uB2D8"];n.schema!==od&&e.push(`schema \uAC00 ${od} \uAC00 \uC544\uB2D8`);let t=n.schema_version;zf(t)?Ml(t)!==Ml(Oa)&&e.push(`\uC8FC \uBC88\uD638 \uB2E4\uB984 (${t}, \uC77D\uB294 \uCABD ${Oa})`):e.push("schema_version \uD615\uC2DD (\uC8FC.\uBD80.\uC218) \uC544\uB2D8");let i=n.constants;if(!As(i))e.push("constants \uC5C6\uC74C");else for(let r of["mu","length_unit_km","time_unit_days"])typeof i[r]=="number"&&i[r]>0||e.push(`constants.${r} \uAC00 \uC591\uC218\uAC00 \uC544\uB2D8`);let s=n.datasets;if(!Array.isArray(s))e.push("datasets \uAC00 \uBAA9\uB85D\uC774 \uC544\uB2D8");else{let r=s.map(a=>As(a)?a.id:null);new Set(r).size!==r.length&&e.push("datasets id \uC911\uBCF5");for(let a of s)(!As(a)||typeof a.id!="string"||typeof a.file!="string")&&e.push("datasets \uD56D\uBAA9\uC5D0 id\xB7file \uC5C6\uC74C")}return e}function ss(n,e){let t=[],i=[];if(!As(n))return{errors:["\uC790\uB8CC\uAC00 \uAC1D\uCCB4\uAC00 \uC544\uB2D8"],warnings:i};let s=n.schema_version;zf(s)?Ml(s)!==Ml(Oa)&&t.push(`\uC8FC \uBC88\uD638 \uB2E4\uB984 (${s}, \uC77D\uB294 \uCABD ${Oa})`):t.push("schema_version \uD615\uC2DD (\uC8FC.\uBD80.\uC218) \uC544\uB2D8"),typeof n.id!="string"&&t.push("id \uC5C6\uC74C"),Bf.includes(n.kind)||i.push(`\uBAA8\uB974\uB294 kind: ${JSON.stringify(n.kind)}`);let r=n.provenance;if(!As(r))t.push("provenance \uC5C6\uC74C");else{let a=r.verification;(!As(a)||!Object.prototype.hasOwnProperty.call(e,a.detail)||e[a.detail].tag!==a.tag)&&t.push("provenance.verification \uC758 tag\xB7detail \uC774 \uAF2C\uB9AC\uD45C \uD45C\uC640 \uB9DE\uC9C0 \uC54A\uC74C"),(!Array.isArray(r.source)||r.source.length===0)&&t.push("provenance.source \uC5C6\uC74C")}if(n.kind==="scalars"){let a=Array.isArray(n.items)?n.items:[null];for(let o of a)(!As(o)||typeof o.text!="string"||!("provenance"in o))&&t.push("scalars \uD56D\uBAA9\uC5D0 text\xB7provenance \uC5C6\uC74C")}return{errors:t,warnings:i}}function Vf(){return new Uint8Array(new Float64Array([1]).buffer)[7]===63}function Cs(n,e){if(!Vf())throw new Error("\uBE45\uC5D4\uB514\uC5B8 \uAE30\uACC4\uB294 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC74C (\uC790\uB8CC\uB294 float64 \uB9AC\uD2C0\uC5D4\uB514\uC5B8)");let t=n.byteOffset%8===0?n.buffer:n.slice().buffer,i=n.byteOffset%8===0?n.byteOffset:0,s={};for(let[r,{offset:a,shape:o}]of Object.entries(e)){let l=o.reduce((c,d)=>c*d,1);s[r]={data:new Float64Array(t,i+a*8,l),shape:o}}return s}function Ba(n,e,t,i){let s=n.length;function r(a){if(!(a>=n[0]&&a<=n[s-1]))throw new RangeError(`\uBCF4\uAC04 \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01 ${a}`);let o=Ts(n,a),l=n[o+1]-n[o],c=(a-n[o])/l,d=c*c,h=c*c*c,u=2*h-3*d+1,f=h-2*d+c,m=-2*h+3*d,x=h-d,p=6*d-6*c,g=3*d-4*c+1,T=-6*d+6*c,R=3*d-2*c,y=[],M=[];for(let w=0;w<i;w++){let P=[0,0,0],v=[0,0,0];for(let A=0;A<3;A++){let U=(o*i+w)*3+A,I=((o+1)*i+w)*3+A,L=e[U],F=e[I],D=t[U]*l,X=t[I]*l;P[A]=u*L+f*D+m*F+x*X,v[A]=(p*L+g*D+T*F+R*X)/l}y.push(P),M.push(v)}return{pos:y,vel:M}}return{evaluate:r,tMin:n[0],tMax:n[s-1],k:i}}var Hf=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],Gf=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);function rs(n,e,t,i){let s=[t[0]-n[0],t[1]-n[1],t[2]-n[2]],r=[i[0]-e[0],i[1]-e[1],i[2]-e[2]],a=Gf(s),o=[s[0]/a,s[1]/a,s[2]/a],l=Hf(s,r),c=Gf(l),d=[l[0]/c,l[1]/c,l[2]/c],h=Hf(d,o);return{x:o,y:h,z:d,d:a,origin:t}}function er(n,e){let t=[n[0]-e.origin[0],n[1]-e.origin[1],n[2]-e.origin[2]],i=s=>s[0]*t[0]+s[1]*t[1]+s[2]*t[2];return[i(e.x)/e.d,i(e.y)/e.d,i(e.z)/e.d]}function ld(n,e,t,i){let[s,r,a]=[e[0]-t.origin[0],e[1]-t.origin[1],e[2]-t.origin[2]],{x:o,y:l,z:c,d}=t;for(let h=0;h<n.length;h+=3){let u=n[h]+s,f=n[h+1]+r,m=n[h+2]+a;i[h]=(o[0]*u+o[1]*f+o[2]*m)/d,i[h+1]=(l[0]*u+l[1]*f+l[2]*m)/d,i[h+2]=(c[0]*u+c[1]*f+c[2]*m)/d}return i}function cd(n,e){let t=n.dir.data;return{dir:[t[3*e],t[3*e+1],t[3*e+2]],mag:n.mag.data[e],ci:n.ci.data[e],hyg_id:n.hyg_id.data[e]}}function ud(n,e){return[0,1,2].map(t=>n[t][0]*e[0]+n[t][1]*e[1]+n[t][2]*e[2])}function V0(n){let e=Math.atan2(n[1],n[0])*180/Math.PI;return[e<0?e+360:e,Math.asin(n[2])*180/Math.PI]}function dd(n,e){let t=n.chunks;if(e<t[0].t_from_tdb_s)return t[0];for(let i of t)if(e<=i.t_to_tdb_s)return i;return t[t.length-1]}function za(n,e={}){let t={};function i(s,r){let a=n.chunks.find(l=>l.year===s);if(!a)throw new Error(`\uC870\uAC01 ${s} \uC5C6\uC74C`);let o={};for(let l of n.bodies){let[c,d]=a.index[l.name],h=new Float64Array(d-c+1);for(let u=c;u<=d;u++)h[u-c]=l.t0_tdb_s+u*l.step_s;o[l.name]=Ba(h,r["R_"+l.name].data,r["V_"+l.name].data,1)}t[s]=o}for(let[s,r]of Object.entries(e))i(Number(s),r);return{bodies:n.bodies,range:n.range_tdb_s,chunks:n.chunks,addChunk:i,hasChunk:s=>!!t[s],chunkFor:s=>dd(n,s),evaluate(s,r,a){let o=a??dd(n,r).year;if(!t[o])throw new Error(`\uC870\uAC01 ${o} \uB97C \uC544\uC9C1 \uBD88\uB7EC\uC624\uC9C0 \uC54A\uC558\uB2E4`);let l=t[o][s].evaluate(r);return{pos:l.pos[0],vel:l.vel[0]}}}}function hd(n,e,t,i,s,r){let a=rs(n,e,t,i),o=[r[0]-(1-s),r[1],0];return[0,1,2].map(l=>t[l]+a.d*(a.x[l]*o[0]+a.y[l]*o[1]+a.z[l]*o[2]))}function Va(n,e,t,i,s,r,a){let o=n[0]-t[0],l=n[1]-t[1],c=n[2]-t[2],d=e[0]-i[0],h=e[1]-i[1],u=e[2]-i[2],f=Math.sqrt(o*o+l*l+c*c),m=d*d+h*h+u*u,x=2/f-m/s;if(!(x>0))return null;let p=1/x,g=Math.sqrt(s),T=Math.sqrt(p),R=(o*d+l*h+c*u)/g,y=r.length;for(let M=0;M<y;M++){let w=1-Math.cos(r[M]),P=Math.sin(r[M]),v=1-p/f*w,A=(p*R*w+f*T*P)/g;a[3*M]=v*o+A*d,a[3*M+1]=v*l+A*h,a[3*M+2]=v*c+A*u}return a[3*y-3]=a[0],a[3*y-2]=a[1],a[3*y-1]=a[2],{a:p,speed:Math.sqrt(m)}}var Wf=.0025,jf=1.2,fd=5;function pd(n,e,t,i=1){let s=Math.sqrt(8*Wf*t*n*(1-e*e)),r=i*Math.PI/180,a=[],o=0,l=s/n;for(;l<r&&o+l<Math.PI;)o+=l,a.push(o),l*=jf;let c=Math.ceil((Math.PI-o)/r);for(let h=1;h<c;h++)a.push(o+(Math.PI-o)*h/c);a.push(Math.PI);let d=new Float64Array(2*a.length+1);return a.forEach((h,u)=>{d[a.length+1+u]=h,d[a.length-1-u]=-h}),{dE:d,stepKm:s}}var no={};sd(no,{Dop853:()=>Qa,GELU_C:()=>Xa,brentq:()=>Cl,clampToRange:()=>Ya,components:()=>tr,correctedEu:()=>Ha,createRun:()=>eo,efoldState:()=>Ll,escapeRun:()=>Ed,fromSliders:()=>Tl,inTrainingRange:()=>nr,integrateOne:()=>Pl,integrateTo:()=>Rl,jacobi:()=>ir,labFlags:()=>Lr,lnT3:()=>Ga,makeLab:()=>to,nextUp:()=>wd,omega:()=>xd,positionBound:()=>Wa,predict:()=>Nr,predictD24:()=>ja,predictMLP:()=>$a,predictMLPSeeds:()=>qa,predictState:()=>Td,readForest:()=>gd,rhs:()=>Ja,rhsDelta:()=>Ka,roomFor:()=>_d,stateOf:()=>wl,toSliders:()=>Al});function tr(n,e){let t=new Array(6);for(let s=0;s<6;s++)t[s]=e[s]-n.s_ref[s];let i=new Array(6);for(let s=0;s<6;s++){let r=0;for(let a=0;a<6;a++)r+=t[a]*n.P_inv[6*s+a];i[s]=r}return i}function wl(n,e){let t=new Array(6);for(let i=0;i<6;i++){let s=0;for(let r=0;r<6;r++)s+=e[r]*n.P[6*i+r];t[i]=n.s_ref[i]+s}return t}function Ha(n,e){let t=n.frame.gamma,i=[e[1]/t,e[2]/t,e[3]/t,e[4]/t,e[5]/t],s=0;for(let r=0;r<5;r++)for(let a=0;a<5;a++)s+=i[r]*n.M[5*r+a]*i[a];return e[0]+t*s}function md(n,e,t,i){let{lam:s,w_p:r,w_z:a}=n.frame,o=Math.cos(r*t),l=Math.sin(r*t),c=Math.cos(a*t),d=Math.sin(a*t),h=[e[0]*Math.exp(s*t),e[1]*Math.exp(-s*t),e[2]*o+e[3]*l,-e[2]*l+e[3]*o,e[4]*c+e[5]*d,-e[4]*d+e[5]*c],u=0;for(let f=0;f<3;f++){let m=0;for(let x=0;x<6;x++)m+=h[x]*n.P[6*f+x];u+=m*m}return Math.sqrt(u)-i}function H0(n,e,t,i=60){let s=n.frame.lam,r=Math.log(t/Math.abs(e[0]))/s,a=Math.max(r-.25/s,0),o=r+.25/s,l=md(n,e,a,t)<0&&md(n,e,o,t)>0;for(let c=0;c<i;c++){let d=.5*(a+o);md(n,e,d,t)>0?o=d:a=d}return l?.5*(a+o)*n.frame.time_unit_days:NaN}function Ga(n,e,t){let i=[t,e[1],e[2],e[3],e[4],e[5]];return n.R.map(s=>Math.log(H0(n,i,s)))}function Wa(n,e){let{env_p:t,env_z:i}=n.frame;return Math.abs(e[0])+Math.abs(e[1])+t*Math.hypot(e[2],e[3])+i*Math.hypot(e[4],e[5])}function nr(n,e){let t=n.frame.gamma,i=n.range,s=Math.abs(e[0])/t;return s>=i.eu_gamma[0]*(1-i.rtol)&&s<=i.eu_gamma[1]*(1+i.rtol)&&Wa(n,e)/t<=i.disp_max_gamma*(1+i.rtol)}var G0=new TextDecoder("utf-8");function gd(n){let e=n.indexOf(10),t=JSON.parse(G0.decode(n.subarray(0,e)));if(t.\uD615\uC2DD!=="lagrange-forest"||t.\uD310!==1||t.\uC885\uB958!=="RF"||t.\uC232_\uC218!==1)throw new Error("\uBAA8\uB974\uB294 \uC232 \uD615\uC2DD");let i=t.\uCD9C\uB825_\uC218,s=e+1,r=(l,c,d)=>{let h=new d(n.slice(s,s+l*c).buffer);return s+=l*c,h},a=new DataView(n.buffer,n.byteOffset,n.byteLength),o=[];for(let l=0;l<t.\uB098\uBB34_\uC218[0];l++){let c=a.getInt32(s,!0);s+=4;let d=r(c,1,Int8Array),h=r(c,8,Float64Array),u=r(c,4,Int32Array),f=r(c,4,Int32Array),m=0;for(let p=0;p<c;p++)d[p]<0&&m++;let x=r(m*i,8,Float64Array);o.push({F:d,T:h,L:u,R:f,V:x})}if(s!==n.length)throw new Error(`\uC232 \uBC14\uC774\uD2B8\uAC00 ${n.length-s} \uB0A8\uC74C`);return{head:t,trees:o,nOut:i,mean:t.\uD45C\uC900\uD654_\uD3C9\uADE0,std:t.\uD45C\uC900\uD654_\uD45C\uC900\uD3B8\uCC28,residual:!!t.\uC794\uCC28}}function El(n,e,t={}){let i=t.float32!==!1,s=new Array(e.length);for(let a=0;a<e.length;a++)s[a]=i?Math.fround(e[a]):e[a];let r=new Array(n.nOut).fill(0);for(let a of n.trees){let o=0;for(;a.F[o]>=0;)o=s[a.F[o]]<=a.T[o]?a.L[o]:a.R[o];let l=a.L[o]*n.nOut;for(let c=0;c<n.nOut;c++)r[c]+=a.V[l+c]}for(let a=0;a<n.nOut;a++)r[a]/=n.trees.length;return r}function W0(n,e){return e.map((t,i)=>(t-n.mean[i])/n.std[i])}function ja(n,e,t){let i=El(n,W0(n,e));return n.residual?i.map((s,r)=>t[r]+s):i}var Xa=.7071067690849304,j0=1.1283791670955126,X0=.5641895835477563;function q0(n){let e=n*n,t=n,i=n;for(let s=1;s<200&&(t*=2*e/(2*s+1),i+=t,!(Math.abs(t)<1e-17*Math.abs(i)));s++);return j0*Math.exp(-e)*i}function $0(n){let t=n,i=n,s=0;for(let r=1;r<500;r++){let a=r/2;s=n+a*s,s===0&&(s=1e-300),s=1/s,i=n+a/i,i===0&&(i=1e-300);let o=i*s;if(t*=o,Math.abs(o-1)<1e-17)break}return X0*Math.exp(-n*n)/t}function Y0(n){if(Number.isNaN(n))return NaN;let e=Math.abs(n),t;return e<3?t=1-q0(e):t=$0(e),n<0?2-t:t}function J0(n,e,t){let i=e.map((o,l)=>(o-n.x_mean[l])/n.x_std[l]);for(let o=0;o<n.W.length;o++){let[l,c]=n.dims[o],d=n.W[o],h=n.b[o],u=new Array(c);for(let f=0;f<c;f++){let m=0;for(let x=0;x<l;x++)m+=i[x]*d[x*c+f];u[f]=m+h[f]}i=u.map(f=>.5*f*Y0(-f*t))}let s=i.length,r=n.bo.length,a=new Array(r);for(let o=0;o<r;o++){let l=0;for(let c=0;c<s;c++)l+=i[c]*n.Wo[c*r+o];a[o]=(l+n.bo[o])*n.y_std[o]+n.y_mean[o]}return a}function qa(n,e){let t=e[0],i=[Math.sign(t),Math.log(Math.abs(t)),...e.slice(1)];return n.seeds.map(s=>J0(s,i,Xa))}function $a(n,e){let t=qa(n,e);return t[0].map((i,s)=>{let r=0;for(let a of t)r+=a[s];return r/t.length})}function Tl(n,e){let t=n.frame.gamma;return[e.sign*e.eu*t,e.es*t,e.ap*t*Math.cos(e.phip),e.ap*t*Math.sin(e.phip),e.az*t*Math.cos(e.phiz),e.az*t*Math.sin(e.phiz)]}function Al(n,e){let t=n.frame.gamma,i=s=>{let r=Math.atan2(s[1],s[0]);return r<0?r+2*Math.PI:r};return{sign:e[0]<0?-1:1,eu:Math.abs(e[0])/t,es:e[1]/t,ap:Math.hypot(e[2],e[3])/t,phip:i([e[2],e[3]]),az:Math.hypot(e[4],e[5])/t,phiz:i([e[4],e[5]])}}function _d(n,e,t){let{env_p:i,env_z:s}=n.frame,r=n.range.disp_max_gamma,a={eu:e.eu,es:Math.abs(e.es),ap:i*e.ap,az:s*e.az},o=r;for(let[c,d]of Object.entries(a))c!==t&&(o-=d);let l={eu:1,es:1,ap:i,az:s}[t];return Math.max(0,o)/l}function Ya(n,e,t){let i={...e},s=_d(n,e,t);return t==="eu"?i.eu=Math.min(Math.max(e.eu,n.range.eu_gamma[0]),Math.min(n.range.eu_gamma[1],s)):t==="es"?i.es=Math.sign(e.es)*Math.min(Math.abs(e.es),s):(t==="ap"||t==="az")&&(i[t]=Math.min(e[t],s)),i}function Lr(n,e){let t=n.uncertain,i=qa(n.mlp,e.x),s=i.length,r=e.MLP.map((l,c)=>{let d=0;for(let h of i)d+=(h[c]-l)**2;return Math.sqrt(d/(s-1))}),a=e.MLP.map((l,c)=>Math.abs(l-e.T3[c])>t.factor*t.rmse_log_mlp[c]),o=r.map((l,c)=>l>t.factor*t.spread_median[c]);return{inRange:nr(n,e.x.slice(0,6)),mismatch:a,spread:o,uncertain:a.map((l,c)=>l||o[c]),seedStd:r,positionBound:Wa(n,e.x.slice(0,6))}}function Xf(n,e,t,i){let s=Math.sqrt((n+i)**2+e**2+t**2),r=Math.sqrt((n-1+i)**2+e**2+t**2);return[s,r]}function xd(n,e){let[t,i,s]=n,[r,a]=Xf(t,i,s,e);return .5*(t**2+i**2)+(1-e)/r+e/a}function Ja(n,e){let[t,i,s,r,a,o]=n,[l,c]=Xf(t,i,s,e),d=l**3,h=c**3,u=t-(1-e)*(t+e)/d-e*(t-1+e)/h,f=i-(1-e)*i/d-e*i/h,m=-(1-e)*s/d-e*s/h;return[r,a,o,2*a+u,-2*r+f,m]}function ir(n,e){return 2*xd(n,e)-(n[3]**2+n[4]**2+n[5]**2)}function Ka(n,e,t){let i=new Array(6);for(let s=0;s<6;s++)i[s]=t[s]+n[s];return Ja(i,e)}var yd=[0,.05260015195876773,.0789002279381516,.1183503419072274,.2816496580927726,.3333333333333333,.25,.3076923076923077,.6512820512820513,.6,.8571428571428571,1,1,.1,.2,.7777777777777778],qf=[.054293734116568765,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,.3111643669578199,-.1521609496625161,.20136540080403034,.04471061572777259],$f=[-.18980075407240762,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,-.4226823213237919,-.1521609496625161,.20136540080403034,.02265179219836082,0],Yf=[.01312004499419488,0,0,0,0,-1.2251564463762044,-.4957589496572502,1.6643771824549864,-.35032884874997366,.3341791187130175,.08192320648511571,-.022355307863886294,0],vd=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.05260015195876773,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.0197250569845379,.0591751709536137,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.02958758547680685,0,.08876275643042054,0,0,0,0,0,0,0,0,0,0,0,0,0],[.2413651341592667,0,-.8845494793282861,.924834003261792,0,0,0,0,0,0,0,0,0,0,0,0],[.037037037037037035,0,0,.17082860872947386,.12546768756682242,0,0,0,0,0,0,0,0,0,0,0],[.037109375,0,0,.17025221101954405,.06021653898045596,-.017578125,0,0,0,0,0,0,0,0,0,0],[.03709200011850479,0,0,.17038392571223998,.10726203044637328,-.015319437748624402,.008273789163814023,0,0,0,0,0,0,0,0,0],[.6241109587160757,0,0,-3.3608926294469414,-.868219346841726,27.59209969944671,20.154067550477894,-43.48988418106996,0,0,0,0,0,0,0,0],[.47766253643826434,0,0,-2.4881146199716677,-.590290826836843,21.230051448181193,15.279233632882423,-33.28821096898486,-.020331201708508627,0,0,0,0,0,0,0],[-.9371424300859873,0,0,5.186372428844064,1.0914373489967295,-8.149787010746927,-18.52006565999696,22.739487099350505,2.4936055526796523,-3.0467644718982196,0,0,0,0,0,0],[2.273310147516538,0,0,-10.53449546673725,-2.0008720582248625,-17.9589318631188,27.94888452941996,-2.8589982771350235,-8.87285693353063,12.360567175794303,.6433927460157636,0,0,0,0,0],[.054293734116568765,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,.3111643669578199,-.1521609496625161,.20136540080403034,.04471061572777259,0,0,0,0],[.056167502283047954,0,0,0,0,0,.25350021021662483,-.2462390374708025,-.12419142326381637,.15329179827876568,.00820105229563469,.007567897660545699,-.008298,0,0,0],[.03183464816350214,0,0,0,0,.028300909672366776,.053541988307438566,-.05492374857139099,0,0,-.00010834732869724932,.0003825710908356584,-.00034046500868740456,.1413124436746325,0,0],[-.42889630158379194,0,0,0,0,-4.697621415361164,7.683421196062599,4.06898981839711,.3567271874552811,0,0,0,-.0013990241651590145,2.9475147891527724,-9.15095847217987,0]],Jf=[[-8.428938276109013,0,0,0,0,.5667149535193777,-3.0689499459498917,2.38466765651207,2.117034582445028,-.871391583777973,2.2404374302607883,.6315787787694688,-.08899033645133331,18.148505520854727,-9.194632392478356,-4.436036387594894],[10.427508642579134,0,0,0,0,242.28349177525817,165.20045171727028,-374.5467547226902,-22.113666853125306,7.733432668472264,-30.674084731089398,-9.332130526430229,15.697238121770845,-31.139403219565178,-9.35292435884448,35.81684148639408],[19.985053242002433,0,0,0,0,-387.0373087493518,-189.17813819516758,527.8081592054236,-11.57390253995963,6.8812326946963,-1.0006050966910838,.7777137798053443,-2.778205752353508,-60.19669523126412,84.32040550667716,11.99229113618279],[-25.69393346270375,0,0,0,0,-154.18974869023643,-231.5293791760455,357.6391179106141,93.40532418362432,-37.45832313645163,104.0996495089623,29.8402934266605,-43.53345659001114,96.32455395918828,-39.17726167561544,-149.72683625798564]];function Cl(n,e,t,i,s,r=100){let a=e,o=t,l=0,c=0,d=0,h=0,u=n(a),f=n(o);if(u===0)return a;if(f===0)return o;let m=x=>x<0||Object.is(x,-0);if(m(u)===m(f))throw new Error("brentq: \uAD6C\uAC04 \uB05D\uC758 \uBD80\uD638\uAC00 \uAC19\uB2E4");for(let x=0;x<r;x++){u!==0&&f!==0&&m(u)!==m(f)&&(l=a,c=u,d=h=o-a),Math.abs(c)<Math.abs(f)&&(a=o,o=l,l=a,u=f,f=c,c=u);let p=(i+s*Math.abs(o))/2,g=(l-o)/2;if(f===0||Math.abs(g)<p)return o;if(Math.abs(d)>p&&Math.abs(f)<Math.abs(u)){let T;if(a===l)T=-f*(o-a)/(f-u);else{let R=(u-f)/(a-o),y=(c-f)/(l-o);T=-f*(c*y-u*R)/(y*R*(c-u))}2*Math.abs(T)<Math.min(Math.abs(d),3*Math.abs(g)-p)?(d=h,h=T):(d=g,h=g)}else d=g,h=g;a=o,u=f,Math.abs(h)>p?o+=h:o+=g>0?p:-p,f=n(o)}throw new Error("brentq: \uC218\uB834 \uC548 \uD568")}var Zf=.9,Q0=.2,Qf=10,ep=2220446049250313e-31,Za=12,tp=-1/8;function wd(n){if(Number.isNaN(n)||n===1/0)return n;if(n===0)return Number.MIN_VALUE;let e=new DataView(new ArrayBuffer(8));e.setFloat64(0,n);let t=e.getUint32(0),i=e.getUint32(4);return n>0?i===4294967295?(e.setUint32(0,t+1),e.setUint32(4,0)):e.setUint32(4,i+1):i===0?(e.setUint32(0,t-1),e.setUint32(4,4294967295)):e.setUint32(4,i-1),e.getFloat64(0)}var Md=n=>{let e=0;for(let t of n)e+=t*t;return Math.sqrt(e)},Sd=n=>Md(n)/n.length**.5;function e_(n,e,t,i,s,r,a,o,l){let c=t.length,d=Math.abs(i-e);if(d===0)return 0;let h=t.map(R=>l+Math.abs(R)*o),u=Sd(t.map((R,y)=>R/h[y])),f=Sd(r.map((R,y)=>R/h[y])),m=u<1e-5||f<1e-5?1e-6:.01*u/f;m=Math.min(m,d);let x=new Array(c);for(let R=0;R<c;R++)x[R]=t[R]+m*1*r[R];let p=n(e+m*1,x),g=Sd(p.map((R,y)=>(R-r[y])/h[y]))/m,T=f<=1e-15&&g<=1e-15?Math.max(1e-6,m*.001):(.01/Math.max(f,g))**(1/(a+1));return Math.min(100*m,T,d,s)}var Qa=class{constructor(e,t,i,s,r,a,o=1/0){this.nfev=0,this.fun=(l,c)=>(this.nfev++,e(l,c)),this.t=t,this.y=i.slice(),this.tBound=s,this.rtol=r,this.atol=a,this.maxStep=o,this.n=i.length,this.status="running",this.tOld=null,this.yOld=null,this.hPrevious=null,this.f=this.fun(this.t,this.y),this.hAbs=e_(this.fun,this.t,this.y,s,o,this.f,7,r,a),this.Kx=Array.from({length:16},()=>new Array(this.n).fill(0))}_rkStep(e,t,i,s){let r=this.n,a=this.Kx,o=vd,l=yd,c=qf;a[0]=i.slice();for(let u=1;u<Za;u++){let f=new Array(r);for(let m=0;m<r;m++){let x=0;for(let p=0;p<u;p++)x+=a[p][m]*o[u][p];f[m]=t[m]+x*s}a[u]=this.fun(e+l[u]*s,f)}let d=new Array(r);for(let u=0;u<r;u++){let f=0;for(let m=0;m<Za;m++)f+=a[m][u]*c[m];d[u]=t[u]+s*f}let h=this.fun(e+s,d);return a[Za]=h,[d,h]}_errorNorm(e,t){let i=this.n,s=this.Kx,r=new Array(i),a=new Array(i);for(let d=0;d<i;d++){let h=0,u=0;for(let f=0;f<=Za;f++)h+=s[f][d]*Yf[f],u+=s[f][d]*$f[f];r[d]=h/t[d],a[d]=u/t[d]}let o=Md(r)**2,l=Md(a)**2;if(o===0&&l===0)return 0;let c=o+.01*l;return Math.abs(e)*o/Math.sqrt(c*i)}step(){if(this.status!=="running")throw new Error("\uB05D\uB09C \uD480\uC774\uAE30");if(this.t===this.tBound)return this.tOld=this.t,this.status="finished",this.status;let e=this.t,t=this.y,i=10*Math.abs(wd(e)-e),s=this.hAbs>this.maxStep?this.maxStep:this.hAbs<i?i:this.hAbs,r=!1,a=!1,o,l,c,d;for(;!r;){if(s<i)return this.status="failed",this.message="\uAC78\uC74C\uC774 \uB108\uBB34 \uC791\uC74C",this.status;d=s,c=e+d,c-this.tBound>0&&(c=this.tBound),d=c-e,s=Math.abs(d),[o,l]=this._rkStep(e,t,this.f,d);let h=new Array(this.n);for(let f=0;f<this.n;f++)h[f]=this.atol+Math.max(Math.abs(t[f]),Math.abs(o[f]))*this.rtol;let u=this._errorNorm(d,h);if(u<1){let f=u===0?Qf:Math.min(Qf,Zf*u**tp);a&&(f=Math.min(1,f)),s*=f,r=!0}else s*=Math.max(Q0,Zf*u**tp),a=!0}return this.hPrevious=d,this.yOld=t,this.t=c,this.y=o,this.hAbs=s,this.f=l,this.tOld=e,this.t-this.tBound>=0&&(this.status="finished"),this.status}dense(){let e=this.n,t=this.Kx,i=vd,s=yd,r=this.hPrevious,a=this.tOld,o=this.yOld;for(let d=Za+1;d<16;d++){let h=new Array(e);for(let u=0;u<e;u++){let f=0;for(let m=0;m<d;m++)f+=t[m][u]*i[d][m];h[u]=o[u]+f*r}t[d]=this.fun(a+s[d]*r,h)}let l=Array.from({length:7},()=>new Array(e)),c=t[0];for(let d=0;d<e;d++){let h=this.y[d]-o[d];l[0][d]=h,l[1][d]=r*c[d]-h,l[2][d]=2*h-r*(this.f[d]+c[d])}for(let d=0;d<4;d++)for(let h=0;h<e;h++){let u=0;for(let f=0;f<16;f++)u+=Jf[d][f]*t[f][h];l[3+d][h]=r*u}return t_(a,this.t,o,l)}};function t_(n,e,t,i){let s=e-n,r=t.length;return a=>{let o=(a-n)/s,l=new Array(r).fill(0);for(let c=0;c<i.length;c++){let d=i[i.length-1-c],h=c%2===0?o:1-o;for(let u=0;u<r;u++)l[u]=(l[u]+d[u])*h}for(let c=0;c<r;c++)l[c]+=t[c];return l}}function eo(n,e,t,i,s,r,a=[],o=null){let l=new Qa(n,e,t,i,s,r),c=a.map(x=>x.terminal?1:1/0),d=a.map(()=>0),h=a.map(()=>[]),u=a.map(()=>[]),f=a.map(x=>x.g(e,t)),m={solver:l,tEvents:h,yEvents:u,status:"running",t:e,y:t.slice(),nsteps:0};return m.advance=(x=1/0)=>{for(let p=0;p<x&&m.status==="running";p++){if(l.step(),m.nsteps++,l.status==="failed"){m.status="failed",m.message=l.message;break}let g=l.t,T=l.y,R=l.tOld;if(a.length){let y=a.map(w=>w.g(g,T)),M=[];for(let w=0;w<a.length;w++){let P=f[w]<=0&&y[w]>=0,v=f[w]>=0&&y[w]<=0,A=a[w].direction;(P&&A>0||v&&A<0||(P||v)&&A===0)&&M.push(w)}if(M.length){let w=l.dense();for(let U of M)d[U]++;let P=M.slice(),v=P.map(U=>Cl(I=>a[U].g(I,w(I)),R,g,4*ep,4*ep)),A=!1;if(P.some(U=>d[U]>=c[U])){let U=v.map((L,F)=>F).sort((L,F)=>v[L]-v[F]);P=U.map(L=>P[L]),v=U.map(L=>v[L]);let I=P.findIndex(L=>d[L]>=c[L]);P=P.slice(0,I+1),v=v.slice(0,I+1),A=!0}P.forEach((U,I)=>{h[U].push(v[I]),u[U].push(w(v[I]))}),A&&(m.status="event",g=v[v.length-1],T=w(g))}f=y}if(o){let y=l.nfev,M=l.dense();l.nfev=y,o(M,R,g)}m.t=g,m.y=T,m.status==="running"&&l.status==="finished"&&(m.status="finished")}return m.nfev=l.nfev,m.status},m}function Rl(n,e,t,i,s,r){let a=eo(n,e,t,i,s,r);if(a.advance(),a.status!=="finished")throw new Error("\uC801\uBD84 \uC2E4\uD328: "+a.message);return{y:a.y,nfev:a.nfev,nsteps:a.nsteps}}var n_=1,i_=-1;function s_(n,e,t=2e4,i=12){let s=[n[0],n[1],n[2]],r=0,a=(l,c,d)=>{let h=[c[0]-l[0],c[1]-l[1],c[2]-l[2]],u=[d[0]-l[0],d[1]-l[1],d[2]-l[2]],f=h[0]*h[0]+h[1]*h[1]+h[2]*h[2],m=f>0?Math.min(1,Math.max(0,(u[0]*h[0]+u[1]*h[1]+u[2]*h[2])/f)):0;return Math.hypot(u[0]-m*h[0],u[1]-m*h[1],u[2]-m*h[2])},o=(l,c,d,h,u,f)=>{let m=[.25,.5,.75].some(x=>a(d,u,l(c+x*(h-c)))>e/2);if(m&&f<i){let x=.5*(c+h),p=l(x);o(l,c,d,x,p,f+1),o(l,x,p,h,u,f+1)}else m&&r++,s.push(u[0],u[1],u[2])};return{add(l,c,d){d>c&&o(l,c,l(c),d,l(d),0)},finish(){let l=s.length/3,c=new Uint8Array(l);c[0]=1,c[l-1]=1;let d=p=>[s[3*p],s[3*p+1],s[3*p+2]],h=[[0,l-1]];for(;h.length;){let[p,g]=h.pop(),T=-1,R=0,y=d(p),M=d(g);for(let w=p+1;w<g;w++){let P=a(y,M,d(w));P>R&&(R=P,T=w)}T>=0&&R>e/2&&(c[T]=1,h.push([p,T],[T,g]))}let u=0;for(let p=0;p<l;p++)u+=c[p];let f=u>t?Math.ceil(u/t):1,m=[],x=0;for(let p=0;p<l;p++)c[p]&&((x%f===0||p===l-1)&&m.push(s[3*p],s[3*p+1],s[3*p+2]),x++);return{points:Float64Array.from(m),n_raw:l,n_kept:u,n:m.length/3,capped:f>1,depth_capped:r,tol:e}}}}function Ed(n,e,t={}){let i=[n.x_L2,0,0,0,0,0],s=n.R_over_gamma.map(d=>d*n.gamma),r=s.map((d,h)=>({g:(u,f)=>Math.sqrt(f[0]**2+f[1]**2+f[2]**2)-d,terminal:h===s.length-1,direction:1})),a=e.map((d,h)=>d-i[h]),o=n.t_max_days/n.time_unit_days,l=t.trajTol?s_(a,t.trajTol,t.trajMax):null,c=eo((d,h)=>Ka(h,n.mu,i),0,a,o,n.rtol,n.atol,r,l?(d,h,u)=>l.add(d,h,u):null);return c.tEndNd=o,c.result=()=>{let d=s.map((f,m)=>c.tEvents[m].length?c.tEvents[m][0]*n.time_unit_days:NaN),h=s.map((f,m)=>c.tEvents[m].length?c.yEvents[m][0][0]>0?n_:i_:0),u={t_days:d,dir:h,nfev:c.solver.nfev,status:c.status,t_reached_days:c.t*n.time_unit_days};return l&&(u.traj=l.finish()),u},c}function Pl(n,e){let t=Ed(n,e);if(t.advance(),t.status==="failed")throw new Error("\uC801\uBD84 \uC2E4\uD328: "+t.message);return t.result()}function Ll(n,e,t,i){let s=e.map((o,l)=>o-t[l]),{y:r}=Rl((o,l)=>Ka(l,n.mu,t),0,s,i,n.rtol,n.atol),a=r.map((o,l)=>t[l]+o);return{delta:r,jacobi_drift:ir(a,n.mu)-ir(e,n.mu)}}var Ir=(n,e)=>{if(!n[e])throw new Error(`\uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uC5D0 ${e} \uC5C6\uC74C`);return n[e].data};function to(n,e,t=null){if(n.mlp.gelu_c!==Xa)throw new Error(`gelu \uC0C1\uC218\uAC00 \uB2E4\uB974\uB2E4: \uC790\uB8CC ${n.mlp.gelu_c} \uB300 JS ${Xa}`);let i=n.frame_l2,s={frame:i,P:Ir(e,"P"),P_inv:Ir(e,"P_inv"),s_ref:Array.from(Ir(e,"s_ref")),M:Ir(e,"M"),R_over_gamma:n.criteria.R_over_gamma,R:n.criteria.R_over_gamma.map(r=>r*i.gamma),labels:n.criteria.labels,range:n.range,uncertain:n.uncertain||null,examples:n.examples||[],sliders:n.sliders||null};return s.mlp={seeds:n.mlp.seeds.map(r=>{let a=[],o=[],l=[];for(let d=0;d<n.mlp.layers;d++){let h=e[`s${r}_W${d}`];a.push(h.data),o.push(Ir(e,`s${r}_b${d}`)),l.push(h.shape)}let c=d=>Ir(e,`s${r}_${d}`);return{W:a,b:o,dims:l,Wo:c("Wo"),bo:c("bo"),x_mean:c("x_mean"),x_std:c("x_std"),y_mean:c("y_mean"),y_std:c("y_std")}})},s.forest=t?gd(t):null,s.escapeParams=(r={})=>({mu:i.mu,x_L2:i.x,gamma:i.gamma,R_over_gamma:s.R_over_gamma,time_unit_days:i.time_unit_days,t_max_days:r.t_max_days??n.integrate.t_max_days,rtol:r.rtol??n.integrate.rtol,atol:r.atol??n.integrate.atol}),s}function Nr(n,e){let t=Ha(n,e),i=Ga(n,e,t),s=[...e,t];return{eus:t,x:s,inRange:nr(n,e),T3:i,MLP:$a(n.mlp,s),D24:n.forest?ja(n.forest,s,i):null,dirT3:Math.sign(t)}}function Td(n,e){return Nr(n,tr(n,e))}var np=n=>n===null?NaN:n,Ad=n=>Math.sqrt(n.reduce((e,t)=>e+t*t,0)),Dr={max_err:NaN,failures:[{reason:"\uC2E4\uD5D8\uC2E4 \uC790\uB8CC (m3.lab) \uC5C6\uC74C"}]};function Cd(n,e,t){let i=0,s=!1;for(let r=0;r<e.length;r++){let a=n[r],o=np(e[r]);if(Number.isNaN(a)||Number.isNaN(o)){Number.isNaN(a)!==Number.isNaN(o)&&(s=!0);continue}i=Math.max(i,Math.abs(a-o))}return{err:i,bad:s||!(i<=t)}}var ip={m3_eigen(n,e){if(!e.lab)return Dr;let t=0,i=0,s=[];for(let r of n.cases){let a=tr(e.lab,r.state),o=Ha(e.lab,a),l=Math.max(...a.map((c,d)=>Math.abs(c-r.E[d])),Math.abs(o-r.eus));t=Math.max(t,l),i=Math.max(i,l/r.tol),l<=r.tol||s.push({state:r.state,err:l,tol:r.tol})}return{max_err:t,max_ratio_to_tol:i,failures:s,measure:"abs (\uC131\uBD84\uB9C8\uB2E4 100 \u03B5 \u2016\u03B4\u2016)"}},m3_t3(n,e){if(!e.lab)return Dr;let t=0,i=0,s=[];for(let r of n.cases){let a=Ga(e.lab,r.E,r.eus),o=Cd(a,r.lt3,n.tolerance.abs);i+=r.lt3.filter(l=>l===null).length,t=Math.max(t,o.err),o.bad&&s.push({E:r.E,js:a,py:r.lt3})}return{max_err:t,n_nan_expected:i,failures:s,measure:"abs ln \uC77C"}},m3_uncertain(n,e){if(!e.lab)return Dr;let t=[],i=0,s=0;for(let r of n.cases){let a=Lr(e.lab,Nr(e.lab,r.E)),o=Math.max(...a.seedStd.map((c,d)=>Math.abs(c-r.seed_std[d])));i=Math.max(i,o),a.uncertain.some(Boolean)&&s++,(!(a.mismatch.every((c,d)=>c===r.mismatch[d])&&a.spread.every((c,d)=>c===r.spread[d]))||!(o<=n.tolerance.seed_std_abs))&&t.push({E:r.E,js:{mismatch:a.mismatch,spread:a.spread},py:{mismatch:r.mismatch,spread:r.spread},std_err:o})}return{max_err:t.length,max_err_std:i,n_uncertain:s,failures:t,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},m3_range(n,e){if(!e.lab)return Dr;let t=[],i=0;for(let s of n.cases){let r=nr(e.lab,s.E);s.in&&i++,r!==s.in&&t.push({E:s.E,js:r,py:s.in})}return{max_err:t.length,n_in:i,n_out:n.cases.length-i,failures:t,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},m3_d24(n,e){if(!e.lab||!e.lab.forest)return Dr;let t=n.tolerance.abs,i=e.lab.forest,s=0,r=0,a=0,o=0,l=0,c=[];for(let d of n.cases)if(d.what==="predict"){let h=Cd(ja(i,d.X,d.lt3),d.lnt,t);s=Math.max(s,h.err),h.bad&&c.push({what:d.what,X:d.X,err:h.err})}else{l++;let h=El(i,d.z),u=El(i,d.z,{float32:!1}),f=Math.max(...h.map((x,p)=>Math.abs(x-d.out_f32[p])),...u.map((x,p)=>Math.abs(x-d.out_f64[p])));r=Math.max(r,f);let m=h.some((x,p)=>x!==u[p]);m&&a++,d.differs&&o++,(!(f<=t)||m!==d.differs)&&c.push({what:d.what,err:f,js_differs:m,py_differs:d.differs})}return(o===0||a===0)&&c.push({reason:"\uB300\uC870\uAD70\uC774 \uD558\uB098\uB3C4 \uAC08\uB9AC\uC9C0 \uC54A\uC74C \u2014 \uBB38\uD131 \uC704 \uC785\uB825 \uC2DC\uD5D8\uC774 \uBB34\uB825",jsDiffers:a,pyDiffers:o}),{max_err:Math.max(s,r),max_err_predict:s,max_err_probe:r,control:{probes:l,py_differs:o,js_differs:a},failures:c,measure:"abs ln \uC77C"}},m3_mlp(n,e){if(!e.lab)return Dr;let t=0,i=[];for(let s of n.cases){let r=Cd($a(e.lab.mlp,s.X),s.lnt,n.tolerance.abs);t=Math.max(t,r.err),r.bad&&i.push({X:s.X,err:r.err})}return{max_err:t,failures:i,measure:"abs ln \uC77C (\uC2DC\uB4DC 3 \uD3C9\uADE0)"}},m3_cr3bp(n){let e=0,t=[];for(let i of n.cases){let s=Ja(i.state,n.mu),r=ir(i.state,n.mu),a=Math.max(Ad(s.map((o,l)=>o-i.rhs[l]))/Ad(i.rhs),Math.abs(r-i.jacobi)/Math.abs(i.jacobi));e=Math.max(e,a),a<=n.tolerance.rel||t.push({state:i.state,err:a})}return{max_err:e,failures:t,measure:"rel (\uC6B0\uBCC0 \uBCA1\uD130 \uD06C\uAE30 \uB300\uBE44, \uC57C\uCF54\uBE44)"}},m3_dop853(n){let e={mu:n.mu,x_L2:n.x_L2,gamma:n.gamma,R_over_gamma:n.R_over_gamma,time_unit_days:n.time_unit_days,t_max_days:n.t_max_days,rtol:n.rtol,atol:n.atol},t=0,i=0,s=0,r=0,a=0,o=0,l=0,c=[];for(let d of n.cases){let h=Pl(e,d.state),u=Ll(e,d.state,n.s_ref,n.efold_nd),f=Ad(u.delta.map((p,g)=>p-d.delta_efold[g]));r=Math.max(r,f),t=Math.max(t,f/d.L_delta);let m=!(f<=d.L_delta);for(let p=0;p<d.t_days.length;p++){let g=np(d.t_days[p]),T=h.t_days[p];if(Number.isNaN(g)&&l++,Number.isNaN(g)||Number.isNaN(T)){Number.isNaN(g)!==Number.isNaN(T)&&(m=!0);continue}let R=Math.abs(T-g);a=Math.max(a,R),i=Math.max(i,R/d.L_t_days[p]),R<=d.L_t_days[p]||(m=!0),h.dir[p]!==d.dir[p]&&(m=!0,o++)}let x=10*Math.max(Math.abs(d.jacobi_drift),d.jacobi_drift_jit_rms);s=Math.max(s,x>0?Math.abs(u.jacobi_drift)/x:u.jacobi_drift===0?0:1/0),Math.abs(u.jacobi_drift)<=x||(m=!0),m&&c.push({eu_gamma:d.eu_gamma,eD:f,L_delta:d.L_delta,t_js:h.t_days,t_py:d.t_days,L_t:d.L_t_days,dir_js:h.dir,dir_py:d.dir,cj_js:u.jacobi_drift,cj_lim:x})}return{max_err:Math.max(t,i,s),ratio_to_line:{delta_efold:t,escape_time:i,jacobi:s},max_abs:{delta_efold:r,escape_time_days:a},direction_mismatch:o,no_escape_entries:l,failures:c,measure:"8-1 \uD310\uC815\uC120 \uB300\uBE44 \uBE44 (\u2264 1 \uC774\uBA74 \uD1B5\uACFC)"}}};var io=Math.PI/180,sp=n=>{let e=Math.cos(n),t=Math.sin(n);return[[1,0,0],[0,e,t],[0,-t,e]]},Rd=n=>{let e=Math.cos(n),t=Math.sin(n);return[[e,t,0],[-t,e,0],[0,0,1]]};function ni(n,e){let t=[[0,0,0],[0,0,0],[0,0,0]];for(let i=0;i<3;i++)for(let s=0;s<3;s++)t[i][s]=n[i][0]*e[0][s]+n[i][1]*e[1][s]+n[i][2]*e[2][s];return t}var so=n=>[[n[0][0],n[1][0],n[2][0]],[n[0][1],n[1][1],n[2][1]],[n[0][2],n[1][2],n[2][2]]];function rp(n){let e=n-Math.floor(n),t=2*Math.PI*(e+.779057273264+.00273781191135448*n);return t=t%(2*Math.PI),t<0?t+2*Math.PI:t}function ro(n,e){let t=0;for(let i=0;i<3;i++)for(let s=0;s<3;s++)t+=(n[i][s]-e[i][s])**2;return Math.sqrt(t/2)}function ao(n){let e=n._arrays,t=e.t.data,i=e.du.data,s=e.q.data,r=n.orient.earth.eps_arcsec/3600*io,a=sp(r),o=n.orient.moon.coef;function l(h){if(!(h>=t[0]&&h<=t[t.length-1]))throw new RangeError("\uC9C0\uAD6C \uC790\uC138 \uD45C \uBC94\uC704 \uBC16");let u=Ts(t,h),f=(h-t[u])/(t[u+1]-t[u]),m=[[0,0,0],[0,0,0],[0,0,0]];for(let p=0;p<3;p++)for(let g=0;g<3;g++){let T=s[9*u+3*p+g],R=s[9*(u+1)+3*p+g];m[p][g]=T+f*(R-T)}let x=i[u]+f*(i[u+1]-i[u]);return ni(ni(a,so(m)),Rd(-rp(x)))}function c(h){let u=h/86400,f=u/36525,m=o.pole_ra[0]+o.pole_ra[1]*f+o.pole_ra[2]*f*f,x=o.pole_dec[0]+o.pole_dec[1]*f+o.pole_dec[2]*f*f,p=o.pm[0]+o.pm[1]*u+o.pm[2]*u*u;return o.angles.forEach(([g,T],R)=>{let y=(g+T*f)*io;m+=o.ra[R]*Math.sin(y),x+=o.dec[R]*Math.cos(y),p+=o.pmt[R]*Math.sin(y)}),[m,x,p]}function d(h){let[u,f,m]=c(h),x=ni(ni(Rd(m*io),sp((90-f)*io)),Rd((90+u)*io));return ni(a,so(x))}return{earth:l,moon:d,moonAngles:c,range:[t[0],t[t.length-1]]}}var oo=Math.PI/180,ap=n=>{let e=Math.cos(n),t=Math.sin(n);return[[1,0,0],[0,e,t],[0,-t,e]]},op=n=>{let e=Math.cos(n),t=Math.sin(n);return[[e,t,0],[-t,e,0],[0,0,1]]};function lp(n,e){let t=e/86400,i=t/36525,s=n.pole_ra[0]+n.pole_ra[1]*i+n.pole_ra[2]*i*i,r=n.pole_dec[0]+n.pole_dec[1]*i+n.pole_dec[2]*i*i,a=n.pm[0]+n.pm[1]*t+n.pm[2]*t*t;return n.angles.forEach((o,l)=>{let c=0,d=1;for(let h of o)c+=h*d,d*=i;c*=oo,s+=n.ra[l]*Math.sin(c),r+=n.dec[l]*Math.cos(c),a+=n.pmt[l]*Math.sin(c)}),[s,r,a]}function lo(n,e){let t=ap(e/3600*oo);return i=>{let[s,r,a]=lp(n,i),o=ni(ni(op(a*oo),ap((90-r)*oo)),op((90+s)*oo));return ni(t,so(o))}}var cp=(n,e)=>e===0?Math.abs(n-e):Math.abs(n-e)/Math.abs(e),Il=n=>Math.sqrt(n.reduce((e,t)=>e+t*t,0)),On=(n,e)=>Il(n.map((t,i)=>t-e[i]));function kr(n){let e={},t=n["ephem.earth_moon"];t&&t._arrays&&(e.ephem=Ba(t._arrays.t.data,t._arrays.R.data,t._arrays.V.data,t.bodies.length));let i=n["time.utc"];i&&i._arrays&&(e.utc={t:i._arrays.t_tdb_s.data,u:i._arrays.unix_utc_s.data});let s=n["m3.lab"];s&&s._arrays&&(e.lab=to(s,s._arrays,s._forest||null));let r=n["m4.ephem"];r&&r._chunks&&(e.solar=za(r,r._chunks)),n["m5.stars"]&&n["m5.milkyway"]&&(e.sky={stars:n["m5.stars"],milkyway:n["m5.milkyway"]});let a=n["m4.textures"];return a&&a.planets&&a.orient&&(e.planetOrient=Object.fromEntries(Object.entries(a.planets).map(([o,l])=>[o,lo(l.coef,a.orient.earth.eps_arcsec)]))),a&&a._arrays&&a.orient&&(e.orient=ao(a)),e}function Ur(n,e,t){let i=0,s=[];for(let r of n){let{err:a,js:o}=e(r);i=Math.max(i,a),a<=t||s.push({...r,js:o,err:a})}return{max_err:i,failures:s}}var r_={units(n){let e=rd(n.units);return{...Ur(n.cases,t=>({err:cp(e[t.fn](t.in),t.out),js:e[t.fn](t.in)}),n.tolerance.rel),measure:"rel"}},timeline(n){return{...Ur(n.cases,e=>{let t=Qs(e.t_days,n.time_unit_days);return{err:Math.abs(t-e.theta),js:t}},n.tolerance.abs),measure:"abs rad"}},schema(n){let e=[],t=n.cases.find(i=>i.what==="manifest").obj.verification.details;for(let i of n.cases){let s,r;if(i.what==="manifest")s=Fa(i.obj).length,r=0;else{let a=ss(i.obj,t);s=a.errors.length,r=a.warnings.length}(s!==i.errors||r!==i.warnings)&&e.push({name:i.name,py:[i.errors,i.warnings],js:[s,r]})}return{max_err:e.length,failures:e,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},frames(n){return{...Ur(n.cases,e=>{let t=Ua(e.state,e.theta),i=ad(e.state,e.theta),s=Es(e.state.slice(0,3),e.theta,e.s),r=Il(e.state);return{err:Math.max(On(t,e.to_inertial),On(i,e.to_rot),On(s,e.blend))/r,js:{a:t,b:i,p:s}}},n.tolerance.rel),measure:"rel (\uC0C1\uD0DC \uD06C\uAE30 \uB300\uBE44)"}},interp(n,e){if(!e.ephem)return{max_err:NaN,failures:[{reason:"\uCC9C\uCCB4\uB825 \uC790\uB8CC \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=e.ephem.evaluate(r.t);for(let o=0;o<r.pos.length;o++){let l=On(a.pos[o],r.pos[o]),c=On(a.vel[o],r.vel[o]);t=Math.max(t,l),i=Math.max(i,c),l<=n.tolerance.pos_km&&c<=n.tolerance.vel_km_s||s.push({t:r.t,body:o,ep:l,ev:c})}}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},pulsating(n,e){return e.ephem?{...Ur(n.cases,t=>{let i=e.ephem.evaluate(t.t),s=rs(i.pos[0],i.vel[0],i.pos[3],i.vel[3]),r=er(i.pos[1],s),a=er(i.pos[2],s);return{err:Math.max(On(r,t.earth)/Il(t.earth),On(a,t.moon)/Il(t.moon),cp(s.d,t.d_km)),js:{e:r,m:a,d:s.d}}},n.tolerance.rel),measure:"rel"}:{max_err:NaN,failures:[{reason:"\uCC9C\uCCB4\uB825 \uC790\uB8CC \uC5C6\uC74C"}]}},utc(n,e){return e.utc?{...Ur(n.cases,t=>{let i=Sn(t.t,e.utc);return{err:Math.abs(i-t.unix),js:i}},n.tolerance.abs_s),measure:"abs s"}:{max_err:NaN,failures:[{reason:"UTC \uD45C \uC5C6\uC74C"}]}},m4_interp(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=e.solar.evaluate(r.body,r.t),o=On(a.pos,r.pos),l=On(a.vel,r.vel);t=Math.max(t,o),i=Math.max(i,l),o<=n.tolerance.pos_km&&l<=n.tolerance.vel_km_s||s.push({body:r.body,t:r.t,ep:o,ev:l})}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},m4_chunks(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases)for(let a of r.years){let o=e.solar.evaluate(r.body,r.t,a),l=On(o.pos,r.pos),c=On(o.vel,r.vel);t=Math.max(t,l),i=Math.max(i,c),l<=n.tolerance.pos_km&&c<=n.tolerance.vel_km_s||s.push({body:r.body,t:r.t,year:a,ep:l,ev:c})}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},m4_lpoints(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=[];for(let s of n.cases){let r=e.solar.evaluate("sun",s.t),a=e.solar.evaluate("emb",s.t);for(let[o,l]of Object.entries(n.points)){let c=On(hd(r.pos,r.vel,a.pos,a.vel,n.mu,l),s.L[o]);t=Math.max(t,c),c<=n.tolerance.pos_km||i.push({t:s.t,point:o,err:c})}}return{max_err:t,failures:i,measure:"pos km"}},m4_osculating(n){let e=0,t=[];for(let i of n.cases){let s=new Float64Array(i.points.length);Va(i.r,i.v,i.r_sun,i.v_sun,i.mu,i.dE,s);let r=0;for(let a=0;a<s.length;a+=3)r=Math.max(r,Math.hypot(s[a]-i.points[a],s[a+1]-i.points[a+1],s[a+2]-i.points[a+2]));e=Math.max(e,r),r<=n.tolerance.pos_km||t.push({body:i.body,t:i.t,err:r})}return{max_err:e,failures:t,measure:"pos km"}},m4_orient(n,e){if(!e.orient)return{max_err:NaN,failures:[{reason:"\uC790\uC138 \uC790\uB8CC (m4.textures) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=ro(e.orient.earth(r.t),r.earth),o=ro(e.orient.moon(r.t),r.moon);t=Math.max(t,a),i=Math.max(i,o),a<=n.tolerance.earth_rad&&o<=n.tolerance.moon_rad||s.push({t:r.t,ee:a,em:o})}return{max_err:t,max_err_moon:i,failures:s,measure:"rad (\uC9C0\uAD6C; \uB2EC\uC740 max_err_moon)"}},m4_planet_orient(n,e){if(!e.planetOrient)return{max_err:NaN,failures:[{reason:"\uD589\uC131 \uC790\uC138 \uC790\uB8CC (m4.textures planets) \uC5C6\uC74C"}]};let t=0,i=[];for(let s of n.cases){let r=ro(e.planetOrient[s.body](s.t),s.matrix);t=Math.max(t,r),r<=n.tolerance.rad||i.push({body:s.body,t:s.t,e:r})}return{max_err:t,failures:i,measure:"rad"}},m5_sky(n,e){if(!e.sky||!e.sky.stars._arrays)return{max_err:NaN,failures:[{reason:"\uD558\uB298 \uC790\uB8CC (m5.stars\xB7m5.milkyway) \uC5C6\uC74C"}]};let t=e.sky.stars._arrays,i=e.sky.milkyway.gal_to_ecl,s=new Map;for(let l=0;l<t.hyg_id.data.length;l++)s.set(t.hyg_id.data[l],l);let r=0,a=0,o=[];for(let l of n.cases)if(l.what==="star"){let c=s.get(l.hyg_id);if(c===void 0){o.push({name:l.name,reason:"\uC790\uB8CC\uC5D0 \uC5C6\uC74C"});continue}let d=cd(t,c),h=Math.max(On(d.dir,l.dir),Math.abs(d.mag-l.mag));r=Math.max(r,h),h<=n.tolerance.star_abs||o.push({name:l.name,err:h})}else{let c=On(ud(i,l.gal),l.ecl);a=Math.max(a,c),c<=n.tolerance.rot_abs||o.push({gal:l.gal,err:c})}return{max_err:Math.max(r,a),max_err_star:r,max_err_rot:a,failures:o,measure:"abs (\uB2E8\uC704 \uBCA1\uD130)"}},revolution(n){return{...Ur(n.cases,e=>{let t=n.time_unit_days,i=Qs(e.t0_days,t),s=Qs(e.t1_days,t),r=Ua([...n.emb,0,0,0],i),a=Ua([...n.emb,0,0,0],s),o=Math.atan2(a[1],a[0])-Math.atan2(r[1],r[0]);return{err:Math.abs(Math.atan2(Math.sin(o),Math.cos(o))),js:{a0:i,a1:s}}},n.tolerance.abs_rad),measure:"abs rad"}}};function up(n,e={}){return n.map(t=>{let i=r_[t.id]||ip[t.id];if(!i)return{id:t.id,n:0,failures:[{reason:"JS \uCABD \uB300\uC870 \uD568\uC218 \uC5C6\uC74C"}],max_err:NaN,ok:!1};let s=i(t,e);return{id:t.id,n:t.cases.length,tolerance:t.tolerance,...s,ok:s.failures.length===0}})}var rr="fetch";async function dp(n){let e=`data/${n}`;if(typeof navigator<"u"&&navigator.onLine===!1&&typeof caches<"u"){let i=await caches.match(new URL(e,location.href).href);if(!i)throw new Error(`\uC624\uD504\uB77C\uC778 \u2014 \uB2F4\uC544 \uB454 \uD30C\uC77C\uC774 \uC544\uB2D8: ${n}`);return i}let t=await fetch(e);if(!t.ok)throw new Error(`\uC790\uB8CC\uB97C \uC77D\uC9C0 \uBABB\uD568: ${n} (${t.status})`);return t}async function Rs(n){return(await dp(n)).json()}async function ii(n){return new Uint8Array(await(await dp(n)).arrayBuffer())}var Id={};sd(Id,{DICTS:()=>ar,apply:()=>St,getLang:()=>Fn,has:()=>ho,init:()=>Pd,initialLang:()=>gp,onChange:()=>Or,pick:()=>Rt,setGeneralLabels:()=>Ld,setLang:()=>uo,t:()=>xe});var hp={"app.title":"\uD0DC\uC591\u2013\uC9C0\uAD6C\uB2EC L2","app.subtitle":"7\uB2E8\uACC4 3D \uC2DC\uAC01\uD654 \xB7 M2 JWST \uCE35","lang.switch":"English","lang.switch_title":"\uC5B8\uC5B4 \uBC14\uAFB8\uAE30","version.commit":"\uCEE4\uBC0B","version.dirty":"\uC218\uC815 \uC911","version.title":"\uBC84\uC804 \xB7 \uBE4C\uB4DC \uB0A0\uC9DC (\uD55C\uAD6D \uC2DC\uAC04) \xB7 \uCEE4\uBC0B","panel.samples":"\uAF2C\uB9AC\uD45C \uC2DC\uD5D8 \uC22B\uC790","panel.samples_note":"\uC22B\uC790\uB97C \uB204\uB974\uBA74 \uCD9C\uCC98 \uCC3D\uC774 \uC5F4\uB9B0\uB2E4. \uAF2C\uB9AC\uD45C\uC5D0 \uB9C8\uC6B0\uC2A4\uB97C \uC62C\uB9AC\uBA74 \uC138\uBD80 \uBD84\uB958\uAC00 \uBCF4\uC778\uB2E4.","tag.weak":"\uC57D\uD568","tag.display_approx":"\uD45C\uC2DC\uC6A9 \uADFC\uC0AC","source.title":"\uCD9C\uCC98","source.value":"\uAC12","source.unit":"\uB2E8\uC704","source.file":"\uD30C\uC77C","source.key":"\uD0A4","source.commit":"\uACC4\uC0B0","source.source_hash":"\uC18C\uC2A4 \uD574\uC2DC (\uC55E 12 \uC790\uB9AC)","source.ref_commit":"\uCC38\uACE0 \uCEE4\uBC0B","source.build":"\uD654\uBA74 \uD310","source.stage":"\uB2E8\uACC4","source.model":"\uBAA8\uB378","source.verification":"\uAC80\uC99D \uAF2C\uB9AC\uD45C","source.note":"\uC124\uBA85","source.close":"\uB2EB\uAE30","source.browser_calc":"\uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0 (Python \uC77C\uCE58 \uD14C\uC2A4\uD2B8 \uD1B5\uACFC, \uD5C8\uC6A9 \uC624\uCC28 {tol})","source.time_scale":"\uC2DC\uAC04 \uCCB4\uACC4","pwa.update":"\uC0C8 \uBC84\uC804 \uC788\uC74C \u2014 \uB2E4\uC2DC \uBD88\uB7EC\uC624\uAE30","pwa.offline_ready":"\uC624\uD504\uB77C\uC778 \uC900\uBE44\uB428","error.load":"\uC790\uB8CC\uB97C \uC77D\uC9C0 \uBABB\uD588\uB2E4: {msg}","error.schema":"\uC790\uB8CC \uD615\uC2DD \uC624\uB958: {msg}","body.sun":"\uD0DC\uC591","body.emb":"EMB (\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC)","body.earth":"\uC9C0\uAD6C","body.moon":"\uB2EC","l2.panel":"L2 \uC7A5\uBA74","l2.mode":"\uC88C\uD45C\uACC4","l2.mode_rot":"\uD68C\uC804 \uC88C\uD45C","l2.mode_inertial":"\uAD00\uC131 \uC88C\uD45C","l2.view":"\uBCF4\uAE30","l2.view_all":"\uC804\uCCB4","l2.view_emb":"\uC9C0\uAD6C\u2013\uB2EC\u2013L1\xB7L2","l2.view_l2":"L2 \uADFC\uCC98","l2.view_l2zoom":"L2 \uD655\uB300","l2.time":"\uC2DC\uAC01","l2.play":"\uC7AC\uC0DD","l2.pause":"\uBA48\uCDA4","l2.speed":"{n} \uC77C/\uCD08","l2.layer_lpoints":"\uB77C\uADF8\uB791\uC8FC \uC810","l2.layer_bodies":"\uD0DC\uC591\xB7EMB","l2.layer_dirs":"L2 \uBD88\uC548\uC815\xB7\uC548\uC815 \uBC29\uD5A5","l2.layer_earthmoon":"\uC9C0\uAD6C\xB7\uB2EC (\uC2E4\uC81C \uCC9C\uCCB4\uB825)","l2.layer_halo":"3-C \uD5E4\uC77C\uB85C \uC871","l2.layer_escape":"3-B \uC774\uD0C8 \uADA4\uC801","l2.layer_burns":"\uC218\uC815 \uC704\uCE58 (3-A\xB73-C\xB74-C)","l2.layer_ref":"4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4","l2.unstable":"\uBD88\uC548\uC815","l2.stable":"\uC548\uC815","l2.halo_main":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4","l2.g_lpoints":"\uB77C\uADF8\uB791\uC8FC \uC810 (1\uB2E8\uACC4)","l2.g_dirs":"L2 \uBC29\uD5A5 (2\uB2E8\uACC4)","l2.g_halo":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4 (3-C)","l2.g_annual":"\uC5F0\uAC04 \u0394v (3-A\xB73-C\xB74-C)","l2.g_ref":"\uAE30\uC900 \uADA4\uB3C4\uC640 \uD5E4\uC77C\uB85C (4-C\xB74-D)","l2.g_escape":"\uC774\uD0C8 \uC2DC\uAC01 (3-B)","l2.g_interp":"\uCC9C\uCCB4\uB825 \uBCF4\uAC04 \uC790\uCCB4 \uC624\uCC28 (4-A)","l2.g_m0":"\uAF2C\uB9AC\uD45C \uC2DC\uD5D8 \uC22B\uC790 (M0)","l2.legend_markers":"\uD45C\uC9C0 \uD06C\uAE30\xB7\uD654\uC0B4 \uAE38\uC774\uB294 \uC2E4\uC81C \uD06C\uAE30\uAC00 \uC544\uB2D8 (\uD45C\uC2DC\uC6A9). \uC22B\uC790\uB97C \uB204\uB974\uBA74 \uCD9C\uCC98 \uCC3D.","l2.legend_pulsating":"\uC9C0\uAD6C\xB7\uB2EC: \uC2E4\uC81C \uCC9C\uCCB4\uB825 (DE441) \uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C \u2014 \uAE38\uC774 \uB2E8\uC704 = \uADF8 \uC21C\uAC04\uC758 \uD0DC\uC591\u2013EMB \uAC70\uB9AC. 4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4\uB3C4 \uAC19\uC740 \uC88C\uD45C.","l2.legend_inertial":"\uAD00\uC131 \uC88C\uD45C: x \uCD95 = \uD669\uB3C4 J2000 X, z \uCD95 = \uADA4\uB3C4\uBA74 \uBC95\uC120 (\u2248 \uD669\uB3C4 \uBD81\uADF9). CR3BP \uD68C\uC804\uC88C\uD45C\uB97C \u03B8 = \u03B8\u2080 + (t \u2212 2026-01-01 TDB)/\uC2DC\uAC04 \uB2E8\uC704 \uB9CC\uD07C \uB3CC\uB9B0 \uAC83 (\u03B8\u2080 = \uADF8\uB0A0 EMB \uC758 \uD669\uACBD).","source.browser":"\uACC4\uC0B0 \uC704\uCE58","l2.escape_rule":"\uD45C\uC2DC\uC6A9\uC73C\uB85C \uACE0\uB978 \uC608 (\uADDC\uCE59: e_u* \uBD80\uD638\uB9C8\uB2E4 |e_u*|/\u03B3 \uAC00 1e-9\xB71e-7\xB71e-5 \uC5D0 \uAC00\uC7A5 \uAC00\uAE4C\uC6B4 \uC8FC \uD45C\uBCF8 \uD558\uB098\uC529, 0.316\u03B3 \uC774\uD0C8\xB7\uC7A1\uC74C \uC9C0\uBC30 \uD45C\uBCF8 \uC81C\uC678)","panel.open":"\uD328\uB110 \uD3B4\uAE30","panel.close":"\uD328\uB110 \uC811\uAE30","ui.layers":"\uB808\uC774\uC5B4","ui.legend":"\uBC94\uB840","ui.numbers":"\uBAA8\uB4E0 \uC22B\uC790","ui.menu":"\uBA54\uB274","card.sphere_note":"\uAD6C\uB294 \uBCF4\uC774\uAC8C \uD0A4\uC6CC \uADF8\uB838\uB2E4 (\uC2E4\uC81C \uBC18\uC9C0\uB984: Horizons \uBA38\uB9AC\uB9D0)","card.no_numbers":"\uC774 \uCC9C\uCCB4\uC5D0 \uB538\uB9B0 \uACB0\uACFC \uC22B\uC790\uB294 \uC544\uC9C1 \uC5C6\uB2E4","l2.family_all":"\uD5E4\uC77C\uB85C \uC871 \uC804\uCCB4 \uBCF4\uAE30 (\uAE30\uBCF8\uC740 \uC77C\uBD80\uB9CC)","l2.legend_spheres":"\uD0DC\uC591\xB7\uC9C0\uAD6C\xB7\uB2EC\uC740 \uD06C\uAE30 \uC788\uB294 \uAD6C \u2014 \uC791\uC73C\uBA74 \uBCF4\uC774\uAC8C \uD0A4\uC6B4\uB2E4","tag.short_impl":"\uAD6C\uD604","tag.short_external":"\uC678\uBD80","tag.short_physical":"\uBB3C\uB9AC","preset.clean":"\uAE54\uB054","preset.explore":"\uD0D0\uC0C9","preset.research":"\uC5F0\uAD6C","preset.custom":"\uC0AC\uC6A9\uC790 \uC124\uC815","preset.zooming":"\uD655\uB300 \uC911","layer.g_bodies":"\uCC9C\uCCB4\xB7\uC810","layer.g_orbits":"\uADA4\uB3C4\xB7\uADA4\uC801","layer.g_numbers":"\uBB3C\uB9AC \uC218\uCE58\xB7\uAF2C\uB9AC\uD45C","layer.g_aux":"\uBCF4\uC870","layer.sun":"\uD0DC\uC591","layer.earth":"\uC9C0\uAD6C","layer.moon":"\uB2EC","layer.emb":"EMB (\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC)","layer.lpoints":"L1 ~ L5","layer.halo_main":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4","layer.halo_family":"\uD5E4\uC77C\uB85C \uC871","layer.escape":"3-B \uC774\uD0C8 \uADA4\uC801","layer.ref":"4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4","layer.burns":"\uC218\uC815 (\u0394v) \uC704\uCE58","layer.moon_orbit":"\uB2EC \uADA4\uB3C4 (\uC9C0\uB09C 30 \uC77C \uC790\uCDE8)","layer.planet_orbits":"\uACF5\uC804 \uADA4\uB3C4","layer.dirs":"L2 \uBC29\uD5A5\uC120 (\uBD88\uC548\uC815\xB7\uC548\uC815)","layer.n_distance":"\uAC70\uB9AC","layer.n_period":"\uC8FC\uAE30","layer.n_angle":"\uBC29\uD5A5 \uAC01\uB3C4","layer.n_annual":"\uC5F0\uAC04 \u0394v","layer.n_escape":"\uC774\uD0C8 \uC2DC\uAC01","layer.n_tags":"\uAC80\uC99D \uAF2C\uB9AC\uD45C","layer.labels":"\uC774\uB984\uD45C","layer.scale":"\uAC70\uB9AC \uB208\uAE08","layer.grid":"\uAE30\uC900 \uD3C9\uBA74 \uACA9\uC790 (\uADA4\uB3C4\uBA74)","layer.axes":"\uC88C\uD45C\uCD95","layer.tags_note":"\uAF2C\uB9AC\uD45C\uB97C \uB044\uBA74 \uC22B\uC790\uB3C4 \uBAA8\uB450 \uC228\uB294\uB2E4 \u2014 \uC22B\uC790\uB294 \uC5B8\uC81C\uB098 \uAF2C\uB9AC\uD45C\uC640 \uD568\uAED8","key.labels":"\uC774\uB984\uD45C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_orbits":"\uADA4\uB3C4\xB7\uADA4\uC801 \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_numbers":"\uBB3C\uB9AC \uC218\uCE58\xB7\uAF2C\uB9AC\uD45C \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_bodies":"\uCC9C\uCCB4\xB7\uC810 \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.grid":"\uAE30\uC900 \uD3C9\uBA74 \uACA9\uC790","key.p_clean":"\uD504\uB9AC\uC14B: \uAE54\uB054","key.p_explore":"\uD504\uB9AC\uC14B: \uD0D0\uC0C9","key.p_research":"\uD504\uB9AC\uC14B: \uC5F0\uAD6C","key.help":"\uC774 \uB3C4\uC6C0\uB9D0","help.title":"\uB2E8\uCD95\uD0A4","help.button":"\uB2E8\uCD95\uD0A4 (?)","help.note":"\uB808\uC774\uC5B4 \uB2E8\uCD95\uD0A4\uB294 \uB9C9\uB300\uB97C \uAEBC\uB0B4\uC9C0 \uC54A\uB294\uB2E4. Esc = \uB9C9\uB300 \uC228\uAE30\uAE30. \uCF20 \uC0C1\uD0DC\uB294 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uAE30\uC5B5\uB41C\uB2E4.","help.keys_line":"L \uC774\uB984\uD45C \xB7 O \uADA4\uB3C4 \xB7 N \uC218\uCE58 \xB7 1 2 3 \uD504\uB9AC\uC14B","time.start":"\uCC98\uC74C\uC73C\uB85C","time.now":"\uD604\uC7AC","card.numbers_off":"\uCF1C\uC9C4 \uC218\uCE58 \uB808\uC774\uC5B4\uAC00 \uC5C6\uC5B4 \uC22B\uC790\uB97C \uC228\uACBC\uB2E4 (\uB808\uC774\uC5B4 \u2192 \uBB3C\uB9AC \uC218\uCE58)","desc.Sun":"\uD0DC\uC591. CR3BP \uC758 \uD070 \uC9C8\uB7C9 (\uCCAB\uC9F8 \uCC9C\uCCB4).","desc.EMB":"\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC. CR3BP \uC758 \uB458\uC9F8 \uCC9C\uCCB4 (\uC9C0\uAD6C\uC640 \uB2EC\uC744 \uD55C \uC810\uC73C\uB85C \uBCF8 \uAC83).","desc.Earth":"\uC9C0\uAD6C. \uC2E4\uC81C \uCC9C\uCCB4\uB825 (DE441) \uC704\uCE58\uB97C \uB9E5\uB3D9 \uC88C\uD45C\uB85C \uADF8\uB838\uB2E4. \uB0AE\xB7\uBC24 \uACBD\uACC4\uB294 \uD587\uBE5B \uBC29\uD5A5.","desc.Moon":`\uB2EC. \uC2E4\uC81C \uCC9C\uCCB4\uB825 \uC704\uCE58. \uB4A4\uC758 \uAF2C\uB9AC\uB294 \uC9C0\uB09C \uC790\uCDE8 (\uB4A4\uB85C \uAC08\uC218\uB85D \uD750\uB9BC). \uD45C\uBA74 \uADF8\uB9BC: NASA SVS CGI Moon Kit (LRO LROC, \uACF5\uACF5 \uC601\uC5ED \u2014 \uCD9C\uCC98 "NASA's Scientific Visualization Studio"). \uADF8\uB9BC \uBC29\uD5A5\uC740 \uD45C\uC2DC\uC6A9 \uADFC\uC0AC (\uD3C9\uADE0 \uC9C0\uAD6C \uCABD \uBA74\uC744 \uC9C0\uAD6C \uCABD\uC73C\uB85C, \uCE6D\uB3D9 \uC5C6\uC74C).`,"desc.L1":"\uD0DC\uC591 \uCABD \uB77C\uADF8\uB791\uC8FC \uC810 (CR3BP \uD3C9\uD615\uC810, 1\uB2E8\uACC4). \uBD88\uC548\uC815 \u2014 \uC774 \uC5F0\uAD6C\uC5D0\uC11C \uC9C1\uC811 \uACC4\uC0B0\uD558\uC9C0\uB294 \uC54A\uC558\uB2E4 (\uACF5\uC120 \uD3C9\uD615\uC810\uC774 \uBD88\uC548\uC815\uD558\uB2E4\uB294 \uC11C\uC220\uC758 \uCABD\uC218\uB294 \uD655\uC778 \uD544\uC694).","desc.L2":"\uC774 \uC5F0\uAD6C\uC758 \uB300\uC0C1. \uD0DC\uC591 \uBC18\uB300\uCABD \uD3C9\uD615\uC810 \u2014 \uBD88\uC548\uC815\uD574\uC11C \uADA4\uB3C4 \uC720\uC9C0 (\u0394v) \uAC00 \uD544\uC694\uD558\uB2E4.","desc.L3":"\uD0DC\uC591 \uB108\uBA38 \uBC18\uB300\uD3B8\uC758 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC548\uC815\uC131\uC740 \uC774 \uC5F0\uAD6C\uC5D0\uC11C \uACC4\uC0B0\uD558\uC9C0 \uC54A\uC558\uB2E4 (\uD655\uC778 \uD544\uC694).","desc.L4":"\uC55E\uC11C\uAC00\uB294 \uC0BC\uAC01 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC120\uD615 \uC548\uC815 \u2014 1\uB2E8\uACC4 Routh \uD310\uC815 (\u03BC \uAC00 \uC784\uACC4 \uC9C8\uB7C9\uBE44 (Sicardy 2010) \uBCF4\uB2E4 \uD6E8\uC52C \uC791\uC74C, \uAD6C\uD604 \uAC80\uC99D \u2014 \uBB38\uD5CC \uB300\uC870).","desc.L5":"\uB4A4\uB530\uB974\uB294 \uC0BC\uAC01 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC120\uD615 \uC548\uC815 \u2014 1\uB2E8\uACC4 Routh \uD310\uC815 (L4 \uC640 \uAC19\uC74C).","desc.halo_main":"3-C \uC5D0\uC11C \uB9CC\uB4E0 \uD5E4\uC77C\uB85C \uADA4\uB3C4 \uC871\uC758 \uC8FC \uADA4\uB3C4 \u2014 \uADA4\uB3C4 \uC720\uC9C0 \uACC4\uC0B0\uC758 \uAE30\uC900.","l2.view_jwst":"JWST","l2.layer_jwst":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","l2.layer_jwst_ext":"JWST \uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC \uBE44\uAD50","l2.layer_jwst_phys":"JWST \uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC \uBE44\uAD50","l2.legend_jwst":"JWST (\uAE08\uBE5B): \uC810 = \uBC1B\uC740 \uC810 (\uD558\uB8E8 \uAC04\uACA9), \uC810\uC120 = \uADF8 \uC0AC\uC774 \uBCF4\uAC04 (4-A \uC5D0\uB974\uBBF8\uD2B8), \uC2E4\uC120 = 10 \uBD84 \uAC04\uACA9 \uBC1B\uC740 \uC810. \uC608\uCE21: \uC8FC\uD669 = JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (\uC678\uBD80 \uB300\uC870), \uCD08\uB85D = \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (\uBB3C\uB9AC \uAC80\uC99D), \uC9C4\uD55C \uC120 = \uBE44\uAD50 \uB300\uC0C1, \uC605\uC740 \uC120 = \uB0B4 \uBAA8\uD615","layer.jwst":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","layer.jwst_ext":"\uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (\uC678\uBD80 \uB300\uC870)","layer.jwst_phys":"\uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (\uBB3C\uB9AC \uAC80\uC99D)","layer.n_jwst":"\uC608\uCE21 \uC624\uCC28","body.jwst":"JWST","desc.JWST":"\uC81C\uC784\uC2A4 \uC6F9 \uC6B0\uC8FC\uB9DD\uC6D0\uACBD. \uAE08\uBE5B \uC120 = \uC7AC\uAD6C\uC131\uD55C \uC2E4\uC81C \uBE44\uD589 \uADA4\uC801 (Horizons, 4-A \uC790\uB8CC): \uC810 = \uBC1B\uC740 \uC810 (\uD558\uB8E8 \uAC04\uACA9), \uC810\uC120 = \uD558\uB8E8 \uB9C8\uB514 \uC0AC\uC774 \uBCF4\uAC04, \uC2E4\uC120 = 10 \uBD84 \uAC04\uACA9 \uBC1B\uC740 \uC810. \uD45C\uC9C0 = \uC7AC\uAD6C\uC131 \uB05D. \uC544\uB798\uB294 5\uB2E8\uACC4 \uC608\uCE21\uC758 \uB450 \uBE44\uAD50 \u2014 \uAF2C\uB9AC\uD45C\uAC00 \uB2E4\uB974\uB2E4.","desc.jwst_period":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801\uC758 \uD55C \uBC14\uD034 \uAE38\uC774\uB97C NASA \uC6D0\uBB38, \uAC19\uC740 \uD06C\uAE30\uC758 CR3BP \uD5E4\uC77C\uB85C\uC640 \uBE44\uAD50\uD55C\uB2E4.","jwst.orbit_label":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","jwst.layer_ext_short":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC \uBE44\uAD50","jwst.layer_phys_short":"\uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC \uBE44\uAD50","jwst.layer_ext":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50","jwst.layer_phys":"\uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50","jwst.rep_5d":"5 \uC77C","jwst.axis_note":"\uC138\uB85C = \uC704\uCE58 \uCC28 (km, \uB85C\uADF8), \uAC00\uB85C = \uC2DC\uC791 \uB4A4 (\uC77C). \uC810 = results/stage5.json \uC5D0 \uC801\uD78C \uAC12","jwst.period_button":"\uC8FC\uAE30 \uC124\uBA85 \uCE74\uB4DC \uC5F4\uAE30","jwst.period_title":"JWST \uC8FC\uAE30 \u2014 \uC7AC\uAD6C\uC131 \uB300 NASA\xB7\uD5E4\uC77C\uB85C","jwst.period_class":"\uBD84\uB958","jwst.no_predictions":"\uC608\uCE21 \uC790\uB8CC\uAC00 \uC5C6\uB2E4","jwst.g_ext":"JWST \uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (5\uB2E8\uACC4)","jwst.g_phys":"JWST \uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (5\uB2E8\uACC4)","jwst.g_period":"JWST \uC8FC\uAE30 (4-A)","l2.view_jwstzoom":"JWST \uD655\uB300","l2.legend_jwstzoom":"JWST \uD655\uB300 (\uC608\uCE21 \uB05D \uB458\uB808 \uC218\uC2ED km): \uD070 \uC810 = \uAC19\uC740 \uC2DC\uAC01\uC758 \uC810, \uD770 \uC120\uBD84 = \uADF8 \uB458 \uC0AC\uC774 \uC704\uCE58 \uCC28 (\uC22B\uC790\uB294 Python \uAC12\uACFC \uAF2C\uB9AC\uD45C). \uC120\uC740 \uC800\uC7A5\uD55C \uC810 (1 \uC2DC\uAC04 \uAC04\uACA9, JPL 01U \uB294 \uD558\uB8E8 \uAC04\uACA9) \uC744 \uACE7\uAC8C \uC774\uC74C. \uADF8\uB9AC\uB294 \uC704\uCE58\uB294 \uB9E5\uB3D9 \uC88C\uD45C\uB77C \uC2E4\uC81C \uAC70\uB9AC\uC640 1 % \uC548\uC5D0\uC11C \uB2E4\uB974\uB2E4","jwst.marker_fixed":"{date} \uC704\uCE58 (\uACE0\uC815)","jwst.zoom_phys":"\uD655\uB300\uD574\uC11C \uBCF4\uAE30 \u2014 \uB300\uD45C 5 \uC77C \uC9C0\uC810 (\uC138 \uC120)","jwst.zoom_ext":"\uD655\uB300\uD574\uC11C \uBCF4\uAE30 \u2014 \uCC3D \uB05D:","jwst.zoom_focus_R5":"JWST \uD655\uB300 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50, \uB300\uD45C 5 \uC77C \uC9C0\uC810","jwst.zoom_focus_A":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D A \uB05D","jwst.zoom_focus_B":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D B \uB05D","jwst.zoom_focus_C":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D C \uB05D","jwst.zoom_norecon":"\uC2E4\uC81C \uADA4\uC801 \uC790\uB8CC \uC5C6\uC74C (2026-10-05 \uC774\uD6C4)","jwst.zl_recon":"\uC7AC\uAD6C\uC131 \uADA4\uC801 (03U)","jwst.zl_mine_kB":"\uB0B4 \uBAA8\uD615 (k_B)","jwst.zl_jpl01U":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21 (01U)","jwst.zl_jpl":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21","jwst.gap_mine_recon":"\uB0B4 \uBAA8\uD615 \u2194 \uC7AC\uAD6C\uC131","jwst.gap_jpl_recon":"JPL \u2194 \uC7AC\uAD6C\uC131","jwst.gap_mine_jpl":"\uB0B4 \uBAA8\uD615 \u2194 JPL","source.join":"\uC7AC\uAD6C\uC131 \uADA4\uC801 \uC774\uC74C","l2.view_lab":"\uC2E4\uD5D8\uC2E4","lab.title":"\uC2E4\uD5D8\uC2E4 \u2014 L2 \uADFC\uCC98 \uCD08\uAE30 \uC0C1\uD0DC\uC758 \uC774\uD0C8","lab.scope":"CR3BP \uBAA8\uD615 \uC548\uC758 \uACB0\uACFC (\uAD6C\uD604 \uAC80\uC99D \uC131\uACA9 \u2014 \uBB3C\uB9AC \uAC80\uC99D \uC544\uB2D8). \uC22B\uC790\uB294 \uBAA8\uB450 \uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0 (Python \uC77C\uCE58 \uC2DC\uD5D8 \uD1B5\uACFC)","lab.fold":"\uC811\uAE30","lab.unfold":"\uD3BC\uCE58\uAE30","lab.loading":"\uC2E4\uD5D8\uC2E4 \uC790\uB8CC \uBD88\uB7EC\uC624\uB294 \uC911\u2026 (\uCC98\uC74C \uD55C \uBC88, \uC57D 17 MB)","lab.examples":"\uC608\uC2DC","lab.ex_q10":"\uBE60\uB978 \uC774\uD0C8 (10 %)","lab.ex_q50":"\uC911\uAC04 (50 %)","lab.ex_q90":"\uB290\uB9B0 \uC774\uD0C8 (90 %)","lab.ex_out":"\uBC94\uC704 \uBC16 \uC2DC\uC5F0","lab.ex_noise":"\uC7A1\uC74C \uBC14\uB2E5 \uADFC\uCC98","lab.ex_src":"\uC608\uC2DC \uCD9C\uCC98: {src} (3-B \uD45C\uBCF8 \uBC88\uD638 {no})","lab.s_sign":"e_u \uBD80\uD638","lab.s_eu":"|e_u| (\uBD88\uC548\uC815)","lab.s_es":"e_s (\uC548\uC815)","lab.s_ap":"\uBA74\uB0B4 \uC9C4\uD3ED A_p","lab.s_phip":"\uBA74\uB0B4 \uC704\uC0C1","lab.s_az":"\uBA74\uC678 \uC9C4\uD3ED A_z","lab.s_phiz":"\uBA74\uC678 \uC704\uC0C1","lab.sign_out":"+ \uBC14\uAE65\uCABD","lab.sign_in":"\u2212 \uC9C0\uAD6C \uCABD","lab.outside":"\uBC94\uC704 \uBC16 \uD5C8\uC6A9 (\uC678\uC0BD \u2014 \uC5F0\uAD6C \uD504\uB9AC\uC14B\uB9CC)","lab.col_r":"\uAE30\uC900 R","lab.col_truth":"\uC815\uB2F5 [\uC77C]","lab.col_t3":"T3 [\uC77C]","lab.col_d24":"D24 [\uC77C]","lab.col_mlp":"MLP-C_ln [\uC77C]","lab.col_hybrid":"\uD558\uC774\uBE0C\uB9AC\uB4DC [\uC77C] \u2014 \uD310\uC815: \uAE30\uAC01","lab.col_dt3":"T3 \uCC28 \u0394ln t","lab.col_dd24":"D24 \uCC28 \u0394ln t","lab.col_dmlp":"MLP \uCC28 \u0394ln t","lab.col_dir":"\uBC29\uD5A5 (e_u*)","lab.col_flag":"\uC2E0\uB8B0\uB3C4","lab.flag_extrap":"\uC678\uC0BD","lab.flag_unc":"\uBD88\uD655\uC2E4","lab.flag_unc_mismatch":"MLP-C_ln \uACFC T3 \uC758 \uCC28\uAC00 \uAC80\uC99D RMSE_log \uC758 3 \uBC30\uB97C \uB118\uC74C (\uC0AC\uC804 \uB4F1\uB85D 5\uC808)","lab.flag_unc_spread":"MLP \uC2DC\uB4DC 3 \uAC1C\uC758 \uD37C\uC9D0\uC774 \uAC80\uC99D \uC911\uC559\uAC12\uC758 3 \uBC30\uB97C \uB118\uC74C (\uC0AC\uC804 \uB4F1\uB85D 5\uC808)","lab.extrap_long":"\uC678\uC0BD \u2014 \uC2E0\uB8B0\uD558\uC9C0 \uC54A\uC74C (\uD559\uC2B5 \uBC94\uC704 \uBC16)","lab.no_escape":"\uBBF8\uC774\uD0C8","lab.dir_hit":"\uB9DE\uC74C","lab.dir_miss":"\uD2C0\uB9BC","lab.waiting":"\uC190\uC744 \uB193\uC73C\uBA74 \uC815\uB2F5 \uC801\uBD84 \uC2DC\uC791","lab.integrating":"\uC815\uB2F5 \uC801\uBD84 \uC911 (Worker)\u2026","lab.integrating_days":"\uC815\uB2F5 \uC801\uBD84 \uC911 \u2014 {d} \uC77C","lab.done":"\uC815\uB2F5 \uC801\uBD84 \uB05D ({ms} ms, \uADA4\uC801 \uC810 {n} \uAC1C)","lab.error":"\uC624\uB958: {msg}","lab.hybrid_note":"\uD558\uC774\uBE0C\uB9AC\uB4DC = T3\xB7D24 \uB97C R \uB9C8\uB2E4 \uC774\uC5B4 \uBD99\uC778 \uAC83 \u2014 \uBB34\uAC8C w_R 6 \uAC1C\uAC00 \uBAA8\uB450 0 \uC774\uB77C D24 \uC640 \uAC19\uB2E4. \uC0AC\uC804 \uB4F1\uB85D \uD310\uC815 (H): \uAE30\uAC01 (\uAD6C\uC870\uC801), \uC794\uCC28 \uBAA8\uB378 \uD310\uC815 (R): \uC9C0\uC9C0. ","lab.foot":"T3 = \uC120\uD615 \uC774\uB860 + 2\uCC28 \uBCF4\uC815 e_u*, D24 = T3 + RF \uC794\uCC28 (50 \uADF8\uB8E8), MLP-C_ln = \uC2E0\uACBD\uB9DD \uC2DC\uB4DC 3 \uD3C9\uADE0. \uC815\uB2F5 = DOP853 \uC801\uBD84 (rtol 1e-12, \uCD5C\uB300 730.5 \uC77C, 0.316\u03B3 \uC5D0\uC11C \uBA48\uCDA4). \u0394ln t = \uC608\uCE21 \u2212 \uC815\uB2F5.","lab.mobile_note":"\uC2E4\uD5D8\uC2E4\uC740 \uCEF4\uD4E8\uD130\uC5D0\uC11C \uC774\uC6A9\uD574 \uC8FC\uC138\uC694. \uD734\uB300\uD3F0 \uD654\uBA74\uC5D0\uC11C\uB294 \uC2AC\uB77C\uC774\uB354\uC640 \uACB0\uACFC \uD45C\uAC00 \uC881\uC544 \uCD08\uAE30 \uC0C1\uD0DC\uB97C \uC815\uD655\uD788 \uB193\uAE30 \uC5B4\uB835\uC2B5\uB2C8\uB2E4. (\uC548\uB0B4 \uBB38\uAD6C \uCD08\uC548 \u2014 \uC0AC\uC6A9\uC790 \uD655\uC778 \uB300\uAE30)","time.go":"\uC774\uB3D9","time.out_of_range":"\uC790\uB8CC \uAE30\uAC04 \uBC16 (2022-01-01 ~ 2049-12-31)","time.loading":"\uCC9C\uCCB4\uB825 \uBD88\uB7EC\uC624\uB294 \uC911\u2026","l2.view_solar":"\uD0DC\uC591\uACC4","body.mercury":"\uC218\uC131\uACC4","body.venus":"\uAE08\uC131\uACC4","body.mars":"\uD654\uC131\uACC4","body.jupiter":"\uBAA9\uC131\uACC4","body.saturn":"\uD1A0\uC131\uACC4","body.uranus":"\uCC9C\uC655\uC131\uACC4","body.neptune":"\uD574\uC655\uC131\uACC4","desc.Mercury":"\uC218\uC131 (\uD589\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC \u2014 \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 12 \uC2DC\uAC04 \uAC04\uACA9) \uBCF4\uAC04\uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C.","desc.Venus":"\uAE08\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 2 \uC77C \uAC04\uACA9) \uBCF4\uAC04\uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C.","desc.Mars":"\uD654\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 4 \uC77C \uAC04\uACA9).","desc.Jupiter":"\uBAA9\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 16 \uC77C \uAC04\uACA9).","desc.Saturn":"\uD1A0\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","desc.Uranus":"\uCC9C\uC655\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","desc.Neptune":"\uD574\uC655\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","view.true_size":"\uC2E4\uC81C \uD06C\uAE30","view.true_size_title":"\uCC9C\uCCB4 \uD06C\uAE30 \uACFC\uC7A5 (\uD654\uBA74\uC5D0\uC11C \uC791\uC73C\uBA74 \uD0A4\uC6C0 \u2014 \uD45C\uC2DC\uC6A9 \uADFC\uC0AC) \uB044\uAE30","layer.planets":"\uD589\uC131\uACC4","layer.stars":"\uBCC4","layer.milkyway":"\uC740\uD558\uC218","layer.clouds":"\uAD6C\uB984 (\uD45C\uC2DC\uC6A9 \u2014 \uADF8\uB0A0 \uAD6C\uB984 \uC544\uB2D8)","layer.nightlights":"\uC9C0\uAD6C \uBC24 \uBD88\uBE5B","layer.sunglow":"\uD0DC\uC591 \uBE5B \uBC88\uC9D0","sky.credits_stars":"\uBCC4: HYG v4.4 (David Nash, CC BY-SA 4.0)","sky.credits_mw":"\uC740\uD558\uC218: ESA/Gaia/DPAC (CC BY-SA 3.0 IGO)","sky.credits_moon":"\uB2EC: NASA SVS (\uACF5\uACF5 \uC601\uC5ED)","sky.credits_horizons":"\uADA4\uB3C4: JPL Horizons","sky.credits_earth":"\uC9C0\uAD6C \uD45C\uBA74: NASA Earth Observatory (Blue Marble\xB7Black Marble)","credits.short":"\uCD9C\uCC98","credits.images":"\uADF8\uB9BC\xB7\uC790\uB8CC \uCD9C\uCC98","credits.open":"\uADF8\uB9BC\xB7\uC790\uB8CC \uCD9C\uCC98 \uBCF4\uAE30 (\uCD9C\uCC98 \uCC3D)","credits.nasa_rule":"NASA \uD45C\uAE30 \uADFC\uAC70 (\uC6D0\uBB38):","nav.label":"\uD0D0\uC0C9","nav.targets":"\uB300\uC0C1 \uBAA9\uB85D (T)","nav.targets_panel":"\uB300\uC0C1 \uBAA9\uB85D","nav.targets_close":"\uB300\uC0C1 \uBAA9\uB85D \uB2EB\uAE30","nav.search_ph":"\uC774\uB984\uC73C\uB85C \uCC3E\uAE30","tr.label":"\uC804\uC5ED","tr.search":"\uAC80\uC0C9","tr.search_title":"\uAC80\uC0C9 ( / )","tr.settings":"\uC124\uC815","mode.label":"\uD654\uBA74 \uBAA8\uB4DC","mode.general":"\uC77C\uBC18","mode.expert":"\uC804\uBB38\uAC00","layer.view_options":"\uBCF4\uAE30 \uC635\uC158","settings.lang":"\uC5B8\uC5B4","settings.legend":"\uD654\uBA74 \uC77D\uB294 \uBC95","settings.keys":"\uB2E8\uCD95\uD0A4","settings.about":"\uC815\uBCF4","tgt.g_tour":"\uB458\uB7EC\uBCF4\uAE30","tgt.g_views":"\uBCF4\uAE30","tgt.g_points":"\uB77C\uADF8\uB791\uC8FC \uC810","tgt.g_orbits":"\uADA4\uB3C4 \xB7 \uC6B0\uC8FC\uC120","tgt.g_bodies":"\uCC9C\uCCB4","tgt.g_tools":"\uB3C4\uAD6C","tgt.tour":"\uCC98\uC74C\uBD80\uD130 \uB458\uB7EC\uBCF4\uAE30","kind.point":"\uB77C\uADF8\uB791\uC8FC \uC810","kind.orbit":"\uADA4\uB3C4","kind.craft":"\uC6B0\uC8FC\uB9DD\uC6D0\uACBD","kind.period":"\uADA4\uB3C4 \uC8FC\uAE30 \uBE44\uAD50","kind.star":"\uD56D\uC131","kind.planet":"\uD589\uC131","kind.moon":"\uC704\uC131","kind.bary":"\uC9C8\uB7C9\uC911\uC2EC","kind.system":"\uD589\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC","kind.view":"\uBCF4\uAE30","kind.zoom":"\uD655\uB300 \uBCF4\uAE30","kind.numbers":"\uC22B\uC790 \uBAA8\uC74C","desc.v_all":"\uD0DC\uC591 \uC911\uC2EC\uC758 \uB113\uC740 \uBCF4\uAE30 \u2014 \uC9C0\uAD6C \uACF5\uC804 \uADA4\uB3C4\uAC00 \uD55C \uD654\uBA74\uC5D0. \uD720\uB85C \uC904\uC774\uBA74 \uD0DC\uC591\uACC4 \uC804\uCCB4\uAE4C\uC9C0 \uBCFC \uC218 \uC788\uB2E4.","desc.v_emb":"\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC \uB458\uB808 \u2014 \uC9C0\uAD6C\xB7\uB2EC\uACFC L1\xB7L2 \uAC00 \uD55C \uD654\uBA74\uC5D0 (\uC5F0\uAD6C \uC124\uBA85\uC6A9).","desc.v_l2zoom":"L2 \uC810 \uB458\uB808\uB97C \uC218\uBC31 km \uAC70\uB9AC\uC5D0\uC11C \uBCF8\uB2E4.","info.label":"\uC815\uBCF4 \uD328\uB110","info.close":"\uC815\uBCF4 \uD328\uB110 \uB2EB\uAE30","info.more":"\uB354 \uBCF4\uAE30","info.expert_hint":"\uBAA8\uB4E0 \uC22B\uC790\xB7\uCD9C\uCC98\uB294 \uC804\uBB38\uAC00 \uBAA8\uB4DC\uC5D0\uC11C","info.focus_only":"\uCD08\uC810\uB9CC","info.fly":"\uB0A0\uC544\uAC00\uAE30","jwst.zoom_title":"\uD655\uB300\uD574\uC11C \uBCF4\uAE30","jwst.zoom_r5":"5 \uC77C \uC9C0\uC810","jwst.zoom_window":"\uCC3D {w} \uB05D","time.group":"\uC2DC\uAC04","time.slider":"\uC2DC\uAC01","time.speed_menu":"\uC7AC\uC0DD \uC18D\uB3C4","time.speed_title":"\uC7AC\uC0DD \uC18D\uB3C4 (\uB204\uB974\uBA74 \uACE0\uB974\uAE30)","time.local":"\uC9C0\uC5ED","time.date_aria":"\uD654\uBA74 \uC2DC\uAC01 {utc} UTC (\uC9C0\uC5ED \uC2DC\uAC01 {local}, {zone}) \u2014 \uB204\uB974\uBA74 \uB0A0\uC9DC \uACE0\uB974\uAE30","time.now_title":"\uAE30\uAE30\uC758 \uC9C0\uAE08 \uC2DC\uAC01\uC73C\uB85C (\uBD84 \uB2E8\uC704)","time.now_out":"\uAE30\uAE30\uC758 \uC9C0\uAE08 \uC2DC\uAC01\uC774 \uC790\uB8CC \uAE30\uAC04 \uBC16\uC774\uB77C \uC4F8 \uC218 \uC5C6\uC74C","time.date_pop":"\uB0A0\uC9DC\uB85C \uC774\uB3D9","time.date_utc_note":"\uACE0\uB978 \uB0A0\uC9DC\uC758 UTC 0 \uC2DC\uB85C \uC774\uB3D9\uD55C\uB2E4","time.date_input":"\uB0A0\uC9DC","credits.long":"\uCD9C\uCC98\xB7\uB77C\uC774\uC120\uC2A4","hint.label":"\uCC98\uC74C \uC548\uB0B4","hint.lead":"\uD0DC\uC591 \uBC18\uB300\uCABD, JWST \uAC00 \uBA38\uBB34\uB294 \uD3C9\uD615\uC810 L2","hint.how":"\uB04C\uC5B4\uC11C \uB3CC\uB9AC\uAE30 \xB7 \uD720\uB85C \uD655\uB300","hint.tour":"\uB458\uB7EC\uBCF4\uAE30","hint.close":"\uC548\uB0B4 \uB2EB\uAE30","tag.open_hint":"\uB20C\uB7EC\uC11C \uCD9C\uCC98 \uBCF4\uAE30","tag.pop_label":"\uAF2C\uB9AC\uD45C\uC640 \uCD9C\uCC98","tag.pop_source":"\uCD9C\uCC98","tag.pop_open":"\uCD9C\uCC98 \uCC3D \uC5F4\uAE30","numg.L1_dist":"\uC9C0\uAD6C\xB7\uB2EC \uC9C8\uB7C9\uC911\uC2EC\uC5D0\uC11C\uC758 \uAC70\uB9AC","numg.L2_dist":"\uC9C0\uAD6C\xB7\uB2EC \uC9C8\uB7C9\uC911\uC2EC\uC5D0\uC11C\uC758 \uAC70\uB9AC","numg.L3_dist":"\uC9C0\uAD6C\xB7\uB2EC \uC9C8\uB7C9\uC911\uC2EC\uC5D0\uC11C\uC758 \uAC70\uB9AC","numg.L4_dist":"\uC9C0\uAD6C\xB7\uB2EC \uC9C8\uB7C9\uC911\uC2EC\uC5D0\uC11C\uC758 \uAC70\uB9AC","numg.L5_dist":"\uC9C0\uAD6C\xB7\uB2EC \uC9C8\uB7C9\uC911\uC2EC\uC5D0\uC11C\uC758 \uAC70\uB9AC","numg.annual_3A":"\uC5F0\uAC04 \uADA4\uB3C4 \uC720\uC9C0 \u0394v \u2014 L2 \uC810\uC5D0 \uBA38\uBB3C\uAE30 (\uB2E8\uC21C \uBAA8\uD615)","numg.annual_3C":"\uC5F0\uAC04 \uADA4\uB3C4 \uC720\uC9C0 \u0394v \u2014 \uD5E4\uC77C\uB85C \uADA4\uB3C4 (\uB2E8\uC21C \uBAA8\uD615)","numg.annual_4C":"\uC5F0\uAC04 \uADA4\uB3C4 \uC720\uC9C0 \u0394v \u2014 \uD5E4\uC77C\uB85C \uADA4\uB3C4 (\uC2E4\uC81C \uCC9C\uCCB4 \uC704\uCE58)","numg.halo_period":"\uD55C \uBC14\uD034 \uB3C4\uB294 \uC2DC\uAC04","numg.halo_zmax":"\uD669\uB3C4\uBA74\uC5D0\uC11C \uAC00\uC7A5 \uBA3C \uB192\uC774","numg.unstable_deg":"\uAC00\uC7A5 \uBE68\uB9AC \uBA40\uC5B4\uC9C0\uB294 \uBC29\uD5A5","numg.stable_deg":"\uB418\uB3CC\uC544\uC624\uB294 \uBC29\uD5A5","numg.shift_max":"\uD587\uBE5B \uC555\uB825\uC744 \uB123\uC73C\uBA74 \uAE30\uC900 \uADA4\uB3C4\uAC00 \uC62E\uACA8 \uAC00\uB294 \uAC70\uB9AC (\uCD5C\uB300)","numg.shift_mean":"\uD587\uBE5B \uC555\uB825\uC744 \uB123\uC73C\uBA74 \uAE30\uC900 \uADA4\uB3C4\uAC00 \uC62E\uACA8 \uAC00\uB294 \uAC70\uB9AC (\uD3C9\uADE0)","numg.wrong_ref_4C":"\uC798\uBABB\uB41C \uAE30\uC900\uC744 \uC4F8 \uB54C \uB4DC\uB294 \u0394v \uC758 \uBC30\uC218 \u2014 \uB2E8\uC21C \uBAA8\uD615 \uD5E4\uC77C\uB85C\uB97C \uAE30\uC900\uC73C\uB85C","numg.wrong_ref_4D":"\uC798\uBABB\uB41C \uAE30\uC900\uC744 \uC4F8 \uB54C \uB4DC\uB294 \u0394v \uC758 \uBC30\uC218 \u2014 \uD587\uBE5B \uC555\uB825\uC744 \uBE80 \uAE30\uC900","numg.jwst_err_range":"\uC57D 4 \uC8FC \uB4A4 \uC704\uCE58 \uCC28 \u2014 \uC774 \uC5F0\uAD6C\uC758 \uC608\uCE21 \uB300 NASA JPL \uC608\uCE21 (4 \uAC00\uC9C0)","numg.jwst_err_R5":"5 \uC77C \uB4A4 \uC2E4\uC81C \uADA4\uC801\uACFC\uC758 \uC704\uCE58 \uCC28 \u2014 \uC774 \uC5F0\uAD6C\uC758 \uBAA8\uD615","numg.jwst_err_R5_jpl":"5 \uC77C \uB4A4 \uC2E4\uC81C \uADA4\uC801\uACFC\uC758 \uC704\uCE58 \uCC28 \u2014 NASA JPL \uC608\uCE21","numg.jwst_period_nasa":"NASA \uAC00 \uBC1D\uD78C \uD55C \uBC14\uD034","numg.jwst_period_recon":"\uC2E4\uC81C \uBE44\uD589 \uADA4\uC801\uC5D0\uC11C \uC7B0 \uD55C \uBC14\uD034 (\uC774 \uC5F0\uAD6C\uC758 \uACC4\uC0B0)","numg.jwst_period_halo":"\uAC19\uC740 \uD06C\uAE30 \uD5E4\uC77C\uB85C \uADA4\uB3C4\uC758 \uD55C \uBC14\uD034 (\uB2E8\uC21C \uBAA8\uD615)","tgtg.view-emb":"\uC9C0\uAD6C\xB7\uB2EC \uB458\uB808","tgtg.view-l2zoom":"L2 \uAC00\uAE4C\uC774","tgtg.halo_main":"\uD5E4\uC77C\uB85C \uADA4\uB3C4","tgtg.jwst_period":"JWST \uADA4\uB3C4 \uBE44\uAD50","lblg.body.emb":"\uC9C0\uAD6C\xB7\uB2EC \uC9C8\uB7C9\uC911\uC2EC","lblg.l2.unstable":"\uBA40\uC5B4\uC9D0","lblg.l2.stable":"\uB418\uB3CC\uC544\uC634","lblg.l2.halo_main":"\uD5E4\uC77C\uB85C \uADA4\uB3C4","lblg.jwst.orbit_label":"JWST \uC2E4\uC81C \uADA4\uC801","lblg.jwst.layer_ext_short":"NASA JPL \uC608\uCE21\uACFC \uBE44\uAD50","lblg.jwst.layer_phys_short":"\uC2E4\uC81C \uADA4\uC801\uACFC \uBE44\uAD50","lblg.jwst.zl_recon":"\uC2E4\uC81C \uADA4\uC801","lblg.jwst.zl_mine_kB":"\uC774 \uC5F0\uAD6C\uC758 \uBAA8\uD615","lblg.jwst.zl_jpl01U":"NASA JPL \uC608\uCE21","lblg.jwst.zl_jpl":"NASA JPL \uC608\uCE21","lblg.jwst.gap_mine_recon":"\uC774 \uC5F0\uAD6C\uC758 \uBAA8\uD615 \u2194 \uC2E4\uC81C \uADA4\uC801","lblg.jwst.gap_jpl_recon":"NASA JPL \u2194 \uC2E4\uC81C \uADA4\uC801","lblg.jwst.gap_mine_jpl":"\uC774 \uC5F0\uAD6C\uC758 \uBAA8\uD615 \u2194 NASA JPL","tag.easy_impl":"\uCF54\uB4DC\uAC00 \uC758\uB3C4\uD55C \uC2DD\uC744 \uC815\uD655\uD788 \uD478\uB294\uC9C0 \uD655\uC778\uD55C \uAC12","tag.easy_external":"\uB2E4\uB978 \uAE30\uAD00\uC758 \uACC4\uC0B0\xB7\uC790\uB8CC\uC640 \uBE44\uAD50\uD55C \uAC12","tag.easy_physical":"\uC2E4\uC81C \uBE44\uD589 \uADA4\uC801\uACFC \uBE44\uAD50\uD55C \uAC12","tag.easy_more":"\uD30C\uC77C \uACBD\uB85C\xB7\uC138\uBD80 \uBD84\uB958\uB294 \uCD9C\uCC98 \uCC3D\uC5D0","hint.how_touch":"\uB04C\uC5B4\uC11C \uB3CC\uB9AC\uAE30 \xB7 \uB450 \uC190\uAC00\uB77D\uC73C\uB85C \uD655\uB300","info.tabs":"\uC815\uBCF4 \uD328\uB110 \uD0ED","info.tab_summary":"\uC694\uC57D","info.tab_all":"\uBAA8\uB4E0 \uC22B\uC790","info.tab_source":"\uCD9C\uCC98","info.src_none":"\uC774 \uB300\uC0C1\uC5D0\uB294 \uC22B\uC790\uAC00 \uC5C6\uB2E4","info.src_open":"\uCD9C\uCC98 \uCC3D","info.export_this":"\uC774 \uB300\uC0C1 \uB0B4\uBCF4\uB0B4\uAE30","status.label":"\uC0C1\uD0DC","status.tdb":"TDB","status.focus":"\uCD08\uC810 \uAC70\uB9AC","status.focus_title":"\uCE74\uBA54\uB77C\uC5D0\uC11C \uCD08\uC810 \uB300\uC0C1\uAE4C\uC9C0\uC758 \uAC70\uB9AC \u2014 \uADF8\uB9AC\uAE30 \uC0C1\uD0DC (\uD45C\uC2DC\uC6A9 \uADFC\uC0AC, \uAC80\uC99D \uAF2C\uB9AC\uD45C \uC5C6\uC74C)","status.more":"\uC0C1\uD0DC","status.more_title":"TDB \xB7 \uC88C\uD45C\uACC4 \xB7 \uCD08\uC810 \uAC70\uB9AC \uBCF4\uAE30","sheet.expand":"\uD328\uB110 \uD06C\uAC8C \u2014 \uB04C\uC5B4\uC11C \uD06C\uAE30 \uBC14\uAFB8\uAE30, \uC544\uB798\uB85C \uB04C\uBA74 \uB2EB\uD798","sheet.collapse":"\uD328\uB110 \uC791\uAC8C \u2014 \uB04C\uC5B4\uC11C \uD06C\uAE30 \uBC14\uAFB8\uAE30, \uC544\uB798\uB85C \uB04C\uBA74 \uB2EB\uD798","time.speed_unit":"\uC77C/\uCD08","time.speed_group":"\uC7AC\uC0DD \uC18D\uB3C4","export.button":"\uB0B4\uBCF4\uB0B4\uAE30 \xB7 \uACF5\uC720","export.title":"\uB0B4\uBCF4\uB0B4\uAE30 \xB7 \uACF5\uC720 \uC8FC\uC18C","export.csv":"\uC22B\uC790 CSV \uC800\uC7A5","export.json":"\uC22B\uC790 JSON \uC800\uC7A5","export.note":"\uD30C\uC77C \uC800\uC7A5\xB7\uD074\uB9BD\uBCF4\uB4DC\uB9CC \u2014 \uC678\uBD80\uB85C \uBCF4\uB0B4\uC9C0 \uC54A\uB294\uB2E4. \uC22B\uC790\uB294 Python \uACB0\uACFC \uAE00\uC790\uC640 \uCD9C\uCC98\xB7\uAF2C\uB9AC\uD45C \uADF8\uB300\uB85C","export.share":"\uACF5\uC720 \uC8FC\uC18C","export.copy":"\uC8FC\uC18C \uBCF5\uC0AC","export.copied":"\uBCF5\uC0AC\uD568","export.copy_fail":"\uBCF5\uC0AC \uBABB \uD568 \u2014 \uC8FC\uC18C\uB97C \uC9C1\uC811 \uACE0\uB974\uAE30","export.share_note":"\uC8FC\uC18C\uB85C \uC5F0 \uC0C1\uD0DC\uB294 \uC7A0\uC2DC \uC801\uC6A9 (\uC800\uC7A5\uD55C \uC124\uC815\uC740 \uADF8\uB300\uB85C)","export.shared_on":"\uACF5\uC720 \uC8FC\uC18C\uC758 \uC0C1\uD0DC\uB97C \uC7A0\uC2DC \uC801\uC6A9\uD568","layer.mode_default":"\uC774 \uBAA8\uB4DC \uAE30\uBCF8\uAC12\uC73C\uB85C","key.m_general":"\uC77C\uBC18 \uBAA8\uB4DC","key.m_expert":"\uC804\uBB38\uAC00 \uBAA8\uB4DC","key.export":"\uB0B4\uBCF4\uB0B4\uAE30 (\uC804\uBB38\uAC00)","tour.label":"\uB458\uB7EC\uBCF4\uAE30","tour.step":"{i} / {n}","tour.step_aria":"{n} \uACF3 \uAC00\uC6B4\uB370 {i} \uBC88\uC9F8","tour.prev":"\uC774\uC804","tour.next":"\uB2E4\uC74C","tour.finish":"\uB05D\uB0B4\uAE30","tour.end":"\uB458\uB7EC\uBCF4\uAE30 \uB05D\uB0B4\uAE30","tour.paused":"\uC7A5\uBA74\uC744 \uC6C0\uC9C1\uC5EC\uC11C \uC7A0\uC2DC \uBA48\uCDC4\uC2B5\uB2C8\uB2E4.","tour.resume":"\uC774\uC5B4\uC11C \uAC00\uAE30","tour.keys":"\u2190 \u2192 \uB118\uAE30\uAE30 \xB7 Esc \uB05D\uB0B4\uAE30","tour.solar_title":"\uD0DC\uC591\uACC4","tour.solar_text":"\uD0DC\uC591\uACFC \uC5EC\uB35F \uD589\uC131\uC785\uB2C8\uB2E4. \uC774 \uD654\uBA74\uC758 \uC8FC\uC778\uACF5 L2 \uB294 \uC9C0\uAD6C \uBC14\uB85C \uBC14\uAE65, \uD0DC\uC591 \uBC18\uB300\uCABD\uC5D0 \uC788\uB294 \uC810\uC785\uB2C8\uB2E4. \uC9C0\uAD6C \uCABD\uC73C\uB85C \uAC00\uAE4C\uC774 \uAC00 \uBD05\uC2DC\uB2E4.","tour.emb_title":"\uC9C0\uAD6C\xB7\uB2EC \uB458\uB808 \u2014 L1 \uACFC L2","tour.emb_text":"\uC9C0\uAD6C\uC640 \uB2EC\uC744 \uD55C \uBAB8\uC73C\uB85C \uBCF4\uBA74 \uD0DC\uC591 \uCABD\uC5D0 L1, \uBC18\uB300\uCABD\uC5D0 L2 \uAC00 \uC788\uC2B5\uB2C8\uB2E4. \uC774 \uB450 \uC810\uC5D0\uC11C\uB294 \uD0DC\uC591\uACFC \uC9C0\uAD6C\xB7\uB2EC\uC774 \uB044\uB294 \uD798\uC774 \uD568\uAED8 \uB3C4\uB294 \uC6C0\uC9C1\uC784\uACFC \uB9DE\uC544\uB5A8\uC5B4\uC9D1\uB2C8\uB2E4. L2 \uB294 \uC9C0\uAD6C\xB7\uB2EC\uC5D0\uC11C {n0} \uB5A8\uC5B4\uC838 \uC788\uC2B5\uB2C8\uB2E4.","tour.l2_title":"L2 \u2014 \uC65C \uBD88\uC548\uC815\uD55C\uAC00","tour.l2_text":"L2 \uB294 \uB9D0\uC548\uC7A5 \uD55C\uAC00\uC6B4\uB370 \uAC19\uC740 \uACF3\uC785\uB2C8\uB2E4. \uD55C \uBC29\uD5A5\uC73C\uB85C \uBC00\uB9AC\uBA74 \uB418\uB3CC\uC544\uC624\uC9C0\uB9CC, \uB2E4\uB978 \uBC29\uD5A5\uC73C\uB85C\uB294 \uC870\uAE08\uB9CC \uBC00\uB824\uB3C4 \uC810\uC810 \uBE68\uB9AC \uBA40\uC5B4\uC9D1\uB2C8\uB2E4. \uBE68\uAC04 \uC120\uC740 \uAC00\uC7A5 \uBE68\uB9AC \uBA40\uC5B4\uC9C0\uB294 \uBC29\uD5A5, \uCD08\uB85D \uC120\uC740 \uB418\uB3CC\uC544\uC624\uB294 \uBC29\uD5A5\uC785\uB2C8\uB2E4. \uC8FC\uD669\xB7\uCCAD\uB85D \uACE1\uC120\uC740 L2 \uADFC\uCC98\uC5D0\uC11C \uCD9C\uBC1C\uD574 \uBC14\uAE65\uCABD (\uD0DC\uC591 \uBC18\uB300\uCABD)\xB7\uC9C0\uAD6C \uCABD\uC73C\uB85C \uBA40\uC5B4\uC838 \uAC04 \uACC4\uC0B0 \uADA4\uC801\uC785\uB2C8\uB2E4.","tour.halo_title":"\uD5E4\uC77C\uB85C \uADA4\uB3C4","tour.halo_text":"\uADF8\uB798\uC11C \uC6B0\uC8FC\uC120\uC740 L2 \uC810\uC5D0 \uC11C \uC788\uC9C0 \uC54A\uACE0 \uADF8 \uB458\uB808\uB97C \uD06C\uAC8C \uB3C4\uB294 \uD5E4\uC77C\uB85C \uADA4\uB3C4\uC5D0 \uB193\uC785\uB2C8\uB2E4. \uC774 \uADA4\uB3C4\uB294 \uD55C \uBC14\uD034\uC5D0 {n0}, \uD669\uB3C4\uBA74\uC5D0\uC11C \uAC00\uC7A5 \uB192\uC774 {n1} \uAE4C\uC9C0 \uC62C\uB77C\uAC11\uB2C8\uB2E4.","tour.jwst_title":"JWST \uC2E4\uC81C \uADA4\uC801","tour.jwst_text":"\uC81C\uC784\uC2A4 \uC6F9 \uC6B0\uC8FC \uB9DD\uC6D0\uACBD (JWST) \uC740 \uC2E4\uC81C\uB85C L2 \uB458\uB808\uB97C \uB3CC\uACE0 \uC788\uC2B5\uB2C8\uB2E4. \uC120\uC740 NASA JPL \uC774 \uACF5\uAC1C\uD55C \uC2E4\uC81C \uBE44\uD589 \uADA4\uC801\uC785\uB2C8\uB2E4. \uC774 \uC5F0\uAD6C\uAC00 \uC774 \uADA4\uC801\uC73C\uB85C \uACC4\uC0B0\uD55C \uD55C \uBC14\uD034\uB294 {n0} \uC785\uB2C8\uB2E4 (NASA \uAC00 \uBC1D\uD78C \uAC12\uACFC\uB294 \uB2E4\uB974\uBA70, \uAE4C\uB2ED\uC740 \uC544\uC9C1 \uD655\uC778\uD558\uC9C0 \uBABB\uD588\uC2B5\uB2C8\uB2E4).","tour.dv_title":"\uADA4\uB3C4 \uC720\uC9C0 \u0394v","tour.dv_text":"L2 \uB458\uB808\uB294 \uBD88\uC548\uC815\uD574\uC11C \uAC00\uB054 \uC791\uC740 \uBD84\uC0AC\uB85C \uADA4\uB3C4\uB97C \uBC14\uB85C\uC7A1\uC544\uC57C \uD569\uB2C8\uB2E4. \uD45C\uC2DC\uB294 \uACC4\uC0B0\uC5D0\uC11C \uBD84\uC0AC\uD55C \uC790\uB9AC\uC785\uB2C8\uB2E4. \uC2E4\uC81C \uCC9C\uCCB4 \uC704\uCE58\uB85C \uD55C \uC774 \uC5F0\uAD6C\uC758 \uACC4\uC0B0\uC5D0\uC11C \uD574\uB9C8\uB2E4 \uBC14\uAFB8\uB294 \uC18D\uB3C4\uB294 \uBAA8\uB450 {n0} \uC815\uB3C4\uC785\uB2C8\uB2E4.","tour.expert_title":"\uB354 \uC54C\uACE0 \uC2F6\uB2E4\uBA74 \u2014 \uC804\uBB38\uAC00 \uBAA8\uB4DC","tour.expert_text":"\uC22B\uC790 \uC606\uC758 \uC791\uC740 \uC810\uC740 \uADF8 \uAC12\uC744 \uC5B4\uB5BB\uAC8C \uD655\uC778\uD588\uB294\uC9C0 \uC54C\uB824 \uC90D\uB2C8\uB2E4 (\uB204\uB974\uBA74 \uBCF4\uC784). \uCD9C\uCC98 \uD30C\uC77C\xB7\uACC4\uC0B0 \uBC29\uBC95\xB7\uBAA8\uB4E0 \uC22B\uC790\uB294 \uC804\uBB38\uAC00 \uBAA8\uB4DC\uC5D0\uC11C \uBCFC \uC218 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC624\uB978\uCABD \uC704 [\uC804\uBB38\uAC00], \uB610\uB294 2 \uD0A4.","tour.expert_text_touch":"\uC22B\uC790 \uC606\uC758 \uC791\uC740 \uC810\uC740 \uADF8 \uAC12\uC744 \uC5B4\uB5BB\uAC8C \uD655\uC778\uD588\uB294\uC9C0 \uC54C\uB824 \uC90D\uB2C8\uB2E4 (\uB204\uB974\uBA74 \uBCF4\uC784). \uCD9C\uCC98 \uD30C\uC77C\xB7\uACC4\uC0B0 \uBC29\uBC95\xB7\uBAA8\uB4E0 \uC22B\uC790\uB294 \uC804\uBB38\uAC00 \uBAA8\uB4DC\uC5D0\uC11C \uBCFC \uC218 \uC788\uC2B5\uB2C8\uB2E4 \u2014 \uC704\uC758 [\uC804\uBB38\uAC00].","preset.touring":"\uB458\uB7EC\uBCF4\uAE30 \uC911","help.note_c":"\uB808\uC774\uC5B4 \uD0A4 (L\xB7O\xB7N\xB7B\xB7G) \uB294 \uC228\uC740 \uB9C9\uB300\uB97C \uAEBC\uB0B4\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. \uCF20 \uC0C1\uD0DC\uB294 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uAE30\uC5B5\uB429\uB2C8\uB2E4.","help.keys_line_c":"L \uC774\uB984\uD45C \xB7 O \uADA4\uB3C4 \xB7 N \uC22B\uC790 \xB7 ? \uB2E8\uCD95\uD0A4 \uC804\uBD80","keyc.labels":"\uC774\uB984\uD45C \uBCF4\uC774\uAE30\xB7\uC228\uAE30\uAE30","keyc.g_orbits":"\uADA4\uB3C4 \uC120 \uBCF4\uC774\uAE30\xB7\uC228\uAE30\uAE30","keyc.g_numbers":"\uC22B\uC790 \uBCF4\uC774\uAE30\xB7\uC228\uAE30\uAE30","keyc.g_bodies":"\uCC9C\uCCB4\xB7\uC810 \uBCF4\uC774\uAE30\xB7\uC228\uAE30\uAE30","keyc.grid":"\uBC14\uB2E5 \uACA9\uC790 \uBCF4\uC774\uAE30\xB7\uC228\uAE30\uAE30","keyc.m_general":"\uC77C\uBC18 \uBAA8\uB4DC","keyc.m_expert":"\uC804\uBB38\uAC00 \uBAA8\uB4DC","keyc.export":"\uC22B\uC790 \uB0B4\uBCF4\uB0B4\uAE30 (\uC804\uBB38\uAC00 \uBAA8\uB4DC)","keyc.search":"\uCC3E\uAE30","keyc.targets":"\uB300\uC0C1 \uBAA9\uB85D \uC5F4\uAE30\xB7\uB2EB\uAE30","keyc.help":"\uC774 \uD45C \uC5F4\uAE30\xB7\uB2EB\uAE30","keyc.esc":"\uC5F4\uB9B0 \uAC83 \uD558\uB098 \uB2EB\uAE30 (\uB2E4 \uB2EB\uD600 \uC788\uC73C\uBA74 \uD654\uBA74 \uC815\uB9AC)","keyc.tour":"\uB458\uB7EC\uBCF4\uAE30\uC5D0\uC11C \uC774\uC804\xB7\uB2E4\uC74C"};var fp={"app.title":"Sun\u2013Earth/Moon L2","app.subtitle":"Stage 7 3D visualization \xB7 M2 JWST layer","lang.switch":"\uD55C\uAD6D\uC5B4","lang.switch_title":"Switch language","version.commit":"commit","version.dirty":"uncommitted changes","version.title":"Version \xB7 build date (KST) \xB7 commit","panel.samples":"Tag test numbers","panel.samples_note":"Click a number to open its source window. Hover a tag to see the detailed category.","tag.weak":"weak","tag.display_approx":"display approximation","source.title":"Source","source.value":"Value","source.unit":"Unit","source.file":"File","source.key":"Key","source.commit":"Computed by","source.source_hash":"Source hash (first 12)","source.ref_commit":"Reference commit","source.build":"App build","source.stage":"Stage","source.model":"Model","source.verification":"Verification tag","source.note":"Note","source.close":"Close","source.browser_calc":"Browser calculation (passed the Python match test, tolerance {tol})","source.time_scale":"Time scale","pwa.update":"New version available \u2014 reload","pwa.offline_ready":"Ready offline","error.load":"Could not read data: {msg}","error.schema":"Data format error: {msg}","body.sun":"Sun","body.emb":"EMB (Earth\u2013Moon barycenter)","body.earth":"Earth","body.moon":"Moon","l2.panel":"L2 scene","l2.mode":"Frame","l2.mode_rot":"Rotating","l2.mode_inertial":"Inertial","l2.view":"View","l2.view_all":"Whole","l2.view_emb":"Earth\u2013Moon\u2013L1/L2","l2.view_l2":"Near L2","l2.view_l2zoom":"L2 close-up","l2.time":"Time","l2.play":"Play","l2.pause":"Pause","l2.speed":"{n} d/s","l2.layer_lpoints":"Lagrange points","l2.layer_bodies":"Sun & EMB","l2.layer_dirs":"L2 unstable/stable directions","l2.layer_earthmoon":"Earth & Moon (real ephemeris)","l2.layer_halo":"3-C halo family","l2.layer_escape":"3-B escape trajectories","l2.layer_burns":"Correction maneuvers (3-A, 3-C, 4-C)","l2.layer_ref":"4-C/4-D reference orbits","l2.unstable":"unstable","l2.stable":"stable","l2.halo_main":"Main halo orbit","l2.g_lpoints":"Lagrange points (stage 1)","l2.g_dirs":"L2 directions (stage 2)","l2.g_halo":"Main halo orbit (3-C)","l2.g_annual":"Annual \u0394v (3-A, 3-C, 4-C)","l2.g_ref":"Reference orbits vs halo (4-C, 4-D)","l2.g_escape":"Escape times (3-B)","l2.g_interp":"Ephemeris interpolation error (4-A)","l2.g_m0":"Tag test numbers (M0)","l2.legend_markers":"Marker sizes and arrow lengths are not to scale (display only). Click a number for its source.","l2.legend_pulsating":"Earth & Moon: real ephemeris (DE441) in the pulsating frame \u2014 length unit = instantaneous Sun\u2013EMB distance. The 4-C/4-D reference orbits use the same frame.","l2.legend_inertial":"Inertial frame: x = ecliptic J2000 X, z = orbit normal (\u2248 ecliptic north). The CR3BP rotating frame turned by \u03B8 = \u03B8\u2080 + (t \u2212 2026-01-01 TDB)/time unit (\u03B8\u2080 = EMB's ecliptic longitude on that date).","source.browser":"Computed in","l2.escape_rule":"Examples picked for display (rule: for each sign of e_u*, the main sample whose |e_u*|/\u03B3 is closest to 1e-9, 1e-7, 1e-5; escaped past 0.316\u03B3, noise-dominated samples excluded)","panel.open":"Show panel","panel.close":"Hide panel","ui.layers":"Layers","ui.legend":"Legend","ui.numbers":"All numbers","ui.menu":"Menu","card.sphere_note":"Spheres are enlarged to be visible (true radius: Horizons header)","card.no_numbers":"No result numbers for this object yet","l2.family_all":"Show the whole halo family (default: a subset)","l2.legend_spheres":"Sun, Earth and Moon are spheres \u2014 enlarged when too small to see","tag.short_impl":"impl.","tag.short_external":"ext.","tag.short_physical":"phys.","preset.clean":"Clean","preset.explore":"Explore","preset.research":"Research","preset.custom":"Custom","preset.zooming":"Zoomed in","layer.g_bodies":"Bodies & points","layer.g_orbits":"Orbits & paths","layer.g_numbers":"Physical values & tags","layer.g_aux":"Aids","layer.sun":"Sun","layer.earth":"Earth","layer.moon":"Moon","layer.emb":"EMB (Earth\u2013Moon barycentre)","layer.lpoints":"L1 \u2013 L5","layer.halo_main":"Main halo orbit","layer.halo_family":"Halo family","layer.escape":"3-B escape paths","layer.ref":"4-C / 4-D reference orbits","layer.burns":"Correction (\u0394v) points","layer.moon_orbit":"Moon orbit (past 30-day trail)","layer.planet_orbits":"Planet orbits","layer.dirs":"L2 direction lines (unstable / stable)","layer.n_distance":"Distances","layer.n_period":"Periods","layer.n_angle":"Direction angles","layer.n_annual":"Annual \u0394v","layer.n_escape":"Escape times","layer.n_tags":"Verification tags","layer.labels":"Labels","layer.scale":"Distance scale","layer.grid":"Reference-plane grid (orbit plane)","layer.axes":"Coordinate axes","layer.tags_note":"Turning tags off hides every number \u2014 numbers always come with their tag","key.labels":"Labels on / off","key.g_orbits":"Orbits & paths on / off","key.g_numbers":"Physical values & tags on / off","key.g_bodies":"Bodies & points on / off","key.grid":"Reference-plane grid","key.p_clean":"Preset: Clean","key.p_explore":"Preset: Explore","key.p_research":"Preset: Research","key.help":"This help","help.title":"Keyboard shortcuts","help.button":"Shortcuts (?)","help.note":"Layer shortcuts do not bring up the bars. Esc hides the bars. Your layer choice is remembered in this browser.","help.keys_line":"L labels \xB7 O orbits \xB7 N values \xB7 1 2 3 presets","time.start":"To start","time.now":"Now","card.numbers_off":"No value layer is on, so the numbers are hidden (Layers \u2192 Physical values)","desc.Sun":"The Sun \u2014 the larger primary of the CR3BP.","desc.EMB":"The Earth\u2013Moon barycentre \u2014 the CR3BP's second primary (Earth and Moon as one point).","desc.Earth":"Earth, at its real ephemeris (DE441) position in pulsating coordinates. The day\u2013night line follows the sunlight.","desc.Moon":`The Moon. Real ephemeris position. The tail behind is its recent track (fading with age). Surface map: NASA SVS CGI Moon Kit (LRO LROC, public domain \u2014 credit "NASA's Scientific Visualization Studio"). Map orientation is a display approximation (mean Earth-facing side toward Earth, no libration).`,"desc.L1":"Sunward Lagrange point (CR3BP equilibrium, stage 1). Unstable \u2014 not computed directly in this study (page reference for the instability of collinear points still to be confirmed).","desc.L2":"The subject of this study: the anti-sunward equilibrium. It is unstable, so station-keeping (\u0394v) is needed.","desc.L3":"Equilibrium point on the far side of the Sun (CR3BP, stage 1). Its stability was not computed in this study (to be confirmed).","desc.L4":"Leading triangular equilibrium point (CR3BP, stage 1). Linearly stable \u2014 stage 1 Routh test (\u03BC far below the critical mass ratio of Sicardy 2010; implementation verification against literature).","desc.L5":"Trailing triangular equilibrium point (CR3BP, stage 1). Linearly stable \u2014 stage 1 Routh test (same as L4).","desc.halo_main":"The main orbit of the 3-C halo family \u2014 the reference for station-keeping.","l2.view_jwst":"JWST","l2.layer_jwst":"JWST reconstructed trajectory","l2.layer_jwst_ext":"JWST prediction \u2014 vs JPL no-burn prediction","l2.layer_jwst_phys":"JWST prediction \u2014 vs reconstructed trajectory","l2.legend_jwst":"JWST (gold): dots = received points (daily), dashed = interpolation between them (4-A Hermite), solid = received 10-minute points. Predictions: orange = vs JPL's no-burn prediction (external comparison), green = vs the reconstructed trajectory (physical validation); dark = reference, light = my model","layer.jwst":"JWST reconstructed trajectory","layer.jwst_ext":"Prediction \u2014 vs JPL no-burn prediction (external)","layer.jwst_phys":"Prediction \u2014 vs reconstructed trajectory (physical)","layer.n_jwst":"Prediction error","body.jwst":"JWST","desc.JWST":"James Webb Space Telescope. Gold line = reconstructed as-flown trajectory (Horizons, 4-A data): dots = received points (daily), dashed = interpolation between daily nodes, solid = received 10-minute points. Marker = end of the reconstruction. Below: the two comparisons of the stage 5 prediction \u2014 with different tags.","desc.jwst_period":"Compares the length of one circuit of JWST's reconstructed trajectory with NASA's text and with CR3BP halos of the same size.","jwst.orbit_label":"JWST reconstructed","jwst.layer_ext_short":"vs JPL no-burn prediction","jwst.layer_phys_short":"vs reconstructed trajectory","jwst.layer_ext":"Comparison with JPL's no-burn prediction","jwst.layer_phys":"Comparison with the reconstructed trajectory","jwst.rep_5d":"5 d","jwst.axis_note":"Vertical = position difference (km, log), horizontal = days after start. Dots = values written in results/stage5.json","jwst.period_button":"Open the period card","jwst.period_title":"JWST period \u2014 reconstruction vs NASA and halo","jwst.period_class":"Classification","jwst.no_predictions":"No prediction data","jwst.g_ext":"JWST prediction \u2014 vs JPL no-burn prediction (stage 5)","jwst.g_phys":"JWST prediction \u2014 vs reconstructed trajectory (stage 5)","jwst.g_period":"JWST period (4-A)","l2.view_jwstzoom":"JWST zoom","l2.legend_jwstzoom":"JWST zoom (tens of km around a prediction end): big dots = points at the same time, white segments = the position difference between them (numbers are Python values with tags). Lines connect the stored points straight (hourly; JPL 01U daily). Positions are drawn in pulsating coordinates, so drawn distances differ from real ones by under 1 %","jwst.marker_fixed":"position on {date} (fixed)","jwst.zoom_phys":"Zoom in \u2014 representative 5-day point (three lines)","jwst.zoom_ext":"Zoom in \u2014 window end:","jwst.zoom_focus_R5":"JWST zoom \u2014 vs the reconstructed trajectory, representative 5-day point","jwst.zoom_focus_A":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window A","jwst.zoom_focus_B":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window B","jwst.zoom_focus_C":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window C","jwst.zoom_norecon":"No actual-trajectory data (after 2026-10-05)","jwst.zl_recon":"Reconstructed trajectory (03U)","jwst.zl_mine_kB":"My model (k_B)","jwst.zl_jpl01U":"JPL no-burn prediction (01U)","jwst.zl_jpl":"JPL no-burn prediction","jwst.gap_mine_recon":"my model \u2194 reconstruction","jwst.gap_jpl_recon":"JPL \u2194 reconstruction","jwst.gap_mine_jpl":"my model \u2194 JPL","source.join":"Reconstruction join","l2.view_lab":"Lab","lab.title":"Lab \u2014 escape of initial states near L2","lab.scope":"Results inside the CR3BP model (implementation verification \u2014 not physical validation). All numbers are browser calculations (passed Python match tests)","lab.fold":"Fold","lab.unfold":"Unfold","lab.loading":"Loading lab data\u2026 (first time only, about 17 MB)","lab.examples":"Examples","lab.ex_q10":"Fast escape (10 %)","lab.ex_q50":"Middle (50 %)","lab.ex_q90":"Slow escape (90 %)","lab.ex_out":"Out-of-range demo","lab.ex_noise":"Near the noise floor","lab.ex_src":"Example source: {src} (3-B sample no. {no})","lab.s_sign":"Sign of e_u","lab.s_eu":"|e_u| (unstable)","lab.s_es":"e_s (stable)","lab.s_ap":"In-plane amplitude A_p","lab.s_phip":"In-plane phase","lab.s_az":"Out-of-plane amplitude A_z","lab.s_phiz":"Out-of-plane phase","lab.sign_out":"+ outward","lab.sign_in":"\u2212 Earthward","lab.outside":"Allow out of range (extrapolation \u2014 research preset only)","lab.col_r":"Criterion R","lab.col_truth":"Truth [d]","lab.col_t3":"T3 [d]","lab.col_d24":"D24 [d]","lab.col_mlp":"MLP-C_ln [d]","lab.col_hybrid":"Hybrid [d] \u2014 verdict: rejected","lab.col_dt3":"T3 error \u0394ln t","lab.col_dd24":"D24 error \u0394ln t","lab.col_dmlp":"MLP error \u0394ln t","lab.col_dir":"Direction (e_u*)","lab.col_flag":"Confidence","lab.flag_extrap":"extrapolated","lab.flag_unc":"uncertain","lab.flag_unc_mismatch":"MLP-C_ln and T3 differ by more than 3 \xD7 validation RMSE_log (pre-registration \xA75)","lab.flag_unc_spread":"Spread of the 3 MLP seeds exceeds 3 \xD7 the validation median (pre-registration \xA75)","lab.extrap_long":"Extrapolation \u2014 not trusted (outside the training range)","lab.no_escape":"no escape","lab.dir_hit":"correct","lab.dir_miss":"wrong","lab.waiting":"Release to start the truth integration","lab.integrating":"Integrating the truth (Worker)\u2026","lab.integrating_days":"Integrating the truth \u2014 day {d}","lab.done":"Truth integration done ({ms} ms, {n} trajectory points)","lab.error":"Error: {msg}","lab.hybrid_note":"Hybrid = T3 and D24 joined per R \u2014 all six weights w_R are 0, so it equals D24. Pre-registered verdict (H): rejected (structural); residual-model verdict (R): supported. ","lab.foot":"T3 = linear theory + second-order correction e_u*, D24 = T3 + RF residual (50 trees), MLP-C_ln = neural net, mean of 3 seeds. Truth = DOP853 integration (rtol 1e-12, up to 730.5 days, stops at 0.316\u03B3). \u0394ln t = prediction \u2212 truth.","lab.mobile_note":"Please use the lab on a computer. On a phone screen the sliders and result table are too narrow to place an initial state precisely. (Draft notice \u2014 awaiting user confirmation)","time.go":"Go","time.out_of_range":"Outside the data period (2022-01-01 \u2013 2049-12-31)","time.loading":"Loading ephemeris\u2026","l2.view_solar":"Solar system","body.mercury":"Mercury system","body.venus":"Venus system","body.mars":"Mars system","body.jupiter":"Jupiter system","body.saturn":"Saturn system","body.uranus":"Uranus system","body.neptune":"Neptune system","desc.Mercury":"Mercury (system barycenter \u2014 decision \u246E). Position = interpolated M4 ephemeris (DE441, 12 h step) in pulsating coordinates.","desc.Venus":"Venus system barycenter (decision \u246E). Position = interpolated M4 ephemeris (DE441, 2 d step) in pulsating coordinates.","desc.Mars":"Mars system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 4 d step).","desc.Jupiter":"Jupiter system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 16 d step).","desc.Saturn":"Saturn system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","desc.Uranus":"Uranus system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","desc.Neptune":"Neptune system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","view.true_size":"True size","view.true_size_title":"Turn off size exaggeration (bodies enlarged when small on screen \u2014 display approximation)","layer.planets":"Planet systems","layer.stars":"Stars","layer.milkyway":"Milky Way","layer.clouds":"Clouds (display only \u2014 not that day)","layer.nightlights":"Earth night lights","layer.sunglow":"Sun glow","sky.credits_stars":"Stars: HYG v4.4 (David Nash, CC BY-SA 4.0)","sky.credits_mw":"Milky Way: ESA/Gaia/DPAC (CC BY-SA 3.0 IGO)","sky.credits_moon":"Moon: NASA SVS (public domain)","sky.credits_horizons":"Orbits: JPL Horizons","sky.credits_earth":"Earth surface: NASA Earth Observatory (Blue Marble, Black Marble)","credits.short":"Sources","credits.images":"Image and data sources","credits.open":"Show image and data sources (source panel)","credits.nasa_rule":"NASA credit rules (verbatim):","nav.label":"Navigation","nav.targets":"Targets (T)","nav.targets_panel":"Targets","nav.targets_close":"Close targets","nav.search_ph":"Find by name","tr.label":"Global","tr.search":"Search","tr.search_title":"Search ( / )","tr.settings":"Settings","mode.label":"Display mode","mode.general":"General","mode.expert":"Expert","layer.view_options":"View options","settings.lang":"Language","settings.legend":"How to read the screen","settings.keys":"Shortcuts","settings.about":"About","tgt.g_tour":"Tour","tgt.g_views":"Views","tgt.g_points":"Lagrange points","tgt.g_orbits":"Orbits \xB7 spacecraft","tgt.g_bodies":"Bodies","tgt.g_tools":"Tools","tgt.tour":"Guided tour","kind.point":"Lagrange point","kind.orbit":"Orbit","kind.craft":"Space telescope","kind.period":"Orbit-period comparison","kind.star":"Star","kind.planet":"Planet","kind.moon":"Moon","kind.bary":"Barycenter","kind.system":"Planetary-system barycenter","kind.view":"View","kind.zoom":"Close-up","kind.numbers":"Number list","desc.v_all":"Wide Sun-centred view \u2014 Earth's orbit fills the screen. Scroll out to see the whole solar system.","desc.v_emb":"Around the Earth\u2013Moon barycenter \u2014 Earth, Moon, L1 and L2 on one screen (for explaining the study).","desc.v_l2zoom":"L2 seen from a few hundred km away.","info.label":"Info panel","info.close":"Close info panel","info.more":"More","info.expert_hint":"All numbers and sources are in Expert mode","info.focus_only":"Focus only","info.fly":"Fly to","jwst.zoom_title":"Close-up","jwst.zoom_r5":"5-day point","jwst.zoom_window":"Window {w} end","time.group":"Time","time.slider":"Time","time.speed_menu":"Playback speed","time.speed_title":"Playback speed (press to choose)","time.local":"Local","time.date_aria":"Displayed time {utc} UTC (local {local}, {zone}) \u2014 press to pick a date","time.now_title":"Go to the device's current time (to the minute)","time.now_out":"Unavailable: the device's current time is outside the data period","time.date_pop":"Go to a date","time.date_utc_note":"Moves to 00:00 UTC of the chosen date","time.date_input":"Date","credits.long":"Sources \xB7 licences","hint.label":"Welcome","hint.lead":"L2 \u2014 the balance point beyond Earth, opposite the Sun, where JWST stays","hint.how":"Drag to rotate \xB7 scroll to zoom","hint.tour":"Tour","hint.close":"Close","tag.open_hint":"press to see the source","tag.pop_label":"Tag and source","tag.pop_source":"Source","tag.pop_open":"Open source window","numg.L1_dist":"Distance from the Earth\u2013Moon center of mass","numg.L2_dist":"Distance from the Earth\u2013Moon center of mass","numg.L3_dist":"Distance from the Earth\u2013Moon center of mass","numg.L4_dist":"Distance from the Earth\u2013Moon center of mass","numg.L5_dist":"Distance from the Earth\u2013Moon center of mass","numg.annual_3A":"Station-keeping \u0394v per year \u2014 staying at the L2 point (simple model)","numg.annual_3C":"Station-keeping \u0394v per year \u2014 halo orbit (simple model)","numg.annual_4C":"Station-keeping \u0394v per year \u2014 halo orbit (real Sun, Moon and planet positions)","numg.halo_period":"Time for one loop","numg.halo_zmax":"Greatest height from the ecliptic","numg.unstable_deg":"Direction of fastest drift","numg.stable_deg":"Direction of return","numg.shift_max":"Shift of the reference orbit when sunlight pressure is added (max)","numg.shift_mean":"Shift of the reference orbit when sunlight pressure is added (mean)","numg.wrong_ref_4C":"Times more \u0394v with the wrong reference \u2014 simple-model halo as reference","numg.wrong_ref_4D":"Times more \u0394v with the wrong reference \u2014 reference without sunlight pressure","numg.jwst_err_range":"Position difference after about 4 weeks \u2014 this study's prediction vs NASA JPL's (4 comparisons)","numg.jwst_err_R5":"Position difference from the actual path after 5 days \u2014 this study's model","numg.jwst_err_R5_jpl":"Position difference from the actual path after 5 days \u2014 NASA JPL prediction","numg.jwst_period_nasa":"One loop (NASA)","numg.jwst_period_recon":"One loop measured on the actual flight path (this study's calculation)","numg.jwst_period_halo":"One loop of a same-size halo orbit (simple model)","tgtg.view-emb":"Around Earth and Moon","tgtg.view-l2zoom":"Close to L2","tgtg.halo_main":"Halo orbit","tgtg.jwst_period":"JWST orbit comparison","lblg.body.emb":"Earth\u2013Moon center of mass","lblg.l2.unstable":"drift","lblg.l2.stable":"return","lblg.l2.halo_main":"Halo orbit","lblg.jwst.orbit_label":"JWST actual path","lblg.jwst.layer_ext_short":"vs NASA JPL prediction","lblg.jwst.layer_phys_short":"vs actual path","lblg.jwst.zl_recon":"Actual path","lblg.jwst.zl_mine_kB":"This study's model","lblg.jwst.zl_jpl01U":"NASA JPL prediction","lblg.jwst.zl_jpl":"NASA JPL prediction","lblg.jwst.gap_mine_recon":"this study's model \u2194 actual path","lblg.jwst.gap_jpl_recon":"NASA JPL \u2194 actual path","lblg.jwst.gap_mine_jpl":"this study's model \u2194 NASA JPL","tag.easy_impl":"Checked that the code solves the intended equations","tag.easy_external":"Compared with another institution's calculation or data","tag.easy_physical":"Compared with the actual flight path","tag.easy_more":"File path and detailed class are in the source window","hint.how_touch":"Drag to rotate \xB7 pinch to zoom","info.tabs":"Info panel tabs","info.tab_summary":"Summary","info.tab_all":"All numbers","info.tab_source":"Sources","info.src_none":"No numbers for this object","info.src_open":"Source window","info.export_this":"Export this object","status.label":"Status","status.tdb":"TDB","status.focus":"Focus distance","status.focus_title":"Camera-to-focus distance \u2014 drawing state (display approximation, no verification tag)","status.more":"Status","status.more_title":"Show TDB \xB7 frame \xB7 focus distance","sheet.expand":"Expand panel \u2014 drag to resize, drag down to close","sheet.collapse":"Shrink panel \u2014 drag to resize, drag down to close","time.speed_unit":"d/s","time.speed_group":"Playback speed","export.button":"Export \xB7 share","export.title":"Export \xB7 share link","export.csv":"Save numbers as CSV","export.json":"Save numbers as JSON","export.note":"File save and clipboard only \u2014 nothing is sent anywhere. Numbers are the Python result text with source and tag","export.share":"Share link","export.copy":"Copy link","export.copied":"Copied","export.copy_fail":"Could not copy \u2014 select the link manually","export.share_note":"A state opened from a link is temporary (saved settings stay)","export.shared_on":"Applied the shared link's state temporarily","layer.mode_default":"Reset to this mode's default","key.m_general":"General mode","key.m_expert":"Expert mode","key.export":"Export (expert)","tour.label":"Tour","tour.step":"{i} of {n}","tour.step_aria":"Stop {i} of {n}","tour.prev":"Back","tour.next":"Next","tour.finish":"Finish","tour.end":"End the tour","tour.paused":"Paused because you moved the scene.","tour.resume":"Continue","tour.keys":"\u2190 \u2192 to move \xB7 Esc to end","tour.solar_title":"The solar system","tour.solar_text":"The Sun and the eight planets. The star of this page, L2, is a point just beyond Earth on the side away from the Sun. Let's move in toward Earth.","tour.emb_title":"Around Earth and Moon \u2014 L1 and L2","tour.emb_text":"Treating Earth and Moon as one body, L1 lies toward the Sun and L2 on the far side. At these two points the pulls of the Sun and of Earth\u2013Moon match the turning motion. L2 is {n0} from Earth\u2013Moon.","tour.l2_title":"L2 \u2014 why it is unstable","tour.l2_text":"L2 is like the middle of a saddle. Pushed one way, you come back; pushed the other way even slightly, you drift off faster and faster. The red line is the direction of fastest drift and the green line the direction of return. The orange and teal curves are computed paths that start near L2 and drift away, outward (away from the Sun) and toward Earth.","tour.halo_title":"Halo orbit","tour.halo_text":"So a spacecraft does not sit on L2; it loops around it on a large halo orbit. This one takes {n0} per loop and rises up to {n1} from the ecliptic.","tour.jwst_title":"JWST actual path","tour.jwst_text":"The James Webb Space Telescope (JWST) really does circle L2. The line is its actual flight path published by NASA JPL. By this study's calculation from this path, one loop takes {n0} (this differs from the value NASA gives; the reason has not been found yet).","tour.dv_title":"Keeping the orbit (\u0394v)","tour.dv_text":"Because L2 is unstable, small burns now and then put the orbit back on track. The marks show where burns happen in the calculation. In this study's calculation with real planet positions, the total speed change per year is about {n0}.","tour.expert_title":"Want more? Expert mode","tour.expert_text":"The small dot next to a number tells how that value was checked (tap it to see). Source files, methods and every number are in expert mode: top right [Expert], or key 2.","tour.expert_text_touch":"The small dot next to a number tells how that value was checked (tap it to see). Source files, methods and every number are in expert mode: [Expert] at the top.","preset.touring":"touring","help.note_c":"Layer keys (L\xB7O\xB7N\xB7B\xB7G) do not bring back the hidden bars. What you turn on is remembered in this browser.","help.keys_line_c":"L labels \xB7 O orbits \xB7 N numbers \xB7 ? all keys","keyc.labels":"Show or hide labels","keyc.g_orbits":"Show or hide orbit lines","keyc.g_numbers":"Show or hide numbers","keyc.g_bodies":"Show or hide bodies and points","keyc.grid":"Show or hide the floor grid","keyc.m_general":"General mode","keyc.m_expert":"Expert mode","keyc.export":"Export numbers (expert mode)","keyc.search":"Search","keyc.targets":"Open or close the list","keyc.help":"Open or close this table","keyc.esc":"Close the top open item (if none, tidy the screen)","keyc.tour":"Back / next in the tour"};var ar={ko:hp,en:fp},pp="lagrange.lang",Hi="en",mp=[];function gp(n,e){return e==="ko"||e==="en"?e:typeof n=="string"&&n.toLowerCase().startsWith("ko")?"ko":"en"}function l_(){try{return localStorage.getItem(pp)}catch{return null}}function Pd(){return Hi=gp(typeof navigator<"u"?navigator.language:"",l_()),document.documentElement.lang=Hi,Hi}function Fn(){return Hi}function uo(n,e=!0){if(Hi=n,document.documentElement.lang=n,e)try{localStorage.setItem(pp,n)}catch{}St();for(let t of mp)t(n)}function Or(n){mp.push(n)}function ho(n){return ar[Hi][n]!==void 0}function xe(n,e={}){let t=ar[Hi][n];if(t===void 0)throw new Error(`\uC0AC\uC804\uC5D0 \uC5C6\uB294 \uD0A4: ${n} (${Hi})`);return t.replace(/\{(\w+)\}/g,(i,s)=>String(e[s]))}function Rt(n){return n&&typeof n=="object"?n[Hi]??n.ko??"":String(n??"")}var _p=!1;function Ld(n){_p=!!n,St()}var c_=n=>{let e=n.dataset.i18n;return _p&&ar[Hi]["lblg."+e]!==void 0&&n.closest("#labels")?xe("lblg."+e):xe(e)};function St(n=document){for(let e of n.querySelectorAll("[data-i18n]"))e.textContent=c_(e);for(let e of n.querySelectorAll("[data-i18n-title]"))e.title=xe(e.dataset.i18nTitle);for(let e of n.querySelectorAll("[data-i18n-aria]"))e.setAttribute("aria-label",xe(e.dataset.i18nAria))}var Nl=new Set,xp=()=>!0;function u_(n){return/^jwst_err_/.test(n)?"n_jwst":/_dist$|zmax|^shift_|^holdout_|_km$/.test(n)?"n_distance":/period/.test(n)?"n_period":/_deg$/.test(n)?"n_angle":/^annual_|^wrong_ref_|^dv_ratio/.test(n)?"n_annual":/^t316_/.test(n)?"n_escape":"n_other"}function Ps(n,e,t){return n.dataset.cat=u_(e),n.dataset.ctx=t,Nl.add(n),n}function Fr(n){Nl.delete(n)}function yp(n){xp=n}function d_(n,e){e?n._ph&&n._ph.parentNode&&n._ph.replaceWith(n):n.parentNode&&(n._ph||(n._ph=document.createComment("num-off")),n.replaceWith(n._ph))}function as(){for(let n of Nl)d_(n,xp(n.dataset.cat,n.dataset.ctx))}function vp(){let n={};for(let e of Nl){let t=`${e.dataset.ctx}:${e.dataset.cat}`;n[t]=n[t]||{on:0,off:0},e.parentNode&&!(e._ph&&e._ph.parentNode)?n[t].on++:n[t].off++}return n}var bp=["","\u2460","\u2461","\u2462","\u2463","\u2464","\u2465","\u2466"];function _i(n){return n.source.map(e=>`${e.file}>${e.key}`).join(" | ")}function si(n,e){let t=document.createElement("span");t.className=`tag tag-${n.tag}`,t.tabIndex=0,t.dataset.tag=n.tag,t.dataset.detail=n.detail;let i=document.createElement("span");i.className="tag-name";let s=document.createElement("span");s.className="tag-tip",s.setAttribute("role","tooltip");let r=()=>{let a=e.details[n.detail];i.textContent=Rt(e.tags[n.tag])+(n.weak!==void 0?` (${xe("tag.weak")})`:""),s.textContent=`${bp[a.no]} ${Rt(a)}`+(n.weak?` \u2014 ${Rt(n.weak)}`:"")};return r(),t.append(i,s),t._render=r,t}function xi(n,e){let t=document.createElement("span");t.className=`tag mini tag-${n.tag}`,t.tabIndex=0,t.dataset.tag=n.tag,t.dataset.detail=n.detail;let i=document.createElement("span");i.className="tag-name";let s=document.createElement("span");return s.className="tag-tip",s.setAttribute("role","tooltip"),t._render=()=>{let r=e.details[n.detail];i.textContent=xe("tag.short_"+n.tag),s.textContent=`${Rt(e.tags[n.tag])} \u2014 ${bp[r.no]} ${Rt(r)}`},t._render(),t.append(i,s),t}function Xn(){let n=document.createElement("span");return n.className="tag tag-approx",n.dataset.i18n="tag.display_approx",n.textContent=xe("tag.display_approx"),n}function yi(n,e,t){let i=document.createElement("div");i.className="num-row";let s=document.createElement("div");s.className="num-label";let r=document.createElement("button");r.type="button",r.className="num",r.dataset.source=_i(n.provenance),r.dataset.verification=`${n.provenance.verification.tag}/${n.provenance.verification.detail}`,r.dataset.id=n.id,r.addEventListener("click",()=>t(n)),i.dataset.source=r.dataset.source,i.dataset.verification=r.dataset.verification;let a=si(n.provenance.verification,e),o=()=>{let l=n.unit&&typeof n.unit=="object"?Rt(n.unit):n.unit;r.textContent=n.text+(l?l==="\xB0"||l==="\xD7"?l:` ${l}`:""),s.textContent=Rt(n.label),a._render()};return o(),i.append(s,r,a),i._render=o,i._item=n,Ps(i,n.id,"row"),i}var In=null,fo=null,Nd=null,Mp=()=>"",Ul=null;function wp(n){Ul=n||null}function h_(){let n=document.createElement("span");n.className="join-line",n.append(document.createTextNode(Rt(Ul.text)+" "));for(let e of Ul.items){let t=document.createElement("span");t.className="join-num",t.dataset.source=e.provenance.source.map(r=>`${r.file}>${r.key}`).join(" | "),t.dataset.verification=`${e.provenance.verification.tag}/${e.provenance.verification.detail}`;let i=document.createElement("span");i.dataset.meta="",i.textContent=Rt(e.label)+" ";let s=document.createElement("b");s.textContent=`${e.text} ${e.unit}`,s.title=Rt(e.note),t.append(i,s,document.createTextNode(" "),xi(e.provenance.verification,Nd)),n.append(t)}return n}function Bn(n,e){let t=document.createElement("tr"),i=document.createElement("th");i.textContent=xe(n);let s=document.createElement("td");return s.append(e),t.append(i,s),t}function os(n){let e=document.createElement("code");return e.dataset.literal="",e.textContent=n,e}function Ep(){if(!fo)return;let n=fo,e=n.provenance;In.dataset.source=e.source.map(r=>`${r.file}>${r.key}`).join(" | "),In.dataset.verification=`${e.verification.tag}/${e.verification.detail}`,In.querySelector("h2").textContent=`${xe("source.title")} \u2014 ${Rt(n.label)}`;let t=In.querySelector("tbody");t.replaceChildren(),t.append(Bn("source.value",os(String(n.value)))),t.append(Bn("source.unit",document.createTextNode(n.unit||"-")));for(let r of e.source)t.append(Bn("source.file",os(r.file))),t.append(Bn("source.key",os(r.key)));if(t.append(Bn("source.commit",os(e.computed_by))),e.source_hash){let r=os(e.source_hash.slice(0,12));r.title=e.source_hash,t.append(Bn("source.source_hash",r))}e.ref_commit&&t.append(Bn("source.ref_commit",os(e.ref_commit))),t.append(Bn("source.stage",os(e.stage)));let i=document.createElement("span");i.append(os(e.model)),e.model_ko&&e.model_ko!=="-"&&i.append(document.createTextNode(Rt({ko:` \u2014 ${e.model_ko}`,en:""}))),t.append(Bn("source.model",i));let s=si(e.verification,Nd);s.classList.add("tag-open"),t.append(Bn("source.verification",s)),t.append(Bn("source.build",os(Mp()))),n.browser_calc&&t.append(Bn("source.browser",document.createTextNode(xe("source.browser_calc",{tol:n.browser_calc.tolerance})))),t.append(Bn("source.note",document.createTextNode(Rt(n.note)))),Ul&&/^jwst_/.test(n.id||"")&&t.append(Bn("source.join",h_())),In.querySelector(".close").textContent=xe("source.close")}function Tp(n,e){Nd=n,e&&(Mp=e),In=document.getElementById("source"),In.querySelector(".close").addEventListener("click",kl),document.addEventListener("keydown",t=>{t.key==="Escape"&&kl()})}function Ol(n){fo=n,po=null,Ep(),In.hidden=!1}function kl(){fo=null,po=null,In.hidden=!0}function Ap(){po?mo(po):Ep()}var po=null;function mo(n){po=n,fo=null,delete In.dataset.source,delete In.dataset.verification,In.querySelector("h2").textContent=`${xe("source.title")} \u2014 ${xe("credits.images")}`;let e=In.querySelector("tbody");e.replaceChildren(Sp("tr",Sp("td",n()))),e.firstChild.firstChild.colSpan=2,In.querySelector(".close").textContent=xe("source.close"),In.hidden=!1}var Sp=(n,...e)=>{let t=document.createElement(n);return t.append(...e),t};var f_=[{what:{ko:"\uC9C0\uAD6C \uB0AE \uD45C\uBA74",en:"Earth day surface"},credit:{ko:"NASA Earth Observatory \u2014 Blue Marble Next Generation (2004\uB144 7\uC6D4 \uC601\uC0C1)",en:"NASA Earth Observatory \u2014 Blue Marble Next Generation (July 2004 imagery)"},approx:{ko:"\uD55C \uB2EC (2004\uB144 7\uC6D4) \uC601\uC0C1 \uACE0\uC815 \u2014 \uACC4\uC808 \uB208\xB7\uC2DD\uC0DD\uC740 \uB0A0\uC9DC\uC640 \uB2E4\uB984",en:"one month (July 2004) fixed \u2014 seasonal snow and vegetation do not follow the date"},license:{ko:"NASA \uC790\uB8CC \u2014 \uBBF8\uAD6D \uC800\uC791\uAD8C \uB300\uC0C1 \uC544\uB2D8. \uD45C\uAE30 \uC758\uBB34\uB294 NASA (Earth Observatory \uC9C0\uCE68)",en:"NASA material \u2014 not subject to US copyright. Mandatory credit: NASA (Earth Observatory policy)"},url:"https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-map"},{what:{ko:"\uC9C0\uAD6C \uBC24 \uBD88\uBE5B",en:"Earth night lights"},credit:{ko:"NASA Earth Observatory \u2014 Black Marble 2016 (Suomi NPP VIIRS)",en:"NASA Earth Observatory \u2014 Black Marble 2016 (Suomi NPP VIIRS)"},approx:{ko:"\uBD88\uBE5B \uBC1D\uAE30 \uACE1\uC120\xB7\uB0AE\uBC24 \uACBD\uACC4 \uC11E\uAE30\uB294 \uD45C\uC2DC\uC6A9",en:"light curve and day\u2013night blending are for display"},license:{ko:"NASA \uC790\uB8CC \u2014 \uBBF8\uAD6D \uC800\uC791\uAD8C \uB300\uC0C1 \uC544\uB2D8. \uD45C\uAE30 \uC758\uBB34\uB294 NASA (Earth Observatory \uC9C0\uCE68)",en:"NASA material \u2014 not subject to US copyright. Mandatory credit: NASA (Earth Observatory policy)"},url:"https://science.nasa.gov/earth/earth-observatory/earth-at-night/maps"},{what:{ko:"\uC9C0\uAD6C \uAD6C\uB984 \uCE35",en:"Earth cloud layer"},credit:{ko:"Solar System Scope (8K \uAD6C\uB984 \uADF8\uB9BC, NASA \uC790\uB8CC \uAE30\uBC18)",en:"Solar System Scope (8K clouds, based on NASA imagery)"},approx:{ko:"\uD45C\uC2DC\uC6A9 \u2014 \uADF8\uB0A0\uC758 \uAD6C\uB984\uC774 \uC544\uB2D8. \uC9C0\uAD6C\uC640 \uD568\uAED8 \uC790\uC804\uD558\uB294 \uACE0\uC815\uB41C \uADF8\uB9BC",en:"display only \u2014 not the clouds of that day; a fixed map rotating with Earth"},license:{ko:"CC BY 4.0",en:"CC BY 4.0"},url:"https://www.solarsystemscope.com/textures/"},{what:{ko:"\uBC14\uB2E4 \uBC18\uC0AC\uC758 \uC721\uC9C0\xB7\uBC14\uB2E4 \uACBD\uACC4",en:"Land\u2013ocean mask for sun glint"},credit:{ko:"Natural Earth (10m \uC721\uC9C0\xB7\uD638\uC218 \uC724\uACFD\uC744 \uCE78\uB9C8\uB2E4 \uBA74\uC801 \uBE44\uC728\uB85C \uBCC0\uD658)",en:"Natural Earth (10m land and lakes, rasterised as area fraction)"},approx:{ko:"\uBC18\uC0AC \uC138\uAE30\xB7\uBC88\uC9D0\uC740 \uD45C\uC2DC\uC6A9 (\uBE14\uB9B0-\uD401 \uADFC\uC0AC). \uC724\uACFD\uC774 Blue Marble \uD574\uC548\uACFC \uC218 km \uC5B4\uAE0B\uB0A0 \uC218 \uC788\uC74C",en:"glint strength and width are for display (Blinn-Phong); outlines may differ from Blue Marble coasts by a few km"},license:{ko:"\uACF5\uACF5 \uC601\uC5ED",en:"Public domain"},url:"https://www.naturalearthdata.com/about/terms-of-use/"},{what:{ko:"\uB2EC \uD45C\uBA74",en:"Moon surface"},credit:{ko:"NASA's Scientific Visualization Studio \u2014 CGI Moon Kit (LRO LROC \uC0C9 \uBAA8\uC790\uC774\uD06C)",en:"NASA's Scientific Visualization Studio \u2014 CGI Moon Kit (LRO LROC color mosaic)"},license:{ko:"\uACF5\uACF5 \uC601\uC5ED (NASA SVS)",en:"Public domain (NASA SVS)"},url:"https://svs.gsfc.nasa.gov/4720/"},{what:{ko:"\uD654\uC131 \uD45C\uBA74",en:"Mars surface"},credit:{ko:"NASA / USGS Astrogeology \u2014 Viking MDIM 2.1 \uC0C9 \uC804\uAD6C \uBAA8\uC790\uC774\uD06C (1 km \uD310)",en:"NASA / USGS Astrogeology \u2014 Viking MDIM 2.1 colorized global mosaic (1 km product)"},license:{ko:"\uACF5\uACF5 \uC601\uC5ED (USGS \uBAA9\uB85D)",en:"Public domain (USGS catalog)"},url:"https://astrogeology.usgs.gov/search/map/mars_viking_colorized_global_mosaic_232m"},{what:{ko:"\uBAA9\uC131 \uD45C\uBA74",en:"Jupiter surface"},credit:{ko:"NASA/JPL/Space Science Institute \u2014 Cassini \uBAA9\uC131 \uC9C0\uB3C4 (PIA07782, 2000\uB144 12\uC6D4 \uCD2C\uC601)",en:"NASA/JPL/Space Science Institute \u2014 Cassini map of Jupiter (PIA07782, taken December 2000)"},approx:{ko:"2000\uB144 12\uC6D4\uC758 \uAD6C\uB984 \uBB34\uB2AC \uACE0\uC815 \u2014 \uBB34\uB2AC\uB294 \uC2E4\uC81C\uB85C \uC6C0\uC9C1\uC784 (\uB300\uC801\uC810 \uC704\uCE58 \uD3EC\uD568)",en:"cloud pattern fixed at December 2000 \u2014 real features move, including the Great Red Spot"},license:{ko:"NASA/JPL \uC774\uBBF8\uC9C0 (JPL Image Use Policy)",en:"NASA/JPL image (JPL Image Use Policy)"},url:"https://science.nasa.gov/photojournal/cassinis-best-maps-of-jupiter-cylindrical-map"},{what:{ko:"\uC218\uC131\xB7\uAE08\uC131\xB7\uD1A0\uC131\xB7\uCC9C\uC655\uC131\xB7\uD574\uC655\uC131 \uD45C\uBA74, \uD1A0\uC131 \uACE0\uB9AC",en:"Mercury, Venus, Saturn, Uranus, Neptune surfaces, Saturn rings"},credit:{ko:"Solar System Scope (NASA \uACE0\uB3C4\xB7\uC601\uC0C1 \uC790\uB8CC \uAE30\uBC18)",en:"Solar System Scope (based on NASA elevation and imagery data)"},approx:{ko:"\uAE08\uC131\uC740 \uAD6C\uB984 \uADF8\uB9BC\uC73C\uB85C \uD2B9\uC815 \uC2DC\uAC01\uC758 \uAD00\uCE21\uC774 \uC544\uB2D8. \uAD6C\uB984\xB7\uB300\uAE30 \uBB34\uB2AC\uB294 \uACE0\uC815",en:"Venus is a cloud texture, not an observation at a given time. Cloud and atmosphere patterns are fixed"},license:{ko:"CC BY 4.0 (\uC904\uC774\uACE0 \uD615\uC2DD\uC744 \uBC14\uAFC8)",en:"CC BY 4.0 (resized and re-encoded)"},url:"https://www.solarsystemscope.com/textures/"},{what:{ko:"\uD589\uC131 \uC790\uC804\uCD95\xB7\uC790\uC804\uAC01",en:"Planet rotation axes and angles"},credit:{ko:"IAU WGCCRE 2015 \uBCF4\uACE0\uC11C (Archinal \uC678 2018) \u2014 NAIF pck00011.tpc",en:"IAU WGCCRE 2015 report (Archinal et al. 2018) \u2014 NAIF pck00011.tpc"},license:{ko:"NAIF \uACF5\uAC1C \uC790\uB8CC",en:"NAIF public data"},url:"https://naif.jpl.nasa.gov/pub/naif/generic_kernels/pck/pck00011.tpc"},{what:{ko:"\uC740\uD558\uC218",en:"Milky Way"},credit:{ko:"ESA/Gaia/DPAC \u2014 Gaia DR2 sky in colour. \uAC10\uC0AC: Gaia DPAC; A. Moitinho / A. F. Silva / M. Barros / C. Barata (University of Lisbon); H. Savietto (Fork Research)",en:"ESA/Gaia/DPAC \u2014 Gaia DR2 sky in colour. Acknowledgement: Gaia DPAC; A. Moitinho / A. F. Silva / M. Barros / C. Barata (University of Lisbon); H. Savietto (Fork Research)"},approx:{ko:"\uBC1D\uAE30 \uBC30\uC728\uC740 \uD45C\uC2DC\uC6A9",en:"brightness gain is for display"},license:{ko:"CC BY-SA 3.0 IGO (\uC904\uC778 \uADF8\uB9BC\uB3C4 \uAC19\uC740 \uC870\uAC74)",en:"CC BY-SA 3.0 IGO (resized copies under the same terms)"},url:"https://sci.esa.int/web/gaia/-/60196-gaia-s-sky-in-colour-equirectangular-projection"},{what:{ko:"\uBCC4",en:"Stars"},credit:{ko:"HYG Database v4.4 \u2014 David Nash (astronexus)",en:"HYG Database v4.4 \u2014 David Nash (astronexus)"},approx:{ko:"\uBCC4 \uD06C\uAE30\xB7\uC0C9\uC740 \uD45C\uC2DC\uC6A9",en:"star size and color are for display"},license:{ko:"CC BY-SA 4.0 (\uACE0\uB978 \uBCC4 \uD30C\uC77C\uB3C4 \uAC19\uC740 \uC870\uAC74)",en:"CC BY-SA 4.0 (derived star file under the same terms)"},url:"https://codeberg.org/astronexus/hyg"},{what:{ko:"\uCC9C\uCCB4 \uC704\uCE58\xB7JWST \uADA4\uC801",en:"Body positions and JWST trajectory"},credit:{ko:"NASA/JPL Horizons System (\uCC9C\uCCB4\uB825 DE441, JWST \uC7AC\uAD6C\uC131\xB7\uBB34\uBD84\uC0AC \uC608\uCE21 \uADA4\uC801)",en:"NASA/JPL Horizons System (DE441 ephemeris, JWST reconstructed and no-burn predicted trajectories)"},license:{ko:"\uBBF8\uB9AC \uBC1B\uC544 \uB454 \uC790\uB8CC \u2014 \uC2E4\uD589 \uC911 Horizons \uB97C \uBD80\uB974\uC9C0 \uC54A\uC74C. \uCD9C\uCC98 \uD45C\uAE30",en:"Retrieved in advance \u2014 Horizons is not called at run time. Credit given"},url:"https://ssd.jpl.nasa.gov/horizons/"},{what:{ko:"\uD589\uC131 \uACF5\uC804 \uADA4\uB3C4\uC120",en:"Planet orbit lines"},credit:{ko:"NASA/JPL Horizons (DE441) \uC0C1\uD0DC \uBCA1\uD130\uB85C \uADF8 \uC2DC\uAC01\uC758 \uC811\uCD09 \uD0C0\uC6D0\uC744 \uADF8\uB9BC. \uD654\uBA74 \uCD95\uC18C \uBC94\uC704 \uACC4\uC0B0\uC5D0 JPL Solar System Dynamics \uC758 \uADFC\uC0AC \uADA4\uB3C4 \uC694\uC18C (E. M. Standish)",en:"Osculating ellipse drawn from NASA/JPL Horizons (DE441) state vectors at the displayed time. Zoom range uses JPL Solar System Dynamics approximate orbital elements (E. M. Standish)"},approx:{ko:"\uADF8 \uC21C\uAC04\uC758 \uADA4\uB3C4 \uBAA8\uC591 \u2014 \uBA3C \uBBF8\uB798\uC758 \uC704\uCE58\uC640\uB294 \uC870\uAE08 \uB2E4\uB97C \uC218 \uC788\uC74C. \uCC9C\uCCB4 \uC704\uCE58 \uACC4\uC0B0\uC5D0 \uC4F0\uC9C0 \uC54A\uC74C",en:"the orbit shape at that moment \u2014 may differ slightly from positions far in the future. Not used to compute positions"},license:{ko:"\uADA4\uB3C4 \uC694\uC18C \uC218\uCE58 \u2014 \uCD9C\uCC98 \uD45C\uAE30",en:"Numerical orbital elements \u2014 credit given"},url:"https://ssd.jpl.nasa.gov/planets/approx_pos.html"}],p_=[{text:"NASA should be acknowledged as the source of the material.",url:"https://www.nasa.gov/nasa-brand-center/images-and-media/"},{text:"We ask that NASA's Earth Observatory be given credit for its original materials; the only mandatory credit is NASA.",url:"https://earthobservatory.nasa.gov/ImageUse"}],ri=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))i.setAttribute(s,r);return i.append(...t),i},Cp=n=>ri("code",{"data-literal":""},n);function Fl(n){let e=ri("div",{class:"image-credits","data-meta":""}),t=ri("tbody");for(let s of f_){let r=ri("td",{},Rt(s.credit),ri("br"),Rt(s.license),ri("br"),Cp(s.url));s.approx&&r.append(ri("br"),n(),document.createTextNode(" "+Rt(s.approx))),t.append(ri("tr",{},ri("th",{},Rt(s.what)),r))}e.append(ri("table",{class:"src"},t));let i=ri("p",{class:"note"},xe("credits.nasa_rule")+" ");for(let s of p_)i.append(ri("q",{},s.text),document.createTextNode(" "),Cp(s.url),document.createTextNode(" "));return e.append(i),e}var sm=0,dh=1,rm=2;var Yo=1,am=2,xa=3,Gs=0,xn=1,li=2,$i=0,ya=1,Yi=2,hh=3,fh=4,om=5;var mr=100,lm=101,cm=102,um=103,dm=104,hm=200,fm=201,pm=202,mm=203,ph=204,mh=205,gm=206,_m=207,xm=208,ym=209,vm=210,bm=211,Sm=212,Mm=213,wm=214,hc=0,fc=1,pc=2,ra=3,mc=4,gc=5,_c=6,xc=7,Vc=0,Em=1,Tm=2,Ci=0,gh=1,_h=2,xh=3,yh=4,vh=5,bh=6,Sh=7;var Mh=300,Ws=301,gr=302,Hc=303,Gc=304,Jo=306,ks=1e3,zn=1001,yc=1002,sn=1003,Am=1004;var Ko=1005;var Dt=1006,Wc=1007;var Kn=1008;var rn=1009,wh=1010,Eh=1011,va=1012,jc=1013,Ri=1014,Pi=1015,Li=1016,Xc=1017,qc=1018,ba=1020,Th=35902,Ah=35899,Ch=1021,Rh=1022,_n=1023,Wi=1026,js=1027,_r=1028,$c=1029,Xs=1030,Yc=1031;var Jc=1033,Zo=33776,Qo=33777,el=33778,tl=33779,Kc=35840,Zc=35841,Qc=35842,eu=35843,tu=36196,nu=37492,iu=37496,su=37488,ru=37489,nl=37490,au=37491,ou=37808,lu=37809,cu=37810,uu=37811,du=37812,hu=37813,fu=37814,pu=37815,mu=37816,gu=37817,_u=37818,xu=37819,yu=37820,vu=37821,bu=36492,Su=36494,Mu=36495,wu=36283,Eu=36284,il=36285,Tu=36286;var Eo=2300,vc=2301,uc=2302,ih=2303,sh=2400,rh=2401,ah=2402;var Cm=3200;var Au=0,Rm=1,ci="",Ht="srgb",To="srgb-linear",Ao="linear",Pt="srgb";var dc=7680;var Pm=519,Lm=512,Im=513,Nm=514,Cu=515,Dm=516,Um=517,Ru=518,km=519,Ph=35044;var Lh="300 es",Ei=2e3,aa=2001;function m_(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function g_(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function Co(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Om(){let n=Co("canvas");return n.style.display="block",n}var Rp={},oa=null;function Ro(...n){let e="THREE."+n.shift();oa?oa("log",e,...n):console.log(e,...n)}function Fm(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function ct(...n){n=Fm(n);let e="THREE."+n.shift();if(oa)oa("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function ut(...n){n=Fm(n);let e="THREE."+n.shift();if(oa)oa("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function hr(...n){let e=n.join(" ");e in Rp||(Rp[e]=!0,ct(...n))}function Bm(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var zm={[hc]:fc,[pc]:_c,[mc]:xc,[ra]:gc,[fc]:hc,[_c]:pc,[xc]:mc,[gc]:ra},ji=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},Mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Pp=1234567,Mo=Math.PI/180,la=180/Math.PI;function ps(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(Mn[n&255]+Mn[n>>8&255]+Mn[n>>16&255]+Mn[n>>24&255]+"-"+Mn[e&255]+Mn[e>>8&255]+"-"+Mn[e>>16&15|64]+Mn[e>>24&255]+"-"+Mn[t&63|128]+Mn[t>>8&255]+"-"+Mn[t>>16&255]+Mn[t>>24&255]+Mn[i&255]+Mn[i>>8&255]+Mn[i>>16&255]+Mn[i>>24&255]).toLowerCase()}function pt(n,e,t){return Math.max(e,Math.min(t,n))}function Ih(n,e){return(n%e+e)%e}function __(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function x_(n,e,t){return n!==e?(t-n)/(e-n):0}function wo(n,e,t){return(1-t)*n+t*e}function y_(n,e,t,i){return wo(n,e,1-Math.exp(-t*i))}function v_(n,e=1){return e-Math.abs(Ih(n,e*2)-e)}function b_(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function S_(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function M_(n,e){return n+Math.floor(Math.random()*(e-n+1))}function w_(n,e){return n+Math.random()*(e-n)}function E_(n){return n*(.5-Math.random())}function T_(n){n!==void 0&&(Pp=n);let e=Pp+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function A_(n){return n*Mo}function C_(n){return n*la}function R_(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function P_(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function L_(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function I_(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),d=a((e+i)/2),h=r((e-i)/2),u=a((e-i)/2),f=r((i-e)/2),m=a((i-e)/2);switch(s){case"XYX":n.set(o*d,l*h,l*u,o*c);break;case"YZY":n.set(l*u,o*d,l*h,o*c);break;case"ZXZ":n.set(l*h,l*u,o*d,o*c);break;case"XZX":n.set(o*d,l*m,l*f,o*c);break;case"YXY":n.set(l*f,o*d,l*m,o*c);break;case"ZYZ":n.set(l*m,l*f,o*d,o*c);break;default:ct("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function wi(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Nt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Nh={DEG2RAD:Mo,RAD2DEG:la,generateUUID:ps,clamp:pt,euclideanModulo:Ih,mapLinear:__,inverseLerp:x_,lerp:wo,damp:y_,pingpong:v_,smoothstep:b_,smootherstep:S_,randInt:M_,randFloat:w_,randFloatSpread:E_,seededRandom:T_,degToRad:A_,radToDeg:C_,isPowerOfTwo:R_,ceilPowerOfTwo:P_,floorPowerOfTwo:L_,setQuaternionFromProperEuler:I_,normalize:Nt,denormalize:wi},at=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(pt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},oi=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],d=i[s+2],h=i[s+3],u=r[a+0],f=r[a+1],m=r[a+2],x=r[a+3];if(h!==x||l!==u||c!==f||d!==m){let p=l*u+c*f+d*m+h*x;p<0&&(u=-u,f=-f,m=-m,x=-x,p=-p);let g=1-o;if(p<.9995){let T=Math.acos(p),R=Math.sin(T);g=Math.sin(g*T)/R,o=Math.sin(o*T)/R,l=l*g+u*o,c=c*g+f*o,d=d*g+m*o,h=h*g+x*o}else{l=l*g+u*o,c=c*g+f*o,d=d*g+m*o,h=h*g+x*o;let T=1/Math.sqrt(l*l+c*c+d*d+h*h);l*=T,c*=T,d*=T,h*=T}}e[t]=l,e[t+1]=c,e[t+2]=d,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],d=i[s+3],h=r[a],u=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+d*h+l*f-c*u,e[t+1]=l*m+d*u+c*h-o*f,e[t+2]=c*m+d*f+o*u-l*h,e[t+3]=d*m-o*h-l*u-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),d=o(s/2),h=o(r/2),u=l(i/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=u*d*h+c*f*m,this._y=c*f*h-u*d*m,this._z=c*d*m+u*f*h,this._w=c*d*h-u*f*m;break;case"YXZ":this._x=u*d*h+c*f*m,this._y=c*f*h-u*d*m,this._z=c*d*m-u*f*h,this._w=c*d*h+u*f*m;break;case"ZXY":this._x=u*d*h-c*f*m,this._y=c*f*h+u*d*m,this._z=c*d*m+u*f*h,this._w=c*d*h-u*f*m;break;case"ZYX":this._x=u*d*h-c*f*m,this._y=c*f*h+u*d*m,this._z=c*d*m-u*f*h,this._w=c*d*h+u*f*m;break;case"YZX":this._x=u*d*h+c*f*m,this._y=c*f*h+u*d*m,this._z=c*d*m-u*f*h,this._w=c*d*h-u*f*m;break;case"XZY":this._x=u*d*h-c*f*m,this._y=c*f*h-u*d*m,this._z=c*d*m+u*f*h,this._w=c*d*h+u*f*m;break;default:ct("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],d=t[6],h=t[10],u=i+o+h;if(u>0){let f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(d-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>h){let f=2*Math.sqrt(1+i-o-h);this._w=(d-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>h){let f=2*Math.sqrt(1+o-i-h);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+d)/f}else{let f=2*Math.sqrt(1+h-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+d)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(pt(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,d=t._w;return this._x=i*d+a*o+s*c-r*l,this._y=s*d+a*l+r*o-i*c,this._z=r*d+a*c+i*l-s*o,this._w=a*d-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),d=Math.sin(c);l=Math.sin(l*c)/d,t=Math.sin(t*c)/d,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},J=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Lp.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Lp.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),d=2*(o*t-r*s),h=2*(r*i-a*t);return this.x=t+l*c+a*h-o*d,this.y=i+l*d+o*c-r*h,this.z=s+l*h+r*d-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(pt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Dd.copy(this).projectOnVector(e),this.sub(Dd)}reflect(e){return this.sub(Dd.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(pt(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Dd=new J,Lp=new oi,dt=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){let d=this.elements;return d[0]=e,d[1]=s,d[2]=o,d[3]=t,d[4]=r,d[5]=l,d[6]=i,d[7]=a,d[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],d=i[4],h=i[7],u=i[2],f=i[5],m=i[8],x=s[0],p=s[3],g=s[6],T=s[1],R=s[4],y=s[7],M=s[2],w=s[5],P=s[8];return r[0]=a*x+o*T+l*M,r[3]=a*p+o*R+l*w,r[6]=a*g+o*y+l*P,r[1]=c*x+d*T+h*M,r[4]=c*p+d*R+h*w,r[7]=c*g+d*y+h*P,r[2]=u*x+f*T+m*M,r[5]=u*p+f*R+m*w,r[8]=u*g+f*y+m*P,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8];return t*a*d-t*o*c-i*r*d+i*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=d*a-o*c,u=o*l-d*r,f=c*r-a*l,m=t*h+i*u+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return e[0]=h*x,e[1]=(s*c-d*i)*x,e[2]=(o*i-s*a)*x,e[3]=u*x,e[4]=(d*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=f*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return hr("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ud.makeScale(e,t)),this}rotate(e){return hr("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ud.makeRotation(-e)),this}translate(e,t){return hr("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ud.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ud=new dt,Ip=new dt().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Np=new dt().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function N_(){let n={enabled:!0,workingColorSpace:To,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===Pt&&(s.r=ms(s.r),s.g=ms(s.g),s.b=ms(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===Pt&&(s.r=sa(s.r),s.g=sa(s.g),s.b=sa(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===ci?Ao:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return hr("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return hr("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[To]:{primaries:e,whitePoint:i,transfer:Ao,toXYZ:Ip,fromXYZ:Np,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Ht},outputColorSpaceConfig:{drawingBufferColorSpace:Ht}},[Ht]:{primaries:e,whitePoint:i,transfer:Pt,toXYZ:Ip,fromXYZ:Np,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Ht}}}),n}var vt=N_();function ms(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function sa(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Br,bc=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Br===void 0&&(Br=Co("canvas")),Br.width=e.width,Br.height=e.height;let s=Br.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=Br}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Co("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=ms(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(ms(t[i]/255)*255):t[i]=ms(t[i]);return{data:t,width:e.width,height:e.height}}else return ct("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},D_=0,ca=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:D_++}),this.uuid=ps(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(kd(s[a].image)):r.push(kd(s[a]))}else r=kd(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function kd(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?bc.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(ct("Texture: Unable to serialize Texture."),{})}var U_=0,Od=new J,Yt=class n extends ji{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=zn,s=zn,r=Dt,a=Kn,o=_n,l=rn,c=n.DEFAULT_ANISOTROPY,d=ci){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:U_++}),this.uuid=ps(),this.name="",this.source=new ca(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new at(0,0),this.repeat=new at(1,1),this.center=new at(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new dt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=d,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Od).x}get height(){return this.source.getSize(Od).y}get depth(){return this.source.getSize(Od).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){ct(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){ct(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==Mh)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ks:e.x=e.x-Math.floor(e.x);break;case zn:e.x=e.x<0?0:1;break;case yc:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ks:e.y=e.y-Math.floor(e.y);break;case zn:e.y=e.y<0?0:1;break;case yc:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Yt.DEFAULT_IMAGE=null;Yt.DEFAULT_MAPPING=Mh;Yt.DEFAULT_ANISOTROPY=1;var yt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],d=l[4],h=l[8],u=l[1],f=l[5],m=l[9],x=l[2],p=l[6],g=l[10];if(Math.abs(d-u)<.01&&Math.abs(h-x)<.01&&Math.abs(m-p)<.01){if(Math.abs(d+u)<.1&&Math.abs(h+x)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let R=(c+1)/2,y=(f+1)/2,M=(g+1)/2,w=(d+u)/4,P=(h+x)/4,v=(m+p)/4;return R>y&&R>M?R<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(R),s=w/i,r=P/i):y>M?y<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(y),i=w/s,r=v/s):M<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(M),i=P/r,s=v/r),this.set(i,s,r,t),this}let T=Math.sqrt((p-m)*(p-m)+(h-x)*(h-x)+(u-d)*(u-d));return Math.abs(T)<.001&&(T=1),this.x=(p-m)/T,this.y=(h-x)/T,this.z=(u-d)/T,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=pt(this.x,e.x,t.x),this.y=pt(this.y,e.y,t.y),this.z=pt(this.z,e.z,t.z),this.w=pt(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=pt(this.x,e,t),this.y=pt(this.y,e,t),this.z=pt(this.z,e,t),this.w=pt(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(pt(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Sc=class extends ji{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Dt,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:i.depth},r=new Yt(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:Dt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new ca(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Vn=class extends Sc{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},fr=class extends Yt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Mc=class extends Yt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=sn,this.minFilter=sn,this.wrapR=zn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Mt=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,l,c,d,h,u,f,m,x,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,d,h,u,f,m,x,p)}set(e,t,i,s,r,a,o,l,c,d,h,u,f,m,x,p){let g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=d,g[10]=h,g[14]=u,g[3]=f,g[7]=m,g[11]=x,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/zr.setFromMatrixColumn(e,0).length(),r=1/zr.setFromMatrixColumn(e,1).length(),a=1/zr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),d=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let u=a*d,f=a*h,m=o*d,x=o*h;t[0]=l*d,t[4]=-l*h,t[8]=c,t[1]=f+m*c,t[5]=u-x*c,t[9]=-o*l,t[2]=x-u*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){let u=l*d,f=l*h,m=c*d,x=c*h;t[0]=u+x*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*d,t[9]=-o,t[2]=f*o-m,t[6]=x+u*o,t[10]=a*l}else if(e.order==="ZXY"){let u=l*d,f=l*h,m=c*d,x=c*h;t[0]=u-x*o,t[4]=-a*h,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*d,t[9]=x-u*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let u=a*d,f=a*h,m=o*d,x=o*h;t[0]=l*d,t[4]=m*c-f,t[8]=u*c+x,t[1]=l*h,t[5]=x*c+u,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let u=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*d,t[4]=x-u*h,t[8]=m*h+f,t[1]=h,t[5]=a*d,t[9]=-o*d,t[2]=-c*d,t[6]=f*h+m,t[10]=u-x*h}else if(e.order==="XZY"){let u=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*d,t[4]=-h,t[8]=c*d,t[1]=u*h+x,t[5]=a*d,t[9]=f*h-m,t[2]=m*h-f,t[6]=o*d,t[10]=x*h+u}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(k_,e,O_)}lookAt(e,t,i){let s=this.elements;return qn.subVectors(e,t),qn.lengthSq()===0&&(qn.z=1),qn.normalize(),Ls.crossVectors(i,qn),Ls.lengthSq()===0&&(Math.abs(i.z)===1?qn.x+=1e-4:qn.z+=1e-4,qn.normalize(),Ls.crossVectors(i,qn)),Ls.normalize(),Bl.crossVectors(qn,Ls),s[0]=Ls.x,s[4]=Bl.x,s[8]=qn.x,s[1]=Ls.y,s[5]=Bl.y,s[9]=qn.y,s[2]=Ls.z,s[6]=Bl.z,s[10]=qn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],d=i[1],h=i[5],u=i[9],f=i[13],m=i[2],x=i[6],p=i[10],g=i[14],T=i[3],R=i[7],y=i[11],M=i[15],w=s[0],P=s[4],v=s[8],A=s[12],U=s[1],I=s[5],L=s[9],F=s[13],D=s[2],X=s[6],ie=s[10],W=s[14],ne=s[3],H=s[7],re=s[11],le=s[15];return r[0]=a*w+o*U+l*D+c*ne,r[4]=a*P+o*I+l*X+c*H,r[8]=a*v+o*L+l*ie+c*re,r[12]=a*A+o*F+l*W+c*le,r[1]=d*w+h*U+u*D+f*ne,r[5]=d*P+h*I+u*X+f*H,r[9]=d*v+h*L+u*ie+f*re,r[13]=d*A+h*F+u*W+f*le,r[2]=m*w+x*U+p*D+g*ne,r[6]=m*P+x*I+p*X+g*H,r[10]=m*v+x*L+p*ie+g*re,r[14]=m*A+x*F+p*W+g*le,r[3]=T*w+R*U+y*D+M*ne,r[7]=T*P+R*I+y*X+M*H,r[11]=T*v+R*L+y*ie+M*re,r[15]=T*A+R*F+y*W+M*le,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],d=e[2],h=e[6],u=e[10],f=e[14],m=e[3],x=e[7],p=e[11],g=e[15],T=l*f-c*u,R=o*f-c*h,y=o*u-l*h,M=a*f-c*d,w=a*u-l*d,P=a*h-o*d;return t*(x*T-p*R+g*y)-i*(m*T-p*M+g*w)+s*(m*R-x*M+g*P)-r*(m*y-x*w+p*P)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],d=e[10];return t*(a*d-o*c)-i*(r*d-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],d=e[8],h=e[9],u=e[10],f=e[11],m=e[12],x=e[13],p=e[14],g=e[15],T=t*o-i*a,R=t*l-s*a,y=t*c-r*a,M=i*l-s*o,w=i*c-r*o,P=s*c-r*l,v=d*x-h*m,A=d*p-u*m,U=d*g-f*m,I=h*p-u*x,L=h*g-f*x,F=u*g-f*p,D=T*F-R*L+y*I+M*U-w*A+P*v;if(D===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let X=1/D;return e[0]=(o*F-l*L+c*I)*X,e[1]=(s*L-i*F-r*I)*X,e[2]=(x*P-p*w+g*M)*X,e[3]=(u*w-h*P-f*M)*X,e[4]=(l*U-a*F-c*A)*X,e[5]=(t*F-s*U+r*A)*X,e[6]=(p*y-m*P-g*R)*X,e[7]=(d*P-u*y+f*R)*X,e[8]=(a*L-o*U+c*v)*X,e[9]=(i*U-t*L-r*v)*X,e[10]=(m*w-x*y+g*T)*X,e[11]=(h*y-d*w-f*T)*X,e[12]=(o*A-a*I-l*v)*X,e[13]=(t*I-i*A+s*v)*X,e[14]=(x*R-m*M-p*T)*X,e[15]=(d*M-h*R+u*T)*X,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,d=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,d*o+i,d*l-s*a,0,c*l-s*o,d*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,d=a+a,h=o+o,u=r*c,f=r*d,m=r*h,x=a*d,p=a*h,g=o*h,T=l*c,R=l*d,y=l*h,M=i.x,w=i.y,P=i.z;return s[0]=(1-(x+g))*M,s[1]=(f+y)*M,s[2]=(m-R)*M,s[3]=0,s[4]=(f-y)*w,s[5]=(1-(u+g))*w,s[6]=(p+T)*w,s[7]=0,s[8]=(m+R)*P,s[9]=(p-T)*P,s[10]=(1-(u+x))*P,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=zr.set(s[0],s[1],s[2]).length(),o=zr.set(s[4],s[5],s[6]).length(),l=zr.set(s[8],s[9],s[10]).length();r<0&&(a=-a),vi.copy(this);let c=1/a,d=1/o,h=1/l;return vi.elements[0]*=c,vi.elements[1]*=c,vi.elements[2]*=c,vi.elements[4]*=d,vi.elements[5]*=d,vi.elements[6]*=d,vi.elements[8]*=h,vi.elements[9]*=h,vi.elements[10]*=h,t.setFromRotationMatrix(vi),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=Ei,l=!1){let c=this.elements,d=2*r/(t-e),h=2*r/(i-s),u=(t+e)/(t-e),f=(i+s)/(i-s),m,x;if(l)m=r/(a-r),x=a*r/(a-r);else if(o===Ei)m=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===aa)m=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=Ei,l=!1){let c=this.elements,d=2/(t-e),h=2/(i-s),u=-(t+e)/(t-e),f=-(i+s)/(i-s),m,x;if(l)m=1/(a-r),x=a/(a-r);else if(o===Ei)m=-2/(a-r),x=-(a+r)/(a-r);else if(o===aa)m=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=d,c[4]=0,c[8]=0,c[12]=u,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},zr=new J,vi=new Mt,k_=new J(0,0,0),O_=new J(1,1,1),Ls=new J,Bl=new J,qn=new J,Dp=new Mt,Up=new oi,gs=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],d=s[9],h=s[2],u=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(pt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-d,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-pt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(pt(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-pt(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(pt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-d,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-pt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-d,f),this._y=0);break;default:ct("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Dp.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Dp,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Up.setFromEuler(this),this.setFromQuaternion(Up,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};gs.DEFAULT_ORDER="XYZ";var Po=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},F_=0,kp=new J,Vr=new oi,ls=new Mt,zl=new J,go=new J,B_=new J,z_=new oi,Op=new J(1,0,0),Fp=new J(0,1,0),Bp=new J(0,0,1),zp={type:"added"},V_={type:"removed"},Hr={type:"childadded",child:null},Fd={type:"childremoved",child:null},dn=class n extends ji{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:F_++}),this.uuid=ps(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new J,t=new gs,i=new oi,s=new J(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Mt},normalMatrix:{value:new dt}}),this.matrix=new Mt,this.matrixWorld=new Mt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Po,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Vr.setFromAxisAngle(e,t),this.quaternion.multiply(Vr),this}rotateOnWorldAxis(e,t){return Vr.setFromAxisAngle(e,t),this.quaternion.premultiply(Vr),this}rotateX(e){return this.rotateOnAxis(Op,e)}rotateY(e){return this.rotateOnAxis(Fp,e)}rotateZ(e){return this.rotateOnAxis(Bp,e)}translateOnAxis(e,t){return kp.copy(e).applyQuaternion(this.quaternion),this.position.add(kp.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Op,e)}translateY(e){return this.translateOnAxis(Fp,e)}translateZ(e){return this.translateOnAxis(Bp,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ls.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?zl.copy(e):zl.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),go.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ls.lookAt(go,zl,this.up):ls.lookAt(zl,go,this.up),this.quaternion.setFromRotationMatrix(ls),s&&(ls.extractRotation(s.matrixWorld),Vr.setFromRotationMatrix(ls),this.quaternion.premultiply(Vr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(ut("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(zp),Hr.child=e,this.dispatchEvent(Hr),Hr.child=null):ut("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(V_),Fd.child=e,this.dispatchEvent(Fd),Fd.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ls.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ls.multiply(e.parent.matrixWorld)),e.applyMatrix4(ls),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(zp),Hr.child=e,this.dispatchEvent(Hr),Hr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(go,e,B_),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(go,z_,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,d=l.length;c<d;c++){let h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),d=a(e.images),h=a(e.shapes),u=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),d.length>0&&(i.images=d),h.length>0&&(i.shapes=h),u.length>0&&(i.skeletons=u),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=s,i;function a(o){let l=[];for(let c in o){let d=o[c];delete d.metadata,l.push(d)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};dn.DEFAULT_UP=new J(0,1,0);dn.DEFAULT_MATRIX_AUTO_UPDATE=!0;dn.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var dr=class extends dn{constructor(){super(),this.isGroup=!0,this.type="Group"}},H_={type:"move"},ua=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new dr,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new dr,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new J,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new J),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new dr,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new J,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new J,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let p=t.getJointPose(x,i),g=this._getHandJoint(c,x);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let d=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],u=d.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&u>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&u<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(H_)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new dr;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},Vm={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Is={h:0,s:0,l:0},Vl={h:0,s:0,l:0};function Bd(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var lt=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Ht){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,vt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=vt.workingColorSpace){return this.r=e,this.g=t,this.b=i,vt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=vt.workingColorSpace){if(e=Ih(e,1),t=pt(t,0,1),i=pt(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=Bd(a,r,e+1/3),this.g=Bd(a,r,e),this.b=Bd(a,r,e-1/3)}return vt.colorSpaceToWorking(this,s),this}setStyle(e,t=Ht){function i(r){r!==void 0&&parseFloat(r)<1&&ct("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ct("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);ct("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Ht){let i=Vm[e.toLowerCase()];return i!==void 0?this.setHex(i,t):ct("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ms(e.r),this.g=ms(e.g),this.b=ms(e.b),this}copyLinearToSRGB(e){return this.r=sa(e.r),this.g=sa(e.g),this.b=sa(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Ht){return vt.workingToColorSpace(wn.copy(this),e),Math.round(pt(wn.r*255,0,255))*65536+Math.round(pt(wn.g*255,0,255))*256+Math.round(pt(wn.b*255,0,255))}getHexString(e=Ht){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=vt.workingColorSpace){vt.workingToColorSpace(wn.copy(this),t);let i=wn.r,s=wn.g,r=wn.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,d=(o+a)/2;if(o===a)l=0,c=0;else{let h=a-o;switch(c=d<=.5?h/(a+o):h/(2-a-o),a){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=d,e}getRGB(e,t=vt.workingColorSpace){return vt.workingToColorSpace(wn.copy(this),t),e.r=wn.r,e.g=wn.g,e.b=wn.b,e}getStyle(e=Ht){vt.workingToColorSpace(wn.copy(this),e);let t=wn.r,i=wn.g,s=wn.b;return e!==Ht?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(Is),this.setHSL(Is.h+e,Is.s+t,Is.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Is),e.getHSL(Vl);let i=wo(Is.h,Vl.h,t),s=wo(Is.s,Vl.s,t),r=wo(Is.l,Vl.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},wn=new lt;lt.NAMES=Vm;var da=class extends dn{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new gs,this.environmentIntensity=1,this.environmentRotation=new gs,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},bi=new J,cs=new J,zd=new J,us=new J,Gr=new J,Wr=new J,Vp=new J,Vd=new J,Hd=new J,Gd=new J,Wd=new yt,jd=new yt,Xd=new yt,fs=class n{constructor(e=new J,t=new J,i=new J){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),bi.subVectors(e,t),s.cross(bi);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){bi.subVectors(s,t),cs.subVectors(i,t),zd.subVectors(e,t);let a=bi.dot(bi),o=bi.dot(cs),l=bi.dot(zd),c=cs.dot(cs),d=cs.dot(zd),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;let u=1/h,f=(c*l-o*d)*u,m=(a*d-o*l)*u;return r.set(1-f-m,m,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,us)===null?!1:us.x>=0&&us.y>=0&&us.x+us.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,us)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,us.x),l.addScaledVector(a,us.y),l.addScaledVector(o,us.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return Wd.setScalar(0),jd.setScalar(0),Xd.setScalar(0),Wd.fromBufferAttribute(e,t),jd.fromBufferAttribute(e,i),Xd.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(Wd,r.x),a.addScaledVector(jd,r.y),a.addScaledVector(Xd,r.z),a}static isFrontFacing(e,t,i,s){return bi.subVectors(i,t),cs.subVectors(e,t),bi.cross(cs).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return bi.subVectors(this.c,this.b),cs.subVectors(this.a,this.b),bi.cross(cs).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;Gr.subVectors(s,i),Wr.subVectors(r,i),Vd.subVectors(e,i);let l=Gr.dot(Vd),c=Wr.dot(Vd);if(l<=0&&c<=0)return t.copy(i);Hd.subVectors(e,s);let d=Gr.dot(Hd),h=Wr.dot(Hd);if(d>=0&&h<=d)return t.copy(s);let u=l*h-d*c;if(u<=0&&l>=0&&d<=0)return a=l/(l-d),t.copy(i).addScaledVector(Gr,a);Gd.subVectors(e,r);let f=Gr.dot(Gd),m=Wr.dot(Gd);if(m>=0&&f<=m)return t.copy(r);let x=f*c-l*m;if(x<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(Wr,o);let p=d*m-f*h;if(p<=0&&h-d>=0&&f-m>=0)return Vp.subVectors(r,s),o=(h-d)/(h-d+(f-m)),t.copy(s).addScaledVector(Vp,o);let g=1/(p+x+u);return a=x*g,o=u*g,t.copy(i).addScaledVector(Gr,a).addScaledVector(Wr,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Yn=class{constructor(e=new J(1/0,1/0,1/0),t=new J(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Si.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Si.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Si.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Si):Si.fromBufferAttribute(r,a),Si.applyMatrix4(e.matrixWorld),this.expandByPoint(Si);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Hl.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Hl.copy(i.boundingBox)),Hl.applyMatrix4(e.matrixWorld),this.union(Hl)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Si),Si.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(_o),Gl.subVectors(this.max,_o),jr.subVectors(e.a,_o),Xr.subVectors(e.b,_o),qr.subVectors(e.c,_o),Ns.subVectors(Xr,jr),Ds.subVectors(qr,Xr),or.subVectors(jr,qr);let t=[0,-Ns.z,Ns.y,0,-Ds.z,Ds.y,0,-or.z,or.y,Ns.z,0,-Ns.x,Ds.z,0,-Ds.x,or.z,0,-or.x,-Ns.y,Ns.x,0,-Ds.y,Ds.x,0,-or.y,or.x,0];return!qd(t,jr,Xr,qr,Gl)||(t=[1,0,0,0,1,0,0,0,1],!qd(t,jr,Xr,qr,Gl))?!1:(Wl.crossVectors(Ns,Ds),t=[Wl.x,Wl.y,Wl.z],qd(t,jr,Xr,qr,Gl))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Si).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Si).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(ds[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ds[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ds[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ds[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ds[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ds[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ds[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ds[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ds),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},ds=[new J,new J,new J,new J,new J,new J,new J,new J],Si=new J,Hl=new Yn,jr=new J,Xr=new J,qr=new J,Ns=new J,Ds=new J,or=new J,_o=new J,Gl=new J,Wl=new J,lr=new J;function qd(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){lr.fromArray(n,r);let o=s.x*Math.abs(lr.x)+s.y*Math.abs(lr.y)+s.z*Math.abs(lr.z),l=e.dot(lr),c=t.dot(lr),d=i.dot(lr);if(Math.max(-Math.max(l,c,d),Math.min(l,c,d))>o)return!1}return!0}var tn=new J,jl=new at,G_=0,nn=class extends ji{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:G_++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=Ph,this.updateRanges=[],this.gpuType=Pi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)jl.fromBufferAttribute(this,t),jl.applyMatrix3(e),this.setXY(t,jl.x,jl.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix3(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=wi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Nt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=wi(t,this.array)),t}setX(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=wi(t,this.array)),t}setY(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=wi(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=wi(t,this.array)),t}setW(e,t){return this.normalized&&(t=Nt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array),s=Nt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array),s=Nt(s,this.array),r=Nt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var Lo=class extends nn{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var Io=class extends nn{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var Wt=class extends nn{constructor(e,t,i){super(new Float32Array(e),t,i)}},W_=new Yn,xo=new J,$d=new J,Ti=class{constructor(e=new J,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):W_.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;xo.subVectors(e,this.center);let t=xo.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(xo,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):($d.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(xo.copy(e.center).add($d)),this.expandByPoint(xo.copy(e.center).sub($d))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},j_=0,ai=new Mt,Yd=new dn,$r=new J,$n=new Yn,yo=new Yn,gn=new J,Jt=class n extends ji{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:j_++}),this.uuid=ps(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(m_(e)?Io:Lo)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new dt().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return ai.makeRotationFromQuaternion(e),this.applyMatrix4(ai),this}rotateX(e){return ai.makeRotationX(e),this.applyMatrix4(ai),this}rotateY(e){return ai.makeRotationY(e),this.applyMatrix4(ai),this}rotateZ(e){return ai.makeRotationZ(e),this.applyMatrix4(ai),this}translate(e,t,i){return ai.makeTranslation(e,t,i),this.applyMatrix4(ai),this}scale(e,t,i){return ai.makeScale(e,t,i),this.applyMatrix4(ai),this}lookAt(e){return Yd.lookAt(e),Yd.updateMatrix(),this.applyMatrix4(Yd.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter($r).negate(),this.translate($r.x,$r.y,$r.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Wt(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&ct("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yn);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ut("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new J(-1/0,-1/0,-1/0),new J(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];$n.setFromBufferAttribute(r),this.morphTargetsRelative?(gn.addVectors(this.boundingBox.min,$n.min),this.boundingBox.expandByPoint(gn),gn.addVectors(this.boundingBox.max,$n.max),this.boundingBox.expandByPoint(gn)):(this.boundingBox.expandByPoint($n.min),this.boundingBox.expandByPoint($n.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&ut('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ti);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){ut("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new J,1/0);return}if(e){let i=this.boundingSphere.center;if($n.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];yo.setFromBufferAttribute(o),this.morphTargetsRelative?(gn.addVectors($n.min,yo.min),$n.expandByPoint(gn),gn.addVectors($n.max,yo.max),$n.expandByPoint(gn)):($n.expandByPoint(yo.min),$n.expandByPoint(yo.max))}$n.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)gn.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(gn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,d=o.count;c<d;c++)gn.fromBufferAttribute(o,c),l&&($r.fromBufferAttribute(e,c),gn.add($r)),s=Math.max(s,i.distanceToSquared(gn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&ut('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){ut("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new nn(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let v=0;v<i.count;v++)o[v]=new J,l[v]=new J;let c=new J,d=new J,h=new J,u=new at,f=new at,m=new at,x=new J,p=new J;function g(v,A,U){c.fromBufferAttribute(i,v),d.fromBufferAttribute(i,A),h.fromBufferAttribute(i,U),u.fromBufferAttribute(r,v),f.fromBufferAttribute(r,A),m.fromBufferAttribute(r,U),d.sub(c),h.sub(c),f.sub(u),m.sub(u);let I=1/(f.x*m.y-m.x*f.y);isFinite(I)&&(x.copy(d).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(I),p.copy(h).multiplyScalar(f.x).addScaledVector(d,-m.x).multiplyScalar(I),o[v].add(x),o[A].add(x),o[U].add(x),l[v].add(p),l[A].add(p),l[U].add(p))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let v=0,A=T.length;v<A;++v){let U=T[v],I=U.start,L=U.count;for(let F=I,D=I+L;F<D;F+=3)g(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let R=new J,y=new J,M=new J,w=new J;function P(v){M.fromBufferAttribute(s,v),w.copy(M);let A=o[v];R.copy(A),R.sub(M.multiplyScalar(M.dot(A))).normalize(),y.crossVectors(w,A);let I=y.dot(l[v])<0?-1:1;a.setXYZW(v,R.x,R.y,R.z,I)}for(let v=0,A=T.length;v<A;++v){let U=T[v],I=U.start,L=U.count;for(let F=I,D=I+L;F<D;F+=3)P(e.getX(F+0)),P(e.getX(F+1)),P(e.getX(F+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new nn(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let u=0,f=i.count;u<f;u++)i.setXYZ(u,0,0,0);let s=new J,r=new J,a=new J,o=new J,l=new J,c=new J,d=new J,h=new J;if(e)for(let u=0,f=e.count;u<f;u+=3){let m=e.getX(u+0),x=e.getX(u+1),p=e.getX(u+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,p),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,p),o.add(d),l.add(d),c.add(d),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let u=0,f=t.count;u<f;u+=3)s.fromBufferAttribute(t,u+0),r.fromBufferAttribute(t,u+1),a.fromBufferAttribute(t,u+2),d.subVectors(a,r),h.subVectors(s,r),d.cross(h),i.setXYZ(u+0,d.x,d.y,d.z),i.setXYZ(u+1,d.x,d.y,d.z),i.setXYZ(u+2,d.x,d.y,d.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)gn.fromBufferAttribute(e,t),gn.normalize(),e.setXYZ(t,gn.x,gn.y,gn.z)}toNonIndexed(){function e(o,l){let c=o.array,d=o.itemSize,h=o.normalized,u=new c.constructor(l.length*d),f=0,m=0;for(let x=0,p=l.length;x<p;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*d;for(let g=0;g<d;g++)u[m++]=c[f++]}return new nn(u,d,h)}if(this.index===null)return ct("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let d=0,h=c.length;d<h;d++){let u=c[d],f=e(u,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],d=[];for(let h=0,u=c.length;h<u;h++){let f=c[h];d.push(f.toJSON(e.data))}d.length>0&&(s[l]=d,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let d=s[c];this.setAttribute(c,d.clone(t))}let r=e.morphAttributes;for(let c in r){let d=[],h=r[c];for(let u=0,f=h.length;u<f;u++)d.push(h[u].clone(t));this.morphAttributes[c]=d}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,d=a.length;c<d;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},No=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Ph,this.updateRanges=[],this.version=0,this.uuid=ps()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ps()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=ps()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Nn=new J,Tn=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.applyMatrix4(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.applyNormalMatrix(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Nn.fromBufferAttribute(this,t),Nn.transformDirection(e),this.setXYZ(t,Nn.x,Nn.y,Nn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=wi(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Nt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=Nt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Nt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=wi(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=wi(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=wi(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=wi(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array),s=Nt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Nt(t,this.array),i=Nt(i,this.array),s=Nt(s,this.array),r=Nt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){Ro("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new nn(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){Ro("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},Jd=new J,X_=new J,q_=new dt,Mi=class{constructor(e=new J(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=Jd.subVectors(i,t).cross(X_.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(Jd),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||q_.getNormalMatrix(e),s=this.coplanarPoint(Jd).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},$_=0,Xi=class extends ji{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:$_++}),this.uuid=ps(),this.name="",this.type="Material",this.blending=ya,this.side=Gs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ph,this.blendDst=mh,this.blendEquation=mr,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new lt(0,0,0),this.blendAlpha=0,this.depthFunc=ra,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Pm,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=dc,this.stencilZFail=dc,this.stencilZPass=dc,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){ct(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){ct(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new lt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new Mi().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new at().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new at().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},ha=class extends Xi{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new lt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Yr,vo=new J,Jr=new J,Kr=new J,Zr=new at,bo=new at,Hm=new Mt,Xl=new J,So=new J,ql=new J,Hp=new at,Kd=new at,Gp=new at,Do=class extends dn{constructor(e=new ha){if(super(),this.isSprite=!0,this.type="Sprite",Yr===void 0){Yr=new Jt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new No(t,5);Yr.setIndex([0,1,2,0,2,3]),Yr.setAttribute("position",new Tn(i,3,0,!1)),Yr.setAttribute("uv",new Tn(i,2,3,!1))}this.geometry=Yr,this.material=e,this.center=new at(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&ut('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Jr.setFromMatrixScale(this.matrixWorld),Hm.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Kr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Jr.multiplyScalar(-Kr.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let a=this.center;$l(Xl.set(-.5,-.5,0),Kr,a,Jr,s,r),$l(So.set(.5,-.5,0),Kr,a,Jr,s,r),$l(ql.set(.5,.5,0),Kr,a,Jr,s,r),Hp.set(0,0),Kd.set(1,0),Gp.set(1,1);let o=e.ray.intersectTriangle(Xl,So,ql,!1,vo);if(o===null&&($l(So.set(-.5,.5,0),Kr,a,Jr,s,r),Kd.set(0,1),o=e.ray.intersectTriangle(Xl,ql,So,!1,vo),o===null))return;let l=e.ray.origin.distanceTo(vo);l<e.near||l>e.far||t.push({distance:l,point:vo.clone(),uv:fs.getInterpolation(vo,Xl,So,ql,Hp,Kd,Gp,new at),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function $l(n,e,t,i,s,r){Zr.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(bo.x=r*Zr.x-s*Zr.y,bo.y=s*Zr.x+r*Zr.y):bo.copy(Zr),n.copy(e),n.x+=bo.x,n.y+=bo.y,n.applyMatrix4(Hm)}var hs=new J,Zd=new J,Yl=new J,Jl=new J,Uo=class{constructor(e=new J,t=new J(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,hs)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=hs.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(hs.copy(this.origin).addScaledVector(this.direction,t),hs.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){Zd.copy(e).add(t).multiplyScalar(.5),Yl.copy(t).sub(e).normalize(),Jl.copy(this.origin).sub(Zd);let r=e.distanceTo(t)*.5,a=-this.direction.dot(Yl),o=Jl.dot(this.direction),l=-Jl.dot(Yl),c=Jl.lengthSq(),d=Math.abs(1-a*a),h,u,f,m;if(d>0)if(h=a*l-o,u=a*o-l,m=r*d,h>=0)if(u>=-m)if(u<=m){let x=1/d;h*=x,u*=x,f=h*(h+a*u+2*o)+u*(a*h+u+2*l)+c}else u=r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*l)+c;else u=-r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*l)+c;else u<=-m?(h=Math.max(0,-(-a*r+o)),u=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+u*(u+2*l)+c):u<=m?(h=0,u=Math.min(Math.max(-r,-l),r),f=u*(u+2*l)+c):(h=Math.max(0,-(a*r+o)),u=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+u*(u+2*l)+c);else u=a>0?-r:r,h=Math.max(0,-(a*u+o)),f=-h*h+u*(u+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(Zd).addScaledVector(Yl,u),f}intersectSphere(e,t){if(e.radius<0)return null;hs.subVectors(e.center,this.origin);let i=hs.dot(this.direction),s=hs.dot(hs)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l,c=1/this.direction.x,d=1/this.direction.y,h=1/this.direction.z,u=this.origin;return c>=0?(i=(e.min.x-u.x)*c,s=(e.max.x-u.x)*c):(i=(e.max.x-u.x)*c,s=(e.min.x-u.x)*c),d>=0?(r=(e.min.y-u.y)*d,a=(e.max.y-u.y)*d):(r=(e.max.y-u.y)*d,a=(e.min.y-u.y)*d),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-u.z)*h,l=(e.max.z-u.z)*h):(o=(e.max.z-u.z)*h,l=(e.min.z-u.z)*h),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,hs)!==null}intersectTriangle(e,t,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,d=o.z,h=e.x-a.x,u=e.y-a.y,f=e.z-a.z,m=t.x-a.x,x=t.y-a.y,p=t.z-a.z,g=i.x-a.x,T=i.y-a.y,R=i.z-a.z,y=Math.abs(l),M=Math.abs(c),w=Math.abs(d),P,v,A,U,I,L,F,D,X,ie,W,ne;if(y>=M&&y>=w?(A=l,L=h,X=m,ne=g,l>=0?(P=c,v=d,U=u,I=f,F=x,D=p,ie=T,W=R):(P=d,v=c,U=f,I=u,F=p,D=x,ie=R,W=T)):M>=w?(A=c,L=u,X=x,ne=T,c>=0?(P=d,v=l,U=f,I=h,F=p,D=m,ie=R,W=g):(P=l,v=d,U=h,I=f,F=m,D=p,ie=g,W=R)):(A=d,L=f,X=p,ne=R,d>=0?(P=l,v=c,U=h,I=u,F=m,D=x,ie=g,W=T):(P=c,v=l,U=u,I=h,F=x,D=m,ie=T,W=g)),A===0)return null;let H=P/A,re=v/A,le=1/A,ae=U-H*L,me=I-re*L,Ne=F-H*X,Le=D-re*X,De=ie-H*ne,j=W-re*ne,Q=De*Le-j*Ne,ye=ae*j-me*De,Se=Ne*me-Le*ae;if(s){if(Q<0||ye<0||Se<0)return null}else if((Q<0||ye<0||Se<0)&&(Q>0||ye>0||Se>0))return null;let ve=Q+ye+Se;if(ve===0)return null;let je=le*(Q*L+ye*X+Se*ne);return(ve>0?je<0:je>0)?null:this.at(je/ve,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},Os=class extends Xi{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gs,this.combine=Vc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Wp=new Mt,cr=new Uo,Kl=new Ti,jp=new J,Zl=new J,Ql=new J,ec=new J,Qd=new J,tc=new J,Xp=new J,nc=new J,jt=class extends dn{constructor(e=new Jt,t=new Os){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){tc.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let d=o[l],h=r[l];d!==0&&(Qd.fromBufferAttribute(h,e),a?tc.addScaledVector(Qd,d):tc.addScaledVector(Qd.sub(t),d))}t.add(tc)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Kl.copy(i.boundingSphere),Kl.applyMatrix4(r),cr.copy(e.ray).recast(e.near),!(Kl.containsPoint(cr.origin)===!1&&(cr.intersectSphere(Kl,jp)===null||cr.origin.distanceToSquared(jp)>(e.far-e.near)**2))&&(Wp.copy(r).invert(),cr.copy(e.ray).applyMatrix4(Wp),!(i.boundingBox!==null&&cr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,cr)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,d=r.attributes.uv1,h=r.attributes.normal,u=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,x=u.length;m<x;m++){let p=u[m],g=a[p.materialIndex],T=Math.max(p.start,f.start),R=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let y=T,M=R;y<M;y+=3){let w=o.getX(y),P=o.getX(y+1),v=o.getX(y+2);s=ic(this,g,e,i,c,d,h,w,P,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let p=m,g=x;p<g;p+=3){let T=o.getX(p),R=o.getX(p+1),y=o.getX(p+2);s=ic(this,a,e,i,c,d,h,T,R,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,x=u.length;m<x;m++){let p=u[m],g=a[p.materialIndex],T=Math.max(p.start,f.start),R=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let y=T,M=R;y<M;y+=3){let w=y,P=y+1,v=y+2;s=ic(this,g,e,i,c,d,h,w,P,v),s&&(s.faceIndex=Math.floor(y/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let p=m,g=x;p<g;p+=3){let T=p,R=p+1,y=p+2;s=ic(this,a,e,i,c,d,h,T,R,y),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function Y_(n,e,t,i,s,r,a,o){let l;if(e.side===xn?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===Gs,o),l===null)return null;nc.copy(o),nc.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(nc);return c<t.near||c>t.far?null:{distance:c,point:nc.clone(),object:n}}function ic(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,Zl),n.getVertexPosition(l,Ql),n.getVertexPosition(c,ec);let d=Y_(n,e,t,i,Zl,Ql,ec,Xp);if(d){let h=new J;fs.getBarycoord(Xp,Zl,Ql,ec,h),s&&(d.uv=fs.getInterpolatedAttribute(s,o,l,c,h,new at)),r&&(d.uv1=fs.getInterpolatedAttribute(r,o,l,c,h,new at)),a&&(d.normal=fs.getInterpolatedAttribute(a,o,l,c,h,new J),d.normal.dot(i.direction)>0&&d.normal.multiplyScalar(-1));let u={a:o,b:l,c,normal:new J,materialIndex:0};fs.getNormal(Zl,Ql,ec,u.normal),d.face=u,d.barycoord=h}return d}var _s=class extends Yt{constructor(e=null,t=1,i=1,s,r,a,o,l,c=sn,d=sn,h,u){super(null,a,o,l,c,d,s,r,h,u),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var ur=new Ti,J_=new at(.5,.5),sc=new J,fa=class{constructor(e=new Mi,t=new Mi,i=new Mi,s=new Mi,r=new Mi,a=new Mi){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Ei,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],d=r[4],h=r[5],u=r[6],f=r[7],m=r[8],x=r[9],p=r[10],g=r[11],T=r[12],R=r[13],y=r[14],M=r[15];if(s[0].setComponents(c-a,f-d,g-m,M-T).normalize(),s[1].setComponents(c+a,f+d,g+m,M+T).normalize(),s[2].setComponents(c+o,f+h,g+x,M+R).normalize(),s[3].setComponents(c-o,f-h,g-x,M-R).normalize(),i)s[4].setComponents(l,u,p,y).normalize(),s[5].setComponents(c-l,f-u,g-p,M-y).normalize();else if(s[4].setComponents(c-l,f-u,g-p,M-y).normalize(),t===Ei)s[5].setComponents(c+l,f+u,g+p,M+y).normalize();else if(t===aa)s[5].setComponents(l,u,p,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ur.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ur.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ur)}intersectsSprite(e){ur.center.set(0,0,0);let t=J_.distanceTo(e.center);return ur.radius=.7071067811865476+t,ur.applyMatrix4(e.matrixWorld),this.intersectsSphere(ur)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(sc.x=s.normal.x>0?e.max.x:e.min.x,sc.y=s.normal.y>0?e.max.y:e.min.y,sc.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(sc)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var pr=class extends Xi{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new lt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},qp=new Mt,oh=new Uo,rc=new Ti,ac=new J,Fs=class extends dn{constructor(e=new Jt,t=new pr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),rc.copy(i.boundingSphere),rc.applyMatrix4(s),rc.radius+=r,e.ray.intersectsSphere(rc)===!1)return;qp.copy(s).invert(),oh.copy(e.ray).applyMatrix4(qp);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){let u=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=u,x=f;m<x;m++){let p=c.getX(m);ac.fromBufferAttribute(h,p),$p(ac,p,l,s,e,t,this)}}else{let u=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let m=u,x=f;m<x;m++)ac.fromBufferAttribute(h,m),$p(ac,m,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function $p(n,e,t,i,s,r,a){let o=oh.distanceSqToPoint(n);if(o<t){let l=new J;oh.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var ko=class extends Yt{constructor(e=[],t=Ws,i,s,r,a,o,l,c,d){super(e,t,i,s,r,a,o,l,c,d),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},pa=class extends Yt{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var Bs=class extends Yt{constructor(e,t,i=Ri,s,r,a,o=sn,l=sn,c,d=Wi,h=1){if(d!==Wi&&d!==js)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let u={width:e,height:t,depth:h};super(u,s,r,a,o,l,d,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new ca(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},wc=class extends Bs{constructor(e,t=Ri,i=Ws,s,r,a=sn,o=sn,l,c=Wi){let d={width:e,height:e,depth:1},h=[d,d,d,d,d,d];super(e,e,t,i,s,r,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},Oo=class extends Yt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},ma=class n extends Jt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],d=[],h=[],u=0,f=0;m("z","y","x",-1,-1,i,t,e,a,r,0),m("z","y","x",1,-1,i,t,-e,a,r,1),m("x","z","y",1,1,e,i,t,s,a,2),m("x","z","y",1,-1,e,i,-t,s,a,3),m("x","y","z",1,-1,e,t,i,s,r,4),m("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new Wt(c,3)),this.setAttribute("normal",new Wt(d,3)),this.setAttribute("uv",new Wt(h,2));function m(x,p,g,T,R,y,M,w,P,v,A){let U=y/P,I=M/v,L=y/2,F=M/2,D=w/2,X=P+1,ie=v+1,W=0,ne=0,H=new J;for(let re=0;re<ie;re++){let le=re*I-F;for(let ae=0;ae<X;ae++){let me=ae*U-L;H[x]=me*T,H[p]=le*R,H[g]=D,c.push(H.x,H.y,H.z),H[x]=0,H[p]=0,H[g]=w>0?1:-1,d.push(H.x,H.y,H.z),h.push(ae/P),h.push(1-re/v),W+=1}}for(let re=0;re<v;re++)for(let le=0;le<P;le++){let ae=u+le+X*re,me=u+le+X*(re+1),Ne=u+(le+1)+X*(re+1),Le=u+(le+1)+X*re;l.push(ae,me,Le),l.push(me,Ne,Le),ne+=6}o.addGroup(f,ne,A),f+=ne,u+=W}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var Fo=class n extends Jt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,d=l+1,h=e/o,u=t/l,f=[],m=[],x=[],p=[];for(let g=0;g<d;g++){let T=g*u-a;for(let R=0;R<c;R++){let y=R*h-r;m.push(y,-T,0),x.push(0,0,1),p.push(R/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let T=0;T<o;T++){let R=T+c*g,y=T+c*(g+1),M=T+1+c*(g+1),w=T+1+c*g;f.push(R,y,w),f.push(y,M,w)}this.setIndex(f),this.setAttribute("position",new Wt(m,3)),this.setAttribute("normal",new Wt(x,3)),this.setAttribute("uv",new Wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},Bo=class n extends Jt{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);let o=[],l=[],c=[],d=[],h=e,u=(t-e)/s,f=new J,m=new at;for(let x=0;x<=s;x++){for(let p=0;p<=i;p++){let g=r+p/i*a;f.x=h*Math.cos(g),f.y=h*Math.sin(g),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,d.push(m.x,m.y)}h+=u}for(let x=0;x<s;x++){let p=x*(i+1);for(let g=0;g<i;g++){let T=g+p,R=T,y=T+i+1,M=T+i+2,w=T+1;o.push(R,y,w),o.push(y,M,w)}}this.setIndex(o),this.setAttribute("position",new Wt(l,3)),this.setAttribute("normal",new Wt(c,3)),this.setAttribute("uv",new Wt(d,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var Ai=class n extends Jt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,d=[],h=new J,u=new J,f=[],m=[],x=[],p=[];for(let g=0;g<=i;g++){let T=[],R=g/i,y=a+R*o,M=e*Math.cos(y),w=Math.sqrt(e*e-M*M),P=0;g===0&&a===0?P=.5/t:g===i&&l===Math.PI&&(P=-.5/t);for(let v=0;v<=t;v++){let A=v/t,U=s+A*r;h.x=-w*Math.cos(U),h.y=M,h.z=w*Math.sin(U),m.push(h.x,h.y,h.z),u.copy(h).normalize(),x.push(u.x,u.y,u.z),p.push(A+P,1-R),T.push(c++)}d.push(T)}for(let g=0;g<i;g++)for(let T=0;T<t;T++){let R=d[g][T+1],y=d[g][T],M=d[g+1][T],w=d[g+1][T+1];(g!==0||a>0)&&f.push(R,y,w),(g!==i-1||l<Math.PI)&&f.push(y,M,w)}this.setIndex(f),this.setAttribute("position",new Wt(m,3)),this.setAttribute("normal",new Wt(x,3)),this.setAttribute("uv",new Wt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var zo=class extends Jt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],i=new Set,s=new J,r=new J;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,d=l.length;c<d;++c){let h=l[c],u=h.start,f=h.count;for(let m=u,x=u+f;m<x;m+=3)for(let p=0;p<3;p++){let g=o.getX(m+p),T=o.getX(m+(p+1)%3);s.fromBufferAttribute(a,g),r.fromBufferAttribute(a,T),Yp(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let d=3*o+c,h=3*o+(c+1)%3;s.fromBufferAttribute(a,d),r.fromBufferAttribute(a,h),Yp(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new Wt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Yp(n,e,t){let i=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(i)===!0||t.has(s)===!0?!1:(t.add(i),t.add(s),!0)}function xr(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(Jp(s))s.isRenderTargetTexture?(ct("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(Jp(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function An(n){let e={};for(let t=0;t<n.length;t++){let i=xr(n[t]);for(let s in i)e[s]=i[s]}return e}function Jp(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function K_(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Dh(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:vt.workingColorSpace}var sl={clone:xr,merge:An},Z_=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Q_=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Ot=class extends Xi{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Z_,this.fragmentShader=Q_,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=xr(e.uniforms),this.uniformsGroups=K_(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new lt().setHex(s.value);break;case"v2":this.uniforms[i].value=new at().fromArray(s.value);break;case"v3":this.uniforms[i].value=new J().fromArray(s.value);break;case"v4":this.uniforms[i].value=new yt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new dt().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Mt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Ec=class extends Ot{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var Vo=class extends Xi{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new lt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new lt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Au,this.normalScale=new at(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new gs,this.combine=Vc,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},Tc=class extends Xi{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Cm,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Ac=class extends Xi{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Qr(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function eh(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var zs=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},Cc=class extends zs{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:sh,endingEnd:sh}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case rh:r=e,o=2*t-i;break;case ah:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case rh:a=e,l=2*i-t;break;case ah:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}let c=(i-t)*.5,d=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*d,this._offsetNext=a*d}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this._offsetPrev,h=this._offsetNext,u=this._weightPrev,f=this._weightNext,m=(i-t)/(s-t),x=m*m,p=x*m,g=-u*p+2*u*x-u*m,T=(1+u)*p+(-1.5-2*u)*x+(-.5+u)*m+1,R=(-1-f)*p+(1.5+f)*x+.5*m,y=f*p-f*x;for(let M=0;M!==o;++M)r[M]=g*a[d+M]+T*a[c+M]+R*a[l+M]+y*a[h+M];return r}},Rc=class extends zs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=(i-t)/(s-t),h=1-d;for(let u=0;u!==o;++u)r[u]=a[c+u]*h+a[l+u]*d;return r}},Pc=class extends zs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Lc=class extends zs{interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,d=this.inTangents,h=this.outTangents;if(!d||!h){let m=(i-t)/(s-t),x=1-m;for(let p=0;p!==o;++p)r[p]=a[c+p]*x+a[l+p]*m;return r}let u=o*2,f=e-1;for(let m=0;m!==o;++m){let x=a[c+m],p=a[l+m],g=f*u+m*2,T=h[g],R=h[g+1],y=e*u+m*2,M=d[y],w=d[y+1],P=tx(i,t,T,M,s);r[m]=Gm(P,x,R,w,p)}return r}};function Gm(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function ex(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function tx(n,e,t,i,s){let r=(n-e)/(s-e);for(let a=0;a<8;a++){let o=Gm(r,e,t,i,s)-n;if(Math.abs(o)<1e-10)break;let l=ex(r,e,t,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Jn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Qr(t,this.TimeBufferType),this.values=Qr(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Qr(e.times,Array),values:Qr(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),eh(e.settings)&&(i.settings={inTangents:Qr(e.settings.inTangents,Array),outTangents:Qr(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Pc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Rc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Cc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Lc(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Eo:t=this.InterpolantFactoryMethodDiscrete;break;case vc:t=this.InterpolantFactoryMethodLinear;break;case uc:t=this.InterpolantFactoryMethodSmooth;break;case ih:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return ct("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Eo;case this.InterpolantFactoryMethodLinear:return vc;case this.InterpolantFactoryMethodSmooth:return uc;case this.InterpolantFactoryMethodBezier:return ih}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;eh(this.settings)&&(Kp(this.settings.inTangents,e),Kp(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(ut("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(ut("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){ut("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){ut("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&g_(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){ut("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===uc,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],d=e[o+1];if(c!==d&&(o!==1||c!==e[0]))if(s)l=!0;else{let h=o*i,u=h-i,f=h+i;for(let m=0;m!==i;++m){let x=t[h+m];if(x!==t[u+m]||x!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*i,u=a*i;for(let f=0;f!==i;++f)t[u+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,eh(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Kp(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}Jn.prototype.ValueTypeName="";Jn.prototype.TimeBufferType=Float32Array;Jn.prototype.ValueBufferType=Float32Array;Jn.prototype.DefaultInterpolation=vc;var Vs=class extends Jn{constructor(e,t,i){super(e,t,i)}};Vs.prototype.ValueTypeName="bool";Vs.prototype.ValueBufferType=Array;Vs.prototype.DefaultInterpolation=Eo;Vs.prototype.InterpolantFactoryMethodLinear=void 0;Vs.prototype.InterpolantFactoryMethodSmooth=void 0;var Ic=class extends Jn{constructor(e,t,i,s){super(e,t,i,s)}};Ic.prototype.ValueTypeName="color";var Nc=class extends Jn{constructor(e,t,i,s){super(e,t,i,s)}};Nc.prototype.ValueTypeName="number";var Dc=class extends zs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t),c=e*o;for(let d=c+o;c!==d;c+=4)oi.slerpFlat(r,0,a,c-o,a,c,l);return r}},Ho=class extends Jn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new Dc(this.times,this.values,this.getValueSize(),e)}};Ho.prototype.ValueTypeName="quaternion";Ho.prototype.InterpolantFactoryMethodSmooth=void 0;var Hs=class extends Jn{constructor(e,t,i){super(e,t,i)}};Hs.prototype.ValueTypeName="string";Hs.prototype.ValueBufferType=Array;Hs.prototype.DefaultInterpolation=Eo;Hs.prototype.InterpolantFactoryMethodLinear=void 0;Hs.prototype.InterpolantFactoryMethodSmooth=void 0;var Uc=class extends Jn{constructor(e,t,i,s){super(e,t,i,s)}};Uc.prototype.ValueTypeName="vector";var kc=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(d){o++,r===!1&&s.onStart!==void 0&&s.onStart(d,a,o),r=!0},this.itemEnd=function(d){a++,s.onProgress!==void 0&&s.onProgress(d,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(d){s.onError!==void 0&&s.onError(d)},this.resolveURL=function(d){return d=d.normalize("NFC"),l?l(d):d},this.setURLModifier=function(d){return l=d,this},this.addHandler=function(d,h){return c.push(d,h),this},this.removeHandler=function(d){let h=c.indexOf(d);return h!==-1&&c.splice(h,2),this},this.getHandler=function(d){for(let h=0,u=c.length;h<u;h+=2){let f=c[h],m=c[h+1];if(f.global&&(f.lastIndex=0),f.test(d))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Wm=new kc,Oc=class{constructor(e){this.manager=e!==void 0?e:Wm,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};Oc.DEFAULT_MATERIAL_NAME="__DEFAULT";var Go=class extends dn{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new lt(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var th=new Mt,Zp=new J,Qp=new J,Fc=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new at(512,512),this.mapType=rn,this.map=null,this.mapPass=null,this.matrix=new Mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new fa,this._frameExtents=new at(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;Zp.setFromMatrixPosition(e.matrixWorld),t.position.copy(Zp),Qp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Qp),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){th.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(th,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===aa||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(th)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},oc=new J,lc=new oi,Gi=new J,Wo=class extends dn{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Mt,this.projectionMatrix=new Mt,this.projectionMatrixInverse=new Mt,this.coordinateSystem=Ei,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(oc,lc,Gi),Gi.x===1&&Gi.y===1&&Gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oc,lc,Gi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(oc,lc,Gi),Gi.x===1&&Gi.y===1&&Gi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(oc,lc,Gi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},Us=new J,em=new at,tm=new at,En=class extends Wo{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=la*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Mo*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return la*2*Math.atan(Math.tan(Mo*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Us.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Us.x,Us.y).multiplyScalar(-e/Us.z),Us.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Us.x,Us.y).multiplyScalar(-e/Us.z)}getViewSize(e,t){return this.getViewBounds(e,em,tm),t.subVectors(tm,em)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Mo*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var ga=class extends Wo{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,d=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=d*this.view.offsetY,l=o-d*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},lh=class extends Fc{constructor(){super(new ga(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},jo=class extends Go{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(dn.DEFAULT_UP),this.updateMatrix(),this.target=new dn,this.shadow=new lh}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},Xo=class extends Go{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var qo=class extends Jt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var ea=-90,ta=1,Bc=class extends dn{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new En(ea,ta,e,t);s.layers=this.layers,this.add(s);let r=new En(ea,ta,e,t);r.layers=this.layers,this.add(r);let a=new En(ea,ta,e,t);a.layers=this.layers,this.add(a);let o=new En(ea,ta,e,t);o.layers=this.layers,this.add(o);let l=new En(ea,ta,e,t);l.layers=this.layers,this.add(l);let c=new En(ea,ta,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===Ei)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===aa)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,d]=this.children,h=e.getRenderTarget(),u=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,d),e.setRenderTarget(h,u,f),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},zc=class extends En{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Uh="\\[\\]\\.:\\/",nx=new RegExp("["+Uh+"]","g"),kh="[^"+Uh+"]",ix="[^"+Uh.replace("\\.","")+"]",sx=/((?:WC+[\/:])*)/.source.replace("WC",kh),rx=/(WCOD+)?/.source.replace("WCOD",ix),ax=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",kh),ox=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",kh),lx=new RegExp("^"+sx+rx+ax+ox+"$"),cx=["material","materials","bones","map"],ch=class{constructor(e,t,i){let s=i||Ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Ft=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(nx,"")}static parseTrackName(e){let t=lx.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);cx.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){ct("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){ut("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){ut("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){ut("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let d=0;d<e.length;d++)if(e[d].name===c){c=d;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){ut("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){ut("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){ut("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){ut("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;ut("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){ut("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){ut("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ft.Composite=ch;Ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ft.prototype.GetterByBindingType=[Ft.prototype._getValue_direct,Ft.prototype._getValue_array,Ft.prototype._getValue_arrayElement,Ft.prototype._getValue_toArray];Ft.prototype.SetterByBindingTypeAndVersioning=[[Ft.prototype._setValue_direct,Ft.prototype._setValue_direct_setNeedsUpdate,Ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_array,Ft.prototype._setValue_array_setNeedsUpdate,Ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_arrayElement,Ft.prototype._setValue_arrayElement_setNeedsUpdate,Ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_fromArray,Ft.prototype._setValue_fromArray_setNeedsUpdate,Ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var Jw=new Float32Array(1);var qi=class extends No{constructor(e,t,i=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var uh=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}},nm=new at,_a=class{constructor(e=new at(1/0,1/0),t=new at(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=nm.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,nm).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},im=new J,cc=new J,na=new J,ia=new J,nh=new J,ux=new J,dx=new J,$o=class{constructor(e=new J,t=new J){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){im.subVectors(e,this.start),cc.subVectors(this.end,this.start);let i=cc.dot(cc);if(i===0)return 0;let r=cc.dot(im)/i;return t&&(r=pt(r,0,1)),r}closestPointToPoint(e,t,i){let s=this.closestPointToPointParameter(e,t);return this.delta(i).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=ux,i=dx){let s=10000000000000001e-32,r,a,o=this.start,l=e.start,c=this.end,d=e.end;na.subVectors(c,o),ia.subVectors(d,l),nh.subVectors(o,l);let h=na.dot(na),u=ia.dot(ia),f=ia.dot(nh);if(h<=s&&u<=s)return t.copy(o),i.copy(l),t.sub(i),t.dot(t);if(h<=s)r=0,a=f/u,a=pt(a,0,1);else{let m=na.dot(nh);if(u<=s)a=0,r=pt(-m/h,0,1);else{let x=na.dot(ia),p=h*u-x*x;p!==0?r=pt((x*f-m*u)/p,0,1):r=0,a=(x*r+f)/u,a<0?(a=0,r=pt(-m/h,0,1)):a>1&&(a=1,r=pt((x-m)/h,0,1))}}return t.copy(o).addScaledVector(na,r),i.copy(l).addScaledVector(ia,a),t.distanceToSquared(i)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function Oh(n,e,t,i){let s=hx(i);switch(t){case Ch:return n*e;case _r:return n*e/s.components*s.byteLength;case $c:return n*e/s.components*s.byteLength;case Xs:return n*e*2/s.components*s.byteLength;case Yc:return n*e*2/s.components*s.byteLength;case Rh:return n*e*3/s.components*s.byteLength;case _n:return n*e*4/s.components*s.byteLength;case Jc:return n*e*4/s.components*s.byteLength;case Zo:case Qo:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case el:case tl:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Zc:case eu:return Math.max(n,16)*Math.max(e,8)/4;case Kc:case Qc:return Math.max(n,8)*Math.max(e,8)/2;case tu:case nu:case su:case ru:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case iu:case nl:case au:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case ou:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case lu:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case cu:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case uu:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case du:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case hu:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case fu:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case pu:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case mu:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case gu:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case _u:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case xu:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case yu:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case vu:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case bu:case Su:case Mu:return Math.ceil(n/4)*Math.ceil(e/4)*16;case wu:case Eu:return Math.ceil(n/4)*Math.ceil(e/4)*8;case il:case Tu:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function hx(n){switch(n){case rn:case wh:return{byteLength:1,components:1};case va:case Eh:case Li:return{byteLength:2,components:1};case Xc:case qc:return{byteLength:2,components:4};case Ri:case jc:case Pi:return{byteLength:4,components:1};case Th:case Ah:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?ct("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function hg(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function px(n){let e=new WeakMap;function t(o,l){let c=o.array,d=o.usage,h=c.byteLength,u=n.createBuffer();n.bindBuffer(l,u),n.bufferData(l,c,d),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:u,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){let d=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,d);else{h.sort((f,m)=>f.start-m.start);let u=0;for(let f=1;f<h.length;f++){let m=h[u],x=h[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++u,h[u]=x)}h.length=u+1;for(let f=0,m=h.length;f<m;f++){let x=h[f];n.bufferSubData(c,x.start*d.BYTES_PER_ELEMENT,d,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let d=e.get(o);(!d||d.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var mx=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,gx=`#ifdef USE_ALPHAHASH
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
#endif`,_x=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,xx=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,yx=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,vx=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,bx=`#ifdef USE_AOMAP
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
#endif`,Sx=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,Mx=`#ifdef USE_BATCHING
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
#endif`,wx=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,Ex=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,Tx=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ax=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Cx=`#ifdef USE_IRIDESCENCE
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
#endif`,Rx=`#ifdef USE_BUMPMAP
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
#endif`,Px=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Lx=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Ix=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Nx=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Dx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,Ux=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,kx=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,Ox=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,Fx=`#define PI 3.141592653589793
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
} // validated`,Bx=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,zx=`vec3 transformedNormal = objectNormal;
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
#endif`,Vx=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Hx=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gx=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Wx=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,jx="gl_FragColor = linearToOutputTexel( gl_FragColor );",Xx=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,qx=`#ifdef USE_ENVMAP
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
#endif`,$x=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,Yx=`#ifdef USE_ENVMAP
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
#endif`,Jx=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Kx=`#ifdef USE_ENVMAP
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
#endif`,Zx=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Qx=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,ey=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,ty=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,ny=`#ifdef USE_GRADIENTMAP
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
}`,iy=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,sy=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ry=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,ay=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,oy=`#ifdef USE_ENVMAP
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
#endif`,ly=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,cy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,uy=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,dy=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,hy=`PhysicalMaterial material;
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
#endif`,fy=`uniform sampler2D dfgLUT;
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
}`,py=`
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
#endif`,my=`#if defined( RE_IndirectDiffuse )
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
#endif`,gy=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,_y=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,xy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,yy=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,vy=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,by=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,Sy=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,My=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,wy=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,Ey=`#if defined( USE_POINTS_UV )
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
#endif`,Ty=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,Ay=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,Cy=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,Ry=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Py=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ly=`#ifdef USE_MORPHTARGETS
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
#endif`,Iy=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,Ny=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Dy=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Uy=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,ky=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Oy=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,Fy=`#ifdef USE_NORMALMAP
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
#endif`,By=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,zy=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Vy=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Hy=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Gy=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Wy=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,jy=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Xy=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,qy=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,$y=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Yy=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Jy=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Ky=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Zy=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Qy=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,ev=`float getShadowMask() {
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
}`,tv=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,nv=`#ifdef USE_SKINNING
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
#endif`,iv=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,sv=`#ifdef USE_SKINNING
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
#endif`,rv=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,av=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,ov=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,lv=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,cv=`#ifdef USE_TRANSMISSION
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
#endif`,uv=`#ifdef USE_TRANSMISSION
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
#endif`,dv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,fv=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,pv=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,mv=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,gv=`uniform sampler2D t2D;
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
}`,_v=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,xv=`#ifdef ENVMAP_TYPE_CUBE
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
}`,yv=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vv=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bv=`#include <common>
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
}`,Sv=`#if DEPTH_PACKING == 3200
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
}`,Mv=`#define DISTANCE
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
}`,wv=`#define DISTANCE
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
}`,Ev=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Tv=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,Av=`uniform float scale;
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
}`,Cv=`uniform vec3 diffuse;
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
}`,Rv=`#include <common>
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
}`,Pv=`uniform vec3 diffuse;
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
}`,Lv=`#define LAMBERT
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
}`,Iv=`#define LAMBERT
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
}`,Nv=`#define MATCAP
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
}`,Dv=`#define MATCAP
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
}`,Uv=`#define NORMAL
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
}`,kv=`#define NORMAL
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
}`,Ov=`#define PHONG
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
}`,Fv=`#define PHONG
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
}`,Bv=`#define STANDARD
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
}`,zv=`#define STANDARD
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
}`,Vv=`#define TOON
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
}`,Hv=`#define TOON
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
}`,Gv=`uniform float size;
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
}`,Wv=`uniform vec3 diffuse;
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
}`,jv=`#include <common>
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
}`,Xv=`uniform vec3 color;
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
}`,qv=`uniform float rotation;
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
}`,$v=`uniform vec3 diffuse;
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
}`,_t={alphahash_fragment:mx,alphahash_pars_fragment:gx,alphamap_fragment:_x,alphamap_pars_fragment:xx,alphatest_fragment:yx,alphatest_pars_fragment:vx,aomap_fragment:bx,aomap_pars_fragment:Sx,batching_pars_vertex:Mx,batching_vertex:wx,begin_vertex:Ex,beginnormal_vertex:Tx,bsdfs:Ax,iridescence_fragment:Cx,bumpmap_pars_fragment:Rx,clipping_planes_fragment:Px,clipping_planes_pars_fragment:Lx,clipping_planes_pars_vertex:Ix,clipping_planes_vertex:Nx,color_fragment:Dx,color_pars_fragment:Ux,color_pars_vertex:kx,color_vertex:Ox,common:Fx,cube_uv_reflection_fragment:Bx,defaultnormal_vertex:zx,displacementmap_pars_vertex:Vx,displacementmap_vertex:Hx,emissivemap_fragment:Gx,emissivemap_pars_fragment:Wx,colorspace_fragment:jx,colorspace_pars_fragment:Xx,envmap_fragment:qx,envmap_common_pars_fragment:$x,envmap_pars_fragment:Yx,envmap_pars_vertex:Jx,envmap_physical_pars_fragment:oy,envmap_vertex:Kx,fog_vertex:Zx,fog_pars_vertex:Qx,fog_fragment:ey,fog_pars_fragment:ty,gradientmap_pars_fragment:ny,lightmap_pars_fragment:iy,lights_lambert_fragment:sy,lights_lambert_pars_fragment:ry,lights_pars_begin:ay,lights_toon_fragment:ly,lights_toon_pars_fragment:cy,lights_phong_fragment:uy,lights_phong_pars_fragment:dy,lights_physical_fragment:hy,lights_physical_pars_fragment:fy,lights_fragment_begin:py,lights_fragment_maps:my,lights_fragment_end:gy,lightprobes_pars_fragment:_y,logdepthbuf_fragment:xy,logdepthbuf_pars_fragment:yy,logdepthbuf_pars_vertex:vy,logdepthbuf_vertex:by,map_fragment:Sy,map_pars_fragment:My,map_particle_fragment:wy,map_particle_pars_fragment:Ey,metalnessmap_fragment:Ty,metalnessmap_pars_fragment:Ay,morphinstance_vertex:Cy,morphcolor_vertex:Ry,morphnormal_vertex:Py,morphtarget_pars_vertex:Ly,morphtarget_vertex:Iy,normal_fragment_begin:Ny,normal_fragment_maps:Dy,normal_pars_fragment:Uy,normal_pars_vertex:ky,normal_vertex:Oy,normalmap_pars_fragment:Fy,clearcoat_normal_fragment_begin:By,clearcoat_normal_fragment_maps:zy,clearcoat_pars_fragment:Vy,iridescence_pars_fragment:Hy,opaque_fragment:Gy,packing:Wy,premultiplied_alpha_fragment:jy,project_vertex:Xy,dithering_fragment:qy,dithering_pars_fragment:$y,roughnessmap_fragment:Yy,roughnessmap_pars_fragment:Jy,shadowmap_pars_fragment:Ky,shadowmap_pars_vertex:Zy,shadowmap_vertex:Qy,shadowmask_pars_fragment:ev,skinbase_vertex:tv,skinning_pars_vertex:nv,skinning_vertex:iv,skinnormal_vertex:sv,specularmap_fragment:rv,specularmap_pars_fragment:av,tonemapping_fragment:ov,tonemapping_pars_fragment:lv,transmission_fragment:cv,transmission_pars_fragment:uv,uv_pars_fragment:dv,uv_pars_vertex:hv,uv_vertex:fv,worldpos_vertex:pv,background_vert:mv,background_frag:gv,backgroundCube_vert:_v,backgroundCube_frag:xv,cube_vert:yv,cube_frag:vv,depth_vert:bv,depth_frag:Sv,distance_vert:Mv,distance_frag:wv,equirect_vert:Ev,equirect_frag:Tv,linedashed_vert:Av,linedashed_frag:Cv,meshbasic_vert:Rv,meshbasic_frag:Pv,meshlambert_vert:Lv,meshlambert_frag:Iv,meshmatcap_vert:Nv,meshmatcap_frag:Dv,meshnormal_vert:Uv,meshnormal_frag:kv,meshphong_vert:Ov,meshphong_frag:Fv,meshphysical_vert:Bv,meshphysical_frag:zv,meshtoon_vert:Vv,meshtoon_frag:Hv,points_vert:Gv,points_frag:Wv,shadow_vert:jv,shadow_frag:Xv,sprite_vert:qv,sprite_frag:$v},ze={common:{diffuse:{value:new lt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new dt}},envmap:{envMap:{value:null},envMapRotation:{value:new dt},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new dt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new dt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new dt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new dt},normalScale:{value:new at(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new dt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new dt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new dt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new dt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new lt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new J},probesMax:{value:new J},probesResolution:{value:new J}},points:{diffuse:{value:new lt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0},uvTransform:{value:new dt}},sprite:{diffuse:{value:new lt(16777215)},opacity:{value:1},center:{value:new at(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new dt},alphaMap:{value:null},alphaMapTransform:{value:new dt},alphaTest:{value:0}}},Dn={basic:{uniforms:An([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.fog]),vertexShader:_t.meshbasic_vert,fragmentShader:_t.meshbasic_frag},lambert:{uniforms:An([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,ze.lights,{emissive:{value:new lt(0)},envMapIntensity:{value:1}}]),vertexShader:_t.meshlambert_vert,fragmentShader:_t.meshlambert_frag},phong:{uniforms:An([ze.common,ze.specularmap,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,ze.lights,{emissive:{value:new lt(0)},specular:{value:new lt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:_t.meshphong_vert,fragmentShader:_t.meshphong_frag},standard:{uniforms:An([ze.common,ze.envmap,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.roughnessmap,ze.metalnessmap,ze.fog,ze.lights,{emissive:{value:new lt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag},toon:{uniforms:An([ze.common,ze.aomap,ze.lightmap,ze.emissivemap,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.gradientmap,ze.fog,ze.lights,{emissive:{value:new lt(0)}}]),vertexShader:_t.meshtoon_vert,fragmentShader:_t.meshtoon_frag},matcap:{uniforms:An([ze.common,ze.bumpmap,ze.normalmap,ze.displacementmap,ze.fog,{matcap:{value:null}}]),vertexShader:_t.meshmatcap_vert,fragmentShader:_t.meshmatcap_frag},points:{uniforms:An([ze.points,ze.fog]),vertexShader:_t.points_vert,fragmentShader:_t.points_frag},dashed:{uniforms:An([ze.common,ze.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:_t.linedashed_vert,fragmentShader:_t.linedashed_frag},depth:{uniforms:An([ze.common,ze.displacementmap]),vertexShader:_t.depth_vert,fragmentShader:_t.depth_frag},normal:{uniforms:An([ze.common,ze.bumpmap,ze.normalmap,ze.displacementmap,{opacity:{value:1}}]),vertexShader:_t.meshnormal_vert,fragmentShader:_t.meshnormal_frag},sprite:{uniforms:An([ze.sprite,ze.fog]),vertexShader:_t.sprite_vert,fragmentShader:_t.sprite_frag},background:{uniforms:{uvTransform:{value:new dt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:_t.background_vert,fragmentShader:_t.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new dt}},vertexShader:_t.backgroundCube_vert,fragmentShader:_t.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:_t.cube_vert,fragmentShader:_t.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:_t.equirect_vert,fragmentShader:_t.equirect_frag},distance:{uniforms:An([ze.common,ze.displacementmap,{referencePosition:{value:new J},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:_t.distance_vert,fragmentShader:_t.distance_frag},shadow:{uniforms:An([ze.lights,ze.fog,{color:{value:new lt(0)},opacity:{value:1}}]),vertexShader:_t.shadow_vert,fragmentShader:_t.shadow_frag}};Dn.physical={uniforms:An([Dn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new dt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new dt},clearcoatNormalScale:{value:new at(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new dt},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new dt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new dt},sheen:{value:0},sheenColor:{value:new lt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new dt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new dt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new dt},transmissionSamplerSize:{value:new at},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new dt},attenuationDistance:{value:0},attenuationColor:{value:new lt(0)},specularColor:{value:new lt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new dt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new dt},anisotropyVector:{value:new at},anisotropyMap:{value:null},anisotropyMapTransform:{value:new dt}}]),vertexShader:_t.meshphysical_vert,fragmentShader:_t.meshphysical_frag};var Pu={r:0,b:0,g:0},Yv=new Mt,fg=new dt;fg.set(-1,0,0,0,1,0,0,0,1);function Jv(n,e,t,i,s,r){let a=new lt(0),o=s===!0?0:1,l,c,d=null,h=0,u=null;function f(T){let R=T.isScene===!0?T.background:null;if(R&&R.isTexture){let y=T.backgroundBlurriness>0;R=e.get(R,y)}return R}function m(T){let R=!1,y=f(T);y===null?p(a,o):y&&y.isColor&&(p(y,1),R=!0);let M=n.xr.getEnvironmentBlendMode();M==="additive"?t.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(T,R){let y=f(R);y&&(y.isCubeTexture||y.mapping===Jo)?(c===void 0&&(c=new jt(new ma(1,1,1),new Ot({name:"BackgroundCubeMaterial",uniforms:xr(Dn.backgroundCube.uniforms),vertexShader:Dn.backgroundCube.vertexShader,fragmentShader:Dn.backgroundCube.fragmentShader,side:xn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(M,w,P){this.matrixWorld.copyPosition(P.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=y,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Yv.makeRotationFromEuler(R.backgroundRotation)).transpose(),y.isCubeTexture&&y.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(fg),c.material.toneMapped=vt.getTransfer(y.colorSpace)!==Pt,(d!==y||h!==y.version||u!==n.toneMapping)&&(c.material.needsUpdate=!0,d=y,h=y.version,u=n.toneMapping),c.layers.enableAll(),T.unshift(c,c.geometry,c.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new jt(new Fo(2,2),new Ot({name:"BackgroundMaterial",uniforms:xr(Dn.background.uniforms),vertexShader:Dn.background.vertexShader,fragmentShader:Dn.background.fragmentShader,side:Gs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=vt.getTransfer(y.colorSpace)!==Pt,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||h!==y.version||u!==n.toneMapping)&&(l.material.needsUpdate=!0,d=y,h=y.version,u=n.toneMapping),l.layers.enableAll(),T.unshift(l,l.geometry,l.material,0,0,null))}function p(T,R){T.getRGB(Pu,Dh(n)),t.buffers.color.setClear(Pu.r,Pu.g,Pu.b,R,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(T,R=1){a.set(T),o=R,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(T){o=T,p(a,o)},render:m,addToRenderList:x,dispose:g}}function Kv(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=u(null),r=s,a=!1;function o(I,L,F,D,X){let ie=!1,W=h(I,D,F,L);r!==W&&(r=W,c(r.object)),ie=f(I,D,F,X),ie&&m(I,D,F,X),X!==null&&e.update(X,n.ELEMENT_ARRAY_BUFFER),(ie||a)&&(a=!1,y(I,L,F,D),X!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return n.createVertexArray()}function c(I){return n.bindVertexArray(I)}function d(I){return n.deleteVertexArray(I)}function h(I,L,F,D){let X=D.wireframe===!0,ie=i[L.id];ie===void 0&&(ie={},i[L.id]=ie);let W=I.isInstancedMesh===!0?I.id:0,ne=ie[W];ne===void 0&&(ne={},ie[W]=ne);let H=ne[F.id];H===void 0&&(H={},ne[F.id]=H);let re=H[X];return re===void 0&&(re=u(l()),H[X]=re),re}function u(I){let L=[],F=[],D=[];for(let X=0;X<t;X++)L[X]=0,F[X]=0,D[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:F,attributeDivisors:D,object:I,attributes:{},index:null}}function f(I,L,F,D){let X=r.attributes,ie=L.attributes,W=0,ne=F.getAttributes();for(let H in ne)if(ne[H].location>=0){let le=X[H],ae=ie[H];if(ae===void 0&&(H==="instanceMatrix"&&I.instanceMatrix&&(ae=I.instanceMatrix),H==="instanceColor"&&I.instanceColor&&(ae=I.instanceColor)),le===void 0||le.attribute!==ae||ae&&le.data!==ae.data)return!0;W++}return r.attributesNum!==W||r.index!==D}function m(I,L,F,D){let X={},ie=L.attributes,W=0,ne=F.getAttributes();for(let H in ne)if(ne[H].location>=0){let le=ie[H];le===void 0&&(H==="instanceMatrix"&&I.instanceMatrix&&(le=I.instanceMatrix),H==="instanceColor"&&I.instanceColor&&(le=I.instanceColor));let ae={};ae.attribute=le,le&&le.data&&(ae.data=le.data),X[H]=ae,W++}r.attributes=X,r.attributesNum=W,r.index=D}function x(){let I=r.newAttributes;for(let L=0,F=I.length;L<F;L++)I[L]=0}function p(I){g(I,0)}function g(I,L){let F=r.newAttributes,D=r.enabledAttributes,X=r.attributeDivisors;F[I]=1,D[I]===0&&(n.enableVertexAttribArray(I),D[I]=1),X[I]!==L&&(n.vertexAttribDivisor(I,L),X[I]=L)}function T(){let I=r.newAttributes,L=r.enabledAttributes;for(let F=0,D=L.length;F<D;F++)L[F]!==I[F]&&(n.disableVertexAttribArray(F),L[F]=0)}function R(I,L,F,D,X,ie,W){W===!0?n.vertexAttribIPointer(I,L,F,X,ie):n.vertexAttribPointer(I,L,F,D,X,ie)}function y(I,L,F,D){x();let X=D.attributes,ie=F.getAttributes(),W=L.defaultAttributeValues;for(let ne in ie){let H=ie[ne];if(H.location>=0){let re=X[ne];if(re===void 0&&(ne==="instanceMatrix"&&I.instanceMatrix&&(re=I.instanceMatrix),ne==="instanceColor"&&I.instanceColor&&(re=I.instanceColor)),re!==void 0){let le=re.normalized,ae=re.itemSize,me=e.get(re);if(me===void 0)continue;let Ne=me.buffer,Le=me.type,De=me.bytesPerElement,j=Le===n.INT||Le===n.UNSIGNED_INT||re.gpuType===jc;if(re.isInterleavedBufferAttribute){let Q=re.data,ye=Q.stride,Se=re.offset;if(Q.isInstancedInterleavedBuffer){for(let ve=0;ve<H.locationSize;ve++)g(H.location+ve,Q.meshPerAttribute);I.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let ve=0;ve<H.locationSize;ve++)p(H.location+ve);n.bindBuffer(n.ARRAY_BUFFER,Ne);for(let ve=0;ve<H.locationSize;ve++)R(H.location+ve,ae/H.locationSize,Le,le,ye*De,(Se+ae/H.locationSize*ve)*De,j)}else{if(re.isInstancedBufferAttribute){for(let Q=0;Q<H.locationSize;Q++)g(H.location+Q,re.meshPerAttribute);I.isInstancedMesh!==!0&&D._maxInstanceCount===void 0&&(D._maxInstanceCount=re.meshPerAttribute*re.count)}else for(let Q=0;Q<H.locationSize;Q++)p(H.location+Q);n.bindBuffer(n.ARRAY_BUFFER,Ne);for(let Q=0;Q<H.locationSize;Q++)R(H.location+Q,ae/H.locationSize,Le,le,ae*De,ae/H.locationSize*Q*De,j)}}else if(W!==void 0){let le=W[ne];if(le!==void 0)switch(le.length){case 2:n.vertexAttrib2fv(H.location,le);break;case 3:n.vertexAttrib3fv(H.location,le);break;case 4:n.vertexAttrib4fv(H.location,le);break;default:n.vertexAttrib1fv(H.location,le)}}}}T()}function M(){A();for(let I in i){let L=i[I];for(let F in L){let D=L[F];for(let X in D){let ie=D[X];for(let W in ie)d(ie[W].object),delete ie[W];delete D[X]}}delete i[I]}}function w(I){if(i[I.id]===void 0)return;let L=i[I.id];for(let F in L){let D=L[F];for(let X in D){let ie=D[X];for(let W in ie)d(ie[W].object),delete ie[W];delete D[X]}}delete i[I.id]}function P(I){for(let L in i){let F=i[L];for(let D in F){let X=F[D];if(X[I.id]===void 0)continue;let ie=X[I.id];for(let W in ie)d(ie[W].object),delete ie[W];delete X[I.id]}}}function v(I){for(let L in i){let F=i[L],D=I.isInstancedMesh===!0?I.id:0,X=F[D];if(X!==void 0){for(let ie in X){let W=X[ie];for(let ne in W)d(W[ne].object),delete W[ne];delete X[ie]}delete F[D],Object.keys(F).length===0&&delete i[L]}}}function A(){U(),a=!0,r!==s&&(r=s,c(r.object))}function U(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:A,resetDefaultState:U,dispose:M,releaseStatesOfGeometry:w,releaseStatesOfObject:v,releaseStatesOfProgram:P,initAttributes:x,enableAttribute:p,disableUnusedAttributes:T}}function Zv(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,d){d!==0&&(n.drawArraysInstanced(i,l,c,d),t.update(c,i,d))}function o(l,c,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,d);let u=0;for(let f=0;f<d;f++)u+=c[f];t.update(u,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Qv(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let P=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(P.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(P){return!(P!==_n&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(P){let v=P===Li&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(P!==rn&&P!==Pi&&!v&&i.convert(P)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(P){if(P==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";P="mediump"}return P==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",d=l(c);d!==c&&(ct("WebGLRenderer:",c,"not supported, using",d,"instead."),c=d);let h=t.logarithmicDepthBuffer===!0,u=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&u===!1&&ct("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),R=n.getParameter(n.MAX_VARYING_VECTORS),y=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),M=n.getParameter(n.MAX_SAMPLES),w=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:u,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:T,maxVaryings:R,maxFragmentUniforms:y,maxSamples:M,samples:w}}function eb(n){let e=this,t=null,i=0,s=!1,r=!1,a=new Mi,o=new dt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let f=h.length!==0||u||i!==0||s;return s=u,i=h.length,f},this.beginShadows=function(){r=!0,d(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,u){t=d(h,u,0)},this.setState=function(h,u,f){let m=h.clippingPlanes,x=h.clipIntersection,p=h.clipShadows,g=n.get(h);if(!s||m===null||m.length===0||r&&!p)r?d(null):c();else{let T=r?0:i,R=T*4,y=g.clippingState||null;l.value=y,y=d(m,u,R,f);for(let M=0;M!==R;++M)y[M]=t[M];g.clippingState=y,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function d(h,u,f,m){let x=h!==null?h.length:0,p=null;if(x!==0){if(p=l.value,m!==!0||p===null){let g=f+x*4,T=u.matrixWorldInverse;o.getNormalMatrix(T),(p===null||p.length<g)&&(p=new Float32Array(g));for(let R=0,y=f;R!==x;++R,y+=4)a.copy(h[R]).applyMatrix4(T,o),a.normal.toArray(p,y),p[y+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}var Ma=4,tb=6,nb=20,ib=256,rl=new ga,jm=new lt,Fh=null,Bh=0,zh=0,Vh=!1,sb=new J,yr=new J,Iu=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=sb}=r;Fh=this._renderer.getRenderTarget(),Bh=this._renderer.getActiveCubeFace(),zh=this._renderer.getActiveMipmapLevel(),Vh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=$m(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qm(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Fh,Bh,zh),this._renderer.xr.enabled=Vh,e.scissorTest=!1,Sa(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ws||e.mapping===gr?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Fh=this._renderer.getRenderTarget(),Bh=this._renderer.getActiveCubeFace(),zh=this._renderer.getActiveMipmapLevel(),Vh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Dt,minFilter:Dt,generateMipmaps:!1,type:Li,format:_n,colorSpace:To,depthBuffer:!1},s=Xm(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xm(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=rb(r)),this._blurMaterial=ob(r,e,t),this._ggxMaterial=ab(r,e,t)}return s}_compileMaterial(e){let t=new jt(new Jt,e);this._renderer.compile(t,rl)}_sceneToCubeUV(e,t,i,s,r){let l=new En(90,1,t,i),c=[1,-1,1,1,1,1],d=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,f=h.toneMapping;h.getClearColor(jm),h.toneMapping=Ci,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new jt(new ma,new Os({name:"PMREM.Background",side:xn,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,p=x.material,g=!1,T=e.background;T?T.isColor&&(p.color.copy(T),e.background=null,g=!0):(p.color.copy(jm),g=!0);for(let R=0;R<6;R++){let y=R%3;y===0?(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+d[R],r.y,r.z)):y===1?(l.up.set(0,0,c[R]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+d[R],r.z)):(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+d[R]));let M=this._cubeSize;Sa(s,y*M,R>2?M:0,M,M),h.setRenderTarget(s),g&&h.render(x,l),h.render(e,l)}h.toneMapping=f,h.autoClear=u,e.background=T}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===Ws||e.mapping===gr;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=$m()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qm());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;Sa(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,rl)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),d=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-d*d),u=c*1.25,f=h*u,{_lodMax:m}=this,x=this._sizeLods[i],p=3*x*(i>m-Ma?i-m+Ma:0),g=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,Sa(r,p,g,3*x,2*x),s.setRenderTarget(r),s.render(o,rl),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-i,Sa(e,p,g,3*x,2*x),s.setRenderTarget(e),s.render(o,rl)}_blur(e,t,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let d=this._sizeLods[s],h=3*d*(s>this._lodMax-Ma?s-this._lodMax+Ma:0),u=4*(this._cubeSize-d);Sa(t,h,u,3*d,2*d),a.setRenderTarget(t),a.render(l,rl)}};function rb(n){let e=[],t=[],i=n,s=n-Ma+1+tb;for(let r=0;r<s;r++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),l=-o,c=1+o,d=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,u=6,f=3,m=new Float32Array(f*u*h),x=new Float32Array(f*u*h);for(let g=0;g<h;g++){let T=g%3*2/3-1,R=g>2?0:-1,y=[T,R,0,T+2/3,R,0,T+2/3,R+1,0,T,R,0,T+2/3,R+1,0,T,R+1,0];m.set(y,f*u*g);for(let M=0;M<u;M++){let w=d[M*2]*2-1,P=d[M*2+1]*2-1;g===0?yr.set(1,P,w):g===1?yr.set(-w,1,-P):g===2?yr.set(-w,P,1):g===3?yr.set(-1,P,-w):g===4?yr.set(-w,-1,P):yr.set(w,P,-1),yr.toArray(x,(g*u+M)*f)}}let p=new Jt;p.setAttribute("position",new nn(m,f)),p.setAttribute("outputDirection",new nn(x,f)),t.push(new jt(p,null)),i>Ma&&i--}return{lodMeshes:t,sizeLods:e}}function Xm(n,e,t){let i=new Vn(n,e,t);return i.texture.mapping=Jo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function Sa(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function ab(n,e,t){return new Ot({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:ib,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:Uu(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function ob(n,e,t){return new Ot({name:"SphericalGaussianBlur",defines:{SAMPLES:nb,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:Uu(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function qm(){return new Ot({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Uu(),fragmentShader:`

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
		`,blending:$i,depthTest:!1,depthWrite:!1})}function $m(){return new Ot({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Uu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$i,depthTest:!1,depthWrite:!1})}function Uu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Nu=class extends Vn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new ko(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new ma(5,5,5),r=new Ot({name:"CubemapFromEquirect",uniforms:xr(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:xn,blending:$i});r.uniforms.tEquirect.value=t;let a=new jt(s,r),o=t.minFilter;return t.minFilter===Kn&&(t.minFilter=Dt),new Bc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}};function lb(n){let e=new WeakMap,t=new WeakMap,i=null;function s(u,f=!1){return u==null?null:f?a(u):r(u)}function r(u){if(u&&u.isTexture){let f=u.mapping;if(f===Hc||f===Gc)if(e.has(u)){let m=e.get(u).texture;return o(m,u.mapping)}else{let m=u.image;if(m&&m.height>0){let x=new Nu(m.height);return x.fromEquirectangularTexture(n,u),e.set(u,x),u.addEventListener("dispose",c),o(x.texture,u.mapping)}else return null}}return u}function a(u){if(u&&u.isTexture){let f=u.mapping,m=f===Hc||f===Gc,x=f===Ws||f===gr;if(m||x){let p=t.get(u),g=p!==void 0?p.texture.pmremVersion:0;if(u.isRenderTargetTexture&&u.pmremVersion!==g)return i===null&&(i=new Iu(n)),p=m?i.fromEquirectangular(u,p):i.fromCubemap(u,p),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),p.texture;if(p!==void 0)return p.texture;{let T=u.image;return m&&T&&T.height>0||x&&T&&l(T)?(i===null&&(i=new Iu(n)),p=m?i.fromEquirectangular(u):i.fromCubemap(u),p.texture.pmremVersion=u.pmremVersion,t.set(u,p),u.addEventListener("dispose",d),p.texture):null}}}return u}function o(u,f){return f===Hc?u.mapping=Ws:f===Gc&&(u.mapping=gr),u}function l(u){let f=0,m=6;for(let x=0;x<m;x++)u[x]!==void 0&&f++;return f===m}function c(u){let f=u.target;f.removeEventListener("dispose",c);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function d(u){let f=u.target;f.removeEventListener("dispose",d);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function cb(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&hr("WebGLRenderer: "+i+" extension not supported."),s}}}function ub(n,e,t,i){let s={},r=new WeakMap;function a(h){let u=h.target;u.index!==null&&e.remove(u.index);for(let m in u.attributes)e.remove(u.attributes[m]);u.removeEventListener("dispose",a),delete s[u.id];let f=r.get(u);f&&(e.remove(f),r.delete(u)),i.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,t.memory.geometries--}function o(h,u){return s[u.id]===!0||(u.addEventListener("dispose",a),s[u.id]=!0,t.memory.geometries++),u}function l(h){let u=h.attributes;for(let f in u)e.update(u[f],n.ARRAY_BUFFER)}function c(h){let u=[],f=h.index,m=h.attributes.position,x=0;if(m===void 0)return;if(f!==null){let T=f.array;x=f.version;for(let R=0,y=T.length;R<y;R+=3){let M=T[R+0],w=T[R+1],P=T[R+2];u.push(M,w,w,P,P,M)}}else{let T=m.array;x=m.version;for(let R=0,y=T.length/3-1;R<y;R+=3){let M=R+0,w=R+1,P=R+2;u.push(M,w,w,P,P,M)}}let p=new(m.count>=65535?Io:Lo)(u,1);p.version=x;let g=r.get(h);g&&e.remove(g),r.set(h,p)}function d(h){let u=r.get(h);if(u){let f=h.index;f!==null&&u.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:d}}function db(n,e,t){let i;function s(h){i=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,u){n.drawElements(i,u,r,h*a),t.update(u,i,1)}function c(h,u,f){f!==0&&(n.drawElementsInstanced(i,u,r,h*a,f),t.update(u,i,f))}function d(h,u,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,u,0,r,h,0,f);let x=0;for(let p=0;p<f;p++)x+=u[p];t.update(x,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=d}function hb(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:ut("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function fb(n,e,t){let i=new WeakMap,s=new yt;function r(a,o,l){let c=a.morphTargetInfluences,d=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=d!==void 0?d.length:0,u=i.get(o);if(u===void 0||u.count!==h){let A=function(){P.dispose(),i.delete(o),o.removeEventListener("dispose",A)};u!==void 0&&u.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],T=o.morphAttributes.color||[],R=0;f===!0&&(R=1),m===!0&&(R=2),x===!0&&(R=3);let y=o.attributes.position.count*R,M=1;y>e.maxTextureSize&&(M=Math.ceil(y/e.maxTextureSize),y=e.maxTextureSize);let w=new Float32Array(y*M*4*h),P=new fr(w,y,M,h);P.type=Pi,P.needsUpdate=!0;let v=R*4;for(let U=0;U<h;U++){let I=p[U],L=g[U],F=T[U],D=y*M*4*U;for(let X=0;X<I.count;X++){let ie=X*v;f===!0&&(s.fromBufferAttribute(I,X),w[D+ie+0]=s.x,w[D+ie+1]=s.y,w[D+ie+2]=s.z,w[D+ie+3]=0),m===!0&&(s.fromBufferAttribute(L,X),w[D+ie+4]=s.x,w[D+ie+5]=s.y,w[D+ie+6]=s.z,w[D+ie+7]=0),x===!0&&(s.fromBufferAttribute(F,X),w[D+ie+8]=s.x,w[D+ie+9]=s.y,w[D+ie+10]=s.z,w[D+ie+11]=F.itemSize===4?s.w:1)}}u={count:h,texture:P,size:new at(y,M)},i.set(o,u),o.addEventListener("dispose",A)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",u.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",u.size)}return{update:r}}function pb(n,e,t,i,s){let r=new WeakMap;function a(c){let d=s.render.frame,h=c.geometry,u=e.get(c,h);if(r.get(u)!==d&&(e.update(u),r.set(u,d)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==d&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,d))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==d&&(f.update(),r.set(f,d))}return u}function o(){r=new WeakMap}function l(c){let d=c.target;d.removeEventListener("dispose",l),i.releaseStatesOfObject(d),t.remove(d.instanceMatrix),d.instanceColor!==null&&t.remove(d.instanceColor)}return{update:a,dispose:o}}var mb={[gh]:"LINEAR_TONE_MAPPING",[_h]:"REINHARD_TONE_MAPPING",[xh]:"CINEON_TONE_MAPPING",[yh]:"ACES_FILMIC_TONE_MAPPING",[bh]:"AGX_TONE_MAPPING",[Sh]:"NEUTRAL_TONE_MAPPING",[vh]:"CUSTOM_TONE_MAPPING"};function gb(n,e,t,i,s,r){let a=new Vn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Jt;c.setAttribute("position",new Wt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new Wt([0,2,0,0,2,0],2));let d=new Ec({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new jt(c,d),u=new ga(-1,1,1,-1,0,1),f=null,m=null,x=!1,p,g=null,T=[],R=!1;this.setSize=function(y,M){a.setSize(y,M),o!==null&&o.setSize(y,M),l!==null&&l.setSize(y,M);for(let w=0;w<T.length;w++){let P=T[w];P.setSize&&P.setSize(y,M)}},this.setEffects=function(y){T=y,R=T.length>0&&T[0].isRenderPass===!0;let M=a.width,w=a.height;T.length>0&&o===null&&(o=new Vn(M,w,{type:Li,depthBuffer:!1,stencilBuffer:!1}),l=new Vn(M,w,{type:Li,depthBuffer:!1,stencilBuffer:!1}));for(let P=0;P<T.length;P++){let v=T[P];v.setSize&&v.setSize(M,w)}},this.begin=function(y,M){if(x||y.toneMapping===Ci&&T.length===0)return!1;if(g=M,M!==null){let w=M.width,P=M.height;(a.width!==w||a.height!==P)&&this.setSize(w,P)}return R===!1&&y.setRenderTarget(a),p=y.toneMapping,y.toneMapping=Ci,!0},this.hasRenderPass=function(){return R},this.end=function(y,M){y.toneMapping=p,x=!0;let w=a,P=o;for(let v=0;v<T.length;v++){let A=T[v];A.enabled!==!1&&(A.render(y,P,w,M),A.needsSwap!==!1&&(w=P,P=P===o?l:o))}if(f!==y.outputColorSpace||m!==y.toneMapping){f=y.outputColorSpace,m=y.toneMapping,d.defines={},vt.getTransfer(f)===Pt&&(d.defines.SRGB_TRANSFER="");let v=mb[m];v&&(d.defines[v]=""),d.needsUpdate=!0}d.uniforms.tDiffuse.value=w.texture,y.setRenderTarget(g),y.render(h,u),g=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),d.dispose()}}var pg=new Yt,Wh=new Bs(1,1),mg=new fr,gg=new Mc,_g=new ko,Ym=[],Jm=[],Km=new Float32Array(16),Zm=new Float32Array(9),Qm=new Float32Array(4);function Ea(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=Ym[s];if(r===void 0&&(r=new Float32Array(s),Ym[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function hn(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function fn(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function ku(n,e){let t=Jm[e];t===void 0&&(t=new Int32Array(e),Jm[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function _b(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function xb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;n.uniform2fv(this.addr,e),fn(t,e)}}function yb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(hn(t,e))return;n.uniform3fv(this.addr,e),fn(t,e)}}function vb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;n.uniform4fv(this.addr,e),fn(t,e)}}function bb(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(hn(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),fn(t,e)}else{if(hn(t,i))return;Qm.set(i),n.uniformMatrix2fv(this.addr,!1,Qm),fn(t,i)}}function Sb(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(hn(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),fn(t,e)}else{if(hn(t,i))return;Zm.set(i),n.uniformMatrix3fv(this.addr,!1,Zm),fn(t,i)}}function Mb(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(hn(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),fn(t,e)}else{if(hn(t,i))return;Km.set(i),n.uniformMatrix4fv(this.addr,!1,Km),fn(t,i)}}function wb(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function Eb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;n.uniform2iv(this.addr,e),fn(t,e)}}function Tb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;n.uniform3iv(this.addr,e),fn(t,e)}}function Ab(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;n.uniform4iv(this.addr,e),fn(t,e)}}function Cb(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function Rb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(hn(t,e))return;n.uniform2uiv(this.addr,e),fn(t,e)}}function Pb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(hn(t,e))return;n.uniform3uiv(this.addr,e),fn(t,e)}}function Lb(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(hn(t,e))return;n.uniform4uiv(this.addr,e),fn(t,e)}}function Ib(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(Wh.compareFunction=t.isReversedDepthBuffer()?Ru:Cu,r=Wh):r=pg,t.setTexture2D(e||r,s)}function Nb(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||gg,s)}function Db(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||_g,s)}function Ub(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||mg,s)}function kb(n){switch(n){case 5126:return _b;case 35664:return xb;case 35665:return yb;case 35666:return vb;case 35674:return bb;case 35675:return Sb;case 35676:return Mb;case 5124:case 35670:return wb;case 35667:case 35671:return Eb;case 35668:case 35672:return Tb;case 35669:case 35673:return Ab;case 5125:return Cb;case 36294:return Rb;case 36295:return Pb;case 36296:return Lb;case 35678:case 36198:case 36298:case 36306:case 35682:return Ib;case 35679:case 36299:case 36307:return Nb;case 35680:case 36300:case 36308:case 36293:return Db;case 36289:case 36303:case 36311:case 36292:return Ub}}function Ob(n,e){n.uniform1fv(this.addr,e)}function Fb(n,e){let t=Ea(e,this.size,2);n.uniform2fv(this.addr,t)}function Bb(n,e){let t=Ea(e,this.size,3);n.uniform3fv(this.addr,t)}function zb(n,e){let t=Ea(e,this.size,4);n.uniform4fv(this.addr,t)}function Vb(n,e){let t=Ea(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function Hb(n,e){let t=Ea(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Gb(n,e){let t=Ea(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Wb(n,e){n.uniform1iv(this.addr,e)}function jb(n,e){n.uniform2iv(this.addr,e)}function Xb(n,e){n.uniform3iv(this.addr,e)}function qb(n,e){n.uniform4iv(this.addr,e)}function $b(n,e){n.uniform1uiv(this.addr,e)}function Yb(n,e){n.uniform2uiv(this.addr,e)}function Jb(n,e){n.uniform3uiv(this.addr,e)}function Kb(n,e){n.uniform4uiv(this.addr,e)}function Zb(n,e,t){let i=this.cache,s=e.length,r=ku(t,s);hn(i,r)||(n.uniform1iv(this.addr,r),fn(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=Wh:a=pg;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Qb(n,e,t){let i=this.cache,s=e.length,r=ku(t,s);hn(i,r)||(n.uniform1iv(this.addr,r),fn(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||gg,r[a])}function eS(n,e,t){let i=this.cache,s=e.length,r=ku(t,s);hn(i,r)||(n.uniform1iv(this.addr,r),fn(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||_g,r[a])}function tS(n,e,t){let i=this.cache,s=e.length,r=ku(t,s);hn(i,r)||(n.uniform1iv(this.addr,r),fn(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||mg,r[a])}function nS(n){switch(n){case 5126:return Ob;case 35664:return Fb;case 35665:return Bb;case 35666:return zb;case 35674:return Vb;case 35675:return Hb;case 35676:return Gb;case 5124:case 35670:return Wb;case 35667:case 35671:return jb;case 35668:case 35672:return Xb;case 35669:case 35673:return qb;case 5125:return $b;case 36294:return Yb;case 36295:return Jb;case 36296:return Kb;case 35678:case 36198:case 36298:case 36306:case 35682:return Zb;case 35679:case 36299:case 36307:return Qb;case 35680:case 36300:case 36308:case 36293:return eS;case 36289:case 36303:case 36311:case 36292:return tS}}var jh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=kb(t.type)}},Xh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=nS(t.type)}},qh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},Hh=/(\w+)(\])?(\[|\.)?/g;function eg(n,e){n.seq.push(e),n.map[e.id]=e}function iS(n,e,t){let i=n.name,s=i.length;for(Hh.lastIndex=0;;){let r=Hh.exec(i),a=Hh.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){eg(t,c===void 0?new jh(o,n,e):new Xh(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new qh(o),eg(t,h)),t=h}}}var wa=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);iS(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function tg(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var sS=37297,rS=0;function aS(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var ng=new dt;function oS(n){vt._getMatrix(ng,vt.workingColorSpace,n);let e=`mat3( ${ng.elements.map(t=>t.toFixed(4))} )`;switch(vt.getTransfer(n)){case Ao:return[e,"LinearTransferOETF"];case Pt:return[e,"sRGBTransferOETF"];default:return ct("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function ig(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+aS(n.getShaderSource(e),o)}else return r}function lS(n,e){let t=oS(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var cS={[gh]:"Linear",[_h]:"Reinhard",[xh]:"Cineon",[yh]:"ACESFilmic",[bh]:"AgX",[Sh]:"Neutral",[vh]:"Custom"};function uS(n,e){let t=cS[e];return t===void 0?(ct("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Lu=new J;function dS(){vt.getLuminanceCoefficients(Lu);let n=Lu.x.toFixed(4),e=Lu.y.toFixed(4),t=Lu.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function hS(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ol).join(`
`)}function fS(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function pS(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function ol(n){return n!==""}function sg(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function rg(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var mS=/^[ \t]*#include +<([\w\d./]+)>/gm;function $h(n){return n.replace(mS,_S)}var gS=new Map;function _S(n,e){let t=_t[e];if(t===void 0){let i=gS.get(e);if(i!==void 0)t=_t[i],ct('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return $h(t)}var xS=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function ag(n){return n.replace(xS,yS)}function yS(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function og(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var vS={[Yo]:"SHADOWMAP_TYPE_PCF",[xa]:"SHADOWMAP_TYPE_VSM"};function bS(n){return vS[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var SS={[Ws]:"ENVMAP_TYPE_CUBE",[gr]:"ENVMAP_TYPE_CUBE",[Jo]:"ENVMAP_TYPE_CUBE_UV"};function MS(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":SS[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var wS={[gr]:"ENVMAP_MODE_REFRACTION"};function ES(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":wS[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var TS={[Vc]:"ENVMAP_BLENDING_MULTIPLY",[Em]:"ENVMAP_BLENDING_MIX",[Tm]:"ENVMAP_BLENDING_ADD"};function AS(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":TS[n.combine]||"ENVMAP_BLENDING_NONE"}function CS(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function RS(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=bS(t),c=MS(t),d=ES(t),h=AS(t),u=CS(t),f=hS(t),m=fS(r),x=s.createProgram(),p,g,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ol).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(ol).join(`
`),g.length>0&&(g+=`
`)):(p=[og(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+d:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ol).join(`
`),g=[og(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+d:"",t.envMap?"#define "+h:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Ci?"#define TONE_MAPPING":"",t.toneMapping!==Ci?_t.tonemapping_pars_fragment:"",t.toneMapping!==Ci?uS("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",_t.colorspace_pars_fragment,lS("linearToOutputTexel",t.outputColorSpace),dS(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(ol).join(`
`)),a=$h(a),a=sg(a,t),a=rg(a,t),o=$h(o),o=sg(o,t),o=rg(o,t),a=ag(a),o=ag(o),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",t.glslVersion===Lh?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Lh?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let R=T+p+a,y=T+g+o,M=tg(s,s.VERTEX_SHADER,R),w=tg(s,s.FRAGMENT_SHADER,y);s.attachShader(x,M),s.attachShader(x,w),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function P(I){if(n.debug.checkShaderErrors){let L=s.getProgramInfoLog(x)||"",F=s.getShaderInfoLog(M)||"",D=s.getShaderInfoLog(w)||"",X=L.trim(),ie=F.trim(),W=D.trim(),ne=!0,H=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(ne=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,M,w);else{let re=ig(s,M,"vertex"),le=ig(s,w,"fragment");ut("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+X+`
`+re+`
`+le)}else X!==""?ct("WebGLProgram: Program Info Log:",X):(ie===""||W==="")&&(H=!1);H&&(I.diagnostics={runnable:ne,programLog:X,vertexShader:{log:ie,prefix:p},fragmentShader:{log:W,prefix:g}})}s.deleteShader(M),s.deleteShader(w),v=new wa(s,x),A=pS(s,x)}let v;this.getUniforms=function(){return v===void 0&&P(this),v};let A;this.getAttributes=function(){return A===void 0&&P(this),A};let U=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=s.getProgramParameter(x,sS)),U},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=rS++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=M,this.fragmentShader=w,this}var PS=0,Yh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Jh(e),t.set(e,i)),i}},Jh=class{constructor(e){this.id=PS++,this.code=e,this.usedTimes=0}};function LS(n){return n===Xs||n===nl||n===il}function IS(n,e,t,i,s,r){let a=new Po,o=new Yh,l=new Set,c=[],d=new Map,h=i.logarithmicDepthBuffer,u=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(v){return l.add(v),v===0?"uv":`uv${v}`}function x(v,A,U,I,L,F){let D=I.fog,X=L.geometry,ie=v.isMeshStandardMaterial||v.isMeshLambertMaterial||v.isMeshPhongMaterial?I.environment:null,W=v.isMeshStandardMaterial||v.isMeshLambertMaterial&&!v.envMap||v.isMeshPhongMaterial&&!v.envMap,ne=e.get(v.envMap||ie,W),H=ne&&ne.mapping===Jo?ne.image.height:null,re=f[v.type];v.precision!==null&&(u=i.getMaxPrecision(v.precision),u!==v.precision&&ct("WebGLProgram.getParameters:",v.precision,"not supported, using",u,"instead."));let le=X.morphAttributes.position||X.morphAttributes.normal||X.morphAttributes.color,ae=le!==void 0?le.length:0,me=0;X.morphAttributes.position!==void 0&&(me=1),X.morphAttributes.normal!==void 0&&(me=2),X.morphAttributes.color!==void 0&&(me=3);let Ne,Le,De,j;if(re){let ft=Dn[re];Ne=ft.vertexShader,Le=ft.fragmentShader}else{Ne=v.vertexShader,Le=v.fragmentShader;let ft=o.getVertexShaderStage(v),gt=o.getFragmentShaderStage(v);o.update(v,ft,gt),De=ft.id,j=gt.id}let Q=n.getRenderTarget(),ye=n.state.buffers.depth.getReversed(),Se=L.isInstancedMesh===!0,ve=L.isBatchedMesh===!0,je=!!v.map,Ke=!!v.matcap,ke=!!ne,Xe=!!v.aoMap,ot=!!v.lightMap,it=!!v.bumpMap&&v.wireframe===!1,qe=!!v.normalMap,ue=!!v.displacementMap,Re=!!v.emissiveMap,We=!!v.metalnessMap,Be=!!v.roughnessMap,G=v.anisotropy>0,de=v.clearcoat>0,Ae=v.dispersion>0,b=v.retroreflectivity>0,_=v.iridescence>0,O=v.sheen>0,z=v.transmission>0,se=G&&!!v.anisotropyMap,_e=de&&!!v.clearcoatMap,be=de&&!!v.clearcoatNormalMap,ce=de&&!!v.clearcoatRoughnessMap,fe=_&&!!v.iridescenceMap,Ce=_&&!!v.iridescenceThicknessMap,$e=O&&!!v.sheenColorMap,Ue=O&&!!v.sheenRoughnessMap,Oe=!!v.specularMap,Qe=!!v.specularColorMap,et=!!v.specularIntensityMap,st=z&&!!v.transmissionMap,Y=z&&!!v.thicknessMap,we=!!v.gradientMap,he=!!v.alphaMap,Ee=v.alphaTest>0,Ie=!!v.alphaHash,ge=!!v.extensions,Ye=Ci;v.toneMapped&&(Q===null||Q.isXRRenderTarget===!0)&&(Ye=n.toneMapping);let Ve={shaderID:re,shaderType:v.type,shaderName:v.name,vertexShader:Ne,fragmentShader:Le,defines:v.defines,customVertexShaderID:De,customFragmentShaderID:j,isRawShaderMaterial:v.isRawShaderMaterial===!0,glslVersion:v.glslVersion,precision:u,batching:ve,batchingColor:ve&&L._colorsTexture!==null,instancing:Se,instancingColor:Se&&L.instanceColor!==null,instancingMorph:Se&&L.morphTexture!==null,outputColorSpace:Q===null?n.outputColorSpace:Q.isXRRenderTarget===!0?Q.texture.colorSpace:vt.workingColorSpace,alphaToCoverage:!!v.alphaToCoverage,map:je,matcap:Ke,envMap:ke,envMapMode:ke&&ne.mapping,envMapCubeUVHeight:H,aoMap:Xe,lightMap:ot,bumpMap:it,normalMap:qe,displacementMap:ue,emissiveMap:Re,normalMapObjectSpace:qe&&v.normalMapType===Rm,normalMapTangentSpace:qe&&v.normalMapType===Au,packedNormalMap:qe&&v.normalMapType===Au&&LS(v.normalMap.format),metalnessMap:We,roughnessMap:Be,anisotropy:G,anisotropyMap:se,clearcoat:de,clearcoatMap:_e,clearcoatNormalMap:be,clearcoatRoughnessMap:ce,dispersion:Ae,retroreflection:b,iridescence:_,iridescenceMap:fe,iridescenceThicknessMap:Ce,sheen:O,sheenColorMap:$e,sheenRoughnessMap:Ue,specularMap:Oe,specularColorMap:Qe,specularIntensityMap:et,transmission:z,transmissionMap:st,thicknessMap:Y,gradientMap:we,opaque:v.transparent===!1&&v.blending===ya&&v.alphaToCoverage===!1,alphaMap:he,alphaTest:Ee,alphaHash:Ie,combine:v.combine,mapUv:je&&m(v.map.channel),aoMapUv:Xe&&m(v.aoMap.channel),lightMapUv:ot&&m(v.lightMap.channel),bumpMapUv:it&&m(v.bumpMap.channel),normalMapUv:qe&&m(v.normalMap.channel),displacementMapUv:ue&&m(v.displacementMap.channel),emissiveMapUv:Re&&m(v.emissiveMap.channel),metalnessMapUv:We&&m(v.metalnessMap.channel),roughnessMapUv:Be&&m(v.roughnessMap.channel),anisotropyMapUv:se&&m(v.anisotropyMap.channel),clearcoatMapUv:_e&&m(v.clearcoatMap.channel),clearcoatNormalMapUv:be&&m(v.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ce&&m(v.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&m(v.iridescenceMap.channel),iridescenceThicknessMapUv:Ce&&m(v.iridescenceThicknessMap.channel),sheenColorMapUv:$e&&m(v.sheenColorMap.channel),sheenRoughnessMapUv:Ue&&m(v.sheenRoughnessMap.channel),specularMapUv:Oe&&m(v.specularMap.channel),specularColorMapUv:Qe&&m(v.specularColorMap.channel),specularIntensityMapUv:et&&m(v.specularIntensityMap.channel),transmissionMapUv:st&&m(v.transmissionMap.channel),thicknessMapUv:Y&&m(v.thicknessMap.channel),alphaMapUv:he&&m(v.alphaMap.channel),vertexTangents:!!X.attributes.tangent&&(qe||G),vertexNormals:!!X.attributes.normal,vertexColors:v.vertexColors,vertexAlphas:v.vertexColors===!0&&!!X.attributes.color&&X.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!X.attributes.uv&&(je||he),fog:!!D,useFog:v.fog===!0,fogExp2:!!D&&D.isFogExp2,flatShading:v.wireframe===!1&&(v.flatShading===!0||X.attributes.normal===void 0&&qe===!1&&(v.isMeshLambertMaterial||v.isMeshPhongMaterial||v.isMeshStandardMaterial||v.isMeshPhysicalMaterial)),sizeAttenuation:v.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:ye,skinning:L.isSkinnedMesh===!0,hasPositionAttribute:X.attributes.position!==void 0,morphTargets:X.morphAttributes.position!==void 0,morphNormals:X.morphAttributes.normal!==void 0,morphColors:X.morphAttributes.color!==void 0,morphTargetsCount:ae,morphTextureStride:me,numSunLights:A.sun.length,numDirLights:A.directional.length,numPointLights:A.point.length,numSpotLights:A.spot.length,numSpotLightMaps:A.spotLightMap.length,numRectAreaLights:A.rectArea.length,numHemiLights:A.hemi.length,numSunLightShadows:A.sunShadowMap.length,numDirLightShadows:A.directionalShadowMap.length,numPointLightShadows:A.pointShadowMap.length,numSpotLightShadows:A.spotShadowMap.length,numSpotLightShadowsWithMaps:A.numSpotLightShadowsWithMaps,numLightProbes:A.numLightProbes,numLightProbeGrids:F.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:v.dithering,shadowMapEnabled:n.shadowMap.enabled&&U.length>0,shadowMapType:n.shadowMap.type,toneMapping:Ye,decodeVideoTexture:je&&v.map.isVideoTexture===!0&&vt.getTransfer(v.map.colorSpace)===Pt,decodeVideoTextureEmissive:Re&&v.emissiveMap.isVideoTexture===!0&&vt.getTransfer(v.emissiveMap.colorSpace)===Pt,premultipliedAlpha:v.premultipliedAlpha,doubleSided:v.side===li,flipSided:v.side===xn,useDepthPacking:v.depthPacking>=0,depthPacking:v.depthPacking||0,index0AttributeName:v.index0AttributeName,extensionClipCullDistance:ge&&v.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(ge&&v.extensions.multiDraw===!0||ve)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:v.customProgramCacheKey()};return Ve.vertexUv1s=l.has(1),Ve.vertexUv2s=l.has(2),Ve.vertexUv3s=l.has(3),l.clear(),Ve}function p(v){let A=[];if(v.shaderID?A.push(v.shaderID):(A.push(v.customVertexShaderID),A.push(v.customFragmentShaderID)),v.defines!==void 0)for(let U in v.defines)A.push(U),A.push(v.defines[U]);return v.isRawShaderMaterial===!1&&(g(A,v),T(A,v),A.push(n.outputColorSpace)),A.push(v.customProgramCacheKey),A.join()}function g(v,A){v.push(A.precision),v.push(A.outputColorSpace),v.push(A.envMapMode),v.push(A.envMapCubeUVHeight),v.push(A.mapUv),v.push(A.alphaMapUv),v.push(A.lightMapUv),v.push(A.aoMapUv),v.push(A.bumpMapUv),v.push(A.normalMapUv),v.push(A.displacementMapUv),v.push(A.emissiveMapUv),v.push(A.metalnessMapUv),v.push(A.roughnessMapUv),v.push(A.anisotropyMapUv),v.push(A.clearcoatMapUv),v.push(A.clearcoatNormalMapUv),v.push(A.clearcoatRoughnessMapUv),v.push(A.iridescenceMapUv),v.push(A.iridescenceThicknessMapUv),v.push(A.sheenColorMapUv),v.push(A.sheenRoughnessMapUv),v.push(A.specularMapUv),v.push(A.specularColorMapUv),v.push(A.specularIntensityMapUv),v.push(A.transmissionMapUv),v.push(A.thicknessMapUv),v.push(A.combine),v.push(A.fogExp2),v.push(A.sizeAttenuation),v.push(A.morphTargetsCount),v.push(A.morphAttributeCount),v.push(A.numSunLights),v.push(A.numDirLights),v.push(A.numPointLights),v.push(A.numSpotLights),v.push(A.numSpotLightMaps),v.push(A.numHemiLights),v.push(A.numRectAreaLights),v.push(A.numSunLightShadows),v.push(A.numDirLightShadows),v.push(A.numPointLightShadows),v.push(A.numSpotLightShadows),v.push(A.numSpotLightShadowsWithMaps),v.push(A.numLightProbes),v.push(A.shadowMapType),v.push(A.toneMapping),v.push(A.numClippingPlanes),v.push(A.numClipIntersection),v.push(A.depthPacking)}function T(v,A){a.disableAll(),A.instancing&&a.enable(0),A.instancingColor&&a.enable(1),A.instancingMorph&&a.enable(2),A.matcap&&a.enable(3),A.envMap&&a.enable(4),A.normalMapObjectSpace&&a.enable(5),A.normalMapTangentSpace&&a.enable(6),A.clearcoat&&a.enable(7),A.iridescence&&a.enable(8),A.alphaTest&&a.enable(9),A.vertexColors&&a.enable(10),A.vertexAlphas&&a.enable(11),A.vertexUv1s&&a.enable(12),A.vertexUv2s&&a.enable(13),A.vertexUv3s&&a.enable(14),A.vertexTangents&&a.enable(15),A.anisotropy&&a.enable(16),A.alphaHash&&a.enable(17),A.batching&&a.enable(18),A.dispersion&&a.enable(19),A.retroreflection&&a.enable(24),A.batchingColor&&a.enable(20),A.gradientMap&&a.enable(21),A.packedNormalMap&&a.enable(22),A.vertexNormals&&a.enable(23),v.push(a.mask),a.disableAll(),A.fog&&a.enable(0),A.useFog&&a.enable(1),A.flatShading&&a.enable(2),A.logarithmicDepthBuffer&&a.enable(3),A.reversedDepthBuffer&&a.enable(4),A.skinning&&a.enable(5),A.morphTargets&&a.enable(6),A.morphNormals&&a.enable(7),A.morphColors&&a.enable(8),A.premultipliedAlpha&&a.enable(9),A.shadowMapEnabled&&a.enable(10),A.doubleSided&&a.enable(11),A.flipSided&&a.enable(12),A.useDepthPacking&&a.enable(13),A.dithering&&a.enable(14),A.transmission&&a.enable(15),A.sheen&&a.enable(16),A.opaque&&a.enable(17),A.pointsUvs&&a.enable(18),A.decodeVideoTexture&&a.enable(19),A.decodeVideoTextureEmissive&&a.enable(20),A.alphaToCoverage&&a.enable(21),A.numLightProbeGrids>0&&a.enable(22),A.hasPositionAttribute&&a.enable(23),v.push(a.mask)}function R(v){let A=f[v.type],U;if(A){let I=Dn[A];U=sl.clone(I.uniforms)}else U=v.uniforms;return U}function y(v,A){let U=d.get(A);return U!==void 0?++U.usedTimes:(U=new RS(n,A,v,s),c.push(U),d.set(A,U)),U}function M(v){if(--v.usedTimes===0){let A=c.indexOf(v);c[A]=c[c.length-1],c.pop(),d.delete(v.cacheKey),v.destroy()}}function w(v){o.remove(v)}function P(){o.dispose()}return{getParameters:x,getProgramCacheKey:p,getUniforms:R,acquireProgram:y,releaseProgram:M,releaseShaderCache:w,programs:c,dispose:P}}function NS(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function DS(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function lg(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function cg(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(u){let f=0;return u.isInstancedMesh&&(f+=2),u.isSkinnedMesh&&(f+=1),f}function o(u,f,m,x,p,g){let T=n[e];return T===void 0?(T={id:u.id,object:u,geometry:f,material:m,materialVariant:a(u),groupOrder:x,renderOrder:u.renderOrder,z:p,group:g},n[e]=T):(T.id=u.id,T.object=u,T.geometry=f,T.material=m,T.materialVariant=a(u),T.groupOrder=x,T.renderOrder=u.renderOrder,T.z=p,T.group=g),e++,T}function l(u,f,m,x,p,g,T){T.reversedDepth===!0&&(p=-p);let R=o(u,f,m,x,p,g);m.transmission>0?i.push(R):m.transparent===!0?s.push(R):t.push(R)}function c(u,f,m,x,p,g){let T=o(u,f,m,x,p,g);m.transmission>0?i.unshift(T):m.transparent===!0?s.unshift(T):t.unshift(T)}function d(u,f){t.length>1&&t.sort(u||DS),i.length>1&&i.sort(f||lg),s.length>1&&s.sort(f||lg)}function h(){for(let u=e,f=n.length;u<f;u++){let m=n[u];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:h,sort:d}}function US(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new cg,n.set(i,[a])):s>=r.length?(a=new cg,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function kS(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new J,color:new lt};break;case"SpotLight":t={position:new J,direction:new J,color:new lt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new J,color:new lt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new J,skyColor:new lt,groundColor:new lt};break;case"RectAreaLight":t={color:new lt,position:new J,halfWidth:new J,halfHeight:new J};break}return n[e.id]=t,t}}}function OS(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new at,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var FS=0;function BS(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function zS(n){let e=new kS,t=OS(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new J);let s=new J,r=new Mt,a=new Mt;function o(c){let d=0,h=0,u=0;for(let L=0;L<9;L++)i.probe[L].set(0,0,0);let f=0,m=0,x=0,p=0,g=0,T=0,R=0,y=0,M=0,w=0,P=0,v=0,A=0,U=0;c.sort(BS);for(let L=0,F=c.length;L<F;L++){let D=c[L],X=D.color,ie=D.intensity,W=D.distance,ne=null;if(D.shadow&&D.shadow.map&&(D.shadow.map.texture.format===Xs?ne=D.shadow.map.texture:ne=D.shadow.map.depthTexture||D.shadow.map.texture),D.isAmbientLight)d+=X.r*ie,h+=X.g*ie,u+=X.b*ie;else if(D.isLightProbe){for(let H=0;H<9;H++)i.probe[H].addScaledVector(D.sh.coefficients[H],ie);U++}else if(D.isSunLight){let H=e.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let re=D.shadow,le=t.get(D);le.shadowIntensity=re.intensity,le.shadowBias=re.bias,le.shadowNormalBias=re.normalBias,le.shadowRadius=re.radius,le.shadowMapSize.copy(re.mapSize).multiply(re.getFrameExtents()),i.sunShadow[m]=le,i.sunShadowMap[m]=ne;let ae=re.getViewportCount();for(let me=0;me<ae;me++)i.sunShadowMatrix[x+me]=re.getMatrix(me),i.sunShadowCascade[x+me]=re._cascadeData[me];x+=ae,m++}i.sun[f]=H,f++}else if(D.isDirectionalLight){let H=e.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),D.castShadow){let re=D.shadow,le=t.get(D);le.shadowIntensity=re.intensity,le.shadowBias=re.bias,le.shadowNormalBias=re.normalBias,le.shadowRadius=re.radius,le.shadowMapSize=re.mapSize,i.directionalShadow[p]=le,i.directionalShadowMap[p]=ne,i.directionalShadowMatrix[p]=D.shadow.matrix,M++}i.directional[p]=H,p++}else if(D.isSpotLight){let H=e.get(D);H.position.setFromMatrixPosition(D.matrixWorld),H.color.copy(X).multiplyScalar(ie),H.distance=W,H.coneCos=Math.cos(D.angle),H.penumbraCos=Math.cos(D.angle*(1-D.penumbra)),H.decay=D.decay,i.spot[T]=H;let re=D.shadow;if(D.map&&(i.spotLightMap[v]=D.map,v++,re.updateMatrices(D),D.castShadow&&A++),i.spotLightMatrix[T]=re.matrix,D.castShadow){let le=t.get(D);le.shadowIntensity=re.intensity,le.shadowBias=re.bias,le.shadowNormalBias=re.normalBias,le.shadowRadius=re.radius,le.shadowMapSize=re.mapSize,i.spotShadow[T]=le,i.spotShadowMap[T]=ne,P++}T++}else if(D.isRectAreaLight){let H=e.get(D);H.color.copy(X).multiplyScalar(ie),H.halfWidth.set(D.width*.5,0,0),H.halfHeight.set(0,D.height*.5,0),i.rectArea[R]=H,R++}else if(D.isPointLight){let H=e.get(D);if(H.color.copy(D.color).multiplyScalar(D.intensity),H.distance=D.distance,H.decay=D.decay,D.castShadow){let re=D.shadow,le=t.get(D);le.shadowIntensity=re.intensity,le.shadowBias=re.bias,le.shadowNormalBias=re.normalBias,le.shadowRadius=re.radius,le.shadowMapSize=re.mapSize,le.shadowCameraNear=re.camera.near,le.shadowCameraFar=re.camera.far,i.pointShadow[g]=le,i.pointShadowMap[g]=ne,i.pointShadowMatrix[g]=D.shadow.matrix,w++}i.point[g]=H,g++}else if(D.isHemisphereLight){let H=e.get(D);H.skyColor.copy(D.color).multiplyScalar(ie),H.groundColor.copy(D.groundColor).multiplyScalar(ie),i.hemi[y]=H,y++}}R>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ze.LTC_FLOAT_1,i.rectAreaLTC2=ze.LTC_FLOAT_2):(i.rectAreaLTC1=ze.LTC_HALF_1,i.rectAreaLTC2=ze.LTC_HALF_2)),i.ambient[0]=d,i.ambient[1]=h,i.ambient[2]=u;let I=i.hash;(I.sunLength!==f||I.directionalLength!==p||I.pointLength!==g||I.spotLength!==T||I.rectAreaLength!==R||I.hemiLength!==y||I.numSunShadows!==m||I.numDirectionalShadows!==M||I.numPointShadows!==w||I.numSpotShadows!==P||I.numSpotMaps!==v||I.numLightProbes!==U)&&(i.sun.length=f,i.directional.length=p,i.spot.length=T,i.rectArea.length=R,i.point.length=g,i.hemi.length=y,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.directionalShadowMatrix.length=M,i.pointShadow.length=w,i.pointShadowMap.length=w,i.pointShadowMatrix.length=w,i.spotShadow.length=P,i.spotShadowMap.length=P,i.spotLightMatrix.length=P+v-A,i.spotLightMap.length=v,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=U,I.sunLength=f,I.directionalLength=p,I.pointLength=g,I.spotLength=T,I.rectAreaLength=R,I.hemiLength=y,I.numSunShadows=m,I.numDirectionalShadows=M,I.numPointShadows=w,I.numSpotShadows=P,I.numSpotMaps=v,I.numLightProbes=U,i.version=FS++)}function l(c,d){let h=0,u=0,f=0,m=0,x=0,p=0,g=d.matrixWorldInverse;for(let T=0,R=c.length;T<R;T++){let y=c[T];if(y.isSunLight){let M=i.sun[h];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(g),h++}else if(y.isDirectionalLight){let M=i.directional[u];M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),u++}else if(y.isSpotLight){let M=i.spot[m];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),M.direction.setFromMatrixPosition(y.matrixWorld),s.setFromMatrixPosition(y.target.matrixWorld),M.direction.sub(s),M.direction.transformDirection(g),m++}else if(y.isRectAreaLight){let M=i.rectArea[x];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),a.identity(),r.copy(y.matrixWorld),r.premultiply(g),a.extractRotation(r),M.halfWidth.set(y.width*.5,0,0),M.halfHeight.set(0,y.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),x++}else if(y.isPointLight){let M=i.point[f];M.position.setFromMatrixPosition(y.matrixWorld),M.position.applyMatrix4(g),f++}else if(y.isHemisphereLight){let M=i.hemi[p];M.direction.setFromMatrixPosition(y.matrixWorld),M.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:i}}function ug(n){let e=new zS(n),t=[],i=[],s=[];function r(u){h.camera=u,t.length=0,i.length=0,s.length=0}function a(u){t.push(u)}function o(u){i.push(u)}function l(u){s.push(u)}function c(){e.setup(t)}function d(u){e.setupView(t,u)}let h={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:d,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function VS(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new ug(n),e.set(s,[o])):r>=a.length?(o=new ug(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var HS=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,GS=`uniform sampler2D shadow_pass;
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
}`,WS=[new J(1,0,0),new J(-1,0,0),new J(0,1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1)],jS=[new J(0,-1,0),new J(0,-1,0),new J(0,0,1),new J(0,0,-1),new J(0,-1,0),new J(0,-1,0)],dg=new Mt,al=new J,Gh=new J;function XS(n,e,t){let i=new fa,s=new at,r=new at,a=new yt,o=new Tc,l=new Ac,c={},d=t.maxTextureSize,h={[Gs]:xn,[xn]:Gs,[li]:li},u=new Ot({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new at},radius:{value:4}},vertexShader:HS,fragmentShader:GS}),f=u.clone();f.defines.HORIZONTAL_PASS=1;let m=new Jt;m.setAttribute("position",new nn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new jt(m,u),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Yo;let g=this.type;this.render=function(w,P,v){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||w.length===0)return;this.type===am&&(ct("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Yo);let A=n.getRenderTarget(),U=n.getActiveCubeFace(),I=n.getActiveMipmapLevel(),L=n.state;L.setBlending($i),L.buffers.depth.getReversed()===!0?L.buffers.color.setClear(0,0,0,0):L.buffers.color.setClear(1,1,1,1),L.buffers.depth.setTest(!0),L.setScissorTest(!1);let F=g!==this.type;F&&P.traverse(function(D){D.material&&(Array.isArray(D.material)?D.material.forEach(X=>X.needsUpdate=!0):D.material.needsUpdate=!0)});for(let D=0,X=w.length;D<X;D++){let ie=w[D],W=ie.shadow;if(W===void 0){ct("WebGLShadowMap:",ie,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;s.copy(W.mapSize);let ne=W.getFrameExtents();s.multiply(ne),r.copy(W.mapSize),(s.x>d||s.y>d)&&(s.x>d&&(r.x=Math.floor(d/ne.x),s.x=r.x*ne.x,W.mapSize.x=r.x),s.y>d&&(r.y=Math.floor(d/ne.y),s.y=r.y*ne.y,W.mapSize.y=r.y));let H=n.state.buffers.depth.getReversed();if(W.camera._reversedDepth=H,W.map===null||F===!0){if(W.map!==null&&(W.map.depthTexture!==null&&(W.map.depthTexture.dispose(),W.map.depthTexture=null),W.map.dispose()),this.type===xa){if(ie.isPointLight){ct("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}W.map=new Vn(s.x,s.y,{format:Xs,type:Li,minFilter:Dt,magFilter:Dt,generateMipmaps:!1}),W.map.texture.name=ie.name+".shadowMap",W.map.depthTexture=new Bs(s.x,s.y,Pi),W.map.depthTexture.name=ie.name+".shadowMapDepth",W.map.depthTexture.format=Wi,W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=sn,W.map.depthTexture.magFilter=sn}else ie.isPointLight?(W.map=new Nu(s.x),W.map.depthTexture=new wc(s.x,Ri)):(W.map=new Vn(s.x,s.y),W.map.depthTexture=new Bs(s.x,s.y,Ri)),W.map.depthTexture.name=ie.name+".shadowMap",W.map.depthTexture.format=Wi,this.type===Yo?(W.map.depthTexture.compareFunction=H?Ru:Cu,W.map.depthTexture.minFilter=Dt,W.map.depthTexture.magFilter=Dt):(W.map.depthTexture.compareFunction=null,W.map.depthTexture.minFilter=sn,W.map.depthTexture.magFilter=sn);W.camera.updateProjectionMatrix()}W.map.isWebGLCubeRenderTarget!==!0&&(W.map.width!==s.x||W.map.height!==s.y)&&W.map.setSize(s.x,s.y);let re=W.map.isWebGLCubeRenderTarget?6:W.getViewportCount();ie.isPointLight!==!0&&W.updateMatrices(ie,v);for(let le=0;le<re;le++){let ae=W.getCamera(le);if(ie.isPointLight){let me=W.camera,Ne=W.matrix,Le=ie.distance||me.far;Le!==me.far&&(me.far=Le,me.updateProjectionMatrix()),al.setFromMatrixPosition(ie.matrixWorld),me.position.copy(al),Gh.copy(me.position),Gh.add(WS[le]),me.up.copy(jS[le]),me.lookAt(Gh),me.updateMatrixWorld(),Ne.makeTranslation(-al.x,-al.y,-al.z),dg.multiplyMatrices(me.projectionMatrix,me.matrixWorldInverse),W._frustum.setFromProjectionMatrix(dg,me.coordinateSystem,me.reversedDepth)}if(W.map.isWebGLCubeRenderTarget)n.setRenderTarget(W.map,le),n.clear();else{le===0&&(n.setRenderTarget(W.map),n.clear());let me=W.getViewport(le);a.set(r.x*me.x,r.y*me.y,r.x*me.z,r.y*me.w),L.viewport(a)}i=W.getFrustum(le),y(P,v,ae,ie,this.type)}W.isPointLightShadow!==!0&&this.type===xa&&T(W,v),W.needsUpdate=!1}g=this.type,p.needsUpdate=!1,n.setRenderTarget(A,U,I)};function T(w,P){let v=e.update(x);u.defines.VSM_SAMPLES!==w.blurSamples&&(u.defines.VSM_SAMPLES=w.blurSamples,f.defines.VSM_SAMPLES=w.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),w.mapPass===null?w.mapPass=new Vn(s.x,s.y,{format:Xs,type:Li}):(w.mapPass.width!==w.map.width||w.mapPass.height!==w.map.height)&&w.mapPass.setSize(w.map.width,w.map.height),u.uniforms.shadow_pass.value=w.map.depthTexture,u.uniforms.resolution.value.set(w.map.width,w.map.height),u.uniforms.radius.value=w.radius,n.setRenderTarget(w.mapPass),n.clear(),n.renderBufferDirect(P,null,v,u,x,null),f.uniforms.shadow_pass.value=w.mapPass.texture,f.uniforms.resolution.value.set(w.map.width,w.map.height),f.uniforms.radius.value=w.radius,n.setRenderTarget(w.map),n.clear(),n.renderBufferDirect(P,null,v,f,x,null)}function R(w,P,v,A){let U=null,I=v.isPointLight===!0?w.customDistanceMaterial:w.customDepthMaterial;if(I!==void 0)U=I;else if(U=v.isPointLight===!0?l:o,n.localClippingEnabled&&P.clipShadows===!0&&Array.isArray(P.clippingPlanes)&&P.clippingPlanes.length!==0||P.displacementMap&&P.displacementScale!==0||P.alphaMap&&P.alphaTest>0||P.map&&P.alphaTest>0||P.alphaToCoverage===!0){let L=U.uuid,F=P.uuid,D=c[L];D===void 0&&(D={},c[L]=D);let X=D[F];X===void 0&&(X=U.clone(),D[F]=X,P.addEventListener("dispose",M)),U=X}if(U.visible=P.visible,U.wireframe=P.wireframe,A===xa?U.side=P.shadowSide!==null?P.shadowSide:P.side:U.side=P.shadowSide!==null?P.shadowSide:h[P.side],U.alphaMap=P.alphaMap,U.alphaTest=P.alphaToCoverage===!0?.5:P.alphaTest,U.map=P.map,U.clipShadows=P.clipShadows,U.clippingPlanes=P.clippingPlanes,U.clipIntersection=P.clipIntersection,U.displacementMap=P.displacementMap,U.displacementScale=P.displacementScale,U.displacementBias=P.displacementBias,U.wireframeLinewidth=P.wireframeLinewidth,U.linewidth=P.linewidth,v.isPointLight===!0&&U.isMeshDistanceMaterial===!0){let L=n.properties.get(U);L.light=v}return U}function y(w,P,v,A,U){if(w.visible===!1)return;if(w.layers.test(P.layers)&&(w.isMesh||w.isLine||w.isPoints)&&(w.castShadow||w.receiveShadow&&U===xa)&&(!w.frustumCulled||w.intersectsFrustum(i))){w.modelViewMatrix.multiplyMatrices(v.matrixWorldInverse,w.matrixWorld);let F=e.update(w),D=w.material;if(Array.isArray(D)){let X=F.groups;for(let ie=0,W=X.length;ie<W;ie++){let ne=X[ie],H=D[ne.materialIndex];if(H&&H.visible){let re=R(w,H,A,U);w.onBeforeShadow(n,w,P,v,F,re,ne),n.renderBufferDirect(v,null,F,re,w,ne),w.onAfterShadow(n,w,P,v,F,re,ne)}}}else if(D.visible){let X=R(w,D,A,U);w.onBeforeShadow(n,w,P,v,F,X,null),n.renderBufferDirect(v,null,F,X,w,null),w.onAfterShadow(n,w,P,v,F,X,null)}}let L=w.children;for(let F=0,D=L.length;F<D;F++)y(L[F],P,v,A,U)}function M(w){w.target.removeEventListener("dispose",M);for(let v in c){let A=c[v],U=w.target.uuid;U in A&&(A[U].dispose(),delete A[U])}}}function qS(n,e){function t(){let Y=!1,we=new yt,he=null,Ee=new yt(0,0,0,0);return{setMask:function(Ie){he!==Ie&&!Y&&(n.colorMask(Ie,Ie,Ie,Ie),he=Ie)},setLocked:function(Ie){Y=Ie},setClear:function(Ie,ge,Ye,Ve,ft){ft===!0&&(Ie*=Ve,ge*=Ve,Ye*=Ve),we.set(Ie,ge,Ye,Ve),Ee.equals(we)===!1&&(n.clearColor(Ie,ge,Ye,Ve),Ee.copy(we))},reset:function(){Y=!1,he=null,Ee.set(-1,0,0,0)}}}function i(){let Y=!1,we=!1,he=null,Ee=null,Ie=null;return{setReversed:function(ge){if(we!==ge){let Ye=e.get("EXT_clip_control");ge?Ye.clipControlEXT(Ye.LOWER_LEFT_EXT,Ye.ZERO_TO_ONE_EXT):Ye.clipControlEXT(Ye.LOWER_LEFT_EXT,Ye.NEGATIVE_ONE_TO_ONE_EXT),we=ge;let Ve=Ie;Ie=null,this.setClear(Ve)}},getReversed:function(){return we},setTest:function(ge){ge?Q(n.DEPTH_TEST):ye(n.DEPTH_TEST)},setMask:function(ge){he!==ge&&!Y&&(n.depthMask(ge),he=ge)},setFunc:function(ge){if(we&&(ge=zm[ge]),Ee!==ge){switch(ge){case hc:n.depthFunc(n.NEVER);break;case fc:n.depthFunc(n.ALWAYS);break;case pc:n.depthFunc(n.LESS);break;case ra:n.depthFunc(n.LEQUAL);break;case mc:n.depthFunc(n.EQUAL);break;case gc:n.depthFunc(n.GEQUAL);break;case _c:n.depthFunc(n.GREATER);break;case xc:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Ee=ge}},setLocked:function(ge){Y=ge},setClear:function(ge){Ie!==ge&&(Ie=ge,we&&(ge=1-ge),n.clearDepth(ge))},reset:function(){Y=!1,he=null,Ee=null,Ie=null,we=!1}}}function s(){let Y=!1,we=null,he=null,Ee=null,Ie=null,ge=null,Ye=null,Ve=null,ft=null;return{setTest:function(gt){Y||(gt?Q(n.STENCIL_TEST):ye(n.STENCIL_TEST))},setMask:function(gt){we!==gt&&!Y&&(n.stencilMask(gt),we=gt)},setFunc:function(gt,wt,Gt){(he!==gt||Ee!==wt||Ie!==Gt)&&(n.stencilFunc(gt,wt,Gt),he=gt,Ee=wt,Ie=Gt)},setOp:function(gt,wt,Gt){(ge!==gt||Ye!==wt||Ve!==Gt)&&(n.stencilOp(gt,wt,Gt),ge=gt,Ye=wt,Ve=Gt)},setLocked:function(gt){Y=gt},setClear:function(gt){ft!==gt&&(n.clearStencil(gt),ft=gt)},reset:function(){Y=!1,we=null,he=null,Ee=null,Ie=null,ge=null,Ye=null,Ve=null,ft=null}}}let r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap,d={},h={},u={},f=new WeakMap,m=[],x=null,p=!1,g=null,T=null,R=null,y=null,M=null,w=null,P=null,v=new lt(0,0,0),A=0,U=!1,I=null,L=null,F=null,D=null,X=null,ie=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),W=!1,ne=0,H=n.getParameter(n.VERSION);H.indexOf("WebGL")!==-1?(ne=parseFloat(/^WebGL (\d)/.exec(H)[1]),W=ne>=1):H.indexOf("OpenGL ES")!==-1&&(ne=parseFloat(/^OpenGL ES (\d)/.exec(H)[1]),W=ne>=2);let re=null,le={},ae=n.getParameter(n.SCISSOR_BOX),me=n.getParameter(n.VIEWPORT),Ne=new yt().fromArray(ae),Le=new yt().fromArray(me);function De(Y,we,he,Ee){let Ie=new Uint8Array(4),ge=n.createTexture();n.bindTexture(Y,ge),n.texParameteri(Y,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(Y,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ye=0;Ye<he;Ye++)Y===n.TEXTURE_3D||Y===n.TEXTURE_2D_ARRAY?n.texImage3D(we,0,n.RGBA,1,1,Ee,0,n.RGBA,n.UNSIGNED_BYTE,Ie):n.texImage2D(we+Ye,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Ie);return ge}let j={};j[n.TEXTURE_2D]=De(n.TEXTURE_2D,n.TEXTURE_2D,1),j[n.TEXTURE_CUBE_MAP]=De(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),j[n.TEXTURE_2D_ARRAY]=De(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),j[n.TEXTURE_3D]=De(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),Q(n.DEPTH_TEST),a.setFunc(ra),it(!1),qe(dh),Q(n.CULL_FACE),Xe($i);function Q(Y){d[Y]!==!0&&(n.enable(Y),d[Y]=!0)}function ye(Y){d[Y]!==!1&&(n.disable(Y),d[Y]=!1)}function Se(Y,we){return u[Y]!==we?(n.bindFramebuffer(Y,we),u[Y]=we,Y===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=we),Y===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=we),!0):!1}function ve(Y,we){let he=m,Ee=!1;if(Y){he=f.get(we),he===void 0&&(he=[],f.set(we,he));let Ie=Y.textures;if(he.length!==Ie.length||he[0]!==n.COLOR_ATTACHMENT0){for(let ge=0,Ye=Ie.length;ge<Ye;ge++)he[ge]=n.COLOR_ATTACHMENT0+ge;he.length=Ie.length,Ee=!0}}else he[0]!==n.BACK&&(he[0]=n.BACK,Ee=!0);Ee&&n.drawBuffers(he)}function je(Y){return x!==Y?(n.useProgram(Y),x=Y,!0):!1}let Ke={[mr]:n.FUNC_ADD,[lm]:n.FUNC_SUBTRACT,[cm]:n.FUNC_REVERSE_SUBTRACT};Ke[um]=n.MIN,Ke[dm]=n.MAX;let ke={[hm]:n.ZERO,[fm]:n.ONE,[pm]:n.SRC_COLOR,[ph]:n.SRC_ALPHA,[vm]:n.SRC_ALPHA_SATURATE,[xm]:n.DST_COLOR,[gm]:n.DST_ALPHA,[mm]:n.ONE_MINUS_SRC_COLOR,[mh]:n.ONE_MINUS_SRC_ALPHA,[ym]:n.ONE_MINUS_DST_COLOR,[_m]:n.ONE_MINUS_DST_ALPHA,[bm]:n.CONSTANT_COLOR,[Sm]:n.ONE_MINUS_CONSTANT_COLOR,[Mm]:n.CONSTANT_ALPHA,[wm]:n.ONE_MINUS_CONSTANT_ALPHA};function Xe(Y,we,he,Ee,Ie,ge,Ye,Ve,ft,gt){if(Y===$i){p===!0&&(ye(n.BLEND),p=!1);return}if(p===!1&&(Q(n.BLEND),p=!0),Y!==om){if(Y!==g||gt!==U){if((T!==mr||M!==mr)&&(n.blendEquation(n.FUNC_ADD),T=mr,M=mr),gt)switch(Y){case ya:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Yi:n.blendFunc(n.ONE,n.ONE);break;case hh:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case fh:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:ut("WebGLState: Invalid blending: ",Y);break}else switch(Y){case ya:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Yi:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case hh:ut("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case fh:ut("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:ut("WebGLState: Invalid blending: ",Y);break}R=null,y=null,w=null,P=null,v.set(0,0,0),A=0,g=Y,U=gt}return}Ie=Ie||we,ge=ge||he,Ye=Ye||Ee,(we!==T||Ie!==M)&&(n.blendEquationSeparate(Ke[we],Ke[Ie]),T=we,M=Ie),(he!==R||Ee!==y||ge!==w||Ye!==P)&&(n.blendFuncSeparate(ke[he],ke[Ee],ke[ge],ke[Ye]),R=he,y=Ee,w=ge,P=Ye),(Ve.equals(v)===!1||ft!==A)&&(n.blendColor(Ve.r,Ve.g,Ve.b,ft),v.copy(Ve),A=ft),g=Y,U=!1}function ot(Y,we){Y.side===li?ye(n.CULL_FACE):Q(n.CULL_FACE);let he=Y.side===xn;we&&(he=!he),it(he),Y.blending===ya&&Y.transparent===!1?Xe($i):Xe(Y.blending,Y.blendEquation,Y.blendSrc,Y.blendDst,Y.blendEquationAlpha,Y.blendSrcAlpha,Y.blendDstAlpha,Y.blendColor,Y.blendAlpha,Y.premultipliedAlpha),a.setFunc(Y.depthFunc),a.setTest(Y.depthTest),a.setMask(Y.depthWrite),r.setMask(Y.colorWrite);let Ee=Y.stencilWrite;o.setTest(Ee),Ee&&(o.setMask(Y.stencilWriteMask),o.setFunc(Y.stencilFunc,Y.stencilRef,Y.stencilFuncMask),o.setOp(Y.stencilFail,Y.stencilZFail,Y.stencilZPass)),Re(Y.polygonOffset,Y.polygonOffsetFactor,Y.polygonOffsetUnits),Y.alphaToCoverage===!0?Q(n.SAMPLE_ALPHA_TO_COVERAGE):ye(n.SAMPLE_ALPHA_TO_COVERAGE)}function it(Y){I!==Y&&(Y?n.frontFace(n.CW):n.frontFace(n.CCW),I=Y)}function qe(Y){Y!==sm?(Q(n.CULL_FACE),Y!==L&&(Y===dh?n.cullFace(n.BACK):Y===rm?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):ye(n.CULL_FACE),L=Y}function ue(Y){Y!==F&&(W&&n.lineWidth(Y),F=Y)}function Re(Y,we,he){Y?(Q(n.POLYGON_OFFSET_FILL),(D!==we||X!==he)&&(D=we,X=he,a.getReversed()&&(we=-we),n.polygonOffset(we,he))):ye(n.POLYGON_OFFSET_FILL)}function We(Y){Y?Q(n.SCISSOR_TEST):ye(n.SCISSOR_TEST)}function Be(Y){Y===void 0&&(Y=n.TEXTURE0+ie-1),re!==Y&&(n.activeTexture(Y),re=Y)}function G(Y,we,he){he===void 0&&(re===null?he=n.TEXTURE0+ie-1:he=re);let Ee=le[he];Ee===void 0&&(Ee={type:void 0,texture:void 0},le[he]=Ee),(Ee.type!==Y||Ee.texture!==we)&&(re!==he&&(n.activeTexture(he),re=he),n.bindTexture(Y,we||j[Y]),Ee.type=Y,Ee.texture=we)}function de(){let Y=le[re];Y!==void 0&&Y.type!==void 0&&(n.bindTexture(Y.type,null),Y.type=void 0,Y.texture=void 0)}function Ae(){try{n.compressedTexImage2D(...arguments)}catch(Y){ut("WebGLState:",Y)}}function b(){try{n.compressedTexImage3D(...arguments)}catch(Y){ut("WebGLState:",Y)}}function _(){try{n.texSubImage2D(...arguments)}catch(Y){ut("WebGLState:",Y)}}function O(){try{n.texSubImage3D(...arguments)}catch(Y){ut("WebGLState:",Y)}}function z(){try{n.compressedTexSubImage2D(...arguments)}catch(Y){ut("WebGLState:",Y)}}function se(){try{n.compressedTexSubImage3D(...arguments)}catch(Y){ut("WebGLState:",Y)}}function _e(){try{n.texStorage2D(...arguments)}catch(Y){ut("WebGLState:",Y)}}function be(){try{n.texStorage3D(...arguments)}catch(Y){ut("WebGLState:",Y)}}function ce(){try{n.texImage2D(...arguments)}catch(Y){ut("WebGLState:",Y)}}function fe(){try{n.texImage3D(...arguments)}catch(Y){ut("WebGLState:",Y)}}function Ce(Y){return h[Y]!==void 0?h[Y]:n.getParameter(Y)}function $e(Y,we){h[Y]!==we&&(n.pixelStorei(Y,we),h[Y]=we)}function Ue(Y){Ne.equals(Y)===!1&&(n.scissor(Y.x,Y.y,Y.z,Y.w),Ne.copy(Y))}function Oe(Y){Le.equals(Y)===!1&&(n.viewport(Y.x,Y.y,Y.z,Y.w),Le.copy(Y))}function Qe(Y,we){let he=c.get(we);he===void 0&&(he=new WeakMap,c.set(we,he));let Ee=he.get(Y);Ee===void 0&&(Ee=n.getUniformBlockIndex(we,Y.name),he.set(Y,Ee))}function et(Y,we){let Ee=c.get(we).get(Y);l.get(we)!==Ee&&(n.uniformBlockBinding(we,Ee,Y.__bindingPointIndex),l.set(we,Ee))}function st(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),d={},h={},re=null,le={},u={},f=new WeakMap,m=[],x=null,p=!1,g=null,T=null,R=null,y=null,M=null,w=null,P=null,v=new lt(0,0,0),A=0,U=!1,I=null,L=null,F=null,D=null,X=null,Ne.set(0,0,n.canvas.width,n.canvas.height),Le.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:Q,disable:ye,bindFramebuffer:Se,drawBuffers:ve,useProgram:je,setBlending:Xe,setMaterial:ot,setFlipSided:it,setCullFace:qe,setLineWidth:ue,setPolygonOffset:Re,setScissorTest:We,activeTexture:Be,bindTexture:G,unbindTexture:de,compressedTexImage2D:Ae,compressedTexImage3D:b,texImage2D:ce,texImage3D:fe,pixelStorei:$e,getParameter:Ce,updateUBOMapping:Qe,uniformBlockBinding:et,texStorage2D:_e,texStorage3D:be,texSubImage2D:_,texSubImage3D:O,compressedTexSubImage2D:z,compressedTexSubImage3D:se,scissor:Ue,viewport:Oe,reset:st}}function $S(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new at,d=new WeakMap,h=new Set,u,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(b,_){return m?new OffscreenCanvas(b,_):Co("canvas")}function p(b,_,O){let z=1,se=Ae(b);if((se.width>O||se.height>O)&&(z=O/Math.max(se.width,se.height)),z<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let _e=Math.floor(z*se.width),be=Math.floor(z*se.height);u===void 0&&(u=x(_e,be));let ce=_?x(_e,be):u;return ce.width=_e,ce.height=be,ce.getContext("2d").drawImage(b,0,0,_e,be),ct("WebGLRenderer: Texture has been resized from ("+se.width+"x"+se.height+") to ("+_e+"x"+be+")."),ce}else return"data"in b&&ct("WebGLRenderer: Image in DataTexture is too big ("+se.width+"x"+se.height+")."),b;return b}function g(b){return b.generateMipmaps}function T(b){n.generateMipmap(b)}function R(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function y(b,_,O,z,se,_e=!1){if(b!==null){if(n[b]!==void 0)return n[b];ct("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let be;z&&(be=e.get("EXT_texture_norm16"),be||ct("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ce=_;if(_===n.RED&&(O===n.FLOAT&&(ce=n.R32F),O===n.HALF_FLOAT&&(ce=n.R16F),O===n.UNSIGNED_BYTE&&(ce=n.R8),O===n.UNSIGNED_SHORT&&be&&(ce=be.R16_EXT),O===n.SHORT&&be&&(ce=be.R16_SNORM_EXT)),_===n.RED_INTEGER&&(O===n.UNSIGNED_BYTE&&(ce=n.R8UI),O===n.UNSIGNED_SHORT&&(ce=n.R16UI),O===n.UNSIGNED_INT&&(ce=n.R32UI),O===n.BYTE&&(ce=n.R8I),O===n.SHORT&&(ce=n.R16I),O===n.INT&&(ce=n.R32I)),_===n.RG&&(O===n.FLOAT&&(ce=n.RG32F),O===n.HALF_FLOAT&&(ce=n.RG16F),O===n.UNSIGNED_BYTE&&(ce=n.RG8),O===n.UNSIGNED_SHORT&&be&&(ce=be.RG16_EXT),O===n.SHORT&&be&&(ce=be.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(O===n.UNSIGNED_BYTE&&(ce=n.RG8UI),O===n.UNSIGNED_SHORT&&(ce=n.RG16UI),O===n.UNSIGNED_INT&&(ce=n.RG32UI),O===n.BYTE&&(ce=n.RG8I),O===n.SHORT&&(ce=n.RG16I),O===n.INT&&(ce=n.RG32I)),_===n.RGB_INTEGER&&(O===n.UNSIGNED_BYTE&&(ce=n.RGB8UI),O===n.UNSIGNED_SHORT&&(ce=n.RGB16UI),O===n.UNSIGNED_INT&&(ce=n.RGB32UI),O===n.BYTE&&(ce=n.RGB8I),O===n.SHORT&&(ce=n.RGB16I),O===n.INT&&(ce=n.RGB32I)),_===n.RGBA_INTEGER&&(O===n.UNSIGNED_BYTE&&(ce=n.RGBA8UI),O===n.UNSIGNED_SHORT&&(ce=n.RGBA16UI),O===n.UNSIGNED_INT&&(ce=n.RGBA32UI),O===n.BYTE&&(ce=n.RGBA8I),O===n.SHORT&&(ce=n.RGBA16I),O===n.INT&&(ce=n.RGBA32I)),_===n.RGB&&(O===n.UNSIGNED_SHORT&&be&&(ce=be.RGB16_EXT),O===n.SHORT&&be&&(ce=be.RGB16_SNORM_EXT),O===n.UNSIGNED_INT_5_9_9_9_REV&&(ce=n.RGB9_E5),O===n.UNSIGNED_INT_10F_11F_11F_REV&&(ce=n.R11F_G11F_B10F)),_===n.RGBA){let fe=_e?Ao:vt.getTransfer(se);O===n.FLOAT&&(ce=n.RGBA32F),O===n.HALF_FLOAT&&(ce=n.RGBA16F),O===n.UNSIGNED_BYTE&&(ce=fe===Pt?n.SRGB8_ALPHA8:n.RGBA8),O===n.UNSIGNED_SHORT&&be&&(ce=be.RGBA16_EXT),O===n.SHORT&&be&&(ce=be.RGBA16_SNORM_EXT),O===n.UNSIGNED_SHORT_4_4_4_4&&(ce=n.RGBA4),O===n.UNSIGNED_SHORT_5_5_5_1&&(ce=n.RGB5_A1)}return(ce===n.R16F||ce===n.R32F||ce===n.RG16F||ce===n.RG32F||ce===n.RGBA16F||ce===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ce}function M(b,_){let O;return b?_===null||_===Ri||_===ba?O=n.DEPTH24_STENCIL8:_===Pi?O=n.DEPTH32F_STENCIL8:_===va&&(O=n.DEPTH24_STENCIL8,ct("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===Ri||_===ba?O=n.DEPTH_COMPONENT24:_===Pi?O=n.DEPTH_COMPONENT32F:_===va&&(O=n.DEPTH_COMPONENT16),O}function w(b,_){return g(b)===!0||b.isFramebufferTexture&&b.minFilter!==sn&&b.minFilter!==Dt?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function P(b){let _=b.target;_.removeEventListener("dispose",P),A(_),_.isVideoTexture&&d.delete(_),_.isHTMLTexture&&h.delete(_)}function v(b){let _=b.target;_.removeEventListener("dispose",v),I(_)}function A(b){let _=i.get(b);if(_.__webglInit===void 0)return;let O=b.source,z=f.get(O);if(z){let se=z[_.__cacheKey];se.usedTimes--,se.usedTimes===0&&U(b),Object.keys(z).length===0&&f.delete(O)}i.remove(b)}function U(b){let _=i.get(b);n.deleteTexture(_.__webglTexture);let O=b.source,z=f.get(O);delete z[_.__cacheKey],a.memory.textures--}function I(b){let _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let z=0;z<6;z++){if(Array.isArray(_.__webglFramebuffer[z]))for(let se=0;se<_.__webglFramebuffer[z].length;se++)n.deleteFramebuffer(_.__webglFramebuffer[z][se]);else n.deleteFramebuffer(_.__webglFramebuffer[z]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[z])}else{if(Array.isArray(_.__webglFramebuffer))for(let z=0;z<_.__webglFramebuffer.length;z++)n.deleteFramebuffer(_.__webglFramebuffer[z]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let z=0;z<_.__webglColorRenderbuffer.length;z++)_.__webglColorRenderbuffer[z]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[z]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let O=b.textures;for(let z=0,se=O.length;z<se;z++){let _e=i.get(O[z]);_e.__webglTexture&&(n.deleteTexture(_e.__webglTexture),a.memory.textures--),i.remove(O[z])}i.remove(b)}let L=0;function F(){L=0}function D(){return L}function X(b){L=b}function ie(){let b=L;return b>=s.maxTextures&&ct("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+s.maxTextures),L+=1,b}function W(b){let _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function ne(b,_){let O=i.get(b);if(b.isVideoTexture&&G(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&O.__version!==b.version){let z=b.image;if(z===null)ct("WebGLRenderer: Texture marked for update but no image data found.");else if(z.complete===!1)ct("WebGLRenderer: Texture marked for update but image is incomplete");else{ye(O,b,_);return}}else b.isExternalTexture&&(O.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,O.__webglTexture,n.TEXTURE0+_)}function H(b,_){let O=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){ye(O,b,_);return}else b.isExternalTexture&&(O.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,O.__webglTexture,n.TEXTURE0+_)}function re(b,_){let O=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&O.__version!==b.version){ye(O,b,_);return}t.bindTexture(n.TEXTURE_3D,O.__webglTexture,n.TEXTURE0+_)}function le(b,_){let O=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&O.__version!==b.version){Se(O,b,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture,n.TEXTURE0+_)}let ae={[ks]:n.REPEAT,[zn]:n.CLAMP_TO_EDGE,[yc]:n.MIRRORED_REPEAT},me={[sn]:n.NEAREST,[Am]:n.NEAREST_MIPMAP_NEAREST,[Ko]:n.NEAREST_MIPMAP_LINEAR,[Dt]:n.LINEAR,[Wc]:n.LINEAR_MIPMAP_NEAREST,[Kn]:n.LINEAR_MIPMAP_LINEAR},Ne={[Lm]:n.NEVER,[km]:n.ALWAYS,[Im]:n.LESS,[Cu]:n.LEQUAL,[Nm]:n.EQUAL,[Ru]:n.GEQUAL,[Dm]:n.GREATER,[Um]:n.NOTEQUAL};function Le(b,_){if(_.type===Pi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===Dt||_.magFilter===Wc||_.magFilter===Ko||_.magFilter===Kn||_.minFilter===Dt||_.minFilter===Wc||_.minFilter===Ko||_.minFilter===Kn)&&ct("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,ae[_.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,ae[_.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,ae[_.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,me[_.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,me[_.minFilter]),_.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,Ne[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===sn||_.minFilter!==Ko&&_.minFilter!==Kn||_.type===Pi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let O=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,O.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function De(b,_){let O=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",P));let z=_.source,se=f.get(z);se===void 0&&(se={},f.set(z,se));let _e=W(_);if(_e!==b.__cacheKey){se[_e]===void 0&&(se[_e]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,O=!0),se[_e].usedTimes++;let be=se[b.__cacheKey];be!==void 0&&(se[b.__cacheKey].usedTimes--,be.usedTimes===0&&U(_)),b.__cacheKey=_e,b.__webglTexture=se[_e].texture}return O}function j(b,_,O){return Math.floor(Math.floor(b/O)/_)}function Q(b,_,O,z){let _e=b.updateRanges;if(_e.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,O,z,_.data);else{_e.sort(($e,Ue)=>$e.start-Ue.start);let be=0;for(let $e=1;$e<_e.length;$e++){let Ue=_e[be],Oe=_e[$e],Qe=Ue.start+Ue.count,et=j(Oe.start,_.width,4),st=j(Ue.start,_.width,4);Oe.start<=Qe+1&&et===st&&j(Oe.start+Oe.count-1,_.width,4)===et?Ue.count=Math.max(Ue.count,Oe.start+Oe.count-Ue.start):(++be,_e[be]=Oe)}_e.length=be+1;let ce=t.getParameter(n.UNPACK_ROW_LENGTH),fe=t.getParameter(n.UNPACK_SKIP_PIXELS),Ce=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let $e=0,Ue=_e.length;$e<Ue;$e++){let Oe=_e[$e],Qe=Math.floor(Oe.start/4),et=Math.ceil(Oe.count/4),st=Qe%_.width,Y=Math.floor(Qe/_.width),we=et,he=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,st),t.pixelStorei(n.UNPACK_SKIP_ROWS,Y),t.texSubImage2D(n.TEXTURE_2D,0,st,Y,we,he,O,z,_.data)}b.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,ce),t.pixelStorei(n.UNPACK_SKIP_PIXELS,fe),t.pixelStorei(n.UNPACK_SKIP_ROWS,Ce)}}function ye(b,_,O){let z=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(z=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(z=n.TEXTURE_3D);let se=De(b,_),_e=_.source;t.bindTexture(z,b.__webglTexture,n.TEXTURE0+O);let be=i.get(_e);if(_e.version!==be.__version||se===!0){if(t.activeTexture(n.TEXTURE0+O),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let he=vt.getPrimaries(vt.workingColorSpace),Ee=_.colorSpace===ci?null:vt.getPrimaries(_.colorSpace),Ie=_.colorSpace===ci||he===Ee?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ie)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let fe=p(_.image,!1,s.maxTextureSize);fe=de(_,fe);let Ce=r.convert(_.format,_.colorSpace),$e=r.convert(_.type),Ue=y(_.internalFormat,Ce,$e,_.normalized,_.colorSpace,_.isVideoTexture);Le(z,_);let Oe,Qe=_.mipmaps,et=_.isVideoTexture!==!0,st=be.__version===void 0||se===!0,Y=_e.dataReady,we=w(_,fe);if(_.isDepthTexture)Ue=M(_.format===js,_.type),st&&(et?t.texStorage2D(n.TEXTURE_2D,1,Ue,fe.width,fe.height):t.texImage2D(n.TEXTURE_2D,0,Ue,fe.width,fe.height,0,Ce,$e,null));else if(_.isDataTexture)if(Qe.length>0){et&&st&&t.texStorage2D(n.TEXTURE_2D,we,Ue,Qe[0].width,Qe[0].height);for(let he=0,Ee=Qe.length;he<Ee;he++)Oe=Qe[he],et?Y&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,Oe.width,Oe.height,Ce,$e,Oe.data):t.texImage2D(n.TEXTURE_2D,he,Ue,Oe.width,Oe.height,0,Ce,$e,Oe.data);_.generateMipmaps=!1}else et?(st&&t.texStorage2D(n.TEXTURE_2D,we,Ue,fe.width,fe.height),Y&&Q(_,fe,Ce,$e)):t.texImage2D(n.TEXTURE_2D,0,Ue,fe.width,fe.height,0,Ce,$e,fe.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){et&&st&&t.texStorage3D(n.TEXTURE_2D_ARRAY,we,Ue,Qe[0].width,Qe[0].height,fe.depth);for(let he=0,Ee=Qe.length;he<Ee;he++)if(Oe=Qe[he],_.format!==_n)if(Ce!==null)if(et){if(Y)if(_.layerUpdates.size>0){let Ie=Oh(Oe.width,Oe.height,_.format,_.type);for(let ge of _.layerUpdates){let Ye=Oe.data.subarray(ge*Ie/Oe.data.BYTES_PER_ELEMENT,(ge+1)*Ie/Oe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,ge,Oe.width,Oe.height,1,Ce,Ye)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,Oe.width,Oe.height,fe.depth,Ce,Oe.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,he,Ue,Oe.width,Oe.height,fe.depth,0,Oe.data,0,0);else ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else et?Y&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,he,0,0,0,Oe.width,Oe.height,fe.depth,Ce,$e,Oe.data):t.texImage3D(n.TEXTURE_2D_ARRAY,he,Ue,Oe.width,Oe.height,fe.depth,0,Ce,$e,Oe.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{et&&st&&t.texStorage2D(n.TEXTURE_2D,we,Ue,Qe[0].width,Qe[0].height);for(let he=0,Ee=Qe.length;he<Ee;he++)Oe=Qe[he],_.format!==_n?Ce!==null?et?Y&&t.compressedTexSubImage2D(n.TEXTURE_2D,he,0,0,Oe.width,Oe.height,Ce,Oe.data):t.compressedTexImage2D(n.TEXTURE_2D,he,Ue,Oe.width,Oe.height,0,Oe.data):ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):et?Y&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,Oe.width,Oe.height,Ce,$e,Oe.data):t.texImage2D(n.TEXTURE_2D,he,Ue,Oe.width,Oe.height,0,Ce,$e,Oe.data)}else if(_.isDataArrayTexture)if(et){if(st&&t.texStorage3D(n.TEXTURE_2D_ARRAY,we,Ue,fe.width,fe.height,fe.depth),Y)if(_.layerUpdates.size>0){let he=Oh(fe.width,fe.height,_.format,_.type);for(let Ee of _.layerUpdates){let Ie=fe.data.subarray(Ee*he/fe.data.BYTES_PER_ELEMENT,(Ee+1)*he/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Ee,fe.width,fe.height,1,Ce,$e,Ie)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Ce,$e,fe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ue,fe.width,fe.height,fe.depth,0,Ce,$e,fe.data);else if(_.isData3DTexture)et?(st&&t.texStorage3D(n.TEXTURE_3D,we,Ue,fe.width,fe.height,fe.depth),Y&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Ce,$e,fe.data)):t.texImage3D(n.TEXTURE_3D,0,Ue,fe.width,fe.height,fe.depth,0,Ce,$e,fe.data);else if(_.isFramebufferTexture){if(st)if(et)t.texStorage2D(n.TEXTURE_2D,we,Ue,fe.width,fe.height);else{let he=fe.width,Ee=fe.height;for(let Ie=0;Ie<we;Ie++)t.texImage2D(n.TEXTURE_2D,Ie,Ue,he,Ee,0,Ce,$e,null),he>>=1,Ee>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){let he=n.canvas;if(he.hasAttribute("layoutsubtree")||he.setAttribute("layoutsubtree","true"),fe.parentNode!==he){he.appendChild(fe),h.add(_),he.onpaint=Ee=>{let Ie=Ee.changedElements;for(let ge of h)Ie.includes(ge.image)&&(ge.needsUpdate=!0)},he.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,fe);else{let Ie=n.RGBA,ge=n.RGBA,Ye=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Ie,ge,Ye,fe)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Qe.length>0){if(et&&st){let he=Ae(Qe[0]);t.texStorage2D(n.TEXTURE_2D,we,Ue,he.width,he.height)}for(let he=0,Ee=Qe.length;he<Ee;he++)Oe=Qe[he],et?Y&&t.texSubImage2D(n.TEXTURE_2D,he,0,0,Ce,$e,Oe):t.texImage2D(n.TEXTURE_2D,he,Ue,Ce,$e,Oe);_.generateMipmaps=!1}else if(et){if(st){let he=Ae(fe);t.texStorage2D(n.TEXTURE_2D,we,Ue,he.width,he.height)}Y&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ce,$e,fe)}else t.texImage2D(n.TEXTURE_2D,0,Ue,Ce,$e,fe);g(_)&&T(z),be.__version=_e.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function Se(b,_,O){if(_.image.length!==6)return;let z=De(b,_),se=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+O);let _e=i.get(se);if(se.version!==_e.__version||z===!0){t.activeTexture(n.TEXTURE0+O);let be=vt.getPrimaries(vt.workingColorSpace),ce=_.colorSpace===ci?null:vt.getPrimaries(_.colorSpace),fe=_.colorSpace===ci||be===ce?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);let Ce=_.isCompressedTexture||_.image[0].isCompressedTexture,$e=_.image[0]&&_.image[0].isDataTexture,Ue=[];for(let ge=0;ge<6;ge++)!Ce&&!$e?Ue[ge]=p(_.image[ge],!0,s.maxCubemapSize):Ue[ge]=$e?_.image[ge].image:_.image[ge],Ue[ge]=de(_,Ue[ge]);let Oe=Ue[0],Qe=r.convert(_.format,_.colorSpace),et=r.convert(_.type),st=y(_.internalFormat,Qe,et,_.normalized,_.colorSpace),Y=_.isVideoTexture!==!0,we=_e.__version===void 0||z===!0,he=se.dataReady,Ee=w(_,Oe);Le(n.TEXTURE_CUBE_MAP,_);let Ie;if(Ce){Y&&we&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,st,Oe.width,Oe.height);for(let ge=0;ge<6;ge++){Ie=Ue[ge].mipmaps;for(let Ye=0;Ye<Ie.length;Ye++){let Ve=Ie[Ye];_.format!==_n?Qe!==null?Y?he&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye,0,0,Ve.width,Ve.height,Qe,Ve.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye,st,Ve.width,Ve.height,0,Ve.data):ct("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Y?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye,0,0,Ve.width,Ve.height,Qe,et,Ve.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye,st,Ve.width,Ve.height,0,Qe,et,Ve.data)}}}else{if(Ie=_.mipmaps,Y&&we){Ie.length>0&&Ee++;let ge=Ae(Ue[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Ee,st,ge.width,ge.height)}for(let ge=0;ge<6;ge++)if($e){Y?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Ue[ge].width,Ue[ge].height,Qe,et,Ue[ge].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,st,Ue[ge].width,Ue[ge].height,0,Qe,et,Ue[ge].data);for(let Ye=0;Ye<Ie.length;Ye++){let ft=Ie[Ye].image[ge].image;Y?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye+1,0,0,ft.width,ft.height,Qe,et,ft.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye+1,st,ft.width,ft.height,0,Qe,et,ft.data)}}else{Y?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,0,0,Qe,et,Ue[ge]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,0,st,Qe,et,Ue[ge]);for(let Ye=0;Ye<Ie.length;Ye++){let Ve=Ie[Ye];Y?he&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye+1,0,0,Qe,et,Ve.image[ge]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+ge,Ye+1,st,Qe,et,Ve.image[ge])}}}g(_)&&T(n.TEXTURE_CUBE_MAP),_e.__version=se.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function ve(b,_,O,z,se,_e){let be=r.convert(O.format,O.colorSpace),ce=r.convert(O.type),fe=y(O.internalFormat,be,ce,O.normalized,O.colorSpace),Ce=i.get(_),$e=i.get(O);if($e.__renderTarget=_,!Ce.__hasExternalTextures){let Ue=Math.max(1,_.width>>_e),Oe=Math.max(1,_.height>>_e);se===n.TEXTURE_3D||se===n.TEXTURE_2D_ARRAY?t.texImage3D(se,_e,fe,Ue,Oe,_.depth,0,be,ce,null):t.texImage2D(se,_e,fe,Ue,Oe,0,be,ce,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),Be(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,z,se,$e.__webglTexture,0,We(_)):(se===n.TEXTURE_2D||se>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&se<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,z,se,$e.__webglTexture,_e),t.bindFramebuffer(n.FRAMEBUFFER,null)}function je(b,_,O){if(n.bindRenderbuffer(n.RENDERBUFFER,b),_.depthBuffer){let z=_.depthTexture,se=z&&z.isDepthTexture?z.type:null,_e=M(_.stencilBuffer,se),be=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Be(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,We(_),_e,_.width,_.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,We(_),_e,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,_e,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,be,n.RENDERBUFFER,b)}else{let z=_.textures;for(let se=0;se<z.length;se++){let _e=z[se],be=r.convert(_e.format,_e.colorSpace),ce=r.convert(_e.type),fe=y(_e.internalFormat,be,ce,_e.normalized,_e.colorSpace);Be(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,We(_),fe,_.width,_.height):O?n.renderbufferStorageMultisample(n.RENDERBUFFER,We(_),fe,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,fe,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Ke(b,_,O){let z=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let se=i.get(_.depthTexture);if(se.__renderTarget=_,(!se.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),z){if(se.__webglInit===void 0&&(se.__webglInit=!0,_.depthTexture.addEventListener("dispose",P)),se.__webglTexture===void 0){se.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,se.__webglTexture),Le(n.TEXTURE_CUBE_MAP,_.depthTexture);let Ce=r.convert(_.depthTexture.format),$e=r.convert(_.depthTexture.type),Ue;_.depthTexture.format===Wi?Ue=n.DEPTH_COMPONENT24:_.depthTexture.format===js&&(Ue=n.DEPTH24_STENCIL8);for(let Oe=0;Oe<6;Oe++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Oe,0,Ue,_.width,_.height,0,Ce,$e,null)}}else ne(_.depthTexture,0);let _e=se.__webglTexture,be=We(_),ce=z?n.TEXTURE_CUBE_MAP_POSITIVE_X+O:n.TEXTURE_2D,fe=_.depthTexture.format===js?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===Wi)Be(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,fe,ce,_e,0,be):n.framebufferTexture2D(n.FRAMEBUFFER,fe,ce,_e,0);else if(_.depthTexture.format===js)Be(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,fe,ce,_e,0,be):n.framebufferTexture2D(n.FRAMEBUFFER,fe,ce,_e,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function ke(b){let _=i.get(b),O=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){let z=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),z){let se=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,z.removeEventListener("dispose",se)};z.addEventListener("dispose",se),_.__depthDisposeCallback=se}_.__boundDepthTexture=z}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(O)for(let z=0;z<6;z++)Ke(_.__webglFramebuffer[z],b,z);else{let z=b.texture.mipmaps;z&&z.length>0?Ke(_.__webglFramebuffer[0],b,0):Ke(_.__webglFramebuffer,b,0)}else if(O){_.__webglDepthbuffer=[];for(let z=0;z<6;z++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[z]),_.__webglDepthbuffer[z]===void 0)_.__webglDepthbuffer[z]=n.createRenderbuffer(),je(_.__webglDepthbuffer[z],b,!1);else{let se=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=_.__webglDepthbuffer[z];n.bindRenderbuffer(n.RENDERBUFFER,_e),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,_e)}}else{let z=b.texture.mipmaps;if(z&&z.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),je(_.__webglDepthbuffer,b,!1);else{let se=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,_e=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,_e),n.framebufferRenderbuffer(n.FRAMEBUFFER,se,n.RENDERBUFFER,_e)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function Xe(b,_,O){let z=i.get(b);_!==void 0&&ve(z.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),O!==void 0&&ke(b)}function ot(b){let _=b.texture,O=i.get(b),z=i.get(_);b.addEventListener("dispose",v);let se=b.textures,_e=b.isWebGLCubeRenderTarget===!0,be=se.length>1;if(be||(z.__webglTexture===void 0&&(z.__webglTexture=n.createTexture()),z.__version=_.version,a.memory.textures++),_e){O.__webglFramebuffer=[];for(let ce=0;ce<6;ce++)if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer[ce]=[];for(let fe=0;fe<_.mipmaps.length;fe++)O.__webglFramebuffer[ce][fe]=n.createFramebuffer()}else O.__webglFramebuffer[ce]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){O.__webglFramebuffer=[];for(let ce=0;ce<_.mipmaps.length;ce++)O.__webglFramebuffer[ce]=n.createFramebuffer()}else O.__webglFramebuffer=n.createFramebuffer();if(be)for(let ce=0,fe=se.length;ce<fe;ce++){let Ce=i.get(se[ce]);Ce.__webglTexture===void 0&&(Ce.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&Be(b)===!1){O.__webglMultisampledFramebuffer=n.createFramebuffer(),O.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,O.__webglMultisampledFramebuffer);for(let ce=0;ce<se.length;ce++){let fe=se[ce];O.__webglColorRenderbuffer[ce]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,O.__webglColorRenderbuffer[ce]);let Ce=r.convert(fe.format,fe.colorSpace),$e=r.convert(fe.type),Ue=y(fe.internalFormat,Ce,$e,fe.normalized,fe.colorSpace,b.isXRRenderTarget===!0),Oe=We(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Oe,Ue,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ce,n.RENDERBUFFER,O.__webglColorRenderbuffer[ce])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(O.__webglDepthRenderbuffer=n.createRenderbuffer(),je(O.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(_e){t.bindTexture(n.TEXTURE_CUBE_MAP,z.__webglTexture),Le(n.TEXTURE_CUBE_MAP,_);for(let ce=0;ce<6;ce++)if(_.mipmaps&&_.mipmaps.length>0)for(let fe=0;fe<_.mipmaps.length;fe++)ve(O.__webglFramebuffer[ce][fe],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,fe);else ve(O.__webglFramebuffer[ce],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ce,0);g(_)&&T(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(be){for(let ce=0,fe=se.length;ce<fe;ce++){let Ce=se[ce],$e=i.get(Ce),Ue=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Ue=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ue,$e.__webglTexture),Le(Ue,Ce),ve(O.__webglFramebuffer,b,Ce,n.COLOR_ATTACHMENT0+ce,Ue,0),g(Ce)&&T(Ue)}t.unbindTexture()}else{let ce=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ce=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ce,z.__webglTexture),Le(ce,_),_.mipmaps&&_.mipmaps.length>0)for(let fe=0;fe<_.mipmaps.length;fe++)ve(O.__webglFramebuffer[fe],b,_,n.COLOR_ATTACHMENT0,ce,fe);else ve(O.__webglFramebuffer,b,_,n.COLOR_ATTACHMENT0,ce,0);g(_)&&T(ce),t.unbindTexture()}b.depthBuffer&&ke(b)}function it(b){let _=b.textures;for(let O=0,z=_.length;O<z;O++){let se=_[O];if(g(se)){let _e=R(b),be=i.get(se).__webglTexture;t.bindTexture(_e,be),T(_e),t.unbindTexture()}}}let qe=[],ue=[];function Re(b){if(b.samples>0){if(Be(b)===!1){let _=b.textures,O=b.width,z=b.height,se=n.COLOR_BUFFER_BIT,_e=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,be=i.get(b),ce=_.length>1;if(ce)for(let Ce=0;Ce<_.length;Ce++)t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,be.__webglMultisampledFramebuffer);let fe=b.texture.mipmaps;fe&&fe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglFramebuffer);for(let Ce=0;Ce<_.length;Ce++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(se|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(se|=n.STENCIL_BUFFER_BIT)),ce){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,be.__webglColorRenderbuffer[Ce]);let $e=i.get(_[Ce]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,$e,0)}n.blitFramebuffer(0,0,O,z,0,0,O,z,se,n.NEAREST),l===!0&&(qe.length=0,ue.length=0,qe.push(n.COLOR_ATTACHMENT0+Ce),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&(qe.push(_e),ue.push(_e),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,ue)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,qe))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ce)for(let Ce=0;Ce<_.length;Ce++){t.bindFramebuffer(n.FRAMEBUFFER,be.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.RENDERBUFFER,be.__webglColorRenderbuffer[Ce]);let $e=i.get(_[Ce]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,be.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ce,n.TEXTURE_2D,$e,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,be.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&l){let _=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function We(b){return Math.min(s.maxSamples,b.samples)}function Be(b){let _=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function G(b){let _=a.render.frame;d.get(b)!==_&&(d.set(b,_),b.update())}function de(b,_){let O=b.colorSpace,z=b.format,se=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||O!==To&&O!==ci&&(vt.getTransfer(O)===Pt?(z!==_n||se!==rn)&&ct("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):ut("WebGLTextures: Unsupported texture color space:",O)),_}function Ae(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=ie,this.resetTextureUnits=F,this.getTextureUnits=D,this.setTextureUnits=X,this.setTexture2D=ne,this.setTexture2DArray=H,this.setTexture3D=re,this.setTextureCube=le,this.rebindTextures=Xe,this.setupRenderTarget=ot,this.updateRenderTargetMipmap=it,this.updateMultisampleRenderTarget=Re,this.setupDepthRenderbuffer=ke,this.setupFrameBufferTexture=ve,this.useMultisampledRTT=Be,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function YS(n,e){function t(i,s=ci){let r,a=vt.getTransfer(s);if(i===rn)return n.UNSIGNED_BYTE;if(i===Xc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===qc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Th)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Ah)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===wh)return n.BYTE;if(i===Eh)return n.SHORT;if(i===va)return n.UNSIGNED_SHORT;if(i===jc)return n.INT;if(i===Ri)return n.UNSIGNED_INT;if(i===Pi)return n.FLOAT;if(i===Li)return n.HALF_FLOAT;if(i===Ch)return n.ALPHA;if(i===Rh)return n.RGB;if(i===_n)return n.RGBA;if(i===Wi)return n.DEPTH_COMPONENT;if(i===js)return n.DEPTH_STENCIL;if(i===_r)return n.RED;if(i===$c)return n.RED_INTEGER;if(i===Xs)return n.RG;if(i===Yc)return n.RG_INTEGER;if(i===Jc)return n.RGBA_INTEGER;if(i===Zo||i===Qo||i===el||i===tl)if(a===Pt)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===Zo)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Qo)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===el)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===tl)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===Zo)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Qo)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===el)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===tl)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Kc||i===Zc||i===Qc||i===eu)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===Kc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===Zc)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Qc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===eu)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===tu||i===nu||i===iu||i===su||i===ru||i===nl||i===au)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===tu||i===nu)return a===Pt?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===iu)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===su)return r.COMPRESSED_R11_EAC;if(i===ru)return r.COMPRESSED_SIGNED_R11_EAC;if(i===nl)return r.COMPRESSED_RG11_EAC;if(i===au)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===ou||i===lu||i===cu||i===uu||i===du||i===hu||i===fu||i===pu||i===mu||i===gu||i===_u||i===xu||i===yu||i===vu)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===ou)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===lu)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===cu)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===uu)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===du)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===hu)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===fu)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===pu)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===mu)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===gu)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===_u)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===xu)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===yu)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===vu)return a===Pt?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===bu||i===Su||i===Mu)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===bu)return a===Pt?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Su)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Mu)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===wu||i===Eu||i===il||i===Tu)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===wu)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Eu)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===il)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===Tu)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===ba?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var JS=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,KS=`
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

}`,Kh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new Oo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Ot({vertexShader:JS,fragmentShader:KS,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new jt(new Fo(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},Zh=class extends ji{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,d=null,h=null,u=null,f=null,m=null,x=typeof XRWebGLBinding<"u",p=new Kh,g={},T=t.getContextAttributes(),R=null,y=null,M=[],w=[],P=new at,v=null,A=null,U=new En;U.viewport=new yt;let I=new En;I.viewport=new yt;let L=[U,I],F=new zc,D=null,X=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let Q=M[j];return Q===void 0&&(Q=new ua,M[j]=Q),Q.getTargetRaySpace()},this.getControllerGrip=function(j){let Q=M[j];return Q===void 0&&(Q=new ua,M[j]=Q),Q.getGripSpace()},this.getHand=function(j){let Q=M[j];return Q===void 0&&(Q=new ua,M[j]=Q),Q.getHandSpace()};function ie(j){let Q=w.indexOf(j.inputSource);if(Q===-1)return;let ye=M[Q];ye!==void 0&&(ye.update(j.inputSource,j.frame,c||a),ye.dispatchEvent({type:j.type,data:j.inputSource}))}function W(){s.removeEventListener("select",ie),s.removeEventListener("selectstart",ie),s.removeEventListener("selectend",ie),s.removeEventListener("squeeze",ie),s.removeEventListener("squeezestart",ie),s.removeEventListener("squeezeend",ie),s.removeEventListener("end",W),s.removeEventListener("inputsourceschange",ne);for(let j=0;j<M.length;j++){let Q=w[j];Q!==null&&(w[j]=null,M[j].disconnect(Q))}D=null,X=null,p.reset();for(let j in g)delete g[j];if(e.setRenderTarget(R),f=null,u=null,h=null,s=null,y=null,De.stop(),i.isPresenting=!1,e.setPixelRatio(v),e.setSize(P.width,P.height,!1),A!==null){let j=A.camera;j.fov=A.fov,j.zoom=A.zoom,j.updateProjectionMatrix(),A=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){r=j,i.isPresenting===!0&&ct("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){o=j,i.isPresenting===!0&&ct("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(j){c=j},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(j){if(s=j,s!==null){if(R=e.getRenderTarget(),s.addEventListener("select",ie),s.addEventListener("selectstart",ie),s.addEventListener("selectend",ie),s.addEventListener("squeeze",ie),s.addEventListener("squeezestart",ie),s.addEventListener("squeezeend",ie),s.addEventListener("end",W),s.addEventListener("inputsourceschange",ne),T.xrCompatible!==!0&&await t.makeXRCompatible(),v=e.getPixelRatio(),e.getSize(P),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let ye=null,Se=null,ve=null;T.depth&&(ve=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ye=T.stencil?js:Wi,Se=T.stencil?ba:Ri);let je={colorFormat:t.RGBA8,depthFormat:ve,scaleFactor:r};h=this.getBinding(),u=h.createProjectionLayer(je),s.updateRenderState({layers:[u]}),e.setPixelRatio(1),e.setSize(u.textureWidth,u.textureHeight,!1),y=new Vn(u.textureWidth,u.textureHeight,{format:_n,type:rn,depthTexture:new Bs(u.textureWidth,u.textureHeight,Se,void 0,void 0,void 0,void 0,void 0,void 0,ye),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:u.ignoreDepthValues===!1,resolveStencilBuffer:u.ignoreDepthValues===!1,storeMultisampledDepthBuffer:u.ignoreDepthValues===!1,storeMultisampledStencilBuffer:u.ignoreDepthValues===!1})}else{let ye={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,ye),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new Vn(f.framebufferWidth,f.framebufferHeight,{format:_n,type:rn,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),De.setContext(s),De.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function ne(j){for(let Q=0;Q<j.removed.length;Q++){let ye=j.removed[Q],Se=w.indexOf(ye);Se>=0&&(w[Se]=null,M[Se].disconnect(ye))}for(let Q=0;Q<j.added.length;Q++){let ye=j.added[Q],Se=w.indexOf(ye);if(Se===-1){for(let je=0;je<M.length;je++)if(je>=w.length){w.push(ye),Se=je;break}else if(w[je]===null){w[je]=ye,Se=je;break}if(Se===-1)break}let ve=M[Se];ve&&ve.connect(ye)}}let H=new J,re=new J;function le(j,Q,ye){H.setFromMatrixPosition(Q.matrixWorld),re.setFromMatrixPosition(ye.matrixWorld);let Se=H.distanceTo(re),ve=Q.projectionMatrix.elements,je=ye.projectionMatrix.elements,Ke=ve[14]/(ve[10]-1),ke=ve[14]/(ve[10]+1),Xe=(ve[9]+1)/ve[5],ot=(ve[9]-1)/ve[5],it=(ve[8]-1)/ve[0],qe=(je[8]+1)/je[0],ue=Ke*it,Re=Ke*qe,We=Se/(-it+qe),Be=We*-it;if(Q.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(Be),j.translateZ(We),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert(),ve[10]===-1)j.projectionMatrix.copy(Q.projectionMatrix),j.projectionMatrixInverse.copy(Q.projectionMatrixInverse);else{let G=Ke+We,de=ke+We,Ae=ue-Be,b=Re+(Se-Be),_=Xe*ke/de*G,O=ot*ke/de*G;j.projectionMatrix.makePerspective(Ae,b,_,O,G,de),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}}function ae(j,Q){Q===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(Q.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(s===null)return;let Q=j.near,ye=j.far;p.texture!==null&&(p.depthNear>0&&(Q=p.depthNear),p.depthFar>0&&(ye=p.depthFar)),F.near=I.near=U.near=Q,F.far=I.far=U.far=ye,(D!==F.near||X!==F.far)&&(s.updateRenderState({depthNear:F.near,depthFar:F.far}),D=F.near,X=F.far),F.layers.mask=j.layers.mask|6,U.layers.mask=F.layers.mask&-5,I.layers.mask=F.layers.mask&-3;let Se=j.parent,ve=F.cameras;ae(F,Se);for(let je=0;je<ve.length;je++)ae(ve[je],Se);ve.length===2?le(F,U,I):F.projectionMatrix.copy(U.projectionMatrix),A===null&&j.isPerspectiveCamera&&(A={camera:j,fov:j.fov,zoom:j.zoom}),me(j,F,Se)};function me(j,Q,ye){ye===null?j.matrix.copy(Q.matrixWorld):(j.matrix.copy(ye.matrixWorld),j.matrix.invert(),j.matrix.multiply(Q.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(Q.projectionMatrix),j.projectionMatrixInverse.copy(Q.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=la*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return F},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(j){l=j,u!==null&&(u.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(F)},this.getCameraTexture=function(j){return g[j]};let Ne=null;function Le(j,Q){if(d=Q.getViewerPose(c||a),m=Q,d!==null){let ye=d.views;f!==null&&(e.setRenderTargetFramebuffer(y,f.framebuffer),e.setRenderTarget(y));let Se=!1;ye.length!==F.cameras.length&&(F.cameras.length=0,Se=!0);for(let ke=0;ke<ye.length;ke++){let Xe=ye[ke],ot=null;if(f!==null)ot=f.getViewport(Xe);else{let qe=h.getViewSubImage(u,Xe);ot=qe.viewport,ke===0&&(e.setRenderTargetTextures(y,qe.colorTexture,qe.depthStencilTexture),e.setRenderTarget(y))}let it=L[ke];it===void 0&&(it=new En,it.layers.enable(ke),it.viewport=new yt,L[ke]=it),it.matrix.fromArray(Xe.transform.matrix),it.matrix.decompose(it.position,it.quaternion,it.scale),it.projectionMatrix.fromArray(Xe.projectionMatrix),it.projectionMatrixInverse.copy(it.projectionMatrix).invert(),it.viewport.set(ot.x,ot.y,ot.width,ot.height),ke===0&&(F.matrix.copy(it.matrix),F.matrix.decompose(F.position,F.quaternion,F.scale)),Se===!0&&F.cameras.push(it)}let ve=s.enabledFeatures;if(ve&&ve.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){h=i.getBinding();let ke=h.getDepthInformation(ye[0]);ke&&ke.isValid&&ke.texture&&p.init(ke,s.renderState)}if(ve&&ve.includes("camera-access")&&x){e.state.unbindTexture(),h=i.getBinding();for(let ke=0;ke<ye.length;ke++){let Xe=ye[ke].camera;if(Xe){let ot=g[Xe];ot||(ot=new Oo,g[Xe]=ot);let it=h.getCameraImage(Xe);ot.sourceTexture=it}}}}for(let ye=0;ye<M.length;ye++){let Se=w[ye],ve=M[ye];Se!==null&&ve!==void 0&&ve.update(Se,Q,c||a)}Ne&&Ne(j,Q),Q.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:Q}),m=null}let De=new hg;De.setAnimationLoop(Le),this.setAnimationLoop=function(j){Ne=j},this.dispose=function(){}}},ZS=new Mt,xg=new dt;xg.set(-1,0,0,0,1,0,0,0,1);function QS(n,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function i(p,g){g.color.getRGB(p.fogColor.value,Dh(n)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,T,R,y){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),h(p,g)):g.isMeshPhongMaterial?(r(p,g),d(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),u(p,g),g.isMeshPhysicalMaterial&&f(p,g,y)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),x(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,T,R):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===xn&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===xn&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let T=e.get(g),R=T.envMap,y=T.envMapRotation;R&&(p.envMap.value=R,p.envMapRotation.value.setFromMatrix4(ZS.makeRotationFromEuler(y)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(xg),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,T,R){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*T,p.scale.value=R*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function d(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function h(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function u(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,T){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===xn&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=T.texture,p.transmissionSamplerSize.value.set(T.width,T.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function x(p,g){let T=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(T.matrixWorld),p.nearDistance.value=T.shadow.camera.near,p.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function eM(n,e,t,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(y,M){let w=M.program;i.uniformBlockBinding(y,w)}function c(y,M){let w=s[y.id];w===void 0&&(p(y),w=d(y),s[y.id]=w,y.addEventListener("dispose",T));let P=M.program;i.updateUBOMapping(y,P);let v=e.render.frame;r[y.id]!==v&&(u(y),r[y.id]=v)}function d(y){let M=h();y.__bindingPointIndex=M;let w=n.createBuffer(),P=y.__size,v=y.usage;return n.bindBuffer(n.UNIFORM_BUFFER,w),n.bufferData(n.UNIFORM_BUFFER,P,v),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,M,w),w}function h(){for(let y=0;y<o;y++)if(a.indexOf(y)===-1)return a.push(y),y;return ut("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(y){let M=s[y.id],w=y.uniforms,P=y.__cache;n.bindBuffer(n.UNIFORM_BUFFER,M);for(let v=0,A=w.length;v<A;v++){let U=w[v];if(Array.isArray(U))for(let I=0,L=U.length;I<L;I++)f(U[I],v,I,P);else f(U,v,0,P)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(y,M,w,P){if(x(y,M,w,P)===!0){let v=y.__offset,A=y.value;if(Array.isArray(A)){let U=0;for(let I=0;I<A.length;I++){let L=A[I],F=g(L);m(L,y.__data,U),typeof L!="number"&&typeof L!="boolean"&&!L.isMatrix3&&!ArrayBuffer.isView(L)&&(U+=F.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(A,y.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,v,y.__data)}}function m(y,M,w){typeof y=="number"||typeof y=="boolean"?M[0]=y:y.isMatrix3?(M[0]=y.elements[0],M[1]=y.elements[1],M[2]=y.elements[2],M[3]=0,M[4]=y.elements[3],M[5]=y.elements[4],M[6]=y.elements[5],M[7]=0,M[8]=y.elements[6],M[9]=y.elements[7],M[10]=y.elements[8],M[11]=0):ArrayBuffer.isView(y)?M.set(new y.constructor(y.buffer,y.byteOffset,M.length)):y.toArray(M,w)}function x(y,M,w,P){let v=y.value,A=M+"_"+w;if(P[A]===void 0)return typeof v=="number"||typeof v=="boolean"?P[A]=v:ArrayBuffer.isView(v)?P[A]=v.slice():P[A]=v.clone(),!0;{let U=P[A];if(typeof v=="number"||typeof v=="boolean"){if(U!==v)return P[A]=v,!0}else{if(ArrayBuffer.isView(v))return!0;if(U.equals(v)===!1)return U.copy(v),!0}}return!1}function p(y){let M=y.uniforms,w=0,P=16;for(let A=0,U=M.length;A<U;A++){let I=Array.isArray(M[A])?M[A]:[M[A]];for(let L=0,F=I.length;L<F;L++){let D=I[L],X=Array.isArray(D.value)?D.value:[D.value];for(let ie=0,W=X.length;ie<W;ie++){let ne=X[ie],H=g(ne),re=w%P,le=re%H.boundary,ae=re+le;w+=le,ae!==0&&P-ae<H.storage&&(w+=P-ae),D.__data=new Float32Array(H.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=w,w+=H.storage}}}let v=w%P;return v>0&&(w+=P-v),y.__size=w,y.__cache={},this}function g(y){let M={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(M.boundary=4,M.storage=4):y.isVector2?(M.boundary=8,M.storage=8):y.isVector3||y.isColor?(M.boundary=16,M.storage=12):y.isVector4?(M.boundary=16,M.storage=16):y.isMatrix3?(M.boundary=48,M.storage=48):y.isMatrix4?(M.boundary=64,M.storage=64):y.isTexture?ct("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(y)?(M.boundary=16,M.storage=y.byteLength):ct("WebGLRenderer: Unsupported uniform value type.",y),M}function T(y){let M=y.target;M.removeEventListener("dispose",T);let w=a.indexOf(M.__bindingPointIndex);a.splice(w,1),n.deleteBuffer(s[M.id]),delete s[M.id],delete r[M.id]}function R(){for(let y in s)n.deleteBuffer(s[y]);a=[],s={},r={}}return{bind:l,update:c,dispose:R}}var tM=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ji=null;function nM(){return Ji===null&&(Ji=new _s(tM,16,16,Xs,Li),Ji.name="DFG_LUT",Ji.minFilter=Dt,Ji.magFilter=Dt,Ji.wrapS=zn,Ji.wrapT=zn,Ji.generateMipmaps=!1,Ji.needsUpdate=!0),Ji}var Du=class{constructor(e={}){let{canvas:t=Om(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:d="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:u=!1,outputBufferType:f=rn}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;let x=f,p=new Set([Jc,Yc,$c]),g=new Set([rn,Ri,va,ba,Xc,qc]),T=new Uint32Array(4),R=new Int32Array(4),y=new J,M=null,w=null,P=[],v=[],A=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Ci,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let U=this,I=!1,L=null,F=null,D=null,X=null;this._outputColorSpace=Ht;let ie=0,W=0,ne=null,H=-1,re=null,le=new yt,ae=new yt,me=null,Ne=new lt(0),Le=0,De=t.width,j=t.height,Q=1,ye=null,Se=null,ve=new yt(0,0,De,j),je=new yt(0,0,De,j),Ke=!1,ke=new fa,Xe=!1,ot=!1,it=new Mt,qe=new J,ue=new yt,Re={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},We=!1;function Be(){return ne===null?Q:1}let G=i;function de(S,k){return t.getContext(S,k)}let Ae,b,_,O,z,se,_e,be,ce,fe,Ce,$e,Ue,Oe,Qe,et,st,Y,we,he,Ee,Ie,ge;try{let S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:d,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",ft,!1),t.addEventListener("webglcontextrestored",gt,!1),t.addEventListener("webglcontextcreationerror",wt,!1),G===null){let k="webgl2";if(G=de(k,S),G===null)throw de(k)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}Ye()}catch(S){throw t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",gt,!1),t.removeEventListener("webglcontextcreationerror",wt,!1),ut("WebGLRenderer: "+S.message),S}function Ye(){Ae=new cb(G),Ae.init(),Ee=new YS(G,Ae),b=new Qv(G,Ae,e,Ee),_=new qS(G,Ae),b.reversedDepthBuffer&&u&&_.buffers.depth.setReversed(!0),F=G.createFramebuffer(),D=G.createFramebuffer(),X=G.createFramebuffer(),O=new hb(G),z=new NS,se=new $S(G,Ae,_,z,b,Ee,O),_e=new lb(U),be=new px(G),Ie=new Kv(G,be),ce=new ub(G,be,O,Ie),fe=new pb(G,ce,be,Ie,O),Y=new fb(G,b,se),Qe=new eb(z),Ce=new IS(U,_e,Ae,b,Ie,Qe),$e=new QS(U,z),Ue=new US,Oe=new VS(Ae),st=new Jv(U,_e,_,fe,m,l),et=new XS(U,fe,b),ge=new eM(G,O,b,_),we=new Zv(G,Ae,O),he=new db(G,Ae,O),O.programs=Ce.programs,U.capabilities=b,U.extensions=Ae,U.properties=z,U.renderLists=Ue,U.shadowMap=et,U.state=_,U.info=O}x!==rn&&(A=new gb(x,t.width,t.height,o,s,r));let Ve=new Zh(U,G);this.xr=Ve,this.getContext=function(){return G},this.getContextAttributes=function(){return G.getContextAttributes()},this.forceContextLoss=function(){let S=Ae.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=Ae.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return Q},this.setPixelRatio=function(S){S!==void 0&&(Q=S,this.setSize(De,j,!1))},this.getSize=function(S){return S.set(De,j)},this.setSize=function(S,k,K=!0){if(Ve.isPresenting){ct("WebGLRenderer: Can't change size while VR device is presenting.");return}De=S,j=k,t.width=Math.floor(S*Q),t.height=Math.floor(k*Q),K===!0&&(t.style.width=S+"px",t.style.height=k+"px"),A!==null&&A.setSize(t.width,t.height),this.setViewport(0,0,S,k)},this.getDrawingBufferSize=function(S){return S.set(De*Q,j*Q).floor()},this.setDrawingBufferSize=function(S,k,K){De=S,j=k,Q=K,t.width=Math.floor(S*K),t.height=Math.floor(k*K),this.setViewport(0,0,S,k)},this.setEffects=function(S){if(x===rn){ut("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let k=0;k<S.length;k++)if(S[k].isOutputPass===!0){ct("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}A.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(le)},this.getViewport=function(S){return S.copy(ve)},this.setViewport=function(S,k,K,q){S.isVector4?ve.set(S.x,S.y,S.z,S.w):ve.set(S,k,K,q),_.viewport(le.copy(ve).multiplyScalar(Q).round())},this.getScissor=function(S){return S.copy(je)},this.setScissor=function(S,k,K,q){S.isVector4?je.set(S.x,S.y,S.z,S.w):je.set(S,k,K,q),_.scissor(ae.copy(je).multiplyScalar(Q).round())},this.getScissorTest=function(){return Ke},this.setScissorTest=function(S){_.setScissorTest(Ke=S)},this.setOpaqueSort=function(S){ye=S},this.setTransparentSort=function(S){Se=S},this.getClearColor=function(S){return S.copy(st.getClearColor())},this.setClearColor=function(){st.setClearColor(...arguments)},this.getClearAlpha=function(){return st.getClearAlpha()},this.setClearAlpha=function(){st.setClearAlpha(...arguments)},this.clear=function(S=!0,k=!0,K=!0){let q=0;if(S){let Z=!1;if(ne!==null){let Te=ne.texture.format;Z=p.has(Te)}if(Z){let Te=ne.texture.type,Me=g.has(Te),Pe=st.getClearColor(),Ge=st.getClearAlpha(),tt=Pe.r,ht=Pe.g,mt=Pe.b;Me?(T[0]=tt,T[1]=ht,T[2]=mt,T[3]=Ge,G.clearBufferuiv(G.COLOR,0,T)):(R[0]=tt,R[1]=ht,R[2]=mt,R[3]=Ge,G.clearBufferiv(G.COLOR,0,R))}else q|=G.COLOR_BUFFER_BIT}k&&(q|=G.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),K&&(q|=G.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),q!==0&&G.clear(q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),L=S},this.dispose=function(){t.removeEventListener("webglcontextlost",ft,!1),t.removeEventListener("webglcontextrestored",gt,!1),t.removeEventListener("webglcontextcreationerror",wt,!1),st.dispose(),Ue.dispose(),Oe.dispose(),z.dispose(),_e.dispose(),fe.dispose(),Ie.dispose(),ge.dispose(),Ce.dispose(),Ve.dispose(),Ve.removeEventListener("sessionstart",es),Ve.removeEventListener("sessionend",on),Bt.stop()};function ft(S){S.preventDefault(),Ro("WebGLRenderer: Context Lost."),I=!0}function gt(){Ro("WebGLRenderer: Context Restored."),I=!1;let S=O.autoReset,k=et.enabled,K=et.autoUpdate,q=et.needsUpdate,Z=et.type;Ye(),O.autoReset=S,et.enabled=k,et.autoUpdate=K,et.needsUpdate=q,et.type=Z}function wt(S){ut("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Gt(S){let k=S.target;k.removeEventListener("dispose",Gt),Zt(k)}function Zt(S){an(S),z.remove(S)}function an(S){let k=z.get(S).programs;k!==void 0&&(k.forEach(function(K){Ce.releaseProgram(K)}),S.isShaderMaterial&&Ce.releaseShaderCache(S))}this.renderBufferDirect=function(S,k,K,q,Z,Te){k===null&&(k=Re);let Me=Z.isMesh&&Z.matrixWorld.determinantAffine()<0,Pe=ee(S,k,K,q,Z);_.setMaterial(q,Me);let Ge=K.index,tt=1;if(q.wireframe===!0){if(Ge=ce.getWireframeAttribute(K),Ge===void 0)return;tt=2}let ht=K.drawRange,mt=K.attributes.position,Ze=ht.start*tt,bt=(ht.start+ht.count)*tt;Te!==null&&(Ze=Math.max(Ze,Te.start*tt),bt=Math.min(bt,(Te.start+Te.count)*tt)),Ge!==null?(Ze=Math.max(Ze,0),bt=Math.min(bt,Ge.count)):mt!=null&&(Ze=Math.max(Ze,0),bt=Math.min(bt,mt.count));let zt=bt-Ze;if(zt<0||zt===1/0)return;Ie.setup(Z,q,Pe,K,Ge);let It,At=we;if(Ge!==null&&(It=be.get(Ge),At=he,At.setIndex(It)),Z.isMesh)q.wireframe===!0?(_.setLineWidth(q.wireframeLinewidth*Be()),At.setMode(G.LINES)):At.setMode(G.TRIANGLES);else if(Z.isLine){let Qt=q.linewidth;Qt===void 0&&(Qt=1),_.setLineWidth(Qt*Be()),Z.isLineSegments?At.setMode(G.LINES):Z.isLineLoop?At.setMode(G.LINE_LOOP):At.setMode(G.LINE_STRIP)}else Z.isPoints?At.setMode(G.POINTS):Z.isSprite&&At.setMode(G.TRIANGLES);if(Z.isBatchedMesh)if(Ae.get("WEBGL_multi_draw"))At.renderMultiDraw(Z._multiDrawStarts,Z._multiDrawCounts,Z._multiDrawCount);else{let Qt=Z._multiDrawStarts,Je=Z._multiDrawCounts,ln=Z._multiDrawCount,xt=Ge?be.get(Ge).bytesPerElement:1,cn=z.get(q).currentProgram.getUniforms();for(let pn=0;pn<ln;pn++)cn.setValue(G,"_gl_DrawID",pn),At.render(Qt[pn]/xt,Je[pn])}else if(Z.isInstancedMesh)At.renderInstances(Ze,zt,Z.count);else if(K.isInstancedBufferGeometry){let Qt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Je=Math.min(K.instanceCount,Qt);At.renderInstances(Ze,zt,Je)}else At.render(Ze,zt)};function qt(S,k,K,q){L!==null&&S.isNodeMaterial&&L.setObject(q,S),Xe===!0&&Qe.setState(S,K,!1),S.transparent===!0&&S.side===li&&S.forceSinglePass===!1?(S.side=xn,S.needsUpdate=!0,Rn(S,k,q),S.side=Gs,S.needsUpdate=!0,Rn(S,k,q),S.side=li):Rn(S,k,q)}this.compile=function(S,k,K=null){K===null&&(K=S),L!==null&&L.renderStart(S,k,K),w=Oe.get(K),w.init(k),v.push(w),K.traverseVisible(function(Z){Z.isLight&&Z.layers.test(k.layers)&&(w.pushLight(Z),Z.castShadow&&w.pushShadow(Z))}),S!==K&&S.traverseVisible(function(Z){Z.isLight&&Z.layers.test(k.layers)&&(w.pushLight(Z),Z.castShadow&&w.pushShadow(Z))}),w.setupLights(),L!==null&&L.updateLights(w.state.lightsArray),ot=this.localClippingEnabled,Xe=Qe.init(this.clippingPlanes,ot),Xe===!0&&Qe.setGlobalState(this.clippingPlanes,k),L!==null&&et.render(w.state.shadowsArray,K,k);let q=new Set;return S.traverse(function(Z){if(!(Z.isMesh||Z.isPoints||Z.isLine||Z.isSprite))return;let Te=Z.material;if(Te)if(Array.isArray(Te))for(let Me=0;Me<Te.length;Me++){let Pe=Te[Me];qt(Pe,K,k,Z),q.add(Pe)}else qt(Te,K,k,Z),q.add(Te)}),w=v.pop(),L!==null&&L.renderEnd(),q},this.compileAsync=function(S,k,K=null){let q=this.compile(S,k,K);return new Promise(Z=>{function Te(){if(q.forEach(function(Me){let Ge=z.get(Me).currentProgram;(Ge===void 0||Ge.isReady())&&q.delete(Me)}),q.size===0){Z(S);return}setTimeout(Te,10)}Ae.get("KHR_parallel_shader_compile")!==null?Te():setTimeout(Te,10)})};let Hn=null;function bs(S){Hn&&Hn(S)}function es(){Bt.stop()}function on(){Bt.start()}let Bt=new hg;Bt.setAnimationLoop(bs),typeof self<"u"&&Bt.setContext(self),this.setAnimationLoop=function(S){Hn=S,Ve.setAnimationLoop(S),S===null?Bt.stop():Bt.start()},Ve.addEventListener("sessionstart",es),Ve.addEventListener("sessionend",on),this.render=function(S,k){if(k!==void 0&&k.isCamera!==!0){ut("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(I===!0)return;L!==null&&L.renderStart(S,k);let K=Ve.enabled===!0&&Ve.isPresenting===!0,q=A!==null&&(ne===null||K)&&A.begin(U,ne);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),k.parent===null&&k.matrixWorldAutoUpdate===!0&&k.updateMatrixWorld(),Ve.enabled===!0&&Ve.isPresenting===!0&&(A===null||A.isCompositing()===!1)&&(Ve.cameraAutoUpdate===!0&&Ve.updateCamera(k),k=Ve.getCamera()),S.isScene===!0&&S.onBeforeRender(U,S,k,ne),w=Oe.get(S,v.length),w.init(k),w.state.textureUnits=se.getTextureUnits(),v.push(w),it.multiplyMatrices(k.projectionMatrix,k.matrixWorldInverse),ke.setFromProjectionMatrix(it,Ei,k.reversedDepth),ot=this.localClippingEnabled,Xe=Qe.init(this.clippingPlanes,ot),M=Ue.get(S,P.length),M.init(),P.push(M),Ve.enabled===!0&&Ve.isPresenting===!0){let Me=U.xr.getDepthSensingMesh();Me!==null&&Qn(Me,k,-1/0,U.sortObjects)}Qn(S,k,0,U.sortObjects),M.finish(),L!==null&&L.updateLights(w.state.lightsArray),U.sortObjects===!0&&M.sort(ye,Se),We=Ve.enabled===!1||Ve.isPresenting===!1||Ve.hasDepthSensing()===!1,We&&st.addToRenderList(M,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),Xe===!0&&Qe.beginShadows();let Z=w.state.shadowsArray;if(et.render(Z,S,k),Xe===!0&&Qe.endShadows(),(q&&A.hasRenderPass())===!1){let Me=M.opaque,Pe=M.transmissive;if(w.setupLights(),k.isArrayCamera){let Ge=k.cameras;if(Pe.length>0)for(let tt=0,ht=Ge.length;tt<ht;tt++){let mt=Ge[tt];Ss(Me,Pe,S,mt)}We&&st.render(S);for(let tt=0,ht=Ge.length;tt<ht;tt++){let mt=Ge[tt];Gn(M,S,mt,mt.viewport)}}else Pe.length>0&&Ss(Me,Pe,S,k),We&&st.render(S),Gn(M,S,k)}ne!==null&&W===0&&(se.updateMultisampleRenderTarget(ne),se.updateRenderTargetMipmap(ne)),q&&A.end(U),S.isScene===!0&&S.onAfterRender(U,S,k),Ie.resetDefaultState(),H=-1,re=null,v.pop(),v.length>0?(w=v[v.length-1],se.setTextureUnits(w.state.textureUnits),Xe===!0&&Qe.setGlobalState(U.clippingPlanes,w.state.camera)):w=null,P.pop(),P.length>0?M=P[P.length-1]:M=null,L!==null&&L.renderEnd()};function Qn(S,k,K,q){if(S.visible===!1)return;if(S.layers.test(k.layers)){if(S.isGroup)K=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(k);else if(S.isLightProbeGrid)w.pushLightProbeGrid(S);else if(S.isLight)w.pushLight(S),S.castShadow&&w.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(ke)){q&&ue.setFromMatrixPosition(S.matrixWorld).applyMatrix4(it);let Me=fe.update(S),Pe=S.material;Pe.visible&&M.push(S,Me,Pe,K,ue.z,null,k)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(ke))){let Me=fe.update(S),Pe=S.material;if(q&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),ue.copy(S.boundingSphere.center)):(Me.boundingSphere===null&&Me.computeBoundingSphere(),ue.copy(Me.boundingSphere.center)),ue.applyMatrix4(S.matrixWorld).applyMatrix4(it)),Array.isArray(Pe)){let Ge=Me.groups;for(let tt=0,ht=Ge.length;tt<ht;tt++){let mt=Ge[tt],Ze=Pe[mt.materialIndex];Ze&&Ze.visible&&M.push(S,Me,Ze,K,ue.z,mt,k)}}else Pe.visible&&M.push(S,Me,Pe,K,ue.z,null,k)}}let Te=S.children;for(let Me=0,Pe=Te.length;Me<Pe;Me++)Qn(Te[Me],k,K,q)}function Gn(S,k,K,q){let{opaque:Z,transmissive:Te,transparent:Me}=S;w.setupLightsView(K),Xe===!0&&Qe.setGlobalState(U.clippingPlanes,K),q&&_.viewport(le.copy(q)),Z.length>0&&ts(Z,k,K),Te.length>0&&ts(Te,k,K),Me.length>0&&ts(Me,k,K),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Ss(S,k,K,q){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;if(w.state.transmissionRenderTarget[q.id]===void 0){let Ze=Ae.has("EXT_color_buffer_half_float")||Ae.has("EXT_color_buffer_float");w.state.transmissionRenderTarget[q.id]=new Vn(1,1,{generateMipmaps:!0,type:Ze?Li:rn,minFilter:Kn,samples:Math.max(4,b.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:vt.workingColorSpace})}let Te=w.state.transmissionRenderTarget[q.id],Me=q.viewport||le;Te.setSize(Me.z*U.transmissionResolutionScale,Me.w*U.transmissionResolutionScale);let Pe=U.getRenderTarget(),Ge=U.getActiveCubeFace(),tt=U.getActiveMipmapLevel();U.setRenderTarget(Te),U.getClearColor(Ne),Le=U.getClearAlpha(),Le<1&&U.setClearColor(16777215,.5),U.clear(),We&&st.render(K);let ht=U.toneMapping;U.toneMapping=Ci;let mt=q.viewport;if(q.viewport!==void 0&&(q.viewport=void 0),w.setupLightsView(q),Xe===!0&&Qe.setGlobalState(U.clippingPlanes,q),ts(S,K,q),se.updateMultisampleRenderTarget(Te),se.updateRenderTargetMipmap(Te),Ae.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let bt=0,zt=k.length;bt<zt;bt++){let It=k[bt],{object:At,geometry:Qt,material:Je,group:ln}=It;if(Je.side===li&&At.layers.test(q.layers)){let xt=Je.side;Je.side=xn,Je.needsUpdate=!0,Ms(At,K,q,Qt,Je,ln),Je.side=xt,Je.needsUpdate=!0,Ze=!0}}Ze===!0&&(se.updateMultisampleRenderTarget(Te),se.updateRenderTargetMipmap(Te))}U.setRenderTarget(Pe,Ge,tt),U.setClearColor(Ne,Le),mt!==void 0&&(q.viewport=mt),U.toneMapping=ht}function ts(S,k,K){let q=k.isScene===!0?k.overrideMaterial:null;for(let Z=0,Te=S.length;Z<Te;Z++){let Me=S[Z],{object:Pe,geometry:Ge,group:tt}=Me,ht=Me.material;ht.allowOverride===!0&&q!==null&&(ht=q),Pe.layers.test(K.layers)&&Ms(Pe,k,K,Ge,ht,tt)}}function Ms(S,k,K,q,Z,Te){L!==null&&Z.isNodeMaterial&&L.setObject(S,Z),S.onBeforeRender(U,k,K,q,Z,Te),S.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),Z.onBeforeRender(U,k,K,q,S,Te),Z.transparent===!0&&Z.side===li&&Z.forceSinglePass===!1?(Z.side=xn,Z.needsUpdate=!0,U.renderBufferDirect(K,k,q,Z,S,Te),Z.side=Gs,Z.needsUpdate=!0,U.renderBufferDirect(K,k,q,Z,S,Te),Z.side=li):U.renderBufferDirect(K,k,q,Z,S,Te),S.onAfterRender(U,k,K,q,Z,Te)}function Rn(S,k,K){k.isScene!==!0&&(k=Re);let q=z.get(S),Z=w.state.lights,Te=w.state.shadowsArray,Me=Z.state.version,Pe=Ce.getParameters(S,Z.state,Te,k,K,w.state.lightProbeGridArray),Ge=Ce.getProgramCacheKey(Pe),tt=q.programs;q.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?k.environment:null,q.fog=k.fog;let ht=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;q.envMap=_e.get(S.envMap||q.environment,ht),q.envMapRotation=q.environment!==null&&S.envMap===null?k.environmentRotation:S.envMapRotation,tt===void 0&&(S.addEventListener("dispose",Gt),tt=new Map,q.programs=tt);let mt=tt.get(Ge);if(mt!==void 0){if(q.currentProgram===mt&&q.lightsStateVersion===Me)return B(S,Pe),mt}else Pe.uniforms=Ce.getUniforms(S),L!==null&&S.isNodeMaterial&&L.build(S,K,Pe),S.onBeforeCompile(Pe,U),mt=Ce.acquireProgram(Pe,Ge),tt.set(Ge,mt),q.uniforms=Pe.uniforms;let Ze=q.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ze.clippingPlanes=Qe.uniform),B(S,Pe),q.needsLights=oe(S),q.lightsStateVersion=Me,q.needsLights&&(Ze.ambientLightColor.value=Z.state.ambient,Ze.lightProbe.value=Z.state.probe,Ze.sunLights.value=Z.state.sun,Ze.sunLightShadows.value=Z.state.sunShadow,Ze.directionalLights.value=Z.state.directional,Ze.directionalLightShadows.value=Z.state.directionalShadow,Ze.spotLights.value=Z.state.spot,Ze.spotLightShadows.value=Z.state.spotShadow,Ze.rectAreaLights.value=Z.state.rectArea,Ze.ltc_1.value=Z.state.rectAreaLTC1,Ze.ltc_2.value=Z.state.rectAreaLTC2,Ze.pointLights.value=Z.state.point,Ze.pointLightShadows.value=Z.state.pointShadow,Ze.hemisphereLights.value=Z.state.hemi,Ze.sunShadowMatrix.value=Z.state.sunShadowMatrix,Ze.sunShadowCascade.value=Z.state.sunShadowCascade,Ze.directionalShadowMatrix.value=Z.state.directionalShadowMatrix,Ze.spotLightMatrix.value=Z.state.spotLightMatrix,Ze.spotLightMap.value=Z.state.spotLightMap,Ze.pointShadowMatrix.value=Z.state.pointShadowMatrix),q.lightProbeGrid=w.state.lightProbeGridArray.length>0,q.currentProgram=mt,q.uniformsList=null,mt}function C(S){if(S.uniformsList===null){let k=S.currentProgram.getUniforms();S.uniformsList=wa.seqWithValue(k.seq,S.uniforms)}return S.uniformsList}function B(S,k){let K=z.get(S);K.outputColorSpace=k.outputColorSpace,K.batching=k.batching,K.batchingColor=k.batchingColor,K.instancing=k.instancing,K.instancingColor=k.instancingColor,K.instancingMorph=k.instancingMorph,K.skinning=k.skinning,K.morphTargets=k.morphTargets,K.morphNormals=k.morphNormals,K.morphColors=k.morphColors,K.morphTargetsCount=k.morphTargetsCount,K.numClippingPlanes=k.numClippingPlanes,K.numIntersection=k.numClipIntersection,K.vertexAlphas=k.vertexAlphas,K.vertexTangents=k.vertexTangents,K.toneMapping=k.toneMapping}function V(S,k){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;y.setFromMatrixPosition(k.matrixWorld);for(let K=0,q=S.length;K<q;K++){let Z=S[K];if(Z.texture!==null&&Z.boundingBox.containsPoint(y))return Z}return null}function ee(S,k,K,q,Z){k.isScene!==!0&&(k=Re),se.resetTextureUnits();let Te=k.fog,Me=q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial?k.environment:null,Pe=ne===null?U.outputColorSpace:ne.isXRRenderTarget===!0?ne.texture.colorSpace:vt.workingColorSpace,Ge=q.isMeshStandardMaterial||q.isMeshLambertMaterial&&!q.envMap||q.isMeshPhongMaterial&&!q.envMap,tt=_e.get(q.envMap||Me,Ge),ht=q.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,mt=!!K.attributes.tangent&&(!!q.normalMap||q.anisotropy>0),Ze=!!K.morphAttributes.position,bt=!!K.morphAttributes.normal,zt=!!K.morphAttributes.color,It=Ci;q.toneMapped&&(ne===null||ne.isXRRenderTarget===!0)&&(It=U.toneMapping);let At=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,Qt=At!==void 0?At.length:0,Je=z.get(q),ln=w.state.lights;if(Xe===!0&&(ot===!0||S!==re)){let Ct=S===re&&q.id===H;Qe.setState(q,S,Ct)}let xt=!1;q.version===Je.__version?(Je.needsLights&&Je.lightsStateVersion!==ln.state.version||Je.outputColorSpace!==Pe||Z.isBatchedMesh&&Je.batching===!1||!Z.isBatchedMesh&&Je.batching===!0||Z.isBatchedMesh&&Je.batchingColor===!0&&Z._colorsTexture===null||Z.isBatchedMesh&&Je.batchingColor===!1&&Z._colorsTexture!==null||Z.isInstancedMesh&&Je.instancing===!1||!Z.isInstancedMesh&&Je.instancing===!0||Z.isSkinnedMesh&&Je.skinning===!1||!Z.isSkinnedMesh&&Je.skinning===!0||Z.isInstancedMesh&&Je.instancingColor===!0&&Z.instanceColor===null||Z.isInstancedMesh&&Je.instancingColor===!1&&Z.instanceColor!==null||Z.isInstancedMesh&&Je.instancingMorph===!0&&Z.morphTexture===null||Z.isInstancedMesh&&Je.instancingMorph===!1&&Z.morphTexture!==null||Je.envMap!==tt||q.fog===!0&&Je.fog!==Te||Je.numClippingPlanes!==void 0&&(Je.numClippingPlanes!==Qe.numPlanes||Je.numIntersection!==Qe.numIntersection)||Je.vertexAlphas!==ht||Je.vertexTangents!==mt||Je.morphTargets!==Ze||Je.morphNormals!==bt||Je.morphColors!==zt||Je.toneMapping!==It||Je.morphTargetsCount!==Qt||!!Je.lightProbeGrid!=w.state.lightProbeGridArray.length>0)&&(xt=!0):(xt=!0,Je.__version=q.version);let cn=Je.currentProgram;xt===!0&&(cn=Rn(q,k,Z),L&&q.isNodeMaterial&&L.onUpdateProgram(q,cn,Je));let pn=!1,hi=!1,Ni=!1,Et=cn.getUniforms(),Vt=Je.uniforms;if(_.useProgram(cn.program)&&(pn=!0,hi=!0,Ni=!0),q.id!==H&&(H=q.id,hi=!0),Je.needsLights){let Ct=V(w.state.lightProbeGridArray,Z);Je.lightProbeGrid!==Ct&&(Je.lightProbeGrid=Ct,hi=!0)}if(pn||re!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Et.setValue(G,"projectionMatrix",S.projectionMatrix),Et.setValue(G,"viewMatrix",S.matrixWorldInverse);let Di=Et.map.cameraPosition;Di!==void 0&&Di.setValue(G,qe.setFromMatrixPosition(S.matrixWorld)),b.logarithmicDepthBuffer&&Et.setValue(G,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(q.isMeshPhongMaterial||q.isMeshToonMaterial||q.isMeshLambertMaterial||q.isMeshBasicMaterial||q.isMeshStandardMaterial||q.isShaderMaterial)&&Et.setValue(G,"isOrthographic",S.isOrthographicCamera===!0),re!==S&&(re=S,hi=!0,Ni=!0)}if(Je.needsLights&&(ln.state.sunShadowMap.length>0&&Et.setValue(G,"sunShadowMap",ln.state.sunShadowMap,se),ln.state.directionalShadowMap.length>0&&Et.setValue(G,"directionalShadowMap",ln.state.directionalShadowMap,se),ln.state.spotShadowMap.length>0&&Et.setValue(G,"spotShadowMap",ln.state.spotShadowMap,se),ln.state.pointShadowMap.length>0&&Et.setValue(G,"pointShadowMap",ln.state.pointShadowMap,se)),Z.isSkinnedMesh){Et.setOptional(G,Z,"bindMatrix"),Et.setOptional(G,Z,"bindMatrixInverse");let Ct=Z.skeleton;Ct&&(Ct.boneTexture===null&&Ct.computeBoneTexture(),Et.setValue(G,"boneTexture",Ct.boneTexture,se))}Z.isBatchedMesh&&(Et.setOptional(G,Z,"batchingTexture"),Et.setValue(G,"batchingTexture",Z._matricesTexture,se),Et.setOptional(G,Z,"batchingIdTexture"),Et.setValue(G,"batchingIdTexture",Z._indirectTexture,se),Et.setOptional(G,Z,"batchingColorTexture"),Z._colorsTexture!==null&&Et.setValue(G,"batchingColorTexture",Z._colorsTexture,se));let fi=K.morphAttributes;if((fi.position!==void 0||fi.normal!==void 0||fi.color!==void 0)&&Y.update(Z,K,cn),(hi||Je.receiveShadow!==Z.receiveShadow)&&(Je.receiveShadow=Z.receiveShadow,Et.setValue(G,"receiveShadow",Z.receiveShadow)),(q.isMeshStandardMaterial||q.isMeshLambertMaterial||q.isMeshPhongMaterial)&&q.envMap===null&&k.environment!==null&&(Vt.envMapIntensity.value=k.environmentIntensity),Vt.dfgLUT!==void 0&&(Vt.dfgLUT.value=nM()),hi){if(Et.setValue(G,"toneMappingExposure",U.toneMappingExposure),Je.needsLights&&te(Vt,Ni),Te&&q.fog===!0&&$e.refreshFogUniforms(Vt,Te),$e.refreshMaterialUniforms(Vt,q,Q,j,w.state.transmissionRenderTarget[S.id]),Je.needsLights&&Je.lightProbeGrid){let Ct=Je.lightProbeGrid;Vt.probesSH.value=Ct.texture,Vt.probesMin.value.copy(Ct.boundingBox.min),Vt.probesMax.value.copy(Ct.boundingBox.max),Vt.probesResolution.value.copy(Ct.resolution)}wa.upload(G,C(Je),Vt,se)}if(q.isShaderMaterial&&q.uniformsNeedUpdate===!0&&(wa.upload(G,C(Je),Vt,se),q.uniformsNeedUpdate=!1),q.isSpriteMaterial&&Et.setValue(G,"center",Z.center),Et.setValue(G,"modelViewMatrix",Z.modelViewMatrix),Et.setValue(G,"normalMatrix",Z.normalMatrix),Et.setValue(G,"modelMatrix",Z.matrixWorld),q.uniformsGroups!==void 0){let Ct=q.uniformsGroups;for(let Di=0,Ui=Ct.length;Di<Ui;Di++){let Mr=Ct[Di];ge.update(Mr,cn),ge.bind(Mr,cn)}}return cn}function te(S,k){S.ambientLightColor.needsUpdate=k,S.lightProbe.needsUpdate=k,S.sunLights.needsUpdate=k,S.sunLightShadows.needsUpdate=k,S.directionalLights.needsUpdate=k,S.directionalLightShadows.needsUpdate=k,S.pointLights.needsUpdate=k,S.pointLightShadows.needsUpdate=k,S.spotLights.needsUpdate=k,S.spotLightShadows.needsUpdate=k,S.rectAreaLights.needsUpdate=k,S.hemisphereLights.needsUpdate=k}function oe(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return ie},this.getActiveMipmapLevel=function(){return W},this.getRenderTarget=function(){return ne},this.setRenderTargetTextures=function(S,k,K){let q=z.get(S);q.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,q.__autoAllocateDepthBuffer===!1&&(q.__useRenderToTexture=!1),z.get(S.texture).__webglTexture=k,z.get(S.depthTexture).__webglTexture=q.__autoAllocateDepthBuffer?void 0:K,q.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,k){let K=z.get(S);K.__webglFramebuffer=k,K.__useDefaultFramebuffer=k===void 0},this.setRenderTarget=function(S,k=0,K=0){ne=S,ie=k,W=K;let q=null,Z=!1,Te=!1;if(S){let Pe=z.get(S);if(Pe.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(G.FRAMEBUFFER,Pe.__webglFramebuffer),le.copy(S.viewport),ae.copy(S.scissor),me=S.scissorTest,_.viewport(le),_.scissor(ae),_.setScissorTest(me),H=-1;return}else if(Pe.__webglFramebuffer===void 0)se.setupRenderTarget(S);else if(Pe.__hasExternalTextures)se.rebindTextures(S,z.get(S.texture).__webglTexture,z.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let ht=S.depthTexture;if(Pe.__boundDepthTexture!==ht){if(ht!==null&&z.has(ht)&&(S.width!==ht.image.width||S.height!==ht.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");se.setupDepthRenderbuffer(S)}}let Ge=S.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Te=!0);let tt=z.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(tt[k])?q=tt[k][K]:q=tt[k],Z=!0):S.samples>0&&se.useMultisampledRTT(S)===!1?q=z.get(S).__webglMultisampledFramebuffer:Array.isArray(tt)?q=tt[K]:q=tt,le.copy(S.viewport),ae.copy(S.scissor),me=S.scissorTest}else le.copy(ve).multiplyScalar(Q).floor(),ae.copy(je).multiplyScalar(Q).floor(),me=Ke;if(K!==0&&(q=F),_.bindFramebuffer(G.FRAMEBUFFER,q)&&_.drawBuffers(S,q),_.viewport(le),_.scissor(ae),_.setScissorTest(me),Z){let Pe=z.get(S.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_CUBE_MAP_POSITIVE_X+k,Pe.__webglTexture,K)}else if(Te){let Pe=k;for(let Ge=0;Ge<S.textures.length;Ge++){let tt=z.get(S.textures[Ge]);G.framebufferTextureLayer(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0+Ge,tt.__webglTexture,K,Pe)}}else if(S!==null&&K!==0){let Pe=z.get(S.texture);G.framebufferTexture2D(G.FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Pe.__webglTexture,K)}H=-1};function He(S){let k=z.get(S);return(k.__readFormat!==S.format||k.__readType!==S.type)&&(k.__readFormat=S.format,k.__readType=S.type,k.__formatReadable=b.textureFormatReadable(S.format),k.__typeReadable=b.textureTypeReadable(S.type)),k}this.readRenderTargetPixels=function(S,k,K,q,Z,Te,Me,Pe=0){if(!(S&&S.isWebGLRenderTarget)){ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=z.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Me!==void 0&&(Ge=Ge[Me]),Ge){_.bindFramebuffer(G.FRAMEBUFFER,Ge);try{let tt=S.textures[Pe],ht=tt.format,mt=tt.type;S.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Pe);let Ze=He(tt);if(Ze.__formatReadable===!1){ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ze.__typeReadable===!1){ut("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}k>=0&&k<=S.width-q&&K>=0&&K<=S.height-Z&&G.readPixels(k,K,q,Z,Ee.convert(ht),Ee.convert(mt),Te)}finally{let tt=ne!==null?z.get(ne).__webglFramebuffer:null;_.bindFramebuffer(G.FRAMEBUFFER,tt)}}},this.readRenderTargetPixelsAsync=async function(S,k,K,q,Z,Te,Me,Pe=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ge=z.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Me!==void 0&&(Ge=Ge[Me]),Ge)if(k>=0&&k<=S.width-q&&K>=0&&K<=S.height-Z){_.bindFramebuffer(G.FRAMEBUFFER,Ge);let tt=S.textures[Pe],ht=tt.format,mt=tt.type;S.textures.length>1&&G.readBuffer(G.COLOR_ATTACHMENT0+Pe);let Ze=He(tt);if(Ze.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ze.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let bt=G.createBuffer();G.bindBuffer(G.PIXEL_PACK_BUFFER,bt),G.bufferData(G.PIXEL_PACK_BUFFER,Te.byteLength,G.STREAM_READ),G.readPixels(k,K,q,Z,Ee.convert(ht),Ee.convert(mt),0),G.bindBuffer(G.PIXEL_PACK_BUFFER,null);let zt=ne!==null?z.get(ne).__webglFramebuffer:null;_.bindFramebuffer(G.FRAMEBUFFER,zt);let It=G.fenceSync(G.SYNC_GPU_COMMANDS_COMPLETE,0);return G.flush(),await Bm(G,It,4),G.bindBuffer(G.PIXEL_PACK_BUFFER,bt),G.getBufferSubData(G.PIXEL_PACK_BUFFER,0,Te),G.bindBuffer(G.PIXEL_PACK_BUFFER,null),G.deleteBuffer(bt),G.deleteSync(It),Te}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,k=null,K=0){let q=Math.pow(2,-K),Z=Math.floor(S.image.width*q),Te=Math.floor(S.image.height*q),Me=k!==null?k.x:0,Pe=k!==null?k.y:0;se.setTexture2D(S,0),G.copyTexSubImage2D(G.TEXTURE_2D,K,0,0,Me,Pe,Z,Te),_.unbindTexture()},this.copyTextureToTexture=function(S,k,K=null,q=null,Z=0,Te=0){let Me,Pe,Ge,tt,ht,mt,Ze,bt,zt,It=S.isCompressedTexture?S.mipmaps[Te]:S.image;if(K!==null)Me=K.max.x-K.min.x,Pe=K.max.y-K.min.y,Ge=K.isBox3?K.max.z-K.min.z:1,tt=K.min.x,ht=K.min.y,mt=K.isBox3?K.min.z:0;else{let Vt=Math.pow(2,-Z);Me=Math.floor(It.width*Vt),Pe=Math.floor(It.height*Vt),S.isDataArrayTexture?Ge=It.depth:S.isData3DTexture?Ge=Math.floor(It.depth*Vt):Ge=1,tt=0,ht=0,mt=0}q!==null?(Ze=q.x,bt=q.y,zt=q.z):(Ze=0,bt=0,zt=0);let At=Ee.convert(k.format),Qt=Ee.convert(k.type),Je;k.isData3DTexture?(se.setTexture3D(k,0),Je=G.TEXTURE_3D):k.isDataArrayTexture||k.isCompressedArrayTexture?(se.setTexture2DArray(k,0),Je=G.TEXTURE_2D_ARRAY):(se.setTexture2D(k,0),Je=G.TEXTURE_2D),_.activeTexture(G.TEXTURE0),_.pixelStorei(G.UNPACK_FLIP_Y_WEBGL,k.flipY),_.pixelStorei(G.UNPACK_PREMULTIPLY_ALPHA_WEBGL,k.premultiplyAlpha),_.pixelStorei(G.UNPACK_ALIGNMENT,k.unpackAlignment);let ln=_.getParameter(G.UNPACK_ROW_LENGTH),xt=_.getParameter(G.UNPACK_IMAGE_HEIGHT),cn=_.getParameter(G.UNPACK_SKIP_PIXELS),pn=_.getParameter(G.UNPACK_SKIP_ROWS),hi=_.getParameter(G.UNPACK_SKIP_IMAGES);_.pixelStorei(G.UNPACK_ROW_LENGTH,It.width),_.pixelStorei(G.UNPACK_IMAGE_HEIGHT,It.height),_.pixelStorei(G.UNPACK_SKIP_PIXELS,tt),_.pixelStorei(G.UNPACK_SKIP_ROWS,ht),_.pixelStorei(G.UNPACK_SKIP_IMAGES,mt);let Ni=S.isDataArrayTexture||S.isData3DTexture,Et=k.isDataArrayTexture||k.isData3DTexture;if(S.isDepthTexture){let Vt=z.get(S),fi=z.get(k),Ct=z.get(Vt.__renderTarget),Di=z.get(fi.__renderTarget);_.bindFramebuffer(G.READ_FRAMEBUFFER,Ct.__webglFramebuffer),_.bindFramebuffer(G.DRAW_FRAMEBUFFER,Di.__webglFramebuffer);for(let Ui=0;Ui<Ge;Ui++)Ni&&(G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,z.get(S).__webglTexture,Z,mt+Ui),G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,z.get(k).__webglTexture,Te,zt+Ui)),G.blitFramebuffer(tt,ht,Me,Pe,Ze,bt,Me,Pe,G.DEPTH_BUFFER_BIT,G.NEAREST);_.bindFramebuffer(G.READ_FRAMEBUFFER,null),_.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else if(Z!==0||S.isRenderTargetTexture||z.has(S)){let Vt=z.get(S),fi=z.get(k);_.bindFramebuffer(G.READ_FRAMEBUFFER,D),_.bindFramebuffer(G.DRAW_FRAMEBUFFER,X);for(let Ct=0;Ct<Ge;Ct++)Ni?G.framebufferTextureLayer(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,Vt.__webglTexture,Z,mt+Ct):G.framebufferTexture2D(G.READ_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,Vt.__webglTexture,Z),Et?G.framebufferTextureLayer(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,fi.__webglTexture,Te,zt+Ct):G.framebufferTexture2D(G.DRAW_FRAMEBUFFER,G.COLOR_ATTACHMENT0,G.TEXTURE_2D,fi.__webglTexture,Te),Z!==0?G.blitFramebuffer(tt,ht,Me,Pe,Ze,bt,Me,Pe,G.COLOR_BUFFER_BIT,G.NEAREST):Et?G.copyTexSubImage3D(Je,Te,Ze,bt,zt+Ct,tt,ht,Me,Pe):G.copyTexSubImage2D(Je,Te,Ze,bt,tt,ht,Me,Pe);_.bindFramebuffer(G.READ_FRAMEBUFFER,null),_.bindFramebuffer(G.DRAW_FRAMEBUFFER,null)}else Et?S.isDataTexture||S.isData3DTexture?G.texSubImage3D(Je,Te,Ze,bt,zt,Me,Pe,Ge,At,Qt,It.data):k.isCompressedArrayTexture?G.compressedTexSubImage3D(Je,Te,Ze,bt,zt,Me,Pe,Ge,At,It.data):G.texSubImage3D(Je,Te,Ze,bt,zt,Me,Pe,Ge,At,Qt,It):S.isDataTexture?G.texSubImage2D(G.TEXTURE_2D,Te,Ze,bt,Me,Pe,At,Qt,It.data):S.isCompressedTexture?G.compressedTexSubImage2D(G.TEXTURE_2D,Te,Ze,bt,It.width,It.height,At,It.data):G.texSubImage2D(G.TEXTURE_2D,Te,Ze,bt,Me,Pe,At,Qt,It);_.pixelStorei(G.UNPACK_ROW_LENGTH,ln),_.pixelStorei(G.UNPACK_IMAGE_HEIGHT,xt),_.pixelStorei(G.UNPACK_SKIP_PIXELS,cn),_.pixelStorei(G.UNPACK_SKIP_ROWS,pn),_.pixelStorei(G.UNPACK_SKIP_IMAGES,hi),Te===0&&k.generateMipmaps&&G.generateMipmap(Je),_.unbindTexture()},this.initRenderTarget=function(S){z.get(S).__webglFramebuffer===void 0&&se.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?se.setTextureCube(S,0):S.isData3DTexture?se.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?se.setTexture2DArray(S,0):se.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){ie=0,W=0,ne=null,_.reset(),Ie.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Ei}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=vt._getDrawingBufferColorSpace(e),t.unpackColorSpace=vt._getUnpackColorSpace()}};var Ou=class extends dn{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new at(.5,.5),this.rotation2D=0,this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this.rotation2D=e.rotation2D,this}},Aa=new J,yg=new Mt,vg=new Mt,bg=new J,Sg=new J,Fu=class{constructor(e={}){let t=this,i,s,r,a,o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.sortObjects=!0,this.getSize=function(){return{width:i,height:s}},this.render=function(m,x){m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),x.parent===null&&x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),yg.copy(x.matrixWorldInverse),vg.multiplyMatrices(x.projectionMatrix,yg),d(m,m,x),this.sortObjects&&f(m)},this.setSize=function(m,x){i=m,s=x,r=i/2,a=s/2,l.style.width=m+"px",l.style.height=x+"px"};function c(m){m.isCSS2DObject&&(m.element.style.display="none");for(let x=0,p=m.children.length;x<p;x++)c(m.children[x])}function d(m,x,p){if(m.visible===!1){c(m);return}if(m.isCSS2DObject){Aa.setFromMatrixPosition(m.matrixWorld),Aa.applyMatrix4(vg);let g=Aa.z>=-1&&Aa.z<=1&&m.layers.test(p.layers)===!0,T=m.element;if(T.style.display=g===!0?"":"none",g===!0){m.onBeforeRender(t,x,p);let y=100*m.center.x,M=100*m.center.y;T.style.transformOrigin=`${y}% ${M}%`;let w=-m.rotation2D,P=Aa.x*r+r,v=-Aa.y*a+a;T.style.transform=`translate(${-y}%, ${-M}%) translate(${P}px, ${v}px) rotate(${w}rad)`,T.parentNode!==l&&l.appendChild(T),m.onAfterRender(t,x,p)}let R={distanceToCameraSquared:h(p,m)};o.objects.set(m,R)}for(let g=0,T=m.children.length;g<T;g++)d(m.children[g],x,p)}function h(m,x){return bg.setFromMatrixPosition(m.matrixWorld),Sg.setFromMatrixPosition(x.matrixWorld),bg.distanceToSquared(Sg)}function u(m){let x=[];return m.traverseVisible(function(p){p.isCSS2DObject&&x.push(p)}),x}function f(m){let x=u(m).sort(function(g,T){if(g.renderOrder!==T.renderOrder)return T.renderOrder-g.renderOrder;let R=o.objects.get(g).distanceToCameraSquared,y=o.objects.get(T).distanceToCameraSquared;return R-y}),p=x.length;for(let g=0,T=x.length;g<T;g++)x[g].element.style.zIndex=p-g}}};var Mg=new Yn,Bu=new J,Ca=class extends qo{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new Wt(e,3)),this.setAttribute("uv",new Wt(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new qi(t,6,1);return this.setAttribute("instanceStart",new Tn(i,3,0)),this.setAttribute("instanceEnd",new Tn(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new qi(t,6,1);return this.setAttribute("instanceColorStart",new Tn(i,3,0)),this.setAttribute("instanceColorEnd",new Tn(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new zo(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Yn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),Mg.setFromBufferAttribute(t),this.boundingBox.union(Mg))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ti),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)Bu.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(Bu)),Bu.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(Bu));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};ze.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new at},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Dn.line={uniforms:sl.merge([ze.common,ze.fog,ze.line]),vertexShader:`
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
		`};var Ra=class extends Ot{constructor(e){super({type:"LineMaterial",uniforms:sl.clone(Dn.line.uniforms),vertexShader:Dn.line.vertexShader,fragmentShader:Dn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var Qh=new yt,wg=new J,Eg=new J,yn=new yt,vn=new yt,Ki=new yt,ef=new J,tf=new Mt,bn=new $o,Tg=new J,zu=new Yn,Vu=new Ti,Zi=new yt,Qi,vr;function Ag(n,e,t){return Zi.set(0,0,-e,1).applyMatrix4(n.projectionMatrix),Zi.multiplyScalar(1/Zi.w),Zi.x=vr/t.width,Zi.y=vr/t.height,Zi.applyMatrix4(n.projectionMatrixInverse),Zi.multiplyScalar(1/Zi.w),Math.abs(Math.max(Zi.x,Zi.y))}function iM(n,e){let t=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,a=Math.min(i.instanceCount,s.count);for(let o=0,l=a;o<l;o++){bn.start.fromBufferAttribute(s,o),bn.end.fromBufferAttribute(r,o),bn.applyMatrix4(t);let c=new J,d=new J;Qi.distanceSqToSegment(bn.start,bn.end,d,c),d.distanceTo(c)<vr*.5&&e.push({point:d,pointOnLine:c,distance:Qi.origin.distanceTo(d),object:n,face:null,faceIndex:o,uv:null,uv1:null})}}function sM(n,e,t){let i=e.projectionMatrix,r=n.material.resolution,a=n.matrixWorld,o=n.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,d=Math.min(o.instanceCount,l.count),h=-e.near;Qi.at(1,Ki),Ki.w=1,Ki.applyMatrix4(e.matrixWorldInverse),Ki.applyMatrix4(i),Ki.multiplyScalar(1/Ki.w),Ki.x*=r.x/2,Ki.y*=r.y/2,Ki.z=0,ef.copy(Ki),tf.multiplyMatrices(e.matrixWorldInverse,a);for(let u=0,f=d;u<f;u++){if(yn.fromBufferAttribute(l,u),vn.fromBufferAttribute(c,u),yn.w=1,vn.w=1,yn.applyMatrix4(tf),vn.applyMatrix4(tf),yn.z>h&&vn.z>h)continue;if(yn.z>h){let R=yn.z-vn.z,y=(yn.z-h)/R;yn.lerp(vn,y)}else if(vn.z>h){let R=vn.z-yn.z,y=(vn.z-h)/R;vn.lerp(yn,y)}yn.applyMatrix4(i),vn.applyMatrix4(i),yn.multiplyScalar(1/yn.w),vn.multiplyScalar(1/vn.w),yn.x*=r.x/2,yn.y*=r.y/2,vn.x*=r.x/2,vn.y*=r.y/2,bn.start.copy(yn),bn.start.z=0,bn.end.copy(vn),bn.end.z=0;let x=bn.closestPointToPointParameter(ef,!0);bn.at(x,Tg);let p=Nh.lerp(yn.z,vn.z,x),g=p>=-1&&p<=1,T=ef.distanceTo(Tg)<vr*.5;if(g&&T){bn.start.fromBufferAttribute(l,u),bn.end.fromBufferAttribute(c,u),bn.start.applyMatrix4(a),bn.end.applyMatrix4(a);let R=new J,y=new J;Qi.distanceSqToSegment(bn.start,bn.end,y,R),t.push({point:y,pointOnLine:R,distance:Qi.origin.distanceTo(y),object:n,face:null,faceIndex:u,uv:null,uv1:null})}}}var Hu=class extends jt{constructor(e=new Ca,t=new Ra({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)wg.fromBufferAttribute(t,a),Eg.fromBufferAttribute(i,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+wg.distanceTo(Eg);let r=new qi(s,2,1);return e.setAttribute("instanceDistanceStart",new Tn(r,1,0)),e.setAttribute("instanceDistanceEnd",new Tn(r,1,1)),this}raycast(e,t){let i=this.material.worldUnits,s=e.camera;if(s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),i===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Qi=e.ray;let a=this.matrixWorld,o=this.geometry,l=this.material;vr=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),Vu.copy(o.boundingSphere).applyMatrix4(a);let c;if(i)c=vr*.5;else{let h=Math.max(s.near,Vu.distanceToPoint(Qi.origin));c=Ag(s,h,l.resolution)}if(Vu.radius+=c,Qi.intersectsSphere(Vu)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),zu.copy(o.boundingBox).applyMatrix4(a);let d;if(i)d=vr*.5;else{let h=Math.max(s.near,zu.distanceToPoint(Qi.origin));d=Ag(s,h,l.resolution)}zu.expandByScalar(d),Qi.intersectsBox(zu)!==!1&&(i?iM(this,t):sM(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(Qh),this.material.uniforms.resolution.value.set(Qh.z,Qh.w))}};var br=n=>typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:120}):setTimeout(()=>n({timeRemaining:()=>8,didTimeout:!0}),16),Cg=n=>typeof cancelIdleCallback=="function"?cancelIdleCallback(n):clearTimeout(n);function nf(n){return n.repeat.set(1,-1),n.offset.set(0,1),n.userData.topDown=!0,n}function Rg(n,e,t={}){let i=e.width,s=e.height,r=t.mipmaps!==!1,a=t.rows||256,o=r?Math.floor(Math.log2(Math.max(i,s)))+1:1,l=A=>[Math.max(1,i>>A),Math.max(1,s>>A)],c=new _s(null,i,s,_n,rn);c.colorSpace=t.colorSpace??Ht,c.flipY=!1,c.premultiplyAlpha=!1,c.unpackAlignment=4,c.generateMipmaps=!1,c.magFilter=Dt,c.minFilter=r?Kn:Dt,r&&(c.mipmaps=Array.from({length:o},(A,U)=>({data:null,width:l(U)[0],height:l(U)[1]}))),c.anisotropy=t.anisotropy??1,t.wrapS&&(c.wrapS=t.wrapS),nf(c),c.source.dataReady=!1,c.needsUpdate=!0;let d={w:i,h:s,levels:o,chunks:[],blits:[],fence_waits:0,done:!1,cancelled:!1,t0:performance.now(),t_done:null,alloc_ms:null},h=n.getContext(),u=null,f=null,m=!1,x=null,p=null,g=new Yt,T=[];for(let A=0;A<s;A+=a)T.push({kind:"upload",level:0,y0:A,y1:Math.min(s,A+a)});for(let A=1;A<o;A++){let[U,I]=l(A),L=Math.max(1,Math.floor(a*i/U/2));for(let F=0;F<I;F+=L)T.push({kind:"blit",level:A,y0:F,y1:Math.min(I,F+L)})}let R=new _a(new at,new at),y=new at;function M(A){let U=n.properties.get(c).__webglTexture,[I,L]=l(A.level-1),[F,D]=l(A.level),X=Math.round(A.y0*L/D),ie=Math.round(A.y1*L/D);x=x||h.createFramebuffer(),p=p||h.createFramebuffer();let W=n.state;W.bindFramebuffer(h.READ_FRAMEBUFFER,x),h.framebufferTexture2D(h.READ_FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,U,A.level-1),W.bindFramebuffer(h.DRAW_FRAMEBUFFER,p),h.framebufferTexture2D(h.DRAW_FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,U,A.level),h.blitFramebuffer(0,X,I,ie,0,A.y0,F,A.y1,h.COLOR_BUFFER_BIT,h.LINEAR),h.framebufferTexture2D(h.READ_FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,null,0),h.framebufferTexture2D(h.DRAW_FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,null,0),W.bindFramebuffer(h.READ_FRAMEBUFFER,null),W.bindFramebuffer(h.DRAW_FRAMEBUFFER,null)}function w(){u&&(h.deleteSync(u),u=null),x&&(h.deleteFramebuffer(x),x=null),p&&(h.deleteFramebuffer(p),p=null)}let P=new Promise((A,U)=>{let I=async()=>{if(f=null,!m)try{if(d.alloc_ms===null){let D=performance.now();n.initTexture(c),d.alloc_ms=performance.now()-D,f=br(I);return}if(u){if(h.getSyncParameter(u,h.SYNC_STATUS)!==h.SIGNALED){d.fence_waits++,f=br(I);return}h.deleteSync(u),u=null}if(!T.length){w(),d.done=!0,d.t_done=performance.now(),A(c);return}let L=T.shift(),F=performance.now();if(L.kind==="upload"){let D=await createImageBitmap(e,0,L.y0,i,L.y1-L.y0);if(m){D.close&&D.close();return}let X=performance.now();g.image=D,y.set(0,L.y0),n.copyTextureToTexture(g,c,null,y,0,0),D.close&&D.close(),d.chunks.push({level:0,rows:L.y1-L.y0,at:F,crop_ms:X-F,ms:performance.now()-X})}else M(L),d.blits.push({level:L.level,rows:L.y1-L.y0,at:F,ms:performance.now()-F});u=h.fenceSync(h.SYNC_GPU_COMMANDS_COMPLETE,0),h.flush(),f=br(I)}catch(L){w(),U(L)}};f=br(I)});function v(){d.done||m||(m=!0,d.cancelled=!0,f!==null&&Cg(f),w(),c.dispose())}return{texture:c,promise:P,cancel:v,state:d}}function Pg(n,e,t={}){let i=e.width,s=e.height,r=t.nx||4,a=t.ny||2,o=t.border??8,l=i/r,c=s/a,d=l+2*o,h=c+2*o,u=t.mipmaps!==!1,f=t.rows||256,m=u?Math.floor(Math.log2(Math.max(d,h)))+1:1,x=H=>[Math.max(1,d>>H),Math.max(1,h>>H)],p=n.getContext(),g=[],T={isTiled:!0,tiles:g,nx:r,ny:a,cw:l,ch:c,border:o,size:[d,h],image:{width:i,height:s},levels:m,bytes:r*a*d*h*(t.format===_r?1:4)*(u?4/3:1),dispose(){for(let H of g)H.dispose()}},R={w:i,h:s,nx:r,ny:a,levels:m,chunks:[],blits:[],allocs:[],fence_waits:0,done:!1,cancelled:!1,t0:performance.now(),t_done:null},y=null,M=null,w=!1,P=null,v=null,A=new Yt,U=new _a(new at,new at),I=new at,L=[],F=(H,re)=>{let le=[],ae=0,me=(H%i+i)%i,Ne=re;for(;Ne>0;){let Le=Math.min(Ne,i-me);le.push([me,Le,ae]),ae+=Le,Ne-=Le,me=0}return le};for(let H=0;H<a;H++)for(let re=0;re<r;re++){let le=H*r+re;L.push({kind:"alloc",ti:le});let ae=F(re*l-o,d);for(let me=0;me<h;){let Ne=H*c-o+me;if(Ne<0||Ne>=s){L.push({kind:"upload",ti:le,sy:Ne<0?0:s-1,h:1,dy:me,sx:ae}),me++;continue}let Le=Math.min(f,h-me,s-Ne);L.push({kind:"upload",ti:le,sy:Ne,h:Le,dy:me,sx:ae}),me+=Le}for(let me=1;me<m;me++){let[Ne,Le]=x(me),De=Math.max(1,Math.floor(f*d/Ne/2));for(let j=0;j<Le;j+=De)L.push({kind:"blit",ti:le,level:me,y0:j,y1:Math.min(Le,j+De)})}}function D(){let H=new _s(null,d,h,t.format??_n,rn);return H.colorSpace=t.colorSpace??Ht,H.flipY=!1,H.premultiplyAlpha=!1,H.unpackAlignment=4,H.generateMipmaps=!1,H.magFilter=Dt,H.minFilter=u?Kn:Dt,H.wrapS=H.wrapT=zn,u&&(H.mipmaps=Array.from({length:m},(re,le)=>({data:null,width:x(le)[0],height:x(le)[1]}))),H.anisotropy=t.anisotropy??1,H.source.dataReady=!1,H.needsUpdate=!0,H}function X(H){let re=n.properties.get(g[H.ti]).__webglTexture,[le,ae]=x(H.level-1),[me,Ne]=x(H.level),Le=Math.round(H.y0*ae/Ne),De=Math.round(H.y1*ae/Ne);P=P||p.createFramebuffer(),v=v||p.createFramebuffer();let j=n.state;j.bindFramebuffer(p.READ_FRAMEBUFFER,P),p.framebufferTexture2D(p.READ_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,re,H.level-1),j.bindFramebuffer(p.DRAW_FRAMEBUFFER,v),p.framebufferTexture2D(p.DRAW_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,re,H.level),p.blitFramebuffer(0,Le,le,De,0,H.y0,me,H.y1,p.COLOR_BUFFER_BIT,p.LINEAR),p.framebufferTexture2D(p.READ_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,null,0),p.framebufferTexture2D(p.DRAW_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,null,0),j.bindFramebuffer(p.READ_FRAMEBUFFER,null),j.bindFramebuffer(p.DRAW_FRAMEBUFFER,null)}function ie(){y&&(p.deleteSync(y),y=null),P&&(p.deleteFramebuffer(P),P=null),v&&(p.deleteFramebuffer(v),v=null)}let W=new Promise((H,re)=>{let le=()=>{if(M=null,!w)try{if(y){if(p.getSyncParameter(y,p.SYNC_STATUS)!==p.SIGNALED){R.fence_waits++,M=br(le);return}p.deleteSync(y),y=null}if(!L.length){ie(),R.done=!0,R.t_done=performance.now(),H(T);return}let ae=L.shift(),me=performance.now();if(ae.kind==="alloc"){let Ne=D();g[ae.ti]=Ne,n.initTexture(Ne),R.allocs.push({ti:ae.ti,at:me,ms:performance.now()-me})}else if(ae.kind==="upload"){A.image=e;for(let[Ne,Le,De]of ae.sx)U.min.set(Ne,ae.sy),U.max.set(Ne+Le,ae.sy+ae.h),I.set(De,ae.dy),n.copyTextureToTexture(A,g[ae.ti],U,I,0,0);R.chunks.push({ti:ae.ti,rows:ae.h,at:me,ms:performance.now()-me})}else X(ae),R.blits.push({ti:ae.ti,level:ae.level,at:me,ms:performance.now()-me});y=p.fenceSync(p.SYNC_GPU_COMMANDS_COMPLETE,0),p.flush(),M=br(le)}catch(ae){ie(),re(ae)}};M=br(le)});function ne(){R.done||w||(w=!0,R.cancelled=!0,M!==null&&Cg(M),ie(),T.dispose())}return{texture:T,promise:W,cancel:ne,state:R}}function ui(n,e=!1,t=8){let i=r=>e?`textureLod(${r}, q, 0.0)`:`textureGrad(${r}, q, gx, gy)`;if(t===1)return[`uniform sampler2D ${n}T0; uniform float ${n}Tiled; uniform vec4 ${n}Geo;`,`vec4 ${n}_sampleG(vec2 uv, vec2 gx, vec2 gy) { vec2 q = uv; return ${i(n+"T0")}; }`,`vec4 ${n}_sample(vec2 uv) { return ${n}_sampleG(uv, dFdx(uv), dFdy(uv)); }`].join(`
`);let s=[0,1,2,3,4,5,6,7].map(r=>`${r?"else ":""}if (i == ${r}) c = ${i(n+"T"+r)};`).join(" ");return[...[0,1,2,3,4,5,6,7].map(r=>`uniform sampler2D ${n}T${r};`),`uniform float ${n}Tiled; uniform vec4 ${n}Geo;`,`vec4 ${n}_pick(int i, vec2 q, vec2 gx, vec2 gy) { vec4 c = vec4(0.0); ${s} return c; }`,`vec4 ${n}_sampleG(vec2 uv, vec2 gx, vec2 gy) {`,`  if (${n}Tiled < 0.5) { vec2 q = uv; return ${i(n+"T0")}; }`,`  vec2 n = ${n}Geo.xy; float C = ${n}Geo.z, B = ${n}Geo.w, s = C / (C + 2.0 * B);`,"  vec2 g = uv * n; vec2 ip = floor(g); vec2 f = g - ip;","  ip.x = mod(ip.x, n.x); if (ip.y > n.y - 1.0) { ip.y = n.y - 1.0; f.y = 1.0; } if (ip.y < 0.0) { ip.y = 0.0; f.y = 0.0; }","  vec2 q = (B + f * C) / (C + 2.0 * B);",`  return ${n}_pick(int(ip.y * n.x + ip.x), q, gx * n * s, gy * n * s);`,"}",`vec4 ${n}_sample(vec2 uv) { return ${n}_sampleG(uv, dFdx(uv), dFdy(uv)); }`].join(`
`)}function di(n,e=8){let t={[n+"Tiled"]:{value:0},[n+"Geo"]:{value:new yt(4,2,2048,8)}};for(let i=0;i<e;i++)t[n+"T"+i]={value:null};return t}function qs(n,e,t){if(t&&t.isTiled){for(let i=0;i<8;i++)n[e+"T"+i]&&(n[e+"T"+i].value=t.tiles[i]||null);n[e+"Tiled"].value=1,n[e+"Geo"].value.set(t.nx,t.ny,t.cw,t.border)}else{n[e+"T0"].value=t;for(let i=1;i<8;i++)n[e+"T"+i]&&(n[e+"T"+i].value=null);n[e+"Tiled"].value=0}}var Gu={cloudHeightKm:8,cloudShadow:.55,cloudNightAlpha:.45,glint:.75,glintPower:140,glintColor:[1,.96,.88]},Lg="float cloud_alpha(float r) { return clamp((r - 0.08) / 0.82, 0.0, 1.0); }",rM=`
precision highp sampler2DArray;
uniform sampler2DArray pDay; uniform sampler2DArray pNight; uniform sampler2D pTable;
uniform vec4 pInfo; uniform vec4 pRowOff; uniform vec4 pGridX; uniform vec4 pGridY; uniform float pAniso; uniform float pReady;
float pageLod(vec2 gx, vec2 gy) {
  vec2 dx = gx * pInfo.xy, dy = gy * pInfo.xy;
  float a = dot(dx, dx), b = dot(dy, dy);
  float mj = sqrt(max(a, b)), mn = sqrt(min(a, b));
  return log2(max(max(mj / pAniso, mn), 1e-6));
}
bool pageFetch(sampler2DArray arr, int ch, vec2 uv, vec2 gx, vec2 gy, float lod, int pMin, out vec4 color) {
  int p0 = int(clamp(floor(lod), float(pMin), 3.0));
  for (int q = p0; q <= 3; q++) {
    float s = float(1 << q), w = pInfo.x / s, h = pInfo.y / s;
    vec2 g = vec2(uv.x * w, uv.y * h) / pInfo.z;
    vec2 cell = floor(g);
    int cx = int(clamp(cell.x, 0.0, pGridX[q] - 1.0)), cy = int(clamp(cell.y, 0.0, pGridY[q] - 1.0));
    float v = texelFetch(pTable, ivec2(cx, int(pRowOff[q]) + cy), 0)[ch] * 255.0;
    if (v < 0.5) continue;
    vec2 f = g - vec2(float(cx), float(cy));
    float S = pInfo.z + 2.0 * pInfo.w;
    vec2 k = vec2(w, h) / S;
    color = textureGrad(arr, vec3((pInfo.w + f * pInfo.z) / S, floor(v + 0.5) - 1.0), gx * k, gy * k);
    return true;
  }
  return false;
}`;function Ig(n,e={}){let t=Gu;return new Ot({uniforms:{...di("map",1),...di("night",1),...di("land",1),...di("cloud"),mapOn:{value:0},nightMapOn:{value:0},landOn:{value:0},base:{value:new lt(n)},oblate:{value:1},sunDir:{value:new J(1,0,0)},sun:{value:e.sun??1.3},ambient:{value:e.ambient??.004},night:{value:e.night??1},nightOn:{value:1},cloudOn:{value:0},cloudShadow:{value:t.cloudShadow},cloudH:{value:t.cloudHeightKm/6371},glint:{value:t.glint},glintPower:{value:t.glintPower},glintColor:{value:new J(...t.glintColor)},pDay:{value:null},pNight:{value:null},pTable:{value:null},pInfo:{value:new yt(43200,21600,496,8)},pRowOff:{value:new yt},pGridX:{value:new yt(1,1,1,1)},pGridY:{value:new yt(1,1,1,1)},pAniso:{value:8},pReady:{value:0}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec2 vUv; varying vec3 vNW; varying vec3 vView; varying vec3 vNorth;","void main() { vUv = uv; vNW = normalize(mat3(modelMatrix) * normal); vNorth = normalize(mat3(modelMatrix) * vec3(0.0, 1.0, 0.0));","  vec4 wp = modelMatrix * vec4(position, 1.0); vView = cameraPosition - wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",ui("map",!1,1),ui("night",!1,1),ui("land",!1,1),ui("cloud"),rM,Lg,"uniform float mapOn; uniform float nightMapOn; uniform float landOn; uniform vec3 base; uniform float oblate; uniform vec3 sunDir; uniform float sun; uniform float ambient; uniform float night; uniform float nightOn;","uniform float cloudOn; uniform float cloudShadow; uniform float cloudH; uniform float glint; uniform float glintPower; uniform vec3 glintColor;","varying vec2 vUv; varying vec3 vNW; varying vec3 vView; varying vec3 vNorth;","void main() {","#include <logdepthbuf_fragment>","  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);","  vec2 gx = dFdx(uv), gy = dFdy(uv);","  float lod = pageLod(gx, gy);","  float g = smoothstep(3.9, 4.4, lod);","  vec3 N = normalize(vNW);","  float ndl = dot(N, sunDir);","  vec3 day = base; float landF = 1.0; vec3 nl = vec3(0.0); float nightWeight = (night > 0.0 && nightMapOn > 0.5 && nightOn > 0.5) ? 1.0 - smoothstep(-0.1, 0.1, ndl) : 0.0;","  bool dayTile = false, nightTile = false; vec4 dp, np;","  if (pReady > 0.5) {","    if (ndl > -0.05 || nightWeight <= 0.0) dayTile = pageFetch(pDay, 0, uv, gx, gy, lod, 0, dp);","    if (nightWeight > 0.0) nightTile = pageFetch(pNight, 1, uv, gx, gy, lod, 1, np);","  }","  if (dayTile && g <= 0.0) { day = dp.rgb; landF = landOn > 0.5 ? dp.a : 1.0; }","  else {","    if (mapOn > 0.5) day = map_sampleG(uv, gx, gy).rgb;","    if (landOn > 0.5) landF = land_sampleG(uv, gx, gy).r;","    if (dayTile) { day = mix(dp.rgb, day, g); landF = mix(dp.a, landF, g); }","  }","  if (nightWeight > 0.0) {","    if (nightTile && g <= 0.0) nl = np.rgb;","    else { nl = night_sampleG(uv, gx, gy).rgb; if (nightTile) nl = mix(np.rgb, nl, g); }","  }","  float cAlpha = 0.0, cShade = 0.0;","  if (cloudOn > 0.5) {","    vec3 east = cross(vNorth, N); float cl = max(length(east), 1e-3); east /= cl; vec3 north = cross(N, east);","    cAlpha = cloud_alpha(cloud_sampleG(uv, gx, gy).r);","    if (ndl > 0.0) {","      vec2 sh = (vec2(dot(sunDir, east) / (2.0 * PI * cl), -dot(sunDir, north) / PI)) * cloudH / max(ndl, 0.15);","      cShade = cloud_alpha(cloud_sampleG(uv + sh, gx, gy).r);","    }","  }","  vec3 c = day * (max(ndl, 0.0) * sun * (1.0 - cloudShadow * cShade) + ambient);","  if (nightWeight > 0.0) {","    float lum = dot(nl, vec3(0.2126, 0.7152, 0.0722));","    c += nl * (0.12 + 0.88 * smoothstep(0.05, 0.30, lum)) * night * nightWeight;","  }","  vec3 V = normalize(vView); vec3 H = normalize(sunDir + V);","  float spec = pow(max(dot(N, H), 0.0), glintPower) * smoothstep(0.0, 0.1, ndl);","  c += glintColor * glint * spec * (1.0 - landF) * (1.0 - cAlpha);","  gl_FragColor = vec4(c, 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`)})}function Ng(n={}){let e=Gu;return new Ot({uniforms:{...di("cloud"),sunDir:{value:new J(1,0,0)},sun:{value:n.sun??1.3},ambient:{value:n.ambient??.004},nightA:{value:e.cloudNightAlpha}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec2 vUv; varying vec3 vNW;","void main() { vUv = uv; vNW = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",ui("cloud"),Lg,"uniform vec3 sunDir; uniform float sun; uniform float ambient; uniform float nightA; varying vec2 vUv; varying vec3 vNW;","void main() {","#include <logdepthbuf_fragment>","  float a = cloud_alpha(cloud_sample(vec2(vUv.x, 1.0 - vUv.y)).r);","  float ndl = dot(normalize(vNW), sunDir);","  float lit = max(ndl, 0.0) * sun + ambient;","  gl_FragColor = vec4(vec3(lit), a * mix(nightA, 1.0, smoothstep(-0.1, 0.1, ndl)));","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`),transparent:!0,depthWrite:!1})}var Pa=[{pr:2,family:!0,glow:!0,hiTex:!0},{pr:1.5,family:!0,glow:!0,hiTex:!0},{pr:1,family:!0,glow:!0,hiTex:!1},{pr:1,family:!1,glow:!1,hiTex:!1}],aM=50,oM=150,lM=120;function cM(){let n=document.createElement("canvas");n.width=n.height=64;let e=n.getContext("2d");e.fillStyle="#fff",e.beginPath(),e.arc(32,32,30,0,Math.PI*2),e.fill();let t=new pa(n);return t.colorSpace=Ht,t}function uM(){let n=document.createElement("canvas");n.width=n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.18,"rgba(255,255,255,0.55)"),t.addColorStop(.45,"rgba(255,255,255,0.12)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128);let i=new pa(n);return i.colorSpace=Ht,i}var dM=2e5;function sf(){try{return window.matchMedia("(pointer: coarse)").matches&&!window.matchMedia("(pointer: fine)").matches||window.innerWidth<768}catch{return!1}}function Dg(n,e,t,i){let s=t.constants,r=s.length_unit_km,a=i.scene,o=a.colors,l=new Du({canvas:n,antialias:!0,logarithmicDepthBuffer:!0}),d=sf()?1.5:2,h={level:0,auto:!navigator.webdriver,log:[],deviceCap:d},u=()=>Math.min(window.devicePixelRatio||1,d,Pa[h.level].pr);l.setPixelRatio(u());let f=new Fu({element:e}),m=new da,x=new da;x.background=new lt(a.background),l.autoClear=!1;let p=new En(45,1,1e-4,1e11);p.up.set(0,0,1),m.add(new Xo(16777215,.06));let g=new jo(16777215,2.2);m.add(g,g.target);let T=cM(),R=uM(),y={t:t.tStart,s:0,sTarget:0,precision:"relative",paused:!1,cam:{target:"L2",dist:32e5,az:-1.2,el:.9},fly:null},M=[],w={},P={bary:[0,0,0]},v={},A=null,U=[],I={nightlights:!0,sunglow:!0},L=!1,F=[];function D(C,B,V,ee,te={}){let oe={name:C,layer:B,obj:V,src:ee,kind:te.kind||"line",poly:!!te.poly,label:te.label||null,labelAt:te.labelAt,priority:te.priority||0,pick:te.pick||null,radius:te.radius,minPx:te.minPx,glow:te.glow};return oe.work=new Float64Array(ee.length),(oe.kind==="sky"?x:m).add(V),oe.label&&(oe.labelObj=new Ou(oe.label),oe.labelObj.center.set(-.08,.5),m.add(oe.labelObj),oe.label.style.display="none",e.appendChild(oe.label)),M.push(oe),oe}function X(C,B,V,ee=1,te=null){let oe=new Ca;oe.setPositions(new Float32Array(C*6)),te&&oe.setColors(te);let He=new Ra({color:te?16777215:B,vertexColors:!!te,linewidth:V,transparent:ee<1,opacity:ee,depthWrite:ee>=1});U.push(He);let S=new Hu(oe,He);return S.frustumCulled=!1,S}function ie(C,B,V){let ee=new Jt;return ee.setAttribute("position",new nn(new Float32Array(C*3),3)),new Fs(ee,new pr({color:B,size:V,sizeAttenuation:!1,map:T,alphaTest:.5,transparent:!0}))}let W=C=>{let B=new Float64Array(C.length);for(let V=0;V<C.length;V++)B[V]=C[V]*r;return B};function ne(C,B,V,ee,te,oe={}){let He=oe.hidden?0:oe.size||a.points.lpt,S=D(C,B,ie(1,ee,He),W(V),{kind:"point",label:te,priority:oe.priority,pick:oe.pick||C});if(oe.hidden?(S.obj.material.opacity=0,S.obj.material.alphaTest=0):S.baseSize=He,oe.glowPx){let k=new Fs(new Jt,new pr({color:ee,size:oe.glowPx,sizeAttenuation:!1,map:R,transparent:!0,blending:Yi,depthWrite:!1,opacity:.85}));k.geometry.setAttribute("position",new nn(new Float32Array(3),3)),D(C+"_glow",B,k,S.src,{kind:"point"}).baseSize=oe.glowPx}return w[C]=S,P[C]=S.src,S}function H(C,B){let V=B.length/3-1,ee=new Float32Array(2*V),te=0;for(let S=0;S<V;S++){let k=3*S;ee[2*S]=te,te+=Math.hypot(B[k+3]-B[k],B[k+4]-B[k+1],B[k+5]-B[k+2]),ee[2*S+1]=te}let oe=new qi(ee,2,1);C.geometry.setAttribute("instanceDistanceStart",new Tn(oe,1,0)),C.geometry.setAttribute("instanceDistanceEnd",new Tn(oe,1,1));let He=C.material;He.dashed=!0,He.dashSize=a.lines.dashPx??7,He.gapSize=a.lines.gapPx??5,He.needsUpdate=!0,He.userData.dashMaxKm=te,F.push(He)}function re(C,B,V,ee,te=a.lines.traj,oe=1,He={}){let S=V.length/3-1,k=null;if(He.fade){let q=new lt(ee),Z=new lt(0),Te=new lt;k=new Float32Array(S*6);for(let Me=0;Me<S;Me++)for(let[Pe,Ge]of[[0,Me/S],[3,(Me+1)/S]])Te.copy(Z).lerp(q,Ge**1.6),k[Me*6+Pe]=Te.r,k[Me*6+Pe+1]=Te.g,k[Me*6+Pe+2]=Te.b}let K=D(C,B,X(S,ee,te,oe,k),W(V),{poly:!0});if(He.fade){let q=K.obj.material;q.blending=Yi,q.transparent=!0,q.depthWrite=!1,q.needsUpdate=!0}return He.dashed&&H(K.obj,K.src),K}function le(C,B,V,ee,te=a.lines.traj,oe=1){return D(C,B,X(V.length/6,ee,te,oe),W(V))}function ae(C,B,V,ee,te=a.points.burn){return D(C,B,ie(V.length/3,ee,te),W(V),{kind:"point"})}function me(C,B,V,ee,te={}){let oe=D(C,B,ie(1,16777215,0),W(V),{kind:"label",label:ee,priority:te.priority,pick:te.pick});return oe.obj.material.opacity=0,oe.obj.material.alphaTest=0,te.pick&&(P[te.pick]=P[te.pick]||oe.src),oe}let Ne=new Ai(1,20,14),Le=1e8,De=null,j=0;function Q(C,B,V,ee,te,oe={}){let He=oe.surface?je(te,oe.surface):oe.limb?ve(te):oe.emissive?new Os({color:te}):new Vo({color:te}),S=oe.segments??[64,40],k=new jt(new Ai(1,S[0],S[1]),He),K=null;oe.glow&&(K=new Do(new ha({map:R,color:te,blending:Yi,depthWrite:!1,transparent:!0,opacity:a.glow.strength})),K.scale.setScalar(2*oe.glow),k.add(K));let q=null;oe.atmosphere&&(q=new jt(new Ai(oe.atmoSize??1.06,S[0],S[1]),Se(oe.atmosphere)),k.add(q));let Z=D(C,B,k,V.src,{kind:"sphere",radius:ee,minPx:oe.minPx||5,glow:oe.glow,pick:oe.pick||C});if(Z.glowObj=K,Z.atmoObj=q,oe.segments&&(Z.segGeo={hi:[k.geometry,q&&q.geometry],lo:[new Ai(1,64,40),q&&new Ai(oe.atmoSize??1.06,64,40)]},Z.segHi=!0),Z.surface=oe.surface||null,Z.exaggeration=1,Z.capFrac=oe.capFrac||0,Z.capFloorDev=oe.capFloorDev||0,oe.dot){let Te=new jt(Ne,new Os({color:new lt(te).lerp(new lt(16777215),.2),depthTest:!1,depthWrite:!1,transparent:!0}));Te.renderOrder=20+oe.dot,Te.scale.setScalar(1.03),Te.visible=!1,k.add(Te),Z.dotObj=Te}return C==="Sun_sphere"&&(De=Z),Z}function ye(C,B,V){return new Ot({uniforms:{...di("map"),inner:{value:C},outer:{value:B},oblate:{value:V},sunLocal:{value:new J(1,0,0)},light:{value:(a.surface||{}).ringLight??1}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec3 vP;","void main() { vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",ui("map"),"uniform float inner; uniform float outer; uniform float oblate; uniform vec3 sunLocal; uniform float light; varying vec3 vP;","void main() {","#include <logdepthbuf_fragment>","  float r = length(vP.xz); float u = (r - inner) / (outer - inner);","  if (u < 0.0 || u > 1.0) discard;","  vec4 c = map_sample(vec2(u, 0.5));","  vec3 o = vec3(vP.x, 0.0, vP.z); vec3 s = normalize(vec3(sunLocal.x, sunLocal.y / oblate, sunLocal.z));","  float b = dot(o, s); float disc = b * b - (dot(o, o) - 1.0);","  float lit = (b < 0.0) ? smoothstep(-0.02, 0.02, -disc) : 1.0;","  gl_FragColor = vec4(c.rgb * light * mix(0.05, 1.0, lit), c.a);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`),transparent:!0,depthWrite:!1,side:li})}function Se(C){return new Ot({uniforms:{color:{value:new lt(C)},strength:{value:a.glow.atmosphere??.9},sunDir:{value:new J(1,0,0)},sunOn:{value:0}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec3 vN; varying vec3 vV; varying vec3 vNW;","void main() {","  vec4 mv = modelViewMatrix * vec4(position, 1.0);","  vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vNW = normalize(mat3(modelMatrix) * normal);","  gl_Position = projectionMatrix * mv;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>","uniform vec3 color; uniform float strength; uniform vec3 sunDir; uniform float sunOn; varying vec3 vN; varying vec3 vV; varying vec3 vNW;","void main() {","#include <logdepthbuf_fragment>","  float f = pow(1.0 - max(dot(normalize(vN), normalize(vV)), 0.0), 2.6) * strength;","  f *= mix(1.0, 0.18 + 0.82 * smoothstep(-0.35, 0.25, dot(normalize(vNW), sunDir)), sunOn);","  gl_FragColor = vec4(color * f, f);","}"].join(`
`),blending:Yi,transparent:!0,depthWrite:!1})}function ve(C){let B=a.sunLimb||{};return new Ot({uniforms:{base:{value:new lt(C)},u:{value:new J(...B.u??[.5,.6,.72])}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec3 vN; varying vec3 vV;","void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);","  gl_Position = projectionMatrix * mv;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>","uniform vec3 base; uniform vec3 u; varying vec3 vN; varying vec3 vV;","void main() {","#include <logdepthbuf_fragment>","  float mu = clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0);","  gl_FragColor = vec4(base * (vec3(1.0) - u * (1.0 - mu)), 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`)})}function je(C,B){let V=a.surface||{};return B==="earth"?Ig(C,V):new Ot({uniforms:{...di("map"),...di("night"),mapOn:{value:0},nightMapOn:{value:0},base:{value:new lt(C)},oblate:{value:1},sunDir:{value:new J(1,0,0)},sun:{value:B==="planet"?V.planetSun??1.25:V.sun??(B==="earth"?1.3:1.6)},ambient:{value:V.ambient??.004},night:{value:B==="earth"?V.night??1:0},nightOn:{value:1}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","uniform float oblate; varying vec2 vUv; varying vec3 vNW;","void main() { vUv = uv; vNW = normalize(mat3(modelMatrix) * (normal * vec3(1.0, 1.0 / (oblate * oblate), 1.0)));","  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",ui("map"),ui("night"),"uniform float mapOn; uniform float nightMapOn; uniform vec3 base;","uniform vec3 sunDir; uniform float sun; uniform float ambient; uniform float night; uniform float nightOn; varying vec2 vUv; varying vec3 vNW;","void main() {","#include <logdepthbuf_fragment>","  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);","  vec4 dayS = map_sample(uv); vec4 nightS = night_sample(uv);","  vec3 day = mapOn > 0.5 ? dayS.rgb : base;","  float ndl = dot(normalize(vNW), sunDir);","  vec3 c = day * (max(ndl, 0.0) * sun + ambient);","  if (night > 0.0 && nightMapOn > 0.5 && nightOn > 0.5) {","    vec3 n = nightS.rgb; float lum = dot(n, vec3(0.2126, 0.7152, 0.0722));","    c += n * (0.12 + 0.88 * smoothstep(0.05, 0.30, lum)) * night * (1.0 - smoothstep(-0.1, 0.1, ndl));","  }","  gl_FragColor = vec4(c, 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`)})}let Ke=6,ke={grid:null,axes:[],key:"",gridStep:0};function Xe(){let C=(2*Ke+1)*2;ke.grid=D("grid","aux",X(C,a.colors.grid??2766160,a.lines.grid??1,a.lines.gridOpacity??.5),new Float64Array(C*6),{});let B=a.colors.axes??[12611696,7385200,7377104];ke.axes=["x","y","z"].map((V,ee)=>D("axes_"+V,"aux",X(1,B[ee],a.lines.axes??1.6),new Float64Array(6),{}));for(let V of[ke.grid,...ke.axes])V.on=!1,V.obj.visible=!1}function ot(){if(!ke.grid)return;let C=Be(),B=y.cam.dist;if(ke.grid.obj.visible){let V=10**Math.floor(Math.log10(B/3)),ee=Math.round(C[0]/V)*V,te=Math.round(C[1]/V)*V,oe=C[2],He=`${V}|${ee}|${te}|${oe}`;if(He!==ke.key){ke.key=He;let S=ke.grid.src,k=Ke*V,K=0;for(let q=-Ke;q<=Ke;q++)S.set([ee+q*V,te-k,oe,ee+q*V,te+k,oe],K),K+=6,S.set([ee-k,te+q*V,oe,ee+k,te+q*V,oe],K),K+=6;ke.gridStep=V}}if(ke.axes[0].obj.visible){let V=B*.12;ke.axes.forEach((ee,te)=>{ee.src.set([C[0],C[1],C[2],C[0]+(te===0)*V,C[1]+(te===1)*V,C[2]+(te===2)*V])})}}function it(){let C=y.cam.dist;for(let B of M){if(!B.labelObj||!B.labelObj.visible)continue;let V=B.labelObj.position,ee=y.precision==="relative"?Math.hypot(V.x,V.y,V.z):Math.hypot(V.x-qe[0],V.y-qe[1],V.z-qe[2]),te=Math.log10(Math.max(ee/C,.001)),oe=Math.min(1.08,Math.max(.84,1-.16*te)),He=Math.min(1,Math.max(.62,1-.3*te)),S=oe.toFixed(2),k=He.toFixed(2);B._lk!==S&&(B.label.style.setProperty("--lbl-k",S),B._lk=S),B._lo!==k&&(B.label.style.opacity=k,B._lo=k)}}let qe=[0,0,0],ue=C=>t.thetaOffset+Qs((C-t.thetaEpoch)/86400,Re());function Re(){return s.time_unit_days}let We=()=>y.s*ue(y.t);function Be(){return y.fly?y.fly.pos:P[y.cam.target]||[0,0,0]}function G(){let C=We(),B=Es(Be(),ue(y.t),y.s),{dist:V,az:ee,el:te}=y.cam,oe=[Math.cos(te)*Math.cos(ee),Math.cos(te)*Math.sin(ee),Math.sin(te)];return qe[0]=B[0]+V*oe[0],qe[1]=B[1]+V*oe[1],qe[2]=B[2]+V*oe[2],{a:C,tg:B}}let de=0,Ae=()=>{let C=Math.tan(p.fov*Math.PI/360);return Math.min(C,C*(n.clientWidth/Math.max(n.clientHeight,1)))},b=C=>C*de/Ae(),_=()=>de?Math.max(2e9,b(1.5)):2e9,O=y;function z(C,B,V,ee){O.precision==="relative"?(V[ee]=C[B]-qe[0],V[ee+1]=C[B+1]-qe[1],V[ee+2]=C[B+2]-qe[2]):(V[ee]=C[B],V[ee+1]=C[B+1],V[ee+2]=C[B+2])}let se=1,_e=1,be=new Float64Array(3),ce=new Mt,fe=new Mt().makeRotationX(Math.PI/2),Ce=new J,$e=new oi;function Ue(C){let B=t.frameF,V=Math.cos(C),ee=Math.sin(C);if(B){let S=[B.x,B.y,B.z];return[[0,1,2].map(k=>V*S[0][k]-ee*S[1][k]),[0,1,2].map(k=>ee*S[0][k]+V*S[1][k]),[...S[2]]]}let te=C-ue(y.t),oe=Math.cos(te),He=Math.sin(te);return[[oe,-He,0],[He,oe,0],[0,0,1]]}function Oe(C,B){let V;try{V=C.orientFn(y.t)}catch{return}let ee=Ue(B),te=ni(ee,V);ce.set(te[0][0],te[0][1],te[0][2],0,te[1][0],te[1][1],te[1][2],0,te[2][0],te[2][1],te[2][2],0,0,0,0,1).multiply(fe),C.obj.quaternion.setFromRotationMatrix(ce),C.orientNow=te}function Qe(C,B){let V=Pr(C.src,B,C.work);if(C.kind==="sphere"){let ee=[0,0,0];z(V,0,ee,0),C.obj.position.set(ee[0],ee[1],ee[2]);let te=Math.hypot(V[0]-qe[0],V[1]-qe[1],V[2]-qe[2]),oe=te/se,He=C.minPx*oe,S=He;if(!L&&C.capFrac&&j){let K=C.capFrac*j;S>K&&(S=Math.min(He,Math.max(K,C.capFloorDev/l.getPixelRatio()*oe)))}let k=L?C.radius:Math.max(C.radius,S);if(C.exaggeration=k/C.radius,C.camDist=te,C.segGeo){let K=k/oe*l.getPixelRatio(),q=C.segHi?K>=lM:K>oM;if(q!==C.segHi){let Z=q?C.segGeo.hi:C.segGeo.lo;C.obj.geometry=Z[0],C.atmoObj&&(C.atmoObj.geometry=Z[1]),C.cloudObj&&(C.cloudObj.geometry=Z[0]),C.segHi=q}}if(C.shape?C.obj.scale.set(k*C.shape[0],k*C.shape[1],k*C.shape[0]):C.obj.scale.setScalar(k),C.orientFn)Oe(C,B);else if(C.faceTo&&w[C.faceTo]){let K=Pr(w[C.faceTo].src,B,new Float64Array(3));C.obj.rotation.set(Math.PI/2,0,Math.atan2(K[1]-V[1],K[0]-V[0]),"ZYX")}if(C.surface||C.atmoObj){let K=w.Sun?Pr(w.Sun.src,B,be):null;if(K){let q=K[0]-V[0],Z=K[1]-V[1],Te=K[2]-V[2],Me=Math.hypot(q,Z,Te)||1;C.surface&&C.obj.material.uniforms.sunDir.value.set(q/Me,Z/Me,Te/Me),C.cloudObj&&C.cloudObj.material.uniforms.sunDir.value.set(q/Me,Z/Me,Te/Me),C.ringObj&&(Ce.set(q/Me,Z/Me,Te/Me).applyQuaternion($e.copy(C.obj.quaternion).invert()),C.ringObj.material.uniforms.sunLocal.value.copy(Ce)),C.atmoObj&&(C.atmoObj.material.uniforms.sunDir.value.set(q/Me,Z/Me,Te/Me),C.atmoObj.material.uniforms.sunOn.value=C.surface?1:0)}}if(C.glowObj&&(C.glowObj.visible=Pa[h.level].glow&&!(C.name==="Sun_sphere"&&I.sunglow===!1)),C.atmoObj&&(C.atmoObj.visible=Pa[h.level].glow),C.glowObj&&C.name==="Sun_sphere"){let K=k/Math.max(C.radius,He);C.glowObj.scale.setScalar(2*(1+(C.glow-1)*K)),C.glowObj.material.opacity=a.glow.strength*(.4+.6*K)}if(C.dotObj){let K=!L&&C.exaggeration>1&&te>Le&&(!De||De.exaggeration>1);C.dotObj.visible=K,K&&C.glowObj&&(C.glowObj.visible=!1),K&&C.atmoObj&&(C.atmoObj.visible=!1),C.ringObj&&(C.ringObj.visible=!K)}return}if(C.baseSize&&(C.obj.material.size=C.baseSize*_e),C.obj.isLineSegments2){let ee=C.obj.geometry.attributes.instanceStart.data,te=ee.array;if(C.poly)for(let oe=0,He=0;oe+3<V.length;oe+=3,He+=6)z(V,oe,te,He),z(V,oe+3,te,He+3);else for(let oe=0;oe<V.length;oe+=3)z(V,oe,te,oe);ee.needsUpdate=!0}else{let ee=C.obj.geometry.attributes.position;for(let te=0;te<V.length;te+=3)z(V,te,ee.array,te);ee.needsUpdate=!0,C.obj.geometry.computeBoundingSphere()}if(C.labelObj){let ee=C.labelAt===void 0?0:C.labelAt*3,te=[0,0,0];z(V,ee,te,0),C.labelObj.position.set(te[0],te[1],te[2])}}function et(){let C=v[y.fly?y.fly.to:y.cam.target]||null;if(C!==A){A=C;for(let B of M)B.zoom&&(B.obj.visible=Zt(B),B.labelObj&&(B.labelObj.visible=B.on!==!1&&B.zoom===A));for(let B of st)B(A)}}let st=[];function Y(){et(),t.onTime&&t.onTime(y.t,Rn);let{a:C,tg:B}=G();se=Math.max(n.clientHeight,1)/(2*Math.tan(p.fov*Math.PI/360)),_e=Math.min(1,Math.max(.18,r*se/y.cam.dist/120)),ot();for(let oe of F){oe.dashScale=se/y.cam.dist;let He=oe.dashScale*oe.userData.dashMaxKm<=dM;oe.dashed!==He&&(oe.dashed=He,oe.needsUpdate=!0)}for(let oe of M)oe.kind!=="sky"&&(oe.obj.visible||oe.labelObj)&&Qe(oe,C);it(),y.precision==="relative"?(p.position.set(0,0,0),p.lookAt(B[0]-qe[0],B[1]-qe[1],B[2]-qe[2])):(p.position.set(qe[0],qe[1],qe[2]),p.lookAt(B[0],B[1],B[2]));let ee=w.Sun?Es(w.Sun.src,ue(y.t),y.s):[0,0,0];g.position.set(ee[0]-B[0],ee[1]-B[1],ee[2]-B[2]).normalize(),g.target.position.set(0,0,0);let te=Math.max(y.cam.dist*1e-4,.001);p.near!==te&&(p.near=te,p.updateProjectionMatrix());for(let oe of M)oe.kind==="sky"&&oe.obj.visible&&(oe.obj.position.copy(p.position),oe.obj.rotation.set(0,0,C-ue(y.t)),oe.frame&&oe.frame(Rn,C-ue(y.t)))}function we(C){if(!C||C.hidden)return null;let B=getComputedStyle(C);if(B.display==="none"||B.visibility==="hidden"||Number(B.opacity)<.05)return null;let V=C.getBoundingClientRect();return V.width>0&&V.height>0?V:null}let he=(C,B)=>C.left<B.right&&B.left<C.right&&C.top<B.bottom&&B.top<C.bottom;function Ee(){let C=[...document.querySelectorAll("[data-obstacle]")].map(we).filter(Boolean),B=M.filter(oe=>oe.label&&oe.labelObj&&oe.labelObj.visible&&oe.label.style.display!=="none").sort((oe,He)=>He.priority-oe.priority),V=[],ee=window.innerWidth,te=window.innerHeight;for(let oe of B){oe.label.style.visibility="";let He=oe.label.getBoundingClientRect();He.left<0||He.top<0||He.right>ee||He.bottom>te||C.some(k=>he(He,k))||V.some(k=>he(He,k))?oe.label.style.visibility="hidden":V.push(He)}}function Ie(){let C=u();l.getPixelRatio()!==C&&l.setPixelRatio(C);let B=n.clientWidth,V=n.clientHeight;(n.width!==Math.floor(B*C)||n.height!==Math.floor(V*C))&&(l.setSize(B,V,!1),f.setSize(B,V),p.aspect=B/Math.max(V,1),p.updateProjectionMatrix());for(let ee of U)ee.resolution.set(B,V)}function ge(){Ie(),Y(),l.clear(),l.render(x,p),l.clearDepth(),l.render(m,p),f.render(m,p),Ee();for(let C of Ye)C(Rn)}let Ye=[],Ve=performance.now(),ft={speedDaysPerSec:0};function gt(C){if(y.s!==y.sTarget){let B=C/1.5;y.s=y.sTarget>y.s?Math.min(y.sTarget,y.s+B):Math.max(y.sTarget,y.s-B)}if(ft.speedDaysPerSec){let B=y.t+ft.speedDaysPerSec*86400*C;y.t=Math.min(Math.max(B,t.tMin),t.tMax),(y.t===t.tMax||y.t===t.tMin)&&(ft.speedDaysPerSec=0),t.onTimeChange&&t.onTimeChange(y.t)}if(y.fly){let B=y.fly;B.k=Math.min(1,B.k+C/B.dur);let V=B.k<.5?4*B.k**3:1-(-2*B.k+2)**3/2,ee=P[B.to]||[0,0,0];for(let te=0;te<3;te++)B.pos[te]=B.from[te]+(ee[te]-B.from[te])*V;y.cam.dist=Math.exp(Math.log(B.d0)+(Math.log(B.d1)-Math.log(B.d0))*V),B.k>=1&&(y.cam.target=B.to,y.fly=null)}}let wt={frames:0,t0:performance.now(),low:0,history:[]};function Gt(C){wt.frames++;let B=C-wt.t0;if(B<2e3)return;let V=wt.frames*1e3/B;if(wt.history.push(V),wt.frames=0,wt.t0=C,!(!h.auto||wt.history.length<2)&&(wt.low=V<aM?wt.low+1:0,wt.low>=2&&h.level<Pa.length-1)){let ee={at:new Date().toISOString(),from:h.level,to:h.level+1,fps:Math.round(V*10)/10};h.level++,h.log.push(ee),wt.low=0,an(),console.info("[\uD654\uC9C8] \uC790\uB3D9\uC73C\uB85C \uB0AE\uCDA4",JSON.stringify(ee))}}function Zt(C){return C.on===!1||C.zoom&&C.zoom!==A?!1:C.familyLine?C.wanted!==!1&&Pa[h.level].family:!0}function an(){for(let C of M)C.familyLine&&(C.obj.visible=Zt(C))}l.setAnimationLoop(()=>{let C=performance.now(),B=Math.min((C-Ve)/1e3,.1);Ve=C,y.paused||gt(B),ge(),Gt(C)});let qt=null;n.addEventListener("pointerdown",C=>{qt={x:C.clientX,y:C.clientY,x0:C.clientX,y0:C.clientY},n.setPointerCapture(C.pointerId)}),n.addEventListener("pointermove",C=>{qt&&(y.cam.az-=(C.clientX-qt.x)*.006,y.cam.el=Math.min(1.55,Math.max(-1.55,y.cam.el+(C.clientY-qt.y)*.006)),qt.x=C.clientX,qt.y=C.clientY)}),n.addEventListener("pointerup",C=>{if(qt&&Math.hypot(C.clientX-qt.x0,C.clientY-qt.y0)<5){let B=on(C.clientX,C.clientY);B&&t.onPick&&t.onPick(B)}qt=null}),n.addEventListener("wheel",C=>{C.preventDefault(),y.fly=null,y.cam.dist=Math.min(_(),Math.max(es(y.cam.dist),y.cam.dist*Math.exp(C.deltaY*.0012)))},{passive:!1});function Hn(C){let B=C.shape?C.radius*C.shape[0]:C.radius;if(C.surface==="earth"){let V=2*Math.PI*C.radius/43200,ee=Math.max(1800,l.getDrawingBufferSize(bs).y);return C.radius+V*ee/(2*Math.tan(p.fov*Math.PI/360))}return B*1.03}let bs=new at;function es(C){let B=We(),V=Es(Be(),ue(y.t),y.s),{az:ee,el:te}=y.cam,oe=[Math.cos(te)*Math.cos(ee),Math.cos(te)*Math.sin(ee),Math.sin(te)],He=.05;for(let S of M){if(S.kind!=="sphere"||!S.radius||!S.work)continue;let k=Pr(S.src,B,S.work),K=V[0]-k[0],q=V[1]-k[1],Z=V[2]-k[2],Te=Hn(S),Me=K*oe[0]+q*oe[1]+Z*oe[2],Pe=K*K+q*q+Z*Z-Te*Te,Ge=Me*Me-Pe;if(Ge<0)continue;let tt=-Me+Math.sqrt(Ge);(Pe<0||C>=tt)&&(He=Math.max(He,tt))}return He}function on(C,B){let V=null,ee=22,te=new J;for(let oe of M){if(!oe.pick||!oe.obj.visible)continue;if(oe.kind==="sphere")te.copy(oe.obj.position);else if(oe.labelObj)te.copy(oe.labelObj.position);else continue;if(te.project(p),te.z<-1||te.z>1)continue;let He=(te.x+1)/2*n.clientWidth,S=(1-te.y)/2*n.clientHeight,k=Math.hypot(He-C,S-B);k<ee&&(ee=k,V=oe.pick)}return V}function Bt(){let C=l.getContext(),B=C.drawingBufferWidth,V=C.drawingBufferHeight,ee=new Uint8Array(B*V*4);return C.readPixels(0,0,B,V,C.RGBA,C.UNSIGNED_BYTE,ee),{px:ee,w:B,h:V}}function Qn(){ge();let{px:C,w:B,h:V}=Bt(),ee=new Set;for(let te=0;te<C.length;te+=388)ee.add(C[te]<<16|C[te+1]<<8|C[te+2]);return{width:B,height:V,distinctColors:ee.size,webgl2:l.capabilities.isWebGL2}}function Gn(C){let B=M.map(Me=>Me.obj.visible),V=w[C],ee=V.obj.material.color.getHex();for(let Me of M)Me.obj.visible=Me===V;V.obj.material.color.setHex(16777215);let te=e.style.display;e.style.display="none";let oe=x.background;x.background=new lt(0),ge();let{px:He,w:S,h:k}=Bt(),K=0,q=0,Z=0;for(let Me=0;Me<k;Me++)for(let Pe=0;Pe<S;Pe++){let Ge=(Me*S+Pe)*4;He[Ge]>200&&He[Ge+1]>200&&He[Ge+2]>200&&(K+=Pe,q+=k-1-Me,Z++)}M.forEach((Me,Pe)=>{Me.obj.visible=B[Pe]}),V.obj.material.color.setHex(ee),e.style.display=te,x.background=oe,ge();let Te=l.getPixelRatio();return Z?{x:K/Z/Te,y:q/Z/Te,n:Z}:null}function Ss(C){return Es(w[C].src,ue(y.t),y.s)}function ts(C=3e3){return new Promise(B=>{let V=h.auto;h.auto=!1;let ee=0,te=performance.now(),oe=()=>{ee++,performance.now()-te<C?requestAnimationFrame(oe):(h.auto=V,B({fps:ee*1e3/(performance.now()-te),level:h.level,pr:l.getPixelRatio()}))};requestAnimationFrame(oe)})}function Ms(C=120){let B=l.getContext(),V=new Uint8Array(4);ge(),B.readPixels(0,0,1,1,B.RGBA,B.UNSIGNED_BYTE,V);let ee=performance.now();for(let oe=0;oe<C;oe++)ge(),B.readPixels(0,0,1,1,B.RGBA,B.UNSIGNED_BYTE,V);let te=(performance.now()-ee)/C;return{ms:te,fpsUnlocked:1e3/te,pr:l.getPixelRatio()}}Xe();let Rn={renderer:l,scene:m,skyScene:x,camera:p,state:y,items:M,markers:w,anchors:P,COLORS:o,anim:ft,model:t,tokens:i,quality:h,addMarker:ne,addPolyline:re,addSegments:le,addPoints:ae,addLabel:me,addSphere:Q,addItem:D,ndToKm:W,theta:ue,angle:We,render:ge,update:Y,setLayer(C,B){Rn.setItemsVisible(V=>V.layer===C,B)},removeItem(C){let B=M.findIndex(te=>te.name===C);if(B<0)return!1;let V=M[B];V.obj.parent&&V.obj.parent.remove(V.obj),V.obj.geometry.dispose();let ee=V.obj.material;for(let te of[U,F]){let oe=te.indexOf(ee);oe>=0&&te.splice(oe,1)}return ee.dispose(),V.labelObj&&(m.remove(V.labelObj),V.label.remove()),w[C]===V&&delete w[C],M.splice(B,1),!0},setItemsVisible(C,B){for(let V of M)C(V)&&(V.on=B,V.obj.visible=Zt(V),V.labelObj&&(V.labelObj.visible=B&&(!V.zoom||V.zoom===A)))},wantVisible:Zt,setItemsDimmed(C,B,V=.32){for(let ee of M)if(C(ee)&&ee.kind!=="label"&&ee.kind!=="sphere"){let te=ee.obj.material;if(ee.base===void 0&&(ee.base={opacity:te.opacity,transparent:te.transparent,depthWrite:te.depthWrite,alphaTest:te.alphaTest}),!!ee.dimmed===B)continue;ee.dimmed=B,te.opacity=B?ee.base.opacity*V:ee.base.opacity,te.transparent=B||ee.base.transparent,te.depthWrite=B?!1:ee.base.depthWrite,ee.base.alphaTest&&(te.alphaTest=B?ee.base.alphaTest*V*.5:ee.base.alphaTest),te.needsUpdate=!0}},setLabelsVisible(C){e.style.display=C?"":"none"},addZoomTarget(C,B){v[C]=B},onZoomChange(C){st.push(C)},get zoomNow(){return A},setSphereTexture(C,B,V){let ee=M.find(He=>He.name===C&&He.kind==="sphere");if(!ee)return!1;let te=new Yt(B);te.colorSpace=Ht,te.anisotropy=l.capabilities.getMaxAnisotropy(),te.needsUpdate=!0;let oe=ee.obj.material;return oe.map&&oe.map.dispose(),oe.map=te,oe.color.set(16777215),oe.needsUpdate=!0,ee.texture={label:V,w:B.width,h:B.height},!0},maxTextureSize:()=>l.capabilities.maxTextureSize,makeTexture(C,B={}){let V=new Yt(C);return V.colorSpace=B.colorSpace??Ht,V.anisotropy=B.anisotropy??l.capabilities.getMaxAnisotropy(),B.mipmaps===!1&&(V.generateMipmaps=!1,V.minFilter=Dt),B.wrapS&&(V.wrapS=B.wrapS),nf(V),V.needsUpdate=!0,V},setSphereMap(C,B,V,ee="map"){let te=M.find(S=>S.name===C&&S.kind==="sphere");if(!te)return!1;let oe=te.obj.material,He=ee==="nightMap"?"night":ee;return oe.uniforms&&oe.uniforms[He+"T0"]?(qs(oe.uniforms,He,B),oe.uniforms[ee+"On"]&&(oe.uniforms[ee+"On"].value=1)):(oe.map=B,oe.color.set(16777215),oe.needsUpdate=!0),te.textures=te.textures||{},te.textures[ee]={label:V,w:B.image.width,h:B.image.height},te.texture=te.textures.map||te.textures[ee],!0},setSphereShape(C,B,V){let ee=M.find(te=>te.name===C&&te.kind==="sphere");return ee?(ee.shape=[B,V],ee.obj.material.uniforms&&ee.obj.material.uniforms.oblate&&(ee.obj.material.uniforms.oblate.value=V/B),!0):!1},addEarthClouds(C,B=Gu.cloudHeightKm){let V=M.find(te=>te.name===C&&te.kind==="sphere");if(!V||V.cloudObj)return!1;let ee=new jt(V.obj.geometry,Ng(a.surface||{}));return ee.scale.setScalar(1+B/V.radius),ee.renderOrder=5,ee.frustumCulled=!1,V.obj.add(ee),V.cloudObj=ee,!0},setCloudMap(C,B,V){let ee=M.find(te=>te.name===C&&te.kind==="sphere");return!ee||!ee.cloudObj?!1:(qs(ee.cloudObj.material.uniforms,"cloud",B),qs(ee.obj.material.uniforms,"cloud",B),ee.obj.material.uniforms.cloudOn.value=I.clouds===!1?0:1,ee.cloudObj.visible=I.clouds!==!1,ee.cloudTexture={label:V,w:B.image.width,h:B.image.height},!0)},setLandMap(C,B){let V=M.find(ee=>ee.name===C&&ee.kind==="sphere");return V?(qs(V.obj.material.uniforms,"land",B),V.obj.material.uniforms.landOn.value=1,!0):!1},zoomFloorKm(){return es(y.cam.dist)},bodyFloorKm(C){let B=M.find(V=>V.name===C&&V.kind==="sphere");return B?Hn(B):null},addSaturnRing(C,B,V){let ee=M.find(S=>S.name===C&&S.kind==="sphere");if(!ee||ee.ringObj)return!1;let te=new Bo(B,V,180,1);te.rotateX(-Math.PI/2);let oe=ee.shape?ee.shape[1]/ee.shape[0]:1,He=new jt(te,ye(B,V,oe));return He.scale.set(1,1/oe,1),He.renderOrder=15,He.frustumCulled=!1,ee.obj.add(He),ee.ringObj=He,!0},setRingMap(C,B,V){let ee=M.find(te=>te.name===C&&te.kind==="sphere");return!ee||!ee.ringObj?!1:(qs(ee.ringObj.material.uniforms,"map",B),ee.ringTexture={label:V,w:B.image.width,h:B.image.height},!0)},sphereScreenPx(C){let B=M.find(V=>V.name===C&&V.kind==="sphere");return!B||!B.obj.visible||!B.camDist?0:B.obj.scale.x*se/B.camDist*l.getPixelRatio()},qualityAllowsHiTex:()=>Pa[h.level].hiTex!==!1,setSphereOrient(C,B){let V=M.find(ee=>ee.name===C&&ee.kind==="sphere");V&&(V.orientFn=B)},setGraphic(C,B){if(I[C]=B,C==="nightlights"&&Rn.setSurface("Earth_sphere","nightOn",B?1:0),C==="clouds"){let V=M.find(ee=>ee.name==="Earth_sphere");V&&V.cloudObj&&(V.cloudObj.visible=B&&!!V.cloudTexture,V.obj.material.uniforms.cloudOn.value=B&&V.cloudTexture?1:0)}},graphic:()=>({...I}),setSurface(C,B,V){let ee=M.find(te=>te.name===C&&te.kind==="sphere");ee&&ee.surface&&ee.obj.material.uniforms[B]&&(ee.obj.material.uniforms[B].value=V)},setFaceTo(C,B){let V=M.find(ee=>ee.name===C&&ee.kind==="sphere");V&&(V.faceTo=B)},addSky(C,B,V,ee){V.renderOrder=-10,V.frustumCulled=!1;let te=D(C,B,V,new Float64Array(3),{kind:"sky"});return te.frame=ee||null,te},setTrueSize(C){L=!!C},get trueSize(){return L},kmPerPx(){return y.cam.dist/se},helper:ke,onRender:Ye,setTime(C){y.t=Math.min(Math.max(C,t.tMin),t.tMax),t.onTime&&t.onTime(y.t,Rn),t.onTimeChange&&t.onTimeChange(y.t)},setMode(C,B=!1){y.sTarget=C==="inertial"?1:0,B&&(y.s=y.sTarget)},setCamera(C){y.fly=null,Object.assign(y.cam,C)},setOrbitOuter(C){de=C},setOrbitInner(C){j=C},zoomOutMax:_,orbitFitDist:b,flyTo(C,B,V=Math.min(2,Math.max(1,1+.08*Math.abs(Math.log(B/y.cam.dist))))){y.fly={from:[...Be()],pos:[...Be()],to:C,d0:y.cam.dist,d1:B,k:0,dur:V}},pickAt:on,debug:{camera:p,eclToSceneNow:()=>Ue(We()),canvasStats:Qn,markerCentroid:Gn,worldOf:Ss,measureFps:ts,measureFrameCost:Ms,declutter:Ee,pause(C=!0){y.paused=C},step(C){gt(C),ge()},setPrecision(C){y.precision=C,ge()},setQuality(C,B=!1){h.level=C,h.auto=B,an(),ge()},enableAutoQuality(C=!0){h.auto=C}}};return Rn}var Xt=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=xe(r)):s.startsWith("data-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},ll=[];function kg(){for(let n of ll)n()}function Og(n,e){let t=xi(n,e);return ll.push(t._render),t}function Ug(n,e){let t=Og(n,e);return t.classList.add("layer-tag"),t}function La(n,e,t){let i=Xt("button",{type:"button",class:"lbl-num"});i.dataset.source=n.provenance.source.map(a=>`${a.file}>${a.key}`).join(" | "),i.dataset.verification=`${n.provenance.verification.tag}/${n.provenance.verification.detail}`;let s=()=>{i.textContent=n.text+(typeof t=="function"?t():t)};s(),ll.push(s),i.addEventListener("click",a=>{a.stopPropagation(),e.openSource(n)});let r=Xt("span",{class:"lbl-numwrap"},i,Og(n.provenance.verification,e.table));return r.dataset.source=i.dataset.source,r.dataset.verification=i.dataset.verification,Ps(r,n.id,"label"),r}function Fg(n,e,t){let i=n.COLORS,s=n.tokens.scene.lines,r=n.tokens.scene.spheres,a=n.tokens.scene.glow,o=t.constants.mu,l=t.constants.length_unit_km,c=(j,Q,...ye)=>{let Se=Xt("div",{class:`lbl ${j}`},...ye);if(Q){Se.dataset.pick=Q;let ve=Se.firstChild;ve.classList.add("lbl-name"),ve.addEventListener("click",()=>t.onPick&&t.onPick(Q))}return Se},d=n.addMarker("Sun","bodies",[-o,0,0],i.sun,c("lbl-body","Sun",Xt("span",{i18n:"body.sun"})),{hidden:!0,priority:10});n.addSphere("Sun_sphere","bodies",d,t.radii.sun.km,i.sun,{emissive:!0,limb:!0,glow:a.sun,minPx:r.sunMinPx,pick:"Sun",capFrac:.5,capFloorDev:1.2}),n.addMarker("EMB","bodies",[1-o,0,0],i.emb,c("lbl-body","EMB",Xt("span",{i18n:"body.emb"})),{size:n.tokens.scene.points.emb,priority:6});let h={L1:8,L2:9,L3:5,L4:5,L5:5};for(let j of e["stage1.points"].items){let Q=c("lbl-lpt",j.id,Xt("b",{"data-meta":""},j.id),La(j.dist,t," km"));Q.dataset.lpt=j.id,n.addMarker(j.id,"lpoints",[j.x,j.y,j.z],i.lpt,Q,{priority:h[j.id],glowPx:n.tokens.scene.points.lptGlow??22})}let u=e["stage2.l2_directions"],f=u.origin,m=Math.abs(f[0]-(1-o));for(let j of u.items){let Q=j.angle_deg*Math.PI/180,ye=.25*m,Se=[f[0]+ye*Math.cos(Q),f[1]+ye*Math.sin(Q),0];n.addSegments("dir_"+j.id,"dirs",[f[0]-ye*Math.cos(Q),f[1]-ye*Math.sin(Q),0,...Se],j.id==="unstable"?i.unstable:i.stable,s.dir),n.addLabel("dirlabel_"+j.id,"dirs",Se,c("lbl-dir","L2",Xt("span",{i18n:j.id==="unstable"?"l2.unstable":"l2.stable"}),La(j.num,t,"\xB0")),{priority:3})}let x=e["stage3c.halo_family"],p=n.tokens.scene.familyEvery;for(let j of["\uBD81\uCABD","\uB0A8\uCABD"]){let Q=x._arrays[x.family[j].array],[ye,Se]=Q.shape;for(let ve of["some","all"]){let je=[];for(let ot=0;ot<ye;ot++)(ve==="some"?ot%p===0:ot%p!==0)&&je.push(ot);let Ke=new Float64Array(je.length*(Se-1)*6),ke=0;for(let ot of je)for(let it=0;it<Se-1;it++)for(let qe of[(ot*Se+it)*3,(ot*Se+it+1)*3])Ke[ke++]=Q.data[qe],Ke[ke++]=Q.data[qe+1],Ke[ke++]=Q.data[qe+2];let Xe=n.addSegments(ve==="some"?"halo_"+j:"halo_rest_"+j,"halo",Ke,i.haloFam,s.family,s.familyOpacity);Xe.familyLine=!0,ve==="all"&&(Xe.wanted=!1,Xe.obj.visible=!1,Xe.familyRest=!0)}}{let j=x._arrays[x.family[x.main.side].array],Q=j.shape[1],ye=j.data.slice(x.main.index*Q*3,(x.main.index+1)*Q*3);n.addPolyline("halo_main","halo",ye,i.haloMain,s.main),n.addLabel("halo_main_label","halo",Array.from(ye.slice(Math.floor(Q/4)*3,Math.floor(Q/4)*3+3)),c("lbl-orbit","halo_main",Xt("span",{i18n:"l2.halo_main"}),La(x.main.period,t,()=>` ${pM(x.main.period.unit)}`)),{priority:7,pick:"halo_main"})}let g=e["stage3b.escape_samples"];for(let j of g.items)n.addPolyline("esc_"+j.\uBC88\uD638,"escape",g._arrays[j.array].data,j.direction_316>0?i.escOut:i.escIn,s.escape);let T=e["stage3.burns"],R={"3-A":i.a3,"3-C":i.c3,"4-C":i.c4};for(let[j,Q]of Object.entries(T.runs)){n.addPolyline("traj_"+j,"burns",T._arrays[Q.array_traj].data,R[j],s.traj,.7);let ye=T._arrays[Q.array_pos].data,Se=T._arrays[Q.array_dv].data,ve=new Float64Array(ye.length*2),je=3e3/l;for(let Ke=0;Ke<ye.length;Ke+=3){let ke=Math.hypot(Se[Ke],Se[Ke+1],Se[Ke+2])||1;ve.set([ye[Ke],ye[Ke+1],ye[Ke+2],ye[Ke]+je*Se[Ke]/ke,ye[Ke+1]+je*Se[Ke+1]/ke,ye[Ke+2]+je*Se[Ke+2]/ke],Ke*2)}n.addSegments("dv_"+j,"burns",ve,R[j],s.dv),n.addPoints("burnpts_"+j,"burns",ye,R[j])}let y=e["stage4.reference"];n.addPolyline("ref_4C","ref",y._arrays["4C"].data,i.ref4c,s.ref),n.addPolyline("ref_4D","ref",y._arrays["4D"].data,i.ref4d,s.ref);let M=t.screenEph||(()=>{let j=kr(e).ephem;return{evaluate:Q=>j.evaluate(Q),tMin:j.tMin}})(),w=t.screenEph?t.screenEph.tMin:M.tMin,P=n.addMarker("Earth","earthmoon",[1-o,0,0],i.earth,c("lbl-body","Earth",Xt("span",{i18n:"body.earth"})),{hidden:!0,priority:7}),v=n.addMarker("Moon","earthmoon",[1-o,0,0],i.moon,c("lbl-body","Moon",Xt("span",{i18n:"body.moon"})),{hidden:!0,priority:4});n.addSphere("Earth_sphere","earthmoon",P,t.radii.earth.km,i.earth,{glow:a.earth,minPx:r.earthMinPx,pick:"Earth",dot:6,capFrac:.6,capFloorDev:3.01,atmosphere:i.atmosphere??7320831,surface:"earth",segments:[256,128]}),n.addSphere("Moon_sphere","earthmoon",v,t.radii.moon.km,i.moon,{glow:a.moon,minPx:r.moonMinPx,pick:"Moon",capFrac:.3,capFloorDev:1.5,surface:"moon"});let A=121,U=30,I=n.addPolyline("moon_trail","earthmoon",new Float64Array(A*3),i.moonTrail,s.trail,1,{fade:!0}),L=(j,Q)=>{let ye=rs(j.pos[0],j.vel[0],j.pos[3],j.vel[3]),Se=er(j.pos[Q],ye);return[(Se[0]+1-o)*l,Se[1]*l,Se[2]*l]};hM(n,e,t,c,i,s);let F=[["mercury_bary","Mercury"],["venus_bary","Venus"],["mars_bary","Mars"],["jupiter_bary","Jupiter"],["saturn_bary","Saturn"],["uranus_bary","Uranus"],["neptune_bary","Neptune"]],D={Mercury:1,Venus:2,Earth:3,Mars:4,Jupiter:5,Saturn:6,Uranus:7,Neptune:8},X={Mercury:11053224,Venus:15256992,Mars:13656634,Jupiter:14201994,Saturn:14929818,Uranus:10475744,Neptune:7048432},ie={Venus:[15258278,1.03],Mars:[14262908,1.02],Jupiter:[14205088,1.015],Saturn:[14929818,1.015],Uranus:[10475744,1.02],Neptune:[7048432,1.02]},W=t.screenEph?t.screenEph.solar():null,ne=[];if(W)for(let[j,Q]of F){let ye=W.bodies.find(je=>je.name===j);if(!ye)continue;let Se=(i.planets&&i.planets[Q])??X[Q],ve=n.addMarker(Q,"planets",[0,0,0],Se,c("lbl-body",Q,Xt("span",{i18n:"body."+Q.toLowerCase()})),{hidden:!0,priority:3});n.addSphere(Q+"_sphere","planets",ve,ye.radius_km,Se,{minPx:r.planetMinPx??4,pick:Q,dot:9-D[Q],capFrac:.6,capFloorDev:3.01,surface:"planet",...ie[Q]?{atmosphere:ie[Q][0],atmoSize:ie[Q][1]}:{}}),ne.push({key:j,mk:ve})}let H=[],re=100,le=-1/0,ae=!1,me=null,Ne=null;if(t.orbitShapes&&W){let j=0,Q=1/0;for(let ye of t.orbitShapes.orbits){let Se=ye.xyz_km,ve=1/0;for(let Re=0;Re<Se.length;Re+=3)ve=Math.min(ve,Math.hypot(Se[Re],Se[Re+1],Se[Re+2]));let je=(ye.aphelion_km+ve)/2,Ke=(ye.aphelion_km-ve)/(ye.aphelion_km+ve),ke=F.find(([,Re])=>Re===ye.name),Xe=ke?ke[0]:"earth",ot=ke?W.bodies.find(Re=>Re.name===Xe).radius_km:t.radii.earth.km,it=pd(je,Ke,ot),qe=it.dE.length,ue=n.addPolyline("orbit_"+ye.name,"planet_orbits",new Float64Array(3*qe),i.planetOrbit??11123926,s.planetOrbit??1,s.planetOrbitOpacity??.42);H.push({it:ue,key:Xe,mu:ye.mu_km3_s2,grid:it,p:new Float64Array(3*qe),rho:new Float64Array(3*qe),tRef:NaN,dtMax:0}),j=Math.max(j,ye.aphelion_km),Q=Math.min(Q,ve)}n.setOrbitOuter(j),n.setOrbitInner(Q)}let Le=(j,Q,ye,Se)=>{let ve=performance.now(),je=ve-le>=re,Ke=t.screenEph.solar().chunkFor(j).year,ke=!1;ae=!1;for(let Xe of H){if(Math.abs(j-Xe.tRef)<=Xe.dtMax)continue;if(!je){ae=!0;continue}let ot=Xe.key==="earth"?{pos:Q.pos[1],vel:Q.vel[1]}:W.evaluate(Xe.key,j,Ke),it=Va(ot.pos,ot.vel,Q.pos[0],Q.vel[0],Xe.mu,Xe.grid.dE,Xe.p);it&&(Xe.tRef=j,Xe.dtMax=fd*Xe.grid.stepKm/it.speed,ke=!0)}if(ke&&(le=ve),!(!Se&&!ke))for(let Xe of H){ld(Xe.p,Q.pos[0],ye,Xe.rho);let ot=Xe.it.src,it=Xe.rho;for(let qe=0;qe<it.length;qe+=3)ot[qe]=(it[qe]+1-o)*l,ot[qe+1]=it[qe+1]*l,ot[qe+2]=it[qe+2]*l}},De=null;return t.onTime=j=>{if(j===De){ae&&H.length&&Le(j,me,Ne,!1);return}let Q=M.evaluate(j),ye=Math.max(w,j-U*86400),Se=M.evaluate(ye);if(!(!Q||!Se)){if(De=j,t.frameF=rs(Q.pos[0],Q.vel[0],Q.pos[3],Q.vel[3]),P.src.set(L(Q,1)),v.src.set(L(Q,2)),ne.length){let ve=rs(Q.pos[0],Q.vel[0],Q.pos[3],Q.vel[3]),je=t.screenEph.solar().chunkFor(j).year;for(let Ke of ne){let ke=er(W.evaluate(Ke.key,j,je).pos,ve);Ke.mk.src.set([(ke[0]+1-o)*l,ke[1]*l,ke[2]*l])}H.length&&(me=Q,Ne=ve,Le(j,Q,ve,!0))}for(let ve=0;ve<A;ve++){let je=Math.max(w,j-U*86400*(A-1-ve)/(A-1));I.src.set(L(M.evaluate(je),2),ve*3)}}},{eph:M,toScene:L}}function hM(n,e,t,i,s,r){let a=e["stage4a.jwst"];if(!a)return;let o=n.tokens.scene.points,l=a._arrays;n.addPoints("jwst_pts","jwst",l.daily.data,s.jwst,o.jwst),n.addPolyline("jwst_interp","jwst",l.interp.data,s.jwst,r.jwstInterp,.85,{dashed:!0}),n.addPolyline("jwst_10m","jwst",l.tenmin.data,s.jwst,r.jwst);let c=Array.from(l.tenmin.data.slice(-3)),d=Xt("small",{class:"lbl-fixed","data-meta":""}),h=()=>{d.textContent=xe("jwst.marker_fixed",{date:a.marker.text.ko.slice(0,10)}),d.title=document.documentElement.lang==="ko"?a.marker.text.ko:a.marker.text.en};h(),ll.push(h),n.addMarker("JWST","jwst",c,s.jwst,i("lbl-body lbl-jwst","JWST",Xt("span",{"data-meta":""},"JWST")),{size:o.jwstMarker,priority:8}),n.addLabel("jwst_fixed","jwst",c,Xt("div",{class:"lbl lbl-fixed-wrap"},d),{priority:2}).labelObj.center.set(-.08,-.45);let f=Math.floor(l.daily.data.length/6)*3;n.addLabel("jwst_orbit_label","jwst",Array.from(l.daily.data.slice(f,f+3)),i("lbl-orbit","jwst_period",Xt("span",{i18n:"jwst.orbit_label"})),{priority:2,pick:"jwst_period"});let m=e["stage5.jwst"];if(!m)return;let x=m._arrays,p=m.layers.ext,g=m.layers.phys;for(let[P,v]of Object.entries(p.windows))n.addPolyline("jpl_"+P,"jwst_ext",x[v.array].data,s.extJpl,r.pred);for(let P of p.curves){let v=x[P.array_pos].data;n.addPolyline("mine_"+P.id,"jwst_ext",v,s.extMine,r.traj),n.addPoints("mine_end_"+P.id,"jwst_ext",v.slice(-3),s.extMine,o.predEnd)}let T=x[g.arrays_pos.recon].data,R=x[g.arrays_pos.mine].data;n.addPolyline("recon_R","jwst_phys",T,s.physRecon,r.pred),n.addPolyline("mine_R","jwst_phys",R,s.physMine,r.traj),n.addPoints("mine_end_R","jwst_phys",R.slice(-3),s.physMine,o.predEnd),n.addPolyline("jpl01U_R","jwst_phys",x[g.arrays_pos.jpl].data,s.physJpl,r.traj,1,{dashed:!0});let y=p.items.find(P=>P.id==="jwst_err_range"),M=g.items.find(P=>P.id==="jwst_err_R5"),w=x[p.windows.B.array].data;n.addLabel("jwst_ext_label","jwst_ext",Array.from(w.slice(-3)),i("lbl-pred lbl-ext","JWST",Xt("span",{i18n:"jwst.layer_ext_short"}),Ug(p.verification,t.table),La(y,t," km")),{priority:6,pick:"JWST"}),n.addLabel("jwst_phys_label","jwst_phys",Array.from(T.slice(-3)),i("lbl-pred lbl-phys","JWST",Xt("span",{i18n:"jwst.layer_phys_short"}),Ug(g.verification,t.table),La(M,t,()=>` km (${xe("jwst.rep_5d")})`)),{priority:6,pick:"JWST"}),fM(n,m,t,s,o,r)}function fM(n,e,t,i,s,r){let a=e._arrays,o=e.layers.ext,l=e.layers.phys,c=t.constants.length_unit_km,d=(w,P)=>{let v=a[w].data,A=v.length/3,U=P<0?A+P:P;return{arr:w,k:U,p:[v[3*U],v[3*U+1],v[3*U+2]]}},h=(w,P)=>{let v=a[w].data;for(let A=0;A<v.length;A++)if(Math.abs(v[A]-P)<1e-9)return A;return-1},u=(w,P)=>w.items.find(v=>v.id===P),f=(Date.parse(l.window.rep_end.replace(" ","T")+"Z")-Date.parse(l.window.start.replace(" ","T")+"Z"))/864e5,m=[{id:"R5",layer:"jwst_phys",lines:["recon_R","mine_R","mine_end_R","jpl01U_R"],base:{...d(l.arrays_pos.recon,h("days_R",f)),name:"jwst.zl_recon",color:i.physRecon},others:[{...d(l.arrays_pos.mine,h("days_R",f)),name:"jwst.zl_mine_kB",color:i.physMine,item:u(l,"jwst_err_R5"),gap:"jwst.gap_mine_recon"},{...d(l.arrays_pos.jpl,h("days_R_jpl",f)),name:"jwst.zl_jpl01U",color:i.physJpl,item:u(l,"jwst_err_R5_jpl"),gap:"jwst.gap_jpl_recon"}]}];for(let w of["A","B","C"]){let P=o.curves.filter(v=>v.window===w);P.length&&m.push({id:w,layer:"jwst_ext",lines:["jpl_"+w,...P.flatMap(v=>["mine_"+v.id,"mine_end_"+v.id])],base:{...d(o.windows[w].array,-1),name:"jwst.zl_jpl",color:i.extJpl},others:P.map(v=>({...d(v.array_pos,-1),text:v.label,color:i.extMine,item:u(o,"jwst_err_"+v.id),gap:"jwst.gap_mine_jpl"}))})}n.zoomStops={};let x=(w,P)=>[w[0]-P[0],w[1]-P[1],w[2]-P[2]],p=(w,P)=>[w[1]*P[2]-w[2]*P[1],w[2]*P[0]-w[0]*P[2],w[0]*P[1]-w[1]*P[0]],g=w=>{let P=Math.hypot(...w)||1;return w.map(v=>v/P)},T=(w,P)=>(w.zoom=P,w.obj.visible=!1,w.labelObj&&(w.labelObj.visible=!1),w.pick=null,w),R=w=>document.documentElement.lang==="ko"?w.ko:w.en;for(let w of m){if(w.base.k<0||w.others.some(ae=>ae.k<0||!ae.item))continue;let P=[w.base,...w.others],v=[0,1,2].map(ae=>P.reduce((me,Ne)=>me+Ne.p[ae],0)/P.length),A=w.others.map(ae=>Math.hypot(...x(ae.p,w.base.p))*c),U=Math.max(25,4.5*Math.max(...A)),I=a[w.base.arr].data,L=w.base.k,F=I.length/3,D=Math.min(L+1,F-1),X=Math.max(L-1,0),ie=g(x(Array.from(I.slice(3*D,3*D+3)),Array.from(I.slice(3*X,3*X+3)))),W=x(w.others[A.indexOf(Math.max(...A))].p,w.base.p),ne=p(ie,W);Math.hypot(...ne)<1e-6*Math.hypot(...W)&&(ne=p(ie,[0,0,1])),ne=g(ne),ne[2]<0&&(ne=ne.map(ae=>-ae));let H="zoom_"+w.id;n.anchors[H]=n.ndToKm(v),n.addZoomTarget(H,w.id),n.zoomStops[w.id]={layer:w.layer,cam:{target:H,dist:U,az:Math.atan2(ne[1],ne[0]),el:Math.asin(ne[2])},gapsDrawnKm:A,points:P.map(ae=>ae.p),items:w.others.map(ae=>ae.item.id)},P.forEach((ae,me)=>T(n.addMarker(`zoompt_${w.id}_${me}`,w.layer,ae.p,ae.color,null,{size:s.zoomPt}),w.id));let re=new Float64Array(6*w.others.length);w.others.forEach((ae,me)=>re.set([...w.base.p,...ae.p],6*me)),T(n.addSegments("zoomgap_"+w.id,w.layer,re,i.zoomGap,r.zoomGap,.9),w.id);let le=.18*U/c;P.forEach((ae,me)=>{let Ne=a[ae.arr].data,Le=Ne.length/3,De=ae.k>0?ae.k-1:Math.min(ae.k+1,Le-1),j=g(x(Array.from(Ne.slice(3*De,3*De+3)),ae.p)),Q=ae.p.map((ve,je)=>ve+le*j[je]),ye=ae.text?Xt("span",{class:"lbl-name-only","data-meta":""},R(ae.text)):Xt("span",{class:"lbl-name-only","data-meta":"",i18n:ae.name});ae.text&&ll.push(()=>{ye.textContent=R(ae.text)});let Se=Xt("div",{class:"lbl lbl-zoomline"},ye);Se.style.setProperty("--zl-color","#"+ae.color.toString(16).padStart(6,"0")),T(n.addLabel(`zoomname_${w.id}_${me}`,w.layer,Q,Se,{priority:8}),w.id)}),w.others.forEach((ae,me)=>{let Ne=Xt("div",{class:"lbl lbl-gap"},Xt("span",{class:"lbl-name-only","data-meta":"",i18n:ae.gap}),La(ae.item,t," km"));Ne.dataset.gap=ae.item.id,T(n.addLabel(`zoomgapl_${w.id}_${me}`,w.layer,ae.p,Ne,{priority:9}),w.id)})}let y=Object.fromEntries(m.map(w=>[w.id,new Set(w.lines)])),M=w=>(w.layer==="jwst_ext"||w.layer==="jwst_phys")&&!w.zoom&&w.kind!=="label";n.onZoomChange(w=>{n.setItemsDimmed(M,!1),w&&y[w]&&n.setItemsDimmed(P=>M(P)&&!y[w].has(P.name),!0,.18)})}function pM(n){return n&&typeof n=="object"?document.documentElement.lang==="ko"?n.ko:n.en:n||""}var mM=(()=>{let n=document.createElement("div");return n.innerHTML="<svg></svg>",n.firstChild.namespaceURI})(),xs=(n,e={},...t)=>{let i=document.createElementNS(mM,n);for(let[s,r]of Object.entries(e))i.setAttribute(s,r);return i.append(...t),i},Kt=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=xe(r)):s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i};function gM(n,e,t,i){let d=t.days[0],h=t.days[t.days.length-1],u=Math.log10(t.km[0]),f=Math.log10(t.km[t.km.length-1]),m=y=>40+(y-d)/(h-d)*252,x=y=>8+(1-(Math.log10(Math.min(Math.max(y,t.km[0]),t.km[t.km.length-1]))-u)/(f-u))*116,p=xs("svg",{viewBox:"0 0 300 150",width:300,height:150,class:"err-chart",role:"img","aria-label":Rt(n.title)});if(n.outside_from_day!==void 0){let y=m(n.outside_from_day),M=m(n.outside_to_day);p.append(xs("rect",{x:y,y:8,width:M-y,height:116,class:"err-outside"}))}let g=xs("g",{class:"err-axes","data-aux":"tick","data-source":t.source,"data-verification":"display/axis"});for(let y of t.km)g.append(xs("line",{x1:40,x2:292,y1:x(y),y2:x(y),class:"err-grid"})),g.append(xs("text",{x:36,y:x(y)+4,"text-anchor":"end"},t.km_text[t.km.indexOf(y)]));for(let y of t.days)g.append(xs("line",{x1:m(y),x2:m(y),y1:8,y2:124,class:"err-grid"})),g.append(xs("text",{x:m(y),y:138,"text-anchor":"middle"},String(y)));p.append(g);for(let y of n.curves){let M=e[y.array_days].data,w=e[y.array_km].data,P="";for(let v=0;v<M.length;v++)w[v]>0&&(P+=`${P?"L":"M"}${m(M[v]).toFixed(2)},${x(w[v]).toFixed(2)}`);p.append(xs("path",{d:P,class:"err-line",stroke:y.color,"stroke-dasharray":y.dashed?"4 3":"none","data-curve":y.id}));for(let v of y.marks)p.append(xs("circle",{cx:m(v.day),cy:x(v.km),r:2.6,fill:y.color,"data-mark":`${y.id}@${v.day}`}))}let T=Kt("figure",{class:"err-fig","data-layer":i.key});T.append(p);let R=Kt("figcaption",{class:"err-legend","data-meta":""});for(let y of n.curves){let M=Kt("span",{class:"err-swatch"+(y.dashed?" dashed":"")});M.style.borderColor=y.color,R.append(Kt("span",{class:"err-key"},M,document.createTextNode(Rt(y.label))))}return R.append(Kt("span",{class:"err-axis-note",i18n:"jwst.axis_note"})),T.append(R),T}function Bg(n,e,t,i,s){let r=e?Kt("button",{type:"button",id:n,class:"link-btn zoom-btn",i18n:e}):Kt("button",{type:"button",id:n,class:"link-btn zoom-btn"},s);return r.addEventListener("click",()=>t(i)),r}function rf(n,e,t,i,s,r){let a=Kt("div",{class:"jwst-body"}),o=n["stage5.jwst"];if(!o)return a.append(Kt("p",{class:"note",i18n:"jwst.no_predictions"})),a;for(let c of["ext","phys"]){let d=o.layers[c],h=Kt("section",{class:`jwst-layer jwst-${c}`,"data-layer":c}),u=Kt("h4",{"data-meta":""},Kt("span",{i18n:`jwst.layer_${c}`}),si(d.verification,e));h.append(u,Kt("p",{class:"desc","data-meta":""},Rt(d.note))),h.append(gM(d,o._arrays,o.axes,{key:c}));for(let f of d.items){let m=yi(f,e,t);i.push(m),h.append(m)}if(r){let f=Kt("div",{class:"zoom-row","data-meta":""});if(c==="phys")f.append(Bg("zoom-R5","jwst.zoom_phys",r,"R5"));else{f.append(Kt("span",{i18n:"jwst.zoom_ext"}));for(let m of Object.keys(d.windows))f.append(Bg("zoom-"+m,null,r,m,m))}h.append(f)}a.append(h)}let l=Kt("button",{type:"button",id:"open-period",class:"link-btn",i18n:"jwst.period_button"});return l.addEventListener("click",s),a.append(l),a}function af(n,e,t,i){let r=n["stage4a.jwst"].period_card,a=Kt("div",{class:"period-body"}),o=Kt("p",{class:"period-class","data-meta":""},Kt("span",{i18n:"jwst.period_class"}),si(r.verification,e));a.append(o,Kt("p",{class:"desc","data-meta":""},Rt(r.summary)));for(let l of r.items){let c=yi(l,e,t);i.push(c),a.append(c)}return a.append(Kt("p",{class:"note period-unknown","data-meta":""},Rt(r.unknown))),a}var N=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?i.dataset.i18n=r:s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},Un={all:{target:"bary",dist:42e7,az:-1.5708,el:1.2},emb:{target:"EMB",dist:75e5,az:-1.5708,el:1.1},l2:{target:"L2",dist:32e5,az:-1.2,el:.6},l2zoom:{target:"L2",dist:300,az:-1.2,el:.6},jwst:{target:"L2",dist:29e5,az:-.45,el:.42},solar:{target:"bary",dist:125e8,az:-1.5708,el:1.15}},Sr={Sun:["Sun",6e6],EMB:["EMB",25e5],Earth:["Earth",12e4],Moon:["Moon",12e4],L1:["L1",25e5],L2:["L2",32e5],L3:["L3",6e7],L4:["L4",6e7],L5:["L5",6e7],halo_main:["L2",32e5],JWST:["JWST",12e5],jwst_period:["L2",29e5],Mercury:["Mercury",6e6],Venus:["Venus",15e6],Mars:["Mars",1e7],Jupiter:["Jupiter",12e7],Saturn:["Saturn",1e8],Uranus:["Uranus",5e7],Neptune:["Neptune",5e7]},_M=["lpoints","bodies","dirs","earthmoon","halo","escape","burns","ref","jwst","jwst_ext","jwst_phys"],xM=[1,10,30];function zg(n,e,t){let i=[],s=t.manifest.verification,r=N("button",{type:"button",id:"mode-rot",class:"on",i18n:"l2.mode_rot"}),a=N("button",{type:"button",id:"mode-in",i18n:"l2.mode_inertial"});r.addEventListener("click",()=>{n.setMode("rot"),r.classList.add("on"),a.classList.remove("on")}),a.addEventListener("click",()=>{n.setMode("inertial"),a.classList.add("on"),r.classList.remove("on")});let o=N("div",{class:"ctl-row","data-meta":""},N("span",{class:"ctl-h",i18n:"l2.mode"}),r,a),l=N("div",{class:"ctl-row","data-meta":""},N("span",{class:"ctl-h",i18n:"l2.view"}));for(let de of Object.keys(Un)){let Ae=N("button",{type:"button",id:"view-"+de,i18n:"l2.view_"+de});Ae.addEventListener("click",()=>n.setCamera({...Un[de],...de==="solar"?{dist:Math.max(Un.solar.dist,n.orbitFitDist(1.2))}:{}})),l.append(Ae)}let c=N("button",{type:"button",id:"true-size",i18n:"view.true_size","aria-pressed":"false"});if(c.title=xe("view.true_size_title"),c.addEventListener("click",()=>{n.setTrueSize(!n.trueSize),c.setAttribute("aria-pressed",String(n.trueSize)),c.classList.toggle("on",n.trueSize)}),l.append(c),n.zoomStops&&n.zoomStops.R5){let de=N("button",{type:"button",id:"view-jwstzoom",i18n:"l2.view_jwstzoom"});de.addEventListener("click",()=>n.model.onZoom&&n.model.onZoom("R5")),l.append(de)}let d=N("input",{type:"range",id:"time",min:String(n.model.tMin),max:String(n.model.tMax),step:"3600","aria-label":"time"});d.value=String(n.state.t),d.addEventListener("input",()=>n.setTime(Number(d.value)));let h=N("button",{type:"button",id:"play",i18n:"l2.play"}),u=10;h.addEventListener("click",()=>{let de=!n.anim.speedDaysPerSec;n.anim.speedDaysPerSec=de?u:0,h.dataset.i18n=de?"l2.pause":"l2.play",h.textContent=xe(h.dataset.i18n)});let f=N("select",{id:"speed","aria-label":"speed"});for(let de of xM){let Ae=N("option",{value:String(de)});Ae.dataset.speed=String(de),f.append(Ae)}f.value=String(u),f.addEventListener("change",()=>{u=Number(f.value),n.anim.speedDaysPerSec&&(n.anim.speedDaysPerSec=u)});let m=e["time.utc"],x={t:m._arrays.t_tdb_s.data,u:m._arrays.unix_utc_s.data},p=N("button",{type:"button",id:"date",class:"num"});p.dataset.source="time.utc (results/web) | "+m.provenance.source.map(de=>`${de.file}>${de.key}`).join(" | "),p.dataset.verification=`${m.provenance.verification.tag}/${m.provenance.verification.detail}`;let g=de=>({id:"date",value:de,text:Vi(Sn(de,x)),unit:"UTC",label:{ko:"\uD654\uBA74 \uC2DC\uAC01 (UTC)",en:"Displayed time (UTC)"},note:{ko:`TDB ${Sl(de)} (J2000 TDB ${de} \uCD08). UTC = Python \uC774 \uB0B4\uBCF4\uB0B8 \uD558\uB8E8 \uAC04\uACA9 \uD658\uC0B0\uD45C (astropy) \uB97C \uC120\uD615 \uBCF4\uAC04 \u2014 \uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0`,en:`TDB ${Sl(de)} (J2000 TDB ${de} s). UTC = linear interpolation of the daily table exported by Python (astropy) \u2014 browser calculation`},provenance:m.provenance,browser_calc:{tolerance:"1e-3 s (golden utc)"}});p.addEventListener("click",()=>t.openSource(g(n.state.t)));let T=()=>{for(let de of f.options)de.textContent=xe("l2.speed",{n:de.dataset.speed})},R=()=>{p.textContent=`${Vi(Sn(n.state.t,x))} UTC`},y=N("button",{type:"button",id:"t-start",i18n:"time.start"});y.addEventListener("click",()=>n.setTime(n.model.tMin));let M=N("button",{type:"button",id:"t-now",i18n:"time.now"});M.addEventListener("click",()=>n.setTime(ka(x,Date.now()/1e3)));let w=de=>Vi(Sn(de,x)).slice(0,10),P=N("input",{type:"date",id:"date-jump","aria-label":"date"}),v=Sn(n.model.tMin,x),A=Sn(n.model.tMax,x),U=new Date(Math.ceil(v/86400)*864e5).toISOString().slice(0,10),I=new Date(Math.floor(A/86400)*864e5).toISOString().slice(0,10);P.min=U,P.max=I;let L=N("button",{type:"button",id:"date-go",i18n:"time.go"}),F=N("span",{id:"date-range-note",class:"note",hidden:!0,i18n:"time.out_of_range"}),D=()=>{let de=P.value,Ae=!!de&&de>=U&&de<=I;return L.disabled=!Ae,F.hidden=!de||Ae,Ae};P.addEventListener("input",D),L.addEventListener("click",()=>{D()&&n.setTime(zi(Date.parse(P.value+"T00:00:00Z")/1e3,x))}),L.disabled=!0,P.dataset.range=`${U} ~ ${I}`;let X=N("div",{class:"ctl-row","data-meta":""},N("span",{class:"ctl-h",i18n:"l2.time"}),y,h,M,f,P,L,F,N("span",{id:"ephem-busy-slot"})),ie=N("div",{class:"ctl-row slider-row"},d),W=xi(m.provenance.verification,s),ne=N("div",{class:"ctl-row date-row"},p,W);ne.dataset.source=p.dataset.source,ne.dataset.verification=p.dataset.verification,n.model.onTimeChange=de=>{d.value=String(de),R()};let H=N("div",{class:"layers","data-meta":""});for(let de of _M){let Ae=N("input",{type:"checkbox",id:"layer-"+de,checked:!0});Ae.addEventListener("change",()=>n.setLayer(de,Ae.checked)),H.append(N("label",{},Ae,N("span",{i18n:"l2.layer_"+de})))}let re=N("input",{type:"checkbox",id:"family-all"});re.addEventListener("change",()=>{for(let de of n.items)de.familyRest&&(de.wanted=re.checked,de.obj.visible=re.checked&&document.getElementById("layer-halo").checked)}),H.append(N("label",{class:"fam"},re,N("span",{i18n:"l2.family_all"})));let le=N("div",{class:"nums"}),ae=(de,Ae,b=!1)=>{let _=N("details",{open:b});_.append(N("summary",{"data-meta":"",i18n:de}));for(let O of Ae){let z=yi(O,s,t.openSource);i.push(z),_.append(z)}return le.append(_),_},me=e["ephem.earth_moon"];ae("l2.g_lpoints",e["stage1.points"].items.map(de=>de.dist),!0),ae("l2.g_dirs",e["stage2.l2_directions"].items.map(de=>de.num),!0),ae("l2.g_halo",[e["stage3c.halo_family"].main.period,e["stage3c.halo_family"].main.zmax],!0),ae("l2.g_annual",e["stage3.burns"].annual,!0),ae("l2.g_ref",e["stage4.reference"].numbers,!0),ae("l2.g_escape",e["stage3b.escape_samples"].items.map(de=>de.t316)).querySelector("summary").after(N("p",{class:"note","data-meta":"",i18n:"l2.escape_rule"}));let Le=n.model.screenEph&&e["m4.ephem"];ae("l2.g_interp",Le&&Le.holdout?[Le.holdout.earth,Le.holdout.moon]:["\uC9C0\uAD6C","\uB2EC"].map(de=>me.holdout[de]));let De=e["stage5.jwst"],j=e["stage4a.jwst"];De&&(ae("jwst.g_ext",De.layers.ext.items),ae("jwst.g_phys",De.layers.phys.items)),j&&ae("jwst.g_period",j.period_card.items),ae("l2.g_m0",[]).append(document.getElementById("samples"));let ye=N("div",{class:"legend"},N("p",{"data-meta":""},Xn(),N("span",{i18n:"l2.legend_spheres"})),N("p",{"data-meta":"",i18n:"l2.legend_markers"}),N("p",{"data-meta":"",i18n:"l2.legend_pulsating"}),N("p",{"data-meta":"",i18n:"l2.legend_inertial"}),N("p",{"data-meta":"",i18n:"l2.legend_jwst"}),N("p",{"data-meta":"",i18n:"l2.legend_jwstzoom"})),Se={};for(let de of e["stage1.points"].items)Se[de.id]=[de.dist];let ve=e["stage2.l2_directions"].items.map(de=>de.num),je=e["stage3c.halo_family"],Ke=Object.fromEntries(e["stage3.burns"].annual.map(de=>[de.id,de]));Se.L2=[...Se.L2,...ve,Ke.annual_3A,...e["stage3b.escape_samples"].items.map(de=>de.t316)],Se.halo_main=[je.main.period,je.main.zmax,Ke.annual_3C,Ke.annual_4C,...e["stage4.reference"].numbers],Se.Earth=[Le&&Le.holdout?Le.holdout.earth:me.holdout.\uC9C0\uAD6C],Se.Moon=[Le&&Le.holdout?Le.holdout.moon:me.holdout.\uB2EC],Se.Sun=[],Se.EMB=[];for(let de of["Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune"])Se[de]=[];let ke={Sun:"body.sun",EMB:"body.emb",Earth:"body.earth",Moon:"body.moon",halo_main:"l2.halo_main",JWST:"body.jwst",jwst_period:"jwst.period_title",Mercury:"body.mercury",Venus:"body.venus",Mars:"body.mars",Jupiter:"body.jupiter",Saturn:"body.saturn",Uranus:"body.uranus",Neptune:"body.neptune"},Xe=[],ot=de=>ke[de]?xe(ke[de]):de;function it(de){let Ae=N("div",{class:"card-body"});Ae.append(N("h3",ke[de]?{i18n:ke[de]}:{"data-meta":""},ot(de))),Ae.append(N("p",{class:"desc","data-meta":"",i18n:"desc."+de},xe("desc."+de))),n.items.find(z=>z.kind==="sphere"&&z.pick===de)&&Ae.append(N("p",{class:"note","data-meta":""},Xn(),N("span",{i18n:"card.sphere_note"},xe("card.sphere_note"))));let _=Se[de]||[];for(let z of Xe)Fr(z);Xe.length=0;for(let z of _){let se=yi(z,s,t.openSource);Xe.push(se),Ae.append(se)}return de==="JWST"&&Ae.append(rf(e,s,t.openSource,Xe,()=>n.model.onPick&&n.model.onPick("jwst_period"),n.zoomStops?z=>n.model.onZoom&&n.model.onZoom(z):null)),de==="jwst_period"&&Ae.append(af(e,s,t.openSource,Xe)),as(),_.length||de==="JWST"||de==="jwst_period"?Ae.querySelector(".num-row")||Ae.append(N("p",{class:"note",id:"card-numbers-off",i18n:"card.numbers_off"},xe("card.numbers_off"))):Ae.append(N("p",{class:"note",i18n:"card.no_numbers"},xe("card.no_numbers"))),Ae}let qe=De?[...De.layers.ext.items,...De.layers.phys.items]:[],ue=(de,Ae)=>de.map(b=>Ae.find(_=>_.id===b)).filter(Boolean);function Re(de){let Ae={key:[],more:[],expert:[]};return de==="L2"?(Ae.key=[Se.L2[0],Ke.annual_3A],Ae.more=ve,Ae.expert=e["stage3b.escape_samples"].items.map(b=>b.t316)):/^L[1-5]$/.test(de)?Ae.key=Se[de].slice(0,1):de==="halo_main"?(Ae.key=[je.main.period,je.main.zmax,Ke.annual_3C,Ke.annual_4C],Ae.more=e["stage4.reference"].numbers):de==="Earth"||de==="Moon"?Ae.expert=Se[de]:de==="JWST"?Ae.key=ue(["jwst_err_R5","jwst_err_R5_jpl","jwst_err_range"],qe):de==="jwst_period"&&j&&(Ae.key=j.period_card.items),Ae}return{mode:o,views:l,timeHead:X,timeSlider:ie,timeDate:ne,layers:H,nums:le,legend:ye,rows:i,rerender:()=>{T(),R(),W._render(),h.textContent=xe(h.dataset.i18n);for(let de of i)de._render();for(let de of Xe)de._render()},dateItem:g,card:it,nameOf:ot,NAME:ke,sections:Re,jwstBody:(de,Ae)=>rf(e,s,t.openSource,de,Ae,null),periodBody:de=>af(e,s,t.openSource,de),utcTable:x,hasSphere:de=>!!n.items.find(Ae=>Ae.kind==="sphere"&&Ae.pick===de)}}var Vg=typeof document<"u"?document.createElement("template"):null,yM={mark:'<circle cx="7" cy="12" r="3.2"/><circle cx="14.5" cy="12" r="1.4"/><path d="M19.5 12h0" stroke-width="3"/><path d="M3 12c0-6 18-6 18 0s-18 6-18 0" opacity=".45"/>',search:'<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',layers:'<path d="M12 4l8 4.5-8 4.5-8-4.5z"/><path d="M4 12.5l8 4.5 8-4.5"/><path d="M4 16.5l8 4.5 8-4.5"/>',gear:'<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2.2"/><circle cx="9" cy="17" r="2.2"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',play:'<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',pause:'<path d="M8 5.5v13M16 5.5v13" stroke-width="3"/>',chev:'<path d="M6 9l6 6 6-6"/>',chevr:'<path d="M9 6l6 6-6 6"/>',fly:'<circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8" opacity=".0"/><path d="M9 15l6-6M10 9h5v5"/>',focus:'<circle cx="12" cy="12" r="2.2"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/>',cal:'<rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',now:'<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>',share:'<circle cx="6.5" cy="12" r="2.2"/><circle cx="17.5" cy="6.5" r="2.2"/><circle cx="17.5" cy="17.5" r="2.2"/><path d="M8.5 11l7-3.5M8.5 13l7 3.5"/>',download:'<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5"/><path d="M5 19.5h14"/>',tour:'<path d="M5 19c3-1 3-6 7-7s4-6 7-7"/><circle cx="5" cy="19" r="1.6" fill="currentColor"/><circle cx="19" cy="5" r="1.6" fill="currentColor"/>',lab:'<path d="M9.5 3.5h5M10.5 3.5v5L5 18.5a1.5 1.5 0 0 0 1.3 2.2h11.4a1.5 1.5 0 0 0 1.3-2.2L13.5 8.5v-5"/><path d="M7.5 14.5h9"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',sun:'<circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',planet:'<circle cx="12" cy="12" r="5"/><path d="M3.5 15.5c2 1.5 15 -3 17 -7" />',point:'<path d="M12 6v12M6 12h12" /><circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/>',orbit:'<ellipse cx="12" cy="12" rx="9" ry="5"/><circle cx="19.5" cy="9.8" r="1.6" fill="currentColor"/>',craft:'<rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M3 9.5h5v5H3zM16 9.5h5v5h-5z"/><path d="M8 12h1.5M14.5 12H16"/>',view:'<path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.6"/>',info:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.4"/>',keyboard:'<rect x="3" y="6.5" width="18" height="11" rx="2"/><path d="M7 10.5h0M10.5 10.5h0M14 10.5h0M17.5 10.5h0M8 14h8"/>',lang:'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c-3 3-3 14 0 17M12 3.5c3 3 3 14 0 17"/>',t_impl:'<circle cx="12" cy="12" r="8" fill="currentColor" stroke="none"/>',t_ext:'<path d="M12 2.5l9.5 9.5-9.5 9.5L2.5 12z" fill="currentColor" stroke="none"/>',t_phys:'<path d="M12 3l10 17.5H2z" fill="currentColor" stroke="none"/>',t_approx:'<path d="M2.5 10c3-4 6-4 9.5 0s6.5 4 9.5 0M2.5 16c3-4 6-4 9.5 0s6.5 4 9.5 0" stroke-width="3"/>'};function Cn(n,{size:e,cls:t}={}){let i=yM[n];if(i===void 0)throw new Error("\uC544\uC774\uCF58 \uC5C6\uC74C: "+n);Vg.innerHTML="<svg></svg>";let s=Vg.content.firstChild;return s.remove(),s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("fill","none"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.7"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),s.setAttribute("aria-hidden","true"),s.setAttribute("focusable","false"),e&&(s.setAttribute("width",String(e)),s.setAttribute("height",String(e))),t&&s.setAttribute("class",t),s.innerHTML=i,s}function Ia(n,e,t={},...i){let s=document.createElement(n);e&&(s.className=e);for(let[r,a]of Object.entries(t))a!=null&&s.setAttribute(r,String(a));return s.append(...i.filter(r=>r!=null)),s}function Ii(n,{label:e,iconName:t,pressed:i,title:s,busyLabel:r}={}){let a=Ia("button",`k-btn k-${n}`,{type:"button",title:s||(n==="icon"?e:void 0)});if(n==="icon")return a.setAttribute("aria-label",e),a.append(Cn(t)),a;if(n==="toggle")return a.setAttribute("aria-pressed",String(!!i)),a.append(Ia("span","k-ind",{},Cn("check")),e),a.addEventListener("click",()=>a.setAttribute("aria-pressed",String(a.getAttribute("aria-pressed")!=="true"))),a;t&&a.append(Cn(t));let o=Ia("span","k-label",{},e);return a.append(Ia("span","k-spin",{"aria-hidden":"true"}),o),n==="primary"&&a.append(Cn("chevr",{cls:"k-arrow"})),a.setBusy=l=>{a.classList.toggle("is-busy",l),a.setAttribute("aria-busy",String(l)),o.textContent=l&&r?r:e},a}function of(n,{label:e,wide:t=!1}={}){let i=Ia("aside",`k-vpanel k-${n}${t?" k-wide":""}`,{"aria-label":e,"data-open":"false"});return i.setOpen=s=>i.setAttribute("data-open",String(!!s)),i}function lf(n){return Ia("div",`k-scrim k-${n}`,{"aria-hidden":"true"})}var Lt=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=xe(r)):s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},uf=[{id:"bodies",layers:["sun","earth","moon","emb","planets","lpoints"]},{id:"orbits",layers:["halo_main","halo_family","escape","ref","burns","moon_orbit","planet_orbits","dirs","jwst","jwst_ext","jwst_phys"]},{id:"numbers",layers:["n_distance","n_period","n_angle","n_annual","n_escape","n_jwst","n_tags"]},{id:"aux",layers:["labels","scale","grid","axes","stars","milkyway","nightlights","sunglow","clouds"]}],ys=uf.flatMap(n=>n.layers),Wu=n=>Object.fromEntries(ys.map(e=>[e,n.includes(e)])),ju=Object.fromEntries(uf.map(n=>[n.id,n.layers])),vM={clean:Wu(["sun","earth","moon","emb","planets","lpoints","halo_main","moon_orbit","planet_orbits","jwst","n_tags","labels","stars","milkyway","nightlights","sunglow","clouds"]),explore:Wu([...ju.bodies,...ju.orbits,"labels","scale","stars","milkyway","nightlights","sunglow","clouds"]),research:Wu(ys)},bM={m1:Wu(ys.filter(n=>!["scale","grid","axes","stars","milkyway","nightlights","sunglow","clouds","planet_orbits"].includes(n)))},cf=["clean","explore","research"],Hg=[["L","labels"],["O","g:orbits"],["N","g:numbers"],["B","g:bodies"],["G","grid"],["1","p:clean"],["2","p:explore"],["3","p:research"],["?","help"]],Gg={sun:n=>n.name==="Sun"||n.name==="Sun_sphere",earth:n=>n.name==="Earth"||n.name==="Earth_sphere",moon:n=>n.name==="Moon"||n.name==="Moon_sphere",emb:n=>n.name==="EMB",planets:n=>n.layer==="planets",lpoints:n=>n.layer==="lpoints",halo_main:n=>n.name==="halo_main"||n.name==="halo_main_label",halo_family:n=>!!n.familyLine,escape:n=>n.layer==="escape",ref:n=>n.layer==="ref",burns:n=>n.layer==="burns",moon_orbit:n=>n.name==="moon_trail",planet_orbits:n=>n.layer==="planet_orbits",dirs:n=>n.layer==="dirs",jwst:n=>n.layer==="jwst",jwst_ext:n=>n.layer==="jwst_ext",jwst_phys:n=>n.layer==="jwst_phys",grid:n=>n.name==="grid",axes:n=>n.name.startsWith("axes_"),stars:n=>n.name==="stars",milkyway:n=>n.name==="milkyway"},SM=["nightlights","sunglow","clouds"],Wg={clean:["jwst"]},jg="lagrange.layers",Xg={get(){try{return JSON.parse(localStorage.getItem(jg)||"null")}catch{return null}},set(n){try{localStorage.setItem(jg,JSON.stringify(n))}catch{}}};function MM(n){let e=n*110,t=10**Math.floor(Math.log10(e)),i=e/t;return(i>=5?5:i>=2?2:1)*t}var wM=n=>n>=1?Math.round(n).toLocaleString("en-US"):String(Number(n.toPrecision(1)));function qg(n,e){let t={...vM,...bM},i=e.persist?Xg.get():null,s={preset:e.initial,state:{...t[e.initial]},labelNumbers:!0,familyAll:!1,temp:null,zoomOn:!1,noSave:!1,modeKey:null},r=()=>s.temp?{...s.state,...Object.fromEntries([...s.temp].map(I=>[I,!0]))}:s.state;if(i&&i.state&&typeof i.state=="object"){for(let I of ys)typeof i.state[I]=="boolean"&&(s.state[I]=i.state[I]);s.preset=cf.includes(i.preset)||i.preset==="custom"?i.preset:"custom",s.familyAll=!!i.familyAll}let a=[],o=Lt("span",{class:"sb-bar"}),l=Lt("span",{class:"sb-text"}),c=Lt("div",{id:"scalebar",class:"scalebar",hidden:!0,"data-obstacle":"","data-aux":"tick","data-source":"screen scale (camera distance, field of view \u2014 browser drawing aid)","data-verification":"display/approx"},o,l,Xn()),d="";n.onRender.push(I=>{if(c.hidden)return;let L=I.kmPerPx(),F=MM(L),D=F/L,X=`${F}|${D.toFixed(1)}`;X!==d&&(d=X,o.style.width=`${D.toFixed(1)}px`,l.textContent=`${wM(F)} km`,c.dataset.km=String(F))});let h=()=>s.modeKey?[...Hg.filter(([,I])=>!I.startsWith("p:")),["1","m:general"],["2","m:expert"]]:Hg,u=Lt("div",{id:"help",class:"help",hidden:!0,role:"dialog","data-obstacle":"","data-meta":""}),f=[["L","labels"],["O","g_orbits"],["N","g_numbers"],["B","g_bodies"],["G","grid"],["1","m_general"],["2","m_expert"],["E","export"],["/","search"],["T","targets"],["?","help"],["Esc","esc"],["\u2190 \u2192","tour"]];function m(){let I=s.modeKey?f.map(([F,D])=>[F,"keyc."+D]):h().map(([F,D])=>[F,"key."+D.replace(":","_")]);u.replaceChildren(Lt("h3",{i18n:"help.title"}),Lt("table",{},Lt("tbody",{},...I.map(([F,D])=>Lt("tr",{},Lt("th",{},...F.split(" ").map(X=>Lt("kbd",{},X))),Lt("td",{i18n:D}))))),Lt("p",{class:"note",i18n:s.modeKey?"help.note_c":"help.note"}));let L=Lt("button",{type:"button",class:"close",i18n:"source.close"});L.addEventListener("click",()=>{u.hidden=!0}),u.prepend(L)}m();let x=[];function p(){for(let I of n.items)I.familyRest&&(I.wanted=s.familyAll,I.obj.visible=n.wantVisible(I))}function g(){let I=r();for(let[L,F]of Object.entries(Gg))n.setItemsVisible(F,!!I[L]);if(n.setGraphic)for(let L of SM)n.setGraphic(L,!!I[L]);for(let L of new Set(Object.values(Wg).flat()))n.setItemsDimmed(Gg[L],(Wg[s.preset]||[]).includes(L));p(),n.setLabelsVisible(I.labels),yp((L,F)=>I.n_tags?F==="key"?!0:L!=="n_other"&&!I[L]?!1:F==="label"?I.labels&&(s.labelNumbers||s.zoomOn&&L==="n_jwst"):!0:!1),as(),c.hidden=!I.scale,d="",e.persist&&!s.noSave&&Xg.set({preset:s.preset,state:s.state,familyAll:s.familyAll}),document.body.dataset.preset=s.preset,s.temp?document.body.dataset.zoomTemp="":delete document.body.dataset.zoomTemp;for(let L of a)L(s)}function T(I){s.noSave=!1,s.preset=I,s.state={...t[I]},g()}function R(I){for(let L of ys)typeof I[L]=="boolean"&&(s.state[L]=I[L]);s.preset="custom",s.noSave=!0,g()}function y(I,L){s.noSave=!1,s.state[I]=L,s.preset="custom",s.temp&&s.temp.delete(I),g()}function M(I,L="zoom"){let F=new Set(I.filter(D=>!s.state[D]));s.temp=F.size?F:null,s.tempWhy=L,s.zoomOn=L==="zoom",g()}function w(I="zoom"){s.tempWhy===I&&(s.temp=null,s.tempWhy=null,s.zoomOn=!1,g())}function P(I){let L=ju[I],F=L.some(D=>s.state[D]);s.noSave=!1;for(let D of L)s.state[D]=!F,s.temp&&s.temp.delete(D);s.preset="custom",g()}function v(I){s.labelNumbers=I,g()}function A(I){if(I.ctrlKey||I.metaKey||I.altKey)return!1;let L=I.target&&I.target.tagName||"";if(L==="INPUT"||L==="SELECT"||L==="TEXTAREA")return!1;let F=I.key.length===1?I.key.toUpperCase():I.key,D=h().find(([ie])=>ie===F);if(!D)return!1;let X=D[1];return X.startsWith("m:")?(s.modeKey(X.slice(2)),!0):e.mobile&&!X.startsWith("p:")&&X!=="help"?!1:(X==="help"?(u.hidden=!u.hidden,u.hidden||St(u)):X.startsWith("p:")?T(X.slice(2)):X.startsWith("g:")?P(X.slice(2)):y(X,!s.state[X]),!0)}function U(){let I=Lt("div",{class:"layer-panel"}),L=Lt("div",{class:"preset-row",role:"group"}),F={};for(let H of cf){let re=Lt("button",{type:"button",id:"preset-"+H,i18n:"preset."+H});re.addEventListener("click",()=>T(H)),F[H]=re,L.append(re)}let D=Lt("span",{id:"preset-status",class:"preset-status",i18n:"preset.custom"}),X=Lt("span",{id:"preset-zoom",class:"preset-status",i18n:"preset.zooming",hidden:!0});L.append(D,X),I.append(L);let ie={},W=null;if(!e.mobile){for(let le of uf){let ae=Lt("fieldset",{class:"layer-group","data-meta":""},Lt("legend",{i18n:"layer.g_"+le.id}));for(let me of le.layers){let Ne=Lt("input",{type:"checkbox",id:"lay-"+me});Ne.addEventListener("change",()=>y(me,Ne.checked)),ie[me]=Ne,ae.append(Lt("label",{},Ne,Lt("span",{i18n:"layer."+me}),...me==="planet_orbits"?[document.createTextNode(" "),Xn()]:[])),me==="halo_family"&&(W=Lt("input",{type:"checkbox",id:"lay-family-all"}),W.addEventListener("change",()=>{s.familyAll=W.checked,g()}),ae.append(Lt("label",{class:"sub"},W,Lt("span",{i18n:"l2.family_all"}))))}le.id==="numbers"&&ae.append(Lt("p",{class:"note",i18n:"layer.tags_note"})),I.append(ae)}let H=Lt("button",{type:"button",id:"help-btn",class:"help-btn",i18n:"help.button"});H.addEventListener("click",()=>{u.hidden=!u.hidden,u.hidden||St(u)});let re=Lt("span",{i18n:s.modeKey?"help.keys_line_c":"help.keys_line"});x.push(re),I.append(Lt("div",{class:"keys-line","data-meta":""},re,H))}let ne=()=>{for(let re of cf)F[re].classList.toggle("on",s.preset===re);D.hidden=s.preset!=="custom",X.hidden=!s.temp,X.dataset.i18n=s.tempWhy==="tour"?"preset.touring":"preset.zooming",X.textContent=xe(X.dataset.i18n);let H=r();for(let[re,le]of Object.entries(ie))le.checked=!!H[re],le.parentElement.classList.toggle("temp-on",!!(s.temp&&s.temp.has(re)));for(let re of ju.numbers)ie[re]&&re!=="n_tags"&&(ie[re].disabled=!H.n_tags);W&&(W.checked=s.familyAll,W.disabled=!s.state.halo_family)};return a.push(ne),ne(),I}return{get state(){return s.state},get preset(){return s.preset},get labelNumbers(){return s.labelNumbers},get effective(){return r()},get temp(){return s.temp?[...s.temp].sort():[]},applyAll:g,setPreset:T,set:y,toggleGroup:P,setLabelNumbers:v,handleKey:A,panel:U,setTemp:M,clearTemp:w,applyShared:R,setModeKeys(I){s.modeKey=I,m();for(let L of x)L.dataset.i18n="help.keys_line_c",L.textContent=xe("help.keys_line_c")},get noSave(){return s.noSave},onChange(I){a.push(I)},elements:{scalebar:c,help:u},rerender(){m()},census:vp}}var $g=1.8,cl=[{id:"solar",cam:n=>({...Un.solar,dist:Math.max(Un.solar.dist,n.orbitFitDist(1.2))}),layers:["sun","earth","planets","planet_orbits","labels"],nums:[]},{id:"emb",cam:()=>({...Un.emb}),layers:["earth","moon","emb","lpoints","moon_orbit","labels","n_tags"],nums:[["L2","L2_dist"]]},{id:"l2",cam:()=>({target:"L2",dist:16e5,az:-1.2,el:.75}),layers:["lpoints","dirs","escape","labels","n_tags"],nums:[]},{id:"halo",cam:()=>({target:"L2",dist:26e5,az:-.75,el:.32}),layers:["lpoints","halo_main","labels","n_tags"],nums:[["halo_main","halo_period"],["halo_main","halo_zmax"]]},{id:"jwst",cam:()=>({...Un.jwst}),layers:["lpoints","jwst","labels","n_tags"],nums:[["jwst_period","jwst_period_recon"]]},{id:"dv",cam:()=>({...Un.l2}),fit:["halo_main","jwst_10m","jwst_interp"],layers:["lpoints","halo_main","burns","labels","n_tags"],nums:[["halo_main","annual_4C"]]},{id:"expert",cam:null,layers:["labels","n_tags"],nums:[],highlight:"mode-expert"}],EM=()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}},TM=n=>Math.atan2(Math.sin(n),Math.cos(n)),AM=16,CM=40;function RM(n,e,t,i){let s=(n.items||[]).filter(m=>t.includes(m.name)&&m.obj&&m.obj.visible),r=n.anchors&&n.anchors[e.target],a=document.getElementById("scene");if(!s.length||!r||!a||!i)return null;let o=0;for(let m of s)for(let x=0;x<m.src.length;x+=3)o=Math.max(o,Math.hypot(m.src[x]-r[0],m.src[x+1]-r[1],m.src[x+2]-r[2]));let l=a.getBoundingClientRect(),c=l.left+l.width/2,d=l.top+l.height/2,h=l.top;for(let m of["nav","tr"]){let x=document.getElementById(m);x&&x.offsetParent!==null&&(h=Math.max(h,x.getBoundingClientRect().bottom))}let u=Math.min(i.getBoundingClientRect().top-d,d-h,c-l.left,l.right-c)-AM;if(!(u>=CM)||!(o>0))return null;let f=n.kmPerPx()*l.height/(2*n.state.cam.dist);return o/Math.sin(Math.atan(u*f/(l.height/2)))}function Yg(n){let{view:e,layers:t,P:i,table:s,mobile:r}=n,a={active:!1,paused:!1,index:0,anim:null,hl:null,rows:[]},o=N("span",{class:"k-tstep",id:"tour-step","data-meta":""}),l=N("h3",{class:"k-ttitle",id:"tour-title","data-meta":""}),c=N("p",{class:"k-ttext",id:"tour-text","data-meta":""}),d=N("p",{class:"k-tpaused",id:"tour-paused",hidden:!0},N("span",{"data-meta":"",i18n:"tour.paused"})),h=Ii("secondary",{label:xe("tour.resume")});h.id="tour-resume",h.querySelector(".k-label").dataset.i18n="tour.resume",d.append(h);let u=Ii("secondary",{label:xe("tour.prev")});u.id="tour-prev",u.querySelector(".k-label").dataset.i18n="tour.prev",u.prepend(Cn("chevr",{cls:"k-flip"}));let f=Ii("primary",{label:xe("tour.next")});f.id="tour-next";let m=Ii("icon",{label:xe("tour.end"),iconName:"close"});m.id="tour-end",m.dataset.i18nAria="tour.end",m.dataset.i18nTitle="tour.end",m.classList.add("k-close");let x=N("span",{class:"k-tkeys","data-meta":"",i18n:"tour.keys",hidden:!!r}),p=N("section",{id:"tour",class:"k-tour",role:"region","data-obstacle":"","data-i18n-aria":"tour.label","aria-label":xe("tour.label"),hidden:!0},N("div",{class:"k-thead"},N("span",{class:"k-tname","data-meta":""},Cn("tour"),N("span",{i18n:"tour.label"})),o,m),N("div",{"aria-live":"polite"},l,c),d,N("div",{class:"k-tfoot"},u,x,f));n.reg(p),document.body.append(p);function g([W,ne]){let H=i.sections(W);return[...H.key,...H.more,...H.expert].find(re=>re&&re.id===ne)||null}function T(W){let ne=W.provenance,H=N("span",{class:"num-row k-tnum"});H.dataset.source=_i(ne),H.dataset.verification=`${ne.verification.tag}/${ne.verification.detail}`;let re=W.unit&&typeof W.unit=="object"?W.unit[Fn()]??W.unit.ko:W.unit,le=N("button",{type:"button",class:"num k-tval"},W.text+(re?re==="\xB0"||re==="\xD7"?re:` ${re}`:""));return le.dataset.source=H.dataset.source,le.dataset.verification=H.dataset.verification,le.dataset.id=W.id,le.setAttribute("aria-label",`${n.numberName(W)} ${le.textContent}`),le.addEventListener("click",()=>e.model.openSource(W)),H.append(le,si(ne.verification,s)),H._item=W,Ps(H,W.id,"key"),H}function R(){for(let W of a.rows)Fr(W);a.rows=[]}function y(){let W=cl[a.index],ne=cl.length;o.textContent=xe("tour.step",{i:a.index+1,n:ne}),o.setAttribute("aria-label",xe("tour.step_aria",{i:a.index+1,n:ne})),l.textContent=xe(`tour.${W.id}_title`),R();let H=W.id==="expert"&&r?"tour.expert_text_touch":`tour.${W.id}_text`,re=Object.fromEntries(W.nums.map((me,Ne)=>[`n${Ne}`,`{n${Ne}}`])),le=xe(H,re).split(/(\{n\d\})/);c.replaceChildren(...le.map(me=>{let Ne=/^\{n(\d)\}$/.exec(me);if(!Ne)return document.createTextNode(me);let Le=g(W.nums[+Ne[1]]);if(!Le)throw new Error(`\uB458\uB7EC\uBCF4\uAE30 \uC22B\uC790 \uC5C6\uC74C: ${W.nums[+Ne[1]].join("/")}`);let De=T(Le);return a.rows.push(De),De})),as(),n.decorateTags(p),u.disabled=a.index===0;let ae=a.index===ne-1;f.querySelector(".k-label").textContent=xe(ae?"tour.finish":"tour.next"),d.hidden=!a.paused,p.dataset.station=W.id,p.dataset.paused=a.paused?"1":"0",St(p)}function M(){a.anim&&(cancelAnimationFrame(a.anim.raf),a.anim=null)}function w(W){if(M(),!W.cam)return;let ne=W.cam(e);if(W.fit){let De=RM(e,ne,W.fit,p);De&&(ne.dist=Math.min(e.zoomOutMax(),Math.max(e.zoomFloorKm(),De)))}if(a.fitDist=W.fit?ne.dist:null,EM()){e.setCamera(ne);return}let H=e.state.cam,re=H.az,le=H.el,ae=TM(ne.az-re),me=ne.el-le;e.flyTo(ne.target,ne.dist,$g);let Ne=performance.now(),Le=()=>{if(!a.anim)return;let De=Math.min(1,(performance.now()-Ne)/($g*1e3)),j=De<.5?4*De**3:1-(-2*De+2)**3/2;H.az=re+ae*j,H.el=le+me*j,De<1?a.anim.raf=requestAnimationFrame(Le):a.anim=null};a.anim={raf:requestAnimationFrame(Le)}}function P(W){a.hl&&(a.hl.classList.remove("k-tourhl"),a.hl=null);let ne=W&&document.getElementById(W);ne&&(ne.classList.add("k-tourhl"),a.hl=ne)}function v(W){a.index=Math.max(0,Math.min(cl.length-1,W)),a.paused=!1;let ne=cl[a.index];t.setTemp(ne.layers,"tour"),y(),w(ne),P(ne.highlight)}function A(W=0){a.active||(a.active=!0,p.hidden=!1,document.body.classList.add("touring"),n.onStart&&n.onStart()),v(W),f.focus({preventScroll:!0})}function U(){a.active&&(a.active=!1,a.paused=!1,M(),P(null),R(),t.clearTemp("tour"),p.hidden=!0,document.body.classList.remove("touring"),delete p.dataset.station,n.onEnd&&n.onEnd())}function I(){a.index>=cl.length-1?U():v(a.index+1)}function L(){a.index>0&&v(a.index-1)}function F(){v(a.index),f.focus({preventScroll:!0})}function D(){!a.active||a.paused||(a.paused=!0,M(),d.hidden=!1,p.dataset.paused="1")}f.addEventListener("click",I),u.addEventListener("click",L),m.addEventListener("click",U),h.addEventListener("click",F);let X=W=>{if(!a.active||!W.isTrusted)return;let ne=W.target;ne&&(ne.id==="scene"||ne.closest&&ne.closest("#labels"))&&D()};for(let W of["pointerdown","wheel","touchstart"])window.addEventListener(W,X,{capture:!0,passive:!0});function ie(W){if(!a.active||W.ctrlKey||W.metaKey||W.altKey)return!1;if(W.key==="Escape")return e.state.fly&&e.setCamera({dist:e.state.fly.d0}),U(),!0;let ne=W.target,H=ne&&ne.tagName||"";return H==="INPUT"||H==="SELECT"||H==="TEXTAREA"||ne&&ne.closest&&ne.closest("[role=tablist], [role=slider], [role=radiogroup]")?!1:W.key==="ArrowRight"?(I(),!0):W.key==="ArrowLeft"?(L(),!0):!1}return{el:p,start:A,end:U,next:I,prev:L,resume:F,pause:D,handleKey:ie,render:y,get active(){return a.active},get paused(){return a.paused},get index(){return a.index},get fitDist(){return a.fitDist??null}}}var PM=6,df=.6,LM=.6;function Jg(n,e){let t=Math.max(240,Math.round(n-e-112));return{half:Math.min(t,Math.round(n*.52)),full:t}}function hf(n,{onClose:e,heights:t}){let i=N("span",{class:"k-grabbar","aria-hidden":"true"}),s=N("button",{type:"button",class:"k-grab","aria-expanded":"false","data-meta":""},i),r="half",a=null,o=!1;function l(){let h=r==="full"?"sheet.collapse":"sheet.expand";s.setAttribute("aria-label",xe(h)),s.title=xe(h),s.dataset.i18nAria=h,s.dataset.i18nTitle=h}function c(h){r=h==="full"?"full":"half",n.dataset.sheet=r,s.setAttribute("aria-expanded",String(r==="full")),l()}s.addEventListener("pointerdown",h=>{if(!(h.button>0)){a={y0:h.clientY,t0:performance.now(),h0:n.getBoundingClientRect().height},o=!1;try{s.setPointerCapture(h.pointerId)}catch{}}}),s.addEventListener("pointermove",h=>{if(!a)return;let u=h.clientY-a.y0;!o&&Math.abs(u)>PM&&(o=!0,n.classList.add("k-dragging")),o&&(n.style.height=`${Math.max(0,Math.min(t().full,a.h0-u))}px`)});function d(h,u){if(!a)return;let f=h.clientY-a.y0,m=f/Math.max(1,performance.now()-a.t0),x=a.h0-f;if(a=null,n.classList.remove("k-dragging"),n.style.height="",!o||u)return;let{half:p,full:g}=t();x<p*LM||m>df&&r==="half"?(c("half"),e()):m>df?c("half"):m<-df?c("full"):c(Math.abs(x-g)<Math.abs(x-p)?"full":"half")}return s.addEventListener("pointerup",h=>d(h,!1)),s.addEventListener("pointercancel",h=>d(h,!0)),s.addEventListener("click",h=>{if(o){o=!1,h.preventDefault();return}c(r==="full"?"half":"full")}),c("half"),{grab:s,set:c,reset:()=>c("half"),relabel:l,get state(){return r}}}var IM=4e3,Kg={impl:"t_impl",external:"t_ext",physical:"t_phys",approx:"t_approx"},Zg=[1,10,30],NM=()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch{return!1}},mf=n=>({get(){try{return localStorage.getItem(n)}catch{return null}},set(e){try{localStorage.setItem(n,e)}catch{}}}),Qg=mf("lagrange.mode"),ff=mf("lagrange.hint"),e0=mf("lagrange.hint_expert"),pf=[{g:"tour",rows:[{id:"tgt-tour",icon:"tour",key:"tgt.tour",tour:!0}]},{g:"views",rows:[{id:"view-all",icon:"view",key:"l2.view_solar",view:"all",info:"v_all"},{id:"view-emb",icon:"view",key:"l2.view_emb",view:"emb",info:"v_emb"},{id:"view-l2zoom",icon:"view",key:"l2.view_l2zoom",view:"l2zoom",info:"v_l2zoom"}]},{g:"points",rows:["L1","L2","L3","L4","L5"].map(n=>({id:"tgt-"+n,icon:"point",pick:n}))},{g:"orbits",rows:[{id:"tgt-halo_main",icon:"orbit",pick:"halo_main"},{id:"view-jwst",icon:"craft",pick:"JWST",view:"jwst"},{id:"tgt-jwst_period",icon:"craft",pick:"jwst_period"}]},{g:"bodies",rows:["Sun","Earth","Moon","EMB","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune"].map(n=>({id:"tgt-"+n,icon:n==="Sun"?"sun":"planet",pick:n,only:n==="EMB"?"expert":void 0}))},{g:"tools",rows:[{id:"view-lab",icon:"lab",key:"l2.view_lab",tool:"lab",only:"expert"},{id:"all-numbers",icon:"info",key:"ui.numbers",tool:"all",only:"expert"}]}],t0={L1:"point",L2:"point",L3:"point",L4:"point",L5:"point",halo_main:"orbit",JWST:"craft",jwst_period:"period",Sun:"star",Earth:"planet",Moon:"moon",EMB:"bary",Mercury:"system",Venus:"system",Mars:"system",Jupiter:"system",Saturn:"system",Uranus:"system",Neptune:"system"};function n0(n,e){return e==="general"&&ho("numg."+n.id)?xe("numg."+n.id):Rt(n.label)}function i0(n,e,t,i,s){let r=document.body,a=t.model.table,o=e.utcTable,l=E=>s.setLabelNumbers(E);s.labelNumbersDefault=n.label.numbers,r.dataset.mode="general",i&&r.classList.add("k-touch");let c={layout:n.layout},d=!1,h=[],u=E=>(E.dataset.shell="",h.push(E),E),f=(E,$)=>{NM()?t.setCamera({target:E,dist:$}):t.flyTo(E,$)},m=E=>Cn(E),x=(E,$,pe,Fe)=>{let rt=Ii("icon",{label:xe($),iconName:pe});return rt.id=E,rt.dataset.i18nAria=$,Fe?rt.dataset.i18nTitle=Fe:rt.dataset.i18nTitle=$,rt};document.getElementById("panel").hidden=!0;let p=document.getElementById("credits");p&&p.remove(),r.append(s.elements.scalebar,s.elements.help),document.getElementById("source").dataset.obstacle="";let g=document.getElementById("source");r.append(lf("top"),lf("bottom"));let T=null,R=null,y={};function M(E,$){let pe=N("div",{id:E,class:"k-pop",role:"dialog","aria-label":$?xe($):"","data-obstacle":"",hidden:!0});return $&&(pe.dataset.i18nAria=$),u(pe),r.append(pe),y[E]=pe,pe}function w(E,$,pe){E.style.left=E.style.right=E.style.top=E.style.bottom="";let Fe=innerWidth,rt=innerHeight,Tt=i?8:12,kt=Math.min(E.offsetWidth||300,Fe-2*Tt),$t=$.closest&&$.closest("#info .num-row");if($t){E.classList.add("k-pop-inline");let mn=$t;if($t.parentElement&&$t.parentElement.classList.contains("k-key")){let yl=$t.offsetTop;for(let mi=$t.nextElementSibling;mi;mi=mi.nextElementSibling)if(mi!==E){if(mi.offsetTop!==yl)break;mn=mi}}mn.after(E),E.scrollIntoView({block:"nearest"});return}E.classList.remove("k-pop-inline"),E.parentNode!==r&&r.append(E);let un=$.getBoundingClientRect(),kn=pe==="right"?un.right-kt:un.left+un.width/2-kt/2;kn=Math.max(Tt,Math.min(Fe-Tt-kt,kn)),E.style.left=`${Math.round(kn)}px`,un.top>rt/2?E.style.bottom=`${Math.round(rt-un.top+8)}px`:E.style.top=`${Math.round(un.bottom+8)}px`}function P(E,$,pe){T&&T!==E&&v(!1),T=E,R=$||null,E.hidden=!1,St(E),$&&($.setAttribute("aria-expanded","true"),w(E,$,pe)),Fi()}function v(E=!0){T&&(T.hidden=!0,R&&(R.setAttribute("aria-expanded","false"),E&&R.focus({preventScroll:!0})),T=null,R=null,ns())}let A=(E,$,pe)=>T===E?v():P(E,$,pe);c.closePop=v;let U=Cn("mark");U.setAttribute("role","img"),U.removeAttribute("aria-hidden"),U.classList.add("k-mark"),U.insertAdjacentHTML("afterbegin","<title></title>");let I=U.firstChild,L=N("span",{id:"focus",class:"k-tname","data-meta":""}),F=N("small",{class:"k-tkind","data-meta":""}),D=N("button",{type:"button",id:"target-btn",class:"k-btn k-target","aria-haspopup":"dialog","aria-expanded":"false","aria-controls":"targets","data-i18n-title":"nav.targets"},L,F,m("chev")),X=N("div",{id:"zoom-norecon",class:"k-znote","data-meta":""}),ie=u(N("nav",{id:"nav",class:"k-nav k-bare","data-obstacle":"","data-i18n-aria":"nav.label"},N("div",{class:"k-navrow"},U,D)));r.append(ie);let W=x("search-btn","tr.search","search","tr.search_title");W.dataset.only="expert";let ne=x("layers-btn","ui.layers","layers");ne.setAttribute("aria-haspopup","dialog"),ne.setAttribute("aria-expanded","false");let H=N("button",{type:"button",id:"mode-general",role:"radio","aria-checked":"true",i18n:"mode.general","data-meta":""}),re=N("button",{type:"button",id:"mode-expert",role:"radio","aria-checked":"false",i18n:"mode.expert","data-meta":""}),le=N("div",{class:"k-seg k-modesel",role:"radiogroup","data-i18n-aria":"mode.label"},H,N("span",{class:"k-dot","aria-hidden":"true"}),re),ae=x("settings-btn","tr.settings","gear");ae.setAttribute("aria-haspopup","dialog"),ae.setAttribute("aria-expanded","false");let me=x("export-btn","export.button","share");me.dataset.only="expert",me.setAttribute("aria-haspopup","dialog"),me.setAttribute("aria-expanded","false");let Ne=u(N("div",{id:"tr",class:"k-tr k-bare",role:"toolbar","data-obstacle":"","data-i18n-aria":"tr.label"},me,W,ne,le,ae));r.append(Ne);let Le=M("pop-layers","ui.layers");Le.classList.add("k-pop-wide");let De=Ii("toggle",{label:"",pressed:t.trueSize});De.id="true-size",De.querySelector(".k-ind").after(N("span",{i18n:"view.true_size"})),De.dataset.i18nTitle="view.true_size_title",De.addEventListener("click",()=>{t.setTrueSize(De.getAttribute("aria-pressed")==="true")});let j=N("button",{type:"button",id:"layers-mode-default",class:"k-btn k-secondary",i18n:"layer.mode_default"});j.addEventListener("click",()=>s.setPreset(ue==="expert"?"research":"clean")),Le.append(N("div",{class:"k-popsect","data-meta":""},N("h4",{i18n:"layer.view_options"}),De,j),s.panel()),ne.addEventListener("click",()=>A(Le,ne,"right"));let Q=M("pop-settings","tr.settings"),ye=document.getElementById("lang");ye.classList.add("k-btn","k-secondary");let Se=N("button",{type:"button",id:"settings-help",class:"k-btn k-secondary",i18n:"help.button"});Se.addEventListener("click",()=>{v(!1),s.elements.help.hidden=!1,St(s.elements.help)});let ve=document.getElementById("version");Q.append(N("div",{class:"k-popsect","data-meta":""},N("h4",{i18n:"settings.lang"}),ye),N("div",{class:"k-popsect"},N("h4",{"data-meta":"",i18n:"settings.legend"}),e.legend),N("div",{class:"k-popsect","data-meta":""},N("h4",{i18n:"settings.keys"}),Se),N("div",{class:"k-popsect","data-meta":""},N("h4",{i18n:"settings.about"}),N("p",{class:"k-sub",i18n:"app.subtitle"}),ve)),ae.addEventListener("click",()=>A(Q,ae,"right"));let je=M("pop-export","export.title");je.classList.add("k-pop-wide");let Ke=()=>{let E=new Set,$=[];for(let pe of e.rows){let Fe=pe._item;Fe&&Fe.id&&!E.has(Fe.id)&&(E.add(Fe.id),$.push(Fe))}return $},ke=N("button",{type:"button",id:"export-csv",class:"k-btn k-secondary",i18n:"export.csv"}),Xe=N("button",{type:"button",id:"export-json",class:"k-btn k-secondary",i18n:"export.json"});ke.addEventListener("click",()=>ed(Ke(),"csv","all")),Xe.addEventListener("click",()=>ed(Ke(),"json","all"));let ot=N("input",{type:"text",id:"share-url",class:"k-search k-shareurl",readOnly:!0,spellcheck:!1,"data-i18n-aria":"export.share"}),it=N("button",{type:"button",id:"share-copy",class:"k-btn k-secondary",i18n:"export.copy"}),qe=N("span",{class:"k-cap",id:"share-msg","aria-live":"polite","data-meta":""});it.addEventListener("click",async()=>{ot.value=xl();try{await navigator.clipboard.writeText(ot.value),qe.textContent=xe("export.copied")}catch{ot.select(),qe.textContent=xe("export.copy_fail")}}),je.append(N("div",{class:"k-popsect","data-meta":""},N("h4",{i18n:"export.title"}),N("p",{class:"k-sub",i18n:"export.note"})),N("div",{class:"k-acts"},ke,Xe),N("div",{class:"k-popsect","data-meta":""},N("h4",{i18n:"export.share"}),N("p",{class:"k-sub",i18n:"export.share_note"})),ot,N("div",{class:"k-acts"},it,qe)),me.addEventListener("click",()=>{ot.value=xl(),qe.textContent="",A(je,me,"right")}),c.openExport=()=>me.click();let ue="general",Re=[];function We(E,$=!0){ue=E==="expert"?"expert":"general",r.dataset.mode=ue,H.setAttribute("aria-checked",String(ue==="general")),re.setAttribute("aria-checked",String(ue==="expert")),$&&Qg.set(ue),Ld(ue==="general");for(let pe of Re)pe(ue)}H.addEventListener("click",()=>We("general")),re.addEventListener("click",()=>We("expert")),s.setModeKeys(E=>We(E)),c.setMode=We,Object.defineProperty(c,"mode",{get:()=>ue});let Be=u(of("left",{label:xe("nav.targets_panel")}));Be.id="targets",Be.dataset.i18nAria="nav.targets_panel",Be.dataset.obstacle="";let G=N("input",{type:"search",id:"target-search",class:"k-search",autocomplete:"off",spellcheck:!1}),de=N("label",{class:"k-searchwrap"},m("search"),G,N("kbd",{"aria-hidden":"true","data-meta":""},"/")),Ae=x("targets-close","nav.targets_close","close");Ae.classList.add("k-close");let b=N("div",{class:"k-vbody k-list"});Be.append(N("div",{class:"k-lhead"},de,Ae),b),r.append(Be);let _=hf(Be,{onClose:()=>fe(!1),heights:()=>Na});Be.prepend(_.grab);let O=[],z=E=>ue==="general"&&ho("tgtg."+E)?xe("tgtg."+E):null,se=E=>z(E.pick||E.id)||(E.key?xe(E.key):e.nameOf(E.pick));for(let E of pf){let $=N("section",{class:"k-group","data-group":E.g});$.append(N("h3",{"data-meta":"",i18n:"tgt.g_"+E.g}));for(let pe of E.rows){let Fe=N("span",{class:"k-rname","data-meta":""}),rt=N("button",{type:"button",id:pe.id,class:"k-row"},m(pe.icon),Fe);pe.only&&(rt.dataset.only=pe.only),pe.soon&&(rt.disabled=!0,rt.dataset.i18nTitle=pe.soon,rt.setAttribute("aria-disabled","true")),rt._r=pe,rt._name=Fe,rt.addEventListener("click",()=>bs(pe,rt)),O.push(rt),$.append(rt)}b.append($)}function _e(){for(let E of O)E._name.textContent=se(E._r);be()}function be(){let E=G.value.trim().toLowerCase();for(let $ of O){let pe=$._r,Fe=[se(pe),pe.pick||"",pe.view||"",pe.id].join(" ").toLowerCase();$.hidden=!!E&&!Fe.includes(E)}for(let $ of b.children)$.hidden=![...$.querySelectorAll(".k-row")].some(pe=>!pe.hidden)}G.addEventListener("input",be),G.addEventListener("keydown",E=>{if(E.key==="Enter"){let $=O.find(pe=>!pe.hidden&&!pe.disabled&&getComputedStyle(pe).display!=="none");$&&$.click()}});let ce=!1;function fe(E,{focusSearch:$=!1,refocus:pe=!0}={}){E&&!ce&&(_.reset(),Lf()&&he&&an(!1)),ce=!!E,Be.setOpen(ce),r.classList.toggle("list-open",ce),_l(),D.setAttribute("aria-expanded",String(ce)),ce?(Fi(),$&&setTimeout(()=>G.focus(),0)):pe&&D.focus({preventScroll:!0}),ns()}D.addEventListener("click",()=>fe(!ce)),Ae.addEventListener("click",()=>fe(!1)),W.addEventListener("click",()=>fe(!0,{focusSearch:!0})),c.setList=fe;let Ce=null,$e=null,Ue=null;function Oe(E){if(!E)return{name:"",kind:""};if(E.startsWith("view:")){let $=pf.flatMap(pe=>pe.rows).find(pe=>pe.view===E.slice(5)&&!pe.pick);return{name:$?se($):"",kind:xe("kind.view")}}return E==="__all"?{name:xe("ui.numbers"),kind:xe("kind.numbers")}:{name:z(E)||e.nameOf(E),kind:t0[E]?xe("kind."+t0[E]):""}}function Qe(){if(X.remove(),Ce&&Ce.startsWith("zoom:")){let E=Ce.slice(5);L.textContent=xe("jwst.zoom_focus_"+E),F.textContent=xe("kind.zoom"),E!=="R5"&&(X.textContent=xe("jwst.zoom_norecon"),ie.append(X))}else{let E=Oe(Ce);L.textContent=E.name,F.textContent=E.kind}L.dataset.name=Ce||"",d&&gl();for(let E of O){let $=E._r;!!Ce&&($.pick&&$.pick===Ce||!$.pick&&$.view&&Ce==="view:"+$.view)?E.setAttribute("aria-current","true"):E.removeAttribute("aria-current")}}function et(E){Ce=E,E&&!E.startsWith("zoom:")&&(Ue=E),Qe()}let st=u(of("right",{label:xe("info.label")}));st.id="info",st.dataset.i18nAria="info.label",st.dataset.obstacle="",r.append(st);let Y=hf(st,{onClose:()=>an(),heights:()=>Na}),we=null,he=!1,Ee=null,Ie=[],ge=!1,Ye=e0.get()==="1",Ve=()=>{for(let E of Ie)Fr(E);Ie=[]},ft="summary";function gt(E){let $=E._render;return E._render=()=>{$(),ue==="general"&&E._item&&ho("numg."+E._item.id)&&(E.querySelector(".num-label").textContent=xe("numg."+E._item.id))},E._render(),E}function wt(E){let $=E.provenance,pe=N("div",{class:"k-srcrow"});pe.dataset.source=_i($),pe.dataset.verification=`${$.verification.tag}/${$.verification.detail}`,pe._item=E;let Fe=N("p",{class:"k-srcpath"});for(let kt of $.source)Fe.append(N("code",{"data-literal":""},`${kt.file} \u203A ${kt.key}`),document.createTextNode(" "));let rt=[$.computed_by,$.ref_commit&&`commit ${$.ref_commit}`,$.source_hash&&`sha256 ${$.source_hash.slice(0,12)}\u2026`].filter(Boolean).join(" \xB7 "),Tt=N("button",{type:"button",class:"k-btn k-small k-srcopen",i18n:"info.src_open"});return Tt.addEventListener("click",()=>t.model.openSource(E)),pe.append(N("div",{class:"k-labrow"},N("span",{class:"k-lab","data-literal":""},Rt(E.label)),si($.verification,a)),Fe,N("p",{class:"k-srcmeta","data-literal":""},rt),Tt),pe}function Gt(E){let $=N("div",{class:"num-row k-keycell"});$.dataset.source=_i(E.provenance),$.dataset.verification=`${E.provenance.verification.tag}/${E.provenance.verification.detail}`;let pe=N("span",{class:"num-label k-lab"}),Fe=si(E.provenance.verification,a),rt=N("button",{type:"button",class:"num k-val"});return rt.dataset.source=$.dataset.source,rt.dataset.verification=$.dataset.verification,rt.dataset.id=E.id,rt.addEventListener("click",()=>t.model.openSource(E)),$._render=()=>{let Tt=E.unit&&typeof E.unit=="object"?E.unit[Fn()]??E.unit.ko:E.unit;pe.textContent=n0(E,ue),rt.replaceChildren(document.createTextNode(E.text+(Tt?" ":"")),...Tt?[N("small",{},Tt)]:[]),rt.classList.toggle("k-long",E.text.length>=9),Fe._render()},$._render(),$._item=E,$.append(N("div",{class:"k-labrow"},pe,Fe),rt),Ps($,E.id,"key"),$}function Zt(E,$={}){T&&st.contains(T)&&v(!1);let pe=he;we=E,Ve();let Fe=E.startsWith("view:"),rt=E==="__all",Tt=Fe?pf.flatMap(Pn=>Pn.rows).find(Pn=>Pn.view===E.slice(5)&&!Pn.pick):null,kt=Oe(E),$t=x("info-close","info.close","close");$t.classList.add("k-close"),$t.addEventListener("click",()=>an());let un=Fe||rt||!e.NAME[E]||!!z(E),kn=N("div",{class:"k-vhead"},N("h3",un?{class:"k-name","data-meta":""}:{class:"k-name",i18n:e.NAME[E]},kt.name),N("span",{class:"k-kind","data-meta":""},kt.kind),$t),mn=N("div",{class:"k-vbody"}),yl=Fe?"desc."+Tt.info:"desc."+E;rt||mn.append(N("p",{class:"desc k-desc","data-meta":"",i18n:yl},xe(yl))),!Fe&&!rt&&e.hasSphere(E)&&mn.append(N("p",{class:"note k-note","data-meta":""},Xn(),N("span",{i18n:"card.sphere_note"},xe("card.sphere_note"))));let mi=!1;if(rt)mn.append(e.nums),mi=!0;else if(!Fe){let Pn=e.sections(E);if(Pn.key.length){let en=N("div",{class:"k-key"+(Pn.key.length>2?" k-key-many":"")});for(let ti of Pn.key){let jn=Gt(ti);Ie.push(jn),en.append(jn)}mn.append(N("div",{class:"k-sect"},en)),mi=!0}if(E==="JWST"){let en=N("div",{class:"k-sect k-acts","data-meta":""},N("h4",{i18n:"jwst.zoom_title"}));if(t.zoomStops)for(let[jn,Ks]of[["R5","jwst.zoom_r5"],["A",null],["B",null],["C",null]]){if(!t.zoomStops[jn])continue;let Zs=N("button",{type:"button",id:"zoom-"+jn,class:"k-btn k-secondary zoom-btn"});Ks?Zs.dataset.i18n=Ks:Zs.textContent=xe("jwst.zoom_window",{w:jn}),Zs.addEventListener("click",()=>c.zoom(jn)),en.append(Zs)}let ti=N("button",{type:"button",id:"open-period",class:"k-btn k-secondary",i18n:"jwst.period_button"});ti.addEventListener("click",()=>c.pick("jwst_period")),en.append(ti),mn.append(en)}let gi=[...Pn.more,...ue==="expert"?Pn.expert:[]],ei=[];if(E==="JWST"&&ue==="expert"){let en=e.jwstBody(Ie,()=>c.pick("jwst_period")),ti=en.querySelector("#open-period");ti&&ti.remove(),ei.push(en)}if(E==="jwst_period"&&ue==="expert"&&ei.push(e.periodBody(Ie)),gi.length||ei.length){let en=N("details",{class:"k-more",id:"info-more"},N("summary",{"data-meta":"",i18n:"info.more"}));en.open=ue==="expert"||!!$.moreOpen;for(let ti of gi){let jn=gt(yi(ti,a,t.model.openSource));Ie.push(jn),en.append(jn)}en.append(...ei),mn.append(en),mi=!0}!Pn.key.length&&!gi.length&&!ei.length&&!Pn.expert.length&&E!=="JWST"&&mn.append(N("p",{class:"note k-note",i18n:"card.no_numbers"},xe("card.no_numbers")))}ue==="general"&&!rt&&(ge||!Ye)&&(ge||(ge=!0,e0.set("1")),mn.append(N("p",{class:"k-cap",id:"info-expert-hint","data-meta":"",i18n:"info.expert_hint"})));let nd=N("button",{type:"button",id:"info-focus",class:"k-btn k-secondary","data-only":"expert",i18n:"info.focus_only"}),Da=Ii("primary",{label:xe("info.fly")});Da.id="info-fly",Da.querySelector(".k-label").dataset.i18n="info.fly";let Rr=Sr[E];nd.hidden=!Rr,nd.addEventListener("click",()=>{f(Rr[0],t.state.cam.dist)}),Da.addEventListener("click",()=>{Tt?Hn(Tt.view):Rr&&f(Rr[0],Rr[1])}),Da.disabled=!Tt&&!Rr;let O0=N("div",{class:"k-vfoot"},N("div",{class:"k-left-acts"},nd),Da),Of=mn;if(ue==="expert"&&!Fe&&!rt){let Pn=new Set,gi=[];for(let Ut of Ie){let Ln=Ut._item;Ln&&Ln.id&&!Pn.has(Ln.id)&&(Pn.add(Ln.id),gi.push(Ln))}let ei=N("div",{class:"k-vbody k-pane",id:"info-pane-all",role:"tabpanel"}),en=N("div",{class:"k-vbody k-pane",id:"info-pane-source",role:"tabpanel"}),ti={all(){for(let Ut of gi){let Ln=yi(Ut,a,t.model.openSource);Ie.push(Ln),ei.append(Ln)}gi.length||ei.append(N("p",{class:"note k-note",i18n:"info.src_none"},xe("info.src_none"))),as(),gi.length&&!ei.querySelector(".num-row")&&ei.append(N("p",{class:"note k-note",i18n:"card.numbers_off"},xe("card.numbers_off")))},source(){for(let Ut of gi)en.append(wt(Ut));if(!gi.length)en.append(N("p",{class:"note k-note",i18n:"info.src_none"},xe("info.src_none")));else{let Ut=N("button",{type:"button",id:"info-export",class:"k-btn k-secondary",i18n:"info.export_this"});Ut.addEventListener("click",()=>ed(gi,"json",E)),en.append(N("div",{class:"k-popfoot"},Ut))}}},jn=new Set;mn.id="info-pane-summary",mn.setAttribute("role","tabpanel"),mn.classList.add("k-pane");let Ks={summary:mn,all:ei,source:en},Zs=N("div",{class:"k-tabs",role:"tablist","data-i18n-aria":"info.tabs"}),vl={},id=(Ut,Ln)=>{ft=Ut,ti[Ut]&&!jn.has(Ut)&&(jn.add(Ut),ti[Ut](),St(Ks[Ut]),fl(Ks[Ut]));for(let[Bi,bl]of Object.entries(Ks))bl.hidden=Bi!==Ut,vl[Bi].setAttribute("aria-selected",String(Bi===Ut)),vl[Bi].tabIndex=Bi===Ut?0:-1;Ln&&vl[Ut].focus()};for(let Ut of["summary","all","source"]){let Ln=N("button",{type:"button",role:"tab",id:"info-tab-"+Ut,class:"k-tab","aria-controls":"info-pane-"+Ut,i18n:"info.tab_"+Ut,"data-meta":""});Ln.addEventListener("click",()=>id(Ut)),Ln.addEventListener("keydown",Bi=>{let bl=["summary","all","source"],F0=bl.indexOf(Ut);(Bi.key==="ArrowRight"||Bi.key==="ArrowLeft")&&(Bi.preventDefault(),id(bl[(F0+(Bi.key==="ArrowRight"?1:2))%3],!0))}),vl[Ut]=Ln,Zs.append(Ln)}Of=N("div",{class:"k-tabwrap"},Zs,mn,ei,en),id(Ks[ft]?ft:"summary")}st.replaceChildren(Y.grab,N("div",{class:"card-body k-card"},kn,Of,O0)),pe||(Y.reset(),Lf()&&ce&&fe(!1,{refocus:!1})),St(st),as(),mi&&!st.querySelector(".num-row")&&mn.append(N("p",{class:"note k-note",id:"card-numbers-off",i18n:"card.numbers_off"},xe("card.numbers_off"))),fl(st),(!pe||$.opener)&&(Ee=$.opener||(document.activeElement&&document.activeElement!==r?document.activeElement:null)),he=!0,st.setOpen(!0),r.classList.add("info-open"),_l(),Fi()}function an(E=!0){he&&(he=!1,ge&&(ge=!1,Ye=!0),st.setOpen(!1),r.classList.remove("info-open"),_l(),Ve(),E&&Ee&&document.contains(Ee)&&Ee.offsetParent!==null?Ee.focus({preventScroll:!0}):st.contains(document.activeElement)&&document.activeElement.blur(),Ee=null,ns())}c.closeInfo=an,c.showInfo=Zt,s.onChange(()=>{he&&Zt(we,{moreOpen:!!(st.querySelector("#info-more")||{}).open})}),Re.push(()=>{he&&Zt(we)});let qt=0;function Hn(E){t.setCamera({...Un[E],...E==="solar"?{dist:Math.max(Un.solar.dist,t.orbitFitDist(1.2))}:{}})}c.view=E=>Hn(E);function bs(E,$){if(!E.soon){if(E.tour){ki.start(0);return}if(E.tool==="lab"){c.lab&&c.lab.button.click(),i&&fe(!1,{refocus:!1});return}if(E.tool==="all"){et("__all"),Zt("__all",{opener:$}),i&&fe(!1,{refocus:!1});return}if(E.view&&Hn(E.view),E.pick){if(!E.view){let pe=Sr[E.pick];pe&&f(pe[0],pe[1])}et(E.pick),Zt(E.pick,{opener:$})}else et("view:"+E.view),Zt("view:"+E.view,{opener:$});i&&fe(!1,{refocus:!1})}}c.pick=E=>{qt=performance.now(),Fi();let $=Sr[E];$&&f($[0],$[1]),et(E),Zt(E)},c.zoom=E=>{let $=t.zoomStops&&t.zoomStops[E];$&&(s.setTemp([$.layer,"n_jwst","n_tags","labels"]),t.setCamera({...$.cam}),et("zoom:"+E))},t.onZoomChange&&t.onZoomChange(E=>{E||(s.clearTemp(),(Ce||"").startsWith("zoom:")&&et(Ue))}),c.renameFocus=()=>Qe();function es(){let E=t.state.fly;return E?(t.setCamera({dist:E.d0}),!0):!1}let on=Ii("icon",{label:xe("l2.play"),iconName:"play"});on.id="play";let Bt=10,Qn=()=>{let E=!!t.anim.speedDaysPerSec,$=E?"l2.pause":"l2.play";on.setAttribute("aria-label",xe($)),on.title=`${xe($)}`,on.dataset.state=E?"playing":"paused";let pe=E?"pause":"play";on.dataset.icon!==pe&&(on.replaceChildren(Cn(pe)),on.dataset.icon=pe)};on.addEventListener("click",()=>{t.anim.speedDaysPerSec=t.anim.speedDaysPerSec?0:Bt,Qn(),ns()}),on.classList.add("k-play"),Qn();let Gn=N("button",{type:"button",id:"speed-btn",class:"k-btn k-small k-speed","aria-haspopup":"menu","aria-expanded":"false","data-meta":""}),Ss=M("pop-speed","time.speed_menu");Ss.setAttribute("role","menu");let ts=Zg.map(E=>{let $=N("button",{type:"button",role:"menuitemradio",class:"k-menuitem","data-speed":String(E),"aria-checked":String(E===Bt),"data-meta":""});return $.addEventListener("click",()=>{Bt=E,t.anim.speedDaysPerSec&&(t.anim.speedDaysPerSec=E),Ms(),v()}),$});Ss.append(...ts);let Ms=()=>{Gn.textContent=xe("l2.speed",{n:Bt}),Gn.title=xe("time.speed_title");for(let E of ts)E.textContent=xe("l2.speed",{n:E.dataset.speed}),E.setAttribute("aria-checked",String(Number(E.dataset.speed)===Bt));for(let E of Rn)E.setAttribute("aria-checked",String(Number(E.dataset.speed)===Bt)),E.setAttribute("aria-label",xe("l2.speed",{n:E.dataset.speed}))};Gn.addEventListener("click",()=>A(Ss,Gn)),Gn.dataset.only="general";let Rn=Zg.map(E=>{let $=N("button",{type:"button",role:"radio",class:"k-segbtn","data-speed":String(E),"aria-checked":String(E===Bt),"data-meta":""},String(E));return $.addEventListener("click",()=>{Bt=E,t.anim.speedDaysPerSec&&(t.anim.speedDaysPerSec=E),Ms()}),$}),C=N("span",{class:"k-segunit","data-meta":"",i18n:"time.speed_unit"}),B=N("div",{id:"speed-seg",class:"k-seg k-speedseg",role:"radiogroup","data-only":"expert","data-i18n-aria":"time.speed_group"},...Rn,C),V=t.model.tMin,ee=t.model.tMax,te=N("input",{type:"range",id:"time",class:"k-range",min:String(V),max:String(ee),step:"3600"});te.value=String(t.state.t),te.addEventListener("input",()=>t.setTime(Number(te.value)));let oe=Sn(V,o),He=Sn(ee,o),S=N("div",{class:"k-ticks","aria-hidden":"true","data-meta":""});for(let[E,$]of[[2022,null],[2030,"expert"],[2040,"expert"],[2050,null]]){let pe=Date.UTC(E,0,1)/1e3;if(pe<oe-3*86400||pe>He+3*86400)continue;let Fe=zi(Math.min(Math.max(pe,oe),He),o),rt=N("span",{},String(E));rt.style.left=`${(100*(Fe-V)/(ee-V)).toFixed(2)}%`,$&&(rt.dataset.only=$),S.append(rt)}let k=N("div",{class:"k-slider"},te,S),K={provenance:e.dateItem(t.state.t).provenance},q=N("button",{type:"button",id:"date",class:"k-btn num k-date","aria-haspopup":"dialog","aria-expanded":"false"}),Z=N("span",{class:"k-dmain"}),Te=N("small",{class:"k-dsub"});q.append(Z,Te);let Me=xi(K.provenance.verification,a),Pe=N("div",{class:"date-row k-dateblock"},q,Me);for(let E of[q,Pe])E.dataset.source="time.utc (results/web) | "+_i(K.provenance),E.dataset.verification=`${K.provenance.verification.tag}/${K.provenance.verification.detail}`;Pe._itemFn=()=>e.dateItem(t.state.t);let Ge=E=>String(E).padStart(2,"0"),tt=E=>{let $=new Date(Math.floor(E/60)*6e4);return`${$.getFullYear()}-${Ge($.getMonth()+1)}-${Ge($.getDate())} ${Ge($.getHours())}:${Ge($.getMinutes())}`},ht=E=>{let $=-new Date(Math.floor(E/60)*6e4).getTimezoneOffset(),pe=$>=0?"+":"\u2212",Fe=Math.abs($);return`UTC${pe}${Math.floor(Fe/60)}${Fe%60?":"+Ge(Fe%60):""}`};function mt(){let E=Sn(t.state.t,o),$=Vi(E),pe=tt(E),Fe=ht(E);ue==="expert"?(Z.textContent=`${$} UTC`,Te.textContent=`${xe("time.local")} ${pe.slice(11)} (${Fe})`):(Z.textContent=pe,Te.textContent=Fe),q.setAttribute("aria-label",xe("time.date_aria",{utc:$,local:pe,zone:Fe})),te.setAttribute("aria-valuetext",`${$} UTC`),te.setAttribute("aria-label",xe("time.slider"))}let Ze=N("button",{type:"button",id:"t-now",class:"k-btn k-small k-now",i18n:"time.now","data-meta":""}),bt=()=>Math.floor(Date.now()/6e4)*60,zt=()=>{let E=bt(),$=E>=oe&&E<=He;return Ze.disabled=!$,Ze.title=$?xe("time.now_title"):xe("time.now_out"),$};Ze.addEventListener("click",()=>{zt()&&t.setTime(zi(bt(),o))}),c.nowTdb=()=>zi(bt(),o),setInterval(zt,6e4);let It=u(N("div",{id:"timebar",class:"k-timebar k-bare",role:"group","data-obstacle":"","data-i18n-aria":"time.group"},on,Gn,B,k,N("div",{class:"k-dateacts"},Pe,Ze)));r.append(It);let At=t.model.onTimeChange;t.model.onTimeChange=E=>{At&&At(E),te.value=String(E),mt(),!t.anim.speedDaysPerSec&&on.dataset.state==="playing"&&Qn()};let Qt=document.getElementById("ephem-busy");Qt&&new MutationObserver(()=>{let E=!Qt.hidden;q.classList.toggle("is-busy",E),q.setAttribute("aria-busy",String(E))}).observe(Qt,{attributes:!0,attributeFilter:["hidden"]});let Je=M("pop-date","time.date_pop"),ln=new Date(Math.ceil(oe/86400)*864e5).toISOString().slice(0,10),xt=new Date(Math.floor(He/86400)*864e5).toISOString().slice(0,10),cn=N("input",{type:"date",id:"date-jump",class:"k-dateinput",min:ln,max:xt,"data-i18n-aria":"time.date_input"});cn.dataset.range=`${ln} ~ ${xt}`;let pn=Ii("primary",{label:xe("time.go")});pn.id="date-go",pn.querySelector(".k-label").dataset.i18n="time.go",pn.disabled=!0;let hi=N("p",{id:"date-range-note",class:"k-warn",hidden:!0,i18n:"time.out_of_range","data-meta":""}),Ni=()=>{let E=cn.value,$=!!E&&E>=ln&&E<=xt;return pn.disabled=!$,hi.hidden=!E||$,$};cn.addEventListener("input",Ni),cn.addEventListener("keydown",E=>{E.key==="Enter"&&Ni()&&pn.click()}),pn.addEventListener("click",()=>{Ni()&&t.setTime(zi(Date.parse(cn.value+"T00:00:00Z")/1e3,o))});let Et=N("button",{type:"button",id:"t-start",class:"k-btn k-secondary",i18n:"time.start"});Et.addEventListener("click",()=>t.setTime(V)),Je.append(N("div",{class:"k-popsect","data-meta":""},N("h4",{i18n:"time.date_pop"}),N("p",{class:"k-sub",i18n:"time.date_utc_note"})),N("div",{class:"k-daterow"},cn,pn),hi,N("div",{class:"k-popfoot"},Et)),q.addEventListener("click",()=>A(Je,q));let Vt=N("span",{class:"tag-approx k-adot","aria-hidden":"true"},Cn("t_approx")),fi=N("span",{"data-meta":""}),Ct=N("button",{type:"button",id:"credits",class:"k-btn k-small credits","data-obstacle":""},fi,Vt),Di=()=>mo(()=>Fl(Xn));Ct.addEventListener("click",Di);let Ui=N("button",{type:"button",id:"frame-rot",role:"radio","aria-checked":"true",i18n:"l2.mode_rot","data-meta":""}),Mr=N("button",{type:"button",id:"frame-in",role:"radio","aria-checked":"false",i18n:"l2.mode_inertial","data-meta":""}),Yu=E=>{t.setMode(E),Ui.setAttribute("aria-checked",String(E==="rot")),Mr.setAttribute("aria-checked",String(E!=="rot"))};Ui.addEventListener("click",()=>Yu("rot")),Mr.addEventListener("click",()=>Yu("inertial"));let T0=N("div",{class:"k-seg k-frame",role:"radiogroup","data-i18n-aria":"l2.mode"},Ui,Mr),bf=N("span",{class:"k-stval num"}),A0=xi(K.provenance.verification,a),hl=N("div",{id:"status-tdb",class:"date-row k-stitem"},N("span",{class:"k-stlab","data-meta":"",i18n:"status.tdb"}),bf,A0);hl.dataset.source="time.utc (results/web) | "+_i(K.provenance),hl.dataset.verification=`${K.provenance.verification.tag}/${K.provenance.verification.detail}`,hl._itemFn=()=>e.dateItem(t.state.t);let Sf=N("span",{class:"k-stval"}),Mf=N("div",{id:"status-focus",class:"k-stitem","data-aux":"tick","data-source":"camera distance to focus (browser drawing state)","data-verification":"display/approx","data-i18n-title":"status.focus_title"},N("span",{class:"k-stlab","data-meta":"",i18n:"status.focus"}),Sf,Xn()),wr=N("div",{id:"status",class:"k-status","data-only":"expert","data-obstacle":"",role:"group","data-i18n-aria":"status.label"},hl,T0,Mf),C0=E=>new Date(Date.UTC(2e3,0,1,12)+Math.floor(E/60)*6e4).toISOString().slice(0,16).replace("T"," "),Ju="";t.onRender.push(E=>{if(ue!=="expert")return;let $=E.state.cam.dist,pe=C0(E.state.t),Fe=`${Math.round($).toLocaleString("en-US")} km`;if(pe+Fe===Ju)return;let rt=(pe+Fe).length!==Ju.length;Ju=pe+Fe,bf.textContent=pe,Sf.textContent=Fe,Mf.dataset.km=String(Math.round($)),rt&&d&&Tr()});let Er=N("button",{type:"button",id:"status-more",class:"k-btn k-small k-stmore","data-only":"expert","aria-haspopup":"dialog","aria-expanded":"false","data-i18n-title":"status.more_title",hidden:!0},N("span",{"data-meta":"",i18n:"status.more"}),m("chev")),Ku=M("pop-status","status.label");Er.addEventListener("click",()=>A(Ku,Er,"right"));let ws=u(N("div",{id:"strip",class:"k-strip k-bare"},Ct,wr,Er));r.append(ws);function Tr(){if(T===Ku)return;wr.parentNode!==ws&&ws.insertBefore(wr,Er),Er.hidden=!0;let E=!1;if(ue==="expert"){let $=Math.max(...[...wr.children].map(pe=>pe.getBoundingClientRect().height),0);E=ws.scrollWidth>ws.clientWidth+1||$>46||wr.getBoundingClientRect().height>46}E&&(Ku.append(wr),Er.hidden=!1),r.classList.toggle("status-folded",E)}ws.addEventListener("transitionend",E=>{E.target===ws&&(E.propertyName==="left"||E.propertyName==="right")&&Tr()}),c.fitStrip=Tr,d=!0;let wf=()=>{fi.textContent=xe(ue==="expert"?"credits.long":"credits.short"),Ct.title=xe("credits.open"),Vt.title=xe("tag.display_approx")},Ar=null,ki=Yg({view:t,layers:s,P:e,table:a,mobile:i,reg:u,decorateTags:fl,numberName:E=>n0(E,ue),onStart(){Ar=document.activeElement&&document.activeElement!==r?document.activeElement:null,v(!1),fe(!1,{refocus:!1}),an(!1),Fi()},onEnd(){Ar&&document.contains(Ar)&&Ar.offsetParent!==null?Ar.focus({preventScroll:!0}):D.focus({preventScroll:!0}),Ar=null,ns()}});c.tour=ki;let pi=null,R0=i||(()=>{try{return matchMedia("(pointer: coarse)").matches&&!matchMedia("(any-pointer: fine)").matches}catch{return!1}})();if(ff.get()!=="1"){let E=N("button",{type:"button",id:"hint-tour",class:"k-btn k-small"},Cn("tour"),N("span",{i18n:"hint.tour"})),$=x("hint-close","hint.close","close");pi=u(N("div",{id:"hint",class:"k-hint k-bare",role:"note","data-obstacle":"","data-only":"general","data-i18n-aria":"hint.label"},N("span",{class:"k-lead","data-meta":"",i18n:"hint.lead"}),N("span",{class:"k-how",id:"hint-how","data-meta":"",i18n:R0?"hint.how_touch":"hint.how"}),E,$)),window.addEventListener("pointerdown",pe=>{let Fe=pi&&pi.querySelector("#hint-how");Fe&&pe.pointerType==="touch"&&Fe.dataset.i18n!=="hint.how_touch"&&(Fe.dataset.i18n="hint.how_touch",St(pi))},{capture:!0,passive:!0}),$.addEventListener("click",()=>{ff.set("1"),pi.remove(),pi=null}),E.addEventListener("click",()=>{ff.set("1"),pi.remove(),pi=null,ki.start(0)}),r.append(pi)}function fl(E){for(let $ of E.querySelectorAll(".tag:not(.tag-approx):not(.tag-open)")){$.querySelector(":scope > .tag-shape")||$.prepend(N("span",{class:"tag-shape","aria-hidden":"true"},Cn(Kg[$.dataset.tag]||"t_impl")));let pe=($.querySelector(".tag-name")||{}).textContent||"",Fe=($.querySelector(".tag-tip")||{}).textContent||"";$.setAttribute("role","button"),$.setAttribute("aria-label",`${$.classList.contains("mini")?Fe:`${pe} \u2014 ${Fe}`} \u2014 ${xe("tag.open_hint")}`)}}let Oi=M("pop-tag","tag.pop_label");Oi.classList.add("k-tpop","num-row");function Ef(E){let $=E.closest(".num-row, .date-row"),pe=$&&($._item||$._itemFn&&$._itemFn()),Fe={tag:E.dataset.tag,detail:E.dataset.detail},rt=pe?pe.provenance.verification:Fe,Tt=si(rt,a);Tt.classList.add("tag-open");let kt=[N("div",{class:"k-tphead"},Tt)];if(ue==="general"&&(Tt.querySelector(".tag-tip").remove(),Tt.prepend(N("span",{class:"tag-shape","aria-hidden":"true"},Cn(Kg[rt.tag]||"t_impl"))),kt.push(N("p",{class:"k-teasy","data-meta":"",i18n:"tag.easy_"+rt.tag},xe("tag.easy_"+rt.tag)))),pe&&ue==="general"){if(Oi.dataset.source=_i(pe.provenance),Oi.dataset.verification=`${pe.provenance.verification.tag}/${pe.provenance.verification.detail}`,$.classList.contains("date-row")){let un=Sn(t.state.t,o);kt.push(N("p",{class:"k-tsrc"},`${Vi(un)} UTC \xB7 ${xe("time.local")} ${tt(un)} (${ht(un)})`))}kt.push(N("p",{class:"k-cap","data-meta":"",i18n:"tag.easy_more"},xe("tag.easy_more")));let $t=N("button",{type:"button",id:"tag-open-source",class:"k-btn k-secondary",i18n:"tag.pop_open"});$t.addEventListener("click",()=>{v(!1),t.model.openSource(pe)}),kt.push(N("div",{class:"k-popfoot"},$t))}else if(pe){Oi.dataset.source=_i(pe.provenance),Oi.dataset.verification=`${pe.provenance.verification.tag}/${pe.provenance.verification.detail}`;let $t=N("p",{class:"k-tsrc"},N("span",{"data-meta":"",i18n:"tag.pop_source"}),document.createTextNode(" "));for(let kn of pe.provenance.source)$t.append(N("code",{"data-literal":""},`${kn.file} \u203A ${kn.key}`),document.createTextNode(" "));if(kt.push($t),$.classList.contains("date-row")){let kn=Sn(t.state.t,o);kt.push(N("p",{class:"k-tsrc"},`${Vi(kn)} UTC \xB7 ${xe("time.local")} ${tt(kn)} (${ht(kn)})`))}let un=N("button",{type:"button",id:"tag-open-source",class:"k-btn k-secondary",i18n:"tag.pop_open"});un.addEventListener("click",()=>{v(!1),t.model.openSource(pe)}),kt.push(N("div",{class:"k-popfoot"},un))}else delete Oi.dataset.source,delete Oi.dataset.verification;Oi.replaceChildren(...kt),P(Oi,E)}let Tf=E=>E&&E.closest&&E.closest("#info, #timebar, #status, #tour")&&E.closest(".tag:not(.tag-approx):not(.tag-open)");document.addEventListener("click",E=>{let $=Tf(E.target);$&&(E.stopPropagation(),Ef($))},!0),document.addEventListener("keydown",E=>{(E.key==="Enter"||E.key===" ")&&Tf(E.target)&&(E.preventDefault(),Ef(E.target.closest(".tag")))});let P0=!!globalThis.__LAGRANGE_IDLE_OFF,Af=null,Zu=()=>r.classList.contains("chrome-hidden"),L0=()=>{let E=document.activeElement;return!!(E&&E!==r&&E.closest&&E.closest("[data-shell], #source, #lab"))},Cf=()=>{let E=document.getElementById("lab");return!!(E&&!E.hidden)},I0=()=>!ki.active&&!t.anim.speedDaysPerSec&&!ce&&!he&&!T&&!L0()&&g.hidden&&s.elements.help.hidden&&!Cf();function ns(){clearTimeout(Af),!P0&&(Af=setTimeout(()=>{Zu()||(I0()?pl():ns())},IM))}function pl(){r.classList.add("chrome-hidden"),l(!1)}function Fi(){Zu()&&(r.classList.remove("chrome-hidden"),l(!0)),ns()}function N0(){v(!1),fe(!1,{refocus:!1}),an(!1),pl()}c.reveal=Fi,c.hide=N0,c.retreat=pl;for(let E of["pointermove","pointerdown","wheel","touchstart"])window.addEventListener(E,()=>Fi(),{passive:!0,capture:!0});let Wn=new Map,is=null,Rf=()=>{let[E,$]=[...Wn.values()];return Math.hypot(E.x-$.x,E.y-$.y)};window.addEventListener("pointerdown",E=>{E.pointerType!=="touch"||E.target!==t.renderer.domElement||(Wn.set(E.pointerId,{x:E.clientX,y:E.clientY}),Wn.size===2&&(is={d0:Math.max(Rf(),1),dist0:t.state.cam.dist}),Wn.size>=2&&E.stopPropagation())},!0),window.addEventListener("pointermove",E=>{if(!Wn.has(E.pointerId)||(Wn.set(E.pointerId,{x:E.clientX,y:E.clientY}),!is)||(E.stopPropagation(),Wn.size<2))return;let $=Math.min(t.zoomOutMax(),Math.max(t.zoomFloorKm(),is.dist0*(is.d0/Math.max(Rf(),1))));t.setCamera({dist:$})},!0);let Pf=E=>{Wn.has(E.pointerId)&&(Wn.delete(E.pointerId),is&&Wn.size>0&&E.stopPropagation(),Wn.size<2&&is&&(Wn.size===0?is=null:is.d0=0))};window.addEventListener("pointerup",Pf,!0),window.addEventListener("pointercancel",Pf,!0),c.pinchState=()=>({touches:Wn.size,pinching:!!is});let ml=null;window.addEventListener("pointerdown",E=>{ml={x:E.clientX,y:E.clientY,t:E.target}},!0),window.addEventListener("click",E=>{if(!E.isTrusted)return;let $=E.target,pe=ml?Math.hypot(E.clientX-ml.x,E.clientY-ml.y):0;T&&!T.contains($)&&!(R&&R.contains($))&&v(!1),!(!($&&($.id==="scene"||$.closest&&$.closest("#labels")))||pe>5)&&(performance.now()-qt<400||(ce&&fe(!1,{refocus:!1}),he&&an(!1)))}),window.addEventListener("keydown",E=>{if(ki.active&&!T&&g.hidden&&s.elements.help.hidden&&ki.handleKey(E)){E.stopPropagation(),E.preventDefault(),Fi();return}if(E.key==="Escape"){let pe=!0;es()||(T?v():g.hidden?s.elements.help.hidden?Cf()&&c.lab&&c.lab.close?c.lab.close():he?an():ce?fe(!1):Zu()?pe=!1:(document.activeElement&&document.activeElement!==r&&document.activeElement.blur(),pl()):s.elements.help.hidden=!0:kl()),pe&&(E.stopPropagation(),E.preventDefault());return}if(s.handleKey(E))return;Fi();let $=E.target&&E.target.tagName||"";E.ctrlKey||E.metaKey||E.altKey||$==="INPUT"||$==="SELECT"||$==="TEXTAREA"||i||(E.key==="/"?(E.preventDefault(),fe(!0,{focusSearch:!0})):E.key==="t"||E.key==="T"?(E.preventDefault(),fe(!ce,{focusSearch:!ce})):(E.key==="e"||E.key==="E")&&ue==="expert"&&(E.preventDefault(),c.openExport()))},!0);let Cr=null;new MutationObserver(()=>{g.hidden?(Cr&&document.contains(Cr)&&Cr.offsetParent!==null&&Cr.focus({preventScroll:!0}),Cr=null,ns()):(Cr=document.activeElement&&document.activeElement!==r?document.activeElement:null,Fi())}).observe(g,{attributes:!0,attributeFilter:["hidden"]});let Na={half:0,full:0};function Lf(){return i||innerWidth<1080}function If(){let E=i&&innerWidth<768,$=i&&!E;r.classList.toggle("k-phone",E),r.classList.toggle("k-tablet",$);let pe=parseFloat(getComputedStyle(Nf).paddingTop)||0;Na=Jg(innerHeight,pe),r.style.setProperty("--sheet-half",`${Na.half}px`),r.style.setProperty("--sheet-full",`${Na.full}px`),gl(),_l()}function gl(){r.style.setProperty("--tr-w",`${Math.ceil(Ne.getBoundingClientRect().width)}px`),i&&(ie.classList.remove("k-nav2"),L.scrollWidth>L.clientWidth+1&&ie.classList.add("k-nav2"))}function _l(){let E=r.classList.contains("k-phone"),$=r.classList.contains("k-tablet");r.classList.toggle("sheet-open",E&&(ce||he)||$&&ce),d&&Tr()}let Nf=N("div",{class:"k-safeprobe","aria-hidden":"true"});r.append(Nf),addEventListener("resize",If),Re.push(()=>{gl(),Tr()}),If();function Df(){I.textContent=xe("app.title"),U.setAttribute("aria-label",xe("app.title")),Qe(),_e(),Ms(),mt(),wf(),Qn(),zt(),G.placeholder=xe("nav.search_ph"),G.setAttribute("aria-label",xe("nav.search_ph")),Me._render(),fl(It),St(ie),St(Ne),St(It),St(ws),St(Be),pi&&St(pi);for(let E of Object.values(y))St(E)}Or(()=>{ki.active&&ki.render(),Df(),he&&Zt(we,{moreOpen:!!(st.querySelector("#info-more")||{}).open}),T===Oi&&v(!1),gl(),Tr()}),Re.push(()=>{mt(),wf(),_e(),Qe(),ki.active&&ki.render()}),c.setLab=E=>{c.lab=E};let Qu=document.getElementById("lab");Qu&&new MutationObserver(()=>{Qu.hidden||(an(!1),fe(!1,{refocus:!1}),v(!1))}).observe(Qu,{attributes:!0,attributeFilter:["hidden"]});function D0(){let E=Qg.get();if(E==="expert"||E==="general")return E;try{let $=JSON.parse(localStorage.getItem("lagrange.layers")||"null");return $&&$.preset==="research"?"expert":"general"}catch{return"general"}}let Uf=()=>((document.getElementById("version")||{}).textContent||"").trim();function kf(E){let $=Sn(t.state.t,o);return E.map(pe=>{let Fe=pe.provenance,rt=pe.unit&&typeof pe.unit=="object"?pe.unit:{ko:pe.unit||"",en:pe.unit||""};return{id:pe.id,label_ko:(pe.label||{}).ko??String(pe.label||""),label_en:(pe.label||{}).en??"",value:pe.value??null,text:pe.text,unit_ko:rt.ko??"",unit_en:rt.en??"",tag:Fe.verification.tag,detail:Fe.verification.detail,source:_i(Fe),computed_by:Fe.computed_by||"",source_hash:Fe.source_hash||"",ref_commit:Fe.ref_commit||"",stage:Fe.stage||"",model:Fe.model||"",screen_utc:`${Vi($)} UTC`,screen_tdb_s:Math.round(t.state.t),time_conversion:"browser (core.tdbToUnix, Python table)",app:Uf()}})}let U0=E=>{let $=E==null?"":String(E);return/[",\n\r]/.test($)?'"'+$.replace(/"/g,'""')+'"':$};function ed(E,$,pe){let Fe=kf(E),rt,Tt;if($==="csv"){let $t=Object.keys(Fe[0]||{id:""});rt="\uFEFF"+[$t.join(","),...Fe.map(un=>$t.map(kn=>U0(un[kn])).join(","))].join(`\r
`)+`\r
`,Tt="text/csv"}else rt=JSON.stringify({app:Uf(),share:xl(),numbers:Fe},null,1),Tt="application/json";let kt=N("a",{download:`lagrange_${pe}.${$}`,href:URL.createObjectURL(new Blob([rt],{type:`${Tt};charset=utf-8`}))});document.body.append(kt),kt.click(),kt.remove(),setTimeout(()=>URL.revokeObjectURL(kt.href),4e3),c.lastExport={kind:$,name:pe,n:Fe.length,bytes:rt.length}}c.exportRows=kf;let td=E=>Number(E.toPrecision(7));function xl(){let E=t.state.cam,$=s.state,pe=new URLSearchParams;pe.set("t",String(Math.round(t.state.t/60)*60));let Fe=Ce&&!Ce.startsWith("zoom:")&&Ce!=="__all"?Ce:"";return Fe&&pe.set("target",Fe),pe.set("cam",[td(E.dist),td(E.az),td(E.el)].join(",")),pe.set("frame",t.state.sTarget?"inertial":"rot"),pe.set("mode",ue),pe.set("lang",Fn()),pe.set("layers",ys.map(rt=>$[rt]?"1":"0").join("")),`${location.origin==="null"?location.href.split("#")[0]:location.origin+location.pathname+location.search}#${pe.toString()}`}c.shareUrl=xl;function k0(){let E=location.hash.slice(1);if(!E||!E.includes("="))return;let $=new URLSearchParams(E);($.get("mode")==="expert"||$.get("mode")==="general")&&We($.get("mode"),!1),($.get("lang")==="ko"||$.get("lang")==="en")&&$.get("lang")!==Fn()&&uo($.get("lang"),!1);let pe=$.get("layers");pe&&/^[01]+$/.test(pe)&&pe.length===ys.length&&s.applyShared(Object.fromEntries(ys.map(($t,un)=>[$t,pe[un]==="1"]))),($.get("frame")==="inertial"||$.get("frame")==="rot")&&Yu($.get("frame"));let Fe=$.get("target"),rt=Fe&&Fe.startsWith("view:")?Fe.slice(5):null;rt&&Un[rt]?(Hn(rt),et(Fe)):Fe&&Sr[Fe]&&(t.setCamera({target:Sr[Fe][0],dist:Sr[Fe][1]}),et(Fe));let Tt=($.get("cam")||"").split(",").map(Number);Tt.length===3&&Tt.every(Number.isFinite)&&Tt[0]>0&&t.setCamera({dist:Tt[0],az:Tt[1],el:Math.max(-1.55,Math.min(1.55,Tt[2]))});let kt=Number($.get("t"));$.get("t")&&Number.isFinite(kt)&&t.setTime(kt),r.dataset.shared="1",c.shared=Object.fromEntries($.entries())}return We(D0(),!1),et("L2"),c.applyShareHash=k0,Df(),l(!0),ns(),c}var s0="lagrange.panel",r0={get(){try{return localStorage.getItem(s0)}catch{return null}},set(n){try{localStorage.setItem(s0,n)}catch{}}};function a0(n,e,t,i,s){let r=document.body,a=document.getElementById("top"),o=document.getElementById("panel");a.dataset.obstacle="",document.getElementById("version").dataset.obstacle="",document.getElementById("source").dataset.obstacle="";let l=h=>s.setLabelNumbers(h);s.labelNumbersDefault=n.label.numbers,r.append(s.elements.scalebar,s.elements.help);let c={pick:()=>{},layout:n.layout},d=h=>s.handleKey(h);if(n.layout==="panel"){o.dataset.obstacle="";let h=N("button",{type:"button",id:"panel-toggle",class:"panel-toggle","aria-expanded":"true"}),u=N("div",{class:"panel-inner"},N("h2",{id:"panel-h",i18n:"l2.panel"}),N("div",{class:"ctl"},e.mode,e.views,e.timeHead,e.timeSlider,e.timeDate),e.layers,e.nums,e.legend);o.replaceChildren(h,u);let f=(x,p=!0)=>{r.classList.toggle("panel-collapsed",x),h.setAttribute("aria-expanded",String(!x)),h.dataset.i18n=x?"panel.open":"panel.close",h.textContent=xe(h.dataset.i18n),p&&r0.set(x?"collapsed":"open")},m=r0.get();return f(m?m==="collapsed":i,!1),h.addEventListener("click",()=>f(!r.classList.contains("panel-collapsed"))),c.setCollapsed=f,window.addEventListener("keydown",d),l(n.label.numbers),c}return i0(n,e,t,i,s)}var o0={name:"default",layout:"panel",css:{"--bg":"#04060c","--fg":"#e7ecf5","--muted":"#a3aec4","--panel":"rgba(12, 18, 32, 0.92)","--line":"#26324c","--impl":"#5aa5ff","--external":"#f0a23b","--physical":"#3fca7f","--approx":"#9aa0aa","--accent":"#5aa5ff","--font":"'Pretendard', system-ui, 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif","--panel-radius":"10px","--panel-blur":"0px","--panel-width":"340px","--btn-bg":"#1b2740","--btn-on":"#2d4a7a","--label-bg":"rgba(12, 18, 32, 0.72)","--label-border":"1px dashed #26324c","--label-radius":"4px","--label-size":"12px","--fs-body":"13px","--fs-small":"12px","--label-min":"12px"},scene:{background:263692,colors:{sun:16765562,emb:8369151,earth:5217791,moon:13620966,lpt:16743129,unstable:16734810,stable:4180607,haloFam:3824266,haloMain:9425919,escOut:15770171,escIn:5822146,a3:13079274,c3:16763755,c4:16747109,ref4c:11583173,ref4d:8440772,moonTrail:7109270,jwst:15255666,extJpl:15770171,extMine:16767392,physRecon:4180607,physMine:11728335,physJpl:3120739,zoomGap:16777215},lines:{main:2.6,family:1,familyOpacity:.35,traj:1.6,dir:2.2,ref:1.8,dv:1.4,trail:1.4,escape:1.8,jwst:1.6,jwstInterp:1.3,pred:2,zoomGap:1.4,dashPx:7,gapPx:5},points:{lpt:9,emb:8,burn:6,jwst:3.5,jwstMarker:9,predEnd:6,zoomPt:10},spheres:{sunMinPx:9,earthMinPx:6,moonMinPx:4},glow:{sun:3.2,earth:1.8,moon:1.4,strength:.55},familyEvery:10},label:{numbers:!0},layers:{initial:"m1",persist:!1}};var l0={name:"C",layout:"hybrid",css:{"--bg":"#000000","--fg":"#f3f5f9","--muted":"#c3cad5","--panel":"rgba(8, 10, 14, 0.80)","--line":"rgba(255, 255, 255, 0.09)","--accent":"#f2f5fa","--panel-radius":"4px","--panel-blur":"16px","--panel-width":"350px","--btn-bg":"rgba(255, 255, 255, 0.07)","--btn-on":"rgba(255, 255, 255, 0.16)","--label-bg":"rgba(0, 0, 0, 0.45)","--label-border":"none","--label-radius":"6px","--label-size":"12px","--fg-2":"#c3cad5","--fg-scene":"#f3f5f9","--fg-scene-2":"#d4d9e1","--on-accent":"#0c0f15","--line-strong":"rgba(255, 255, 255, 0.44)","--edge-hover":"rgba(255, 255, 255, 0.70)","--hover":"rgba(0, 0, 0, 0.45)","--press":"rgba(0, 0, 0, 0.60)","--focus":"#ffffff","--focus-halo":"rgba(0, 0, 0, 0.9)","--scrim-top":"linear-gradient(to bottom, rgba(0, 0, 0, .70) 0, rgba(0, 0, 0, .64) 64px, rgba(0, 0, 0, .30) 112px, rgba(0, 0, 0, 0) 168px)","--scrim-bottom":"linear-gradient(to top, rgba(0, 0, 0, .74) 0, rgba(0, 0, 0, .66) 128px, rgba(0, 0, 0, .30) 176px, rgba(0, 0, 0, 0) 236px)","--scrim-top-h":"168px","--scrim-bottom-h":"236px","--fs-name":"36px","--fw-name":"300","--fs-key":"30px","--fw-key":"300","--fs-unit":"12px","--fs-ui":"14px","--track-cap":"0.06em","--r-ctl":"6px","--ctl-h":"32px","--icon-btn":"32px","--tag-dot":"7px","--tag-hit":"28px","--vpanel-left":"340px","--vpanel-right":"380px","--vpanel-right-expert":"420px","--t-fast":"160ms","--t-base":"480ms","--t-slow":"560ms","--ease":"cubic-bezier(.16, 1, .3, 1)"},scene:{background:0,colors:{haloFam:2834528,haloMain:12575743},lines:{main:2.6,family:.9,familyOpacity:.26,traj:1.5,dir:2,ref:1.7,dv:1.2,trail:1.3,escape:1.7},glow:{sun:3.8,earth:2.2,moon:1.6,strength:.7},familyEvery:12},label:{numbers:!1},layers:{initial:"clean",persist:!0}};var DM="C",c0={C:l0,PANEL:{name:"panel"}},UM=["--t-fast","--t-base","--t-slow"];function u0(n,e){let t={...n};for(let[i,s]of Object.entries(e||{}))t[i]=s&&typeof s=="object"&&!Array.isArray(s)?u0(n[i]||{},s):s;return t}function d0(n){let e=null;try{e=new URLSearchParams(n).get("style")}catch{e=null}let t=e&&c0[e.toUpperCase()]||c0[DM];return u0(o0,t)}function h0(n,e=document.documentElement){for(let[s,r]of Object.entries(n.css))e.style.setProperty(s,r);document.body.classList.add(`layout-${n.layout}`,`style-${n.name}`),document.body.dataset.style=n.name;let t=null;try{t=window.matchMedia("(prefers-reduced-motion: reduce)")}catch{t=null}let i=()=>{for(let s of UM)n.css[s]!==void 0&&e.style.setProperty(s,t&&t.matches?"0ms":n.css[s])};i(),t&&t.addEventListener&&t.addEventListener("change",i)}function f0(n){if(!("serviceWorker"in navigator))return Promise.resolve(null);let e=i=>{i.waiting&&navigator.serviceWorker.controller&&(n.hidden=!1)};n.addEventListener("click",async()=>{let i=await navigator.serviceWorker.getRegistration();i&&i.waiting&&i.waiting.postMessage({type:"SKIP_WAITING"})});let t=!1;return navigator.serviceWorker.addEventListener("controllerchange",()=>{t||!n.dataset.armed||(t=!0,location.reload())}),n.addEventListener("click",()=>{n.dataset.armed="1"},{capture:!0}),navigator.serviceWorker.register("./sw.js").then(i=>(e(i),i.addEventListener("updatefound",()=>{let s=i.installing;s&&s.addEventListener("statechange",()=>{s.state==="installed"&&e(i)})}),i))}function gf(n,e){let t=n.dirty?` + ${e["version.dirty"]}`:"";return`v${n.version} \xB7 ${n.date} \xB7 ${e["version.commit"]} ${n.commit}${t}`}var p0=null;function m0(n){let e=null,t=null,i=null,s=0,r=null,a={};async function o(){if(e)return e;if(t)return t;if(!n.lab)throw new Error("\uC774 \uD310\uC5D0\uB294 \uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uAC00 \uC5C6\uB2E4 (manifest.lab)");return t=(async()=>{for(let h of n.lab.datasets){let u=await Rs(h.file),f=ss(u,n.verification.details);if(f.errors.length)throw new Error(`${h.id}: ${f.errors.join("; ")}`);u.binary&&(u._arrays=Cs(await ii(u.binary.file),u.binary.arrays)),u.d24&&(u._forest=await ii(u.d24.file)),a[h.id]=u}let d=a["m3.lab"];return e=to(d,d._arrays,d._forest),e})(),t}function l(){if(i)return i;if(rr==="embedded"){let d=URL.createObjectURL(new Blob([p0],{type:"text/javascript"}));i=new Worker(d)}else i=new Worker("lab-worker.js");return i.onmessage=d=>{let h=d.data;if(!r||h.id!==r.id)return;if(h.type==="progress"){r.onProgress&&r.onProgress(h);return}let u=r;r=null,h.type==="done"?u.resolve({...h.result,wall_ms:performance.now()-u.t0}):u.reject(new Error(h.message))},i.onerror=d=>{if(r){let h=r;r=null,h.reject(new Error(d.message||"Worker \uC624\uB958"))}},i}function c(d,h={}){if(!e)return Promise.reject(new Error("\uBA3C\uC800 lab.load()"));let u=l();if(r){let m=r;r=null,m.reject(new Error("\uBC84\uB9BC"))}let f=++s;return new Promise((m,x)=>{r={id:f,resolve:m,reject:x,onProgress:h.onProgress,t0:performance.now()},u.postMessage({id:f,params:e.escapeParams(h),s0:Array.from(d),chunk:h.chunk,trajTol:h.trajTol,trajMax:h.trajMax})})}return{load:o,integrate:c,get loaded(){return!!e},get lab(){return e},datasets:a,predict:d=>Nr(e,d),predictState:d=>Td(e,d),components:d=>tr(e,d),stateOf:d=>wl(e,d)}}function ul(n,e){let t={},i=null;async function s(){if(i)return i;let l=n[e];if(!l)throw new Error(`\uC774 \uD310\uC5D0\uB294 ${e} \uC790\uB8CC\uAC00 \uC5C6\uB2E4`);return i=(async()=>{for(let c of l.datasets){let d=await Rs(c.file),h=ss(d,n.verification.details);if(h.errors.length)throw new Error(`${c.id}: ${h.errors.join("; ")}`);d.binary&&(d._arrays=Cs(await ii(d.binary.file),d.binary.arrays)),d.chunks&&(d._chunks={}),t[c.id]=d}return t})(),i}let r={};async function a(l,c){await s();let d=t[l];if(!d||!d.chunks)throw new Error(`${l}: \uC870\uAC01 \uC790\uB8CC\uAC00 \uC544\uB2C8\uB2E4`);if(d._chunks[c])return d._chunks[c];let h=l+":"+c;if(!r[h]){let u=d.chunks.find(f=>f.year===c);if(!u)throw new Error(`${l}: \uC870\uAC01 ${c} \uC5C6\uC74C`);r[h]=ii(u.file).then(f=>(d._chunks[c]=Cs(f,u.arrays),d._chunks[c]))}return r[h]}async function o(){await s();for(let[l,c]of Object.entries(t))if(c.chunks)for(let d of c.chunks)await a(l,d.year);return t}return{load:s,loadChunk:a,loadAllChunks:o,datasets:t,get loaded(){return Object.keys(t).length>0},available:!!n[e]}}var kM={target:"L2",dist:17e5,az:-1.25,el:.8},OM=300,_f=900,$s=2e3,FM={tag:"impl",detail:"implementation"},Xu=[{id:"truth",key:"lab.col_truth",src:"m3.lab.json>integrate (core/lab/escape.js DOP853, Worker)"},{id:"T3",key:"lab.col_t3",src:"m3.lab.json>t3 (core/lab/eigen.js lnT3)"},{id:"D24",key:"lab.col_d24",src:"m3.lab.json>d24 (core/lab/forest.js predictD24)"},{id:"MLP",key:"lab.col_mlp",src:"m3.lab.json>mlp (core/lab/mlp.js predictMLP)"},{id:"HYB",key:"lab.col_hybrid",src:"m3.lab.json>d24>w_R (\uD558\uC774\uBE0C\uB9AC\uB4DC = D24, w_R \uBAA8\uB450 0)",only:["research"]},{id:"dT3",key:"lab.col_dt3",src:"core/lab \u2014 ln t_T3 \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"T3"},{id:"dD24",key:"lab.col_dd24",src:"core/lab \u2014 ln t_D24 \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"D24"},{id:"dMLP",key:"lab.col_dmlp",src:"core/lab \u2014 ln t_MLP \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"MLP"},{id:"dir",key:"lab.col_dir",src:"core/lab \u2014 e_u* \uBD80\uD638 \uB300 \uC815\uB2F5 \uC774\uD0C8 \uBC29\uD5A5",only:["research"]}],dl=n=>{if(!Number.isFinite(n))return"\u2014";let e=Math.exp(n);return e>=100?e.toFixed(1):e>=10?e.toFixed(2):e.toFixed(3)},BM=n=>Number.isFinite(n)?(n>=0?"+":"\u2212")+Math.abs(n).toExponential(1):"\u2014",qu=n=>{if(n===0)return"0";let e=Math.floor(Math.log10(Math.abs(n)));return`${(n/10**e).toFixed(2)}e${e}`};function g0({view:n,labApi:e,layers:t,mobile:i,onOpen:s}){let r=N("aside",{id:"lab",class:"lab",hidden:!0,"data-obstacle":"","aria-live":"polite"}),a=N("button",{type:"button",id:"view-lab",i18n:"l2.view_lab"}),o={v:null,E:null,pred:null,flags:null,truth:null,outside:!1,timer:null,job:0,built:!1,example:null,lastResult:null},l=null;if(i){let b=N("div",{id:"lab-mobile",class:"lab-mobile"},N("p",{i18n:"lab.mobile_note"})),_=N("button",{type:"button",class:"close",i18n:"source.close"});return _.addEventListener("click",()=>{r.hidden=!0}),r.append(_,N("h3",{i18n:"lab.title"}),b),a.addEventListener("click",()=>{r.hidden=!1,St(r),s&&s()}),{panel:r,button:a,open:async()=>{r.hidden=!1,St(r)},state:o}}let c=N("button",{type:"button",class:"close",id:"lab-close",i18n:"source.close"}),d=N("div",{id:"lab-status",class:"lab-status","data-meta":"",i18n:"lab.loading"}),h=[],u=()=>{let b=xi(FM,n.model.table);return h.push(b),b},f=N("div",{class:"lab-scope","data-meta":""},u(),N("span",{i18n:"lab.scope"})),m=N("div",{id:"lab-examples",class:"lab-examples","data-meta":""}),x=N("div",{id:"lab-example-src",class:"lab-note","data-meta":""}),p=N("div",{id:"lab-controls",class:"lab-controls","data-meta":""}),g=N("div",{id:"lab-flags",class:"lab-flags"}),T=N("div",{id:"lab-progress",class:"lab-progress","data-meta":""}),R=N("progress",{id:"lab-bar",max:1,value:0}),y=N("span",{id:"lab-progtext"});T.append(R,y);let M=N("table",{id:"lab-table",class:"lab-table"}),w=N("div",{class:"lab-table-wrap"},M),P=N("div",{id:"lab-foot",class:"lab-note","data-meta":""}),v=N("button",{type:"button",class:"lab-fold",id:"lab-fold","aria-expanded":"true"}),A="lagrange.lab.folded",U={get(){try{return localStorage.getItem(A)==="1"}catch{return!1}},set(b){try{localStorage.setItem(A,b?"1":"0")}catch{}}};function I(b,_=!0){r.dataset.folded=b?"1":"0",v.setAttribute("aria-expanded",b?"false":"true"),v.dataset.i18n=b?"lab.unfold":"lab.fold";try{v.textContent=xe(v.dataset.i18n)}catch{}_&&U.set(b)}v.addEventListener("click",()=>I(r.dataset.folded!=="1")),I(U.get(),!1),r.append(c,v,N("h3",{i18n:"lab.title"}),f,d,m,x,p,g,T,w,P),c.addEventListener("click",()=>Ae());let L={};function F(b,_,O,z){let se=N("input",{type:"range",id:"lab-"+b,min:String(_),max:String(O),step:String(z),"aria-label":b}),_e=N("span",{class:"lab-val",id:"lab-"+b+"-val"}),be=N("label",{class:"lab-row"},N("span",{class:"lab-name",i18n:"lab.s_"+b}),se,_e);return se.addEventListener("input",()=>le(b)),se.addEventListener("change",()=>ve()),L[b]={input:se,val:_e,row:be},be}let D=N("button",{type:"button",id:"lab-sign-out",i18n:"lab.sign_out"}),X=N("button",{type:"button",id:"lab-sign-in",i18n:"lab.sign_in"}),ie=N("input",{type:"checkbox",id:"lab-outside"}),W=N("label",{class:"lab-outside",id:"lab-outside-row"},ie,N("span",{i18n:"lab.outside"}));function ne(){let b=l.sliders,_=o.outside?b.out_factor:1;return{es:b.es_in*_,ap:b.ap_in*_,az:b.az_in*_}}function H(){let b=o.v,_=ne(),O=l.sliders;L.eu.input.value=String(Math.round((Math.log10(Math.max(b.eu,1e-300))-O.eu_log10[0])/(O.eu_log10[1]-O.eu_log10[0])*_f)),L.es.input.value=String(Math.round(b.es/_.es*$s)),L.ap.input.value=String(Math.round(b.ap/_.ap*$s)),L.az.input.value=String(Math.round(b.az/_.az*$s)),L.phip.input.value=String(Math.round(b.phip*180/Math.PI)),L.phiz.input.value=String(Math.round(b.phiz*180/Math.PI)),L.eu.val.textContent=`${qu(b.eu)} \u03B3`,L.es.val.textContent=`${qu(b.es)} \u03B3`,L.ap.val.textContent=`${qu(b.ap)} \u03B3`,L.az.val.textContent=`${qu(b.az)} \u03B3`,L.phip.val.textContent=`${(b.phip*180/Math.PI).toFixed(0)}\xB0`,L.phiz.val.textContent=`${(b.phiz*180/Math.PI).toFixed(0)}\xB0`,D.classList.toggle("on",b.sign>0),X.classList.toggle("on",b.sign<0)}function re(b){let _=Number(L[b].input.value),O=ne(),z=l.sliders;return b==="eu"?10**(z.eu_log10[0]+_/_f*(z.eu_log10[1]-z.eu_log10[0])):b==="phip"||b==="phiz"?_*Math.PI/180:_/$s*O[b]}function le(b){o.example=null;let _={...o.v,[b]:re(b)};!o.outside&&b!=="phip"&&b!=="phiz"&&(_=Ya(l,_,b)),o.v=_,H(),ye(),Se()}function ae(b){o.example=null,o.v={...o.v,sign:b},H(),ye(),Se(),ve()}D.addEventListener("click",()=>ae(1)),X.addEventListener("click",()=>ae(-1)),ie.addEventListener("change",()=>me(ie.checked));function me(b){if(o.outside=b&&t.preset==="research",ie.checked=o.outside,!o.outside&&o.v&&!o.example){let _=o.v;for(let O of["eu","es","ap","az"])_=Ya(l,_,O);o.v=_}l&&(H(),ye(),ve())}function Ne(){let b=N("tr",{},N("th",{"data-meta":"",i18n:"lab.col_r"}));for(let O of Xu){let z=N("th",{class:"c-"+O.id,"data-col":O.id,"data-meta":""},N("span",{i18n:O.key}));O.id!=="dir"&&z.append(u()),b.append(z)}b.append(N("th",{class:"c-flag","data-meta":"",i18n:"lab.col_flag"}));let _=N("tbody");l.R_over_gamma.forEach((O,z)=>{let se=N("tr",{"data-k":String(z)},N("td",{"data-meta":""},`${l.labels[z]} \u03B3`));for(let _e of Xu){let be=N("td",{class:"num c-"+_e.id,"data-col":_e.id,"data-source":_e.src,"data-verification":"impl/implementation","data-browser":"1"});se.append(be)}se.append(N("td",{class:"c-flag","data-col":"flag"})),_.append(se)}),M.replaceChildren(N("thead",{},b),_)}function Le(b,_){return M.querySelector(`tbody tr[data-k="${b}"] td[data-col="${_}"]`)}function De(b,_,O){b.dataset.value=String(_),b.textContent=O}function j(){let b=o.pred,_=o.flags;l.R_over_gamma.forEach((O,z)=>{De(Le(z,"T3"),b.T3[z],dl(b.T3[z])),De(Le(z,"D24"),b.D24?b.D24[z]:NaN,b.D24?dl(b.D24[z]):"\u2014"),De(Le(z,"MLP"),b.MLP[z],dl(b.MLP[z])),De(Le(z,"HYB"),b.D24?b.D24[z]:NaN,b.D24?dl(b.D24[z]):"\u2014");let se=Le(z,"flag"),_e=[];_.inRange||_e.push(N("span",{class:"flag flag-extrap",i18n:"lab.flag_extrap"})),_.uncertain[z]&&_e.push(N("span",{class:"flag flag-unc",i18n:"lab.flag_unc",title:xe(_.mismatch[z]?"lab.flag_unc_mismatch":"lab.flag_unc_spread")})),se.replaceChildren(..._e),se.dataset.uncertain=_.uncertain[z]?"1":"0"}),g.replaceChildren(..._.inRange?[]:[N("span",{id:"lab-extrap",class:"flag flag-extrap",i18n:"lab.extrap_long"})]),Q(),St(r)}function Q(){let b=o.truth;l.R_over_gamma.forEach((_,O)=>{if(!b){De(Le(O,"truth"),NaN,"\u2026");for(let _e of Xu)(_e.diff||_e.id==="dir")&&De(Le(O,_e.id),NaN,"\u2026");return}let z=Math.log(b.t_days[O]);De(Le(O,"truth"),z,Number.isFinite(z)?dl(z):xe("lab.no_escape"));for(let _e of Xu)if(_e.diff){let be=o.pred[_e.diff],ce=be?be[O]-z:NaN;De(Le(O,_e.id),ce,BM(ce))}let se=b.dir[O]===0?null:Math.sign(o.pred.eus)===b.dir[O];De(Le(O,"dir"),se===null?NaN:se?1:0,se===null?"\u2014":xe(se?"lab.dir_hit":"lab.dir_miss"))})}function ye(){o.E=o.example!==null?l.examples[o.example].E.slice():Tl(l,o.v),o.pred=e.predict(o.E),o.flags=Lr(l,o.pred),o.truth=null,j()}function Se(){clearTimeout(o.timer),o.timer=null}function ve(){Se(),o.timer=setTimeout(Ke,OM),y.textContent=xe("lab.waiting")}function je(){let b=n.model.constants.length_unit_km,_=n.state.cam.dist,O=l.frame.gamma*l.R_over_gamma[l.R_over_gamma.length-1]*b,z=Math.max(.05,(_-O)/_);return n.kmPerPx()*z/n.renderer.getPixelRatio()/b}async function Ke(){o.timer=null;let b=++o.job,_=l.escapeParams().t_max_days;R.max=_,R.value=0,y.textContent=xe("lab.integrating"),r.dataset.integrating="1";let O=je();try{let z=await e.integrate(e.stateOf(o.E),{trajTol:O,onProgress:se=>{b===o.job&&(R.value=se.t_days,y.textContent=xe("lab.integrating_days",{d:se.t_days.toFixed(0)}))}});if(b!==o.job)return;o.truth=z,o.lastResult=z,o.trajTolUsed=O,o.trajE=o.E,R.value=z.t_reached_days,y.textContent=xe("lab.done",{ms:z.wall_ms.toFixed(0),n:z.traj?z.traj.n:0}),Q(),Xe(z),ot(z),St(r),r.dataset.integrating="0",r.dataset.done=String(b)}catch(z){if(String(z.message)==="\uBC84\uB9BC")return;y.textContent=xe("lab.error",{msg:z.message}),r.dataset.integrating="0"}}function ke(){let b=l.s_ref,_=l.frame.gamma,O=160;l.R_over_gamma.forEach((z,se)=>{let _e=new Float64Array(3*(O+1));for(let be=0;be<=O;be++){let ce=2*Math.PI*be/O;_e[3*be]=b[0]+z*_*Math.cos(ce),_e[3*be+1]=b[1]+z*_*Math.sin(ce),_e[3*be+2]=b[2]}n.addPolyline("lab_ring_"+se,"lab",_e,7109270,1,.55,{dashed:!0})})}function Xe(b){if(n.removeItem&&n.removeItem("lab_traj"),!b.traj||b.traj.n<2)return;let _=b.traj.points,O=l.s_ref,z=new Float64Array(_.length);for(let be=0;be<_.length;be+=3)z[be]=O[0]+_[be],z[be+1]=O[1]+_[be+1],z[be+2]=O[2]+_[be+2];let se=b.dir.filter(be=>be!==0).pop(),_e=se>0?n.COLORS.escOut:se<0?n.COLORS.escIn:13686498;n.addPolyline("lab_traj","lab",z,_e,2.2),r.dataset.trajN=String(b.traj.n),n.render()}function ot(b){if(!b.traj||b.traj.n<2||r.hidden||n.state.cam.target!=="L2"||n.state.fly)return;let _=b.traj.points,O=0;for(let fe=0;fe<_.length;fe+=3)O=Math.max(O,Math.hypot(_[fe],_[fe+1],_[fe+2]));if(!(O>0))return;let z=O*n.model.constants.length_unit_km,se=n.camera,_e=se.fov*Math.PI/360,be=Math.atan(Math.tan(_e)*se.aspect),ce=z/Math.sin(Math.min(_e,be))*1.1;o.fitDist=ce,!(Math.abs(Math.log(ce/n.state.cam.dist))<.01)&&n.flyTo("L2",ce,.8)}let it=null,qe=0,ue=!1;n.onRender.push(()=>{if(!l||r.hidden||!o.lastResult||ue)return;let b=n.state.cam,_=`${b.dist}|${b.target}|${n.state.fly?1:0}`,O=performance.now();if(_!==it){it=_,qe=O;return}O-qe<250||n.state.fly||o.timer||r.dataset.integrating==="1"||o.trajE!==o.E||!(je()<o.trajTolUsed/1.5)||Re()});async function Re(){ue=!0;let b=je(),_=o.E;try{let O=await e.integrate(e.stateOf(_),{trajTol:b});if(o.E!==_||r.dataset.integrating==="1")return;o.lastResult={...o.lastResult,traj:O.traj},o.trajTolUsed=b,Xe(O),r.dataset.resampled=String((Number(r.dataset.resampled)||0)+1)}catch(O){String(O.message)!=="\uBC84\uB9BC"&&console.warn("\uADA4\uC801 \uB2E4\uC2DC \uBF51\uAE30 \uC2E4\uD328",O)}finally{ue=!1}}function We(){m.replaceChildren(N("span",{class:"ctl-h",i18n:"lab.examples"})),l.examples.forEach((b,_)=>{let O=N("button",{type:"button",class:"lab-ex",id:"lab-ex-"+_,"data-ex":String(_),i18n:"lab.ex_"+b.kind});O.addEventListener("click",()=>Be(_)),m.append(O)})}function Be(b){let _=l.examples[b];o.example=b,o.v=Al(l,_.E),H();for(let O of m.querySelectorAll(".lab-ex"))O.classList.toggle("on",O.dataset.ex===String(b));x.textContent=xe("lab.ex_src",{no:_.sample_no??"\u2014",src:Fn()==="en"?_.source_en:_.source}),ye(),Se(),Ke()}function G(){let b=t.preset;r.dataset.preset=b,W.hidden=b!=="research",b!=="research"&&o.outside&&me(!1),P.replaceChildren(...b==="research"?[N("span",{i18n:"lab.hybrid_note"})]:[],N("span",{i18n:"lab.foot"})),St(P)}async function de(){if(r.hidden=!1,s&&s(),n.setCamera({...kM}),n.setLayer("lab",!0),o.built)return G(),o;if(d.hidden=!1,St(r),l=await e.load(),!l.uncertain||!l.sliders||l.examples.length!==5)throw new Error("\uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uC5D0 uncertain\xB7sliders\xB7examples \uAC00 \uC5C6\uB2E4 (main.py web \uB2E4\uC2DC)");p.replaceChildren(N("div",{class:"lab-row lab-sign"},N("span",{class:"lab-name",i18n:"lab.s_sign"}),D,X),F("eu",0,_f,1),F("es",-$s,$s,1),F("ap",0,$s,1),F("phip",0,359,1),F("az",0,$s,1),F("phiz",0,359,1),W);let b=l.sliders,_=(Math.log10(b.eu_train[0])-b.eu_log10[0])/(b.eu_log10[1]-b.eu_log10[0])*100,O=(Math.log10(b.eu_train[1])-b.eu_log10[0])/(b.eu_log10[1]-b.eu_log10[0])*100;return L.eu.input.style.setProperty("--band-a",_+"%"),L.eu.input.style.setProperty("--band-b",O+"%"),L.eu.input.classList.add("banded"),Ne(),We(),ke(),d.hidden=!0,o.built=!0,t.onChange(G),G(),Be(l.examples.findIndex(z=>z.kind==="q50")),o}function Ae(){r.hidden=!0,Se(),n.setLayer("lab",!1)}return a.addEventListener("click",()=>{de().catch(b=>{d.hidden=!1,d.textContent=xe("lab.error",{msg:b.message})})}),{panel:r,button:a,open:de,close:Ae,state:o,rerender(){for(let b of h)b._render();if(o.example!==null&&l){let b=l.examples[o.example];x.textContent=xe("lab.ex_src",{no:b.sample_no??"\u2014",src:Fn()==="en"?b.source_en:b.source})}},get lab(){return l},slide(b,_,O=!0){L[b].input.value=String(_),le(b),O&&ve()},useExample:Be,setOutside:me}}var zM=["sun","earth","moon","emb"];function _0(n,e=()=>{}){let t=null,i=null,s=new Set;async function r(){return await n.load(),t=n.datasets["m4.ephem"],i=za(t,{}),c}function a(d){return i.chunkFor(d).year}function o(d){i.hasChunk(d)||s.has(d)||(s.add(d),e(!0),n.loadChunk("m4.ephem",d).then(h=>{i.hasChunk(d)||i.addChunk(d,h),s.delete(d),e(s.size>0)}).catch(h=>{s.delete(d),e(s.size>0),console.warn("\uCC9C\uCCB4\uB825 \uC870\uAC01 \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",d,h)}))}async function l(d){let h=a(d);if(!i.hasChunk(h))for(o(h);!i.hasChunk(h);)await new Promise(u=>setTimeout(u,10))}let c={init:r,ensure:l,get range(){return t.range_tdb_s},get tMin(){return t.range_tdb_s[0]},get tMax(){return t.range_tdb_s[1]},ready:d=>i.hasChunk(a(d)),loadedYears:()=>t.chunks.map(d=>d.year).filter(d=>i.hasChunk(d)),evaluate(d){let h=a(d);if(!i.hasChunk(h))return o(h),null;let u=[],f=[];for(let m of zM){let x=i.evaluate(m,d,h);u.push(x.pos),f.push(x.vel)}return{pos:u,vel:f}},solar:()=>i};return c}var vs={startPx:160,releasePx:80,holdMs:2e3};function x0(n,e={}){let t={},i=[],s=e.mobile?"mobile":e.single?"single":null;function r(u){return s||(globalThis.__LAGRANGE_TEX2K?"test2k":u.hi?u.hiPx&&n.maxTextureSize()<Math.max(...u.hiPx)?"maxTextureSize "+n.maxTextureSize():n.qualityAllowsHiTex()?null:"quality":"no_hi")}async function a(u){let f={...u,level:null,pending:null,hiTex:null,loTex:null,px:0,belowSince:null,loads:0,releases:0,last_upload:null,steps:[],blocked:null,hiBitmap:null};t[u.id]=f,i.push(f);let m=performance.now(),x=await u.lo(),p=[x.width,x.height];return f.loTex=n.makeTexture(x,{mipmaps:u.mipmaps!==!1,wrapS:u.wrapS,colorSpace:u.colorSpace,anisotropy:u.anisotropy}),n.renderer.initTexture(f.loTex),x.close&&x.close(),u.apply(f.loTex,"2k"),f.level="2k",f.steps.push({level:"2k",ms:performance.now()-m,px:p}),f}function o(u){let f={cancelled:!1,stream:null};u.pending=f,(async()=>{let m=performance.now(),x=await u.hi();if(f.cancelled){x.close&&x.close();return}let p=performance.now()-m,g={mipmaps:u.mipmaps!==!1,wrapS:u.wrapS,anisotropy:u.anisotropy??n.renderer.capabilities.getMaxAnisotropy(),format:u.format,colorSpace:u.colorSpace};f.stream=globalThis.__LAGRANGE_TILES===!1?Rg(n.renderer,x,g):Pg(n.renderer,x,{...g,nx:4,ny:2,border:8});let T=await f.stream.promise;if(x.close&&x.close(),f.cancelled){T.dispose();return}u.hiTex=T,u.pending=null,u.level="8k",u.loads++,u.apply(T,"8k");let R=f.stream.state;u.last_upload={tiled:!!T.isTiled,allocs:R.allocs?R.allocs.map(y=>Math.round(y.ms*10)/10):null,decode_ms:p,alloc_ms:R.alloc_ms??null,chunks:R.chunks.length,chunk_max_ms:Math.max(...R.chunks.map(y=>y.ms)),chunk_ms:R.chunks.map(y=>[y.level,Math.round(y.ms*10)/10,Math.round(y.at)]),blits:R.blits.length,blit_max_ms:R.blits.length?Math.max(...R.blits.map(y=>y.ms)):0,fence_waits:R.fence_waits,decode_at:[Math.round(m),Math.round(m+p)],total_ms:performance.now()-m,px:[R.w,R.h],levels:R.levels},u.steps.push({level:"8k",ms:performance.now()-m,px:[R.w,R.h]})})().catch(m=>{console.warn("8K \uADF8\uB9BC \uC62C\uB9AC\uAE30 \uC2E4\uD328",u.id,m),u.pending=null,u.blocked=String(m)})}function l(u){u.pending&&(u.pending.cancelled=!0,u.pending.stream&&u.pending.stream.cancel(),u.pending=null),u.hiTex&&(u.apply(u.loTex,"2k"),u.hiTex.dispose(),u.hiTex=null,u.releases++),u.level="2k"}function c(){let u=performance.now();for(let x of i)x.level&&(x.px=x.sphere?n.sphereScreenPx(x.sphere):1/0);let f=null,m=-1;for(let x of i)x.level&&x.body&&!r(x)&&x.px>=vs.startPx&&x.px>m&&(f=x.body,m=x.px);if(f===null)for(let x of i)x.body&&(x.hiTex||x.pending)&&x.px>=vs.releasePx&&x.px>m&&(f=x.body,m=x.px);for(let x of i)if(x.level){if(x.blocked=r(x),x.blocked){(x.hiTex||x.pending)&&l(x);continue}if(x.body&&f!==null&&x.body!==f){(x.hiTex||x.pending)&&l(x),x.belowSince=null;continue}x.px>=vs.startPx?(x.belowSince=null,!x.hiTex&&!x.pending&&o(x)):x.px<vs.releasePx&&(x.hiTex||x.pending)?x.belowSince===null?x.belowSince=u:u-x.belowSince>=vs.holdMs&&(l(x),x.belowSince=null):x.belowSince=null}}n.onRender.push(c);function d(u,f,m=6e4){return new Promise((x,p)=>{let g=performance.now(),T=()=>{let R=t[u];R&&R.level===f&&!R.pending?x(h()[u]):performance.now()-g>m?p(new Error(`${u} ${f} \uAE30\uB2E4\uB9BC \uC2DC\uAC04 \uB118\uC74C (${R&&R.level})`)):setTimeout(T,50)};T()})}function h(){let u={};for(let f of i)u[f.id]={level:f.level,pending:!!f.pending,px:f.px,loads:f.loads,releases:f.releases,blocked:f.blocked,last_upload:f.last_upload,steps:f.steps};return u}return{add:a,tick:c,slots:t,snapshot:h,waitLevel:d,rule:vs,hiBodies:()=>[...new Set(i.filter(u=>u.body&&(u.hiTex||u.pending)).map(u=>u.body))],gpuTextures:()=>n.renderer.info.memory.textures}}var VM=n=>typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:120}):setTimeout(()=>n({didTimeout:!0,timeRemaining:()=>8}),16),y0=3,Ys={desktop:{day:96,night:32},mobile:{day:28,night:12},maxInflight:6,gridCols:32,gridRows:20,pCoarse:4.4,planMs:100,uploadGapMs:40};function v0(n,e,t={}){let i=n.renderer,s=i.getContext(),r=e.content,a=e.border,o=e.size,l=e.w0,c=e.h0,d=ue=>ue==="day"?[0,1,2,3]:[1,2,3],h=[0,1,2,3].map(ue=>e.levels.day[ue].grid),u=[],f=0;for(let ue=0;ue<=3;ue++)u[ue]=f,f+=h[ue][1];let m=h[0][0],x=t.mobile?Ys.mobile:Ys.desktop,p=new Uint8Array(m*f*4);for(let ue=3;ue<p.length;ue+=4)p[ue]=255;let g=new _s(p,m,f,_n,rn);g.magFilter=g.minFilter=sn,g.generateMipmaps=!1,g.needsUpdate=!0;let T=n.items.find(ue=>ue.name==="Earth_sphere"),R=T.obj.material.uniforms;R.pTable.value=g,R.pInfo.value.set(l,c,r,a),R.pRowOff.value.fromArray(u),R.pGridX.value.fromArray(h.map(ue=>ue[0])),R.pGridY.value.fromArray(h.map(ue=>ue[1]));let y=Math.min(8,i.capabilities.getMaxAnisotropy());R.pAniso.value=y;let M={kinds:{day:w(x.day),night:w(x.night)},uploads:0,upload_ms_max:0,upload_ms:[],alloc_ms:{},evictions:0,tiles_seen:0,plans:0,plan_ms_max:0,no_room:0,allocs:0,releases:0};function w(ue){return{array:null,cap:ue,pages:new Map,free:[],pending:new Set}}let P=0,v=new Map,A=0,U=0,I=0,L=null,F=null,D=0,X=!1,ie=null,W=null,ne=null,H=[],re=(()=>{try{let ue=s.getExtension("WEBGL_debug_renderer_info");return ue&&/swiftshader|llvmpipe|software|basic render/i.test(s.getParameter(ue.UNMASKED_RENDERER_WEBGL))}catch{return!1}})();function le(ue){let Re=M.kinds[ue],We=performance.now(),Be=new fr(null,o,o,Re.cap);Be.format=_n,Be.type=rn,Be.colorSpace=Ht,Be.minFilter=Kn,Be.magFilter=Dt,Be.wrapS=Be.wrapT=zn,Be.generateMipmaps=!1,Be.anisotropy=y,Be.flipY=!1,Be.premultiplyAlpha=!1,Be.mipmaps=Array.from({length:y0},(G,de)=>({data:null,width:o>>de,height:o>>de})),Be.source.dataReady=!1,Be.needsUpdate=!0,i.initTexture(Be),Re.array=Be,Re.free=Array.from({length:Re.cap},(G,de)=>de),M.alloc_ms[ue]=performance.now()-We,M.allocs++,R[ue==="day"?"pDay":"pNight"].value=Be,R.pReady.value=1}function ae(ue,Re,We,Be,G){let de=u[Re]+We;p[(de*m+Be)*4+(ue==="day"?0:1)]=G,X=!0}let me=(ue,Re,We,Be)=>`${ue}|${Re}|${We}|${Be}`;function Ne(ue,Re,We){let Be=l>>We,G=c>>We;return[Math.min(h[We][1]-1,Math.max(0,Math.floor(Re*G/r))),Math.min(h[We][0]-1,Math.max(0,Math.floor(ue*Be/r)))]}function Le(ue,Re,We,Be,G,de){let Ae=me(Re,We,Be,G),b=ue.get(Ae);(!b||de<b.score)&&ue.set(Ae,{kind:Re,p:We,r:Be,c:G,score:de})}let De=Math.atan2,j=Math.asin,Q=Math.PI;function ye(){let ue=performance.now(),Re=T.orientNow,We=new Map,Be=i.getDrawingBufferSize(new at),G=n.debug.camera;if(!ne&&T.obj.visible&&Re&&T.exaggeration<=1.000001){let _=G.matrixWorld.elements,O=[_[0],_[1],_[2]],z=[_[4],_[5],_[6]],se=[-_[8],-_[9],-_[10]],_e=Math.tan(G.fov*Q/360),be=G.aspect,ce=T.obj.position,fe=T.obj.scale.x,Ce=(we,he,Ee)=>[Re[0][0]*we+Re[1][0]*he+Re[2][0]*Ee,Re[0][1]*we+Re[1][1]*he+Re[2][1]*Ee,Re[0][2]*we+Re[1][2]*he+Re[2][2]*Ee],$e=Ce(-ce.x+G.position.x,-ce.y+G.position.y,-ce.z+G.position.z),Ue=(we,he)=>{let Ee=se[0]+we*_e*be*O[0]+he*_e*z[0],Ie=se[1]+we*_e*be*O[1]+he*_e*z[1],ge=se[2]+we*_e*be*O[2]+he*_e*z[2],Ye=Math.hypot(Ee,Ie,ge),Ve=Ce(Ee/Ye,Ie/Ye,ge/Ye),ft=$e[0]*Ve[0]+$e[1]*Ve[1]+$e[2]*Ve[2],gt=$e[0]**2+$e[1]**2+$e[2]**2-fe*fe,wt=ft*ft-gt;if(wt<0)return null;let Gt=-ft-Math.sqrt(wt);if(Gt<0)return null;let Zt=$e[0]+Gt*Ve[0],an=$e[1]+Gt*Ve[1],qt=$e[2]+Gt*Ve[2];return[(De(an,Zt)+Q)/(2*Q),(Q/2-j(Math.max(-1,Math.min(1,qt/fe))))/Q]},Oe=2/Be.x,Qe=2/Be.y,et=Ys.gridCols,st=Ys.gridRows,Y=we=>we>.5?we-1:we<-.5?we+1:we;for(let we=0;we<et;we++)for(let he=0;he<st;he++){let Ee=(we+.5)/et*2-1,Ie=(he+.5)/st*2-1,ge=Ue(Ee,Ie);if(!ge)continue;let Ye=Ue(Ee+Oe,Ie),Ve=Ue(Ee,Ie+Qe);if(!Ye||!Ve)continue;let ft=Y(Ye[0]-ge[0])*l,gt=(Ye[1]-ge[1])*c,wt=Y(Ve[0]-ge[0])*l,Gt=(Ve[1]-ge[1])*c,Zt=ft*ft+gt*gt,an=wt*wt+Gt*Gt,qt=Math.log2(Math.max(Math.max(Math.sqrt(Math.max(Zt,an))/y,Math.sqrt(Math.min(Zt,an))),1e-6));if(qt>=Ys.pCoarse)continue;let Hn=Ee*Ee+Ie*Ie;for(let bs of["day","night"]){let es=d(bs)[0],on=Math.max(es,Math.min(3,Math.floor(qt)));for(let Bt=on;Bt<=3;Bt++){let[Qn,Gn]=Ne(ge[0],ge[1],Bt);Le(We,bs,Bt,Qn,Gn,Hn)}}}}v=We,A++,!ne&&T.obj.visible&&n.sphereScreenPx("Earth_sphere")>=vs.releasePx&&(M.kinds.day.array?M.kinds.night.array||le("night"):le("day"),I=performance.now());let de=performance.now();We.size?I=de:de-I>vs.holdMs&&(M.kinds.day.array||M.kinds.night.array)&&Xe();for(let{kind:_,p:O,r:z,c:se}of We.values()){let _e=M.kinds[_].pages.get(me(_,O,z,se));_e&&(_e.last=A)}let Ae=[...We.values()].filter(_=>!M.kinds[_.kind].pages.has(me(_.kind,_.p,_.r,_.c))&&!M.kinds[_.kind].pending.has(me(_.kind,_.p,_.r,_.c)));Ae.sort((_,O)=>O.p-_.p||_.score-O.score);for(let _ of Ae){if(D>=Ys.maxInflight)break;Se(_)}let b=performance.now()-ue;M.plans++,M.plan_ms_max=Math.max(M.plan_ms_max,b),X&&(g.needsUpdate=!0,X=!1),ve()}function Se(ue){let Re=me(ue.kind,ue.p,ue.r,ue.c);M.kinds[ue.kind].pending.add(Re),D++,(async()=>{let We=await ii(`${e.dir}/${ue.kind}/${ue.p}/${ue.r}_${ue.c}.webp`),Be=await createImageBitmap(new Blob([We],{type:"image/webp"}),{imageOrientation:"from-image",premultiplyAlpha:"none",colorSpaceConversion:"none"});M.tiles_seen++,H.push({...ue,k:Re,bm:Be})})().catch(We=>{console.warn("\uC9C0\uAD6C \uD0C0\uC77C \uC77D\uAE30 \uC2E4\uD328",Re,We),M.kinds[ue.kind].pending.delete(Re)}).finally(()=>{D--,ve()})}function ve(){F===null&&(H.length||L)&&(F=VM(ke))}function je(ue){let Re=M.kinds[ue];if(Re.free.length)return Re.free.pop();let We=null,Be=1/0;for(let[de,Ae]of Re.pages)!v.has(de)&&Ae.last<Be&&(Be=Ae.last,We=de);if(We===null)return-1;let G=Re.pages.get(We);return Re.pages.delete(We),ae(G.kind,G.p,G.r,G.c,0),M.evictions++,G.layer}function Ke(ue,Re,We){let Be=M.kinds[ue].array,G=performance.now(),de=i.state,Ae=i.properties.get(Be).__webglTexture;de.bindTexture(s.TEXTURE_2D_ARRAY,Ae),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.NONE),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,Re,o,o,1,s.RGBA,s.UNSIGNED_BYTE,We),ie=ie||s.createFramebuffer(),W=W||s.createFramebuffer(),de.bindFramebuffer(s.READ_FRAMEBUFFER,ie),de.bindFramebuffer(s.DRAW_FRAMEBUFFER,W);for(let _=1;_<y0;_++)s.framebufferTextureLayer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,Ae,_-1,Re),s.framebufferTextureLayer(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,Ae,_,Re),s.blitFramebuffer(0,0,o>>_-1,o>>_-1,0,0,o>>_,o>>_,s.COLOR_BUFFER_BIT,s.LINEAR);s.framebufferTextureLayer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,null,0,0),s.framebufferTextureLayer(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,null,0,0),de.bindFramebuffer(s.READ_FRAMEBUFFER,null),de.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),de.unbindTexture();let b=performance.now()-G;M.upload_ms_max=Math.max(M.upload_ms_max,b),M.upload_ms.length<400&&M.upload_ms.push(Math.round(b*100)/100),M.uploads++}function ke(){if(F=null,performance.now()-P<Ys.uploadGapMs){ve();return}if(L){if(s.getSyncParameter(L,s.SYNC_STATUS)!==s.SIGNALED){ve();return}s.deleteSync(L),L=null}for(;H.length;){let ue=H.shift(),Re=M.kinds[ue.kind];if(Re.pending.delete(ue.k),!v.has(ue.k)||Re.pages.has(ue.k)){ue.bm.close&&ue.bm.close();continue}Re.array||le(ue.kind);let We=je(ue.kind);if(We<0){M.no_room++,ue.bm.close&&ue.bm.close();continue}Ke(ue.kind,We,ue.bm),ue.bm.close&&ue.bm.close(),Re.pages.set(ue.k,{kind:ue.kind,p:ue.p,r:ue.r,c:ue.c,layer:We,last:A}),ae(ue.kind,ue.p,ue.r,ue.c,We+1),g.needsUpdate=!0,P=performance.now(),L=s.fenceSync(s.SYNC_GPU_COMMANDS_COMPLETE,0),s.flush();break}ve()}function Xe(){for(let ue of["day","night"]){let Re=M.kinds[ue];Re.array&&(Re.array.dispose(),Re.array=null),Re.pages.clear(),Re.free=[],R[ue==="day"?"pDay":"pNight"].value=null}p.fill(0);for(let ue=3;ue<p.length;ue+=4)p[ue]=255;g.needsUpdate=!0,R.pReady.value=0,M.releases++}function ot(){globalThis.__LAGRANGE_TEX2K?ne="test2k":re?ne="software":t.single?ne="single":n.qualityAllowsHiTex()?ne=null:ne="quality";let ue=performance.now();ue-U>=Ys.planMs&&(U=ue,ye())}n.onRender.push(ot);function it(ue=12e4){return new Promise((Re,We)=>{let Be=performance.now(),G=()=>{let de=v,Ae=[...de.values()].some(b=>!M.kinds[b.kind].pages.has(me(b.kind,b.p,b.r,b.c)));de.size&&!Ae&&!H.length&&!D?Re(qe()):performance.now()-Be>ue?We(new Error(`\uD0C0\uC77C \uAE30\uB2E4\uB9BC \uC2DC\uAC04 \uB118\uC74C: \uD544\uC694 ${de.size}, \uC62C\uB9BC ${M.uploads}`)):setTimeout(G,60)};G()})}function qe(){let ue=Re=>({cap:M.kinds[Re].cap,pages:M.kinds[Re].pages.size,pending:M.kinds[Re].pending.size});return{day:ue("day"),night:ue("night"),uploads:M.uploads,upload_ms_max:M.upload_ms_max,upload_ms:M.upload_ms,alloc_ms:M.alloc_ms,evictions:M.evictions,no_room:M.no_room,allocs:M.allocs,releases:M.releases,plans:M.plans,plan_ms_max:M.plan_ms_max,blocked:ne,wanted:v.size,pageKeys:{day:[...M.kinds.day.pages.keys()],night:[...M.kinds.night.pages.keys()]}}}return{tick:ot,snapshot:qe,waitIdle:it,table:g,st:M,desc:e}}var xf={};async function Zn(n,e={}){xf[n]||(xf[n]=ii(n).then(i=>new Blob([i],{type:"image/webp"})));let t=await xf[n];return createImageBitmap(t,{imageOrientation:"from-image",premultiplyAlpha:"none",colorSpaceConversion:"none",...e})}function b0(n,e,t,i){let s=rr==="embedded",r=x0(t,{mobile:i,single:s}),a={moon:null,steps:[],gpu_bytes:0,skipped8k:i?"mobile":s?"single":null,lod:null,earthTiles:null};t.onRender.push(()=>{let l=r.slots.earth_day;l&&(a.earth=l.level);let c=r.slots.moon;if(c&&a.moon!==c.level){a.moon=c.level,c.level==="8k"&&!a.steps.some(h=>h.moon==="8k")&&a.steps.push({moon:"8k",ms:c.steps[c.steps.length-1].ms,px:c.steps[c.steps.length-1].px});let d=c.level==="8k"?(c.last_upload||{}).px||[8192,4096]:c.steps[0].px;a.gpu_bytes=d[0]*d[1]*4*4/3}});async function o(){if(!e.available)return a;let c=(await e.load())["m4.textures"];if(!c||!c.moon)return a;if(c.orient&&c._arrays){let h=ao(c);a.orient=h,t.setSphereOrient("Moon_sphere",u=>h.moon(u)),c.earth&&c.earth.earth_day&&t.setSphereOrient("Earth_sphere",u=>h.earth(u))}else t.setFaceTo("Moon_sphere","Earth");let d=await r.add({id:"moon",body:"earthmoon",sphere:"Moon_sphere",lo:()=>Zn(c.moon.lo.file),hi:()=>Zn(c.moon.hi.file),hiPx:c.moon.hi.size_px,apply:(h,u)=>t.setSphereMap("Moon_sphere",h,u)});if(c.earth&&c.earth.earth_day){for(let[h,u]of[["earth_day","map"],["earth_night","nightMap"]]){let f=c.earth[h];await r.add({id:h,body:"earthmoon",sphere:"Earth_sphere",lo:()=>Zn(f.lo.file),hi:null,apply:(m,x)=>t.setSphereMap("Earth_sphere",m,x,u)})}if(c.earth.land){let h=await Zn(c.earth.land.file),u=t.makeTexture(h,{colorSpace:ci});t.renderer.initTexture(u),h.close&&h.close(),t.setLandMap("Earth_sphere",u)}if(c.earth.clouds){t.addEarthClouds("Earth_sphere");let h=c.earth.clouds;await r.add({id:"earth_clouds",body:"earthmoon",sphere:"Earth_sphere",lo:()=>Zn(h.lo.file),hi:()=>Zn(h.hi.file),hiPx:h.hi.size_px,wrapS:ks,format:_r,colorSpace:ci,anisotropy:2,apply:(u,f)=>t.setCloudMap("Earth_sphere",u,f)})}c.earth.tiles&&!s&&(a.earthTiles=v0(t,c.earth.tiles,{mobile:i,single:s})),a.earth="2k"}if(c.planets&&c.orient){a.planets={};for(let[h,u]of Object.entries(c.planets)){let f=h+"_sphere";t.setSphereOrient(f,lo(u.coef,c.orient.earth.eps_arcsec)),t.setSphereShape(f,u.shape.equator,u.shape.polar),await r.add({id:"planet_"+h,body:h,sphere:f,lo:()=>Zn(u.lo.file),hi:u.hi?()=>Zn(u.hi.file):null,hiPx:u.hi?u.hi.size_px:null,apply:(m,x)=>t.setSphereMap(f,m,x)}),a.planets[h]="2k"}if(c.saturn_ring){let h=c.saturn_ring;t.addSaturnRing("Saturn_sphere",h.inner_km/h.r_eq_km,h.outer_km/h.r_eq_km),await r.add({id:"saturn_ring",body:"Saturn",sphere:"Saturn_sphere",lo:()=>Zn(h.lo.file),hi:()=>Zn(h.hi.file),hiPx:h.hi.size_px,apply:(u,f)=>t.setRingMap("Saturn_sphere",u,f)})}}return a.moon="2k",a.gpu_bytes=d.steps[0].px[0]*d.steps[0].px[1]*4*4/3,a.steps.push({moon:"2k",ms:d.steps[0].ms,px:d.steps[0].px}),!a.skipped8k&&t.maxTextureSize()<c.moon.hi.size_px[0]&&(a.skipped8k="maxTextureSize "+t.maxTextureSize()),a}return{run:o,state:a,lod:r}}var S0=5e10,Js=[[-.4,[.61,.69,1]],[0,[.79,.84,1]],[.4,[.97,.97,1]],[.6,[1,.96,.91]],[.8,[1,.91,.8]],[1.2,[1,.82,.63]],[1.6,[1,.73,.46]],[2,[1,.62,.35]]];function HM(n){if(n<=Js[0][0])return Js[0][1];for(let e=1;e<Js.length;e++)if(n<=Js[e][0]){let[t,i]=Js[e-1],[s,r]=Js[e],a=(n-t)/(s-t);return i.map((o,l)=>o+a*(r[l]-o))}return Js[Js.length-1][1]}function M0(n,e,t){let i=e._arrays,s=i.dir.data,r=i.mag.data,a=i.ci.data,o=t?e.mag_limit_mobile:e.mag_limit,l=[];for(let p=0;p<r.length;p++)r[p]<=o&&l.push(p);let c=new Float32Array(l.length*3),d=new Float32Array(l.length*3),h=new Float32Array(l.length);l.forEach((p,g)=>{for(let y=0;y<3;y++)c[3*g+y]=s[3*p+y]*S0;let T=HM(a[p]),R=Math.min(1,.35+.65*Math.max(0,(o-r[p])/(o+1.5)));d.set(T.map(y=>y*R),3*g),h[g]=Math.min(9,1.2+2.4*Math.max(0,6.5-r[p])**.8)});let u=new Jt;u.setAttribute("position",new nn(c,3)),u.setAttribute("color",new nn(d,3)),u.setAttribute("psize",new nn(h,1));let f=new Ot({uniforms:{pr:{value:n.renderer.getPixelRatio()}},vertexShader:["attribute float psize; varying vec3 vC; uniform float pr;","#include <common>","#include <logdepthbuf_pars_vertex>","void main() { vC = color; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = psize * pr; gl_Position.z = 0.0;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["varying vec3 vC;","#include <common>","#include <logdepthbuf_pars_fragment>","void main() {","#include <logdepthbuf_fragment>","vec2 q = gl_PointCoord - 0.5; float r = length(q) * 2.0; if (r > 1.0) discard;","float a = smoothstep(1.0, 0.0, r); gl_FragColor = vec4(vC * a, a); }"].join(`
`),vertexColors:!0,transparent:!0,depthTest:!1,depthWrite:!1,blending:Yi}),m=new Fs(u,f),x=n.addSky("stars","sky",m,p=>{f.uniforms.pr.value=p.renderer.getPixelRatio()});return x.count=l.length,x}function w0(n,e){let t=e.gal_to_ecl,i=new dt().set(t[0][0],t[1][0],t[2][0],t[0][1],t[1][1],t[2][1],t[0][2],t[1][2],t[2][2]),s=new Ot({uniforms:{...di("map"),Gt:{value:i},gain:{value:0}},vertexShader:["varying vec3 vD;","#include <common>","#include <logdepthbuf_pars_vertex>","void main() { vD = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); gl_Position.z = 0.0;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:[ui("map",!0),"uniform mat3 Gt; uniform float gain; varying vec3 vD;","#include <common>","#include <logdepthbuf_pars_fragment>","void main() {","#include <logdepthbuf_fragment>","vec3 g = normalize(Gt * normalize(vD));","float l = atan(g.y, g.x); float b = asin(clamp(g.z, -1.0, 1.0));","vec2 uv = vec2(0.5 - l / (2.0 * PI), 0.5 - b / PI);","gl_FragColor = vec4(map_sample(uv).rgb * gain, 1.0);","#include <colorspace_fragment>","}"].join(`
`),side:xn,depthTest:!1,depthWrite:!1}),r=new jt(new Ai(S0*1.02,96,48),s),a=n.addSky("milkyway","sky",r);return a.renderOrder=-20,r.renderOrder=-20,a.level=null,a.setTexture=(o,l)=>{o.isTiled||(o.magFilter=Dt),qs(s.uniforms,"map",o),s.uniforms.gain.value=n.tokens.scene.milkyWayGain??.1,a.level=l,a.px=[o.image.width,o.image.height]},a}async function yf(n,e,t,i,s){let r=e.variants,a=r.hi.level||"4k_lossless",o=await i.add({id:"milkyway",sphere:null,mipmaps:!1,wrapS:ks,lo:()=>s(r.lo.file),hi:()=>s(r.hi.file),hiPx:r.hi.size_px,apply:(d,h)=>n.setTexture(d,h==="8k"?a:"2k")}),l=[{level:"2k",ms:o.steps[0].ms}];if(i.tick(),o.blocked)return{level:"2k",steps:l,skipped:o.blocked,hi:Promise.resolve({level:"2k",steps:l,skipped:o.blocked})};let c=i.waitLevel("milkyway","8k",6e5).then(()=>({level:n.level,steps:[...l,{level:n.level,ms:o.steps[o.steps.length-1].ms,upload:o.last_upload}]}));return{level:"2k",steps:l,hi:c}}var $u=nt;function vf(n,e){let t=document.getElementById("error");t.textContent=xe(n,{msg:e}),t.hidden=!1}function E0(){let n=document.getElementById("version");n.textContent=gf($u,ar[Fn()]),document.title=xe("app.title")}async function GM(){let n=d0(location.search);h0(n),Pd(),St(),E0();let e,t={};try{e=await Rs("manifest.json");let F=Fa(e);if(F.length){vf("error.schema",F.join("; "));return}for(let D of e.datasets){let X=await Rs(D.file),ie=ss(X,e.verification.details);if(ie.errors.length){vf("error.schema",`${D.id}: ${ie.errors.join("; ")}`);return}for(let W of ie.warnings)console.warn(D.id,W);X.binary&&(X._arrays=Cs(await ii(X.binary.file),X.binary.arrays)),t[D.id]=X}}catch(F){vf("error.load",F.message);return}let i=e.verification;Tp(i,()=>gf($u,ar[Fn()])),wp(t["stage4a.jwst"]&&t["stage4a.jwst"].join);let s=t["m0.tag_samples"].items.map(F=>yi(F,i,Ol));document.getElementById("samples").replaceChildren(...s);let r=ul(e,"solar"),a=ul(e,"sky"),o=ul(e,"m1test"),l=t["time.utc"],c={t:l._arrays.t_tdb_s.data,u:l._arrays.unix_utc_s.data},d=document.getElementById("ephem-busy"),h=null,u,f;if(r.available)h=_0(r,F=>{d&&(d.hidden=!F)}),await h.init(),u=h.tMin,f=h.tMax;else{let F=t["ephem.earth_moon"]._arrays.t.data;u=F[0],f=F[F.length-1]}let m=Math.floor(Date.now()/6e4)*60,x=c.u,p=n.layout!=="panel"&&m>=x[0]&&m<=x[x.length-1]?zi(m,c):ka(c,Date.now()/1e3),g=Math.min(Math.max(p,u),f);h&&(await h.ensure(g),await h.ensure(Math.max(u,g-30*86400)));let T=null;try{T=await Rs("m4.orbits.json")}catch(F){console.warn("\uACF5\uC804 \uADA4\uB3C4\uC120 \uC790\uB8CC \uC5C6\uC74C",F.message)}let R={constants:e.constants,thetaEpoch:e.scene.theta_epoch_tdb_s,thetaOffset:e.scene.theta_offset_rad,radii:e.scene.radii_km,table:i,screenEph:h,orbitShapes:T,tMin:u,tMax:f,tStart:g,openSource:Ol},y=sf(),M=Dg(document.getElementById("scene"),document.getElementById("labels"),R,n);Fg(M,t,R);let w=zg(M,{...t,...r.datasets},{manifest:e,openSource:Ol}),P=qg(M,{initial:n.layers.initial,persist:n.layers.persist,mobile:y}),v=a0(n,w,M,y,P);P.applyAll(),R.onPick=F=>v.pick(F),R.onZoom=F=>v.zoom(F),M.setCamera({...Un.l2}),v.applyShareHash&&v.applyShareHash(),St(),w.rerender(),M.render(),St(),Or(()=>{E0();for(let F of s)F._render();w.rerender(),kg(),Ap(),P.rerender(),v.renameFocus&&v.renameFocus(),U&&U.rerender&&U.rerender()}),document.getElementById("lang").addEventListener("click",()=>uo(Fn()==="ko"?"en":"ko"));let A=m0(e),U=e.lab?g0({view:M,labApi:A,layers:P,mobile:y,onOpen:()=>{if(v.reveal&&v.reveal(),v.closeInfo)v.closeInfo(!1);else{let F=document.getElementById("info");F&&(F.hidden=!0)}}}):null;U&&(w.views.append(U.button),document.body.append(U.panel),v.setLab&&v.setLab(U),St()),window.lagrange={core:sr,build:$u,loaderMode:rr,manifest:e,datasets:t,i18n:Id,view:M,tokens:n,layout:v,layers:P,lab:A,labUi:U,solar:r,sky:a,m1test:o,screenEph:h,debug:{...M.debug,context:()=>kr({...t,...A.datasets,...r.datasets,...a.datasets,...o.datasets,...I.datasets})}};let I=ul(e,"textures"),L=b0(e,I,M,y);if(window.lagrange.textures=L,window.lagrange.texGroup=I,window.lagrange.texturesDone=L.run().catch(F=>(console.warn("\uD45C\uBA74 \uADF8\uB9BC \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",F),L.state)),window.lagrange.skyDone=(async()=>{if(!a.available)return null;let F=await a.load(),D=M0(M,F["m5.stars"],y),X=w0(M,F["m5.milkyway"]);if(P.applyAll(),n.layout!=="panel"){let ae=await yf(X,F["m5.milkyway"],y,L.lod,Zn);window.lagrange.skyHiDone=ae.hi.then(Le=>({stars:D.count,milkyway:Le}));let{hi:me,...Ne}=ae;return{stars:D.count,milkyway:Ne}}let ie=document.getElementById("credits"),W=()=>{let ae=P.state.stars||P.state.milkyway;ie.hidden=!ae,ie.classList.remove("credits-compact"),ie.replaceChildren(document.createTextNode(xe("sky.credits_stars")+" \xB7 "+xe("sky.credits_mw")+" "),Xn(),document.createTextNode(" \xB7 "+xe("sky.credits_moon")+" \xB7 "+xe("sky.credits_horizons"))),ae&&ie.getBoundingClientRect().height>1.5*parseFloat(getComputedStyle(ie).lineHeight)&&(ie.classList.add("credits-compact"),ie.replaceChildren(document.createTextNode(xe("credits.short"))))};W(),ie.style.cursor="pointer",ie.title=xe("credits.open"),ie.tabIndex=0,ie.setAttribute("role","button");let ne=()=>mo(()=>Fl(Xn));ie.addEventListener("click",ne),ie.addEventListener("keydown",ae=>{(ae.key==="Enter"||ae.key===" ")&&(ae.preventDefault(),ne())}),window.addEventListener("resize",W),document.fonts&&document.fonts.ready&&document.fonts.ready.then(W),P.onChange(W),Or(W);let H=await yf(X,F["m5.milkyway"],y,L.lod,Zn);window.lagrange.skyHiDone=H.hi.then(ae=>({stars:D.count,milkyway:ae}));let{hi:re,...le}=H;return{stars:D.count,milkyway:le}})().catch(F=>(console.warn("\uD558\uB298 \uBC30\uACBD \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",F),null)),rr==="fetch"&&!$u.dev)try{await f0(document.getElementById("update"))}catch(F){console.warn("\uC11C\uBE44\uC2A4 \uC6CC\uCEE4 \uB4F1\uB85D \uC2E4\uD328",F)}document.body.dataset.ready="1"}GM();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
