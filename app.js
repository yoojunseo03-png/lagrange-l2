var yg=Object.defineProperty;var xu=(n,e)=>{for(var t in e)yg(n,t,{get:e[t],enumerable:!0})};var tt={version:"0.0.0",date:"2026-11-12",commit:"768e03d",dirty:!1,dev:!1};var Os={};xu(Os,{KINDS:()=>Fh,ORBIT_GROW:()=>Hh,ORBIT_SAG_FRAC:()=>Vh,ORBIT_STALE_STEPS:()=>Au,SCHEMA:()=>bu,SCHEMA_VERSION:()=>da,SECONDS_PER_DAY:()=>Uh,blendPosition:()=>ns,chunkFor:()=>Eu,decodeBinary:()=>as,eclLonLat:()=>bg,eraFromDu:()=>nf,formatTDB:()=>Vo,formatUTC:()=>ss,galToEcl:()=>wu,inertialToRot:()=>vu,instantLagrange:()=>Tu,lab:()=>Pa,littleEndian:()=>kh,makeContext:()=>lr,makeHermiteGroup:()=>fa,makeOrient:()=>Na,makePlanetOrient:()=>Fa,makeSolarEphem:()=>pa,makeUnits:()=>yu,mul:()=>Wn,nowNodeTdb:()=>ua,orbitGrid:()=>Cu,osculatingPoints:()=>ma,planetAngles:()=>af,pulsatingAxes:()=>Oi,rotAngle:()=>Da,rotToInertial:()=>ca,rotateMany:()=>nr,rotationAngle:()=>Is,runGolden:()=>lf,segmentIndex:()=>is,starAt:()=>Mu,tdbToUnix:()=>Tn,toPulsatingMany:()=>Su,toPulsatingPos:()=>Ds,transpose:()=>Ia,unixToTdb:()=>vi,validateDataset:()=>Fi,validateManifest:()=>ha});var Uh=86400;function yu({length_km:n,time_days:e}){let t=e*86400,i=n/t*1e3;return{length_km:n,time_days:e,time_s:t,velocity_m_s:i,nd_to_km:s=>s*n,km_to_nd:s=>s/n,nd_to_days:s=>s*e,days_to_nd:s=>s/e,nd_to_m_s:s=>s*i,m_s_to_nd:s=>s/i}}function ca(n,e){let[t,i,s,r,a,o]=n,l=Math.cos(e),c=Math.sin(e),u=r-i,h=a+t;return[l*t-c*i,c*t+l*i,s,l*u-c*h,c*u+l*h,o]}function vu(n,e){let[t,i,s,r,a,o]=n,l=Math.cos(e),c=Math.sin(e),u=l*t+c*i,h=-c*t+l*i,d=l*r+c*a,f=-c*r+l*a;return[u,h,s,d+h,f-u,o]}function ns(n,e,t){let[i,s,r]=n,a=t*e,o=Math.cos(a),l=Math.sin(a);return[o*i-l*s,l*i+o*s,r]}function nr(n,e,t){let i=Math.cos(e),s=Math.sin(e);for(let r=0;r<n.length;r+=3){let a=n[r],o=n[r+1];t[r]=i*a-s*o,t[r+1]=s*a+i*o,t[r+2]=n[r+2]}return t}function Is(n,e){return n/e}function is(n,e){let t=0,i=n.length;for(;t<i;){let s=t+i>>1;n[s]<=e?t=s+1:i=s}return Math.min(Math.max(t-1,0),n.length-2)}function Tn(n,e){let t=e.t,i=e.u;if(!(n>=t[0]&&n<=t[t.length-1]))throw new RangeError("UTC \uD658\uC0B0\uD45C \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01");let s=is(t,n);return i[s]+(n-t[s])/(t[s+1]-t[s])*(i[s+1]-i[s])}function ua(n,e){let t=n.u;return e<t[0]?n.t[0]:e>=t[t.length-1]?n.t[t.length-1]:n.t[is(t,e)]}function vi(n,e){let t=e.t,i=e.u;if(!(n>=i[0]&&n<=i[i.length-1]))throw new RangeError("UTC \uD658\uC0B0\uD45C \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01");let s=is(i,n);return t[s]+(n-i[s])/(i[s+1]-i[s])*(t[s+1]-t[s])}function ss(n){return new Date(Math.floor(n/60)*6e4).toISOString().slice(0,16).replace("T"," ")}function Vo(n){let e=Date.UTC(2e3,0,1,12,0,0);return new Date(e+Math.round(n)*1e3).toISOString().slice(0,19).replace("T"," ")}var bu="lagrange-web",da="1.0.0",Fh=["points","vectors","trajectory","ensemble","ephemeris","grid2d","scalars","stars","image","model"],rs=n=>n!==null&&typeof n=="object"&&!Array.isArray(n),Ho=n=>parseInt(String(n).split(".")[0],10),Oh=n=>typeof n=="string"&&n.split(".").length===3;function ha(n){let e=[];if(!rs(n))return["manifest \uAC00 \uAC1D\uCCB4\uAC00 \uC544\uB2D8"];n.schema!==bu&&e.push(`schema \uAC00 ${bu} \uAC00 \uC544\uB2D8`);let t=n.schema_version;Oh(t)?Ho(t)!==Ho(da)&&e.push(`\uC8FC \uBC88\uD638 \uB2E4\uB984 (${t}, \uC77D\uB294 \uCABD ${da})`):e.push("schema_version \uD615\uC2DD (\uC8FC.\uBD80.\uC218) \uC544\uB2D8");let i=n.constants;if(!rs(i))e.push("constants \uC5C6\uC74C");else for(let r of["mu","length_unit_km","time_unit_days"])typeof i[r]=="number"&&i[r]>0||e.push(`constants.${r} \uAC00 \uC591\uC218\uAC00 \uC544\uB2D8`);let s=n.datasets;if(!Array.isArray(s))e.push("datasets \uAC00 \uBAA9\uB85D\uC774 \uC544\uB2D8");else{let r=s.map(a=>rs(a)?a.id:null);new Set(r).size!==r.length&&e.push("datasets id \uC911\uBCF5");for(let a of s)(!rs(a)||typeof a.id!="string"||typeof a.file!="string")&&e.push("datasets \uD56D\uBAA9\uC5D0 id\xB7file \uC5C6\uC74C")}return e}function Fi(n,e){let t=[],i=[];if(!rs(n))return{errors:["\uC790\uB8CC\uAC00 \uAC1D\uCCB4\uAC00 \uC544\uB2D8"],warnings:i};let s=n.schema_version;Oh(s)?Ho(s)!==Ho(da)&&t.push(`\uC8FC \uBC88\uD638 \uB2E4\uB984 (${s}, \uC77D\uB294 \uCABD ${da})`):t.push("schema_version \uD615\uC2DD (\uC8FC.\uBD80.\uC218) \uC544\uB2D8"),typeof n.id!="string"&&t.push("id \uC5C6\uC74C"),Fh.includes(n.kind)||i.push(`\uBAA8\uB974\uB294 kind: ${JSON.stringify(n.kind)}`);let r=n.provenance;if(!rs(r))t.push("provenance \uC5C6\uC74C");else{let a=r.verification;(!rs(a)||!Object.prototype.hasOwnProperty.call(e,a.detail)||e[a.detail].tag!==a.tag)&&t.push("provenance.verification \uC758 tag\xB7detail \uC774 \uAF2C\uB9AC\uD45C \uD45C\uC640 \uB9DE\uC9C0 \uC54A\uC74C"),(!Array.isArray(r.source)||r.source.length===0)&&t.push("provenance.source \uC5C6\uC74C")}if(n.kind==="scalars"){let a=Array.isArray(n.items)?n.items:[null];for(let o of a)(!rs(o)||typeof o.text!="string"||!("provenance"in o))&&t.push("scalars \uD56D\uBAA9\uC5D0 text\xB7provenance \uC5C6\uC74C")}return{errors:t,warnings:i}}function kh(){return new Uint8Array(new Float64Array([1]).buffer)[7]===63}function as(n,e){if(!kh())throw new Error("\uBE45\uC5D4\uB514\uC5B8 \uAE30\uACC4\uB294 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC74C (\uC790\uB8CC\uB294 float64 \uB9AC\uD2C0\uC5D4\uB514\uC5B8)");let t=n.byteOffset%8===0?n.buffer:n.slice().buffer,i=n.byteOffset%8===0?n.byteOffset:0,s={};for(let[r,{offset:a,shape:o}]of Object.entries(e)){let l=o.reduce((c,u)=>c*u,1);s[r]={data:new Float64Array(t,i+a*8,l),shape:o}}return s}function fa(n,e,t,i){let s=n.length;function r(a){if(!(a>=n[0]&&a<=n[s-1]))throw new RangeError(`\uBCF4\uAC04 \uBC94\uC704 \uBC16\uC758 \uC2DC\uAC01 ${a}`);let o=is(n,a),l=n[o+1]-n[o],c=(a-n[o])/l,u=c*c,h=c*c*c,d=2*h-3*u+1,f=h-2*u+c,m=-2*h+3*u,x=h-u,p=6*u-6*c,g=3*u-4*c+1,A=-6*u+6*c,R=3*u-2*c,v=[],w=[];for(let M=0;M<i;M++){let E=[0,0,0],y=[0,0,0];for(let T=0;T<3;T++){let P=(o*i+M)*3+T,k=((o+1)*i+M)*3+T,U=e[P],z=e[k],F=t[P]*l,q=t[k]*l;E[T]=d*U+f*F+m*z+x*q,y[T]=(p*U+g*F+A*z+R*q)/l}v.push(E),w.push(y)}return{pos:v,vel:w}}return{evaluate:r,tMin:n[0],tMax:n[s-1],k:i}}var Bh=(n,e)=>[n[1]*e[2]-n[2]*e[1],n[2]*e[0]-n[0]*e[2],n[0]*e[1]-n[1]*e[0]],zh=n=>Math.sqrt(n[0]*n[0]+n[1]*n[1]+n[2]*n[2]);function Oi(n,e,t,i){let s=[t[0]-n[0],t[1]-n[1],t[2]-n[2]],r=[i[0]-e[0],i[1]-e[1],i[2]-e[2]],a=zh(s),o=[s[0]/a,s[1]/a,s[2]/a],l=Bh(s,r),c=zh(l),u=[l[0]/c,l[1]/c,l[2]/c],h=Bh(u,o);return{x:o,y:h,z:u,d:a,origin:t}}function Ds(n,e){let t=[n[0]-e.origin[0],n[1]-e.origin[1],n[2]-e.origin[2]],i=s=>s[0]*t[0]+s[1]*t[1]+s[2]*t[2];return[i(e.x)/e.d,i(e.y)/e.d,i(e.z)/e.d]}function Su(n,e,t,i){let[s,r,a]=[e[0]-t.origin[0],e[1]-t.origin[1],e[2]-t.origin[2]],{x:o,y:l,z:c,d:u}=t;for(let h=0;h<n.length;h+=3){let d=n[h]+s,f=n[h+1]+r,m=n[h+2]+a;i[h]=(o[0]*d+o[1]*f+o[2]*m)/u,i[h+1]=(l[0]*d+l[1]*f+l[2]*m)/u,i[h+2]=(c[0]*d+c[1]*f+c[2]*m)/u}return i}function Mu(n,e){let t=n.dir.data;return{dir:[t[3*e],t[3*e+1],t[3*e+2]],mag:n.mag.data[e],ci:n.ci.data[e],hyg_id:n.hyg_id.data[e]}}function wu(n,e){return[0,1,2].map(t=>n[t][0]*e[0]+n[t][1]*e[1]+n[t][2]*e[2])}function bg(n){let e=Math.atan2(n[1],n[0])*180/Math.PI;return[e<0?e+360:e,Math.asin(n[2])*180/Math.PI]}function Eu(n,e){let t=n.chunks;if(e<t[0].t_from_tdb_s)return t[0];for(let i of t)if(e<=i.t_to_tdb_s)return i;return t[t.length-1]}function pa(n,e={}){let t={};function i(s,r){let a=n.chunks.find(l=>l.year===s);if(!a)throw new Error(`\uC870\uAC01 ${s} \uC5C6\uC74C`);let o={};for(let l of n.bodies){let[c,u]=a.index[l.name],h=new Float64Array(u-c+1);for(let d=c;d<=u;d++)h[d-c]=l.t0_tdb_s+d*l.step_s;o[l.name]=fa(h,r["R_"+l.name].data,r["V_"+l.name].data,1)}t[s]=o}for(let[s,r]of Object.entries(e))i(Number(s),r);return{bodies:n.bodies,range:n.range_tdb_s,chunks:n.chunks,addChunk:i,hasChunk:s=>!!t[s],chunkFor:s=>Eu(n,s),evaluate(s,r,a){let o=a??Eu(n,r).year;if(!t[o])throw new Error(`\uC870\uAC01 ${o} \uB97C \uC544\uC9C1 \uBD88\uB7EC\uC624\uC9C0 \uC54A\uC558\uB2E4`);let l=t[o][s].evaluate(r);return{pos:l.pos[0],vel:l.vel[0]}}}}function Tu(n,e,t,i,s,r){let a=Oi(n,e,t,i),o=[r[0]-(1-s),r[1],0];return[0,1,2].map(l=>t[l]+a.d*(a.x[l]*o[0]+a.y[l]*o[1]+a.z[l]*o[2]))}function ma(n,e,t,i,s,r,a){let o=n[0]-t[0],l=n[1]-t[1],c=n[2]-t[2],u=e[0]-i[0],h=e[1]-i[1],d=e[2]-i[2],f=Math.sqrt(o*o+l*l+c*c),m=u*u+h*h+d*d,x=2/f-m/s;if(!(x>0))return null;let p=1/x,g=Math.sqrt(s),A=Math.sqrt(p),R=(o*u+l*h+c*d)/g,v=r.length;for(let w=0;w<v;w++){let M=1-Math.cos(r[w]),E=Math.sin(r[w]),y=1-p/f*M,T=(p*R*M+f*A*E)/g;a[3*w]=y*o+T*u,a[3*w+1]=y*l+T*h,a[3*w+2]=y*c+T*d}return a[3*v-3]=a[0],a[3*v-2]=a[1],a[3*v-1]=a[2],{a:p,speed:Math.sqrt(m)}}var Vh=.0025,Hh=1.2,Au=5;function Cu(n,e,t,i=1){let s=Math.sqrt(8*Vh*t*n*(1-e*e)),r=i*Math.PI/180,a=[],o=0,l=s/n;for(;l<r&&o+l<Math.PI;)o+=l,a.push(o),l*=Hh;let c=Math.ceil((Math.PI-o)/r);for(let h=1;h<c;h++)a.push(o+(Math.PI-o)*h/c);a.push(Math.PI);let u=new Float64Array(2*a.length+1);return a.forEach((h,d)=>{u[a.length+1+d]=h,u[a.length-1-d]=-h}),{dE:u,stepKm:s}}var Pa={};xu(Pa,{Dop853:()=>Aa,GELU_C:()=>va,brentq:()=>qo,clampToRange:()=>Ma,components:()=>Ns,correctedEu:()=>ga,createRun:()=>Ca,efoldState:()=>Jo,escapeRun:()=>Bu,fromSliders:()=>jo,inTrainingRange:()=>Us,integrateOne:()=>$o,integrateTo:()=>Yo,jacobi:()=>Fs,labFlags:()=>ir,lnT3:()=>_a,makeLab:()=>Ra,nextUp:()=>ku,omega:()=>Iu,positionBound:()=>xa,predict:()=>rr,predictD24:()=>ya,predictMLP:()=>Sa,predictMLPSeeds:()=>ba,predictState:()=>zu,readForest:()=>Pu,rhs:()=>wa,rhsDelta:()=>Ea,roomFor:()=>Lu,stateOf:()=>Go,toSliders:()=>Xo});function Ns(n,e){let t=new Array(6);for(let s=0;s<6;s++)t[s]=e[s]-n.s_ref[s];let i=new Array(6);for(let s=0;s<6;s++){let r=0;for(let a=0;a<6;a++)r+=t[a]*n.P_inv[6*s+a];i[s]=r}return i}function Go(n,e){let t=new Array(6);for(let i=0;i<6;i++){let s=0;for(let r=0;r<6;r++)s+=e[r]*n.P[6*i+r];t[i]=n.s_ref[i]+s}return t}function ga(n,e){let t=n.frame.gamma,i=[e[1]/t,e[2]/t,e[3]/t,e[4]/t,e[5]/t],s=0;for(let r=0;r<5;r++)for(let a=0;a<5;a++)s+=i[r]*n.M[5*r+a]*i[a];return e[0]+t*s}function Ru(n,e,t,i){let{lam:s,w_p:r,w_z:a}=n.frame,o=Math.cos(r*t),l=Math.sin(r*t),c=Math.cos(a*t),u=Math.sin(a*t),h=[e[0]*Math.exp(s*t),e[1]*Math.exp(-s*t),e[2]*o+e[3]*l,-e[2]*l+e[3]*o,e[4]*c+e[5]*u,-e[4]*u+e[5]*c],d=0;for(let f=0;f<3;f++){let m=0;for(let x=0;x<6;x++)m+=h[x]*n.P[6*f+x];d+=m*m}return Math.sqrt(d)-i}function Sg(n,e,t,i=60){let s=n.frame.lam,r=Math.log(t/Math.abs(e[0]))/s,a=Math.max(r-.25/s,0),o=r+.25/s,l=Ru(n,e,a,t)<0&&Ru(n,e,o,t)>0;for(let c=0;c<i;c++){let u=.5*(a+o);Ru(n,e,u,t)>0?o=u:a=u}return l?.5*(a+o)*n.frame.time_unit_days:NaN}function _a(n,e,t){let i=[t,e[1],e[2],e[3],e[4],e[5]];return n.R.map(s=>Math.log(Sg(n,i,s)))}function xa(n,e){let{env_p:t,env_z:i}=n.frame;return Math.abs(e[0])+Math.abs(e[1])+t*Math.hypot(e[2],e[3])+i*Math.hypot(e[4],e[5])}function Us(n,e){let t=n.frame.gamma,i=n.range,s=Math.abs(e[0])/t;return s>=i.eu_gamma[0]*(1-i.rtol)&&s<=i.eu_gamma[1]*(1+i.rtol)&&xa(n,e)/t<=i.disp_max_gamma*(1+i.rtol)}var Mg=new TextDecoder("utf-8");function Pu(n){let e=n.indexOf(10),t=JSON.parse(Mg.decode(n.subarray(0,e)));if(t.\uD615\uC2DD!=="lagrange-forest"||t.\uD310!==1||t.\uC885\uB958!=="RF"||t.\uC232_\uC218!==1)throw new Error("\uBAA8\uB974\uB294 \uC232 \uD615\uC2DD");let i=t.\uCD9C\uB825_\uC218,s=e+1,r=(l,c,u)=>{let h=new u(n.slice(s,s+l*c).buffer);return s+=l*c,h},a=new DataView(n.buffer,n.byteOffset,n.byteLength),o=[];for(let l=0;l<t.\uB098\uBB34_\uC218[0];l++){let c=a.getInt32(s,!0);s+=4;let u=r(c,1,Int8Array),h=r(c,8,Float64Array),d=r(c,4,Int32Array),f=r(c,4,Int32Array),m=0;for(let p=0;p<c;p++)u[p]<0&&m++;let x=r(m*i,8,Float64Array);o.push({F:u,T:h,L:d,R:f,V:x})}if(s!==n.length)throw new Error(`\uC232 \uBC14\uC774\uD2B8\uAC00 ${n.length-s} \uB0A8\uC74C`);return{head:t,trees:o,nOut:i,mean:t.\uD45C\uC900\uD654_\uD3C9\uADE0,std:t.\uD45C\uC900\uD654_\uD45C\uC900\uD3B8\uCC28,residual:!!t.\uC794\uCC28}}function Wo(n,e,t={}){let i=t.float32!==!1,s=new Array(e.length);for(let a=0;a<e.length;a++)s[a]=i?Math.fround(e[a]):e[a];let r=new Array(n.nOut).fill(0);for(let a of n.trees){let o=0;for(;a.F[o]>=0;)o=s[a.F[o]]<=a.T[o]?a.L[o]:a.R[o];let l=a.L[o]*n.nOut;for(let c=0;c<n.nOut;c++)r[c]+=a.V[l+c]}for(let a=0;a<n.nOut;a++)r[a]/=n.trees.length;return r}function wg(n,e){return e.map((t,i)=>(t-n.mean[i])/n.std[i])}function ya(n,e,t){let i=Wo(n,wg(n,e));return n.residual?i.map((s,r)=>t[r]+s):i}var va=.7071067690849304,Eg=1.1283791670955126,Tg=.5641895835477563;function Ag(n){let e=n*n,t=n,i=n;for(let s=1;s<200&&(t*=2*e/(2*s+1),i+=t,!(Math.abs(t)<1e-17*Math.abs(i)));s++);return Eg*Math.exp(-e)*i}function Cg(n){let t=n,i=n,s=0;for(let r=1;r<500;r++){let a=r/2;s=n+a*s,s===0&&(s=1e-300),s=1/s,i=n+a/i,i===0&&(i=1e-300);let o=i*s;if(t*=o,Math.abs(o-1)<1e-17)break}return Tg*Math.exp(-n*n)/t}function Rg(n){if(Number.isNaN(n))return NaN;let e=Math.abs(n),t;return e<3?t=1-Ag(e):t=Cg(e),n<0?2-t:t}function Pg(n,e,t){let i=e.map((o,l)=>(o-n.x_mean[l])/n.x_std[l]);for(let o=0;o<n.W.length;o++){let[l,c]=n.dims[o],u=n.W[o],h=n.b[o],d=new Array(c);for(let f=0;f<c;f++){let m=0;for(let x=0;x<l;x++)m+=i[x]*u[x*c+f];d[f]=m+h[f]}i=d.map(f=>.5*f*Rg(-f*t))}let s=i.length,r=n.bo.length,a=new Array(r);for(let o=0;o<r;o++){let l=0;for(let c=0;c<s;c++)l+=i[c]*n.Wo[c*r+o];a[o]=(l+n.bo[o])*n.y_std[o]+n.y_mean[o]}return a}function ba(n,e){let t=e[0],i=[Math.sign(t),Math.log(Math.abs(t)),...e.slice(1)];return n.seeds.map(s=>Pg(s,i,va))}function Sa(n,e){let t=ba(n,e);return t[0].map((i,s)=>{let r=0;for(let a of t)r+=a[s];return r/t.length})}function jo(n,e){let t=n.frame.gamma;return[e.sign*e.eu*t,e.es*t,e.ap*t*Math.cos(e.phip),e.ap*t*Math.sin(e.phip),e.az*t*Math.cos(e.phiz),e.az*t*Math.sin(e.phiz)]}function Xo(n,e){let t=n.frame.gamma,i=s=>{let r=Math.atan2(s[1],s[0]);return r<0?r+2*Math.PI:r};return{sign:e[0]<0?-1:1,eu:Math.abs(e[0])/t,es:e[1]/t,ap:Math.hypot(e[2],e[3])/t,phip:i([e[2],e[3]]),az:Math.hypot(e[4],e[5])/t,phiz:i([e[4],e[5]])}}function Lu(n,e,t){let{env_p:i,env_z:s}=n.frame,r=n.range.disp_max_gamma,a={eu:e.eu,es:Math.abs(e.es),ap:i*e.ap,az:s*e.az},o=r;for(let[c,u]of Object.entries(a))c!==t&&(o-=u);let l={eu:1,es:1,ap:i,az:s}[t];return Math.max(0,o)/l}function Ma(n,e,t){let i={...e},s=Lu(n,e,t);return t==="eu"?i.eu=Math.min(Math.max(e.eu,n.range.eu_gamma[0]),Math.min(n.range.eu_gamma[1],s)):t==="es"?i.es=Math.sign(e.es)*Math.min(Math.abs(e.es),s):(t==="ap"||t==="az")&&(i[t]=Math.min(e[t],s)),i}function ir(n,e){let t=n.uncertain,i=ba(n.mlp,e.x),s=i.length,r=e.MLP.map((l,c)=>{let u=0;for(let h of i)u+=(h[c]-l)**2;return Math.sqrt(u/(s-1))}),a=e.MLP.map((l,c)=>Math.abs(l-e.T3[c])>t.factor*t.rmse_log_mlp[c]),o=r.map((l,c)=>l>t.factor*t.spread_median[c]);return{inRange:Us(n,e.x.slice(0,6)),mismatch:a,spread:o,uncertain:a.map((l,c)=>l||o[c]),seedStd:r,positionBound:xa(n,e.x.slice(0,6))}}function Gh(n,e,t,i){let s=Math.sqrt((n+i)**2+e**2+t**2),r=Math.sqrt((n-1+i)**2+e**2+t**2);return[s,r]}function Iu(n,e){let[t,i,s]=n,[r,a]=Gh(t,i,s,e);return .5*(t**2+i**2)+(1-e)/r+e/a}function wa(n,e){let[t,i,s,r,a,o]=n,[l,c]=Gh(t,i,s,e),u=l**3,h=c**3,d=t-(1-e)*(t+e)/u-e*(t-1+e)/h,f=i-(1-e)*i/u-e*i/h,m=-(1-e)*s/u-e*s/h;return[r,a,o,2*a+d,-2*r+f,m]}function Fs(n,e){return 2*Iu(n,e)-(n[3]**2+n[4]**2+n[5]**2)}function Ea(n,e,t){let i=new Array(6);for(let s=0;s<6;s++)i[s]=t[s]+n[s];return wa(i,e)}var Du=[0,.05260015195876773,.0789002279381516,.1183503419072274,.2816496580927726,.3333333333333333,.25,.3076923076923077,.6512820512820513,.6,.8571428571428571,1,1,.1,.2,.7777777777777778],Wh=[.054293734116568765,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,.3111643669578199,-.1521609496625161,.20136540080403034,.04471061572777259],jh=[-.18980075407240762,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,-.4226823213237919,-.1521609496625161,.20136540080403034,.02265179219836082,0],Xh=[.01312004499419488,0,0,0,0,-1.2251564463762044,-.4957589496572502,1.6643771824549864,-.35032884874997366,.3341791187130175,.08192320648511571,-.022355307863886294,0],Nu=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.05260015195876773,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.0197250569845379,.0591751709536137,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[.02958758547680685,0,.08876275643042054,0,0,0,0,0,0,0,0,0,0,0,0,0],[.2413651341592667,0,-.8845494793282861,.924834003261792,0,0,0,0,0,0,0,0,0,0,0,0],[.037037037037037035,0,0,.17082860872947386,.12546768756682242,0,0,0,0,0,0,0,0,0,0,0],[.037109375,0,0,.17025221101954405,.06021653898045596,-.017578125,0,0,0,0,0,0,0,0,0,0],[.03709200011850479,0,0,.17038392571223998,.10726203044637328,-.015319437748624402,.008273789163814023,0,0,0,0,0,0,0,0,0],[.6241109587160757,0,0,-3.3608926294469414,-.868219346841726,27.59209969944671,20.154067550477894,-43.48988418106996,0,0,0,0,0,0,0,0],[.47766253643826434,0,0,-2.4881146199716677,-.590290826836843,21.230051448181193,15.279233632882423,-33.28821096898486,-.020331201708508627,0,0,0,0,0,0,0],[-.9371424300859873,0,0,5.186372428844064,1.0914373489967295,-8.149787010746927,-18.52006565999696,22.739487099350505,2.4936055526796523,-3.0467644718982196,0,0,0,0,0,0],[2.273310147516538,0,0,-10.53449546673725,-2.0008720582248625,-17.9589318631188,27.94888452941996,-2.8589982771350235,-8.87285693353063,12.360567175794303,.6433927460157636,0,0,0,0,0],[.054293734116568765,0,0,0,0,4.450312892752409,1.8915178993145003,-5.801203960010585,.3111643669578199,-.1521609496625161,.20136540080403034,.04471061572777259,0,0,0,0],[.056167502283047954,0,0,0,0,0,.25350021021662483,-.2462390374708025,-.12419142326381637,.15329179827876568,.00820105229563469,.007567897660545699,-.008298,0,0,0],[.03183464816350214,0,0,0,0,.028300909672366776,.053541988307438566,-.05492374857139099,0,0,-.00010834732869724932,.0003825710908356584,-.00034046500868740456,.1413124436746325,0,0],[-.42889630158379194,0,0,0,0,-4.697621415361164,7.683421196062599,4.06898981839711,.3567271874552811,0,0,0,-.0013990241651590145,2.9475147891527724,-9.15095847217987,0]],qh=[[-8.428938276109013,0,0,0,0,.5667149535193777,-3.0689499459498917,2.38466765651207,2.117034582445028,-.871391583777973,2.2404374302607883,.6315787787694688,-.08899033645133331,18.148505520854727,-9.194632392478356,-4.436036387594894],[10.427508642579134,0,0,0,0,242.28349177525817,165.20045171727028,-374.5467547226902,-22.113666853125306,7.733432668472264,-30.674084731089398,-9.332130526430229,15.697238121770845,-31.139403219565178,-9.35292435884448,35.81684148639408],[19.985053242002433,0,0,0,0,-387.0373087493518,-189.17813819516758,527.8081592054236,-11.57390253995963,6.8812326946963,-1.0006050966910838,.7777137798053443,-2.778205752353508,-60.19669523126412,84.32040550667716,11.99229113618279],[-25.69393346270375,0,0,0,0,-154.18974869023643,-231.5293791760455,357.6391179106141,93.40532418362432,-37.45832313645163,104.0996495089623,29.8402934266605,-43.53345659001114,96.32455395918828,-39.17726167561544,-149.72683625798564]];function qo(n,e,t,i,s,r=100){let a=e,o=t,l=0,c=0,u=0,h=0,d=n(a),f=n(o);if(d===0)return a;if(f===0)return o;let m=x=>x<0||Object.is(x,-0);if(m(d)===m(f))throw new Error("brentq: \uAD6C\uAC04 \uB05D\uC758 \uBD80\uD638\uAC00 \uAC19\uB2E4");for(let x=0;x<r;x++){d!==0&&f!==0&&m(d)!==m(f)&&(l=a,c=d,u=h=o-a),Math.abs(c)<Math.abs(f)&&(a=o,o=l,l=a,d=f,f=c,c=d);let p=(i+s*Math.abs(o))/2,g=(l-o)/2;if(f===0||Math.abs(g)<p)return o;if(Math.abs(u)>p&&Math.abs(f)<Math.abs(d)){let A;if(a===l)A=-f*(o-a)/(f-d);else{let R=(d-f)/(a-o),v=(c-f)/(l-o);A=-f*(c*v-d*R)/(v*R*(c-d))}2*Math.abs(A)<Math.min(Math.abs(u),3*Math.abs(g)-p)?(u=h,h=A):(u=g,h=g)}else u=g,h=g;a=o,d=f,Math.abs(h)>p?o+=h:o+=g>0?p:-p,f=n(o)}throw new Error("brentq: \uC218\uB834 \uC548 \uD568")}var $h=.9,Dg=.2,Jh=10,Zh=2220446049250313e-31,Ta=12,Kh=-1/8;function ku(n){if(Number.isNaN(n)||n===1/0)return n;if(n===0)return Number.MIN_VALUE;let e=new DataView(new ArrayBuffer(8));e.setFloat64(0,n);let t=e.getUint32(0),i=e.getUint32(4);return n>0?i===4294967295?(e.setUint32(0,t+1),e.setUint32(4,0)):e.setUint32(4,i+1):i===0?(e.setUint32(0,t-1),e.setUint32(4,4294967295)):e.setUint32(4,i-1),e.getFloat64(0)}var Ou=n=>{let e=0;for(let t of n)e+=t*t;return Math.sqrt(e)},Fu=n=>Ou(n)/n.length**.5;function Ng(n,e,t,i,s,r,a,o,l){let c=t.length,u=Math.abs(i-e);if(u===0)return 0;let h=t.map(R=>l+Math.abs(R)*o),d=Fu(t.map((R,v)=>R/h[v])),f=Fu(r.map((R,v)=>R/h[v])),m=d<1e-5||f<1e-5?1e-6:.01*d/f;m=Math.min(m,u);let x=new Array(c);for(let R=0;R<c;R++)x[R]=t[R]+m*1*r[R];let p=n(e+m*1,x),g=Fu(p.map((R,v)=>(R-r[v])/h[v]))/m,A=f<=1e-15&&g<=1e-15?Math.max(1e-6,m*.001):(.01/Math.max(f,g))**(1/(a+1));return Math.min(100*m,A,u,s)}var Aa=class{constructor(e,t,i,s,r,a,o=1/0){this.nfev=0,this.fun=(l,c)=>(this.nfev++,e(l,c)),this.t=t,this.y=i.slice(),this.tBound=s,this.rtol=r,this.atol=a,this.maxStep=o,this.n=i.length,this.status="running",this.tOld=null,this.yOld=null,this.hPrevious=null,this.f=this.fun(this.t,this.y),this.hAbs=Ng(this.fun,this.t,this.y,s,o,this.f,7,r,a),this.Kx=Array.from({length:16},()=>new Array(this.n).fill(0))}_rkStep(e,t,i,s){let r=this.n,a=this.Kx,o=Nu,l=Du,c=Wh;a[0]=i.slice();for(let d=1;d<Ta;d++){let f=new Array(r);for(let m=0;m<r;m++){let x=0;for(let p=0;p<d;p++)x+=a[p][m]*o[d][p];f[m]=t[m]+x*s}a[d]=this.fun(e+l[d]*s,f)}let u=new Array(r);for(let d=0;d<r;d++){let f=0;for(let m=0;m<Ta;m++)f+=a[m][d]*c[m];u[d]=t[d]+s*f}let h=this.fun(e+s,u);return a[Ta]=h,[u,h]}_errorNorm(e,t){let i=this.n,s=this.Kx,r=new Array(i),a=new Array(i);for(let u=0;u<i;u++){let h=0,d=0;for(let f=0;f<=Ta;f++)h+=s[f][u]*Xh[f],d+=s[f][u]*jh[f];r[u]=h/t[u],a[u]=d/t[u]}let o=Ou(r)**2,l=Ou(a)**2;if(o===0&&l===0)return 0;let c=o+.01*l;return Math.abs(e)*o/Math.sqrt(c*i)}step(){if(this.status!=="running")throw new Error("\uB05D\uB09C \uD480\uC774\uAE30");if(this.t===this.tBound)return this.tOld=this.t,this.status="finished",this.status;let e=this.t,t=this.y,i=10*Math.abs(ku(e)-e),s=this.hAbs>this.maxStep?this.maxStep:this.hAbs<i?i:this.hAbs,r=!1,a=!1,o,l,c,u;for(;!r;){if(s<i)return this.status="failed",this.message="\uAC78\uC74C\uC774 \uB108\uBB34 \uC791\uC74C",this.status;u=s,c=e+u,c-this.tBound>0&&(c=this.tBound),u=c-e,s=Math.abs(u),[o,l]=this._rkStep(e,t,this.f,u);let h=new Array(this.n);for(let f=0;f<this.n;f++)h[f]=this.atol+Math.max(Math.abs(t[f]),Math.abs(o[f]))*this.rtol;let d=this._errorNorm(u,h);if(d<1){let f=d===0?Jh:Math.min(Jh,$h*d**Kh);a&&(f=Math.min(1,f)),s*=f,r=!0}else s*=Math.max(Dg,$h*d**Kh),a=!0}return this.hPrevious=u,this.yOld=t,this.t=c,this.y=o,this.hAbs=s,this.f=l,this.tOld=e,this.t-this.tBound>=0&&(this.status="finished"),this.status}dense(){let e=this.n,t=this.Kx,i=Nu,s=Du,r=this.hPrevious,a=this.tOld,o=this.yOld;for(let u=Ta+1;u<16;u++){let h=new Array(e);for(let d=0;d<e;d++){let f=0;for(let m=0;m<u;m++)f+=t[m][d]*i[u][m];h[d]=o[d]+f*r}t[u]=this.fun(a+s[u]*r,h)}let l=Array.from({length:7},()=>new Array(e)),c=t[0];for(let u=0;u<e;u++){let h=this.y[u]-o[u];l[0][u]=h,l[1][u]=r*c[u]-h,l[2][u]=2*h-r*(this.f[u]+c[u])}for(let u=0;u<4;u++)for(let h=0;h<e;h++){let d=0;for(let f=0;f<16;f++)d+=qh[u][f]*t[f][h];l[3+u][h]=r*d}return Ug(a,this.t,o,l)}};function Ug(n,e,t,i){let s=e-n,r=t.length;return a=>{let o=(a-n)/s,l=new Array(r).fill(0);for(let c=0;c<i.length;c++){let u=i[i.length-1-c],h=c%2===0?o:1-o;for(let d=0;d<r;d++)l[d]=(l[d]+u[d])*h}for(let c=0;c<r;c++)l[c]+=t[c];return l}}function Ca(n,e,t,i,s,r,a=[],o=null){let l=new Aa(n,e,t,i,s,r),c=a.map(x=>x.terminal?1:1/0),u=a.map(()=>0),h=a.map(()=>[]),d=a.map(()=>[]),f=a.map(x=>x.g(e,t)),m={solver:l,tEvents:h,yEvents:d,status:"running",t:e,y:t.slice(),nsteps:0};return m.advance=(x=1/0)=>{for(let p=0;p<x&&m.status==="running";p++){if(l.step(),m.nsteps++,l.status==="failed"){m.status="failed",m.message=l.message;break}let g=l.t,A=l.y,R=l.tOld;if(a.length){let v=a.map(M=>M.g(g,A)),w=[];for(let M=0;M<a.length;M++){let E=f[M]<=0&&v[M]>=0,y=f[M]>=0&&v[M]<=0,T=a[M].direction;(E&&T>0||y&&T<0||(E||y)&&T===0)&&w.push(M)}if(w.length){let M=l.dense();for(let P of w)u[P]++;let E=w.slice(),y=E.map(P=>qo(k=>a[P].g(k,M(k)),R,g,4*Zh,4*Zh)),T=!1;if(E.some(P=>u[P]>=c[P])){let P=y.map((U,z)=>z).sort((U,z)=>y[U]-y[z]);E=P.map(U=>E[U]),y=P.map(U=>y[U]);let k=E.findIndex(U=>u[U]>=c[U]);E=E.slice(0,k+1),y=y.slice(0,k+1),T=!0}E.forEach((P,k)=>{h[P].push(y[k]),d[P].push(M(y[k]))}),T&&(m.status="event",g=y[y.length-1],A=M(g))}f=v}if(o){let v=l.nfev,w=l.dense();l.nfev=v,o(w,R,g)}m.t=g,m.y=A,m.status==="running"&&l.status==="finished"&&(m.status="finished")}return m.nfev=l.nfev,m.status},m}function Yo(n,e,t,i,s,r){let a=Ca(n,e,t,i,s,r);if(a.advance(),a.status!=="finished")throw new Error("\uC801\uBD84 \uC2E4\uD328: "+a.message);return{y:a.y,nfev:a.nfev,nsteps:a.nsteps}}var Fg=1,Og=-1;function kg(n,e,t=2e4,i=12){let s=[n[0],n[1],n[2]],r=0,a=(l,c,u)=>{let h=[c[0]-l[0],c[1]-l[1],c[2]-l[2]],d=[u[0]-l[0],u[1]-l[1],u[2]-l[2]],f=h[0]*h[0]+h[1]*h[1]+h[2]*h[2],m=f>0?Math.min(1,Math.max(0,(d[0]*h[0]+d[1]*h[1]+d[2]*h[2])/f)):0;return Math.hypot(d[0]-m*h[0],d[1]-m*h[1],d[2]-m*h[2])},o=(l,c,u,h,d,f)=>{let m=[.25,.5,.75].some(x=>a(u,d,l(c+x*(h-c)))>e/2);if(m&&f<i){let x=.5*(c+h),p=l(x);o(l,c,u,x,p,f+1),o(l,x,p,h,d,f+1)}else m&&r++,s.push(d[0],d[1],d[2])};return{add(l,c,u){u>c&&o(l,c,l(c),u,l(u),0)},finish(){let l=s.length/3,c=new Uint8Array(l);c[0]=1,c[l-1]=1;let u=p=>[s[3*p],s[3*p+1],s[3*p+2]],h=[[0,l-1]];for(;h.length;){let[p,g]=h.pop(),A=-1,R=0,v=u(p),w=u(g);for(let M=p+1;M<g;M++){let E=a(v,w,u(M));E>R&&(R=E,A=M)}A>=0&&R>e/2&&(c[A]=1,h.push([p,A],[A,g]))}let d=0;for(let p=0;p<l;p++)d+=c[p];let f=d>t?Math.ceil(d/t):1,m=[],x=0;for(let p=0;p<l;p++)c[p]&&((x%f===0||p===l-1)&&m.push(s[3*p],s[3*p+1],s[3*p+2]),x++);return{points:Float64Array.from(m),n_raw:l,n_kept:d,n:m.length/3,capped:f>1,depth_capped:r,tol:e}}}}function Bu(n,e,t={}){let i=[n.x_L2,0,0,0,0,0],s=n.R_over_gamma.map(u=>u*n.gamma),r=s.map((u,h)=>({g:(d,f)=>Math.sqrt(f[0]**2+f[1]**2+f[2]**2)-u,terminal:h===s.length-1,direction:1})),a=e.map((u,h)=>u-i[h]),o=n.t_max_days/n.time_unit_days,l=t.trajTol?kg(a,t.trajTol,t.trajMax):null,c=Ca((u,h)=>Ea(h,n.mu,i),0,a,o,n.rtol,n.atol,r,l?(u,h,d)=>l.add(u,h,d):null);return c.tEndNd=o,c.result=()=>{let u=s.map((f,m)=>c.tEvents[m].length?c.tEvents[m][0]*n.time_unit_days:NaN),h=s.map((f,m)=>c.tEvents[m].length?c.yEvents[m][0][0]>0?Fg:Og:0),d={t_days:u,dir:h,nfev:c.solver.nfev,status:c.status,t_reached_days:c.t*n.time_unit_days};return l&&(d.traj=l.finish()),d},c}function $o(n,e){let t=Bu(n,e);if(t.advance(),t.status==="failed")throw new Error("\uC801\uBD84 \uC2E4\uD328: "+t.message);return t.result()}function Jo(n,e,t,i){let s=e.map((o,l)=>o-t[l]),{y:r}=Yo((o,l)=>Ea(l,n.mu,t),0,s,i,n.rtol,n.atol),a=r.map((o,l)=>t[l]+o);return{delta:r,jacobi_drift:Fs(a,n.mu)-Fs(e,n.mu)}}var sr=(n,e)=>{if(!n[e])throw new Error(`\uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uC5D0 ${e} \uC5C6\uC74C`);return n[e].data};function Ra(n,e,t=null){if(n.mlp.gelu_c!==va)throw new Error(`gelu \uC0C1\uC218\uAC00 \uB2E4\uB974\uB2E4: \uC790\uB8CC ${n.mlp.gelu_c} \uB300 JS ${va}`);let i=n.frame_l2,s={frame:i,P:sr(e,"P"),P_inv:sr(e,"P_inv"),s_ref:Array.from(sr(e,"s_ref")),M:sr(e,"M"),R_over_gamma:n.criteria.R_over_gamma,R:n.criteria.R_over_gamma.map(r=>r*i.gamma),labels:n.criteria.labels,range:n.range,uncertain:n.uncertain||null,examples:n.examples||[],sliders:n.sliders||null};return s.mlp={seeds:n.mlp.seeds.map(r=>{let a=[],o=[],l=[];for(let u=0;u<n.mlp.layers;u++){let h=e[`s${r}_W${u}`];a.push(h.data),o.push(sr(e,`s${r}_b${u}`)),l.push(h.shape)}let c=u=>sr(e,`s${r}_${u}`);return{W:a,b:o,dims:l,Wo:c("Wo"),bo:c("bo"),x_mean:c("x_mean"),x_std:c("x_std"),y_mean:c("y_mean"),y_std:c("y_std")}})},s.forest=t?Pu(t):null,s.escapeParams=(r={})=>({mu:i.mu,x_L2:i.x,gamma:i.gamma,R_over_gamma:s.R_over_gamma,time_unit_days:i.time_unit_days,t_max_days:r.t_max_days??n.integrate.t_max_days,rtol:r.rtol??n.integrate.rtol,atol:r.atol??n.integrate.atol}),s}function rr(n,e){let t=ga(n,e),i=_a(n,e,t),s=[...e,t];return{eus:t,x:s,inRange:Us(n,e),T3:i,MLP:Sa(n.mlp,s),D24:n.forest?ya(n.forest,s,i):null,dirT3:Math.sign(t)}}function zu(n,e){return rr(n,Ns(n,e))}var Qh=n=>n===null?NaN:n,Vu=n=>Math.sqrt(n.reduce((e,t)=>e+t*t,0)),ar={max_err:NaN,failures:[{reason:"\uC2E4\uD5D8\uC2E4 \uC790\uB8CC (m3.lab) \uC5C6\uC74C"}]};function Hu(n,e,t){let i=0,s=!1;for(let r=0;r<e.length;r++){let a=n[r],o=Qh(e[r]);if(Number.isNaN(a)||Number.isNaN(o)){Number.isNaN(a)!==Number.isNaN(o)&&(s=!0);continue}i=Math.max(i,Math.abs(a-o))}return{err:i,bad:s||!(i<=t)}}var ef={m3_eigen(n,e){if(!e.lab)return ar;let t=0,i=0,s=[];for(let r of n.cases){let a=Ns(e.lab,r.state),o=ga(e.lab,a),l=Math.max(...a.map((c,u)=>Math.abs(c-r.E[u])),Math.abs(o-r.eus));t=Math.max(t,l),i=Math.max(i,l/r.tol),l<=r.tol||s.push({state:r.state,err:l,tol:r.tol})}return{max_err:t,max_ratio_to_tol:i,failures:s,measure:"abs (\uC131\uBD84\uB9C8\uB2E4 100 \u03B5 \u2016\u03B4\u2016)"}},m3_t3(n,e){if(!e.lab)return ar;let t=0,i=0,s=[];for(let r of n.cases){let a=_a(e.lab,r.E,r.eus),o=Hu(a,r.lt3,n.tolerance.abs);i+=r.lt3.filter(l=>l===null).length,t=Math.max(t,o.err),o.bad&&s.push({E:r.E,js:a,py:r.lt3})}return{max_err:t,n_nan_expected:i,failures:s,measure:"abs ln \uC77C"}},m3_uncertain(n,e){if(!e.lab)return ar;let t=[],i=0,s=0;for(let r of n.cases){let a=ir(e.lab,rr(e.lab,r.E)),o=Math.max(...a.seedStd.map((c,u)=>Math.abs(c-r.seed_std[u])));i=Math.max(i,o),a.uncertain.some(Boolean)&&s++,(!(a.mismatch.every((c,u)=>c===r.mismatch[u])&&a.spread.every((c,u)=>c===r.spread[u]))||!(o<=n.tolerance.seed_std_abs))&&t.push({E:r.E,js:{mismatch:a.mismatch,spread:a.spread},py:{mismatch:r.mismatch,spread:r.spread},std_err:o})}return{max_err:t.length,max_err_std:i,n_uncertain:s,failures:t,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},m3_range(n,e){if(!e.lab)return ar;let t=[],i=0;for(let s of n.cases){let r=Us(e.lab,s.E);s.in&&i++,r!==s.in&&t.push({E:s.E,js:r,py:s.in})}return{max_err:t.length,n_in:i,n_out:n.cases.length-i,failures:t,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},m3_d24(n,e){if(!e.lab||!e.lab.forest)return ar;let t=n.tolerance.abs,i=e.lab.forest,s=0,r=0,a=0,o=0,l=0,c=[];for(let u of n.cases)if(u.what==="predict"){let h=Hu(ya(i,u.X,u.lt3),u.lnt,t);s=Math.max(s,h.err),h.bad&&c.push({what:u.what,X:u.X,err:h.err})}else{l++;let h=Wo(i,u.z),d=Wo(i,u.z,{float32:!1}),f=Math.max(...h.map((x,p)=>Math.abs(x-u.out_f32[p])),...d.map((x,p)=>Math.abs(x-u.out_f64[p])));r=Math.max(r,f);let m=h.some((x,p)=>x!==d[p]);m&&a++,u.differs&&o++,(!(f<=t)||m!==u.differs)&&c.push({what:u.what,err:f,js_differs:m,py_differs:u.differs})}return(o===0||a===0)&&c.push({reason:"\uB300\uC870\uAD70\uC774 \uD558\uB098\uB3C4 \uAC08\uB9AC\uC9C0 \uC54A\uC74C \u2014 \uBB38\uD131 \uC704 \uC785\uB825 \uC2DC\uD5D8\uC774 \uBB34\uB825",jsDiffers:a,pyDiffers:o}),{max_err:Math.max(s,r),max_err_predict:s,max_err_probe:r,control:{probes:l,py_differs:o,js_differs:a},failures:c,measure:"abs ln \uC77C"}},m3_mlp(n,e){if(!e.lab)return ar;let t=0,i=[];for(let s of n.cases){let r=Hu(Sa(e.lab.mlp,s.X),s.lnt,n.tolerance.abs);t=Math.max(t,r.err),r.bad&&i.push({X:s.X,err:r.err})}return{max_err:t,failures:i,measure:"abs ln \uC77C (\uC2DC\uB4DC 3 \uD3C9\uADE0)"}},m3_cr3bp(n){let e=0,t=[];for(let i of n.cases){let s=wa(i.state,n.mu),r=Fs(i.state,n.mu),a=Math.max(Vu(s.map((o,l)=>o-i.rhs[l]))/Vu(i.rhs),Math.abs(r-i.jacobi)/Math.abs(i.jacobi));e=Math.max(e,a),a<=n.tolerance.rel||t.push({state:i.state,err:a})}return{max_err:e,failures:t,measure:"rel (\uC6B0\uBCC0 \uBCA1\uD130 \uD06C\uAE30 \uB300\uBE44, \uC57C\uCF54\uBE44)"}},m3_dop853(n){let e={mu:n.mu,x_L2:n.x_L2,gamma:n.gamma,R_over_gamma:n.R_over_gamma,time_unit_days:n.time_unit_days,t_max_days:n.t_max_days,rtol:n.rtol,atol:n.atol},t=0,i=0,s=0,r=0,a=0,o=0,l=0,c=[];for(let u of n.cases){let h=$o(e,u.state),d=Jo(e,u.state,n.s_ref,n.efold_nd),f=Vu(d.delta.map((p,g)=>p-u.delta_efold[g]));r=Math.max(r,f),t=Math.max(t,f/u.L_delta);let m=!(f<=u.L_delta);for(let p=0;p<u.t_days.length;p++){let g=Qh(u.t_days[p]),A=h.t_days[p];if(Number.isNaN(g)&&l++,Number.isNaN(g)||Number.isNaN(A)){Number.isNaN(g)!==Number.isNaN(A)&&(m=!0);continue}let R=Math.abs(A-g);a=Math.max(a,R),i=Math.max(i,R/u.L_t_days[p]),R<=u.L_t_days[p]||(m=!0),h.dir[p]!==u.dir[p]&&(m=!0,o++)}let x=10*Math.max(Math.abs(u.jacobi_drift),u.jacobi_drift_jit_rms);s=Math.max(s,x>0?Math.abs(d.jacobi_drift)/x:d.jacobi_drift===0?0:1/0),Math.abs(d.jacobi_drift)<=x||(m=!0),m&&c.push({eu_gamma:u.eu_gamma,eD:f,L_delta:u.L_delta,t_js:h.t_days,t_py:u.t_days,L_t:u.L_t_days,dir_js:h.dir,dir_py:u.dir,cj_js:d.jacobi_drift,cj_lim:x})}return{max_err:Math.max(t,i,s),ratio_to_line:{delta_efold:t,escape_time:i,jacobi:s},max_abs:{delta_efold:r,escape_time_days:a},direction_mismatch:o,no_escape_entries:l,failures:c,measure:"8-1 \uD310\uC815\uC120 \uB300\uBE44 \uBE44 (\u2264 1 \uC774\uBA74 \uD1B5\uACFC)"}}};var La=Math.PI/180,tf=n=>{let e=Math.cos(n),t=Math.sin(n);return[[1,0,0],[0,e,t],[0,-t,e]]},Gu=n=>{let e=Math.cos(n),t=Math.sin(n);return[[e,t,0],[-t,e,0],[0,0,1]]};function Wn(n,e){let t=[[0,0,0],[0,0,0],[0,0,0]];for(let i=0;i<3;i++)for(let s=0;s<3;s++)t[i][s]=n[i][0]*e[0][s]+n[i][1]*e[1][s]+n[i][2]*e[2][s];return t}var Ia=n=>[[n[0][0],n[1][0],n[2][0]],[n[0][1],n[1][1],n[2][1]],[n[0][2],n[1][2],n[2][2]]];function nf(n){let e=n-Math.floor(n),t=2*Math.PI*(e+.779057273264+.00273781191135448*n);return t=t%(2*Math.PI),t<0?t+2*Math.PI:t}function Da(n,e){let t=0;for(let i=0;i<3;i++)for(let s=0;s<3;s++)t+=(n[i][s]-e[i][s])**2;return Math.sqrt(t/2)}function Na(n){let e=n._arrays,t=e.t.data,i=e.du.data,s=e.q.data,r=n.orient.earth.eps_arcsec/3600*La,a=tf(r),o=n.orient.moon.coef;function l(h){if(!(h>=t[0]&&h<=t[t.length-1]))throw new RangeError("\uC9C0\uAD6C \uC790\uC138 \uD45C \uBC94\uC704 \uBC16");let d=is(t,h),f=(h-t[d])/(t[d+1]-t[d]),m=[[0,0,0],[0,0,0],[0,0,0]];for(let p=0;p<3;p++)for(let g=0;g<3;g++){let A=s[9*d+3*p+g],R=s[9*(d+1)+3*p+g];m[p][g]=A+f*(R-A)}let x=i[d]+f*(i[d+1]-i[d]);return Wn(Wn(a,Ia(m)),Gu(-nf(x)))}function c(h){let d=h/86400,f=d/36525,m=o.pole_ra[0]+o.pole_ra[1]*f+o.pole_ra[2]*f*f,x=o.pole_dec[0]+o.pole_dec[1]*f+o.pole_dec[2]*f*f,p=o.pm[0]+o.pm[1]*d+o.pm[2]*d*d;return o.angles.forEach(([g,A],R)=>{let v=(g+A*f)*La;m+=o.ra[R]*Math.sin(v),x+=o.dec[R]*Math.cos(v),p+=o.pmt[R]*Math.sin(v)}),[m,x,p]}function u(h){let[d,f,m]=c(h),x=Wn(Wn(Gu(m*La),tf((90-f)*La)),Gu((90+d)*La));return Wn(a,Ia(x))}return{earth:l,moon:u,moonAngles:c,range:[t[0],t[t.length-1]]}}var Ua=Math.PI/180,sf=n=>{let e=Math.cos(n),t=Math.sin(n);return[[1,0,0],[0,e,t],[0,-t,e]]},rf=n=>{let e=Math.cos(n),t=Math.sin(n);return[[e,t,0],[-t,e,0],[0,0,1]]};function af(n,e){let t=e/86400,i=t/36525,s=n.pole_ra[0]+n.pole_ra[1]*i+n.pole_ra[2]*i*i,r=n.pole_dec[0]+n.pole_dec[1]*i+n.pole_dec[2]*i*i,a=n.pm[0]+n.pm[1]*t+n.pm[2]*t*t;return n.angles.forEach((o,l)=>{let c=0,u=1;for(let h of o)c+=h*u,u*=i;c*=Ua,s+=n.ra[l]*Math.sin(c),r+=n.dec[l]*Math.cos(c),a+=n.pmt[l]*Math.sin(c)}),[s,r,a]}function Fa(n,e){let t=sf(e/3600*Ua);return i=>{let[s,r,a]=af(n,i),o=Wn(Wn(rf(a*Ua),sf((90-r)*Ua)),rf((90+s)*Ua));return Wn(t,Ia(o))}}var of=(n,e)=>e===0?Math.abs(n-e):Math.abs(n-e)/Math.abs(e),Zo=n=>Math.sqrt(n.reduce((e,t)=>e+t*t,0)),An=(n,e)=>Zo(n.map((t,i)=>t-e[i]));function lr(n){let e={},t=n["ephem.earth_moon"];t&&t._arrays&&(e.ephem=fa(t._arrays.t.data,t._arrays.R.data,t._arrays.V.data,t.bodies.length));let i=n["time.utc"];i&&i._arrays&&(e.utc={t:i._arrays.t_tdb_s.data,u:i._arrays.unix_utc_s.data});let s=n["m3.lab"];s&&s._arrays&&(e.lab=Ra(s,s._arrays,s._forest||null));let r=n["m4.ephem"];r&&r._chunks&&(e.solar=pa(r,r._chunks)),n["m5.stars"]&&n["m5.milkyway"]&&(e.sky={stars:n["m5.stars"],milkyway:n["m5.milkyway"]});let a=n["m4.textures"];return a&&a.planets&&a.orient&&(e.planetOrient=Object.fromEntries(Object.entries(a.planets).map(([o,l])=>[o,Fa(l.coef,a.orient.earth.eps_arcsec)]))),a&&a._arrays&&a.orient&&(e.orient=Na(a)),e}function or(n,e,t){let i=0,s=[];for(let r of n){let{err:a,js:o}=e(r);i=Math.max(i,a),a<=t||s.push({...r,js:o,err:a})}return{max_err:i,failures:s}}var Bg={units(n){let e=yu(n.units);return{...or(n.cases,t=>({err:of(e[t.fn](t.in),t.out),js:e[t.fn](t.in)}),n.tolerance.rel),measure:"rel"}},timeline(n){return{...or(n.cases,e=>{let t=Is(e.t_days,n.time_unit_days);return{err:Math.abs(t-e.theta),js:t}},n.tolerance.abs),measure:"abs rad"}},schema(n){let e=[],t=n.cases.find(i=>i.what==="manifest").obj.verification.details;for(let i of n.cases){let s,r;if(i.what==="manifest")s=ha(i.obj).length,r=0;else{let a=Fi(i.obj,t);s=a.errors.length,r=a.warnings.length}(s!==i.errors||r!==i.warnings)&&e.push({name:i.name,py:[i.errors,i.warnings],js:[s,r]})}return{max_err:e.length,failures:e,measure:"\uD310\uC815 \uBD88\uC77C\uCE58 \uC218"}},frames(n){return{...or(n.cases,e=>{let t=ca(e.state,e.theta),i=vu(e.state,e.theta),s=ns(e.state.slice(0,3),e.theta,e.s),r=Zo(e.state);return{err:Math.max(An(t,e.to_inertial),An(i,e.to_rot),An(s,e.blend))/r,js:{a:t,b:i,p:s}}},n.tolerance.rel),measure:"rel (\uC0C1\uD0DC \uD06C\uAE30 \uB300\uBE44)"}},interp(n,e){if(!e.ephem)return{max_err:NaN,failures:[{reason:"\uCC9C\uCCB4\uB825 \uC790\uB8CC \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=e.ephem.evaluate(r.t);for(let o=0;o<r.pos.length;o++){let l=An(a.pos[o],r.pos[o]),c=An(a.vel[o],r.vel[o]);t=Math.max(t,l),i=Math.max(i,c),l<=n.tolerance.pos_km&&c<=n.tolerance.vel_km_s||s.push({t:r.t,body:o,ep:l,ev:c})}}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},pulsating(n,e){return e.ephem?{...or(n.cases,t=>{let i=e.ephem.evaluate(t.t),s=Oi(i.pos[0],i.vel[0],i.pos[3],i.vel[3]),r=Ds(i.pos[1],s),a=Ds(i.pos[2],s);return{err:Math.max(An(r,t.earth)/Zo(t.earth),An(a,t.moon)/Zo(t.moon),of(s.d,t.d_km)),js:{e:r,m:a,d:s.d}}},n.tolerance.rel),measure:"rel"}:{max_err:NaN,failures:[{reason:"\uCC9C\uCCB4\uB825 \uC790\uB8CC \uC5C6\uC74C"}]}},utc(n,e){return e.utc?{...or(n.cases,t=>{let i=Tn(t.t,e.utc);return{err:Math.abs(i-t.unix),js:i}},n.tolerance.abs_s),measure:"abs s"}:{max_err:NaN,failures:[{reason:"UTC \uD45C \uC5C6\uC74C"}]}},m4_interp(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=e.solar.evaluate(r.body,r.t),o=An(a.pos,r.pos),l=An(a.vel,r.vel);t=Math.max(t,o),i=Math.max(i,l),o<=n.tolerance.pos_km&&l<=n.tolerance.vel_km_s||s.push({body:r.body,t:r.t,ep:o,ev:l})}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},m4_chunks(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases)for(let a of r.years){let o=e.solar.evaluate(r.body,r.t,a),l=An(o.pos,r.pos),c=An(o.vel,r.vel);t=Math.max(t,l),i=Math.max(i,c),l<=n.tolerance.pos_km&&c<=n.tolerance.vel_km_s||s.push({body:r.body,t:r.t,year:a,ep:l,ev:c})}return{max_err:t,max_err_vel:i,failures:s,measure:"pos km (vel km/s \uB530\uB85C)"}},m4_lpoints(n,e){if(!e.solar)return{max_err:NaN,failures:[{reason:"\uD0DC\uC591\uACC4 \uC790\uB8CC (m4.ephem) \uC5C6\uC74C"}]};let t=0,i=[];for(let s of n.cases){let r=e.solar.evaluate("sun",s.t),a=e.solar.evaluate("emb",s.t);for(let[o,l]of Object.entries(n.points)){let c=An(Tu(r.pos,r.vel,a.pos,a.vel,n.mu,l),s.L[o]);t=Math.max(t,c),c<=n.tolerance.pos_km||i.push({t:s.t,point:o,err:c})}}return{max_err:t,failures:i,measure:"pos km"}},m4_osculating(n){let e=0,t=[];for(let i of n.cases){let s=new Float64Array(i.points.length);ma(i.r,i.v,i.r_sun,i.v_sun,i.mu,i.dE,s);let r=0;for(let a=0;a<s.length;a+=3)r=Math.max(r,Math.hypot(s[a]-i.points[a],s[a+1]-i.points[a+1],s[a+2]-i.points[a+2]));e=Math.max(e,r),r<=n.tolerance.pos_km||t.push({body:i.body,t:i.t,err:r})}return{max_err:e,failures:t,measure:"pos km"}},m4_orient(n,e){if(!e.orient)return{max_err:NaN,failures:[{reason:"\uC790\uC138 \uC790\uB8CC (m4.textures) \uC5C6\uC74C"}]};let t=0,i=0,s=[];for(let r of n.cases){let a=Da(e.orient.earth(r.t),r.earth),o=Da(e.orient.moon(r.t),r.moon);t=Math.max(t,a),i=Math.max(i,o),a<=n.tolerance.earth_rad&&o<=n.tolerance.moon_rad||s.push({t:r.t,ee:a,em:o})}return{max_err:t,max_err_moon:i,failures:s,measure:"rad (\uC9C0\uAD6C; \uB2EC\uC740 max_err_moon)"}},m4_planet_orient(n,e){if(!e.planetOrient)return{max_err:NaN,failures:[{reason:"\uD589\uC131 \uC790\uC138 \uC790\uB8CC (m4.textures planets) \uC5C6\uC74C"}]};let t=0,i=[];for(let s of n.cases){let r=Da(e.planetOrient[s.body](s.t),s.matrix);t=Math.max(t,r),r<=n.tolerance.rad||i.push({body:s.body,t:s.t,e:r})}return{max_err:t,failures:i,measure:"rad"}},m5_sky(n,e){if(!e.sky||!e.sky.stars._arrays)return{max_err:NaN,failures:[{reason:"\uD558\uB298 \uC790\uB8CC (m5.stars\xB7m5.milkyway) \uC5C6\uC74C"}]};let t=e.sky.stars._arrays,i=e.sky.milkyway.gal_to_ecl,s=new Map;for(let l=0;l<t.hyg_id.data.length;l++)s.set(t.hyg_id.data[l],l);let r=0,a=0,o=[];for(let l of n.cases)if(l.what==="star"){let c=s.get(l.hyg_id);if(c===void 0){o.push({name:l.name,reason:"\uC790\uB8CC\uC5D0 \uC5C6\uC74C"});continue}let u=Mu(t,c),h=Math.max(An(u.dir,l.dir),Math.abs(u.mag-l.mag));r=Math.max(r,h),h<=n.tolerance.star_abs||o.push({name:l.name,err:h})}else{let c=An(wu(i,l.gal),l.ecl);a=Math.max(a,c),c<=n.tolerance.rot_abs||o.push({gal:l.gal,err:c})}return{max_err:Math.max(r,a),max_err_star:r,max_err_rot:a,failures:o,measure:"abs (\uB2E8\uC704 \uBCA1\uD130)"}},revolution(n){return{...or(n.cases,e=>{let t=n.time_unit_days,i=Is(e.t0_days,t),s=Is(e.t1_days,t),r=ca([...n.emb,0,0,0],i),a=ca([...n.emb,0,0,0],s),o=Math.atan2(a[1],a[0])-Math.atan2(r[1],r[0]);return{err:Math.abs(Math.atan2(Math.sin(o),Math.cos(o))),js:{a0:i,a1:s}}},n.tolerance.abs_rad),measure:"abs rad"}}};function lf(n,e={}){return n.map(t=>{let i=Bg[t.id]||ef[t.id];if(!i)return{id:t.id,n:0,failures:[{reason:"JS \uCABD \uB300\uC870 \uD568\uC218 \uC5C6\uC74C"}],max_err:NaN,ok:!1};let s=i(t,e);return{id:t.id,n:t.cases.length,tolerance:t.tolerance,...s,ok:s.failures.length===0}})}var ks="fetch";async function cf(n){let e=`data/${n}`;if(typeof navigator<"u"&&navigator.onLine===!1&&typeof caches<"u"){let i=await caches.match(new URL(e,location.href).href);if(!i)throw new Error(`\uC624\uD504\uB77C\uC778 \u2014 \uB2F4\uC544 \uB454 \uD30C\uC77C\uC774 \uC544\uB2D8: ${n}`);return i}let t=await fetch(e);if(!t.ok)throw new Error(`\uC790\uB8CC\uB97C \uC77D\uC9C0 \uBABB\uD568: ${n} (${t.status})`);return t}async function os(n){return(await cf(n)).json()}async function jn(n){return new Uint8Array(await(await cf(n)).arrayBuffer())}var Xu={};xu(Xu,{DICTS:()=>ka,apply:()=>Lt,getLang:()=>si,init:()=>Wu,initialLang:()=>pf,onChange:()=>cr,pick:()=>Dt,setLang:()=>ju,t:()=>Me});var uf={"app.title":"\uD0DC\uC591\u2013\uC9C0\uAD6C\uB2EC L2","app.subtitle":"7\uB2E8\uACC4 3D \uC2DC\uAC01\uD654 \xB7 M2 JWST \uCE35","lang.switch":"English","lang.switch_title":"\uC5B8\uC5B4 \uBC14\uAFB8\uAE30","version.commit":"\uCEE4\uBC0B","version.dirty":"\uC218\uC815 \uC911","version.title":"\uBC84\uC804 \xB7 \uBE4C\uB4DC \uB0A0\uC9DC (\uD55C\uAD6D \uC2DC\uAC04) \xB7 \uCEE4\uBC0B","panel.samples":"\uAF2C\uB9AC\uD45C \uC2DC\uD5D8 \uC22B\uC790","panel.samples_note":"\uC22B\uC790\uB97C \uB204\uB974\uBA74 \uCD9C\uCC98 \uCC3D\uC774 \uC5F4\uB9B0\uB2E4. \uAF2C\uB9AC\uD45C\uC5D0 \uB9C8\uC6B0\uC2A4\uB97C \uC62C\uB9AC\uBA74 \uC138\uBD80 \uBD84\uB958\uAC00 \uBCF4\uC778\uB2E4.","tag.weak":"\uC57D\uD568","tag.display_approx":"\uD45C\uC2DC\uC6A9 \uADFC\uC0AC","source.title":"\uCD9C\uCC98","source.value":"\uAC12","source.unit":"\uB2E8\uC704","source.file":"\uD30C\uC77C","source.key":"\uD0A4","source.commit":"\uACC4\uC0B0","source.source_hash":"\uC18C\uC2A4 \uD574\uC2DC (\uC55E 12 \uC790\uB9AC)","source.ref_commit":"\uCC38\uACE0 \uCEE4\uBC0B","source.build":"\uD654\uBA74 \uD310","source.stage":"\uB2E8\uACC4","source.model":"\uBAA8\uB378","source.verification":"\uAC80\uC99D \uAF2C\uB9AC\uD45C","source.note":"\uC124\uBA85","source.close":"\uB2EB\uAE30","source.browser_calc":"\uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0 (Python \uC77C\uCE58 \uD14C\uC2A4\uD2B8 \uD1B5\uACFC, \uD5C8\uC6A9 \uC624\uCC28 {tol})","source.time_scale":"\uC2DC\uAC04 \uCCB4\uACC4","pwa.update":"\uC0C8 \uBC84\uC804 \uC788\uC74C \u2014 \uB2E4\uC2DC \uBD88\uB7EC\uC624\uAE30","pwa.offline_ready":"\uC624\uD504\uB77C\uC778 \uC900\uBE44\uB428","error.load":"\uC790\uB8CC\uB97C \uC77D\uC9C0 \uBABB\uD588\uB2E4: {msg}","error.schema":"\uC790\uB8CC \uD615\uC2DD \uC624\uB958: {msg}","body.sun":"\uD0DC\uC591","body.emb":"EMB (\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC)","body.earth":"\uC9C0\uAD6C","body.moon":"\uB2EC","l2.panel":"L2 \uC7A5\uBA74","l2.mode":"\uC88C\uD45C\uACC4","l2.mode_rot":"\uD68C\uC804 \uC88C\uD45C","l2.mode_inertial":"\uAD00\uC131 \uC88C\uD45C","l2.view":"\uBCF4\uAE30","l2.view_all":"\uC804\uCCB4","l2.view_emb":"\uC9C0\uAD6C\u2013\uB2EC\u2013L1\xB7L2","l2.view_l2":"L2 \uADFC\uCC98","l2.view_l2zoom":"L2 \uD655\uB300","l2.time":"\uC2DC\uAC01","l2.play":"\uC7AC\uC0DD","l2.pause":"\uBA48\uCDA4","l2.speed":"{n} \uC77C/\uCD08","l2.layer_lpoints":"\uB77C\uADF8\uB791\uC8FC \uC810","l2.layer_bodies":"\uD0DC\uC591\xB7EMB","l2.layer_dirs":"L2 \uBD88\uC548\uC815\xB7\uC548\uC815 \uBC29\uD5A5","l2.layer_earthmoon":"\uC9C0\uAD6C\xB7\uB2EC (\uC2E4\uC81C \uCC9C\uCCB4\uB825)","l2.layer_halo":"3-C \uD5E4\uC77C\uB85C \uC871","l2.layer_escape":"3-B \uC774\uD0C8 \uADA4\uC801","l2.layer_burns":"\uC218\uC815 \uC704\uCE58 (3-A\xB73-C\xB74-C)","l2.layer_ref":"4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4","l2.unstable":"\uBD88\uC548\uC815","l2.stable":"\uC548\uC815","l2.halo_main":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4","l2.g_lpoints":"\uB77C\uADF8\uB791\uC8FC \uC810 (1\uB2E8\uACC4)","l2.g_dirs":"L2 \uBC29\uD5A5 (2\uB2E8\uACC4)","l2.g_halo":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4 (3-C)","l2.g_annual":"\uC5F0\uAC04 \u0394v (3-A\xB73-C\xB74-C)","l2.g_ref":"\uAE30\uC900 \uADA4\uB3C4\uC640 \uD5E4\uC77C\uB85C (4-C\xB74-D)","l2.g_escape":"\uC774\uD0C8 \uC2DC\uAC01 (3-B)","l2.g_interp":"\uCC9C\uCCB4\uB825 \uBCF4\uAC04 \uC790\uCCB4 \uC624\uCC28 (4-A)","l2.g_m0":"\uAF2C\uB9AC\uD45C \uC2DC\uD5D8 \uC22B\uC790 (M0)","l2.legend_markers":"\uD45C\uC9C0 \uD06C\uAE30\xB7\uD654\uC0B4 \uAE38\uC774\uB294 \uC2E4\uC81C \uD06C\uAE30\uAC00 \uC544\uB2D8 (\uD45C\uC2DC\uC6A9). \uC22B\uC790\uB97C \uB204\uB974\uBA74 \uCD9C\uCC98 \uCC3D.","l2.legend_pulsating":"\uC9C0\uAD6C\xB7\uB2EC: \uC2E4\uC81C \uCC9C\uCCB4\uB825 (DE441) \uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C \u2014 \uAE38\uC774 \uB2E8\uC704 = \uADF8 \uC21C\uAC04\uC758 \uD0DC\uC591\u2013EMB \uAC70\uB9AC. 4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4\uB3C4 \uAC19\uC740 \uC88C\uD45C.","l2.legend_inertial":"\uAD00\uC131 \uC88C\uD45C: x \uCD95 = \uD669\uB3C4 J2000 X, z \uCD95 = \uADA4\uB3C4\uBA74 \uBC95\uC120 (\u2248 \uD669\uB3C4 \uBD81\uADF9). CR3BP \uD68C\uC804\uC88C\uD45C\uB97C \u03B8 = \u03B8\u2080 + (t \u2212 2026-01-01 TDB)/\uC2DC\uAC04 \uB2E8\uC704 \uB9CC\uD07C \uB3CC\uB9B0 \uAC83 (\u03B8\u2080 = \uADF8\uB0A0 EMB \uC758 \uD669\uACBD).","source.browser":"\uACC4\uC0B0 \uC704\uCE58","l2.escape_rule":"\uD45C\uC2DC\uC6A9\uC73C\uB85C \uACE0\uB978 \uC608 (\uADDC\uCE59: e_u* \uBD80\uD638\uB9C8\uB2E4 |e_u*|/\u03B3 \uAC00 1e-9\xB71e-7\xB71e-5 \uC5D0 \uAC00\uC7A5 \uAC00\uAE4C\uC6B4 \uC8FC \uD45C\uBCF8 \uD558\uB098\uC529, 0.316\u03B3 \uC774\uD0C8\xB7\uC7A1\uC74C \uC9C0\uBC30 \uD45C\uBCF8 \uC81C\uC678)","panel.open":"\uD328\uB110 \uD3B4\uAE30","panel.close":"\uD328\uB110 \uC811\uAE30","ui.layers":"\uB808\uC774\uC5B4","ui.legend":"\uBC94\uB840","ui.numbers":"\uBAA8\uB4E0 \uC22B\uC790","ui.menu":"\uBA54\uB274","card.sphere_note":"\uAD6C\uB294 \uBCF4\uC774\uAC8C \uD0A4\uC6CC \uADF8\uB838\uB2E4 (\uC2E4\uC81C \uBC18\uC9C0\uB984: Horizons \uBA38\uB9AC\uB9D0)","card.no_numbers":"\uC774 \uCC9C\uCCB4\uC5D0 \uB538\uB9B0 \uACB0\uACFC \uC22B\uC790\uB294 \uC544\uC9C1 \uC5C6\uB2E4","l2.family_all":"\uD5E4\uC77C\uB85C \uC871 \uC804\uCCB4 \uBCF4\uAE30 (\uAE30\uBCF8\uC740 \uC77C\uBD80\uB9CC)","l2.legend_spheres":"\uD0DC\uC591\xB7\uC9C0\uAD6C\xB7\uB2EC\uC740 \uD06C\uAE30 \uC788\uB294 \uAD6C \u2014 \uC791\uC73C\uBA74 \uBCF4\uC774\uAC8C \uD0A4\uC6B4\uB2E4","tag.short_impl":"\uAD6C\uD604","tag.short_external":"\uC678\uBD80","tag.short_physical":"\uBB3C\uB9AC","preset.clean":"\uAE54\uB054","preset.explore":"\uD0D0\uC0C9","preset.research":"\uC5F0\uAD6C","preset.custom":"\uC0AC\uC6A9\uC790 \uC124\uC815","preset.zooming":"\uD655\uB300 \uC911","layer.g_bodies":"\uCC9C\uCCB4\xB7\uC810","layer.g_orbits":"\uADA4\uB3C4\xB7\uADA4\uC801","layer.g_numbers":"\uBB3C\uB9AC \uC218\uCE58\xB7\uAF2C\uB9AC\uD45C","layer.g_aux":"\uBCF4\uC870","layer.sun":"\uD0DC\uC591","layer.earth":"\uC9C0\uAD6C","layer.moon":"\uB2EC","layer.emb":"EMB (\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC)","layer.lpoints":"L1 ~ L5","layer.halo_main":"\uD5E4\uC77C\uB85C \uC8FC \uADA4\uB3C4","layer.halo_family":"\uD5E4\uC77C\uB85C \uC871","layer.escape":"3-B \uC774\uD0C8 \uADA4\uC801","layer.ref":"4-C\xB74-D \uAE30\uC900 \uADA4\uB3C4","layer.burns":"\uC218\uC815 (\u0394v) \uC704\uCE58","layer.moon_orbit":"\uB2EC \uADA4\uB3C4 (\uC9C0\uB09C 30 \uC77C \uC790\uCDE8)","layer.planet_orbits":"\uACF5\uC804 \uADA4\uB3C4","layer.dirs":"L2 \uBC29\uD5A5\uC120 (\uBD88\uC548\uC815\xB7\uC548\uC815)","layer.n_distance":"\uAC70\uB9AC","layer.n_period":"\uC8FC\uAE30","layer.n_angle":"\uBC29\uD5A5 \uAC01\uB3C4","layer.n_annual":"\uC5F0\uAC04 \u0394v","layer.n_escape":"\uC774\uD0C8 \uC2DC\uAC01","layer.n_tags":"\uAC80\uC99D \uAF2C\uB9AC\uD45C","layer.labels":"\uC774\uB984\uD45C","layer.scale":"\uAC70\uB9AC \uB208\uAE08","layer.grid":"\uAE30\uC900 \uD3C9\uBA74 \uACA9\uC790 (\uADA4\uB3C4\uBA74)","layer.axes":"\uC88C\uD45C\uCD95","layer.tags_note":"\uAF2C\uB9AC\uD45C\uB97C \uB044\uBA74 \uC22B\uC790\uB3C4 \uBAA8\uB450 \uC228\uB294\uB2E4 \u2014 \uC22B\uC790\uB294 \uC5B8\uC81C\uB098 \uAF2C\uB9AC\uD45C\uC640 \uD568\uAED8","key.labels":"\uC774\uB984\uD45C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_orbits":"\uADA4\uB3C4\xB7\uADA4\uC801 \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_numbers":"\uBB3C\uB9AC \uC218\uCE58\xB7\uAF2C\uB9AC\uD45C \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.g_bodies":"\uCC9C\uCCB4\xB7\uC810 \uBB36\uC74C \uCF1C\uAE30\xB7\uB044\uAE30","key.grid":"\uAE30\uC900 \uD3C9\uBA74 \uACA9\uC790","key.p_clean":"\uD504\uB9AC\uC14B: \uAE54\uB054","key.p_explore":"\uD504\uB9AC\uC14B: \uD0D0\uC0C9","key.p_research":"\uD504\uB9AC\uC14B: \uC5F0\uAD6C","key.help":"\uC774 \uB3C4\uC6C0\uB9D0","help.title":"\uB2E8\uCD95\uD0A4","help.button":"\uB2E8\uCD95\uD0A4 (?)","help.note":"\uB808\uC774\uC5B4 \uB2E8\uCD95\uD0A4\uB294 \uB9C9\uB300\uB97C \uAEBC\uB0B4\uC9C0 \uC54A\uB294\uB2E4. Esc = \uB9C9\uB300 \uC228\uAE30\uAE30. \uCF20 \uC0C1\uD0DC\uB294 \uC774 \uBE0C\uB77C\uC6B0\uC800\uC5D0 \uAE30\uC5B5\uB41C\uB2E4.","help.keys_line":"L \uC774\uB984\uD45C \xB7 O \uADA4\uB3C4 \xB7 N \uC218\uCE58 \xB7 1 2 3 \uD504\uB9AC\uC14B","time.start":"\uCC98\uC74C\uC73C\uB85C","time.now":"\uD604\uC7AC","card.numbers_off":"\uCF1C\uC9C4 \uC218\uCE58 \uB808\uC774\uC5B4\uAC00 \uC5C6\uC5B4 \uC22B\uC790\uB97C \uC228\uACBC\uB2E4 (\uB808\uC774\uC5B4 \u2192 \uBB3C\uB9AC \uC218\uCE58)","desc.Sun":"\uD0DC\uC591. CR3BP \uC758 \uD070 \uC9C8\uB7C9 (\uCCAB\uC9F8 \uCC9C\uCCB4).","desc.EMB":"\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC. CR3BP \uC758 \uB458\uC9F8 \uCC9C\uCCB4 (\uC9C0\uAD6C\uC640 \uB2EC\uC744 \uD55C \uC810\uC73C\uB85C \uBCF8 \uAC83).","desc.Earth":"\uC9C0\uAD6C. \uC2E4\uC81C \uCC9C\uCCB4\uB825 (DE441) \uC704\uCE58\uB97C \uB9E5\uB3D9 \uC88C\uD45C\uB85C \uADF8\uB838\uB2E4. \uB0AE\xB7\uBC24 \uACBD\uACC4\uB294 \uD587\uBE5B \uBC29\uD5A5.","desc.Moon":`\uB2EC. \uC2E4\uC81C \uCC9C\uCCB4\uB825 \uC704\uCE58. \uB4A4\uC758 \uAF2C\uB9AC\uB294 \uC9C0\uB09C \uC790\uCDE8 (\uB4A4\uB85C \uAC08\uC218\uB85D \uD750\uB9BC). \uD45C\uBA74 \uADF8\uB9BC: NASA SVS CGI Moon Kit (LRO LROC, \uACF5\uACF5 \uC601\uC5ED \u2014 \uCD9C\uCC98 "NASA's Scientific Visualization Studio"). \uADF8\uB9BC \uBC29\uD5A5\uC740 \uD45C\uC2DC\uC6A9 \uADFC\uC0AC (\uD3C9\uADE0 \uC9C0\uAD6C \uCABD \uBA74\uC744 \uC9C0\uAD6C \uCABD\uC73C\uB85C, \uCE6D\uB3D9 \uC5C6\uC74C).`,"desc.L1":"\uD0DC\uC591 \uCABD \uB77C\uADF8\uB791\uC8FC \uC810 (CR3BP \uD3C9\uD615\uC810, 1\uB2E8\uACC4). \uBD88\uC548\uC815 \u2014 \uC774 \uC5F0\uAD6C\uC5D0\uC11C \uC9C1\uC811 \uACC4\uC0B0\uD558\uC9C0\uB294 \uC54A\uC558\uB2E4 (\uACF5\uC120 \uD3C9\uD615\uC810\uC774 \uBD88\uC548\uC815\uD558\uB2E4\uB294 \uC11C\uC220\uC758 \uCABD\uC218\uB294 \uD655\uC778 \uD544\uC694).","desc.L2":"\uC774 \uC5F0\uAD6C\uC758 \uB300\uC0C1. \uD0DC\uC591 \uBC18\uB300\uCABD \uD3C9\uD615\uC810 \u2014 \uBD88\uC548\uC815\uD574\uC11C \uADA4\uB3C4 \uC720\uC9C0 (\u0394v) \uAC00 \uD544\uC694\uD558\uB2E4.","desc.L3":"\uD0DC\uC591 \uB108\uBA38 \uBC18\uB300\uD3B8\uC758 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC548\uC815\uC131\uC740 \uC774 \uC5F0\uAD6C\uC5D0\uC11C \uACC4\uC0B0\uD558\uC9C0 \uC54A\uC558\uB2E4 (\uD655\uC778 \uD544\uC694).","desc.L4":"\uC55E\uC11C\uAC00\uB294 \uC0BC\uAC01 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC120\uD615 \uC548\uC815 \u2014 1\uB2E8\uACC4 Routh \uD310\uC815 (\u03BC \uAC00 \uC784\uACC4 \uC9C8\uB7C9\uBE44 (Sicardy 2010) \uBCF4\uB2E4 \uD6E8\uC52C \uC791\uC74C, \uAD6C\uD604 \uAC80\uC99D \u2014 \uBB38\uD5CC \uB300\uC870).","desc.L5":"\uB4A4\uB530\uB974\uB294 \uC0BC\uAC01 \uD3C9\uD615\uC810 (CR3BP, 1\uB2E8\uACC4). \uC120\uD615 \uC548\uC815 \u2014 1\uB2E8\uACC4 Routh \uD310\uC815 (L4 \uC640 \uAC19\uC74C).","desc.halo_main":"3-C \uC5D0\uC11C \uB9CC\uB4E0 \uD5E4\uC77C\uB85C \uADA4\uB3C4 \uC871\uC758 \uC8FC \uADA4\uB3C4 \u2014 \uADA4\uB3C4 \uC720\uC9C0 \uACC4\uC0B0\uC758 \uAE30\uC900.","l2.view_jwst":"JWST","l2.layer_jwst":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","l2.layer_jwst_ext":"JWST \uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC \uBE44\uAD50","l2.layer_jwst_phys":"JWST \uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC \uBE44\uAD50","l2.legend_jwst":"JWST (\uAE08\uBE5B): \uC810 = \uBC1B\uC740 \uC810 (\uD558\uB8E8 \uAC04\uACA9), \uC810\uC120 = \uADF8 \uC0AC\uC774 \uBCF4\uAC04 (4-A \uC5D0\uB974\uBBF8\uD2B8), \uC2E4\uC120 = 10 \uBD84 \uAC04\uACA9 \uBC1B\uC740 \uC810. \uC608\uCE21: \uC8FC\uD669 = JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (\uC678\uBD80 \uB300\uC870), \uCD08\uB85D = \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (\uBB3C\uB9AC \uAC80\uC99D), \uC9C4\uD55C \uC120 = \uBE44\uAD50 \uB300\uC0C1, \uC605\uC740 \uC120 = \uB0B4 \uBAA8\uD615","layer.jwst":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","layer.jwst_ext":"\uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (\uC678\uBD80 \uB300\uC870)","layer.jwst_phys":"\uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (\uBB3C\uB9AC \uAC80\uC99D)","layer.n_jwst":"\uC608\uCE21 \uC624\uCC28","body.jwst":"JWST","desc.JWST":"\uC81C\uC784\uC2A4 \uC6F9 \uC6B0\uC8FC\uB9DD\uC6D0\uACBD. \uAE08\uBE5B \uC120 = \uC7AC\uAD6C\uC131\uD55C \uC2E4\uC81C \uBE44\uD589 \uADA4\uC801 (Horizons, 4-A \uC790\uB8CC): \uC810 = \uBC1B\uC740 \uC810 (\uD558\uB8E8 \uAC04\uACA9), \uC810\uC120 = \uD558\uB8E8 \uB9C8\uB514 \uC0AC\uC774 \uBCF4\uAC04, \uC2E4\uC120 = 10 \uBD84 \uAC04\uACA9 \uBC1B\uC740 \uC810. \uD45C\uC9C0 = \uC7AC\uAD6C\uC131 \uB05D. \uC544\uB798\uB294 5\uB2E8\uACC4 \uC608\uCE21\uC758 \uB450 \uBE44\uAD50 \u2014 \uAF2C\uB9AC\uD45C\uAC00 \uB2E4\uB974\uB2E4.","desc.jwst_period":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801\uC758 \uD55C \uBC14\uD034 \uAE38\uC774\uB97C NASA \uC6D0\uBB38, \uAC19\uC740 \uD06C\uAE30\uC758 CR3BP \uD5E4\uC77C\uB85C\uC640 \uBE44\uAD50\uD55C\uB2E4.","jwst.orbit_label":"JWST \uC7AC\uAD6C\uC131 \uADA4\uC801","jwst.layer_ext_short":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC \uBE44\uAD50","jwst.layer_phys_short":"\uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC \uBE44\uAD50","jwst.layer_ext":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50","jwst.layer_phys":"\uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50","jwst.rep_5d":"5 \uC77C","jwst.axis_note":"\uC138\uB85C = \uC704\uCE58 \uCC28 (km, \uB85C\uADF8), \uAC00\uB85C = \uC2DC\uC791 \uB4A4 (\uC77C). \uC810 = results/stage5.json \uC5D0 \uC801\uD78C \uAC12","jwst.period_button":"\uC8FC\uAE30 \uC124\uBA85 \uCE74\uB4DC \uC5F4\uAE30","jwst.period_title":"JWST \uC8FC\uAE30 \u2014 \uC7AC\uAD6C\uC131 \uB300 NASA\xB7\uD5E4\uC77C\uB85C","jwst.period_class":"\uBD84\uB958","jwst.no_predictions":"\uC608\uCE21 \uC790\uB8CC\uAC00 \uC5C6\uB2E4","jwst.g_ext":"JWST \uC608\uCE21 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50 (5\uB2E8\uACC4)","jwst.g_phys":"JWST \uC608\uCE21 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50 (5\uB2E8\uACC4)","jwst.g_period":"JWST \uC8FC\uAE30 (4-A)","l2.view_jwstzoom":"JWST \uD655\uB300","l2.legend_jwstzoom":"JWST \uD655\uB300 (\uC608\uCE21 \uB05D \uB458\uB808 \uC218\uC2ED km): \uD070 \uC810 = \uAC19\uC740 \uC2DC\uAC01\uC758 \uC810, \uD770 \uC120\uBD84 = \uADF8 \uB458 \uC0AC\uC774 \uC704\uCE58 \uCC28 (\uC22B\uC790\uB294 Python \uAC12\uACFC \uAF2C\uB9AC\uD45C). \uC120\uC740 \uC800\uC7A5\uD55C \uC810 (1 \uC2DC\uAC04 \uAC04\uACA9, JPL 01U \uB294 \uD558\uB8E8 \uAC04\uACA9) \uC744 \uACE7\uAC8C \uC774\uC74C. \uADF8\uB9AC\uB294 \uC704\uCE58\uB294 \uB9E5\uB3D9 \uC88C\uD45C\uB77C \uC2E4\uC81C \uAC70\uB9AC\uC640 1 % \uC548\uC5D0\uC11C \uB2E4\uB974\uB2E4","jwst.marker_fixed":"{date} \uC704\uCE58 (\uACE0\uC815)","jwst.zoom_phys":"\uD655\uB300\uD574\uC11C \uBCF4\uAE30 \u2014 \uB300\uD45C 5 \uC77C \uC9C0\uC810 (\uC138 \uC120)","jwst.zoom_ext":"\uD655\uB300\uD574\uC11C \uBCF4\uAE30 \u2014 \uCC3D \uB05D:","jwst.zoom_focus_R5":"JWST \uD655\uB300 \u2014 \uC7AC\uAD6C\uC131 \uADA4\uC801\uACFC\uC758 \uBE44\uAD50, \uB300\uD45C 5 \uC77C \uC9C0\uC810","jwst.zoom_focus_A":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D A \uB05D","jwst.zoom_focus_B":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D B \uB05D","jwst.zoom_focus_C":"JWST \uD655\uB300 \u2014 JPL \uBB34\uBD84\uC0AC \uC608\uCE21\uACFC\uC758 \uBE44\uAD50, \uCC3D C \uB05D","jwst.zoom_norecon":"\uC2E4\uC81C \uADA4\uC801 \uC790\uB8CC \uC5C6\uC74C (2026-10-05 \uC774\uD6C4)","jwst.zl_recon":"\uC7AC\uAD6C\uC131 \uADA4\uC801 (03U)","jwst.zl_mine_kB":"\uB0B4 \uBAA8\uD615 (k_B)","jwst.zl_jpl01U":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21 (01U)","jwst.zl_jpl":"JPL \uBB34\uBD84\uC0AC \uC608\uCE21","jwst.gap_mine_recon":"\uB0B4 \uBAA8\uD615 \u2194 \uC7AC\uAD6C\uC131","jwst.gap_jpl_recon":"JPL \u2194 \uC7AC\uAD6C\uC131","jwst.gap_mine_jpl":"\uB0B4 \uBAA8\uD615 \u2194 JPL","source.join":"\uC7AC\uAD6C\uC131 \uADA4\uC801 \uC774\uC74C","l2.view_lab":"\uC2E4\uD5D8\uC2E4","lab.title":"\uC2E4\uD5D8\uC2E4 \u2014 L2 \uADFC\uCC98 \uCD08\uAE30 \uC0C1\uD0DC\uC758 \uC774\uD0C8","lab.scope":"CR3BP \uBAA8\uD615 \uC548\uC758 \uACB0\uACFC (\uAD6C\uD604 \uAC80\uC99D \uC131\uACA9 \u2014 \uBB3C\uB9AC \uAC80\uC99D \uC544\uB2D8). \uC22B\uC790\uB294 \uBAA8\uB450 \uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0 (Python \uC77C\uCE58 \uC2DC\uD5D8 \uD1B5\uACFC)","lab.fold":"\uC811\uAE30","lab.unfold":"\uD3BC\uCE58\uAE30","lab.loading":"\uC2E4\uD5D8\uC2E4 \uC790\uB8CC \uBD88\uB7EC\uC624\uB294 \uC911\u2026 (\uCC98\uC74C \uD55C \uBC88, \uC57D 17 MB)","lab.examples":"\uC608\uC2DC","lab.ex_q10":"\uBE60\uB978 \uC774\uD0C8 (10 %)","lab.ex_q50":"\uC911\uAC04 (50 %)","lab.ex_q90":"\uB290\uB9B0 \uC774\uD0C8 (90 %)","lab.ex_out":"\uBC94\uC704 \uBC16 \uC2DC\uC5F0","lab.ex_noise":"\uC7A1\uC74C \uBC14\uB2E5 \uADFC\uCC98","lab.ex_src":"\uC608\uC2DC \uCD9C\uCC98: {src} (3-B \uD45C\uBCF8 \uBC88\uD638 {no})","lab.s_sign":"e_u \uBD80\uD638","lab.s_eu":"|e_u| (\uBD88\uC548\uC815)","lab.s_es":"e_s (\uC548\uC815)","lab.s_ap":"\uBA74\uB0B4 \uC9C4\uD3ED A_p","lab.s_phip":"\uBA74\uB0B4 \uC704\uC0C1","lab.s_az":"\uBA74\uC678 \uC9C4\uD3ED A_z","lab.s_phiz":"\uBA74\uC678 \uC704\uC0C1","lab.sign_out":"+ \uBC14\uAE65\uCABD","lab.sign_in":"\u2212 \uC9C0\uAD6C \uCABD","lab.outside":"\uBC94\uC704 \uBC16 \uD5C8\uC6A9 (\uC678\uC0BD \u2014 \uC5F0\uAD6C \uD504\uB9AC\uC14B\uB9CC)","lab.col_r":"\uAE30\uC900 R","lab.col_truth":"\uC815\uB2F5 [\uC77C]","lab.col_t3":"T3 [\uC77C]","lab.col_d24":"D24 [\uC77C]","lab.col_mlp":"MLP-C_ln [\uC77C]","lab.col_hybrid":"\uD558\uC774\uBE0C\uB9AC\uB4DC [\uC77C] \u2014 \uD310\uC815: \uAE30\uAC01","lab.col_dt3":"T3 \uCC28 \u0394ln t","lab.col_dd24":"D24 \uCC28 \u0394ln t","lab.col_dmlp":"MLP \uCC28 \u0394ln t","lab.col_dir":"\uBC29\uD5A5 (e_u*)","lab.col_flag":"\uC2E0\uB8B0\uB3C4","lab.flag_extrap":"\uC678\uC0BD","lab.flag_unc":"\uBD88\uD655\uC2E4","lab.flag_unc_mismatch":"MLP-C_ln \uACFC T3 \uC758 \uCC28\uAC00 \uAC80\uC99D RMSE_log \uC758 3 \uBC30\uB97C \uB118\uC74C (\uC0AC\uC804 \uB4F1\uB85D 5\uC808)","lab.flag_unc_spread":"MLP \uC2DC\uB4DC 3 \uAC1C\uC758 \uD37C\uC9D0\uC774 \uAC80\uC99D \uC911\uC559\uAC12\uC758 3 \uBC30\uB97C \uB118\uC74C (\uC0AC\uC804 \uB4F1\uB85D 5\uC808)","lab.extrap_long":"\uC678\uC0BD \u2014 \uC2E0\uB8B0\uD558\uC9C0 \uC54A\uC74C (\uD559\uC2B5 \uBC94\uC704 \uBC16)","lab.no_escape":"\uBBF8\uC774\uD0C8","lab.dir_hit":"\uB9DE\uC74C","lab.dir_miss":"\uD2C0\uB9BC","lab.waiting":"\uC190\uC744 \uB193\uC73C\uBA74 \uC815\uB2F5 \uC801\uBD84 \uC2DC\uC791","lab.integrating":"\uC815\uB2F5 \uC801\uBD84 \uC911 (Worker)\u2026","lab.integrating_days":"\uC815\uB2F5 \uC801\uBD84 \uC911 \u2014 {d} \uC77C","lab.done":"\uC815\uB2F5 \uC801\uBD84 \uB05D ({ms} ms, \uADA4\uC801 \uC810 {n} \uAC1C)","lab.error":"\uC624\uB958: {msg}","lab.hybrid_note":"\uD558\uC774\uBE0C\uB9AC\uB4DC = T3\xB7D24 \uB97C R \uB9C8\uB2E4 \uC774\uC5B4 \uBD99\uC778 \uAC83 \u2014 \uBB34\uAC8C w_R 6 \uAC1C\uAC00 \uBAA8\uB450 0 \uC774\uB77C D24 \uC640 \uAC19\uB2E4. \uC0AC\uC804 \uB4F1\uB85D \uD310\uC815 (H): \uAE30\uAC01 (\uAD6C\uC870\uC801), \uC794\uCC28 \uBAA8\uB378 \uD310\uC815 (R): \uC9C0\uC9C0. ","lab.foot":"T3 = \uC120\uD615 \uC774\uB860 + 2\uCC28 \uBCF4\uC815 e_u*, D24 = T3 + RF \uC794\uCC28 (50 \uADF8\uB8E8), MLP-C_ln = \uC2E0\uACBD\uB9DD \uC2DC\uB4DC 3 \uD3C9\uADE0. \uC815\uB2F5 = DOP853 \uC801\uBD84 (rtol 1e-12, \uCD5C\uB300 730.5 \uC77C, 0.316\u03B3 \uC5D0\uC11C \uBA48\uCDA4). \u0394ln t = \uC608\uCE21 \u2212 \uC815\uB2F5.","lab.mobile_note":"\uC2E4\uD5D8\uC2E4\uC740 \uCEF4\uD4E8\uD130\uC5D0\uC11C \uC774\uC6A9\uD574 \uC8FC\uC138\uC694. \uD734\uB300\uD3F0 \uD654\uBA74\uC5D0\uC11C\uB294 \uC2AC\uB77C\uC774\uB354\uC640 \uACB0\uACFC \uD45C\uAC00 \uC881\uC544 \uCD08\uAE30 \uC0C1\uD0DC\uB97C \uC815\uD655\uD788 \uB193\uAE30 \uC5B4\uB835\uC2B5\uB2C8\uB2E4. (\uC548\uB0B4 \uBB38\uAD6C \uCD08\uC548 \u2014 \uC0AC\uC6A9\uC790 \uD655\uC778 \uB300\uAE30)","time.go":"\uC774\uB3D9","time.out_of_range":"\uC790\uB8CC \uAE30\uAC04 \uBC16 (2022-01-01 ~ 2049-12-31)","time.loading":"\uCC9C\uCCB4\uB825 \uBD88\uB7EC\uC624\uB294 \uC911\u2026","l2.view_solar":"\uD0DC\uC591\uACC4","body.mercury":"\uC218\uC131\uACC4","body.venus":"\uAE08\uC131\uACC4","body.mars":"\uD654\uC131\uACC4","body.jupiter":"\uBAA9\uC131\uACC4","body.saturn":"\uD1A0\uC131\uACC4","body.uranus":"\uCC9C\uC655\uC131\uACC4","body.neptune":"\uD574\uC655\uC131\uACC4","desc.Mercury":"\uC218\uC131 (\uD589\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC \u2014 \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 12 \uC2DC\uAC04 \uAC04\uACA9) \uBCF4\uAC04\uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C.","desc.Venus":"\uAE08\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 2 \uC77C \uAC04\uACA9) \uBCF4\uAC04\uC744 \uB9E5\uB3D9 \uC88C\uD45C\uB85C.","desc.Mars":"\uD654\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 4 \uC77C \uAC04\uACA9).","desc.Jupiter":"\uBAA9\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 16 \uC77C \uAC04\uACA9).","desc.Saturn":"\uD1A0\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","desc.Uranus":"\uCC9C\uC655\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","desc.Neptune":"\uD574\uC655\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC (\uD589\uC131 + \uC704\uC131, \uACB0\uC815 \u246E). \uC704\uCE58 = M4 \uCC9C\uCCB4\uB825 (DE441, 32 \uC77C \uAC04\uACA9).","view.true_size":"\uC2E4\uC81C \uD06C\uAE30","view.true_size_title":"\uCC9C\uCCB4 \uD06C\uAE30 \uACFC\uC7A5 (\uD654\uBA74\uC5D0\uC11C \uC791\uC73C\uBA74 \uD0A4\uC6C0 \u2014 \uD45C\uC2DC\uC6A9 \uADFC\uC0AC) \uB044\uAE30","layer.planets":"\uD589\uC131\uACC4","layer.stars":"\uBCC4","layer.milkyway":"\uC740\uD558\uC218","layer.clouds":"\uAD6C\uB984 (\uD45C\uC2DC\uC6A9 \u2014 \uADF8\uB0A0 \uAD6C\uB984 \uC544\uB2D8)","layer.nightlights":"\uC9C0\uAD6C \uBC24 \uBD88\uBE5B","layer.sunglow":"\uD0DC\uC591 \uBE5B \uBC88\uC9D0","sky.credits_stars":"\uBCC4: HYG v4.4 (David Nash, CC BY-SA 4.0)","sky.credits_mw":"\uC740\uD558\uC218: ESA/Gaia/DPAC (CC BY-SA 3.0 IGO)","sky.credits_moon":"\uB2EC: NASA SVS (\uACF5\uACF5 \uC601\uC5ED)","sky.credits_horizons":"\uADA4\uB3C4: JPL Horizons","sky.credits_earth":"\uC9C0\uAD6C \uD45C\uBA74: NASA Earth Observatory (Blue Marble\xB7Black Marble)","credits.short":"\uCD9C\uCC98","credits.images":"\uADF8\uB9BC\xB7\uC790\uB8CC \uCD9C\uCC98","credits.open":"\uADF8\uB9BC\xB7\uC790\uB8CC \uCD9C\uCC98 \uBCF4\uAE30 (\uCD9C\uCC98 \uCC3D)","credits.nasa_rule":"NASA \uD45C\uAE30 \uADFC\uAC70 (\uC6D0\uBB38):","nav.label":"\uD0D0\uC0C9","nav.targets":"\uB300\uC0C1 \uBAA9\uB85D (T)","nav.targets_panel":"\uB300\uC0C1 \uBAA9\uB85D","nav.targets_close":"\uB300\uC0C1 \uBAA9\uB85D \uB2EB\uAE30","nav.search_ph":"\uC774\uB984\uC73C\uB85C \uCC3E\uAE30","tr.label":"\uC804\uC5ED","tr.search":"\uAC80\uC0C9","tr.search_title":"\uAC80\uC0C9 ( / )","tr.settings":"\uC124\uC815","mode.label":"\uD654\uBA74 \uBAA8\uB4DC","mode.general":"\uC77C\uBC18","mode.expert":"\uC804\uBB38\uAC00","layer.view_options":"\uBCF4\uAE30 \uC635\uC158","settings.lang":"\uC5B8\uC5B4","settings.legend":"\uD654\uBA74 \uC77D\uB294 \uBC95","settings.keys":"\uB2E8\uCD95\uD0A4","settings.about":"\uC815\uBCF4","tgt.g_tour":"\uB458\uB7EC\uBCF4\uAE30","tgt.g_views":"\uBCF4\uAE30","tgt.g_points":"\uB77C\uADF8\uB791\uC8FC \uC810","tgt.g_orbits":"\uADA4\uB3C4 \xB7 \uC6B0\uC8FC\uC120","tgt.g_bodies":"\uCC9C\uCCB4","tgt.g_tools":"\uB3C4\uAD6C","tgt.tour":"\uCC98\uC74C\uBD80\uD130 \uB458\uB7EC\uBCF4\uAE30","tgt.tour_soon":"\uB458\uB7EC\uBCF4\uAE30\uB294 \uC544\uC9C1 \uC900\uBE44 \uC911 (\uB2E4\uC74C \uB2E8\uACC4\uC5D0\uC11C \uB123\uC74C)","kind.point":"\uB77C\uADF8\uB791\uC8FC \uC810","kind.orbit":"\uADA4\uB3C4","kind.craft":"\uC6B0\uC8FC\uB9DD\uC6D0\uACBD","kind.period":"\uADA4\uB3C4 \uC8FC\uAE30 \uBE44\uAD50","kind.star":"\uD56D\uC131","kind.planet":"\uD589\uC131","kind.moon":"\uC704\uC131","kind.bary":"\uC9C8\uB7C9\uC911\uC2EC","kind.system":"\uD589\uC131\uACC4 \uC9C8\uB7C9\uC911\uC2EC","kind.view":"\uBCF4\uAE30","kind.zoom":"\uD655\uB300 \uBCF4\uAE30","kind.numbers":"\uC22B\uC790 \uBAA8\uC74C","desc.v_all":"\uD0DC\uC591 \uC911\uC2EC\uC758 \uB113\uC740 \uBCF4\uAE30 \u2014 \uC9C0\uAD6C \uACF5\uC804 \uADA4\uB3C4\uAC00 \uD55C \uD654\uBA74\uC5D0. \uD720\uB85C \uC904\uC774\uBA74 \uD0DC\uC591\uACC4 \uC804\uCCB4\uAE4C\uC9C0 \uBCFC \uC218 \uC788\uB2E4.","desc.v_emb":"\uC9C0\uAD6C\u2013\uB2EC \uC9C8\uB7C9\uC911\uC2EC \uB458\uB808 \u2014 \uC9C0\uAD6C\xB7\uB2EC\uACFC L1\xB7L2 \uAC00 \uD55C \uD654\uBA74\uC5D0 (\uC5F0\uAD6C \uC124\uBA85\uC6A9).","desc.v_l2zoom":"L2 \uC810 \uB458\uB808\uB97C \uC218\uBC31 km \uAC70\uB9AC\uC5D0\uC11C \uBCF8\uB2E4.","info.label":"\uC815\uBCF4 \uD328\uB110","info.close":"\uC815\uBCF4 \uD328\uB110 \uB2EB\uAE30","info.more":"\uB354 \uBCF4\uAE30","info.expert_hint":"\uBAA8\uB4E0 \uC22B\uC790\xB7\uCD9C\uCC98\uB294 \uC804\uBB38\uAC00 \uBAA8\uB4DC\uC5D0\uC11C","info.focus_only":"\uCD08\uC810\uB9CC","info.fly":"\uB0A0\uC544\uAC00\uAE30","jwst.zoom_title":"\uD655\uB300\uD574\uC11C \uBCF4\uAE30","jwst.zoom_r5":"5 \uC77C \uC9C0\uC810","jwst.zoom_window":"\uCC3D {w} \uB05D","time.group":"\uC2DC\uAC04","time.slider":"\uC2DC\uAC01","time.speed_menu":"\uC7AC\uC0DD \uC18D\uB3C4","time.speed_title":"\uC7AC\uC0DD \uC18D\uB3C4 (\uB204\uB974\uBA74 \uACE0\uB974\uAE30)","time.local":"\uC9C0\uC5ED","time.date_aria":"\uD654\uBA74 \uC2DC\uAC01 {utc} UTC (\uC9C0\uC5ED \uC2DC\uAC01 {local}, {zone}) \u2014 \uB204\uB974\uBA74 \uB0A0\uC9DC \uACE0\uB974\uAE30","time.now_title":"\uAE30\uAE30\uC758 \uC9C0\uAE08 \uC2DC\uAC01\uC73C\uB85C (\uBD84 \uB2E8\uC704)","time.now_out":"\uAE30\uAE30\uC758 \uC9C0\uAE08 \uC2DC\uAC01\uC774 \uC790\uB8CC \uAE30\uAC04 \uBC16\uC774\uB77C \uC4F8 \uC218 \uC5C6\uC74C","time.date_pop":"\uB0A0\uC9DC\uB85C \uC774\uB3D9","time.date_utc_note":"\uACE0\uB978 \uB0A0\uC9DC\uC758 UTC 0 \uC2DC\uB85C \uC774\uB3D9\uD55C\uB2E4","time.date_input":"\uB0A0\uC9DC","credits.long":"\uCD9C\uCC98\xB7\uB77C\uC774\uC120\uC2A4","hint.label":"\uCC98\uC74C \uC548\uB0B4","hint.lead":"\uD0DC\uC591 \uBC18\uB300\uCABD, JWST \uAC00 \uBA38\uBB34\uB294 \uD3C9\uD615\uC810 L2","hint.how":"\uB04C\uC5B4\uC11C \uB3CC\uB9AC\uAE30 \xB7 \uD720\uB85C \uD655\uB300","hint.tour":"\uB458\uB7EC\uBCF4\uAE30","hint.close":"\uC548\uB0B4 \uB2EB\uAE30","tag.open_hint":"\uB20C\uB7EC\uC11C \uCD9C\uCC98 \uBCF4\uAE30","tag.pop_label":"\uAF2C\uB9AC\uD45C\uC640 \uCD9C\uCC98","tag.pop_source":"\uCD9C\uCC98","tag.pop_open":"\uCD9C\uCC98 \uCC3D \uC5F4\uAE30"};var df={"app.title":"Sun\u2013Earth/Moon L2","app.subtitle":"Stage 7 3D visualization \xB7 M2 JWST layer","lang.switch":"\uD55C\uAD6D\uC5B4","lang.switch_title":"Switch language","version.commit":"commit","version.dirty":"uncommitted changes","version.title":"Version \xB7 build date (KST) \xB7 commit","panel.samples":"Tag test numbers","panel.samples_note":"Click a number to open its source window. Hover a tag to see the detailed category.","tag.weak":"weak","tag.display_approx":"display approximation","source.title":"Source","source.value":"Value","source.unit":"Unit","source.file":"File","source.key":"Key","source.commit":"Computed by","source.source_hash":"Source hash (first 12)","source.ref_commit":"Reference commit","source.build":"App build","source.stage":"Stage","source.model":"Model","source.verification":"Verification tag","source.note":"Note","source.close":"Close","source.browser_calc":"Browser calculation (passed the Python match test, tolerance {tol})","source.time_scale":"Time scale","pwa.update":"New version available \u2014 reload","pwa.offline_ready":"Ready offline","error.load":"Could not read data: {msg}","error.schema":"Data format error: {msg}","body.sun":"Sun","body.emb":"EMB (Earth\u2013Moon barycenter)","body.earth":"Earth","body.moon":"Moon","l2.panel":"L2 scene","l2.mode":"Frame","l2.mode_rot":"Rotating","l2.mode_inertial":"Inertial","l2.view":"View","l2.view_all":"Whole","l2.view_emb":"Earth\u2013Moon\u2013L1/L2","l2.view_l2":"Near L2","l2.view_l2zoom":"L2 close-up","l2.time":"Time","l2.play":"Play","l2.pause":"Pause","l2.speed":"{n} d/s","l2.layer_lpoints":"Lagrange points","l2.layer_bodies":"Sun & EMB","l2.layer_dirs":"L2 unstable/stable directions","l2.layer_earthmoon":"Earth & Moon (real ephemeris)","l2.layer_halo":"3-C halo family","l2.layer_escape":"3-B escape trajectories","l2.layer_burns":"Correction maneuvers (3-A, 3-C, 4-C)","l2.layer_ref":"4-C/4-D reference orbits","l2.unstable":"unstable","l2.stable":"stable","l2.halo_main":"Main halo orbit","l2.g_lpoints":"Lagrange points (stage 1)","l2.g_dirs":"L2 directions (stage 2)","l2.g_halo":"Main halo orbit (3-C)","l2.g_annual":"Annual \u0394v (3-A, 3-C, 4-C)","l2.g_ref":"Reference orbits vs halo (4-C, 4-D)","l2.g_escape":"Escape times (3-B)","l2.g_interp":"Ephemeris interpolation error (4-A)","l2.g_m0":"Tag test numbers (M0)","l2.legend_markers":"Marker sizes and arrow lengths are not to scale (display only). Click a number for its source.","l2.legend_pulsating":"Earth & Moon: real ephemeris (DE441) in the pulsating frame \u2014 length unit = instantaneous Sun\u2013EMB distance. The 4-C/4-D reference orbits use the same frame.","l2.legend_inertial":"Inertial frame: x = ecliptic J2000 X, z = orbit normal (\u2248 ecliptic north). The CR3BP rotating frame turned by \u03B8 = \u03B8\u2080 + (t \u2212 2026-01-01 TDB)/time unit (\u03B8\u2080 = EMB's ecliptic longitude on that date).","source.browser":"Computed in","l2.escape_rule":"Examples picked for display (rule: for each sign of e_u*, the main sample whose |e_u*|/\u03B3 is closest to 1e-9, 1e-7, 1e-5; escaped past 0.316\u03B3, noise-dominated samples excluded)","panel.open":"Show panel","panel.close":"Hide panel","ui.layers":"Layers","ui.legend":"Legend","ui.numbers":"All numbers","ui.menu":"Menu","card.sphere_note":"Spheres are enlarged to be visible (true radius: Horizons header)","card.no_numbers":"No result numbers for this object yet","l2.family_all":"Show the whole halo family (default: a subset)","l2.legend_spheres":"Sun, Earth and Moon are spheres \u2014 enlarged when too small to see","tag.short_impl":"impl.","tag.short_external":"ext.","tag.short_physical":"phys.","preset.clean":"Clean","preset.explore":"Explore","preset.research":"Research","preset.custom":"Custom","preset.zooming":"Zoomed in","layer.g_bodies":"Bodies & points","layer.g_orbits":"Orbits & paths","layer.g_numbers":"Physical values & tags","layer.g_aux":"Aids","layer.sun":"Sun","layer.earth":"Earth","layer.moon":"Moon","layer.emb":"EMB (Earth\u2013Moon barycentre)","layer.lpoints":"L1 \u2013 L5","layer.halo_main":"Main halo orbit","layer.halo_family":"Halo family","layer.escape":"3-B escape paths","layer.ref":"4-C / 4-D reference orbits","layer.burns":"Correction (\u0394v) points","layer.moon_orbit":"Moon orbit (past 30-day trail)","layer.planet_orbits":"Planet orbits","layer.dirs":"L2 direction lines (unstable / stable)","layer.n_distance":"Distances","layer.n_period":"Periods","layer.n_angle":"Direction angles","layer.n_annual":"Annual \u0394v","layer.n_escape":"Escape times","layer.n_tags":"Verification tags","layer.labels":"Labels","layer.scale":"Distance scale","layer.grid":"Reference-plane grid (orbit plane)","layer.axes":"Coordinate axes","layer.tags_note":"Turning tags off hides every number \u2014 numbers always come with their tag","key.labels":"Labels on / off","key.g_orbits":"Orbits & paths on / off","key.g_numbers":"Physical values & tags on / off","key.g_bodies":"Bodies & points on / off","key.grid":"Reference-plane grid","key.p_clean":"Preset: Clean","key.p_explore":"Preset: Explore","key.p_research":"Preset: Research","key.help":"This help","help.title":"Keyboard shortcuts","help.button":"Shortcuts (?)","help.note":"Layer shortcuts do not bring up the bars. Esc hides the bars. Your layer choice is remembered in this browser.","help.keys_line":"L labels \xB7 O orbits \xB7 N values \xB7 1 2 3 presets","time.start":"To start","time.now":"Now","card.numbers_off":"No value layer is on, so the numbers are hidden (Layers \u2192 Physical values)","desc.Sun":"The Sun \u2014 the larger primary of the CR3BP.","desc.EMB":"The Earth\u2013Moon barycentre \u2014 the CR3BP's second primary (Earth and Moon as one point).","desc.Earth":"Earth, at its real ephemeris (DE441) position in pulsating coordinates. The day\u2013night line follows the sunlight.","desc.Moon":`The Moon. Real ephemeris position. The tail behind is its recent track (fading with age). Surface map: NASA SVS CGI Moon Kit (LRO LROC, public domain \u2014 credit "NASA's Scientific Visualization Studio"). Map orientation is a display approximation (mean Earth-facing side toward Earth, no libration).`,"desc.L1":"Sunward Lagrange point (CR3BP equilibrium, stage 1). Unstable \u2014 not computed directly in this study (page reference for the instability of collinear points still to be confirmed).","desc.L2":"The subject of this study: the anti-sunward equilibrium. It is unstable, so station-keeping (\u0394v) is needed.","desc.L3":"Equilibrium point on the far side of the Sun (CR3BP, stage 1). Its stability was not computed in this study (to be confirmed).","desc.L4":"Leading triangular equilibrium point (CR3BP, stage 1). Linearly stable \u2014 stage 1 Routh test (\u03BC far below the critical mass ratio of Sicardy 2010; implementation verification against literature).","desc.L5":"Trailing triangular equilibrium point (CR3BP, stage 1). Linearly stable \u2014 stage 1 Routh test (same as L4).","desc.halo_main":"The main orbit of the 3-C halo family \u2014 the reference for station-keeping.","l2.view_jwst":"JWST","l2.layer_jwst":"JWST reconstructed trajectory","l2.layer_jwst_ext":"JWST prediction \u2014 vs JPL no-burn prediction","l2.layer_jwst_phys":"JWST prediction \u2014 vs reconstructed trajectory","l2.legend_jwst":"JWST (gold): dots = received points (daily), dashed = interpolation between them (4-A Hermite), solid = received 10-minute points. Predictions: orange = vs JPL's no-burn prediction (external comparison), green = vs the reconstructed trajectory (physical validation); dark = reference, light = my model","layer.jwst":"JWST reconstructed trajectory","layer.jwst_ext":"Prediction \u2014 vs JPL no-burn prediction (external)","layer.jwst_phys":"Prediction \u2014 vs reconstructed trajectory (physical)","layer.n_jwst":"Prediction error","body.jwst":"JWST","desc.JWST":"James Webb Space Telescope. Gold line = reconstructed as-flown trajectory (Horizons, 4-A data): dots = received points (daily), dashed = interpolation between daily nodes, solid = received 10-minute points. Marker = end of the reconstruction. Below: the two comparisons of the stage 5 prediction \u2014 with different tags.","desc.jwst_period":"Compares the length of one circuit of JWST's reconstructed trajectory with NASA's text and with CR3BP halos of the same size.","jwst.orbit_label":"JWST reconstructed","jwst.layer_ext_short":"vs JPL no-burn prediction","jwst.layer_phys_short":"vs reconstructed trajectory","jwst.layer_ext":"Comparison with JPL's no-burn prediction","jwst.layer_phys":"Comparison with the reconstructed trajectory","jwst.rep_5d":"5 d","jwst.axis_note":"Vertical = position difference (km, log), horizontal = days after start. Dots = values written in results/stage5.json","jwst.period_button":"Open the period card","jwst.period_title":"JWST period \u2014 reconstruction vs NASA and halo","jwst.period_class":"Classification","jwst.no_predictions":"No prediction data","jwst.g_ext":"JWST prediction \u2014 vs JPL no-burn prediction (stage 5)","jwst.g_phys":"JWST prediction \u2014 vs reconstructed trajectory (stage 5)","jwst.g_period":"JWST period (4-A)","l2.view_jwstzoom":"JWST zoom","l2.legend_jwstzoom":"JWST zoom (tens of km around a prediction end): big dots = points at the same time, white segments = the position difference between them (numbers are Python values with tags). Lines connect the stored points straight (hourly; JPL 01U daily). Positions are drawn in pulsating coordinates, so drawn distances differ from real ones by under 1 %","jwst.marker_fixed":"position on {date} (fixed)","jwst.zoom_phys":"Zoom in \u2014 representative 5-day point (three lines)","jwst.zoom_ext":"Zoom in \u2014 window end:","jwst.zoom_focus_R5":"JWST zoom \u2014 vs the reconstructed trajectory, representative 5-day point","jwst.zoom_focus_A":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window A","jwst.zoom_focus_B":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window B","jwst.zoom_focus_C":"JWST zoom \u2014 vs JPL's no-burn prediction, end of window C","jwst.zoom_norecon":"No actual-trajectory data (after 2026-10-05)","jwst.zl_recon":"Reconstructed trajectory (03U)","jwst.zl_mine_kB":"My model (k_B)","jwst.zl_jpl01U":"JPL no-burn prediction (01U)","jwst.zl_jpl":"JPL no-burn prediction","jwst.gap_mine_recon":"my model \u2194 reconstruction","jwst.gap_jpl_recon":"JPL \u2194 reconstruction","jwst.gap_mine_jpl":"my model \u2194 JPL","source.join":"Reconstruction join","l2.view_lab":"Lab","lab.title":"Lab \u2014 escape of initial states near L2","lab.scope":"Results inside the CR3BP model (implementation verification \u2014 not physical validation). All numbers are browser calculations (passed Python match tests)","lab.fold":"Fold","lab.unfold":"Unfold","lab.loading":"Loading lab data\u2026 (first time only, about 17 MB)","lab.examples":"Examples","lab.ex_q10":"Fast escape (10 %)","lab.ex_q50":"Middle (50 %)","lab.ex_q90":"Slow escape (90 %)","lab.ex_out":"Out-of-range demo","lab.ex_noise":"Near the noise floor","lab.ex_src":"Example source: {src} (3-B sample no. {no})","lab.s_sign":"Sign of e_u","lab.s_eu":"|e_u| (unstable)","lab.s_es":"e_s (stable)","lab.s_ap":"In-plane amplitude A_p","lab.s_phip":"In-plane phase","lab.s_az":"Out-of-plane amplitude A_z","lab.s_phiz":"Out-of-plane phase","lab.sign_out":"+ outward","lab.sign_in":"\u2212 Earthward","lab.outside":"Allow out of range (extrapolation \u2014 research preset only)","lab.col_r":"Criterion R","lab.col_truth":"Truth [d]","lab.col_t3":"T3 [d]","lab.col_d24":"D24 [d]","lab.col_mlp":"MLP-C_ln [d]","lab.col_hybrid":"Hybrid [d] \u2014 verdict: rejected","lab.col_dt3":"T3 error \u0394ln t","lab.col_dd24":"D24 error \u0394ln t","lab.col_dmlp":"MLP error \u0394ln t","lab.col_dir":"Direction (e_u*)","lab.col_flag":"Confidence","lab.flag_extrap":"extrapolated","lab.flag_unc":"uncertain","lab.flag_unc_mismatch":"MLP-C_ln and T3 differ by more than 3 \xD7 validation RMSE_log (pre-registration \xA75)","lab.flag_unc_spread":"Spread of the 3 MLP seeds exceeds 3 \xD7 the validation median (pre-registration \xA75)","lab.extrap_long":"Extrapolation \u2014 not trusted (outside the training range)","lab.no_escape":"no escape","lab.dir_hit":"correct","lab.dir_miss":"wrong","lab.waiting":"Release to start the truth integration","lab.integrating":"Integrating the truth (Worker)\u2026","lab.integrating_days":"Integrating the truth \u2014 day {d}","lab.done":"Truth integration done ({ms} ms, {n} trajectory points)","lab.error":"Error: {msg}","lab.hybrid_note":"Hybrid = T3 and D24 joined per R \u2014 all six weights w_R are 0, so it equals D24. Pre-registered verdict (H): rejected (structural); residual-model verdict (R): supported. ","lab.foot":"T3 = linear theory + second-order correction e_u*, D24 = T3 + RF residual (50 trees), MLP-C_ln = neural net, mean of 3 seeds. Truth = DOP853 integration (rtol 1e-12, up to 730.5 days, stops at 0.316\u03B3). \u0394ln t = prediction \u2212 truth.","lab.mobile_note":"Please use the lab on a computer. On a phone screen the sliders and result table are too narrow to place an initial state precisely. (Draft notice \u2014 awaiting user confirmation)","time.go":"Go","time.out_of_range":"Outside the data period (2022-01-01 \u2013 2049-12-31)","time.loading":"Loading ephemeris\u2026","l2.view_solar":"Solar system","body.mercury":"Mercury system","body.venus":"Venus system","body.mars":"Mars system","body.jupiter":"Jupiter system","body.saturn":"Saturn system","body.uranus":"Uranus system","body.neptune":"Neptune system","desc.Mercury":"Mercury (system barycenter \u2014 decision \u246E). Position = interpolated M4 ephemeris (DE441, 12 h step) in pulsating coordinates.","desc.Venus":"Venus system barycenter (decision \u246E). Position = interpolated M4 ephemeris (DE441, 2 d step) in pulsating coordinates.","desc.Mars":"Mars system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 4 d step).","desc.Jupiter":"Jupiter system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 16 d step).","desc.Saturn":"Saturn system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","desc.Uranus":"Uranus system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","desc.Neptune":"Neptune system barycenter (planet + moons, decision \u246E). Position = M4 ephemeris (DE441, 32 d step).","view.true_size":"True size","view.true_size_title":"Turn off size exaggeration (bodies enlarged when small on screen \u2014 display approximation)","layer.planets":"Planet systems","layer.stars":"Stars","layer.milkyway":"Milky Way","layer.clouds":"Clouds (display only \u2014 not that day)","layer.nightlights":"Earth night lights","layer.sunglow":"Sun glow","sky.credits_stars":"Stars: HYG v4.4 (David Nash, CC BY-SA 4.0)","sky.credits_mw":"Milky Way: ESA/Gaia/DPAC (CC BY-SA 3.0 IGO)","sky.credits_moon":"Moon: NASA SVS (public domain)","sky.credits_horizons":"Orbits: JPL Horizons","sky.credits_earth":"Earth surface: NASA Earth Observatory (Blue Marble, Black Marble)","credits.short":"Sources","credits.images":"Image and data sources","credits.open":"Show image and data sources (source panel)","credits.nasa_rule":"NASA credit rules (verbatim):","nav.label":"Navigation","nav.targets":"Targets (T)","nav.targets_panel":"Targets","nav.targets_close":"Close targets","nav.search_ph":"Find by name","tr.label":"Global","tr.search":"Search","tr.search_title":"Search ( / )","tr.settings":"Settings","mode.label":"Display mode","mode.general":"General","mode.expert":"Expert","layer.view_options":"View options","settings.lang":"Language","settings.legend":"How to read the screen","settings.keys":"Shortcuts","settings.about":"About","tgt.g_tour":"Tour","tgt.g_views":"Views","tgt.g_points":"Lagrange points","tgt.g_orbits":"Orbits \xB7 spacecraft","tgt.g_bodies":"Bodies","tgt.g_tools":"Tools","tgt.tour":"Guided tour","tgt.tour_soon":"The guided tour is not ready yet (added in a later step)","kind.point":"Lagrange point","kind.orbit":"Orbit","kind.craft":"Space telescope","kind.period":"Orbit-period comparison","kind.star":"Star","kind.planet":"Planet","kind.moon":"Moon","kind.bary":"Barycenter","kind.system":"Planetary-system barycenter","kind.view":"View","kind.zoom":"Close-up","kind.numbers":"Number list","desc.v_all":"Wide Sun-centred view \u2014 Earth's orbit fills the screen. Scroll out to see the whole solar system.","desc.v_emb":"Around the Earth\u2013Moon barycenter \u2014 Earth, Moon, L1 and L2 on one screen (for explaining the study).","desc.v_l2zoom":"L2 seen from a few hundred km away.","info.label":"Info panel","info.close":"Close info panel","info.more":"More","info.expert_hint":"All numbers and sources are in Expert mode","info.focus_only":"Focus only","info.fly":"Fly to","jwst.zoom_title":"Close-up","jwst.zoom_r5":"5-day point","jwst.zoom_window":"Window {w} end","time.group":"Time","time.slider":"Time","time.speed_menu":"Playback speed","time.speed_title":"Playback speed (press to choose)","time.local":"Local","time.date_aria":"Displayed time {utc} UTC (local {local}, {zone}) \u2014 press to pick a date","time.now_title":"Go to the device's current time (to the minute)","time.now_out":"Unavailable: the device's current time is outside the data period","time.date_pop":"Go to a date","time.date_utc_note":"Moves to 00:00 UTC of the chosen date","time.date_input":"Date","credits.long":"Sources \xB7 licences","hint.label":"Welcome","hint.lead":"L2 \u2014 the balance point beyond Earth, opposite the Sun, where JWST stays","hint.how":"Drag to rotate \xB7 scroll to zoom","hint.tour":"Tour","hint.close":"Close","tag.open_hint":"press to see the source","tag.pop_label":"Tag and source","tag.pop_source":"Source","tag.pop_open":"Open source window"};var ka={ko:uf,en:df},hf="lagrange.lang",ls="en",ff=[];function pf(n,e){return e==="ko"||e==="en"?e:typeof n=="string"&&n.toLowerCase().startsWith("ko")?"ko":"en"}function Hg(){try{return localStorage.getItem(hf)}catch{return null}}function Wu(){return ls=pf(typeof navigator<"u"?navigator.language:"",Hg()),document.documentElement.lang=ls,ls}function si(){return ls}function ju(n){ls=n,document.documentElement.lang=n;try{localStorage.setItem(hf,n)}catch{}Lt();for(let e of ff)e(n)}function cr(n){ff.push(n)}function Me(n,e={}){let t=ka[ls][n];if(t===void 0)throw new Error(`\uC0AC\uC804\uC5D0 \uC5C6\uB294 \uD0A4: ${n} (${ls})`);return t.replace(/\{(\w+)\}/g,(i,s)=>String(e[s]))}function Dt(n){return n&&typeof n=="object"?n[ls]??n.ko??"":String(n??"")}function Lt(n=document){for(let e of n.querySelectorAll("[data-i18n]"))e.textContent=Me(e.dataset.i18n);for(let e of n.querySelectorAll("[data-i18n-title]"))e.title=Me(e.dataset.i18nTitle);for(let e of n.querySelectorAll("[data-i18n-aria]"))e.setAttribute("aria-label",Me(e.dataset.i18nAria))}var Ko=new Set,mf=()=>!0;function Gg(n){return/^jwst_err_/.test(n)?"n_jwst":/_dist$|zmax|^shift_|^holdout_|_km$/.test(n)?"n_distance":/period/.test(n)?"n_period":/_deg$/.test(n)?"n_angle":/^annual_|^wrong_ref_|^dv_ratio/.test(n)?"n_annual":/^t316_/.test(n)?"n_escape":"n_other"}function ur(n,e,t){return n.dataset.cat=Gg(e),n.dataset.ctx=t,Ko.add(n),n}function Qo(n){Ko.delete(n)}function gf(n){mf=n}function Wg(n,e){e?n._ph&&n._ph.parentNode&&n._ph.replaceWith(n):n.parentNode&&(n._ph||(n._ph=document.createComment("num-off")),n.replaceWith(n._ph))}function dr(){for(let n of Ko)Wg(n,mf(n.dataset.cat,n.dataset.ctx))}function _f(){let n={};for(let e of Ko){let t=`${e.dataset.ctx}:${e.dataset.cat}`;n[t]=n[t]||{on:0,off:0},e.parentNode&&!(e._ph&&e._ph.parentNode)?n[t].on++:n[t].off++}return n}var xf=["","\u2460","\u2461","\u2462","\u2463","\u2464","\u2465","\u2466"];function Ba(n){return n.source.map(e=>`${e.file}>${e.key}`).join(" | ")}function ki(n,e){let t=document.createElement("span");t.className=`tag tag-${n.tag}`,t.tabIndex=0,t.dataset.tag=n.tag,t.dataset.detail=n.detail;let i=document.createElement("span");i.className="tag-name";let s=document.createElement("span");s.className="tag-tip",s.setAttribute("role","tooltip");let r=()=>{let a=e.details[n.detail];i.textContent=Dt(e.tags[n.tag])+(n.weak!==void 0?` (${Me("tag.weak")})`:""),s.textContent=`${xf[a.no]} ${Dt(a)}`+(n.weak?` \u2014 ${Dt(n.weak)}`:"")};return r(),t.append(i,s),t._render=r,t}function bi(n,e){let t=document.createElement("span");t.className=`tag mini tag-${n.tag}`,t.tabIndex=0,t.dataset.tag=n.tag,t.dataset.detail=n.detail;let i=document.createElement("span");i.className="tag-name";let s=document.createElement("span");return s.className="tag-tip",s.setAttribute("role","tooltip"),t._render=()=>{let r=e.details[n.detail];i.textContent=Me("tag.short_"+n.tag),s.textContent=`${Dt(e.tags[n.tag])} \u2014 ${xf[r.no]} ${Dt(r)}`},t._render(),t.append(i,s),t}function Xn(){let n=document.createElement("span");return n.className="tag tag-approx",n.dataset.i18n="tag.display_approx",n.textContent=Me("tag.display_approx"),n}function Si(n,e,t){let i=document.createElement("div");i.className="num-row";let s=document.createElement("div");s.className="num-label";let r=document.createElement("button");r.type="button",r.className="num",r.dataset.source=Ba(n.provenance),r.dataset.verification=`${n.provenance.verification.tag}/${n.provenance.verification.detail}`,r.dataset.id=n.id,r.addEventListener("click",()=>t(n)),i.dataset.source=r.dataset.source,i.dataset.verification=r.dataset.verification;let a=ki(n.provenance.verification,e),o=()=>{let l=n.unit&&typeof n.unit=="object"?Dt(n.unit):n.unit;r.textContent=n.text+(l?l==="\xB0"||l==="\xD7"?l:` ${l}`:""),s.textContent=Dt(n.label),a._render()};return o(),i.append(s,r,a),i._render=o,i._item=n,ur(i,n.id,"row"),i}var bn=null,za=null,Yu=null,vf=()=>"",el=null;function bf(n){el=n||null}function jg(){let n=document.createElement("span");n.className="join-line",n.append(document.createTextNode(Dt(el.text)+" "));for(let e of el.items){let t=document.createElement("span");t.className="join-num",t.dataset.source=e.provenance.source.map(r=>`${r.file}>${r.key}`).join(" | "),t.dataset.verification=`${e.provenance.verification.tag}/${e.provenance.verification.detail}`;let i=document.createElement("span");i.dataset.meta="",i.textContent=Dt(e.label)+" ";let s=document.createElement("b");s.textContent=`${e.text} ${e.unit}`,s.title=Dt(e.note),t.append(i,s,document.createTextNode(" "),bi(e.provenance.verification,Yu)),n.append(t)}return n}function Cn(n,e){let t=document.createElement("tr"),i=document.createElement("th");i.textContent=Me(n);let s=document.createElement("td");return s.append(e),t.append(i,s),t}function Bi(n){let e=document.createElement("code");return e.dataset.literal="",e.textContent=n,e}function Sf(){if(!za)return;let n=za,e=n.provenance;bn.dataset.source=e.source.map(r=>`${r.file}>${r.key}`).join(" | "),bn.dataset.verification=`${e.verification.tag}/${e.verification.detail}`,bn.querySelector("h2").textContent=`${Me("source.title")} \u2014 ${Dt(n.label)}`;let t=bn.querySelector("tbody");t.replaceChildren(),t.append(Cn("source.value",Bi(String(n.value)))),t.append(Cn("source.unit",document.createTextNode(n.unit||"-")));for(let r of e.source)t.append(Cn("source.file",Bi(r.file))),t.append(Cn("source.key",Bi(r.key)));if(t.append(Cn("source.commit",Bi(e.computed_by))),e.source_hash){let r=Bi(e.source_hash.slice(0,12));r.title=e.source_hash,t.append(Cn("source.source_hash",r))}e.ref_commit&&t.append(Cn("source.ref_commit",Bi(e.ref_commit))),t.append(Cn("source.stage",Bi(e.stage)));let i=document.createElement("span");i.append(Bi(e.model)),e.model_ko&&e.model_ko!=="-"&&i.append(document.createTextNode(Dt({ko:` \u2014 ${e.model_ko}`,en:""}))),t.append(Cn("source.model",i));let s=ki(e.verification,Yu);s.classList.add("tag-open"),t.append(Cn("source.verification",s)),t.append(Cn("source.build",Bi(vf()))),n.browser_calc&&t.append(Cn("source.browser",document.createTextNode(Me("source.browser_calc",{tol:n.browser_calc.tolerance})))),t.append(Cn("source.note",document.createTextNode(Dt(n.note)))),el&&/^jwst_/.test(n.id||"")&&t.append(Cn("source.join",jg())),bn.querySelector(".close").textContent=Me("source.close")}function Mf(n,e){Yu=n,e&&(vf=e),bn=document.getElementById("source"),bn.querySelector(".close").addEventListener("click",tl),document.addEventListener("keydown",t=>{t.key==="Escape"&&tl()})}function nl(n){za=n,Va=null,Sf(),bn.hidden=!1}function tl(){za=null,Va=null,bn.hidden=!0}function wf(){Va?Ha(Va):Sf()}var Va=null;function Ha(n){Va=n,za=null,delete bn.dataset.source,delete bn.dataset.verification,bn.querySelector("h2").textContent=`${Me("source.title")} \u2014 ${Me("credits.images")}`;let e=bn.querySelector("tbody");e.replaceChildren(yf("tr",yf("td",n()))),e.firstChild.firstChild.colSpan=2,bn.querySelector(".close").textContent=Me("source.close"),bn.hidden=!1}var yf=(n,...e)=>{let t=document.createElement(n);return t.append(...e),t};var Xg=[{what:{ko:"\uC9C0\uAD6C \uB0AE \uD45C\uBA74",en:"Earth day surface"},credit:{ko:"NASA Earth Observatory \u2014 Blue Marble Next Generation (2004\uB144 7\uC6D4 \uC601\uC0C1)",en:"NASA Earth Observatory \u2014 Blue Marble Next Generation (July 2004 imagery)"},approx:{ko:"\uD55C \uB2EC (2004\uB144 7\uC6D4) \uC601\uC0C1 \uACE0\uC815 \u2014 \uACC4\uC808 \uB208\xB7\uC2DD\uC0DD\uC740 \uB0A0\uC9DC\uC640 \uB2E4\uB984",en:"one month (July 2004) fixed \u2014 seasonal snow and vegetation do not follow the date"},license:{ko:"NASA \uC790\uB8CC \u2014 \uBBF8\uAD6D \uC800\uC791\uAD8C \uB300\uC0C1 \uC544\uB2D8. \uD45C\uAE30 \uC758\uBB34\uB294 NASA (Earth Observatory \uC9C0\uCE68)",en:"NASA material \u2014 not subject to US copyright. Mandatory credit: NASA (Earth Observatory policy)"},url:"https://science.nasa.gov/earth/earth-observatory/blue-marble-next-generation/base-map"},{what:{ko:"\uC9C0\uAD6C \uBC24 \uBD88\uBE5B",en:"Earth night lights"},credit:{ko:"NASA Earth Observatory \u2014 Black Marble 2016 (Suomi NPP VIIRS)",en:"NASA Earth Observatory \u2014 Black Marble 2016 (Suomi NPP VIIRS)"},approx:{ko:"\uBD88\uBE5B \uBC1D\uAE30 \uACE1\uC120\xB7\uB0AE\uBC24 \uACBD\uACC4 \uC11E\uAE30\uB294 \uD45C\uC2DC\uC6A9",en:"light curve and day\u2013night blending are for display"},license:{ko:"NASA \uC790\uB8CC \u2014 \uBBF8\uAD6D \uC800\uC791\uAD8C \uB300\uC0C1 \uC544\uB2D8. \uD45C\uAE30 \uC758\uBB34\uB294 NASA (Earth Observatory \uC9C0\uCE68)",en:"NASA material \u2014 not subject to US copyright. Mandatory credit: NASA (Earth Observatory policy)"},url:"https://science.nasa.gov/earth/earth-observatory/earth-at-night/maps"},{what:{ko:"\uC9C0\uAD6C \uAD6C\uB984 \uCE35",en:"Earth cloud layer"},credit:{ko:"Solar System Scope (8K \uAD6C\uB984 \uADF8\uB9BC, NASA \uC790\uB8CC \uAE30\uBC18)",en:"Solar System Scope (8K clouds, based on NASA imagery)"},approx:{ko:"\uD45C\uC2DC\uC6A9 \u2014 \uADF8\uB0A0\uC758 \uAD6C\uB984\uC774 \uC544\uB2D8. \uC9C0\uAD6C\uC640 \uD568\uAED8 \uC790\uC804\uD558\uB294 \uACE0\uC815\uB41C \uADF8\uB9BC",en:"display only \u2014 not the clouds of that day; a fixed map rotating with Earth"},license:{ko:"CC BY 4.0",en:"CC BY 4.0"},url:"https://www.solarsystemscope.com/textures/"},{what:{ko:"\uBC14\uB2E4 \uBC18\uC0AC\uC758 \uC721\uC9C0\xB7\uBC14\uB2E4 \uACBD\uACC4",en:"Land\u2013ocean mask for sun glint"},credit:{ko:"Natural Earth (10m \uC721\uC9C0\xB7\uD638\uC218 \uC724\uACFD\uC744 \uCE78\uB9C8\uB2E4 \uBA74\uC801 \uBE44\uC728\uB85C \uBCC0\uD658)",en:"Natural Earth (10m land and lakes, rasterised as area fraction)"},approx:{ko:"\uBC18\uC0AC \uC138\uAE30\xB7\uBC88\uC9D0\uC740 \uD45C\uC2DC\uC6A9 (\uBE14\uB9B0-\uD401 \uADFC\uC0AC). \uC724\uACFD\uC774 Blue Marble \uD574\uC548\uACFC \uC218 km \uC5B4\uAE0B\uB0A0 \uC218 \uC788\uC74C",en:"glint strength and width are for display (Blinn-Phong); outlines may differ from Blue Marble coasts by a few km"},license:{ko:"\uACF5\uACF5 \uC601\uC5ED",en:"Public domain"},url:"https://www.naturalearthdata.com/about/terms-of-use/"},{what:{ko:"\uB2EC \uD45C\uBA74",en:"Moon surface"},credit:{ko:"NASA's Scientific Visualization Studio \u2014 CGI Moon Kit (LRO LROC \uC0C9 \uBAA8\uC790\uC774\uD06C)",en:"NASA's Scientific Visualization Studio \u2014 CGI Moon Kit (LRO LROC color mosaic)"},license:{ko:"\uACF5\uACF5 \uC601\uC5ED (NASA SVS)",en:"Public domain (NASA SVS)"},url:"https://svs.gsfc.nasa.gov/4720/"},{what:{ko:"\uD654\uC131 \uD45C\uBA74",en:"Mars surface"},credit:{ko:"NASA / USGS Astrogeology \u2014 Viking MDIM 2.1 \uC0C9 \uC804\uAD6C \uBAA8\uC790\uC774\uD06C (1 km \uD310)",en:"NASA / USGS Astrogeology \u2014 Viking MDIM 2.1 colorized global mosaic (1 km product)"},license:{ko:"\uACF5\uACF5 \uC601\uC5ED (USGS \uBAA9\uB85D)",en:"Public domain (USGS catalog)"},url:"https://astrogeology.usgs.gov/search/map/mars_viking_colorized_global_mosaic_232m"},{what:{ko:"\uBAA9\uC131 \uD45C\uBA74",en:"Jupiter surface"},credit:{ko:"NASA/JPL/Space Science Institute \u2014 Cassini \uBAA9\uC131 \uC9C0\uB3C4 (PIA07782, 2000\uB144 12\uC6D4 \uCD2C\uC601)",en:"NASA/JPL/Space Science Institute \u2014 Cassini map of Jupiter (PIA07782, taken December 2000)"},approx:{ko:"2000\uB144 12\uC6D4\uC758 \uAD6C\uB984 \uBB34\uB2AC \uACE0\uC815 \u2014 \uBB34\uB2AC\uB294 \uC2E4\uC81C\uB85C \uC6C0\uC9C1\uC784 (\uB300\uC801\uC810 \uC704\uCE58 \uD3EC\uD568)",en:"cloud pattern fixed at December 2000 \u2014 real features move, including the Great Red Spot"},license:{ko:"NASA/JPL \uC774\uBBF8\uC9C0 (JPL Image Use Policy)",en:"NASA/JPL image (JPL Image Use Policy)"},url:"https://science.nasa.gov/photojournal/cassinis-best-maps-of-jupiter-cylindrical-map"},{what:{ko:"\uC218\uC131\xB7\uAE08\uC131\xB7\uD1A0\uC131\xB7\uCC9C\uC655\uC131\xB7\uD574\uC655\uC131 \uD45C\uBA74, \uD1A0\uC131 \uACE0\uB9AC",en:"Mercury, Venus, Saturn, Uranus, Neptune surfaces, Saturn rings"},credit:{ko:"Solar System Scope (NASA \uACE0\uB3C4\xB7\uC601\uC0C1 \uC790\uB8CC \uAE30\uBC18)",en:"Solar System Scope (based on NASA elevation and imagery data)"},approx:{ko:"\uAE08\uC131\uC740 \uAD6C\uB984 \uADF8\uB9BC\uC73C\uB85C \uD2B9\uC815 \uC2DC\uAC01\uC758 \uAD00\uCE21\uC774 \uC544\uB2D8. \uAD6C\uB984\xB7\uB300\uAE30 \uBB34\uB2AC\uB294 \uACE0\uC815",en:"Venus is a cloud texture, not an observation at a given time. Cloud and atmosphere patterns are fixed"},license:{ko:"CC BY 4.0 (\uC904\uC774\uACE0 \uD615\uC2DD\uC744 \uBC14\uAFC8)",en:"CC BY 4.0 (resized and re-encoded)"},url:"https://www.solarsystemscope.com/textures/"},{what:{ko:"\uD589\uC131 \uC790\uC804\uCD95\xB7\uC790\uC804\uAC01",en:"Planet rotation axes and angles"},credit:{ko:"IAU WGCCRE 2015 \uBCF4\uACE0\uC11C (Archinal \uC678 2018) \u2014 NAIF pck00011.tpc",en:"IAU WGCCRE 2015 report (Archinal et al. 2018) \u2014 NAIF pck00011.tpc"},license:{ko:"NAIF \uACF5\uAC1C \uC790\uB8CC",en:"NAIF public data"},url:"https://naif.jpl.nasa.gov/pub/naif/generic_kernels/pck/pck00011.tpc"},{what:{ko:"\uC740\uD558\uC218",en:"Milky Way"},credit:{ko:"ESA/Gaia/DPAC \u2014 Gaia DR2 sky in colour. \uAC10\uC0AC: Gaia DPAC; A. Moitinho / A. F. Silva / M. Barros / C. Barata (University of Lisbon); H. Savietto (Fork Research)",en:"ESA/Gaia/DPAC \u2014 Gaia DR2 sky in colour. Acknowledgement: Gaia DPAC; A. Moitinho / A. F. Silva / M. Barros / C. Barata (University of Lisbon); H. Savietto (Fork Research)"},approx:{ko:"\uBC1D\uAE30 \uBC30\uC728\uC740 \uD45C\uC2DC\uC6A9",en:"brightness gain is for display"},license:{ko:"CC BY-SA 3.0 IGO (\uC904\uC778 \uADF8\uB9BC\uB3C4 \uAC19\uC740 \uC870\uAC74)",en:"CC BY-SA 3.0 IGO (resized copies under the same terms)"},url:"https://sci.esa.int/web/gaia/-/60196-gaia-s-sky-in-colour-equirectangular-projection"},{what:{ko:"\uBCC4",en:"Stars"},credit:{ko:"HYG Database v4.4 \u2014 David Nash (astronexus)",en:"HYG Database v4.4 \u2014 David Nash (astronexus)"},approx:{ko:"\uBCC4 \uD06C\uAE30\xB7\uC0C9\uC740 \uD45C\uC2DC\uC6A9",en:"star size and color are for display"},license:{ko:"CC BY-SA 4.0 (\uACE0\uB978 \uBCC4 \uD30C\uC77C\uB3C4 \uAC19\uC740 \uC870\uAC74)",en:"CC BY-SA 4.0 (derived star file under the same terms)"},url:"https://codeberg.org/astronexus/hyg"},{what:{ko:"\uCC9C\uCCB4 \uC704\uCE58\xB7JWST \uADA4\uC801",en:"Body positions and JWST trajectory"},credit:{ko:"NASA/JPL Horizons System (\uCC9C\uCCB4\uB825 DE441, JWST \uC7AC\uAD6C\uC131\xB7\uBB34\uBD84\uC0AC \uC608\uCE21 \uADA4\uC801)",en:"NASA/JPL Horizons System (DE441 ephemeris, JWST reconstructed and no-burn predicted trajectories)"},license:{ko:"\uBBF8\uB9AC \uBC1B\uC544 \uB454 \uC790\uB8CC \u2014 \uC2E4\uD589 \uC911 Horizons \uB97C \uBD80\uB974\uC9C0 \uC54A\uC74C. \uCD9C\uCC98 \uD45C\uAE30",en:"Retrieved in advance \u2014 Horizons is not called at run time. Credit given"},url:"https://ssd.jpl.nasa.gov/horizons/"},{what:{ko:"\uD589\uC131 \uACF5\uC804 \uADA4\uB3C4\uC120",en:"Planet orbit lines"},credit:{ko:"NASA/JPL Horizons (DE441) \uC0C1\uD0DC \uBCA1\uD130\uB85C \uADF8 \uC2DC\uAC01\uC758 \uC811\uCD09 \uD0C0\uC6D0\uC744 \uADF8\uB9BC. \uD654\uBA74 \uCD95\uC18C \uBC94\uC704 \uACC4\uC0B0\uC5D0 JPL Solar System Dynamics \uC758 \uADFC\uC0AC \uADA4\uB3C4 \uC694\uC18C (E. M. Standish)",en:"Osculating ellipse drawn from NASA/JPL Horizons (DE441) state vectors at the displayed time. Zoom range uses JPL Solar System Dynamics approximate orbital elements (E. M. Standish)"},approx:{ko:"\uADF8 \uC21C\uAC04\uC758 \uADA4\uB3C4 \uBAA8\uC591 \u2014 \uBA3C \uBBF8\uB798\uC758 \uC704\uCE58\uC640\uB294 \uC870\uAE08 \uB2E4\uB97C \uC218 \uC788\uC74C. \uCC9C\uCCB4 \uC704\uCE58 \uACC4\uC0B0\uC5D0 \uC4F0\uC9C0 \uC54A\uC74C",en:"the orbit shape at that moment \u2014 may differ slightly from positions far in the future. Not used to compute positions"},license:{ko:"\uADA4\uB3C4 \uC694\uC18C \uC218\uCE58 \u2014 \uCD9C\uCC98 \uD45C\uAE30",en:"Numerical orbital elements \u2014 credit given"},url:"https://ssd.jpl.nasa.gov/planets/approx_pos.html"}],qg=[{text:"NASA should be acknowledged as the source of the material.",url:"https://www.nasa.gov/nasa-brand-center/images-and-media/"},{text:"We ask that NASA's Earth Observatory be given credit for its original materials; the only mandatory credit is NASA.",url:"https://earthobservatory.nasa.gov/ImageUse"}],qn=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))i.setAttribute(s,r);return i.append(...t),i},Ef=n=>qn("code",{"data-literal":""},n);function il(n){let e=qn("div",{class:"image-credits","data-meta":""}),t=qn("tbody");for(let s of Xg){let r=qn("td",{},Dt(s.credit),qn("br"),Dt(s.license),qn("br"),Ef(s.url));s.approx&&r.append(qn("br"),n(),document.createTextNode(" "+Dt(s.approx))),t.append(qn("tr",{},qn("th",{},Dt(s.what)),r))}e.append(qn("table",{class:"src"},t));let i=qn("p",{class:"note"},Me("credits.nasa_rule")+" ");for(let s of qg)i.append(qn("q",{},s.text),document.createTextNode(" "),Ef(s.url),document.createTextNode(" "));return e.append(i),e}var tp=0,Td=1,np=2;var Mo=1,ip=2,jr=3,bs=0,cn=1,Jn=2,Ci=0,Xr=1,Ji=2,Ad=3,Cd=4,sp=5;var qs=100,rp=101,ap=102,op=103,lp=104,cp=200,up=201,dp=202,hp=203,Rd=204,Pd=205,fp=206,pp=207,mp=208,gp=209,_p=210,xp=211,yp=212,vp=213,bp=214,Ll=0,Il=1,Dl=2,Ir=3,Nl=4,Ul=5,Fl=6,Ol=7,ac=0,Sp=1,Mp=2,fi=0,Ld=1,Id=2,Dd=3,Nd=4,Ud=5,Fd=6,Od=7;var kd=300,Ss=301,Ys=302,oc=303,lc=304,wo=306,ps=1e3,Rn=1001,kl=1002,$t=1003,wp=1004;var Eo=1005;var It=1006,cc=1007;var On=1008;var Jt=1009,Bd=1010,zd=1011,qr=1012,uc=1013,pi=1014,mi=1015,gi=1016,dc=1017,hc=1018,Yr=1020,Vd=35902,Hd=35899,Gd=1021,Wd=1022,rn=1023,wi=1026,Ms=1027,$s=1028,fc=1029,ws=1030,pc=1031;var mc=1033,To=33776,Ao=33777,Co=33778,Ro=33779,gc=35840,_c=35841,xc=35842,yc=35843,vc=36196,bc=37492,Sc=37496,Mc=37488,wc=37489,Po=37490,Ec=37491,Tc=37808,Ac=37809,Cc=37810,Rc=37811,Pc=37812,Lc=37813,Ic=37814,Dc=37815,Nc=37816,Uc=37817,Fc=37818,Oc=37819,kc=37820,Bc=37821,zc=36492,Vc=36494,Hc=36495,Gc=36283,Wc=36284,Lo=36285,jc=36286;var Ka=2300,Bl=2301,Rl=2302,xd=2303,yd=2400,vd=2401,bd=2402;var Ep=3200;var Xc=0,Tp=1,Zn="",Bt="srgb",Qa="srgb-linear",eo="linear",At="srgb";var Pl=7680;var Ap=519,Cp=512,Rp=513,Pp=514,qc=515,Lp=516,Ip=517,Yc=518,Dp=519,jd=35044;var Xd="300 es",ui=2e3,Dr=2001;function Yg(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function $g(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}function to(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Np(){let n=to("canvas");return n.style.display="block",n}var Tf={},Nr=null;function no(...n){let e="THREE."+n.shift();Nr?Nr("log",e,...n):console.log(e,...n)}function Up(n){let e=n[0];if(typeof e=="string"&&e.startsWith("TSL:")){let t=n[1];t&&t.isStackTrace?n[0]+=" "+t.getLocation():n[1]='Stack trace not available. Enable "THREE.Node.captureStackTrace" to capture stack traces.'}return n}function ot(...n){n=Up(n);let e="THREE."+n.shift();if(Nr)Nr("warn",e,...n);else{let t=n[0];t&&t.isStackTrace?console.warn(t.getError(e)):console.warn(e,...n)}}function lt(...n){n=Up(n);let e="THREE."+n.shift();if(Nr)Nr("error",e,...n);else{let t=n[0];t&&t.isStackTrace?console.error(t.getError(e)):console.error(e,...n)}}function Ws(...n){let e=n.join(" ");e in Tf||(Tf[e]=!0,ot(...n))}function Fp(n,e,t){return new Promise(function(i,s){function r(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:s();break;case n.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:i()}}setTimeout(r,t)})}var Op={[Ll]:Il,[Dl]:Fl,[Nl]:Ol,[Ir]:Ul,[Il]:Ll,[Fl]:Dl,[Ol]:Nl,[Ul]:Ir},Ei=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let s=i[e];if(s!==void 0){let r=s.indexOf(t);r!==-1&&s.splice(r,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let s=i.slice(0);for(let r=0,a=s.length;r<a;r++)s[r].call(this,e);e.target=null}}},mn=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Af=1234567,Ja=Math.PI/180,Ur=180/Math.PI;function Xi(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(mn[n&255]+mn[n>>8&255]+mn[n>>16&255]+mn[n>>24&255]+"-"+mn[e&255]+mn[e>>8&255]+"-"+mn[e>>16&15|64]+mn[e>>24&255]+"-"+mn[t&63|128]+mn[t>>8&255]+"-"+mn[t>>16&255]+mn[t>>24&255]+mn[i&255]+mn[i>>8&255]+mn[i>>16&255]+mn[i>>24&255]).toLowerCase()}function ft(n,e,t){return Math.max(e,Math.min(t,n))}function qd(n,e){return(n%e+e)%e}function Jg(n,e,t,i,s){return i+(n-e)*(s-i)/(t-e)}function Zg(n,e,t){return n!==e?(t-n)/(e-n):0}function Za(n,e,t){return(1-t)*n+t*e}function Kg(n,e,t,i){return Za(n,e,1-Math.exp(-t*i))}function Qg(n,e=1){return e-Math.abs(qd(n,e*2)-e)}function e0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function t0(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function n0(n,e){return n+Math.floor(Math.random()*(e-n+1))}function i0(n,e){return n+Math.random()*(e-n)}function s0(n){return n*(.5-Math.random())}function r0(n){n!==void 0&&(Af=n);let e=Af+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function a0(n){return n*Ja}function o0(n){return n*Ur}function l0(n){return n>0&&Number.isInteger(n)&&2**Math.round(Math.log2(n))===n}function c0(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function u0(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function d0(n,e,t,i,s){let r=Math.cos,a=Math.sin,o=r(t/2),l=a(t/2),c=r((e+i)/2),u=a((e+i)/2),h=r((e-i)/2),d=a((e-i)/2),f=r((i-e)/2),m=a((i-e)/2);switch(s){case"XYX":n.set(o*u,l*h,l*d,o*c);break;case"YZY":n.set(l*d,o*u,l*h,o*c);break;case"ZXZ":n.set(l*h,l*d,o*u,o*c);break;case"XZX":n.set(o*u,l*m,l*f,o*c);break;case"YXY":n.set(l*f,o*u,l*m,o*c);break;case"ZYZ":n.set(l*m,l*f,o*u,o*c);break;default:ot("MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+s)}}function ci(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:case Uint8ClampedArray:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("THREE.MathUtils: Invalid component type.")}}function Rt(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:case Uint8ClampedArray:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("THREE.MathUtils: Invalid component type.")}}var Yd={DEG2RAD:Ja,RAD2DEG:Ur,generateUUID:Xi,clamp:ft,euclideanModulo:qd,mapLinear:Jg,inverseLerp:Zg,lerp:Za,damp:Kg,pingpong:Qg,smoothstep:e0,smootherstep:t0,randInt:n0,randFloat:i0,randFloatSpread:s0,seededRandom:r0,degToRad:a0,radToDeg:o0,isPowerOfTwo:l0,ceilPowerOfTwo:c0,floorPowerOfTwo:u0,setQuaternionFromProperEuler:d0,normalize:Rt,denormalize:ci},nt=class n{static{n.prototype.isVector2=!0}constructor(e=0,t=0){this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("THREE.Vector2: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("THREE.Vector2: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6],this.y=s[1]*t+s[4]*i+s[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ft(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(ft(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),s=Math.sin(t),r=this.x-e.x,a=this.y-e.y;return this.x=r*i-a*s+e.x,this.y=r*s+a*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},$n=class{constructor(e=0,t=0,i=0,s=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=s}static slerpFlat(e,t,i,s,r,a,o){let l=i[s+0],c=i[s+1],u=i[s+2],h=i[s+3],d=r[a+0],f=r[a+1],m=r[a+2],x=r[a+3];if(h!==x||l!==d||c!==f||u!==m){let p=l*d+c*f+u*m+h*x;p<0&&(d=-d,f=-f,m=-m,x=-x,p=-p);let g=1-o;if(p<.9995){let A=Math.acos(p),R=Math.sin(A);g=Math.sin(g*A)/R,o=Math.sin(o*A)/R,l=l*g+d*o,c=c*g+f*o,u=u*g+m*o,h=h*g+x*o}else{l=l*g+d*o,c=c*g+f*o,u=u*g+m*o,h=h*g+x*o;let A=1/Math.sqrt(l*l+c*c+u*u+h*h);l*=A,c*=A,u*=A,h*=A}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=h}static multiplyQuaternionsFlat(e,t,i,s,r,a){let o=i[s],l=i[s+1],c=i[s+2],u=i[s+3],h=r[a],d=r[a+1],f=r[a+2],m=r[a+3];return e[t]=o*m+u*h+l*f-c*d,e[t+1]=l*m+u*d+c*h-o*f,e[t+2]=c*m+u*f+o*d-l*h,e[t+3]=u*m-o*h-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,s){return this._x=e,this._y=t,this._z=i,this._w=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,s=e._y,r=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(i/2),u=o(s/2),h=o(r/2),d=l(i/2),f=l(s/2),m=l(r/2);switch(a){case"XYZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"YXZ":this._x=d*u*h+c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"ZXY":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h-d*f*m;break;case"ZYX":this._x=d*u*h-c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h+d*f*m;break;case"YZX":this._x=d*u*h+c*f*m,this._y=c*f*h+d*u*m,this._z=c*u*m-d*f*h,this._w=c*u*h-d*f*m;break;case"XZY":this._x=d*u*h-c*f*m,this._y=c*f*h-d*u*m,this._z=c*u*m+d*f*h,this._w=c*u*h+d*f*m;break;default:ot("Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,s=Math.sin(i);return this._x=e.x*s,this._y=e.y*s,this._z=e.z*s,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],s=t[4],r=t[8],a=t[1],o=t[5],l=t[9],c=t[2],u=t[6],h=t[10],d=i+o+h;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(u-l)*f,this._y=(r-c)*f,this._z=(a-s)*f}else if(i>o&&i>h){let f=2*Math.sqrt(1+i-o-h);this._w=(u-l)/f,this._x=.25*f,this._y=(s+a)/f,this._z=(r+c)/f}else if(o>h){let f=2*Math.sqrt(1+o-i-h);this._w=(r-c)/f,this._x=(s+a)/f,this._y=.25*f,this._z=(l+u)/f}else{let f=2*Math.sqrt(1+h-i-o);this._w=(a-s)/f,this._x=(r+c)/f,this._y=(l+u)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ft(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let s=Math.min(1,t/i);return this.slerp(e,s),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=t._x,l=t._y,c=t._z,u=t._w;return this._x=i*u+a*o+s*c-r*l,this._y=s*u+a*l+r*o-i*c,this._z=r*u+a*c+i*l-s*o,this._w=a*u-i*o-s*l-r*c,this._onChangeCallback(),this}slerp(e,t){let i=e._x,s=e._y,r=e._z,a=e._w,o=this.dot(e);o<0&&(i=-i,s=-s,r=-r,a=-a,o=-o);let l=1-t;if(o<.9995){let c=Math.acos(o),u=Math.sin(c);l=Math.sin(l*c)/u,t=Math.sin(t*c)/u,this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this._onChangeCallback()}else this._x=this._x*l+i*t,this._y=this._y*l+s*t,this._z=this._z*l+r*t,this._w=this._w*l+a*t,this.normalize();return this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),s=Math.sqrt(1-i),r=Math.sqrt(i);return this.set(s*Math.sin(e),s*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},Y=class n{static{n.prototype.isVector3=!0}constructor(e=0,t=0,i=0){this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("THREE.Vector3: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("THREE.Vector3: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Cf.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Cf.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6]*s,this.y=r[1]*t+r[4]*i+r[7]*s,this.z=r[2]*t+r[5]*i+r[8]*s,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=e.elements,a=1/(r[3]*t+r[7]*i+r[11]*s+r[15]);return this.x=(r[0]*t+r[4]*i+r[8]*s+r[12])*a,this.y=(r[1]*t+r[5]*i+r[9]*s+r[13])*a,this.z=(r[2]*t+r[6]*i+r[10]*s+r[14])*a,this}applyQuaternion(e){let t=this.x,i=this.y,s=this.z,r=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*s-o*i),u=2*(o*t-r*s),h=2*(r*i-a*t);return this.x=t+l*c+a*h-o*u,this.y=i+l*u+o*c-r*h,this.z=s+l*h+r*u-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,s=this.z,r=e.elements;return this.x=r[0]*t+r[4]*i+r[8]*s,this.y=r[1]*t+r[5]*i+r[9]*s,this.z=r[2]*t+r[6]*i+r[10]*s,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ft(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,s=e.y,r=e.z,a=t.x,o=t.y,l=t.z;return this.x=s*l-r*o,this.y=r*a-i*l,this.z=i*o-s*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return $u.copy(this).projectOnVector(e),this.sub($u)}reflect(e){return this.sub($u.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(ft(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,s=this.z-e.z;return t*t+i*i+s*s}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let s=Math.sin(t)*e;return this.x=s*Math.sin(i),this.y=Math.cos(t)*e,this.z=s*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),s=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=s,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},$u=new Y,Cf=new $n,ct=class n{static{n.prototype.isMatrix3=!0}constructor(e,t,i,s,r,a,o,l,c){this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c)}set(e,t,i,s,r,a,o,l,c){let u=this.elements;return u[0]=e,u[1]=s,u[2]=o,u[3]=t,u[4]=r,u[5]=l,u[6]=i,u[7]=a,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[3],l=i[6],c=i[1],u=i[4],h=i[7],d=i[2],f=i[5],m=i[8],x=s[0],p=s[3],g=s[6],A=s[1],R=s[4],v=s[7],w=s[2],M=s[5],E=s[8];return r[0]=a*x+o*A+l*w,r[3]=a*p+o*R+l*M,r[6]=a*g+o*v+l*E,r[1]=c*x+u*A+h*w,r[4]=c*p+u*R+h*M,r[7]=c*g+u*v+h*E,r[2]=d*x+f*A+m*w,r[5]=d*p+f*R+m*M,r[8]=d*g+f*v+m*E,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8];return t*a*u-t*o*c-i*r*u+i*o*l+s*r*c-s*a*l}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=u*a-o*c,d=o*l-u*r,f=c*r-a*l,m=t*h+i*d+s*f;if(m===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/m;return e[0]=h*x,e[1]=(s*c-u*i)*x,e[2]=(o*i-s*a)*x,e[3]=d*x,e[4]=(u*t-s*l)*x,e[5]=(s*r-o*t)*x,e[6]=f*x,e[7]=(i*l-c*t)*x,e[8]=(a*t-i*r)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,s,r,a,o){let l=Math.cos(r),c=Math.sin(r);return this.set(i*l,i*c,-i*(l*a+c*o)+a+e,-s*c,s*l,-s*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return Ws("Matrix3: .scale() is deprecated. Use .makeScale() instead."),this.premultiply(Ju.makeScale(e,t)),this}rotate(e){return Ws("Matrix3: .rotate() is deprecated. Use .makeRotation() instead."),this.premultiply(Ju.makeRotation(-e)),this}translate(e,t){return Ws("Matrix3: .translate() is deprecated. Use .makeTranslation() instead."),this.premultiply(Ju.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<9;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ju=new ct,Rf=new ct().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Pf=new ct().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function h0(){let n={enabled:!0,workingColorSpace:Qa,spaces:{},convert:function(s,r,a){return this.enabled===!1||r===a||!r||!a||(this.spaces[r].transfer===At&&(s.r=qi(s.r),s.g=qi(s.g),s.b=qi(s.b)),this.spaces[r].primaries!==this.spaces[a].primaries&&(s.applyMatrix3(this.spaces[r].toXYZ),s.applyMatrix3(this.spaces[a].fromXYZ)),this.spaces[a].transfer===At&&(s.r=Lr(s.r),s.g=Lr(s.g),s.b=Lr(s.b))),s},workingToColorSpace:function(s,r){return this.convert(s,this.workingColorSpace,r)},colorSpaceToWorking:function(s,r){return this.convert(s,r,this.workingColorSpace)},getPrimaries:function(s){return this.spaces[s].primaries},getTransfer:function(s){return s===Zn?eo:this.spaces[s].transfer},getToneMappingMode:function(s){return this.spaces[s].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(s,r=this.workingColorSpace){return s.fromArray(this.spaces[r].luminanceCoefficients)},define:function(s){Object.assign(this.spaces,s)},_getMatrix:function(s,r,a){return s.copy(this.spaces[r].toXYZ).multiply(this.spaces[a].fromXYZ)},_getDrawingBufferColorSpace:function(s){return this.spaces[s].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(s=this.workingColorSpace){return this.spaces[s].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(s,r){return Ws("ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(s,r)},toWorkingColorSpace:function(s,r){return Ws("ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(s,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Qa]:{primaries:e,whitePoint:i,transfer:eo,toXYZ:Rf,fromXYZ:Pf,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Bt},outputColorSpaceConfig:{drawingBufferColorSpace:Bt}},[Bt]:{primaries:e,whitePoint:i,transfer:At,toXYZ:Rf,fromXYZ:Pf,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Bt}}}),n}var bt=h0();function qi(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function Lr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var hr,zl=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{hr===void 0&&(hr=to("canvas")),hr.width=e.width,hr.height=e.height;let s=hr.getContext("2d");e instanceof ImageData?s.putImageData(e,0,0):s.drawImage(e,0,0,e.width,e.height),i=hr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=to("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let s=i.getImageData(0,0,e.width,e.height),r=s.data;for(let a=0;a<r.length;a++)r[a]=qi(r[a]/255)*255;return i.putImageData(s,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(qi(t[i]/255)*255):t[i]=qi(t[i]);return{data:t,width:e.width,height:e.height}}else return ot("ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},f0=0,Fr=class{constructor(e=null){this.isTextureSource=!0,Object.defineProperty(this,"id",{value:f0++}),this.uuid=Xi(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):typeof VideoFrame<"u"&&t instanceof VideoFrame?e.set(t.displayWidth,t.displayHeight,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},s=this.data;if(s!==null){let r;if(Array.isArray(s)){r=[];for(let a=0,o=s.length;a<o;a++)s[a].isDataTexture?r.push(Zu(s[a].image)):r.push(Zu(s[a]))}else r=Zu(s);i.url=r}return t||(e.images[this.uuid]=i),i}};function Zu(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?zl.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(ot("Texture: Unable to serialize Texture."),{})}var p0=0,Ku=new Y,Gt=class n extends Ei{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=Rn,s=Rn,r=It,a=On,o=rn,l=Jt,c=n.DEFAULT_ANISOTROPY,u=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:p0++}),this.uuid=Xi(),this.name="",this.source=new Fr(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=s,this.magFilter=r,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new ct,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0,this.normalized=!1}get width(){return this.source.getSize(Ku).x}get height(){return this.source.getSize(Ku).y}get depth(){return this.source.getSize(Ku).z}get image(){return this.source.data}set image(e){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.normalized=e.normalized,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){ot(`Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){ot(`Texture.setValues(): property '${t}' does not exist.`);continue}s&&i&&s.isVector2&&i.isVector2||s&&i&&s.isVector3&&i.isVector3||s&&i&&s.isMatrix3&&i.isMatrix3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,normalized:this.normalized,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==kd)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case ps:e.x=e.x-Math.floor(e.x);break;case Rn:e.x=e.x<0?0:1;break;case kl:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case ps:e.y=e.y-Math.floor(e.y);break;case Rn:e.y=e.y<0?0:1;break;case kl:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};Gt.DEFAULT_IMAGE=null;Gt.DEFAULT_MAPPING=kd;Gt.DEFAULT_ANISOTROPY=1;var yt=class n{static{n.prototype.isVector4=!0}constructor(e=0,t=0,i=0,s=1){this.x=e,this.y=t,this.z=i,this.w=s}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,s){return this.x=e,this.y=t,this.z=i,this.w=s,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("THREE.Vector4: index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("THREE.Vector4: index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,s=this.z,r=this.w,a=e.elements;return this.x=a[0]*t+a[4]*i+a[8]*s+a[12]*r,this.y=a[1]*t+a[5]*i+a[9]*s+a[13]*r,this.z=a[2]*t+a[6]*i+a[10]*s+a[14]*r,this.w=a[3]*t+a[7]*i+a[11]*s+a[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,s,r,l=e.elements,c=l[0],u=l[4],h=l[8],d=l[1],f=l[5],m=l[9],x=l[2],p=l[6],g=l[10];if(Math.abs(u-d)<.01&&Math.abs(h-x)<.01&&Math.abs(m-p)<.01){if(Math.abs(u+d)<.1&&Math.abs(h+x)<.1&&Math.abs(m+p)<.1&&Math.abs(c+f+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let R=(c+1)/2,v=(f+1)/2,w=(g+1)/2,M=(u+d)/4,E=(h+x)/4,y=(m+p)/4;return R>v&&R>w?R<.01?(i=0,s=.707106781,r=.707106781):(i=Math.sqrt(R),s=M/i,r=E/i):v>w?v<.01?(i=.707106781,s=0,r=.707106781):(s=Math.sqrt(v),i=M/s,r=y/s):w<.01?(i=.707106781,s=.707106781,r=0):(r=Math.sqrt(w),i=E/r,s=y/r),this.set(i,s,r,t),this}let A=Math.sqrt((p-m)*(p-m)+(h-x)*(h-x)+(d-u)*(d-u));return Math.abs(A)<.001&&(A=1),this.x=(p-m)/A,this.y=(h-x)/A,this.z=(d-u)/A,this.w=Math.acos((c+f+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=ft(this.x,e.x,t.x),this.y=ft(this.y,e.y,t.y),this.z=ft(this.z,e.z,t.z),this.w=ft(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=ft(this.x,e,t),this.y=ft(this.y,e,t),this.z=ft(this.z,e,t),this.w=ft(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(ft(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Vl=class extends Ei{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:It,depthBuffer:!0,stencilBuffer:!1,resolveColorBuffer:!0,resolveDepthBuffer:!0,resolveStencilBuffer:!0,storeMultisampledColorBuffer:!0,storeMultisampledDepthBuffer:!0,storeMultisampledStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1,useArrayDepthTexture:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new yt(0,0,e,t),this.scissorTest=!1,this.viewport=new yt(0,0,e,t),this.textures=[];let s={width:e,height:t,depth:i.depth},r=new Gt(s),a=i.count;for(let o=0;o<a;o++)this.textures[o]=r.clone(),this.textures[o].isRenderTargetTexture=!0,this.textures[o].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveColorBuffer=i.resolveColorBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this.storeMultisampledColorBuffer=i.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=i.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=i.storeMultisampledStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview,this.useArrayDepthTexture=i.useArrayDepthTexture}_setTextureOptions(e={}){let t={minFilter:It,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&this._depthTexture.renderTarget===this&&(this._depthTexture.renderTarget=null),e!==null&&e.renderTarget===null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let s=0,r=this.textures.length;s<r;s++)this.textures[s].image.width=e,this.textures[s].image.height=t,this.textures[s].image.depth=i,this.textures[s].isData3DTexture!==!0&&(this.textures[s].isArrayTexture=this.textures[s].image.depth>1);this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let s=Object.assign({},e.textures[t].image);this.textures[t].source=new Fr(s)}if(this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveColorBuffer=e.resolveColorBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,this.storeMultisampledColorBuffer=e.storeMultisampledColorBuffer,this.storeMultisampledDepthBuffer=e.storeMultisampledDepthBuffer,this.storeMultisampledStencilBuffer=e.storeMultisampledStencilBuffer,e.depthTexture!==null)if(e.depthTexture.renderTarget===e){let t=e.depthTexture.clone();t.renderTarget=null,this.depthTexture=t}else this.depthTexture=e.depthTexture;return this.samples=e.samples,this.multiview=e.multiview,this.useArrayDepthTexture=e.useArrayDepthTexture,this}dispose(){this.dispatchEvent({type:"dispose"})}},Pn=class extends Vl{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}},js=class extends Gt{constructor(e=null,t=1,i=1,s=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var Hl=class extends Gt{constructor(e=null,t=1,i=1,s=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:s},this.magFilter=$t,this.minFilter=$t,this.wrapR=Rn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}copy(e){return super.copy(e),this.wrapR=e.wrapR,this}};var Mt=class n{static{n.prototype.isMatrix4=!0}constructor(e,t,i,s,r,a,o,l,c,u,h,d,f,m,x,p){this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,s,r,a,o,l,c,u,h,d,f,m,x,p)}set(e,t,i,s,r,a,o,l,c,u,h,d,f,m,x,p){let g=this.elements;return g[0]=e,g[4]=t,g[8]=i,g[12]=s,g[1]=r,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=u,g[10]=h,g[14]=d,g[3]=f,g[7]=m,g[11]=x,g[15]=p,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return this.determinantAffine()===0?(e.set(1,0,0),t.set(0,1,0),i.set(0,0,1),this):(e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this)}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){if(e.determinantAffine()===0)return this.identity();let t=this.elements,i=e.elements,s=1/fr.setFromMatrixColumn(e,0).length(),r=1/fr.setFromMatrixColumn(e,1).length(),a=1/fr.setFromMatrixColumn(e,2).length();return t[0]=i[0]*s,t[1]=i[1]*s,t[2]=i[2]*s,t[3]=0,t[4]=i[4]*r,t[5]=i[5]*r,t[6]=i[6]*r,t[7]=0,t[8]=i[8]*a,t[9]=i[9]*a,t[10]=i[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,s=e.y,r=e.z,a=Math.cos(i),o=Math.sin(i),l=Math.cos(s),c=Math.sin(s),u=Math.cos(r),h=Math.sin(r);if(e.order==="XYZ"){let d=a*u,f=a*h,m=o*u,x=o*h;t[0]=l*u,t[4]=-l*h,t[8]=c,t[1]=f+m*c,t[5]=d-x*c,t[9]=-o*l,t[2]=x-d*c,t[6]=m+f*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*u,f=l*h,m=c*u,x=c*h;t[0]=d+x*o,t[4]=m*o-f,t[8]=a*c,t[1]=a*h,t[5]=a*u,t[9]=-o,t[2]=f*o-m,t[6]=x+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*u,f=l*h,m=c*u,x=c*h;t[0]=d-x*o,t[4]=-a*h,t[8]=m+f*o,t[1]=f+m*o,t[5]=a*u,t[9]=x-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*u,f=a*h,m=o*u,x=o*h;t[0]=l*u,t[4]=m*c-f,t[8]=d*c+x,t[1]=l*h,t[5]=x*c+d,t[9]=f*c-m,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*u,t[4]=x-d*h,t[8]=m*h+f,t[1]=h,t[5]=a*u,t[9]=-o*u,t[2]=-c*u,t[6]=f*h+m,t[10]=d-x*h}else if(e.order==="XZY"){let d=a*l,f=a*c,m=o*l,x=o*c;t[0]=l*u,t[4]=-h,t[8]=c*u,t[1]=d*h+x,t[5]=a*u,t[9]=f*h-m,t[2]=m*h-f,t[6]=o*u,t[10]=x*h+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(m0,e,g0)}lookAt(e,t,i){let s=this.elements;return Dn.subVectors(e,t),Dn.lengthSq()===0&&(Dn.z=1),Dn.normalize(),cs.crossVectors(i,Dn),cs.lengthSq()===0&&(Math.abs(i.z)===1?Dn.x+=1e-4:Dn.z+=1e-4,Dn.normalize(),cs.crossVectors(i,Dn)),cs.normalize(),sl.crossVectors(Dn,cs),s[0]=cs.x,s[4]=sl.x,s[8]=Dn.x,s[1]=cs.y,s[5]=sl.y,s[9]=Dn.y,s[2]=cs.z,s[6]=sl.z,s[10]=Dn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,s=t.elements,r=this.elements,a=i[0],o=i[4],l=i[8],c=i[12],u=i[1],h=i[5],d=i[9],f=i[13],m=i[2],x=i[6],p=i[10],g=i[14],A=i[3],R=i[7],v=i[11],w=i[15],M=s[0],E=s[4],y=s[8],T=s[12],P=s[1],k=s[5],U=s[9],z=s[13],F=s[2],q=s[6],K=s[10],ne=s[14],oe=s[3],j=s[7],le=s[11],ce=s[15];return r[0]=a*M+o*P+l*F+c*oe,r[4]=a*E+o*k+l*q+c*j,r[8]=a*y+o*U+l*K+c*le,r[12]=a*T+o*z+l*ne+c*ce,r[1]=u*M+h*P+d*F+f*oe,r[5]=u*E+h*k+d*q+f*j,r[9]=u*y+h*U+d*K+f*le,r[13]=u*T+h*z+d*ne+f*ce,r[2]=m*M+x*P+p*F+g*oe,r[6]=m*E+x*k+p*q+g*j,r[10]=m*y+x*U+p*K+g*le,r[14]=m*T+x*z+p*ne+g*ce,r[3]=A*M+R*P+v*F+w*oe,r[7]=A*E+R*k+v*q+w*j,r[11]=A*y+R*U+v*K+w*le,r[15]=A*T+R*z+v*ne+w*ce,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[12],a=e[1],o=e[5],l=e[9],c=e[13],u=e[2],h=e[6],d=e[10],f=e[14],m=e[3],x=e[7],p=e[11],g=e[15],A=l*f-c*d,R=o*f-c*h,v=o*d-l*h,w=a*f-c*u,M=a*d-l*u,E=a*h-o*u;return t*(x*A-p*R+g*v)-i*(m*A-p*w+g*M)+s*(m*R-x*w+g*E)-r*(m*v-x*M+p*E)}determinantAffine(){let e=this.elements,t=e[0],i=e[4],s=e[8],r=e[1],a=e[5],o=e[9],l=e[2],c=e[6],u=e[10];return t*(a*u-o*c)-i*(r*u-o*l)+s*(r*c-a*l)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let s=this.elements;return e.isVector3?(s[12]=e.x,s[13]=e.y,s[14]=e.z):(s[12]=e,s[13]=t,s[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],s=e[2],r=e[3],a=e[4],o=e[5],l=e[6],c=e[7],u=e[8],h=e[9],d=e[10],f=e[11],m=e[12],x=e[13],p=e[14],g=e[15],A=t*o-i*a,R=t*l-s*a,v=t*c-r*a,w=i*l-s*o,M=i*c-r*o,E=s*c-r*l,y=u*x-h*m,T=u*p-d*m,P=u*g-f*m,k=h*p-d*x,U=h*g-f*x,z=d*g-f*p,F=A*z-R*U+v*k+w*P-M*T+E*y;if(F===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let q=1/F;return e[0]=(o*z-l*U+c*k)*q,e[1]=(s*U-i*z-r*k)*q,e[2]=(x*E-p*M+g*w)*q,e[3]=(d*M-h*E-f*w)*q,e[4]=(l*P-a*z-c*T)*q,e[5]=(t*z-s*P+r*T)*q,e[6]=(p*v-m*E-g*R)*q,e[7]=(u*E-d*v+f*R)*q,e[8]=(a*U-o*P+c*y)*q,e[9]=(i*P-t*U-r*y)*q,e[10]=(m*M-x*v+g*A)*q,e[11]=(h*v-u*M-f*A)*q,e[12]=(o*T-a*k-l*y)*q,e[13]=(t*k-i*T+s*y)*q,e[14]=(x*R-m*w-p*A)*q,e[15]=(u*w-h*R+d*A)*q,this}scale(e){let t=this.elements,i=e.x,s=e.y,r=e.z;return t[0]*=i,t[4]*=s,t[8]*=r,t[1]*=i,t[5]*=s,t[9]*=r,t[2]*=i,t[6]*=s,t[10]*=r,t[3]*=i,t[7]*=s,t[11]*=r,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],s=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,s))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),s=Math.sin(t),r=1-i,a=e.x,o=e.y,l=e.z,c=r*a,u=r*o;return this.set(c*a+i,c*o-s*l,c*l+s*o,0,c*o+s*l,u*o+i,u*l-s*a,0,c*l-s*o,u*l+s*a,r*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,s,r,a){return this.set(1,i,r,0,e,1,a,0,t,s,1,0,0,0,0,1),this}compose(e,t,i){let s=this.elements,r=t._x,a=t._y,o=t._z,l=t._w,c=r+r,u=a+a,h=o+o,d=r*c,f=r*u,m=r*h,x=a*u,p=a*h,g=o*h,A=l*c,R=l*u,v=l*h,w=i.x,M=i.y,E=i.z;return s[0]=(1-(x+g))*w,s[1]=(f+v)*w,s[2]=(m-R)*w,s[3]=0,s[4]=(f-v)*M,s[5]=(1-(d+g))*M,s[6]=(p+A)*M,s[7]=0,s[8]=(m+R)*E,s[9]=(p-A)*E,s[10]=(1-(d+x))*E,s[11]=0,s[12]=e.x,s[13]=e.y,s[14]=e.z,s[15]=1,this}decompose(e,t,i){let s=this.elements;e.x=s[12],e.y=s[13],e.z=s[14];let r=this.determinantAffine();if(r===0)return i.set(1,1,1),t.identity(),this;let a=fr.set(s[0],s[1],s[2]).length(),o=fr.set(s[4],s[5],s[6]).length(),l=fr.set(s[8],s[9],s[10]).length();r<0&&(a=-a),ri.copy(this);let c=1/a,u=1/o,h=1/l;return ri.elements[0]*=c,ri.elements[1]*=c,ri.elements[2]*=c,ri.elements[4]*=u,ri.elements[5]*=u,ri.elements[6]*=u,ri.elements[8]*=h,ri.elements[9]*=h,ri.elements[10]*=h,t.setFromRotationMatrix(ri),i.x=a,i.y=o,i.z=l,this}makePerspective(e,t,i,s,r,a,o=ui,l=!1){let c=this.elements,u=2*r/(t-e),h=2*r/(i-s),d=(t+e)/(t-e),f=(i+s)/(i-s),m,x;if(l)m=r/(a-r),x=a*r/(a-r);else if(o===ui)m=-(a+r)/(a-r),x=-2*a*r/(a-r);else if(o===Dr)m=-a/(a-r),x=-a*r/(a-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,s,r,a,o=ui,l=!1){let c=this.elements,u=2/(t-e),h=2/(i-s),d=-(t+e)/(t-e),f=-(i+s)/(i-s),m,x;if(l)m=1/(a-r),x=a/(a-r);else if(o===ui)m=-2/(a-r),x=-(a+r)/(a-r);else if(o===Dr)m=-1/(a-r),x=-r/(a-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);return c[0]=u,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=h,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=m,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let s=0;s<16;s++)if(t[s]!==i[s])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},fr=new Y,ri=new Mt,m0=new Y(0,0,0),g0=new Y(1,1,1),cs=new Y,sl=new Y,Dn=new Y,Lf=new Mt,If=new $n,Yi=class n{constructor(e=0,t=0,i=0,s=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=s}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,s=this._order){return this._x=e,this._y=t,this._z=i,this._order=s,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let s=e.elements,r=s[0],a=s[4],o=s[8],l=s[1],c=s[5],u=s[9],h=s[2],d=s[6],f=s[10];switch(t){case"XYZ":this._y=Math.asin(ft(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-u,f),this._z=Math.atan2(-a,r)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-ft(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(o,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-h,r),this._z=0);break;case"ZXY":this._x=Math.asin(ft(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-h,f),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-ft(h,-1,1)),Math.abs(h)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(ft(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-h,r)):(this._x=0,this._y=Math.atan2(o,f));break;case"XZY":this._z=Math.asin(-ft(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,r)):(this._x=Math.atan2(-u,f),this._y=0);break;default:ot("Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return Lf.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Lf,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return If.setFromEuler(this),this.setFromQuaternion(If,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Yi.DEFAULT_ORDER="XYZ";var io=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}},_0=0,Df=new Y,pr=new $n,zi=new Mt,rl=new Y,Ga=new Y,x0=new Y,y0=new $n,Nf=new Y(1,0,0),Uf=new Y(0,1,0),Ff=new Y(0,0,1),Of={type:"added"},v0={type:"removed"},mr={type:"childadded",child:null},Qu={type:"childremoved",child:null},Kt=class n extends Ei{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:_0++}),this.uuid=Xi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new Y,t=new Yi,i=new $n,s=new Y(1,1,1);function r(){i.setFromEuler(t,!1)}function a(){t.setFromQuaternion(i,void 0,!1)}t._onChange(r),i._onChange(a),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:s},modelViewMatrix:{value:new Mt},normalMatrix:{value:new ct}}),this.matrix=new Mt,this.matrixWorld=new Mt,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new io,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.static=!1,this.userData={},this.pivot=null}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return pr.setFromAxisAngle(e,t),this.quaternion.multiply(pr),this}rotateOnWorldAxis(e,t){return pr.setFromAxisAngle(e,t),this.quaternion.premultiply(pr),this}rotateX(e){return this.rotateOnAxis(Nf,e)}rotateY(e){return this.rotateOnAxis(Uf,e)}rotateZ(e){return this.rotateOnAxis(Ff,e)}translateOnAxis(e,t){return Df.copy(e).applyQuaternion(this.quaternion),this.position.add(Df.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Nf,e)}translateY(e){return this.translateOnAxis(Uf,e)}translateZ(e){return this.translateOnAxis(Ff,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(zi.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?rl.copy(e):rl.set(e,t,i);let s=this.parent;this.updateWorldMatrix(!0,!1),Ga.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?zi.lookAt(Ga,rl,this.up):zi.lookAt(rl,Ga,this.up),this.quaternion.setFromRotationMatrix(zi),s&&(zi.extractRotation(s.matrixWorld),pr.setFromRotationMatrix(zi),this.quaternion.premultiply(pr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(lt("Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Of),mr.child=e,this.dispatchEvent(mr),mr.child=null):lt("Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(v0),Qu.child=e,this.dispatchEvent(Qu),Qu.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),zi.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),zi.multiply(e.parent.matrixWorld)),e.applyMatrix4(zi),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Of),mr.child=e,this.dispatchEvent(mr),mr.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,s=this.children.length;i<s;i++){let a=this.children[i].getObjectByProperty(e,t);if(a!==void 0)return a}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let s=this.children;for(let r=0,a=s.length;r<a;r++)s[r].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ga,e,x0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Ga,y0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}intersectsFrustum(){}traverse(e){e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale);let e=this.pivot;if(e!==null){let t=e.x,i=e.y,s=e.z,r=this.matrix.elements;r[12]+=t-r[0]*t-r[4]*i-r[8]*s,r[13]+=i-r[1]*t-r[5]*i-r[9]*s,r[14]+=s-r[2]*t-r[6]*i-r[10]*s}this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,s=t.length;i<s;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t,i=!1){let s=this.parent;if(e===!0&&s!==null&&s.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||i)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,i=!0),t===!0){let r=this.children;for(let a=0,o=r.length;a<o;a++)r[a].updateWorldMatrix(!1,!0,i)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let s={};s.uuid=this.uuid,s.type=this.type,s.name=this.name,s.castShadow=this.castShadow,s.receiveShadow=this.receiveShadow,s.visible=this.visible,s.frustumCulled=this.frustumCulled,s.renderOrder=this.renderOrder,s.static=this.static,s.matrixAutoUpdate=this.matrixAutoUpdate,Object.keys(this.userData).length>0&&(s.userData=this.userData),s.layers=this.layers.mask,s.matrix=this.matrix.toArray(),s.up=this.up.toArray(),this.pivot!==null&&(s.pivot=this.pivot.toArray()),this.morphTargetDictionary!==void 0&&(s.morphTargetDictionary=Object.assign({},this.morphTargetDictionary)),this.morphTargetInfluences!==void 0&&(s.morphTargetInfluences=this.morphTargetInfluences.slice()),this.isInstancedMesh&&(s.type="InstancedMesh",s.count=this.count,s.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(s.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(s.type="BatchedMesh",s.perObjectFrustumCulled=this.perObjectFrustumCulled,s.sortObjects=this.sortObjects,s.drawRanges=this._drawRanges,s.reservedRanges=this._reservedRanges,s.geometryInfo=this._geometryInfo.map(o=>({...o,boundingBox:o.boundingBox?o.boundingBox.toJSON():void 0,boundingSphere:o.boundingSphere?o.boundingSphere.toJSON():void 0})),s.instanceInfo=this._instanceInfo.map(o=>({...o})),s.availableInstanceIds=this._availableInstanceIds.slice(),s.availableGeometryIds=this._availableGeometryIds.slice(),s.nextIndexStart=this._nextIndexStart,s.nextVertexStart=this._nextVertexStart,s.geometryCount=this._geometryCount,s.maxInstanceCount=this._maxInstanceCount,s.maxVertexCount=this._maxVertexCount,s.maxIndexCount=this._maxIndexCount,s.geometryInitialized=this._geometryInitialized,s.matricesTexture=this._matricesTexture.toJSON(e),s.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(s.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(s.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(s.boundingBox=this.boundingBox.toJSON()));function r(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?s.background=this.background.toJSON():this.background.isTexture&&(s.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(s.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){s.geometry=r(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){let h=l[c];r(e.shapes,h)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(s.bindMode=this.bindMode,s.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),s.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(r(e.materials,this.material[l]));s.material=o}else s.material=r(e.materials,this.material);if(this.children.length>0){s.children=[];for(let o=0;o<this.children.length;o++)s.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){s.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];s.animations.push(r(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),u=a(e.images),h=a(e.shapes),d=a(e.skeletons),f=a(e.animations),m=a(e.nodes);o.length>0&&(i.geometries=o),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),u.length>0&&(i.images=u),h.length>0&&(i.shapes=h),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),m.length>0&&(i.nodes=m)}return i.object=s,i;function a(o){let l=[];for(let c in o){let u=o[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.pivot=e.pivot!==null?e.pivot.clone():null,this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.static=e.static,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let s=e.children[i];this.add(s.clone())}return this}dispose(){this.dispatchEvent({type:"dispose"})}};Kt.DEFAULT_UP=new Y(0,1,0);Kt.DEFAULT_MATRIX_AUTO_UPDATE=!0;Kt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var Gs=class extends Kt{constructor(){super(),this.isGroup=!0,this.type="Group"}},b0={type:"move"},Or=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Gs,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Gs,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new Y,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new Y),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Gs,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new Y,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new Y,this._grip.eventsEnabled=!1),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let s=null,r=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let x of e.hand.values()){let p=t.getJointPose(x,i),g=this._getHandJoint(c,x);p!==null&&(g.matrix.fromArray(p.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=p.radius),g.visible=p!==null}let u=c.joints["index-finger-tip"],h=c.joints["thumb-tip"],d=u.position.distanceTo(h.position),f=.02,m=.005;c.inputState.pinching&&d>f+m?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-m&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,i),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1,l.eventsEnabled&&l.dispatchEvent({type:"gripUpdated",data:e,target:this})));o!==null&&(s=t.getPose(e.targetRaySpace,i),s===null&&r!==null&&(s=r),s!==null&&(o.matrix.fromArray(s.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,s.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(s.linearVelocity)):o.hasLinearVelocity=!1,s.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(s.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(b0)))}return o!==null&&(o.visible=s!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Gs;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}},kp={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},us={h:0,s:0,l:0},al={h:0,s:0,l:0};function ed(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var rt=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let s=e;s&&s.isColor?this.copy(s):typeof s=="number"?this.setHex(s):typeof s=="string"&&this.setStyle(s)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Bt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,bt.colorSpaceToWorking(this,t),this}setRGB(e,t,i,s=bt.workingColorSpace){return this.r=e,this.g=t,this.b=i,bt.colorSpaceToWorking(this,s),this}setHSL(e,t,i,s=bt.workingColorSpace){if(e=qd(e,1),t=ft(t,0,1),i=ft(i,0,1),t===0)this.r=this.g=this.b=i;else{let r=i<=.5?i*(1+t):i+t-i*t,a=2*i-r;this.r=ed(a,r,e+1/3),this.g=ed(a,r,e),this.b=ed(a,r,e-1/3)}return bt.colorSpaceToWorking(this,s),this}setStyle(e,t=Bt){function i(r){r!==void 0&&parseFloat(r)<1&&ot("Color: Alpha component of "+e+" will be ignored.")}let s;if(s=/^(\w+)\(([^\)]*)\)/.exec(e)){let r,a=s[1],o=s[2];switch(a){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return i(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:ot("Color: Unknown color model "+e)}}else if(s=/^\#([A-Fa-f\d]+)$/.exec(e)){let r=s[1],a=r.length;if(a===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(r,16),t);ot("Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Bt){let i=kp[e.toLowerCase()];return i!==void 0?this.setHex(i,t):ot("Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=qi(e.r),this.g=qi(e.g),this.b=qi(e.b),this}copyLinearToSRGB(e){return this.r=Lr(e.r),this.g=Lr(e.g),this.b=Lr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Bt){return bt.workingToColorSpace(gn.copy(this),e),Math.round(ft(gn.r*255,0,255))*65536+Math.round(ft(gn.g*255,0,255))*256+Math.round(ft(gn.b*255,0,255))}getHexString(e=Bt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=bt.workingColorSpace){bt.workingToColorSpace(gn.copy(this),t);let i=gn.r,s=gn.g,r=gn.b,a=Math.max(i,s,r),o=Math.min(i,s,r),l,c,u=(o+a)/2;if(o===a)l=0,c=0;else{let h=a-o;switch(c=u<=.5?h/(a+o):h/(2-a-o),a){case i:l=(s-r)/h+(s<r?6:0);break;case s:l=(r-i)/h+2;break;case r:l=(i-s)/h+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=bt.workingColorSpace){return bt.workingToColorSpace(gn.copy(this),t),e.r=gn.r,e.g=gn.g,e.b=gn.b,e}getStyle(e=Bt){bt.workingToColorSpace(gn.copy(this),e);let t=gn.r,i=gn.g,s=gn.b;return e!==Bt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${s.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(s*255)})`}offsetHSL(e,t,i){return this.getHSL(us),this.setHSL(us.h+e,us.s+t,us.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(us),e.getHSL(al);let i=Za(us.h,al.h,t),s=Za(us.s,al.s,t),r=Za(us.l,al.l,t);return this.setHSL(i,s,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,s=this.b,r=e.elements;return this.r=r[0]*t+r[3]*i+r[6]*s,this.g=r[1]*t+r[4]*i+r[7]*s,this.b=r[2]*t+r[5]*i+r[8]*s,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},gn=new rt;rt.NAMES=kp;var kr=class extends Kt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Yi,this.environmentIntensity=1,this.environmentRotation=new Yi,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),t.object.backgroundBlurriness=this.backgroundBlurriness,t.object.backgroundIntensity=this.backgroundIntensity,t.object.backgroundRotation=this.backgroundRotation.toArray(),t.object.environmentIntensity=this.environmentIntensity,t.object.environmentRotation=this.environmentRotation.toArray(),t}},ai=new Y,Vi=new Y,td=new Y,Hi=new Y,gr=new Y,_r=new Y,kf=new Y,nd=new Y,id=new Y,sd=new Y,rd=new yt,ad=new yt,od=new yt,ji=class n{constructor(e=new Y,t=new Y,i=new Y){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,s){s.subVectors(i,t),ai.subVectors(e,t),s.cross(ai);let r=s.lengthSq();return r>0?s.multiplyScalar(1/Math.sqrt(r)):s.set(0,0,0)}static getBarycoord(e,t,i,s,r){ai.subVectors(s,t),Vi.subVectors(i,t),td.subVectors(e,t);let a=ai.dot(ai),o=ai.dot(Vi),l=ai.dot(td),c=Vi.dot(Vi),u=Vi.dot(td),h=a*c-o*o;if(h===0)return r.set(0,0,0),null;let d=1/h,f=(c*l-o*u)*d,m=(a*u-o*l)*d;return r.set(1-f-m,m,f)}static containsPoint(e,t,i,s){return this.getBarycoord(e,t,i,s,Hi)===null?!1:Hi.x>=0&&Hi.y>=0&&Hi.x+Hi.y<=1}static getInterpolation(e,t,i,s,r,a,o,l){return this.getBarycoord(e,t,i,s,Hi)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,Hi.x),l.addScaledVector(a,Hi.y),l.addScaledVector(o,Hi.z),l)}static getInterpolatedAttribute(e,t,i,s,r,a){return rd.setScalar(0),ad.setScalar(0),od.setScalar(0),rd.fromBufferAttribute(e,t),ad.fromBufferAttribute(e,i),od.fromBufferAttribute(e,s),a.setScalar(0),a.addScaledVector(rd,r.x),a.addScaledVector(ad,r.y),a.addScaledVector(od,r.z),a}static isFrontFacing(e,t,i,s){return ai.subVectors(i,t),Vi.subVectors(e,t),ai.cross(Vi).dot(s)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,s){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[s]),this}setFromAttributeAndIndices(e,t,i,s){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,s),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return ai.subVectors(this.c,this.b),Vi.subVectors(this.a,this.b),ai.cross(Vi).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,s,r){return n.getInterpolation(e,this.a,this.b,this.c,t,i,s,r)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,s=this.b,r=this.c,a,o;gr.subVectors(s,i),_r.subVectors(r,i),nd.subVectors(e,i);let l=gr.dot(nd),c=_r.dot(nd);if(l<=0&&c<=0)return t.copy(i);id.subVectors(e,s);let u=gr.dot(id),h=_r.dot(id);if(u>=0&&h<=u)return t.copy(s);let d=l*h-u*c;if(d<=0&&l>=0&&u<=0)return a=l/(l-u),t.copy(i).addScaledVector(gr,a);sd.subVectors(e,r);let f=gr.dot(sd),m=_r.dot(sd);if(m>=0&&f<=m)return t.copy(r);let x=f*c-l*m;if(x<=0&&c>=0&&m<=0)return o=c/(c-m),t.copy(i).addScaledVector(_r,o);let p=u*m-f*h;if(p<=0&&h-u>=0&&f-m>=0)return kf.subVectors(r,s),o=(h-u)/(h-u+(f-m)),t.copy(s).addScaledVector(kf,o);let g=1/(p+x+d);return a=x*g,o=d*g,t.copy(i).addScaledVector(gr,a).addScaledVector(_r,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},Un=class{constructor(e=new Y(1/0,1/0,1/0),t=new Y(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(oi.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(oi.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=oi.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let r=i.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=r.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,oi):oi.fromBufferAttribute(r,a),oi.applyMatrix4(e.matrixWorld),this.expandByPoint(oi);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),ol.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),ol.copy(i.boundingBox)),ol.applyMatrix4(e.matrixWorld),this.union(ol)}let s=e.children;for(let r=0,a=s.length;r<a;r++)this.expandByObject(s[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,oi),oi.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Wa),ll.subVectors(this.max,Wa),xr.subVectors(e.a,Wa),yr.subVectors(e.b,Wa),vr.subVectors(e.c,Wa),ds.subVectors(yr,xr),hs.subVectors(vr,yr),Bs.subVectors(xr,vr);let t=[0,-ds.z,ds.y,0,-hs.z,hs.y,0,-Bs.z,Bs.y,ds.z,0,-ds.x,hs.z,0,-hs.x,Bs.z,0,-Bs.x,-ds.y,ds.x,0,-hs.y,hs.x,0,-Bs.y,Bs.x,0];return!ld(t,xr,yr,vr,ll)||(t=[1,0,0,0,1,0,0,0,1],!ld(t,xr,yr,vr,ll))?!1:(cl.crossVectors(ds,hs),t=[cl.x,cl.y,cl.z],ld(t,xr,yr,vr,ll))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,oi).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(oi).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(Gi[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),Gi[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),Gi[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),Gi[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),Gi[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),Gi[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),Gi[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),Gi[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(Gi),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},Gi=[new Y,new Y,new Y,new Y,new Y,new Y,new Y,new Y],oi=new Y,ol=new Un,xr=new Y,yr=new Y,vr=new Y,ds=new Y,hs=new Y,Bs=new Y,Wa=new Y,ll=new Y,cl=new Y,zs=new Y;function ld(n,e,t,i,s){for(let r=0,a=n.length-3;r<=a;r+=3){zs.fromArray(n,r);let o=s.x*Math.abs(zs.x)+s.y*Math.abs(zs.y)+s.z*Math.abs(zs.z),l=e.dot(zs),c=t.dot(zs),u=i.dot(zs);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>o)return!1}return!0}var qt=new Y,ul=new nt,S0=0,Yt=class extends Ei{constructor(e,t,i=!1){if(super(),Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:S0++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=jd,this.updateRanges=[],this.gpuType=mi,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let s=0,r=this.itemSize;s<r;s++)this.array[e+s]=t.array[i+s];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)ul.fromBufferAttribute(this,t),ul.applyMatrix3(e),this.setXY(t,ul.x,ul.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix3(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyMatrix4(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.applyNormalMatrix(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)qt.fromBufferAttribute(this,t),qt.transformDirection(e),this.setXYZ(t,qt.x,qt.y,qt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=ci(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Rt(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=ci(t,this.array)),t}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=ci(t,this.array)),t}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=ci(t,this.array)),t}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=ci(t,this.array)),t}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),i=Rt(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,s){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),i=Rt(i,this.array),s=Rt(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e*=this.itemSize,this.normalized&&(t=Rt(t,this.array),i=Rt(i,this.array),s=Rt(s,this.array),r=Rt(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=s,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return e.name=this.name,e.usage=this.usage,e.gpuType=this.gpuType,e}dispose(){this.dispatchEvent({type:"dispose"})}};var so=class extends Yt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var ro=class extends Yt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var zt=class extends Yt{constructor(e,t,i){super(new Float32Array(e),t,i)}},M0=new Un,ja=new Y,cd=new Y,di=class{constructor(e=new Y,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):M0.setFromPoints(e).getCenter(i);let s=0;for(let r=0,a=e.length;r<a;r++)s=Math.max(s,i.distanceToSquared(e[r]));return this.radius=Math.sqrt(s),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;ja.subVectors(e,this.center);let t=ja.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),s=(i-this.radius)*.5;this.center.addScaledVector(ja,s/i),this.radius+=s}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(cd.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(ja.copy(e.center).add(cd)),this.expandByPoint(ja.copy(e.center).sub(cd))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}},w0=0,Yn=new Mt,ud=new Kt,br=new Y,Nn=new Un,Xa=new Un,sn=new Y,Wt=class n extends Ei{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:w0++}),this.uuid=Xi(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.indirectOffset=0,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={},this._transformed=!1}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Yg(e)?ro:so)(e,1):this.index=e,this}setIndirect(e,t=0){return this.indirect=e,this.indirectOffset=t,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let r=new ct().getNormalMatrix(e);i.applyNormalMatrix(r),i.needsUpdate=!0}let s=this.attributes.tangent;return s!==void 0&&(s.transformDirection(e),s.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this._transformed=!0,this}applyQuaternion(e){return Yn.makeRotationFromQuaternion(e),this.applyMatrix4(Yn),this}rotateX(e){return Yn.makeRotationX(e),this.applyMatrix4(Yn),this}rotateY(e){return Yn.makeRotationY(e),this.applyMatrix4(Yn),this}rotateZ(e){return Yn.makeRotationZ(e),this.applyMatrix4(Yn),this}translate(e,t,i){return Yn.makeTranslation(e,t,i),this.applyMatrix4(Yn),this}scale(e,t,i){return Yn.makeScale(e,t,i),this.applyMatrix4(Yn),this}lookAt(e){return ud.lookAt(e),ud.updateMatrix(),this.applyMatrix4(ud.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(br).negate(),this.translate(br.x,br.y,br.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let s=0,r=e.length;s<r;s++){let a=e[s];i.push(a.x,a.y,a.z||0)}this.setAttribute("position",new zt(i,3))}else{let i=Math.min(e.length,t.count);for(let s=0;s<i;s++){let r=e[s];t.setXYZ(s,r.x,r.y,r.z||0)}e.length>t.count&&ot("BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Un);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new Y(-1/0,-1/0,-1/0),new Y(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,s=t.length;i<s;i++){let r=t[i];Nn.setFromBufferAttribute(r),this.morphTargetsRelative?(sn.addVectors(this.boundingBox.min,Nn.min),this.boundingBox.expandByPoint(sn),sn.addVectors(this.boundingBox.max,Nn.max),this.boundingBox.expandByPoint(sn)):(this.boundingBox.expandByPoint(Nn.min),this.boundingBox.expandByPoint(Nn.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&lt('BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new di);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){lt("BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new Y,1/0);return}if(e){let i=this.boundingSphere.center;if(Nn.setFromBufferAttribute(e),t)for(let r=0,a=t.length;r<a;r++){let o=t[r];Xa.setFromBufferAttribute(o),this.morphTargetsRelative?(sn.addVectors(Nn.min,Xa.min),Nn.expandByPoint(sn),sn.addVectors(Nn.max,Xa.max),Nn.expandByPoint(sn)):(Nn.expandByPoint(Xa.min),Nn.expandByPoint(Xa.max))}Nn.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)sn.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(sn));if(t)for(let r=0,a=t.length;r<a;r++){let o=t[r],l=this.morphTargetsRelative;for(let c=0,u=o.count;c<u;c++)sn.fromBufferAttribute(o,c),l&&(br.fromBufferAttribute(e,c),sn.add(br)),s=Math.max(s,i.distanceToSquared(sn))}this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&lt('BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){lt("BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,s=t.normal,r=t.uv,a=this.getAttribute("tangent");(a===void 0||a.count!==i.count)&&(a=new Yt(new Float32Array(4*i.count),4),this.setAttribute("tangent",a));let o=[],l=[];for(let y=0;y<i.count;y++)o[y]=new Y,l[y]=new Y;let c=new Y,u=new Y,h=new Y,d=new nt,f=new nt,m=new nt,x=new Y,p=new Y;function g(y,T,P){c.fromBufferAttribute(i,y),u.fromBufferAttribute(i,T),h.fromBufferAttribute(i,P),d.fromBufferAttribute(r,y),f.fromBufferAttribute(r,T),m.fromBufferAttribute(r,P),u.sub(c),h.sub(c),f.sub(d),m.sub(d);let k=1/(f.x*m.y-m.x*f.y);isFinite(k)&&(x.copy(u).multiplyScalar(m.y).addScaledVector(h,-f.y).multiplyScalar(k),p.copy(h).multiplyScalar(f.x).addScaledVector(u,-m.x).multiplyScalar(k),o[y].add(x),o[T].add(x),o[P].add(x),l[y].add(p),l[T].add(p),l[P].add(p))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let y=0,T=A.length;y<T;++y){let P=A[y],k=P.start,U=P.count;for(let z=k,F=k+U;z<F;z+=3)g(e.getX(z+0),e.getX(z+1),e.getX(z+2))}let R=new Y,v=new Y,w=new Y,M=new Y;function E(y){w.fromBufferAttribute(s,y),M.copy(w);let T=o[y];R.copy(T),R.sub(w.multiplyScalar(w.dot(T))).normalize(),v.crossVectors(M,T);let k=v.dot(l[y])<0?-1:1;a.setXYZW(y,R.x,R.y,R.z,k)}for(let y=0,T=A.length;y<T;++y){let P=A[y],k=P.start,U=P.count;for(let z=k,F=k+U;z<F;z+=3)E(e.getX(z+0)),E(e.getX(z+1)),E(e.getX(z+2))}this._transformed=!0}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0||i.count!==t.count)i=new Yt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);let s=new Y,r=new Y,a=new Y,o=new Y,l=new Y,c=new Y,u=new Y,h=new Y;if(e)for(let d=0,f=e.count;d<f;d+=3){let m=e.getX(d+0),x=e.getX(d+1),p=e.getX(d+2);s.fromBufferAttribute(t,m),r.fromBufferAttribute(t,x),a.fromBufferAttribute(t,p),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),o.fromBufferAttribute(i,m),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,p),o.add(u),l.add(u),c.add(u),i.setXYZ(m,o.x,o.y,o.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(p,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)s.fromBufferAttribute(t,d+0),r.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),u.subVectors(a,r),h.subVectors(s,r),u.cross(h),i.setXYZ(d+0,u.x,u.y,u.z),i.setXYZ(d+1,u.x,u.y,u.z),i.setXYZ(d+2,u.x,u.y,u.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)sn.fromBufferAttribute(e,t),sn.normalize(),e.setXYZ(t,sn.x,sn.y,sn.z)}toNonIndexed(){function e(o,l){let c=o.array,u=o.itemSize,h=o.normalized,d=new c.constructor(l.length*u),f=0,m=0;for(let x=0,p=l.length;x<p;x++){o.isInterleavedBufferAttribute?f=l[x]*o.data.stride+o.offset:f=l[x]*u;for(let g=0;g<u;g++)d[m++]=c[f++]}return new Yt(d,u,h)}if(this.index===null)return ot("BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,s=this.attributes;for(let o in s){let l=s[o],c=e(l,i);t.setAttribute(o,c)}let r=this.morphAttributes;for(let o in r){let l=[],c=r[o];for(let u=0,h=c.length;u<h;u++){let d=c[u],f=e(d,i);l.push(f)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.parameters!==void 0&&this._transformed===!0?"BufferGeometry":this.type,e.name=this.name,Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0&&this._transformed!==!0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let s={},r=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],u=[];for(let h=0,d=c.length;h<d;h++){let f=c[h];u.push(f.toJSON(e.data))}u.length>0&&(s[l]=u,r=!0)}r&&(e.data.morphAttributes=s,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere=o.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let s=e.attributes;for(let c in s){let u=s[c];this.setAttribute(c,u.clone(t))}let r=e.morphAttributes;for(let c in r){let u=[],h=r[c];for(let d=0,f=h.length;d<f;d++)u.push(h[d].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,u=a.length;c<u;c++){let h=a[c];this.addGroup(h.start,h.count,h.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this._transformed=e._transformed,this}dispose(){this.dispatchEvent({type:"dispose"})}},ao=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=jd,this.updateRanges=[],this.version=0,this.uuid=Xi()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,i){e*=this.stride,i*=t.stride;for(let s=0,r=this.stride;s<r;s++)this.array[e+s]=t.array[i+s];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),i=new this.constructor(t,this.stride);return i.setUsage(this.usage),i}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Xi()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer)));let t={uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride};return t.usage=this.usage,t}},Sn=new Y,xn=class n{constructor(e,t,i,s=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=i,this.normalized=s}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,i=this.data.count;t<i;t++)Sn.fromBufferAttribute(this,t),Sn.applyMatrix4(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)Sn.fromBufferAttribute(this,t),Sn.applyNormalMatrix(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)Sn.fromBufferAttribute(this,t),Sn.transformDirection(e),this.setXYZ(t,Sn.x,Sn.y,Sn.z);return this}getComponent(e,t){let i=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(i=ci(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=Rt(i,this.array)),this.data.array[e*this.data.stride+this.offset+t]=i,this}setX(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=Rt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=ci(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=ci(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=ci(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=ci(t,this.array)),t}setXY(e,t,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),i=Rt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this}setXYZ(e,t,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),i=Rt(i,this.array),s=Rt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this}setXYZW(e,t,i,s,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=Rt(t,this.array),i=Rt(i,this.array),s=Rt(s,this.array),r=Rt(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=i,this.data.array[e+2]=s,this.data.array[e+3]=r,this}clone(e){if(e===void 0){no("InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return new Yt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new n(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){no("InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let i=0;i<this.count;i++){let s=i*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[s+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},dd=new Y,E0=new Y,T0=new ct,li=class{constructor(e=new Y(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,s){return this.normal.set(e,t,i),this.constant=s,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let s=dd.subVectors(i,t).cross(E0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(s,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t,i=!0){let s=e.delta(dd),r=this.normal.dot(s);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let a=-(e.start.dot(this.normal)+this.constant)/r;return i===!0&&(a<0||a>1)?null:t.copy(e.start).addScaledVector(s,a)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||T0.getNormalMatrix(e),s=this.coplanarPoint(dd).applyMatrix4(e),r=this.normal.applyMatrix3(i).normalize();return this.constant=-s.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}toJSON(){return{normal:this.normal.toArray(),constant:this.constant}}fromJSON(e){return this.normal.fromArray(e.normal),this.constant=e.constant,this}},A0=0,Ti=class extends Ei{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:A0++}),this.uuid=Xi(),this.name="",this.type="Material",this.blending=Xr,this.side=bs,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Rd,this.blendDst=Pd,this.blendEquation=qs,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new rt(0,0,0),this.blendAlpha=0,this.depthFunc=Ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ap,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Pl,this.stencilZFail=Pl,this.stencilZPass=Pl,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){ot(`Material: parameter '${t}' has value of undefined.`);continue}let s=this[t];if(s===void 0){ot(`Material: '${t}' is not a property of THREE.${this.type}.`);continue}s&&s.isColor?s.set(i):s&&s.isVector2&&i&&i.isVector2||s&&s.isEuler&&i&&i.isEuler||s&&s.isVector3&&i&&i.isVector3?s.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,i.blending=this.blending,i.side=this.side,i.shadowSide=this.shadowSide,i.vertexColors=this.vertexColors,i.opacity=this.opacity,i.transparent=this.transparent,i.blendSrc=this.blendSrc,i.blendDst=this.blendDst,i.blendEquation=this.blendEquation,i.blendSrcAlpha=this.blendSrcAlpha,i.blendDstAlpha=this.blendDstAlpha,i.blendEquationAlpha=this.blendEquationAlpha,i.blendColor=this.blendColor.getHex(),i.blendAlpha=this.blendAlpha,i.depthFunc=this.depthFunc,i.depthTest=this.depthTest,i.depthWrite=this.depthWrite,i.colorWrite=this.colorWrite,i.clipIntersection=this.clipIntersection,i.clipShadows=this.clipShadows,i.stencilWriteMask=this.stencilWriteMask,i.stencilFunc=this.stencilFunc,i.stencilRef=this.stencilRef,i.stencilFuncMask=this.stencilFuncMask,i.stencilFail=this.stencilFail,i.stencilZFail=this.stencilZFail,i.stencilZPass=this.stencilZPass,i.stencilWrite=this.stencilWrite,i.polygonOffset=this.polygonOffset,i.polygonOffsetFactor=this.polygonOffsetFactor,i.polygonOffsetUnits=this.polygonOffsetUnits,i.dithering=this.dithering,i.alphaTest=this.alphaTest,i.alphaHash=this.alphaHash,i.alphaToCoverage=this.alphaToCoverage,i.premultipliedAlpha=this.premultipliedAlpha,i.forceSinglePass=this.forceSinglePass,i.allowOverride=this.allowOverride,i.visible=this.visible,i.toneMapped=this.toneMapped,i.name=this.name,this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.retroreflectivity!==void 0&&(i.retroreflectivity=this.retroreflectivity),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),Array.isArray(this.clippingPlanes)&&this.clippingPlanes.length>0&&(i.clippingPlanes=this.clippingPlanes.map(r=>r.toJSON())),this.rotation!==void 0&&(i.rotation=this.rotation),this.depthPacking!==void 0&&(i.depthPacking=this.depthPacking),this.linewidth!==void 0&&(i.linewidth=this.linewidth),this.linecap!==void 0&&(i.linecap=this.linecap),this.linejoin!==void 0&&(i.linejoin=this.linejoin),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.wireframe!==void 0&&(i.wireframe=this.wireframe),this.wireframeLinewidth!==void 0&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!==void 0&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!==void 0&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading!==void 0&&(i.flatShading=this.flatShading),this.fog!==void 0&&(i.fog=this.fog),Object.keys(this.userData).length>0&&(i.userData=this.userData);function s(r){let a=[];for(let o in r){let l=r[o];delete l.metadata,a.push(l)}return a}if(t){let r=s(e.textures),a=s(e.images);r.length>0&&(i.textures=r),a.length>0&&(i.images=a)}return i}fromJSON(e,t){if(e.uuid!==void 0&&(this.uuid=e.uuid),e.name!==void 0&&(this.name=e.name),e.color!==void 0&&this.color!==void 0&&this.color.setHex(e.color),e.roughness!==void 0&&(this.roughness=e.roughness),e.metalness!==void 0&&(this.metalness=e.metalness),e.sheen!==void 0&&(this.sheen=e.sheen),e.sheenColor!==void 0&&(this.sheenColor=new rt().setHex(e.sheenColor)),e.sheenRoughness!==void 0&&(this.sheenRoughness=e.sheenRoughness),e.emissive!==void 0&&this.emissive!==void 0&&this.emissive.setHex(e.emissive),e.specular!==void 0&&this.specular!==void 0&&this.specular.setHex(e.specular),e.specularIntensity!==void 0&&(this.specularIntensity=e.specularIntensity),e.specularColor!==void 0&&this.specularColor!==void 0&&this.specularColor.setHex(e.specularColor),e.shininess!==void 0&&(this.shininess=e.shininess),e.clearcoat!==void 0&&(this.clearcoat=e.clearcoat),e.clearcoatRoughness!==void 0&&(this.clearcoatRoughness=e.clearcoatRoughness),e.dispersion!==void 0&&(this.dispersion=e.dispersion),e.retroreflectivity!==void 0&&(this.retroreflectivity=e.retroreflectivity),e.iridescence!==void 0&&(this.iridescence=e.iridescence),e.iridescenceIOR!==void 0&&(this.iridescenceIOR=e.iridescenceIOR),e.iridescenceThicknessRange!==void 0&&(this.iridescenceThicknessRange=e.iridescenceThicknessRange),e.transmission!==void 0&&(this.transmission=e.transmission),e.thickness!==void 0&&(this.thickness=e.thickness),e.attenuationDistance!==void 0&&(this.attenuationDistance=e.attenuationDistance),e.attenuationColor!==void 0&&this.attenuationColor!==void 0&&this.attenuationColor.setHex(e.attenuationColor),e.anisotropy!==void 0&&(this.anisotropy=e.anisotropy),e.anisotropyRotation!==void 0&&(this.anisotropyRotation=e.anisotropyRotation),e.fog!==void 0&&(this.fog=e.fog),e.flatShading!==void 0&&(this.flatShading=e.flatShading),e.blending!==void 0&&(this.blending=e.blending),e.combine!==void 0&&(this.combine=e.combine),e.side!==void 0&&(this.side=e.side),e.shadowSide!==void 0&&(this.shadowSide=e.shadowSide),e.opacity!==void 0&&(this.opacity=e.opacity),e.transparent!==void 0&&(this.transparent=e.transparent),e.alphaTest!==void 0&&(this.alphaTest=e.alphaTest),e.alphaHash!==void 0&&(this.alphaHash=e.alphaHash),e.depthFunc!==void 0&&(this.depthFunc=e.depthFunc),e.depthTest!==void 0&&(this.depthTest=e.depthTest),e.depthWrite!==void 0&&(this.depthWrite=e.depthWrite),e.colorWrite!==void 0&&(this.colorWrite=e.colorWrite),e.clippingPlanes!==void 0&&(this.clippingPlanes=e.clippingPlanes.map(i=>new li().fromJSON(i))),e.clipIntersection!==void 0&&(this.clipIntersection=e.clipIntersection),e.clipShadows!==void 0&&(this.clipShadows=e.clipShadows),e.depthPacking!==void 0&&(this.depthPacking=e.depthPacking),e.blendSrc!==void 0&&(this.blendSrc=e.blendSrc),e.blendDst!==void 0&&(this.blendDst=e.blendDst),e.blendEquation!==void 0&&(this.blendEquation=e.blendEquation),e.blendSrcAlpha!==void 0&&(this.blendSrcAlpha=e.blendSrcAlpha),e.blendDstAlpha!==void 0&&(this.blendDstAlpha=e.blendDstAlpha),e.blendEquationAlpha!==void 0&&(this.blendEquationAlpha=e.blendEquationAlpha),e.blendColor!==void 0&&this.blendColor!==void 0&&this.blendColor.setHex(e.blendColor),e.blendAlpha!==void 0&&(this.blendAlpha=e.blendAlpha),e.stencilWriteMask!==void 0&&(this.stencilWriteMask=e.stencilWriteMask),e.stencilFunc!==void 0&&(this.stencilFunc=e.stencilFunc),e.stencilRef!==void 0&&(this.stencilRef=e.stencilRef),e.stencilFuncMask!==void 0&&(this.stencilFuncMask=e.stencilFuncMask),e.stencilFail!==void 0&&(this.stencilFail=e.stencilFail),e.stencilZFail!==void 0&&(this.stencilZFail=e.stencilZFail),e.stencilZPass!==void 0&&(this.stencilZPass=e.stencilZPass),e.stencilWrite!==void 0&&(this.stencilWrite=e.stencilWrite),e.wireframe!==void 0&&(this.wireframe=e.wireframe),e.wireframeLinewidth!==void 0&&(this.wireframeLinewidth=e.wireframeLinewidth),e.wireframeLinecap!==void 0&&(this.wireframeLinecap=e.wireframeLinecap),e.wireframeLinejoin!==void 0&&(this.wireframeLinejoin=e.wireframeLinejoin),e.rotation!==void 0&&(this.rotation=e.rotation),e.linewidth!==void 0&&(this.linewidth=e.linewidth),e.linecap!==void 0&&(this.linecap=e.linecap),e.linejoin!==void 0&&(this.linejoin=e.linejoin),e.dashSize!==void 0&&(this.dashSize=e.dashSize),e.gapSize!==void 0&&(this.gapSize=e.gapSize),e.scale!==void 0&&(this.scale=e.scale),e.polygonOffset!==void 0&&(this.polygonOffset=e.polygonOffset),e.polygonOffsetFactor!==void 0&&(this.polygonOffsetFactor=e.polygonOffsetFactor),e.polygonOffsetUnits!==void 0&&(this.polygonOffsetUnits=e.polygonOffsetUnits),e.dithering!==void 0&&(this.dithering=e.dithering),e.alphaToCoverage!==void 0&&(this.alphaToCoverage=e.alphaToCoverage),e.premultipliedAlpha!==void 0&&(this.premultipliedAlpha=e.premultipliedAlpha),e.forceSinglePass!==void 0&&(this.forceSinglePass=e.forceSinglePass),e.allowOverride!==void 0&&(this.allowOverride=e.allowOverride),e.visible!==void 0&&(this.visible=e.visible),e.toneMapped!==void 0&&(this.toneMapped=e.toneMapped),e.userData!==void 0&&(this.userData=e.userData),e.vertexColors!==void 0&&(typeof e.vertexColors=="number"?this.vertexColors=e.vertexColors>0:this.vertexColors=e.vertexColors),e.size!==void 0&&(this.size=e.size),e.sizeAttenuation!==void 0&&(this.sizeAttenuation=e.sizeAttenuation),e.map!==void 0&&(this.map=t[e.map]||null),e.matcap!==void 0&&(this.matcap=t[e.matcap]||null),e.alphaMap!==void 0&&(this.alphaMap=t[e.alphaMap]||null),e.bumpMap!==void 0&&(this.bumpMap=t[e.bumpMap]||null),e.bumpScale!==void 0&&(this.bumpScale=e.bumpScale),e.normalMap!==void 0&&(this.normalMap=t[e.normalMap]||null),e.normalMapType!==void 0&&(this.normalMapType=e.normalMapType),e.normalScale!==void 0){let i=e.normalScale;Array.isArray(i)===!1&&(i=[i,i]),this.normalScale=new nt().fromArray(i)}return e.displacementMap!==void 0&&(this.displacementMap=t[e.displacementMap]||null),e.displacementScale!==void 0&&(this.displacementScale=e.displacementScale),e.displacementBias!==void 0&&(this.displacementBias=e.displacementBias),e.roughnessMap!==void 0&&(this.roughnessMap=t[e.roughnessMap]||null),e.metalnessMap!==void 0&&(this.metalnessMap=t[e.metalnessMap]||null),e.emissiveMap!==void 0&&(this.emissiveMap=t[e.emissiveMap]||null),e.emissiveIntensity!==void 0&&(this.emissiveIntensity=e.emissiveIntensity),e.specularMap!==void 0&&(this.specularMap=t[e.specularMap]||null),e.specularIntensityMap!==void 0&&(this.specularIntensityMap=t[e.specularIntensityMap]||null),e.specularColorMap!==void 0&&(this.specularColorMap=t[e.specularColorMap]||null),e.envMap!==void 0&&(this.envMap=t[e.envMap]||null),e.envMapRotation!==void 0&&this.envMapRotation.fromArray(e.envMapRotation),e.envMapIntensity!==void 0&&(this.envMapIntensity=e.envMapIntensity),e.reflectivity!==void 0&&(this.reflectivity=e.reflectivity),e.refractionRatio!==void 0&&(this.refractionRatio=e.refractionRatio),e.lightMap!==void 0&&(this.lightMap=t[e.lightMap]||null),e.lightMapIntensity!==void 0&&(this.lightMapIntensity=e.lightMapIntensity),e.aoMap!==void 0&&(this.aoMap=t[e.aoMap]||null),e.aoMapIntensity!==void 0&&(this.aoMapIntensity=e.aoMapIntensity),e.gradientMap!==void 0&&(this.gradientMap=t[e.gradientMap]||null),e.clearcoatMap!==void 0&&(this.clearcoatMap=t[e.clearcoatMap]||null),e.clearcoatRoughnessMap!==void 0&&(this.clearcoatRoughnessMap=t[e.clearcoatRoughnessMap]||null),e.clearcoatNormalMap!==void 0&&(this.clearcoatNormalMap=t[e.clearcoatNormalMap]||null),e.clearcoatNormalScale!==void 0&&(this.clearcoatNormalScale=new nt().fromArray(e.clearcoatNormalScale)),e.iridescenceMap!==void 0&&(this.iridescenceMap=t[e.iridescenceMap]||null),e.iridescenceThicknessMap!==void 0&&(this.iridescenceThicknessMap=t[e.iridescenceThicknessMap]||null),e.transmissionMap!==void 0&&(this.transmissionMap=t[e.transmissionMap]||null),e.thicknessMap!==void 0&&(this.thicknessMap=t[e.thicknessMap]||null),e.anisotropyMap!==void 0&&(this.anisotropyMap=t[e.anisotropyMap]||null),e.sheenColorMap!==void 0&&(this.sheenColorMap=t[e.sheenColorMap]||null),e.sheenRoughnessMap!==void 0&&(this.sheenRoughnessMap=t[e.sheenRoughnessMap]||null),this}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let s=t.length;i=new Array(s);for(let r=0;r!==s;++r)i[r]=t[r].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.allowOverride=e.allowOverride,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}},Br=class extends Ti{constructor(e){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Sr,qa=new Y,Mr=new Y,wr=new Y,Er=new nt,Ya=new nt,Bp=new Mt,dl=new Y,$a=new Y,hl=new Y,Bf=new nt,hd=new nt,zf=new nt,oo=class extends Kt{constructor(e=new Br){if(super(),this.isSprite=!0,this.type="Sprite",Sr===void 0){Sr=new Wt;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),i=new ao(t,5);Sr.setIndex([0,1,2,0,2,3]),Sr.setAttribute("position",new xn(i,3,0,!1)),Sr.setAttribute("uv",new xn(i,2,3,!1))}this.geometry=Sr,this.material=e,this.center=new nt(.5,.5),this.count=1}intersectsFrustum(e){return e.intersectsSprite(this)}raycast(e,t){e.camera===null&&lt('Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Mr.setFromMatrixScale(this.matrixWorld),Bp.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),wr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Mr.multiplyScalar(-wr.z);let i=this.material.rotation,s,r;i!==0&&(r=Math.cos(i),s=Math.sin(i));let a=this.center;fl(dl.set(-.5,-.5,0),wr,a,Mr,s,r),fl($a.set(.5,-.5,0),wr,a,Mr,s,r),fl(hl.set(.5,.5,0),wr,a,Mr,s,r),Bf.set(0,0),hd.set(1,0),zf.set(1,1);let o=e.ray.intersectTriangle(dl,$a,hl,!1,qa);if(o===null&&(fl($a.set(-.5,.5,0),wr,a,Mr,s,r),hd.set(0,1),o=e.ray.intersectTriangle(dl,hl,$a,!1,qa),o===null))return;let l=e.ray.origin.distanceTo(qa);l<e.near||l>e.far||t.push({distance:l,point:qa.clone(),uv:ji.getInterpolation(qa,dl,$a,hl,Bf,hd,zf,new nt),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};function fl(n,e,t,i,s,r){Er.subVectors(n,t).addScalar(.5).multiply(i),s!==void 0?(Ya.x=r*Er.x-s*Er.y,Ya.y=s*Er.x+r*Er.y):Ya.copy(Er),n.copy(e),n.x+=Ya.x,n.y+=Ya.y,n.applyMatrix4(Bp)}var Wi=new Y,fd=new Y,pl=new Y,ml=new Y,lo=class{constructor(e=new Y,t=new Y(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Wi)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Wi.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Wi.copy(this.origin).addScaledVector(this.direction,t),Wi.distanceToSquared(e))}distanceSqToSegment(e,t,i,s){fd.copy(e).add(t).multiplyScalar(.5),pl.copy(t).sub(e).normalize(),ml.copy(this.origin).sub(fd);let r=e.distanceTo(t)*.5,a=-this.direction.dot(pl),o=ml.dot(this.direction),l=-ml.dot(pl),c=ml.lengthSq(),u=Math.abs(1-a*a),h,d,f,m;if(u>0)if(h=a*l-o,d=a*o-l,m=r*u,h>=0)if(d>=-m)if(d<=m){let x=1/u;h*=x,d*=x,f=h*(h+a*d+2*o)+d*(a*h+d+2*l)+c}else d=r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d=-r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;else d<=-m?(h=Math.max(0,-(-a*r+o)),d=h>0?-r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c):d<=m?(h=0,d=Math.min(Math.max(-r,-l),r),f=d*(d+2*l)+c):(h=Math.max(0,-(a*r+o)),d=h>0?r:Math.min(Math.max(-r,-l),r),f=-h*h+d*(d+2*l)+c);else d=a>0?-r:r,h=Math.max(0,-(a*d+o)),f=-h*h+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,h),s&&s.copy(fd).addScaledVector(pl,d),f}intersectSphere(e,t){if(e.radius<0)return null;Wi.subVectors(e.center,this.origin);let i=Wi.dot(this.direction),s=Wi.dot(Wi)-i*i,r=e.radius*e.radius;if(s>r)return null;let a=Math.sqrt(r-s),o=i-a,l=i+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,s,r,a,o,l,c=1/this.direction.x,u=1/this.direction.y,h=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,s=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,s=(e.min.x-d.x)*c),u>=0?(r=(e.min.y-d.y)*u,a=(e.max.y-d.y)*u):(r=(e.max.y-d.y)*u,a=(e.min.y-d.y)*u),i>a||r>s||((r>i||isNaN(i))&&(i=r),(a<s||isNaN(s))&&(s=a),h>=0?(o=(e.min.z-d.z)*h,l=(e.max.z-d.z)*h):(o=(e.max.z-d.z)*h,l=(e.min.z-d.z)*h),i>l||o>s)||((o>i||i!==i)&&(i=o),(l<s||s!==s)&&(s=l),s<0)?null:this.at(i>=0?i:s,t)}intersectsBox(e){return this.intersectBox(e,Wi)!==null}intersectTriangle(e,t,i,s,r){let a=this.origin,o=this.direction,l=o.x,c=o.y,u=o.z,h=e.x-a.x,d=e.y-a.y,f=e.z-a.z,m=t.x-a.x,x=t.y-a.y,p=t.z-a.z,g=i.x-a.x,A=i.y-a.y,R=i.z-a.z,v=Math.abs(l),w=Math.abs(c),M=Math.abs(u),E,y,T,P,k,U,z,F,q,K,ne,oe;if(v>=w&&v>=M?(T=l,U=h,q=m,oe=g,l>=0?(E=c,y=u,P=d,k=f,z=x,F=p,K=A,ne=R):(E=u,y=c,P=f,k=d,z=p,F=x,K=R,ne=A)):w>=M?(T=c,U=d,q=x,oe=A,c>=0?(E=u,y=l,P=f,k=h,z=p,F=m,K=R,ne=g):(E=l,y=u,P=h,k=f,z=m,F=p,K=g,ne=R)):(T=u,U=f,q=p,oe=R,u>=0?(E=l,y=c,P=h,k=d,z=m,F=x,K=g,ne=A):(E=c,y=l,P=d,k=h,z=x,F=m,K=A,ne=g)),T===0)return null;let j=E/T,le=y/T,ce=1/T,re=P-j*U,xe=k-le*U,Xe=z-j*q,Ne=F-le*q,qe=K-j*oe,H=ne-le*oe,W=qe*Ne-H*Xe,_e=re*H-xe*qe,ve=Xe*xe-Ne*re;if(s){if(W<0||_e<0||ve<0)return null}else if((W<0||_e<0||ve<0)&&(W>0||_e>0||ve>0))return null;let ge=W+_e+ve;if(ge===0)return null;let Be=ce*(W*U+_e*q+ve*oe);return(ge>0?Be<0:Be>0)?null:this.at(Be/ge,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},ms=class extends Ti{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yi,this.combine=ac,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Vf=new Mt,Vs=new lo,gl=new di,Hf=new Y,_l=new Y,xl=new Y,yl=new Y,pd=new Y,vl=new Y,Gf=new Y,bl=new Y,Vt=class extends Kt{constructor(e=new Wt,t=new ms){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}getVertexPosition(e,t){let i=this.geometry,s=i.attributes.position,r=i.morphAttributes.position,a=i.morphTargetsRelative;t.fromBufferAttribute(s,e);let o=this.morphTargetInfluences;if(r&&o){vl.set(0,0,0);for(let l=0,c=r.length;l<c;l++){let u=o[l],h=r[l];u!==0&&(pd.fromBufferAttribute(h,e),a?vl.addScaledVector(pd,u):vl.addScaledVector(pd.sub(t),u))}t.add(vl)}return t}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.material,r=this.matrixWorld;s!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),gl.copy(i.boundingSphere),gl.applyMatrix4(r),Vs.copy(e.ray).recast(e.near),!(gl.containsPoint(Vs.origin)===!1&&(Vs.intersectSphere(gl,Hf)===null||Vs.origin.distanceToSquared(Hf)>(e.far-e.near)**2))&&(Vf.copy(r).invert(),Vs.copy(e.ray).applyMatrix4(Vf),!(i.boundingBox!==null&&Vs.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,Vs)))}_computeIntersections(e,t,i){let s,r=this.geometry,a=this.material,o=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,h=r.attributes.normal,d=r.groups,f=r.drawRange;if(o!==null)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){let p=d[m],g=a[p.materialIndex],A=Math.max(p.start,f.start),R=Math.min(o.count,Math.min(p.start+p.count,f.start+f.count));for(let v=A,w=R;v<w;v+=3){let M=o.getX(v),E=o.getX(v+1),y=o.getX(v+2);s=Sl(this,g,e,i,c,u,h,M,E,y),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),x=Math.min(o.count,f.start+f.count);for(let p=m,g=x;p<g;p+=3){let A=o.getX(p),R=o.getX(p+1),v=o.getX(p+2);s=Sl(this,a,e,i,c,u,h,A,R,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}else if(l!==void 0)if(Array.isArray(a))for(let m=0,x=d.length;m<x;m++){let p=d[m],g=a[p.materialIndex],A=Math.max(p.start,f.start),R=Math.min(l.count,Math.min(p.start+p.count,f.start+f.count));for(let v=A,w=R;v<w;v+=3){let M=v,E=v+1,y=v+2;s=Sl(this,g,e,i,c,u,h,M,E,y),s&&(s.faceIndex=Math.floor(v/3),s.face.materialIndex=p.materialIndex,t.push(s))}}else{let m=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let p=m,g=x;p<g;p+=3){let A=p,R=p+1,v=p+2;s=Sl(this,a,e,i,c,u,h,A,R,v),s&&(s.faceIndex=Math.floor(p/3),t.push(s))}}}};function C0(n,e,t,i,s,r,a,o){let l;if(e.side===cn?l=i.intersectTriangle(a,r,s,!0,o):l=i.intersectTriangle(s,r,a,e.side===bs,o),l===null)return null;bl.copy(o),bl.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(bl);return c<t.near||c>t.far?null:{distance:c,point:bl.clone(),object:n}}function Sl(n,e,t,i,s,r,a,o,l,c){n.getVertexPosition(o,_l),n.getVertexPosition(l,xl),n.getVertexPosition(c,yl);let u=C0(n,e,t,i,_l,xl,yl,Gf);if(u){let h=new Y;ji.getBarycoord(Gf,_l,xl,yl,h),s&&(u.uv=ji.getInterpolatedAttribute(s,o,l,c,h,new nt)),r&&(u.uv1=ji.getInterpolatedAttribute(r,o,l,c,h,new nt)),a&&(u.normal=ji.getInterpolatedAttribute(a,o,l,c,h,new Y),u.normal.dot(i.direction)>0&&u.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new Y,materialIndex:0};ji.getNormal(_l,xl,yl,d.normal),u.face=d,u.barycoord=h}return u}var $i=class extends Gt{constructor(e=null,t=1,i=1,s,r,a,o,l,c=$t,u=$t,h,d){super(null,a,o,l,c,u,s,r,h,d),this.isDataTexture=!0,this.image={data:e,width:t,height:i},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Hs=new di,R0=new nt(.5,.5),Ml=new Y,zr=class{constructor(e=new li,t=new li,i=new li,s=new li,r=new li,a=new li){this.planes=[e,t,i,s,r,a]}set(e,t,i,s,r,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(i),o[3].copy(s),o[4].copy(r),o[5].copy(a),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=ui,i=!1){let s=this.planes,r=e.elements,a=r[0],o=r[1],l=r[2],c=r[3],u=r[4],h=r[5],d=r[6],f=r[7],m=r[8],x=r[9],p=r[10],g=r[11],A=r[12],R=r[13],v=r[14],w=r[15];if(s[0].setComponents(c-a,f-u,g-m,w-A).normalize(),s[1].setComponents(c+a,f+u,g+m,w+A).normalize(),s[2].setComponents(c+o,f+h,g+x,w+R).normalize(),s[3].setComponents(c-o,f-h,g-x,w-R).normalize(),i)s[4].setComponents(l,d,p,v).normalize(),s[5].setComponents(c-l,f-d,g-p,w-v).normalize();else if(s[4].setComponents(c-l,f-d,g-p,w-v).normalize(),t===ui)s[5].setComponents(c+l,f+d,g+p,w+v).normalize();else if(t===Dr)s[5].setComponents(l,d,p,v).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),Hs.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),Hs.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(Hs)}intersectsSprite(e){Hs.center.set(0,0,0);let t=R0.distanceTo(e.center);return Hs.radius=.7071067811865476+t,Hs.applyMatrix4(e.matrixWorld),this.intersectsSphere(Hs)}intersectsSphere(e){let t=this.planes,i=e.center,s=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(i)<s)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let s=t[i];if(Ml.x=s.normal.x>0?e.max.x:e.min.x,Ml.y=s.normal.y>0?e.max.y:e.min.y,Ml.z=s.normal.z>0?e.max.z:e.min.z,s.distanceToPoint(Ml)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Xs=class extends Ti{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new rt(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Wf=new Mt,Sd=new lo,wl=new di,El=new Y,gs=class extends Kt{constructor(e=new Wt,t=new Xs){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}intersectsFrustum(e){return e.intersectsObject(this)}raycast(e,t){let i=this.geometry,s=this.matrixWorld,r=e.params.Points.threshold,a=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),wl.copy(i.boundingSphere),wl.applyMatrix4(s),wl.radius+=r,e.ray.intersectsSphere(wl)===!1)return;Wf.copy(s).invert(),Sd.copy(e.ray).applyMatrix4(Wf);let o=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=i.index,h=i.attributes.position;if(c!==null){let d=Math.max(0,a.start),f=Math.min(c.count,a.start+a.count);for(let m=d,x=f;m<x;m++){let p=c.getX(m);El.fromBufferAttribute(h,p),jf(El,p,l,s,e,t,this)}}else{let d=Math.max(0,a.start),f=Math.min(h.count,a.start+a.count);for(let m=d,x=f;m<x;m++)El.fromBufferAttribute(h,m),jf(El,m,l,s,e,t,this)}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let s=t[i[0]];if(s!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,a=s.length;r<a;r++){let o=s[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[o]=r}}}}};function jf(n,e,t,i,s,r,a){let o=Sd.distanceSqToPoint(n);if(o<t){let l=new Y;Sd.closestPointToPoint(n,l),l.applyMatrix4(i);let c=s.ray.origin.distanceTo(l);if(c<s.near||c>s.far)return;r.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}var co=class extends Gt{constructor(e=[],t=Ss,i,s,r,a,o,l,c,u){super(e,t,i,s,r,a,o,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},Vr=class extends Gt{constructor(e,t,i,s,r,a,o,l,c){super(e,t,i,s,r,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}};var _s=class extends Gt{constructor(e,t,i=pi,s,r,a,o=$t,l=$t,c,u=wi,h=1){if(u!==wi&&u!==Ms)throw new Error("THREE.DepthTexture: format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:h};super(d,s,r,a,o,l,u,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Fr(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return t.compareFunction=this.compareFunction,t}},Gl=class extends _s{constructor(e,t=pi,i=Ss,s,r,a=$t,o=$t,l,c=wi){let u={width:e,height:e,depth:1},h=[u,u,u,u,u,u];super(e,e,t,i,s,r,a,o,l,c),this.image=h,this.isCubeDepthTexture=!0,this.isCubeTexture=!0}get images(){return this.image}set images(e){this.image=e}},uo=class extends Gt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}},Hr=class n extends Wt{constructor(e=1,t=1,i=1,s=1,r=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:s,heightSegments:r,depthSegments:a};let o=this;s=Math.floor(s),r=Math.floor(r),a=Math.floor(a);let l=[],c=[],u=[],h=[],d=0,f=0;m("z","y","x",-1,-1,i,t,e,a,r,0),m("z","y","x",1,-1,i,t,-e,a,r,1),m("x","z","y",1,1,e,i,t,s,a,2),m("x","z","y",1,-1,e,i,-t,s,a,3),m("x","y","z",1,-1,e,t,i,s,r,4),m("x","y","z",-1,-1,e,t,-i,s,r,5),this.setIndex(l),this.setAttribute("position",new zt(c,3)),this.setAttribute("normal",new zt(u,3)),this.setAttribute("uv",new zt(h,2));function m(x,p,g,A,R,v,w,M,E,y,T){let P=v/E,k=w/y,U=v/2,z=w/2,F=M/2,q=E+1,K=y+1,ne=0,oe=0,j=new Y;for(let le=0;le<K;le++){let ce=le*k-z;for(let re=0;re<q;re++){let xe=re*P-U;j[x]=xe*A,j[p]=ce*R,j[g]=F,c.push(j.x,j.y,j.z),j[x]=0,j[p]=0,j[g]=M>0?1:-1,u.push(j.x,j.y,j.z),h.push(re/E),h.push(1-le/y),ne+=1}}for(let le=0;le<y;le++)for(let ce=0;ce<E;ce++){let re=d+ce+q*le,xe=d+ce+q*(le+1),Xe=d+(ce+1)+q*(le+1),Ne=d+(ce+1)+q*le;l.push(re,xe,Ne),l.push(xe,Xe,Ne),oe+=6}o.addGroup(f,oe,T),f+=oe,d+=ne}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};var ho=class n extends Wt{constructor(e=1,t=1,i=1,s=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:s};let r=e/2,a=t/2,o=Math.floor(i),l=Math.floor(s),c=o+1,u=l+1,h=e/o,d=t/l,f=[],m=[],x=[],p=[];for(let g=0;g<u;g++){let A=g*d-a;for(let R=0;R<c;R++){let v=R*h-r;m.push(v,-A,0),x.push(0,0,1),p.push(R/o),p.push(1-g/l)}}for(let g=0;g<l;g++)for(let A=0;A<o;A++){let R=A+c*g,v=A+c*(g+1),w=A+1+c*(g+1),M=A+1+c*g;f.push(R,v,M),f.push(v,w,M)}this.setIndex(f),this.setAttribute("position",new zt(m,3)),this.setAttribute("normal",new zt(x,3)),this.setAttribute("uv",new zt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}},fo=class n extends Wt{constructor(e=.5,t=1,i=32,s=1,r=0,a=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:i,phiSegments:s,thetaStart:r,thetaLength:a},i=Math.max(3,i),s=Math.max(1,s);let o=[],l=[],c=[],u=[],h=e,d=(t-e)/s,f=new Y,m=new nt;for(let x=0;x<=s;x++){for(let p=0;p<=i;p++){let g=r+p/i*a;f.x=h*Math.cos(g),f.y=h*Math.sin(g),l.push(f.x,f.y,f.z),c.push(0,0,1),m.x=(f.x/t+1)/2,m.y=(f.y/t+1)/2,u.push(m.x,m.y)}h+=d}for(let x=0;x<s;x++){let p=x*(i+1);for(let g=0;g<i;g++){let A=g+p,R=A,v=A+i+1,w=A+i+2,M=A+1;o.push(R,v,M),o.push(v,w,M)}}this.setIndex(o),this.setAttribute("position",new zt(l,3)),this.setAttribute("normal",new zt(c,3)),this.setAttribute("uv",new zt(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}};var hi=class n extends Wt{constructor(e=1,t=32,i=16,s=0,r=Math.PI*2,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:i,phiStart:s,phiLength:r,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),i=Math.max(2,Math.floor(i));let l=Math.min(a+o,Math.PI),c=0,u=[],h=new Y,d=new Y,f=[],m=[],x=[],p=[];for(let g=0;g<=i;g++){let A=[],R=g/i,v=a+R*o,w=e*Math.cos(v),M=Math.sqrt(e*e-w*w),E=0;g===0&&a===0?E=.5/t:g===i&&l===Math.PI&&(E=-.5/t);for(let y=0;y<=t;y++){let T=y/t,P=s+T*r;h.x=-M*Math.cos(P),h.y=w,h.z=M*Math.sin(P),m.push(h.x,h.y,h.z),d.copy(h).normalize(),x.push(d.x,d.y,d.z),p.push(T+E,1-R),A.push(c++)}u.push(A)}for(let g=0;g<i;g++)for(let A=0;A<t;A++){let R=u[g][A+1],v=u[g][A],w=u[g+1][A],M=u[g+1][A+1];(g!==0||a>0)&&f.push(R,v,M),(g!==i-1||l<Math.PI)&&f.push(v,w,M)}this.setIndex(f),this.setAttribute("position",new zt(m,3)),this.setAttribute("normal",new zt(x,3)),this.setAttribute("uv",new zt(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}};var po=class extends Wt{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],i=new Set,s=new Y,r=new Y;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,u=l.length;c<u;++c){let h=l[c],d=h.start,f=h.count;for(let m=d,x=d+f;m<x;m+=3)for(let p=0;p<3;p++){let g=o.getX(m+p),A=o.getX(m+(p+1)%3);s.fromBufferAttribute(a,g),r.fromBufferAttribute(a,A),Xf(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let u=3*o+c,h=3*o+(c+1)%3;s.fromBufferAttribute(a,u),r.fromBufferAttribute(a,h),Xf(s,r,i)===!0&&(t.push(s.x,s.y,s.z),t.push(r.x,r.y,r.z))}}this.setAttribute("position",new zt(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};function Xf(n,e,t){let i=`${n.x},${n.y},${n.z}-${e.x},${e.y},${e.z}`,s=`${e.x},${e.y},${e.z}-${n.x},${n.y},${n.z}`;return t.has(i)===!0||t.has(s)===!0?!1:(t.add(i),t.add(s),!0)}function Js(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let s=n[t][i];if(qf(s))s.isRenderTargetTexture?(ot("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=s.clone();else if(Array.isArray(s))if(qf(s[0])){let r=[];for(let a=0,o=s.length;a<o;a++)r[a]=s[a].clone();e[t][i]=r}else e[t][i]=s.slice();else e[t][i]=s}}return e}function yn(n){let e={};for(let t=0;t<n.length;t++){let i=Js(n[t]);for(let s in i)e[s]=i[s]}return e}function qf(n){return n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)}function P0(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function $d(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:bt.workingColorSpace}var Io={clone:Js,merge:yn},L0=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,I0=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,Nt=class extends Ti{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=L0,this.fragmentShader=I0,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Js(e.uniforms),this.uniformsGroups=P0(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this.defaultAttributeValues=Object.assign({},e.defaultAttributeValues),this.index0AttributeName=e.index0AttributeName,this.uniformsNeedUpdate=e.uniformsNeedUpdate,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let s in this.uniforms){let a=this.uniforms[s].value;a&&a.isTexture?t.uniforms[s]={type:"t",value:a.toJSON(e).uuid}:a&&a.isColor?t.uniforms[s]={type:"c",value:a.getHex()}:a&&a.isVector2?t.uniforms[s]={type:"v2",value:a.toArray()}:a&&a.isVector3?t.uniforms[s]={type:"v3",value:a.toArray()}:a&&a.isVector4?t.uniforms[s]={type:"v4",value:a.toArray()}:a&&a.isMatrix3?t.uniforms[s]={type:"m3",value:a.toArray()}:a&&a.isMatrix4?t.uniforms[s]={type:"m4",value:a.toArray()}:t.uniforms[s]={value:a}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let s in this.extensions)this.extensions[s]===!0&&(i[s]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}fromJSON(e,t){if(super.fromJSON(e,t),e.uniforms!==void 0)for(let i in e.uniforms){let s=e.uniforms[i];switch(this.uniforms[i]={},s.type){case"t":this.uniforms[i].value=t[s.value]||null;break;case"c":this.uniforms[i].value=new rt().setHex(s.value);break;case"v2":this.uniforms[i].value=new nt().fromArray(s.value);break;case"v3":this.uniforms[i].value=new Y().fromArray(s.value);break;case"v4":this.uniforms[i].value=new yt().fromArray(s.value);break;case"m3":this.uniforms[i].value=new ct().fromArray(s.value);break;case"m4":this.uniforms[i].value=new Mt().fromArray(s.value);break;default:this.uniforms[i].value=s.value}}if(e.defines!==void 0&&(this.defines=e.defines),e.vertexShader!==void 0&&(this.vertexShader=e.vertexShader),e.fragmentShader!==void 0&&(this.fragmentShader=e.fragmentShader),e.glslVersion!==void 0&&(this.glslVersion=e.glslVersion),e.extensions!==void 0)for(let i in e.extensions)this.extensions[i]=e.extensions[i];return e.lights!==void 0&&(this.lights=e.lights),e.clipping!==void 0&&(this.clipping=e.clipping),this}},Wl=class extends Nt{constructor(e){super(e),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}};var mo=class extends Ti{constructor(e){super(),this.isMeshLambertMaterial=!0,this.type="MeshLambertMaterial",this.color=new rt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new rt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Xc,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Yi,this.combine=ac,this.reflectivity=1,this.envMapIntensity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.envMapIntensity=e.envMapIntensity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},jl=class extends Ti{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Ep,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},Xl=class extends Ti{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Tr(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function md(n){return n!==void 0&&n.inTangents!==void 0&&n.outTangents!==void 0}var xs=class{constructor(e,t,i,s){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=s!==void 0?s:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,s=t[i],r=t[i-1];n:{e:{let a;t:{i:if(!(e<s)){for(let o=i+2;;){if(s===void 0){if(e<r)break i;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===o)break;if(r=s,s=t[++i],e<s)break e}a=t.length;break t}if(!(e>=r)){let o=t[1];e<o&&(i=2,r=o);for(let l=i-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(s=r,r=t[--i-1],e>=r)break e}a=i,i=0;break t}break n}for(;i<a;){let o=i+a>>>1;e<t[o]?a=o:i=o+1}if(s=t[i],r=t[i-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(s===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,r,s)}return this.interpolate_(i,r,e,s)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,s=this.valueSize,r=e*s;for(let a=0;a!==s;++a)t[a]=i[r+a];return t}interpolate_(){throw new Error("THREE.Interpolant: Call to abstract method.")}intervalChanged_(){}},ql=class extends xs{constructor(e,t,i,s){super(e,t,i,s),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:yd,endingEnd:yd}}intervalChanged_(e,t,i){let s=this.parameterPositions,r=e-2,a=e+1,o=s[r],l=s[a];if(o===void 0)switch(this.getSettings_().endingStart){case vd:r=e,o=2*t-i;break;case bd:r=s.length-2,o=t+s[r]-s[r+1];break;default:r=e,o=i}if(l===void 0)switch(this.getSettings_().endingEnd){case vd:a=e,l=2*i-t;break;case bd:a=1,l=i+s[1]-s[0];break;default:a=e-1,l=t}let c=(i-t)*.5,u=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-i),this._offsetPrev=r*u,this._offsetNext=a*u}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this._offsetPrev,h=this._offsetNext,d=this._weightPrev,f=this._weightNext,m=(i-t)/(s-t),x=m*m,p=x*m,g=-d*p+2*d*x-d*m,A=(1+d)*p+(-1.5-2*d)*x+(-.5+d)*m+1,R=(-1-f)*p+(1.5+f)*x+.5*m,v=f*p-f*x;for(let w=0;w!==o;++w)r[w]=g*a[u+w]+A*a[c+w]+R*a[l+w]+v*a[h+w];return r}},Yl=class extends xs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=(i-t)/(s-t),h=1-u;for(let d=0;d!==o;++d)r[d]=a[c+d]*h+a[l+d]*u;return r}},$l=class extends xs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e){return this.copySampleValue_(e-1)}},Jl=class extends xs{interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,u=this.inTangents,h=this.outTangents;if(!u||!h){let m=(i-t)/(s-t),x=1-m;for(let p=0;p!==o;++p)r[p]=a[c+p]*x+a[l+p]*m;return r}let d=o*2,f=e-1;for(let m=0;m!==o;++m){let x=a[c+m],p=a[l+m],g=f*d+m*2,A=h[g],R=h[g+1],v=e*d+m*2,w=u[v],M=u[v+1],E=N0(i,t,A,w,s);r[m]=zp(E,x,R,M,p)}return r}};function zp(n,e,t,i,s){let r=1-n;return r*r*r*e+3*r*r*n*t+3*r*n*n*i+n*n*n*s}function D0(n,e,t,i,s){let r=1-n;return 3*r*r*(t-e)+6*r*n*(i-t)+3*n*n*(s-i)}function N0(n,e,t,i,s){let r=(n-e)/(s-e);for(let a=0;a<8;a++){let o=zp(r,e,t,i,s)-n;if(Math.abs(o)<1e-10)break;let l=D0(r,e,t,i,s);if(Math.abs(l)<1e-10)break;r=Math.max(0,Math.min(1,r-o/l))}return r}var Fn=class{constructor(e,t,i,s){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Tr(t,this.TimeBufferType),this.values=Tr(i,this.ValueBufferType),this.setInterpolation(s||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Tr(e.times,Array),values:Tr(e.values,Array)};let s=e.getInterpolation();s!==e.DefaultInterpolation&&(i.interpolation=s),md(e.settings)&&(i.settings={inTangents:Tr(e.settings.inTangents,Array),outTangents:Tr(e.settings.outTangents,Array)})}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new $l(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Yl(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new ql(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodBezier(e){let t=new Jl(this.times,this.values,this.getValueSize(),e);return this.settings&&(t.inTangents=this.settings.inTangents,t.outTangents=this.settings.outTangents),t}setInterpolation(e){let t;switch(e){case Ka:t=this.InterpolantFactoryMethodDiscrete;break;case Bl:t=this.InterpolantFactoryMethodLinear;break;case Rl:t=this.InterpolantFactoryMethodSmooth;break;case xd:t=this.InterpolantFactoryMethodBezier;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return ot("KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Ka;case this.InterpolantFactoryMethodLinear:return Bl;case this.InterpolantFactoryMethodSmooth:return Rl;case this.InterpolantFactoryMethodBezier:return xd}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,s=t.length;i!==s;++i)t[i]*=e;md(this.settings)&&(Yf(this.settings.inTangents,e),Yf(this.settings.outTangents,e))}return this}trim(e,t){let i=this.times,s=i.length,r=0,a=s-1;for(;r!==s&&i[r]<e;)++r;for(;a!==-1&&i[a]>t;)--a;if(++a,r!==0||a!==s){r>=a&&(a=Math.max(a,1),r=a-1);let o=this.getValueSize();this.times=i.slice(r,a),this.values=this.values.slice(r*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(lt("KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,s=this.values,r=i.length;r===0&&(lt("KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==r;o++){let l=i[o];if(typeof l=="number"&&isNaN(l)){lt("KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){lt("KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(s!==void 0&&$g(s))for(let o=0,l=s.length;o!==l;++o){let c=s[o];if(isNaN(c)){lt("KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),s=this.getInterpolation()===Rl,r=e.length-1,a=1;for(let o=1;o<r;++o){let l=!1,c=e[o],u=e[o+1];if(c!==u&&(o!==1||c!==e[0]))if(s)l=!0;else{let h=o*i,d=h-i,f=h+i;for(let m=0;m!==i;++m){let x=t[h+m];if(x!==t[d+m]||x!==t[f+m]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*i,d=a*i;for(let f=0;f!==i;++f)t[d+f]=t[h+f]}++a}}if(r>0){e[a]=e[r];for(let o=r*i,l=a*i,c=0;c!==i;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,s=new i(this.name,e,t);return s.createInterpolant=this.createInterpolant,md(this.settings)&&(s.settings={inTangents:this.settings.inTangents.slice(),outTangents:this.settings.outTangents.slice()}),s}};function Yf(n,e){for(let t=0,i=n.length;t!==i;t+=2)n[t]*=e}Fn.prototype.ValueTypeName="";Fn.prototype.TimeBufferType=Float32Array;Fn.prototype.ValueBufferType=Float32Array;Fn.prototype.DefaultInterpolation=Bl;var ys=class extends Fn{constructor(e,t,i){super(e,t,i)}};ys.prototype.ValueTypeName="bool";ys.prototype.ValueBufferType=Array;ys.prototype.DefaultInterpolation=Ka;ys.prototype.InterpolantFactoryMethodLinear=void 0;ys.prototype.InterpolantFactoryMethodSmooth=void 0;var Zl=class extends Fn{constructor(e,t,i,s){super(e,t,i,s)}};Zl.prototype.ValueTypeName="color";var Kl=class extends Fn{constructor(e,t,i,s){super(e,t,i,s)}};Kl.prototype.ValueTypeName="number";var Ql=class extends xs{constructor(e,t,i,s){super(e,t,i,s)}interpolate_(e,t,i,s){let r=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(i-t)/(s-t),c=e*o;for(let u=c+o;c!==u;c+=4)$n.slerpFlat(r,0,a,c-o,a,c,l);return r}},go=class extends Fn{constructor(e,t,i,s){super(e,t,i,s)}InterpolantFactoryMethodLinear(e){return new Ql(this.times,this.values,this.getValueSize(),e)}};go.prototype.ValueTypeName="quaternion";go.prototype.InterpolantFactoryMethodSmooth=void 0;var vs=class extends Fn{constructor(e,t,i){super(e,t,i)}};vs.prototype.ValueTypeName="string";vs.prototype.ValueBufferType=Array;vs.prototype.DefaultInterpolation=Ka;vs.prototype.InterpolantFactoryMethodLinear=void 0;vs.prototype.InterpolantFactoryMethodSmooth=void 0;var ec=class extends Fn{constructor(e,t,i,s){super(e,t,i,s)}};ec.prototype.ValueTypeName="vector";var tc=class{constructor(e,t,i){let s=this,r=!1,a=0,o=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this._abortController=null,this.itemStart=function(u){o++,r===!1&&s.onStart!==void 0&&s.onStart(u,a,o),r=!0},this.itemEnd=function(u){a++,s.onProgress!==void 0&&s.onProgress(u,a,o),a===o&&(r=!1,s.onLoad!==void 0&&s.onLoad())},this.itemError=function(u){s.onError!==void 0&&s.onError(u)},this.resolveURL=function(u){return u=u.normalize("NFC"),l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,h){return c.push(u,h),this},this.removeHandler=function(u){let h=c.indexOf(u);return h!==-1&&c.splice(h,2),this},this.getHandler=function(u){for(let h=0,d=c.length;h<d;h+=2){let f=c[h],m=c[h+1];if(f.global&&(f.lastIndex=0),f.test(u))return m}return null},this.abort=function(){return this.abortController.abort(),this._abortController=null,this}}get abortController(){return this._abortController||(this._abortController=new AbortController),this._abortController}},Vp=new tc,nc=class{constructor(e){this.manager=e!==void 0?e:Vp,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}load(){}loadAsync(e,t){let i=this;return new Promise(function(s,r){i.load(e,s,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};nc.DEFAULT_MATERIAL_NAME="__DEFAULT";var _o=class extends Kt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new rt(e),this.intensity=t}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,t}};var gd=new Mt,$f=new Y,Jf=new Y,ic=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.biasNode=null,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.mapType=Jt,this.map=null,this.mapPass=null,this.matrix=new Mt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new zr,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new yt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getCamera(){return this.camera}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera;$f.setFromMatrixPosition(e.matrixWorld),t.position.copy($f),Jf.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(Jf),t.updateMatrixWorld(),this._updateMatrix(t,this.matrix,this._frustum)}_updateMatrix(e,t,i,s){gd.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),i.setFromProjectionMatrix(gd,e.coordinateSystem,e.reversedDepth);let r=this._frameExtents,a=s?s.z/r.x:1,o=s?s.w/r.y:1,l=s?s.x/r.x:0,c=s?s.y/r.y:0;e.coordinateSystem===Dr||e.reversedDepth?t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,1,0,0,0,0,1):t.set(.5*a,0,0,.5*a+l,0,.5*o,0,.5*o+c,0,0,.5,.5,0,0,0,1),t.multiply(gd)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this.biasNode=e.biasNode,this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return e.intensity=this.intensity,e.bias=this.bias,e.normalBias=this.normalBias,e.radius=this.radius,e.blurSamples=this.blurSamples,e.mapSize=this.mapSize.toArray(),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Tl=new Y,Al=new $n,Mi=new Y,xo=class extends Kt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Mt,this.projectionMatrix=new Mt,this.projectionMatrixInverse=new Mt,this.coordinateSystem=ui,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorld.decompose(Tl,Al,Mi),Mi.x===1&&Mi.y===1&&Mi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tl,Al,Mi.set(1,1,1)).invert()}updateWorldMatrix(e,t,i=!1){super.updateWorldMatrix(e,t,i),this.matrixWorld.decompose(Tl,Al,Mi),Mi.x===1&&Mi.y===1&&Mi.z===1?this.matrixWorldInverse.copy(this.matrixWorld).invert():this.matrixWorldInverse.compose(Tl,Al,Mi.set(1,1,1)).invert()}clone(){return new this.constructor().copy(this)}},fs=new Y,Zf=new nt,Kf=new nt,_n=class extends xo{constructor(e=50,t=1,i=.1,s=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=s,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=Ur*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(Ja*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Ur*2*Math.atan(Math.tan(Ja*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){fs.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(fs.x,fs.y).multiplyScalar(-e/fs.z),fs.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(fs.x,fs.y).multiplyScalar(-e/fs.z)}getViewSize(e,t){return this.getViewBounds(e,Zf,Kf),t.subVectors(Kf,Zf)}setViewOffset(e,t,i,s,r,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(Ja*.5*this.fov)/this.zoom,i=2*t,s=this.aspect*i,r=-.5*s,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;r+=a.offsetX*s/l,t-=a.offsetY*i/c,s*=a.width/l,i*=a.height/c}let o=this.filmOffset;o!==0&&(r+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+s,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var Gr=class extends xo{constructor(e=-1,t=1,i=1,s=-1,r=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=s,this.near=r,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,s,r,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=s,this.view.width=r,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,s=(this.top+this.bottom)/2,r=i-e,a=i+e,o=s+t,l=s-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,a=r+c*this.view.width,o-=u*this.view.offsetY,l=o-u*this.view.height}this.projectionMatrix.makeOrthographic(r,a,o,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Md=class extends ic{constructor(){super(new Gr(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},yo=class extends _o{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Kt.DEFAULT_UP),this.updateMatrix(),this.target=new Kt,this.shadow=new Md}dispose(){super.dispose(),this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}toJSON(e){let t=super.toJSON(e);return t.object.shadow=this.shadow.toJSON(),t.object.target=this.target.uuid,t}},vo=class extends _o{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}};var bo=class extends Wt{constructor(){super(),this.isInstancedBufferGeometry=!0,this.type="InstancedBufferGeometry",this.instanceCount=1/0}copy(e){return super.copy(e),this.instanceCount=e.instanceCount,this}toJSON(){let e=super.toJSON();return e.instanceCount=this.instanceCount,e.isInstancedBufferGeometry=!0,e}};var Ar=-90,Cr=1,sc=class extends Kt{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let s=new _n(Ar,Cr,e,t);s.layers=this.layers,this.add(s);let r=new _n(Ar,Cr,e,t);r.layers=this.layers,this.add(r);let a=new _n(Ar,Cr,e,t);a.layers=this.layers,this.add(a);let o=new _n(Ar,Cr,e,t);o.layers=this.layers,this.add(o);let l=new _n(Ar,Cr,e,t);l.layers=this.layers,this.add(l);let c=new _n(Ar,Cr,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,s,r,a,o,l]=t;for(let c of t)this.remove(c);if(e===ui)i.up.set(0,1,0),i.lookAt(1,0,0),s.up.set(0,1,0),s.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Dr)i.up.set(0,-1,0),i.lookAt(-1,0,0),s.up.set(0,-1,0),s.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:s}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[r,a,o,l,c,u]=this.children,h=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),m=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1;let p=!1;e.isWebGLRenderer===!0?p=e.state.buffers.depth.getReversed():p=e.reversedDepthBuffer,e.setRenderTarget(i,0,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,r),e.setRenderTarget(i,1,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,a),e.setRenderTarget(i,2,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,o),e.setRenderTarget(i,3,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,l),e.setRenderTarget(i,4,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,s),p&&e.autoClear===!1&&e.clearDepth(),e.render(t,u),e.setRenderTarget(h,d,f),e.xr.enabled=m,i.texture.needsPMREMUpdate=!0}},rc=class extends _n{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var Jd="\\[\\]\\.:\\/",U0=new RegExp("["+Jd+"]","g"),Zd="[^"+Jd+"]",F0="[^"+Jd.replace("\\.","")+"]",O0=/((?:WC+[\/:])*)/.source.replace("WC",Zd),k0=/(WCOD+)?/.source.replace("WCOD",F0),B0=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Zd),z0=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Zd),V0=new RegExp("^"+O0+k0+B0+z0+"$"),H0=["material","materials","bones","map"],wd=class{constructor(e,t,i){let s=i||Ft.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,s)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,s=this._bindings[i];s!==void 0&&s.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let s=this._targetGroup.nCachedObjects_,r=i.length;s!==r;++s)i[s].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},Ft=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(U0,"")}static parseTrackName(e){let t=V0.exec(e);if(t===null)throw new Error("THREE.PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},s=i.nodeName&&i.nodeName.lastIndexOf(".");if(s!==void 0&&s!==-1){let r=i.nodeName.substring(s+1);H0.indexOf(r)!==-1&&(i.nodeName=i.nodeName.substring(0,s),i.objectName=r)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("THREE.PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(r){for(let a=0;a<r.length;a++){let o=r[a];if(o.name===t||o.uuid===t)return o;let l=i(o.children);if(l)return l}return null},s=i(e.children);if(s)return s}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)e[t++]=i[s]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let s=0,r=i.length;s!==r;++s)i[s]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,s=t.propertyName,r=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){ot("PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){lt("PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){lt("PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){lt("PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){lt("PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){lt("PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){lt("PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let a=e[s];if(a===void 0){let c=t.nodeName;lt("PropertyBinding: Trying to update property for track: "+c+"."+s+" but it wasn't found.",e);return}let o=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?o=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(s==="morphTargetInfluences"){if(!e.geometry){lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){lt("PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=r}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=s;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};Ft.Composite=wd;Ft.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};Ft.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};Ft.prototype.GetterByBindingType=[Ft.prototype._getValue_direct,Ft.prototype._getValue_array,Ft.prototype._getValue_arrayElement,Ft.prototype._getValue_toArray];Ft.prototype.SetterByBindingTypeAndVersioning=[[Ft.prototype._setValue_direct,Ft.prototype._setValue_direct_setNeedsUpdate,Ft.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_array,Ft.prototype._setValue_array_setNeedsUpdate,Ft.prototype._setValue_array_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_arrayElement,Ft.prototype._setValue_arrayElement_setNeedsUpdate,Ft.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[Ft.prototype._setValue_fromArray,Ft.prototype._setValue_fromArray_setNeedsUpdate,Ft.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var M1=new Float32Array(1);var Ai=class extends ao{constructor(e,t,i=1){super(e,t),this.isInstancedInterleavedBuffer=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}clone(e){let t=super.clone(e);return t.meshPerAttribute=this.meshPerAttribute,t}toJSON(e){let t=super.toJSON(e);return t.isInstancedInterleavedBuffer=!0,t.meshPerAttribute=this.meshPerAttribute,t}};var Ed=class n{static{n.prototype.isMatrix2=!0}constructor(e,t,i,s){this.elements=[1,0,0,1],e!==void 0&&this.set(e,t,i,s)}identity(){return this.set(1,0,0,1),this}fromArray(e,t=0){for(let i=0;i<4;i++)this.elements[i]=e[i+t];return this}set(e,t,i,s){let r=this.elements;return r[0]=e,r[2]=t,r[1]=i,r[3]=s,this}},Qf=new nt,Wr=class{constructor(e=new nt(1/0,1/0),t=new nt(-1/0,-1/0)){this.isBox2=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Qf.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=1/0,this.max.x=this.max.y=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y}getCenter(e){return this.isEmpty()?e.set(0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Qf).distanceTo(e)}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},ep=new Y,Cl=new Y,Rr=new Y,Pr=new Y,_d=new Y,G0=new Y,W0=new Y,So=class{constructor(e=new Y,t=new Y){this.start=e,this.end=t}set(e,t){return this.start.copy(e),this.end.copy(t),this}copy(e){return this.start.copy(e.start),this.end.copy(e.end),this}getCenter(e){return e.addVectors(this.start,this.end).multiplyScalar(.5)}delta(e){return e.subVectors(this.end,this.start)}distanceSq(){return this.start.distanceToSquared(this.end)}distance(){return this.start.distanceTo(this.end)}at(e,t){return this.delta(t).multiplyScalar(e).add(this.start)}closestPointToPointParameter(e,t){ep.subVectors(e,this.start),Cl.subVectors(this.end,this.start);let i=Cl.dot(Cl);if(i===0)return 0;let r=Cl.dot(ep)/i;return t&&(r=ft(r,0,1)),r}closestPointToPoint(e,t,i){let s=this.closestPointToPointParameter(e,t);return this.delta(i).multiplyScalar(s).add(this.start)}distanceSqToLine3(e,t=G0,i=W0){let s=10000000000000001e-32,r,a,o=this.start,l=e.start,c=this.end,u=e.end;Rr.subVectors(c,o),Pr.subVectors(u,l),_d.subVectors(o,l);let h=Rr.dot(Rr),d=Pr.dot(Pr),f=Pr.dot(_d);if(h<=s&&d<=s)return t.copy(o),i.copy(l),t.sub(i),t.dot(t);if(h<=s)r=0,a=f/d,a=ft(a,0,1);else{let m=Rr.dot(_d);if(d<=s)a=0,r=ft(-m/h,0,1);else{let x=Rr.dot(Pr),p=h*d-x*x;p!==0?r=ft((x*f-m*d)/p,0,1):r=0,a=(x*r+f)/d,a<0?(a=0,r=ft(-m/h,0,1)):a>1&&(a=1,r=ft((x-m)/h,0,1))}}return t.copy(o).addScaledVector(Rr,r),i.copy(l).addScaledVector(Pr,a),t.distanceToSquared(i)}applyMatrix4(e){return this.start.applyMatrix4(e),this.end.applyMatrix4(e),this}equals(e){return e.start.equals(this.start)&&e.end.equals(this.end)}clone(){return new this.constructor().copy(this)}};function Kd(n,e,t,i){let s=j0(i);switch(t){case Gd:return n*e;case $s:return n*e/s.components*s.byteLength;case fc:return n*e/s.components*s.byteLength;case ws:return n*e*2/s.components*s.byteLength;case pc:return n*e*2/s.components*s.byteLength;case Wd:return n*e*3/s.components*s.byteLength;case rn:return n*e*4/s.components*s.byteLength;case mc:return n*e*4/s.components*s.byteLength;case To:case Ao:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Co:case Ro:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case _c:case yc:return Math.max(n,16)*Math.max(e,8)/4;case gc:case xc:return Math.max(n,8)*Math.max(e,8)/2;case vc:case bc:case Mc:case wc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Sc:case Po:case Ec:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Tc:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Ac:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case Cc:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case Rc:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case Pc:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case Lc:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case Ic:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case Dc:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case Nc:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case Uc:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case Fc:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case Oc:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case kc:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case Bc:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case zc:case Vc:case Hc:return Math.ceil(n/4)*Math.ceil(e/4)*16;case Gc:case Wc:return Math.ceil(n/4)*Math.ceil(e/4)*8;case Lo:case jc:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function j0(n){switch(n){case Jt:case Bd:return{byteLength:1,components:1};case qr:case zd:case gi:return{byteLength:2,components:1};case dc:case hc:return{byteLength:2,components:4};case pi:case uc:case mi:return{byteLength:4,components:1};case Vd:case Hd:return{byteLength:4,components:3}}throw new Error(`THREE.TextureUtils: Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"186"}}));typeof window<"u"&&(window.__THREE__?ot("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="186");function cm(){let n=null,e=!1,t=null,i=null;function s(r,a){i=n.requestAnimationFrame(s),t(r,a)}return{start:function(){e!==!0&&t!==null&&n!==null&&(i=n.requestAnimationFrame(s),e=!0)},stop:function(){n!==null&&n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){n=r}}}function q0(n){let e=new WeakMap;function t(o,l){let c=o.array,u=o.usage,h=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,u),o.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)o.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:o.version,size:h}}function i(o,l,c){let u=l.array,h=l.updateRanges;if(n.bindBuffer(c,o),h.length===0)n.bufferSubData(c,0,u);else{h.sort((f,m)=>f.start-m.start);let d=0;for(let f=1;f<h.length;f++){let m=h[d],x=h[f];x.start<=m.start+m.count+1?m.count=Math.max(m.count,x.start+x.count-m.start):(++d,h[d]=x)}h.length=d+1;for(let f=0,m=h.length;f<m;f++){let x=h[f];n.bufferSubData(c,x.start*u.BYTES_PER_ELEMENT,u,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function s(o){return o.isInterleavedBufferAttribute&&(o=o.data),e.get(o)}function r(o){o.isInterleavedBufferAttribute&&(o=o.data);let l=e.get(o);l&&(n.deleteBuffer(l.buffer),e.delete(o))}function a(o,l){if(o.isInterleavedBufferAttribute&&(o=o.data),o.isGLBufferAttribute){let u=e.get(o);(!u||u.version<o.version)&&e.set(o,{buffer:o.buffer,type:o.type,bytesPerElement:o.elementSize,version:o.version});return}let c=e.get(o);if(c===void 0)e.set(o,t(o,l));else if(c.version<o.version){if(c.size!==o.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,o,l),c.version=o.version}}return{get:s,remove:r,update:a}}var Y0=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,$0=`#ifdef USE_ALPHAHASH
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
#endif`,J0=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Z0=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,K0=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,Q0=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,e_=`#ifdef USE_AOMAP
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
#endif`,t_=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,n_=`#ifdef USE_BATCHING
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
#endif`,i_=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,s_=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,r_=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,a_=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,o_=`#ifdef USE_IRIDESCENCE
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
#endif`,l_=`#ifdef USE_BUMPMAP
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
#endif`,c_=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,u_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,d_=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,h_=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,f_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#endif`,p_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#endif`,m_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec4 vColor;
#endif`,g_=`#if defined( USE_COLOR ) || defined( USE_COLOR_ALPHA ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
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
#endif`,__=`#define PI 3.141592653589793
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
} // validated`,x_=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,y_=`vec3 transformedNormal = objectNormal;
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
#endif`,v_=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,b_=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,S_=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,M_=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,w_="gl_FragColor = linearToOutputTexel( gl_FragColor );",E_=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,T_=`#ifdef USE_ENVMAP
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
#endif`,A_=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
#endif`,C_=`#ifdef USE_ENVMAP
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
#endif`,R_=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,P_=`#ifdef USE_ENVMAP
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
#endif`,L_=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,I_=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,D_=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,N_=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,U_=`#ifdef USE_GRADIENTMAP
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
}`,F_=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,O_=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,k_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,B_=`uniform bool receiveShadow;
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
#include <lightprobes_pars_fragment>`,z_=`#ifdef USE_ENVMAP
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
#endif`,V_=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,H_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,G_=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,W_=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,j_=`PhysicalMaterial material;
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
#endif`,X_=`uniform sampler2D dfgLUT;
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
}`,q_=`
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
#endif`,Y_=`#if defined( RE_IndirectDiffuse )
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
#endif`,$_=`#if defined( RE_IndirectDiffuse )
	#if defined( LAMBERT ) || defined( PHONG )
		irradiance += iblIrradiance;
	#endif
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,J_=`#ifdef USE_LIGHT_PROBES_GRID
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
#endif`,Z_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,K_=`#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,Q_=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ex=`#ifdef USE_LOGARITHMIC_DEPTH_BUFFER
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,tx=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nx=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,ix=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sx=`#if defined( USE_POINTS_UV )
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
#endif`,rx=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,ax=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ox=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,lx=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cx=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ux=`#ifdef USE_MORPHTARGETS
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
#endif`,dx=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,hx=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,fx=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,px=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mx=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,gx=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
		#ifdef FLIP_SIDED
			vBitangent = - vBitangent;
		#endif
	#endif
#endif`,_x=`#ifdef USE_NORMALMAP
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
#endif`,xx=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,yx=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,vx=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,bx=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Sx=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Mx=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wx=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ex=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Tx=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Ax=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Cx=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Rx=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Px=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lx=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Ix=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_SUN_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Dx=`float getShadowMask() {
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
}`,Nx=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Ux=`#ifdef USE_SKINNING
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
#endif`,Fx=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Ox=`#ifdef USE_SKINNING
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
#endif`,kx=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Bx=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,zx=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Vx=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hx=`#ifdef USE_TRANSMISSION
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
#endif`,Gx=`#ifdef USE_TRANSMISSION
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
#endif`,Wx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,jx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xx=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qx=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,Yx=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,$x=`uniform sampler2D t2D;
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
}`,Jx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zx=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Kx=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qx=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ey=`#include <common>
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
}`,ty=`#if DEPTH_PACKING == 3200
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
}`,ny=`#define DISTANCE
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
}`,iy=`#define DISTANCE
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
}`,sy=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,ry=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,ay=`uniform float scale;
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
}`,oy=`uniform vec3 diffuse;
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
}`,ly=`#include <common>
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
}`,cy=`uniform vec3 diffuse;
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
}`,uy=`#define LAMBERT
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
}`,dy=`#define LAMBERT
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
}`,hy=`#define MATCAP
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
}`,fy=`#define MATCAP
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
}`,py=`#define NORMAL
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
}`,my=`#define NORMAL
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
}`,gy=`#define PHONG
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
}`,_y=`#define PHONG
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
}`,xy=`#define STANDARD
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
}`,yy=`#define STANDARD
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
}`,vy=`#define TOON
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
}`,by=`#define TOON
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
}`,Sy=`uniform float size;
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
}`,My=`uniform vec3 diffuse;
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
}`,wy=`#include <common>
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
}`,Ey=`uniform vec3 color;
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
}`,Ty=`uniform float rotation;
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
}`,Ay=`uniform vec3 diffuse;
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
}`,gt={alphahash_fragment:Y0,alphahash_pars_fragment:$0,alphamap_fragment:J0,alphamap_pars_fragment:Z0,alphatest_fragment:K0,alphatest_pars_fragment:Q0,aomap_fragment:e_,aomap_pars_fragment:t_,batching_pars_vertex:n_,batching_vertex:i_,begin_vertex:s_,beginnormal_vertex:r_,bsdfs:a_,iridescence_fragment:o_,bumpmap_pars_fragment:l_,clipping_planes_fragment:c_,clipping_planes_pars_fragment:u_,clipping_planes_pars_vertex:d_,clipping_planes_vertex:h_,color_fragment:f_,color_pars_fragment:p_,color_pars_vertex:m_,color_vertex:g_,common:__,cube_uv_reflection_fragment:x_,defaultnormal_vertex:y_,displacementmap_pars_vertex:v_,displacementmap_vertex:b_,emissivemap_fragment:S_,emissivemap_pars_fragment:M_,colorspace_fragment:w_,colorspace_pars_fragment:E_,envmap_fragment:T_,envmap_common_pars_fragment:A_,envmap_pars_fragment:C_,envmap_pars_vertex:R_,envmap_physical_pars_fragment:z_,envmap_vertex:P_,fog_vertex:L_,fog_pars_vertex:I_,fog_fragment:D_,fog_pars_fragment:N_,gradientmap_pars_fragment:U_,lightmap_pars_fragment:F_,lights_lambert_fragment:O_,lights_lambert_pars_fragment:k_,lights_pars_begin:B_,lights_toon_fragment:V_,lights_toon_pars_fragment:H_,lights_phong_fragment:G_,lights_phong_pars_fragment:W_,lights_physical_fragment:j_,lights_physical_pars_fragment:X_,lights_fragment_begin:q_,lights_fragment_maps:Y_,lights_fragment_end:$_,lightprobes_pars_fragment:J_,logdepthbuf_fragment:Z_,logdepthbuf_pars_fragment:K_,logdepthbuf_pars_vertex:Q_,logdepthbuf_vertex:ex,map_fragment:tx,map_pars_fragment:nx,map_particle_fragment:ix,map_particle_pars_fragment:sx,metalnessmap_fragment:rx,metalnessmap_pars_fragment:ax,morphinstance_vertex:ox,morphcolor_vertex:lx,morphnormal_vertex:cx,morphtarget_pars_vertex:ux,morphtarget_vertex:dx,normal_fragment_begin:hx,normal_fragment_maps:fx,normal_pars_fragment:px,normal_pars_vertex:mx,normal_vertex:gx,normalmap_pars_fragment:_x,clearcoat_normal_fragment_begin:xx,clearcoat_normal_fragment_maps:yx,clearcoat_pars_fragment:vx,iridescence_pars_fragment:bx,opaque_fragment:Sx,packing:Mx,premultiplied_alpha_fragment:wx,project_vertex:Ex,dithering_fragment:Tx,dithering_pars_fragment:Ax,roughnessmap_fragment:Cx,roughnessmap_pars_fragment:Rx,shadowmap_pars_fragment:Px,shadowmap_pars_vertex:Lx,shadowmap_vertex:Ix,shadowmask_pars_fragment:Dx,skinbase_vertex:Nx,skinning_pars_vertex:Ux,skinning_vertex:Fx,skinnormal_vertex:Ox,specularmap_fragment:kx,specularmap_pars_fragment:Bx,tonemapping_fragment:zx,tonemapping_pars_fragment:Vx,transmission_fragment:Hx,transmission_pars_fragment:Gx,uv_pars_fragment:Wx,uv_pars_vertex:jx,uv_vertex:Xx,worldpos_vertex:qx,background_vert:Yx,background_frag:$x,backgroundCube_vert:Jx,backgroundCube_frag:Zx,cube_vert:Kx,cube_frag:Qx,depth_vert:ey,depth_frag:ty,distance_vert:ny,distance_frag:iy,equirect_vert:sy,equirect_frag:ry,linedashed_vert:ay,linedashed_frag:oy,meshbasic_vert:ly,meshbasic_frag:cy,meshlambert_vert:uy,meshlambert_frag:dy,meshmatcap_vert:hy,meshmatcap_frag:fy,meshnormal_vert:py,meshnormal_frag:my,meshphong_vert:gy,meshphong_frag:_y,meshphysical_vert:xy,meshphysical_frag:yy,meshtoon_vert:vy,meshtoon_frag:by,points_vert:Sy,points_frag:My,shadow_vert:wy,shadow_frag:Ey,sprite_vert:Ty,sprite_frag:Ay},ke={common:{diffuse:{value:new rt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new ct}},envmap:{envMap:{value:null},envMapRotation:{value:new ct},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98},dfgLUT:{value:null}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new ct}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new ct}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new ct},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new ct},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new ct},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new ct}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new ct}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new ct}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new rt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},sunLights:{value:[],properties:{direction:{},color:{}}},sunLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},sunShadowMatrix:{value:[]},sunShadowCascade:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null},probesSH:{value:null},probesMin:{value:new Y},probesMax:{value:new Y},probesResolution:{value:new Y}},points:{diffuse:{value:new rt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0},uvTransform:{value:new ct}},sprite:{diffuse:{value:new rt(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new ct},alphaMap:{value:null},alphaMapTransform:{value:new ct},alphaTest:{value:0}}},Mn={basic:{uniforms:yn([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.fog]),vertexShader:gt.meshbasic_vert,fragmentShader:gt.meshbasic_frag},lambert:{uniforms:yn([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new rt(0)},envMapIntensity:{value:1}}]),vertexShader:gt.meshlambert_vert,fragmentShader:gt.meshlambert_frag},phong:{uniforms:yn([ke.common,ke.specularmap,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,ke.lights,{emissive:{value:new rt(0)},specular:{value:new rt(1118481)},shininess:{value:30},envMapIntensity:{value:1}}]),vertexShader:gt.meshphong_vert,fragmentShader:gt.meshphong_frag},standard:{uniforms:yn([ke.common,ke.envmap,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.roughnessmap,ke.metalnessmap,ke.fog,ke.lights,{emissive:{value:new rt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:gt.meshphysical_vert,fragmentShader:gt.meshphysical_frag},toon:{uniforms:yn([ke.common,ke.aomap,ke.lightmap,ke.emissivemap,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.gradientmap,ke.fog,ke.lights,{emissive:{value:new rt(0)}}]),vertexShader:gt.meshtoon_vert,fragmentShader:gt.meshtoon_frag},matcap:{uniforms:yn([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,ke.fog,{matcap:{value:null}}]),vertexShader:gt.meshmatcap_vert,fragmentShader:gt.meshmatcap_frag},points:{uniforms:yn([ke.points,ke.fog]),vertexShader:gt.points_vert,fragmentShader:gt.points_frag},dashed:{uniforms:yn([ke.common,ke.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:gt.linedashed_vert,fragmentShader:gt.linedashed_frag},depth:{uniforms:yn([ke.common,ke.displacementmap]),vertexShader:gt.depth_vert,fragmentShader:gt.depth_frag},normal:{uniforms:yn([ke.common,ke.bumpmap,ke.normalmap,ke.displacementmap,{opacity:{value:1}}]),vertexShader:gt.meshnormal_vert,fragmentShader:gt.meshnormal_frag},sprite:{uniforms:yn([ke.sprite,ke.fog]),vertexShader:gt.sprite_vert,fragmentShader:gt.sprite_frag},background:{uniforms:{uvTransform:{value:new ct},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:gt.background_vert,fragmentShader:gt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new ct}},vertexShader:gt.backgroundCube_vert,fragmentShader:gt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:gt.cube_vert,fragmentShader:gt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:gt.equirect_vert,fragmentShader:gt.equirect_frag},distance:{uniforms:yn([ke.common,ke.displacementmap,{referencePosition:{value:new Y},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:gt.distance_vert,fragmentShader:gt.distance_frag},shadow:{uniforms:yn([ke.lights,ke.fog,{color:{value:new rt(0)},opacity:{value:1}}]),vertexShader:gt.shadow_vert,fragmentShader:gt.shadow_frag}};Mn.physical={uniforms:yn([Mn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new ct},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new ct},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new ct},dispersion:{value:0},retroreflectivity:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new ct},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new ct},sheen:{value:0},sheenColor:{value:new rt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new ct},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new ct},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new ct},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new ct},attenuationDistance:{value:0},attenuationColor:{value:new rt(0)},specularColor:{value:new rt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new ct},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new ct},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new ct}}]),vertexShader:gt.meshphysical_vert,fragmentShader:gt.meshphysical_frag};var $c={r:0,b:0,g:0},Cy=new Mt,um=new ct;um.set(-1,0,0,0,1,0,0,0,1);function Ry(n,e,t,i,s,r){let a=new rt(0),o=s===!0?0:1,l,c,u=null,h=0,d=null;function f(A){let R=A.isScene===!0?A.background:null;if(R&&R.isTexture){let v=A.backgroundBlurriness>0;R=e.get(R,v)}return R}function m(A){let R=!1,v=f(A);v===null?p(a,o):v&&v.isColor&&(p(v,1),R=!0);let w=n.xr.getEnvironmentBlendMode();w==="additive"?t.buffers.color.setClear(0,0,0,1,r):w==="alpha-blend"&&t.buffers.color.setClear(0,0,0,0,r),(n.autoClear||R)&&(t.buffers.depth.setTest(!0),t.buffers.depth.setMask(!0),t.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function x(A,R){let v=f(R);v&&(v.isCubeTexture||v.mapping===wo)?(c===void 0&&(c=new Vt(new Hr(1,1,1),new Nt({name:"BackgroundCubeMaterial",uniforms:Js(Mn.backgroundCube.uniforms),vertexShader:Mn.backgroundCube.vertexShader,fragmentShader:Mn.backgroundCube.fragmentShader,side:cn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(w,M,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),c.material.uniforms.envMap.value=v,c.material.uniforms.backgroundBlurriness.value=R.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(Cy.makeRotationFromEuler(R.backgroundRotation)).transpose(),v.isCubeTexture&&v.isRenderTargetTexture===!1&&c.material.uniforms.backgroundRotation.value.premultiply(um),c.material.toneMapped=bt.getTransfer(v.colorSpace)!==At,(u!==v||h!==v.version||d!==n.toneMapping)&&(c.material.needsUpdate=!0,u=v,h=v.version,d=n.toneMapping),c.layers.enableAll(),A.unshift(c,c.geometry,c.material,0,0,null)):v&&v.isTexture&&(l===void 0&&(l=new Vt(new ho(2,2),new Nt({name:"BackgroundMaterial",uniforms:Js(Mn.background.uniforms),vertexShader:Mn.background.vertexShader,fragmentShader:Mn.background.fragmentShader,side:bs,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=v,l.material.uniforms.backgroundIntensity.value=R.backgroundIntensity,l.material.toneMapped=bt.getTransfer(v.colorSpace)!==At,v.matrixAutoUpdate===!0&&v.updateMatrix(),l.material.uniforms.uvTransform.value.copy(v.matrix),(u!==v||h!==v.version||d!==n.toneMapping)&&(l.material.needsUpdate=!0,u=v,h=v.version,d=n.toneMapping),l.layers.enableAll(),A.unshift(l,l.geometry,l.material,0,0,null))}function p(A,R){A.getRGB($c,$d(n)),t.buffers.color.setClear($c.r,$c.g,$c.b,R,r)}function g(){c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0),l!==void 0&&(l.geometry.dispose(),l.material.dispose(),l=void 0)}return{getClearColor:function(){return a},setClearColor:function(A,R=1){a.set(A),o=R,p(a,o)},getClearAlpha:function(){return o},setClearAlpha:function(A){o=A,p(a,o)},render:m,addToRenderList:x,dispose:g}}function Py(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},s=d(null),r=s,a=!1;function o(k,U,z,F,q){let K=!1,ne=h(k,F,z,U);r!==ne&&(r=ne,c(r.object)),K=f(k,F,z,q),K&&m(k,F,z,q),q!==null&&e.update(q,n.ELEMENT_ARRAY_BUFFER),(K||a)&&(a=!1,v(k,U,z,F),q!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(q).buffer))}function l(){return n.createVertexArray()}function c(k){return n.bindVertexArray(k)}function u(k){return n.deleteVertexArray(k)}function h(k,U,z,F){let q=F.wireframe===!0,K=i[U.id];K===void 0&&(K={},i[U.id]=K);let ne=k.isInstancedMesh===!0?k.id:0,oe=K[ne];oe===void 0&&(oe={},K[ne]=oe);let j=oe[z.id];j===void 0&&(j={},oe[z.id]=j);let le=j[q];return le===void 0&&(le=d(l()),j[q]=le),le}function d(k){let U=[],z=[],F=[];for(let q=0;q<t;q++)U[q]=0,z[q]=0,F[q]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:U,enabledAttributes:z,attributeDivisors:F,object:k,attributes:{},index:null}}function f(k,U,z,F){let q=r.attributes,K=U.attributes,ne=0,oe=z.getAttributes();for(let j in oe)if(oe[j].location>=0){let ce=q[j],re=K[j];if(re===void 0&&(j==="instanceMatrix"&&k.instanceMatrix&&(re=k.instanceMatrix),j==="instanceColor"&&k.instanceColor&&(re=k.instanceColor)),ce===void 0||ce.attribute!==re||re&&ce.data!==re.data)return!0;ne++}return r.attributesNum!==ne||r.index!==F}function m(k,U,z,F){let q={},K=U.attributes,ne=0,oe=z.getAttributes();for(let j in oe)if(oe[j].location>=0){let ce=K[j];ce===void 0&&(j==="instanceMatrix"&&k.instanceMatrix&&(ce=k.instanceMatrix),j==="instanceColor"&&k.instanceColor&&(ce=k.instanceColor));let re={};re.attribute=ce,ce&&ce.data&&(re.data=ce.data),q[j]=re,ne++}r.attributes=q,r.attributesNum=ne,r.index=F}function x(){let k=r.newAttributes;for(let U=0,z=k.length;U<z;U++)k[U]=0}function p(k){g(k,0)}function g(k,U){let z=r.newAttributes,F=r.enabledAttributes,q=r.attributeDivisors;z[k]=1,F[k]===0&&(n.enableVertexAttribArray(k),F[k]=1),q[k]!==U&&(n.vertexAttribDivisor(k,U),q[k]=U)}function A(){let k=r.newAttributes,U=r.enabledAttributes;for(let z=0,F=U.length;z<F;z++)U[z]!==k[z]&&(n.disableVertexAttribArray(z),U[z]=0)}function R(k,U,z,F,q,K,ne){ne===!0?n.vertexAttribIPointer(k,U,z,q,K):n.vertexAttribPointer(k,U,z,F,q,K)}function v(k,U,z,F){x();let q=F.attributes,K=z.getAttributes(),ne=U.defaultAttributeValues;for(let oe in K){let j=K[oe];if(j.location>=0){let le=q[oe];if(le===void 0&&(oe==="instanceMatrix"&&k.instanceMatrix&&(le=k.instanceMatrix),oe==="instanceColor"&&k.instanceColor&&(le=k.instanceColor)),le!==void 0){let ce=le.normalized,re=le.itemSize,xe=e.get(le);if(xe===void 0)continue;let Xe=xe.buffer,Ne=xe.type,qe=xe.bytesPerElement,H=Ne===n.INT||Ne===n.UNSIGNED_INT||le.gpuType===uc;if(le.isInterleavedBufferAttribute){let W=le.data,_e=W.stride,ve=le.offset;if(W.isInstancedInterleavedBuffer){for(let ge=0;ge<j.locationSize;ge++)g(j.location+ge,W.meshPerAttribute);k.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let ge=0;ge<j.locationSize;ge++)p(j.location+ge);n.bindBuffer(n.ARRAY_BUFFER,Xe);for(let ge=0;ge<j.locationSize;ge++)R(j.location+ge,re/j.locationSize,Ne,ce,_e*qe,(ve+re/j.locationSize*ge)*qe,H)}else{if(le.isInstancedBufferAttribute){for(let W=0;W<j.locationSize;W++)g(j.location+W,le.meshPerAttribute);k.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=le.meshPerAttribute*le.count)}else for(let W=0;W<j.locationSize;W++)p(j.location+W);n.bindBuffer(n.ARRAY_BUFFER,Xe);for(let W=0;W<j.locationSize;W++)R(j.location+W,re/j.locationSize,Ne,ce,re*qe,re/j.locationSize*W*qe,H)}}else if(ne!==void 0){let ce=ne[oe];if(ce!==void 0)switch(ce.length){case 2:n.vertexAttrib2fv(j.location,ce);break;case 3:n.vertexAttrib3fv(j.location,ce);break;case 4:n.vertexAttrib4fv(j.location,ce);break;default:n.vertexAttrib1fv(j.location,ce)}}}}A()}function w(){T();for(let k in i){let U=i[k];for(let z in U){let F=U[z];for(let q in F){let K=F[q];for(let ne in K)u(K[ne].object),delete K[ne];delete F[q]}}delete i[k]}}function M(k){if(i[k.id]===void 0)return;let U=i[k.id];for(let z in U){let F=U[z];for(let q in F){let K=F[q];for(let ne in K)u(K[ne].object),delete K[ne];delete F[q]}}delete i[k.id]}function E(k){for(let U in i){let z=i[U];for(let F in z){let q=z[F];if(q[k.id]===void 0)continue;let K=q[k.id];for(let ne in K)u(K[ne].object),delete K[ne];delete q[k.id]}}}function y(k){for(let U in i){let z=i[U],F=k.isInstancedMesh===!0?k.id:0,q=z[F];if(q!==void 0){for(let K in q){let ne=q[K];for(let oe in ne)u(ne[oe].object),delete ne[oe];delete q[K]}delete z[F],Object.keys(z).length===0&&delete i[U]}}}function T(){P(),a=!0,r!==s&&(r=s,c(r.object))}function P(){s.geometry=null,s.program=null,s.wireframe=!1}return{setup:o,reset:T,resetDefaultState:P,dispose:w,releaseStatesOfGeometry:M,releaseStatesOfObject:y,releaseStatesOfProgram:E,initAttributes:x,enableAttribute:p,disableUnusedAttributes:A}}function Ly(n,e,t){let i;function s(l){i=l}function r(l,c){n.drawArrays(i,l,c),t.update(c,i,1)}function a(l,c,u){u!==0&&(n.drawArraysInstanced(i,l,c,u),t.update(c,i,u))}function o(l,c,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,l,0,c,0,u);let d=0;for(let f=0;f<u;f++)d+=c[f];t.update(d,i,1)}this.setMode=s,this.render=r,this.renderInstances=a,this.renderMultiDraw=o}function Iy(n,e,t,i){let s;function r(){if(s!==void 0)return s;if(e.has("EXT_texture_filter_anisotropic")===!0){let E=e.get("EXT_texture_filter_anisotropic");s=n.getParameter(E.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else s=0;return s}function a(E){return!(E!==rn&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function o(E){let y=E===gi&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(E!==Jt&&E!==mi&&!y&&i.convert(E)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE))}function l(E){if(E==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";E="mediump"}return E==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",u=l(c);u!==c&&(ot("WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);let h=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control");t.reversedDepthBuffer===!0&&d===!1&&ot("WebGLRenderer: Unable to use reversed depth buffer due to missing EXT_clip_control extension. Fallback to default depth buffer.");let f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),m=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),p=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),g=n.getParameter(n.MAX_VERTEX_ATTRIBS),A=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),R=n.getParameter(n.MAX_VARYING_VECTORS),v=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),w=n.getParameter(n.MAX_SAMPLES),M=n.getParameter(n.SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:a,textureTypeReadable:o,precision:c,logarithmicDepthBuffer:h,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:m,maxTextureSize:x,maxCubemapSize:p,maxAttributes:g,maxVertexUniforms:A,maxVaryings:R,maxFragmentUniforms:v,maxSamples:w,samples:M}}function Dy(n){let e=this,t=null,i=0,s=!1,r=!1,a=new li,o=new ct,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,d){let f=h.length!==0||d||i!==0||s;return s=d,i=h.length,f},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(h,d){t=u(h,d,0)},this.setState=function(h,d,f){let m=h.clippingPlanes,x=h.clipIntersection,p=h.clipShadows,g=n.get(h);if(!s||m===null||m.length===0||r&&!p)r?u(null):c();else{let A=r?0:i,R=A*4,v=g.clippingState||null;l.value=v,v=u(m,d,R,f);for(let w=0;w!==R;++w)v[w]=t[w];g.clippingState=v,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function u(h,d,f,m){let x=h!==null?h.length:0,p=null;if(x!==0){if(p=l.value,m!==!0||p===null){let g=f+x*4,A=d.matrixWorldInverse;o.getNormalMatrix(A),(p===null||p.length<g)&&(p=new Float32Array(g));for(let R=0,v=f;R!==x;++R,v+=4)a.copy(h[R]).applyMatrix4(A,o),a.normal.toArray(p,v),p[v+3]=a.constant}l.value=p,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,p}}var Jr=4,Ny=6,Uy=20,Fy=256,Do=new Gr,Hp=new rt,Qd=null,eh=0,th=0,nh=!1,Oy=new Y,Zs=new Y,Zc=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._sizeLods=[],this._lodMeshes=[],this._backgroundBox=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._blurMaterial=null,this._ggxMaterial=null}fromScene(e,t=0,i=.1,s=100,r={}){let{size:a=256,position:o=Oy}=r;Qd=this._renderer.getRenderTarget(),eh=this._renderer.getActiveCubeFace(),th=this._renderer.getActiveMipmapLevel(),nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(a);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,s,l,o),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=jp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Wp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose(),this._backgroundBox!==null&&(this._backgroundBox.geometry.dispose(),this._backgroundBox.material.dispose())}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._ggxMaterial!==null&&this._ggxMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodMeshes.length;e++)this._lodMeshes[e].geometry.dispose()}_cleanup(e){this._renderer.setRenderTarget(Qd,eh,th),this._renderer.xr.enabled=nh,e.scissorTest=!1,$r(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ss||e.mapping===Ys?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Qd=this._renderer.getRenderTarget(),eh=this._renderer.getActiveCubeFace(),th=this._renderer.getActiveMipmapLevel(),nh=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:It,minFilter:It,generateMipmaps:!1,type:gi,format:rn,colorSpace:Qa,depthBuffer:!1},s=Gp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Gp(e,t,i);let{_lodMax:r}=this;({lodMeshes:this._lodMeshes,sizeLods:this._sizeLods}=ky(r)),this._blurMaterial=zy(r,e,t),this._ggxMaterial=By(r,e,t)}return s}_compileMaterial(e){let t=new Vt(new Wt,e);this._renderer.compile(t,Do)}_sceneToCubeUV(e,t,i,s,r){let l=new _n(90,1,t,i),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,f=h.toneMapping;h.getClearColor(Hp),h.toneMapping=fi,h.autoClear=!1,h.state.buffers.depth.getReversed()&&(h.setRenderTarget(s),h.clearDepth(),h.setRenderTarget(null)),this._backgroundBox===null&&(this._backgroundBox=new Vt(new Hr,new ms({name:"PMREM.Background",side:cn,depthWrite:!1,depthTest:!1})));let x=this._backgroundBox,p=x.material,g=!1,A=e.background;A?A.isColor&&(p.color.copy(A),e.background=null,g=!0):(p.color.copy(Hp),g=!0);for(let R=0;R<6;R++){let v=R%3;v===0?(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[R],r.y,r.z)):v===1?(l.up.set(0,0,c[R]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[R],r.z)):(l.up.set(0,c[R],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[R]));let w=this._cubeSize;$r(s,v*w,R>2?w:0,w,w),h.setRenderTarget(s),g&&h.render(x,l),h.render(e,l)}h.toneMapping=f,h.autoClear=d,e.background=A}_textureToCubeUV(e,t){let i=this._renderer,s=e.mapping===Ss||e.mapping===Ys;s?(this._cubemapMaterial===null&&(this._cubemapMaterial=jp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Wp());let r=s?this._cubemapMaterial:this._equirectMaterial,a=this._lodMeshes[0];a.material=r;let o=r.uniforms;o.envMap.value=e;let l=this._cubeSize;$r(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(a,Do)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let s=this._lodMeshes.length;for(let r=1;r<s;r++)this._applyGGXFilter(e,r-1,r);t.autoClear=i}_applyGGXFilter(e,t,i){let s=this._renderer,r=this._pingPongRenderTarget,a=this._ggxMaterial,o=this._lodMeshes[i];o.material=a;let l=a.uniforms,c=i/(this._lodMeshes.length-1),u=t/(this._lodMeshes.length-1),h=Math.sqrt(c*c-u*u),d=c*1.25,f=h*d,{_lodMax:m}=this,x=this._sizeLods[i],p=3*x*(i>m-Jr?i-m+Jr:0),g=4*(this._cubeSize-x);l.envMap.value=e.texture,l.roughness.value=f,l.mipInt.value=m-t,$r(r,p,g,3*x,2*x),s.setRenderTarget(r),s.render(o,Do),l.envMap.value=r.texture,l.roughness.value=0,l.mipInt.value=m-i,$r(e,p,g,3*x,2*x),s.setRenderTarget(e),s.render(o,Do)}_blur(e,t,i,s){let r=this._pingPongRenderTarget,a=Math.min(s,Math.PI)/Math.SQRT2;this._blurPass(e,r,t,i,a),this._blurPass(r,e,i,i,a)}_blurPass(e,t,i,s,r){let a=this._renderer,o=this._blurMaterial,l=this._lodMeshes[s];l.material=o;let c=o.uniforms;c.envMap.value=e.texture,c.sigma.value=r,c.mipInt.value=this._lodMax-i;let u=this._sizeLods[s],h=3*u*(s>this._lodMax-Jr?s-this._lodMax+Jr:0),d=4*(this._cubeSize-u);$r(t,h,d,3*u,2*u),a.setRenderTarget(t),a.render(l,Do)}};function ky(n){let e=[],t=[],i=n,s=n-Jr+1+Ny;for(let r=0;r<s;r++){let a=Math.pow(2,i);e.push(a);let o=1/(a-2),l=-o,c=1+o,u=[l,l,c,l,c,c,l,l,c,c,l,c],h=6,d=6,f=3,m=new Float32Array(f*d*h),x=new Float32Array(f*d*h);for(let g=0;g<h;g++){let A=g%3*2/3-1,R=g>2?0:-1,v=[A,R,0,A+2/3,R,0,A+2/3,R+1,0,A,R,0,A+2/3,R+1,0,A,R+1,0];m.set(v,f*d*g);for(let w=0;w<d;w++){let M=u[w*2]*2-1,E=u[w*2+1]*2-1;g===0?Zs.set(1,E,M):g===1?Zs.set(-M,1,-E):g===2?Zs.set(-M,E,1):g===3?Zs.set(-1,E,-M):g===4?Zs.set(-M,-1,E):Zs.set(M,E,-1),Zs.toArray(x,(g*d+w)*f)}}let p=new Wt;p.setAttribute("position",new Yt(m,f)),p.setAttribute("outputDirection",new Yt(x,f)),t.push(new Vt(p,null)),i>Jr&&i--}return{lodMeshes:t,sizeLods:e}}function Gp(n,e,t){let i=new Pn(n,e,t);return i.texture.mapping=wo,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function $r(n,e,t,i,s){n.viewport.set(e,t,i,s),n.scissor.set(e,t,i,s)}function By(n,e,t){return new Nt({name:"PMREMGGXConvolution",defines:{GGX_SAMPLES:Fy,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},roughness:{value:0},mipInt:{value:0}},vertexShader:eu(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function zy(n,e,t){return new Nt({name:"SphericalGaussianBlur",defines:{SAMPLES:Uy,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},sigma:{value:0},mipInt:{value:0}},vertexShader:eu(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function Wp(){return new Nt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:eu(),fragmentShader:`

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
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function jp(){return new Nt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:eu(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Ci,depthTest:!1,depthWrite:!1})}function eu(){return`

		precision mediump float;
		precision mediump int;

		attribute vec3 outputDirection;

		varying vec3 vOutputDirection;

		void main() {

			vOutputDirection = outputDirection;
			gl_Position = vec4( position, 1.0 );

		}
	`}var Kc=class extends Pn{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},s=[i,i,i,i,i,i];this.texture=new co(s),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},s=new Hr(5,5,5),r=new Nt({name:"CubemapFromEquirect",uniforms:Js(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:cn,blending:Ci});r.uniforms.tEquirect.value=t;let a=new Vt(s,r),o=t.minFilter;return t.minFilter===On&&(t.minFilter=It),new sc(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t=!0,i=!0,s=!0){let r=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,i,s);e.setRenderTarget(r)}};function Vy(n){let e=new WeakMap,t=new WeakMap,i=null;function s(d,f=!1){return d==null?null:f?a(d):r(d)}function r(d){if(d&&d.isTexture){let f=d.mapping;if(f===oc||f===lc)if(e.has(d)){let m=e.get(d).texture;return o(m,d.mapping)}else{let m=d.image;if(m&&m.height>0){let x=new Kc(m.height);return x.fromEquirectangularTexture(n,d),e.set(d,x),d.addEventListener("dispose",c),o(x.texture,d.mapping)}else return null}}return d}function a(d){if(d&&d.isTexture){let f=d.mapping,m=f===oc||f===lc,x=f===Ss||f===Ys;if(m||x){let p=t.get(d),g=p!==void 0?p.texture.pmremVersion:0;if(d.isRenderTargetTexture&&d.pmremVersion!==g)return i===null&&(i=new Zc(n)),p=m?i.fromEquirectangular(d,p):i.fromCubemap(d,p),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),p.texture;if(p!==void 0)return p.texture;{let A=d.image;return m&&A&&A.height>0||x&&A&&l(A)?(i===null&&(i=new Zc(n)),p=m?i.fromEquirectangular(d):i.fromCubemap(d),p.texture.pmremVersion=d.pmremVersion,t.set(d,p),d.addEventListener("dispose",u),p.texture):null}}}return d}function o(d,f){return f===oc?d.mapping=Ss:f===lc&&(d.mapping=Ys),d}function l(d){let f=0,m=6;for(let x=0;x<m;x++)d[x]!==void 0&&f++;return f===m}function c(d){let f=d.target;f.removeEventListener("dispose",c);let m=e.get(f);m!==void 0&&(e.delete(f),m.dispose())}function u(d){let f=d.target;f.removeEventListener("dispose",u);let m=t.get(f);m!==void 0&&(t.delete(f),m.dispose())}function h(){e=new WeakMap,t=new WeakMap,i!==null&&(i.dispose(),i=null)}return{get:s,dispose:h}}function Hy(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let s=n.getExtension(i);return e[i]=s,s}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let s=t(i);return s===null&&Ws("WebGLRenderer: "+i+" extension not supported."),s}}}function Gy(n,e,t,i){let s={},r=new WeakMap;function a(h){let d=h.target;d.index!==null&&e.remove(d.index);for(let m in d.attributes)e.remove(d.attributes[m]);d.removeEventListener("dispose",a),delete s[d.id];let f=r.get(d);f&&(e.remove(f),r.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function o(h,d){return s[d.id]===!0||(d.addEventListener("dispose",a),s[d.id]=!0,t.memory.geometries++),d}function l(h){let d=h.attributes;for(let f in d)e.update(d[f],n.ARRAY_BUFFER)}function c(h){let d=[],f=h.index,m=h.attributes.position,x=0;if(m===void 0)return;if(f!==null){let A=f.array;x=f.version;for(let R=0,v=A.length;R<v;R+=3){let w=A[R+0],M=A[R+1],E=A[R+2];d.push(w,M,M,E,E,w)}}else{let A=m.array;x=m.version;for(let R=0,v=A.length/3-1;R<v;R+=3){let w=R+0,M=R+1,E=R+2;d.push(w,M,M,E,E,w)}}let p=new(m.count>=65535?ro:so)(d,1);p.version=x;let g=r.get(h);g&&e.remove(g),r.set(h,p)}function u(h){let d=r.get(h);if(d){let f=h.index;f!==null&&d.version<f.version&&c(h)}else c(h);return r.get(h)}return{get:o,update:l,getWireframeAttribute:u}}function Wy(n,e,t){let i;function s(h){i=h}let r,a;function o(h){r=h.type,a=h.bytesPerElement}function l(h,d){n.drawElements(i,d,r,h*a),t.update(d,i,1)}function c(h,d,f){f!==0&&(n.drawElementsInstanced(i,d,r,h*a,f),t.update(d,i,f))}function u(h,d,f){if(f===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,d,0,r,h,0,f);let x=0;for(let p=0;p<f;p++)x+=d[p];t.update(x,i,1)}this.setMode=s,this.setIndex=o,this.render=l,this.renderInstances=c,this.renderMultiDraw=u}function jy(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(r,a,o){switch(t.calls++,a){case n.TRIANGLES:t.triangles+=o*(r/3);break;case n.LINES:t.lines+=o*(r/2);break;case n.LINE_STRIP:t.lines+=o*(r-1);break;case n.LINE_LOOP:t.lines+=o*r;break;case n.POINTS:t.points+=o*r;break;default:lt("WebGLInfo: Unknown draw mode:",a);break}}function s(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:s,update:i}}function Xy(n,e,t){let i=new WeakMap,s=new yt;function r(a,o,l){let c=a.morphTargetInfluences,u=o.morphAttributes.position||o.morphAttributes.normal||o.morphAttributes.color,h=u!==void 0?u.length:0,d=i.get(o);if(d===void 0||d.count!==h){let T=function(){E.dispose(),i.delete(o),o.removeEventListener("dispose",T)};d!==void 0&&d.texture.dispose();let f=o.morphAttributes.position!==void 0,m=o.morphAttributes.normal!==void 0,x=o.morphAttributes.color!==void 0,p=o.morphAttributes.position||[],g=o.morphAttributes.normal||[],A=o.morphAttributes.color||[],R=0;f===!0&&(R=1),m===!0&&(R=2),x===!0&&(R=3);let v=o.attributes.position.count*R,w=1;v>e.maxTextureSize&&(w=Math.ceil(v/e.maxTextureSize),v=e.maxTextureSize);let M=new Float32Array(v*w*4*h),E=new js(M,v,w,h);E.type=mi,E.needsUpdate=!0;let y=R*4;for(let P=0;P<h;P++){let k=p[P],U=g[P],z=A[P],F=v*w*4*P;for(let q=0;q<k.count;q++){let K=q*y;f===!0&&(s.fromBufferAttribute(k,q),M[F+K+0]=s.x,M[F+K+1]=s.y,M[F+K+2]=s.z,M[F+K+3]=0),m===!0&&(s.fromBufferAttribute(U,q),M[F+K+4]=s.x,M[F+K+5]=s.y,M[F+K+6]=s.z,M[F+K+7]=0),x===!0&&(s.fromBufferAttribute(z,q),M[F+K+8]=s.x,M[F+K+9]=s.y,M[F+K+10]=s.z,M[F+K+11]=z.itemSize===4?s.w:1)}}d={count:h,texture:E,size:new nt(v,w)},i.set(o,d),o.addEventListener("dispose",T)}if(a.isInstancedMesh===!0&&a.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",a.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let m=o.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",m),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:r}}function qy(n,e,t,i,s){let r=new WeakMap;function a(c){let u=s.render.frame,h=c.geometry,d=e.get(c,h);if(r.get(d)!==u&&(e.update(d),r.set(d,u)),c.isInstancedMesh&&(c.hasEventListener("dispose",l)===!1&&c.addEventListener("dispose",l),r.get(c)!==u&&(t.update(c.instanceMatrix,n.ARRAY_BUFFER),c.instanceColor!==null&&t.update(c.instanceColor,n.ARRAY_BUFFER),r.set(c,u))),c.isSkinnedMesh){let f=c.skeleton;r.get(f)!==u&&(f.update(),r.set(f,u))}return d}function o(){r=new WeakMap}function l(c){let u=c.target;u.removeEventListener("dispose",l),i.releaseStatesOfObject(u),t.remove(u.instanceMatrix),u.instanceColor!==null&&t.remove(u.instanceColor)}return{update:a,dispose:o}}var Yy={[Ld]:"LINEAR_TONE_MAPPING",[Id]:"REINHARD_TONE_MAPPING",[Dd]:"CINEON_TONE_MAPPING",[Nd]:"ACES_FILMIC_TONE_MAPPING",[Fd]:"AGX_TONE_MAPPING",[Od]:"NEUTRAL_TONE_MAPPING",[Ud]:"CUSTOM_TONE_MAPPING"};function $y(n,e,t,i,s,r){let a=new Pn(e,t,{type:n,depthBuffer:s,stencilBuffer:r,samples:i?4:0,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,resolveDepthBuffer:!1,resolveStencilBuffer:!1}),o=null,l=null,c=new Wt;c.setAttribute("position",new zt([-1,3,0,-1,-1,0,3,-1,0],3)),c.setAttribute("uv",new zt([0,2,0,0,2,0],2));let u=new Wl({uniforms:{tDiffuse:{value:null}},vertexShader:`
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
			}`,depthTest:!1,depthWrite:!1}),h=new Vt(c,u),d=new Gr(-1,1,1,-1,0,1),f=null,m=null,x=!1,p,g=null,A=[],R=!1;this.setSize=function(v,w){a.setSize(v,w),o!==null&&o.setSize(v,w),l!==null&&l.setSize(v,w);for(let M=0;M<A.length;M++){let E=A[M];E.setSize&&E.setSize(v,w)}},this.setEffects=function(v){A=v,R=A.length>0&&A[0].isRenderPass===!0;let w=a.width,M=a.height;A.length>0&&o===null&&(o=new Pn(w,M,{type:gi,depthBuffer:!1,stencilBuffer:!1}),l=new Pn(w,M,{type:gi,depthBuffer:!1,stencilBuffer:!1}));for(let E=0;E<A.length;E++){let y=A[E];y.setSize&&y.setSize(w,M)}},this.begin=function(v,w){if(x||v.toneMapping===fi&&A.length===0)return!1;if(g=w,w!==null){let M=w.width,E=w.height;(a.width!==M||a.height!==E)&&this.setSize(M,E)}return R===!1&&v.setRenderTarget(a),p=v.toneMapping,v.toneMapping=fi,!0},this.hasRenderPass=function(){return R},this.end=function(v,w){v.toneMapping=p,x=!0;let M=a,E=o;for(let y=0;y<A.length;y++){let T=A[y];T.enabled!==!1&&(T.render(v,E,M,w),T.needsSwap!==!1&&(M=E,E=E===o?l:o))}if(f!==v.outputColorSpace||m!==v.toneMapping){f=v.outputColorSpace,m=v.toneMapping,u.defines={},bt.getTransfer(f)===At&&(u.defines.SRGB_TRANSFER="");let y=Yy[m];y&&(u.defines[y]=""),u.needsUpdate=!0}u.uniforms.tDiffuse.value=M.texture,v.setRenderTarget(g),v.render(h,d),g=null,x=!1},this.isCompositing=function(){return x},this.dispose=function(){a.dispose(),o!==null&&o.dispose(),l!==null&&l.dispose(),c.dispose(),u.dispose()}}var dm=new Gt,rh=new _s(1,1),hm=new js,fm=new Hl,pm=new co,Xp=[],qp=[],Yp=new Float32Array(16),$p=new Float32Array(9),Jp=new Float32Array(4);function Kr(n,e,t){let i=n[0];if(i<=0||i>0)return n;let s=e*t,r=Xp[s];if(r===void 0&&(r=new Float32Array(s),Xp[s]=r),e!==0){i.toArray(r,0);for(let a=1,o=0;a!==e;++a)o+=t,n[a].toArray(r,o)}return r}function Qt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function en(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function tu(n,e){let t=qp[e];t===void 0&&(t=new Int32Array(e),qp[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function Jy(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function Zy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;n.uniform2fv(this.addr,e),en(t,e)}}function Ky(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Qt(t,e))return;n.uniform3fv(this.addr,e),en(t,e)}}function Qy(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;n.uniform4fv(this.addr,e),en(t,e)}}function ev(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Qt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),en(t,e)}else{if(Qt(t,i))return;Jp.set(i),n.uniformMatrix2fv(this.addr,!1,Jp),en(t,i)}}function tv(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Qt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),en(t,e)}else{if(Qt(t,i))return;$p.set(i),n.uniformMatrix3fv(this.addr,!1,$p),en(t,i)}}function nv(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Qt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),en(t,e)}else{if(Qt(t,i))return;Yp.set(i),n.uniformMatrix4fv(this.addr,!1,Yp),en(t,i)}}function iv(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function sv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;n.uniform2iv(this.addr,e),en(t,e)}}function rv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Qt(t,e))return;n.uniform3iv(this.addr,e),en(t,e)}}function av(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;n.uniform4iv(this.addr,e),en(t,e)}}function ov(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function lv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Qt(t,e))return;n.uniform2uiv(this.addr,e),en(t,e)}}function cv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Qt(t,e))return;n.uniform3uiv(this.addr,e),en(t,e)}}function uv(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Qt(t,e))return;n.uniform4uiv(this.addr,e),en(t,e)}}function dv(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s);let r;this.type===n.SAMPLER_2D_SHADOW?(rh.compareFunction=t.isReversedDepthBuffer()?Yc:qc,r=rh):r=dm,t.setTexture2D(e||r,s)}function hv(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture3D(e||fm,s)}function fv(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTextureCube(e||pm,s)}function pv(n,e,t){let i=this.cache,s=t.allocateTextureUnit();i[0]!==s&&(n.uniform1i(this.addr,s),i[0]=s),t.setTexture2DArray(e||hm,s)}function mv(n){switch(n){case 5126:return Jy;case 35664:return Zy;case 35665:return Ky;case 35666:return Qy;case 35674:return ev;case 35675:return tv;case 35676:return nv;case 5124:case 35670:return iv;case 35667:case 35671:return sv;case 35668:case 35672:return rv;case 35669:case 35673:return av;case 5125:return ov;case 36294:return lv;case 36295:return cv;case 36296:return uv;case 35678:case 36198:case 36298:case 36306:case 35682:return dv;case 35679:case 36299:case 36307:return hv;case 35680:case 36300:case 36308:case 36293:return fv;case 36289:case 36303:case 36311:case 36292:return pv}}function gv(n,e){n.uniform1fv(this.addr,e)}function _v(n,e){let t=Kr(e,this.size,2);n.uniform2fv(this.addr,t)}function xv(n,e){let t=Kr(e,this.size,3);n.uniform3fv(this.addr,t)}function yv(n,e){let t=Kr(e,this.size,4);n.uniform4fv(this.addr,t)}function vv(n,e){let t=Kr(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function bv(n,e){let t=Kr(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function Sv(n,e){let t=Kr(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function Mv(n,e){n.uniform1iv(this.addr,e)}function wv(n,e){n.uniform2iv(this.addr,e)}function Ev(n,e){n.uniform3iv(this.addr,e)}function Tv(n,e){n.uniform4iv(this.addr,e)}function Av(n,e){n.uniform1uiv(this.addr,e)}function Cv(n,e){n.uniform2uiv(this.addr,e)}function Rv(n,e){n.uniform3uiv(this.addr,e)}function Pv(n,e){n.uniform4uiv(this.addr,e)}function Lv(n,e,t){let i=this.cache,s=e.length,r=tu(t,s);Qt(i,r)||(n.uniform1iv(this.addr,r),en(i,r));let a;this.type===n.SAMPLER_2D_SHADOW?a=rh:a=dm;for(let o=0;o!==s;++o)t.setTexture2D(e[o]||a,r[o])}function Iv(n,e,t){let i=this.cache,s=e.length,r=tu(t,s);Qt(i,r)||(n.uniform1iv(this.addr,r),en(i,r));for(let a=0;a!==s;++a)t.setTexture3D(e[a]||fm,r[a])}function Dv(n,e,t){let i=this.cache,s=e.length,r=tu(t,s);Qt(i,r)||(n.uniform1iv(this.addr,r),en(i,r));for(let a=0;a!==s;++a)t.setTextureCube(e[a]||pm,r[a])}function Nv(n,e,t){let i=this.cache,s=e.length,r=tu(t,s);Qt(i,r)||(n.uniform1iv(this.addr,r),en(i,r));for(let a=0;a!==s;++a)t.setTexture2DArray(e[a]||hm,r[a])}function Uv(n){switch(n){case 5126:return gv;case 35664:return _v;case 35665:return xv;case 35666:return yv;case 35674:return vv;case 35675:return bv;case 35676:return Sv;case 5124:case 35670:return Mv;case 35667:case 35671:return wv;case 35668:case 35672:return Ev;case 35669:case 35673:return Tv;case 5125:return Av;case 36294:return Cv;case 36295:return Rv;case 36296:return Pv;case 35678:case 36198:case 36298:case 36306:case 35682:return Lv;case 35679:case 36299:case 36307:return Iv;case 35680:case 36300:case 36308:case 36293:return Dv;case 36289:case 36303:case 36311:case 36292:return Nv}}var ah=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=mv(t.type)}},oh=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=Uv(t.type)}},lh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let s=this.seq;for(let r=0,a=s.length;r!==a;++r){let o=s[r];o.setValue(e,t[o.id],i)}}},ih=/(\w+)(\])?(\[|\.)?/g;function Zp(n,e){n.seq.push(e),n.map[e.id]=e}function Fv(n,e,t){let i=n.name,s=i.length;for(ih.lastIndex=0;;){let r=ih.exec(i),a=ih.lastIndex,o=r[1],l=r[2]==="]",c=r[3];if(l&&(o=o|0),c===void 0||c==="["&&a+2===s){Zp(t,c===void 0?new ah(o,n,e):new oh(o,n,e));break}else{let h=t.map[o];h===void 0&&(h=new lh(o),Zp(t,h)),t=h}}}var Zr=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let a=0;a<i;++a){let o=e.getActiveUniform(t,a),l=e.getUniformLocation(t,o.name);Fv(o,l,this)}let s=[],r=[];for(let a of this.seq)a.type===e.SAMPLER_2D_SHADOW||a.type===e.SAMPLER_CUBE_SHADOW||a.type===e.SAMPLER_2D_ARRAY_SHADOW?s.push(a):r.push(a);s.length>0&&(this.seq=s.concat(r))}setValue(e,t,i,s){let r=this.map[t];r!==void 0&&r.setValue(e,i,s)}setOptional(e,t,i){let s=t[i];s!==void 0&&this.setValue(e,i,s)}static upload(e,t,i,s){for(let r=0,a=t.length;r!==a;++r){let o=t[r],l=i[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,s)}}static seqWithValue(e,t){let i=[];for(let s=0,r=e.length;s!==r;++s){let a=e[s];a.id in t&&i.push(a)}return i}};function Kp(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var Ov=37297,kv=0;function Bv(n,e){let t=n.split(`
`),i=[],s=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let a=s;a<r;a++){let o=a+1;i.push(`${o===e?">":" "} ${o}: ${t[a]}`)}return i.join(`
`)}var Qp=new ct;function zv(n){bt._getMatrix(Qp,bt.workingColorSpace,n);let e=`mat3( ${Qp.elements.map(t=>t.toFixed(4))} )`;switch(bt.getTransfer(n)){case eo:return[e,"LinearTransferOETF"];case At:return[e,"sRGBTransferOETF"];default:return ot("WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function em(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),r=(n.getShaderInfoLog(e)||"").trim();if(i&&r==="")return"";let a=/ERROR: 0:(\d+)/.exec(r);if(a){let o=parseInt(a[1]);return t.toUpperCase()+`

`+r+`

`+Bv(n.getShaderSource(e),o)}else return r}function Vv(n,e){let t=zv(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}var Hv={[Ld]:"Linear",[Id]:"Reinhard",[Dd]:"Cineon",[Nd]:"ACESFilmic",[Fd]:"AgX",[Od]:"Neutral",[Ud]:"Custom"};function Gv(n,e){let t=Hv[e];return t===void 0?(ot("WebGLProgram: Unsupported toneMapping:",e),"vec3 "+n+"( vec3 color ) { return LinearToneMapping( color ); }"):"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var Jc=new Y;function Wv(){bt.getLuminanceCoefficients(Jc);let n=Jc.x.toFixed(4),e=Jc.y.toFixed(4),t=Jc.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function jv(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Uo).join(`
`)}function Xv(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function qv(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let s=0;s<i;s++){let r=n.getActiveAttrib(e,s),a=r.name,o=1;r.type===n.FLOAT_MAT2&&(o=2),r.type===n.FLOAT_MAT3&&(o=3),r.type===n.FLOAT_MAT4&&(o=4),t[a]={type:r.type,location:n.getAttribLocation(e,a),locationSize:o}}return t}function Uo(n){return n!==""}function tm(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_SUN_LIGHTS/g,e.numSunLights).replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_SUN_LIGHT_SHADOWS/g,e.numSunLightShadows).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function nm(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Yv=/^[ \t]*#include +<([\w\d./]+)>/gm;function ch(n){return n.replace(Yv,Jv)}var $v=new Map;function Jv(n,e){let t=gt[e];if(t===void 0){let i=$v.get(e);if(i!==void 0)t=gt[i],ot('WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("THREE.WebGLProgram: Can not resolve #include <"+e+">")}return ch(t)}var Zv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function im(n){return n.replace(Zv,Kv)}function Kv(n,e,t,i){let s="";for(let r=parseInt(e);r<parseInt(t);r++)s+=i.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return s}function sm(n){let e=`precision ${n.precision} float;
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
#define LOW_PRECISION`),e}var Qv={[Mo]:"SHADOWMAP_TYPE_PCF",[jr]:"SHADOWMAP_TYPE_VSM"};function eb(n){return Qv[n.shadowMapType]||"SHADOWMAP_TYPE_BASIC"}var tb={[Ss]:"ENVMAP_TYPE_CUBE",[Ys]:"ENVMAP_TYPE_CUBE",[wo]:"ENVMAP_TYPE_CUBE_UV"};function nb(n){return n.envMap===!1?"ENVMAP_TYPE_CUBE":tb[n.envMapMode]||"ENVMAP_TYPE_CUBE"}var ib={[Ys]:"ENVMAP_MODE_REFRACTION"};function sb(n){return n.envMap===!1?"ENVMAP_MODE_REFLECTION":ib[n.envMapMode]||"ENVMAP_MODE_REFLECTION"}var rb={[ac]:"ENVMAP_BLENDING_MULTIPLY",[Sp]:"ENVMAP_BLENDING_MIX",[Mp]:"ENVMAP_BLENDING_ADD"};function ab(n){return n.envMap===!1?"ENVMAP_BLENDING_NONE":rb[n.combine]||"ENVMAP_BLENDING_NONE"}function ob(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function lb(n,e,t,i){let s=n.getContext(),r=t.defines,a=t.vertexShader,o=t.fragmentShader,l=eb(t),c=nb(t),u=sb(t),h=ab(t),d=ob(t),f=jv(t),m=Xv(r),x=s.createProgram(),p,g,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Uo).join(`
`),p.length>0&&(p+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m].filter(Uo).join(`
`),g.length>0&&(g+=`
`)):(p=[sm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexNormals?"#define HAS_NORMAL":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Uo).join(`
`),g=[sm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,m,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+h:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.packedNormalMap?"#define USE_PACKED_NORMALMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.retroreflection?"#define USE_RETROREFLECTION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor?"#define USE_COLOR":"",t.vertexAlphas||t.batchingColor?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.numLightProbeGrids>0?"#define USE_LIGHT_PROBES_GRID":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==fi?"#define TONE_MAPPING":"",t.toneMapping!==fi?gt.tonemapping_pars_fragment:"",t.toneMapping!==fi?Gv("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",gt.colorspace_pars_fragment,Vv("linearToOutputTexel",t.outputColorSpace),Wv(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Uo).join(`
`)),a=ch(a),a=tm(a,t),a=nm(a,t),o=ch(o),o=tm(o,t),o=nm(o,t),a=im(a),o=im(o),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,p=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,g=["#define varying in",t.glslVersion===Xd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Xd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let R=A+p+a,v=A+g+o,w=Kp(s,s.VERTEX_SHADER,R),M=Kp(s,s.FRAGMENT_SHADER,v);s.attachShader(x,w),s.attachShader(x,M),t.index0AttributeName!==void 0?s.bindAttribLocation(x,0,t.index0AttributeName):t.hasPositionAttribute===!0&&s.bindAttribLocation(x,0,"position"),s.linkProgram(x);function E(k){if(n.debug.checkShaderErrors){let U=s.getProgramInfoLog(x)||"",z=s.getShaderInfoLog(w)||"",F=s.getShaderInfoLog(M)||"",q=U.trim(),K=z.trim(),ne=F.trim(),oe=!0,j=!0;if(s.getProgramParameter(x,s.LINK_STATUS)===!1)if(oe=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(s,x,w,M);else{let le=em(s,w,"vertex"),ce=em(s,M,"fragment");lt("WebGLProgram: Shader Error "+s.getError()+" - VALIDATE_STATUS "+s.getProgramParameter(x,s.VALIDATE_STATUS)+`

Material Name: `+k.name+`
Material Type: `+k.type+`

Program Info Log: `+q+`
`+le+`
`+ce)}else q!==""?ot("WebGLProgram: Program Info Log:",q):(K===""||ne==="")&&(j=!1);j&&(k.diagnostics={runnable:oe,programLog:q,vertexShader:{log:K,prefix:p},fragmentShader:{log:ne,prefix:g}})}s.deleteShader(w),s.deleteShader(M),y=new Zr(s,x),T=qv(s,x)}let y;this.getUniforms=function(){return y===void 0&&E(this),y};let T;this.getAttributes=function(){return T===void 0&&E(this),T};let P=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return P===!1&&(P=s.getProgramParameter(x,Ov)),P},this.destroy=function(){i.releaseStatesOfProgram(this),s.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=kv++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=w,this.fragmentShader=M,this}var cb=0,uh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e,t,i){let s=this._getShaderCacheForMaterial(e);return s.has(t)===!1&&(s.add(t),t.usedTimes++),s.has(i)===!1&&(s.add(i),i.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderStage(e){return this._getShaderStage(e.vertexShader)}getFragmentShaderStage(e){return this._getShaderStage(e.fragmentShader)}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new dh(e),t.set(e,i)),i}},dh=class{constructor(e){this.id=cb++,this.code=e,this.usedTimes=0}};function ub(n){return n===ws||n===Po||n===Lo}function db(n,e,t,i,s,r){let a=new io,o=new uh,l=new Set,c=[],u=new Map,h=i.logarithmicDepthBuffer,d=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distance",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function m(y){return l.add(y),y===0?"uv":`uv${y}`}function x(y,T,P,k,U,z){let F=k.fog,q=U.geometry,K=y.isMeshStandardMaterial||y.isMeshLambertMaterial||y.isMeshPhongMaterial?k.environment:null,ne=y.isMeshStandardMaterial||y.isMeshLambertMaterial&&!y.envMap||y.isMeshPhongMaterial&&!y.envMap,oe=e.get(y.envMap||K,ne),j=oe&&oe.mapping===wo?oe.image.height:null,le=f[y.type];y.precision!==null&&(d=i.getMaxPrecision(y.precision),d!==y.precision&&ot("WebGLProgram.getParameters:",y.precision,"not supported, using",d,"instead."));let ce=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,re=ce!==void 0?ce.length:0,xe=0;q.morphAttributes.position!==void 0&&(xe=1),q.morphAttributes.normal!==void 0&&(xe=2),q.morphAttributes.color!==void 0&&(xe=3);let Xe,Ne,qe,H;if(le){let ut=Mn[le];Xe=ut.vertexShader,Ne=ut.fragmentShader}else{Xe=y.vertexShader,Ne=y.fragmentShader;let ut=o.getVertexShaderStage(y),ht=o.getFragmentShaderStage(y);o.update(y,ut,ht),qe=ut.id,H=ht.id}let W=n.getRenderTarget(),_e=n.state.buffers.depth.getReversed(),ve=U.isInstancedMesh===!0,ge=U.isBatchedMesh===!0,Be=!!y.map,Je=!!y.matcap,De=!!oe,We=!!y.aoMap,it=!!y.lightMap,Ke=!!y.bumpMap&&y.wireframe===!1,Ye=!!y.normalMap,he=!!y.displacementMap,we=!!y.emissiveMap,Ue=!!y.metalnessMap,Oe=!!y.roughnessMap,V=y.anisotropy>0,se=y.clearcoat>0,Ae=y.dispersion>0,b=y.retroreflectivity>0,_=y.iridescence>0,L=y.sheen>0,O=y.transmission>0,ee=V&&!!y.anisotropyMap,de=se&&!!y.clearcoatMap,ye=se&&!!y.clearcoatNormalMap,ae=se&&!!y.clearcoatRoughnessMap,fe=_&&!!y.iridescenceMap,Ie=_&&!!y.iridescenceThicknessMap,je=L&&!!y.sheenColorMap,Ce=L&&!!y.sheenRoughnessMap,Le=!!y.specularMap,Qe=!!y.specularColorMap,st=!!y.specularIntensityMap,at=O&&!!y.transmissionMap,X=O&&!!y.thicknessMap,be=!!y.gradientMap,ue=!!y.alphaMap,Te=y.alphaTest>0,Pe=!!y.alphaHash,pe=!!y.extensions,$e=fi;y.toneMapped&&(W===null||W.isXRRenderTarget===!0)&&($e=n.toneMapping);let ze={shaderID:le,shaderType:y.type,shaderName:y.name,vertexShader:Xe,fragmentShader:Ne,defines:y.defines,customVertexShaderID:qe,customFragmentShaderID:H,isRawShaderMaterial:y.isRawShaderMaterial===!0,glslVersion:y.glslVersion,precision:d,batching:ge,batchingColor:ge&&U._colorsTexture!==null,instancing:ve,instancingColor:ve&&U.instanceColor!==null,instancingMorph:ve&&U.morphTexture!==null,outputColorSpace:W===null?n.outputColorSpace:W.isXRRenderTarget===!0?W.texture.colorSpace:bt.workingColorSpace,alphaToCoverage:!!y.alphaToCoverage,map:Be,matcap:Je,envMap:De,envMapMode:De&&oe.mapping,envMapCubeUVHeight:j,aoMap:We,lightMap:it,bumpMap:Ke,normalMap:Ye,displacementMap:he,emissiveMap:we,normalMapObjectSpace:Ye&&y.normalMapType===Tp,normalMapTangentSpace:Ye&&y.normalMapType===Xc,packedNormalMap:Ye&&y.normalMapType===Xc&&ub(y.normalMap.format),metalnessMap:Ue,roughnessMap:Oe,anisotropy:V,anisotropyMap:ee,clearcoat:se,clearcoatMap:de,clearcoatNormalMap:ye,clearcoatRoughnessMap:ae,dispersion:Ae,retroreflection:b,iridescence:_,iridescenceMap:fe,iridescenceThicknessMap:Ie,sheen:L,sheenColorMap:je,sheenRoughnessMap:Ce,specularMap:Le,specularColorMap:Qe,specularIntensityMap:st,transmission:O,transmissionMap:at,thicknessMap:X,gradientMap:be,opaque:y.transparent===!1&&y.blending===Xr&&y.alphaToCoverage===!1,alphaMap:ue,alphaTest:Te,alphaHash:Pe,combine:y.combine,mapUv:Be&&m(y.map.channel),aoMapUv:We&&m(y.aoMap.channel),lightMapUv:it&&m(y.lightMap.channel),bumpMapUv:Ke&&m(y.bumpMap.channel),normalMapUv:Ye&&m(y.normalMap.channel),displacementMapUv:he&&m(y.displacementMap.channel),emissiveMapUv:we&&m(y.emissiveMap.channel),metalnessMapUv:Ue&&m(y.metalnessMap.channel),roughnessMapUv:Oe&&m(y.roughnessMap.channel),anisotropyMapUv:ee&&m(y.anisotropyMap.channel),clearcoatMapUv:de&&m(y.clearcoatMap.channel),clearcoatNormalMapUv:ye&&m(y.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ae&&m(y.clearcoatRoughnessMap.channel),iridescenceMapUv:fe&&m(y.iridescenceMap.channel),iridescenceThicknessMapUv:Ie&&m(y.iridescenceThicknessMap.channel),sheenColorMapUv:je&&m(y.sheenColorMap.channel),sheenRoughnessMapUv:Ce&&m(y.sheenRoughnessMap.channel),specularMapUv:Le&&m(y.specularMap.channel),specularColorMapUv:Qe&&m(y.specularColorMap.channel),specularIntensityMapUv:st&&m(y.specularIntensityMap.channel),transmissionMapUv:at&&m(y.transmissionMap.channel),thicknessMapUv:X&&m(y.thicknessMap.channel),alphaMapUv:ue&&m(y.alphaMap.channel),vertexTangents:!!q.attributes.tangent&&(Ye||V),vertexNormals:!!q.attributes.normal,vertexColors:y.vertexColors,vertexAlphas:y.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,pointsUvs:U.isPoints===!0&&!!q.attributes.uv&&(Be||ue),fog:!!F,useFog:y.fog===!0,fogExp2:!!F&&F.isFogExp2,flatShading:y.wireframe===!1&&(y.flatShading===!0||q.attributes.normal===void 0&&Ye===!1&&(y.isMeshLambertMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isMeshPhysicalMaterial)),sizeAttenuation:y.sizeAttenuation===!0,logarithmicDepthBuffer:h,reversedDepthBuffer:_e,skinning:U.isSkinnedMesh===!0,hasPositionAttribute:q.attributes.position!==void 0,morphTargets:q.morphAttributes.position!==void 0,morphNormals:q.morphAttributes.normal!==void 0,morphColors:q.morphAttributes.color!==void 0,morphTargetsCount:re,morphTextureStride:xe,numSunLights:T.sun.length,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numSunLightShadows:T.sunShadowMap.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numLightProbeGrids:z.length,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:y.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:$e,decodeVideoTexture:Be&&y.map.isVideoTexture===!0&&bt.getTransfer(y.map.colorSpace)===At,decodeVideoTextureEmissive:we&&y.emissiveMap.isVideoTexture===!0&&bt.getTransfer(y.emissiveMap.colorSpace)===At,premultipliedAlpha:y.premultipliedAlpha,doubleSided:y.side===Jn,flipSided:y.side===cn,useDepthPacking:y.depthPacking>=0,depthPacking:y.depthPacking||0,index0AttributeName:y.index0AttributeName,extensionClipCullDistance:pe&&y.extensions.clipCullDistance===!0&&t.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(pe&&y.extensions.multiDraw===!0||ge)&&t.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:t.has("KHR_parallel_shader_compile"),customProgramCacheKey:y.customProgramCacheKey()};return ze.vertexUv1s=l.has(1),ze.vertexUv2s=l.has(2),ze.vertexUv3s=l.has(3),l.clear(),ze}function p(y){let T=[];if(y.shaderID?T.push(y.shaderID):(T.push(y.customVertexShaderID),T.push(y.customFragmentShaderID)),y.defines!==void 0)for(let P in y.defines)T.push(P),T.push(y.defines[P]);return y.isRawShaderMaterial===!1&&(g(T,y),A(T,y),T.push(n.outputColorSpace)),T.push(y.customProgramCacheKey),T.join()}function g(y,T){y.push(T.precision),y.push(T.outputColorSpace),y.push(T.envMapMode),y.push(T.envMapCubeUVHeight),y.push(T.mapUv),y.push(T.alphaMapUv),y.push(T.lightMapUv),y.push(T.aoMapUv),y.push(T.bumpMapUv),y.push(T.normalMapUv),y.push(T.displacementMapUv),y.push(T.emissiveMapUv),y.push(T.metalnessMapUv),y.push(T.roughnessMapUv),y.push(T.anisotropyMapUv),y.push(T.clearcoatMapUv),y.push(T.clearcoatNormalMapUv),y.push(T.clearcoatRoughnessMapUv),y.push(T.iridescenceMapUv),y.push(T.iridescenceThicknessMapUv),y.push(T.sheenColorMapUv),y.push(T.sheenRoughnessMapUv),y.push(T.specularMapUv),y.push(T.specularColorMapUv),y.push(T.specularIntensityMapUv),y.push(T.transmissionMapUv),y.push(T.thicknessMapUv),y.push(T.combine),y.push(T.fogExp2),y.push(T.sizeAttenuation),y.push(T.morphTargetsCount),y.push(T.morphAttributeCount),y.push(T.numSunLights),y.push(T.numDirLights),y.push(T.numPointLights),y.push(T.numSpotLights),y.push(T.numSpotLightMaps),y.push(T.numHemiLights),y.push(T.numRectAreaLights),y.push(T.numSunLightShadows),y.push(T.numDirLightShadows),y.push(T.numPointLightShadows),y.push(T.numSpotLightShadows),y.push(T.numSpotLightShadowsWithMaps),y.push(T.numLightProbes),y.push(T.shadowMapType),y.push(T.toneMapping),y.push(T.numClippingPlanes),y.push(T.numClipIntersection),y.push(T.depthPacking)}function A(y,T){a.disableAll(),T.instancing&&a.enable(0),T.instancingColor&&a.enable(1),T.instancingMorph&&a.enable(2),T.matcap&&a.enable(3),T.envMap&&a.enable(4),T.normalMapObjectSpace&&a.enable(5),T.normalMapTangentSpace&&a.enable(6),T.clearcoat&&a.enable(7),T.iridescence&&a.enable(8),T.alphaTest&&a.enable(9),T.vertexColors&&a.enable(10),T.vertexAlphas&&a.enable(11),T.vertexUv1s&&a.enable(12),T.vertexUv2s&&a.enable(13),T.vertexUv3s&&a.enable(14),T.vertexTangents&&a.enable(15),T.anisotropy&&a.enable(16),T.alphaHash&&a.enable(17),T.batching&&a.enable(18),T.dispersion&&a.enable(19),T.retroreflection&&a.enable(24),T.batchingColor&&a.enable(20),T.gradientMap&&a.enable(21),T.packedNormalMap&&a.enable(22),T.vertexNormals&&a.enable(23),y.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.reversedDepthBuffer&&a.enable(4),T.skinning&&a.enable(5),T.morphTargets&&a.enable(6),T.morphNormals&&a.enable(7),T.morphColors&&a.enable(8),T.premultipliedAlpha&&a.enable(9),T.shadowMapEnabled&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),T.decodeVideoTextureEmissive&&a.enable(20),T.alphaToCoverage&&a.enable(21),T.numLightProbeGrids>0&&a.enable(22),T.hasPositionAttribute&&a.enable(23),y.push(a.mask)}function R(y){let T=f[y.type],P;if(T){let k=Mn[T];P=Io.clone(k.uniforms)}else P=y.uniforms;return P}function v(y,T){let P=u.get(T);return P!==void 0?++P.usedTimes:(P=new lb(n,T,y,s),c.push(P),u.set(T,P)),P}function w(y){if(--y.usedTimes===0){let T=c.indexOf(y);c[T]=c[c.length-1],c.pop(),u.delete(y.cacheKey),y.destroy()}}function M(y){o.remove(y)}function E(){o.dispose()}return{getParameters:x,getProgramCacheKey:p,getUniforms:R,acquireProgram:v,releaseProgram:w,releaseShaderCache:M,programs:c,dispose:E}}function hb(){let n=new WeakMap;function e(a){return n.has(a)}function t(a){let o=n.get(a);return o===void 0&&(o={},n.set(a,o)),o}function i(a){n.delete(a)}function s(a,o,l){n.get(a)[o]=l}function r(){n=new WeakMap}return{has:e,get:t,remove:i,update:s,dispose:r}}function fb(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.materialVariant!==e.materialVariant?n.materialVariant-e.materialVariant:n.z!==e.z?n.z-e.z:n.id-e.id}function rm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function am(){let n=[],e=0,t=[],i=[],s=[];function r(){e=0,t.length=0,i.length=0,s.length=0}function a(d){let f=0;return d.isInstancedMesh&&(f+=2),d.isSkinnedMesh&&(f+=1),f}function o(d,f,m,x,p,g){let A=n[e];return A===void 0?(A={id:d.id,object:d,geometry:f,material:m,materialVariant:a(d),groupOrder:x,renderOrder:d.renderOrder,z:p,group:g},n[e]=A):(A.id=d.id,A.object=d,A.geometry=f,A.material=m,A.materialVariant=a(d),A.groupOrder=x,A.renderOrder=d.renderOrder,A.z=p,A.group=g),e++,A}function l(d,f,m,x,p,g,A){A.reversedDepth===!0&&(p=-p);let R=o(d,f,m,x,p,g);m.transmission>0?i.push(R):m.transparent===!0?s.push(R):t.push(R)}function c(d,f,m,x,p,g){let A=o(d,f,m,x,p,g);m.transmission>0?i.unshift(A):m.transparent===!0?s.unshift(A):t.unshift(A)}function u(d,f){t.length>1&&t.sort(d||fb),i.length>1&&i.sort(f||rm),s.length>1&&s.sort(f||rm)}function h(){for(let d=e,f=n.length;d<f;d++){let m=n[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:i,transparent:s,init:r,push:l,unshift:c,finish:h,sort:u}}function pb(){let n=new WeakMap;function e(i,s){let r=n.get(i),a;return r===void 0?(a=new am,n.set(i,[a])):s>=r.length?(a=new am,r.push(a)):a=r[s],a}function t(){n=new WeakMap}return{get:e,dispose:t}}function mb(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={direction:new Y,color:new rt};break;case"SpotLight":t={position:new Y,direction:new Y,color:new rt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new Y,color:new rt,distance:0,decay:0};break;case"HemisphereLight":t={direction:new Y,skyColor:new rt,groundColor:new rt};break;case"RectAreaLight":t={color:new rt,position:new Y,halfWidth:new Y,halfHeight:new Y};break}return n[e.id]=t,t}}}function gb(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"SunLight":case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var _b=0;function xb(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function yb(n){let e=new mb,t=gb(),i={version:0,hash:{sunLength:-1,directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numSunShadows:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],sun:[],sunShadow:[],sunShadowMap:[],sunShadowMatrix:[],sunShadowCascade:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new Y);let s=new Y,r=new Mt,a=new Mt;function o(c){let u=0,h=0,d=0;for(let U=0;U<9;U++)i.probe[U].set(0,0,0);let f=0,m=0,x=0,p=0,g=0,A=0,R=0,v=0,w=0,M=0,E=0,y=0,T=0,P=0;c.sort(xb);for(let U=0,z=c.length;U<z;U++){let F=c[U],q=F.color,K=F.intensity,ne=F.distance,oe=null;if(F.shadow&&F.shadow.map&&(F.shadow.map.texture.format===ws?oe=F.shadow.map.texture:oe=F.shadow.map.depthTexture||F.shadow.map.texture),F.isAmbientLight)u+=q.r*K,h+=q.g*K,d+=q.b*K;else if(F.isLightProbe){for(let j=0;j<9;j++)i.probe[j].addScaledVector(F.sh.coefficients[j],K);P++}else if(F.isSunLight){let j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let le=F.shadow,ce=t.get(F);ce.shadowIntensity=le.intensity,ce.shadowBias=le.bias,ce.shadowNormalBias=le.normalBias,ce.shadowRadius=le.radius,ce.shadowMapSize.copy(le.mapSize).multiply(le.getFrameExtents()),i.sunShadow[m]=ce,i.sunShadowMap[m]=oe;let re=le.getViewportCount();for(let xe=0;xe<re;xe++)i.sunShadowMatrix[x+xe]=le.getMatrix(xe),i.sunShadowCascade[x+xe]=le._cascadeData[xe];x+=re,m++}i.sun[f]=j,f++}else if(F.isDirectionalLight){let j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),F.castShadow){let le=F.shadow,ce=t.get(F);ce.shadowIntensity=le.intensity,ce.shadowBias=le.bias,ce.shadowNormalBias=le.normalBias,ce.shadowRadius=le.radius,ce.shadowMapSize=le.mapSize,i.directionalShadow[p]=ce,i.directionalShadowMap[p]=oe,i.directionalShadowMatrix[p]=F.shadow.matrix,w++}i.directional[p]=j,p++}else if(F.isSpotLight){let j=e.get(F);j.position.setFromMatrixPosition(F.matrixWorld),j.color.copy(q).multiplyScalar(K),j.distance=ne,j.coneCos=Math.cos(F.angle),j.penumbraCos=Math.cos(F.angle*(1-F.penumbra)),j.decay=F.decay,i.spot[A]=j;let le=F.shadow;if(F.map&&(i.spotLightMap[y]=F.map,y++,le.updateMatrices(F),F.castShadow&&T++),i.spotLightMatrix[A]=le.matrix,F.castShadow){let ce=t.get(F);ce.shadowIntensity=le.intensity,ce.shadowBias=le.bias,ce.shadowNormalBias=le.normalBias,ce.shadowRadius=le.radius,ce.shadowMapSize=le.mapSize,i.spotShadow[A]=ce,i.spotShadowMap[A]=oe,E++}A++}else if(F.isRectAreaLight){let j=e.get(F);j.color.copy(q).multiplyScalar(K),j.halfWidth.set(F.width*.5,0,0),j.halfHeight.set(0,F.height*.5,0),i.rectArea[R]=j,R++}else if(F.isPointLight){let j=e.get(F);if(j.color.copy(F.color).multiplyScalar(F.intensity),j.distance=F.distance,j.decay=F.decay,F.castShadow){let le=F.shadow,ce=t.get(F);ce.shadowIntensity=le.intensity,ce.shadowBias=le.bias,ce.shadowNormalBias=le.normalBias,ce.shadowRadius=le.radius,ce.shadowMapSize=le.mapSize,ce.shadowCameraNear=le.camera.near,ce.shadowCameraFar=le.camera.far,i.pointShadow[g]=ce,i.pointShadowMap[g]=oe,i.pointShadowMatrix[g]=F.shadow.matrix,M++}i.point[g]=j,g++}else if(F.isHemisphereLight){let j=e.get(F);j.skyColor.copy(F.color).multiplyScalar(K),j.groundColor.copy(F.groundColor).multiplyScalar(K),i.hemi[v]=j,v++}}R>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ke.LTC_FLOAT_1,i.rectAreaLTC2=ke.LTC_FLOAT_2):(i.rectAreaLTC1=ke.LTC_HALF_1,i.rectAreaLTC2=ke.LTC_HALF_2)),i.ambient[0]=u,i.ambient[1]=h,i.ambient[2]=d;let k=i.hash;(k.sunLength!==f||k.directionalLength!==p||k.pointLength!==g||k.spotLength!==A||k.rectAreaLength!==R||k.hemiLength!==v||k.numSunShadows!==m||k.numDirectionalShadows!==w||k.numPointShadows!==M||k.numSpotShadows!==E||k.numSpotMaps!==y||k.numLightProbes!==P)&&(i.sun.length=f,i.directional.length=p,i.spot.length=A,i.rectArea.length=R,i.point.length=g,i.hemi.length=v,i.sunShadow.length=m,i.sunShadowMap.length=m,i.sunShadowMatrix.length=x,i.sunShadowCascade.length=x,i.directionalShadow.length=w,i.directionalShadowMap.length=w,i.directionalShadowMatrix.length=w,i.pointShadow.length=M,i.pointShadowMap.length=M,i.pointShadowMatrix.length=M,i.spotShadow.length=E,i.spotShadowMap.length=E,i.spotLightMatrix.length=E+y-T,i.spotLightMap.length=y,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=P,k.sunLength=f,k.directionalLength=p,k.pointLength=g,k.spotLength=A,k.rectAreaLength=R,k.hemiLength=v,k.numSunShadows=m,k.numDirectionalShadows=w,k.numPointShadows=M,k.numSpotShadows=E,k.numSpotMaps=y,k.numLightProbes=P,i.version=_b++)}function l(c,u){let h=0,d=0,f=0,m=0,x=0,p=0,g=u.matrixWorldInverse;for(let A=0,R=c.length;A<R;A++){let v=c[A];if(v.isSunLight){let w=i.sun[h];w.direction.setFromMatrixPosition(v.matrixWorld),w.direction.transformDirection(g),h++}else if(v.isDirectionalLight){let w=i.directional[d];w.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),d++}else if(v.isSpotLight){let w=i.spot[m];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(g),w.direction.setFromMatrixPosition(v.matrixWorld),s.setFromMatrixPosition(v.target.matrixWorld),w.direction.sub(s),w.direction.transformDirection(g),m++}else if(v.isRectAreaLight){let w=i.rectArea[x];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(g),a.identity(),r.copy(v.matrixWorld),r.premultiply(g),a.extractRotation(r),w.halfWidth.set(v.width*.5,0,0),w.halfHeight.set(0,v.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),x++}else if(v.isPointLight){let w=i.point[f];w.position.setFromMatrixPosition(v.matrixWorld),w.position.applyMatrix4(g),f++}else if(v.isHemisphereLight){let w=i.hemi[p];w.direction.setFromMatrixPosition(v.matrixWorld),w.direction.transformDirection(g),p++}}}return{setup:o,setupView:l,state:i}}function om(n){let e=new yb(n),t=[],i=[],s=[];function r(d){h.camera=d,t.length=0,i.length=0,s.length=0}function a(d){t.push(d)}function o(d){i.push(d)}function l(d){s.push(d)}function c(){e.setup(t)}function u(d){e.setupView(t,d)}let h={lightsArray:t,shadowsArray:i,lightProbeGridArray:s,camera:null,lights:e,transmissionRenderTarget:{},textureUnits:0};return{init:r,state:h,setupLights:c,setupLightsView:u,pushLight:a,pushShadow:o,pushLightProbeGrid:l}}function vb(n){let e=new WeakMap;function t(s,r=0){let a=e.get(s),o;return a===void 0?(o=new om(n),e.set(s,[o])):r>=a.length?(o=new om(n),a.push(o)):o=a[r],o}function i(){e=new WeakMap}return{get:t,dispose:i}}var bb=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Sb=`uniform sampler2D shadow_pass;
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
}`,Mb=[new Y(1,0,0),new Y(-1,0,0),new Y(0,1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1)],wb=[new Y(0,-1,0),new Y(0,-1,0),new Y(0,0,1),new Y(0,0,-1),new Y(0,-1,0),new Y(0,-1,0)],lm=new Mt,No=new Y,sh=new Y;function Eb(n,e,t){let i=new zr,s=new nt,r=new nt,a=new yt,o=new jl,l=new Xl,c={},u=t.maxTextureSize,h={[bs]:cn,[cn]:bs,[Jn]:Jn},d=new Nt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:bb,fragmentShader:Sb}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let m=new Wt;m.setAttribute("position",new Yt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new Vt(m,d),p=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Mo;let g=this.type;this.render=function(M,E,y){if(p.enabled===!1||p.autoUpdate===!1&&p.needsUpdate===!1||M.length===0)return;this.type===ip&&(ot("WebGLShadowMap: PCFSoftShadowMap has been removed. Using PCFShadowMap instead."),this.type=Mo);let T=n.getRenderTarget(),P=n.getActiveCubeFace(),k=n.getActiveMipmapLevel(),U=n.state;U.setBlending(Ci),U.buffers.depth.getReversed()===!0?U.buffers.color.setClear(0,0,0,0):U.buffers.color.setClear(1,1,1,1),U.buffers.depth.setTest(!0),U.setScissorTest(!1);let z=g!==this.type;z&&E.traverse(function(F){F.material&&(Array.isArray(F.material)?F.material.forEach(q=>q.needsUpdate=!0):F.material.needsUpdate=!0)});for(let F=0,q=M.length;F<q;F++){let K=M[F],ne=K.shadow;if(ne===void 0){ot("WebGLShadowMap:",K,"has no shadow.");continue}if(ne.autoUpdate===!1&&ne.needsUpdate===!1)continue;s.copy(ne.mapSize);let oe=ne.getFrameExtents();s.multiply(oe),r.copy(ne.mapSize),(s.x>u||s.y>u)&&(s.x>u&&(r.x=Math.floor(u/oe.x),s.x=r.x*oe.x,ne.mapSize.x=r.x),s.y>u&&(r.y=Math.floor(u/oe.y),s.y=r.y*oe.y,ne.mapSize.y=r.y));let j=n.state.buffers.depth.getReversed();if(ne.camera._reversedDepth=j,ne.map===null||z===!0){if(ne.map!==null&&(ne.map.depthTexture!==null&&(ne.map.depthTexture.dispose(),ne.map.depthTexture=null),ne.map.dispose()),this.type===jr){if(K.isPointLight){ot("WebGLShadowMap: VSM shadow maps are not supported for PointLights. Use PCF or BasicShadowMap instead.");continue}ne.map=new Pn(s.x,s.y,{format:ws,type:gi,minFilter:It,magFilter:It,generateMipmaps:!1}),ne.map.texture.name=K.name+".shadowMap",ne.map.depthTexture=new _s(s.x,s.y,mi),ne.map.depthTexture.name=K.name+".shadowMapDepth",ne.map.depthTexture.format=wi,ne.map.depthTexture.compareFunction=null,ne.map.depthTexture.minFilter=$t,ne.map.depthTexture.magFilter=$t}else K.isPointLight?(ne.map=new Kc(s.x),ne.map.depthTexture=new Gl(s.x,pi)):(ne.map=new Pn(s.x,s.y),ne.map.depthTexture=new _s(s.x,s.y,pi)),ne.map.depthTexture.name=K.name+".shadowMap",ne.map.depthTexture.format=wi,this.type===Mo?(ne.map.depthTexture.compareFunction=j?Yc:qc,ne.map.depthTexture.minFilter=It,ne.map.depthTexture.magFilter=It):(ne.map.depthTexture.compareFunction=null,ne.map.depthTexture.minFilter=$t,ne.map.depthTexture.magFilter=$t);ne.camera.updateProjectionMatrix()}ne.map.isWebGLCubeRenderTarget!==!0&&(ne.map.width!==s.x||ne.map.height!==s.y)&&ne.map.setSize(s.x,s.y);let le=ne.map.isWebGLCubeRenderTarget?6:ne.getViewportCount();K.isPointLight!==!0&&ne.updateMatrices(K,y);for(let ce=0;ce<le;ce++){let re=ne.getCamera(ce);if(K.isPointLight){let xe=ne.camera,Xe=ne.matrix,Ne=K.distance||xe.far;Ne!==xe.far&&(xe.far=Ne,xe.updateProjectionMatrix()),No.setFromMatrixPosition(K.matrixWorld),xe.position.copy(No),sh.copy(xe.position),sh.add(Mb[ce]),xe.up.copy(wb[ce]),xe.lookAt(sh),xe.updateMatrixWorld(),Xe.makeTranslation(-No.x,-No.y,-No.z),lm.multiplyMatrices(xe.projectionMatrix,xe.matrixWorldInverse),ne._frustum.setFromProjectionMatrix(lm,xe.coordinateSystem,xe.reversedDepth)}if(ne.map.isWebGLCubeRenderTarget)n.setRenderTarget(ne.map,ce),n.clear();else{ce===0&&(n.setRenderTarget(ne.map),n.clear());let xe=ne.getViewport(ce);a.set(r.x*xe.x,r.y*xe.y,r.x*xe.z,r.y*xe.w),U.viewport(a)}i=ne.getFrustum(ce),v(E,y,re,K,this.type)}ne.isPointLightShadow!==!0&&this.type===jr&&A(ne,y),ne.needsUpdate=!1}g=this.type,p.needsUpdate=!1,n.setRenderTarget(T,P,k)};function A(M,E){let y=e.update(x);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null?M.mapPass=new Pn(s.x,s.y,{format:ws,type:gi}):(M.mapPass.width!==M.map.width||M.mapPass.height!==M.map.height)&&M.mapPass.setSize(M.map.width,M.map.height),d.uniforms.shadow_pass.value=M.map.depthTexture,d.uniforms.resolution.value.set(M.map.width,M.map.height),d.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(E,null,y,d,x,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value.set(M.map.width,M.map.height),f.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(E,null,y,f,x,null)}function R(M,E,y,T){let P=null,k=y.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(k!==void 0)P=k;else if(P=y.isPointLight===!0?l:o,n.localClippingEnabled&&E.clipShadows===!0&&Array.isArray(E.clippingPlanes)&&E.clippingPlanes.length!==0||E.displacementMap&&E.displacementScale!==0||E.alphaMap&&E.alphaTest>0||E.map&&E.alphaTest>0||E.alphaToCoverage===!0){let U=P.uuid,z=E.uuid,F=c[U];F===void 0&&(F={},c[U]=F);let q=F[z];q===void 0&&(q=P.clone(),F[z]=q,E.addEventListener("dispose",w)),P=q}if(P.visible=E.visible,P.wireframe=E.wireframe,T===jr?P.side=E.shadowSide!==null?E.shadowSide:E.side:P.side=E.shadowSide!==null?E.shadowSide:h[E.side],P.alphaMap=E.alphaMap,P.alphaTest=E.alphaToCoverage===!0?.5:E.alphaTest,P.map=E.map,P.clipShadows=E.clipShadows,P.clippingPlanes=E.clippingPlanes,P.clipIntersection=E.clipIntersection,P.displacementMap=E.displacementMap,P.displacementScale=E.displacementScale,P.displacementBias=E.displacementBias,P.wireframeLinewidth=E.wireframeLinewidth,P.linewidth=E.linewidth,y.isPointLight===!0&&P.isMeshDistanceMaterial===!0){let U=n.properties.get(P);U.light=y}return P}function v(M,E,y,T,P){if(M.visible===!1)return;if(M.layers.test(E.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&P===jr)&&(!M.frustumCulled||M.intersectsFrustum(i))){M.modelViewMatrix.multiplyMatrices(y.matrixWorldInverse,M.matrixWorld);let z=e.update(M),F=M.material;if(Array.isArray(F)){let q=z.groups;for(let K=0,ne=q.length;K<ne;K++){let oe=q[K],j=F[oe.materialIndex];if(j&&j.visible){let le=R(M,j,T,P);M.onBeforeShadow(n,M,E,y,z,le,oe),n.renderBufferDirect(y,null,z,le,M,oe),M.onAfterShadow(n,M,E,y,z,le,oe)}}}else if(F.visible){let q=R(M,F,T,P);M.onBeforeShadow(n,M,E,y,z,q,null),n.renderBufferDirect(y,null,z,q,M,null),M.onAfterShadow(n,M,E,y,z,q,null)}}let U=M.children;for(let z=0,F=U.length;z<F;z++)v(U[z],E,y,T,P)}function w(M){M.target.removeEventListener("dispose",w);for(let y in c){let T=c[y],P=M.target.uuid;P in T&&(T[P].dispose(),delete T[P])}}}function Tb(n,e){function t(){let X=!1,be=new yt,ue=null,Te=new yt(0,0,0,0);return{setMask:function(Pe){ue!==Pe&&!X&&(n.colorMask(Pe,Pe,Pe,Pe),ue=Pe)},setLocked:function(Pe){X=Pe},setClear:function(Pe,pe,$e,ze,ut){ut===!0&&(Pe*=ze,pe*=ze,$e*=ze),be.set(Pe,pe,$e,ze),Te.equals(be)===!1&&(n.clearColor(Pe,pe,$e,ze),Te.copy(be))},reset:function(){X=!1,ue=null,Te.set(-1,0,0,0)}}}function i(){let X=!1,be=!1,ue=null,Te=null,Pe=null;return{setReversed:function(pe){if(be!==pe){let $e=e.get("EXT_clip_control");pe?$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.ZERO_TO_ONE_EXT):$e.clipControlEXT($e.LOWER_LEFT_EXT,$e.NEGATIVE_ONE_TO_ONE_EXT),be=pe;let ze=Pe;Pe=null,this.setClear(ze)}},getReversed:function(){return be},setTest:function(pe){pe?W(n.DEPTH_TEST):_e(n.DEPTH_TEST)},setMask:function(pe){ue!==pe&&!X&&(n.depthMask(pe),ue=pe)},setFunc:function(pe){if(be&&(pe=Op[pe]),Te!==pe){switch(pe){case Ll:n.depthFunc(n.NEVER);break;case Il:n.depthFunc(n.ALWAYS);break;case Dl:n.depthFunc(n.LESS);break;case Ir:n.depthFunc(n.LEQUAL);break;case Nl:n.depthFunc(n.EQUAL);break;case Ul:n.depthFunc(n.GEQUAL);break;case Fl:n.depthFunc(n.GREATER);break;case Ol:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Te=pe}},setLocked:function(pe){X=pe},setClear:function(pe){Pe!==pe&&(Pe=pe,be&&(pe=1-pe),n.clearDepth(pe))},reset:function(){X=!1,ue=null,Te=null,Pe=null,be=!1}}}function s(){let X=!1,be=null,ue=null,Te=null,Pe=null,pe=null,$e=null,ze=null,ut=null;return{setTest:function(ht){X||(ht?W(n.STENCIL_TEST):_e(n.STENCIL_TEST))},setMask:function(ht){be!==ht&&!X&&(n.stencilMask(ht),be=ht)},setFunc:function(ht,xt,Ut){(ue!==ht||Te!==xt||Pe!==Ut)&&(n.stencilFunc(ht,xt,Ut),ue=ht,Te=xt,Pe=Ut)},setOp:function(ht,xt,Ut){(pe!==ht||$e!==xt||ze!==Ut)&&(n.stencilOp(ht,xt,Ut),pe=ht,$e=xt,ze=Ut)},setLocked:function(ht){X=ht},setClear:function(ht){ut!==ht&&(n.clearStencil(ht),ut=ht)},reset:function(){X=!1,be=null,ue=null,Te=null,Pe=null,pe=null,$e=null,ze=null,ut=null}}}let r=new t,a=new i,o=new s,l=new WeakMap,c=new WeakMap,u={},h={},d={},f=new WeakMap,m=[],x=null,p=!1,g=null,A=null,R=null,v=null,w=null,M=null,E=null,y=new rt(0,0,0),T=0,P=!1,k=null,U=null,z=null,F=null,q=null,K=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),ne=!1,oe=0,j=n.getParameter(n.VERSION);j.indexOf("WebGL")!==-1?(oe=parseFloat(/^WebGL (\d)/.exec(j)[1]),ne=oe>=1):j.indexOf("OpenGL ES")!==-1&&(oe=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),ne=oe>=2);let le=null,ce={},re=n.getParameter(n.SCISSOR_BOX),xe=n.getParameter(n.VIEWPORT),Xe=new yt().fromArray(re),Ne=new yt().fromArray(xe);function qe(X,be,ue,Te){let Pe=new Uint8Array(4),pe=n.createTexture();n.bindTexture(X,pe),n.texParameteri(X,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(X,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let $e=0;$e<ue;$e++)X===n.TEXTURE_3D||X===n.TEXTURE_2D_ARRAY?n.texImage3D(be,0,n.RGBA,1,1,Te,0,n.RGBA,n.UNSIGNED_BYTE,Pe):n.texImage2D(be+$e,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,Pe);return pe}let H={};H[n.TEXTURE_2D]=qe(n.TEXTURE_2D,n.TEXTURE_2D,1),H[n.TEXTURE_CUBE_MAP]=qe(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),H[n.TEXTURE_2D_ARRAY]=qe(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),H[n.TEXTURE_3D]=qe(n.TEXTURE_3D,n.TEXTURE_3D,1,1),r.setClear(0,0,0,1),a.setClear(1),o.setClear(0),W(n.DEPTH_TEST),a.setFunc(Ir),Ke(!1),Ye(Td),W(n.CULL_FACE),We(Ci);function W(X){u[X]!==!0&&(n.enable(X),u[X]=!0)}function _e(X){u[X]!==!1&&(n.disable(X),u[X]=!1)}function ve(X,be){return d[X]!==be?(n.bindFramebuffer(X,be),d[X]=be,X===n.DRAW_FRAMEBUFFER&&(d[n.FRAMEBUFFER]=be),X===n.FRAMEBUFFER&&(d[n.DRAW_FRAMEBUFFER]=be),!0):!1}function ge(X,be){let ue=m,Te=!1;if(X){ue=f.get(be),ue===void 0&&(ue=[],f.set(be,ue));let Pe=X.textures;if(ue.length!==Pe.length||ue[0]!==n.COLOR_ATTACHMENT0){for(let pe=0,$e=Pe.length;pe<$e;pe++)ue[pe]=n.COLOR_ATTACHMENT0+pe;ue.length=Pe.length,Te=!0}}else ue[0]!==n.BACK&&(ue[0]=n.BACK,Te=!0);Te&&n.drawBuffers(ue)}function Be(X){return x!==X?(n.useProgram(X),x=X,!0):!1}let Je={[qs]:n.FUNC_ADD,[rp]:n.FUNC_SUBTRACT,[ap]:n.FUNC_REVERSE_SUBTRACT};Je[op]=n.MIN,Je[lp]=n.MAX;let De={[cp]:n.ZERO,[up]:n.ONE,[dp]:n.SRC_COLOR,[Rd]:n.SRC_ALPHA,[_p]:n.SRC_ALPHA_SATURATE,[mp]:n.DST_COLOR,[fp]:n.DST_ALPHA,[hp]:n.ONE_MINUS_SRC_COLOR,[Pd]:n.ONE_MINUS_SRC_ALPHA,[gp]:n.ONE_MINUS_DST_COLOR,[pp]:n.ONE_MINUS_DST_ALPHA,[xp]:n.CONSTANT_COLOR,[yp]:n.ONE_MINUS_CONSTANT_COLOR,[vp]:n.CONSTANT_ALPHA,[bp]:n.ONE_MINUS_CONSTANT_ALPHA};function We(X,be,ue,Te,Pe,pe,$e,ze,ut,ht){if(X===Ci){p===!0&&(_e(n.BLEND),p=!1);return}if(p===!1&&(W(n.BLEND),p=!0),X!==sp){if(X!==g||ht!==P){if((A!==qs||w!==qs)&&(n.blendEquation(n.FUNC_ADD),A=qs,w=qs),ht)switch(X){case Xr:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ji:n.blendFunc(n.ONE,n.ONE);break;case Ad:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Cd:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:lt("WebGLState: Invalid blending: ",X);break}else switch(X){case Xr:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Ji:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Ad:lt("WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Cd:lt("WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:lt("WebGLState: Invalid blending: ",X);break}R=null,v=null,M=null,E=null,y.set(0,0,0),T=0,g=X,P=ht}return}Pe=Pe||be,pe=pe||ue,$e=$e||Te,(be!==A||Pe!==w)&&(n.blendEquationSeparate(Je[be],Je[Pe]),A=be,w=Pe),(ue!==R||Te!==v||pe!==M||$e!==E)&&(n.blendFuncSeparate(De[ue],De[Te],De[pe],De[$e]),R=ue,v=Te,M=pe,E=$e),(ze.equals(y)===!1||ut!==T)&&(n.blendColor(ze.r,ze.g,ze.b,ut),y.copy(ze),T=ut),g=X,P=!1}function it(X,be){X.side===Jn?_e(n.CULL_FACE):W(n.CULL_FACE);let ue=X.side===cn;be&&(ue=!ue),Ke(ue),X.blending===Xr&&X.transparent===!1?We(Ci):We(X.blending,X.blendEquation,X.blendSrc,X.blendDst,X.blendEquationAlpha,X.blendSrcAlpha,X.blendDstAlpha,X.blendColor,X.blendAlpha,X.premultipliedAlpha),a.setFunc(X.depthFunc),a.setTest(X.depthTest),a.setMask(X.depthWrite),r.setMask(X.colorWrite);let Te=X.stencilWrite;o.setTest(Te),Te&&(o.setMask(X.stencilWriteMask),o.setFunc(X.stencilFunc,X.stencilRef,X.stencilFuncMask),o.setOp(X.stencilFail,X.stencilZFail,X.stencilZPass)),we(X.polygonOffset,X.polygonOffsetFactor,X.polygonOffsetUnits),X.alphaToCoverage===!0?W(n.SAMPLE_ALPHA_TO_COVERAGE):_e(n.SAMPLE_ALPHA_TO_COVERAGE)}function Ke(X){k!==X&&(X?n.frontFace(n.CW):n.frontFace(n.CCW),k=X)}function Ye(X){X!==tp?(W(n.CULL_FACE),X!==U&&(X===Td?n.cullFace(n.BACK):X===np?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):_e(n.CULL_FACE),U=X}function he(X){X!==z&&(ne&&n.lineWidth(X),z=X)}function we(X,be,ue){X?(W(n.POLYGON_OFFSET_FILL),(F!==be||q!==ue)&&(F=be,q=ue,a.getReversed()&&(be=-be),n.polygonOffset(be,ue))):_e(n.POLYGON_OFFSET_FILL)}function Ue(X){X?W(n.SCISSOR_TEST):_e(n.SCISSOR_TEST)}function Oe(X){X===void 0&&(X=n.TEXTURE0+K-1),le!==X&&(n.activeTexture(X),le=X)}function V(X,be,ue){ue===void 0&&(le===null?ue=n.TEXTURE0+K-1:ue=le);let Te=ce[ue];Te===void 0&&(Te={type:void 0,texture:void 0},ce[ue]=Te),(Te.type!==X||Te.texture!==be)&&(le!==ue&&(n.activeTexture(ue),le=ue),n.bindTexture(X,be||H[X]),Te.type=X,Te.texture=be)}function se(){let X=ce[le];X!==void 0&&X.type!==void 0&&(n.bindTexture(X.type,null),X.type=void 0,X.texture=void 0)}function Ae(){try{n.compressedTexImage2D(...arguments)}catch(X){lt("WebGLState:",X)}}function b(){try{n.compressedTexImage3D(...arguments)}catch(X){lt("WebGLState:",X)}}function _(){try{n.texSubImage2D(...arguments)}catch(X){lt("WebGLState:",X)}}function L(){try{n.texSubImage3D(...arguments)}catch(X){lt("WebGLState:",X)}}function O(){try{n.compressedTexSubImage2D(...arguments)}catch(X){lt("WebGLState:",X)}}function ee(){try{n.compressedTexSubImage3D(...arguments)}catch(X){lt("WebGLState:",X)}}function de(){try{n.texStorage2D(...arguments)}catch(X){lt("WebGLState:",X)}}function ye(){try{n.texStorage3D(...arguments)}catch(X){lt("WebGLState:",X)}}function ae(){try{n.texImage2D(...arguments)}catch(X){lt("WebGLState:",X)}}function fe(){try{n.texImage3D(...arguments)}catch(X){lt("WebGLState:",X)}}function Ie(X){return h[X]!==void 0?h[X]:n.getParameter(X)}function je(X,be){h[X]!==be&&(n.pixelStorei(X,be),h[X]=be)}function Ce(X){Xe.equals(X)===!1&&(n.scissor(X.x,X.y,X.z,X.w),Xe.copy(X))}function Le(X){Ne.equals(X)===!1&&(n.viewport(X.x,X.y,X.z,X.w),Ne.copy(X))}function Qe(X,be){let ue=c.get(be);ue===void 0&&(ue=new WeakMap,c.set(be,ue));let Te=ue.get(X);Te===void 0&&(Te=n.getUniformBlockIndex(be,X.name),ue.set(X,Te))}function st(X,be){let Te=c.get(be).get(X);l.get(be)!==Te&&(n.uniformBlockBinding(be,Te,X.__bindingPointIndex),l.set(be,Te))}function at(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),a.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),n.pixelStorei(n.PACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_ALIGNMENT,4),n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,!1),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,n.BROWSER_DEFAULT_WEBGL),n.pixelStorei(n.PACK_ROW_LENGTH,0),n.pixelStorei(n.PACK_SKIP_PIXELS,0),n.pixelStorei(n.PACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_ROW_LENGTH,0),n.pixelStorei(n.UNPACK_IMAGE_HEIGHT,0),n.pixelStorei(n.UNPACK_SKIP_PIXELS,0),n.pixelStorei(n.UNPACK_SKIP_ROWS,0),n.pixelStorei(n.UNPACK_SKIP_IMAGES,0),u={},h={},le=null,ce={},d={},f=new WeakMap,m=[],x=null,p=!1,g=null,A=null,R=null,v=null,w=null,M=null,E=null,y=new rt(0,0,0),T=0,P=!1,k=null,U=null,z=null,F=null,q=null,Xe.set(0,0,n.canvas.width,n.canvas.height),Ne.set(0,0,n.canvas.width,n.canvas.height),r.reset(),a.reset(),o.reset()}return{buffers:{color:r,depth:a,stencil:o},enable:W,disable:_e,bindFramebuffer:ve,drawBuffers:ge,useProgram:Be,setBlending:We,setMaterial:it,setFlipSided:Ke,setCullFace:Ye,setLineWidth:he,setPolygonOffset:we,setScissorTest:Ue,activeTexture:Oe,bindTexture:V,unbindTexture:se,compressedTexImage2D:Ae,compressedTexImage3D:b,texImage2D:ae,texImage3D:fe,pixelStorei:je,getParameter:Ie,updateUBOMapping:Qe,uniformBlockBinding:st,texStorage2D:de,texStorage3D:ye,texSubImage2D:_,texSubImage3D:L,compressedTexSubImage2D:O,compressedTexSubImage3D:ee,scissor:Ce,viewport:Le,reset:at}}function Ab(n,e,t,i,s,r,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new nt,u=new WeakMap,h=new Set,d,f=new WeakMap,m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function x(b,_){return m?new OffscreenCanvas(b,_):to("canvas")}function p(b,_,L){let O=1,ee=Ae(b);if((ee.width>L||ee.height>L)&&(O=L/Math.max(ee.width,ee.height)),O<1)if(typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&b instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&b instanceof ImageBitmap||typeof VideoFrame<"u"&&b instanceof VideoFrame){let de=Math.floor(O*ee.width),ye=Math.floor(O*ee.height);d===void 0&&(d=x(de,ye));let ae=_?x(de,ye):d;return ae.width=de,ae.height=ye,ae.getContext("2d").drawImage(b,0,0,de,ye),ot("WebGLRenderer: Texture has been resized from ("+ee.width+"x"+ee.height+") to ("+de+"x"+ye+")."),ae}else return"data"in b&&ot("WebGLRenderer: Image in DataTexture is too big ("+ee.width+"x"+ee.height+")."),b;return b}function g(b){return b.generateMipmaps}function A(b){n.generateMipmap(b)}function R(b){return b.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:b.isWebGL3DRenderTarget?n.TEXTURE_3D:b.isWebGLArrayRenderTarget||b.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function v(b,_,L,O,ee,de=!1){if(b!==null){if(n[b]!==void 0)return n[b];ot("WebGLRenderer: Attempt to use non-existing WebGL internal format '"+b+"'")}let ye;O&&(ye=e.get("EXT_texture_norm16"),ye||ot("WebGLRenderer: Unable to use normalized textures without EXT_texture_norm16 extension"));let ae=_;if(_===n.RED&&(L===n.FLOAT&&(ae=n.R32F),L===n.HALF_FLOAT&&(ae=n.R16F),L===n.UNSIGNED_BYTE&&(ae=n.R8),L===n.UNSIGNED_SHORT&&ye&&(ae=ye.R16_EXT),L===n.SHORT&&ye&&(ae=ye.R16_SNORM_EXT)),_===n.RED_INTEGER&&(L===n.UNSIGNED_BYTE&&(ae=n.R8UI),L===n.UNSIGNED_SHORT&&(ae=n.R16UI),L===n.UNSIGNED_INT&&(ae=n.R32UI),L===n.BYTE&&(ae=n.R8I),L===n.SHORT&&(ae=n.R16I),L===n.INT&&(ae=n.R32I)),_===n.RG&&(L===n.FLOAT&&(ae=n.RG32F),L===n.HALF_FLOAT&&(ae=n.RG16F),L===n.UNSIGNED_BYTE&&(ae=n.RG8),L===n.UNSIGNED_SHORT&&ye&&(ae=ye.RG16_EXT),L===n.SHORT&&ye&&(ae=ye.RG16_SNORM_EXT)),_===n.RG_INTEGER&&(L===n.UNSIGNED_BYTE&&(ae=n.RG8UI),L===n.UNSIGNED_SHORT&&(ae=n.RG16UI),L===n.UNSIGNED_INT&&(ae=n.RG32UI),L===n.BYTE&&(ae=n.RG8I),L===n.SHORT&&(ae=n.RG16I),L===n.INT&&(ae=n.RG32I)),_===n.RGB_INTEGER&&(L===n.UNSIGNED_BYTE&&(ae=n.RGB8UI),L===n.UNSIGNED_SHORT&&(ae=n.RGB16UI),L===n.UNSIGNED_INT&&(ae=n.RGB32UI),L===n.BYTE&&(ae=n.RGB8I),L===n.SHORT&&(ae=n.RGB16I),L===n.INT&&(ae=n.RGB32I)),_===n.RGBA_INTEGER&&(L===n.UNSIGNED_BYTE&&(ae=n.RGBA8UI),L===n.UNSIGNED_SHORT&&(ae=n.RGBA16UI),L===n.UNSIGNED_INT&&(ae=n.RGBA32UI),L===n.BYTE&&(ae=n.RGBA8I),L===n.SHORT&&(ae=n.RGBA16I),L===n.INT&&(ae=n.RGBA32I)),_===n.RGB&&(L===n.UNSIGNED_SHORT&&ye&&(ae=ye.RGB16_EXT),L===n.SHORT&&ye&&(ae=ye.RGB16_SNORM_EXT),L===n.UNSIGNED_INT_5_9_9_9_REV&&(ae=n.RGB9_E5),L===n.UNSIGNED_INT_10F_11F_11F_REV&&(ae=n.R11F_G11F_B10F)),_===n.RGBA){let fe=de?eo:bt.getTransfer(ee);L===n.FLOAT&&(ae=n.RGBA32F),L===n.HALF_FLOAT&&(ae=n.RGBA16F),L===n.UNSIGNED_BYTE&&(ae=fe===At?n.SRGB8_ALPHA8:n.RGBA8),L===n.UNSIGNED_SHORT&&ye&&(ae=ye.RGBA16_EXT),L===n.SHORT&&ye&&(ae=ye.RGBA16_SNORM_EXT),L===n.UNSIGNED_SHORT_4_4_4_4&&(ae=n.RGBA4),L===n.UNSIGNED_SHORT_5_5_5_1&&(ae=n.RGB5_A1)}return(ae===n.R16F||ae===n.R32F||ae===n.RG16F||ae===n.RG32F||ae===n.RGBA16F||ae===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ae}function w(b,_){let L;return b?_===null||_===pi||_===Yr?L=n.DEPTH24_STENCIL8:_===mi?L=n.DEPTH32F_STENCIL8:_===qr&&(L=n.DEPTH24_STENCIL8,ot("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):_===null||_===pi||_===Yr?L=n.DEPTH_COMPONENT24:_===mi?L=n.DEPTH_COMPONENT32F:_===qr&&(L=n.DEPTH_COMPONENT16),L}function M(b,_){return g(b)===!0||b.isFramebufferTexture&&b.minFilter!==$t&&b.minFilter!==It?Math.log2(Math.max(_.width,_.height))+1:b.mipmaps!==void 0&&b.mipmaps.length>0?b.mipmaps.length:b.isCompressedTexture&&Array.isArray(b.image)?_.mipmaps.length:1}function E(b){let _=b.target;_.removeEventListener("dispose",E),T(_),_.isVideoTexture&&u.delete(_),_.isHTMLTexture&&h.delete(_)}function y(b){let _=b.target;_.removeEventListener("dispose",y),k(_)}function T(b){let _=i.get(b);if(_.__webglInit===void 0)return;let L=b.source,O=f.get(L);if(O){let ee=O[_.__cacheKey];ee.usedTimes--,ee.usedTimes===0&&P(b),Object.keys(O).length===0&&f.delete(L)}i.remove(b)}function P(b){let _=i.get(b);n.deleteTexture(_.__webglTexture);let L=b.source,O=f.get(L);delete O[_.__cacheKey],a.memory.textures--}function k(b){let _=i.get(b);if(b.depthTexture&&(b.depthTexture.dispose(),i.remove(b.depthTexture)),b.isWebGLCubeRenderTarget)for(let O=0;O<6;O++){if(Array.isArray(_.__webglFramebuffer[O]))for(let ee=0;ee<_.__webglFramebuffer[O].length;ee++)n.deleteFramebuffer(_.__webglFramebuffer[O][ee]);else n.deleteFramebuffer(_.__webglFramebuffer[O]);_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer[O])}else{if(Array.isArray(_.__webglFramebuffer))for(let O=0;O<_.__webglFramebuffer.length;O++)n.deleteFramebuffer(_.__webglFramebuffer[O]);else n.deleteFramebuffer(_.__webglFramebuffer);if(_.__webglDepthbuffer&&n.deleteRenderbuffer(_.__webglDepthbuffer),_.__webglMultisampledFramebuffer&&n.deleteFramebuffer(_.__webglMultisampledFramebuffer),_.__webglColorRenderbuffer)for(let O=0;O<_.__webglColorRenderbuffer.length;O++)_.__webglColorRenderbuffer[O]&&n.deleteRenderbuffer(_.__webglColorRenderbuffer[O]);_.__webglDepthRenderbuffer&&n.deleteRenderbuffer(_.__webglDepthRenderbuffer)}let L=b.textures;for(let O=0,ee=L.length;O<ee;O++){let de=i.get(L[O]);de.__webglTexture&&(n.deleteTexture(de.__webglTexture),a.memory.textures--),i.remove(L[O])}i.remove(b)}let U=0;function z(){U=0}function F(){return U}function q(b){U=b}function K(){let b=U;return b>=s.maxTextures&&ot("WebGLTextures: Trying to use "+(b+1)+" texture units while this GPU supports only "+s.maxTextures),U+=1,b}function ne(b){let _=[];return _.push(b.wrapS),_.push(b.wrapT),_.push(b.wrapR||0),_.push(b.magFilter),_.push(b.minFilter),_.push(b.anisotropy),_.push(b.internalFormat),_.push(b.format),_.push(b.type),_.push(b.generateMipmaps),_.push(b.premultiplyAlpha),_.push(b.flipY),_.push(b.unpackAlignment),_.push(b.colorSpace),_.join()}function oe(b,_){let L=i.get(b);if(b.isVideoTexture&&V(b),b.isRenderTargetTexture===!1&&b.isExternalTexture!==!0&&b.version>0&&L.__version!==b.version){let O=b.image;if(O===null)ot("WebGLRenderer: Texture marked for update but no image data found.");else if(O.complete===!1)ot("WebGLRenderer: Texture marked for update but image is incomplete");else{_e(L,b,_);return}}else b.isExternalTexture&&(L.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,L.__webglTexture,n.TEXTURE0+_)}function j(b,_){let L=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&L.__version!==b.version){_e(L,b,_);return}else b.isExternalTexture&&(L.__webglTexture=b.sourceTexture?b.sourceTexture:null);t.bindTexture(n.TEXTURE_2D_ARRAY,L.__webglTexture,n.TEXTURE0+_)}function le(b,_){let L=i.get(b);if(b.isRenderTargetTexture===!1&&b.version>0&&L.__version!==b.version){_e(L,b,_);return}t.bindTexture(n.TEXTURE_3D,L.__webglTexture,n.TEXTURE0+_)}function ce(b,_){let L=i.get(b);if(b.isCubeDepthTexture!==!0&&b.version>0&&L.__version!==b.version){ve(L,b,_);return}t.bindTexture(n.TEXTURE_CUBE_MAP,L.__webglTexture,n.TEXTURE0+_)}let re={[ps]:n.REPEAT,[Rn]:n.CLAMP_TO_EDGE,[kl]:n.MIRRORED_REPEAT},xe={[$t]:n.NEAREST,[wp]:n.NEAREST_MIPMAP_NEAREST,[Eo]:n.NEAREST_MIPMAP_LINEAR,[It]:n.LINEAR,[cc]:n.LINEAR_MIPMAP_NEAREST,[On]:n.LINEAR_MIPMAP_LINEAR},Xe={[Cp]:n.NEVER,[Dp]:n.ALWAYS,[Rp]:n.LESS,[qc]:n.LEQUAL,[Pp]:n.EQUAL,[Yc]:n.GEQUAL,[Lp]:n.GREATER,[Ip]:n.NOTEQUAL};function Ne(b,_){if(_.type===mi&&e.has("OES_texture_float_linear")===!1&&(_.magFilter===It||_.magFilter===cc||_.magFilter===Eo||_.magFilter===On||_.minFilter===It||_.minFilter===cc||_.minFilter===Eo||_.minFilter===On)&&ot("WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(b,n.TEXTURE_WRAP_S,re[_.wrapS]),n.texParameteri(b,n.TEXTURE_WRAP_T,re[_.wrapT]),(b===n.TEXTURE_3D||b===n.TEXTURE_2D_ARRAY)&&n.texParameteri(b,n.TEXTURE_WRAP_R,re[_.wrapR]),n.texParameteri(b,n.TEXTURE_MAG_FILTER,xe[_.magFilter]),n.texParameteri(b,n.TEXTURE_MIN_FILTER,xe[_.minFilter]),_.compareFunction&&(n.texParameteri(b,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(b,n.TEXTURE_COMPARE_FUNC,Xe[_.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(_.magFilter===$t||_.minFilter!==Eo&&_.minFilter!==On||_.type===mi&&e.has("OES_texture_float_linear")===!1)return;if(_.anisotropy>1||i.get(_).__currentAnisotropy){let L=e.get("EXT_texture_filter_anisotropic");n.texParameterf(b,L.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(_.anisotropy,s.getMaxAnisotropy())),i.get(_).__currentAnisotropy=_.anisotropy}}}function qe(b,_){let L=!1;b.__webglInit===void 0&&(b.__webglInit=!0,_.addEventListener("dispose",E));let O=_.source,ee=f.get(O);ee===void 0&&(ee={},f.set(O,ee));let de=ne(_);if(de!==b.__cacheKey){ee[de]===void 0&&(ee[de]={texture:n.createTexture(),usedTimes:0},a.memory.textures++,L=!0),ee[de].usedTimes++;let ye=ee[b.__cacheKey];ye!==void 0&&(ee[b.__cacheKey].usedTimes--,ye.usedTimes===0&&P(_)),b.__cacheKey=de,b.__webglTexture=ee[de].texture}return L}function H(b,_,L){return Math.floor(Math.floor(b/L)/_)}function W(b,_,L,O){let de=b.updateRanges;if(de.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,_.width,_.height,L,O,_.data);else{de.sort((je,Ce)=>je.start-Ce.start);let ye=0;for(let je=1;je<de.length;je++){let Ce=de[ye],Le=de[je],Qe=Ce.start+Ce.count,st=H(Le.start,_.width,4),at=H(Ce.start,_.width,4);Le.start<=Qe+1&&st===at&&H(Le.start+Le.count-1,_.width,4)===st?Ce.count=Math.max(Ce.count,Le.start+Le.count-Ce.start):(++ye,de[ye]=Le)}de.length=ye+1;let ae=t.getParameter(n.UNPACK_ROW_LENGTH),fe=t.getParameter(n.UNPACK_SKIP_PIXELS),Ie=t.getParameter(n.UNPACK_SKIP_ROWS);t.pixelStorei(n.UNPACK_ROW_LENGTH,_.width);for(let je=0,Ce=de.length;je<Ce;je++){let Le=de[je],Qe=Math.floor(Le.start/4),st=Math.ceil(Le.count/4),at=Qe%_.width,X=Math.floor(Qe/_.width),be=st,ue=1;t.pixelStorei(n.UNPACK_SKIP_PIXELS,at),t.pixelStorei(n.UNPACK_SKIP_ROWS,X),t.texSubImage2D(n.TEXTURE_2D,0,at,X,be,ue,L,O,_.data)}b.clearUpdateRanges(),t.pixelStorei(n.UNPACK_ROW_LENGTH,ae),t.pixelStorei(n.UNPACK_SKIP_PIXELS,fe),t.pixelStorei(n.UNPACK_SKIP_ROWS,Ie)}}function _e(b,_,L){let O=n.TEXTURE_2D;(_.isDataArrayTexture||_.isCompressedArrayTexture)&&(O=n.TEXTURE_2D_ARRAY),_.isData3DTexture&&(O=n.TEXTURE_3D);let ee=qe(b,_),de=_.source;t.bindTexture(O,b.__webglTexture,n.TEXTURE0+L);let ye=i.get(de);if(de.version!==ye.__version||ee===!0){if(t.activeTexture(n.TEXTURE0+L),(typeof ImageBitmap<"u"&&_.image instanceof ImageBitmap)===!1){let ue=bt.getPrimaries(bt.workingColorSpace),Te=_.colorSpace===Zn?null:bt.getPrimaries(_.colorSpace),Pe=_.colorSpace===Zn||ue===Te?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pe)}t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment);let fe=p(_.image,!1,s.maxTextureSize);fe=se(_,fe);let Ie=r.convert(_.format,_.colorSpace),je=r.convert(_.type),Ce=v(_.internalFormat,Ie,je,_.normalized,_.colorSpace,_.isVideoTexture);Ne(O,_);let Le,Qe=_.mipmaps,st=_.isVideoTexture!==!0,at=ye.__version===void 0||ee===!0,X=de.dataReady,be=M(_,fe);if(_.isDepthTexture)Ce=w(_.format===Ms,_.type),at&&(st?t.texStorage2D(n.TEXTURE_2D,1,Ce,fe.width,fe.height):t.texImage2D(n.TEXTURE_2D,0,Ce,fe.width,fe.height,0,Ie,je,null));else if(_.isDataTexture)if(Qe.length>0){st&&at&&t.texStorage2D(n.TEXTURE_2D,be,Ce,Qe[0].width,Qe[0].height);for(let ue=0,Te=Qe.length;ue<Te;ue++)Le=Qe[ue],st?X&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,Le.width,Le.height,Ie,je,Le.data):t.texImage2D(n.TEXTURE_2D,ue,Ce,Le.width,Le.height,0,Ie,je,Le.data);_.generateMipmaps=!1}else st?(at&&t.texStorage2D(n.TEXTURE_2D,be,Ce,fe.width,fe.height),X&&W(_,fe,Ie,je)):t.texImage2D(n.TEXTURE_2D,0,Ce,fe.width,fe.height,0,Ie,je,fe.data);else if(_.isCompressedTexture)if(_.isCompressedArrayTexture){st&&at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,be,Ce,Qe[0].width,Qe[0].height,fe.depth);for(let ue=0,Te=Qe.length;ue<Te;ue++)if(Le=Qe[ue],_.format!==rn)if(Ie!==null)if(st){if(X)if(_.layerUpdates.size>0){let Pe=Kd(Le.width,Le.height,_.format,_.type);for(let pe of _.layerUpdates){let $e=Le.data.subarray(pe*Pe/Le.data.BYTES_PER_ELEMENT,(pe+1)*Pe/Le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,pe,Le.width,Le.height,1,Ie,$e)}}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,Le.width,Le.height,fe.depth,Ie,Le.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ue,Ce,Le.width,Le.height,fe.depth,0,Le.data,0,0);else ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else st?X&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ue,0,0,0,Le.width,Le.height,fe.depth,Ie,je,Le.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ue,Ce,Le.width,Le.height,fe.depth,0,Ie,je,Le.data);_.layerUpdates.size>0&&_.clearLayerUpdates()}else{st&&at&&t.texStorage2D(n.TEXTURE_2D,be,Ce,Qe[0].width,Qe[0].height);for(let ue=0,Te=Qe.length;ue<Te;ue++)Le=Qe[ue],_.format!==rn?Ie!==null?st?X&&t.compressedTexSubImage2D(n.TEXTURE_2D,ue,0,0,Le.width,Le.height,Ie,Le.data):t.compressedTexImage2D(n.TEXTURE_2D,ue,Ce,Le.width,Le.height,0,Le.data):ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):st?X&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,Le.width,Le.height,Ie,je,Le.data):t.texImage2D(n.TEXTURE_2D,ue,Ce,Le.width,Le.height,0,Ie,je,Le.data)}else if(_.isDataArrayTexture)if(st){if(at&&t.texStorage3D(n.TEXTURE_2D_ARRAY,be,Ce,fe.width,fe.height,fe.depth),X)if(_.layerUpdates.size>0){let ue=Kd(fe.width,fe.height,_.format,_.type);for(let Te of _.layerUpdates){let Pe=fe.data.subarray(Te*ue/fe.data.BYTES_PER_ELEMENT,(Te+1)*ue/fe.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,Te,fe.width,fe.height,1,Ie,je,Pe)}_.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,fe.width,fe.height,fe.depth,Ie,je,fe.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,Ce,fe.width,fe.height,fe.depth,0,Ie,je,fe.data);else if(_.isData3DTexture)st?(at&&t.texStorage3D(n.TEXTURE_3D,be,Ce,fe.width,fe.height,fe.depth),X&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,fe.width,fe.height,fe.depth,Ie,je,fe.data)):t.texImage3D(n.TEXTURE_3D,0,Ce,fe.width,fe.height,fe.depth,0,Ie,je,fe.data);else if(_.isFramebufferTexture){if(at)if(st)t.texStorage2D(n.TEXTURE_2D,be,Ce,fe.width,fe.height);else{let ue=fe.width,Te=fe.height;for(let Pe=0;Pe<be;Pe++)t.texImage2D(n.TEXTURE_2D,Pe,Ce,ue,Te,0,Ie,je,null),ue>>=1,Te>>=1}}else if(_.isHTMLTexture){if("texElementImage2D"in n){let ue=n.canvas;if(ue.hasAttribute("layoutsubtree")||ue.setAttribute("layoutsubtree","true"),fe.parentNode!==ue){ue.appendChild(fe),h.add(_),ue.onpaint=Te=>{let Pe=Te.changedElements;for(let pe of h)Pe.includes(pe.image)&&(pe.needsUpdate=!0)},ue.requestPaint();return}if(n.texElementImage2D.length===3)n.texElementImage2D(n.TEXTURE_2D,n.RGBA8,fe);else{let Pe=n.RGBA,pe=n.RGBA,$e=n.UNSIGNED_BYTE;n.texElementImage2D(n.TEXTURE_2D,0,Pe,pe,$e,fe)}n.texParameteri(n.TEXTURE_2D,n.TEXTURE_MIN_FILTER,n.LINEAR),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_S,n.CLAMP_TO_EDGE),n.texParameteri(n.TEXTURE_2D,n.TEXTURE_WRAP_T,n.CLAMP_TO_EDGE)}}else if(Qe.length>0){if(st&&at){let ue=Ae(Qe[0]);t.texStorage2D(n.TEXTURE_2D,be,Ce,ue.width,ue.height)}for(let ue=0,Te=Qe.length;ue<Te;ue++)Le=Qe[ue],st?X&&t.texSubImage2D(n.TEXTURE_2D,ue,0,0,Ie,je,Le):t.texImage2D(n.TEXTURE_2D,ue,Ce,Ie,je,Le);_.generateMipmaps=!1}else if(st){if(at){let ue=Ae(fe);t.texStorage2D(n.TEXTURE_2D,be,Ce,ue.width,ue.height)}X&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,Ie,je,fe)}else t.texImage2D(n.TEXTURE_2D,0,Ce,Ie,je,fe);g(_)&&A(O),ye.__version=de.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function ve(b,_,L){if(_.image.length!==6)return;let O=qe(b,_),ee=_.source;t.bindTexture(n.TEXTURE_CUBE_MAP,b.__webglTexture,n.TEXTURE0+L);let de=i.get(ee);if(ee.version!==de.__version||O===!0){t.activeTexture(n.TEXTURE0+L);let ye=bt.getPrimaries(bt.workingColorSpace),ae=_.colorSpace===Zn?null:bt.getPrimaries(_.colorSpace),fe=_.colorSpace===Zn||ye===ae?n.NONE:n.BROWSER_DEFAULT_WEBGL;t.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,_.flipY),t.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,_.premultiplyAlpha),t.pixelStorei(n.UNPACK_ALIGNMENT,_.unpackAlignment),t.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,fe);let Ie=_.isCompressedTexture||_.image[0].isCompressedTexture,je=_.image[0]&&_.image[0].isDataTexture,Ce=[];for(let pe=0;pe<6;pe++)!Ie&&!je?Ce[pe]=p(_.image[pe],!0,s.maxCubemapSize):Ce[pe]=je?_.image[pe].image:_.image[pe],Ce[pe]=se(_,Ce[pe]);let Le=Ce[0],Qe=r.convert(_.format,_.colorSpace),st=r.convert(_.type),at=v(_.internalFormat,Qe,st,_.normalized,_.colorSpace),X=_.isVideoTexture!==!0,be=de.__version===void 0||O===!0,ue=ee.dataReady,Te=M(_,Le);Ne(n.TEXTURE_CUBE_MAP,_);let Pe;if(Ie){X&&be&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Te,at,Le.width,Le.height);for(let pe=0;pe<6;pe++){Pe=Ce[pe].mipmaps;for(let $e=0;$e<Pe.length;$e++){let ze=Pe[$e];_.format!==rn?Qe!==null?X?ue&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,$e,0,0,ze.width,ze.height,Qe,ze.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,$e,at,ze.width,ze.height,0,ze.data):ot("WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):X?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,$e,0,0,ze.width,ze.height,Qe,st,ze.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,$e,at,ze.width,ze.height,0,Qe,st,ze.data)}}}else{if(Pe=_.mipmaps,X&&be){Pe.length>0&&Te++;let pe=Ae(Ce[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Te,at,pe.width,pe.height)}for(let pe=0;pe<6;pe++)if(je){X?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,Ce[pe].width,Ce[pe].height,Qe,st,Ce[pe].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,at,Ce[pe].width,Ce[pe].height,0,Qe,st,Ce[pe].data);for(let $e=0;$e<Pe.length;$e++){let ut=Pe[$e].image[pe].image;X?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,$e+1,0,0,ut.width,ut.height,Qe,st,ut.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,$e+1,at,ut.width,ut.height,0,Qe,st,ut.data)}}else{X?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,0,0,Qe,st,Ce[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,0,at,Qe,st,Ce[pe]);for(let $e=0;$e<Pe.length;$e++){let ze=Pe[$e];X?ue&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,$e+1,0,0,Qe,st,ze.image[pe]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+pe,$e+1,at,Qe,st,ze.image[pe])}}}g(_)&&A(n.TEXTURE_CUBE_MAP),de.__version=ee.version,_.onUpdate&&_.onUpdate(_)}b.__version=_.version}function ge(b,_,L,O,ee,de){let ye=r.convert(L.format,L.colorSpace),ae=r.convert(L.type),fe=v(L.internalFormat,ye,ae,L.normalized,L.colorSpace),Ie=i.get(_),je=i.get(L);if(je.__renderTarget=_,!Ie.__hasExternalTextures){let Ce=Math.max(1,_.width>>de),Le=Math.max(1,_.height>>de);ee===n.TEXTURE_3D||ee===n.TEXTURE_2D_ARRAY?t.texImage3D(ee,de,fe,Ce,Le,_.depth,0,ye,ae,null):t.texImage2D(ee,de,fe,Ce,Le,0,ye,ae,null)}t.bindFramebuffer(n.FRAMEBUFFER,b),Oe(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,O,ee,je.__webglTexture,0,Ue(_)):(ee===n.TEXTURE_2D||ee>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ee<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,O,ee,je.__webglTexture,de),t.bindFramebuffer(n.FRAMEBUFFER,null)}function Be(b,_,L){if(n.bindRenderbuffer(n.RENDERBUFFER,b),_.depthBuffer){let O=_.depthTexture,ee=O&&O.isDepthTexture?O.type:null,de=w(_.stencilBuffer,ee),ye=_.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;Oe(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ue(_),de,_.width,_.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ue(_),de,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,de,_.width,_.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ye,n.RENDERBUFFER,b)}else{let O=_.textures;for(let ee=0;ee<O.length;ee++){let de=O[ee],ye=r.convert(de.format,de.colorSpace),ae=r.convert(de.type),fe=v(de.internalFormat,ye,ae,de.normalized,de.colorSpace);Oe(_)?o.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Ue(_),fe,_.width,_.height):L?n.renderbufferStorageMultisample(n.RENDERBUFFER,Ue(_),fe,_.width,_.height):n.renderbufferStorage(n.RENDERBUFFER,fe,_.width,_.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function Je(b,_,L){let O=_.isWebGLCubeRenderTarget===!0;if(t.bindFramebuffer(n.FRAMEBUFFER,b),!(_.depthTexture&&_.depthTexture.isDepthTexture))throw new Error("THREE.WebGLTextures: renderTarget.depthTexture must be an instance of THREE.DepthTexture.");let ee=i.get(_.depthTexture);if(ee.__renderTarget=_,(!ee.__webglTexture||_.depthTexture.image.width!==_.width||_.depthTexture.image.height!==_.height)&&(_.depthTexture.image.width=_.width,_.depthTexture.image.height=_.height,_.depthTexture.needsUpdate=!0),O){if(ee.__webglInit===void 0&&(ee.__webglInit=!0,_.depthTexture.addEventListener("dispose",E)),ee.__webglTexture===void 0){ee.__webglTexture=n.createTexture(),t.bindTexture(n.TEXTURE_CUBE_MAP,ee.__webglTexture),Ne(n.TEXTURE_CUBE_MAP,_.depthTexture);let Ie=r.convert(_.depthTexture.format),je=r.convert(_.depthTexture.type),Ce;_.depthTexture.format===wi?Ce=n.DEPTH_COMPONENT24:_.depthTexture.format===Ms&&(Ce=n.DEPTH24_STENCIL8);for(let Le=0;Le<6;Le++)n.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+Le,0,Ce,_.width,_.height,0,Ie,je,null)}}else oe(_.depthTexture,0);let de=ee.__webglTexture,ye=Ue(_),ae=O?n.TEXTURE_CUBE_MAP_POSITIVE_X+L:n.TEXTURE_2D,fe=_.depthTexture.format===Ms?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;if(_.depthTexture.format===wi)Oe(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,fe,ae,de,0,ye):n.framebufferTexture2D(n.FRAMEBUFFER,fe,ae,de,0);else if(_.depthTexture.format===Ms)Oe(_)?o.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,fe,ae,de,0,ye):n.framebufferTexture2D(n.FRAMEBUFFER,fe,ae,de,0);else throw new Error("THREE.WebGLTextures: Unknown depthTexture format.")}function De(b){let _=i.get(b),L=b.isWebGLCubeRenderTarget===!0;if(_.__boundDepthTexture!==b.depthTexture){let O=b.depthTexture;if(_.__depthDisposeCallback&&_.__depthDisposeCallback(),O){let ee=()=>{delete _.__boundDepthTexture,delete _.__depthDisposeCallback,O.removeEventListener("dispose",ee)};O.addEventListener("dispose",ee),_.__depthDisposeCallback=ee}_.__boundDepthTexture=O}if(b.depthTexture&&!_.__autoAllocateDepthBuffer)if(L)for(let O=0;O<6;O++)Je(_.__webglFramebuffer[O],b,O);else{let O=b.texture.mipmaps;O&&O.length>0?Je(_.__webglFramebuffer[0],b,0):Je(_.__webglFramebuffer,b,0)}else if(L){_.__webglDepthbuffer=[];for(let O=0;O<6;O++)if(t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[O]),_.__webglDepthbuffer[O]===void 0)_.__webglDepthbuffer[O]=n.createRenderbuffer(),Be(_.__webglDepthbuffer[O],b,!1);else{let ee=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=_.__webglDepthbuffer[O];n.bindRenderbuffer(n.RENDERBUFFER,de),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,de)}}else{let O=b.texture.mipmaps;if(O&&O.length>0?t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,_.__webglFramebuffer),_.__webglDepthbuffer===void 0)_.__webglDepthbuffer=n.createRenderbuffer(),Be(_.__webglDepthbuffer,b,!1);else{let ee=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,de=_.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,de),n.framebufferRenderbuffer(n.FRAMEBUFFER,ee,n.RENDERBUFFER,de)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function We(b,_,L){let O=i.get(b);_!==void 0&&ge(O.__webglFramebuffer,b,b.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),L!==void 0&&De(b)}function it(b){let _=b.texture,L=i.get(b),O=i.get(_);b.addEventListener("dispose",y);let ee=b.textures,de=b.isWebGLCubeRenderTarget===!0,ye=ee.length>1;if(ye||(O.__webglTexture===void 0&&(O.__webglTexture=n.createTexture()),O.__version=_.version,a.memory.textures++),de){L.__webglFramebuffer=[];for(let ae=0;ae<6;ae++)if(_.mipmaps&&_.mipmaps.length>0){L.__webglFramebuffer[ae]=[];for(let fe=0;fe<_.mipmaps.length;fe++)L.__webglFramebuffer[ae][fe]=n.createFramebuffer()}else L.__webglFramebuffer[ae]=n.createFramebuffer()}else{if(_.mipmaps&&_.mipmaps.length>0){L.__webglFramebuffer=[];for(let ae=0;ae<_.mipmaps.length;ae++)L.__webglFramebuffer[ae]=n.createFramebuffer()}else L.__webglFramebuffer=n.createFramebuffer();if(ye)for(let ae=0,fe=ee.length;ae<fe;ae++){let Ie=i.get(ee[ae]);Ie.__webglTexture===void 0&&(Ie.__webglTexture=n.createTexture(),a.memory.textures++)}if(b.samples>0&&Oe(b)===!1){L.__webglMultisampledFramebuffer=n.createFramebuffer(),L.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,L.__webglMultisampledFramebuffer);for(let ae=0;ae<ee.length;ae++){let fe=ee[ae];L.__webglColorRenderbuffer[ae]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,L.__webglColorRenderbuffer[ae]);let Ie=r.convert(fe.format,fe.colorSpace),je=r.convert(fe.type),Ce=v(fe.internalFormat,Ie,je,fe.normalized,fe.colorSpace,b.isXRRenderTarget===!0),Le=Ue(b);n.renderbufferStorageMultisample(n.RENDERBUFFER,Le,Ce,b.width,b.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+ae,n.RENDERBUFFER,L.__webglColorRenderbuffer[ae])}n.bindRenderbuffer(n.RENDERBUFFER,null),b.depthBuffer&&(L.__webglDepthRenderbuffer=n.createRenderbuffer(),Be(L.__webglDepthRenderbuffer,b,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(de){t.bindTexture(n.TEXTURE_CUBE_MAP,O.__webglTexture),Ne(n.TEXTURE_CUBE_MAP,_);for(let ae=0;ae<6;ae++)if(_.mipmaps&&_.mipmaps.length>0)for(let fe=0;fe<_.mipmaps.length;fe++)ge(L.__webglFramebuffer[ae][fe],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,fe);else ge(L.__webglFramebuffer[ae],b,_,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+ae,0);g(_)&&A(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ye){for(let ae=0,fe=ee.length;ae<fe;ae++){let Ie=ee[ae],je=i.get(Ie),Ce=n.TEXTURE_2D;(b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(Ce=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(Ce,je.__webglTexture),Ne(Ce,Ie),ge(L.__webglFramebuffer,b,Ie,n.COLOR_ATTACHMENT0+ae,Ce,0),g(Ie)&&A(Ce)}t.unbindTexture()}else{let ae=n.TEXTURE_2D;if((b.isWebGL3DRenderTarget||b.isWebGLArrayRenderTarget)&&(ae=b.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(ae,O.__webglTexture),Ne(ae,_),_.mipmaps&&_.mipmaps.length>0)for(let fe=0;fe<_.mipmaps.length;fe++)ge(L.__webglFramebuffer[fe],b,_,n.COLOR_ATTACHMENT0,ae,fe);else ge(L.__webglFramebuffer,b,_,n.COLOR_ATTACHMENT0,ae,0);g(_)&&A(ae),t.unbindTexture()}b.depthBuffer&&De(b)}function Ke(b){let _=b.textures;for(let L=0,O=_.length;L<O;L++){let ee=_[L];if(g(ee)){let de=R(b),ye=i.get(ee).__webglTexture;t.bindTexture(de,ye),A(de),t.unbindTexture()}}}let Ye=[],he=[];function we(b){if(b.samples>0){if(Oe(b)===!1){let _=b.textures,L=b.width,O=b.height,ee=n.COLOR_BUFFER_BIT,de=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ye=i.get(b),ae=_.length>1;if(ae)for(let Ie=0;Ie<_.length;Ie++)t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ye.__webglMultisampledFramebuffer);let fe=b.texture.mipmaps;fe&&fe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglFramebuffer);for(let Ie=0;Ie<_.length;Ie++){if(b.resolveDepthBuffer&&(b.depthBuffer&&(ee|=n.DEPTH_BUFFER_BIT),b.stencilBuffer&&b.resolveStencilBuffer&&(ee|=n.STENCIL_BUFFER_BIT)),ae){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ye.__webglColorRenderbuffer[Ie]);let je=i.get(_[Ie]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,je,0)}n.blitFramebuffer(0,0,L,O,0,0,L,O,ee,n.NEAREST),l===!0&&(Ye.length=0,he.length=0,Ye.push(n.COLOR_ATTACHMENT0+Ie),b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&(Ye.push(de),he.push(de),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,he)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Ye))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),ae)for(let Ie=0;Ie<_.length;Ie++){t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.RENDERBUFFER,ye.__webglColorRenderbuffer[Ie]);let je=i.get(_[Ie]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ye.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Ie,n.TEXTURE_2D,je,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ye.__webglMultisampledFramebuffer)}else if(b.depthBuffer&&b.storeMultisampledDepthBuffer===!1&&l){let _=b.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[_])}}}function Ue(b){return Math.min(s.maxSamples,b.samples)}function Oe(b){let _=i.get(b);return b.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&_.__useRenderToTexture!==!1}function V(b){let _=a.render.frame;u.get(b)!==_&&(u.set(b,_),b.update())}function se(b,_){let L=b.colorSpace,O=b.format,ee=b.type;return b.isCompressedTexture===!0||b.isVideoTexture===!0||L!==Qa&&L!==Zn&&(bt.getTransfer(L)===At?(O!==rn||ee!==Jt)&&ot("WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):lt("WebGLTextures: Unsupported texture color space:",L)),_}function Ae(b){return typeof HTMLImageElement<"u"&&b instanceof HTMLImageElement?(c.width=b.naturalWidth||b.width,c.height=b.naturalHeight||b.height):typeof VideoFrame<"u"&&b instanceof VideoFrame?(c.width=b.displayWidth,c.height=b.displayHeight):(c.width=b.width,c.height=b.height),c}this.allocateTextureUnit=K,this.resetTextureUnits=z,this.getTextureUnits=F,this.setTextureUnits=q,this.setTexture2D=oe,this.setTexture2DArray=j,this.setTexture3D=le,this.setTextureCube=ce,this.rebindTextures=We,this.setupRenderTarget=it,this.updateRenderTargetMipmap=Ke,this.updateMultisampleRenderTarget=we,this.setupDepthRenderbuffer=De,this.setupFrameBufferTexture=ge,this.useMultisampledRTT=Oe,this.isReversedDepthBuffer=function(){return t.buffers.depth.getReversed()}}function Cb(n,e){function t(i,s=Zn){let r,a=bt.getTransfer(s);if(i===Jt)return n.UNSIGNED_BYTE;if(i===dc)return n.UNSIGNED_SHORT_4_4_4_4;if(i===hc)return n.UNSIGNED_SHORT_5_5_5_1;if(i===Vd)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===Hd)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===Bd)return n.BYTE;if(i===zd)return n.SHORT;if(i===qr)return n.UNSIGNED_SHORT;if(i===uc)return n.INT;if(i===pi)return n.UNSIGNED_INT;if(i===mi)return n.FLOAT;if(i===gi)return n.HALF_FLOAT;if(i===Gd)return n.ALPHA;if(i===Wd)return n.RGB;if(i===rn)return n.RGBA;if(i===wi)return n.DEPTH_COMPONENT;if(i===Ms)return n.DEPTH_STENCIL;if(i===$s)return n.RED;if(i===fc)return n.RED_INTEGER;if(i===ws)return n.RG;if(i===pc)return n.RG_INTEGER;if(i===mc)return n.RGBA_INTEGER;if(i===To||i===Ao||i===Co||i===Ro)if(a===At)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(i===To)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Ao)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Co)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Ro)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(i===To)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Ao)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Co)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Ro)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===gc||i===_c||i===xc||i===yc)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(i===gc)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===_c)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===xc)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===yc)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===vc||i===bc||i===Sc||i===Mc||i===wc||i===Po||i===Ec)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(i===vc||i===bc)return a===At?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(i===Sc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC;if(i===Mc)return r.COMPRESSED_R11_EAC;if(i===wc)return r.COMPRESSED_SIGNED_R11_EAC;if(i===Po)return r.COMPRESSED_RG11_EAC;if(i===Ec)return r.COMPRESSED_SIGNED_RG11_EAC}else return null;if(i===Tc||i===Ac||i===Cc||i===Rc||i===Pc||i===Lc||i===Ic||i===Dc||i===Nc||i===Uc||i===Fc||i===Oc||i===kc||i===Bc)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(i===Tc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Ac)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===Cc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===Rc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===Pc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===Lc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===Ic)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===Dc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===Nc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===Uc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===Fc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===Oc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===kc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===Bc)return a===At?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===zc||i===Vc||i===Hc)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(i===zc)return a===At?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===Vc)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===Hc)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===Gc||i===Wc||i===Lo||i===jc)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(i===Gc)return r.COMPRESSED_RED_RGTC1_EXT;if(i===Wc)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===Lo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===jc)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===Yr?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var Rb=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Pb=`
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

}`,hh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new uo(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new Nt({vertexShader:Rb,fragmentShader:Pb,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new Vt(new ho(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},fh=class extends Ei{constructor(e,t){super();let i=this,s=null,r=1,a=null,o="local-floor",l=1,c=null,u=null,h=null,d=null,f=null,m=null,x=typeof XRWebGLBinding<"u",p=new hh,g={},A=t.getContextAttributes(),R=null,v=null,w=[],M=[],E=new nt,y=null,T=null,P=new _n;P.viewport=new yt;let k=new _n;k.viewport=new yt;let U=[P,k],z=new rc,F=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(H){let W=w[H];return W===void 0&&(W=new Or,w[H]=W),W.getTargetRaySpace()},this.getControllerGrip=function(H){let W=w[H];return W===void 0&&(W=new Or,w[H]=W),W.getGripSpace()},this.getHand=function(H){let W=w[H];return W===void 0&&(W=new Or,w[H]=W),W.getHandSpace()};function K(H){let W=M.indexOf(H.inputSource);if(W===-1)return;let _e=w[W];_e!==void 0&&(_e.update(H.inputSource,H.frame,c||a),_e.dispatchEvent({type:H.type,data:H.inputSource}))}function ne(){s.removeEventListener("select",K),s.removeEventListener("selectstart",K),s.removeEventListener("selectend",K),s.removeEventListener("squeeze",K),s.removeEventListener("squeezestart",K),s.removeEventListener("squeezeend",K),s.removeEventListener("end",ne),s.removeEventListener("inputsourceschange",oe);for(let H=0;H<w.length;H++){let W=M[H];W!==null&&(M[H]=null,w[H].disconnect(W))}F=null,q=null,p.reset();for(let H in g)delete g[H];if(e.setRenderTarget(R),f=null,d=null,h=null,s=null,v=null,qe.stop(),i.isPresenting=!1,e.setPixelRatio(y),e.setSize(E.width,E.height,!1),T!==null){let H=T.camera;H.fov=T.fov,H.zoom=T.zoom,H.updateProjectionMatrix(),T=null}i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(H){r=H,i.isPresenting===!0&&ot("WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(H){o=H,i.isPresenting===!0&&ot("WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(H){c=H},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return h===null&&x&&(h=new XRWebGLBinding(s,t)),h},this.getFrame=function(){return m},this.getSession=function(){return s},this.setSession=async function(H){if(s=H,s!==null){if(R=e.getRenderTarget(),s.addEventListener("select",K),s.addEventListener("selectstart",K),s.addEventListener("selectend",K),s.addEventListener("squeeze",K),s.addEventListener("squeezestart",K),s.addEventListener("squeezeend",K),s.addEventListener("end",ne),s.addEventListener("inputsourceschange",oe),A.xrCompatible!==!0&&await t.makeXRCompatible(),y=e.getPixelRatio(),e.getSize(E),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let _e=null,ve=null,ge=null;A.depth&&(ge=A.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,_e=A.stencil?Ms:wi,ve=A.stencil?Yr:pi);let Be={colorFormat:t.RGBA8,depthFormat:ge,scaleFactor:r};h=this.getBinding(),d=h.createProjectionLayer(Be),s.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),v=new Pn(d.textureWidth,d.textureHeight,{format:rn,type:Jt,depthTexture:new _s(d.textureWidth,d.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,_e),stencilBuffer:A.stencil,colorSpace:e.outputColorSpace,samples:A.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1,storeMultisampledDepthBuffer:d.ignoreDepthValues===!1,storeMultisampledStencilBuffer:d.ignoreDepthValues===!1})}else{let _e={antialias:A.antialias,alpha:!0,depth:A.depth,stencil:A.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(s,t,_e),s.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),v=new Pn(f.framebufferWidth,f.framebufferHeight,{format:rn,type:Jt,colorSpace:e.outputColorSpace,stencilBuffer:A.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1,storeMultisampledDepthBuffer:f.ignoreDepthValues===!1,storeMultisampledStencilBuffer:f.ignoreDepthValues===!1})}v.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await s.requestReferenceSpace(o),qe.setContext(s),qe.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(s!==null)return s.environmentBlendMode},this.getDepthTexture=function(){return p.getDepthTexture()};function oe(H){for(let W=0;W<H.removed.length;W++){let _e=H.removed[W],ve=M.indexOf(_e);ve>=0&&(M[ve]=null,w[ve].disconnect(_e))}for(let W=0;W<H.added.length;W++){let _e=H.added[W],ve=M.indexOf(_e);if(ve===-1){for(let Be=0;Be<w.length;Be++)if(Be>=M.length){M.push(_e),ve=Be;break}else if(M[Be]===null){M[Be]=_e,ve=Be;break}if(ve===-1)break}let ge=w[ve];ge&&ge.connect(_e)}}let j=new Y,le=new Y;function ce(H,W,_e){j.setFromMatrixPosition(W.matrixWorld),le.setFromMatrixPosition(_e.matrixWorld);let ve=j.distanceTo(le),ge=W.projectionMatrix.elements,Be=_e.projectionMatrix.elements,Je=ge[14]/(ge[10]-1),De=ge[14]/(ge[10]+1),We=(ge[9]+1)/ge[5],it=(ge[9]-1)/ge[5],Ke=(ge[8]-1)/ge[0],Ye=(Be[8]+1)/Be[0],he=Je*Ke,we=Je*Ye,Ue=ve/(-Ke+Ye),Oe=Ue*-Ke;if(W.matrixWorld.decompose(H.position,H.quaternion,H.scale),H.translateX(Oe),H.translateZ(Ue),H.matrixWorld.compose(H.position,H.quaternion,H.scale),H.matrixWorldInverse.copy(H.matrixWorld).invert(),ge[10]===-1)H.projectionMatrix.copy(W.projectionMatrix),H.projectionMatrixInverse.copy(W.projectionMatrixInverse);else{let V=Je+Ue,se=De+Ue,Ae=he-Oe,b=we+(ve-Oe),_=We*De/se*V,L=it*De/se*V;H.projectionMatrix.makePerspective(Ae,b,_,L,V,se),H.projectionMatrixInverse.copy(H.projectionMatrix).invert()}}function re(H,W){W===null?H.matrixWorld.copy(H.matrix):H.matrixWorld.multiplyMatrices(W.matrixWorld,H.matrix),H.matrixWorldInverse.copy(H.matrixWorld).invert()}this.updateCamera=function(H){if(s===null)return;let W=H.near,_e=H.far;p.texture!==null&&(p.depthNear>0&&(W=p.depthNear),p.depthFar>0&&(_e=p.depthFar)),z.near=k.near=P.near=W,z.far=k.far=P.far=_e,(F!==z.near||q!==z.far)&&(s.updateRenderState({depthNear:z.near,depthFar:z.far}),F=z.near,q=z.far),z.layers.mask=H.layers.mask|6,P.layers.mask=z.layers.mask&-5,k.layers.mask=z.layers.mask&-3;let ve=H.parent,ge=z.cameras;re(z,ve);for(let Be=0;Be<ge.length;Be++)re(ge[Be],ve);ge.length===2?ce(z,P,k):z.projectionMatrix.copy(P.projectionMatrix),T===null&&H.isPerspectiveCamera&&(T={camera:H,fov:H.fov,zoom:H.zoom}),xe(H,z,ve)};function xe(H,W,_e){_e===null?H.matrix.copy(W.matrixWorld):(H.matrix.copy(_e.matrixWorld),H.matrix.invert(),H.matrix.multiply(W.matrixWorld)),H.matrix.decompose(H.position,H.quaternion,H.scale),H.updateMatrixWorld(!0),H.projectionMatrix.copy(W.projectionMatrix),H.projectionMatrixInverse.copy(W.projectionMatrixInverse),H.isPerspectiveCamera&&(H.fov=Ur*2*Math.atan(1/H.projectionMatrix.elements[5]),H.zoom=1)}this.getCamera=function(){return z},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(H){l=H,d!==null&&(d.fixedFoveation=H),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=H)},this.hasDepthSensing=function(){return p.texture!==null},this.getDepthSensingMesh=function(){return p.getMesh(z)},this.getCameraTexture=function(H){return g[H]};let Xe=null;function Ne(H,W){if(u=W.getViewerPose(c||a),m=W,u!==null){let _e=u.views;f!==null&&(e.setRenderTargetFramebuffer(v,f.framebuffer),e.setRenderTarget(v));let ve=!1;_e.length!==z.cameras.length&&(z.cameras.length=0,ve=!0);for(let De=0;De<_e.length;De++){let We=_e[De],it=null;if(f!==null)it=f.getViewport(We);else{let Ye=h.getViewSubImage(d,We);it=Ye.viewport,De===0&&(e.setRenderTargetTextures(v,Ye.colorTexture,Ye.depthStencilTexture),e.setRenderTarget(v))}let Ke=U[De];Ke===void 0&&(Ke=new _n,Ke.layers.enable(De),Ke.viewport=new yt,U[De]=Ke),Ke.matrix.fromArray(We.transform.matrix),Ke.matrix.decompose(Ke.position,Ke.quaternion,Ke.scale),Ke.projectionMatrix.fromArray(We.projectionMatrix),Ke.projectionMatrixInverse.copy(Ke.projectionMatrix).invert(),Ke.viewport.set(it.x,it.y,it.width,it.height),De===0&&(z.matrix.copy(Ke.matrix),z.matrix.decompose(z.position,z.quaternion,z.scale)),ve===!0&&z.cameras.push(Ke)}let ge=s.enabledFeatures;if(ge&&ge.includes("depth-sensing")&&s.depthUsage=="gpu-optimized"&&x){h=i.getBinding();let De=h.getDepthInformation(_e[0]);De&&De.isValid&&De.texture&&p.init(De,s.renderState)}if(ge&&ge.includes("camera-access")&&x){e.state.unbindTexture(),h=i.getBinding();for(let De=0;De<_e.length;De++){let We=_e[De].camera;if(We){let it=g[We];it||(it=new uo,g[We]=it);let Ke=h.getCameraImage(We);it.sourceTexture=Ke}}}}for(let _e=0;_e<w.length;_e++){let ve=M[_e],ge=w[_e];ve!==null&&ge!==void 0&&ge.update(ve,W,c||a)}Xe&&Xe(H,W),W.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:W}),m=null}let qe=new cm;qe.setAnimationLoop(Ne),this.setAnimationLoop=function(H){Xe=H},this.dispose=function(){}}},Lb=new Mt,mm=new ct;mm.set(-1,0,0,0,1,0,0,0,1);function Ib(n,e){function t(p,g){p.matrixAutoUpdate===!0&&p.updateMatrix(),g.value.copy(p.matrix)}function i(p,g){g.color.getRGB(p.fogColor.value,$d(n)),g.isFog?(p.fogNear.value=g.near,p.fogFar.value=g.far):g.isFogExp2&&(p.fogDensity.value=g.density)}function s(p,g,A,R,v){g.isNodeMaterial?g.uniformsNeedUpdate=!1:g.isMeshBasicMaterial?r(p,g):g.isMeshLambertMaterial?(r(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshToonMaterial?(r(p,g),h(p,g)):g.isMeshPhongMaterial?(r(p,g),u(p,g),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)):g.isMeshStandardMaterial?(r(p,g),d(p,g),g.isMeshPhysicalMaterial&&f(p,g,v)):g.isMeshMatcapMaterial?(r(p,g),m(p,g)):g.isMeshDepthMaterial?r(p,g):g.isMeshDistanceMaterial?(r(p,g),x(p,g)):g.isMeshNormalMaterial?r(p,g):g.isLineBasicMaterial?(a(p,g),g.isLineDashedMaterial&&o(p,g)):g.isPointsMaterial?l(p,g,A,R):g.isSpriteMaterial?c(p,g):g.isShadowMaterial?(p.color.value.copy(g.color),p.opacity.value=g.opacity):g.isShaderMaterial&&(g.uniformsNeedUpdate=!1)}function r(p,g){p.opacity.value=g.opacity,g.color&&p.diffuse.value.copy(g.color),g.emissive&&p.emissive.value.copy(g.emissive).multiplyScalar(g.emissiveIntensity),g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.bumpMap&&(p.bumpMap.value=g.bumpMap,t(g.bumpMap,p.bumpMapTransform),p.bumpScale.value=g.bumpScale,g.side===cn&&(p.bumpScale.value*=-1)),g.normalMap&&(p.normalMap.value=g.normalMap,t(g.normalMap,p.normalMapTransform),p.normalScale.value.copy(g.normalScale),g.side===cn&&p.normalScale.value.negate()),g.displacementMap&&(p.displacementMap.value=g.displacementMap,t(g.displacementMap,p.displacementMapTransform),p.displacementScale.value=g.displacementScale,p.displacementBias.value=g.displacementBias),g.emissiveMap&&(p.emissiveMap.value=g.emissiveMap,t(g.emissiveMap,p.emissiveMapTransform)),g.specularMap&&(p.specularMap.value=g.specularMap,t(g.specularMap,p.specularMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest);let A=e.get(g),R=A.envMap,v=A.envMapRotation;R&&(p.envMap.value=R,p.envMapRotation.value.setFromMatrix4(Lb.makeRotationFromEuler(v)).transpose(),R.isCubeTexture&&R.isRenderTargetTexture===!1&&p.envMapRotation.value.premultiply(mm),p.reflectivity.value=g.reflectivity,p.ior.value=g.ior,p.refractionRatio.value=g.refractionRatio),g.lightMap&&(p.lightMap.value=g.lightMap,p.lightMapIntensity.value=g.lightMapIntensity,t(g.lightMap,p.lightMapTransform)),g.aoMap&&(p.aoMap.value=g.aoMap,p.aoMapIntensity.value=g.aoMapIntensity,t(g.aoMap,p.aoMapTransform))}function a(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform))}function o(p,g){p.dashSize.value=g.dashSize,p.totalSize.value=g.dashSize+g.gapSize,p.scale.value=g.scale}function l(p,g,A,R){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.size.value=g.size*A,p.scale.value=R*.5,g.map&&(p.map.value=g.map,t(g.map,p.uvTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function c(p,g){p.diffuse.value.copy(g.color),p.opacity.value=g.opacity,p.rotation.value=g.rotation,g.map&&(p.map.value=g.map,t(g.map,p.mapTransform)),g.alphaMap&&(p.alphaMap.value=g.alphaMap,t(g.alphaMap,p.alphaMapTransform)),g.alphaTest>0&&(p.alphaTest.value=g.alphaTest)}function u(p,g){p.specular.value.copy(g.specular),p.shininess.value=Math.max(g.shininess,1e-4)}function h(p,g){g.gradientMap&&(p.gradientMap.value=g.gradientMap)}function d(p,g){p.metalness.value=g.metalness,g.metalnessMap&&(p.metalnessMap.value=g.metalnessMap,t(g.metalnessMap,p.metalnessMapTransform)),p.roughness.value=g.roughness,g.roughnessMap&&(p.roughnessMap.value=g.roughnessMap,t(g.roughnessMap,p.roughnessMapTransform)),g.envMap&&(p.envMapIntensity.value=g.envMapIntensity)}function f(p,g,A){p.ior.value=g.ior,g.sheen>0&&(p.sheenColor.value.copy(g.sheenColor).multiplyScalar(g.sheen),p.sheenRoughness.value=g.sheenRoughness,g.sheenColorMap&&(p.sheenColorMap.value=g.sheenColorMap,t(g.sheenColorMap,p.sheenColorMapTransform)),g.sheenRoughnessMap&&(p.sheenRoughnessMap.value=g.sheenRoughnessMap,t(g.sheenRoughnessMap,p.sheenRoughnessMapTransform))),g.clearcoat>0&&(p.clearcoat.value=g.clearcoat,p.clearcoatRoughness.value=g.clearcoatRoughness,g.clearcoatMap&&(p.clearcoatMap.value=g.clearcoatMap,t(g.clearcoatMap,p.clearcoatMapTransform)),g.clearcoatRoughnessMap&&(p.clearcoatRoughnessMap.value=g.clearcoatRoughnessMap,t(g.clearcoatRoughnessMap,p.clearcoatRoughnessMapTransform)),g.clearcoatNormalMap&&(p.clearcoatNormalMap.value=g.clearcoatNormalMap,t(g.clearcoatNormalMap,p.clearcoatNormalMapTransform),p.clearcoatNormalScale.value.copy(g.clearcoatNormalScale),g.side===cn&&p.clearcoatNormalScale.value.negate())),g.dispersion>0&&(p.dispersion.value=g.dispersion),g.retroreflectivity>0&&(p.retroreflectivity.value=g.retroreflectivity),g.iridescence>0&&(p.iridescence.value=g.iridescence,p.iridescenceIOR.value=g.iridescenceIOR,p.iridescenceThicknessMinimum.value=g.iridescenceThicknessRange[0],p.iridescenceThicknessMaximum.value=g.iridescenceThicknessRange[1],g.iridescenceMap&&(p.iridescenceMap.value=g.iridescenceMap,t(g.iridescenceMap,p.iridescenceMapTransform)),g.iridescenceThicknessMap&&(p.iridescenceThicknessMap.value=g.iridescenceThicknessMap,t(g.iridescenceThicknessMap,p.iridescenceThicknessMapTransform))),g.transmission>0&&(p.transmission.value=g.transmission,p.transmissionSamplerMap.value=A.texture,p.transmissionSamplerSize.value.set(A.width,A.height),g.transmissionMap&&(p.transmissionMap.value=g.transmissionMap,t(g.transmissionMap,p.transmissionMapTransform)),p.thickness.value=g.thickness,g.thicknessMap&&(p.thicknessMap.value=g.thicknessMap,t(g.thicknessMap,p.thicknessMapTransform)),p.attenuationDistance.value=g.attenuationDistance,p.attenuationColor.value.copy(g.attenuationColor)),g.anisotropy>0&&(p.anisotropyVector.value.set(g.anisotropy*Math.cos(g.anisotropyRotation),g.anisotropy*Math.sin(g.anisotropyRotation)),g.anisotropyMap&&(p.anisotropyMap.value=g.anisotropyMap,t(g.anisotropyMap,p.anisotropyMapTransform))),p.specularIntensity.value=g.specularIntensity,p.specularColor.value.copy(g.specularColor),g.specularColorMap&&(p.specularColorMap.value=g.specularColorMap,t(g.specularColorMap,p.specularColorMapTransform)),g.specularIntensityMap&&(p.specularIntensityMap.value=g.specularIntensityMap,t(g.specularIntensityMap,p.specularIntensityMapTransform))}function m(p,g){g.matcap&&(p.matcap.value=g.matcap)}function x(p,g){let A=e.get(g).light;p.referencePosition.value.setFromMatrixPosition(A.matrixWorld),p.nearDistance.value=A.shadow.camera.near,p.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:s}}function Db(n,e,t,i){let s={},r={},a=[],o=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(v,w){let M=w.program;i.uniformBlockBinding(v,M)}function c(v,w){let M=s[v.id];M===void 0&&(p(v),M=u(v),s[v.id]=M,v.addEventListener("dispose",A));let E=w.program;i.updateUBOMapping(v,E);let y=e.render.frame;r[v.id]!==y&&(d(v),r[v.id]=y)}function u(v){let w=h();v.__bindingPointIndex=w;let M=n.createBuffer(),E=v.__size,y=v.usage;return n.bindBuffer(n.UNIFORM_BUFFER,M),n.bufferData(n.UNIFORM_BUFFER,E,y),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,w,M),M}function h(){for(let v=0;v<o;v++)if(a.indexOf(v)===-1)return a.push(v),v;return lt("WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(v){let w=s[v.id],M=v.uniforms,E=v.__cache;n.bindBuffer(n.UNIFORM_BUFFER,w);for(let y=0,T=M.length;y<T;y++){let P=M[y];if(Array.isArray(P))for(let k=0,U=P.length;k<U;k++)f(P[k],y,k,E);else f(P,y,0,E)}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(v,w,M,E){if(x(v,w,M,E)===!0){let y=v.__offset,T=v.value;if(Array.isArray(T)){let P=0;for(let k=0;k<T.length;k++){let U=T[k],z=g(U);m(U,v.__data,P),typeof U!="number"&&typeof U!="boolean"&&!U.isMatrix3&&!ArrayBuffer.isView(U)&&(P+=z.storage/Float32Array.BYTES_PER_ELEMENT)}}else m(T,v.__data,0);n.bufferSubData(n.UNIFORM_BUFFER,y,v.__data)}}function m(v,w,M){typeof v=="number"||typeof v=="boolean"?w[0]=v:v.isMatrix3?(w[0]=v.elements[0],w[1]=v.elements[1],w[2]=v.elements[2],w[3]=0,w[4]=v.elements[3],w[5]=v.elements[4],w[6]=v.elements[5],w[7]=0,w[8]=v.elements[6],w[9]=v.elements[7],w[10]=v.elements[8],w[11]=0):ArrayBuffer.isView(v)?w.set(new v.constructor(v.buffer,v.byteOffset,w.length)):v.toArray(w,M)}function x(v,w,M,E){let y=v.value,T=w+"_"+M;if(E[T]===void 0)return typeof y=="number"||typeof y=="boolean"?E[T]=y:ArrayBuffer.isView(y)?E[T]=y.slice():E[T]=y.clone(),!0;{let P=E[T];if(typeof y=="number"||typeof y=="boolean"){if(P!==y)return E[T]=y,!0}else{if(ArrayBuffer.isView(y))return!0;if(P.equals(y)===!1)return P.copy(y),!0}}return!1}function p(v){let w=v.uniforms,M=0,E=16;for(let T=0,P=w.length;T<P;T++){let k=Array.isArray(w[T])?w[T]:[w[T]];for(let U=0,z=k.length;U<z;U++){let F=k[U],q=Array.isArray(F.value)?F.value:[F.value];for(let K=0,ne=q.length;K<ne;K++){let oe=q[K],j=g(oe),le=M%E,ce=le%j.boundary,re=le+ce;M+=ce,re!==0&&E-re<j.storage&&(M+=E-re),F.__data=new Float32Array(j.storage/Float32Array.BYTES_PER_ELEMENT),F.__offset=M,M+=j.storage}}}let y=M%E;return y>0&&(M+=E-y),v.__size=M,v.__cache={},this}function g(v){let w={boundary:0,storage:0};return typeof v=="number"||typeof v=="boolean"?(w.boundary=4,w.storage=4):v.isVector2?(w.boundary=8,w.storage=8):v.isVector3||v.isColor?(w.boundary=16,w.storage=12):v.isVector4?(w.boundary=16,w.storage=16):v.isMatrix3?(w.boundary=48,w.storage=48):v.isMatrix4?(w.boundary=64,w.storage=64):v.isTexture?ot("WebGLRenderer: Texture samplers can not be part of an uniforms group."):ArrayBuffer.isView(v)?(w.boundary=16,w.storage=v.byteLength):ot("WebGLRenderer: Unsupported uniform value type.",v),w}function A(v){let w=v.target;w.removeEventListener("dispose",A);let M=a.indexOf(w.__bindingPointIndex);a.splice(M,1),n.deleteBuffer(s[w.id]),delete s[w.id],delete r[w.id]}function R(){for(let v in s)n.deleteBuffer(s[v]);a=[],s={},r={}}return{bind:l,update:c,dispose:R}}var Nb=new Uint16Array([12469,15057,12620,14925,13266,14620,13807,14376,14323,13990,14545,13625,14713,13328,14840,12882,14931,12528,14996,12233,15039,11829,15066,11525,15080,11295,15085,10976,15082,10705,15073,10495,13880,14564,13898,14542,13977,14430,14158,14124,14393,13732,14556,13410,14702,12996,14814,12596,14891,12291,14937,11834,14957,11489,14958,11194,14943,10803,14921,10506,14893,10278,14858,9960,14484,14039,14487,14025,14499,13941,14524,13740,14574,13468,14654,13106,14743,12678,14818,12344,14867,11893,14889,11509,14893,11180,14881,10751,14852,10428,14812,10128,14765,9754,14712,9466,14764,13480,14764,13475,14766,13440,14766,13347,14769,13070,14786,12713,14816,12387,14844,11957,14860,11549,14868,11215,14855,10751,14825,10403,14782,10044,14729,9651,14666,9352,14599,9029,14967,12835,14966,12831,14963,12804,14954,12723,14936,12564,14917,12347,14900,11958,14886,11569,14878,11247,14859,10765,14828,10401,14784,10011,14727,9600,14660,9289,14586,8893,14508,8533,15111,12234,15110,12234,15104,12216,15092,12156,15067,12010,15028,11776,14981,11500,14942,11205,14902,10752,14861,10393,14812,9991,14752,9570,14682,9252,14603,8808,14519,8445,14431,8145,15209,11449,15208,11451,15202,11451,15190,11438,15163,11384,15117,11274,15055,10979,14994,10648,14932,10343,14871,9936,14803,9532,14729,9218,14645,8742,14556,8381,14461,8020,14365,7603,15273,10603,15272,10607,15267,10619,15256,10631,15231,10614,15182,10535,15118,10389,15042,10167,14963,9787,14883,9447,14800,9115,14710,8665,14615,8318,14514,7911,14411,7507,14279,7198,15314,9675,15313,9683,15309,9712,15298,9759,15277,9797,15229,9773,15166,9668,15084,9487,14995,9274,14898,8910,14800,8539,14697,8234,14590,7790,14479,7409,14367,7067,14178,6621,15337,8619,15337,8631,15333,8677,15325,8769,15305,8871,15264,8940,15202,8909,15119,8775,15022,8565,14916,8328,14804,8009,14688,7614,14569,7287,14448,6888,14321,6483,14088,6171,15350,7402,15350,7419,15347,7480,15340,7613,15322,7804,15287,7973,15229,8057,15148,8012,15046,7846,14933,7611,14810,7357,14682,7069,14552,6656,14421,6316,14251,5948,14007,5528,15356,5942,15356,5977,15353,6119,15348,6294,15332,6551,15302,6824,15249,7044,15171,7122,15070,7050,14949,6861,14818,6611,14679,6349,14538,6067,14398,5651,14189,5311,13935,4958,15359,4123,15359,4153,15356,4296,15353,4646,15338,5160,15311,5508,15263,5829,15188,6042,15088,6094,14966,6001,14826,5796,14678,5543,14527,5287,14377,4985,14133,4586,13869,4257,15360,1563,15360,1642,15358,2076,15354,2636,15341,3350,15317,4019,15273,4429,15203,4732,15105,4911,14981,4932,14836,4818,14679,4621,14517,4386,14359,4156,14083,3795,13808,3437,15360,122,15360,137,15358,285,15355,636,15344,1274,15322,2177,15281,2765,15215,3223,15120,3451,14995,3569,14846,3567,14681,3466,14511,3305,14344,3121,14037,2800,13753,2467,15360,0,15360,1,15359,21,15355,89,15346,253,15325,479,15287,796,15225,1148,15133,1492,15008,1749,14856,1882,14685,1886,14506,1783,14324,1608,13996,1398,13702,1183]),Ri=null;function Ub(){return Ri===null&&(Ri=new $i(Nb,16,16,ws,gi),Ri.name="DFG_LUT",Ri.minFilter=It,Ri.magFilter=It,Ri.wrapS=Rn,Ri.wrapT=Rn,Ri.generateMipmaps=!1,Ri.needsUpdate=!0),Ri}var Qc=class{constructor(e={}){let{canvas:t=Np(),context:i=null,depth:s=!0,stencil:r=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:h=!1,reversedDepthBuffer:d=!1,outputBufferType:f=Jt}=e;this.isWebGLRenderer=!0;let m;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=i.getContextAttributes().alpha}else m=a;let x=f,p=new Set([mc,pc,fc]),g=new Set([Jt,pi,qr,Yr,dc,hc]),A=new Uint32Array(4),R=new Int32Array(4),v=new Y,w=null,M=null,E=[],y=[],T=null;this.domElement=t,this.debug={checkShaderErrors:!0,diagnostics:{keywords:!1},onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=fi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let P=this,k=!1,U=null,z=null,F=null,q=null;this._outputColorSpace=Bt;let K=0,ne=0,oe=null,j=-1,le=null,ce=new yt,re=new yt,xe=null,Xe=new rt(0),Ne=0,qe=t.width,H=t.height,W=1,_e=null,ve=null,ge=new yt(0,0,qe,H),Be=new yt(0,0,qe,H),Je=!1,De=new zr,We=!1,it=!1,Ke=new Mt,Ye=new Y,he=new yt,we={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},Ue=!1;function Oe(){return oe===null?W:1}let V=i;function se(S,I){return t.getContext(S,I)}let Ae,b,_,L,O,ee,de,ye,ae,fe,Ie,je,Ce,Le,Qe,st,at,X,be,ue,Te,Pe,pe;try{let S={alpha:!0,depth:s,stencil:r,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:h};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"186"}`),t.addEventListener("webglcontextlost",ut,!1),t.addEventListener("webglcontextrestored",ht,!1),t.addEventListener("webglcontextcreationerror",xt,!1),V===null){let I="webgl2";if(V=se(I,S),V===null)throw se(I)?new Error("THREE.WebGLRenderer: Error creating WebGL context with your selected attributes."):new Error("THREE.WebGLRenderer: Error creating WebGL context.")}$e()}catch(S){throw t.removeEventListener("webglcontextlost",ut,!1),t.removeEventListener("webglcontextrestored",ht,!1),t.removeEventListener("webglcontextcreationerror",xt,!1),lt("WebGLRenderer: "+S.message),S}function $e(){Ae=new Hy(V),Ae.init(),Te=new Cb(V,Ae),b=new Iy(V,Ae,e,Te),_=new Tb(V,Ae),b.reversedDepthBuffer&&d&&_.buffers.depth.setReversed(!0),z=V.createFramebuffer(),F=V.createFramebuffer(),q=V.createFramebuffer(),L=new jy(V),O=new hb,ee=new Ab(V,Ae,_,O,b,Te,L),de=new Vy(P),ye=new q0(V),Pe=new Py(V,ye),ae=new Gy(V,ye,L,Pe),fe=new qy(V,ae,ye,Pe,L),X=new Xy(V,b,ee),Qe=new Dy(O),Ie=new db(P,de,Ae,b,Pe,Qe),je=new Ib(P,O),Ce=new pb,Le=new vb(Ae),at=new Ry(P,de,_,fe,m,l),st=new Eb(P,fe,b),pe=new Db(V,L,b,_),be=new Ly(V,Ae,L),ue=new Wy(V,Ae,L),L.programs=Ie.programs,P.capabilities=b,P.extensions=Ae,P.properties=O,P.renderLists=Ce,P.shadowMap=st,P.state=_,P.info=L}x!==Jt&&(T=new $y(x,t.width,t.height,o,s,r));let ze=new fh(P,V);this.xr=ze,this.getContext=function(){return V},this.getContextAttributes=function(){return V.getContextAttributes()},this.forceContextLoss=function(){let S=Ae.get("WEBGL_lose_context");S&&S.loseContext()},this.forceContextRestore=function(){let S=Ae.get("WEBGL_lose_context");S&&S.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(S){S!==void 0&&(W=S,this.setSize(qe,H,!1))},this.getSize=function(S){return S.set(qe,H)},this.setSize=function(S,I,J=!0){if(ze.isPresenting){ot("WebGLRenderer: Can't change size while VR device is presenting.");return}qe=S,H=I,t.width=Math.floor(S*W),t.height=Math.floor(I*W),J===!0&&(t.style.width=S+"px",t.style.height=I+"px"),T!==null&&T.setSize(t.width,t.height),this.setViewport(0,0,S,I)},this.getDrawingBufferSize=function(S){return S.set(qe*W,H*W).floor()},this.setDrawingBufferSize=function(S,I,J){qe=S,H=I,W=J,t.width=Math.floor(S*J),t.height=Math.floor(I*J),this.setViewport(0,0,S,I)},this.setEffects=function(S){if(x===Jt){lt("WebGLRenderer: setEffects() requires outputBufferType set to HalfFloatType or FloatType.");return}if(S){for(let I=0;I<S.length;I++)if(S[I].isOutputPass===!0){ot("WebGLRenderer: OutputPass is not needed in setEffects(). Tone mapping and color space conversion are applied automatically.");break}}T.setEffects(S||[])},this.getCurrentViewport=function(S){return S.copy(ce)},this.getViewport=function(S){return S.copy(ge)},this.setViewport=function(S,I,J,Z){S.isVector4?ge.set(S.x,S.y,S.z,S.w):ge.set(S,I,J,Z),_.viewport(ce.copy(ge).multiplyScalar(W).round())},this.getScissor=function(S){return S.copy(Be)},this.setScissor=function(S,I,J,Z){S.isVector4?Be.set(S.x,S.y,S.z,S.w):Be.set(S,I,J,Z),_.scissor(re.copy(Be).multiplyScalar(W).round())},this.getScissorTest=function(){return Je},this.setScissorTest=function(S){_.setScissorTest(Je=S)},this.setOpaqueSort=function(S){_e=S},this.setTransparentSort=function(S){ve=S},this.getClearColor=function(S){return S.copy(at.getClearColor())},this.setClearColor=function(){at.setClearColor(...arguments)},this.getClearAlpha=function(){return at.getClearAlpha()},this.setClearAlpha=function(){at.setClearAlpha(...arguments)},this.clear=function(S=!0,I=!0,J=!0){let Z=0;if(S){let $=!1;if(oe!==null){let Ee=oe.texture.format;$=p.has(Ee)}if($){let Ee=oe.texture.type,Se=g.has(Ee),Re=at.getClearColor(),Ge=at.getClearAlpha(),et=Re.r,dt=Re.g,pt=Re.b;Se?(A[0]=et,A[1]=dt,A[2]=pt,A[3]=Ge,V.clearBufferuiv(V.COLOR,0,A)):(R[0]=et,R[1]=dt,R[2]=pt,R[3]=Ge,V.clearBufferiv(V.COLOR,0,R))}else Z|=V.COLOR_BUFFER_BIT}I&&(Z|=V.DEPTH_BUFFER_BIT,this.state.buffers.depth.setMask(!0)),J&&(Z|=V.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),Z!==0&&V.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.setNodesHandler=function(S){S.setRenderer(this),U=S},this.dispose=function(){t.removeEventListener("webglcontextlost",ut,!1),t.removeEventListener("webglcontextrestored",ht,!1),t.removeEventListener("webglcontextcreationerror",xt,!1),at.dispose(),Ce.dispose(),Le.dispose(),O.dispose(),de.dispose(),fe.dispose(),Pe.dispose(),pe.dispose(),Ie.dispose(),ze.dispose(),ze.removeEventListener("sessionstart",ti),ze.removeEventListener("sessionend",ni),tn.stop()};function ut(S){S.preventDefault(),no("WebGLRenderer: Context Lost."),k=!0}function ht(){no("WebGLRenderer: Context Restored."),k=!1;let S=L.autoReset,I=st.enabled,J=st.autoUpdate,Z=st.needsUpdate,$=st.type;$e(),L.autoReset=S,st.enabled=I,st.autoUpdate=J,st.needsUpdate=Z,st.type=$}function xt(S){lt("WebGLRenderer: A WebGL context could not be created. Reason: ",S.statusMessage)}function Ut(S){let I=S.target;I.removeEventListener("dispose",Ut),fn(I)}function fn(S){Bn(S),O.remove(S)}function Bn(S){let I=O.get(S).programs;I!==void 0&&(I.forEach(function(J){Ie.releaseProgram(J)}),S.isShaderMaterial&&Ie.releaseShaderCache(S))}this.renderBufferDirect=function(S,I,J,Z,$,Ee){I===null&&(I=we);let Se=$.isMesh&&$.matrixWorld.determinantAffine()<0,Re=Q(S,I,J,Z,$);_.setMaterial(Z,Se);let Ge=J.index,et=1;if(Z.wireframe===!0){if(Ge=ae.getWireframeAttribute(J),Ge===void 0)return;et=2}let dt=J.drawRange,pt=J.attributes.position,Ze=dt.start*et,wt=(dt.start+dt.count)*et;Ee!==null&&(Ze=Math.max(Ze,Ee.start*et),wt=Math.min(wt,(Ee.start+Ee.count)*et)),Ge!==null?(Ze=Math.max(Ze,0),wt=Math.min(wt,Ge.count)):pt!=null&&(Ze=Math.max(Ze,0),wt=Math.min(wt,pt.count));let Ot=wt-Ze;if(Ot<0||Ot===1/0)return;Pe.setup($,Z,Re,J,Ge);let Pt,St=be;if(Ge!==null&&(Pt=ye.get(Ge),St=ue,St.setIndex(Pt)),$.isMesh)Z.wireframe===!0?(_.setLineWidth(Z.wireframeLinewidth*Oe()),St.setMode(V.LINES)):St.setMode(V.TRIANGLES);else if($.isLine){let Zt=Z.linewidth;Zt===void 0&&(Zt=1),_.setLineWidth(Zt*Oe()),$.isLineSegments?St.setMode(V.LINES):$.isLineLoop?St.setMode(V.LINE_LOOP):St.setMode(V.LINE_STRIP)}else $.isPoints?St.setMode(V.POINTS):$.isSprite&&St.setMode(V.TRIANGLES);if($.isBatchedMesh)if(Ae.get("WEBGL_multi_draw"))St.renderMultiDraw($._multiDrawStarts,$._multiDrawCounts,$._multiDrawCount);else{let Zt=$._multiDrawStarts,Ve=$._multiDrawCounts,nn=$._multiDrawCount,vt=Ge?ye.get(Ge).bytesPerElement:1,wn=O.get(Z).currentProgram.getUniforms();for(let In=0;In<nn;In++)wn.setValue(V,"_gl_DrawID",In),St.render(Zt[In]/vt,Ve[In])}else if($.isInstancedMesh)St.renderInstances(Ze,Ot,$.count);else if(J.isInstancedBufferGeometry){let Zt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,Ve=Math.min(J.instanceCount,Zt);St.renderInstances(Ze,Ot,Ve)}else St.render(Ze,Ot)};function Xt(S,I,J,Z){U!==null&&S.isNodeMaterial&&U.setObject(Z,S),We===!0&&Qe.setState(S,J,!1),S.transparent===!0&&S.side===Jn&&S.forceSinglePass===!1?(S.side=cn,S.needsUpdate=!0,an(S,I,Z),S.side=bs,S.needsUpdate=!0,an(S,I,Z),S.side=Jn):an(S,I,Z)}this.compile=function(S,I,J=null){J===null&&(J=S),U!==null&&U.renderStart(S,I,J),M=Le.get(J),M.init(I),y.push(M),J.traverseVisible(function($){$.isLight&&$.layers.test(I.layers)&&(M.pushLight($),$.castShadow&&M.pushShadow($))}),S!==J&&S.traverseVisible(function($){$.isLight&&$.layers.test(I.layers)&&(M.pushLight($),$.castShadow&&M.pushShadow($))}),M.setupLights(),U!==null&&U.updateLights(M.state.lightsArray),it=this.localClippingEnabled,We=Qe.init(this.clippingPlanes,it),We===!0&&Qe.setGlobalState(this.clippingPlanes,I),U!==null&&st.render(M.state.shadowsArray,J,I);let Z=new Set;return S.traverse(function($){if(!($.isMesh||$.isPoints||$.isLine||$.isSprite))return;let Ee=$.material;if(Ee)if(Array.isArray(Ee))for(let Se=0;Se<Ee.length;Se++){let Re=Ee[Se];Xt(Re,J,I,$),Z.add(Re)}else Xt(Ee,J,I,$),Z.add(Ee)}),M=y.pop(),U!==null&&U.renderEnd(),Z},this.compileAsync=function(S,I,J=null){let Z=this.compile(S,I,J);return new Promise($=>{function Ee(){if(Z.forEach(function(Se){let Ge=O.get(Se).currentProgram;(Ge===void 0||Ge.isReady())&&Z.delete(Se)}),Z.size===0){$(S);return}setTimeout(Ee,10)}Ae.get("KHR_parallel_shader_compile")!==null?Ee():setTimeout(Ee,10)})};let Ln=null;function vn(S){Ln&&Ln(S)}function ti(){tn.stop()}function ni(){tn.start()}let tn=new cm;tn.setAnimationLoop(vn),typeof self<"u"&&tn.setContext(self),this.setAnimationLoop=function(S){Ln=S,ze.setAnimationLoop(S),S===null?tn.stop():tn.start()},ze.addEventListener("sessionstart",ti),ze.addEventListener("sessionend",ni),this.render=function(S,I){if(I!==void 0&&I.isCamera!==!0){lt("WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(k===!0)return;U!==null&&U.renderStart(S,I);let J=ze.enabled===!0&&ze.isPresenting===!0,Z=T!==null&&(oe===null||J)&&T.begin(P,oe);if(S.matrixWorldAutoUpdate===!0&&S.updateMatrixWorld(),I.parent===null&&I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),ze.enabled===!0&&ze.isPresenting===!0&&(T===null||T.isCompositing()===!1)&&(ze.cameraAutoUpdate===!0&&ze.updateCamera(I),I=ze.getCamera()),S.isScene===!0&&S.onBeforeRender(P,S,I,oe),M=Le.get(S,y.length),M.init(I),M.state.textureUnits=ee.getTextureUnits(),y.push(M),Ke.multiplyMatrices(I.projectionMatrix,I.matrixWorldInverse),De.setFromProjectionMatrix(Ke,ui,I.reversedDepth),it=this.localClippingEnabled,We=Qe.init(this.clippingPlanes,it),w=Ce.get(S,E.length),w.init(),E.push(w),ze.enabled===!0&&ze.isPresenting===!0){let Se=P.xr.getDepthSensingMesh();Se!==null&&ii(Se,I,-1/0,P.sortObjects)}ii(S,I,0,P.sortObjects),w.finish(),U!==null&&U.updateLights(M.state.lightsArray),P.sortObjects===!0&&w.sort(_e,ve),Ue=ze.enabled===!1||ze.isPresenting===!1||ze.hasDepthSensing()===!1,Ue&&at.addToRenderList(w,S),this.info.render.frame++,this.info.autoReset===!0&&this.info.reset(),We===!0&&Qe.beginShadows();let $=M.state.shadowsArray;if(st.render($,S,I),We===!0&&Qe.endShadows(),(Z&&T.hasRenderPass())===!1){let Se=w.opaque,Re=w.transmissive;if(M.setupLights(),I.isArrayCamera){let Ge=I.cameras;if(Re.length>0)for(let et=0,dt=Ge.length;et<dt;et++){let pt=Ge[et];Ps(Se,Re,S,pt)}Ue&&at.render(S);for(let et=0,dt=Ge.length;et<dt;et++){let pt=Ge[et];zn(w,S,pt,pt.viewport)}}else Re.length>0&&Ps(Se,Re,S,I),Ue&&at.render(S),zn(w,S,I)}oe!==null&&ne===0&&(ee.updateMultisampleRenderTarget(oe),ee.updateRenderTargetMipmap(oe)),Z&&T.end(P),S.isScene===!0&&S.onAfterRender(P,S,I),Pe.resetDefaultState(),j=-1,le=null,y.pop(),y.length>0?(M=y[y.length-1],ee.setTextureUnits(M.state.textureUnits),We===!0&&Qe.setGlobalState(P.clippingPlanes,M.state.camera)):M=null,E.pop(),E.length>0?w=E[E.length-1]:w=null,U!==null&&U.renderEnd()};function ii(S,I,J,Z){if(S.visible===!1)return;if(S.layers.test(I.layers)){if(S.isGroup)J=S.renderOrder;else if(S.isLOD)S.autoUpdate===!0&&S.update(I);else if(S.isLightProbeGrid)M.pushLightProbeGrid(S);else if(S.isLight)M.pushLight(S),S.castShadow&&M.pushShadow(S);else if(S.isSprite){if(!S.frustumCulled||S.intersectsFrustum(De)){Z&&he.setFromMatrixPosition(S.matrixWorld).applyMatrix4(Ke);let Se=fe.update(S),Re=S.material;Re.visible&&w.push(S,Se,Re,J,he.z,null,I)}}else if((S.isMesh||S.isLine||S.isPoints)&&(!S.frustumCulled||S.intersectsFrustum(De))){let Se=fe.update(S),Re=S.material;if(Z&&(S.boundingSphere!==void 0?(S.boundingSphere===null&&S.computeBoundingSphere(),he.copy(S.boundingSphere.center)):(Se.boundingSphere===null&&Se.computeBoundingSphere(),he.copy(Se.boundingSphere.center)),he.applyMatrix4(S.matrixWorld).applyMatrix4(Ke)),Array.isArray(Re)){let Ge=Se.groups;for(let et=0,dt=Ge.length;et<dt;et++){let pt=Ge[et],Ze=Re[pt.materialIndex];Ze&&Ze.visible&&w.push(S,Se,Ze,J,he.z,pt,I)}}else Re.visible&&w.push(S,Se,Re,J,he.z,null,I)}}let Ee=S.children;for(let Se=0,Re=Ee.length;Se<Re;Se++)ii(Ee[Se],I,J,Z)}function zn(S,I,J,Z){let{opaque:$,transmissive:Ee,transparent:Se}=S;M.setupLightsView(J),We===!0&&Qe.setGlobalState(P.clippingPlanes,J),Z&&_.viewport(ce.copy(Z)),$.length>0&&Di($,I,J),Ee.length>0&&Di(Ee,I,J),Se.length>0&&Di(Se,I,J),_.buffers.depth.setTest(!0),_.buffers.depth.setMask(!0),_.buffers.color.setMask(!0),_.setPolygonOffset(!1)}function Ps(S,I,J,Z){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;if(M.state.transmissionRenderTarget[Z.id]===void 0){let Ze=Ae.has("EXT_color_buffer_half_float")||Ae.has("EXT_color_buffer_float");M.state.transmissionRenderTarget[Z.id]=new Pn(1,1,{generateMipmaps:!0,type:Ze?gi:Jt,minFilter:On,samples:Math.max(4,b.samples),stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,storeMultisampledDepthBuffer:!1,storeMultisampledStencilBuffer:!1,colorSpace:bt.workingColorSpace})}let Ee=M.state.transmissionRenderTarget[Z.id],Se=Z.viewport||ce;Ee.setSize(Se.z*P.transmissionResolutionScale,Se.w*P.transmissionResolutionScale);let Re=P.getRenderTarget(),Ge=P.getActiveCubeFace(),et=P.getActiveMipmapLevel();P.setRenderTarget(Ee),P.getClearColor(Xe),Ne=P.getClearAlpha(),Ne<1&&P.setClearColor(16777215,.5),P.clear(),Ue&&at.render(J);let dt=P.toneMapping;P.toneMapping=fi;let pt=Z.viewport;if(Z.viewport!==void 0&&(Z.viewport=void 0),M.setupLightsView(Z),We===!0&&Qe.setGlobalState(P.clippingPlanes,Z),Di(S,J,Z),ee.updateMultisampleRenderTarget(Ee),ee.updateRenderTargetMipmap(Ee),Ae.has("WEBGL_multisampled_render_to_texture")===!1){let Ze=!1;for(let wt=0,Ot=I.length;wt<Ot;wt++){let Pt=I[wt],{object:St,geometry:Zt,material:Ve,group:nn}=Pt;if(Ve.side===Jn&&St.layers.test(Z.layers)){let vt=Ve.side;Ve.side=cn,Ve.needsUpdate=!0,Qi(St,J,Z,Zt,Ve,nn),Ve.side=vt,Ve.needsUpdate=!0,Ze=!0}}Ze===!0&&(ee.updateMultisampleRenderTarget(Ee),ee.updateRenderTargetMipmap(Ee))}P.setRenderTarget(Re,Ge,et),P.setClearColor(Xe,Ne),pt!==void 0&&(Z.viewport=pt),P.toneMapping=dt}function Di(S,I,J){let Z=I.isScene===!0?I.overrideMaterial:null;for(let $=0,Ee=S.length;$<Ee;$++){let Se=S[$],{object:Re,geometry:Ge,group:et}=Se,dt=Se.material;dt.allowOverride===!0&&Z!==null&&(dt=Z),Re.layers.test(J.layers)&&Qi(Re,I,J,Ge,dt,et)}}function Qi(S,I,J,Z,$,Ee){U!==null&&$.isNodeMaterial&&U.setObject(S,$),S.onBeforeRender(P,I,J,Z,$,Ee),S.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,S.matrixWorld),S.normalMatrix.getNormalMatrix(S.modelViewMatrix),$.onBeforeRender(P,I,J,Z,S,Ee),$.transparent===!0&&$.side===Jn&&$.forceSinglePass===!1?($.side=cn,$.needsUpdate=!0,P.renderBufferDirect(J,I,Z,$,S,Ee),$.side=bs,$.needsUpdate=!0,P.renderBufferDirect(J,I,Z,$,S,Ee),$.side=Jn):P.renderBufferDirect(J,I,Z,$,S,Ee),S.onAfterRender(P,I,J,Z,$,Ee)}function an(S,I,J){I.isScene!==!0&&(I=we);let Z=O.get(S),$=M.state.lights,Ee=M.state.shadowsArray,Se=$.state.version,Re=Ie.getParameters(S,$.state,Ee,I,J,M.state.lightProbeGridArray),Ge=Ie.getProgramCacheKey(Re),et=Z.programs;Z.environment=S.isMeshStandardMaterial||S.isMeshLambertMaterial||S.isMeshPhongMaterial?I.environment:null,Z.fog=I.fog;let dt=S.isMeshStandardMaterial||S.isMeshLambertMaterial&&!S.envMap||S.isMeshPhongMaterial&&!S.envMap;Z.envMap=de.get(S.envMap||Z.environment,dt),Z.envMapRotation=Z.environment!==null&&S.envMap===null?I.environmentRotation:S.envMapRotation,et===void 0&&(S.addEventListener("dispose",Ut),et=new Map,Z.programs=et);let pt=et.get(Ge);if(pt!==void 0){if(Z.currentProgram===pt&&Z.lightsStateVersion===Se)return N(S,Re),pt}else Re.uniforms=Ie.getUniforms(S),U!==null&&S.isNodeMaterial&&U.build(S,J,Re),S.onBeforeCompile(Re,P),pt=Ie.acquireProgram(Re,Ge),et.set(Ge,pt),Z.uniforms=Re.uniforms;let Ze=Z.uniforms;return(!S.isShaderMaterial&&!S.isRawShaderMaterial||S.clipping===!0)&&(Ze.clippingPlanes=Qe.uniform),N(S,Re),Z.needsLights=ie(S),Z.lightsStateVersion=Se,Z.needsLights&&(Ze.ambientLightColor.value=$.state.ambient,Ze.lightProbe.value=$.state.probe,Ze.sunLights.value=$.state.sun,Ze.sunLightShadows.value=$.state.sunShadow,Ze.directionalLights.value=$.state.directional,Ze.directionalLightShadows.value=$.state.directionalShadow,Ze.spotLights.value=$.state.spot,Ze.spotLightShadows.value=$.state.spotShadow,Ze.rectAreaLights.value=$.state.rectArea,Ze.ltc_1.value=$.state.rectAreaLTC1,Ze.ltc_2.value=$.state.rectAreaLTC2,Ze.pointLights.value=$.state.point,Ze.pointLightShadows.value=$.state.pointShadow,Ze.hemisphereLights.value=$.state.hemi,Ze.sunShadowMatrix.value=$.state.sunShadowMatrix,Ze.sunShadowCascade.value=$.state.sunShadowCascade,Ze.directionalShadowMatrix.value=$.state.directionalShadowMatrix,Ze.spotLightMatrix.value=$.state.spotLightMatrix,Ze.spotLightMap.value=$.state.spotLightMap,Ze.pointShadowMatrix.value=$.state.pointShadowMatrix),Z.lightProbeGrid=M.state.lightProbeGridArray.length>0,Z.currentProgram=pt,Z.uniformsList=null,pt}function C(S){if(S.uniformsList===null){let I=S.currentProgram.getUniforms();S.uniformsList=Zr.seqWithValue(I.seq,S.uniforms)}return S.uniformsList}function N(S,I){let J=O.get(S);J.outputColorSpace=I.outputColorSpace,J.batching=I.batching,J.batchingColor=I.batchingColor,J.instancing=I.instancing,J.instancingColor=I.instancingColor,J.instancingMorph=I.instancingMorph,J.skinning=I.skinning,J.morphTargets=I.morphTargets,J.morphNormals=I.morphNormals,J.morphColors=I.morphColors,J.morphTargetsCount=I.morphTargetsCount,J.numClippingPlanes=I.numClippingPlanes,J.numIntersection=I.numClipIntersection,J.vertexAlphas=I.vertexAlphas,J.vertexTangents=I.vertexTangents,J.toneMapping=I.toneMapping}function B(S,I){if(S.length===0)return null;if(S.length===1)return S[0].texture!==null?S[0]:null;v.setFromMatrixPosition(I.matrixWorld);for(let J=0,Z=S.length;J<Z;J++){let $=S[J];if($.texture!==null&&$.boundingBox.containsPoint(v))return $}return null}function Q(S,I,J,Z,$){I.isScene!==!0&&(I=we),ee.resetTextureUnits();let Ee=I.fog,Se=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial?I.environment:null,Re=oe===null?P.outputColorSpace:oe.isXRRenderTarget===!0?oe.texture.colorSpace:bt.workingColorSpace,Ge=Z.isMeshStandardMaterial||Z.isMeshLambertMaterial&&!Z.envMap||Z.isMeshPhongMaterial&&!Z.envMap,et=de.get(Z.envMap||Se,Ge),dt=Z.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,pt=!!J.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),Ze=!!J.morphAttributes.position,wt=!!J.morphAttributes.normal,Ot=!!J.morphAttributes.color,Pt=fi;Z.toneMapped&&(oe===null||oe.isXRRenderTarget===!0)&&(Pt=P.toneMapping);let St=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,Zt=St!==void 0?St.length:0,Ve=O.get(Z),nn=M.state.lights;if(We===!0&&(it===!0||S!==le)){let Tt=S===le&&Z.id===j;Qe.setState(Z,S,Tt)}let vt=!1;Z.version===Ve.__version?(Ve.needsLights&&Ve.lightsStateVersion!==nn.state.version||Ve.outputColorSpace!==Re||$.isBatchedMesh&&Ve.batching===!1||!$.isBatchedMesh&&Ve.batching===!0||$.isBatchedMesh&&Ve.batchingColor===!0&&$._colorsTexture===null||$.isBatchedMesh&&Ve.batchingColor===!1&&$._colorsTexture!==null||$.isInstancedMesh&&Ve.instancing===!1||!$.isInstancedMesh&&Ve.instancing===!0||$.isSkinnedMesh&&Ve.skinning===!1||!$.isSkinnedMesh&&Ve.skinning===!0||$.isInstancedMesh&&Ve.instancingColor===!0&&$.instanceColor===null||$.isInstancedMesh&&Ve.instancingColor===!1&&$.instanceColor!==null||$.isInstancedMesh&&Ve.instancingMorph===!0&&$.morphTexture===null||$.isInstancedMesh&&Ve.instancingMorph===!1&&$.morphTexture!==null||Ve.envMap!==et||Z.fog===!0&&Ve.fog!==Ee||Ve.numClippingPlanes!==void 0&&(Ve.numClippingPlanes!==Qe.numPlanes||Ve.numIntersection!==Qe.numIntersection)||Ve.vertexAlphas!==dt||Ve.vertexTangents!==pt||Ve.morphTargets!==Ze||Ve.morphNormals!==wt||Ve.morphColors!==Ot||Ve.toneMapping!==Pt||Ve.morphTargetsCount!==Zt||!!Ve.lightProbeGrid!=M.state.lightProbeGridArray.length>0)&&(vt=!0):(vt=!0,Ve.__version=Z.version);let wn=Ve.currentProgram;vt===!0&&(wn=an(Z,I,$),U&&Z.isNodeMaterial&&U.onUpdateProgram(Z,wn,Ve));let In=!1,Vn=!1,es=!1,Et=wn.getUniforms(),kt=Ve.uniforms;if(_.useProgram(wn.program)&&(In=!0,Vn=!0,es=!0),Z.id!==j&&(j=Z.id,Vn=!0),Ve.needsLights){let Tt=B(M.state.lightProbeGridArray,$);Ve.lightProbeGrid!==Tt&&(Ve.lightProbeGrid=Tt,Vn=!0)}if(In||le!==S){_.buffers.depth.getReversed()&&S.reversedDepth!==!0&&(S._reversedDepth=!0,S.updateProjectionMatrix()),Et.setValue(V,"projectionMatrix",S.projectionMatrix),Et.setValue(V,"viewMatrix",S.matrixWorldInverse);let ln=Et.map.cameraPosition;ln!==void 0&&ln.setValue(V,Ye.setFromMatrixPosition(S.matrixWorld)),b.logarithmicDepthBuffer&&Et.setValue(V,"logDepthBufFC",2/(Math.log(S.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Et.setValue(V,"isOrthographic",S.isOrthographicCamera===!0),le!==S&&(le=S,Vn=!0,es=!0)}if(Ve.needsLights&&(nn.state.sunShadowMap.length>0&&Et.setValue(V,"sunShadowMap",nn.state.sunShadowMap,ee),nn.state.directionalShadowMap.length>0&&Et.setValue(V,"directionalShadowMap",nn.state.directionalShadowMap,ee),nn.state.spotShadowMap.length>0&&Et.setValue(V,"spotShadowMap",nn.state.spotShadowMap,ee),nn.state.pointShadowMap.length>0&&Et.setValue(V,"pointShadowMap",nn.state.pointShadowMap,ee)),$.isSkinnedMesh){Et.setOptional(V,$,"bindMatrix"),Et.setOptional(V,$,"bindMatrixInverse");let Tt=$.skeleton;Tt&&(Tt.boneTexture===null&&Tt.computeBoneTexture(),Et.setValue(V,"boneTexture",Tt.boneTexture,ee))}$.isBatchedMesh&&(Et.setOptional(V,$,"batchingTexture"),Et.setValue(V,"batchingTexture",$._matricesTexture,ee),Et.setOptional(V,$,"batchingIdTexture"),Et.setValue(V,"batchingIdTexture",$._indirectTexture,ee),Et.setOptional(V,$,"batchingColorTexture"),$._colorsTexture!==null&&Et.setValue(V,"batchingColorTexture",$._colorsTexture,ee));let on=J.morphAttributes;if((on.position!==void 0||on.normal!==void 0||on.color!==void 0)&&X.update($,J,wn),(Vn||Ve.receiveShadow!==$.receiveShadow)&&(Ve.receiveShadow=$.receiveShadow,Et.setValue(V,"receiveShadow",$.receiveShadow)),(Z.isMeshStandardMaterial||Z.isMeshLambertMaterial||Z.isMeshPhongMaterial)&&Z.envMap===null&&I.environment!==null&&(kt.envMapIntensity.value=I.environmentIntensity),kt.dfgLUT!==void 0&&(kt.dfgLUT.value=Ub()),Vn){if(Et.setValue(V,"toneMappingExposure",P.toneMappingExposure),Ve.needsLights&&te(kt,es),Ee&&Z.fog===!0&&je.refreshFogUniforms(kt,Ee),je.refreshMaterialUniforms(kt,Z,W,H,M.state.transmissionRenderTarget[S.id]),Ve.needsLights&&Ve.lightProbeGrid){let Tt=Ve.lightProbeGrid;kt.probesSH.value=Tt.texture,kt.probesMin.value.copy(Tt.boundingBox.min),kt.probesMax.value.copy(Tt.boundingBox.max),kt.probesResolution.value.copy(Tt.resolution)}Zr.upload(V,C(Ve),kt,ee)}if(Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(Zr.upload(V,C(Ve),kt,ee),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Et.setValue(V,"center",$.center),Et.setValue(V,"modelViewMatrix",$.modelViewMatrix),Et.setValue(V,"normalMatrix",$.normalMatrix),Et.setValue(V,"modelMatrix",$.matrixWorld),Z.uniformsGroups!==void 0){let Tt=Z.uniformsGroups;for(let ln=0,ts=Tt.length;ln<ts;ln++){let Ls=Tt[ln];pe.update(Ls,wn),pe.bind(Ls,wn)}}return wn}function te(S,I){S.ambientLightColor.needsUpdate=I,S.lightProbe.needsUpdate=I,S.sunLights.needsUpdate=I,S.sunLightShadows.needsUpdate=I,S.directionalLights.needsUpdate=I,S.directionalLightShadows.needsUpdate=I,S.pointLights.needsUpdate=I,S.pointLightShadows.needsUpdate=I,S.spotLights.needsUpdate=I,S.spotLightShadows.needsUpdate=I,S.rectAreaLights.needsUpdate=I,S.hemisphereLights.needsUpdate=I}function ie(S){return S.isMeshLambertMaterial||S.isMeshToonMaterial||S.isMeshPhongMaterial||S.isMeshStandardMaterial||S.isShadowMaterial||S.isShaderMaterial&&S.lights===!0}this.getActiveCubeFace=function(){return K},this.getActiveMipmapLevel=function(){return ne},this.getRenderTarget=function(){return oe},this.setRenderTargetTextures=function(S,I,J){let Z=O.get(S);Z.__autoAllocateDepthBuffer=S.resolveDepthBuffer===!1,Z.__autoAllocateDepthBuffer===!1&&(Z.__useRenderToTexture=!1),O.get(S.texture).__webglTexture=I,O.get(S.depthTexture).__webglTexture=Z.__autoAllocateDepthBuffer?void 0:J,Z.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(S,I){let J=O.get(S);J.__webglFramebuffer=I,J.__useDefaultFramebuffer=I===void 0},this.setRenderTarget=function(S,I=0,J=0){oe=S,K=I,ne=J;let Z=null,$=!1,Ee=!1;if(S){let Re=O.get(S);if(Re.__useDefaultFramebuffer!==void 0){_.bindFramebuffer(V.FRAMEBUFFER,Re.__webglFramebuffer),ce.copy(S.viewport),re.copy(S.scissor),xe=S.scissorTest,_.viewport(ce),_.scissor(re),_.setScissorTest(xe),j=-1;return}else if(Re.__webglFramebuffer===void 0)ee.setupRenderTarget(S);else if(Re.__hasExternalTextures)ee.rebindTextures(S,O.get(S.texture).__webglTexture,O.get(S.depthTexture).__webglTexture);else if(S.depthBuffer){let dt=S.depthTexture;if(Re.__boundDepthTexture!==dt){if(dt!==null&&O.has(dt)&&(S.width!==dt.image.width||S.height!==dt.image.height))throw new Error("THREE.WebGLRenderer: Attached DepthTexture is initialized to the incorrect size.");ee.setupDepthRenderbuffer(S)}}let Ge=S.texture;(Ge.isData3DTexture||Ge.isDataArrayTexture||Ge.isCompressedArrayTexture)&&(Ee=!0);let et=O.get(S).__webglFramebuffer;S.isWebGLCubeRenderTarget?(Array.isArray(et[I])?Z=et[I][J]:Z=et[I],$=!0):S.samples>0&&ee.useMultisampledRTT(S)===!1?Z=O.get(S).__webglMultisampledFramebuffer:Array.isArray(et)?Z=et[J]:Z=et,ce.copy(S.viewport),re.copy(S.scissor),xe=S.scissorTest}else ce.copy(ge).multiplyScalar(W).floor(),re.copy(Be).multiplyScalar(W).floor(),xe=Je;if(J!==0&&(Z=z),_.bindFramebuffer(V.FRAMEBUFFER,Z)&&_.drawBuffers(S,Z),_.viewport(ce),_.scissor(re),_.setScissorTest(xe),$){let Re=O.get(S.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_CUBE_MAP_POSITIVE_X+I,Re.__webglTexture,J)}else if(Ee){let Re=I;for(let Ge=0;Ge<S.textures.length;Ge++){let et=O.get(S.textures[Ge]);V.framebufferTextureLayer(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0+Ge,et.__webglTexture,J,Re)}}else if(S!==null&&J!==0){let Re=O.get(S.texture);V.framebufferTexture2D(V.FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,Re.__webglTexture,J)}j=-1};function He(S){let I=O.get(S);return(I.__readFormat!==S.format||I.__readType!==S.type)&&(I.__readFormat=S.format,I.__readType=S.type,I.__formatReadable=b.textureFormatReadable(S.format),I.__typeReadable=b.textureTypeReadable(S.type)),I}this.readRenderTargetPixels=function(S,I,J,Z,$,Ee,Se,Re=0){if(!(S&&S.isWebGLRenderTarget)){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ge=O.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Se!==void 0&&(Ge=Ge[Se]),Ge){_.bindFramebuffer(V.FRAMEBUFFER,Ge);try{let et=S.textures[Re],dt=et.format,pt=et.type;S.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Re);let Ze=He(et);if(Ze.__formatReadable===!1){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(Ze.__typeReadable===!1){lt("WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}I>=0&&I<=S.width-Z&&J>=0&&J<=S.height-$&&V.readPixels(I,J,Z,$,Te.convert(dt),Te.convert(pt),Ee)}finally{let et=oe!==null?O.get(oe).__webglFramebuffer:null;_.bindFramebuffer(V.FRAMEBUFFER,et)}}},this.readRenderTargetPixelsAsync=async function(S,I,J,Z,$,Ee,Se,Re=0){if(!(S&&S.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ge=O.get(S).__webglFramebuffer;if(S.isWebGLCubeRenderTarget&&Se!==void 0&&(Ge=Ge[Se]),Ge)if(I>=0&&I<=S.width-Z&&J>=0&&J<=S.height-$){_.bindFramebuffer(V.FRAMEBUFFER,Ge);let et=S.textures[Re],dt=et.format,pt=et.type;S.textures.length>1&&V.readBuffer(V.COLOR_ATTACHMENT0+Re);let Ze=He(et);if(Ze.__formatReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(Ze.__typeReadable===!1)throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let wt=V.createBuffer();V.bindBuffer(V.PIXEL_PACK_BUFFER,wt),V.bufferData(V.PIXEL_PACK_BUFFER,Ee.byteLength,V.STREAM_READ),V.readPixels(I,J,Z,$,Te.convert(dt),Te.convert(pt),0),V.bindBuffer(V.PIXEL_PACK_BUFFER,null);let Ot=oe!==null?O.get(oe).__webglFramebuffer:null;_.bindFramebuffer(V.FRAMEBUFFER,Ot);let Pt=V.fenceSync(V.SYNC_GPU_COMMANDS_COMPLETE,0);return V.flush(),await Fp(V,Pt,4),V.bindBuffer(V.PIXEL_PACK_BUFFER,wt),V.getBufferSubData(V.PIXEL_PACK_BUFFER,0,Ee),V.bindBuffer(V.PIXEL_PACK_BUFFER,null),V.deleteBuffer(wt),V.deleteSync(Pt),Ee}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(S,I=null,J=0){let Z=Math.pow(2,-J),$=Math.floor(S.image.width*Z),Ee=Math.floor(S.image.height*Z),Se=I!==null?I.x:0,Re=I!==null?I.y:0;ee.setTexture2D(S,0),V.copyTexSubImage2D(V.TEXTURE_2D,J,0,0,Se,Re,$,Ee),_.unbindTexture()},this.copyTextureToTexture=function(S,I,J=null,Z=null,$=0,Ee=0){let Se,Re,Ge,et,dt,pt,Ze,wt,Ot,Pt=S.isCompressedTexture?S.mipmaps[Ee]:S.image;if(J!==null)Se=J.max.x-J.min.x,Re=J.max.y-J.min.y,Ge=J.isBox3?J.max.z-J.min.z:1,et=J.min.x,dt=J.min.y,pt=J.isBox3?J.min.z:0;else{let kt=Math.pow(2,-$);Se=Math.floor(Pt.width*kt),Re=Math.floor(Pt.height*kt),S.isDataArrayTexture?Ge=Pt.depth:S.isData3DTexture?Ge=Math.floor(Pt.depth*kt):Ge=1,et=0,dt=0,pt=0}Z!==null?(Ze=Z.x,wt=Z.y,Ot=Z.z):(Ze=0,wt=0,Ot=0);let St=Te.convert(I.format),Zt=Te.convert(I.type),Ve;I.isData3DTexture?(ee.setTexture3D(I,0),Ve=V.TEXTURE_3D):I.isDataArrayTexture||I.isCompressedArrayTexture?(ee.setTexture2DArray(I,0),Ve=V.TEXTURE_2D_ARRAY):(ee.setTexture2D(I,0),Ve=V.TEXTURE_2D),_.activeTexture(V.TEXTURE0),_.pixelStorei(V.UNPACK_FLIP_Y_WEBGL,I.flipY),_.pixelStorei(V.UNPACK_PREMULTIPLY_ALPHA_WEBGL,I.premultiplyAlpha),_.pixelStorei(V.UNPACK_ALIGNMENT,I.unpackAlignment);let nn=_.getParameter(V.UNPACK_ROW_LENGTH),vt=_.getParameter(V.UNPACK_IMAGE_HEIGHT),wn=_.getParameter(V.UNPACK_SKIP_PIXELS),In=_.getParameter(V.UNPACK_SKIP_ROWS),Vn=_.getParameter(V.UNPACK_SKIP_IMAGES);_.pixelStorei(V.UNPACK_ROW_LENGTH,Pt.width),_.pixelStorei(V.UNPACK_IMAGE_HEIGHT,Pt.height),_.pixelStorei(V.UNPACK_SKIP_PIXELS,et),_.pixelStorei(V.UNPACK_SKIP_ROWS,dt),_.pixelStorei(V.UNPACK_SKIP_IMAGES,pt);let es=S.isDataArrayTexture||S.isData3DTexture,Et=I.isDataArrayTexture||I.isData3DTexture;if(S.isDepthTexture){let kt=O.get(S),on=O.get(I),Tt=O.get(kt.__renderTarget),ln=O.get(on.__renderTarget);_.bindFramebuffer(V.READ_FRAMEBUFFER,Tt.__webglFramebuffer),_.bindFramebuffer(V.DRAW_FRAMEBUFFER,ln.__webglFramebuffer);for(let ts=0;ts<Ge;ts++)es&&(V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,O.get(S).__webglTexture,$,pt+ts),V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,O.get(I).__webglTexture,Ee,Ot+ts)),V.blitFramebuffer(et,dt,Se,Re,Ze,wt,Se,Re,V.DEPTH_BUFFER_BIT,V.NEAREST);_.bindFramebuffer(V.READ_FRAMEBUFFER,null),_.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else if($!==0||S.isRenderTargetTexture||O.has(S)){let kt=O.get(S),on=O.get(I);_.bindFramebuffer(V.READ_FRAMEBUFFER,F),_.bindFramebuffer(V.DRAW_FRAMEBUFFER,q);for(let Tt=0;Tt<Ge;Tt++)es?V.framebufferTextureLayer(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,kt.__webglTexture,$,pt+Tt):V.framebufferTexture2D(V.READ_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,kt.__webglTexture,$),Et?V.framebufferTextureLayer(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,on.__webglTexture,Ee,Ot+Tt):V.framebufferTexture2D(V.DRAW_FRAMEBUFFER,V.COLOR_ATTACHMENT0,V.TEXTURE_2D,on.__webglTexture,Ee),$!==0?V.blitFramebuffer(et,dt,Se,Re,Ze,wt,Se,Re,V.COLOR_BUFFER_BIT,V.NEAREST):Et?V.copyTexSubImage3D(Ve,Ee,Ze,wt,Ot+Tt,et,dt,Se,Re):V.copyTexSubImage2D(Ve,Ee,Ze,wt,et,dt,Se,Re);_.bindFramebuffer(V.READ_FRAMEBUFFER,null),_.bindFramebuffer(V.DRAW_FRAMEBUFFER,null)}else Et?S.isDataTexture||S.isData3DTexture?V.texSubImage3D(Ve,Ee,Ze,wt,Ot,Se,Re,Ge,St,Zt,Pt.data):I.isCompressedArrayTexture?V.compressedTexSubImage3D(Ve,Ee,Ze,wt,Ot,Se,Re,Ge,St,Pt.data):V.texSubImage3D(Ve,Ee,Ze,wt,Ot,Se,Re,Ge,St,Zt,Pt):S.isDataTexture?V.texSubImage2D(V.TEXTURE_2D,Ee,Ze,wt,Se,Re,St,Zt,Pt.data):S.isCompressedTexture?V.compressedTexSubImage2D(V.TEXTURE_2D,Ee,Ze,wt,Pt.width,Pt.height,St,Pt.data):V.texSubImage2D(V.TEXTURE_2D,Ee,Ze,wt,Se,Re,St,Zt,Pt);_.pixelStorei(V.UNPACK_ROW_LENGTH,nn),_.pixelStorei(V.UNPACK_IMAGE_HEIGHT,vt),_.pixelStorei(V.UNPACK_SKIP_PIXELS,wn),_.pixelStorei(V.UNPACK_SKIP_ROWS,In),_.pixelStorei(V.UNPACK_SKIP_IMAGES,Vn),Ee===0&&I.generateMipmaps&&V.generateMipmap(Ve),_.unbindTexture()},this.initRenderTarget=function(S){O.get(S).__webglFramebuffer===void 0&&ee.setupRenderTarget(S)},this.initTexture=function(S){S.isCubeTexture?ee.setTextureCube(S,0):S.isData3DTexture?ee.setTexture3D(S,0):S.isDataArrayTexture||S.isCompressedArrayTexture?ee.setTexture2DArray(S,0):ee.setTexture2D(S,0),_.unbindTexture()},this.resetState=function(){K=0,ne=0,oe=null,_.reset(),Pe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return ui}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=bt._getDrawingBufferColorSpace(e),t.unpackColorSpace=bt._getUnpackColorSpace()}};var nu=class extends Kt{constructor(e=document.createElement("div")){super(),this.isCSS2DObject=!0,this.element=e,this.element.style.position="absolute",this.element.style.userSelect="none",this.element.setAttribute("draggable",!1),this.center=new nt(.5,.5),this.rotation2D=0,this.addEventListener("removed",function(){this.traverse(function(t){t.element&&t.element instanceof t.element.ownerDocument.defaultView.Element&&t.element.parentNode!==null&&t.element.remove()})})}copy(e,t){return super.copy(e,t),this.element=e.element.cloneNode(!0),this.center=e.center,this.rotation2D=e.rotation2D,this}},ea=new Y,gm=new Mt,_m=new Mt,xm=new Y,ym=new Y,iu=class{constructor(e={}){let t=this,i,s,r,a,o={objects:new WeakMap},l=e.element!==void 0?e.element:document.createElement("div");l.style.overflow="hidden",this.domElement=l,this.sortObjects=!0,this.getSize=function(){return{width:i,height:s}},this.render=function(m,x){m.matrixWorldAutoUpdate===!0&&m.updateMatrixWorld(),x.parent===null&&x.matrixWorldAutoUpdate===!0&&x.updateMatrixWorld(),gm.copy(x.matrixWorldInverse),_m.multiplyMatrices(x.projectionMatrix,gm),u(m,m,x),this.sortObjects&&f(m)},this.setSize=function(m,x){i=m,s=x,r=i/2,a=s/2,l.style.width=m+"px",l.style.height=x+"px"};function c(m){m.isCSS2DObject&&(m.element.style.display="none");for(let x=0,p=m.children.length;x<p;x++)c(m.children[x])}function u(m,x,p){if(m.visible===!1){c(m);return}if(m.isCSS2DObject){ea.setFromMatrixPosition(m.matrixWorld),ea.applyMatrix4(_m);let g=ea.z>=-1&&ea.z<=1&&m.layers.test(p.layers)===!0,A=m.element;if(A.style.display=g===!0?"":"none",g===!0){m.onBeforeRender(t,x,p);let v=100*m.center.x,w=100*m.center.y;A.style.transformOrigin=`${v}% ${w}%`;let M=-m.rotation2D,E=ea.x*r+r,y=-ea.y*a+a;A.style.transform=`translate(${-v}%, ${-w}%) translate(${E}px, ${y}px) rotate(${M}rad)`,A.parentNode!==l&&l.appendChild(A),m.onAfterRender(t,x,p)}let R={distanceToCameraSquared:h(p,m)};o.objects.set(m,R)}for(let g=0,A=m.children.length;g<A;g++)u(m.children[g],x,p)}function h(m,x){return xm.setFromMatrixPosition(m.matrixWorld),ym.setFromMatrixPosition(x.matrixWorld),xm.distanceToSquared(ym)}function d(m){let x=[];return m.traverseVisible(function(p){p.isCSS2DObject&&x.push(p)}),x}function f(m){let x=d(m).sort(function(g,A){if(g.renderOrder!==A.renderOrder)return A.renderOrder-g.renderOrder;let R=o.objects.get(g).distanceToCameraSquared,v=o.objects.get(A).distanceToCameraSquared;return R-v}),p=x.length;for(let g=0,A=x.length;g<A;g++)x[g].element.style.zIndex=p-g}}};var vm=new Un,su=new Y,ta=class extends bo{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";let e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],t=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new zt(e,3)),this.setAttribute("uv",new zt(t,2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return t!==void 0&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new Ai(t,6,1);return this.setAttribute("instanceStart",new xn(i,3,0)),this.setAttribute("instanceEnd",new xn(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new Ai(t,6,1);return this.setAttribute("instanceColorStart",new xn(i,3,0)),this.setAttribute("instanceColorEnd",new xn(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new po(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Un);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;e!==void 0&&t!==void 0&&(this.boundingBox.setFromBufferAttribute(e),vm.setFromBufferAttribute(t),this.boundingBox.union(vm))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new di),this.boundingBox===null&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(e!==void 0&&t!==void 0){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let s=0;for(let r=0,a=e.count;r<a;r++)su.fromBufferAttribute(e,r),s=Math.max(s,i.distanceToSquared(su)),su.fromBufferAttribute(t,r),s=Math.max(s,i.distanceToSquared(su));this.boundingSphere.radius=Math.sqrt(s),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}};ke.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new nt},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};Mn.line={uniforms:Io.merge([ke.common,ke.fog,ke.line]),vertexShader:`
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
		`};var na=class extends Nt{constructor(e){super({type:"LineMaterial",uniforms:Io.clone(Mn.line.uniforms),vertexShader:Mn.line.vertexShader,fragmentShader:Mn.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0!==this.worldUnits&&(this.needsUpdate=!0),e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}};var ph=new yt,bm=new Y,Sm=new Y,un=new yt,dn=new yt,Pi=new yt,mh=new Y,gh=new Mt,hn=new So,Mm=new Y,ru=new Un,au=new di,Li=new yt,Ii,Ks;function wm(n,e,t){return Li.set(0,0,-e,1).applyMatrix4(n.projectionMatrix),Li.multiplyScalar(1/Li.w),Li.x=Ks/t.width,Li.y=Ks/t.height,Li.applyMatrix4(n.projectionMatrixInverse),Li.multiplyScalar(1/Li.w),Math.abs(Math.max(Li.x,Li.y))}function Fb(n,e){let t=n.matrixWorld,i=n.geometry,s=i.attributes.instanceStart,r=i.attributes.instanceEnd,a=Math.min(i.instanceCount,s.count);for(let o=0,l=a;o<l;o++){hn.start.fromBufferAttribute(s,o),hn.end.fromBufferAttribute(r,o),hn.applyMatrix4(t);let c=new Y,u=new Y;Ii.distanceSqToSegment(hn.start,hn.end,u,c),u.distanceTo(c)<Ks*.5&&e.push({point:u,pointOnLine:c,distance:Ii.origin.distanceTo(u),object:n,face:null,faceIndex:o,uv:null,uv1:null})}}function Ob(n,e,t){let i=e.projectionMatrix,r=n.material.resolution,a=n.matrixWorld,o=n.geometry,l=o.attributes.instanceStart,c=o.attributes.instanceEnd,u=Math.min(o.instanceCount,l.count),h=-e.near;Ii.at(1,Pi),Pi.w=1,Pi.applyMatrix4(e.matrixWorldInverse),Pi.applyMatrix4(i),Pi.multiplyScalar(1/Pi.w),Pi.x*=r.x/2,Pi.y*=r.y/2,Pi.z=0,mh.copy(Pi),gh.multiplyMatrices(e.matrixWorldInverse,a);for(let d=0,f=u;d<f;d++){if(un.fromBufferAttribute(l,d),dn.fromBufferAttribute(c,d),un.w=1,dn.w=1,un.applyMatrix4(gh),dn.applyMatrix4(gh),un.z>h&&dn.z>h)continue;if(un.z>h){let R=un.z-dn.z,v=(un.z-h)/R;un.lerp(dn,v)}else if(dn.z>h){let R=dn.z-un.z,v=(dn.z-h)/R;dn.lerp(un,v)}un.applyMatrix4(i),dn.applyMatrix4(i),un.multiplyScalar(1/un.w),dn.multiplyScalar(1/dn.w),un.x*=r.x/2,un.y*=r.y/2,dn.x*=r.x/2,dn.y*=r.y/2,hn.start.copy(un),hn.start.z=0,hn.end.copy(dn),hn.end.z=0;let x=hn.closestPointToPointParameter(mh,!0);hn.at(x,Mm);let p=Yd.lerp(un.z,dn.z,x),g=p>=-1&&p<=1,A=mh.distanceTo(Mm)<Ks*.5;if(g&&A){hn.start.fromBufferAttribute(l,d),hn.end.fromBufferAttribute(c,d),hn.start.applyMatrix4(a),hn.end.applyMatrix4(a);let R=new Y,v=new Y;Ii.distanceSqToSegment(hn.start,hn.end,v,R),t.push({point:v,pointOnLine:R,distance:Ii.origin.distanceTo(v),object:n,face:null,faceIndex:d,uv:null,uv1:null})}}}var ou=class extends Vt{constructor(e=new ta,t=new na({color:Math.random()*16777215})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,s=new Float32Array(2*t.count);for(let a=0,o=0,l=t.count;a<l;a++,o+=2)bm.fromBufferAttribute(t,a),Sm.fromBufferAttribute(i,a),s[o]=o===0?0:s[o-1],s[o+1]=s[o]+bm.distanceTo(Sm);let r=new Ai(s,2,1);return e.setAttribute("instanceDistanceStart",new xn(r,1,0)),e.setAttribute("instanceDistanceEnd",new xn(r,1,1)),this}raycast(e,t){let i=this.material.worldUnits,s=e.camera;if(s===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.'),i===!1&&(this.material.resolution.x===0||this.material.resolution.y===0))return;let r=e.params.Line2!==void 0&&e.params.Line2.threshold||0;Ii=e.ray;let a=this.matrixWorld,o=this.geometry,l=this.material;Ks=l.linewidth+r,o.boundingSphere===null&&o.computeBoundingSphere(),au.copy(o.boundingSphere).applyMatrix4(a);let c;if(i)c=Ks*.5;else{let h=Math.max(s.near,au.distanceToPoint(Ii.origin));c=wm(s,h,l.resolution)}if(au.radius+=c,Ii.intersectsSphere(au)===!1)return;o.boundingBox===null&&o.computeBoundingBox(),ru.copy(o.boundingBox).applyMatrix4(a);let u;if(i)u=Ks*.5;else{let h=Math.max(s.near,ru.distanceToPoint(Ii.origin));u=wm(s,h,l.resolution)}ru.expandByScalar(u),Ii.intersectsBox(ru)!==!1&&(i?Fb(this,t):Ob(this,s,t))}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(ph),this.material.uniforms.resolution.value.set(ph.z,ph.w))}};var Qs=n=>typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:120}):setTimeout(()=>n({timeRemaining:()=>8,didTimeout:!0}),16),Em=n=>typeof cancelIdleCallback=="function"?cancelIdleCallback(n):clearTimeout(n);function _h(n){return n.repeat.set(1,-1),n.offset.set(0,1),n.userData.topDown=!0,n}function Tm(n,e,t={}){let i=e.width,s=e.height,r=t.mipmaps!==!1,a=t.rows||256,o=r?Math.floor(Math.log2(Math.max(i,s)))+1:1,l=T=>[Math.max(1,i>>T),Math.max(1,s>>T)],c=new $i(null,i,s,rn,Jt);c.colorSpace=t.colorSpace??Bt,c.flipY=!1,c.premultiplyAlpha=!1,c.unpackAlignment=4,c.generateMipmaps=!1,c.magFilter=It,c.minFilter=r?On:It,r&&(c.mipmaps=Array.from({length:o},(T,P)=>({data:null,width:l(P)[0],height:l(P)[1]}))),c.anisotropy=t.anisotropy??1,t.wrapS&&(c.wrapS=t.wrapS),_h(c),c.source.dataReady=!1,c.needsUpdate=!0;let u={w:i,h:s,levels:o,chunks:[],blits:[],fence_waits:0,done:!1,cancelled:!1,t0:performance.now(),t_done:null,alloc_ms:null},h=n.getContext(),d=null,f=null,m=!1,x=null,p=null,g=new Gt,A=[];for(let T=0;T<s;T+=a)A.push({kind:"upload",level:0,y0:T,y1:Math.min(s,T+a)});for(let T=1;T<o;T++){let[P,k]=l(T),U=Math.max(1,Math.floor(a*i/P/2));for(let z=0;z<k;z+=U)A.push({kind:"blit",level:T,y0:z,y1:Math.min(k,z+U)})}let R=new Wr(new nt,new nt),v=new nt;function w(T){let P=n.properties.get(c).__webglTexture,[k,U]=l(T.level-1),[z,F]=l(T.level),q=Math.round(T.y0*U/F),K=Math.round(T.y1*U/F);x=x||h.createFramebuffer(),p=p||h.createFramebuffer();let ne=n.state;ne.bindFramebuffer(h.READ_FRAMEBUFFER,x),h.framebufferTexture2D(h.READ_FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,P,T.level-1),ne.bindFramebuffer(h.DRAW_FRAMEBUFFER,p),h.framebufferTexture2D(h.DRAW_FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,P,T.level),h.blitFramebuffer(0,q,k,K,0,T.y0,z,T.y1,h.COLOR_BUFFER_BIT,h.LINEAR),h.framebufferTexture2D(h.READ_FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,null,0),h.framebufferTexture2D(h.DRAW_FRAMEBUFFER,h.COLOR_ATTACHMENT0,h.TEXTURE_2D,null,0),ne.bindFramebuffer(h.READ_FRAMEBUFFER,null),ne.bindFramebuffer(h.DRAW_FRAMEBUFFER,null)}function M(){d&&(h.deleteSync(d),d=null),x&&(h.deleteFramebuffer(x),x=null),p&&(h.deleteFramebuffer(p),p=null)}let E=new Promise((T,P)=>{let k=async()=>{if(f=null,!m)try{if(u.alloc_ms===null){let F=performance.now();n.initTexture(c),u.alloc_ms=performance.now()-F,f=Qs(k);return}if(d){if(h.getSyncParameter(d,h.SYNC_STATUS)!==h.SIGNALED){u.fence_waits++,f=Qs(k);return}h.deleteSync(d),d=null}if(!A.length){M(),u.done=!0,u.t_done=performance.now(),T(c);return}let U=A.shift(),z=performance.now();if(U.kind==="upload"){let F=await createImageBitmap(e,0,U.y0,i,U.y1-U.y0);if(m){F.close&&F.close();return}let q=performance.now();g.image=F,v.set(0,U.y0),n.copyTextureToTexture(g,c,null,v,0,0),F.close&&F.close(),u.chunks.push({level:0,rows:U.y1-U.y0,at:z,crop_ms:q-z,ms:performance.now()-q})}else w(U),u.blits.push({level:U.level,rows:U.y1-U.y0,at:z,ms:performance.now()-z});d=h.fenceSync(h.SYNC_GPU_COMMANDS_COMPLETE,0),h.flush(),f=Qs(k)}catch(U){M(),P(U)}};f=Qs(k)});function y(){u.done||m||(m=!0,u.cancelled=!0,f!==null&&Em(f),M(),c.dispose())}return{texture:c,promise:E,cancel:y,state:u}}function Am(n,e,t={}){let i=e.width,s=e.height,r=t.nx||4,a=t.ny||2,o=t.border??8,l=i/r,c=s/a,u=l+2*o,h=c+2*o,d=t.mipmaps!==!1,f=t.rows||256,m=d?Math.floor(Math.log2(Math.max(u,h)))+1:1,x=j=>[Math.max(1,u>>j),Math.max(1,h>>j)],p=n.getContext(),g=[],A={isTiled:!0,tiles:g,nx:r,ny:a,cw:l,ch:c,border:o,size:[u,h],image:{width:i,height:s},levels:m,bytes:r*a*u*h*(t.format===$s?1:4)*(d?4/3:1),dispose(){for(let j of g)j.dispose()}},R={w:i,h:s,nx:r,ny:a,levels:m,chunks:[],blits:[],allocs:[],fence_waits:0,done:!1,cancelled:!1,t0:performance.now(),t_done:null},v=null,w=null,M=!1,E=null,y=null,T=new Gt,P=new Wr(new nt,new nt),k=new nt,U=[],z=(j,le)=>{let ce=[],re=0,xe=(j%i+i)%i,Xe=le;for(;Xe>0;){let Ne=Math.min(Xe,i-xe);ce.push([xe,Ne,re]),re+=Ne,Xe-=Ne,xe=0}return ce};for(let j=0;j<a;j++)for(let le=0;le<r;le++){let ce=j*r+le;U.push({kind:"alloc",ti:ce});let re=z(le*l-o,u);for(let xe=0;xe<h;){let Xe=j*c-o+xe;if(Xe<0||Xe>=s){U.push({kind:"upload",ti:ce,sy:Xe<0?0:s-1,h:1,dy:xe,sx:re}),xe++;continue}let Ne=Math.min(f,h-xe,s-Xe);U.push({kind:"upload",ti:ce,sy:Xe,h:Ne,dy:xe,sx:re}),xe+=Ne}for(let xe=1;xe<m;xe++){let[Xe,Ne]=x(xe),qe=Math.max(1,Math.floor(f*u/Xe/2));for(let H=0;H<Ne;H+=qe)U.push({kind:"blit",ti:ce,level:xe,y0:H,y1:Math.min(Ne,H+qe)})}}function F(){let j=new $i(null,u,h,t.format??rn,Jt);return j.colorSpace=t.colorSpace??Bt,j.flipY=!1,j.premultiplyAlpha=!1,j.unpackAlignment=4,j.generateMipmaps=!1,j.magFilter=It,j.minFilter=d?On:It,j.wrapS=j.wrapT=Rn,d&&(j.mipmaps=Array.from({length:m},(le,ce)=>({data:null,width:x(ce)[0],height:x(ce)[1]}))),j.anisotropy=t.anisotropy??1,j.source.dataReady=!1,j.needsUpdate=!0,j}function q(j){let le=n.properties.get(g[j.ti]).__webglTexture,[ce,re]=x(j.level-1),[xe,Xe]=x(j.level),Ne=Math.round(j.y0*re/Xe),qe=Math.round(j.y1*re/Xe);E=E||p.createFramebuffer(),y=y||p.createFramebuffer();let H=n.state;H.bindFramebuffer(p.READ_FRAMEBUFFER,E),p.framebufferTexture2D(p.READ_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,le,j.level-1),H.bindFramebuffer(p.DRAW_FRAMEBUFFER,y),p.framebufferTexture2D(p.DRAW_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,le,j.level),p.blitFramebuffer(0,Ne,ce,qe,0,j.y0,xe,j.y1,p.COLOR_BUFFER_BIT,p.LINEAR),p.framebufferTexture2D(p.READ_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,null,0),p.framebufferTexture2D(p.DRAW_FRAMEBUFFER,p.COLOR_ATTACHMENT0,p.TEXTURE_2D,null,0),H.bindFramebuffer(p.READ_FRAMEBUFFER,null),H.bindFramebuffer(p.DRAW_FRAMEBUFFER,null)}function K(){v&&(p.deleteSync(v),v=null),E&&(p.deleteFramebuffer(E),E=null),y&&(p.deleteFramebuffer(y),y=null)}let ne=new Promise((j,le)=>{let ce=()=>{if(w=null,!M)try{if(v){if(p.getSyncParameter(v,p.SYNC_STATUS)!==p.SIGNALED){R.fence_waits++,w=Qs(ce);return}p.deleteSync(v),v=null}if(!U.length){K(),R.done=!0,R.t_done=performance.now(),j(A);return}let re=U.shift(),xe=performance.now();if(re.kind==="alloc"){let Xe=F();g[re.ti]=Xe,n.initTexture(Xe),R.allocs.push({ti:re.ti,at:xe,ms:performance.now()-xe})}else if(re.kind==="upload"){T.image=e;for(let[Xe,Ne,qe]of re.sx)P.min.set(Xe,re.sy),P.max.set(Xe+Ne,re.sy+re.h),k.set(qe,re.dy),n.copyTextureToTexture(T,g[re.ti],P,k,0,0);R.chunks.push({ti:re.ti,rows:re.h,at:xe,ms:performance.now()-xe})}else q(re),R.blits.push({ti:re.ti,level:re.level,at:xe,ms:performance.now()-xe});v=p.fenceSync(p.SYNC_GPU_COMMANDS_COMPLETE,0),p.flush(),w=Qs(ce)}catch(re){K(),le(re)}};w=Qs(ce)});function oe(){R.done||M||(M=!0,R.cancelled=!0,w!==null&&Em(w),K(),A.dispose())}return{texture:A,promise:ne,cancel:oe,state:R}}function Kn(n,e=!1,t=8){let i=r=>e?`textureLod(${r}, q, 0.0)`:`textureGrad(${r}, q, gx, gy)`;if(t===1)return[`uniform sampler2D ${n}T0; uniform float ${n}Tiled; uniform vec4 ${n}Geo;`,`vec4 ${n}_sampleG(vec2 uv, vec2 gx, vec2 gy) { vec2 q = uv; return ${i(n+"T0")}; }`,`vec4 ${n}_sample(vec2 uv) { return ${n}_sampleG(uv, dFdx(uv), dFdy(uv)); }`].join(`
`);let s=[0,1,2,3,4,5,6,7].map(r=>`${r?"else ":""}if (i == ${r}) c = ${i(n+"T"+r)};`).join(" ");return[...[0,1,2,3,4,5,6,7].map(r=>`uniform sampler2D ${n}T${r};`),`uniform float ${n}Tiled; uniform vec4 ${n}Geo;`,`vec4 ${n}_pick(int i, vec2 q, vec2 gx, vec2 gy) { vec4 c = vec4(0.0); ${s} return c; }`,`vec4 ${n}_sampleG(vec2 uv, vec2 gx, vec2 gy) {`,`  if (${n}Tiled < 0.5) { vec2 q = uv; return ${i(n+"T0")}; }`,`  vec2 n = ${n}Geo.xy; float C = ${n}Geo.z, B = ${n}Geo.w, s = C / (C + 2.0 * B);`,"  vec2 g = uv * n; vec2 ip = floor(g); vec2 f = g - ip;","  ip.x = mod(ip.x, n.x); if (ip.y > n.y - 1.0) { ip.y = n.y - 1.0; f.y = 1.0; } if (ip.y < 0.0) { ip.y = 0.0; f.y = 0.0; }","  vec2 q = (B + f * C) / (C + 2.0 * B);",`  return ${n}_pick(int(ip.y * n.x + ip.x), q, gx * n * s, gy * n * s);`,"}",`vec4 ${n}_sample(vec2 uv) { return ${n}_sampleG(uv, dFdx(uv), dFdy(uv)); }`].join(`
`)}function Qn(n,e=8){let t={[n+"Tiled"]:{value:0},[n+"Geo"]:{value:new yt(4,2,2048,8)}};for(let i=0;i<e;i++)t[n+"T"+i]={value:null};return t}function Es(n,e,t){if(t&&t.isTiled){for(let i=0;i<8;i++)n[e+"T"+i]&&(n[e+"T"+i].value=t.tiles[i]||null);n[e+"Tiled"].value=1,n[e+"Geo"].value.set(t.nx,t.ny,t.cw,t.border)}else{n[e+"T0"].value=t;for(let i=1;i<8;i++)n[e+"T"+i]&&(n[e+"T"+i].value=null);n[e+"Tiled"].value=0}}var lu={cloudHeightKm:8,cloudShadow:.55,cloudNightAlpha:.45,glint:.75,glintPower:140,glintColor:[1,.96,.88]},Cm="float cloud_alpha(float r) { return clamp((r - 0.08) / 0.82, 0.0, 1.0); }",kb=`
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
}`;function Rm(n,e={}){let t=lu;return new Nt({uniforms:{...Qn("map",1),...Qn("night",1),...Qn("land",1),...Qn("cloud"),mapOn:{value:0},nightMapOn:{value:0},landOn:{value:0},base:{value:new rt(n)},oblate:{value:1},sunDir:{value:new Y(1,0,0)},sun:{value:e.sun??1.3},ambient:{value:e.ambient??.004},night:{value:e.night??1},nightOn:{value:1},cloudOn:{value:0},cloudShadow:{value:t.cloudShadow},cloudH:{value:t.cloudHeightKm/6371},glint:{value:t.glint},glintPower:{value:t.glintPower},glintColor:{value:new Y(...t.glintColor)},pDay:{value:null},pNight:{value:null},pTable:{value:null},pInfo:{value:new yt(43200,21600,496,8)},pRowOff:{value:new yt},pGridX:{value:new yt(1,1,1,1)},pGridY:{value:new yt(1,1,1,1)},pAniso:{value:8},pReady:{value:0}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec2 vUv; varying vec3 vNW; varying vec3 vView; varying vec3 vNorth;","void main() { vUv = uv; vNW = normalize(mat3(modelMatrix) * normal); vNorth = normalize(mat3(modelMatrix) * vec3(0.0, 1.0, 0.0));","  vec4 wp = modelMatrix * vec4(position, 1.0); vView = cameraPosition - wp.xyz; gl_Position = projectionMatrix * viewMatrix * wp;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",Kn("map",!1,1),Kn("night",!1,1),Kn("land",!1,1),Kn("cloud"),kb,Cm,"uniform float mapOn; uniform float nightMapOn; uniform float landOn; uniform vec3 base; uniform float oblate; uniform vec3 sunDir; uniform float sun; uniform float ambient; uniform float night; uniform float nightOn;","uniform float cloudOn; uniform float cloudShadow; uniform float cloudH; uniform float glint; uniform float glintPower; uniform vec3 glintColor;","varying vec2 vUv; varying vec3 vNW; varying vec3 vView; varying vec3 vNorth;","void main() {","#include <logdepthbuf_fragment>","  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);","  vec2 gx = dFdx(uv), gy = dFdy(uv);","  float lod = pageLod(gx, gy);","  float g = smoothstep(3.9, 4.4, lod);","  vec3 N = normalize(vNW);","  float ndl = dot(N, sunDir);","  vec3 day = base; float landF = 1.0; vec3 nl = vec3(0.0); float nightWeight = (night > 0.0 && nightMapOn > 0.5 && nightOn > 0.5) ? 1.0 - smoothstep(-0.1, 0.1, ndl) : 0.0;","  bool dayTile = false, nightTile = false; vec4 dp, np;","  if (pReady > 0.5) {","    if (ndl > -0.05 || nightWeight <= 0.0) dayTile = pageFetch(pDay, 0, uv, gx, gy, lod, 0, dp);","    if (nightWeight > 0.0) nightTile = pageFetch(pNight, 1, uv, gx, gy, lod, 1, np);","  }","  if (dayTile && g <= 0.0) { day = dp.rgb; landF = landOn > 0.5 ? dp.a : 1.0; }","  else {","    if (mapOn > 0.5) day = map_sampleG(uv, gx, gy).rgb;","    if (landOn > 0.5) landF = land_sampleG(uv, gx, gy).r;","    if (dayTile) { day = mix(dp.rgb, day, g); landF = mix(dp.a, landF, g); }","  }","  if (nightWeight > 0.0) {","    if (nightTile && g <= 0.0) nl = np.rgb;","    else { nl = night_sampleG(uv, gx, gy).rgb; if (nightTile) nl = mix(np.rgb, nl, g); }","  }","  float cAlpha = 0.0, cShade = 0.0;","  if (cloudOn > 0.5) {","    vec3 east = cross(vNorth, N); float cl = max(length(east), 1e-3); east /= cl; vec3 north = cross(N, east);","    cAlpha = cloud_alpha(cloud_sampleG(uv, gx, gy).r);","    if (ndl > 0.0) {","      vec2 sh = (vec2(dot(sunDir, east) / (2.0 * PI * cl), -dot(sunDir, north) / PI)) * cloudH / max(ndl, 0.15);","      cShade = cloud_alpha(cloud_sampleG(uv + sh, gx, gy).r);","    }","  }","  vec3 c = day * (max(ndl, 0.0) * sun * (1.0 - cloudShadow * cShade) + ambient);","  if (nightWeight > 0.0) {","    float lum = dot(nl, vec3(0.2126, 0.7152, 0.0722));","    c += nl * (0.12 + 0.88 * smoothstep(0.05, 0.30, lum)) * night * nightWeight;","  }","  vec3 V = normalize(vView); vec3 H = normalize(sunDir + V);","  float spec = pow(max(dot(N, H), 0.0), glintPower) * smoothstep(0.0, 0.1, ndl);","  c += glintColor * glint * spec * (1.0 - landF) * (1.0 - cAlpha);","  gl_FragColor = vec4(c, 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`)})}function Pm(n={}){let e=lu;return new Nt({uniforms:{...Qn("cloud"),sunDir:{value:new Y(1,0,0)},sun:{value:n.sun??1.3},ambient:{value:n.ambient??.004},nightA:{value:e.cloudNightAlpha}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec2 vUv; varying vec3 vNW;","void main() { vUv = uv; vNW = normalize(mat3(modelMatrix) * normal); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",Kn("cloud"),Cm,"uniform vec3 sunDir; uniform float sun; uniform float ambient; uniform float nightA; varying vec2 vUv; varying vec3 vNW;","void main() {","#include <logdepthbuf_fragment>","  float a = cloud_alpha(cloud_sample(vec2(vUv.x, 1.0 - vUv.y)).r);","  float ndl = dot(normalize(vNW), sunDir);","  float lit = max(ndl, 0.0) * sun + ambient;","  gl_FragColor = vec4(vec3(lit), a * mix(nightA, 1.0, smoothstep(-0.1, 0.1, ndl)));","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`),transparent:!0,depthWrite:!1})}var ia=[{pr:2,family:!0,glow:!0,hiTex:!0},{pr:1.5,family:!0,glow:!0,hiTex:!0},{pr:1,family:!0,glow:!0,hiTex:!1},{pr:1,family:!1,glow:!1,hiTex:!1}],Bb=50,zb=150,Vb=120;function Hb(){let n=document.createElement("canvas");n.width=n.height=64;let e=n.getContext("2d");e.fillStyle="#fff",e.beginPath(),e.arc(32,32,30,0,Math.PI*2),e.fill();let t=new Vr(n);return t.colorSpace=Bt,t}function Gb(){let n=document.createElement("canvas");n.width=n.height=128;let e=n.getContext("2d"),t=e.createRadialGradient(64,64,0,64,64,64);t.addColorStop(0,"rgba(255,255,255,1)"),t.addColorStop(.18,"rgba(255,255,255,0.55)"),t.addColorStop(.45,"rgba(255,255,255,0.12)"),t.addColorStop(1,"rgba(255,255,255,0)"),e.fillStyle=t,e.fillRect(0,0,128,128);let i=new Vr(n);return i.colorSpace=Bt,i}var Wb=2e5;function xh(){try{return window.matchMedia("(pointer: coarse)").matches&&!window.matchMedia("(pointer: fine)").matches||window.innerWidth<768}catch{return!1}}function Lm(n,e,t,i){let s=t.constants,r=s.length_unit_km,a=i.scene,o=a.colors,l=new Qc({canvas:n,antialias:!0,logarithmicDepthBuffer:!0}),u=xh()?1.5:2,h={level:0,auto:!navigator.webdriver,log:[],deviceCap:u},d=()=>Math.min(window.devicePixelRatio||1,u,ia[h.level].pr);l.setPixelRatio(d());let f=new iu({element:e}),m=new kr,x=new kr;x.background=new rt(a.background),l.autoClear=!1;let p=new _n(45,1,1e-4,1e11);p.up.set(0,0,1),m.add(new vo(16777215,.06));let g=new yo(16777215,2.2);m.add(g,g.target);let A=Hb(),R=Gb(),v={t:t.tStart,s:0,sTarget:0,precision:"relative",paused:!1,cam:{target:"L2",dist:32e5,az:-1.2,el:.9},fly:null},w=[],M={},E={bary:[0,0,0]},y={},T=null,P=[],k={nightlights:!0,sunglow:!0},U=!1,z=[];function F(C,N,B,Q,te={}){let ie={name:C,layer:N,obj:B,src:Q,kind:te.kind||"line",poly:!!te.poly,label:te.label||null,labelAt:te.labelAt,priority:te.priority||0,pick:te.pick||null,radius:te.radius,minPx:te.minPx,glow:te.glow};return ie.work=new Float64Array(Q.length),(ie.kind==="sky"?x:m).add(B),ie.label&&(ie.labelObj=new nu(ie.label),ie.labelObj.center.set(-.08,.5),m.add(ie.labelObj),ie.label.style.display="none",e.appendChild(ie.label)),w.push(ie),ie}function q(C,N,B,Q=1,te=null){let ie=new ta;ie.setPositions(new Float32Array(C*6)),te&&ie.setColors(te);let He=new na({color:te?16777215:N,vertexColors:!!te,linewidth:B,transparent:Q<1,opacity:Q,depthWrite:Q>=1});P.push(He);let S=new ou(ie,He);return S.frustumCulled=!1,S}function K(C,N,B){let Q=new Wt;return Q.setAttribute("position",new Yt(new Float32Array(C*3),3)),new gs(Q,new Xs({color:N,size:B,sizeAttenuation:!1,map:A,alphaTest:.5,transparent:!0}))}let ne=C=>{let N=new Float64Array(C.length);for(let B=0;B<C.length;B++)N[B]=C[B]*r;return N};function oe(C,N,B,Q,te,ie={}){let He=ie.hidden?0:ie.size||a.points.lpt,S=F(C,N,K(1,Q,He),ne(B),{kind:"point",label:te,priority:ie.priority,pick:ie.pick||C});if(ie.hidden?(S.obj.material.opacity=0,S.obj.material.alphaTest=0):S.baseSize=He,ie.glowPx){let I=new gs(new Wt,new Xs({color:Q,size:ie.glowPx,sizeAttenuation:!1,map:R,transparent:!0,blending:Ji,depthWrite:!1,opacity:.85}));I.geometry.setAttribute("position",new Yt(new Float32Array(3),3)),F(C+"_glow",N,I,S.src,{kind:"point"}).baseSize=ie.glowPx}return M[C]=S,E[C]=S.src,S}function j(C,N){let B=N.length/3-1,Q=new Float32Array(2*B),te=0;for(let S=0;S<B;S++){let I=3*S;Q[2*S]=te,te+=Math.hypot(N[I+3]-N[I],N[I+4]-N[I+1],N[I+5]-N[I+2]),Q[2*S+1]=te}let ie=new Ai(Q,2,1);C.geometry.setAttribute("instanceDistanceStart",new xn(ie,1,0)),C.geometry.setAttribute("instanceDistanceEnd",new xn(ie,1,1));let He=C.material;He.dashed=!0,He.dashSize=a.lines.dashPx??7,He.gapSize=a.lines.gapPx??5,He.needsUpdate=!0,He.userData.dashMaxKm=te,z.push(He)}function le(C,N,B,Q,te=a.lines.traj,ie=1,He={}){let S=B.length/3-1,I=null;if(He.fade){let Z=new rt(Q),$=new rt(a.background),Ee=new rt;I=new Float32Array(S*6);for(let Se=0;Se<S;Se++)for(let[Re,Ge]of[[0,Se/S],[3,(Se+1)/S]])Ee.copy($).lerp(Z,Ge**1.6),I[Se*6+Re]=Ee.r,I[Se*6+Re+1]=Ee.g,I[Se*6+Re+2]=Ee.b}let J=F(C,N,q(S,Q,te,ie,I),ne(B),{poly:!0});return He.dashed&&j(J.obj,J.src),J}function ce(C,N,B,Q,te=a.lines.traj,ie=1){return F(C,N,q(B.length/6,Q,te,ie),ne(B))}function re(C,N,B,Q,te=a.points.burn){return F(C,N,K(B.length/3,Q,te),ne(B),{kind:"point"})}function xe(C,N,B,Q,te={}){let ie=F(C,N,K(1,16777215,0),ne(B),{kind:"label",label:Q,priority:te.priority,pick:te.pick});return ie.obj.material.opacity=0,ie.obj.material.alphaTest=0,te.pick&&(E[te.pick]=E[te.pick]||ie.src),ie}let Xe=new hi(1,20,14),Ne=1e8,qe=null,H=0;function W(C,N,B,Q,te,ie={}){let He=ie.surface?Be(te,ie.surface):ie.limb?ge(te):ie.emissive?new ms({color:te}):new mo({color:te}),S=ie.segments??[64,40],I=new Vt(new hi(1,S[0],S[1]),He),J=null;ie.glow&&(J=new oo(new Br({map:R,color:te,blending:Ji,depthWrite:!1,transparent:!0,opacity:a.glow.strength})),J.scale.setScalar(2*ie.glow),I.add(J));let Z=null;ie.atmosphere&&(Z=new Vt(new hi(ie.atmoSize??1.06,S[0],S[1]),ve(ie.atmosphere)),I.add(Z));let $=F(C,N,I,B.src,{kind:"sphere",radius:Q,minPx:ie.minPx||5,glow:ie.glow,pick:ie.pick||C});if($.glowObj=J,$.atmoObj=Z,ie.segments&&($.segGeo={hi:[I.geometry,Z&&Z.geometry],lo:[new hi(1,64,40),Z&&new hi(ie.atmoSize??1.06,64,40)]},$.segHi=!0),$.surface=ie.surface||null,$.exaggeration=1,$.capFrac=ie.capFrac||0,$.capFloorDev=ie.capFloorDev||0,ie.dot){let Ee=new Vt(Xe,new ms({color:new rt(te).lerp(new rt(16777215),.2),depthTest:!1,depthWrite:!1,transparent:!0}));Ee.renderOrder=20+ie.dot,Ee.scale.setScalar(1.03),Ee.visible=!1,I.add(Ee),$.dotObj=Ee}return C==="Sun_sphere"&&(qe=$),$}function _e(C,N,B){return new Nt({uniforms:{...Qn("map"),inner:{value:C},outer:{value:N},oblate:{value:B},sunLocal:{value:new Y(1,0,0)},light:{value:(a.surface||{}).ringLight??1}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec3 vP;","void main() { vP = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",Kn("map"),"uniform float inner; uniform float outer; uniform float oblate; uniform vec3 sunLocal; uniform float light; varying vec3 vP;","void main() {","#include <logdepthbuf_fragment>","  float r = length(vP.xz); float u = (r - inner) / (outer - inner);","  if (u < 0.0 || u > 1.0) discard;","  vec4 c = map_sample(vec2(u, 0.5));","  vec3 o = vec3(vP.x, 0.0, vP.z); vec3 s = normalize(vec3(sunLocal.x, sunLocal.y / oblate, sunLocal.z));","  float b = dot(o, s); float disc = b * b - (dot(o, o) - 1.0);","  float lit = (b < 0.0) ? smoothstep(-0.02, 0.02, -disc) : 1.0;","  gl_FragColor = vec4(c.rgb * light * mix(0.05, 1.0, lit), c.a);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`),transparent:!0,depthWrite:!1,side:Jn})}function ve(C){return new Nt({uniforms:{color:{value:new rt(C)},strength:{value:a.glow.atmosphere??.9},sunDir:{value:new Y(1,0,0)},sunOn:{value:0}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec3 vN; varying vec3 vV; varying vec3 vNW;","void main() {","  vec4 mv = modelViewMatrix * vec4(position, 1.0);","  vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); vNW = normalize(mat3(modelMatrix) * normal);","  gl_Position = projectionMatrix * mv;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>","uniform vec3 color; uniform float strength; uniform vec3 sunDir; uniform float sunOn; varying vec3 vN; varying vec3 vV; varying vec3 vNW;","void main() {","#include <logdepthbuf_fragment>","  float f = pow(1.0 - max(dot(normalize(vN), normalize(vV)), 0.0), 2.6) * strength;","  f *= mix(1.0, 0.18 + 0.82 * smoothstep(-0.35, 0.25, dot(normalize(vNW), sunDir)), sunOn);","  gl_FragColor = vec4(color * f, f);","}"].join(`
`),blending:Ji,transparent:!0,depthWrite:!1})}function ge(C){let N=a.sunLimb||{};return new Nt({uniforms:{base:{value:new rt(C)},u:{value:new Y(...N.u??[.5,.6,.72])}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","varying vec3 vN; varying vec3 vV;","void main() { vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz);","  gl_Position = projectionMatrix * mv;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>","uniform vec3 base; uniform vec3 u; varying vec3 vN; varying vec3 vV;","void main() {","#include <logdepthbuf_fragment>","  float mu = clamp(dot(normalize(vN), normalize(vV)), 0.0, 1.0);","  gl_FragColor = vec4(base * (vec3(1.0) - u * (1.0 - mu)), 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`)})}function Be(C,N){let B=a.surface||{};return N==="earth"?Rm(C,B):new Nt({uniforms:{...Qn("map"),...Qn("night"),mapOn:{value:0},nightMapOn:{value:0},base:{value:new rt(C)},oblate:{value:1},sunDir:{value:new Y(1,0,0)},sun:{value:N==="planet"?B.planetSun??1.25:B.sun??(N==="earth"?1.3:1.6)},ambient:{value:B.ambient??.004},night:{value:N==="earth"?B.night??1:0},nightOn:{value:1}},vertexShader:["#include <common>","#include <logdepthbuf_pars_vertex>","uniform float oblate; varying vec2 vUv; varying vec3 vNW;","void main() { vUv = uv; vNW = normalize(mat3(modelMatrix) * (normal * vec3(1.0, 1.0 / (oblate * oblate), 1.0)));","  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["#include <common>","#include <logdepthbuf_pars_fragment>",Kn("map"),Kn("night"),"uniform float mapOn; uniform float nightMapOn; uniform vec3 base;","uniform vec3 sunDir; uniform float sun; uniform float ambient; uniform float night; uniform float nightOn; varying vec2 vUv; varying vec3 vNW;","void main() {","#include <logdepthbuf_fragment>","  vec2 uv = vec2(vUv.x, 1.0 - vUv.y);","  vec4 dayS = map_sample(uv); vec4 nightS = night_sample(uv);","  vec3 day = mapOn > 0.5 ? dayS.rgb : base;","  float ndl = dot(normalize(vNW), sunDir);","  vec3 c = day * (max(ndl, 0.0) * sun + ambient);","  if (night > 0.0 && nightMapOn > 0.5 && nightOn > 0.5) {","    vec3 n = nightS.rgb; float lum = dot(n, vec3(0.2126, 0.7152, 0.0722));","    c += n * (0.12 + 0.88 * smoothstep(0.05, 0.30, lum)) * night * (1.0 - smoothstep(-0.1, 0.1, ndl));","  }","  gl_FragColor = vec4(c, 1.0);","#include <tonemapping_fragment>","#include <colorspace_fragment>","}"].join(`
`)})}let Je=6,De={grid:null,axes:[],key:"",gridStep:0};function We(){let C=(2*Je+1)*2;De.grid=F("grid","aux",q(C,a.colors.grid??2766160,a.lines.grid??1,a.lines.gridOpacity??.5),new Float64Array(C*6),{});let N=a.colors.axes??[12611696,7385200,7377104];De.axes=["x","y","z"].map((B,Q)=>F("axes_"+B,"aux",q(1,N[Q],a.lines.axes??1.6),new Float64Array(6),{}));for(let B of[De.grid,...De.axes])B.on=!1,B.obj.visible=!1}function it(){if(!De.grid)return;let C=Oe(),N=v.cam.dist;if(De.grid.obj.visible){let B=10**Math.floor(Math.log10(N/3)),Q=Math.round(C[0]/B)*B,te=Math.round(C[1]/B)*B,ie=C[2],He=`${B}|${Q}|${te}|${ie}`;if(He!==De.key){De.key=He;let S=De.grid.src,I=Je*B,J=0;for(let Z=-Je;Z<=Je;Z++)S.set([Q+Z*B,te-I,ie,Q+Z*B,te+I,ie],J),J+=6,S.set([Q-I,te+Z*B,ie,Q+I,te+Z*B,ie],J),J+=6;De.gridStep=B}}if(De.axes[0].obj.visible){let B=N*.12;De.axes.forEach((Q,te)=>{Q.src.set([C[0],C[1],C[2],C[0]+(te===0)*B,C[1]+(te===1)*B,C[2]+(te===2)*B])})}}function Ke(){let C=v.cam.dist;for(let N of w){if(!N.labelObj||!N.labelObj.visible)continue;let B=N.labelObj.position,Q=v.precision==="relative"?Math.hypot(B.x,B.y,B.z):Math.hypot(B.x-Ye[0],B.y-Ye[1],B.z-Ye[2]),te=Math.log10(Math.max(Q/C,.001)),ie=Math.min(1.08,Math.max(.84,1-.16*te)),He=Math.min(1,Math.max(.62,1-.3*te)),S=ie.toFixed(2),I=He.toFixed(2);N._lk!==S&&(N.label.style.setProperty("--lbl-k",S),N._lk=S),N._lo!==I&&(N.label.style.opacity=I,N._lo=I)}}let Ye=[0,0,0],he=C=>t.thetaOffset+Is((C-t.thetaEpoch)/86400,we());function we(){return s.time_unit_days}let Ue=()=>v.s*he(v.t);function Oe(){return v.fly?v.fly.pos:E[v.cam.target]||[0,0,0]}function V(){let C=Ue(),N=ns(Oe(),he(v.t),v.s),{dist:B,az:Q,el:te}=v.cam,ie=[Math.cos(te)*Math.cos(Q),Math.cos(te)*Math.sin(Q),Math.sin(te)];return Ye[0]=N[0]+B*ie[0],Ye[1]=N[1]+B*ie[1],Ye[2]=N[2]+B*ie[2],{a:C,tg:N}}let se=0,Ae=()=>{let C=Math.tan(p.fov*Math.PI/360);return Math.min(C,C*(n.clientWidth/Math.max(n.clientHeight,1)))},b=C=>C*se/Ae(),_=()=>se?Math.max(2e9,b(1.5)):2e9,L=v;function O(C,N,B,Q){L.precision==="relative"?(B[Q]=C[N]-Ye[0],B[Q+1]=C[N+1]-Ye[1],B[Q+2]=C[N+2]-Ye[2]):(B[Q]=C[N],B[Q+1]=C[N+1],B[Q+2]=C[N+2])}let ee=1,de=1,ye=new Float64Array(3),ae=new Mt,fe=new Mt().makeRotationX(Math.PI/2),Ie=new Y,je=new $n;function Ce(C){let N=t.frameF,B=Math.cos(C),Q=Math.sin(C);if(N){let S=[N.x,N.y,N.z];return[[0,1,2].map(I=>B*S[0][I]-Q*S[1][I]),[0,1,2].map(I=>Q*S[0][I]+B*S[1][I]),[...S[2]]]}let te=C-he(v.t),ie=Math.cos(te),He=Math.sin(te);return[[ie,-He,0],[He,ie,0],[0,0,1]]}function Le(C,N){let B;try{B=C.orientFn(v.t)}catch{return}let Q=Ce(N),te=Wn(Q,B);ae.set(te[0][0],te[0][1],te[0][2],0,te[1][0],te[1][1],te[1][2],0,te[2][0],te[2][1],te[2][2],0,0,0,0,1).multiply(fe),C.obj.quaternion.setFromRotationMatrix(ae),C.orientNow=te}function Qe(C,N){let B=nr(C.src,N,C.work);if(C.kind==="sphere"){let Q=[0,0,0];O(B,0,Q,0),C.obj.position.set(Q[0],Q[1],Q[2]);let te=Math.hypot(B[0]-Ye[0],B[1]-Ye[1],B[2]-Ye[2]),ie=te/ee,He=C.minPx*ie,S=He;if(!U&&C.capFrac&&H){let J=C.capFrac*H;S>J&&(S=Math.min(He,Math.max(J,C.capFloorDev/l.getPixelRatio()*ie)))}let I=U?C.radius:Math.max(C.radius,S);if(C.exaggeration=I/C.radius,C.camDist=te,C.segGeo){let J=I/ie*l.getPixelRatio(),Z=C.segHi?J>=Vb:J>zb;if(Z!==C.segHi){let $=Z?C.segGeo.hi:C.segGeo.lo;C.obj.geometry=$[0],C.atmoObj&&(C.atmoObj.geometry=$[1]),C.cloudObj&&(C.cloudObj.geometry=$[0]),C.segHi=Z}}if(C.shape?C.obj.scale.set(I*C.shape[0],I*C.shape[1],I*C.shape[0]):C.obj.scale.setScalar(I),C.orientFn)Le(C,N);else if(C.faceTo&&M[C.faceTo]){let J=nr(M[C.faceTo].src,N,new Float64Array(3));C.obj.rotation.set(Math.PI/2,0,Math.atan2(J[1]-B[1],J[0]-B[0]),"ZYX")}if(C.surface||C.atmoObj){let J=M.Sun?nr(M.Sun.src,N,ye):null;if(J){let Z=J[0]-B[0],$=J[1]-B[1],Ee=J[2]-B[2],Se=Math.hypot(Z,$,Ee)||1;C.surface&&C.obj.material.uniforms.sunDir.value.set(Z/Se,$/Se,Ee/Se),C.cloudObj&&C.cloudObj.material.uniforms.sunDir.value.set(Z/Se,$/Se,Ee/Se),C.ringObj&&(Ie.set(Z/Se,$/Se,Ee/Se).applyQuaternion(je.copy(C.obj.quaternion).invert()),C.ringObj.material.uniforms.sunLocal.value.copy(Ie)),C.atmoObj&&(C.atmoObj.material.uniforms.sunDir.value.set(Z/Se,$/Se,Ee/Se),C.atmoObj.material.uniforms.sunOn.value=C.surface?1:0)}}if(C.glowObj&&(C.glowObj.visible=ia[h.level].glow&&!(C.name==="Sun_sphere"&&k.sunglow===!1)),C.atmoObj&&(C.atmoObj.visible=ia[h.level].glow),C.glowObj&&C.name==="Sun_sphere"){let J=I/Math.max(C.radius,He);C.glowObj.scale.setScalar(2*(1+(C.glow-1)*J)),C.glowObj.material.opacity=a.glow.strength*(.4+.6*J)}if(C.dotObj){let J=!U&&C.exaggeration>1&&te>Ne&&(!qe||qe.exaggeration>1);C.dotObj.visible=J,J&&C.glowObj&&(C.glowObj.visible=!1),J&&C.atmoObj&&(C.atmoObj.visible=!1),C.ringObj&&(C.ringObj.visible=!J)}return}if(C.baseSize&&(C.obj.material.size=C.baseSize*de),C.obj.isLineSegments2){let Q=C.obj.geometry.attributes.instanceStart.data,te=Q.array;if(C.poly)for(let ie=0,He=0;ie+3<B.length;ie+=3,He+=6)O(B,ie,te,He),O(B,ie+3,te,He+3);else for(let ie=0;ie<B.length;ie+=3)O(B,ie,te,ie);Q.needsUpdate=!0}else{let Q=C.obj.geometry.attributes.position;for(let te=0;te<B.length;te+=3)O(B,te,Q.array,te);Q.needsUpdate=!0,C.obj.geometry.computeBoundingSphere()}if(C.labelObj){let Q=C.labelAt===void 0?0:C.labelAt*3,te=[0,0,0];O(B,Q,te,0),C.labelObj.position.set(te[0],te[1],te[2])}}function st(){let C=y[v.fly?v.fly.to:v.cam.target]||null;if(C!==T){T=C;for(let N of w)N.zoom&&(N.obj.visible=fn(N),N.labelObj&&(N.labelObj.visible=N.on!==!1&&N.zoom===T));for(let N of at)N(T)}}let at=[];function X(){st(),t.onTime&&t.onTime(v.t,an);let{a:C,tg:N}=V();ee=Math.max(n.clientHeight,1)/(2*Math.tan(p.fov*Math.PI/360)),de=Math.min(1,Math.max(.18,r*ee/v.cam.dist/120)),it();for(let ie of z){ie.dashScale=ee/v.cam.dist;let He=ie.dashScale*ie.userData.dashMaxKm<=Wb;ie.dashed!==He&&(ie.dashed=He,ie.needsUpdate=!0)}for(let ie of w)ie.kind!=="sky"&&(ie.obj.visible||ie.labelObj)&&Qe(ie,C);Ke(),v.precision==="relative"?(p.position.set(0,0,0),p.lookAt(N[0]-Ye[0],N[1]-Ye[1],N[2]-Ye[2])):(p.position.set(Ye[0],Ye[1],Ye[2]),p.lookAt(N[0],N[1],N[2]));let Q=M.Sun?ns(M.Sun.src,he(v.t),v.s):[0,0,0];g.position.set(Q[0]-N[0],Q[1]-N[1],Q[2]-N[2]).normalize(),g.target.position.set(0,0,0);let te=Math.max(v.cam.dist*1e-4,.001);p.near!==te&&(p.near=te,p.updateProjectionMatrix());for(let ie of w)ie.kind==="sky"&&ie.obj.visible&&(ie.obj.position.copy(p.position),ie.obj.rotation.set(0,0,C-he(v.t)),ie.frame&&ie.frame(an,C-he(v.t)))}function be(C){if(!C||C.hidden)return null;let N=getComputedStyle(C);if(N.display==="none"||N.visibility==="hidden"||Number(N.opacity)<.05)return null;let B=C.getBoundingClientRect();return B.width>0&&B.height>0?B:null}let ue=(C,N)=>C.left<N.right&&N.left<C.right&&C.top<N.bottom&&N.top<C.bottom;function Te(){let C=[...document.querySelectorAll("[data-obstacle]")].map(be).filter(Boolean),N=w.filter(ie=>ie.label&&ie.labelObj&&ie.labelObj.visible&&ie.label.style.display!=="none").sort((ie,He)=>He.priority-ie.priority),B=[],Q=window.innerWidth,te=window.innerHeight;for(let ie of N){ie.label.style.visibility="";let He=ie.label.getBoundingClientRect();He.left<0||He.top<0||He.right>Q||He.bottom>te||C.some(I=>ue(He,I))||B.some(I=>ue(He,I))?ie.label.style.visibility="hidden":B.push(He)}}function Pe(){let C=d();l.getPixelRatio()!==C&&l.setPixelRatio(C);let N=n.clientWidth,B=n.clientHeight;(n.width!==Math.floor(N*C)||n.height!==Math.floor(B*C))&&(l.setSize(N,B,!1),f.setSize(N,B),p.aspect=N/Math.max(B,1),p.updateProjectionMatrix());for(let Q of P)Q.resolution.set(N,B)}function pe(){Pe(),X(),l.clear(),l.render(x,p),l.clearDepth(),l.render(m,p),f.render(m,p),Te();for(let C of $e)C(an)}let $e=[],ze=performance.now(),ut={speedDaysPerSec:0};function ht(C){if(v.s!==v.sTarget){let N=C/1.5;v.s=v.sTarget>v.s?Math.min(v.sTarget,v.s+N):Math.max(v.sTarget,v.s-N)}if(ut.speedDaysPerSec){let N=v.t+ut.speedDaysPerSec*86400*C;v.t=Math.min(Math.max(N,t.tMin),t.tMax),(v.t===t.tMax||v.t===t.tMin)&&(ut.speedDaysPerSec=0),t.onTimeChange&&t.onTimeChange(v.t)}if(v.fly){let N=v.fly;N.k=Math.min(1,N.k+C/N.dur);let B=N.k<.5?4*N.k**3:1-(-2*N.k+2)**3/2,Q=E[N.to]||[0,0,0];for(let te=0;te<3;te++)N.pos[te]=N.from[te]+(Q[te]-N.from[te])*B;v.cam.dist=Math.exp(Math.log(N.d0)+(Math.log(N.d1)-Math.log(N.d0))*B),N.k>=1&&(v.cam.target=N.to,v.fly=null)}}let xt={frames:0,t0:performance.now(),low:0,history:[]};function Ut(C){xt.frames++;let N=C-xt.t0;if(N<2e3)return;let B=xt.frames*1e3/N;if(xt.history.push(B),xt.frames=0,xt.t0=C,!(!h.auto||xt.history.length<2)&&(xt.low=B<Bb?xt.low+1:0,xt.low>=2&&h.level<ia.length-1)){let Q={at:new Date().toISOString(),from:h.level,to:h.level+1,fps:Math.round(B*10)/10};h.level++,h.log.push(Q),xt.low=0,Bn(),console.info("[\uD654\uC9C8] \uC790\uB3D9\uC73C\uB85C \uB0AE\uCDA4",JSON.stringify(Q))}}function fn(C){return C.on===!1||C.zoom&&C.zoom!==T?!1:C.familyLine?C.wanted!==!1&&ia[h.level].family:!0}function Bn(){for(let C of w)C.familyLine&&(C.obj.visible=fn(C))}l.setAnimationLoop(()=>{let C=performance.now(),N=Math.min((C-ze)/1e3,.1);ze=C,v.paused||ht(N),pe(),Ut(C)});let Xt=null;n.addEventListener("pointerdown",C=>{Xt={x:C.clientX,y:C.clientY,x0:C.clientX,y0:C.clientY},n.setPointerCapture(C.pointerId)}),n.addEventListener("pointermove",C=>{Xt&&(v.cam.az-=(C.clientX-Xt.x)*.006,v.cam.el=Math.min(1.55,Math.max(-1.55,v.cam.el+(C.clientY-Xt.y)*.006)),Xt.x=C.clientX,Xt.y=C.clientY)}),n.addEventListener("pointerup",C=>{if(Xt&&Math.hypot(C.clientX-Xt.x0,C.clientY-Xt.y0)<5){let N=ni(C.clientX,C.clientY);N&&t.onPick&&t.onPick(N)}Xt=null}),n.addEventListener("wheel",C=>{C.preventDefault(),v.fly=null,v.cam.dist=Math.min(_(),Math.max(ti(v.cam.dist),v.cam.dist*Math.exp(C.deltaY*.0012)))},{passive:!1});function Ln(C){let N=C.shape?C.radius*C.shape[0]:C.radius;if(C.surface==="earth"){let B=2*Math.PI*C.radius/43200,Q=Math.max(1800,l.getDrawingBufferSize(vn).y);return C.radius+B*Q/(2*Math.tan(p.fov*Math.PI/360))}return N*1.03}let vn=new nt;function ti(C){let N=Ue(),B=ns(Oe(),he(v.t),v.s),{az:Q,el:te}=v.cam,ie=[Math.cos(te)*Math.cos(Q),Math.cos(te)*Math.sin(Q),Math.sin(te)],He=.05;for(let S of w){if(S.kind!=="sphere"||!S.radius||!S.work)continue;let I=nr(S.src,N,S.work),J=B[0]-I[0],Z=B[1]-I[1],$=B[2]-I[2],Ee=Ln(S),Se=J*ie[0]+Z*ie[1]+$*ie[2],Re=J*J+Z*Z+$*$-Ee*Ee,Ge=Se*Se-Re;if(Ge<0)continue;let et=-Se+Math.sqrt(Ge);(Re<0||C>=et)&&(He=Math.max(He,et))}return He}function ni(C,N){let B=null,Q=22,te=new Y;for(let ie of w){if(!ie.pick||!ie.obj.visible)continue;if(ie.kind==="sphere")te.copy(ie.obj.position);else if(ie.labelObj)te.copy(ie.labelObj.position);else continue;if(te.project(p),te.z<-1||te.z>1)continue;let He=(te.x+1)/2*n.clientWidth,S=(1-te.y)/2*n.clientHeight,I=Math.hypot(He-C,S-N);I<Q&&(Q=I,B=ie.pick)}return B}function tn(){let C=l.getContext(),N=C.drawingBufferWidth,B=C.drawingBufferHeight,Q=new Uint8Array(N*B*4);return C.readPixels(0,0,N,B,C.RGBA,C.UNSIGNED_BYTE,Q),{px:Q,w:N,h:B}}function ii(){pe();let{px:C,w:N,h:B}=tn(),Q=new Set;for(let te=0;te<C.length;te+=388)Q.add(C[te]<<16|C[te+1]<<8|C[te+2]);return{width:N,height:B,distinctColors:Q.size,webgl2:l.capabilities.isWebGL2}}function zn(C){let N=w.map(Se=>Se.obj.visible),B=M[C],Q=B.obj.material.color.getHex();for(let Se of w)Se.obj.visible=Se===B;B.obj.material.color.setHex(16777215);let te=e.style.display;e.style.display="none";let ie=x.background;x.background=new rt(0),pe();let{px:He,w:S,h:I}=tn(),J=0,Z=0,$=0;for(let Se=0;Se<I;Se++)for(let Re=0;Re<S;Re++){let Ge=(Se*S+Re)*4;He[Ge]>200&&He[Ge+1]>200&&He[Ge+2]>200&&(J+=Re,Z+=I-1-Se,$++)}w.forEach((Se,Re)=>{Se.obj.visible=N[Re]}),B.obj.material.color.setHex(Q),e.style.display=te,x.background=ie,pe();let Ee=l.getPixelRatio();return $?{x:J/$/Ee,y:Z/$/Ee,n:$}:null}function Ps(C){return ns(M[C].src,he(v.t),v.s)}function Di(C=3e3){return new Promise(N=>{let B=h.auto;h.auto=!1;let Q=0,te=performance.now(),ie=()=>{Q++,performance.now()-te<C?requestAnimationFrame(ie):(h.auto=B,N({fps:Q*1e3/(performance.now()-te),level:h.level,pr:l.getPixelRatio()}))};requestAnimationFrame(ie)})}function Qi(C=120){let N=l.getContext(),B=new Uint8Array(4);pe(),N.readPixels(0,0,1,1,N.RGBA,N.UNSIGNED_BYTE,B);let Q=performance.now();for(let ie=0;ie<C;ie++)pe(),N.readPixels(0,0,1,1,N.RGBA,N.UNSIGNED_BYTE,B);let te=(performance.now()-Q)/C;return{ms:te,fpsUnlocked:1e3/te,pr:l.getPixelRatio()}}We();let an={renderer:l,scene:m,skyScene:x,camera:p,state:v,items:w,markers:M,anchors:E,COLORS:o,anim:ut,model:t,tokens:i,quality:h,addMarker:oe,addPolyline:le,addSegments:ce,addPoints:re,addLabel:xe,addSphere:W,addItem:F,ndToKm:ne,theta:he,angle:Ue,render:pe,update:X,setLayer(C,N){an.setItemsVisible(B=>B.layer===C,N)},removeItem(C){let N=w.findIndex(te=>te.name===C);if(N<0)return!1;let B=w[N];B.obj.parent&&B.obj.parent.remove(B.obj),B.obj.geometry.dispose();let Q=B.obj.material;for(let te of[P,z]){let ie=te.indexOf(Q);ie>=0&&te.splice(ie,1)}return Q.dispose(),B.labelObj&&(m.remove(B.labelObj),B.label.remove()),M[C]===B&&delete M[C],w.splice(N,1),!0},setItemsVisible(C,N){for(let B of w)C(B)&&(B.on=N,B.obj.visible=fn(B),B.labelObj&&(B.labelObj.visible=N&&(!B.zoom||B.zoom===T)))},wantVisible:fn,setItemsDimmed(C,N,B=.32){for(let Q of w)if(C(Q)&&Q.kind!=="label"&&Q.kind!=="sphere"){let te=Q.obj.material;if(Q.base===void 0&&(Q.base={opacity:te.opacity,transparent:te.transparent,depthWrite:te.depthWrite,alphaTest:te.alphaTest}),!!Q.dimmed===N)continue;Q.dimmed=N,te.opacity=N?Q.base.opacity*B:Q.base.opacity,te.transparent=N||Q.base.transparent,te.depthWrite=N?!1:Q.base.depthWrite,Q.base.alphaTest&&(te.alphaTest=N?Q.base.alphaTest*B*.5:Q.base.alphaTest),te.needsUpdate=!0}},setLabelsVisible(C){e.style.display=C?"":"none"},addZoomTarget(C,N){y[C]=N},onZoomChange(C){at.push(C)},get zoomNow(){return T},setSphereTexture(C,N,B){let Q=w.find(He=>He.name===C&&He.kind==="sphere");if(!Q)return!1;let te=new Gt(N);te.colorSpace=Bt,te.anisotropy=l.capabilities.getMaxAnisotropy(),te.needsUpdate=!0;let ie=Q.obj.material;return ie.map&&ie.map.dispose(),ie.map=te,ie.color.set(16777215),ie.needsUpdate=!0,Q.texture={label:B,w:N.width,h:N.height},!0},maxTextureSize:()=>l.capabilities.maxTextureSize,makeTexture(C,N={}){let B=new Gt(C);return B.colorSpace=N.colorSpace??Bt,B.anisotropy=N.anisotropy??l.capabilities.getMaxAnisotropy(),N.mipmaps===!1&&(B.generateMipmaps=!1,B.minFilter=It),N.wrapS&&(B.wrapS=N.wrapS),_h(B),B.needsUpdate=!0,B},setSphereMap(C,N,B,Q="map"){let te=w.find(S=>S.name===C&&S.kind==="sphere");if(!te)return!1;let ie=te.obj.material,He=Q==="nightMap"?"night":Q;return ie.uniforms&&ie.uniforms[He+"T0"]?(Es(ie.uniforms,He,N),ie.uniforms[Q+"On"]&&(ie.uniforms[Q+"On"].value=1)):(ie.map=N,ie.color.set(16777215),ie.needsUpdate=!0),te.textures=te.textures||{},te.textures[Q]={label:B,w:N.image.width,h:N.image.height},te.texture=te.textures.map||te.textures[Q],!0},setSphereShape(C,N,B){let Q=w.find(te=>te.name===C&&te.kind==="sphere");return Q?(Q.shape=[N,B],Q.obj.material.uniforms&&Q.obj.material.uniforms.oblate&&(Q.obj.material.uniforms.oblate.value=B/N),!0):!1},addEarthClouds(C,N=lu.cloudHeightKm){let B=w.find(te=>te.name===C&&te.kind==="sphere");if(!B||B.cloudObj)return!1;let Q=new Vt(B.obj.geometry,Pm(a.surface||{}));return Q.scale.setScalar(1+N/B.radius),Q.renderOrder=5,Q.frustumCulled=!1,B.obj.add(Q),B.cloudObj=Q,!0},setCloudMap(C,N,B){let Q=w.find(te=>te.name===C&&te.kind==="sphere");return!Q||!Q.cloudObj?!1:(Es(Q.cloudObj.material.uniforms,"cloud",N),Es(Q.obj.material.uniforms,"cloud",N),Q.obj.material.uniforms.cloudOn.value=k.clouds===!1?0:1,Q.cloudObj.visible=k.clouds!==!1,Q.cloudTexture={label:B,w:N.image.width,h:N.image.height},!0)},setLandMap(C,N){let B=w.find(Q=>Q.name===C&&Q.kind==="sphere");return B?(Es(B.obj.material.uniforms,"land",N),B.obj.material.uniforms.landOn.value=1,!0):!1},zoomFloorKm(){return ti(v.cam.dist)},bodyFloorKm(C){let N=w.find(B=>B.name===C&&B.kind==="sphere");return N?Ln(N):null},addSaturnRing(C,N,B){let Q=w.find(S=>S.name===C&&S.kind==="sphere");if(!Q||Q.ringObj)return!1;let te=new fo(N,B,180,1);te.rotateX(-Math.PI/2);let ie=Q.shape?Q.shape[1]/Q.shape[0]:1,He=new Vt(te,_e(N,B,ie));return He.scale.set(1,1/ie,1),He.renderOrder=15,He.frustumCulled=!1,Q.obj.add(He),Q.ringObj=He,!0},setRingMap(C,N,B){let Q=w.find(te=>te.name===C&&te.kind==="sphere");return!Q||!Q.ringObj?!1:(Es(Q.ringObj.material.uniforms,"map",N),Q.ringTexture={label:B,w:N.image.width,h:N.image.height},!0)},sphereScreenPx(C){let N=w.find(B=>B.name===C&&B.kind==="sphere");return!N||!N.obj.visible||!N.camDist?0:N.obj.scale.x*ee/N.camDist*l.getPixelRatio()},qualityAllowsHiTex:()=>ia[h.level].hiTex!==!1,setSphereOrient(C,N){let B=w.find(Q=>Q.name===C&&Q.kind==="sphere");B&&(B.orientFn=N)},setGraphic(C,N){if(k[C]=N,C==="nightlights"&&an.setSurface("Earth_sphere","nightOn",N?1:0),C==="clouds"){let B=w.find(Q=>Q.name==="Earth_sphere");B&&B.cloudObj&&(B.cloudObj.visible=N&&!!B.cloudTexture,B.obj.material.uniforms.cloudOn.value=N&&B.cloudTexture?1:0)}},graphic:()=>({...k}),setSurface(C,N,B){let Q=w.find(te=>te.name===C&&te.kind==="sphere");Q&&Q.surface&&Q.obj.material.uniforms[N]&&(Q.obj.material.uniforms[N].value=B)},setFaceTo(C,N){let B=w.find(Q=>Q.name===C&&Q.kind==="sphere");B&&(B.faceTo=N)},addSky(C,N,B,Q){B.renderOrder=-10,B.frustumCulled=!1;let te=F(C,N,B,new Float64Array(3),{kind:"sky"});return te.frame=Q||null,te},setTrueSize(C){U=!!C},get trueSize(){return U},kmPerPx(){return v.cam.dist/ee},helper:De,onRender:$e,setTime(C){v.t=Math.min(Math.max(C,t.tMin),t.tMax),t.onTime&&t.onTime(v.t,an),t.onTimeChange&&t.onTimeChange(v.t)},setMode(C,N=!1){v.sTarget=C==="inertial"?1:0,N&&(v.s=v.sTarget)},setCamera(C){v.fly=null,Object.assign(v.cam,C)},setOrbitOuter(C){se=C},setOrbitInner(C){H=C},zoomOutMax:_,orbitFitDist:b,flyTo(C,N,B=Math.min(2,Math.max(1,1+.08*Math.abs(Math.log(N/v.cam.dist))))){v.fly={from:[...Oe()],pos:[...Oe()],to:C,d0:v.cam.dist,d1:N,k:0,dur:B}},pickAt:ni,debug:{camera:p,eclToSceneNow:()=>Ce(Ue()),canvasStats:ii,markerCentroid:zn,worldOf:Ps,measureFps:Di,measureFrameCost:Qi,declutter:Te,pause(C=!0){v.paused=C},step(C){ht(C),pe()},setPrecision(C){v.precision=C,pe()},setQuality(C,N=!1){h.level=C,h.auto=N,Bn(),pe()},enableAutoQuality(C=!0){h.auto=C}}};return an}var Ht=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=Me(r)):s.startsWith("data-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},Fo=[];function Dm(){for(let n of Fo)n()}function Nm(n,e){let t=bi(n,e);return Fo.push(t._render),t}function Im(n,e){let t=Nm(n,e);return t.classList.add("layer-tag"),t}function sa(n,e,t){let i=Ht("button",{type:"button",class:"lbl-num"});i.dataset.source=n.provenance.source.map(a=>`${a.file}>${a.key}`).join(" | "),i.dataset.verification=`${n.provenance.verification.tag}/${n.provenance.verification.detail}`;let s=()=>{i.textContent=n.text+(typeof t=="function"?t():t)};s(),Fo.push(s),i.addEventListener("click",a=>{a.stopPropagation(),e.openSource(n)});let r=Ht("span",{class:"lbl-numwrap"},i,Nm(n.provenance.verification,e.table));return r.dataset.source=i.dataset.source,r.dataset.verification=i.dataset.verification,ur(r,n.id,"label"),r}function Um(n,e,t){let i=n.COLORS,s=n.tokens.scene.lines,r=n.tokens.scene.spheres,a=n.tokens.scene.glow,o=t.constants.mu,l=t.constants.length_unit_km,c=(H,W,..._e)=>{let ve=Ht("div",{class:`lbl ${H}`},..._e);if(W){ve.dataset.pick=W;let ge=ve.firstChild;ge.classList.add("lbl-name"),ge.addEventListener("click",()=>t.onPick&&t.onPick(W))}return ve},u=n.addMarker("Sun","bodies",[-o,0,0],i.sun,c("lbl-body","Sun",Ht("span",{i18n:"body.sun"})),{hidden:!0,priority:10});n.addSphere("Sun_sphere","bodies",u,t.radii.sun.km,i.sun,{emissive:!0,limb:!0,glow:a.sun,minPx:r.sunMinPx,pick:"Sun",capFrac:.5,capFloorDev:1.2}),n.addMarker("EMB","bodies",[1-o,0,0],i.emb,c("lbl-body","EMB",Ht("span",{i18n:"body.emb"})),{size:n.tokens.scene.points.emb,priority:6});let h={L1:8,L2:9,L3:5,L4:5,L5:5};for(let H of e["stage1.points"].items){let W=c("lbl-lpt",H.id,Ht("b",{"data-meta":""},H.id),sa(H.dist,t," km"));W.dataset.lpt=H.id,n.addMarker(H.id,"lpoints",[H.x,H.y,H.z],i.lpt,W,{priority:h[H.id],glowPx:n.tokens.scene.points.lptGlow??22})}let d=e["stage2.l2_directions"],f=d.origin,m=Math.abs(f[0]-(1-o));for(let H of d.items){let W=H.angle_deg*Math.PI/180,_e=.25*m,ve=[f[0]+_e*Math.cos(W),f[1]+_e*Math.sin(W),0];n.addSegments("dir_"+H.id,"dirs",[f[0]-_e*Math.cos(W),f[1]-_e*Math.sin(W),0,...ve],H.id==="unstable"?i.unstable:i.stable,s.dir),n.addLabel("dirlabel_"+H.id,"dirs",ve,c("lbl-dir","L2",Ht("span",{i18n:H.id==="unstable"?"l2.unstable":"l2.stable"}),sa(H.num,t,"\xB0")),{priority:3})}let x=e["stage3c.halo_family"],p=n.tokens.scene.familyEvery;for(let H of["\uBD81\uCABD","\uB0A8\uCABD"]){let W=x._arrays[x.family[H].array],[_e,ve]=W.shape;for(let ge of["some","all"]){let Be=[];for(let it=0;it<_e;it++)(ge==="some"?it%p===0:it%p!==0)&&Be.push(it);let Je=new Float64Array(Be.length*(ve-1)*6),De=0;for(let it of Be)for(let Ke=0;Ke<ve-1;Ke++)for(let Ye of[(it*ve+Ke)*3,(it*ve+Ke+1)*3])Je[De++]=W.data[Ye],Je[De++]=W.data[Ye+1],Je[De++]=W.data[Ye+2];let We=n.addSegments(ge==="some"?"halo_"+H:"halo_rest_"+H,"halo",Je,i.haloFam,s.family,s.familyOpacity);We.familyLine=!0,ge==="all"&&(We.wanted=!1,We.obj.visible=!1,We.familyRest=!0)}}{let H=x._arrays[x.family[x.main.side].array],W=H.shape[1],_e=H.data.slice(x.main.index*W*3,(x.main.index+1)*W*3);n.addPolyline("halo_main","halo",_e,i.haloMain,s.main),n.addLabel("halo_main_label","halo",Array.from(_e.slice(Math.floor(W/4)*3,Math.floor(W/4)*3+3)),c("lbl-orbit","halo_main",Ht("span",{i18n:"l2.halo_main"}),sa(x.main.period,t,()=>` ${qb(x.main.period.unit)}`)),{priority:7,pick:"halo_main"})}let g=e["stage3b.escape_samples"];for(let H of g.items)n.addPolyline("esc_"+H.\uBC88\uD638,"escape",g._arrays[H.array].data,H.direction_316>0?i.escOut:i.escIn,s.escape);let A=e["stage3.burns"],R={"3-A":i.a3,"3-C":i.c3,"4-C":i.c4};for(let[H,W]of Object.entries(A.runs)){n.addPolyline("traj_"+H,"burns",A._arrays[W.array_traj].data,R[H],s.traj,.7);let _e=A._arrays[W.array_pos].data,ve=A._arrays[W.array_dv].data,ge=new Float64Array(_e.length*2),Be=3e3/l;for(let Je=0;Je<_e.length;Je+=3){let De=Math.hypot(ve[Je],ve[Je+1],ve[Je+2])||1;ge.set([_e[Je],_e[Je+1],_e[Je+2],_e[Je]+Be*ve[Je]/De,_e[Je+1]+Be*ve[Je+1]/De,_e[Je+2]+Be*ve[Je+2]/De],Je*2)}n.addSegments("dv_"+H,"burns",ge,R[H],s.dv),n.addPoints("burnpts_"+H,"burns",_e,R[H])}let v=e["stage4.reference"];n.addPolyline("ref_4C","ref",v._arrays["4C"].data,i.ref4c,s.ref),n.addPolyline("ref_4D","ref",v._arrays["4D"].data,i.ref4d,s.ref);let w=t.screenEph||(()=>{let H=lr(e).ephem;return{evaluate:W=>H.evaluate(W),tMin:H.tMin}})(),M=t.screenEph?t.screenEph.tMin:w.tMin,E=n.addMarker("Earth","earthmoon",[1-o,0,0],i.earth,c("lbl-body","Earth",Ht("span",{i18n:"body.earth"})),{hidden:!0,priority:7}),y=n.addMarker("Moon","earthmoon",[1-o,0,0],i.moon,c("lbl-body","Moon",Ht("span",{i18n:"body.moon"})),{hidden:!0,priority:4});n.addSphere("Earth_sphere","earthmoon",E,t.radii.earth.km,i.earth,{glow:a.earth,minPx:r.earthMinPx,pick:"Earth",dot:6,capFrac:.6,capFloorDev:3.01,atmosphere:i.atmosphere??7320831,surface:"earth",segments:[256,128]}),n.addSphere("Moon_sphere","earthmoon",y,t.radii.moon.km,i.moon,{glow:a.moon,minPx:r.moonMinPx,pick:"Moon",capFrac:.3,capFloorDev:1.5,surface:"moon"});let T=121,P=30,k=n.addPolyline("moon_trail","earthmoon",new Float64Array(T*3),i.moonTrail,s.trail,1,{fade:!0}),U=(H,W)=>{let _e=Oi(H.pos[0],H.vel[0],H.pos[3],H.vel[3]),ve=Ds(H.pos[W],_e);return[(ve[0]+1-o)*l,ve[1]*l,ve[2]*l]};jb(n,e,t,c,i,s);let z=[["mercury_bary","Mercury"],["venus_bary","Venus"],["mars_bary","Mars"],["jupiter_bary","Jupiter"],["saturn_bary","Saturn"],["uranus_bary","Uranus"],["neptune_bary","Neptune"]],F={Mercury:1,Venus:2,Earth:3,Mars:4,Jupiter:5,Saturn:6,Uranus:7,Neptune:8},q={Mercury:11053224,Venus:15256992,Mars:13656634,Jupiter:14201994,Saturn:14929818,Uranus:10475744,Neptune:7048432},K={Venus:[15258278,1.03],Mars:[14262908,1.02],Jupiter:[14205088,1.015],Saturn:[14929818,1.015],Uranus:[10475744,1.02],Neptune:[7048432,1.02]},ne=t.screenEph?t.screenEph.solar():null,oe=[];if(ne)for(let[H,W]of z){let _e=ne.bodies.find(Be=>Be.name===H);if(!_e)continue;let ve=(i.planets&&i.planets[W])??q[W],ge=n.addMarker(W,"planets",[0,0,0],ve,c("lbl-body",W,Ht("span",{i18n:"body."+W.toLowerCase()})),{hidden:!0,priority:3});n.addSphere(W+"_sphere","planets",ge,_e.radius_km,ve,{minPx:r.planetMinPx??4,pick:W,dot:9-F[W],capFrac:.6,capFloorDev:3.01,surface:"planet",...K[W]?{atmosphere:K[W][0],atmoSize:K[W][1]}:{}}),oe.push({key:H,mk:ge})}let j=[],le=100,ce=-1/0,re=!1,xe=null,Xe=null;if(t.orbitShapes&&ne){let H=0,W=1/0;for(let _e of t.orbitShapes.orbits){let ve=_e.xyz_km,ge=1/0;for(let we=0;we<ve.length;we+=3)ge=Math.min(ge,Math.hypot(ve[we],ve[we+1],ve[we+2]));let Be=(_e.aphelion_km+ge)/2,Je=(_e.aphelion_km-ge)/(_e.aphelion_km+ge),De=z.find(([,we])=>we===_e.name),We=De?De[0]:"earth",it=De?ne.bodies.find(we=>we.name===We).radius_km:t.radii.earth.km,Ke=Cu(Be,Je,it),Ye=Ke.dE.length,he=n.addPolyline("orbit_"+_e.name,"planet_orbits",new Float64Array(3*Ye),i.planetOrbit??11123926,s.planetOrbit??1,s.planetOrbitOpacity??.42);j.push({it:he,key:We,mu:_e.mu_km3_s2,grid:Ke,p:new Float64Array(3*Ye),rho:new Float64Array(3*Ye),tRef:NaN,dtMax:0}),H=Math.max(H,_e.aphelion_km),W=Math.min(W,ge)}n.setOrbitOuter(H),n.setOrbitInner(W)}let Ne=(H,W,_e,ve)=>{let ge=performance.now(),Be=ge-ce>=le,Je=t.screenEph.solar().chunkFor(H).year,De=!1;re=!1;for(let We of j){if(Math.abs(H-We.tRef)<=We.dtMax)continue;if(!Be){re=!0;continue}let it=We.key==="earth"?{pos:W.pos[1],vel:W.vel[1]}:ne.evaluate(We.key,H,Je),Ke=ma(it.pos,it.vel,W.pos[0],W.vel[0],We.mu,We.grid.dE,We.p);Ke&&(We.tRef=H,We.dtMax=Au*We.grid.stepKm/Ke.speed,De=!0)}if(De&&(ce=ge),!(!ve&&!De))for(let We of j){Su(We.p,W.pos[0],_e,We.rho);let it=We.it.src,Ke=We.rho;for(let Ye=0;Ye<Ke.length;Ye+=3)it[Ye]=(Ke[Ye]+1-o)*l,it[Ye+1]=Ke[Ye+1]*l,it[Ye+2]=Ke[Ye+2]*l}},qe=null;return t.onTime=H=>{if(H===qe){re&&j.length&&Ne(H,xe,Xe,!1);return}let W=w.evaluate(H),_e=Math.max(M,H-P*86400),ve=w.evaluate(_e);if(!(!W||!ve)){if(qe=H,t.frameF=Oi(W.pos[0],W.vel[0],W.pos[3],W.vel[3]),E.src.set(U(W,1)),y.src.set(U(W,2)),oe.length){let ge=Oi(W.pos[0],W.vel[0],W.pos[3],W.vel[3]),Be=t.screenEph.solar().chunkFor(H).year;for(let Je of oe){let De=Ds(ne.evaluate(Je.key,H,Be).pos,ge);Je.mk.src.set([(De[0]+1-o)*l,De[1]*l,De[2]*l])}j.length&&(xe=W,Xe=ge,Ne(H,W,ge,!0))}for(let ge=0;ge<T;ge++){let Be=Math.max(M,H-P*86400*(T-1-ge)/(T-1));k.src.set(U(w.evaluate(Be),2),ge*3)}}},{eph:w,toScene:U}}function jb(n,e,t,i,s,r){let a=e["stage4a.jwst"];if(!a)return;let o=n.tokens.scene.points,l=a._arrays;n.addPoints("jwst_pts","jwst",l.daily.data,s.jwst,o.jwst),n.addPolyline("jwst_interp","jwst",l.interp.data,s.jwst,r.jwstInterp,.85,{dashed:!0}),n.addPolyline("jwst_10m","jwst",l.tenmin.data,s.jwst,r.jwst);let c=Array.from(l.tenmin.data.slice(-3)),u=Ht("small",{class:"lbl-fixed","data-meta":""}),h=()=>{u.textContent=Me("jwst.marker_fixed",{date:a.marker.text.ko.slice(0,10)}),u.title=document.documentElement.lang==="ko"?a.marker.text.ko:a.marker.text.en};h(),Fo.push(h),n.addMarker("JWST","jwst",c,s.jwst,i("lbl-body lbl-jwst","JWST",Ht("span",{"data-meta":""},"JWST")),{size:o.jwstMarker,priority:8}),n.addLabel("jwst_fixed","jwst",c,Ht("div",{class:"lbl lbl-fixed-wrap"},u),{priority:2}).labelObj.center.set(-.08,-.45);let f=Math.floor(l.daily.data.length/6)*3;n.addLabel("jwst_orbit_label","jwst",Array.from(l.daily.data.slice(f,f+3)),i("lbl-orbit","jwst_period",Ht("span",{i18n:"jwst.orbit_label"})),{priority:2,pick:"jwst_period"});let m=e["stage5.jwst"];if(!m)return;let x=m._arrays,p=m.layers.ext,g=m.layers.phys;for(let[E,y]of Object.entries(p.windows))n.addPolyline("jpl_"+E,"jwst_ext",x[y.array].data,s.extJpl,r.pred);for(let E of p.curves){let y=x[E.array_pos].data;n.addPolyline("mine_"+E.id,"jwst_ext",y,s.extMine,r.traj),n.addPoints("mine_end_"+E.id,"jwst_ext",y.slice(-3),s.extMine,o.predEnd)}let A=x[g.arrays_pos.recon].data,R=x[g.arrays_pos.mine].data;n.addPolyline("recon_R","jwst_phys",A,s.physRecon,r.pred),n.addPolyline("mine_R","jwst_phys",R,s.physMine,r.traj),n.addPoints("mine_end_R","jwst_phys",R.slice(-3),s.physMine,o.predEnd),n.addPolyline("jpl01U_R","jwst_phys",x[g.arrays_pos.jpl].data,s.physJpl,r.traj,1,{dashed:!0});let v=p.items.find(E=>E.id==="jwst_err_range"),w=g.items.find(E=>E.id==="jwst_err_R5"),M=x[p.windows.B.array].data;n.addLabel("jwst_ext_label","jwst_ext",Array.from(M.slice(-3)),i("lbl-pred lbl-ext","JWST",Ht("span",{i18n:"jwst.layer_ext_short"}),Im(p.verification,t.table),sa(v,t," km")),{priority:6,pick:"JWST"}),n.addLabel("jwst_phys_label","jwst_phys",Array.from(A.slice(-3)),i("lbl-pred lbl-phys","JWST",Ht("span",{i18n:"jwst.layer_phys_short"}),Im(g.verification,t.table),sa(w,t,()=>` km (${Me("jwst.rep_5d")})`)),{priority:6,pick:"JWST"}),Xb(n,m,t,s,o,r)}function Xb(n,e,t,i,s,r){let a=e._arrays,o=e.layers.ext,l=e.layers.phys,c=t.constants.length_unit_km,u=(M,E)=>{let y=a[M].data,T=y.length/3,P=E<0?T+E:E;return{arr:M,k:P,p:[y[3*P],y[3*P+1],y[3*P+2]]}},h=(M,E)=>{let y=a[M].data;for(let T=0;T<y.length;T++)if(Math.abs(y[T]-E)<1e-9)return T;return-1},d=(M,E)=>M.items.find(y=>y.id===E),f=(Date.parse(l.window.rep_end.replace(" ","T")+"Z")-Date.parse(l.window.start.replace(" ","T")+"Z"))/864e5,m=[{id:"R5",layer:"jwst_phys",lines:["recon_R","mine_R","mine_end_R","jpl01U_R"],base:{...u(l.arrays_pos.recon,h("days_R",f)),name:"jwst.zl_recon",color:i.physRecon},others:[{...u(l.arrays_pos.mine,h("days_R",f)),name:"jwst.zl_mine_kB",color:i.physMine,item:d(l,"jwst_err_R5"),gap:"jwst.gap_mine_recon"},{...u(l.arrays_pos.jpl,h("days_R_jpl",f)),name:"jwst.zl_jpl01U",color:i.physJpl,item:d(l,"jwst_err_R5_jpl"),gap:"jwst.gap_jpl_recon"}]}];for(let M of["A","B","C"]){let E=o.curves.filter(y=>y.window===M);E.length&&m.push({id:M,layer:"jwst_ext",lines:["jpl_"+M,...E.flatMap(y=>["mine_"+y.id,"mine_end_"+y.id])],base:{...u(o.windows[M].array,-1),name:"jwst.zl_jpl",color:i.extJpl},others:E.map(y=>({...u(y.array_pos,-1),text:y.label,color:i.extMine,item:d(o,"jwst_err_"+y.id),gap:"jwst.gap_mine_jpl"}))})}n.zoomStops={};let x=(M,E)=>[M[0]-E[0],M[1]-E[1],M[2]-E[2]],p=(M,E)=>[M[1]*E[2]-M[2]*E[1],M[2]*E[0]-M[0]*E[2],M[0]*E[1]-M[1]*E[0]],g=M=>{let E=Math.hypot(...M)||1;return M.map(y=>y/E)},A=(M,E)=>(M.zoom=E,M.obj.visible=!1,M.labelObj&&(M.labelObj.visible=!1),M.pick=null,M),R=M=>document.documentElement.lang==="ko"?M.ko:M.en;for(let M of m){if(M.base.k<0||M.others.some(re=>re.k<0||!re.item))continue;let E=[M.base,...M.others],y=[0,1,2].map(re=>E.reduce((xe,Xe)=>xe+Xe.p[re],0)/E.length),T=M.others.map(re=>Math.hypot(...x(re.p,M.base.p))*c),P=Math.max(25,4.5*Math.max(...T)),k=a[M.base.arr].data,U=M.base.k,z=k.length/3,F=Math.min(U+1,z-1),q=Math.max(U-1,0),K=g(x(Array.from(k.slice(3*F,3*F+3)),Array.from(k.slice(3*q,3*q+3)))),ne=x(M.others[T.indexOf(Math.max(...T))].p,M.base.p),oe=p(K,ne);Math.hypot(...oe)<1e-6*Math.hypot(...ne)&&(oe=p(K,[0,0,1])),oe=g(oe),oe[2]<0&&(oe=oe.map(re=>-re));let j="zoom_"+M.id;n.anchors[j]=n.ndToKm(y),n.addZoomTarget(j,M.id),n.zoomStops[M.id]={layer:M.layer,cam:{target:j,dist:P,az:Math.atan2(oe[1],oe[0]),el:Math.asin(oe[2])},gapsDrawnKm:T,points:E.map(re=>re.p),items:M.others.map(re=>re.item.id)},E.forEach((re,xe)=>A(n.addMarker(`zoompt_${M.id}_${xe}`,M.layer,re.p,re.color,null,{size:s.zoomPt}),M.id));let le=new Float64Array(6*M.others.length);M.others.forEach((re,xe)=>le.set([...M.base.p,...re.p],6*xe)),A(n.addSegments("zoomgap_"+M.id,M.layer,le,i.zoomGap,r.zoomGap,.9),M.id);let ce=.18*P/c;E.forEach((re,xe)=>{let Xe=a[re.arr].data,Ne=Xe.length/3,qe=re.k>0?re.k-1:Math.min(re.k+1,Ne-1),H=g(x(Array.from(Xe.slice(3*qe,3*qe+3)),re.p)),W=re.p.map((ge,Be)=>ge+ce*H[Be]),_e=re.text?Ht("span",{class:"lbl-name-only","data-meta":""},R(re.text)):Ht("span",{class:"lbl-name-only","data-meta":"",i18n:re.name});re.text&&Fo.push(()=>{_e.textContent=R(re.text)});let ve=Ht("div",{class:"lbl lbl-zoomline"},_e);ve.style.setProperty("--zl-color","#"+re.color.toString(16).padStart(6,"0")),A(n.addLabel(`zoomname_${M.id}_${xe}`,M.layer,W,ve,{priority:8}),M.id)}),M.others.forEach((re,xe)=>{let Xe=Ht("div",{class:"lbl lbl-gap"},Ht("span",{class:"lbl-name-only","data-meta":"",i18n:re.gap}),sa(re.item,t," km"));Xe.dataset.gap=re.item.id,A(n.addLabel(`zoomgapl_${M.id}_${xe}`,M.layer,re.p,Xe,{priority:9}),M.id)})}let v=Object.fromEntries(m.map(M=>[M.id,new Set(M.lines)])),w=M=>(M.layer==="jwst_ext"||M.layer==="jwst_phys")&&!M.zoom&&M.kind!=="label";n.onZoomChange(M=>{n.setItemsDimmed(w,!1),M&&v[M]&&n.setItemsDimmed(E=>w(E)&&!v[M].has(E.name),!0,.18)})}function qb(n){return n&&typeof n=="object"?document.documentElement.lang==="ko"?n.ko:n.en:n||""}var Yb=(()=>{let n=document.createElement("div");return n.innerHTML="<svg></svg>",n.firstChild.namespaceURI})(),Zi=(n,e={},...t)=>{let i=document.createElementNS(Yb,n);for(let[s,r]of Object.entries(e))i.setAttribute(s,r);return i.append(...t),i},jt=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=Me(r)):s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i};function $b(n,e,t,i){let u=t.days[0],h=t.days[t.days.length-1],d=Math.log10(t.km[0]),f=Math.log10(t.km[t.km.length-1]),m=v=>40+(v-u)/(h-u)*252,x=v=>8+(1-(Math.log10(Math.min(Math.max(v,t.km[0]),t.km[t.km.length-1]))-d)/(f-d))*116,p=Zi("svg",{viewBox:"0 0 300 150",width:300,height:150,class:"err-chart",role:"img","aria-label":Dt(n.title)});if(n.outside_from_day!==void 0){let v=m(n.outside_from_day),w=m(n.outside_to_day);p.append(Zi("rect",{x:v,y:8,width:w-v,height:116,class:"err-outside"}))}let g=Zi("g",{class:"err-axes","data-aux":"tick","data-source":t.source,"data-verification":"display/axis"});for(let v of t.km)g.append(Zi("line",{x1:40,x2:292,y1:x(v),y2:x(v),class:"err-grid"})),g.append(Zi("text",{x:36,y:x(v)+4,"text-anchor":"end"},t.km_text[t.km.indexOf(v)]));for(let v of t.days)g.append(Zi("line",{x1:m(v),x2:m(v),y1:8,y2:124,class:"err-grid"})),g.append(Zi("text",{x:m(v),y:138,"text-anchor":"middle"},String(v)));p.append(g);for(let v of n.curves){let w=e[v.array_days].data,M=e[v.array_km].data,E="";for(let y=0;y<w.length;y++)M[y]>0&&(E+=`${E?"L":"M"}${m(w[y]).toFixed(2)},${x(M[y]).toFixed(2)}`);p.append(Zi("path",{d:E,class:"err-line",stroke:v.color,"stroke-dasharray":v.dashed?"4 3":"none","data-curve":v.id}));for(let y of v.marks)p.append(Zi("circle",{cx:m(y.day),cy:x(y.km),r:2.6,fill:v.color,"data-mark":`${v.id}@${y.day}`}))}let A=jt("figure",{class:"err-fig","data-layer":i.key});A.append(p);let R=jt("figcaption",{class:"err-legend","data-meta":""});for(let v of n.curves){let w=jt("span",{class:"err-swatch"+(v.dashed?" dashed":"")});w.style.borderColor=v.color,R.append(jt("span",{class:"err-key"},w,document.createTextNode(Dt(v.label))))}return R.append(jt("span",{class:"err-axis-note",i18n:"jwst.axis_note"})),A.append(R),A}function Fm(n,e,t,i,s){let r=e?jt("button",{type:"button",id:n,class:"link-btn zoom-btn",i18n:e}):jt("button",{type:"button",id:n,class:"link-btn zoom-btn"},s);return r.addEventListener("click",()=>t(i)),r}function yh(n,e,t,i,s,r){let a=jt("div",{class:"jwst-body"}),o=n["stage5.jwst"];if(!o)return a.append(jt("p",{class:"note",i18n:"jwst.no_predictions"})),a;for(let c of["ext","phys"]){let u=o.layers[c],h=jt("section",{class:`jwst-layer jwst-${c}`,"data-layer":c}),d=jt("h4",{"data-meta":""},jt("span",{i18n:`jwst.layer_${c}`}),ki(u.verification,e));h.append(d,jt("p",{class:"desc","data-meta":""},Dt(u.note))),h.append($b(u,o._arrays,o.axes,{key:c}));for(let f of u.items){let m=Si(f,e,t);i.push(m),h.append(m)}if(r){let f=jt("div",{class:"zoom-row","data-meta":""});if(c==="phys")f.append(Fm("zoom-R5","jwst.zoom_phys",r,"R5"));else{f.append(jt("span",{i18n:"jwst.zoom_ext"}));for(let m of Object.keys(u.windows))f.append(Fm("zoom-"+m,null,r,m,m))}h.append(f)}a.append(h)}let l=jt("button",{type:"button",id:"open-period",class:"link-btn",i18n:"jwst.period_button"});return l.addEventListener("click",s),a.append(l),a}function vh(n,e,t,i){let r=n["stage4a.jwst"].period_card,a=jt("div",{class:"period-body"}),o=jt("p",{class:"period-class","data-meta":""},jt("span",{i18n:"jwst.period_class"}),ki(r.verification,e));a.append(o,jt("p",{class:"desc","data-meta":""},Dt(r.summary)));for(let l of r.items){let c=Si(l,e,t);i.push(c),a.append(c)}return a.append(jt("p",{class:"note period-unknown","data-meta":""},Dt(r.unknown))),a}var G=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?i.dataset.i18n=r:s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},Ts={all:{target:"bary",dist:42e7,az:-1.5708,el:1.2},emb:{target:"EMB",dist:75e5,az:-1.5708,el:1.1},l2:{target:"L2",dist:32e5,az:-1.2,el:.6},l2zoom:{target:"L2",dist:300,az:-1.2,el:.6},jwst:{target:"L2",dist:29e5,az:-.45,el:.42},solar:{target:"bary",dist:125e8,az:-1.5708,el:1.15}},cu={Sun:["Sun",6e6],EMB:["EMB",25e5],Earth:["Earth",12e4],Moon:["Moon",12e4],L1:["L1",25e5],L2:["L2",32e5],L3:["L3",6e7],L4:["L4",6e7],L5:["L5",6e7],halo_main:["L2",32e5],JWST:["JWST",12e5],jwst_period:["L2",29e5],Mercury:["Mercury",6e6],Venus:["Venus",15e6],Mars:["Mars",1e7],Jupiter:["Jupiter",12e7],Saturn:["Saturn",1e8],Uranus:["Uranus",5e7],Neptune:["Neptune",5e7]},Jb=["lpoints","bodies","dirs","earthmoon","halo","escape","burns","ref","jwst","jwst_ext","jwst_phys"],Zb=[1,10,30];function Om(n,e,t){let i=[],s=t.manifest.verification,r=G("button",{type:"button",id:"mode-rot",class:"on",i18n:"l2.mode_rot"}),a=G("button",{type:"button",id:"mode-in",i18n:"l2.mode_inertial"});r.addEventListener("click",()=>{n.setMode("rot"),r.classList.add("on"),a.classList.remove("on")}),a.addEventListener("click",()=>{n.setMode("inertial"),a.classList.add("on"),r.classList.remove("on")});let o=G("div",{class:"ctl-row","data-meta":""},G("span",{class:"ctl-h",i18n:"l2.mode"}),r,a),l=G("div",{class:"ctl-row","data-meta":""},G("span",{class:"ctl-h",i18n:"l2.view"}));for(let se of Object.keys(Ts)){let Ae=G("button",{type:"button",id:"view-"+se,i18n:"l2.view_"+se});Ae.addEventListener("click",()=>n.setCamera({...Ts[se],...se==="solar"?{dist:Math.max(Ts.solar.dist,n.orbitFitDist(1.2))}:{}})),l.append(Ae)}let c=G("button",{type:"button",id:"true-size",i18n:"view.true_size","aria-pressed":"false"});if(c.title=Me("view.true_size_title"),c.addEventListener("click",()=>{n.setTrueSize(!n.trueSize),c.setAttribute("aria-pressed",String(n.trueSize)),c.classList.toggle("on",n.trueSize)}),l.append(c),n.zoomStops&&n.zoomStops.R5){let se=G("button",{type:"button",id:"view-jwstzoom",i18n:"l2.view_jwstzoom"});se.addEventListener("click",()=>n.model.onZoom&&n.model.onZoom("R5")),l.append(se)}let u=G("input",{type:"range",id:"time",min:String(n.model.tMin),max:String(n.model.tMax),step:"3600","aria-label":"time"});u.value=String(n.state.t),u.addEventListener("input",()=>n.setTime(Number(u.value)));let h=G("button",{type:"button",id:"play",i18n:"l2.play"}),d=10;h.addEventListener("click",()=>{let se=!n.anim.speedDaysPerSec;n.anim.speedDaysPerSec=se?d:0,h.dataset.i18n=se?"l2.pause":"l2.play",h.textContent=Me(h.dataset.i18n)});let f=G("select",{id:"speed","aria-label":"speed"});for(let se of Zb){let Ae=G("option",{value:String(se)});Ae.dataset.speed=String(se),f.append(Ae)}f.value=String(d),f.addEventListener("change",()=>{d=Number(f.value),n.anim.speedDaysPerSec&&(n.anim.speedDaysPerSec=d)});let m=e["time.utc"],x={t:m._arrays.t_tdb_s.data,u:m._arrays.unix_utc_s.data},p=G("button",{type:"button",id:"date",class:"num"});p.dataset.source="time.utc (results/web) | "+m.provenance.source.map(se=>`${se.file}>${se.key}`).join(" | "),p.dataset.verification=`${m.provenance.verification.tag}/${m.provenance.verification.detail}`;let g=se=>({id:"date",value:se,text:ss(Tn(se,x)),unit:"UTC",label:{ko:"\uD654\uBA74 \uC2DC\uAC01 (UTC)",en:"Displayed time (UTC)"},note:{ko:`TDB ${Vo(se)} (J2000 TDB ${se} \uCD08). UTC = Python \uC774 \uB0B4\uBCF4\uB0B8 \uD558\uB8E8 \uAC04\uACA9 \uD658\uC0B0\uD45C (astropy) \uB97C \uC120\uD615 \uBCF4\uAC04 \u2014 \uBE0C\uB77C\uC6B0\uC800 \uACC4\uC0B0`,en:`TDB ${Vo(se)} (J2000 TDB ${se} s). UTC = linear interpolation of the daily table exported by Python (astropy) \u2014 browser calculation`},provenance:m.provenance,browser_calc:{tolerance:"1e-3 s (golden utc)"}});p.addEventListener("click",()=>t.openSource(g(n.state.t)));let A=()=>{for(let se of f.options)se.textContent=Me("l2.speed",{n:se.dataset.speed})},R=()=>{p.textContent=`${ss(Tn(n.state.t,x))} UTC`},v=G("button",{type:"button",id:"t-start",i18n:"time.start"});v.addEventListener("click",()=>n.setTime(n.model.tMin));let w=G("button",{type:"button",id:"t-now",i18n:"time.now"});w.addEventListener("click",()=>n.setTime(ua(x,Date.now()/1e3)));let M=se=>ss(Tn(se,x)).slice(0,10),E=G("input",{type:"date",id:"date-jump","aria-label":"date"}),y=Tn(n.model.tMin,x),T=Tn(n.model.tMax,x),P=new Date(Math.ceil(y/86400)*864e5).toISOString().slice(0,10),k=new Date(Math.floor(T/86400)*864e5).toISOString().slice(0,10);E.min=P,E.max=k;let U=G("button",{type:"button",id:"date-go",i18n:"time.go"}),z=G("span",{id:"date-range-note",class:"note",hidden:!0,i18n:"time.out_of_range"}),F=()=>{let se=E.value,Ae=!!se&&se>=P&&se<=k;return U.disabled=!Ae,z.hidden=!se||Ae,Ae};E.addEventListener("input",F),U.addEventListener("click",()=>{F()&&n.setTime(vi(Date.parse(E.value+"T00:00:00Z")/1e3,x))}),U.disabled=!0,E.dataset.range=`${P} ~ ${k}`;let q=G("div",{class:"ctl-row","data-meta":""},G("span",{class:"ctl-h",i18n:"l2.time"}),v,h,w,f,E,U,z,G("span",{id:"ephem-busy-slot"})),K=G("div",{class:"ctl-row slider-row"},u),ne=bi(m.provenance.verification,s),oe=G("div",{class:"ctl-row date-row"},p,ne);oe.dataset.source=p.dataset.source,oe.dataset.verification=p.dataset.verification,n.model.onTimeChange=se=>{u.value=String(se),R()};let j=G("div",{class:"layers","data-meta":""});for(let se of Jb){let Ae=G("input",{type:"checkbox",id:"layer-"+se,checked:!0});Ae.addEventListener("change",()=>n.setLayer(se,Ae.checked)),j.append(G("label",{},Ae,G("span",{i18n:"l2.layer_"+se})))}let le=G("input",{type:"checkbox",id:"family-all"});le.addEventListener("change",()=>{for(let se of n.items)se.familyRest&&(se.wanted=le.checked,se.obj.visible=le.checked&&document.getElementById("layer-halo").checked)}),j.append(G("label",{class:"fam"},le,G("span",{i18n:"l2.family_all"})));let ce=G("div",{class:"nums"}),re=(se,Ae,b=!1)=>{let _=G("details",{open:b});_.append(G("summary",{"data-meta":"",i18n:se}));for(let L of Ae){let O=Si(L,s,t.openSource);i.push(O),_.append(O)}return ce.append(_),_},xe=e["ephem.earth_moon"];re("l2.g_lpoints",e["stage1.points"].items.map(se=>se.dist),!0),re("l2.g_dirs",e["stage2.l2_directions"].items.map(se=>se.num),!0),re("l2.g_halo",[e["stage3c.halo_family"].main.period,e["stage3c.halo_family"].main.zmax],!0),re("l2.g_annual",e["stage3.burns"].annual,!0),re("l2.g_ref",e["stage4.reference"].numbers,!0),re("l2.g_escape",e["stage3b.escape_samples"].items.map(se=>se.t316)).querySelector("summary").after(G("p",{class:"note","data-meta":"",i18n:"l2.escape_rule"}));let Ne=n.model.screenEph&&e["m4.ephem"];re("l2.g_interp",Ne&&Ne.holdout?[Ne.holdout.earth,Ne.holdout.moon]:["\uC9C0\uAD6C","\uB2EC"].map(se=>xe.holdout[se]));let qe=e["stage5.jwst"],H=e["stage4a.jwst"];qe&&(re("jwst.g_ext",qe.layers.ext.items),re("jwst.g_phys",qe.layers.phys.items)),H&&re("jwst.g_period",H.period_card.items),re("l2.g_m0",[]).append(document.getElementById("samples"));let _e=G("div",{class:"legend"},G("p",{"data-meta":""},Xn(),G("span",{i18n:"l2.legend_spheres"})),G("p",{"data-meta":"",i18n:"l2.legend_markers"}),G("p",{"data-meta":"",i18n:"l2.legend_pulsating"}),G("p",{"data-meta":"",i18n:"l2.legend_inertial"}),G("p",{"data-meta":"",i18n:"l2.legend_jwst"}),G("p",{"data-meta":"",i18n:"l2.legend_jwstzoom"})),ve={};for(let se of e["stage1.points"].items)ve[se.id]=[se.dist];let ge=e["stage2.l2_directions"].items.map(se=>se.num),Be=e["stage3c.halo_family"],Je=Object.fromEntries(e["stage3.burns"].annual.map(se=>[se.id,se]));ve.L2=[...ve.L2,...ge,Je.annual_3A,...e["stage3b.escape_samples"].items.map(se=>se.t316)],ve.halo_main=[Be.main.period,Be.main.zmax,Je.annual_3C,Je.annual_4C,...e["stage4.reference"].numbers],ve.Earth=[Ne&&Ne.holdout?Ne.holdout.earth:xe.holdout.\uC9C0\uAD6C],ve.Moon=[Ne&&Ne.holdout?Ne.holdout.moon:xe.holdout.\uB2EC],ve.Sun=[],ve.EMB=[];for(let se of["Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune"])ve[se]=[];let De={Sun:"body.sun",EMB:"body.emb",Earth:"body.earth",Moon:"body.moon",halo_main:"l2.halo_main",JWST:"body.jwst",jwst_period:"jwst.period_title",Mercury:"body.mercury",Venus:"body.venus",Mars:"body.mars",Jupiter:"body.jupiter",Saturn:"body.saturn",Uranus:"body.uranus",Neptune:"body.neptune"},We=[],it=se=>De[se]?Me(De[se]):se;function Ke(se){let Ae=G("div",{class:"card-body"});Ae.append(G("h3",De[se]?{i18n:De[se]}:{"data-meta":""},it(se))),Ae.append(G("p",{class:"desc","data-meta":"",i18n:"desc."+se},Me("desc."+se))),n.items.find(O=>O.kind==="sphere"&&O.pick===se)&&Ae.append(G("p",{class:"note","data-meta":""},Xn(),G("span",{i18n:"card.sphere_note"},Me("card.sphere_note"))));let _=ve[se]||[];for(let O of We)Qo(O);We.length=0;for(let O of _){let ee=Si(O,s,t.openSource);We.push(ee),Ae.append(ee)}return se==="JWST"&&Ae.append(yh(e,s,t.openSource,We,()=>n.model.onPick&&n.model.onPick("jwst_period"),n.zoomStops?O=>n.model.onZoom&&n.model.onZoom(O):null)),se==="jwst_period"&&Ae.append(vh(e,s,t.openSource,We)),dr(),_.length||se==="JWST"||se==="jwst_period"?Ae.querySelector(".num-row")||Ae.append(G("p",{class:"note",id:"card-numbers-off",i18n:"card.numbers_off"},Me("card.numbers_off"))):Ae.append(G("p",{class:"note",i18n:"card.no_numbers"},Me("card.no_numbers"))),Ae}let Ye=qe?[...qe.layers.ext.items,...qe.layers.phys.items]:[],he=(se,Ae)=>se.map(b=>Ae.find(_=>_.id===b)).filter(Boolean);function we(se){let Ae={key:[],more:[],expert:[]};return se==="L2"?(Ae.key=[ve.L2[0],Je.annual_3A],Ae.more=ge,Ae.expert=e["stage3b.escape_samples"].items.map(b=>b.t316)):/^L[1-5]$/.test(se)?Ae.key=ve[se].slice(0,1):se==="halo_main"?(Ae.key=[Be.main.period,Be.main.zmax,Je.annual_3C,Je.annual_4C],Ae.more=e["stage4.reference"].numbers):se==="Earth"||se==="Moon"?Ae.expert=ve[se]:se==="JWST"?Ae.key=he(["jwst_err_R5","jwst_err_R5_jpl","jwst_err_range"],Ye):se==="jwst_period"&&H&&(Ae.key=H.period_card.items),Ae}return{mode:o,views:l,timeHead:q,timeSlider:K,timeDate:oe,layers:j,nums:ce,legend:_e,rows:i,rerender:()=>{A(),R(),ne._render(),h.textContent=Me(h.dataset.i18n);for(let se of i)se._render();for(let se of We)se._render()},dateItem:g,card:Ke,nameOf:it,NAME:De,sections:we,jwstBody:(se,Ae)=>yh(e,s,t.openSource,se,Ae,null),periodBody:se=>vh(e,s,t.openSource,se),utcTable:x,hasSphere:se=>!!n.items.find(Ae=>Ae.kind==="sphere"&&Ae.pick===se)}}var km=typeof document<"u"?document.createElement("template"):null,Kb={mark:'<circle cx="7" cy="12" r="3.2"/><circle cx="14.5" cy="12" r="1.4"/><path d="M19.5 12h0" stroke-width="3"/><path d="M3 12c0-6 18-6 18 0s-18 6-18 0" opacity=".45"/>',search:'<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5 5"/>',layers:'<path d="M12 4l8 4.5-8 4.5-8-4.5z"/><path d="M4 12.5l8 4.5 8-4.5"/><path d="M4 16.5l8 4.5 8-4.5"/>',gear:'<path d="M4 7h9M17 7h3M4 17h3M11 17h9"/><circle cx="15" cy="7" r="2.2"/><circle cx="9" cy="17" r="2.2"/>',close:'<path d="M6 6l12 12M18 6L6 18"/>',play:'<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',pause:'<path d="M8 5.5v13M16 5.5v13" stroke-width="3"/>',chev:'<path d="M6 9l6 6 6-6"/>',chevr:'<path d="M9 6l6 6-6 6"/>',fly:'<circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8" opacity=".0"/><path d="M9 15l6-6M10 9h5v5"/>',focus:'<circle cx="12" cy="12" r="2.2"/><path d="M12 3v4M12 17v4M3 12h4M17 12h4"/>',cal:'<rect x="4" y="5.5" width="16" height="14" rx="2"/><path d="M4 10h16M8.5 3.5v4M15.5 3.5v4"/>',now:'<circle cx="12" cy="12" r="8"/><path d="M12 7.5V12l3 2"/>',share:'<circle cx="6.5" cy="12" r="2.2"/><circle cx="17.5" cy="6.5" r="2.2"/><circle cx="17.5" cy="17.5" r="2.2"/><path d="M8.5 11l7-3.5M8.5 13l7 3.5"/>',download:'<path d="M12 4v11M7.5 10.5L12 15l4.5-4.5"/><path d="M5 19.5h14"/>',tour:'<path d="M5 19c3-1 3-6 7-7s4-6 7-7"/><circle cx="5" cy="19" r="1.6" fill="currentColor"/><circle cx="19" cy="5" r="1.6" fill="currentColor"/>',lab:'<path d="M9.5 3.5h5M10.5 3.5v5L5 18.5a1.5 1.5 0 0 0 1.3 2.2h11.4a1.5 1.5 0 0 0 1.3-2.2L13.5 8.5v-5"/><path d="M7.5 14.5h9"/>',check:'<path d="M5 12.5l4.5 4.5L19 7.5"/>',sun:'<circle cx="12" cy="12" r="4.5"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/>',planet:'<circle cx="12" cy="12" r="5"/><path d="M3.5 15.5c2 1.5 15 -3 17 -7" />',point:'<path d="M12 6v12M6 12h12" /><circle cx="12" cy="12" r="2.4" fill="currentColor" stroke="none"/>',orbit:'<ellipse cx="12" cy="12" rx="9" ry="5"/><circle cx="19.5" cy="9.8" r="1.6" fill="currentColor"/>',craft:'<rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M3 9.5h5v5H3zM16 9.5h5v5h-5z"/><path d="M8 12h1.5M14.5 12H16"/>',view:'<path d="M2.5 12s3.5-6.5 9.5-6.5 9.5 6.5 9.5 6.5-3.5 6.5-9.5 6.5S2.5 12 2.5 12z"/><circle cx="12" cy="12" r="2.6"/>',info:'<circle cx="12" cy="12" r="8.5"/><path d="M12 11v5.5M12 7.6v.4"/>',keyboard:'<rect x="3" y="6.5" width="18" height="11" rx="2"/><path d="M7 10.5h0M10.5 10.5h0M14 10.5h0M17.5 10.5h0M8 14h8"/>',lang:'<circle cx="12" cy="12" r="8.5"/><path d="M3.5 12h17M12 3.5c-3 3-3 14 0 17M12 3.5c3 3 3 14 0 17"/>',t_impl:'<circle cx="12" cy="12" r="8" fill="currentColor" stroke="none"/>',t_ext:'<path d="M12 2.5l9.5 9.5-9.5 9.5L2.5 12z" fill="currentColor" stroke="none"/>',t_phys:'<path d="M12 3l10 17.5H2z" fill="currentColor" stroke="none"/>',t_approx:'<path d="M2.5 10c3-4 6-4 9.5 0s6.5 4 9.5 0M2.5 16c3-4 6-4 9.5 0s6.5 4 9.5 0" stroke-width="3"/>'};function ei(n,{size:e,cls:t}={}){let i=Kb[n];if(i===void 0)throw new Error("\uC544\uC774\uCF58 \uC5C6\uC74C: "+n);km.innerHTML="<svg></svg>";let s=km.content.firstChild;return s.remove(),s.setAttribute("viewBox","0 0 24 24"),s.setAttribute("fill","none"),s.setAttribute("stroke","currentColor"),s.setAttribute("stroke-width","1.7"),s.setAttribute("stroke-linecap","round"),s.setAttribute("stroke-linejoin","round"),s.setAttribute("aria-hidden","true"),s.setAttribute("focusable","false"),e&&(s.setAttribute("width",String(e)),s.setAttribute("height",String(e))),t&&s.setAttribute("class",t),s.innerHTML=i,s}function ra(n,e,t={},...i){let s=document.createElement(n);e&&(s.className=e);for(let[r,a]of Object.entries(t))a!=null&&s.setAttribute(r,String(a));return s.append(...i.filter(r=>r!=null)),s}function aa(n,{label:e,iconName:t,pressed:i,title:s,busyLabel:r}={}){let a=ra("button",`k-btn k-${n}`,{type:"button",title:s||(n==="icon"?e:void 0)});if(n==="icon")return a.setAttribute("aria-label",e),a.append(ei(t)),a;if(n==="toggle")return a.setAttribute("aria-pressed",String(!!i)),a.append(ra("span","k-ind",{},ei("check")),e),a.addEventListener("click",()=>a.setAttribute("aria-pressed",String(a.getAttribute("aria-pressed")!=="true"))),a;t&&a.append(ei(t));let o=ra("span","k-label",{},e);return a.append(ra("span","k-spin",{"aria-hidden":"true"}),o),n==="primary"&&a.append(ei("chevr",{cls:"k-arrow"})),a.setBusy=l=>{a.classList.toggle("is-busy",l),a.setAttribute("aria-busy",String(l)),o.textContent=l&&r?r:e},a}function bh(n,{label:e,wide:t=!1}={}){let i=ra("aside",`k-vpanel k-${n}${t?" k-wide":""}`,{"aria-label":e,"data-open":"false"});return i.setOpen=s=>i.setAttribute("data-open",String(!!s)),i}function Sh(n){return ra("div",`k-scrim k-${n}`,{"aria-hidden":"true"})}var Qb=4e3,eS={impl:"t_impl",external:"t_ext",physical:"t_phys",approx:"t_approx"},tS=[1,10,30],wh=n=>({get(){try{return localStorage.getItem(n)}catch{return null}},set(e){try{localStorage.setItem(n,e)}catch{}}}),Bm=wh("lagrange.mode"),zm=wh("lagrange.hint"),Vm=wh("lagrange.hint_expert"),Mh=[{g:"tour",rows:[{id:"tgt-tour",icon:"tour",key:"tgt.tour",soon:"tgt.tour_soon"}]},{g:"views",rows:[{id:"view-all",icon:"view",key:"l2.view_solar",view:"all",info:"v_all"},{id:"view-emb",icon:"view",key:"l2.view_emb",view:"emb",info:"v_emb"},{id:"view-l2zoom",icon:"view",key:"l2.view_l2zoom",view:"l2zoom",info:"v_l2zoom"}]},{g:"points",rows:["L1","L2","L3","L4","L5"].map(n=>({id:"tgt-"+n,icon:"point",pick:n}))},{g:"orbits",rows:[{id:"tgt-halo_main",icon:"orbit",pick:"halo_main"},{id:"view-jwst",icon:"craft",pick:"JWST",view:"jwst"},{id:"tgt-jwst_period",icon:"craft",pick:"jwst_period"}]},{g:"bodies",rows:["Sun","Earth","Moon","EMB","Mercury","Venus","Mars","Jupiter","Saturn","Uranus","Neptune"].map(n=>({id:"tgt-"+n,icon:n==="Sun"?"sun":"planet",pick:n,only:n==="EMB"?"expert":void 0}))},{g:"tools",rows:[{id:"view-lab",icon:"lab",key:"l2.view_lab",tool:"lab",only:"expert"},{id:"all-numbers",icon:"info",key:"ui.numbers",tool:"all",only:"expert"}]}],Hm={L1:"point",L2:"point",L3:"point",L4:"point",L5:"point",halo_main:"orbit",JWST:"craft",jwst_period:"period",Sun:"star",Earth:"planet",Moon:"moon",EMB:"bary",Mercury:"system",Venus:"system",Mars:"system",Jupiter:"system",Saturn:"system",Uranus:"system",Neptune:"system"};function Gm(n,e,t,i,s){let r=document.body,a=t.model.table,o=e.utcTable,l=D=>s.setLabelNumbers(D);s.labelNumbersDefault=n.label.numbers,r.dataset.mode="general",i&&r.classList.add("k-touch");let c={layout:n.layout},u=[],h=D=>(D.dataset.shell="",u.push(D),D),d=D=>ei(D),f=(D,me,Fe,_t)=>{let mt=aa("icon",{label:Me(me),iconName:Fe});return mt.id=D,mt.dataset.i18nAria=me,_t?mt.dataset.i18nTitle=_t:mt.dataset.i18nTitle=me,mt};document.getElementById("panel").hidden=!0;let m=document.getElementById("credits");m&&m.remove(),r.append(s.elements.scalebar,s.elements.help),document.getElementById("source").dataset.obstacle="";let x=document.getElementById("source");r.append(Sh("top"),Sh("bottom"));let p=null,g=null,A={};function R(D,me){let Fe=G("div",{id:D,class:"k-pop",role:"dialog","aria-label":me?Me(me):"","data-obstacle":"",hidden:!0});return me&&(Fe.dataset.i18nAria=me),h(Fe),r.append(Fe),A[D]=Fe,Fe}function v(D,me,Fe){D.style.left=D.style.right=D.style.top=D.style.bottom="";let _t=me.getBoundingClientRect(),mt=innerWidth,pn=innerHeight,Ni=i?8:12,_i=Math.min(D.offsetWidth||300,mt-2*Ni),Hn=Fe==="right"?_t.right-_i:_t.left+_t.width/2-_i/2;Hn=Math.max(Ni,Math.min(mt-Ni-_i,Hn)),D.style.left=`${Math.round(Hn)}px`,_t.top>pn/2?D.style.bottom=`${Math.round(pn-_t.top+8)}px`:D.style.top=`${Math.round(_t.bottom+8)}px`}function w(D,me,Fe){p&&p!==D&&M(!1),p=D,g=me||null,D.hidden=!1,Lt(D),me&&(me.setAttribute("aria-expanded","true"),v(D,me,Fe)),ln()}function M(D=!0){p&&(p.hidden=!0,g&&(g.setAttribute("aria-expanded","false"),D&&g.focus({preventScroll:!0})),p=null,g=null,on())}let E=(D,me,Fe)=>p===D?M():w(D,me,Fe);c.closePop=M;let y=ei("mark");y.setAttribute("role","img"),y.removeAttribute("aria-hidden"),y.classList.add("k-mark"),y.insertAdjacentHTML("afterbegin","<title></title>");let T=y.firstChild,P=G("span",{id:"focus",class:"k-tname","data-meta":""}),k=G("small",{class:"k-tkind","data-meta":""}),U=G("button",{type:"button",id:"target-btn",class:"k-btn k-target","aria-haspopup":"dialog","aria-expanded":"false","aria-controls":"targets","data-i18n-title":"nav.targets"},P,k,d("chev")),z=G("div",{id:"zoom-norecon",class:"k-znote","data-meta":""}),F=h(G("nav",{id:"nav",class:"k-nav k-bare","data-obstacle":"","data-i18n-aria":"nav.label"},G("div",{class:"k-navrow"},y,U)));r.append(F);let q=f("search-btn","tr.search","search","tr.search_title");q.dataset.only="expert";let K=f("layers-btn","ui.layers","layers");K.setAttribute("aria-haspopup","dialog"),K.setAttribute("aria-expanded","false");let ne=G("button",{type:"button",id:"mode-general",role:"radio","aria-checked":"true",i18n:"mode.general","data-meta":""}),oe=G("button",{type:"button",id:"mode-expert",role:"radio","aria-checked":"false",i18n:"mode.expert","data-meta":""}),j=G("div",{class:"k-seg k-modesel",role:"radiogroup","data-i18n-aria":"mode.label"},ne,G("span",{class:"k-dot","aria-hidden":"true"}),oe),le=f("settings-btn","tr.settings","gear");le.setAttribute("aria-haspopup","dialog"),le.setAttribute("aria-expanded","false");let ce=h(G("div",{id:"tr",class:"k-tr k-bare",role:"toolbar","data-obstacle":"","data-i18n-aria":"tr.label"},q,K,j,le));r.append(ce);let re=R("pop-layers","ui.layers");re.classList.add("k-pop-wide");let xe=aa("toggle",{label:"",pressed:t.trueSize});xe.id="true-size",xe.querySelector(".k-ind").after(G("span",{i18n:"view.true_size"})),xe.dataset.i18nTitle="view.true_size_title",xe.addEventListener("click",()=>{t.setTrueSize(xe.getAttribute("aria-pressed")==="true")}),re.append(G("div",{class:"k-popsect","data-meta":""},G("h4",{i18n:"layer.view_options"}),xe),s.panel()),K.addEventListener("click",()=>E(re,K,"right"));let Xe=R("pop-settings","tr.settings"),Ne=document.getElementById("lang");Ne.classList.add("k-btn","k-secondary");let qe=G("button",{type:"button",id:"settings-help",class:"k-btn k-secondary",i18n:"help.button"});qe.addEventListener("click",()=>{M(!1),s.elements.help.hidden=!1,Lt(s.elements.help)});let H=document.getElementById("version");Xe.append(G("div",{class:"k-popsect","data-meta":""},G("h4",{i18n:"settings.lang"}),Ne),G("div",{class:"k-popsect"},G("h4",{"data-meta":"",i18n:"settings.legend"}),e.legend),G("div",{class:"k-popsect","data-meta":""},G("h4",{i18n:"settings.keys"}),qe),G("div",{class:"k-popsect","data-meta":""},G("h4",{i18n:"settings.about"}),G("p",{class:"k-sub",i18n:"app.subtitle"}),H)),le.addEventListener("click",()=>E(Xe,le,"right"));let W="general",_e=[];function ve(D,me=!0){W=D==="expert"?"expert":"general",r.dataset.mode=W,ne.setAttribute("aria-checked",String(W==="general")),oe.setAttribute("aria-checked",String(W==="expert")),me&&Bm.set(W);for(let Fe of _e)Fe(W)}ne.addEventListener("click",()=>ve("general")),oe.addEventListener("click",()=>ve("expert")),c.setMode=ve,Object.defineProperty(c,"mode",{get:()=>W});let ge=h(bh("left",{label:Me("nav.targets_panel")}));ge.id="targets",ge.dataset.i18nAria="nav.targets_panel",ge.dataset.obstacle="";let Be=G("input",{type:"search",id:"target-search",class:"k-search",autocomplete:"off",spellcheck:!1}),Je=G("label",{class:"k-searchwrap"},d("search"),Be,G("kbd",{"aria-hidden":"true","data-meta":""},"/")),De=f("targets-close","nav.targets_close","close");De.classList.add("k-close");let We=G("div",{class:"k-vbody k-list"});ge.append(G("div",{class:"k-lhead"},Je,De),We),r.append(ge);let it=[],Ke=D=>D.key?Me(D.key):e.nameOf(D.pick);for(let D of Mh){let me=G("section",{class:"k-group","data-group":D.g});me.append(G("h3",{"data-meta":"",i18n:"tgt.g_"+D.g}));for(let Fe of D.rows){let _t=G("span",{class:"k-rname","data-meta":""}),mt=G("button",{type:"button",id:Fe.id,class:"k-row"},d(Fe.icon),_t);Fe.only&&(mt.dataset.only=Fe.only),Fe.soon&&(mt.disabled=!0,mt.dataset.i18nTitle=Fe.soon,mt.setAttribute("aria-disabled","true")),mt._r=Fe,mt._name=_t,mt.addEventListener("click",()=>at(Fe,mt)),it.push(mt),me.append(mt)}We.append(me)}function Ye(){for(let D of it)D._name.textContent=Ke(D._r);he()}function he(){let D=Be.value.trim().toLowerCase();for(let me of it){let Fe=me._r,_t=[Ke(Fe),Fe.pick||"",Fe.view||"",Fe.id].join(" ").toLowerCase();me.hidden=!!D&&!_t.includes(D)}for(let me of We.children)me.hidden=![...me.querySelectorAll(".k-row")].some(Fe=>!Fe.hidden)}Be.addEventListener("input",he),Be.addEventListener("keydown",D=>{if(D.key==="Enter"){let me=it.find(Fe=>!Fe.hidden&&!Fe.disabled&&getComputedStyle(Fe).display!=="none");me&&me.click()}});let we=!1;function Ue(D,{focusSearch:me=!1,refocus:Fe=!0}={}){we=!!D,ge.setOpen(we),r.classList.toggle("list-open",we),U.setAttribute("aria-expanded",String(we)),we?(ln(),me&&setTimeout(()=>Be.focus(),0)):Fe&&U.focus({preventScroll:!0}),on()}U.addEventListener("click",()=>Ue(!we)),De.addEventListener("click",()=>Ue(!1)),q.addEventListener("click",()=>Ue(!0,{focusSearch:!0})),c.setList=Ue;let Oe=null,V=null,se=null;function Ae(D){if(!D)return{name:"",kind:""};if(D.startsWith("view:")){let me=Mh.flatMap(Fe=>Fe.rows).find(Fe=>Fe.view===D.slice(5)&&!Fe.pick);return{name:me?Me(me.key):"",kind:Me("kind.view")}}return D==="__all"?{name:Me("ui.numbers"),kind:Me("kind.numbers")}:{name:e.nameOf(D),kind:Hm[D]?Me("kind."+Hm[D]):""}}function b(){if(z.remove(),Oe&&Oe.startsWith("zoom:")){let D=Oe.slice(5);P.textContent=Me("jwst.zoom_focus_"+D),k.textContent=Me("kind.zoom"),D!=="R5"&&(z.textContent=Me("jwst.zoom_norecon"),F.append(z))}else{let D=Ae(Oe);P.textContent=D.name,k.textContent=D.kind}P.dataset.name=Oe||"";for(let D of it){let me=D._r;!!Oe&&(me.pick&&me.pick===Oe||!me.pick&&me.view&&Oe==="view:"+me.view)?D.setAttribute("aria-current","true"):D.removeAttribute("aria-current")}}function _(D){Oe=D,D&&!D.startsWith("zoom:")&&(se=D),b()}let L=h(bh("right",{label:Me("info.label")}));L.id="info",L.dataset.i18nAria="info.label",L.dataset.obstacle="",r.append(L);let O=null,ee=!1,de=null,ye=[],ae=!1,fe=Vm.get()==="1",Ie=()=>{for(let D of ye)Qo(D);ye=[]};function je(D){let me=G("div",{class:"num-row k-keycell"});me.dataset.source=Ba(D.provenance),me.dataset.verification=`${D.provenance.verification.tag}/${D.provenance.verification.detail}`;let Fe=G("span",{class:"num-label k-lab"}),_t=ki(D.provenance.verification,a),mt=G("button",{type:"button",class:"num k-val"});return mt.dataset.source=me.dataset.source,mt.dataset.verification=me.dataset.verification,mt.dataset.id=D.id,mt.addEventListener("click",()=>t.model.openSource(D)),me._render=()=>{let pn=D.unit&&typeof D.unit=="object"?D.unit[si()]??D.unit.ko:D.unit;Fe.textContent=D.label&&typeof D.label=="object"?D.label[si()]??D.label.ko:String(D.label||""),mt.replaceChildren(document.createTextNode(D.text+(pn?" ":"")),...pn?[G("small",{},pn)]:[]),mt.classList.toggle("k-long",D.text.length>=9),_t._render()},me._render(),me._item=D,me.append(G("div",{class:"k-labrow"},Fe,_t),mt),ur(me,D.id,"key"),me}function Ce(D,me={}){let Fe=ee;O=D,Ie();let _t=D.startsWith("view:"),mt=D==="__all",pn=_t?Mh.flatMap(Gn=>Gn.rows).find(Gn=>Gn.view===D.slice(5)&&!Gn.pick):null,Ni=Ae(D),_i=f("info-close","info.close","close");_i.classList.add("k-close"),_i.addEventListener("click",()=>Le());let Hn=G("div",{class:"k-vhead"},G("h3",_t||mt||!e.NAME[D]?{class:"k-name","data-meta":""}:{class:"k-name",i18n:e.NAME[D]},Ni.name),G("span",{class:"k-kind","data-meta":""},Ni.kind),_i),xi=G("div",{class:"k-vbody"}),Dh=_t?"desc."+pn.info:"desc."+D;mt||xi.append(G("p",{class:"desc k-desc","data-meta":"",i18n:Dh},Me(Dh))),!_t&&!mt&&e.hasSphere(D)&&xi.append(G("p",{class:"note k-note","data-meta":""},Xn(),G("span",{i18n:"card.sphere_note"},Me("card.sphere_note"))));let Bo=!1;if(mt)xi.append(e.nums),Bo=!0;else if(!_t){let Gn=e.sections(D);if(Gn.key.length){let En=G("div",{class:"k-key"+(Gn.key.length>2?" k-key-many":"")});for(let Ui of Gn.key){let yi=je(Ui);ye.push(yi),En.append(yi)}xi.append(G("div",{class:"k-sect"},En)),Bo=!0}if(D==="JWST"){let En=G("div",{class:"k-sect k-acts","data-meta":""},G("h4",{i18n:"jwst.zoom_title"}));if(t.zoomStops)for(let[yi,Nh]of[["R5","jwst.zoom_r5"],["A",null],["B",null],["C",null]]){if(!t.zoomStops[yi])continue;let zo=G("button",{type:"button",id:"zoom-"+yi,class:"k-btn k-secondary zoom-btn"});Nh?zo.dataset.i18n=Nh:zo.textContent=Me("jwst.zoom_window",{w:yi}),zo.addEventListener("click",()=>c.zoom(yi)),En.append(zo)}let Ui=G("button",{type:"button",id:"open-period",class:"k-btn k-secondary",i18n:"jwst.period_button"});Ui.addEventListener("click",()=>c.pick("jwst_period")),En.append(Ui),xi.append(En)}let _u=[...Gn.more,...W==="expert"?Gn.expert:[]],la=[];if(D==="JWST"&&W==="expert"){let En=e.jwstBody(ye,()=>c.pick("jwst_period")),Ui=En.querySelector("#open-period");Ui&&Ui.remove(),la.push(En)}if(D==="jwst_period"&&W==="expert"&&la.push(e.periodBody(ye)),_u.length||la.length){let En=G("details",{class:"k-more",id:"info-more"},G("summary",{"data-meta":"",i18n:"info.more"}));En.open=W==="expert"||!!me.moreOpen;for(let Ui of _u){let yi=Si(Ui,a,t.model.openSource);ye.push(yi),En.append(yi)}En.append(...la),xi.append(En),Bo=!0}!Gn.key.length&&!_u.length&&!la.length&&!Gn.expert.length&&D!=="JWST"&&xi.append(G("p",{class:"note k-note",i18n:"card.no_numbers"},Me("card.no_numbers")))}W==="general"&&!mt&&(ae||!fe)&&(ae||(ae=!0,Vm.set("1")),xi.append(G("p",{class:"k-cap",id:"info-expert-hint","data-meta":"",i18n:"info.expert_hint"})));let gu=G("button",{type:"button",id:"info-focus",class:"k-btn k-secondary","data-only":"expert",i18n:"info.focus_only"}),oa=aa("primary",{label:Me("info.fly")});oa.id="info-fly",oa.querySelector(".k-label").dataset.i18n="info.fly";let tr=cu[D];gu.hidden=!tr,gu.addEventListener("click",()=>{t.flyTo(tr[0],t.state.cam.dist)}),oa.addEventListener("click",()=>{pn?st(pn.view):tr&&t.flyTo(tr[0],tr[1])}),oa.disabled=!pn&&!tr;let xg=G("div",{class:"k-vfoot"},G("div",{class:"k-left-acts"},gu),oa);L.replaceChildren(G("div",{class:"card-body k-card"},Hn,xi,xg)),Lt(L),dr(),Bo&&!L.querySelector(".num-row")&&xi.append(G("p",{class:"note k-note",id:"card-numbers-off",i18n:"card.numbers_off"},Me("card.numbers_off"))),Zt(L),Fe||(de=me.opener||(document.activeElement&&document.activeElement!==r?document.activeElement:null)),ee=!0,L.setOpen(!0),r.classList.add("info-open"),ln()}function Le(D=!0){ee&&(ee=!1,ae&&(ae=!1,fe=!0),L.setOpen(!1),r.classList.remove("info-open"),Ie(),D&&de&&document.contains(de)&&de.offsetParent!==null?de.focus({preventScroll:!0}):L.contains(document.activeElement)&&document.activeElement.blur(),de=null,on())}c.closeInfo=Le,c.showInfo=Ce,s.onChange(()=>{ee&&Ce(O,{moreOpen:!!(L.querySelector("#info-more")||{}).open})}),_e.push(()=>{ee&&Ce(O)});let Qe=0;function st(D){t.setCamera({...Ts[D],...D==="solar"?{dist:Math.max(Ts.solar.dist,t.orbitFitDist(1.2))}:{}})}c.view=D=>st(D);function at(D,me){if(!D.soon){if(D.tool==="lab"){c.lab&&c.lab.button.click(),i&&Ue(!1,{refocus:!1});return}if(D.tool==="all"){_("__all"),Ce("__all",{opener:me}),i&&Ue(!1,{refocus:!1});return}if(D.view&&st(D.view),D.pick){if(!D.view){let Fe=cu[D.pick];Fe&&t.flyTo(Fe[0],Fe[1])}_(D.pick),Ce(D.pick,{opener:me})}else _("view:"+D.view),Ce("view:"+D.view,{opener:me});i&&Ue(!1,{refocus:!1})}}c.pick=D=>{Qe=performance.now(),ln();let me=cu[D];me&&t.flyTo(me[0],me[1]),_(D),Ce(D)},c.zoom=D=>{let me=t.zoomStops&&t.zoomStops[D];me&&(s.setTemp([me.layer,"n_jwst","n_tags","labels"]),t.setCamera({...me.cam}),_("zoom:"+D))},t.onZoomChange&&t.onZoomChange(D=>{D||(s.clearTemp(),(Oe||"").startsWith("zoom:")&&_(se))}),c.renameFocus=()=>b();function X(){let D=t.state.fly;return D?(t.setCamera({dist:D.d0}),!0):!1}let be=aa("icon",{label:Me("l2.play"),iconName:"play"});be.id="play";let ue=10,Te=()=>{let D=!!t.anim.speedDaysPerSec,me=D?"l2.pause":"l2.play";be.setAttribute("aria-label",Me(me)),be.title=`${Me(me)}`,be.dataset.state=D?"playing":"paused";let Fe=D?"pause":"play";be.dataset.icon!==Fe&&(be.replaceChildren(ei(Fe)),be.dataset.icon=Fe)};be.addEventListener("click",()=>{t.anim.speedDaysPerSec=t.anim.speedDaysPerSec?0:ue,Te(),on()}),be.classList.add("k-play"),Te();let Pe=G("button",{type:"button",id:"speed-btn",class:"k-btn k-small k-speed","aria-haspopup":"menu","aria-expanded":"false","data-meta":""}),pe=R("pop-speed","time.speed_menu");pe.setAttribute("role","menu");let $e=tS.map(D=>{let me=G("button",{type:"button",role:"menuitemradio",class:"k-menuitem","data-speed":String(D),"aria-checked":String(D===ue),"data-meta":""});return me.addEventListener("click",()=>{ue=D,t.anim.speedDaysPerSec&&(t.anim.speedDaysPerSec=D),ze(),M()}),me});pe.append(...$e);let ze=()=>{Pe.textContent=Me("l2.speed",{n:ue}),Pe.title=Me("time.speed_title");for(let D of $e)D.textContent=Me("l2.speed",{n:D.dataset.speed}),D.setAttribute("aria-checked",String(Number(D.dataset.speed)===ue))};Pe.addEventListener("click",()=>E(pe,Pe));let ut=t.model.tMin,ht=t.model.tMax,xt=G("input",{type:"range",id:"time",class:"k-range",min:String(ut),max:String(ht),step:"3600"});xt.value=String(t.state.t),xt.addEventListener("input",()=>t.setTime(Number(xt.value)));let Ut=Tn(ut,o),fn=Tn(ht,o),Bn=G("div",{class:"k-ticks","aria-hidden":"true","data-meta":""});for(let[D,me]of[[2022,null],[2030,"expert"],[2040,"expert"],[2050,null]]){let Fe=Date.UTC(D,0,1)/1e3;if(Fe<Ut-3*86400||Fe>fn+3*86400)continue;let _t=vi(Math.min(Math.max(Fe,Ut),fn),o),mt=G("span",{},String(D));mt.style.left=`${(100*(_t-ut)/(ht-ut)).toFixed(2)}%`,me&&(mt.dataset.only=me),Bn.append(mt)}let Xt=G("div",{class:"k-slider"},xt,Bn),Ln={provenance:e.dateItem(t.state.t).provenance},vn=G("button",{type:"button",id:"date",class:"k-btn num k-date","aria-haspopup":"dialog","aria-expanded":"false"}),ti=G("span",{class:"k-dmain"}),ni=G("small",{class:"k-dsub"});vn.append(ti,ni);let tn=bi(Ln.provenance.verification,a),ii=G("div",{class:"date-row k-dateblock"},vn,tn);for(let D of[vn,ii])D.dataset.source="time.utc (results/web) | "+Ba(Ln.provenance),D.dataset.verification=`${Ln.provenance.verification.tag}/${Ln.provenance.verification.detail}`;ii._itemFn=()=>e.dateItem(t.state.t);let zn=D=>String(D).padStart(2,"0"),Ps=D=>{let me=new Date(Math.floor(D/60)*6e4);return`${me.getFullYear()}-${zn(me.getMonth()+1)}-${zn(me.getDate())} ${zn(me.getHours())}:${zn(me.getMinutes())}`},Di=D=>{let me=-new Date(Math.floor(D/60)*6e4).getTimezoneOffset(),Fe=me>=0?"+":"\u2212",_t=Math.abs(me);return`UTC${Fe}${Math.floor(_t/60)}${_t%60?":"+zn(_t%60):""}`};function Qi(){let D=Tn(t.state.t,o),me=ss(D),Fe=Ps(D),_t=Di(D);W==="expert"?(ti.textContent=`${me} UTC`,ni.textContent=`${Me("time.local")} ${Fe.slice(11)} (${_t})`):(ti.textContent=Fe,ni.textContent=_t),vn.setAttribute("aria-label",Me("time.date_aria",{utc:me,local:Fe,zone:_t})),xt.setAttribute("aria-valuetext",`${me} UTC`),xt.setAttribute("aria-label",Me("time.slider"))}let an=G("button",{type:"button",id:"t-now",class:"k-btn k-small k-now",i18n:"time.now","data-meta":""}),C=()=>Math.floor(Date.now()/6e4)*60,N=()=>{let D=C(),me=D>=Ut&&D<=fn;return an.disabled=!me,an.title=me?Me("time.now_title"):Me("time.now_out"),me};an.addEventListener("click",()=>{N()&&t.setTime(vi(C(),o))}),c.nowTdb=()=>vi(C(),o),setInterval(N,6e4);let B=h(G("div",{id:"timebar",class:"k-timebar k-bare",role:"group","data-obstacle":"","data-i18n-aria":"time.group"},be,Pe,Xt,G("div",{class:"k-dateacts"},ii,an)));r.append(B);let Q=t.model.onTimeChange;t.model.onTimeChange=D=>{Q&&Q(D),xt.value=String(D),Qi(),!t.anim.speedDaysPerSec&&be.dataset.state==="playing"&&Te()};let te=document.getElementById("ephem-busy");te&&new MutationObserver(()=>{let D=!te.hidden;vn.classList.toggle("is-busy",D),vn.setAttribute("aria-busy",String(D))}).observe(te,{attributes:!0,attributeFilter:["hidden"]});let ie=R("pop-date","time.date_pop"),He=new Date(Math.ceil(Ut/86400)*864e5).toISOString().slice(0,10),S=new Date(Math.floor(fn/86400)*864e5).toISOString().slice(0,10),I=G("input",{type:"date",id:"date-jump",class:"k-dateinput",min:He,max:S,"data-i18n-aria":"time.date_input"});I.dataset.range=`${He} ~ ${S}`;let J=aa("primary",{label:Me("time.go")});J.id="date-go",J.querySelector(".k-label").dataset.i18n="time.go",J.disabled=!0;let Z=G("p",{id:"date-range-note",class:"k-warn",hidden:!0,i18n:"time.out_of_range","data-meta":""}),$=()=>{let D=I.value,me=!!D&&D>=He&&D<=S;return J.disabled=!me,Z.hidden=!D||me,me};I.addEventListener("input",$),I.addEventListener("keydown",D=>{D.key==="Enter"&&$()&&J.click()}),J.addEventListener("click",()=>{$()&&t.setTime(vi(Date.parse(I.value+"T00:00:00Z")/1e3,o))});let Ee=G("button",{type:"button",id:"t-start",class:"k-btn k-secondary",i18n:"time.start"});Ee.addEventListener("click",()=>t.setTime(ut)),ie.append(G("div",{class:"k-popsect","data-meta":""},G("h4",{i18n:"time.date_pop"}),G("p",{class:"k-sub",i18n:"time.date_utc_note"})),G("div",{class:"k-daterow"},I,J),Z,G("div",{class:"k-popfoot"},Ee)),vn.addEventListener("click",()=>E(ie,vn));let Se=G("span",{class:"tag-approx k-adot","aria-hidden":"true"},ei("t_approx")),Re=G("span",{"data-meta":""}),Ge=G("button",{type:"button",id:"credits",class:"k-btn k-small credits","data-obstacle":""},Re,Se),et=()=>Ha(()=>il(Xn));Ge.addEventListener("click",et);let dt=G("button",{type:"button",id:"frame-rot",role:"radio","aria-checked":"true",i18n:"l2.mode_rot","data-meta":""}),pt=G("button",{type:"button",id:"frame-in",role:"radio","aria-checked":"false",i18n:"l2.mode_inertial","data-meta":""}),Ze=D=>{t.setMode(D),dt.setAttribute("aria-checked",String(D==="rot")),pt.setAttribute("aria-checked",String(D!=="rot"))};dt.addEventListener("click",()=>Ze("rot")),pt.addEventListener("click",()=>Ze("inertial"));let wt=G("div",{class:"k-seg k-frame",role:"radiogroup","data-only":"expert","data-obstacle":"","data-i18n-aria":"l2.mode"},dt,pt),Ot=h(G("div",{id:"strip",class:"k-strip k-bare"},Ge,wt));r.append(Ot);let Pt=()=>{Re.textContent=Me(W==="expert"?"credits.long":"credits.short"),Ge.title=Me("credits.open"),Se.title=Me("tag.display_approx")},St=null;if(zm.get()!=="1"){let D=G("button",{type:"button",id:"hint-tour",class:"k-btn k-small",disabled:!0,"data-i18n-title":"tgt.tour_soon","aria-disabled":"true"},ei("tour"),G("span",{i18n:"hint.tour"})),me=f("hint-close","hint.close","close");St=h(G("div",{id:"hint",class:"k-hint k-bare",role:"note","data-obstacle":"","data-only":"general","data-i18n-aria":"hint.label"},G("span",{class:"k-lead","data-meta":"",i18n:"hint.lead"}),G("span",{class:"k-how","data-meta":"",i18n:"hint.how"}),D,me)),me.addEventListener("click",()=>{zm.set("1"),St.remove(),St=null}),r.append(St)}function Zt(D){for(let me of D.querySelectorAll(".tag:not(.tag-approx):not(.tag-open)")){me.querySelector(":scope > .tag-shape")||me.prepend(G("span",{class:"tag-shape","aria-hidden":"true"},ei(eS[me.dataset.tag]||"t_impl")));let Fe=(me.querySelector(".tag-name")||{}).textContent||"",_t=(me.querySelector(".tag-tip")||{}).textContent||"";me.setAttribute("role","button"),me.setAttribute("aria-label",`${me.classList.contains("mini")?_t:`${Fe} \u2014 ${_t}`} \u2014 ${Me("tag.open_hint")}`)}}let Ve=R("pop-tag","tag.pop_label");Ve.classList.add("k-tpop","num-row");function nn(D){let me=D.closest(".num-row, .date-row"),Fe=me&&(me._item||me._itemFn&&me._itemFn()),_t={tag:D.dataset.tag,detail:D.dataset.detail},mt=ki(Fe?Fe.provenance.verification:_t,a);mt.classList.add("tag-open");let pn=[G("div",{class:"k-tphead"},mt)];if(Fe){Ve.dataset.source=Ba(Fe.provenance),Ve.dataset.verification=`${Fe.provenance.verification.tag}/${Fe.provenance.verification.detail}`;let Ni=G("p",{class:"k-tsrc"},G("span",{"data-meta":"",i18n:"tag.pop_source"}),document.createTextNode(" "));for(let Hn of Fe.provenance.source)Ni.append(G("code",{"data-literal":""},`${Hn.file} \u203A ${Hn.key}`),document.createTextNode(" "));if(pn.push(Ni),me.classList.contains("date-row")){let Hn=Tn(t.state.t,o);pn.push(G("p",{class:"k-tsrc"},`${ss(Hn)} UTC \xB7 ${Me("time.local")} ${Ps(Hn)} (${Di(Hn)})`))}let _i=G("button",{type:"button",id:"tag-open-source",class:"k-btn k-secondary",i18n:"tag.pop_open"});_i.addEventListener("click",()=>{M(!1),t.model.openSource(Fe)}),pn.push(G("div",{class:"k-popfoot"},_i))}else delete Ve.dataset.source,delete Ve.dataset.verification;Ve.replaceChildren(...pn),w(Ve,D)}let vt=D=>D&&D.closest&&D.closest("#info, #timebar")&&D.closest(".tag:not(.tag-approx):not(.tag-open)");document.addEventListener("click",D=>{let me=vt(D.target);me&&(D.stopPropagation(),nn(me))},!0),document.addEventListener("keydown",D=>{(D.key==="Enter"||D.key===" ")&&vt(D.target)&&(D.preventDefault(),nn(D.target.closest(".tag")))});let wn=!!globalThis.__LAGRANGE_IDLE_OFF,In=null,Vn=()=>r.classList.contains("chrome-hidden"),es=()=>{let D=document.activeElement;return!!(D&&D!==r&&D.closest&&D.closest("[data-shell], #source, #lab"))},Et=()=>{let D=document.getElementById("lab");return!!(D&&!D.hidden)},kt=()=>!t.anim.speedDaysPerSec&&!we&&!ee&&!p&&!es()&&x.hidden&&s.elements.help.hidden&&!Et();function on(){clearTimeout(In),!wn&&(In=setTimeout(()=>{Vn()||(kt()?Tt():on())},Qb))}function Tt(){r.classList.add("chrome-hidden"),l(!1)}function ln(){Vn()&&(r.classList.remove("chrome-hidden"),l(!0)),on()}function ts(){M(!1),Ue(!1,{refocus:!1}),Le(!1),Tt()}c.reveal=ln,c.hide=ts,c.retreat=Tt;for(let D of["pointermove","pointerdown","wheel","touchstart"])window.addEventListener(D,()=>ln(),{passive:!0,capture:!0});let Ls=null;window.addEventListener("pointerdown",D=>{Ls={x:D.clientX,y:D.clientY,t:D.target}},!0),window.addEventListener("click",D=>{let me=D.target,Fe=Ls?Math.hypot(D.clientX-Ls.x,D.clientY-Ls.y):0;p&&!p.contains(me)&&!(g&&g.contains(me))&&M(!1),!(!(me&&(me.id==="scene"||me.closest&&me.closest("#labels")))||Fe>5)&&(performance.now()-Qe<400||(we&&Ue(!1,{refocus:!1}),ee&&Le(!1)))}),window.addEventListener("keydown",D=>{if(D.key==="Escape"){let Fe=!0;X()||(p?M():x.hidden?s.elements.help.hidden?Et()&&c.lab&&c.lab.close?c.lab.close():ee?Le():we?Ue(!1):Vn()?Fe=!1:(document.activeElement&&document.activeElement!==r&&document.activeElement.blur(),Tt()):s.elements.help.hidden=!0:tl()),Fe&&(D.stopPropagation(),D.preventDefault());return}if(s.handleKey(D))return;ln();let me=D.target&&D.target.tagName||"";D.ctrlKey||D.metaKey||D.altKey||me==="INPUT"||me==="SELECT"||me==="TEXTAREA"||i||(D.key==="/"?(D.preventDefault(),Ue(!0,{focusSearch:!0})):(D.key==="t"||D.key==="T")&&(D.preventDefault(),Ue(!we,{focusSearch:!we})))},!0);let er=null;new MutationObserver(()=>{x.hidden?(er&&document.contains(er)&&er.offsetParent!==null&&er.focus({preventScroll:!0}),er=null,on()):(er=document.activeElement&&document.activeElement!==r?document.activeElement:null,ln())}).observe(x,{attributes:!0,attributeFilter:["hidden"]});function Ih(){T.textContent=Me("app.title"),y.setAttribute("aria-label",Me("app.title")),b(),Ye(),ze(),Qi(),Pt(),Te(),N(),Be.placeholder=Me("nav.search_ph"),Be.setAttribute("aria-label",Me("nav.search_ph")),tn._render(),Zt(B),Lt(F),Lt(ce),Lt(B),Lt(Ot),Lt(ge),St&&Lt(St);for(let D of Object.values(A))Lt(D)}return cr(()=>{Ih(),ee&&Ce(O,{moreOpen:!!(L.querySelector("#info-more")||{}).open}),p===Ve&&M(!1)}),_e.push(()=>{Qi(),Pt()}),c.setLab=D=>{c.lab=D},ve(Bm.get()==="expert"?"expert":"general",!1),_("L2"),Ih(),l(!0),on(),c}var Wm="lagrange.panel",jm={get(){try{return localStorage.getItem(Wm)}catch{return null}},set(n){try{localStorage.setItem(Wm,n)}catch{}}};function Xm(n,e,t,i,s){let r=document.body,a=document.getElementById("top"),o=document.getElementById("panel");a.dataset.obstacle="",document.getElementById("version").dataset.obstacle="",document.getElementById("source").dataset.obstacle="";let l=h=>s.setLabelNumbers(h);s.labelNumbersDefault=n.label.numbers,r.append(s.elements.scalebar,s.elements.help);let c={pick:()=>{},layout:n.layout},u=h=>s.handleKey(h);if(n.layout==="panel"){o.dataset.obstacle="";let h=G("button",{type:"button",id:"panel-toggle",class:"panel-toggle","aria-expanded":"true"}),d=G("div",{class:"panel-inner"},G("h2",{id:"panel-h",i18n:"l2.panel"}),G("div",{class:"ctl"},e.mode,e.views,e.timeHead,e.timeSlider,e.timeDate),e.layers,e.nums,e.legend);o.replaceChildren(h,d);let f=(x,p=!0)=>{r.classList.toggle("panel-collapsed",x),h.setAttribute("aria-expanded",String(!x)),h.dataset.i18n=x?"panel.open":"panel.close",h.textContent=Me(h.dataset.i18n),p&&jm.set(x?"collapsed":"open")},m=jm.get();return f(m?m==="collapsed":i,!1),h.addEventListener("click",()=>f(!r.classList.contains("panel-collapsed"))),c.setCollapsed=f,window.addEventListener("keydown",u),l(n.label.numbers),c}return Gm(n,e,t,i,s)}var Ct=(n,e={},...t)=>{let i=document.createElement(n);for(let[s,r]of Object.entries(e))s==="i18n"?(i.dataset.i18n=r,i.textContent=Me(r)):s.startsWith("data-")||s.startsWith("aria-")?i.setAttribute(s,r):s==="class"?i.className=r:i[s]=r;return i.append(...t),i},Th=[{id:"bodies",layers:["sun","earth","moon","emb","planets","lpoints"]},{id:"orbits",layers:["halo_main","halo_family","escape","ref","burns","moon_orbit","planet_orbits","dirs","jwst","jwst_ext","jwst_phys"]},{id:"numbers",layers:["n_distance","n_period","n_angle","n_annual","n_escape","n_jwst","n_tags"]},{id:"aux",layers:["labels","scale","grid","axes","stars","milkyway","nightlights","sunglow","clouds"]}],hu=Th.flatMap(n=>n.layers),uu=n=>Object.fromEntries(hu.map(e=>[e,n.includes(e)])),du=Object.fromEntries(Th.map(n=>[n.id,n.layers])),nS={clean:uu(["sun","earth","moon","emb","planets","lpoints","halo_main","moon_orbit","planet_orbits","jwst","n_tags","stars","milkyway","nightlights","sunglow","clouds"]),explore:uu([...du.bodies,...du.orbits,"labels","scale","stars","milkyway","nightlights","sunglow","clouds"]),research:uu(hu)},iS={m1:uu(hu.filter(n=>!["scale","grid","axes","stars","milkyway","nightlights","sunglow","clouds","planet_orbits"].includes(n)))},Eh=["clean","explore","research"],qm=[["L","labels"],["O","g:orbits"],["N","g:numbers"],["B","g:bodies"],["G","grid"],["1","p:clean"],["2","p:explore"],["3","p:research"],["?","help"]],Ym={sun:n=>n.name==="Sun"||n.name==="Sun_sphere",earth:n=>n.name==="Earth"||n.name==="Earth_sphere",moon:n=>n.name==="Moon"||n.name==="Moon_sphere",emb:n=>n.name==="EMB",planets:n=>n.layer==="planets",lpoints:n=>n.layer==="lpoints",halo_main:n=>n.name==="halo_main"||n.name==="halo_main_label",halo_family:n=>!!n.familyLine,escape:n=>n.layer==="escape",ref:n=>n.layer==="ref",burns:n=>n.layer==="burns",moon_orbit:n=>n.name==="moon_trail",planet_orbits:n=>n.layer==="planet_orbits",dirs:n=>n.layer==="dirs",jwst:n=>n.layer==="jwst",jwst_ext:n=>n.layer==="jwst_ext",jwst_phys:n=>n.layer==="jwst_phys",grid:n=>n.name==="grid",axes:n=>n.name.startsWith("axes_"),stars:n=>n.name==="stars",milkyway:n=>n.name==="milkyway"},sS=["nightlights","sunglow","clouds"],$m={clean:["jwst"]},Jm="lagrange.layers",Zm={get(){try{return JSON.parse(localStorage.getItem(Jm)||"null")}catch{return null}},set(n){try{localStorage.setItem(Jm,JSON.stringify(n))}catch{}}};function rS(n){let e=n*110,t=10**Math.floor(Math.log10(e)),i=e/t;return(i>=5?5:i>=2?2:1)*t}var aS=n=>n>=1?Math.round(n).toLocaleString("en-US"):String(Number(n.toPrecision(1)));function Km(n,e){let t={...nS,...iS},i=e.persist?Zm.get():null,s={preset:e.initial,state:{...t[e.initial]},labelNumbers:!0,familyAll:!1,temp:null,zoomOn:!1},r=()=>s.temp?{...s.state,...Object.fromEntries([...s.temp].map(E=>[E,!0]))}:s.state;if(i&&i.state&&typeof i.state=="object"){for(let E of hu)typeof i.state[E]=="boolean"&&(s.state[E]=i.state[E]);s.preset=Eh.includes(i.preset)||i.preset==="custom"?i.preset:"custom",s.familyAll=!!i.familyAll}let a=[],o=Ct("span",{class:"sb-bar"}),l=Ct("span",{class:"sb-text"}),c=Ct("div",{id:"scalebar",class:"scalebar",hidden:!0,"data-obstacle":"","data-aux":"tick","data-source":"screen scale (camera distance, field of view \u2014 browser drawing aid)","data-verification":"display/approx"},o,l,Xn()),u="";n.onRender.push(E=>{if(c.hidden)return;let y=E.kmPerPx(),T=rS(y),P=T/y,k=`${T}|${P.toFixed(1)}`;k!==u&&(u=k,o.style.width=`${P.toFixed(1)}px`,l.textContent=`${aS(T)} km`,c.dataset.km=String(T))});let h=Ct("div",{id:"help",class:"help",hidden:!0,role:"dialog","data-obstacle":"","data-meta":""});function d(){h.replaceChildren(Ct("h3",{i18n:"help.title"}),Ct("table",{},Ct("tbody",{},...qm.map(([y,T])=>Ct("tr",{},Ct("th",{},Ct("kbd",{},y)),Ct("td",{i18n:"key."+T.replace(":","_")}))))),Ct("p",{class:"note",i18n:"help.note"}));let E=Ct("button",{type:"button",class:"close",i18n:"source.close"});E.addEventListener("click",()=>{h.hidden=!0}),h.prepend(E)}d();function f(){for(let E of n.items)E.familyRest&&(E.wanted=s.familyAll,E.obj.visible=n.wantVisible(E))}function m(){let E=r();for(let[y,T]of Object.entries(Ym))n.setItemsVisible(T,!!E[y]);if(n.setGraphic)for(let y of sS)n.setGraphic(y,!!E[y]);for(let y of new Set(Object.values($m).flat()))n.setItemsDimmed(Ym[y],($m[s.preset]||[]).includes(y));f(),n.setLabelsVisible(E.labels),gf((y,T)=>E.n_tags?T==="key"?!0:y!=="n_other"&&!E[y]?!1:T==="label"?E.labels&&(s.labelNumbers||s.zoomOn&&y==="n_jwst"):!0:!1),dr(),c.hidden=!E.scale,u="",e.persist&&Zm.set({preset:s.preset,state:s.state,familyAll:s.familyAll}),document.body.dataset.preset=s.preset,s.temp?document.body.dataset.zoomTemp="":delete document.body.dataset.zoomTemp;for(let y of a)y(s)}function x(E){s.preset=E,s.state={...t[E]},m()}function p(E,y){s.state[E]=y,s.preset="custom",s.temp&&s.temp.delete(E),m()}function g(E){let y=new Set(E.filter(T=>!s.state[T]));s.temp=y.size?y:null,s.zoomOn=!0,m()}function A(){!s.temp&&!s.zoomOn||(s.temp=null,s.zoomOn=!1,m())}function R(E){let y=du[E],T=y.some(P=>s.state[P]);for(let P of y)s.state[P]=!T,s.temp&&s.temp.delete(P);s.preset="custom",m()}function v(E){s.labelNumbers=E,m()}function w(E){if(E.ctrlKey||E.metaKey||E.altKey)return!1;let y=E.target&&E.target.tagName||"";if(y==="INPUT"||y==="SELECT"||y==="TEXTAREA")return!1;let T=E.key.length===1?E.key.toUpperCase():E.key,P=qm.find(([U])=>U===T);if(!P)return!1;let k=P[1];return e.mobile&&!k.startsWith("p:")&&k!=="help"?!1:(k==="help"?(h.hidden=!h.hidden,h.hidden||Lt(h)):k.startsWith("p:")?x(k.slice(2)):k.startsWith("g:")?R(k.slice(2)):p(k,!s.state[k]),!0)}function M(){let E=Ct("div",{class:"layer-panel"}),y=Ct("div",{class:"preset-row",role:"group"}),T={};for(let q of Eh){let K=Ct("button",{type:"button",id:"preset-"+q,i18n:"preset."+q});K.addEventListener("click",()=>x(q)),T[q]=K,y.append(K)}let P=Ct("span",{id:"preset-status",class:"preset-status",i18n:"preset.custom"}),k=Ct("span",{id:"preset-zoom",class:"preset-status",i18n:"preset.zooming",hidden:!0});y.append(P,k),E.append(y);let U={},z=null;if(!e.mobile){for(let K of Th){let ne=Ct("fieldset",{class:"layer-group","data-meta":""},Ct("legend",{i18n:"layer.g_"+K.id}));for(let oe of K.layers){let j=Ct("input",{type:"checkbox",id:"lay-"+oe});j.addEventListener("change",()=>p(oe,j.checked)),U[oe]=j,ne.append(Ct("label",{},j,Ct("span",{i18n:"layer."+oe}),...oe==="planet_orbits"?[document.createTextNode(" "),Xn()]:[])),oe==="halo_family"&&(z=Ct("input",{type:"checkbox",id:"lay-family-all"}),z.addEventListener("change",()=>{s.familyAll=z.checked,m()}),ne.append(Ct("label",{class:"sub"},z,Ct("span",{i18n:"l2.family_all"}))))}K.id==="numbers"&&ne.append(Ct("p",{class:"note",i18n:"layer.tags_note"})),E.append(ne)}let q=Ct("button",{type:"button",id:"help-btn",class:"help-btn",i18n:"help.button"});q.addEventListener("click",()=>{h.hidden=!h.hidden,h.hidden||Lt(h)}),E.append(Ct("div",{class:"keys-line","data-meta":""},Ct("span",{i18n:"help.keys_line"}),q))}let F=()=>{for(let K of Eh)T[K].classList.toggle("on",s.preset===K);P.hidden=s.preset!=="custom",k.hidden=!s.temp;let q=r();for(let[K,ne]of Object.entries(U))ne.checked=!!q[K],ne.parentElement.classList.toggle("temp-on",!!(s.temp&&s.temp.has(K)));for(let K of du.numbers)U[K]&&K!=="n_tags"&&(U[K].disabled=!q.n_tags);z&&(z.checked=s.familyAll,z.disabled=!s.state.halo_family)};return a.push(F),F(),E}return{get state(){return s.state},get preset(){return s.preset},get labelNumbers(){return s.labelNumbers},get effective(){return r()},get temp(){return s.temp?[...s.temp].sort():[]},applyAll:m,setPreset:x,set:p,toggleGroup:R,setLabelNumbers:v,handleKey:w,panel:M,setTemp:g,clearTemp:A,onChange(E){a.push(E)},elements:{scalebar:c,help:h},rerender(){d()},census:_f}}var Qm={name:"default",layout:"panel",css:{"--bg":"#04060c","--fg":"#e7ecf5","--muted":"#a3aec4","--panel":"rgba(12, 18, 32, 0.92)","--line":"#26324c","--impl":"#5aa5ff","--external":"#f0a23b","--physical":"#3fca7f","--approx":"#9aa0aa","--accent":"#5aa5ff","--font":"'Pretendard', system-ui, 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif","--panel-radius":"10px","--panel-blur":"0px","--panel-width":"340px","--btn-bg":"#1b2740","--btn-on":"#2d4a7a","--label-bg":"rgba(12, 18, 32, 0.72)","--label-border":"1px dashed #26324c","--label-radius":"4px","--label-size":"12px","--fs-body":"13px","--fs-small":"12px","--label-min":"12px"},scene:{background:263692,colors:{sun:16765562,emb:8369151,earth:5217791,moon:13620966,lpt:16743129,unstable:16734810,stable:4180607,haloFam:3824266,haloMain:9425919,escOut:15770171,escIn:5822146,a3:13079274,c3:16763755,c4:16747109,ref4c:11583173,ref4d:8440772,moonTrail:7109270,jwst:15255666,extJpl:15770171,extMine:16767392,physRecon:4180607,physMine:11728335,physJpl:3120739,zoomGap:16777215},lines:{main:2.6,family:1,familyOpacity:.35,traj:1.6,dir:2.2,ref:1.8,dv:1.4,trail:1.4,escape:1.8,jwst:1.6,jwstInterp:1.3,pred:2,zoomGap:1.4,dashPx:7,gapPx:5},points:{lpt:9,emb:8,burn:6,jwst:3.5,jwstMarker:9,predEnd:6,zoomPt:10},spheres:{sunMinPx:9,earthMinPx:6,moonMinPx:4},glow:{sun:3.2,earth:1.8,moon:1.4,strength:.55},familyEvery:10},label:{numbers:!0},layers:{initial:"m1",persist:!1}};var eg={name:"C",layout:"hybrid",css:{"--bg":"#000000","--fg":"#f3f5f9","--muted":"#c3cad5","--panel":"rgba(8, 10, 14, 0.80)","--line":"rgba(255, 255, 255, 0.09)","--accent":"#f2f5fa","--panel-radius":"4px","--panel-blur":"16px","--panel-width":"350px","--btn-bg":"rgba(255, 255, 255, 0.07)","--btn-on":"rgba(255, 255, 255, 0.16)","--label-bg":"rgba(0, 0, 0, 0.45)","--label-border":"none","--label-radius":"6px","--label-size":"12px","--fg-2":"#c3cad5","--fg-scene":"#f3f5f9","--fg-scene-2":"#d4d9e1","--on-accent":"#0c0f15","--line-strong":"rgba(255, 255, 255, 0.44)","--edge-hover":"rgba(255, 255, 255, 0.70)","--hover":"rgba(0, 0, 0, 0.45)","--press":"rgba(0, 0, 0, 0.60)","--focus":"#ffffff","--focus-halo":"rgba(0, 0, 0, 0.9)","--scrim-top":"linear-gradient(to bottom, rgba(0, 0, 0, .70) 0, rgba(0, 0, 0, .64) 64px, rgba(0, 0, 0, .30) 112px, rgba(0, 0, 0, 0) 168px)","--scrim-bottom":"linear-gradient(to top, rgba(0, 0, 0, .74) 0, rgba(0, 0, 0, .66) 128px, rgba(0, 0, 0, .30) 176px, rgba(0, 0, 0, 0) 236px)","--scrim-top-h":"168px","--scrim-bottom-h":"236px","--fs-name":"36px","--fw-name":"300","--fs-key":"30px","--fw-key":"300","--fs-unit":"12px","--fs-ui":"14px","--track-cap":"0.06em","--r-ctl":"6px","--ctl-h":"32px","--icon-btn":"32px","--tag-dot":"7px","--tag-hit":"28px","--vpanel-left":"340px","--vpanel-right":"380px","--vpanel-right-expert":"420px","--t-fast":"160ms","--t-base":"480ms","--t-slow":"560ms","--ease":"cubic-bezier(.16, 1, .3, 1)"},scene:{background:0,colors:{haloFam:2834528,haloMain:12575743},lines:{main:2.6,family:.9,familyOpacity:.26,traj:1.5,dir:2,ref:1.7,dv:1.2,trail:1.3,escape:1.7},glow:{sun:3.8,earth:2.2,moon:1.6,strength:.7},familyEvery:12},label:{numbers:!1},layers:{initial:"clean",persist:!0}};var oS="C",tg={C:eg,PANEL:{name:"panel"}},lS=["--t-fast","--t-base","--t-slow"];function ng(n,e){let t={...n};for(let[i,s]of Object.entries(e||{}))t[i]=s&&typeof s=="object"&&!Array.isArray(s)?ng(n[i]||{},s):s;return t}function ig(n){let e=null;try{e=new URLSearchParams(n).get("style")}catch{e=null}let t=e&&tg[e.toUpperCase()]||tg[oS];return ng(Qm,t)}function sg(n,e=document.documentElement){for(let[s,r]of Object.entries(n.css))e.style.setProperty(s,r);document.body.classList.add(`layout-${n.layout}`,`style-${n.name}`),document.body.dataset.style=n.name;let t=null;try{t=window.matchMedia("(prefers-reduced-motion: reduce)")}catch{t=null}let i=()=>{for(let s of lS)n.css[s]!==void 0&&e.style.setProperty(s,t&&t.matches?"0ms":n.css[s])};i(),t&&t.addEventListener&&t.addEventListener("change",i)}function rg(n){if(!("serviceWorker"in navigator))return Promise.resolve(null);let e=i=>{i.waiting&&navigator.serviceWorker.controller&&(n.hidden=!1)};n.addEventListener("click",async()=>{let i=await navigator.serviceWorker.getRegistration();i&&i.waiting&&i.waiting.postMessage({type:"SKIP_WAITING"})});let t=!1;return navigator.serviceWorker.addEventListener("controllerchange",()=>{t||!n.dataset.armed||(t=!0,location.reload())}),n.addEventListener("click",()=>{n.dataset.armed="1"},{capture:!0}),navigator.serviceWorker.register("./sw.js").then(i=>(e(i),i.addEventListener("updatefound",()=>{let s=i.installing;s&&s.addEventListener("statechange",()=>{s.state==="installed"&&e(i)})}),i))}function Ah(n,e){let t=n.dirty?` + ${e["version.dirty"]}`:"";return`v${n.version} \xB7 ${n.date} \xB7 ${e["version.commit"]} ${n.commit}${t}`}var ag=null;function og(n){let e=null,t=null,i=null,s=0,r=null,a={};async function o(){if(e)return e;if(t)return t;if(!n.lab)throw new Error("\uC774 \uD310\uC5D0\uB294 \uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uAC00 \uC5C6\uB2E4 (manifest.lab)");return t=(async()=>{for(let h of n.lab.datasets){let d=await os(h.file),f=Fi(d,n.verification.details);if(f.errors.length)throw new Error(`${h.id}: ${f.errors.join("; ")}`);d.binary&&(d._arrays=as(await jn(d.binary.file),d.binary.arrays)),d.d24&&(d._forest=await jn(d.d24.file)),a[h.id]=d}let u=a["m3.lab"];return e=Ra(u,u._arrays,u._forest),e})(),t}function l(){if(i)return i;if(ks==="embedded"){let u=URL.createObjectURL(new Blob([ag],{type:"text/javascript"}));i=new Worker(u)}else i=new Worker("lab-worker.js");return i.onmessage=u=>{let h=u.data;if(!r||h.id!==r.id)return;if(h.type==="progress"){r.onProgress&&r.onProgress(h);return}let d=r;r=null,h.type==="done"?d.resolve({...h.result,wall_ms:performance.now()-d.t0}):d.reject(new Error(h.message))},i.onerror=u=>{if(r){let h=r;r=null,h.reject(new Error(u.message||"Worker \uC624\uB958"))}},i}function c(u,h={}){if(!e)return Promise.reject(new Error("\uBA3C\uC800 lab.load()"));let d=l();if(r){let m=r;r=null,m.reject(new Error("\uBC84\uB9BC"))}let f=++s;return new Promise((m,x)=>{r={id:f,resolve:m,reject:x,onProgress:h.onProgress,t0:performance.now()},d.postMessage({id:f,params:e.escapeParams(h),s0:Array.from(u),chunk:h.chunk,trajTol:h.trajTol,trajMax:h.trajMax})})}return{load:o,integrate:c,get loaded(){return!!e},get lab(){return e},datasets:a,predict:u=>rr(e,u),predictState:u=>zu(e,u),components:u=>Ns(e,u),stateOf:u=>Go(e,u)}}function Oo(n,e){let t={},i=null;async function s(){if(i)return i;let l=n[e];if(!l)throw new Error(`\uC774 \uD310\uC5D0\uB294 ${e} \uC790\uB8CC\uAC00 \uC5C6\uB2E4`);return i=(async()=>{for(let c of l.datasets){let u=await os(c.file),h=Fi(u,n.verification.details);if(h.errors.length)throw new Error(`${c.id}: ${h.errors.join("; ")}`);u.binary&&(u._arrays=as(await jn(u.binary.file),u.binary.arrays)),u.chunks&&(u._chunks={}),t[c.id]=u}return t})(),i}let r={};async function a(l,c){await s();let u=t[l];if(!u||!u.chunks)throw new Error(`${l}: \uC870\uAC01 \uC790\uB8CC\uAC00 \uC544\uB2C8\uB2E4`);if(u._chunks[c])return u._chunks[c];let h=l+":"+c;if(!r[h]){let d=u.chunks.find(f=>f.year===c);if(!d)throw new Error(`${l}: \uC870\uAC01 ${c} \uC5C6\uC74C`);r[h]=jn(d.file).then(f=>(u._chunks[c]=as(f,d.arrays),u._chunks[c]))}return r[h]}async function o(){await s();for(let[l,c]of Object.entries(t))if(c.chunks)for(let u of c.chunks)await a(l,u.year);return t}return{load:s,loadChunk:a,loadAllChunks:o,datasets:t,get loaded(){return Object.keys(t).length>0},available:!!n[e]}}var cS={target:"L2",dist:17e5,az:-1.25,el:.8},uS=300,Ch=900,As=2e3,dS={tag:"impl",detail:"implementation"},fu=[{id:"truth",key:"lab.col_truth",src:"m3.lab.json>integrate (core/lab/escape.js DOP853, Worker)"},{id:"T3",key:"lab.col_t3",src:"m3.lab.json>t3 (core/lab/eigen.js lnT3)"},{id:"D24",key:"lab.col_d24",src:"m3.lab.json>d24 (core/lab/forest.js predictD24)"},{id:"MLP",key:"lab.col_mlp",src:"m3.lab.json>mlp (core/lab/mlp.js predictMLP)"},{id:"HYB",key:"lab.col_hybrid",src:"m3.lab.json>d24>w_R (\uD558\uC774\uBE0C\uB9AC\uB4DC = D24, w_R \uBAA8\uB450 0)",only:["research"]},{id:"dT3",key:"lab.col_dt3",src:"core/lab \u2014 ln t_T3 \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"T3"},{id:"dD24",key:"lab.col_dd24",src:"core/lab \u2014 ln t_D24 \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"D24"},{id:"dMLP",key:"lab.col_dmlp",src:"core/lab \u2014 ln t_MLP \u2212 ln t_\uC815\uB2F5",only:["explore","research","custom"],diff:"MLP"},{id:"dir",key:"lab.col_dir",src:"core/lab \u2014 e_u* \uBD80\uD638 \uB300 \uC815\uB2F5 \uC774\uD0C8 \uBC29\uD5A5",only:["research"]}],ko=n=>{if(!Number.isFinite(n))return"\u2014";let e=Math.exp(n);return e>=100?e.toFixed(1):e>=10?e.toFixed(2):e.toFixed(3)},hS=n=>Number.isFinite(n)?(n>=0?"+":"\u2212")+Math.abs(n).toExponential(1):"\u2014",pu=n=>{if(n===0)return"0";let e=Math.floor(Math.log10(Math.abs(n)));return`${(n/10**e).toFixed(2)}e${e}`};function lg({view:n,labApi:e,layers:t,mobile:i,onOpen:s}){let r=G("aside",{id:"lab",class:"lab",hidden:!0,"data-obstacle":"","aria-live":"polite"}),a=G("button",{type:"button",id:"view-lab",i18n:"l2.view_lab"}),o={v:null,E:null,pred:null,flags:null,truth:null,outside:!1,timer:null,job:0,built:!1,example:null,lastResult:null},l=null;if(i){let b=G("div",{id:"lab-mobile",class:"lab-mobile"},G("p",{i18n:"lab.mobile_note"})),_=G("button",{type:"button",class:"close",i18n:"source.close"});return _.addEventListener("click",()=>{r.hidden=!0}),r.append(_,G("h3",{i18n:"lab.title"}),b),a.addEventListener("click",()=>{r.hidden=!1,Lt(r),s&&s()}),{panel:r,button:a,open:async()=>{r.hidden=!1,Lt(r)},state:o}}let c=G("button",{type:"button",class:"close",id:"lab-close",i18n:"source.close"}),u=G("div",{id:"lab-status",class:"lab-status","data-meta":"",i18n:"lab.loading"}),h=[],d=()=>{let b=bi(dS,n.model.table);return h.push(b),b},f=G("div",{class:"lab-scope","data-meta":""},d(),G("span",{i18n:"lab.scope"})),m=G("div",{id:"lab-examples",class:"lab-examples","data-meta":""}),x=G("div",{id:"lab-example-src",class:"lab-note","data-meta":""}),p=G("div",{id:"lab-controls",class:"lab-controls","data-meta":""}),g=G("div",{id:"lab-flags",class:"lab-flags"}),A=G("div",{id:"lab-progress",class:"lab-progress","data-meta":""}),R=G("progress",{id:"lab-bar",max:1,value:0}),v=G("span",{id:"lab-progtext"});A.append(R,v);let w=G("table",{id:"lab-table",class:"lab-table"}),M=G("div",{class:"lab-table-wrap"},w),E=G("div",{id:"lab-foot",class:"lab-note","data-meta":""}),y=G("button",{type:"button",class:"lab-fold",id:"lab-fold","aria-expanded":"true"}),T="lagrange.lab.folded",P={get(){try{return localStorage.getItem(T)==="1"}catch{return!1}},set(b){try{localStorage.setItem(T,b?"1":"0")}catch{}}};function k(b,_=!0){r.dataset.folded=b?"1":"0",y.setAttribute("aria-expanded",b?"false":"true"),y.dataset.i18n=b?"lab.unfold":"lab.fold";try{y.textContent=Me(y.dataset.i18n)}catch{}_&&P.set(b)}y.addEventListener("click",()=>k(r.dataset.folded!=="1")),k(P.get(),!1),r.append(c,y,G("h3",{i18n:"lab.title"}),f,u,m,x,p,g,A,M,E),c.addEventListener("click",()=>Ae());let U={};function z(b,_,L,O){let ee=G("input",{type:"range",id:"lab-"+b,min:String(_),max:String(L),step:String(O),"aria-label":b}),de=G("span",{class:"lab-val",id:"lab-"+b+"-val"}),ye=G("label",{class:"lab-row"},G("span",{class:"lab-name",i18n:"lab.s_"+b}),ee,de);return ee.addEventListener("input",()=>ce(b)),ee.addEventListener("change",()=>ge()),U[b]={input:ee,val:de,row:ye},ye}let F=G("button",{type:"button",id:"lab-sign-out",i18n:"lab.sign_out"}),q=G("button",{type:"button",id:"lab-sign-in",i18n:"lab.sign_in"}),K=G("input",{type:"checkbox",id:"lab-outside"}),ne=G("label",{class:"lab-outside",id:"lab-outside-row"},K,G("span",{i18n:"lab.outside"}));function oe(){let b=l.sliders,_=o.outside?b.out_factor:1;return{es:b.es_in*_,ap:b.ap_in*_,az:b.az_in*_}}function j(){let b=o.v,_=oe(),L=l.sliders;U.eu.input.value=String(Math.round((Math.log10(Math.max(b.eu,1e-300))-L.eu_log10[0])/(L.eu_log10[1]-L.eu_log10[0])*Ch)),U.es.input.value=String(Math.round(b.es/_.es*As)),U.ap.input.value=String(Math.round(b.ap/_.ap*As)),U.az.input.value=String(Math.round(b.az/_.az*As)),U.phip.input.value=String(Math.round(b.phip*180/Math.PI)),U.phiz.input.value=String(Math.round(b.phiz*180/Math.PI)),U.eu.val.textContent=`${pu(b.eu)} \u03B3`,U.es.val.textContent=`${pu(b.es)} \u03B3`,U.ap.val.textContent=`${pu(b.ap)} \u03B3`,U.az.val.textContent=`${pu(b.az)} \u03B3`,U.phip.val.textContent=`${(b.phip*180/Math.PI).toFixed(0)}\xB0`,U.phiz.val.textContent=`${(b.phiz*180/Math.PI).toFixed(0)}\xB0`,F.classList.toggle("on",b.sign>0),q.classList.toggle("on",b.sign<0)}function le(b){let _=Number(U[b].input.value),L=oe(),O=l.sliders;return b==="eu"?10**(O.eu_log10[0]+_/Ch*(O.eu_log10[1]-O.eu_log10[0])):b==="phip"||b==="phiz"?_*Math.PI/180:_/As*L[b]}function ce(b){o.example=null;let _={...o.v,[b]:le(b)};!o.outside&&b!=="phip"&&b!=="phiz"&&(_=Ma(l,_,b)),o.v=_,j(),_e(),ve()}function re(b){o.example=null,o.v={...o.v,sign:b},j(),_e(),ve(),ge()}F.addEventListener("click",()=>re(1)),q.addEventListener("click",()=>re(-1)),K.addEventListener("change",()=>xe(K.checked));function xe(b){if(o.outside=b&&t.preset==="research",K.checked=o.outside,!o.outside&&o.v&&!o.example){let _=o.v;for(let L of["eu","es","ap","az"])_=Ma(l,_,L);o.v=_}l&&(j(),_e(),ge())}function Xe(){let b=G("tr",{},G("th",{"data-meta":"",i18n:"lab.col_r"}));for(let L of fu){let O=G("th",{class:"c-"+L.id,"data-col":L.id,"data-meta":""},G("span",{i18n:L.key}));L.id!=="dir"&&O.append(d()),b.append(O)}b.append(G("th",{class:"c-flag","data-meta":"",i18n:"lab.col_flag"}));let _=G("tbody");l.R_over_gamma.forEach((L,O)=>{let ee=G("tr",{"data-k":String(O)},G("td",{"data-meta":""},`${l.labels[O]} \u03B3`));for(let de of fu){let ye=G("td",{class:"num c-"+de.id,"data-col":de.id,"data-source":de.src,"data-verification":"impl/implementation","data-browser":"1"});ee.append(ye)}ee.append(G("td",{class:"c-flag","data-col":"flag"})),_.append(ee)}),w.replaceChildren(G("thead",{},b),_)}function Ne(b,_){return w.querySelector(`tbody tr[data-k="${b}"] td[data-col="${_}"]`)}function qe(b,_,L){b.dataset.value=String(_),b.textContent=L}function H(){let b=o.pred,_=o.flags;l.R_over_gamma.forEach((L,O)=>{qe(Ne(O,"T3"),b.T3[O],ko(b.T3[O])),qe(Ne(O,"D24"),b.D24?b.D24[O]:NaN,b.D24?ko(b.D24[O]):"\u2014"),qe(Ne(O,"MLP"),b.MLP[O],ko(b.MLP[O])),qe(Ne(O,"HYB"),b.D24?b.D24[O]:NaN,b.D24?ko(b.D24[O]):"\u2014");let ee=Ne(O,"flag"),de=[];_.inRange||de.push(G("span",{class:"flag flag-extrap",i18n:"lab.flag_extrap"})),_.uncertain[O]&&de.push(G("span",{class:"flag flag-unc",i18n:"lab.flag_unc",title:Me(_.mismatch[O]?"lab.flag_unc_mismatch":"lab.flag_unc_spread")})),ee.replaceChildren(...de),ee.dataset.uncertain=_.uncertain[O]?"1":"0"}),g.replaceChildren(..._.inRange?[]:[G("span",{id:"lab-extrap",class:"flag flag-extrap",i18n:"lab.extrap_long"})]),W(),Lt(r)}function W(){let b=o.truth;l.R_over_gamma.forEach((_,L)=>{if(!b){qe(Ne(L,"truth"),NaN,"\u2026");for(let de of fu)(de.diff||de.id==="dir")&&qe(Ne(L,de.id),NaN,"\u2026");return}let O=Math.log(b.t_days[L]);qe(Ne(L,"truth"),O,Number.isFinite(O)?ko(O):Me("lab.no_escape"));for(let de of fu)if(de.diff){let ye=o.pred[de.diff],ae=ye?ye[L]-O:NaN;qe(Ne(L,de.id),ae,hS(ae))}let ee=b.dir[L]===0?null:Math.sign(o.pred.eus)===b.dir[L];qe(Ne(L,"dir"),ee===null?NaN:ee?1:0,ee===null?"\u2014":Me(ee?"lab.dir_hit":"lab.dir_miss"))})}function _e(){o.E=o.example!==null?l.examples[o.example].E.slice():jo(l,o.v),o.pred=e.predict(o.E),o.flags=ir(l,o.pred),o.truth=null,H()}function ve(){clearTimeout(o.timer),o.timer=null}function ge(){ve(),o.timer=setTimeout(Je,uS),v.textContent=Me("lab.waiting")}function Be(){let b=n.model.constants.length_unit_km,_=n.state.cam.dist,L=l.frame.gamma*l.R_over_gamma[l.R_over_gamma.length-1]*b,O=Math.max(.05,(_-L)/_);return n.kmPerPx()*O/n.renderer.getPixelRatio()/b}async function Je(){o.timer=null;let b=++o.job,_=l.escapeParams().t_max_days;R.max=_,R.value=0,v.textContent=Me("lab.integrating"),r.dataset.integrating="1";let L=Be();try{let O=await e.integrate(e.stateOf(o.E),{trajTol:L,onProgress:ee=>{b===o.job&&(R.value=ee.t_days,v.textContent=Me("lab.integrating_days",{d:ee.t_days.toFixed(0)}))}});if(b!==o.job)return;o.truth=O,o.lastResult=O,o.trajTolUsed=L,o.trajE=o.E,R.value=O.t_reached_days,v.textContent=Me("lab.done",{ms:O.wall_ms.toFixed(0),n:O.traj?O.traj.n:0}),W(),We(O),it(O),Lt(r),r.dataset.integrating="0",r.dataset.done=String(b)}catch(O){if(String(O.message)==="\uBC84\uB9BC")return;v.textContent=Me("lab.error",{msg:O.message}),r.dataset.integrating="0"}}function De(){let b=l.s_ref,_=l.frame.gamma,L=160;l.R_over_gamma.forEach((O,ee)=>{let de=new Float64Array(3*(L+1));for(let ye=0;ye<=L;ye++){let ae=2*Math.PI*ye/L;de[3*ye]=b[0]+O*_*Math.cos(ae),de[3*ye+1]=b[1]+O*_*Math.sin(ae),de[3*ye+2]=b[2]}n.addPolyline("lab_ring_"+ee,"lab",de,7109270,1,.55,{dashed:!0})})}function We(b){if(n.removeItem&&n.removeItem("lab_traj"),!b.traj||b.traj.n<2)return;let _=b.traj.points,L=l.s_ref,O=new Float64Array(_.length);for(let ye=0;ye<_.length;ye+=3)O[ye]=L[0]+_[ye],O[ye+1]=L[1]+_[ye+1],O[ye+2]=L[2]+_[ye+2];let ee=b.dir.filter(ye=>ye!==0).pop(),de=ee>0?n.COLORS.escOut:ee<0?n.COLORS.escIn:13686498;n.addPolyline("lab_traj","lab",O,de,2.2),r.dataset.trajN=String(b.traj.n),n.render()}function it(b){if(!b.traj||b.traj.n<2||r.hidden||n.state.cam.target!=="L2"||n.state.fly)return;let _=b.traj.points,L=0;for(let fe=0;fe<_.length;fe+=3)L=Math.max(L,Math.hypot(_[fe],_[fe+1],_[fe+2]));if(!(L>0))return;let O=L*n.model.constants.length_unit_km,ee=n.camera,de=ee.fov*Math.PI/360,ye=Math.atan(Math.tan(de)*ee.aspect),ae=O/Math.sin(Math.min(de,ye))*1.1;o.fitDist=ae,!(Math.abs(Math.log(ae/n.state.cam.dist))<.01)&&n.flyTo("L2",ae,.8)}let Ke=null,Ye=0,he=!1;n.onRender.push(()=>{if(!l||r.hidden||!o.lastResult||he)return;let b=n.state.cam,_=`${b.dist}|${b.target}|${n.state.fly?1:0}`,L=performance.now();if(_!==Ke){Ke=_,Ye=L;return}L-Ye<250||n.state.fly||o.timer||r.dataset.integrating==="1"||o.trajE!==o.E||!(Be()<o.trajTolUsed/1.5)||we()});async function we(){he=!0;let b=Be(),_=o.E;try{let L=await e.integrate(e.stateOf(_),{trajTol:b});if(o.E!==_||r.dataset.integrating==="1")return;o.lastResult={...o.lastResult,traj:L.traj},o.trajTolUsed=b,We(L),r.dataset.resampled=String((Number(r.dataset.resampled)||0)+1)}catch(L){String(L.message)!=="\uBC84\uB9BC"&&console.warn("\uADA4\uC801 \uB2E4\uC2DC \uBF51\uAE30 \uC2E4\uD328",L)}finally{he=!1}}function Ue(){m.replaceChildren(G("span",{class:"ctl-h",i18n:"lab.examples"})),l.examples.forEach((b,_)=>{let L=G("button",{type:"button",class:"lab-ex",id:"lab-ex-"+_,"data-ex":String(_),i18n:"lab.ex_"+b.kind});L.addEventListener("click",()=>Oe(_)),m.append(L)})}function Oe(b){let _=l.examples[b];o.example=b,o.v=Xo(l,_.E),j();for(let L of m.querySelectorAll(".lab-ex"))L.classList.toggle("on",L.dataset.ex===String(b));x.textContent=Me("lab.ex_src",{no:_.sample_no??"\u2014",src:si()==="en"?_.source_en:_.source}),_e(),ve(),Je()}function V(){let b=t.preset;r.dataset.preset=b,ne.hidden=b!=="research",b!=="research"&&o.outside&&xe(!1),E.replaceChildren(...b==="research"?[G("span",{i18n:"lab.hybrid_note"})]:[],G("span",{i18n:"lab.foot"})),Lt(E)}async function se(){if(r.hidden=!1,s&&s(),n.setCamera({...cS}),n.setLayer("lab",!0),o.built)return V(),o;if(u.hidden=!1,Lt(r),l=await e.load(),!l.uncertain||!l.sliders||l.examples.length!==5)throw new Error("\uC2E4\uD5D8\uC2E4 \uC790\uB8CC\uC5D0 uncertain\xB7sliders\xB7examples \uAC00 \uC5C6\uB2E4 (main.py web \uB2E4\uC2DC)");p.replaceChildren(G("div",{class:"lab-row lab-sign"},G("span",{class:"lab-name",i18n:"lab.s_sign"}),F,q),z("eu",0,Ch,1),z("es",-As,As,1),z("ap",0,As,1),z("phip",0,359,1),z("az",0,As,1),z("phiz",0,359,1),ne);let b=l.sliders,_=(Math.log10(b.eu_train[0])-b.eu_log10[0])/(b.eu_log10[1]-b.eu_log10[0])*100,L=(Math.log10(b.eu_train[1])-b.eu_log10[0])/(b.eu_log10[1]-b.eu_log10[0])*100;return U.eu.input.style.setProperty("--band-a",_+"%"),U.eu.input.style.setProperty("--band-b",L+"%"),U.eu.input.classList.add("banded"),Xe(),Ue(),De(),u.hidden=!0,o.built=!0,t.onChange(V),V(),Oe(l.examples.findIndex(O=>O.kind==="q50")),o}function Ae(){r.hidden=!0,ve(),n.setLayer("lab",!1)}return a.addEventListener("click",()=>{se().catch(b=>{u.hidden=!1,u.textContent=Me("lab.error",{msg:b.message})})}),{panel:r,button:a,open:se,close:Ae,state:o,rerender(){for(let b of h)b._render();if(o.example!==null&&l){let b=l.examples[o.example];x.textContent=Me("lab.ex_src",{no:b.sample_no??"\u2014",src:si()==="en"?b.source_en:b.source})}},get lab(){return l},slide(b,_,L=!0){U[b].input.value=String(_),ce(b),L&&ge()},useExample:Oe,setOutside:xe}}var fS=["sun","earth","moon","emb"];function cg(n,e=()=>{}){let t=null,i=null,s=new Set;async function r(){return await n.load(),t=n.datasets["m4.ephem"],i=pa(t,{}),c}function a(u){return i.chunkFor(u).year}function o(u){i.hasChunk(u)||s.has(u)||(s.add(u),e(!0),n.loadChunk("m4.ephem",u).then(h=>{i.hasChunk(u)||i.addChunk(u,h),s.delete(u),e(s.size>0)}).catch(h=>{s.delete(u),e(s.size>0),console.warn("\uCC9C\uCCB4\uB825 \uC870\uAC01 \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",u,h)}))}async function l(u){let h=a(u);if(!i.hasChunk(h))for(o(h);!i.hasChunk(h);)await new Promise(d=>setTimeout(d,10))}let c={init:r,ensure:l,get range(){return t.range_tdb_s},get tMin(){return t.range_tdb_s[0]},get tMax(){return t.range_tdb_s[1]},ready:u=>i.hasChunk(a(u)),loadedYears:()=>t.chunks.map(u=>u.year).filter(u=>i.hasChunk(u)),evaluate(u){let h=a(u);if(!i.hasChunk(h))return o(h),null;let d=[],f=[];for(let m of fS){let x=i.evaluate(m,u,h);d.push(x.pos),f.push(x.vel)}return{pos:d,vel:f}},solar:()=>i};return c}var Ki={startPx:160,releasePx:80,holdMs:2e3};function ug(n,e={}){let t={},i=[],s=e.mobile?"mobile":e.single?"single":null;function r(d){return s||(globalThis.__LAGRANGE_TEX2K?"test2k":d.hi?d.hiPx&&n.maxTextureSize()<Math.max(...d.hiPx)?"maxTextureSize "+n.maxTextureSize():n.qualityAllowsHiTex()?null:"quality":"no_hi")}async function a(d){let f={...d,level:null,pending:null,hiTex:null,loTex:null,px:0,belowSince:null,loads:0,releases:0,last_upload:null,steps:[],blocked:null,hiBitmap:null};t[d.id]=f,i.push(f);let m=performance.now(),x=await d.lo(),p=[x.width,x.height];return f.loTex=n.makeTexture(x,{mipmaps:d.mipmaps!==!1,wrapS:d.wrapS,colorSpace:d.colorSpace,anisotropy:d.anisotropy}),n.renderer.initTexture(f.loTex),x.close&&x.close(),d.apply(f.loTex,"2k"),f.level="2k",f.steps.push({level:"2k",ms:performance.now()-m,px:p}),f}function o(d){let f={cancelled:!1,stream:null};d.pending=f,(async()=>{let m=performance.now(),x=await d.hi();if(f.cancelled){x.close&&x.close();return}let p=performance.now()-m,g={mipmaps:d.mipmaps!==!1,wrapS:d.wrapS,anisotropy:d.anisotropy??n.renderer.capabilities.getMaxAnisotropy(),format:d.format,colorSpace:d.colorSpace};f.stream=globalThis.__LAGRANGE_TILES===!1?Tm(n.renderer,x,g):Am(n.renderer,x,{...g,nx:4,ny:2,border:8});let A=await f.stream.promise;if(x.close&&x.close(),f.cancelled){A.dispose();return}d.hiTex=A,d.pending=null,d.level="8k",d.loads++,d.apply(A,"8k");let R=f.stream.state;d.last_upload={tiled:!!A.isTiled,allocs:R.allocs?R.allocs.map(v=>Math.round(v.ms*10)/10):null,decode_ms:p,alloc_ms:R.alloc_ms??null,chunks:R.chunks.length,chunk_max_ms:Math.max(...R.chunks.map(v=>v.ms)),chunk_ms:R.chunks.map(v=>[v.level,Math.round(v.ms*10)/10,Math.round(v.at)]),blits:R.blits.length,blit_max_ms:R.blits.length?Math.max(...R.blits.map(v=>v.ms)):0,fence_waits:R.fence_waits,decode_at:[Math.round(m),Math.round(m+p)],total_ms:performance.now()-m,px:[R.w,R.h],levels:R.levels},d.steps.push({level:"8k",ms:performance.now()-m,px:[R.w,R.h]})})().catch(m=>{console.warn("8K \uADF8\uB9BC \uC62C\uB9AC\uAE30 \uC2E4\uD328",d.id,m),d.pending=null,d.blocked=String(m)})}function l(d){d.pending&&(d.pending.cancelled=!0,d.pending.stream&&d.pending.stream.cancel(),d.pending=null),d.hiTex&&(d.apply(d.loTex,"2k"),d.hiTex.dispose(),d.hiTex=null,d.releases++),d.level="2k"}function c(){let d=performance.now();for(let x of i)x.level&&(x.px=x.sphere?n.sphereScreenPx(x.sphere):1/0);let f=null,m=-1;for(let x of i)x.level&&x.body&&!r(x)&&x.px>=Ki.startPx&&x.px>m&&(f=x.body,m=x.px);if(f===null)for(let x of i)x.body&&(x.hiTex||x.pending)&&x.px>=Ki.releasePx&&x.px>m&&(f=x.body,m=x.px);for(let x of i)if(x.level){if(x.blocked=r(x),x.blocked){(x.hiTex||x.pending)&&l(x);continue}if(x.body&&f!==null&&x.body!==f){(x.hiTex||x.pending)&&l(x),x.belowSince=null;continue}x.px>=Ki.startPx?(x.belowSince=null,!x.hiTex&&!x.pending&&o(x)):x.px<Ki.releasePx&&(x.hiTex||x.pending)?x.belowSince===null?x.belowSince=d:d-x.belowSince>=Ki.holdMs&&(l(x),x.belowSince=null):x.belowSince=null}}n.onRender.push(c);function u(d,f,m=6e4){return new Promise((x,p)=>{let g=performance.now(),A=()=>{let R=t[d];R&&R.level===f&&!R.pending?x(h()[d]):performance.now()-g>m?p(new Error(`${d} ${f} \uAE30\uB2E4\uB9BC \uC2DC\uAC04 \uB118\uC74C (${R&&R.level})`)):setTimeout(A,50)};A()})}function h(){let d={};for(let f of i)d[f.id]={level:f.level,pending:!!f.pending,px:f.px,loads:f.loads,releases:f.releases,blocked:f.blocked,last_upload:f.last_upload,steps:f.steps};return d}return{add:a,tick:c,slots:t,snapshot:h,waitLevel:u,rule:Ki,hiBodies:()=>[...new Set(i.filter(d=>d.body&&(d.hiTex||d.pending)).map(d=>d.body))],gpuTextures:()=>n.renderer.info.memory.textures}}var pS=n=>typeof requestIdleCallback=="function"?requestIdleCallback(n,{timeout:120}):setTimeout(()=>n({didTimeout:!0,timeRemaining:()=>8}),16),dg=3,Cs={desktop:{day:96,night:32},mobile:{day:28,night:12},maxInflight:6,gridCols:32,gridRows:20,pCoarse:4.4,planMs:100,uploadGapMs:40};function hg(n,e,t={}){let i=n.renderer,s=i.getContext(),r=e.content,a=e.border,o=e.size,l=e.w0,c=e.h0,u=he=>he==="day"?[0,1,2,3]:[1,2,3],h=[0,1,2,3].map(he=>e.levels.day[he].grid),d=[],f=0;for(let he=0;he<=3;he++)d[he]=f,f+=h[he][1];let m=h[0][0],x=t.mobile?Cs.mobile:Cs.desktop,p=new Uint8Array(m*f*4);for(let he=3;he<p.length;he+=4)p[he]=255;let g=new $i(p,m,f,rn,Jt);g.magFilter=g.minFilter=$t,g.generateMipmaps=!1,g.needsUpdate=!0;let A=n.items.find(he=>he.name==="Earth_sphere"),R=A.obj.material.uniforms;R.pTable.value=g,R.pInfo.value.set(l,c,r,a),R.pRowOff.value.fromArray(d),R.pGridX.value.fromArray(h.map(he=>he[0])),R.pGridY.value.fromArray(h.map(he=>he[1]));let v=Math.min(8,i.capabilities.getMaxAnisotropy());R.pAniso.value=v;let w={kinds:{day:M(x.day),night:M(x.night)},uploads:0,upload_ms_max:0,upload_ms:[],alloc_ms:{},evictions:0,tiles_seen:0,plans:0,plan_ms_max:0,no_room:0,allocs:0,releases:0};function M(he){return{array:null,cap:he,pages:new Map,free:[],pending:new Set}}let E=0,y=new Map,T=0,P=0,k=0,U=null,z=null,F=0,q=!1,K=null,ne=null,oe=null,j=[],le=(()=>{try{let he=s.getExtension("WEBGL_debug_renderer_info");return he&&/swiftshader|llvmpipe|software|basic render/i.test(s.getParameter(he.UNMASKED_RENDERER_WEBGL))}catch{return!1}})();function ce(he){let we=w.kinds[he],Ue=performance.now(),Oe=new js(null,o,o,we.cap);Oe.format=rn,Oe.type=Jt,Oe.colorSpace=Bt,Oe.minFilter=On,Oe.magFilter=It,Oe.wrapS=Oe.wrapT=Rn,Oe.generateMipmaps=!1,Oe.anisotropy=v,Oe.flipY=!1,Oe.premultiplyAlpha=!1,Oe.mipmaps=Array.from({length:dg},(V,se)=>({data:null,width:o>>se,height:o>>se})),Oe.source.dataReady=!1,Oe.needsUpdate=!0,i.initTexture(Oe),we.array=Oe,we.free=Array.from({length:we.cap},(V,se)=>se),w.alloc_ms[he]=performance.now()-Ue,w.allocs++,R[he==="day"?"pDay":"pNight"].value=Oe,R.pReady.value=1}function re(he,we,Ue,Oe,V){let se=d[we]+Ue;p[(se*m+Oe)*4+(he==="day"?0:1)]=V,q=!0}let xe=(he,we,Ue,Oe)=>`${he}|${we}|${Ue}|${Oe}`;function Xe(he,we,Ue){let Oe=l>>Ue,V=c>>Ue;return[Math.min(h[Ue][1]-1,Math.max(0,Math.floor(we*V/r))),Math.min(h[Ue][0]-1,Math.max(0,Math.floor(he*Oe/r)))]}function Ne(he,we,Ue,Oe,V,se){let Ae=xe(we,Ue,Oe,V),b=he.get(Ae);(!b||se<b.score)&&he.set(Ae,{kind:we,p:Ue,r:Oe,c:V,score:se})}let qe=Math.atan2,H=Math.asin,W=Math.PI;function _e(){let he=performance.now(),we=A.orientNow,Ue=new Map,Oe=i.getDrawingBufferSize(new nt),V=n.debug.camera;if(!oe&&A.obj.visible&&we&&A.exaggeration<=1.000001){let _=V.matrixWorld.elements,L=[_[0],_[1],_[2]],O=[_[4],_[5],_[6]],ee=[-_[8],-_[9],-_[10]],de=Math.tan(V.fov*W/360),ye=V.aspect,ae=A.obj.position,fe=A.obj.scale.x,Ie=(be,ue,Te)=>[we[0][0]*be+we[1][0]*ue+we[2][0]*Te,we[0][1]*be+we[1][1]*ue+we[2][1]*Te,we[0][2]*be+we[1][2]*ue+we[2][2]*Te],je=Ie(-ae.x+V.position.x,-ae.y+V.position.y,-ae.z+V.position.z),Ce=(be,ue)=>{let Te=ee[0]+be*de*ye*L[0]+ue*de*O[0],Pe=ee[1]+be*de*ye*L[1]+ue*de*O[1],pe=ee[2]+be*de*ye*L[2]+ue*de*O[2],$e=Math.hypot(Te,Pe,pe),ze=Ie(Te/$e,Pe/$e,pe/$e),ut=je[0]*ze[0]+je[1]*ze[1]+je[2]*ze[2],ht=je[0]**2+je[1]**2+je[2]**2-fe*fe,xt=ut*ut-ht;if(xt<0)return null;let Ut=-ut-Math.sqrt(xt);if(Ut<0)return null;let fn=je[0]+Ut*ze[0],Bn=je[1]+Ut*ze[1],Xt=je[2]+Ut*ze[2];return[(qe(Bn,fn)+W)/(2*W),(W/2-H(Math.max(-1,Math.min(1,Xt/fe))))/W]},Le=2/Oe.x,Qe=2/Oe.y,st=Cs.gridCols,at=Cs.gridRows,X=be=>be>.5?be-1:be<-.5?be+1:be;for(let be=0;be<st;be++)for(let ue=0;ue<at;ue++){let Te=(be+.5)/st*2-1,Pe=(ue+.5)/at*2-1,pe=Ce(Te,Pe);if(!pe)continue;let $e=Ce(Te+Le,Pe),ze=Ce(Te,Pe+Qe);if(!$e||!ze)continue;let ut=X($e[0]-pe[0])*l,ht=($e[1]-pe[1])*c,xt=X(ze[0]-pe[0])*l,Ut=(ze[1]-pe[1])*c,fn=ut*ut+ht*ht,Bn=xt*xt+Ut*Ut,Xt=Math.log2(Math.max(Math.max(Math.sqrt(Math.max(fn,Bn))/v,Math.sqrt(Math.min(fn,Bn))),1e-6));if(Xt>=Cs.pCoarse)continue;let Ln=Te*Te+Pe*Pe;for(let vn of["day","night"]){let ti=u(vn)[0],ni=Math.max(ti,Math.min(3,Math.floor(Xt)));for(let tn=ni;tn<=3;tn++){let[ii,zn]=Xe(pe[0],pe[1],tn);Ne(Ue,vn,tn,ii,zn,Ln)}}}}y=Ue,T++,!oe&&A.obj.visible&&n.sphereScreenPx("Earth_sphere")>=Ki.releasePx&&(w.kinds.day.array?w.kinds.night.array||ce("night"):ce("day"),k=performance.now());let se=performance.now();Ue.size?k=se:se-k>Ki.holdMs&&(w.kinds.day.array||w.kinds.night.array)&&We();for(let{kind:_,p:L,r:O,c:ee}of Ue.values()){let de=w.kinds[_].pages.get(xe(_,L,O,ee));de&&(de.last=T)}let Ae=[...Ue.values()].filter(_=>!w.kinds[_.kind].pages.has(xe(_.kind,_.p,_.r,_.c))&&!w.kinds[_.kind].pending.has(xe(_.kind,_.p,_.r,_.c)));Ae.sort((_,L)=>L.p-_.p||_.score-L.score);for(let _ of Ae){if(F>=Cs.maxInflight)break;ve(_)}let b=performance.now()-he;w.plans++,w.plan_ms_max=Math.max(w.plan_ms_max,b),q&&(g.needsUpdate=!0,q=!1),ge()}function ve(he){let we=xe(he.kind,he.p,he.r,he.c);w.kinds[he.kind].pending.add(we),F++,(async()=>{let Ue=await jn(`${e.dir}/${he.kind}/${he.p}/${he.r}_${he.c}.webp`),Oe=await createImageBitmap(new Blob([Ue],{type:"image/webp"}),{imageOrientation:"from-image",premultiplyAlpha:"none",colorSpaceConversion:"none"});w.tiles_seen++,j.push({...he,k:we,bm:Oe})})().catch(Ue=>{console.warn("\uC9C0\uAD6C \uD0C0\uC77C \uC77D\uAE30 \uC2E4\uD328",we,Ue),w.kinds[he.kind].pending.delete(we)}).finally(()=>{F--,ge()})}function ge(){z===null&&(j.length||U)&&(z=pS(De))}function Be(he){let we=w.kinds[he];if(we.free.length)return we.free.pop();let Ue=null,Oe=1/0;for(let[se,Ae]of we.pages)!y.has(se)&&Ae.last<Oe&&(Oe=Ae.last,Ue=se);if(Ue===null)return-1;let V=we.pages.get(Ue);return we.pages.delete(Ue),re(V.kind,V.p,V.r,V.c,0),w.evictions++,V.layer}function Je(he,we,Ue){let Oe=w.kinds[he].array,V=performance.now(),se=i.state,Ae=i.properties.get(Oe).__webglTexture;se.bindTexture(s.TEXTURE_2D_ARRAY,Ae),s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,!1),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,s.NONE),s.pixelStorei(s.UNPACK_ROW_LENGTH,0),s.pixelStorei(s.UNPACK_IMAGE_HEIGHT,0),s.pixelStorei(s.UNPACK_SKIP_ROWS,0),s.pixelStorei(s.UNPACK_SKIP_PIXELS,0),s.pixelStorei(s.UNPACK_SKIP_IMAGES,0),s.pixelStorei(s.UNPACK_ALIGNMENT,4),s.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,we,o,o,1,s.RGBA,s.UNSIGNED_BYTE,Ue),K=K||s.createFramebuffer(),ne=ne||s.createFramebuffer(),se.bindFramebuffer(s.READ_FRAMEBUFFER,K),se.bindFramebuffer(s.DRAW_FRAMEBUFFER,ne);for(let _=1;_<dg;_++)s.framebufferTextureLayer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,Ae,_-1,we),s.framebufferTextureLayer(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,Ae,_,we),s.blitFramebuffer(0,0,o>>_-1,o>>_-1,0,0,o>>_,o>>_,s.COLOR_BUFFER_BIT,s.LINEAR);s.framebufferTextureLayer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,null,0,0),s.framebufferTextureLayer(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,null,0,0),se.bindFramebuffer(s.READ_FRAMEBUFFER,null),se.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),se.unbindTexture();let b=performance.now()-V;w.upload_ms_max=Math.max(w.upload_ms_max,b),w.upload_ms.length<400&&w.upload_ms.push(Math.round(b*100)/100),w.uploads++}function De(){if(z=null,performance.now()-E<Cs.uploadGapMs){ge();return}if(U){if(s.getSyncParameter(U,s.SYNC_STATUS)!==s.SIGNALED){ge();return}s.deleteSync(U),U=null}for(;j.length;){let he=j.shift(),we=w.kinds[he.kind];if(we.pending.delete(he.k),!y.has(he.k)||we.pages.has(he.k)){he.bm.close&&he.bm.close();continue}we.array||ce(he.kind);let Ue=Be(he.kind);if(Ue<0){w.no_room++,he.bm.close&&he.bm.close();continue}Je(he.kind,Ue,he.bm),he.bm.close&&he.bm.close(),we.pages.set(he.k,{kind:he.kind,p:he.p,r:he.r,c:he.c,layer:Ue,last:T}),re(he.kind,he.p,he.r,he.c,Ue+1),g.needsUpdate=!0,E=performance.now(),U=s.fenceSync(s.SYNC_GPU_COMMANDS_COMPLETE,0),s.flush();break}ge()}function We(){for(let he of["day","night"]){let we=w.kinds[he];we.array&&(we.array.dispose(),we.array=null),we.pages.clear(),we.free=[],R[he==="day"?"pDay":"pNight"].value=null}p.fill(0);for(let he=3;he<p.length;he+=4)p[he]=255;g.needsUpdate=!0,R.pReady.value=0,w.releases++}function it(){globalThis.__LAGRANGE_TEX2K?oe="test2k":le?oe="software":t.single?oe="single":n.qualityAllowsHiTex()?oe=null:oe="quality";let he=performance.now();he-P>=Cs.planMs&&(P=he,_e())}n.onRender.push(it);function Ke(he=12e4){return new Promise((we,Ue)=>{let Oe=performance.now(),V=()=>{let se=y,Ae=[...se.values()].some(b=>!w.kinds[b.kind].pages.has(xe(b.kind,b.p,b.r,b.c)));se.size&&!Ae&&!j.length&&!F?we(Ye()):performance.now()-Oe>he?Ue(new Error(`\uD0C0\uC77C \uAE30\uB2E4\uB9BC \uC2DC\uAC04 \uB118\uC74C: \uD544\uC694 ${se.size}, \uC62C\uB9BC ${w.uploads}`)):setTimeout(V,60)};V()})}function Ye(){let he=we=>({cap:w.kinds[we].cap,pages:w.kinds[we].pages.size,pending:w.kinds[we].pending.size});return{day:he("day"),night:he("night"),uploads:w.uploads,upload_ms_max:w.upload_ms_max,upload_ms:w.upload_ms,alloc_ms:w.alloc_ms,evictions:w.evictions,no_room:w.no_room,allocs:w.allocs,releases:w.releases,plans:w.plans,plan_ms_max:w.plan_ms_max,blocked:oe,wanted:y.size,pageKeys:{day:[...w.kinds.day.pages.keys()],night:[...w.kinds.night.pages.keys()]}}}return{tick:it,snapshot:Ye,waitIdle:Ke,table:g,st:w,desc:e}}var Rh={};async function kn(n,e={}){Rh[n]||(Rh[n]=jn(n).then(i=>new Blob([i],{type:"image/webp"})));let t=await Rh[n];return createImageBitmap(t,{imageOrientation:"from-image",premultiplyAlpha:"none",colorSpaceConversion:"none",...e})}function fg(n,e,t,i){let s=ks==="embedded",r=ug(t,{mobile:i,single:s}),a={moon:null,steps:[],gpu_bytes:0,skipped8k:i?"mobile":s?"single":null,lod:null,earthTiles:null};t.onRender.push(()=>{let l=r.slots.earth_day;l&&(a.earth=l.level);let c=r.slots.moon;if(c&&a.moon!==c.level){a.moon=c.level,c.level==="8k"&&!a.steps.some(h=>h.moon==="8k")&&a.steps.push({moon:"8k",ms:c.steps[c.steps.length-1].ms,px:c.steps[c.steps.length-1].px});let u=c.level==="8k"?(c.last_upload||{}).px||[8192,4096]:c.steps[0].px;a.gpu_bytes=u[0]*u[1]*4*4/3}});async function o(){if(!e.available)return a;let c=(await e.load())["m4.textures"];if(!c||!c.moon)return a;if(c.orient&&c._arrays){let h=Na(c);a.orient=h,t.setSphereOrient("Moon_sphere",d=>h.moon(d)),c.earth&&c.earth.earth_day&&t.setSphereOrient("Earth_sphere",d=>h.earth(d))}else t.setFaceTo("Moon_sphere","Earth");let u=await r.add({id:"moon",body:"earthmoon",sphere:"Moon_sphere",lo:()=>kn(c.moon.lo.file),hi:()=>kn(c.moon.hi.file),hiPx:c.moon.hi.size_px,apply:(h,d)=>t.setSphereMap("Moon_sphere",h,d)});if(c.earth&&c.earth.earth_day){for(let[h,d]of[["earth_day","map"],["earth_night","nightMap"]]){let f=c.earth[h];await r.add({id:h,body:"earthmoon",sphere:"Earth_sphere",lo:()=>kn(f.lo.file),hi:null,apply:(m,x)=>t.setSphereMap("Earth_sphere",m,x,d)})}if(c.earth.land){let h=await kn(c.earth.land.file),d=t.makeTexture(h,{colorSpace:Zn});t.renderer.initTexture(d),h.close&&h.close(),t.setLandMap("Earth_sphere",d)}if(c.earth.clouds){t.addEarthClouds("Earth_sphere");let h=c.earth.clouds;await r.add({id:"earth_clouds",body:"earthmoon",sphere:"Earth_sphere",lo:()=>kn(h.lo.file),hi:()=>kn(h.hi.file),hiPx:h.hi.size_px,wrapS:ps,format:$s,colorSpace:Zn,anisotropy:2,apply:(d,f)=>t.setCloudMap("Earth_sphere",d,f)})}c.earth.tiles&&!s&&(a.earthTiles=hg(t,c.earth.tiles,{mobile:i,single:s})),a.earth="2k"}if(c.planets&&c.orient){a.planets={};for(let[h,d]of Object.entries(c.planets)){let f=h+"_sphere";t.setSphereOrient(f,Fa(d.coef,c.orient.earth.eps_arcsec)),t.setSphereShape(f,d.shape.equator,d.shape.polar),await r.add({id:"planet_"+h,body:h,sphere:f,lo:()=>kn(d.lo.file),hi:d.hi?()=>kn(d.hi.file):null,hiPx:d.hi?d.hi.size_px:null,apply:(m,x)=>t.setSphereMap(f,m,x)}),a.planets[h]="2k"}if(c.saturn_ring){let h=c.saturn_ring;t.addSaturnRing("Saturn_sphere",h.inner_km/h.r_eq_km,h.outer_km/h.r_eq_km),await r.add({id:"saturn_ring",body:"Saturn",sphere:"Saturn_sphere",lo:()=>kn(h.lo.file),hi:()=>kn(h.hi.file),hiPx:h.hi.size_px,apply:(d,f)=>t.setRingMap("Saturn_sphere",d,f)})}}return a.moon="2k",a.gpu_bytes=u.steps[0].px[0]*u.steps[0].px[1]*4*4/3,a.steps.push({moon:"2k",ms:u.steps[0].ms,px:u.steps[0].px}),!a.skipped8k&&t.maxTextureSize()<c.moon.hi.size_px[0]&&(a.skipped8k="maxTextureSize "+t.maxTextureSize()),a}return{run:o,state:a,lod:r}}var pg=5e10,Rs=[[-.4,[.61,.69,1]],[0,[.79,.84,1]],[.4,[.97,.97,1]],[.6,[1,.96,.91]],[.8,[1,.91,.8]],[1.2,[1,.82,.63]],[1.6,[1,.73,.46]],[2,[1,.62,.35]]];function mS(n){if(n<=Rs[0][0])return Rs[0][1];for(let e=1;e<Rs.length;e++)if(n<=Rs[e][0]){let[t,i]=Rs[e-1],[s,r]=Rs[e],a=(n-t)/(s-t);return i.map((o,l)=>o+a*(r[l]-o))}return Rs[Rs.length-1][1]}function mg(n,e,t){let i=e._arrays,s=i.dir.data,r=i.mag.data,a=i.ci.data,o=t?e.mag_limit_mobile:e.mag_limit,l=[];for(let p=0;p<r.length;p++)r[p]<=o&&l.push(p);let c=new Float32Array(l.length*3),u=new Float32Array(l.length*3),h=new Float32Array(l.length);l.forEach((p,g)=>{for(let v=0;v<3;v++)c[3*g+v]=s[3*p+v]*pg;let A=mS(a[p]),R=Math.min(1,.35+.65*Math.max(0,(o-r[p])/(o+1.5)));u.set(A.map(v=>v*R),3*g),h[g]=Math.min(9,1.2+2.4*Math.max(0,6.5-r[p])**.8)});let d=new Wt;d.setAttribute("position",new Yt(c,3)),d.setAttribute("color",new Yt(u,3)),d.setAttribute("psize",new Yt(h,1));let f=new Nt({uniforms:{pr:{value:n.renderer.getPixelRatio()}},vertexShader:["attribute float psize; varying vec3 vC; uniform float pr;","#include <common>","#include <logdepthbuf_pars_vertex>","void main() { vC = color; vec4 mv = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mv; gl_PointSize = psize * pr;","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:["varying vec3 vC;","#include <common>","#include <logdepthbuf_pars_fragment>","void main() {","#include <logdepthbuf_fragment>","vec2 q = gl_PointCoord - 0.5; float r = length(q) * 2.0; if (r > 1.0) discard;","float a = smoothstep(1.0, 0.0, r); gl_FragColor = vec4(vC * a, a); }"].join(`
`),vertexColors:!0,transparent:!0,depthTest:!1,depthWrite:!1,blending:Ji}),m=new gs(d,f),x=n.addSky("stars","sky",m,p=>{f.uniforms.pr.value=p.renderer.getPixelRatio()});return x.count=l.length,x}function gg(n,e){let t=e.gal_to_ecl,i=new ct().set(t[0][0],t[1][0],t[2][0],t[0][1],t[1][1],t[2][1],t[0][2],t[1][2],t[2][2]),s=new Nt({uniforms:{...Qn("map"),Gt:{value:i},gain:{value:0}},vertexShader:["varying vec3 vD;","#include <common>","#include <logdepthbuf_pars_vertex>","void main() { vD = position; gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);","#include <logdepthbuf_vertex>","}"].join(`
`),fragmentShader:[Kn("map",!0),"uniform mat3 Gt; uniform float gain; varying vec3 vD;","#include <common>","#include <logdepthbuf_pars_fragment>","void main() {","#include <logdepthbuf_fragment>","vec3 g = normalize(Gt * normalize(vD));","float l = atan(g.y, g.x); float b = asin(clamp(g.z, -1.0, 1.0));","vec2 uv = vec2(0.5 - l / (2.0 * PI), 0.5 - b / PI);","gl_FragColor = vec4(map_sample(uv).rgb * gain, 1.0);","#include <colorspace_fragment>","}"].join(`
`),side:cn,depthTest:!1,depthWrite:!1}),r=new Vt(new hi(pg*1.02,96,48),s),a=n.addSky("milkyway","sky",r);return a.renderOrder=-20,r.renderOrder=-20,a.level=null,a.setTexture=(o,l)=>{o.isTiled||(o.magFilter=It),Es(s.uniforms,"map",o),s.uniforms.gain.value=n.tokens.scene.milkyWayGain??.1,a.level=l,a.px=[o.image.width,o.image.height]},a}async function Ph(n,e,t,i,s){let r=e.variants,a=r.hi.level||"4k_lossless",o=await i.add({id:"milkyway",sphere:null,mipmaps:!1,wrapS:ps,lo:()=>s(r.lo.file),hi:()=>s(r.hi.file),hiPx:r.hi.size_px,apply:(u,h)=>n.setTexture(u,h==="8k"?a:"2k")}),l=[{level:"2k",ms:o.steps[0].ms}];if(i.tick(),o.blocked)return{level:"2k",steps:l,skipped:o.blocked,hi:Promise.resolve({level:"2k",steps:l,skipped:o.blocked})};let c=i.waitLevel("milkyway","8k",6e5).then(()=>({level:n.level,steps:[...l,{level:n.level,ms:o.steps[o.steps.length-1].ms,upload:o.last_upload}]}));return{level:"2k",steps:l,hi:c}}var mu=tt;function Lh(n,e){let t=document.getElementById("error");t.textContent=Me(n,{msg:e}),t.hidden=!1}function _g(){let n=document.getElementById("version");n.textContent=Ah(mu,ka[si()]),document.title=Me("app.title")}async function gS(){let n=ig(location.search);sg(n),Wu(),Lt(),_g();let e,t={};try{e=await os("manifest.json");let z=ha(e);if(z.length){Lh("error.schema",z.join("; "));return}for(let F of e.datasets){let q=await os(F.file),K=Fi(q,e.verification.details);if(K.errors.length){Lh("error.schema",`${F.id}: ${K.errors.join("; ")}`);return}for(let ne of K.warnings)console.warn(F.id,ne);q.binary&&(q._arrays=as(await jn(q.binary.file),q.binary.arrays)),t[F.id]=q}}catch(z){Lh("error.load",z.message);return}let i=e.verification;Mf(i,()=>Ah(mu,ka[si()])),bf(t["stage4a.jwst"]&&t["stage4a.jwst"].join);let s=t["m0.tag_samples"].items.map(z=>Si(z,i,nl));document.getElementById("samples").replaceChildren(...s);let r=Oo(e,"solar"),a=Oo(e,"sky"),o=Oo(e,"m1test"),l=t["time.utc"],c={t:l._arrays.t_tdb_s.data,u:l._arrays.unix_utc_s.data},u=document.getElementById("ephem-busy"),h=null,d,f;if(r.available)h=cg(r,z=>{u&&(u.hidden=!z)}),await h.init(),d=h.tMin,f=h.tMax;else{let z=t["ephem.earth_moon"]._arrays.t.data;d=z[0],f=z[z.length-1]}let m=Math.floor(Date.now()/6e4)*60,x=c.u,p=n.layout!=="panel"&&m>=x[0]&&m<=x[x.length-1]?vi(m,c):ua(c,Date.now()/1e3),g=Math.min(Math.max(p,d),f);h&&(await h.ensure(g),await h.ensure(Math.max(d,g-30*86400)));let A=null;try{A=await os("m4.orbits.json")}catch(z){console.warn("\uACF5\uC804 \uADA4\uB3C4\uC120 \uC790\uB8CC \uC5C6\uC74C",z.message)}let R={constants:e.constants,thetaEpoch:e.scene.theta_epoch_tdb_s,thetaOffset:e.scene.theta_offset_rad,radii:e.scene.radii_km,table:i,screenEph:h,orbitShapes:A,tMin:d,tMax:f,tStart:g,openSource:nl},v=xh(),w=Lm(document.getElementById("scene"),document.getElementById("labels"),R,n);Um(w,t,R);let M=Om(w,{...t,...r.datasets},{manifest:e,openSource:nl}),E=Km(w,{initial:n.layers.initial,persist:n.layers.persist,mobile:v}),y=Xm(n,M,w,v,E);E.applyAll(),R.onPick=z=>y.pick(z),R.onZoom=z=>y.zoom(z),w.setCamera({...Ts.l2}),Lt(),M.rerender(),w.render(),Lt(),cr(()=>{_g();for(let z of s)z._render();M.rerender(),Dm(),wf(),E.rerender(),y.renameFocus&&y.renameFocus(),P&&P.rerender&&P.rerender()}),document.getElementById("lang").addEventListener("click",()=>ju(si()==="ko"?"en":"ko"));let T=og(e),P=e.lab?lg({view:w,labApi:T,layers:E,mobile:v,onOpen:()=>{if(y.reveal&&y.reveal(),y.closeInfo)y.closeInfo(!1);else{let z=document.getElementById("info");z&&(z.hidden=!0)}}}):null;P&&(M.views.append(P.button),document.body.append(P.panel),y.setLab&&y.setLab(P),Lt()),window.lagrange={core:Os,build:mu,loaderMode:ks,manifest:e,datasets:t,i18n:Xu,view:w,tokens:n,layout:y,layers:E,lab:T,labUi:P,solar:r,sky:a,m1test:o,screenEph:h,debug:{...w.debug,context:()=>lr({...t,...T.datasets,...r.datasets,...a.datasets,...o.datasets,...k.datasets})}};let k=Oo(e,"textures"),U=fg(e,k,w,v);if(window.lagrange.textures=U,window.lagrange.texGroup=k,window.lagrange.texturesDone=U.run().catch(z=>(console.warn("\uD45C\uBA74 \uADF8\uB9BC \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",z),U.state)),window.lagrange.skyDone=(async()=>{if(!a.available)return null;let z=await a.load(),F=mg(w,z["m5.stars"],v),q=gg(w,z["m5.milkyway"]);if(E.applyAll(),n.layout!=="panel"){let re=await Ph(q,z["m5.milkyway"],v,U.lod,kn);window.lagrange.skyHiDone=re.hi.then(Ne=>({stars:F.count,milkyway:Ne}));let{hi:xe,...Xe}=re;return{stars:F.count,milkyway:Xe}}let K=document.getElementById("credits"),ne=()=>{let re=E.state.stars||E.state.milkyway;K.hidden=!re,K.classList.remove("credits-compact"),K.replaceChildren(document.createTextNode(Me("sky.credits_stars")+" \xB7 "+Me("sky.credits_mw")+" "),Xn(),document.createTextNode(" \xB7 "+Me("sky.credits_moon")+" \xB7 "+Me("sky.credits_horizons"))),re&&K.getBoundingClientRect().height>1.5*parseFloat(getComputedStyle(K).lineHeight)&&(K.classList.add("credits-compact"),K.replaceChildren(document.createTextNode(Me("credits.short"))))};ne(),K.style.cursor="pointer",K.title=Me("credits.open"),K.tabIndex=0,K.setAttribute("role","button");let oe=()=>Ha(()=>il(Xn));K.addEventListener("click",oe),K.addEventListener("keydown",re=>{(re.key==="Enter"||re.key===" ")&&(re.preventDefault(),oe())}),window.addEventListener("resize",ne),document.fonts&&document.fonts.ready&&document.fonts.ready.then(ne),E.onChange(ne),cr(ne);let j=await Ph(q,z["m5.milkyway"],v,U.lod,kn);window.lagrange.skyHiDone=j.hi.then(re=>({stars:F.count,milkyway:re}));let{hi:le,...ce}=j;return{stars:F.count,milkyway:ce}})().catch(z=>(console.warn("\uD558\uB298 \uBC30\uACBD \uBD88\uB7EC\uC624\uAE30 \uC2E4\uD328",z),null)),ks==="fetch"&&!mu.dev)try{await rg(document.getElementById("update"))}catch(z){console.warn("\uC11C\uBE44\uC2A4 \uC6CC\uCEE4 \uB4F1\uB85D \uC2E4\uD328",z)}document.body.dataset.ready="1"}gS();
/*! Bundled license information:

three/build/three.core.js:
three/build/three.module.js:
  (**
   * @license
   * Copyright 2010-2026 Three.js Authors
   * SPDX-License-Identifier: MIT
   *)
*/
