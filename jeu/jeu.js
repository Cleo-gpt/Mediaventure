// Fichier généré par outils/construire.mjs — ne pas modifier à la main (modifier jeu/js/ puis relancer).
(()=>{var sn=(r,e)=>()=>(r&&(e=r(r=0)),e);var Pm=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports);function Mn(){let r=4294967295*Math.random()|0,e=4294967295*Math.random()|0,t=4294967295*Math.random()|0,n=4294967295*Math.random()|0;return(jt[255&r]+jt[r>>8&255]+jt[r>>16&255]+jt[r>>24&255]+"-"+jt[255&e]+jt[e>>8&255]+"-"+jt[e>>16&15|64]+jt[e>>24&255]+"-"+jt[63&t|128]+jt[t>>8&255]+"-"+jt[t>>16&255]+jt[t>>24&255]+jt[255&n]+jt[n>>8&255]+jt[n>>16&255]+jt[n>>24&255]).toLowerCase()}function Dt(r,e,t){return Math.max(e,Math.min(t,r))}function Jc(r,e){return(r%e+e)%e}function Zs(r,e,t){return(1-t)*r+t*e}function Fn(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return r/4294967295;case Uint16Array:return r/65535;case Uint8Array:return r/255;case Int32Array:return Math.max(r/2147483647,-1);case Int16Array:return Math.max(r/32767,-1);case Int8Array:return Math.max(r/127,-1);default:throw new Error("Invalid component type.")}}function lt(r,e){switch(e.constructor){case Float32Array:return r;case Uint32Array:return Math.round(4294967295*r);case Uint16Array:return Math.round(65535*r);case Uint8Array:return Math.round(255*r);case Int32Array:return Math.round(2147483647*r);case Int16Array:return Math.round(32767*r);case Int8Array:return Math.round(127*r);default:throw new Error("Invalid component type.")}}function hf(r){for(let e=r.length-1;e>=0;--e)if(r[e]>=65535)return!0;return!1}function ta(r){return document.createElementNS("http://www.w3.org/1999/xhtml",r)}function h0(){let r=ta("canvas");return r.style.display="block",r}function qs(r){r in Pd||(Pd[r]=!0,console.warn(r))}function ci(r){return r<.04045?.0773993808*r:Math.pow(.9478672986*r+.0521327014,2.4)}function Zr(r){return r<.0031308?12.92*r:1.055*Math.pow(r,.41666)-.055}function Bl(r){return typeof HTMLImageElement<"u"&&r instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&r instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&r instanceof ImageBitmap?$c.getDataURL(r):r.data?{data:Array.from(r.data),width:r.width,height:r.height,type:r.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}function Hl(r,e,t,n,i){for(let s=0,a=r.length-3;s<=a;s+=3){er.fromArray(r,s);let o=i.x*Math.abs(er.x)+i.y*Math.abs(er.y)+i.z*Math.abs(er.z),l=e.dot(er),c=t.dot(er),h=n.dot(er);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>o)return!1}return!0}function $l(r,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?r+6*(e-r)*t:t<.5?e:t<2/3?r+6*(e-r)*(2/3-t):r}function M0(){let r=new ArrayBuffer(4),e=new Float32Array(r),t=new Uint32Array(r),n=new Uint32Array(512),i=new Uint32Array(512);for(let l=0;l<256;++l){let c=l-127;c<-27?(n[l]=0,n[256|l]=32768,i[l]=24,i[256|l]=24):c<-14?(n[l]=1024>>-c-14,n[256|l]=1024>>-c-14|32768,i[l]=-c-1,i[256|l]=-c-1):c<=15?(n[l]=c+15<<10,n[256|l]=c+15<<10|32768,i[l]=13,i[256|l]=13):c<128?(n[l]=31744,n[256|l]=64512,i[l]=24,i[256|l]=24):(n[l]=31744,n[256|l]=64512,i[l]=13,i[256|l]=13)}let s=new Uint32Array(2048),a=new Uint32Array(64),o=new Uint32Array(64);for(let l=1;l<1024;++l){let c=l<<13,h=0;for(;!(8388608&c);)c<<=1,h-=8388608;c&=-8388609,h+=947912704,s[l]=c|h}for(let l=1024;l<2048;++l)s[l]=939524096+(l-1024<<13);for(let l=1;l<31;++l)a[l]=l<<23;a[31]=1199570944,a[32]=2147483648;for(let l=33;l<63;++l)a[l]=2147483648+(l-32<<23);a[63]=3347054592;for(let l=1;l<64;++l)l!==32&&(o[l]=1024);return{floatView:e,uint32View:t,baseTable:n,shiftTable:i,mantissaTable:s,exponentTable:a,offsetTable:o}}function eo(r,e,t,n,i,s,a,o,l,c){r.getVertexPosition(o,Za),r.getVertexPosition(l,Ka),r.getVertexPosition(c,Ja);let h=function(u,d,p,f,v,m,g,_){let x;if(x=d.side===1?f.intersectTriangle(g,m,v,!0,_):f.intersectTriangle(v,m,g,d.side===0,_),x===null)return null;Qa.copy(_),Qa.applyMatrix4(u.matrixWorld);let y=p.ray.origin.distanceTo(Qa);return y<p.near||y>p.far?null:{distance:y,point:Qa.clone(),object:u}}(r,e,t,n,Za,Ka,Ja,Yd);if(h){let u=new E;oi.getBarycoord(Yd,Za,Ka,Ja,u),i&&(h.uv=oi.getInterpolatedAttribute(i,o,l,c,u,new ie)),s&&(h.uv1=oi.getInterpolatedAttribute(s,o,l,c,u,new ie)),a&&(h.normal=oi.getInterpolatedAttribute(a,o,l,c,u,new E),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));let d={a:o,b:l,c,normal:new E,materialIndex:0};oi.getNormal(Za,Ka,Ja,d.normal),h.face=d,h.barycoord=u}return h}function ss(r){let e={};for(let t in r){e[t]={};for(let n in r[t]){let i=r[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function nn(r){let e={};for(let t=0;t<r.length;t++){let n=ss(r[t]);for(let i in n)e[i]=n[i]}return e}function df(r){let e=r.getRenderTarget();return e===null?r.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Ke.workingColorSpace}function pf(){let r=null,e=!1,t=null,n=null;function i(s,a){t(s,a),n=r.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=r.requestAnimationFrame(i),e=!0)},stop:function(){r.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){r=s}}}function w0(r){let e=new WeakMap;return{get:function(t){return t.isInterleavedBufferAttribute&&(t=t.data),e.get(t)},remove:function(t){t.isInterleavedBufferAttribute&&(t=t.data);let n=e.get(t);n&&(r.deleteBuffer(n.buffer),e.delete(t))},update:function(t,n){if(t.isInterleavedBufferAttribute&&(t=t.data),t.isGLBufferAttribute){let s=e.get(t);return void((!s||s.version<t.version)&&e.set(t,{buffer:t.buffer,type:t.type,bytesPerElement:t.elementSize,version:t.version}))}let i=e.get(t);if(i===void 0)e.set(t,function(s,a){let o=s.array,l=s.usage,c=o.byteLength,h=r.createBuffer(),u;if(r.bindBuffer(a,h),r.bufferData(a,o,l),s.onUploadCallback(),o instanceof Float32Array)u=r.FLOAT;else if(o instanceof Uint16Array)u=s.isFloat16BufferAttribute?r.HALF_FLOAT:r.UNSIGNED_SHORT;else if(o instanceof Int16Array)u=r.SHORT;else if(o instanceof Uint32Array)u=r.UNSIGNED_INT;else if(o instanceof Int32Array)u=r.INT;else if(o instanceof Int8Array)u=r.BYTE;else if(o instanceof Uint8Array)u=r.UNSIGNED_BYTE;else{if(!(o instanceof Uint8ClampedArray))throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+o);u=r.UNSIGNED_BYTE}return{buffer:h,type:u,bytesPerElement:o.BYTES_PER_ELEMENT,version:s.version,size:c}}(t,n));else if(i.version<t.version){if(i.size!==t.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");(function(s,a,o){let l=a.array,c=a.updateRanges;if(r.bindBuffer(o,s),c.length===0)r.bufferSubData(o,0,l);else{c.sort((u,d)=>u.start-d.start);let h=0;for(let u=1;u<c.length;u++){let d=c[h],p=c[u];p.start<=d.start+d.count+1?d.count=Math.max(d.count,p.start+p.count-d.start):(++h,c[h]=p)}c.length=h+1;for(let u=0,d=c.length;u<d;u++){let p=c[u];r.bufferSubData(o,p.start*l.BYTES_PER_ELEMENT,l,p.start,p.count)}a.clearUpdateRanges()}a.onUploadCallback()})(i.buffer,t,n),i.version=t.version}}}}function R0(r,e,t,n,i,s,a){let o=new he(0),l,c,h=s===!0?0:1,u=null,d=0,p=null;function f(m){let g=m.isScene===!0?m.background:null;return g&&g.isTexture&&(g=(m.backgroundBlurriness>0?t:e).get(g)),g}function v(m,g){m.getRGB(no,df(r)),n.buffers.color.setClear(no.r,no.g,no.b,g,a)}return{getClearColor:function(){return o},setClearColor:function(m,g=1){o.set(m),h=g,v(o,h)},getClearAlpha:function(){return h},setClearAlpha:function(m){h=m,v(o,h)},render:function(m){let g=!1,_=f(m);_===null?v(o,h):_&&_.isColor&&(v(_,1),g=!0);let x=r.xr.getEnvironmentBlendMode();x==="additive"?n.buffers.color.setClear(0,0,0,1,a):x==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,a),(r.autoClear||g)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),r.clear(r.autoClearColor,r.autoClearDepth,r.autoClearStencil))},addToRenderList:function(m,g){let _=f(g);_&&(_.isCubeTexture||_.mapping===il)?(c===void 0&&(c=new ce(new tt(1,1,1),new qn({name:"BackgroundCubeMaterial",uniforms:ss(Xn.backgroundCube.uniforms),vertexShader:Xn.backgroundCube.vertexShader,fragmentShader:Xn.backgroundCube.fragmentShader,side:1,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),c.geometry.deleteAttribute("uv"),c.onBeforeRender=function(x,y,S){this.matrixWorld.copyPosition(S.matrixWorld)},Object.defineProperty(c.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(c)),ir.copy(g.backgroundRotation),ir.x*=-1,ir.y*=-1,ir.z*=-1,_.isCubeTexture&&_.isRenderTargetTexture===!1&&(ir.y*=-1,ir.z*=-1),c.material.uniforms.envMap.value=_,c.material.uniforms.flipEnvMap.value=_.isCubeTexture&&_.isRenderTargetTexture===!1?-1:1,c.material.uniforms.backgroundBlurriness.value=g.backgroundBlurriness,c.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,c.material.uniforms.backgroundRotation.value.setFromMatrix4(A0.makeRotationFromEuler(ir)),c.material.toneMapped=Ke.getTransfer(_.colorSpace)!==ht,u===_&&d===_.version&&p===r.toneMapping||(c.material.needsUpdate=!0,u=_,d=_.version,p=r.toneMapping),c.layers.enableAll(),m.unshift(c,c.geometry,c.material,0,0,null)):_&&_.isTexture&&(l===void 0&&(l=new ce(new En(2,2),new qn({name:"BackgroundMaterial",uniforms:ss(Xn.background.uniforms),vertexShader:Xn.background.vertexShader,fragmentShader:Xn.background.fragmentShader,side:0,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=_,l.material.uniforms.backgroundIntensity.value=g.backgroundIntensity,l.material.toneMapped=Ke.getTransfer(_.colorSpace)!==ht,_.matrixAutoUpdate===!0&&_.updateMatrix(),l.material.uniforms.uvTransform.value.copy(_.matrix),u===_&&d===_.version&&p===r.toneMapping||(l.material.needsUpdate=!0,u=_,d=_.version,p=r.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}}}function C0(r,e){let t=r.getParameter(r.MAX_VERTEX_ATTRIBS),n={},i=c(null),s=i,a=!1;function o(g){return r.bindVertexArray(g)}function l(g){return r.deleteVertexArray(g)}function c(g){let _=[],x=[],y=[];for(let S=0;S<t;S++)_[S]=0,x[S]=0,y[S]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:_,enabledAttributes:x,attributeDivisors:y,object:g,attributes:{},index:null}}function h(){let g=s.newAttributes;for(let _=0,x=g.length;_<x;_++)g[_]=0}function u(g){d(g,0)}function d(g,_){let x=s.newAttributes,y=s.enabledAttributes,S=s.attributeDivisors;x[g]=1,y[g]===0&&(r.enableVertexAttribArray(g),y[g]=1),S[g]!==_&&(r.vertexAttribDivisor(g,_),S[g]=_)}function p(){let g=s.newAttributes,_=s.enabledAttributes;for(let x=0,y=_.length;x<y;x++)_[x]!==g[x]&&(r.disableVertexAttribArray(x),_[x]=0)}function f(g,_,x,y,S,M,b){b===!0?r.vertexAttribIPointer(g,_,x,S,M):r.vertexAttribPointer(g,_,x,y,S,M)}function v(){m(),a=!0,s!==i&&(s=i,o(s.object))}function m(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:function(g,_,x,y,S){let M=!1,b=function(T,R,O){let V=O.wireframe===!0,H=n[T.id];H===void 0&&(H={},n[T.id]=H);let X=H[R.id];X===void 0&&(X={},H[R.id]=X);let I=X[V];return I===void 0&&(I=c(r.createVertexArray()),X[V]=I),I}(y,x,_);s!==b&&(s=b,o(s.object)),M=function(T,R,O,V){let H=s.attributes,X=R.attributes,I=0,U=O.getAttributes();for(let z in U)if(U[z].location>=0){let q=H[z],Z=X[z];if(Z===void 0&&(z==="instanceMatrix"&&T.instanceMatrix&&(Z=T.instanceMatrix),z==="instanceColor"&&T.instanceColor&&(Z=T.instanceColor)),q===void 0||q.attribute!==Z||Z&&q.data!==Z.data)return!0;I++}return s.attributesNum!==I||s.index!==V}(g,y,x,S),M&&function(T,R,O,V){let H={},X=R.attributes,I=0,U=O.getAttributes();for(let z in U)if(U[z].location>=0){let q=X[z];q===void 0&&(z==="instanceMatrix"&&T.instanceMatrix&&(q=T.instanceMatrix),z==="instanceColor"&&T.instanceColor&&(q=T.instanceColor));let Z={};Z.attribute=q,q&&q.data&&(Z.data=q.data),H[z]=Z,I++}s.attributes=H,s.attributesNum=I,s.index=V}(g,y,x,S),S!==null&&e.update(S,r.ELEMENT_ARRAY_BUFFER),(M||a)&&(a=!1,function(T,R,O,V){h();let H=V.attributes,X=O.getAttributes(),I=R.defaultAttributeValues;for(let U in X){let z=X[U];if(z.location>=0){let q=H[U];if(q===void 0&&(U==="instanceMatrix"&&T.instanceMatrix&&(q=T.instanceMatrix),U==="instanceColor"&&T.instanceColor&&(q=T.instanceColor)),q!==void 0){let Z=q.normalized,ae=q.itemSize,pe=e.get(q);if(pe===void 0)continue;let Q=pe.buffer,re=pe.type,ve=pe.bytesPerElement,_e=re===r.INT||re===r.UNSIGNED_INT||q.gpuType===kh;if(q.isInterleavedBufferAttribute){let ue=q.data,P=ue.stride,C=q.offset;if(ue.isInstancedInterleavedBuffer){for(let F=0;F<z.locationSize;F++)d(z.location+F,ue.meshPerAttribute);T.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=ue.meshPerAttribute*ue.count)}else for(let F=0;F<z.locationSize;F++)u(z.location+F);r.bindBuffer(r.ARRAY_BUFFER,Q);for(let F=0;F<z.locationSize;F++)f(z.location+F,ae/z.locationSize,re,Z,P*ve,(C+ae/z.locationSize*F)*ve,_e)}else{if(q.isInstancedBufferAttribute){for(let ue=0;ue<z.locationSize;ue++)d(z.location+ue,q.meshPerAttribute);T.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ue=0;ue<z.locationSize;ue++)u(z.location+ue);r.bindBuffer(r.ARRAY_BUFFER,Q);for(let ue=0;ue<z.locationSize;ue++)f(z.location+ue,ae/z.locationSize,re,Z,ae*ve,ae/z.locationSize*ue*ve,_e)}}else if(I!==void 0){let Z=I[U];if(Z!==void 0)switch(Z.length){case 2:r.vertexAttrib2fv(z.location,Z);break;case 3:r.vertexAttrib3fv(z.location,Z);break;case 4:r.vertexAttrib4fv(z.location,Z);break;default:r.vertexAttrib1fv(z.location,Z)}}}}p()}(g,_,x,y),S!==null&&r.bindBuffer(r.ELEMENT_ARRAY_BUFFER,e.get(S).buffer))},reset:v,resetDefaultState:m,dispose:function(){v();for(let g in n){let _=n[g];for(let x in _){let y=_[x];for(let S in y)l(y[S].object),delete y[S];delete _[x]}delete n[g]}},releaseStatesOfGeometry:function(g){if(n[g.id]===void 0)return;let _=n[g.id];for(let x in _){let y=_[x];for(let S in y)l(y[S].object),delete y[S];delete _[x]}delete n[g.id]},releaseStatesOfProgram:function(g){for(let _ in n){let x=n[_];if(x[g.id]===void 0)continue;let y=x[g.id];for(let S in y)l(y[S].object),delete y[S];delete x[g.id]}},initAttributes:h,enableAttribute:u,disableUnusedAttributes:p}}function I0(r,e,t){let n;function i(s,a,o){o!==0&&(r.drawArraysInstanced(n,s,a,o),t.update(a,n,o))}this.setMode=function(s){n=s},this.render=function(s,a){r.drawArrays(n,s,a),t.update(a,n,1)},this.renderInstances=i,this.renderMultiDraw=function(s,a,o){if(o===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,s,0,a,0,o);let l=0;for(let c=0;c<o;c++)l+=a[c];t.update(l,n,1)},this.renderMultiDrawInstances=function(s,a,o,l){if(o===0)return;let c=e.get("WEBGL_multi_draw");if(c===null)for(let h=0;h<s.length;h++)i(s[h],a[h],l[h]);else{c.multiDrawArraysInstancedWEBGL(n,s,0,a,0,l,0,o);let h=0;for(let u=0;u<o;u++)h+=a[u]*l[u];t.update(h,n,1)}}}function P0(r,e,t,n){let i;function s(d){if(d==="highp"){if(r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.HIGH_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.HIGH_FLOAT).precision>0)return"highp";d="mediump"}return d==="mediump"&&r.getShaderPrecisionFormat(r.VERTEX_SHADER,r.MEDIUM_FLOAT).precision>0&&r.getShaderPrecisionFormat(r.FRAGMENT_SHADER,r.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let a=t.precision!==void 0?t.precision:"highp",o=s(a);o!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",o,"instead."),a=o);let l=t.logarithmicDepthBuffer===!0,c=t.reverseDepthBuffer===!0&&e.has("EXT_clip_control"),h=r.getParameter(r.MAX_TEXTURE_IMAGE_UNITS),u=r.getParameter(r.MAX_VERTEX_TEXTURE_IMAGE_UNITS);return{isWebGL2:!0,getMaxAnisotropy:function(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){let d=e.get("EXT_texture_filter_anisotropic");i=r.getParameter(d.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i},getMaxPrecision:s,textureFormatReadable:function(d){return d===zn||n.convert(d)===r.getParameter(r.IMPLEMENTATION_COLOR_READ_FORMAT)},textureTypeReadable:function(d){let p=d===_a&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(d!==Pi&&n.convert(d)!==r.getParameter(r.IMPLEMENTATION_COLOR_READ_TYPE)&&d!==Hn&&!p)},precision:a,logarithmicDepthBuffer:l,reverseDepthBuffer:c,maxTextures:h,maxVertexTextures:u,maxTextureSize:r.getParameter(r.MAX_TEXTURE_SIZE),maxCubemapSize:r.getParameter(r.MAX_CUBE_MAP_TEXTURE_SIZE),maxAttributes:r.getParameter(r.MAX_VERTEX_ATTRIBS),maxVertexUniforms:r.getParameter(r.MAX_VERTEX_UNIFORM_VECTORS),maxVaryings:r.getParameter(r.MAX_VARYING_VECTORS),maxFragmentUniforms:r.getParameter(r.MAX_FRAGMENT_UNIFORM_VECTORS),vertexTextures:u>0,maxSamples:r.getParameter(r.MAX_SAMPLES)}}function L0(r){let e=this,t=null,n=0,i=!1,s=!1,a=new ai,o=new Fe,l={value:null,needsUpdate:!1};function c(h,u,d,p){let f=h!==null?h.length:0,v=null;if(f!==0){if(v=l.value,p!==!0||v===null){let m=d+4*f,g=u.matrixWorldInverse;o.getNormalMatrix(g),(v===null||v.length<m)&&(v=new Float32Array(m));for(let _=0,x=d;_!==f;++_,x+=4)a.copy(h[_]).applyMatrix4(g,o),a.normal.toArray(v,x),v[x+3]=a.constant}l.value=v,l.needsUpdate=!0}return e.numPlanes=f,e.numIntersection=0,v}this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(h,u){let d=h.length!==0||u||n!==0||i;return i=u,n=h.length,d},this.beginShadows=function(){s=!0,c(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(h,u){t=c(h,u,0)},this.setState=function(h,u,d){let p=h.clippingPlanes,f=h.clipIntersection,v=h.clipShadows,m=r.get(h);if(!i||p===null||p.length===0||s&&!v)s?c(null):function(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}();else{let g=s?0:n,_=4*g,x=m.clippingState||null;l.value=x,x=c(p,u,_,d);for(let y=0;y!==_;++y)x[y]=t[y];m.clippingState=x,this.numIntersection=f?this.numPlanes:0,this.numPlanes+=g}}}function D0(r){let e=new WeakMap;function t(i,s){return s===bc?i.mapping=Jr:s===Ec&&(i.mapping=$r),i}function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping;if(s===bc||s===Ec){if(e.has(i))return t(e.get(i).texture,i.mapping);{let a=i.image;if(a&&a.height>0){let o=new nh(a.height);return o.fromEquirectangularTexture(r,i),e.set(i,o),i.addEventListener("dispose",n),t(o.texture,i.mapping)}return null}}}return i},dispose:function(){e=new WeakMap}}}function ep(r,e,t){let n=new hi(r,e,t);return n.texture.mapping=il,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function io(r,e,t,n,i){r.viewport.set(e,t,n,i),r.scissor.set(e,t,n,i)}function tp(){return new qn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:qh(),fragmentShader:`

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
		`,blending:0,depthTest:!1,depthWrite:!1})}function np(){return new qn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:qh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}function qh(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function U0(r){let e=new WeakMap,t=null;function n(i){let s=i.target;s.removeEventListener("dispose",n);let a=e.get(s);a!==void 0&&(e.delete(s),a.dispose())}return{get:function(i){if(i&&i.isTexture){let s=i.mapping,a=s===bc||s===Ec,o=s===Jr||s===$r;if(a||o){let l=e.get(i),c=l!==void 0?l.texture.pmremVersion:0;if(i.isRenderTargetTexture&&i.pmremVersion!==c)return t===null&&(t=new Do(r)),l=a?t.fromEquirectangular(i,l):t.fromCubemap(i,l),l.texture.pmremVersion=i.pmremVersion,e.set(i,l),l.texture;if(l!==void 0)return l.texture;{let h=i.image;return a&&h&&h.height>0||o&&h&&function(u){let d=0,p=6;for(let f=0;f<p;f++)u[f]!==void 0&&d++;return d===p}(h)?(t===null&&(t=new Do(r)),l=a?t.fromEquirectangular(i):t.fromCubemap(i),l.texture.pmremVersion=i.pmremVersion,e.set(i,l),i.addEventListener("dispose",n),l.texture):null}}}return i},dispose:function(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}}}function N0(r){let e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=r.getExtension("WEBGL_depth_texture")||r.getExtension("MOZ_WEBGL_depth_texture")||r.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=r.getExtension("EXT_texture_filter_anisotropic")||r.getExtension("MOZ_EXT_texture_filter_anisotropic")||r.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=r.getExtension("WEBGL_compressed_texture_s3tc")||r.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=r.getExtension("WEBGL_compressed_texture_pvrtc")||r.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=r.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){let i=t(n);return i===null&&qs("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function O0(r,e,t,n){let i={},s=new WeakMap;function a(l){let c=l.target;c.index!==null&&e.remove(c.index);for(let u in c.attributes)e.remove(c.attributes[u]);for(let u in c.morphAttributes){let d=c.morphAttributes[u];for(let p=0,f=d.length;p<f;p++)e.remove(d[p])}c.removeEventListener("dispose",a),delete i[c.id];let h=s.get(c);h&&(e.remove(h),s.delete(c)),n.releaseStatesOfGeometry(c),c.isInstancedBufferGeometry===!0&&delete c._maxInstanceCount,t.memory.geometries--}function o(l){let c=[],h=l.index,u=l.attributes.position,d=0;if(h!==null){let v=h.array;d=h.version;for(let m=0,g=v.length;m<g;m+=3){let _=v[m+0],x=v[m+1],y=v[m+2];c.push(_,x,x,y,y,_)}}else{if(u===void 0)return;{let v=u.array;d=u.version;for(let m=0,g=v.length/3-1;m<g;m+=3){let _=m+0,x=m+1,y=m+2;c.push(_,x,x,y,y,_)}}}let p=new(hf(c)?Po:Io)(c,1);p.version=d;let f=s.get(l);f&&e.remove(f),s.set(l,p)}return{get:function(l,c){return i[c.id]===!0||(c.addEventListener("dispose",a),i[c.id]=!0,t.memory.geometries++),c},update:function(l){let c=l.attributes;for(let u in c)e.update(c[u],r.ARRAY_BUFFER);let h=l.morphAttributes;for(let u in h){let d=h[u];for(let p=0,f=d.length;p<f;p++)e.update(d[p],r.ARRAY_BUFFER)}},getWireframeAttribute:function(l){let c=s.get(l);if(c){let h=l.index;h!==null&&c.version<h.version&&o(l)}else o(l);return s.get(l)}}}function B0(r,e,t){let n,i,s;function a(o,l,c){c!==0&&(r.drawElementsInstanced(n,l,i,o*s,c),t.update(l,n,c))}this.setMode=function(o){n=o},this.setIndex=function(o){i=o.type,s=o.bytesPerElement},this.render=function(o,l){r.drawElements(n,l,i,o*s),t.update(l,n,1)},this.renderInstances=a,this.renderMultiDraw=function(o,l,c){if(c===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,l,0,i,o,0,c);let h=0;for(let u=0;u<c;u++)h+=l[u];t.update(h,n,1)},this.renderMultiDrawInstances=function(o,l,c,h){if(c===0)return;let u=e.get("WEBGL_multi_draw");if(u===null)for(let d=0;d<o.length;d++)a(o[d]/s,l[d],h[d]);else{u.multiDrawElementsInstancedWEBGL(n,l,0,i,o,0,h,0,c);let d=0;for(let p=0;p<c;p++)d+=l[p]*h[p];t.update(d,n,1)}}}function F0(r){let e={frame:0,calls:0,triangles:0,points:0,lines:0};return{memory:{geometries:0,textures:0},render:e,programs:null,autoReset:!0,reset:function(){e.calls=0,e.triangles=0,e.points=0,e.lines=0},update:function(t,n,i){switch(e.calls++,n){case r.TRIANGLES:e.triangles+=i*(t/3);break;case r.LINES:e.lines+=i*(t/2);break;case r.LINE_STRIP:e.lines+=i*(t-1);break;case r.LINE_LOOP:e.lines+=i*t;break;case r.POINTS:e.points+=i*t;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",n)}}}}function H0(r,e,t){let n=new WeakMap,i=new rt;return{update:function(s,a,o){let l=s.morphTargetInfluences,c=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,h=c!==void 0?c.length:0,u=n.get(a);if(u===void 0||u.count!==h){let T=function(){M.dispose(),n.delete(a),a.removeEventListener("dispose",T)};u!==void 0&&u.texture.dispose();let d=a.morphAttributes.position!==void 0,p=a.morphAttributes.normal!==void 0,f=a.morphAttributes.color!==void 0,v=a.morphAttributes.position||[],m=a.morphAttributes.normal||[],g=a.morphAttributes.color||[],_=0;d===!0&&(_=1),p===!0&&(_=2),f===!0&&(_=3);let x=a.attributes.position.count*_,y=1;x>e.maxTextureSize&&(y=Math.ceil(x/e.maxTextureSize),x=e.maxTextureSize);let S=new Float32Array(x*y*4*h),M=new Co(S,x,y,h);M.type=Hn,M.needsUpdate=!0;let b=4*_;for(let R=0;R<h;R++){let O=v[R],V=m[R],H=g[R],X=x*y*4*R;for(let I=0;I<O.count;I++){let U=I*b;d===!0&&(i.fromBufferAttribute(O,I),S[X+U+0]=i.x,S[X+U+1]=i.y,S[X+U+2]=i.z,S[X+U+3]=0),p===!0&&(i.fromBufferAttribute(V,I),S[X+U+4]=i.x,S[X+U+5]=i.y,S[X+U+6]=i.z,S[X+U+7]=0),f===!0&&(i.fromBufferAttribute(H,I),S[X+U+8]=i.x,S[X+U+9]=i.y,S[X+U+10]=i.z,S[X+U+11]=H.itemSize===4?i.w:1)}}u={count:h,texture:M,size:new ie(x,y)},n.set(a,u),a.addEventListener("dispose",T)}if(s.isInstancedMesh===!0&&s.morphTexture!==null)o.getUniforms().setValue(r,"morphTexture",s.morphTexture,t);else{let d=0;for(let f=0;f<l.length;f++)d+=l[f];let p=a.morphTargetsRelative?1:1-d;o.getUniforms().setValue(r,"morphTargetBaseInfluence",p),o.getUniforms().setValue(r,"morphTargetInfluences",l)}o.getUniforms().setValue(r,"morphTargetsTexture",u.texture,t),o.getUniforms().setValue(r,"morphTargetsTextureSize",u.size)}}}function z0(r,e,t,n){let i=new WeakMap;function s(a){let o=a.target;o.removeEventListener("dispose",s),t.remove(o.instanceMatrix),o.instanceColor!==null&&t.remove(o.instanceColor)}return{update:function(a){let o=n.render.frame,l=a.geometry,c=e.get(a,l);if(i.get(c)!==o&&(e.update(c),i.set(c,o)),a.isInstancedMesh&&(a.hasEventListener("dispose",s)===!1&&a.addEventListener("dispose",s),i.get(a)!==o&&(t.update(a.instanceMatrix,r.ARRAY_BUFFER),a.instanceColor!==null&&t.update(a.instanceColor,r.ARRAY_BUFFER),i.set(a,o))),a.isSkinnedMesh){let h=a.skeleton;i.get(h)!==o&&(h.update(),i.set(h,o))}return c},dispose:function(){i=new WeakMap}}}function vs(r,e,t){let n=r[0];if(n<=0||n>0)return r;let i=e*t,s=rp[i];if(s===void 0&&(s=new Float32Array(i),rp[i]=s),e!==0){n.toArray(s,0);for(let a=1,o=0;a!==e;++a)o+=t,r[a].toArray(s,o)}return s}function Nt(r,e){if(r.length!==e.length)return!1;for(let t=0,n=r.length;t<n;t++)if(r[t]!==e[t])return!1;return!0}function Ot(r,e){for(let t=0,n=e.length;t<n;t++)r[t]=e[t]}function al(r,e){let t=sp[e];t===void 0&&(t=new Int32Array(e),sp[e]=t);for(let n=0;n!==e;++n)t[n]=r.allocateTextureUnit();return t}function k0(r,e){let t=this.cache;t[0]!==e&&(r.uniform1f(this.addr,e),t[0]=e)}function G0(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;r.uniform2fv(this.addr,e),Ot(t,e)}}function V0(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)t[0]===e.r&&t[1]===e.g&&t[2]===e.b||(r.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Nt(t,e))return;r.uniform3fv(this.addr,e),Ot(t,e)}}function W0(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;r.uniform4fv(this.addr,e),Ot(t,e)}}function j0(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;r.uniformMatrix2fv(this.addr,!1,e),Ot(t,e)}else{if(Nt(t,n))return;lp.set(n),r.uniformMatrix2fv(this.addr,!1,lp),Ot(t,n)}}function X0(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;r.uniformMatrix3fv(this.addr,!1,e),Ot(t,e)}else{if(Nt(t,n))return;op.set(n),r.uniformMatrix3fv(this.addr,!1,op),Ot(t,n)}}function q0(r,e){let t=this.cache,n=e.elements;if(n===void 0){if(Nt(t,e))return;r.uniformMatrix4fv(this.addr,!1,e),Ot(t,e)}else{if(Nt(t,n))return;ap.set(n),r.uniformMatrix4fv(this.addr,!1,ap),Ot(t,n)}}function Y0(r,e){let t=this.cache;t[0]!==e&&(r.uniform1i(this.addr,e),t[0]=e)}function Z0(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;r.uniform2iv(this.addr,e),Ot(t,e)}}function K0(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;r.uniform3iv(this.addr,e),Ot(t,e)}}function J0(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;r.uniform4iv(this.addr,e),Ot(t,e)}}function $0(r,e){let t=this.cache;t[0]!==e&&(r.uniform1ui(this.addr,e),t[0]=e)}function Q0(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y||(r.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Nt(t,e))return;r.uniform2uiv(this.addr,e),Ot(t,e)}}function eg(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z||(r.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Nt(t,e))return;r.uniform3uiv(this.addr,e),Ot(t,e)}}function tg(r,e){let t=this.cache;if(e.x!==void 0)t[0]===e.x&&t[1]===e.y&&t[2]===e.z&&t[3]===e.w||(r.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Nt(t,e))return;r.uniform4uiv(this.addr,e),Ot(t,e)}}function ng(r,e,t){let n=this.cache,i=t.allocateTextureUnit(),s;n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),this.type===r.SAMPLER_2D_SHADOW?(ip.compareFunction=515,s=ip):s=ff,t.setTexture2D(e||s,i)}function ig(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||gf,i)}function rg(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||vf,i)}function sg(r,e,t){let n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(r.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||mf,i)}function ag(r,e){r.uniform1fv(this.addr,e)}function og(r,e){let t=vs(e,this.size,2);r.uniform2fv(this.addr,t)}function lg(r,e){let t=vs(e,this.size,3);r.uniform3fv(this.addr,t)}function cg(r,e){let t=vs(e,this.size,4);r.uniform4fv(this.addr,t)}function hg(r,e){let t=vs(e,this.size,4);r.uniformMatrix2fv(this.addr,!1,t)}function ug(r,e){let t=vs(e,this.size,9);r.uniformMatrix3fv(this.addr,!1,t)}function dg(r,e){let t=vs(e,this.size,16);r.uniformMatrix4fv(this.addr,!1,t)}function pg(r,e){r.uniform1iv(this.addr,e)}function fg(r,e){r.uniform2iv(this.addr,e)}function mg(r,e){r.uniform3iv(this.addr,e)}function gg(r,e){r.uniform4iv(this.addr,e)}function vg(r,e){r.uniform1uiv(this.addr,e)}function _g(r,e){r.uniform2uiv(this.addr,e)}function xg(r,e){r.uniform3uiv(this.addr,e)}function yg(r,e){r.uniform4uiv(this.addr,e)}function Mg(r,e,t){let n=this.cache,i=e.length,s=al(t,i);Nt(n,s)||(r.uniform1iv(this.addr,s),Ot(n,s));for(let a=0;a!==i;++a)t.setTexture2D(e[a]||ff,s[a])}function bg(r,e,t){let n=this.cache,i=e.length,s=al(t,i);Nt(n,s)||(r.uniform1iv(this.addr,s),Ot(n,s));for(let a=0;a!==i;++a)t.setTexture3D(e[a]||gf,s[a])}function Eg(r,e,t){let n=this.cache,i=e.length,s=al(t,i);Nt(n,s)||(r.uniform1iv(this.addr,s),Ot(n,s));for(let a=0;a!==i;++a)t.setTextureCube(e[a]||vf,s[a])}function Sg(r,e,t){let n=this.cache,i=e.length,s=al(t,i);Nt(n,s)||(r.uniform1iv(this.addr,s),Ot(n,s));for(let a=0;a!==i;++a)t.setTexture2DArray(e[a]||mf,s[a])}function cp(r,e){r.seq.push(e),r.map[e.id]=e}function Tg(r,e,t){let n=r.name,i=n.length;for(oc.lastIndex=0;;){let s=oc.exec(n),a=oc.lastIndex,o=s[1],l=s[2]==="]",c=s[3];if(l&&(o|=0),c===void 0||c==="["&&a+2===i){cp(t,c===void 0?new ih(o,r,e):new rh(o,r,e));break}{let h=t.map[o];h===void 0&&(h=new sh(o),cp(t,h)),t=h}}}function hp(r,e,t){let n=r.createShader(e);return r.shaderSource(n,t),r.compileShader(n),n}function dp(r,e,t){let n=r.getShaderParameter(e,r.COMPILE_STATUS),i=r.getShaderInfoLog(e).trim();if(n&&i==="")return"";let s=/ERROR: 0:(\d+)/.exec(i);if(s){let a=parseInt(s[1]);return t.toUpperCase()+`

`+i+`

`+function(o,l){let c=o.split(`
`),h=[],u=Math.max(l-6,0),d=Math.min(l+6,c.length);for(let p=u;p<d;p++){let f=p+1;h.push(`${f===l?">":" "} ${f}: ${c[p]}`)}return h.join(`
`)}(r.getShaderSource(e),a)}return i}function Ag(r,e){let t=function(n){Ke._getMatrix(up,Ke.workingColorSpace,n);let i=`mat3( ${up.elements.map(s=>s.toFixed(4))} )`;switch(Ke.getTransfer(n)){case sl:return[i,"LinearTransferOETF"];case ht:return[i,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[i,"LinearTransferOETF"]}}(e);return[`vec4 ${r}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Rg(r,e){let t;switch(e){case 1:t="Linear";break;case 2:t="Reinhard";break;case 3:t="Cineon";break;case 4:t="ACESFilmic";break;case 6:t="AgX";break;case 7:t="Neutral";break;case 5:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+r+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}function Cg(){return Ke.getLuminanceCoefficients(ro),["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${ro.x.toFixed(4)}, ${ro.y.toFixed(4)}, ${ro.z.toFixed(4)} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Hs(r){return r!==""}function pp(r,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return r.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function fp(r,e){return r.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}function ah(r){return r.replace(Ig,Lg)}function Lg(r,e){let t=Ge[e];if(t===void 0){let n=Pg.get(e);if(n===void 0)throw new Error("Can not resolve #include <"+e+">");t=Ge[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n)}return ah(t)}function mp(r){return r.replace(Dg,Ug)}function Ug(r,e,t,n){let i="";for(let s=parseInt(e);s<parseInt(t);s++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return i}function gp(r){let e=`precision ${r.precision} float;
	precision ${r.precision} int;
	precision ${r.precision} sampler2D;
	precision ${r.precision} samplerCube;
	precision ${r.precision} sampler3D;
	precision ${r.precision} sampler2DArray;
	precision ${r.precision} sampler2DShadow;
	precision ${r.precision} samplerCubeShadow;
	precision ${r.precision} sampler2DArrayShadow;
	precision ${r.precision} isampler2D;
	precision ${r.precision} isampler3D;
	precision ${r.precision} isamplerCube;
	precision ${r.precision} isampler2DArray;
	precision ${r.precision} usampler2D;
	precision ${r.precision} usampler3D;
	precision ${r.precision} usamplerCube;
	precision ${r.precision} usampler2DArray;
	`;return r.precision==="highp"?e+=`
#define HIGH_PRECISION`:r.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:r.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function Ng(r,e,t,n){let i=r.getContext(),s=t.defines,a=t.vertexShader,o=t.fragmentShader,l=function(V){let H="SHADOWMAP_TYPE_BASIC";return V.shadowMapType===1?H="SHADOWMAP_TYPE_PCF":V.shadowMapType===2?H="SHADOWMAP_TYPE_PCF_SOFT":V.shadowMapType===3&&(H="SHADOWMAP_TYPE_VSM"),H}(t),c=function(V){let H="ENVMAP_TYPE_CUBE";if(V.envMap)switch(V.envMapMode){case Jr:case $r:H="ENVMAP_TYPE_CUBE";break;case il:H="ENVMAP_TYPE_CUBE_UV"}return H}(t),h=function(V){let H="ENVMAP_MODE_REFLECTION";return V.envMap&&V.envMapMode===$r&&(H="ENVMAP_MODE_REFRACTION"),H}(t),u=function(V){let H="ENVMAP_BLENDING_NONE";if(V.envMap)switch(V.combine){case 0:H="ENVMAP_BLENDING_MULTIPLY";break;case 1:H="ENVMAP_BLENDING_MIX";break;case 2:H="ENVMAP_BLENDING_ADD"}return H}(t),d=function(V){let H=V.envMapCubeUVHeight;if(H===null)return null;let X=Math.log2(H)-2,I=1/H;return{texelWidth:1/(3*Math.max(Math.pow(2,X),112)),texelHeight:I,maxMip:X}}(t),p=function(V){return[V.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",V.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Hs).join(`
`)}(t),f=function(V){let H=[];for(let X in V){let I=V[X];I!==!1&&H.push("#define "+X+" "+I)}return H.join(`
`)}(s),v=i.createProgram(),m,g,_=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Hs).join(`
`),m.length>0&&(m+=`
`),g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f].filter(Hs).join(`
`),g.length>0&&(g+=`
`)):(m=[gp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Hs).join(`
`),g=[gp(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,f,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reverseDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==0?"#define TONE_MAPPING":"",t.toneMapping!==0?Ge.tonemapping_pars_fragment:"",t.toneMapping!==0?Rg("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",Ge.colorspace_pars_fragment,Ag("linearToOutputTexel",t.outputColorSpace),Cg(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Hs).join(`
`)),a=ah(a),a=pp(a,t),a=fp(a,t),o=ah(o),o=pp(o,t),o=fp(o,t),a=mp(a),o=mp(o),t.isRawShaderMaterial!==!0&&(_=`#version 300 es
`,m=[p,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,g=["#define varying in",t.glslVersion===Cd?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Cd?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+g);let x=_+m+a,y=_+g+o,S=hp(i,i.VERTEX_SHADER,x),M=hp(i,i.FRAGMENT_SHADER,y);function b(V){if(r.debug.checkShaderErrors){let H=i.getProgramInfoLog(v).trim(),X=i.getShaderInfoLog(S).trim(),I=i.getShaderInfoLog(M).trim(),U=!0,z=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(U=!1,typeof r.debug.onShaderError=="function")r.debug.onShaderError(i,v,S,M);else{let q=dp(i,S,"vertex"),Z=dp(i,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+V.name+`
Material Type: `+V.type+`

Program Info Log: `+H+`
`+q+`
`+Z)}else H!==""?console.warn("THREE.WebGLProgram: Program Info Log:",H):X!==""&&I!==""||(z=!1);z&&(V.diagnostics={runnable:U,programLog:H,vertexShader:{log:X,prefix:m},fragmentShader:{log:I,prefix:g}})}i.deleteShader(S),i.deleteShader(M),T=new Kr(i,v),R=function(H,X){let I={},U=H.getProgramParameter(X,H.ACTIVE_ATTRIBUTES);for(let z=0;z<U;z++){let q=H.getActiveAttrib(X,z),Z=q.name,ae=1;q.type===H.FLOAT_MAT2&&(ae=2),q.type===H.FLOAT_MAT3&&(ae=3),q.type===H.FLOAT_MAT4&&(ae=4),I[Z]={type:q.type,location:H.getAttribLocation(X,Z),locationSize:ae}}return I}(i,v)}let T,R;i.attachShader(v,S),i.attachShader(v,M),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v),this.getUniforms=function(){return T===void 0&&b(this),T},this.getAttributes=function(){return R===void 0&&b(this),R};let O=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=i.getProgramParameter(v,37297)),O},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=wg++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=S,this.fragmentShader=M,this}function Bg(r,e,t,n,i,s,a){let o=new na,l=new oh,c=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures,p=i.precision,f={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(m){return c.add(m),m===0?"uv":`uv${m}`}return{getParameters:function(m,g,_,x,y){let S=x.fog,M=y.geometry,b=m.isMeshStandardMaterial?x.environment:null,T=(m.isMeshStandardMaterial?t:e).get(m.envMap||b),R=T&&T.mapping===il?T.image.height:null,O=f[m.type];m.precision!==null&&(p=i.getMaxPrecision(m.precision),p!==m.precision&&console.warn("THREE.WebGLProgram.getParameters:",m.precision,"not supported, using",p,"instead."));let V=M.morphAttributes.position||M.morphAttributes.normal||M.morphAttributes.color,H=V!==void 0?V.length:0,X,I,U,z,q=0;if(M.morphAttributes.position!==void 0&&(q=1),M.morphAttributes.normal!==void 0&&(q=2),M.morphAttributes.color!==void 0&&(q=3),O){let Ps=Xn[O];X=Ps.vertexShader,I=Ps.fragmentShader}else X=m.vertexShader,I=m.fragmentShader,l.update(m),U=l.getVertexShaderID(m),z=l.getFragmentShaderID(m);let Z=r.getRenderTarget(),ae=r.state.buffers.depth.getReversed(),pe=y.isInstancedMesh===!0,Q=y.isBatchedMesh===!0,re=!!m.map,ve=!!m.matcap,_e=!!T,ue=!!m.aoMap,P=!!m.lightMap,C=!!m.bumpMap,F=!!m.normalMap,B=!!m.displacementMap,L=!!m.emissiveMap,N=!!m.metalnessMap,w=!!m.roughnessMap,D=m.anisotropy>0,G=m.clearcoat>0,te=m.dispersion>0,k=m.iridescence>0,$=m.sheen>0,J=m.transmission>0,ne=D&&!!m.anisotropyMap,fe=G&&!!m.clearcoatMap,de=G&&!!m.clearcoatNormalMap,be=G&&!!m.clearcoatRoughnessMap,De=k&&!!m.iridescenceMap,et=k&&!!m.iridescenceThicknessMap,je=$&&!!m.sheenColorMap,Ee=$&&!!m.sheenRoughnessMap,it=!!m.specularMap,pt=!!m.specularColorMap,bt=!!m.specularIntensityMap,xe=J&&!!m.transmissionMap,Ye=J&&!!m.thicknessMap,ut=!!m.gradientMap,Tr=!!m.alphaMap,Oa=m.alphaTest>0,Pn=!!m.alphaHash,Wn=!!m.extensions,Zi=0;m.toneMapped&&(Z!==null&&Z.isXRRenderTarget!==!0||(Zi=r.toneMapping));let W={shaderID:O,shaderType:m.type,shaderName:m.name,vertexShader:X,fragmentShader:I,defines:m.defines,customVertexShaderID:U,customFragmentShaderID:z,isRawShaderMaterial:m.isRawShaderMaterial===!0,glslVersion:m.glslVersion,precision:p,batching:Q,batchingColor:Q&&y._colorsTexture!==null,instancing:pe,instancingColor:pe&&y.instanceColor!==null,instancingMorph:pe&&y.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:Z===null?r.outputColorSpace:Z.isXRRenderTarget===!0?Z.texture.colorSpace:Zt,alphaToCoverage:!!m.alphaToCoverage,map:re,matcap:ve,envMap:_e,envMapMode:_e&&T.mapping,envMapCubeUVHeight:R,aoMap:ue,lightMap:P,bumpMap:C,normalMap:F,displacementMap:d&&B,emissiveMap:L,normalMapObjectSpace:F&&m.normalMapType===1,normalMapTangentSpace:F&&m.normalMapType===0,metalnessMap:N,roughnessMap:w,anisotropy:D,anisotropyMap:ne,clearcoat:G,clearcoatMap:fe,clearcoatNormalMap:de,clearcoatRoughnessMap:be,dispersion:te,iridescence:k,iridescenceMap:De,iridescenceThicknessMap:et,sheen:$,sheenColorMap:je,sheenRoughnessMap:Ee,specularMap:it,specularColorMap:pt,specularIntensityMap:bt,transmission:J,transmissionMap:xe,thicknessMap:Ye,gradientMap:ut,opaque:m.transparent===!1&&m.blending===1&&m.alphaToCoverage===!1,alphaMap:Tr,alphaTest:Oa,alphaHash:Pn,combine:m.combine,mapUv:re&&v(m.map.channel),aoMapUv:ue&&v(m.aoMap.channel),lightMapUv:P&&v(m.lightMap.channel),bumpMapUv:C&&v(m.bumpMap.channel),normalMapUv:F&&v(m.normalMap.channel),displacementMapUv:B&&v(m.displacementMap.channel),emissiveMapUv:L&&v(m.emissiveMap.channel),metalnessMapUv:N&&v(m.metalnessMap.channel),roughnessMapUv:w&&v(m.roughnessMap.channel),anisotropyMapUv:ne&&v(m.anisotropyMap.channel),clearcoatMapUv:fe&&v(m.clearcoatMap.channel),clearcoatNormalMapUv:de&&v(m.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:be&&v(m.clearcoatRoughnessMap.channel),iridescenceMapUv:De&&v(m.iridescenceMap.channel),iridescenceThicknessMapUv:et&&v(m.iridescenceThicknessMap.channel),sheenColorMapUv:je&&v(m.sheenColorMap.channel),sheenRoughnessMapUv:Ee&&v(m.sheenRoughnessMap.channel),specularMapUv:it&&v(m.specularMap.channel),specularColorMapUv:pt&&v(m.specularColorMap.channel),specularIntensityMapUv:bt&&v(m.specularIntensityMap.channel),transmissionMapUv:xe&&v(m.transmissionMap.channel),thicknessMapUv:Ye&&v(m.thicknessMap.channel),alphaMapUv:Tr&&v(m.alphaMap.channel),vertexTangents:!!M.attributes.tangent&&(F||D),vertexColors:m.vertexColors,vertexAlphas:m.vertexColors===!0&&!!M.attributes.color&&M.attributes.color.itemSize===4,pointsUvs:y.isPoints===!0&&!!M.attributes.uv&&(re||Tr),fog:!!S,useFog:m.fog===!0,fogExp2:!!S&&S.isFogExp2,flatShading:m.flatShading===!0,sizeAttenuation:m.sizeAttenuation===!0,logarithmicDepthBuffer:u,reverseDepthBuffer:ae,skinning:y.isSkinnedMesh===!0,morphTargets:M.morphAttributes.position!==void 0,morphNormals:M.morphAttributes.normal!==void 0,morphColors:M.morphAttributes.color!==void 0,morphTargetsCount:H,morphTextureStride:q,numDirLights:g.directional.length,numPointLights:g.point.length,numSpotLights:g.spot.length,numSpotLightMaps:g.spotLightMap.length,numRectAreaLights:g.rectArea.length,numHemiLights:g.hemi.length,numDirLightShadows:g.directionalShadowMap.length,numPointLightShadows:g.pointShadowMap.length,numSpotLightShadows:g.spotShadowMap.length,numSpotLightShadowsWithMaps:g.numSpotLightShadowsWithMaps,numLightProbes:g.numLightProbes,numClippingPlanes:a.numPlanes,numClipIntersection:a.numIntersection,dithering:m.dithering,shadowMapEnabled:r.shadowMap.enabled&&_.length>0,shadowMapType:r.shadowMap.type,toneMapping:Zi,decodeVideoTexture:re&&m.map.isVideoTexture===!0&&Ke.getTransfer(m.map.colorSpace)===ht,decodeVideoTextureEmissive:L&&m.emissiveMap.isVideoTexture===!0&&Ke.getTransfer(m.emissiveMap.colorSpace)===ht,premultipliedAlpha:m.premultipliedAlpha,doubleSided:m.side===2,flipSided:m.side===1,useDepthPacking:m.depthPacking>=0,depthPacking:m.depthPacking||0,index0AttributeName:m.index0AttributeName,extensionClipCullDistance:Wn&&m.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Wn&&m.extensions.multiDraw===!0||Q)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:m.customProgramCacheKey()};return W.vertexUv1s=c.has(1),W.vertexUv2s=c.has(2),W.vertexUv3s=c.has(3),c.clear(),W},getProgramCacheKey:function(m){let g=[];if(m.shaderID?g.push(m.shaderID):(g.push(m.customVertexShaderID),g.push(m.customFragmentShaderID)),m.defines!==void 0)for(let _ in m.defines)g.push(_),g.push(m.defines[_]);return m.isRawShaderMaterial===!1&&(function(_,x){_.push(x.precision),_.push(x.outputColorSpace),_.push(x.envMapMode),_.push(x.envMapCubeUVHeight),_.push(x.mapUv),_.push(x.alphaMapUv),_.push(x.lightMapUv),_.push(x.aoMapUv),_.push(x.bumpMapUv),_.push(x.normalMapUv),_.push(x.displacementMapUv),_.push(x.emissiveMapUv),_.push(x.metalnessMapUv),_.push(x.roughnessMapUv),_.push(x.anisotropyMapUv),_.push(x.clearcoatMapUv),_.push(x.clearcoatNormalMapUv),_.push(x.clearcoatRoughnessMapUv),_.push(x.iridescenceMapUv),_.push(x.iridescenceThicknessMapUv),_.push(x.sheenColorMapUv),_.push(x.sheenRoughnessMapUv),_.push(x.specularMapUv),_.push(x.specularColorMapUv),_.push(x.specularIntensityMapUv),_.push(x.transmissionMapUv),_.push(x.thicknessMapUv),_.push(x.combine),_.push(x.fogExp2),_.push(x.sizeAttenuation),_.push(x.morphTargetsCount),_.push(x.morphAttributeCount),_.push(x.numDirLights),_.push(x.numPointLights),_.push(x.numSpotLights),_.push(x.numSpotLightMaps),_.push(x.numHemiLights),_.push(x.numRectAreaLights),_.push(x.numDirLightShadows),_.push(x.numPointLightShadows),_.push(x.numSpotLightShadows),_.push(x.numSpotLightShadowsWithMaps),_.push(x.numLightProbes),_.push(x.shadowMapType),_.push(x.toneMapping),_.push(x.numClippingPlanes),_.push(x.numClipIntersection),_.push(x.depthPacking)}(g,m),function(_,x){o.disableAll(),x.supportsVertexTextures&&o.enable(0),x.instancing&&o.enable(1),x.instancingColor&&o.enable(2),x.instancingMorph&&o.enable(3),x.matcap&&o.enable(4),x.envMap&&o.enable(5),x.normalMapObjectSpace&&o.enable(6),x.normalMapTangentSpace&&o.enable(7),x.clearcoat&&o.enable(8),x.iridescence&&o.enable(9),x.alphaTest&&o.enable(10),x.vertexColors&&o.enable(11),x.vertexAlphas&&o.enable(12),x.vertexUv1s&&o.enable(13),x.vertexUv2s&&o.enable(14),x.vertexUv3s&&o.enable(15),x.vertexTangents&&o.enable(16),x.anisotropy&&o.enable(17),x.alphaHash&&o.enable(18),x.batching&&o.enable(19),x.dispersion&&o.enable(20),x.batchingColor&&o.enable(21),_.push(o.mask),o.disableAll(),x.fog&&o.enable(0),x.useFog&&o.enable(1),x.flatShading&&o.enable(2),x.logarithmicDepthBuffer&&o.enable(3),x.reverseDepthBuffer&&o.enable(4),x.skinning&&o.enable(5),x.morphTargets&&o.enable(6),x.morphNormals&&o.enable(7),x.morphColors&&o.enable(8),x.premultipliedAlpha&&o.enable(9),x.shadowMapEnabled&&o.enable(10),x.doubleSided&&o.enable(11),x.flipSided&&o.enable(12),x.useDepthPacking&&o.enable(13),x.dithering&&o.enable(14),x.transmission&&o.enable(15),x.sheen&&o.enable(16),x.opaque&&o.enable(17),x.pointsUvs&&o.enable(18),x.decodeVideoTexture&&o.enable(19),x.decodeVideoTextureEmissive&&o.enable(20),x.alphaToCoverage&&o.enable(21),_.push(o.mask)}(g,m),g.push(r.outputColorSpace)),g.push(m.customProgramCacheKey),g.join()},getUniforms:function(m){let g=f[m.type],_;if(g){let x=Xn[g];_=E0.clone(x.uniforms)}else _=m.uniforms;return _},acquireProgram:function(m,g){let _;for(let x=0,y=h.length;x<y;x++){let S=h[x];if(S.cacheKey===g){_=S,++_.usedTimes;break}}return _===void 0&&(_=new Ng(r,g,m,s),h.push(_)),_},releaseProgram:function(m){if(--m.usedTimes==0){let g=h.indexOf(m);h[g]=h[h.length-1],h.pop(),m.destroy()}},releaseShaderCache:function(m){l.remove(m)},programs:h,dispose:function(){l.dispose()}}}function Fg(){let r=new WeakMap;return{has:function(e){return r.has(e)},get:function(e){let t=r.get(e);return t===void 0&&(t={},r.set(e,t)),t},remove:function(e){r.delete(e)},update:function(e,t,n){r.get(e)[t]=n},dispose:function(){r=new WeakMap}}}function Hg(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.material.id!==e.material.id?r.material.id-e.material.id:r.z!==e.z?r.z-e.z:r.id-e.id}function vp(r,e){return r.groupOrder!==e.groupOrder?r.groupOrder-e.groupOrder:r.renderOrder!==e.renderOrder?r.renderOrder-e.renderOrder:r.z!==e.z?e.z-r.z:r.id-e.id}function _p(){let r=[],e=0,t=[],n=[],i=[];function s(a,o,l,c,h,u){let d=r[e];return d===void 0?(d={id:a.id,object:a,geometry:o,material:l,groupOrder:c,renderOrder:a.renderOrder,z:h,group:u},r[e]=d):(d.id=a.id,d.object=a,d.geometry=o,d.material=l,d.groupOrder=c,d.renderOrder=a.renderOrder,d.z=h,d.group=u),e++,d}return{opaque:t,transmissive:n,transparent:i,init:function(){e=0,t.length=0,n.length=0,i.length=0},push:function(a,o,l,c,h,u){let d=s(a,o,l,c,h,u);l.transmission>0?n.push(d):l.transparent===!0?i.push(d):t.push(d)},unshift:function(a,o,l,c,h,u){let d=s(a,o,l,c,h,u);l.transmission>0?n.unshift(d):l.transparent===!0?i.unshift(d):t.unshift(d)},finish:function(){for(let a=e,o=r.length;a<o;a++){let l=r[a];if(l.id===null)break;l.id=null,l.object=null,l.geometry=null,l.material=null,l.group=null}},sort:function(a,o){t.length>1&&t.sort(a||Hg),n.length>1&&n.sort(o||vp),i.length>1&&i.sort(o||vp)}}}function zg(){let r=new WeakMap;return{get:function(e,t){let n=r.get(e),i;return n===void 0?(i=new _p,r.set(e,[i])):t>=n.length?(i=new _p,n.push(i)):i=n[t],i},dispose:function(){r=new WeakMap}}}function kg(){let r={};return{get:function(e){if(r[e.id]!==void 0)return r[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new E,color:new he};break;case"SpotLight":t={position:new E,direction:new E,color:new he,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new E,color:new he,distance:0,decay:0};break;case"HemisphereLight":t={direction:new E,skyColor:new he,groundColor:new he};break;case"RectAreaLight":t={color:new he,position:new E,halfWidth:new E,halfHeight:new E}}return r[e.id]=t,t}}}function Vg(r,e){return(e.castShadow?2:0)-(r.castShadow?2:0)+(e.map?1:0)-(r.map?1:0)}function Wg(r){let e=new kg,t=function(){let o={};return{get:function(l){if(o[l.id]!==void 0)return o[l.id];let c;switch(l.type){case"DirectionalLight":case"SpotLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"PointLight":c={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie,shadowCameraNear:1,shadowCameraFar:1e3}}return o[l.id]=c,c}}}(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let o=0;o<9;o++)n.probe.push(new E);let i=new E,s=new we,a=new we;return{setup:function(o){let l=0,c=0,h=0;for(let b=0;b<9;b++)n.probe[b].set(0,0,0);let u=0,d=0,p=0,f=0,v=0,m=0,g=0,_=0,x=0,y=0,S=0;o.sort(Vg);for(let b=0,T=o.length;b<T;b++){let R=o[b],O=R.color,V=R.intensity,H=R.distance,X=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)l+=O.r*V,c+=O.g*V,h+=O.b*V;else if(R.isLightProbe){for(let I=0;I<9;I++)n.probe[I].addScaledVector(R.sh.coefficients[I],V);S++}else if(R.isDirectionalLight){let I=e.get(R);if(I.color.copy(R.color).multiplyScalar(R.intensity),R.castShadow){let U=R.shadow,z=t.get(R);z.shadowIntensity=U.intensity,z.shadowBias=U.bias,z.shadowNormalBias=U.normalBias,z.shadowRadius=U.radius,z.shadowMapSize=U.mapSize,n.directionalShadow[u]=z,n.directionalShadowMap[u]=X,n.directionalShadowMatrix[u]=R.shadow.matrix,m++}n.directional[u]=I,u++}else if(R.isSpotLight){let I=e.get(R);I.position.setFromMatrixPosition(R.matrixWorld),I.color.copy(O).multiplyScalar(V),I.distance=H,I.coneCos=Math.cos(R.angle),I.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),I.decay=R.decay,n.spot[p]=I;let U=R.shadow;if(R.map&&(n.spotLightMap[x]=R.map,x++,U.updateMatrices(R),R.castShadow&&y++),n.spotLightMatrix[p]=U.matrix,R.castShadow){let z=t.get(R);z.shadowIntensity=U.intensity,z.shadowBias=U.bias,z.shadowNormalBias=U.normalBias,z.shadowRadius=U.radius,z.shadowMapSize=U.mapSize,n.spotShadow[p]=z,n.spotShadowMap[p]=X,_++}p++}else if(R.isRectAreaLight){let I=e.get(R);I.color.copy(O).multiplyScalar(V),I.halfWidth.set(.5*R.width,0,0),I.halfHeight.set(0,.5*R.height,0),n.rectArea[f]=I,f++}else if(R.isPointLight){let I=e.get(R);if(I.color.copy(R.color).multiplyScalar(R.intensity),I.distance=R.distance,I.decay=R.decay,R.castShadow){let U=R.shadow,z=t.get(R);z.shadowIntensity=U.intensity,z.shadowBias=U.bias,z.shadowNormalBias=U.normalBias,z.shadowRadius=U.radius,z.shadowMapSize=U.mapSize,z.shadowCameraNear=U.camera.near,z.shadowCameraFar=U.camera.far,n.pointShadow[d]=z,n.pointShadowMap[d]=X,n.pointShadowMatrix[d]=R.shadow.matrix,g++}n.point[d]=I,d++}else if(R.isHemisphereLight){let I=e.get(R);I.skyColor.copy(R.color).multiplyScalar(V),I.groundColor.copy(R.groundColor).multiplyScalar(V),n.hemi[v]=I,v++}}f>0&&(r.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=le.LTC_FLOAT_1,n.rectAreaLTC2=le.LTC_FLOAT_2):(n.rectAreaLTC1=le.LTC_HALF_1,n.rectAreaLTC2=le.LTC_HALF_2)),n.ambient[0]=l,n.ambient[1]=c,n.ambient[2]=h;let M=n.hash;M.directionalLength===u&&M.pointLength===d&&M.spotLength===p&&M.rectAreaLength===f&&M.hemiLength===v&&M.numDirectionalShadows===m&&M.numPointShadows===g&&M.numSpotShadows===_&&M.numSpotMaps===x&&M.numLightProbes===S||(n.directional.length=u,n.spot.length=p,n.rectArea.length=f,n.point.length=d,n.hemi.length=v,n.directionalShadow.length=m,n.directionalShadowMap.length=m,n.pointShadow.length=g,n.pointShadowMap.length=g,n.spotShadow.length=_,n.spotShadowMap.length=_,n.directionalShadowMatrix.length=m,n.pointShadowMatrix.length=g,n.spotLightMatrix.length=_+x-y,n.spotLightMap.length=x,n.numSpotLightShadowsWithMaps=y,n.numLightProbes=S,M.directionalLength=u,M.pointLength=d,M.spotLength=p,M.rectAreaLength=f,M.hemiLength=v,M.numDirectionalShadows=m,M.numPointShadows=g,M.numSpotShadows=_,M.numSpotMaps=x,M.numLightProbes=S,n.version=Gg++)},setupView:function(o,l){let c=0,h=0,u=0,d=0,p=0,f=l.matrixWorldInverse;for(let v=0,m=o.length;v<m;v++){let g=o[v];if(g.isDirectionalLight){let _=n.directional[c];_.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(f),c++}else if(g.isSpotLight){let _=n.spot[u];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(f),_.direction.setFromMatrixPosition(g.matrixWorld),i.setFromMatrixPosition(g.target.matrixWorld),_.direction.sub(i),_.direction.transformDirection(f),u++}else if(g.isRectAreaLight){let _=n.rectArea[d];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(f),a.identity(),s.copy(g.matrixWorld),s.premultiply(f),a.extractRotation(s),_.halfWidth.set(.5*g.width,0,0),_.halfHeight.set(0,.5*g.height,0),_.halfWidth.applyMatrix4(a),_.halfHeight.applyMatrix4(a),d++}else if(g.isPointLight){let _=n.point[h];_.position.setFromMatrixPosition(g.matrixWorld),_.position.applyMatrix4(f),h++}else if(g.isHemisphereLight){let _=n.hemi[p];_.direction.setFromMatrixPosition(g.matrixWorld),_.direction.transformDirection(f),p++}}},state:n}}function xp(r){let e=new Wg(r),t=[],n=[],i={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:function(s){i.camera=s,t.length=0,n.length=0},state:i,setupLights:function(){e.setup(t)},setupLightsView:function(s){e.setupView(t,s)},pushLight:function(s){t.push(s)},pushShadow:function(s){n.push(s)}}}function jg(r){let e=new WeakMap;return{get:function(t,n=0){let i=e.get(t),s;return i===void 0?(s=new xp(r),e.set(t,[s])):n>=i.length?(s=new xp(r),i.push(s)):s=i[n],s},dispose:function(){e=new WeakMap}}}function Xg(r,e,t){let n=new as,i=new ie,s=new ie,a=new rt,o=new ch({depthPacking:3201}),l=new hh,c={},h=t.maxTextureSize,u={[Hh]:1,[va]:0,[wn]:2},d=new qn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ie},radius:{value:4}},vertexShader:`void main() {
	gl_Position = vec4( position, 1.0 );
}`,fragmentShader:`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`}),p=d.clone();p.defines.HORIZONTAL_PASS=1;let f=new Qe;f.setAttribute("position",new at(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let v=new ce(f,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=1;let g=this.type;function _(M,b){let T=e.update(v);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,p.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,p.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new hi(i.x,i.y)),d.uniforms.shadow_pass.value=M.map.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,r.setRenderTarget(M.mapPass),r.clear(),r.renderBufferDirect(b,null,T,d,v,null),p.uniforms.shadow_pass.value=M.mapPass.texture,p.uniforms.resolution.value=M.mapSize,p.uniforms.radius.value=M.radius,r.setRenderTarget(M.map),r.clear(),r.renderBufferDirect(b,null,T,p,v,null)}function x(M,b,T,R){let O=null,V=T.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(V!==void 0)O=V;else if(O=T.isPointLight===!0?l:o,r.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){let H=O.uuid,X=b.uuid,I=c[H];I===void 0&&(I={},c[H]=I);let U=I[X];U===void 0&&(U=O.clone(),I[X]=U,b.addEventListener("dispose",S)),O=U}return O.visible=b.visible,O.wireframe=b.wireframe,O.side=R===3?b.shadowSide!==null?b.shadowSide:b.side:b.shadowSide!==null?b.shadowSide:u[b.side],O.alphaMap=b.alphaMap,O.alphaTest=b.alphaTest,O.map=b.map,O.clipShadows=b.clipShadows,O.clippingPlanes=b.clippingPlanes,O.clipIntersection=b.clipIntersection,O.displacementMap=b.displacementMap,O.displacementScale=b.displacementScale,O.displacementBias=b.displacementBias,O.wireframeLinewidth=b.wireframeLinewidth,O.linewidth=b.linewidth,T.isPointLight===!0&&O.isMeshDistanceMaterial===!0&&(r.properties.get(O).light=T),O}function y(M,b,T,R,O){if(M.visible===!1)return;if(M.layers.test(b.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&O===3)&&(!M.frustumCulled||n.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,M.matrixWorld);let H=e.update(M),X=M.material;if(Array.isArray(X)){let I=H.groups;for(let U=0,z=I.length;U<z;U++){let q=I[U],Z=X[q.materialIndex];if(Z&&Z.visible){let ae=x(M,Z,R,O);M.onBeforeShadow(r,M,b,T,H,ae,q),r.renderBufferDirect(T,null,H,ae,M,q),M.onAfterShadow(r,M,b,T,H,ae,q)}}}else if(X.visible){let I=x(M,X,R,O);M.onBeforeShadow(r,M,b,T,H,I,null),r.renderBufferDirect(T,null,H,I,M,null),M.onAfterShadow(r,M,b,T,H,I,null)}}let V=M.children;for(let H=0,X=V.length;H<X;H++)y(V[H],b,T,R,O)}function S(M){M.target.removeEventListener("dispose",S);for(let b in c){let T=c[b],R=M.target.uuid;R in T&&(T[R].dispose(),delete T[R])}}this.render=function(M,b,T){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;let R=r.getRenderTarget(),O=r.getActiveCubeFace(),V=r.getActiveMipmapLevel(),H=r.state;H.setBlending(0),H.buffers.color.setClear(1,1,1,1),H.buffers.depth.setTest(!0),H.setScissorTest(!1);let X=g!==3&&this.type===3,I=g===3&&this.type!==3;for(let U=0,z=M.length;U<z;U++){let q=M[U],Z=q.shadow;if(Z===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(Z.autoUpdate===!1&&Z.needsUpdate===!1)continue;i.copy(Z.mapSize);let ae=Z.getFrameExtents();if(i.multiply(ae),s.copy(Z.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(s.x=Math.floor(h/ae.x),i.x=s.x*ae.x,Z.mapSize.x=s.x),i.y>h&&(s.y=Math.floor(h/ae.y),i.y=s.y*ae.y,Z.mapSize.y=s.y)),Z.map===null||X===!0||I===!0){let Q=this.type!==3?{minFilter:It,magFilter:It}:{};Z.map!==null&&Z.map.dispose(),Z.map=new hi(i.x,i.y,Q),Z.map.texture.name=q.name+".shadowMap",Z.camera.updateProjectionMatrix()}r.setRenderTarget(Z.map),r.clear();let pe=Z.getViewportCount();for(let Q=0;Q<pe;Q++){let re=Z.getViewport(Q);a.set(s.x*re.x,s.y*re.y,s.x*re.z,s.y*re.w),H.viewport(a),Z.updateMatrices(q,Q),n=Z.getFrustum(),y(b,T,Z.camera,q,this.type)}Z.isPointLightShadow!==!0&&this.type===3&&_(Z,T),Z.needsUpdate=!1}g=this.type,m.needsUpdate=!1,r.setRenderTarget(R,O,V)}}function Yg(r,e){let t=new function(){let w=!1,D=new rt,G=null,te=new rt(0,0,0,0);return{setMask:function(k){G===k||w||(r.colorMask(k,k,k,k),G=k)},setLocked:function(k){w=k},setClear:function(k,$,J,ne,fe){fe===!0&&(k*=ne,$*=ne,J*=ne),D.set(k,$,J,ne),te.equals(D)===!1&&(r.clearColor(k,$,J,ne),te.copy(D))},reset:function(){w=!1,G=null,te.set(-1,0,0,0)}}},n=new function(){let w=!1,D=!1,G=null,te=null,k=null;return{setReversed:function($){if(D!==$){let J=e.get("EXT_clip_control");D?J.clipControlEXT(J.LOWER_LEFT_EXT,J.ZERO_TO_ONE_EXT):J.clipControlEXT(J.LOWER_LEFT_EXT,J.NEGATIVE_ONE_TO_ONE_EXT);let ne=k;k=null,this.setClear(ne)}D=$},getReversed:function(){return D},setTest:function($){$?_e(r.DEPTH_TEST):ue(r.DEPTH_TEST)},setMask:function($){G===$||w||(r.depthMask($),G=$)},setFunc:function($){if(D&&($=qg[$]),te!==$){switch($){case 0:r.depthFunc(r.NEVER);break;case 1:r.depthFunc(r.ALWAYS);break;case 2:r.depthFunc(r.LESS);break;case 3:default:r.depthFunc(r.LEQUAL);break;case 4:r.depthFunc(r.EQUAL);break;case 5:r.depthFunc(r.GEQUAL);break;case 6:r.depthFunc(r.GREATER);break;case 7:r.depthFunc(r.NOTEQUAL)}te=$}},setLocked:function($){w=$},setClear:function($){k!==$&&(D&&($=1-$),r.clearDepth($),k=$)},reset:function(){w=!1,G=null,te=null,k=null,D=!1}}},i=new function(){let w=!1,D=null,G=null,te=null,k=null,$=null,J=null,ne=null,fe=null;return{setTest:function(de){w||(de?_e(r.STENCIL_TEST):ue(r.STENCIL_TEST))},setMask:function(de){D===de||w||(r.stencilMask(de),D=de)},setFunc:function(de,be,De){G===de&&te===be&&k===De||(r.stencilFunc(de,be,De),G=de,te=be,k=De)},setOp:function(de,be,De){$===de&&J===be&&ne===De||(r.stencilOp(de,be,De),$=de,J=be,ne=De)},setLocked:function(de){w=de},setClear:function(de){fe!==de&&(r.clearStencil(de),fe=de)},reset:function(){w=!1,D=null,G=null,te=null,k=null,$=null,J=null,ne=null,fe=null}}},s=new WeakMap,a=new WeakMap,o={},l={},c=new WeakMap,h=[],u=null,d=!1,p=null,f=null,v=null,m=null,g=null,_=null,x=null,y=new he(0,0,0),S=0,M=!1,b=null,T=null,R=null,O=null,V=null,H=r.getParameter(r.MAX_COMBINED_TEXTURE_IMAGE_UNITS),X=!1,I=0,U=r.getParameter(r.VERSION);U.indexOf("WebGL")!==-1?(I=parseFloat(/^WebGL (\d)/.exec(U)[1]),X=I>=1):U.indexOf("OpenGL ES")!==-1&&(I=parseFloat(/^OpenGL ES (\d)/.exec(U)[1]),X=I>=2);let z=null,q={},Z=r.getParameter(r.SCISSOR_BOX),ae=r.getParameter(r.VIEWPORT),pe=new rt().fromArray(Z),Q=new rt().fromArray(ae);function re(w,D,G,te){let k=new Uint8Array(4),$=r.createTexture();r.bindTexture(w,$),r.texParameteri(w,r.TEXTURE_MIN_FILTER,r.NEAREST),r.texParameteri(w,r.TEXTURE_MAG_FILTER,r.NEAREST);for(let J=0;J<G;J++)w===r.TEXTURE_3D||w===r.TEXTURE_2D_ARRAY?r.texImage3D(D,0,r.RGBA,1,1,te,0,r.RGBA,r.UNSIGNED_BYTE,k):r.texImage2D(D+J,0,r.RGBA,1,1,0,r.RGBA,r.UNSIGNED_BYTE,k);return $}let ve={};function _e(w){o[w]!==!0&&(r.enable(w),o[w]=!0)}function ue(w){o[w]!==!1&&(r.disable(w),o[w]=!1)}ve[r.TEXTURE_2D]=re(r.TEXTURE_2D,r.TEXTURE_2D,1),ve[r.TEXTURE_CUBE_MAP]=re(r.TEXTURE_CUBE_MAP,r.TEXTURE_CUBE_MAP_POSITIVE_X,6),ve[r.TEXTURE_2D_ARRAY]=re(r.TEXTURE_2D_ARRAY,r.TEXTURE_2D_ARRAY,1,1),ve[r.TEXTURE_3D]=re(r.TEXTURE_3D,r.TEXTURE_3D,1,1),t.setClear(0,0,0,1),n.setClear(1),i.setClear(0),_e(r.DEPTH_TEST),n.setFunc(3),B(!1),L(1),_e(r.CULL_FACE),F(0);let P={[ar]:r.FUNC_ADD,[Lm]:r.FUNC_SUBTRACT,[Dm]:r.FUNC_REVERSE_SUBTRACT};P[103]=r.MIN,P[104]=r.MAX;let C={[Um]:r.ZERO,[Nm]:r.ONE,[Om]:r.SRC_COLOR,[yc]:r.SRC_ALPHA,[Gm]:r.SRC_ALPHA_SATURATE,[zm]:r.DST_COLOR,[Fm]:r.DST_ALPHA,[Bm]:r.ONE_MINUS_SRC_COLOR,[Mc]:r.ONE_MINUS_SRC_ALPHA,[km]:r.ONE_MINUS_DST_COLOR,[Hm]:r.ONE_MINUS_DST_ALPHA,[Vm]:r.CONSTANT_COLOR,[Wm]:r.ONE_MINUS_CONSTANT_COLOR,[jm]:r.CONSTANT_ALPHA,[Xm]:r.ONE_MINUS_CONSTANT_ALPHA};function F(w,D,G,te,k,$,J,ne,fe,de){if(w!==0){if(d===!1&&(_e(r.BLEND),d=!0),w===5)k=k||D,$=$||G,J=J||te,D===f&&k===g||(r.blendEquationSeparate(P[D],P[k]),f=D,g=k),G===v&&te===m&&$===_&&J===x||(r.blendFuncSeparate(C[G],C[te],C[$],C[J]),v=G,m=te,_=$,x=J),ne.equals(y)!==!1&&fe===S||(r.blendColor(ne.r,ne.g,ne.b,fe),y.copy(ne),S=fe),p=w,M=!1;else if(w!==p||de!==M){if(f===ar&&g===ar||(r.blendEquation(r.FUNC_ADD),f=ar,g=ar),de)switch(w){case 1:r.blendFuncSeparate(r.ONE,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case 2:r.blendFunc(r.ONE,r.ONE);break;case 3:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case 4:r.blendFuncSeparate(r.ZERO,r.SRC_COLOR,r.ZERO,r.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",w)}else switch(w){case 1:r.blendFuncSeparate(r.SRC_ALPHA,r.ONE_MINUS_SRC_ALPHA,r.ONE,r.ONE_MINUS_SRC_ALPHA);break;case 2:r.blendFunc(r.SRC_ALPHA,r.ONE);break;case 3:r.blendFuncSeparate(r.ZERO,r.ONE_MINUS_SRC_COLOR,r.ZERO,r.ONE);break;case 4:r.blendFunc(r.ZERO,r.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",w)}v=null,m=null,_=null,x=null,y.set(0,0,0),S=0,p=w,M=de}}else d===!0&&(ue(r.BLEND),d=!1)}function B(w){b!==w&&(w?r.frontFace(r.CW):r.frontFace(r.CCW),b=w)}function L(w){w!==0?(_e(r.CULL_FACE),w!==T&&(w===1?r.cullFace(r.BACK):w===2?r.cullFace(r.FRONT):r.cullFace(r.FRONT_AND_BACK))):ue(r.CULL_FACE),T=w}function N(w,D,G){w?(_e(r.POLYGON_OFFSET_FILL),O===D&&V===G||(r.polygonOffset(D,G),O=D,V=G)):ue(r.POLYGON_OFFSET_FILL)}return{buffers:{color:t,depth:n,stencil:i},enable:_e,disable:ue,bindFramebuffer:function(w,D){return l[w]!==D&&(r.bindFramebuffer(w,D),l[w]=D,w===r.DRAW_FRAMEBUFFER&&(l[r.FRAMEBUFFER]=D),w===r.FRAMEBUFFER&&(l[r.DRAW_FRAMEBUFFER]=D),!0)},drawBuffers:function(w,D){let G=h,te=!1;if(w){G=c.get(D),G===void 0&&(G=[],c.set(D,G));let k=w.textures;if(G.length!==k.length||G[0]!==r.COLOR_ATTACHMENT0){for(let $=0,J=k.length;$<J;$++)G[$]=r.COLOR_ATTACHMENT0+$;G.length=k.length,te=!0}}else G[0]!==r.BACK&&(G[0]=r.BACK,te=!0);te&&r.drawBuffers(G)},useProgram:function(w){return u!==w&&(r.useProgram(w),u=w,!0)},setBlending:F,setMaterial:function(w,D){w.side===2?ue(r.CULL_FACE):_e(r.CULL_FACE);let G=w.side===1;D&&(G=!G),B(G),w.blending===1&&w.transparent===!1?F(0):F(w.blending,w.blendEquation,w.blendSrc,w.blendDst,w.blendEquationAlpha,w.blendSrcAlpha,w.blendDstAlpha,w.blendColor,w.blendAlpha,w.premultipliedAlpha),n.setFunc(w.depthFunc),n.setTest(w.depthTest),n.setMask(w.depthWrite),t.setMask(w.colorWrite);let te=w.stencilWrite;i.setTest(te),te&&(i.setMask(w.stencilWriteMask),i.setFunc(w.stencilFunc,w.stencilRef,w.stencilFuncMask),i.setOp(w.stencilFail,w.stencilZFail,w.stencilZPass)),N(w.polygonOffset,w.polygonOffsetFactor,w.polygonOffsetUnits),w.alphaToCoverage===!0?_e(r.SAMPLE_ALPHA_TO_COVERAGE):ue(r.SAMPLE_ALPHA_TO_COVERAGE)},setFlipSided:B,setCullFace:L,setLineWidth:function(w){w!==R&&(X&&r.lineWidth(w),R=w)},setPolygonOffset:N,setScissorTest:function(w){w?_e(r.SCISSOR_TEST):ue(r.SCISSOR_TEST)},activeTexture:function(w){w===void 0&&(w=r.TEXTURE0+H-1),z!==w&&(r.activeTexture(w),z=w)},bindTexture:function(w,D,G){G===void 0&&(G=z===null?r.TEXTURE0+H-1:z);let te=q[G];te===void 0&&(te={type:void 0,texture:void 0},q[G]=te),te.type===w&&te.texture===D||(z!==G&&(r.activeTexture(G),z=G),r.bindTexture(w,D||ve[w]),te.type=w,te.texture=D)},unbindTexture:function(){let w=q[z];w!==void 0&&w.type!==void 0&&(r.bindTexture(w.type,null),w.type=void 0,w.texture=void 0)},compressedTexImage2D:function(){try{r.compressedTexImage2D.apply(r,arguments)}catch(w){console.error("THREE.WebGLState:",w)}},compressedTexImage3D:function(){try{r.compressedTexImage3D.apply(r,arguments)}catch(w){console.error("THREE.WebGLState:",w)}},texImage2D:function(){try{r.texImage2D.apply(r,arguments)}catch(w){console.error("THREE.WebGLState:",w)}},texImage3D:function(){try{r.texImage3D.apply(r,arguments)}catch(w){console.error("THREE.WebGLState:",w)}},updateUBOMapping:function(w,D){let G=a.get(D);G===void 0&&(G=new WeakMap,a.set(D,G));let te=G.get(w);te===void 0&&(te=r.getUniformBlockIndex(D,w.name),G.set(w,te))},uniformBlockBinding:function(w,D){let G=a.get(D).get(w);s.get(D)!==G&&(r.uniformBlockBinding(D,G,w.__bindingPointIndex),s.set(D,G))},texStorage2D:function(){try{r.texStorage2D.apply(r,arguments)}catch(w){console.error("THREE.WebGLState:",w)}},texStorage3D:function(){try{r.texStorage3D.apply(r,arguments)}catch(w){console.error("THREE.WebGLState:",w)}},texSubImage2D:function(){try{r.texSubImage2D.apply(r,arguments)}catch(w){console.error("THREE.WebGLState:",w)}},texSubImage3D:function(){try{r.texSubImage3D.apply(r,arguments)}catch(w){console.error("THREE.WebGLState:",w)}},compressedTexSubImage2D:function(){try{r.compressedTexSubImage2D.apply(r,arguments)}catch(w){console.error("THREE.WebGLState:",w)}},compressedTexSubImage3D:function(){try{r.compressedTexSubImage3D.apply(r,arguments)}catch(w){console.error("THREE.WebGLState:",w)}},scissor:function(w){pe.equals(w)===!1&&(r.scissor(w.x,w.y,w.z,w.w),pe.copy(w))},viewport:function(w){Q.equals(w)===!1&&(r.viewport(w.x,w.y,w.z,w.w),Q.copy(w))},reset:function(){r.disable(r.BLEND),r.disable(r.CULL_FACE),r.disable(r.DEPTH_TEST),r.disable(r.POLYGON_OFFSET_FILL),r.disable(r.SCISSOR_TEST),r.disable(r.STENCIL_TEST),r.disable(r.SAMPLE_ALPHA_TO_COVERAGE),r.blendEquation(r.FUNC_ADD),r.blendFunc(r.ONE,r.ZERO),r.blendFuncSeparate(r.ONE,r.ZERO,r.ONE,r.ZERO),r.blendColor(0,0,0,0),r.colorMask(!0,!0,!0,!0),r.clearColor(0,0,0,0),r.depthMask(!0),r.depthFunc(r.LESS),n.setReversed(!1),r.clearDepth(1),r.stencilMask(4294967295),r.stencilFunc(r.ALWAYS,0,4294967295),r.stencilOp(r.KEEP,r.KEEP,r.KEEP),r.clearStencil(0),r.cullFace(r.BACK),r.frontFace(r.CCW),r.polygonOffset(0,0),r.activeTexture(r.TEXTURE0),r.bindFramebuffer(r.FRAMEBUFFER,null),r.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),r.bindFramebuffer(r.READ_FRAMEBUFFER,null),r.useProgram(null),r.lineWidth(1),r.scissor(0,0,r.canvas.width,r.canvas.height),r.viewport(0,0,r.canvas.width,r.canvas.height),o={},z=null,q={},l={},c=new WeakMap,h=[],u=null,d=!1,p=null,f=null,v=null,m=null,g=null,_=null,x=null,y=new he(0,0,0),S=0,M=!1,b=null,T=null,R=null,O=null,V=null,pe.set(0,0,r.canvas.width,r.canvas.height),Q.set(0,0,r.canvas.width,r.canvas.height),t.reset(),n.reset(),i.reset()}}}function yp(r,e,t,n){let i=function(s){switch(s){case Pi:case Qp:return{byteLength:1,components:1};case Qs:case ef:case _a:return{byteLength:2,components:1};case Gh:case Vh:return{byteLength:2,components:4};case cr:case kh:case Hn:return{byteLength:4,components:1};case tf:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}(n);switch(t){case nf:case sf:return r*e;case af:return r*e*2;case mi:case Wh:return r*e/i.components*i.byteLength;case of:case jh:return r*e*2/i.components*i.byteLength;case rf:return r*e*3/i.components*i.byteLength;case zn:case Xh:return r*e*4/i.components*i.byteLength;case bo:case Eo:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case So:case To:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Tc:case Ac:return Math.max(r,16)*Math.max(e,8)/4;case Sc:case wc:return Math.max(r,8)*Math.max(e,8)/2;case Rc:case Cc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*8;case Ic:case Pc:return Math.floor((r+3)/4)*Math.floor((e+3)/4)*16;case Lc:return Math.floor((r+4)/5)*Math.floor((e+3)/4)*16;case Dc:return Math.floor((r+4)/5)*Math.floor((e+4)/5)*16;case Uc:return Math.floor((r+5)/6)*Math.floor((e+4)/5)*16;case Nc:return Math.floor((r+5)/6)*Math.floor((e+5)/6)*16;case Oc:return Math.floor((r+7)/8)*Math.floor((e+4)/5)*16;case Bc:return Math.floor((r+7)/8)*Math.floor((e+5)/6)*16;case Fc:return Math.floor((r+7)/8)*Math.floor((e+7)/8)*16;case Hc:return Math.floor((r+9)/10)*Math.floor((e+4)/5)*16;case zc:return Math.floor((r+9)/10)*Math.floor((e+5)/6)*16;case kc:return Math.floor((r+9)/10)*Math.floor((e+7)/8)*16;case Gc:return Math.floor((r+9)/10)*Math.floor((e+9)/10)*16;case Vc:return Math.floor((r+11)/12)*Math.floor((e+9)/10)*16;case Wc:return Math.floor((r+11)/12)*Math.floor((e+11)/12)*16;case wo:case jc:case Xc:return Math.ceil(r/4)*Math.ceil(e/4)*16;case lf:case qc:return Math.ceil(r/4)*Math.ceil(e/4)*8;case Yc:case Zc:return Math.ceil(r/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function Zg(r,e,t,n,i,s,a){let o=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator<"u"&&/OculusBrowser/g.test(navigator.userAgent),c=new ie,h=new WeakMap,u,d=new WeakMap,p=!1;try{p=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function f(P,C){return p?new OffscreenCanvas(P,C):ta("canvas")}function v(P,C,F){let B=1,L=ue(P);if((L.width>F||L.height>F)&&(B=F/Math.max(L.width,L.height)),B<1){if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap||typeof VideoFrame<"u"&&P instanceof VideoFrame){let N=Math.floor(B*L.width),w=Math.floor(B*L.height);u===void 0&&(u=f(N,w));let D=C?f(N,w):u;return D.width=N,D.height=w,D.getContext("2d").drawImage(P,0,0,N,w),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+L.width+"x"+L.height+") to ("+N+"x"+w+")."),D}return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+L.width+"x"+L.height+")."),P}return P}function m(P){return P.generateMipmaps}function g(P){r.generateMipmap(P)}function _(P){return P.isWebGLCubeRenderTarget?r.TEXTURE_CUBE_MAP:P.isWebGL3DRenderTarget?r.TEXTURE_3D:P.isWebGLArrayRenderTarget||P.isCompressedArrayTexture?r.TEXTURE_2D_ARRAY:r.TEXTURE_2D}function x(P,C,F,B,L=!1){if(P!==null){if(r[P]!==void 0)return r[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let N=C;if(C===r.RED&&(F===r.FLOAT&&(N=r.R32F),F===r.HALF_FLOAT&&(N=r.R16F),F===r.UNSIGNED_BYTE&&(N=r.R8)),C===r.RED_INTEGER&&(F===r.UNSIGNED_BYTE&&(N=r.R8UI),F===r.UNSIGNED_SHORT&&(N=r.R16UI),F===r.UNSIGNED_INT&&(N=r.R32UI),F===r.BYTE&&(N=r.R8I),F===r.SHORT&&(N=r.R16I),F===r.INT&&(N=r.R32I)),C===r.RG&&(F===r.FLOAT&&(N=r.RG32F),F===r.HALF_FLOAT&&(N=r.RG16F),F===r.UNSIGNED_BYTE&&(N=r.RG8)),C===r.RG_INTEGER&&(F===r.UNSIGNED_BYTE&&(N=r.RG8UI),F===r.UNSIGNED_SHORT&&(N=r.RG16UI),F===r.UNSIGNED_INT&&(N=r.RG32UI),F===r.BYTE&&(N=r.RG8I),F===r.SHORT&&(N=r.RG16I),F===r.INT&&(N=r.RG32I)),C===r.RGB_INTEGER&&(F===r.UNSIGNED_BYTE&&(N=r.RGB8UI),F===r.UNSIGNED_SHORT&&(N=r.RGB16UI),F===r.UNSIGNED_INT&&(N=r.RGB32UI),F===r.BYTE&&(N=r.RGB8I),F===r.SHORT&&(N=r.RGB16I),F===r.INT&&(N=r.RGB32I)),C===r.RGBA_INTEGER&&(F===r.UNSIGNED_BYTE&&(N=r.RGBA8UI),F===r.UNSIGNED_SHORT&&(N=r.RGBA16UI),F===r.UNSIGNED_INT&&(N=r.RGBA32UI),F===r.BYTE&&(N=r.RGBA8I),F===r.SHORT&&(N=r.RGBA16I),F===r.INT&&(N=r.RGBA32I)),C===r.RGB&&F===r.UNSIGNED_INT_5_9_9_9_REV&&(N=r.RGB9_E5),C===r.RGBA){let w=L?sl:Ke.getTransfer(B);F===r.FLOAT&&(N=r.RGBA32F),F===r.HALF_FLOAT&&(N=r.RGBA16F),F===r.UNSIGNED_BYTE&&(N=w===ht?r.SRGB8_ALPHA8:r.RGBA8),F===r.UNSIGNED_SHORT_4_4_4_4&&(N=r.RGBA4),F===r.UNSIGNED_SHORT_5_5_5_1&&(N=r.RGB5_A1)}return N!==r.R16F&&N!==r.R32F&&N!==r.RG16F&&N!==r.RG32F&&N!==r.RGBA16F&&N!==r.RGBA32F||e.get("EXT_color_buffer_float"),N}function y(P,C){let F;return P?C===null||C===cr||C===Qr?F=r.DEPTH24_STENCIL8:C===Hn?F=r.DEPTH32F_STENCIL8:C===Qs&&(F=r.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):C===null||C===cr||C===Qr?F=r.DEPTH_COMPONENT24:C===Hn?F=r.DEPTH_COMPONENT32F:C===Qs&&(F=r.DEPTH_COMPONENT16),F}function S(P,C){return m(P)===!0||P.isFramebufferTexture&&P.minFilter!==It&&P.minFilter!==dn?Math.log2(Math.max(C.width,C.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?C.mipmaps.length:1}function M(P){let C=P.target;C.removeEventListener("dispose",M),function(F){let B=n.get(F);if(B.__webglInit===void 0)return;let L=F.source,N=d.get(L);if(N){let w=N[B.__cacheKey];w.usedTimes--,w.usedTimes===0&&T(F),Object.keys(N).length===0&&d.delete(L)}n.remove(F)}(C),C.isVideoTexture&&h.delete(C)}function b(P){let C=P.target;C.removeEventListener("dispose",b),function(F){let B=n.get(F);if(F.depthTexture&&(F.depthTexture.dispose(),n.remove(F.depthTexture)),F.isWebGLCubeRenderTarget)for(let N=0;N<6;N++){if(Array.isArray(B.__webglFramebuffer[N]))for(let w=0;w<B.__webglFramebuffer[N].length;w++)r.deleteFramebuffer(B.__webglFramebuffer[N][w]);else r.deleteFramebuffer(B.__webglFramebuffer[N]);B.__webglDepthbuffer&&r.deleteRenderbuffer(B.__webglDepthbuffer[N])}else{if(Array.isArray(B.__webglFramebuffer))for(let N=0;N<B.__webglFramebuffer.length;N++)r.deleteFramebuffer(B.__webglFramebuffer[N]);else r.deleteFramebuffer(B.__webglFramebuffer);if(B.__webglDepthbuffer&&r.deleteRenderbuffer(B.__webglDepthbuffer),B.__webglMultisampledFramebuffer&&r.deleteFramebuffer(B.__webglMultisampledFramebuffer),B.__webglColorRenderbuffer)for(let N=0;N<B.__webglColorRenderbuffer.length;N++)B.__webglColorRenderbuffer[N]&&r.deleteRenderbuffer(B.__webglColorRenderbuffer[N]);B.__webglDepthRenderbuffer&&r.deleteRenderbuffer(B.__webglDepthRenderbuffer)}let L=F.textures;for(let N=0,w=L.length;N<w;N++){let D=n.get(L[N]);D.__webglTexture&&(r.deleteTexture(D.__webglTexture),a.memory.textures--),n.remove(L[N])}n.remove(F)}(C)}function T(P){let C=n.get(P);r.deleteTexture(C.__webglTexture);let F=P.source;delete d.get(F)[C.__cacheKey],a.memory.textures--}let R=0;function O(P,C){let F=n.get(P);if(P.isVideoTexture&&function(B){let L=a.render.frame;h.get(B)!==L&&(h.set(B,L),B.update())}(P),P.isRenderTargetTexture===!1&&P.version>0&&F.__version!==P.version){let B=P.image;if(B===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else{if(B.complete!==!1)return void z(F,P,C);console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete")}}t.bindTexture(r.TEXTURE_2D,F.__webglTexture,r.TEXTURE0+C)}let V={[Ii]:r.REPEAT,[or]:r.CLAMP_TO_EDGE,[lr]:r.MIRRORED_REPEAT},H={[It]:r.NEAREST,[zh]:r.NEAREST_MIPMAP_NEAREST,[Xr]:r.NEAREST_MIPMAP_LINEAR,[dn]:r.LINEAR,[Ys]:r.LINEAR_MIPMAP_NEAREST,[li]:r.LINEAR_MIPMAP_LINEAR},X={[n0]:r.NEVER,[c0]:r.ALWAYS,[i0]:r.LESS,[s0]:r.LEQUAL,[r0]:r.EQUAL,[l0]:r.GEQUAL,[a0]:r.GREATER,[o0]:r.NOTEQUAL};function I(P,C){if(C.type!==Hn||e.has("OES_texture_float_linear")!==!1||C.magFilter!==dn&&C.magFilter!==Ys&&C.magFilter!==Xr&&C.magFilter!==li&&C.minFilter!==dn&&C.minFilter!==Ys&&C.minFilter!==Xr&&C.minFilter!==li||console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),r.texParameteri(P,r.TEXTURE_WRAP_S,V[C.wrapS]),r.texParameteri(P,r.TEXTURE_WRAP_T,V[C.wrapT]),P!==r.TEXTURE_3D&&P!==r.TEXTURE_2D_ARRAY||r.texParameteri(P,r.TEXTURE_WRAP_R,V[C.wrapR]),r.texParameteri(P,r.TEXTURE_MAG_FILTER,H[C.magFilter]),r.texParameteri(P,r.TEXTURE_MIN_FILTER,H[C.minFilter]),C.compareFunction&&(r.texParameteri(P,r.TEXTURE_COMPARE_MODE,r.COMPARE_REF_TO_TEXTURE),r.texParameteri(P,r.TEXTURE_COMPARE_FUNC,X[C.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(C.magFilter===It||C.minFilter!==Xr&&C.minFilter!==li||C.type===Hn&&e.has("OES_texture_float_linear")===!1)return;if(C.anisotropy>1||n.get(C).__currentAnisotropy){let F=e.get("EXT_texture_filter_anisotropic");r.texParameterf(P,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,i.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy}}}function U(P,C){let F=!1;P.__webglInit===void 0&&(P.__webglInit=!0,C.addEventListener("dispose",M));let B=C.source,L=d.get(B);L===void 0&&(L={},d.set(B,L));let N=function(w){let D=[];return D.push(w.wrapS),D.push(w.wrapT),D.push(w.wrapR||0),D.push(w.magFilter),D.push(w.minFilter),D.push(w.anisotropy),D.push(w.internalFormat),D.push(w.format),D.push(w.type),D.push(w.generateMipmaps),D.push(w.premultiplyAlpha),D.push(w.flipY),D.push(w.unpackAlignment),D.push(w.colorSpace),D.join()}(C);if(N!==P.__cacheKey){L[N]===void 0&&(L[N]={texture:r.createTexture(),usedTimes:0},a.memory.textures++,F=!0),L[N].usedTimes++;let w=L[P.__cacheKey];w!==void 0&&(L[P.__cacheKey].usedTimes--,w.usedTimes===0&&T(C)),P.__cacheKey=N,P.__webglTexture=L[N].texture}return F}function z(P,C,F){let B=r.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(B=r.TEXTURE_2D_ARRAY),C.isData3DTexture&&(B=r.TEXTURE_3D);let L=U(P,C),N=C.source;t.bindTexture(B,P.__webglTexture,r.TEXTURE0+F);let w=n.get(N);if(N.version!==w.__version||L===!0){t.activeTexture(r.TEXTURE0+F);let D=Ke.getPrimaries(Ke.workingColorSpace),G=C.colorSpace===jr?null:Ke.getPrimaries(C.colorSpace),te=C.colorSpace===jr||D===G?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,C.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,C.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,te);let k=v(C.image,!1,i.maxTextureSize);k=_e(C,k);let $=s.convert(C.format,C.colorSpace),J=s.convert(C.type),ne,fe=x(C.internalFormat,$,J,C.colorSpace,C.isVideoTexture);I(B,C);let de=C.mipmaps,be=C.isVideoTexture!==!0,De=w.__version===void 0||L===!0,et=N.dataReady,je=S(C,k);if(C.isDepthTexture)fe=y(C.format===es,C.type),De&&(be?t.texStorage2D(r.TEXTURE_2D,1,fe,k.width,k.height):t.texImage2D(r.TEXTURE_2D,0,fe,k.width,k.height,0,$,J,null));else if(C.isDataTexture)if(de.length>0){be&&De&&t.texStorage2D(r.TEXTURE_2D,je,fe,de[0].width,de[0].height);for(let Ee=0,it=de.length;Ee<it;Ee++)ne=de[Ee],be?et&&t.texSubImage2D(r.TEXTURE_2D,Ee,0,0,ne.width,ne.height,$,J,ne.data):t.texImage2D(r.TEXTURE_2D,Ee,fe,ne.width,ne.height,0,$,J,ne.data);C.generateMipmaps=!1}else be?(De&&t.texStorage2D(r.TEXTURE_2D,je,fe,k.width,k.height),et&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,k.width,k.height,$,J,k.data)):t.texImage2D(r.TEXTURE_2D,0,fe,k.width,k.height,0,$,J,k.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){be&&De&&t.texStorage3D(r.TEXTURE_2D_ARRAY,je,fe,de[0].width,de[0].height,k.depth);for(let Ee=0,it=de.length;Ee<it;Ee++)if(ne=de[Ee],C.format!==zn)if($!==null)if(be){if(et)if(C.layerUpdates.size>0){let pt=yp(ne.width,ne.height,C.format,C.type);for(let bt of C.layerUpdates){let xe=ne.data.subarray(bt*pt/ne.data.BYTES_PER_ELEMENT,(bt+1)*pt/ne.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Ee,0,0,bt,ne.width,ne.height,1,$,xe)}C.clearLayerUpdates()}else t.compressedTexSubImage3D(r.TEXTURE_2D_ARRAY,Ee,0,0,0,ne.width,ne.height,k.depth,$,ne.data)}else t.compressedTexImage3D(r.TEXTURE_2D_ARRAY,Ee,fe,ne.width,ne.height,k.depth,0,ne.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else be?et&&t.texSubImage3D(r.TEXTURE_2D_ARRAY,Ee,0,0,0,ne.width,ne.height,k.depth,$,J,ne.data):t.texImage3D(r.TEXTURE_2D_ARRAY,Ee,fe,ne.width,ne.height,k.depth,0,$,J,ne.data)}else{be&&De&&t.texStorage2D(r.TEXTURE_2D,je,fe,de[0].width,de[0].height);for(let Ee=0,it=de.length;Ee<it;Ee++)ne=de[Ee],C.format!==zn?$!==null?be?et&&t.compressedTexSubImage2D(r.TEXTURE_2D,Ee,0,0,ne.width,ne.height,$,ne.data):t.compressedTexImage2D(r.TEXTURE_2D,Ee,fe,ne.width,ne.height,0,ne.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):be?et&&t.texSubImage2D(r.TEXTURE_2D,Ee,0,0,ne.width,ne.height,$,J,ne.data):t.texImage2D(r.TEXTURE_2D,Ee,fe,ne.width,ne.height,0,$,J,ne.data)}else if(C.isDataArrayTexture)if(be){if(De&&t.texStorage3D(r.TEXTURE_2D_ARRAY,je,fe,k.width,k.height,k.depth),et)if(C.layerUpdates.size>0){let Ee=yp(k.width,k.height,C.format,C.type);for(let it of C.layerUpdates){let pt=k.data.subarray(it*Ee/k.data.BYTES_PER_ELEMENT,(it+1)*Ee/k.data.BYTES_PER_ELEMENT);t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,it,k.width,k.height,1,$,J,pt)}C.clearLayerUpdates()}else t.texSubImage3D(r.TEXTURE_2D_ARRAY,0,0,0,0,k.width,k.height,k.depth,$,J,k.data)}else t.texImage3D(r.TEXTURE_2D_ARRAY,0,fe,k.width,k.height,k.depth,0,$,J,k.data);else if(C.isData3DTexture)be?(De&&t.texStorage3D(r.TEXTURE_3D,je,fe,k.width,k.height,k.depth),et&&t.texSubImage3D(r.TEXTURE_3D,0,0,0,0,k.width,k.height,k.depth,$,J,k.data)):t.texImage3D(r.TEXTURE_3D,0,fe,k.width,k.height,k.depth,0,$,J,k.data);else if(C.isFramebufferTexture){if(De)if(be)t.texStorage2D(r.TEXTURE_2D,je,fe,k.width,k.height);else{let Ee=k.width,it=k.height;for(let pt=0;pt<je;pt++)t.texImage2D(r.TEXTURE_2D,pt,fe,Ee,it,0,$,J,null),Ee>>=1,it>>=1}}else if(de.length>0){if(be&&De){let Ee=ue(de[0]);t.texStorage2D(r.TEXTURE_2D,je,fe,Ee.width,Ee.height)}for(let Ee=0,it=de.length;Ee<it;Ee++)ne=de[Ee],be?et&&t.texSubImage2D(r.TEXTURE_2D,Ee,0,0,$,J,ne):t.texImage2D(r.TEXTURE_2D,Ee,fe,$,J,ne);C.generateMipmaps=!1}else if(be){if(De){let Ee=ue(k);t.texStorage2D(r.TEXTURE_2D,je,fe,Ee.width,Ee.height)}et&&t.texSubImage2D(r.TEXTURE_2D,0,0,0,$,J,k)}else t.texImage2D(r.TEXTURE_2D,0,fe,$,J,k);m(C)&&g(B),w.__version=N.version,C.onUpdate&&C.onUpdate(C)}P.__version=C.version}function q(P,C,F,B,L,N){let w=s.convert(F.format,F.colorSpace),D=s.convert(F.type),G=x(F.internalFormat,w,D,F.colorSpace),te=n.get(C),k=n.get(F);if(k.__renderTarget=C,!te.__hasExternalTextures){let $=Math.max(1,C.width>>N),J=Math.max(1,C.height>>N);L===r.TEXTURE_3D||L===r.TEXTURE_2D_ARRAY?t.texImage3D(L,N,G,$,J,C.depth,0,w,D,null):t.texImage2D(L,N,G,$,J,0,w,D,null)}t.bindFramebuffer(r.FRAMEBUFFER,P),ve(C)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,B,L,k.__webglTexture,0,re(C)):(L===r.TEXTURE_2D||L>=r.TEXTURE_CUBE_MAP_POSITIVE_X&&L<=r.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&r.framebufferTexture2D(r.FRAMEBUFFER,B,L,k.__webglTexture,N),t.bindFramebuffer(r.FRAMEBUFFER,null)}function Z(P,C,F){if(r.bindRenderbuffer(r.RENDERBUFFER,P),C.depthBuffer){let B=C.depthTexture,L=B&&B.isDepthTexture?B.type:null,N=y(C.stencilBuffer,L),w=C.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,D=re(C);ve(C)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,D,N,C.width,C.height):F?r.renderbufferStorageMultisample(r.RENDERBUFFER,D,N,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,N,C.width,C.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,w,r.RENDERBUFFER,P)}else{let B=C.textures;for(let L=0;L<B.length;L++){let N=B[L],w=s.convert(N.format,N.colorSpace),D=s.convert(N.type),G=x(N.internalFormat,w,D,N.colorSpace),te=re(C);F&&ve(C)===!1?r.renderbufferStorageMultisample(r.RENDERBUFFER,te,G,C.width,C.height):ve(C)?o.renderbufferStorageMultisampleEXT(r.RENDERBUFFER,te,G,C.width,C.height):r.renderbufferStorage(r.RENDERBUFFER,G,C.width,C.height)}}r.bindRenderbuffer(r.RENDERBUFFER,null)}function ae(P){let C=n.get(P),F=P.isWebGLCubeRenderTarget===!0;if(C.__boundDepthTexture!==P.depthTexture){let B=P.depthTexture;if(C.__depthDisposeCallback&&C.__depthDisposeCallback(),B){let L=()=>{delete C.__boundDepthTexture,delete C.__depthDisposeCallback,B.removeEventListener("dispose",L)};B.addEventListener("dispose",L),C.__depthDisposeCallback=L}C.__boundDepthTexture=B}if(P.depthTexture&&!C.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");(function(B,L){if(L&&L.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(r.FRAMEBUFFER,B),!L.depthTexture||!L.depthTexture.isDepthTexture)throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let N=n.get(L.depthTexture);N.__renderTarget=L,N.__webglTexture&&L.depthTexture.image.width===L.width&&L.depthTexture.image.height===L.height||(L.depthTexture.image.width=L.width,L.depthTexture.image.height=L.height,L.depthTexture.needsUpdate=!0),O(L.depthTexture,0);let w=N.__webglTexture,D=re(L);if(L.depthTexture.format===ea)ve(L)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,w,0,D):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_ATTACHMENT,r.TEXTURE_2D,w,0);else{if(L.depthTexture.format!==es)throw new Error("Unknown depthTexture format");ve(L)?o.framebufferTexture2DMultisampleEXT(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,w,0,D):r.framebufferTexture2D(r.FRAMEBUFFER,r.DEPTH_STENCIL_ATTACHMENT,r.TEXTURE_2D,w,0)}})(C.__webglFramebuffer,P)}else if(F){C.__webglDepthbuffer=[];for(let B=0;B<6;B++)if(t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer[B]),C.__webglDepthbuffer[B]===void 0)C.__webglDepthbuffer[B]=r.createRenderbuffer(),Z(C.__webglDepthbuffer[B],P,!1);else{let L=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,N=C.__webglDepthbuffer[B];r.bindRenderbuffer(r.RENDERBUFFER,N),r.framebufferRenderbuffer(r.FRAMEBUFFER,L,r.RENDERBUFFER,N)}}else if(t.bindFramebuffer(r.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer===void 0)C.__webglDepthbuffer=r.createRenderbuffer(),Z(C.__webglDepthbuffer,P,!1);else{let B=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,L=C.__webglDepthbuffer;r.bindRenderbuffer(r.RENDERBUFFER,L),r.framebufferRenderbuffer(r.FRAMEBUFFER,B,r.RENDERBUFFER,L)}t.bindFramebuffer(r.FRAMEBUFFER,null)}let pe=[],Q=[];function re(P){return Math.min(i.maxSamples,P.samples)}function ve(P){let C=n.get(P);return P.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function _e(P,C){let F=P.colorSpace,B=P.format,L=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||F!==Zt&&F!==jr&&(Ke.getTransfer(F)===ht?B===zn&&L===Pi||console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),C}function ue(P){return typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement?(c.width=P.naturalWidth||P.width,c.height=P.naturalHeight||P.height):typeof VideoFrame<"u"&&P instanceof VideoFrame?(c.width=P.displayWidth,c.height=P.displayHeight):(c.width=P.width,c.height=P.height),c}this.allocateTextureUnit=function(){let P=R;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),R+=1,P},this.resetTextureUnits=function(){R=0},this.setTexture2D=O,this.setTexture2DArray=function(P,C){let F=n.get(P);P.version>0&&F.__version!==P.version?z(F,P,C):t.bindTexture(r.TEXTURE_2D_ARRAY,F.__webglTexture,r.TEXTURE0+C)},this.setTexture3D=function(P,C){let F=n.get(P);P.version>0&&F.__version!==P.version?z(F,P,C):t.bindTexture(r.TEXTURE_3D,F.__webglTexture,r.TEXTURE0+C)},this.setTextureCube=function(P,C){let F=n.get(P);P.version>0&&F.__version!==P.version?function(B,L,N){if(L.image.length!==6)return;let w=U(B,L),D=L.source;t.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture,r.TEXTURE0+N);let G=n.get(D);if(D.version!==G.__version||w===!0){t.activeTexture(r.TEXTURE0+N);let te=Ke.getPrimaries(Ke.workingColorSpace),k=L.colorSpace===jr?null:Ke.getPrimaries(L.colorSpace),$=L.colorSpace===jr||te===k?r.NONE:r.BROWSER_DEFAULT_WEBGL;r.pixelStorei(r.UNPACK_FLIP_Y_WEBGL,L.flipY),r.pixelStorei(r.UNPACK_PREMULTIPLY_ALPHA_WEBGL,L.premultiplyAlpha),r.pixelStorei(r.UNPACK_ALIGNMENT,L.unpackAlignment),r.pixelStorei(r.UNPACK_COLORSPACE_CONVERSION_WEBGL,$);let J=L.isCompressedTexture||L.image[0].isCompressedTexture,ne=L.image[0]&&L.image[0].isDataTexture,fe=[];for(let xe=0;xe<6;xe++)fe[xe]=J||ne?ne?L.image[xe].image:L.image[xe]:v(L.image[xe],!0,i.maxCubemapSize),fe[xe]=_e(L,fe[xe]);let de=fe[0],be=s.convert(L.format,L.colorSpace),De=s.convert(L.type),et=x(L.internalFormat,be,De,L.colorSpace),je=L.isVideoTexture!==!0,Ee=G.__version===void 0||w===!0,it=D.dataReady,pt,bt=S(L,de);if(I(r.TEXTURE_CUBE_MAP,L),J){je&&Ee&&t.texStorage2D(r.TEXTURE_CUBE_MAP,bt,et,de.width,de.height);for(let xe=0;xe<6;xe++){pt=fe[xe].mipmaps;for(let Ye=0;Ye<pt.length;Ye++){let ut=pt[Ye];L.format!==zn?be!==null?je?it&&t.compressedTexSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ye,0,0,ut.width,ut.height,be,ut.data):t.compressedTexImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ye,et,ut.width,ut.height,0,ut.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):je?it&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ye,0,0,ut.width,ut.height,be,De,ut.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ye,et,ut.width,ut.height,0,be,De,ut.data)}}}else{if(pt=L.mipmaps,je&&Ee){pt.length>0&&bt++;let xe=ue(fe[0]);t.texStorage2D(r.TEXTURE_CUBE_MAP,bt,et,xe.width,xe.height)}for(let xe=0;xe<6;xe++)if(ne){je?it&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,fe[xe].width,fe[xe].height,be,De,fe[xe].data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,et,fe[xe].width,fe[xe].height,0,be,De,fe[xe].data);for(let Ye=0;Ye<pt.length;Ye++){let ut=pt[Ye].image[xe].image;je?it&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ye+1,0,0,ut.width,ut.height,be,De,ut.data):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ye+1,et,ut.width,ut.height,0,be,De,ut.data)}}else{je?it&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,0,0,be,De,fe[xe]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,0,et,be,De,fe[xe]);for(let Ye=0;Ye<pt.length;Ye++){let ut=pt[Ye];je?it&&t.texSubImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ye+1,0,0,be,De,ut.image[xe]):t.texImage2D(r.TEXTURE_CUBE_MAP_POSITIVE_X+xe,Ye+1,et,be,De,ut.image[xe])}}}m(L)&&g(r.TEXTURE_CUBE_MAP),G.__version=D.version,L.onUpdate&&L.onUpdate(L)}B.__version=L.version}(F,P,C):t.bindTexture(r.TEXTURE_CUBE_MAP,F.__webglTexture,r.TEXTURE0+C)},this.rebindTextures=function(P,C,F){let B=n.get(P);C!==void 0&&q(B.__webglFramebuffer,P,P.texture,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,0),F!==void 0&&ae(P)},this.setupRenderTarget=function(P){let C=P.texture,F=n.get(P),B=n.get(C);P.addEventListener("dispose",b);let L=P.textures,N=P.isWebGLCubeRenderTarget===!0,w=L.length>1;if(w||(B.__webglTexture===void 0&&(B.__webglTexture=r.createTexture()),B.__version=C.version,a.memory.textures++),N){F.__webglFramebuffer=[];for(let D=0;D<6;D++)if(C.mipmaps&&C.mipmaps.length>0){F.__webglFramebuffer[D]=[];for(let G=0;G<C.mipmaps.length;G++)F.__webglFramebuffer[D][G]=r.createFramebuffer()}else F.__webglFramebuffer[D]=r.createFramebuffer()}else{if(C.mipmaps&&C.mipmaps.length>0){F.__webglFramebuffer=[];for(let D=0;D<C.mipmaps.length;D++)F.__webglFramebuffer[D]=r.createFramebuffer()}else F.__webglFramebuffer=r.createFramebuffer();if(w)for(let D=0,G=L.length;D<G;D++){let te=n.get(L[D]);te.__webglTexture===void 0&&(te.__webglTexture=r.createTexture(),a.memory.textures++)}if(P.samples>0&&ve(P)===!1){F.__webglMultisampledFramebuffer=r.createFramebuffer(),F.__webglColorRenderbuffer=[],t.bindFramebuffer(r.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let D=0;D<L.length;D++){let G=L[D];F.__webglColorRenderbuffer[D]=r.createRenderbuffer(),r.bindRenderbuffer(r.RENDERBUFFER,F.__webglColorRenderbuffer[D]);let te=s.convert(G.format,G.colorSpace),k=s.convert(G.type),$=x(G.internalFormat,te,k,G.colorSpace,P.isXRRenderTarget===!0),J=re(P);r.renderbufferStorageMultisample(r.RENDERBUFFER,J,$,P.width,P.height),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+D,r.RENDERBUFFER,F.__webglColorRenderbuffer[D])}r.bindRenderbuffer(r.RENDERBUFFER,null),P.depthBuffer&&(F.__webglDepthRenderbuffer=r.createRenderbuffer(),Z(F.__webglDepthRenderbuffer,P,!0)),t.bindFramebuffer(r.FRAMEBUFFER,null)}}if(N){t.bindTexture(r.TEXTURE_CUBE_MAP,B.__webglTexture),I(r.TEXTURE_CUBE_MAP,C);for(let D=0;D<6;D++)if(C.mipmaps&&C.mipmaps.length>0)for(let G=0;G<C.mipmaps.length;G++)q(F.__webglFramebuffer[D][G],P,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+D,G);else q(F.__webglFramebuffer[D],P,C,r.COLOR_ATTACHMENT0,r.TEXTURE_CUBE_MAP_POSITIVE_X+D,0);m(C)&&g(r.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(w){for(let D=0,G=L.length;D<G;D++){let te=L[D],k=n.get(te);t.bindTexture(r.TEXTURE_2D,k.__webglTexture),I(r.TEXTURE_2D,te),q(F.__webglFramebuffer,P,te,r.COLOR_ATTACHMENT0+D,r.TEXTURE_2D,0),m(te)&&g(r.TEXTURE_2D)}t.unbindTexture()}else{let D=r.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(D=P.isWebGL3DRenderTarget?r.TEXTURE_3D:r.TEXTURE_2D_ARRAY),t.bindTexture(D,B.__webglTexture),I(D,C),C.mipmaps&&C.mipmaps.length>0)for(let G=0;G<C.mipmaps.length;G++)q(F.__webglFramebuffer[G],P,C,r.COLOR_ATTACHMENT0,D,G);else q(F.__webglFramebuffer,P,C,r.COLOR_ATTACHMENT0,D,0);m(C)&&g(D),t.unbindTexture()}P.depthBuffer&&ae(P)},this.updateRenderTargetMipmap=function(P){let C=P.textures;for(let F=0,B=C.length;F<B;F++){let L=C[F];if(m(L)){let N=_(P),w=n.get(L).__webglTexture;t.bindTexture(N,w),g(N),t.unbindTexture()}}},this.updateMultisampleRenderTarget=function(P){if(P.samples>0){if(ve(P)===!1){let C=P.textures,F=P.width,B=P.height,L=r.COLOR_BUFFER_BIT,N=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT,w=n.get(P),D=C.length>1;if(D)for(let G=0;G<C.length;G++)t.bindFramebuffer(r.FRAMEBUFFER,w.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+G,r.RENDERBUFFER,null),t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+G,r.TEXTURE_2D,null,0);t.bindFramebuffer(r.READ_FRAMEBUFFER,w.__webglMultisampledFramebuffer),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,w.__webglFramebuffer);for(let G=0;G<C.length;G++){if(P.resolveDepthBuffer&&(P.depthBuffer&&(L|=r.DEPTH_BUFFER_BIT),P.stencilBuffer&&P.resolveStencilBuffer&&(L|=r.STENCIL_BUFFER_BIT)),D){r.framebufferRenderbuffer(r.READ_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.RENDERBUFFER,w.__webglColorRenderbuffer[G]);let te=n.get(C[G]).__webglTexture;r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0,r.TEXTURE_2D,te,0)}r.blitFramebuffer(0,0,F,B,0,0,F,B,L,r.NEAREST),l===!0&&(pe.length=0,Q.length=0,pe.push(r.COLOR_ATTACHMENT0+G),P.depthBuffer&&P.resolveDepthBuffer===!1&&(pe.push(N),Q.push(N),r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,Q)),r.invalidateFramebuffer(r.READ_FRAMEBUFFER,pe))}if(t.bindFramebuffer(r.READ_FRAMEBUFFER,null),t.bindFramebuffer(r.DRAW_FRAMEBUFFER,null),D)for(let G=0;G<C.length;G++){t.bindFramebuffer(r.FRAMEBUFFER,w.__webglMultisampledFramebuffer),r.framebufferRenderbuffer(r.FRAMEBUFFER,r.COLOR_ATTACHMENT0+G,r.RENDERBUFFER,w.__webglColorRenderbuffer[G]);let te=n.get(C[G]).__webglTexture;t.bindFramebuffer(r.FRAMEBUFFER,w.__webglFramebuffer),r.framebufferTexture2D(r.DRAW_FRAMEBUFFER,r.COLOR_ATTACHMENT0+G,r.TEXTURE_2D,te,0)}t.bindFramebuffer(r.DRAW_FRAMEBUFFER,w.__webglMultisampledFramebuffer)}else if(P.depthBuffer&&P.resolveDepthBuffer===!1&&l){let C=P.stencilBuffer?r.DEPTH_STENCIL_ATTACHMENT:r.DEPTH_ATTACHMENT;r.invalidateFramebuffer(r.DRAW_FRAMEBUFFER,[C])}}},this.setupDepthRenderbuffer=ae,this.setupFrameBufferTexture=q,this.useMultisampledRTT=ve}function Kg(r,e){return{convert:function(t,n=""){let i,s=Ke.getTransfer(n);if(t===Pi)return r.UNSIGNED_BYTE;if(t===Gh)return r.UNSIGNED_SHORT_4_4_4_4;if(t===Vh)return r.UNSIGNED_SHORT_5_5_5_1;if(t===tf)return r.UNSIGNED_INT_5_9_9_9_REV;if(t===Qp)return r.BYTE;if(t===ef)return r.SHORT;if(t===Qs)return r.UNSIGNED_SHORT;if(t===kh)return r.INT;if(t===cr)return r.UNSIGNED_INT;if(t===Hn)return r.FLOAT;if(t===_a)return r.HALF_FLOAT;if(t===nf)return r.ALPHA;if(t===rf)return r.RGB;if(t===zn)return r.RGBA;if(t===sf)return r.LUMINANCE;if(t===af)return r.LUMINANCE_ALPHA;if(t===ea)return r.DEPTH_COMPONENT;if(t===es)return r.DEPTH_STENCIL;if(t===mi)return r.RED;if(t===Wh)return r.RED_INTEGER;if(t===of)return r.RG;if(t===jh)return r.RG_INTEGER;if(t===Xh)return r.RGBA_INTEGER;if(t===bo||t===Eo||t===So||t===To)if(s===ht){if(i=e.get("WEBGL_compressed_texture_s3tc_srgb"),i===null)return null;if(t===bo)return i.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(t===Eo)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(t===So)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(t===To)return i.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else{if(i=e.get("WEBGL_compressed_texture_s3tc"),i===null)return null;if(t===bo)return i.COMPRESSED_RGB_S3TC_DXT1_EXT;if(t===Eo)return i.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(t===So)return i.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(t===To)return i.COMPRESSED_RGBA_S3TC_DXT5_EXT}if(t===Sc||t===Tc||t===wc||t===Ac){if(i=e.get("WEBGL_compressed_texture_pvrtc"),i===null)return null;if(t===Sc)return i.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(t===Tc)return i.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(t===wc)return i.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(t===Ac)return i.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}if(t===Rc||t===Cc||t===Ic){if(i=e.get("WEBGL_compressed_texture_etc"),i===null)return null;if(t===Rc||t===Cc)return s===ht?i.COMPRESSED_SRGB8_ETC2:i.COMPRESSED_RGB8_ETC2;if(t===Ic)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:i.COMPRESSED_RGBA8_ETC2_EAC}if(t===Pc||t===Lc||t===Dc||t===Uc||t===Nc||t===Oc||t===Bc||t===Fc||t===Hc||t===zc||t===kc||t===Gc||t===Vc||t===Wc){if(i=e.get("WEBGL_compressed_texture_astc"),i===null)return null;if(t===Pc)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:i.COMPRESSED_RGBA_ASTC_4x4_KHR;if(t===Lc)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:i.COMPRESSED_RGBA_ASTC_5x4_KHR;if(t===Dc)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:i.COMPRESSED_RGBA_ASTC_5x5_KHR;if(t===Uc)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:i.COMPRESSED_RGBA_ASTC_6x5_KHR;if(t===Nc)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:i.COMPRESSED_RGBA_ASTC_6x6_KHR;if(t===Oc)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:i.COMPRESSED_RGBA_ASTC_8x5_KHR;if(t===Bc)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:i.COMPRESSED_RGBA_ASTC_8x6_KHR;if(t===Fc)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:i.COMPRESSED_RGBA_ASTC_8x8_KHR;if(t===Hc)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:i.COMPRESSED_RGBA_ASTC_10x5_KHR;if(t===zc)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:i.COMPRESSED_RGBA_ASTC_10x6_KHR;if(t===kc)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:i.COMPRESSED_RGBA_ASTC_10x8_KHR;if(t===Gc)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:i.COMPRESSED_RGBA_ASTC_10x10_KHR;if(t===Vc)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:i.COMPRESSED_RGBA_ASTC_12x10_KHR;if(t===Wc)return s===ht?i.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:i.COMPRESSED_RGBA_ASTC_12x12_KHR}if(t===wo||t===jc||t===Xc){if(i=e.get("EXT_texture_compression_bptc"),i===null)return null;if(t===wo)return s===ht?i.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:i.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(t===jc)return i.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(t===Xc)return i.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}if(t===lf||t===qc||t===Yc||t===Zc){if(i=e.get("EXT_texture_compression_rgtc"),i===null)return null;if(t===wo)return i.COMPRESSED_RED_RGTC1_EXT;if(t===qc)return i.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(t===Yc)return i.COMPRESSED_RED_GREEN_RGTC2_EXT;if(t===Zc)return i.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}return t===Qr?r.UNSIGNED_INT_24_8:r[t]!==void 0?r[t]:null}}}function Qg(r,e){function t(i,s){i.matrixAutoUpdate===!0&&i.updateMatrix(),s.value.copy(i.matrix)}function n(i,s){i.opacity.value=s.opacity,s.color&&i.diffuse.value.copy(s.color),s.emissive&&i.emissive.value.copy(s.emissive).multiplyScalar(s.emissiveIntensity),s.map&&(i.map.value=s.map,t(s.map,i.mapTransform)),s.alphaMap&&(i.alphaMap.value=s.alphaMap,t(s.alphaMap,i.alphaMapTransform)),s.bumpMap&&(i.bumpMap.value=s.bumpMap,t(s.bumpMap,i.bumpMapTransform),i.bumpScale.value=s.bumpScale,s.side===1&&(i.bumpScale.value*=-1)),s.normalMap&&(i.normalMap.value=s.normalMap,t(s.normalMap,i.normalMapTransform),i.normalScale.value.copy(s.normalScale),s.side===1&&i.normalScale.value.negate()),s.displacementMap&&(i.displacementMap.value=s.displacementMap,t(s.displacementMap,i.displacementMapTransform),i.displacementScale.value=s.displacementScale,i.displacementBias.value=s.displacementBias),s.emissiveMap&&(i.emissiveMap.value=s.emissiveMap,t(s.emissiveMap,i.emissiveMapTransform)),s.specularMap&&(i.specularMap.value=s.specularMap,t(s.specularMap,i.specularMapTransform)),s.alphaTest>0&&(i.alphaTest.value=s.alphaTest);let a=e.get(s),o=a.envMap,l=a.envMapRotation;o&&(i.envMap.value=o,rr.copy(l),rr.x*=-1,rr.y*=-1,rr.z*=-1,o.isCubeTexture&&o.isRenderTargetTexture===!1&&(rr.y*=-1,rr.z*=-1),i.envMapRotation.value.setFromMatrix4($g.makeRotationFromEuler(rr)),i.flipEnvMap.value=o.isCubeTexture&&o.isRenderTargetTexture===!1?-1:1,i.reflectivity.value=s.reflectivity,i.ior.value=s.ior,i.refractionRatio.value=s.refractionRatio),s.lightMap&&(i.lightMap.value=s.lightMap,i.lightMapIntensity.value=s.lightMapIntensity,t(s.lightMap,i.lightMapTransform)),s.aoMap&&(i.aoMap.value=s.aoMap,i.aoMapIntensity.value=s.aoMapIntensity,t(s.aoMap,i.aoMapTransform))}return{refreshFogUniforms:function(i,s){s.color.getRGB(i.fogColor.value,df(r)),s.isFog?(i.fogNear.value=s.near,i.fogFar.value=s.far):s.isFogExp2&&(i.fogDensity.value=s.density)},refreshMaterialUniforms:function(i,s,a,o,l){s.isMeshBasicMaterial||s.isMeshLambertMaterial?n(i,s):s.isMeshToonMaterial?(n(i,s),function(c,h){h.gradientMap&&(c.gradientMap.value=h.gradientMap)}(i,s)):s.isMeshPhongMaterial?(n(i,s),function(c,h){c.specular.value.copy(h.specular),c.shininess.value=Math.max(h.shininess,1e-4)}(i,s)):s.isMeshStandardMaterial?(n(i,s),function(c,h){c.metalness.value=h.metalness,h.metalnessMap&&(c.metalnessMap.value=h.metalnessMap,t(h.metalnessMap,c.metalnessMapTransform)),c.roughness.value=h.roughness,h.roughnessMap&&(c.roughnessMap.value=h.roughnessMap,t(h.roughnessMap,c.roughnessMapTransform)),h.envMap&&(c.envMapIntensity.value=h.envMapIntensity)}(i,s),s.isMeshPhysicalMaterial&&function(c,h,u){c.ior.value=h.ior,h.sheen>0&&(c.sheenColor.value.copy(h.sheenColor).multiplyScalar(h.sheen),c.sheenRoughness.value=h.sheenRoughness,h.sheenColorMap&&(c.sheenColorMap.value=h.sheenColorMap,t(h.sheenColorMap,c.sheenColorMapTransform)),h.sheenRoughnessMap&&(c.sheenRoughnessMap.value=h.sheenRoughnessMap,t(h.sheenRoughnessMap,c.sheenRoughnessMapTransform))),h.clearcoat>0&&(c.clearcoat.value=h.clearcoat,c.clearcoatRoughness.value=h.clearcoatRoughness,h.clearcoatMap&&(c.clearcoatMap.value=h.clearcoatMap,t(h.clearcoatMap,c.clearcoatMapTransform)),h.clearcoatRoughnessMap&&(c.clearcoatRoughnessMap.value=h.clearcoatRoughnessMap,t(h.clearcoatRoughnessMap,c.clearcoatRoughnessMapTransform)),h.clearcoatNormalMap&&(c.clearcoatNormalMap.value=h.clearcoatNormalMap,t(h.clearcoatNormalMap,c.clearcoatNormalMapTransform),c.clearcoatNormalScale.value.copy(h.clearcoatNormalScale),h.side===1&&c.clearcoatNormalScale.value.negate())),h.dispersion>0&&(c.dispersion.value=h.dispersion),h.iridescence>0&&(c.iridescence.value=h.iridescence,c.iridescenceIOR.value=h.iridescenceIOR,c.iridescenceThicknessMinimum.value=h.iridescenceThicknessRange[0],c.iridescenceThicknessMaximum.value=h.iridescenceThicknessRange[1],h.iridescenceMap&&(c.iridescenceMap.value=h.iridescenceMap,t(h.iridescenceMap,c.iridescenceMapTransform)),h.iridescenceThicknessMap&&(c.iridescenceThicknessMap.value=h.iridescenceThicknessMap,t(h.iridescenceThicknessMap,c.iridescenceThicknessMapTransform))),h.transmission>0&&(c.transmission.value=h.transmission,c.transmissionSamplerMap.value=u.texture,c.transmissionSamplerSize.value.set(u.width,u.height),h.transmissionMap&&(c.transmissionMap.value=h.transmissionMap,t(h.transmissionMap,c.transmissionMapTransform)),c.thickness.value=h.thickness,h.thicknessMap&&(c.thicknessMap.value=h.thicknessMap,t(h.thicknessMap,c.thicknessMapTransform)),c.attenuationDistance.value=h.attenuationDistance,c.attenuationColor.value.copy(h.attenuationColor)),h.anisotropy>0&&(c.anisotropyVector.value.set(h.anisotropy*Math.cos(h.anisotropyRotation),h.anisotropy*Math.sin(h.anisotropyRotation)),h.anisotropyMap&&(c.anisotropyMap.value=h.anisotropyMap,t(h.anisotropyMap,c.anisotropyMapTransform))),c.specularIntensity.value=h.specularIntensity,c.specularColor.value.copy(h.specularColor),h.specularColorMap&&(c.specularColorMap.value=h.specularColorMap,t(h.specularColorMap,c.specularColorMapTransform)),h.specularIntensityMap&&(c.specularIntensityMap.value=h.specularIntensityMap,t(h.specularIntensityMap,c.specularIntensityMapTransform))}(i,s,l)):s.isMeshMatcapMaterial?(n(i,s),function(c,h){h.matcap&&(c.matcap.value=h.matcap)}(i,s)):s.isMeshDepthMaterial?n(i,s):s.isMeshDistanceMaterial?(n(i,s),function(c,h){let u=e.get(h).light;c.referencePosition.value.setFromMatrixPosition(u.matrixWorld),c.nearDistance.value=u.shadow.camera.near,c.farDistance.value=u.shadow.camera.far}(i,s)):s.isMeshNormalMaterial?n(i,s):s.isLineBasicMaterial?(function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform))}(i,s),s.isLineDashedMaterial&&function(c,h){c.dashSize.value=h.dashSize,c.totalSize.value=h.dashSize+h.gapSize,c.scale.value=h.scale}(i,s)):s.isPointsMaterial?function(c,h,u,d){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.size.value=h.size*u,c.scale.value=.5*d,h.map&&(c.map.value=h.map,t(h.map,c.uvTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)}(i,s,a,o):s.isSpriteMaterial?function(c,h){c.diffuse.value.copy(h.color),c.opacity.value=h.opacity,c.rotation.value=h.rotation,h.map&&(c.map.value=h.map,t(h.map,c.mapTransform)),h.alphaMap&&(c.alphaMap.value=h.alphaMap,t(h.alphaMap,c.alphaMapTransform)),h.alphaTest>0&&(c.alphaTest.value=h.alphaTest)}(i,s):s.isShadowMaterial?(i.color.value.copy(s.color),i.opacity.value=s.opacity):s.isShaderMaterial&&(s.uniformsNeedUpdate=!1)}}}function ev(r,e,t,n){let i={},s={},a=[],o=r.getParameter(r.MAX_UNIFORM_BUFFER_BINDINGS);function l(u,d,p,f){let v=u.value,m=d+"_"+p;if(f[m]===void 0)return f[m]=typeof v=="number"||typeof v=="boolean"?v:v.clone(),!0;{let g=f[m];if(typeof v=="number"||typeof v=="boolean"){if(g!==v)return f[m]=v,!0}else if(g.equals(v)===!1)return g.copy(v),!0}return!1}function c(u){let d={boundary:0,storage:0};return typeof u=="number"||typeof u=="boolean"?(d.boundary=4,d.storage=4):u.isVector2?(d.boundary=8,d.storage=8):u.isVector3||u.isColor?(d.boundary=16,d.storage=12):u.isVector4?(d.boundary=16,d.storage=16):u.isMatrix3?(d.boundary=48,d.storage=48):u.isMatrix4?(d.boundary=64,d.storage=64):u.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",u),d}function h(u){let d=u.target;d.removeEventListener("dispose",h);let p=a.indexOf(d.__bindingPointIndex);a.splice(p,1),r.deleteBuffer(i[d.id]),delete i[d.id],delete s[d.id]}return{bind:function(u,d){let p=d.program;n.uniformBlockBinding(u,p)},update:function(u,d){let p=i[u.id];p===void 0&&(function(m){let g=m.uniforms,_=0,x=16;for(let S=0,M=g.length;S<M;S++){let b=Array.isArray(g[S])?g[S]:[g[S]];for(let T=0,R=b.length;T<R;T++){let O=b[T],V=Array.isArray(O.value)?O.value:[O.value];for(let H=0,X=V.length;H<X;H++){let I=c(V[H]),U=_%x,z=U%I.boundary,q=U+z;_+=z,q!==0&&x-q<I.storage&&(_+=x-q),O.__data=new Float32Array(I.storage/Float32Array.BYTES_PER_ELEMENT),O.__offset=_,_+=I.storage}}}let y=_%x;y>0&&(_+=x-y),m.__size=_,m.__cache={}}(u),p=function(m){let g=function(){for(let S=0;S<o;S++)if(a.indexOf(S)===-1)return a.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}();m.__bindingPointIndex=g;let _=r.createBuffer(),x=m.__size,y=m.usage;return r.bindBuffer(r.UNIFORM_BUFFER,_),r.bufferData(r.UNIFORM_BUFFER,x,y),r.bindBuffer(r.UNIFORM_BUFFER,null),r.bindBufferBase(r.UNIFORM_BUFFER,g,_),_}(u),i[u.id]=p,u.addEventListener("dispose",h));let f=d.program;n.updateUBOMapping(u,f);let v=e.render.frame;s[u.id]!==v&&(function(m){let g=i[m.id],_=m.uniforms,x=m.__cache;r.bindBuffer(r.UNIFORM_BUFFER,g);for(let y=0,S=_.length;y<S;y++){let M=Array.isArray(_[y])?_[y]:[_[y]];for(let b=0,T=M.length;b<T;b++){let R=M[b];if(l(R,y,b,x)===!0){let O=R.__offset,V=Array.isArray(R.value)?R.value:[R.value],H=0;for(let X=0;X<V.length;X++){let I=V[X],U=c(I);typeof I=="number"||typeof I=="boolean"?(R.__data[0]=I,r.bufferSubData(r.UNIFORM_BUFFER,O+H,R.__data)):I.isMatrix3?(R.__data[0]=I.elements[0],R.__data[1]=I.elements[1],R.__data[2]=I.elements[2],R.__data[3]=0,R.__data[4]=I.elements[3],R.__data[5]=I.elements[4],R.__data[6]=I.elements[5],R.__data[7]=0,R.__data[8]=I.elements[6],R.__data[9]=I.elements[7],R.__data[10]=I.elements[8],R.__data[11]=0):(I.toArray(R.__data,H),H+=U.storage/Float32Array.BYTES_PER_ELEMENT)}r.bufferSubData(r.UNIFORM_BUFFER,O,R.__data)}}}r.bindBuffer(r.UNIFORM_BUFFER,null)}(u),s[u.id]=v)},dispose:function(){for(let u in i)r.deleteBuffer(i[u]);a=[],i={},s={}}}}function oo(r,e,t,n,i,s){Vr.subVectors(r,t).addScalar(.5).multiply(n),i!==void 0?(ks.x=s*Vr.x-i*Vr.y,ks.y=i*Vr.x+s*Vr.y):ks.copy(Vr),r.copy(e),r.x+=ks.x,r.y+=ks.y,r.applyMatrix4(_f)}function uo(r,e,t,n,i,s){let a=r.geometry.attributes.position;if(Fo.fromBufferAttribute(a,i),Ho.fromBufferAttribute(a,s),t.distanceSqToSegment(Fo,Ho,uc,Lp)>n)return;uc.applyMatrix4(r.matrixWorld);let o=e.ray.origin.distanceTo(uc);return o<e.near||o>e.far?void 0:{distance:o,point:Lp.clone().applyMatrix4(r.matrixWorld),index:i,face:null,faceIndex:null,barycoord:null,object:r}}function Op(r,e,t,n,i,s,a){let o=mh.distanceSqToPoint(r);if(o<t){let l=new E;mh.closestPointToPoint(r,l),l.applyMatrix4(n);let c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;s.push({distance:c,distanceToRay:Math.sqrt(o),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:a})}}function Yh(){let r=0,e=0,t=0,n=0;function i(s,a,o,l){r=s,e=o,t=-3*s+3*a-2*o-l,n=2*s-2*a+o+l}return{initCatmullRom:function(s,a,o,l,c){i(a,o,c*(o-s),c*(l-a))},initNonuniformCatmullRom:function(s,a,o,l,c,h,u){let d=(a-s)/c-(o-s)/(c+h)+(o-a)/h,p=(o-a)/h-(l-a)/(h+u)+(l-o)/u;d*=h,p*=h,i(a,o,d,p)},calc:function(s){let a=s*s;return r+e*s+t*a+n*(a*s)}}}function Bp(r,e,t,n,i){let s=.5*(n-e),a=.5*(i-t),o=r*r;return(2*t-2*n+s+a)*(r*o)+(-3*t+3*n-2*s-a)*o+s*r+t}function Js(r,e,t,n){return function(i,s){let a=1-i;return a*a*s}(r,e)+function(i,s){return 2*(1-i)*i*s}(r,t)+function(i,s){return i*i*s}(r,n)}function $s(r,e,t,n,i){return function(s,a){let o=1-s;return o*o*o*a}(r,e)+function(s,a){let o=1-s;return 3*o*o*s*a}(r,t)+function(s,a){return 3*(1-s)*s*s*a}(r,n)+function(s,a){return s*s*s*a}(r,i)}function Fp(r,e,t,n,i){let s,a;if(i===function(o,l,c,h){let u=0;for(let d=l,p=c-h;d<c;d+=h)u+=(o[p]-o[d])*(o[d+1]+o[p+1]),p=d;return u}(r,e,t,n)>0)for(s=e;s<t;s+=n)a=Hp(s,r[s],r[s+1],a);else for(s=t-n;s>=e;s-=n)a=Hp(s,r[s],r[s+1],a);return a&&ol(a,a.next)&&(ua(a),a=a.next),a}function _r(r,e){if(!r)return r;e||(e=r);let t,n=r;do if(t=!1,n.steiner||!ol(n,n.next)&&Et(n.prev,n,n.next)!==0)n=n.next;else{if(ua(n),n=e=n.prev,n===n.next)break;t=!0}while(t||n!==e);return e}function ca(r,e,t,n,i,s,a){if(!r)return;!a&&s&&function(h,u,d,p){let f=h;do f.z===0&&(f.z=Mh(f.x,f.y,u,d,p)),f.prevZ=f.prev,f.nextZ=f.next,f=f.next;while(f!==h);f.prevZ.nextZ=null,f.prevZ=null,function(v){let m,g,_,x,y,S,M,b,T=1;do{for(g=v,v=null,y=null,S=0;g;){for(S++,_=g,M=0,m=0;m<T&&(M++,_=_.nextZ,_);m++);for(b=T;M>0||b>0&&_;)M!==0&&(b===0||!_||g.z<=_.z)?(x=g,g=g.nextZ,M--):(x=_,_=_.nextZ,b--),y?y.nextZ=x:v=x,x.prevZ=y,y=x;g=_}y.nextZ=null,T*=2}while(S>1)}(f)}(r,n,i,s);let o,l,c=r;for(;r.prev!==r.next;)if(o=r.prev,l=r.next,s?av(r,n,i,s):sv(r))e.push(o.i/t|0),e.push(r.i/t|0),e.push(l.i/t|0),ua(r),r=l.next,c=l.next;else if((r=l)===c){a?a===1?ca(r=ov(_r(r),e,t),e,t,n,i,s,2):a===2&&lv(r,e,t,n,i,s):ca(_r(r),e,t,n,i,s,1);break}}function sv(r){let e=r.prev,t=r,n=r.next;if(Et(e,t,n)>=0)return!1;let i=e.x,s=t.x,a=n.x,o=e.y,l=t.y,c=n.y,h=i<s?i<a?i:a:s<a?s:a,u=o<l?o<c?o:c:l<c?l:c,d=i>s?i>a?i:a:s>a?s:a,p=o>l?o>c?o:c:l>c?l:c,f=n.next;for(;f!==e;){if(f.x>=h&&f.x<=d&&f.y>=u&&f.y<=p&&qr(i,o,s,l,a,c,f.x,f.y)&&Et(f.prev,f,f.next)>=0)return!1;f=f.next}return!0}function av(r,e,t,n){let i=r.prev,s=r,a=r.next;if(Et(i,s,a)>=0)return!1;let o=i.x,l=s.x,c=a.x,h=i.y,u=s.y,d=a.y,p=o<l?o<c?o:c:l<c?l:c,f=h<u?h<d?h:d:u<d?u:d,v=o>l?o>c?o:c:l>c?l:c,m=h>u?h>d?h:d:u>d?u:d,g=Mh(p,f,e,t,n),_=Mh(v,m,e,t,n),x=r.prevZ,y=r.nextZ;for(;x&&x.z>=g&&y&&y.z<=_;){if(x.x>=p&&x.x<=v&&x.y>=f&&x.y<=m&&x!==i&&x!==a&&qr(o,h,l,u,c,d,x.x,x.y)&&Et(x.prev,x,x.next)>=0||(x=x.prevZ,y.x>=p&&y.x<=v&&y.y>=f&&y.y<=m&&y!==i&&y!==a&&qr(o,h,l,u,c,d,y.x,y.y)&&Et(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;x&&x.z>=g;){if(x.x>=p&&x.x<=v&&x.y>=f&&x.y<=m&&x!==i&&x!==a&&qr(o,h,l,u,c,d,x.x,x.y)&&Et(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;y&&y.z<=_;){if(y.x>=p&&y.x<=v&&y.y>=f&&y.y<=m&&y!==i&&y!==a&&qr(o,h,l,u,c,d,y.x,y.y)&&Et(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function ov(r,e,t){let n=r;do{let i=n.prev,s=n.next.next;!ol(i,s)&&xf(i,n,n.next,s)&&ha(i,s)&&ha(s,i)&&(e.push(i.i/t|0),e.push(n.i/t|0),e.push(s.i/t|0),ua(n),ua(n.next),n=r=s),n=n.next}while(n!==r);return _r(n)}function lv(r,e,t,n,i,s){let a=r;do{let o=a.next.next;for(;o!==a.prev;){if(a.i!==o.i&&pv(a,o)){let l=yf(a,o);return a=_r(a,a.next),l=_r(l,l.next),ca(a,e,t,n,i,s,0),void ca(l,e,t,n,i,s,0)}o=o.next}a=a.next}while(a!==r)}function cv(r,e){return r.x-e.x}function hv(r,e){let t=function(i,s){let a,o=s,l=-1/0,c=i.x,h=i.y;do{if(h<=o.y&&h>=o.next.y&&o.next.y!==o.y){let m=o.x+(h-o.y)*(o.next.x-o.x)/(o.next.y-o.y);if(m<=c&&m>l&&(l=m,a=o.x<o.next.x?o:o.next,m===c))return a}o=o.next}while(o!==s);if(!a)return null;let u=a,d=a.x,p=a.y,f,v=1/0;o=a;do c>=o.x&&o.x>=d&&c!==o.x&&qr(h<p?c:l,h,d,p,h<p?l:c,h,o.x,o.y)&&(f=Math.abs(h-o.y)/(c-o.x),ha(o,i)&&(f<v||f===v&&(o.x>a.x||o.x===a.x&&uv(a,o)))&&(a=o,v=f)),o=o.next;while(o!==u);return a}(r,e);if(!t)return e;let n=yf(t,r);return _r(n,n.next),_r(t,t.next)}function uv(r,e){return Et(r.prev,r,e.prev)<0&&Et(e.next,r,r.next)<0}function Mh(r,e,t,n,i){return(r=1431655765&((r=858993459&((r=252645135&((r=16711935&((r=(r-t)*i|0)|r<<8))|r<<4))|r<<2))|r<<1))|(e=1431655765&((e=858993459&((e=252645135&((e=16711935&((e=(e-n)*i|0)|e<<8))|e<<4))|e<<2))|e<<1))<<1}function dv(r){let e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function qr(r,e,t,n,i,s,a,o){return(i-a)*(e-o)>=(r-a)*(s-o)&&(r-a)*(n-o)>=(t-a)*(e-o)&&(t-a)*(s-o)>=(i-a)*(n-o)}function pv(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!function(t,n){let i=t;do{if(i.i!==t.i&&i.next.i!==t.i&&i.i!==n.i&&i.next.i!==n.i&&xf(i,i.next,t,n))return!0;i=i.next}while(i!==t);return!1}(r,e)&&(ha(r,e)&&ha(e,r)&&function(t,n){let i=t,s=!1,a=(t.x+n.x)/2,o=(t.y+n.y)/2;do i.y>o!=i.next.y>o&&i.next.y!==i.y&&a<(i.next.x-i.x)*(o-i.y)/(i.next.y-i.y)+i.x&&(s=!s),i=i.next;while(i!==t);return s}(r,e)&&(Et(r.prev,r,e.prev)||Et(r,e.prev,e))||ol(r,e)&&Et(r.prev,r,r.next)>0&&Et(e.prev,e,e.next)>0)}function Et(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function ol(r,e){return r.x===e.x&&r.y===e.y}function xf(r,e,t,n){let i=yo(Et(r,e,t)),s=yo(Et(r,e,n)),a=yo(Et(t,n,r)),o=yo(Et(t,n,e));return i!==s&&a!==o||!(i!==0||!xo(r,t,e))||!(s!==0||!xo(r,n,e))||!(a!==0||!xo(t,r,n))||!(o!==0||!xo(t,e,n))}function xo(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function yo(r){return r>0?1:r<0?-1:0}function ha(r,e){return Et(r.prev,r,r.next)<0?Et(r,e,r.next)>=0&&Et(r,r.prev,e)>=0:Et(r,e,r.prev)<0||Et(r,r.next,e)<0}function yf(r,e){let t=new bh(r.i,r.x,r.y),n=new bh(e.i,e.x,e.y),i=r.next,s=e.prev;return r.next=e,e.prev=r,t.next=i,i.prev=t,n.next=t,t.prev=n,s.next=n,n.prev=s,n}function Hp(r,e,t,n){let i=new bh(r,e,t);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ua(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function bh(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function zp(r){let e=r.length;e>2&&r[e-1].equals(r[0])&&r.pop()}function kp(r,e){for(let t=0;t<e.length;t++)r.push(e[t].x),r.push(e[t].y)}function Gp(r,e,t){let n=`${r.x},${r.y},${r.z}-${e.x},${e.y},${e.z}`,i=`${e.x},${e.y},${e.z}-${r.x},${r.y},${r.z}`;return t.has(n)!==!0&&t.has(i)!==!0&&(t.add(n),t.add(i),!0)}function Mo(r,e,t){return!r||!t&&r.constructor===e?r:typeof e.BYTES_PER_ELEMENT=="number"?new e(r):Array.prototype.slice.call(r)}function mv(r){return ArrayBuffer.isView(r)&&!(r instanceof DataView)}function gv(r){let e=r.length,t=new Array(e);for(let n=0;n!==e;++n)t[n]=n;return t.sort(function(n,i){return r[n]-r[i]}),t}function Vp(r,e,t){let n=r.length,i=new r.constructor(n);for(let s=0,a=0;a!==n;++s){let o=t[s]*e;for(let l=0;l!==e;++l)i[a++]=r[o+l]}return i}function Mf(r,e,t,n){let i=1,s=r[0];for(;s!==void 0&&s[n]===void 0;)s=r[i++];if(s===void 0)return;let a=s[n];if(a!==void 0)if(Array.isArray(a))do a=s[n],a!==void 0&&(e.push(s.time),t.push.apply(t,a)),s=r[i++];while(s!==void 0);else if(a.toArray!==void 0)do a=s[n],a!==void 0&&(e.push(s.time),a.toArray(t,t.length)),s=r[i++];while(s!==void 0);else do a=s[n],a!==void 0&&(e.push(s.time),t.push(a)),s=r[i++];while(s!==void 0)}function vv(r){if(r.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");let e=function(t){switch(t.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return ui;case"vector":case"vector2":case"vector3":case"vector4":return pi;case"color":return Ko;case"quaternion":return di;case"bool":case"boolean":return wi;case"string":return Ai}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+t)}(r.type);if(r.times===void 0){let t=[],n=[];Mf(r.keys,t,n,"value"),r.times=t,r.values=n}return e.parse!==void 0?e.parse(r):new e(r.name,r.times,r.values,r.interpolation)}function qp(){return performance.now()}function Zp(r,e){return r.distance-e.distance}function Fh(r,e,t,n){let i=!0;if(r.layers.test(e.layers)&&r.raycast(e,t)===!1&&(i=!1),i===!0&&n===!0){let s=r.children;for(let a=0,o=s.length;a<o;a++)Fh(s[a],e,t,!0)}}var xc,Kp,Hh,va,wn,ar,Lm,Dm,Um,Nm,Om,Bm,yc,Mc,Fm,Hm,zm,km,Gm,Vm,Wm,jm,Xm,qm,Ym,Zm,Km,Jm,$m,Qm,e0,Jp,Td,t0,$p,Jr,$r,bc,Ec,il,Ii,or,lr,It,zh,Xr,dn,Ys,li,Pi,Qp,ef,Qs,kh,cr,Hn,_a,Gh,Vh,Qr,tf,nf,rf,zn,sf,af,ea,es,mi,Wh,of,jh,Xh,bo,Eo,So,To,Sc,Tc,wc,Ac,Rc,Cc,Ic,Pc,Lc,Dc,Uc,Nc,Oc,Bc,Fc,Hc,zc,kc,Gc,Vc,Wc,wo,jc,Xc,lf,qc,Yc,Zc,ts,ns,Nl,wd,Ad,Rd,cf,rl,xa,jr,st,Zt,sl,ht,Ar,n0,i0,r0,s0,a0,o0,l0,c0,Kc,Cd,is,Ao,Li,jt,Id,Yr,rs,An,ie,Fe,Ol,Pd,Ke,Ld,Dd,Ud,Nd,Od,Rr,$c,u0,Ro,d0,kt,rt,Qc,hi,Co,eh,pn,E,Fl,Bd,Vt,ei,Nn,Ha,Cr,Ir,Pr,yi,Mi,Qi,Us,za,ka,er,p0,Ns,zl,an,ti,kl,Ga,bi,Gl,Va,Vl,hr,we,Lr,On,f0,m0,Ei,Wa,hn,Fd,Hd,kn,na,g0,zd,Dr,ni,ja,Os,v0,_0,kd,Gd,Vd,Wd,x0,Ur,Wl,xt,Bn,ii,jl,ri,Nr,Or,jd,Xl,ql,Yl,Zl,Kl,Jl,oi,uf,Si,Xa,he,Xt,y0,qt,He,F_,Ct,qa,at,Io,Po,Se,b0,yn,Ql,Br,un,Bs,zt,Qe,Xd,tr,Ya,qd,Za,Ka,Ja,ec,$a,Yd,Qa,ce,tt,E0,qn,ia,Ti,Zd,Kd,Ut,Fr,th,Lo,nh,tc,S0,T0,ai,nr,to,as,En,Ge,le,Xn,no,ir,A0,os,Jd,Fs,nc,$d,ic,rc,sc,ac,sr,Hr,Qd,Do,Uo,ff,ip,mf,gf,vf,rp,sp,ap,op,lp,ih,rh,sh,oc,Kr,wg,up,ro,Ig,Pg,Dg,Og,oh,lh,Gg,ch,hh,qg,uh,Ue,Jg,Ks,dh,ph,rr,$g,No,Gn,ls,cs,tn,ur,ra,zr,zs,kr,Gr,Vr,ks,_f,so,Gs,ao,Mp,lc,bp,Oo,H_,z_,Ep,Sp,Tp,tv,wp,lo,cc,Ap,hc,dr,pr,Yn,Rp,nv,hs,fr,Wr,Cp,co,Ip,iv,Vs,Ws,Bo,fh,k_,G_,V_,W_,j_,X_,q_,Y_,Z_,K_,sa,Fo,Ho,Pp,js,ho,uc,Lp,us,Dp,Up,zo,ko,mr,Np,mh,po,fo,ds,fn,Sn,aa,gh,mo,dc,pc,fc,gr,Go,vh,Vo,_h,Wo,jo,Xo,qo,xh,oa,Yo,ps,Tn,We,Pt,vr,la,go,vo,mc,_o,yh,fs,rv,Ci,Eh,fv,Di,da,pa,fa,Le,Sh,Yt,Th,wh,Ah,J_,Ui,rn,Ni,Zo,Oi,Rh,Ch,Ih,bn,wi,Ko,ui,Ph,di,Ai,pi,Jo,Ri,Lh,Zh,fi,si,Dh,ma,Uh,Bi,ms,gs,gc,Wp,jp,ga,Nh,$o,Xp,Xs,vc,Oh,Qo,Bh,Fi,Hi,el,$_,Q_,ex,tl,tx,nx,ix,rx,sx,ax,ox,lx,Kh,_v,_c,xv,yv,Mv,mt,cx,Yp,nl,hx,ux,dx,px,fx,mx,gx,vx,_x,xx,yx,Mx,bx,Ex,Sx,Tx,wx,Zn=sn(()=>{xc="170",Kp=2,Hh=0,va=1,wn=2,ar=100,Lm=101,Dm=102,Um=200,Nm=201,Om=202,Bm=203,yc=204,Mc=205,Fm=206,Hm=207,zm=208,km=209,Gm=210,Vm=211,Wm=212,jm=213,Xm=214,qm=0,Ym=1,Zm=2,Km=3,Jm=4,$m=5,Qm=6,e0=7,Jp=4,Td="attached",t0="detached",$p=300,Jr=301,$r=302,bc=303,Ec=304,il=306,Ii=1e3,or=1001,lr=1002,It=1003,zh=1004,Xr=1005,dn=1006,Ys=1007,li=1008,Pi=1009,Qp=1010,ef=1011,Qs=1012,kh=1013,cr=1014,Hn=1015,_a=1016,Gh=1017,Vh=1018,Qr=1020,tf=35902,nf=1021,rf=1022,zn=1023,sf=1024,af=1025,ea=1026,es=1027,mi=1028,Wh=1029,of=1030,jh=1031,Xh=1033,bo=33776,Eo=33777,So=33778,To=33779,Sc=35840,Tc=35841,wc=35842,Ac=35843,Rc=36196,Cc=37492,Ic=37496,Pc=37808,Lc=37809,Dc=37810,Uc=37811,Nc=37812,Oc=37813,Bc=37814,Fc=37815,Hc=37816,zc=37817,kc=37818,Gc=37819,Vc=37820,Wc=37821,wo=36492,jc=36494,Xc=36495,lf=36283,qc=36284,Yc=36285,Zc=36286,ts=2300,ns=2301,Nl=2302,wd=2400,Ad=2401,Rd=2402,cf=0,rl=1,xa=2,jr="",st="srgb",Zt="srgb-linear",sl="linear",ht="srgb",Ar=7680,n0=512,i0=513,r0=514,s0=515,a0=516,o0=517,l0=518,c0=519,Kc=35044,Cd="300 es",is=2e3,Ao=2001,Li=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){if(this._listeners===void 0)return!1;let n=this._listeners;return n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){if(this._listeners===void 0)return;let n=this._listeners[e];if(n!==void 0){let i=n.indexOf(t);i!==-1&&n.splice(i,1)}}dispatchEvent(e){if(this._listeners===void 0)return;let t=this._listeners[e.type];if(t!==void 0){e.target=this;let n=t.slice(0);for(let i=0,s=n.length;i<s;i++)n[i].call(this,e);e.target=null}}},jt=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],Id=1234567,Yr=Math.PI/180,rs=180/Math.PI;An={DEG2RAD:Yr,RAD2DEG:rs,generateUUID:Mn,clamp:Dt,euclideanModulo:Jc,mapLinear:function(r,e,t,n,i){return n+(r-e)*(i-n)/(t-e)},inverseLerp:function(r,e,t){return r!==e?(t-r)/(e-r):0},lerp:Zs,damp:function(r,e,t,n){return Zs(r,e,1-Math.exp(-t*n))},pingpong:function(r,e=1){return e-Math.abs(Jc(r,2*e)-e)},smoothstep:function(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e))*r*(3-2*r)},smootherstep:function(r,e,t){return r<=e?0:r>=t?1:(r=(r-e)/(t-e))*r*r*(r*(6*r-15)+10)},randInt:function(r,e){return r+Math.floor(Math.random()*(e-r+1))},randFloat:function(r,e){return r+Math.random()*(e-r)},randFloatSpread:function(r){return r*(.5-Math.random())},seededRandom:function(r){r!==void 0&&(Id=r);let e=Id+=1831565813;return e=Math.imul(e^e>>>15,1|e),e^=e+Math.imul(e^e>>>7,61|e),((e^e>>>14)>>>0)/4294967296},degToRad:function(r){return r*Yr},radToDeg:function(r){return r*rs},isPowerOfTwo:function(r){return!(r&r-1)&&r!==0},ceilPowerOfTwo:function(r){return Math.pow(2,Math.ceil(Math.log(r)/Math.LN2))},floorPowerOfTwo:function(r){return Math.pow(2,Math.floor(Math.log(r)/Math.LN2))},setQuaternionFromProperEuler:function(r,e,t,n,i){let s=Math.cos,a=Math.sin,o=s(t/2),l=a(t/2),c=s((e+n)/2),h=a((e+n)/2),u=s((e-n)/2),d=a((e-n)/2),p=s((n-e)/2),f=a((n-e)/2);switch(i){case"XYX":r.set(o*h,l*u,l*d,o*c);break;case"YZY":r.set(l*d,o*h,l*u,o*c);break;case"ZXZ":r.set(l*u,l*d,o*h,o*c);break;case"XZX":r.set(o*h,l*f,l*p,o*c);break;case"YXY":r.set(l*p,o*h,l*f,o*c);break;case"ZYZ":r.set(l*f,l*p,o*h,o*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}},normalize:lt,denormalize:Fn},ie=class r{constructor(e=0,t=0){r.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let n=Math.cos(t),i=Math.sin(t),s=this.x-e.x,a=this.y-e.y;return this.x=s*n-a*i+e.x,this.y=s*i+a*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}},Fe=class r{constructor(e,t,n,i,s,a,o,l,c){r.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c)}set(e,t,n,i,s,a,o,l,c){let h=this.elements;return h[0]=e,h[1]=i,h[2]=o,h[3]=t,h[4]=s,h[5]=l,h[6]=n,h[7]=a,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[3],l=n[6],c=n[1],h=n[4],u=n[7],d=n[2],p=n[5],f=n[8],v=i[0],m=i[3],g=i[6],_=i[1],x=i[4],y=i[7],S=i[2],M=i[5],b=i[8];return s[0]=a*v+o*_+l*S,s[3]=a*m+o*x+l*M,s[6]=a*g+o*y+l*b,s[1]=c*v+h*_+u*S,s[4]=c*m+h*x+u*M,s[7]=c*g+h*y+u*b,s[2]=d*v+p*_+f*S,s[5]=d*m+p*x+f*M,s[8]=d*g+p*y+f*b,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8];return t*a*h-t*o*c-n*s*h+n*o*l+i*s*c-i*a*l}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=h*a-o*c,d=o*l-h*s,p=c*s-a*l,f=t*u+n*d+i*p;if(f===0)return this.set(0,0,0,0,0,0,0,0,0);let v=1/f;return e[0]=u*v,e[1]=(i*c-h*n)*v,e[2]=(o*n-i*a)*v,e[3]=d*v,e[4]=(h*t-i*l)*v,e[5]=(i*s-o*t)*v,e[6]=p*v,e[7]=(n*l-c*t)*v,e[8]=(a*t-n*s)*v,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,s,a,o){let l=Math.cos(s),c=Math.sin(s);return this.set(n*l,n*c,-n*(l*a+c*o)+a+e,-i*c,i*l,-i*(-c*a+l*o)+o+t,0,0,1),this}scale(e,t){return this.premultiply(Ol.makeScale(e,t)),this}rotate(e){return this.premultiply(Ol.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ol.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Ol=new Fe;Pd={};Ke={enabled:!0,workingColorSpace:Zt,spaces:{},convert:function(r,e,t){return this.enabled!==!1&&e!==t&&e&&t&&(this.spaces[e].transfer===ht&&(r.r=ci(r.r),r.g=ci(r.g),r.b=ci(r.b)),this.spaces[e].primaries!==this.spaces[t].primaries&&(r.applyMatrix3(this.spaces[e].toXYZ),r.applyMatrix3(this.spaces[t].fromXYZ)),this.spaces[t].transfer===ht&&(r.r=Zr(r.r),r.g=Zr(r.g),r.b=Zr(r.b))),r},fromWorkingColorSpace:function(r,e){return this.convert(r,this.workingColorSpace,e)},toWorkingColorSpace:function(r,e){return this.convert(r,e,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===jr?sl:this.spaces[r].transfer},getLuminanceCoefficients:function(r,e=this.workingColorSpace){return r.fromArray(this.spaces[e].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,e,t){return r.copy(this.spaces[e].toXYZ).multiply(this.spaces[t].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace}};Ld=[.64,.33,.3,.6,.15,.06],Dd=[.2126,.7152,.0722],Ud=[.3127,.329],Nd=new Fe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Od=new Fe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);Ke.define({[Zt]:{primaries:Ld,whitePoint:Ud,transfer:sl,toXYZ:Nd,fromXYZ:Od,luminanceCoefficients:Dd,workingColorSpaceConfig:{unpackColorSpace:st},outputColorSpaceConfig:{drawingBufferColorSpace:st}},[st]:{primaries:Ld,whitePoint:Ud,transfer:ht,toXYZ:Nd,fromXYZ:Od,luminanceCoefficients:Dd,outputColorSpaceConfig:{drawingBufferColorSpace:st}}});$c=class{static getDataURL(e){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let t;if(e instanceof HTMLCanvasElement)t=e;else{Rr===void 0&&(Rr=ta("canvas")),Rr.width=e.width,Rr.height=e.height;let n=Rr.getContext("2d");e instanceof ImageData?n.putImageData(e,0,0):n.drawImage(e,0,0,e.width,e.height),t=Rr}return t.width>2048||t.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",e),t.toDataURL("image/jpeg",.6)):t.toDataURL("image/png")}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=ta("canvas");t.width=e.width,t.height=e.height;let n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);let i=n.getImageData(0,0,e.width,e.height),s=i.data;for(let a=0;a<s.length;a++)s[a]=255*ci(s[a]/255);return n.putImageData(i,0,0),t}if(e.data){let t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(255*ci(t[n]/255)):t[n]=ci(t[n]);return{data:t,width:e.width,height:e.height}}return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}},u0=0,Ro=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:u0++}),this.uuid=Mn(),this.data=e,this.dataReady=!0,this.version=0}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let s;if(Array.isArray(i)){s=[];for(let a=0,o=i.length;a<o;a++)i[a].isDataTexture?s.push(Bl(i[a].image)):s.push(Bl(i[a]))}else s=Bl(i);n.url=s}return t||(e.images[this.uuid]=n),n}};d0=0,kt=class r extends Li{constructor(e=r.DEFAULT_IMAGE,t=r.DEFAULT_MAPPING,n=1001,i=1001,s=1006,a=1008,o=1023,l=1009,c=r.DEFAULT_ANISOTROPY,h=""){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:d0++}),this.uuid=Mn(),this.name="",this.source=new Ro(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=s,this.minFilter=a,this.anisotropy=c,this.format=o,this.internalFormat=null,this.type=l,this.offset=new ie(0,0),this.repeat=new ie(1,1),this.center=new ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Fe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==$p)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ii:e.x=e.x-Math.floor(e.x);break;case or:e.x=e.x<0?0:1;break;case lr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x)}if(e.y<0||e.y>1)switch(this.wrapT){case Ii:e.y=e.y-Math.floor(e.y);break;case or:e.y=e.y<0?0:1;break;case lr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y)}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};kt.DEFAULT_IMAGE=null,kt.DEFAULT_MAPPING=$p,kt.DEFAULT_ANISOTROPY=1;rt=class r{constructor(e=0,t=0,n=0,i=1){r.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=this.w,a=e.elements;return this.x=a[0]*t+a[4]*n+a[8]*i+a[12]*s,this.y=a[1]*t+a[5]*n+a[9]*i+a[13]*s,this.z=a[2]*t+a[6]*n+a[10]*i+a[14]*s,this.w=a[3]*t+a[7]*n+a[11]*i+a[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,s,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],p=l[5],f=l[9],v=l[2],m=l[6],g=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(f-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(f+m)<.1&&Math.abs(c+p+g-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let x=(c+1)/2,y=(p+1)/2,S=(g+1)/2,M=(h+d)/4,b=(u+v)/4,T=(f+m)/4;return x>y&&x>S?x<.01?(n=0,i=.707106781,s=.707106781):(n=Math.sqrt(x),i=M/n,s=b/n):y>S?y<.01?(n=.707106781,i=0,s=.707106781):(i=Math.sqrt(y),n=M/i,s=T/i):S<.01?(n=.707106781,i=.707106781,s=0):(s=Math.sqrt(S),n=b/s,i=T/s),this.set(n,i,s,t),this}let _=Math.sqrt((m-f)*(m-f)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(_)<.001&&(_=1),this.x=(m-f)/_,this.y=(u-v)/_,this.z=(d-h)/_,this.w=Math.acos((c+p+g-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this.w=Math.max(e.w,Math.min(t.w,this.w)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this.w=Math.max(e,Math.min(t,this.w)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}},Qc=class extends Li{constructor(e=1,t=1,n={}){super(),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=1,this.scissor=new rt(0,0,e,t),this.scissorTest=!1,this.viewport=new rt(0,0,e,t);let i={width:e,height:t,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:dn,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);let s=new kt(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);s.flipY=!1,s.generateMipmaps=n.generateMipmaps,s.internalFormat=n.internalFormat,this.textures=[];let a=n.count;for(let o=0;o<a;o++)this.textures[o]=s.clone(),this.textures[o].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,s=this.textures.length;i<s;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let n=0,i=e.textures.length;n<i;n++)this.textures[n]=e.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;let t=Object.assign({},e.texture.image);return this.texture.source=new Ro(t),this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}},hi=class extends Qc{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}},Co=class extends kt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=It,this.minFilter=It,this.wrapR=or,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}},eh=class extends kt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=It,this.minFilter=It,this.wrapR=or,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},pn=class{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,s,a,o){let l=n[i+0],c=n[i+1],h=n[i+2],u=n[i+3],d=s[a+0],p=s[a+1],f=s[a+2],v=s[a+3];if(o===0)return e[t+0]=l,e[t+1]=c,e[t+2]=h,void(e[t+3]=u);if(o===1)return e[t+0]=d,e[t+1]=p,e[t+2]=f,void(e[t+3]=v);if(u!==v||l!==d||c!==p||h!==f){let m=1-o,g=l*d+c*p+h*f+u*v,_=g>=0?1:-1,x=1-g*g;if(x>Number.EPSILON){let S=Math.sqrt(x),M=Math.atan2(S,g*_);m=Math.sin(m*M)/S,o=Math.sin(o*M)/S}let y=o*_;if(l=l*m+d*y,c=c*m+p*y,h=h*m+f*y,u=u*m+v*y,m===1-o){let S=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=S,c*=S,h*=S,u*=S}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,n,i,s,a){let o=n[i],l=n[i+1],c=n[i+2],h=n[i+3],u=s[a],d=s[a+1],p=s[a+2],f=s[a+3];return e[t]=o*f+h*u+l*p-c*d,e[t+1]=l*f+h*d+c*u-o*p,e[t+2]=c*f+h*p+o*d-l*u,e[t+3]=h*f-o*u-l*d-c*p,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let n=e._x,i=e._y,s=e._z,a=e._order,o=Math.cos,l=Math.sin,c=o(n/2),h=o(i/2),u=o(s/2),d=l(n/2),p=l(i/2),f=l(s/2);switch(a){case"XYZ":this._x=d*h*u+c*p*f,this._y=c*p*u-d*h*f,this._z=c*h*f+d*p*u,this._w=c*h*u-d*p*f;break;case"YXZ":this._x=d*h*u+c*p*f,this._y=c*p*u-d*h*f,this._z=c*h*f-d*p*u,this._w=c*h*u+d*p*f;break;case"ZXY":this._x=d*h*u-c*p*f,this._y=c*p*u+d*h*f,this._z=c*h*f+d*p*u,this._w=c*h*u-d*p*f;break;case"ZYX":this._x=d*h*u-c*p*f,this._y=c*p*u+d*h*f,this._z=c*h*f-d*p*u,this._w=c*h*u+d*p*f;break;case"YZX":this._x=d*h*u+c*p*f,this._y=c*p*u+d*h*f,this._z=c*h*f-d*p*u,this._w=c*h*u-d*p*f;break;case"XZY":this._x=d*h*u-c*p*f,this._y=c*p*u-d*h*f,this._z=c*h*f+d*p*u,this._w=c*h*u+d*p*f;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+a)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,n=t[0],i=t[4],s=t[8],a=t[1],o=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=n+o+u;if(d>0){let p=.5/Math.sqrt(d+1);this._w=.25/p,this._x=(h-l)*p,this._y=(s-c)*p,this._z=(a-i)*p}else if(n>o&&n>u){let p=2*Math.sqrt(1+n-o-u);this._w=(h-l)/p,this._x=.25*p,this._y=(i+a)/p,this._z=(s+c)/p}else if(o>u){let p=2*Math.sqrt(1+o-n-u);this._w=(s-c)/p,this._x=(i+a)/p,this._y=.25*p,this._z=(l+h)/p}else{let p=2*Math.sqrt(1+u-n-o);this._w=(a-i)/p,this._x=(s+c)/p,this._y=(l+h)/p,this._z=.25*p}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<Number.EPSILON?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Dt(this.dot(e),-1,1)))}rotateTowards(e,t){let n=this.angleTo(e);if(n===0)return this;let i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let n=e._x,i=e._y,s=e._z,a=e._w,o=t._x,l=t._y,c=t._z,h=t._w;return this._x=n*h+a*o+i*c-s*l,this._y=i*h+a*l+s*o-n*c,this._z=s*h+a*c+n*l-i*o,this._w=a*h-n*o-i*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let n=this._x,i=this._y,s=this._z,a=this._w,o=a*e._w+n*e._x+i*e._y+s*e._z;if(o<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,o=-o):this.copy(e),o>=1)return this._w=a,this._x=n,this._y=i,this._z=s,this;let l=1-o*o;if(l<=Number.EPSILON){let p=1-t;return this._w=p*a+t*this._w,this._x=p*n+t*this._x,this._y=p*i+t*this._y,this._z=p*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,o),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=a*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),s=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}},E=class r{constructor(e=0,t=0,n=0){r.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(Bd.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(Bd.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[3]*n+s[6]*i,this.y=s[1]*t+s[4]*n+s[7]*i,this.z=s[2]*t+s[5]*n+s[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,n=this.y,i=this.z,s=e.elements,a=1/(s[3]*t+s[7]*n+s[11]*i+s[15]);return this.x=(s[0]*t+s[4]*n+s[8]*i+s[12])*a,this.y=(s[1]*t+s[5]*n+s[9]*i+s[13])*a,this.z=(s[2]*t+s[6]*n+s[10]*i+s[14])*a,this}applyQuaternion(e){let t=this.x,n=this.y,i=this.z,s=e.x,a=e.y,o=e.z,l=e.w,c=2*(a*i-o*n),h=2*(o*t-s*i),u=2*(s*n-a*t);return this.x=t+l*c+a*u-o*h,this.y=n+l*h+o*c-s*u,this.z=i+l*u+s*h-a*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,n=this.y,i=this.z,s=e.elements;return this.x=s[0]*t+s[4]*n+s[8]*i,this.y=s[1]*t+s[5]*n+s[9]*i,this.z=s[2]*t+s[6]*n+s[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Math.max(e.x,Math.min(t.x,this.x)),this.y=Math.max(e.y,Math.min(t.y,this.y)),this.z=Math.max(e.z,Math.min(t.z,this.z)),this}clampScalar(e,t){return this.x=Math.max(e,Math.min(t,this.x)),this.y=Math.max(e,Math.min(t,this.y)),this.z=Math.max(e,Math.min(t,this.z)),this}clampLength(e,t){let n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(e,Math.min(t,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let n=e.x,i=e.y,s=e.z,a=t.x,o=t.y,l=t.z;return this.x=i*l-s*o,this.y=s*a-n*l,this.z=n*o-i*a,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Fl.copy(this).projectOnVector(e),this.sub(Fl)}reflect(e){return this.sub(Fl.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let n=this.dot(e)/t;return Math.acos(Dt(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){let i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,4*t)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,3*t)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=2*Math.random()-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Fl=new E,Bd=new pn,Vt=class{constructor(e=new E(1/0,1/0,1/0),t=new E(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(Nn.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(Nn.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let n=Nn.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let n=e.geometry;if(n!==void 0){let s=n.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let a=0,o=s.count;a<o;a++)e.isMesh===!0?e.getVertexPosition(a,Nn):Nn.fromBufferAttribute(s,a),Nn.applyMatrix4(e.matrixWorld),this.expandByPoint(Nn);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ha.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ha.copy(n.boundingBox)),Ha.applyMatrix4(e.matrixWorld),this.union(Ha)}let i=e.children;for(let s=0,a=i.length;s<a;s++)this.expandByObject(i[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Nn),Nn.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(Us),za.subVectors(this.max,Us),Cr.subVectors(e.a,Us),Ir.subVectors(e.b,Us),Pr.subVectors(e.c,Us),yi.subVectors(Ir,Cr),Mi.subVectors(Pr,Ir),Qi.subVectors(Cr,Pr);let t=[0,-yi.z,yi.y,0,-Mi.z,Mi.y,0,-Qi.z,Qi.y,yi.z,0,-yi.x,Mi.z,0,-Mi.x,Qi.z,0,-Qi.x,-yi.y,yi.x,0,-Mi.y,Mi.x,0,-Qi.y,Qi.x,0];return!!Hl(t,Cr,Ir,Pr,za)&&(t=[1,0,0,0,1,0,0,0,1],!!Hl(t,Cr,Ir,Pr,za)&&(ka.crossVectors(yi,Mi),t=[ka.x,ka.y,ka.z],Hl(t,Cr,Ir,Pr,za)))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Nn).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=.5*this.getSize(Nn).length()),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()||(ei[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),ei[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),ei[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),ei[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),ei[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),ei[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),ei[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),ei[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(ei)),this}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}},ei=[new E,new E,new E,new E,new E,new E,new E,new E],Nn=new E,Ha=new Vt,Cr=new E,Ir=new E,Pr=new E,yi=new E,Mi=new E,Qi=new E,Us=new E,za=new E,ka=new E,er=new E;p0=new Vt,Ns=new E,zl=new E,an=class{constructor(e=new E,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let n=this.center;t!==void 0?n.copy(t):p0.setFromPoints(e).getCenter(n);let i=0;for(let s=0,a=e.length;s<a;s++)i=Math.max(i,n.distanceToSquared(e[s]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Ns.subVectors(e,this.center);let t=Ns.lengthSq();if(t>this.radius*this.radius){let n=Math.sqrt(t),i=.5*(n-this.radius);this.center.addScaledVector(Ns,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(zl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Ns.copy(e.center).add(zl)),this.expandByPoint(Ns.copy(e.center).sub(zl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}},ti=new E,kl=new E,Ga=new E,bi=new E,Gl=new E,Va=new E,Vl=new E,hr=class{constructor(e=new E,t=new E(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,ti)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=ti.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(ti.copy(this.origin).addScaledVector(this.direction,t),ti.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){kl.copy(e).add(t).multiplyScalar(.5),Ga.copy(t).sub(e).normalize(),bi.copy(this.origin).sub(kl);let s=.5*e.distanceTo(t),a=-this.direction.dot(Ga),o=bi.dot(this.direction),l=-bi.dot(Ga),c=bi.lengthSq(),h=Math.abs(1-a*a),u,d,p,f;if(h>0)if(u=a*l-o,d=a*o-l,f=s*h,u>=0)if(d>=-f)if(d<=f){let v=1/h;u*=v,d*=v,p=u*(u+a*d+2*o)+d*(a*u+d+2*l)+c}else d=s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;else d<=-f?(u=Math.max(0,-(-a*s+o)),d=u>0?-s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c):d<=f?(u=0,d=Math.min(Math.max(-s,-l),s),p=d*(d+2*l)+c):(u=Math.max(0,-(a*s+o)),d=u>0?s:Math.min(Math.max(-s,-l),s),p=-u*u+d*(d+2*l)+c);else d=a>0?-s:s,u=Math.max(0,-(a*d+o)),p=-u*u+d*(d+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(kl).addScaledVector(Ga,d),p}intersectSphere(e,t){ti.subVectors(e.center,this.origin);let n=ti.dot(this.direction),i=ti.dot(ti)-n*n,s=e.radius*e.radius;if(i>s)return null;let a=Math.sqrt(s-i),o=n-a,l=n+a;return l<0?null:o<0?this.at(l,t):this.at(o,t)}intersectsSphere(e){return this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){let n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0?!0:e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,s,a,o,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(n=(e.min.x-d.x)*c,i=(e.max.x-d.x)*c):(n=(e.max.x-d.x)*c,i=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,a=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,a=(e.min.y-d.y)*h),n>a||s>i?null:((s>n||isNaN(n))&&(n=s),(a<i||isNaN(i))&&(i=a),u>=0?(o=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(o=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),n>l||o>i?null:((o>n||n!=n)&&(n=o),(l<i||i!=i)&&(i=l),i<0?null:this.at(n>=0?n:i,t)))}intersectsBox(e){return this.intersectBox(e,ti)!==null}intersectTriangle(e,t,n,i,s){Gl.subVectors(t,e),Va.subVectors(n,e),Vl.crossVectors(Gl,Va);let a,o=this.direction.dot(Vl);if(o>0){if(i)return null;a=1}else{if(!(o<0))return null;a=-1,o=-o}bi.subVectors(this.origin,e);let l=a*this.direction.dot(Va.crossVectors(bi,Va));if(l<0)return null;let c=a*this.direction.dot(Gl.cross(bi));if(c<0||l+c>o)return null;let h=-a*bi.dot(Vl);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}},we=class r{constructor(e,t,n,i,s,a,o,l,c,h,u,d,p,f,v,m){r.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,s,a,o,l,c,h,u,d,p,f,v,m)}set(e,t,n,i,s,a,o,l,c,h,u,d,p,f,v,m){let g=this.elements;return g[0]=e,g[4]=t,g[8]=n,g[12]=i,g[1]=s,g[5]=a,g[9]=o,g[13]=l,g[2]=c,g[6]=h,g[10]=u,g[14]=d,g[3]=p,g[7]=f,g[11]=v,g[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new r().fromArray(this.elements)}copy(e){let t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){let t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,n=e.elements,i=1/Lr.setFromMatrixColumn(e,0).length(),s=1/Lr.setFromMatrixColumn(e,1).length(),a=1/Lr.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*s,t[5]=n[5]*s,t[6]=n[6]*s,t[7]=0,t[8]=n[8]*a,t[9]=n[9]*a,t[10]=n[10]*a,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,n=e.x,i=e.y,s=e.z,a=Math.cos(n),o=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=a*h,p=a*u,f=o*h,v=o*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=p+f*c,t[5]=d-v*c,t[9]=-o*l,t[2]=v-d*c,t[6]=f+p*c,t[10]=a*l}else if(e.order==="YXZ"){let d=l*h,p=l*u,f=c*h,v=c*u;t[0]=d+v*o,t[4]=f*o-p,t[8]=a*c,t[1]=a*u,t[5]=a*h,t[9]=-o,t[2]=p*o-f,t[6]=v+d*o,t[10]=a*l}else if(e.order==="ZXY"){let d=l*h,p=l*u,f=c*h,v=c*u;t[0]=d-v*o,t[4]=-a*u,t[8]=f+p*o,t[1]=p+f*o,t[5]=a*h,t[9]=v-d*o,t[2]=-a*c,t[6]=o,t[10]=a*l}else if(e.order==="ZYX"){let d=a*h,p=a*u,f=o*h,v=o*u;t[0]=l*h,t[4]=f*c-p,t[8]=d*c+v,t[1]=l*u,t[5]=v*c+d,t[9]=p*c-f,t[2]=-c,t[6]=o*l,t[10]=a*l}else if(e.order==="YZX"){let d=a*l,p=a*c,f=o*l,v=o*c;t[0]=l*h,t[4]=v-d*u,t[8]=f*u+p,t[1]=u,t[5]=a*h,t[9]=-o*h,t[2]=-c*h,t[6]=p*u+f,t[10]=d-v*u}else if(e.order==="XZY"){let d=a*l,p=a*c,f=o*l,v=o*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+v,t[5]=a*h,t[9]=p*u-f,t[2]=f*u-p,t[6]=o*h,t[10]=v*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(f0,e,m0)}lookAt(e,t,n){let i=this.elements;return hn.subVectors(e,t),hn.lengthSq()===0&&(hn.z=1),hn.normalize(),Ei.crossVectors(n,hn),Ei.lengthSq()===0&&(Math.abs(n.z)===1?hn.x+=1e-4:hn.z+=1e-4,hn.normalize(),Ei.crossVectors(n,hn)),Ei.normalize(),Wa.crossVectors(hn,Ei),i[0]=Ei.x,i[4]=Wa.x,i[8]=hn.x,i[1]=Ei.y,i[5]=Wa.y,i[9]=hn.y,i[2]=Ei.z,i[6]=Wa.z,i[10]=hn.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let n=e.elements,i=t.elements,s=this.elements,a=n[0],o=n[4],l=n[8],c=n[12],h=n[1],u=n[5],d=n[9],p=n[13],f=n[2],v=n[6],m=n[10],g=n[14],_=n[3],x=n[7],y=n[11],S=n[15],M=i[0],b=i[4],T=i[8],R=i[12],O=i[1],V=i[5],H=i[9],X=i[13],I=i[2],U=i[6],z=i[10],q=i[14],Z=i[3],ae=i[7],pe=i[11],Q=i[15];return s[0]=a*M+o*O+l*I+c*Z,s[4]=a*b+o*V+l*U+c*ae,s[8]=a*T+o*H+l*z+c*pe,s[12]=a*R+o*X+l*q+c*Q,s[1]=h*M+u*O+d*I+p*Z,s[5]=h*b+u*V+d*U+p*ae,s[9]=h*T+u*H+d*z+p*pe,s[13]=h*R+u*X+d*q+p*Q,s[2]=f*M+v*O+m*I+g*Z,s[6]=f*b+v*V+m*U+g*ae,s[10]=f*T+v*H+m*z+g*pe,s[14]=f*R+v*X+m*q+g*Q,s[3]=_*M+x*O+y*I+S*Z,s[7]=_*b+x*V+y*U+S*ae,s[11]=_*T+x*H+y*z+S*pe,s[15]=_*R+x*X+y*q+S*Q,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],n=e[4],i=e[8],s=e[12],a=e[1],o=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],p=e[14];return e[3]*(+s*l*u-i*c*u-s*o*d+n*c*d+i*o*p-n*l*p)+e[7]*(+t*l*p-t*c*d+s*a*d-i*a*p+i*c*h-s*l*h)+e[11]*(+t*c*u-t*o*p-s*a*u+n*a*p+s*o*h-n*c*h)+e[15]*(-i*o*h-t*l*u+t*o*d+i*a*u-n*a*d+n*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){let i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){let e=this.elements,t=e[0],n=e[1],i=e[2],s=e[3],a=e[4],o=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],p=e[11],f=e[12],v=e[13],m=e[14],g=e[15],_=u*m*c-v*d*c+v*l*p-o*m*p-u*l*g+o*d*g,x=f*d*c-h*m*c-f*l*p+a*m*p+h*l*g-a*d*g,y=h*v*c-f*u*c+f*o*p-a*v*p-h*o*g+a*u*g,S=f*u*l-h*v*l-f*o*d+a*v*d+h*o*m-a*u*m,M=t*_+n*x+i*y+s*S;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let b=1/M;return e[0]=_*b,e[1]=(v*d*s-u*m*s-v*i*p+n*m*p+u*i*g-n*d*g)*b,e[2]=(o*m*s-v*l*s+v*i*c-n*m*c-o*i*g+n*l*g)*b,e[3]=(u*l*s-o*d*s-u*i*c+n*d*c+o*i*p-n*l*p)*b,e[4]=x*b,e[5]=(h*m*s-f*d*s+f*i*p-t*m*p-h*i*g+t*d*g)*b,e[6]=(f*l*s-a*m*s-f*i*c+t*m*c+a*i*g-t*l*g)*b,e[7]=(a*d*s-h*l*s+h*i*c-t*d*c-a*i*p+t*l*p)*b,e[8]=y*b,e[9]=(f*u*s-h*v*s-f*n*p+t*v*p+h*n*g-t*u*g)*b,e[10]=(a*v*s-f*o*s+f*n*c-t*v*c-a*n*g+t*o*g)*b,e[11]=(h*o*s-a*u*s-h*n*c+t*u*c+a*n*p-t*o*p)*b,e[12]=S*b,e[13]=(h*v*i-f*u*i+f*n*d-t*v*d-h*n*m+t*u*m)*b,e[14]=(f*o*i-a*v*i-f*n*l+t*v*l+a*n*m-t*o*m)*b,e[15]=(a*u*i-h*o*i+h*n*l-t*u*l-a*n*d+t*o*d)*b,this}scale(e){let t=this.elements,n=e.x,i=e.y,s=e.z;return t[0]*=n,t[4]*=i,t[8]*=s,t[1]*=n,t[5]*=i,t[9]*=s,t[2]*=n,t[6]*=i,t[10]*=s,t[3]*=n,t[7]*=i,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let n=Math.cos(t),i=Math.sin(t),s=1-n,a=e.x,o=e.y,l=e.z,c=s*a,h=s*o;return this.set(c*a+n,c*o-i*l,c*l+i*o,0,c*o+i*l,h*o+n,h*l-i*a,0,c*l-i*o,h*l+i*a,s*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,s,a){return this.set(1,n,s,0,e,1,a,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){let i=this.elements,s=t._x,a=t._y,o=t._z,l=t._w,c=s+s,h=a+a,u=o+o,d=s*c,p=s*h,f=s*u,v=a*h,m=a*u,g=o*u,_=l*c,x=l*h,y=l*u,S=n.x,M=n.y,b=n.z;return i[0]=(1-(v+g))*S,i[1]=(p+y)*S,i[2]=(f-x)*S,i[3]=0,i[4]=(p-y)*M,i[5]=(1-(d+g))*M,i[6]=(m+_)*M,i[7]=0,i[8]=(f+x)*b,i[9]=(m-_)*b,i[10]=(1-(d+v))*b,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){let i=this.elements,s=Lr.set(i[0],i[1],i[2]).length(),a=Lr.set(i[4],i[5],i[6]).length(),o=Lr.set(i[8],i[9],i[10]).length();this.determinant()<0&&(s=-s),e.x=i[12],e.y=i[13],e.z=i[14],On.copy(this);let l=1/s,c=1/a,h=1/o;return On.elements[0]*=l,On.elements[1]*=l,On.elements[2]*=l,On.elements[4]*=c,On.elements[5]*=c,On.elements[6]*=c,On.elements[8]*=h,On.elements[9]*=h,On.elements[10]*=h,t.setFromRotationMatrix(On),n.x=s,n.y=a,n.z=o,this}makePerspective(e,t,n,i,s,a,o=2e3){let l=this.elements,c=2*s/(t-e),h=2*s/(n-i),u=(t+e)/(t-e),d=(n+i)/(n-i),p,f;if(o===is)p=-(a+s)/(a-s),f=-2*a*s/(a-s);else{if(o!==Ao)throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+o);p=-a/(a-s),f=-a*s/(a-s)}return l[0]=c,l[4]=0,l[8]=u,l[12]=0,l[1]=0,l[5]=h,l[9]=d,l[13]=0,l[2]=0,l[6]=0,l[10]=p,l[14]=f,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(e,t,n,i,s,a,o=2e3){let l=this.elements,c=1/(t-e),h=1/(n-i),u=1/(a-s),d=(t+e)*c,p=(n+i)*h,f,v;if(o===is)f=(a+s)*u,v=-2*u;else{if(o!==Ao)throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+o);f=s*u,v=-1*u}return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-d,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-p,l[2]=0,l[6]=0,l[10]=v,l[14]=-f,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(e){let t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){let n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}},Lr=new E,On=new we,f0=new E(0,0,0),m0=new E(1,1,1),Ei=new E,Wa=new E,hn=new E,Fd=new we,Hd=new pn,kn=class r{constructor(e=0,t=0,n=0,i=r.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){let i=e.elements,s=i[0],a=i[4],o=i[8],l=i[1],c=i[5],h=i[9],u=i[2],d=i[6],p=i[10];switch(t){case"XYZ":this._y=Math.asin(Dt(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(-h,p),this._z=Math.atan2(-a,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Dt(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(o,p),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(Dt(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,p),this._z=Math.atan2(-a,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-Dt(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,p),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-a,c));break;case"YZX":this._z=Math.asin(Dt(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(o,p));break;case"XZY":this._z=Math.asin(-Dt(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(o,s)):(this._x=Math.atan2(-h,p),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Fd.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Fd,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Hd.setFromEuler(this),this.setFromQuaternion(Hd,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};kn.DEFAULT_ORDER="XYZ";na=class{constructor(){this.mask=1}set(e){this.mask=1<<e>>>0}enable(e){this.mask|=1<<e}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e}disable(e){this.mask&=~(1<<e)}disableAll(){this.mask=0}test(e){return!!(this.mask&e.mask)}isEnabled(e){return!!(this.mask&1<<e)}},g0=0,zd=new E,Dr=new pn,ni=new we,ja=new E,Os=new E,v0=new E,_0=new pn,kd=new E(1,0,0),Gd=new E(0,1,0),Vd=new E(0,0,1),Wd={type:"added"},x0={type:"removed"},Ur={type:"childadded",child:null},Wl={type:"childremoved",child:null},xt=class r extends Li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:g0++}),this.uuid=Mn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=r.DEFAULT_UP.clone();let e=new E,t=new kn,n=new pn,i=new E(1,1,1);t._onChange(function(){n.setFromEuler(t,!1)}),n._onChange(function(){t.setFromQuaternion(n,void 0,!1)}),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new we},normalMatrix:{value:new Fe}}),this.matrix=new we,this.matrixWorld=new we,this.matrixAutoUpdate=r.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=r.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new na,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Dr.setFromAxisAngle(e,t),this.quaternion.multiply(Dr),this}rotateOnWorldAxis(e,t){return Dr.setFromAxisAngle(e,t),this.quaternion.premultiply(Dr),this}rotateX(e){return this.rotateOnAxis(kd,e)}rotateY(e){return this.rotateOnAxis(Gd,e)}rotateZ(e){return this.rotateOnAxis(Vd,e)}translateOnAxis(e,t){return zd.copy(e).applyQuaternion(this.quaternion),this.position.add(zd.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(kd,e)}translateY(e){return this.translateOnAxis(Gd,e)}translateZ(e){return this.translateOnAxis(Vd,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(ni.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?ja.copy(e):ja.set(e,t,n);let i=this.parent;this.updateWorldMatrix(!0,!1),Os.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?ni.lookAt(Os,ja,this.up):ni.lookAt(ja,Os,this.up),this.quaternion.setFromRotationMatrix(ni),i&&(ni.extractRotation(i.matrixWorld),Dr.setFromRotationMatrix(ni),this.quaternion.premultiply(Dr.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(Wd),Ur.child=e,this.dispatchEvent(Ur),Ur.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(x0),Wl.child=e,this.dispatchEvent(Wl),Wl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),ni.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),ni.multiply(e.parent.matrixWorld)),e.applyMatrix4(ni),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(Wd),Ur.child=e,this.dispatchEvent(Ur),Ur.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){let s=this.children[n].getObjectByProperty(e,t);if(s!==void 0)return s}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,e,v0),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Os,_0,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){let n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let i=this.children;for(let s=0,a=i.length;s<a;s++)i[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});let i={};function s(o,l){return o[l.uuid]===void 0&&(o[l.uuid]=l.toJSON(e)),l.uuid}if(i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(o=>({boxInitialized:o.boxInitialized,boxMin:o.box.min.toArray(),boxMax:o.box.max.toArray(),sphereInitialized:o.sphereInitialized,sphereRadius:o.sphere.radius,sphereCenter:o.sphere.center.toArray()})),i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()})),this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=s(e.geometries,this.geometry);let o=this.geometry.parameters;if(o!==void 0&&o.shapes!==void 0){let l=o.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let o=[];for(let l=0,c=this.material.length;l<c;l++)o.push(s(e.materials,this.material[l]));i.material=o}else i.material=s(e.materials,this.material);if(this.children.length>0){i.children=[];for(let o=0;o<this.children.length;o++)i.children.push(this.children[o].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let o=0;o<this.animations.length;o++){let l=this.animations[o];i.animations.push(s(e.animations,l))}}if(t){let o=a(e.geometries),l=a(e.materials),c=a(e.textures),h=a(e.images),u=a(e.shapes),d=a(e.skeletons),p=a(e.animations),f=a(e.nodes);o.length>0&&(n.geometries=o),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),p.length>0&&(n.animations=p),f.length>0&&(n.nodes=f)}return n.object=i,n;function a(o){let l=[];for(let c in o){let h=o[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){let i=e.children[n];this.add(i.clone())}return this}};xt.DEFAULT_UP=new E(0,1,0),xt.DEFAULT_MATRIX_AUTO_UPDATE=!0,xt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;Bn=new E,ii=new E,jl=new E,ri=new E,Nr=new E,Or=new E,jd=new E,Xl=new E,ql=new E,Yl=new E,Zl=new rt,Kl=new rt,Jl=new rt,oi=class r{constructor(e=new E,t=new E,n=new E){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),Bn.subVectors(e,t),i.cross(Bn);let s=i.lengthSq();return s>0?i.multiplyScalar(1/Math.sqrt(s)):i.set(0,0,0)}static getBarycoord(e,t,n,i,s){Bn.subVectors(i,t),ii.subVectors(n,t),jl.subVectors(e,t);let a=Bn.dot(Bn),o=Bn.dot(ii),l=Bn.dot(jl),c=ii.dot(ii),h=ii.dot(jl),u=a*c-o*o;if(u===0)return s.set(0,0,0),null;let d=1/u,p=(c*l-o*h)*d,f=(a*h-o*l)*d;return s.set(1-p-f,f,p)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,ri)!==null&&ri.x>=0&&ri.y>=0&&ri.x+ri.y<=1}static getInterpolation(e,t,n,i,s,a,o,l){return this.getBarycoord(e,t,n,i,ri)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,ri.x),l.addScaledVector(a,ri.y),l.addScaledVector(o,ri.z),l)}static getInterpolatedAttribute(e,t,n,i,s,a){return Zl.setScalar(0),Kl.setScalar(0),Jl.setScalar(0),Zl.fromBufferAttribute(e,t),Kl.fromBufferAttribute(e,n),Jl.fromBufferAttribute(e,i),a.setScalar(0),a.addScaledVector(Zl,s.x),a.addScaledVector(Kl,s.y),a.addScaledVector(Jl,s.z),a}static isFrontFacing(e,t,n,i){return Bn.subVectors(n,t),ii.subVectors(e,t),Bn.cross(ii).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return Bn.subVectors(this.c,this.b),ii.subVectors(this.a,this.b),.5*Bn.cross(ii).length()}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return r.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return r.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,s){return r.getInterpolation(e,this.a,this.b,this.c,t,n,i,s)}containsPoint(e){return r.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return r.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let n=this.a,i=this.b,s=this.c,a,o;Nr.subVectors(i,n),Or.subVectors(s,n),Xl.subVectors(e,n);let l=Nr.dot(Xl),c=Or.dot(Xl);if(l<=0&&c<=0)return t.copy(n);ql.subVectors(e,i);let h=Nr.dot(ql),u=Or.dot(ql);if(h>=0&&u<=h)return t.copy(i);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return a=l/(l-h),t.copy(n).addScaledVector(Nr,a);Yl.subVectors(e,s);let p=Nr.dot(Yl),f=Or.dot(Yl);if(f>=0&&p<=f)return t.copy(s);let v=p*c-l*f;if(v<=0&&c>=0&&f<=0)return o=c/(c-f),t.copy(n).addScaledVector(Or,o);let m=h*f-p*u;if(m<=0&&u-h>=0&&p-f>=0)return jd.subVectors(s,i),o=(u-h)/(u-h+(p-f)),t.copy(i).addScaledVector(jd,o);let g=1/(m+v+d);return a=v*g,o=d*g,t.copy(n).addScaledVector(Nr,a).addScaledVector(Or,o)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}},uf={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Si={h:0,s:0,l:0},Xa={h:0,s:0,l:0};he=class{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){let i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=st){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,Ke.toWorkingColorSpace(this,t),this}setRGB(e,t,n,i=Ke.workingColorSpace){return this.r=e,this.g=t,this.b=n,Ke.toWorkingColorSpace(this,i),this}setHSL(e,t,n,i=Ke.workingColorSpace){if(e=Jc(e,1),t=Dt(t,0,1),n=Dt(n,0,1),t===0)this.r=this.g=this.b=n;else{let s=n<=.5?n*(1+t):n+t-n*t,a=2*n-s;this.r=$l(a,s,e+1/3),this.g=$l(a,s,e),this.b=$l(a,s,e-1/3)}return Ke.toWorkingColorSpace(this,i),this}setStyle(e,t=st){function n(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,a=i[1],o=i[2];switch(a){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(o))return n(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=i[1],a=s.length;if(a===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(a===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=st){let n=uf[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=ci(e.r),this.g=ci(e.g),this.b=ci(e.b),this}copyLinearToSRGB(e){return this.r=Zr(e.r),this.g=Zr(e.g),this.b=Zr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=st){return Ke.fromWorkingColorSpace(Xt.copy(this),e),65536*Math.round(Dt(255*Xt.r,0,255))+256*Math.round(Dt(255*Xt.g,0,255))+Math.round(Dt(255*Xt.b,0,255))}getHexString(e=st){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Ke.workingColorSpace){Ke.fromWorkingColorSpace(Xt.copy(this),t);let n=Xt.r,i=Xt.g,s=Xt.b,a=Math.max(n,i,s),o=Math.min(n,i,s),l,c,h=(o+a)/2;if(o===a)l=0,c=0;else{let u=a-o;switch(c=h<=.5?u/(a+o):u/(2-a-o),a){case n:l=(i-s)/u+(i<s?6:0);break;case i:l=(s-n)/u+2;break;case s:l=(n-i)/u+4}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=Ke.workingColorSpace){return Ke.fromWorkingColorSpace(Xt.copy(this),t),e.r=Xt.r,e.g=Xt.g,e.b=Xt.b,e}getStyle(e=st){Ke.fromWorkingColorSpace(Xt.copy(this),e);let t=Xt.r,n=Xt.g,i=Xt.b;return e!==st?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(255*t)},${Math.round(255*n)},${Math.round(255*i)})`}offsetHSL(e,t,n){return this.getHSL(Si),this.setHSL(Si.h+e,Si.s+t,Si.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Si),e.getHSL(Xa);let n=Zs(Si.h,Xa.h,t),i=Zs(Si.s,Xa.s,t),s=Zs(Si.l,Xa.l,t);return this.setHSL(n,i,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,n=this.g,i=this.b,s=e.elements;return this.r=s[0]*t+s[3]*n+s[6]*i,this.g=s[1]*t+s[4]*n+s[7]*i,this.b=s[2]*t+s[5]*n+s[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},Xt=new he;he.NAMES=uf;y0=0,qt=class extends Li{static get type(){return"Material"}get type(){return this.constructor.type}set type(e){}constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:y0++}),this.uuid=Mn(),this.name="",this.blending=1,this.side=0,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=yc,this.blendDst=Mc,this.blendEquation=ar,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new he(0,0,0),this.blendAlpha=0,this.depthFunc=3,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=519,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ar,this.stencilZFail=Ar,this.stencilZPass=Ar,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let i=this[t];i!==void 0?i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n:console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`)}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};function i(s){let a=[];for(let o in s){let l=s[o];delete l.metadata,a.push(l)}return a}if(n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==1&&(n.blending=this.blending),this.side!==0&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==yc&&(n.blendSrc=this.blendSrc),this.blendDst!==Mc&&(n.blendDst=this.blendDst),this.blendEquation!==ar&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==3&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==519&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ar&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ar&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ar&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData),t){let s=i(e.textures),a=i(e.images);s.length>0&&(n.textures=s),a.length>0&&(n.images=a)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,n=null;if(t!==null){let i=t.length;n=new Array(i);for(let s=0;s!==i;++s)n[s]=t[s].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}onBuild(){console.warn("Material: onBuild() has been removed.")}},He=class extends qt{static get type(){return"MeshBasicMaterial"}constructor(e){super(),this.isMeshBasicMaterial=!0,this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},F_=M0();Ct=new E,qa=new ie,at=class{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=Kc,this.updateRanges=[],this.gpuType=Hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,s=this.itemSize;i<s;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)qa.fromBufferAttribute(this,t),qa.applyMatrix3(e),this.setXY(t,qa.x,qa.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix3(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyMatrix4(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.applyNormalMatrix(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Ct.fromBufferAttribute(this,t),Ct.transformDirection(e),this.setXYZ(t,Ct.x,Ct.y,Ct.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=Fn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=Fn(t,this.array)),t}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=Fn(t,this.array)),t}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=Fn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=Fn(t,this.array)),t}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),i=lt(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e*=this.itemSize,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),i=lt(i,this.array),s=lt(s,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==Kc&&(e.usage=this.usage),e}},Io=class extends at{constructor(e,t,n){super(new Uint16Array(e),t,n)}},Po=class extends at{constructor(e,t,n){super(new Uint32Array(e),t,n)}},Se=class extends at{constructor(e,t,n){super(new Float32Array(e),t,n)}},b0=0,yn=new we,Ql=new xt,Br=new E,un=new Vt,Bs=new Vt,zt=new E,Qe=class r extends Li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:b0++}),this.uuid=Mn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(hf(e)?Po:Io)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let n=this.attributes.normal;if(n!==void 0){let s=new Fe().getNormalMatrix(e);n.applyNormalMatrix(s),n.needsUpdate=!0}let i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return yn.makeRotationFromQuaternion(e),this.applyMatrix4(yn),this}rotateX(e){return yn.makeRotationX(e),this.applyMatrix4(yn),this}rotateY(e){return yn.makeRotationY(e),this.applyMatrix4(yn),this}rotateZ(e){return yn.makeRotationZ(e),this.applyMatrix4(yn),this}translate(e,t,n){return yn.makeTranslation(e,t,n),this.applyMatrix4(yn),this}scale(e,t,n){return yn.makeScale(e,t,n),this.applyMatrix4(yn),this}lookAt(e){return Ql.lookAt(e),Ql.updateMatrix(),this.applyMatrix4(Ql.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Br).negate(),this.translate(Br.x,Br.y,Br.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let n=[];for(let i=0,s=e.length;i<s;i++){let a=e[i];n.push(a.x,a.y,a.z||0)}this.setAttribute("position",new Se(n,3))}else{for(let n=0,i=t.count;n<i;n++){let s=e[n];t.setXYZ(n,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Vt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),void this.boundingBox.set(new E(-1/0,-1/0,-1/0),new E(1/0,1/0,1/0));if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){let s=t[n];un.setFromBufferAttribute(s),this.morphTargetsRelative?(zt.addVectors(this.boundingBox.min,un.min),this.boundingBox.expandByPoint(zt),zt.addVectors(this.boundingBox.max,un.max),this.boundingBox.expandByPoint(zt)):(this.boundingBox.expandByPoint(un.min),this.boundingBox.expandByPoint(un.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new an);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute)return console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),void this.boundingSphere.set(new E,1/0);if(e){let n=this.boundingSphere.center;if(un.setFromBufferAttribute(e),t)for(let s=0,a=t.length;s<a;s++){let o=t[s];Bs.setFromBufferAttribute(o),this.morphTargetsRelative?(zt.addVectors(un.min,Bs.min),un.expandByPoint(zt),zt.addVectors(un.max,Bs.max),un.expandByPoint(zt)):(un.expandByPoint(Bs.min),un.expandByPoint(Bs.max))}un.getCenter(n);let i=0;for(let s=0,a=e.count;s<a;s++)zt.fromBufferAttribute(e,s),i=Math.max(i,n.distanceToSquared(zt));if(t)for(let s=0,a=t.length;s<a;s++){let o=t[s],l=this.morphTargetsRelative;for(let c=0,h=o.count;c<h;c++)zt.fromBufferAttribute(o,c),l&&(Br.fromBufferAttribute(e,c),zt.add(Br)),i=Math.max(i,n.distanceToSquared(zt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0)return void console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");let n=t.position,i=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new at(new Float32Array(4*n.count),4));let a=this.getAttribute("tangent"),o=[],l=[];for(let T=0;T<n.count;T++)o[T]=new E,l[T]=new E;let c=new E,h=new E,u=new E,d=new ie,p=new ie,f=new ie,v=new E,m=new E;function g(T,R,O){c.fromBufferAttribute(n,T),h.fromBufferAttribute(n,R),u.fromBufferAttribute(n,O),d.fromBufferAttribute(s,T),p.fromBufferAttribute(s,R),f.fromBufferAttribute(s,O),h.sub(c),u.sub(c),p.sub(d),f.sub(d);let V=1/(p.x*f.y-f.x*p.y);isFinite(V)&&(v.copy(h).multiplyScalar(f.y).addScaledVector(u,-p.y).multiplyScalar(V),m.copy(u).multiplyScalar(p.x).addScaledVector(h,-f.x).multiplyScalar(V),o[T].add(v),o[R].add(v),o[O].add(v),l[T].add(m),l[R].add(m),l[O].add(m))}let _=this.groups;_.length===0&&(_=[{start:0,count:e.count}]);for(let T=0,R=_.length;T<R;++T){let O=_[T],V=O.start;for(let H=V,X=V+O.count;H<X;H+=3)g(e.getX(H+0),e.getX(H+1),e.getX(H+2))}let x=new E,y=new E,S=new E,M=new E;function b(T){S.fromBufferAttribute(i,T),M.copy(S);let R=o[T];x.copy(R),x.sub(S.multiplyScalar(S.dot(R))).normalize(),y.crossVectors(M,R);let O=y.dot(l[T])<0?-1:1;a.setXYZW(T,x.x,x.y,x.z,O)}for(let T=0,R=_.length;T<R;++T){let O=_[T],V=O.start;for(let H=V,X=V+O.count;H<X;H+=3)b(e.getX(H+0)),b(e.getX(H+1)),b(e.getX(H+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new at(new Float32Array(3*t.count),3),this.setAttribute("normal",n);else for(let d=0,p=n.count;d<p;d++)n.setXYZ(d,0,0,0);let i=new E,s=new E,a=new E,o=new E,l=new E,c=new E,h=new E,u=new E;if(e)for(let d=0,p=e.count;d<p;d+=3){let f=e.getX(d+0),v=e.getX(d+1),m=e.getX(d+2);i.fromBufferAttribute(t,f),s.fromBufferAttribute(t,v),a.fromBufferAttribute(t,m),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),o.fromBufferAttribute(n,f),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,m),o.add(h),l.add(h),c.add(h),n.setXYZ(f,o.x,o.y,o.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,p=t.count;d<p;d+=3)i.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),a.fromBufferAttribute(t,d+2),h.subVectors(a,s),u.subVectors(i,s),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)zt.fromBufferAttribute(e,t),zt.normalize(),e.setXYZ(t,zt.x,zt.y,zt.z)}toNonIndexed(){function e(o,l){let c=o.array,h=o.itemSize,u=o.normalized,d=new c.constructor(l.length*h),p=0,f=0;for(let v=0,m=l.length;v<m;v++){p=o.isInterleavedBufferAttribute?l[v]*o.data.stride+o.offset:l[v]*h;for(let g=0;g<h;g++)d[f++]=c[p++]}return new at(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new r,n=this.index.array,i=this.attributes;for(let o in i){let l=e(i[o],n);t.setAttribute(o,l)}let s=this.morphAttributes;for(let o in s){let l=[],c=s[o];for(let h=0,u=c.length;h<u;h++){let d=e(c[h],n);l.push(d)}t.morphAttributes[o]=l}t.morphTargetsRelative=this.morphTargetsRelative;let a=this.groups;for(let o=0,l=a.length;o<l;o++){let c=a[o];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let n=this.attributes;for(let l in n){let c=n[l];e.data.attributes[l]=c.toJSON(e.data)}let i={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let p=c[u];h.push(p.toJSON(e.data))}h.length>0&&(i[l]=h,s=!0)}s&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);let a=this.groups;a.length>0&&(e.data.groups=JSON.parse(JSON.stringify(a)));let o=this.boundingSphere;return o!==null&&(e.data.boundingSphere={center:o.center.toArray(),radius:o.radius}),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let n=e.index;n!==null&&this.setIndex(n.clone(t));let i=e.attributes;for(let c in i){let h=i[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,p=u.length;d<p;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let a=e.groups;for(let c=0,h=a.length;c<h;c++){let u=a[c];this.addGroup(u.start,u.count,u.materialIndex)}let o=e.boundingBox;o!==null&&(this.boundingBox=o.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}},Xd=new we,tr=new hr,Ya=new an,qd=new E,Za=new E,Ka=new E,Ja=new E,ec=new E,$a=new E,Yd=new E,Qa=new E,ce=class extends xt{constructor(e=new Qe,t=new He){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}getVertexPosition(e,t){let n=this.geometry,i=n.attributes.position,s=n.morphAttributes.position,a=n.morphTargetsRelative;t.fromBufferAttribute(i,e);let o=this.morphTargetInfluences;if(s&&o){$a.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=o[l],u=s[l];h!==0&&(ec.fromBufferAttribute(u,e),a?$a.addScaledVector(ec,h):$a.addScaledVector(ec.sub(t),h))}t.add($a)}return t}raycast(e,t){let n=this.geometry,i=this.material,s=this.matrixWorld;if(i!==void 0){if(n.boundingSphere===null&&n.computeBoundingSphere(),Ya.copy(n.boundingSphere),Ya.applyMatrix4(s),tr.copy(e.ray).recast(e.near),Ya.containsPoint(tr.origin)===!1&&(tr.intersectSphere(Ya,qd)===null||tr.origin.distanceToSquared(qd)>(e.far-e.near)**2))return;Xd.copy(s).invert(),tr.copy(e.ray).applyMatrix4(Xd),n.boundingBox!==null&&tr.intersectsBox(n.boundingBox)===!1||this._computeIntersections(e,t,tr)}}_computeIntersections(e,t,n){let i,s=this.geometry,a=this.material,o=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,p=s.drawRange;if(o!==null)if(Array.isArray(a))for(let f=0,v=d.length;f<v;f++){let m=d[f],g=a[m.materialIndex];for(let _=Math.max(m.start,p.start),x=Math.min(o.count,Math.min(m.start+m.count,p.start+p.count));_<x;_+=3)i=eo(this,g,e,n,c,h,u,o.getX(_),o.getX(_+1),o.getX(_+2)),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}else for(let f=Math.max(0,p.start),v=Math.min(o.count,p.start+p.count);f<v;f+=3)i=eo(this,a,e,n,c,h,u,o.getX(f),o.getX(f+1),o.getX(f+2)),i&&(i.faceIndex=Math.floor(f/3),t.push(i));else if(l!==void 0)if(Array.isArray(a))for(let f=0,v=d.length;f<v;f++){let m=d[f],g=a[m.materialIndex];for(let _=Math.max(m.start,p.start),x=Math.min(l.count,Math.min(m.start+m.count,p.start+p.count));_<x;_+=3)i=eo(this,g,e,n,c,h,u,_,_+1,_+2),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,t.push(i))}else for(let f=Math.max(0,p.start),v=Math.min(l.count,p.start+p.count);f<v;f+=3)i=eo(this,a,e,n,c,h,u,f,f+1,f+2),i&&(i.faceIndex=Math.floor(f/3),t.push(i))}};tt=class r extends Qe{constructor(e=1,t=1,n=1,i=1,s=1,a=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:s,depthSegments:a};let o=this;i=Math.floor(i),s=Math.floor(s),a=Math.floor(a);let l=[],c=[],h=[],u=[],d=0,p=0;function f(v,m,g,_,x,y,S,M,b,T,R){let O=y/b,V=S/T,H=y/2,X=S/2,I=M/2,U=b+1,z=T+1,q=0,Z=0,ae=new E;for(let pe=0;pe<z;pe++){let Q=pe*V-X;for(let re=0;re<U;re++){let ve=re*O-H;ae[v]=ve*_,ae[m]=Q*x,ae[g]=I,c.push(ae.x,ae.y,ae.z),ae[v]=0,ae[m]=0,ae[g]=M>0?1:-1,h.push(ae.x,ae.y,ae.z),u.push(re/b),u.push(1-pe/T),q+=1}}for(let pe=0;pe<T;pe++)for(let Q=0;Q<b;Q++){let re=d+Q+U*pe,ve=d+Q+U*(pe+1),_e=d+(Q+1)+U*(pe+1),ue=d+(Q+1)+U*pe;l.push(re,ve,ue),l.push(ve,_e,ue),Z+=6}o.addGroup(p,Z,R),p+=Z,d+=q}f("z","y","x",-1,-1,n,t,e,a,s,0),f("z","y","x",1,-1,n,t,-e,a,s,1),f("x","z","y",1,1,e,n,t,i,a,2),f("x","z","y",1,-1,e,n,-t,i,a,3),f("x","y","z",1,-1,e,t,n,i,s,4),f("x","y","z",-1,-1,e,t,-n,i,s,5),this.setIndex(l),this.setAttribute("position",new Se(c,3)),this.setAttribute("normal",new Se(h,3)),this.setAttribute("uv",new Se(u,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};E0={clone:ss,merge:nn},qn=class extends qt{static get type(){return"ShaderMaterial"}constructor(e){super(),this.isShaderMaterial=!0,this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,this.fragmentShader=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=ss(e.uniforms),this.uniformsGroups=function(t){let n=[];for(let i=0;i<t.length;i++)n.push(t[i].clone());return n}(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let i in this.uniforms){let s=this.uniforms[i].value;s&&s.isTexture?t.uniforms[i]={type:"t",value:s.toJSON(e).uuid}:s&&s.isColor?t.uniforms[i]={type:"c",value:s.getHex()}:s&&s.isVector2?t.uniforms[i]={type:"v2",value:s.toArray()}:s&&s.isVector3?t.uniforms[i]={type:"v3",value:s.toArray()}:s&&s.isVector4?t.uniforms[i]={type:"v4",value:s.toArray()}:s&&s.isMatrix3?t.uniforms[i]={type:"m3",value:s.toArray()}:s&&s.isMatrix4?t.uniforms[i]={type:"m4",value:s.toArray()}:t.uniforms[i]={value:s}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let n={};for(let i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}},ia=class extends xt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new we,this.projectionMatrix=new we,this.projectionMatrixInverse=new we,this.coordinateSystem=is}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}},Ti=new E,Zd=new ie,Kd=new ie,Ut=class extends ia{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=2*rs*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(.5*Yr*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return 2*rs*Math.atan(Math.tan(.5*Yr*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){Ti.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z),Ti.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Ti.x,Ti.y).multiplyScalar(-e/Ti.z)}getViewSize(e,t){return this.getViewBounds(e,Zd,Kd),t.subVectors(Kd,Zd)}setViewOffset(e,t,n,i,s,a){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(.5*Yr*this.fov)/this.zoom,n=2*t,i=this.aspect*n,s=-.5*i,a=this.view;if(this.view!==null&&this.view.enabled){let l=a.fullWidth,c=a.fullHeight;s+=a.offsetX*i/l,t-=a.offsetY*n/c,i*=a.width/l,n*=a.height/c}let o=this.filmOffset;o!==0&&(s+=e*o/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+i,t,t-n,e,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}},Fr=-90,th=class extends xt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;let i=new Ut(Fr,1,e,t);i.layers=this.layers,this.add(i);let s=new Ut(Fr,1,e,t);s.layers=this.layers,this.add(s);let a=new Ut(Fr,1,e,t);a.layers=this.layers,this.add(a);let o=new Ut(Fr,1,e,t);o.layers=this.layers,this.add(o);let l=new Ut(Fr,1,e,t);l.layers=this.layers,this.add(l);let c=new Ut(Fr,1,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[n,i,s,a,o,l]=t;for(let c of t)this.remove(c);if(e===is)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),a.up.set(0,0,1),a.lookAt(0,-1,0),o.up.set(0,1,0),o.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else{if(e!==Ao)throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),a.up.set(0,0,-1),a.lookAt(0,-1,0),o.up.set(0,-1,0),o.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1)}for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,a,o,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),p=e.getActiveMipmapLevel(),f=e.xr.enabled;e.xr.enabled=!1;let v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,s),e.setRenderTarget(n,1,i),e.render(t,a),e.setRenderTarget(n,2,i),e.render(t,o),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,h),e.setRenderTarget(u,d,p),e.xr.enabled=f,n.texture.needsPMREMUpdate=!0}},Lo=class extends kt{constructor(e,t,n,i,s,a,o,l,c,h){super(e=e!==void 0?e:[],t=t!==void 0?t:Jr,n,i,s,a,o,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}},nh=class extends hi{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Lo(i,t.mapping,t.wrapS,t.wrapT,t.magFilter,t.minFilter,t.format,t.type,t.anisotropy,t.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=t.generateMipmaps!==void 0&&t.generateMipmaps,this.texture.minFilter=t.minFilter!==void 0?t.minFilter:dn}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new tt(5,5,5),s=new qn({name:"CubemapFromEquirect",uniforms:ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:1,blending:0});s.uniforms.tEquirect.value=t;let a=new ce(i,s),o=t.minFilter;return t.minFilter===li&&(t.minFilter=dn),new th(1,10,this).update(e,a),t.minFilter=o,a.geometry.dispose(),a.material.dispose(),this}clear(e,t,n,i){let s=e.getRenderTarget();for(let a=0;a<6;a++)e.setRenderTarget(this,a),e.clear(t,n,i);e.setRenderTarget(s)}},tc=new E,S0=new E,T0=new Fe,ai=class{constructor(e=new E(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){let i=tc.subVectors(n,t).cross(S0.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let n=e.delta(tc),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/i;return s<0||s>1?null:t.copy(e.start).addScaledVector(n,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let n=t||T0.getNormalMatrix(e),i=this.coplanarPoint(tc).applyMatrix4(e),s=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}},nr=new an,to=new E,as=class{constructor(e=new ai,t=new ai,n=new ai,i=new ai,s=new ai,a=new ai){this.planes=[e,t,n,i,s,a]}set(e,t,n,i,s,a){let o=this.planes;return o[0].copy(e),o[1].copy(t),o[2].copy(n),o[3].copy(i),o[4].copy(s),o[5].copy(a),this}copy(e){let t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=2e3){let n=this.planes,i=e.elements,s=i[0],a=i[1],o=i[2],l=i[3],c=i[4],h=i[5],u=i[6],d=i[7],p=i[8],f=i[9],v=i[10],m=i[11],g=i[12],_=i[13],x=i[14],y=i[15];if(n[0].setComponents(l-s,d-c,m-p,y-g).normalize(),n[1].setComponents(l+s,d+c,m+p,y+g).normalize(),n[2].setComponents(l+a,d+h,m+f,y+_).normalize(),n[3].setComponents(l-a,d-h,m-f,y-_).normalize(),n[4].setComponents(l-o,d-u,m-v,y-x).normalize(),t===is)n[5].setComponents(l+o,d+u,m+v,y+x).normalize();else{if(t!==Ao)throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);n[5].setComponents(o,u,v,x).normalize()}return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),nr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),nr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(nr)}intersectsSprite(e){return nr.center.set(0,0,0),nr.radius=.7071067811865476,nr.applyMatrix4(e.matrixWorld),this.intersectsSphere(nr)}intersectsSphere(e){let t=this.planes,n=e.center,i=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){let t=this.planes;for(let n=0;n<6;n++){let i=t[n];if(to.x=i.normal.x>0?e.max.x:e.min.x,to.y=i.normal.y>0?e.max.y:e.min.y,to.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint(to)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};En=class r extends Qe{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};let s=e/2,a=t/2,o=Math.floor(n),l=Math.floor(i),c=o+1,h=l+1,u=e/o,d=t/l,p=[],f=[],v=[],m=[];for(let g=0;g<h;g++){let _=g*d-a;for(let x=0;x<c;x++){let y=x*u-s;f.push(y,-_,0),v.push(0,0,1),m.push(x/o),m.push(1-g/l)}}for(let g=0;g<l;g++)for(let _=0;_<o;_++){let x=_+c*g,y=_+c*(g+1),S=_+1+c*(g+1),M=_+1+c*g;p.push(x,y,M),p.push(y,S,M)}this.setIndex(p),this.setAttribute("position",new Se(f,3)),this.setAttribute("normal",new Se(v,3)),this.setAttribute("uv",new Se(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.width,e.height,e.widthSegments,e.heightSegments)}},Ge={alphahash_fragment:`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,alphahash_pars_fragment:`#ifdef USE_ALPHAHASH
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
#endif`,alphamap_fragment:`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,alphamap_pars_fragment:`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,alphatest_fragment:`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,alphatest_pars_fragment:`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,aomap_fragment:`#ifdef USE_AOMAP
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
#endif`,aomap_pars_fragment:`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,batching_pars_vertex:`#ifdef USE_BATCHING
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
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,batching_vertex:`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,begin_vertex:`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,beginnormal_vertex:`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,bsdfs:`float G_BlinnPhong_Implicit( ) {
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
} // validated`,iridescence_fragment:`#ifdef USE_IRIDESCENCE
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
#endif`,bumpmap_pars_fragment:`#ifdef USE_BUMPMAP
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
#endif`,clipping_planes_fragment:`#if NUM_CLIPPING_PLANES > 0
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
#endif`,clipping_planes_pars_fragment:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,clipping_planes_pars_vertex:`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,clipping_planes_vertex:`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,color_fragment:`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,color_pars_fragment:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,color_pars_vertex:`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,color_vertex:`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,common:`#define PI 3.141592653589793
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
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
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
} // validated`,cube_uv_reflection_fragment:`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,defaultnormal_vertex:`vec3 transformedNormal = objectNormal;
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
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,displacementmap_pars_vertex:`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,displacementmap_vertex:`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,emissivemap_fragment:`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,emissivemap_pars_fragment:`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,colorspace_fragment:"gl_FragColor = linearToOutputTexel( gl_FragColor );",colorspace_pars_fragment:`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,envmap_fragment:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,envmap_common_pars_fragment:`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,envmap_pars_fragment:`#ifdef USE_ENVMAP
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
#endif`,envmap_pars_vertex:`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,envmap_physical_pars_fragment:`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
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
	#endif
#endif`,envmap_vertex:`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,fog_vertex:`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,fog_pars_vertex:`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,fog_fragment:`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,fog_pars_fragment:`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,gradientmap_pars_fragment:`#ifdef USE_GRADIENTMAP
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
}`,lightmap_pars_fragment:`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,lights_lambert_fragment:`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,lights_lambert_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,lights_pars_begin:`uniform bool receiveShadow;
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
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
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
#endif`,lights_toon_fragment:`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,lights_toon_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,lights_phong_fragment:`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,lights_phong_pars_fragment:`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,lights_physical_fragment:`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
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
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
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
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
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
#endif`,lights_physical_pars_fragment:`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
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
		vec3 iridescenceF0;
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
		float v = 0.5 / ( gv + gl );
		return saturate(v);
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
	vec3 f0 = material.specularColor;
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
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
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
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
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
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
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
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,lights_fragment_begin:`
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
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
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
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
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
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,lights_fragment_maps:`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,lights_fragment_end:`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,logdepthbuf_fragment:`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,logdepthbuf_pars_fragment:`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_pars_vertex:`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,logdepthbuf_vertex:`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,map_fragment:`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,map_pars_fragment:`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,map_particle_fragment:`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,map_particle_pars_fragment:`#if defined( USE_POINTS_UV )
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
#endif`,metalnessmap_fragment:`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,metalnessmap_pars_fragment:`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,morphinstance_vertex:`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,morphcolor_vertex:`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,morphnormal_vertex:`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,morphtarget_pars_vertex:`#ifdef USE_MORPHTARGETS
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
#endif`,morphtarget_vertex:`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,normal_fragment_begin:`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
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
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,normal_fragment_maps:`#ifdef USE_NORMALMAP_OBJECTSPACE
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
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,normal_pars_fragment:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_pars_vertex:`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,normal_vertex:`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,normalmap_pars_fragment:`#ifdef USE_NORMALMAP
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
#endif`,clearcoat_normal_fragment_begin:`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,clearcoat_normal_fragment_maps:`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,clearcoat_pars_fragment:`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,iridescence_pars_fragment:`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,opaque_fragment:`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,packing:`vec3 packNormalToRGB( const in vec3 normal ) {
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
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,premultiplied_alpha_fragment:`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,project_vertex:`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,dithering_fragment:`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,dithering_pars_fragment:`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,roughnessmap_fragment:`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,roughnessmap_pars_fragment:`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,shadowmap_pars_fragment:`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
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
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
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
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
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
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,shadowmap_pars_vertex:`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
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
#endif`,shadowmap_vertex:`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
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
#endif`,shadowmask_pars_fragment:`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
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
	#if NUM_POINT_LIGHT_SHADOWS > 0
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
}`,skinbase_vertex:`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,skinning_pars_vertex:`#ifdef USE_SKINNING
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
#endif`,skinning_vertex:`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,skinnormal_vertex:`#ifdef USE_SKINNING
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
#endif`,specularmap_fragment:`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,specularmap_pars_fragment:`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,tonemapping_fragment:`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,tonemapping_pars_fragment:`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,transmission_fragment:`#ifdef USE_TRANSMISSION
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
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,transmission_pars_fragment:`#ifdef USE_TRANSMISSION
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
#endif`,uv_pars_fragment:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_pars_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,uv_vertex:`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,worldpos_vertex:`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`,background_vert:`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,background_frag:`uniform sampler2D t2D;
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
}`,backgroundCube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,backgroundCube_frag:`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cube_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,cube_frag:`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,depth_vert:`#include <common>
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
}`,depth_frag:`#if DEPTH_PACKING == 3200
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
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,distanceRGBA_vert:`#define DISTANCE
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
}`,distanceRGBA_frag:`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,equirect_vert:`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,equirect_frag:`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,linedashed_vert:`uniform float scale;
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
}`,linedashed_frag:`uniform vec3 diffuse;
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
}`,meshbasic_vert:`#include <common>
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
}`,meshbasic_frag:`uniform vec3 diffuse;
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
}`,meshlambert_vert:`#define LAMBERT
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
}`,meshlambert_frag:`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,meshmatcap_vert:`#define MATCAP
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
}`,meshmatcap_frag:`#define MATCAP
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
}`,meshnormal_vert:`#define NORMAL
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
}`,meshnormal_frag:`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
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
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,meshphong_vert:`#define PHONG
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
}`,meshphong_frag:`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
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
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
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
}`,meshphysical_vert:`#define STANDARD
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
}`,meshphysical_frag:`#define STANDARD
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
#include <packing>
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
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
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
}`,meshtoon_vert:`#define TOON
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
}`,meshtoon_frag:`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
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
}`,points_vert:`uniform float size;
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
}`,points_frag:`uniform vec3 diffuse;
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
}`,shadow_vert:`#include <common>
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
}`,shadow_frag:`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
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
}`,sprite_vert:`uniform float rotation;
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
}`,sprite_frag:`uniform vec3 diffuse;
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
}`},le={common:{diffuse:{value:new he(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Fe}},envmap:{envMap:{value:null},envMapRotation:{value:new Fe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Fe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Fe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Fe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Fe},normalScale:{value:new ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Fe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Fe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Fe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Fe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new he(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new he(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0},uvTransform:{value:new Fe}},sprite:{diffuse:{value:new he(16777215)},opacity:{value:1},center:{value:new ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Fe},alphaMap:{value:null},alphaMapTransform:{value:new Fe},alphaTest:{value:0}}},Xn={basic:{uniforms:nn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.fog]),vertexShader:Ge.meshbasic_vert,fragmentShader:Ge.meshbasic_frag},lambert:{uniforms:nn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new he(0)}}]),vertexShader:Ge.meshlambert_vert,fragmentShader:Ge.meshlambert_frag},phong:{uniforms:nn([le.common,le.specularmap,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.fog,le.lights,{emissive:{value:new he(0)},specular:{value:new he(1118481)},shininess:{value:30}}]),vertexShader:Ge.meshphong_vert,fragmentShader:Ge.meshphong_frag},standard:{uniforms:nn([le.common,le.envmap,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.roughnessmap,le.metalnessmap,le.fog,le.lights,{emissive:{value:new he(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag},toon:{uniforms:nn([le.common,le.aomap,le.lightmap,le.emissivemap,le.bumpmap,le.normalmap,le.displacementmap,le.gradientmap,le.fog,le.lights,{emissive:{value:new he(0)}}]),vertexShader:Ge.meshtoon_vert,fragmentShader:Ge.meshtoon_frag},matcap:{uniforms:nn([le.common,le.bumpmap,le.normalmap,le.displacementmap,le.fog,{matcap:{value:null}}]),vertexShader:Ge.meshmatcap_vert,fragmentShader:Ge.meshmatcap_frag},points:{uniforms:nn([le.points,le.fog]),vertexShader:Ge.points_vert,fragmentShader:Ge.points_frag},dashed:{uniforms:nn([le.common,le.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Ge.linedashed_vert,fragmentShader:Ge.linedashed_frag},depth:{uniforms:nn([le.common,le.displacementmap]),vertexShader:Ge.depth_vert,fragmentShader:Ge.depth_frag},normal:{uniforms:nn([le.common,le.bumpmap,le.normalmap,le.displacementmap,{opacity:{value:1}}]),vertexShader:Ge.meshnormal_vert,fragmentShader:Ge.meshnormal_frag},sprite:{uniforms:nn([le.sprite,le.fog]),vertexShader:Ge.sprite_vert,fragmentShader:Ge.sprite_frag},background:{uniforms:{uvTransform:{value:new Fe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Ge.background_vert,fragmentShader:Ge.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Fe}},vertexShader:Ge.backgroundCube_vert,fragmentShader:Ge.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Ge.cube_vert,fragmentShader:Ge.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Ge.equirect_vert,fragmentShader:Ge.equirect_frag},distanceRGBA:{uniforms:nn([le.common,le.displacementmap,{referencePosition:{value:new E},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Ge.distanceRGBA_vert,fragmentShader:Ge.distanceRGBA_frag},shadow:{uniforms:nn([le.lights,le.fog,{color:{value:new he(0)},opacity:{value:1}}]),vertexShader:Ge.shadow_vert,fragmentShader:Ge.shadow_frag}};Xn.physical={uniforms:nn([Xn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Fe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Fe},clearcoatNormalScale:{value:new ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Fe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Fe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Fe},sheen:{value:0},sheenColor:{value:new he(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Fe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Fe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Fe},transmissionSamplerSize:{value:new ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Fe},attenuationDistance:{value:0},attenuationColor:{value:new he(0)},specularColor:{value:new he(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Fe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Fe},anisotropyVector:{value:new ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Fe}}]),vertexShader:Ge.meshphysical_vert,fragmentShader:Ge.meshphysical_frag};no={r:0,b:0,g:0},ir=new kn,A0=new we;os=class extends ia{constructor(e=-1,t=1,n=1,i=-1,s=.1,a=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=s,this.far=a,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,s,a){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=s,this.view.height=a,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2,s=n-e,a=n+e,o=i+t,l=i-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,a=s+c*this.view.width,o-=h*this.view.offsetY,l=o-h*this.view.height}this.projectionMatrix.makeOrthographic(s,a,o,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}},Jd=[.125,.215,.35,.446,.526,.582],Fs=20,nc=new os,$d=new he,ic=null,rc=0,sc=0,ac=!1,sr=(1+Math.sqrt(5))/2,Hr=1/sr,Qd=[new E(-sr,Hr,0),new E(sr,Hr,0),new E(-Hr,0,sr),new E(Hr,0,sr),new E(0,sr,-Hr),new E(0,sr,Hr),new E(-1,1,-1),new E(1,1,-1),new E(-1,1,1),new E(1,1,1)],Do=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100){ic=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),sc=this._renderer.getActiveMipmapLevel(),ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);let s=this._allocateTargets();return s.depthBuffer=!0,this._sceneToCubeUV(e,n,i,s),t>0&&this._blur(s,0,0,t),this._applyPMREM(s),this._cleanup(s),s}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=np(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=tp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ic,rc,sc),this._renderer.xr.enabled=ac,e.scissorTest=!1,io(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Jr||e.mapping===$r?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ic=this._renderer.getRenderTarget(),rc=this._renderer.getActiveCubeFace(),sc=this._renderer.getActiveMipmapLevel(),ac=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:dn,minFilter:dn,generateMipmaps:!1,type:_a,format:zn,colorSpace:Zt,depthBuffer:!1},i=ep(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=ep(e,t,n);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=function(a){let o=[],l=[],c=[],h=a,u=a-4+1+Jd.length;for(let d=0;d<u;d++){let p=Math.pow(2,h);l.push(p);let f=1/p;d>a-4?f=Jd[d-a+4-1]:d===0&&(f=0),c.push(f);let v=1/(p-2),m=-v,g=1+v,_=[m,m,g,m,g,g,m,m,g,g,m,g],x=6,y=6,S=3,M=2,b=1,T=new Float32Array(S*y*x),R=new Float32Array(M*y*x),O=new Float32Array(b*y*x);for(let H=0;H<x;H++){let X=H%3*2/3-1,I=H>2?0:-1,U=[X,I,0,X+2/3,I,0,X+2/3,I+1,0,X,I,0,X+2/3,I+1,0,X,I+1,0];T.set(U,S*y*H),R.set(_,M*y*H);let z=[H,H,H,H,H,H];O.set(z,b*y*H)}let V=new Qe;V.setAttribute("position",new at(T,S)),V.setAttribute("uv",new at(R,M)),V.setAttribute("faceIndex",new at(O,b)),o.push(V),h>4&&h--}return{lodPlanes:o,sizeLods:l,sigmas:c}}(s)),this._blurMaterial=function(a,o,l){let c=new Float32Array(Fs),h=new E(0,1,0);return new qn({name:"SphericalGaussianBlur",defines:{n:Fs,CUBEUV_TEXEL_WIDTH:1/o,CUBEUV_TEXEL_HEIGHT:1/l,CUBEUV_MAX_MIP:`${a}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:c},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:h}},vertexShader:qh(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:0,depthTest:!1,depthWrite:!1})}(s,e,t)}return i}_compileMaterial(e){let t=new ce(this._lodPlanes[0],e);this._renderer.compile(t,nc)}_sceneToCubeUV(e,t,n,i){let s=new Ut(90,1,t,n),a=[1,-1,1,1,1,1],o=[1,1,1,-1,-1,-1],l=this._renderer,c=l.autoClear,h=l.toneMapping;l.getClearColor($d),l.toneMapping=0,l.autoClear=!1;let u=new He({name:"PMREM.Background",side:1,depthWrite:!1,depthTest:!1}),d=new ce(new tt,u),p=!1,f=e.background;f?f.isColor&&(u.color.copy(f),e.background=null,p=!0):(u.color.copy($d),p=!0);for(let v=0;v<6;v++){let m=v%3;m===0?(s.up.set(0,a[v],0),s.lookAt(o[v],0,0)):m===1?(s.up.set(0,0,a[v]),s.lookAt(0,o[v],0)):(s.up.set(0,a[v],0),s.lookAt(0,0,o[v]));let g=this._cubeSize;io(i,m*g,v>2?g:0,g,g),l.setRenderTarget(i),p&&l.render(d,s),l.render(e,s)}d.geometry.dispose(),d.material.dispose(),l.toneMapping=h,l.autoClear=c,e.background=f}_textureToCubeUV(e,t){let n=this._renderer,i=e.mapping===Jr||e.mapping===$r;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=np()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=tp());let s=i?this._cubemapMaterial:this._equirectMaterial,a=new ce(this._lodPlanes[0],s);s.uniforms.envMap.value=e;let o=this._cubeSize;io(t,0,0,3*o,2*o),n.setRenderTarget(t),n.render(a,nc)}_applyPMREM(e){let t=this._renderer,n=t.autoClear;t.autoClear=!1;let i=this._lodPlanes.length;for(let s=1;s<i;s++){let a=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),o=Qd[(i-s-1)%Qd.length];this._blur(e,s-1,s,a,o)}t.autoClear=n}_blur(e,t,n,i,s){let a=this._pingPongRenderTarget;this._halfBlur(e,a,t,n,i,"latitudinal",s),this._halfBlur(a,e,n,n,i,"longitudinal",s)}_halfBlur(e,t,n,i,s,a,o){let l=this._renderer,c=this._blurMaterial;a!=="latitudinal"&&a!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=new ce(this._lodPlanes[i],c),u=c.uniforms,d=this._sizeLods[n]-1,p=isFinite(s)?Math.PI/(2*d):2*Math.PI/39,f=s/p,v=isFinite(s)?1+Math.floor(3*f):Fs;v>Fs&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${v} samples when the maximum is set to 20`);let m=[],g=0;for(let y=0;y<Fs;++y){let S=y/f,M=Math.exp(-S*S/2);m.push(M),y===0?g+=M:y<v&&(g+=2*M)}for(let y=0;y<m.length;y++)m[y]=m[y]/g;u.envMap.value=e.texture,u.samples.value=v,u.weights.value=m,u.latitudinal.value=a==="latitudinal",o&&(u.poleAxis.value=o);let{_lodMax:_}=this;u.dTheta.value=p,u.mipInt.value=_-n;let x=this._sizeLods[i];io(t,3*x*(i>_-4?i-_+4:0),4*(this._cubeSize-x),3*x,2*x),l.setRenderTarget(t),l.render(h,nc)}};Uo=class extends kt{constructor(e,t,n,i,s,a,o,l,c,h=1026){if(h!==ea&&h!==es)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ea&&(n=cr),n===void 0&&h===es&&(n=Qr),super(null,i,s,a,o,l,h,n,c),this.isDepthTexture=!0,this.image={width:e,height:t},this.magFilter=o!==void 0?o:It,this.minFilter=l!==void 0?l:It,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}},ff=new kt,ip=new Uo(1,1),mf=new Co,gf=new eh,vf=new Lo,rp=[],sp=[],ap=new Float32Array(16),op=new Float32Array(9),lp=new Float32Array(4);ih=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=function(i){switch(i){case 5126:return k0;case 35664:return G0;case 35665:return V0;case 35666:return W0;case 35674:return j0;case 35675:return X0;case 35676:return q0;case 5124:case 35670:return Y0;case 35667:case 35671:return Z0;case 35668:case 35672:return K0;case 35669:case 35673:return J0;case 5125:return $0;case 36294:return Q0;case 36295:return eg;case 36296:return tg;case 35678:case 36198:case 36298:case 36306:case 35682:return ng;case 35679:case 36299:case 36307:return ig;case 35680:case 36300:case 36308:case 36293:return rg;case 36289:case 36303:case 36311:case 36292:return sg}}(t.type)}},rh=class{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=function(i){switch(i){case 5126:return ag;case 35664:return og;case 35665:return lg;case 35666:return cg;case 35674:return hg;case 35675:return ug;case 35676:return dg;case 5124:case 35670:return pg;case 35667:case 35671:return fg;case 35668:case 35672:return mg;case 35669:case 35673:return gg;case 5125:return vg;case 36294:return _g;case 36295:return xg;case 36296:return yg;case 35678:case 36198:case 36298:case 36306:case 35682:return Mg;case 35679:case 36299:case 36307:return bg;case 35680:case 36300:case 36308:case 36293:return Eg;case 36289:case 36303:case 36311:case 36292:return Sg}}(t.type)}},sh=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){let i=this.seq;for(let s=0,a=i.length;s!==a;++s){let o=i[s];o.setValue(e,t[o.id],n)}}},oc=/(\w+)(\])?(\[|\.)?/g;Kr=class{constructor(e,t){this.seq=[],this.map={};let n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){let s=e.getActiveUniform(t,i);Tg(s,e.getUniformLocation(t,s.name),this)}}setValue(e,t,n,i){let s=this.map[t];s!==void 0&&s.setValue(e,n,i)}setOptional(e,t,n){let i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let s=0,a=t.length;s!==a;++s){let o=t[s],l=n[o.id];l.needsUpdate!==!1&&o.setValue(e,l.value,i)}}static seqWithValue(e,t){let n=[];for(let i=0,s=e.length;i!==s;++i){let a=e[i];a.id in t&&n.push(a)}return n}};wg=0,up=new Fe;ro=new E;Ig=/^[ \t]*#include +<([\w\d./]+)>/gm;Pg=new Map;Dg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;Og=0,oh=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),s=this._getShaderStage(n),a=this._getShaderCacheForMaterial(e);return a.has(i)===!1&&(a.add(i),i.usedTimes++),a.has(s)===!1&&(a.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){let t=this.shaderCache,n=t.get(e);return n===void 0&&(n=new lh(e),t.set(e,n)),n}},lh=class{constructor(e){this.id=Og++,this.code=e,this.usedTimes=0}};Gg=0;ch=class extends qt{static get type(){return"MeshDepthMaterial"}constructor(e){super(),this.isMeshDepthMaterial=!0,this.depthPacking=3200,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}},hh=class extends qt{static get type(){return"MeshDistanceMaterial"}constructor(e){super(),this.isMeshDistanceMaterial=!0,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};qg={[qm]:1,[Zm]:6,[Jm]:7,[Km]:5,[Ym]:0,[Qm]:2,[e0]:4,[$m]:3};uh=class extends Ut{constructor(e=[]){super(),this.isArrayCamera=!0,this.cameras=e}},Ue=class extends xt{constructor(){super(),this.isGroup=!0,this.type="Group"}},Jg={type:"move"},Ks=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ue,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ue,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new E,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new E),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ue,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new E,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new E),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,s=null,a=null,o=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){a=!0;for(let v of e.hand.values()){let m=t.getJointPose(v,n),g=this._getHandJoint(c,v);m!==null&&(g.matrix.fromArray(m.transform.matrix),g.matrix.decompose(g.position,g.rotation,g.scale),g.matrixWorldNeedsUpdate=!0,g.jointRadius=m.radius),g.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),p=.02,f=.005;c.inputState.pinching&&d>p+f?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=p-f&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,n),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));o!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&s!==null&&(i=s),i!==null&&(o.matrix.fromArray(i.transform.matrix),o.matrix.decompose(o.position,o.rotation,o.scale),o.matrixWorldNeedsUpdate=!0,i.linearVelocity?(o.hasLinearVelocity=!0,o.linearVelocity.copy(i.linearVelocity)):o.hasLinearVelocity=!1,i.angularVelocity?(o.hasAngularVelocity=!0,o.angularVelocity.copy(i.angularVelocity)):o.hasAngularVelocity=!1,this.dispatchEvent(Jg)))}return o!==null&&(o.visible=i!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=a!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let n=new Ue;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}},dh=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t,n){if(this.texture===null){let i=new kt;e.properties.get(i).__webglTexture=t.texture,t.depthNear==n.depthNear&&t.depthFar==n.depthFar||(this.depthNear=t.depthNear,this.depthFar=t.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,n=new qn({vertexShader:`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fragmentShader:`
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

}`,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new ce(new En(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}},ph=class extends Li{constructor(e,t){super();let n=this,i=null,s=1,a=null,o="local-floor",l=1,c=null,h=null,u=null,d=null,p=null,f=null,v=new dh,m=t.getContextAttributes(),g=null,_=null,x=[],y=[],S=new ie,M=null,b=new Ut;b.viewport=new rt;let T=new Ut;T.viewport=new rt;let R=[b,T],O=new uh,V=null,H=null;function X(Q){let re=y.indexOf(Q.inputSource);if(re===-1)return;let ve=x[re];ve!==void 0&&(ve.update(Q.inputSource,Q.frame,c||a),ve.dispatchEvent({type:Q.type,data:Q.inputSource}))}function I(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",I),i.removeEventListener("inputsourceschange",U);for(let Q=0;Q<x.length;Q++){let re=y[Q];re!==null&&(y[Q]=null,x[Q].disconnect(re))}V=null,H=null,v.reset(),e.setRenderTarget(g),p=null,d=null,u=null,i=null,_=null,pe.stop(),n.isPresenting=!1,e.setPixelRatio(M),e.setSize(S.width,S.height,!1),n.dispatchEvent({type:"sessionend"})}function U(Q){for(let re=0;re<Q.removed.length;re++){let ve=Q.removed[re],_e=y.indexOf(ve);_e>=0&&(y[_e]=null,x[_e].disconnect(ve))}for(let re=0;re<Q.added.length;re++){let ve=Q.added[re],_e=y.indexOf(ve);if(_e===-1){for(let P=0;P<x.length;P++){if(P>=y.length){y.push(ve),_e=P;break}if(y[P]===null){y[P]=ve,_e=P;break}}if(_e===-1)break}let ue=x[_e];ue&&ue.connect(ve)}}this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Q){let re=x[Q];return re===void 0&&(re=new Ks,x[Q]=re),re.getTargetRaySpace()},this.getControllerGrip=function(Q){let re=x[Q];return re===void 0&&(re=new Ks,x[Q]=re),re.getGripSpace()},this.getHand=function(Q){let re=x[Q];return re===void 0&&(re=new Ks,x[Q]=re),re.getHandSpace()},this.setFramebufferScaleFactor=function(Q){s=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Q){o=Q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||a},this.setReferenceSpace=function(Q){c=Q},this.getBaseLayer=function(){return d!==null?d:p},this.getBinding=function(){return u},this.getFrame=function(){return f},this.getSession=function(){return i},this.setSession=async function(Q){if(i=Q,i!==null){if(g=e.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",I),i.addEventListener("inputsourceschange",U),m.xrCompatible!==!0&&await t.makeXRCompatible(),M=e.getPixelRatio(),e.getSize(S),i.renderState.layers===void 0){let re={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:s};p=new XRWebGLLayer(i,t,re),i.updateRenderState({baseLayer:p}),e.setPixelRatio(1),e.setSize(p.framebufferWidth,p.framebufferHeight,!1),_=new hi(p.framebufferWidth,p.framebufferHeight,{format:zn,type:Pi,colorSpace:e.outputColorSpace,stencilBuffer:m.stencil})}else{let re=null,ve=null,_e=null;m.depth&&(_e=m.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=m.stencil?es:ea,ve=m.stencil?Qr:cr);let ue={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:s};u=new XRWebGLBinding(i,t),d=u.createProjectionLayer(ue),i.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new hi(d.textureWidth,d.textureHeight,{format:zn,type:Pi,depthTexture:new Uo(d.textureWidth,d.textureHeight,ve,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:m.stencil,colorSpace:e.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,a=await i.requestReferenceSpace(o),pe.setContext(i),pe.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};let z=new E,q=new E;function Z(Q,re){re===null?Q.matrixWorld.copy(Q.matrix):Q.matrixWorld.multiplyMatrices(re.matrixWorld,Q.matrix),Q.matrixWorldInverse.copy(Q.matrixWorld).invert()}this.updateCamera=function(Q){if(i===null)return;let re=Q.near,ve=Q.far;v.texture!==null&&(v.depthNear>0&&(re=v.depthNear),v.depthFar>0&&(ve=v.depthFar)),O.near=T.near=b.near=re,O.far=T.far=b.far=ve,V===O.near&&H===O.far||(i.updateRenderState({depthNear:O.near,depthFar:O.far}),V=O.near,H=O.far),b.layers.mask=2|Q.layers.mask,T.layers.mask=4|Q.layers.mask,O.layers.mask=b.layers.mask|T.layers.mask;let _e=Q.parent,ue=O.cameras;Z(O,_e);for(let P=0;P<ue.length;P++)Z(ue[P],_e);ue.length===2?function(P,C,F){z.setFromMatrixPosition(C.matrixWorld),q.setFromMatrixPosition(F.matrixWorld);let B=z.distanceTo(q),L=C.projectionMatrix.elements,N=F.projectionMatrix.elements,w=L[14]/(L[10]-1),D=L[14]/(L[10]+1),G=(L[9]+1)/L[5],te=(L[9]-1)/L[5],k=(L[8]-1)/L[0],$=(N[8]+1)/N[0],J=w*k,ne=w*$,fe=B/(-k+$),de=fe*-k;if(C.matrixWorld.decompose(P.position,P.quaternion,P.scale),P.translateX(de),P.translateZ(fe),P.matrixWorld.compose(P.position,P.quaternion,P.scale),P.matrixWorldInverse.copy(P.matrixWorld).invert(),L[10]===-1)P.projectionMatrix.copy(C.projectionMatrix),P.projectionMatrixInverse.copy(C.projectionMatrixInverse);else{let be=w+fe,De=D+fe,et=J-de,je=ne+(B-de),Ee=G*D/De*be,it=te*D/De*be;P.projectionMatrix.makePerspective(et,je,Ee,it,be,De),P.projectionMatrixInverse.copy(P.projectionMatrix).invert()}}(O,b,T):O.projectionMatrix.copy(b.projectionMatrix),function(P,C,F){F===null?P.matrix.copy(C.matrixWorld):(P.matrix.copy(F.matrixWorld),P.matrix.invert(),P.matrix.multiply(C.matrixWorld)),P.matrix.decompose(P.position,P.quaternion,P.scale),P.updateMatrixWorld(!0),P.projectionMatrix.copy(C.projectionMatrix),P.projectionMatrixInverse.copy(C.projectionMatrixInverse),P.isPerspectiveCamera&&(P.fov=2*rs*Math.atan(1/P.projectionMatrix.elements[5]),P.zoom=1)}(Q,O,_e)},this.getCamera=function(){return O},this.getFoveation=function(){if(d!==null||p!==null)return l},this.setFoveation=function(Q){l=Q,d!==null&&(d.fixedFoveation=Q),p!==null&&p.fixedFoveation!==void 0&&(p.fixedFoveation=Q)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(O)};let ae=null,pe=new pf;pe.setAnimationLoop(function(Q,re){if(h=re.getViewerPose(c||a),f=re,h!==null){let ve=h.views;p!==null&&(e.setRenderTargetFramebuffer(_,p.framebuffer),e.setRenderTarget(_));let _e=!1;ve.length!==O.cameras.length&&(O.cameras.length=0,_e=!0);for(let P=0;P<ve.length;P++){let C=ve[P],F=null;if(p!==null)F=p.getViewport(C);else{let L=u.getViewSubImage(d,C);F=L.viewport,P===0&&(e.setRenderTargetTextures(_,L.colorTexture,d.ignoreDepthValues?void 0:L.depthStencilTexture),e.setRenderTarget(_))}let B=R[P];B===void 0&&(B=new Ut,B.layers.enable(P),B.viewport=new rt,R[P]=B),B.matrix.fromArray(C.transform.matrix),B.matrix.decompose(B.position,B.quaternion,B.scale),B.projectionMatrix.fromArray(C.projectionMatrix),B.projectionMatrixInverse.copy(B.projectionMatrix).invert(),B.viewport.set(F.x,F.y,F.width,F.height),P===0&&(O.matrix.copy(B.matrix),O.matrix.decompose(O.position,O.quaternion,O.scale)),_e===!0&&O.cameras.push(B)}let ue=i.enabledFeatures;if(ue&&ue.includes("depth-sensing")){let P=u.getDepthInformation(ve[0]);P&&P.isValid&&P.texture&&v.init(e,P,i.renderState)}}for(let ve=0;ve<x.length;ve++){let _e=y[ve],ue=x[ve];_e!==null&&ue!==void 0&&ue.update(_e,re,c||a)}ae&&ae(Q,re),re.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:re}),f=null}),this.setAnimationLoop=function(Q){ae=Q},this.dispose=function(){}}},rr=new kn,$g=new we;No=class{constructor(e={}){let{canvas:t=h0(),context:n=null,depth:i=!0,stencil:s=!1,alpha:a=!1,antialias:o=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reverseDepthBuffer:d=!1}=e,p;if(this.isWebGLRenderer=!0,n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");p=n.getContextAttributes().alpha}else p=a;let f=new Uint32Array(4),v=new Int32Array(4),m=null,g=null,_=[],x=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=st,this.toneMapping=0,this.toneMappingExposure=1;let y=this,S=!1,M=0,b=0,T=null,R=-1,O=null,V=new rt,H=new rt,X=null,I=new he(0),U=0,z=t.width,q=t.height,Z=1,ae=null,pe=null,Q=new rt(0,0,z,q),re=new rt(0,0,z,q),ve=!1,_e=new as,ue=!1,P=!1,C=new we,F=new we,B=new E,L=new rt,N={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},w=!1;function D(){return T===null?Z:1}let G,te,k,$,J,ne,fe,de,be,De,et,je,Ee,it,pt,bt,xe,Ye,ut,Tr,Oa,Pn,Wn,Zi,W=n;function Ps(A,j){return t.getContext(A,j)}try{let A={alpha:!0,depth:i,stencil:s,antialias:o,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${xc}`),t.addEventListener("webglcontextlost",cd,!1),t.addEventListener("webglcontextrestored",hd,!1),t.addEventListener("webglcontextcreationerror",ud,!1),W===null){let j="webgl2";if(W=Ps(j,A),W===null)throw Ps(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(A){throw console.error("THREE.WebGLRenderer: "+A.message),A}function ld(){G=new N0(W),G.init(),Pn=new Kg(W,G),te=new P0(W,G,e,Pn),k=new Yg(W,G),te.reverseDepthBuffer&&d&&k.buffers.depth.setReversed(!0),$=new F0(W),J=new Fg,ne=new Zg(W,G,k,J,te,Pn,$),fe=new D0(y),de=new U0(y),be=new w0(W),Wn=new C0(W,be),De=new O0(W,be,$,Wn),et=new z0(W,De,be,$),ut=new H0(W,te,ne),bt=new L0(J),je=new Bg(y,fe,de,G,te,Wn,bt),Ee=new Qg(y,J),it=new zg,pt=new jg(G),Ye=new R0(y,fe,de,k,et,p,l),xe=new Xg(y,et,te),Zi=new ev(W,$,te,k),Tr=new I0(W,G,$),Oa=new B0(W,G,$),$.programs=je.programs,y.capabilities=te,y.extensions=G,y.properties=J,y.renderLists=it,y.shadowMap=xe,y.state=k,y.info=$}ld();let Ht=new ph(y,W);function cd(A){A.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function hd(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;let A=$.autoReset,j=xe.enabled,K=xe.autoUpdate,ee=xe.needsUpdate,Y=xe.type;ld(),$.autoReset=A,xe.enabled=j,xe.autoUpdate=K,xe.needsUpdate=ee,xe.type=Y}function ud(A){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",A.statusMessage)}function dd(A){let j=A.target;j.removeEventListener("dispose",dd),function(K){(function(ee){let Y=J.get(ee).programs;Y!==void 0&&(Y.forEach(function(se){je.releaseProgram(se)}),ee.isShaderMaterial&&je.releaseShaderCache(ee))})(K),J.remove(K)}(j)}function pd(A,j,K){A.transparent===!0&&A.side===2&&A.forceSinglePass===!1?(A.side=1,A.needsUpdate=!0,Fa(A,j,K),A.side=0,A.needsUpdate=!0,Fa(A,j,K),A.side=2):Fa(A,j,K)}this.xr=Ht,this.getContext=function(){return W},this.getContextAttributes=function(){return W.getContextAttributes()},this.forceContextLoss=function(){let A=G.get("WEBGL_lose_context");A&&A.loseContext()},this.forceContextRestore=function(){let A=G.get("WEBGL_lose_context");A&&A.restoreContext()},this.getPixelRatio=function(){return Z},this.setPixelRatio=function(A){A!==void 0&&(Z=A,this.setSize(z,q,!1))},this.getSize=function(A){return A.set(z,q)},this.setSize=function(A,j,K=!0){Ht.isPresenting?console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting."):(z=A,q=j,t.width=Math.floor(A*Z),t.height=Math.floor(j*Z),K===!0&&(t.style.width=A+"px",t.style.height=j+"px"),this.setViewport(0,0,A,j))},this.getDrawingBufferSize=function(A){return A.set(z*Z,q*Z).floor()},this.setDrawingBufferSize=function(A,j,K){z=A,q=j,Z=K,t.width=Math.floor(A*K),t.height=Math.floor(j*K),this.setViewport(0,0,A,j)},this.getCurrentViewport=function(A){return A.copy(V)},this.getViewport=function(A){return A.copy(Q)},this.setViewport=function(A,j,K,ee){A.isVector4?Q.set(A.x,A.y,A.z,A.w):Q.set(A,j,K,ee),k.viewport(V.copy(Q).multiplyScalar(Z).round())},this.getScissor=function(A){return A.copy(re)},this.setScissor=function(A,j,K,ee){A.isVector4?re.set(A.x,A.y,A.z,A.w):re.set(A,j,K,ee),k.scissor(H.copy(re).multiplyScalar(Z).round())},this.getScissorTest=function(){return ve},this.setScissorTest=function(A){k.setScissorTest(ve=A)},this.setOpaqueSort=function(A){ae=A},this.setTransparentSort=function(A){pe=A},this.getClearColor=function(A){return A.copy(Ye.getClearColor())},this.setClearColor=function(){Ye.setClearColor.apply(Ye,arguments)},this.getClearAlpha=function(){return Ye.getClearAlpha()},this.setClearAlpha=function(){Ye.setClearAlpha.apply(Ye,arguments)},this.clear=function(A=!0,j=!0,K=!0){let ee=0;if(A){let Y=!1;if(T!==null){let se=T.texture.format;Y=se===Xh||se===jh||se===Wh}if(Y){let se=T.texture.type,ge=se===Pi||se===cr||se===Qs||se===Qr||se===Gh||se===Vh,Me=Ye.getClearColor(),Ae=Ye.getClearAlpha(),Be=Me.r,ke=Me.g,Ie=Me.b;ge?(f[0]=Be,f[1]=ke,f[2]=Ie,f[3]=Ae,W.clearBufferuiv(W.COLOR,0,f)):(v[0]=Be,v[1]=ke,v[2]=Ie,v[3]=Ae,W.clearBufferiv(W.COLOR,0,v))}else ee|=W.COLOR_BUFFER_BIT}j&&(ee|=W.DEPTH_BUFFER_BIT),K&&(ee|=W.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),W.clear(ee)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",cd,!1),t.removeEventListener("webglcontextrestored",hd,!1),t.removeEventListener("webglcontextcreationerror",ud,!1),it.dispose(),pt.dispose(),J.dispose(),fe.dispose(),de.dispose(),et.dispose(),Wn.dispose(),Zi.dispose(),je.dispose(),Ht.dispose(),Ht.removeEventListener("sessionstart",fd),Ht.removeEventListener("sessionend",md),Ki.stop()},this.renderBufferDirect=function(A,j,K,ee,Y,se){j===null&&(j=N);let ge=Y.isMesh&&Y.matrixWorld.determinant()<0,Me=function($e,en,Gt,Ve,Ne){en.isScene!==!0&&(en=N),ne.resetTextureUnits();let Ln=en.fog,Cl=Ve.isMeshStandardMaterial?en.environment:null,Ls=T===null?y.outputColorSpace:T.isXRRenderTarget===!0?T.texture.colorSpace:Zt,wr=(Ve.isMeshStandardMaterial?de:fe).get(Ve.envMap||Cl),Il=Ve.vertexColors===!0&&!!Gt.attributes.color&&Gt.attributes.color.itemSize===4,Pl=!!Gt.attributes.tangent&&(!!Ve.normalMap||Ve.anisotropy>0),Ll=!!Gt.morphAttributes.position,_i=!!Gt.morphAttributes.normal,Rm=!!Gt.morphAttributes.color,Md=0;Ve.toneMapped&&(T!==null&&T.isXRRenderTarget!==!0||(Md=y.toneMapping));let bd=Gt.morphAttributes.position||Gt.morphAttributes.normal||Gt.morphAttributes.color,Cm=bd!==void 0?bd.length:0,Ze=J.get(Ve),Im=g.state.lights;if(ue===!0&&(P===!0||$e!==O)){let xn=$e===O&&Ve.id===R;bt.setState(Ve,$e,xn)}let Dn=!1;Ve.version===Ze.__version?Ze.needsLights&&Ze.lightsStateVersion!==Im.state.version||Ze.outputColorSpace!==Ls||Ne.isBatchedMesh&&Ze.batching===!1?Dn=!0:Ne.isBatchedMesh||Ze.batching!==!0?Ne.isBatchedMesh&&Ze.batchingColor===!0&&Ne.colorTexture===null||Ne.isBatchedMesh&&Ze.batchingColor===!1&&Ne.colorTexture!==null||Ne.isInstancedMesh&&Ze.instancing===!1?Dn=!0:Ne.isInstancedMesh||Ze.instancing!==!0?Ne.isSkinnedMesh&&Ze.skinning===!1?Dn=!0:Ne.isSkinnedMesh||Ze.skinning!==!0?Ne.isInstancedMesh&&Ze.instancingColor===!0&&Ne.instanceColor===null||Ne.isInstancedMesh&&Ze.instancingColor===!1&&Ne.instanceColor!==null||Ne.isInstancedMesh&&Ze.instancingMorph===!0&&Ne.morphTexture===null||Ne.isInstancedMesh&&Ze.instancingMorph===!1&&Ne.morphTexture!==null||Ze.envMap!==wr||Ve.fog===!0&&Ze.fog!==Ln?Dn=!0:Ze.numClippingPlanes===void 0||Ze.numClippingPlanes===bt.numPlanes&&Ze.numIntersection===bt.numIntersection?(Ze.vertexAlphas!==Il||Ze.vertexTangents!==Pl||Ze.morphTargets!==Ll||Ze.morphNormals!==_i||Ze.morphColors!==Rm||Ze.toneMapping!==Md||Ze.morphTargetsCount!==Cm)&&(Dn=!0):Dn=!0:Dn=!0:Dn=!0:Dn=!0:(Dn=!0,Ze.__version=Ve.version);let Ji=Ze.currentProgram;Dn===!0&&(Ji=Fa(Ve,en,Ne));let Ed=!1,Ds=!1,Dl=!1,At=Ji.getUniforms(),xi=Ze.uniforms;if(k.useProgram(Ji.program)&&(Ed=!0,Ds=!0,Dl=!0),Ve.id!==R&&(R=Ve.id,Ds=!0),Ed||O!==$e){k.buffers.depth.getReversed()?(C.copy($e.projectionMatrix),function($i){let _t=$i.elements;_t[2]=.5*_t[2]+.5*_t[3],_t[6]=.5*_t[6]+.5*_t[7],_t[10]=.5*_t[10]+.5*_t[11],_t[14]=.5*_t[14]+.5*_t[15]}(C),function($i){let _t=$i.elements;_t[11]===-1?(_t[10]=-_t[10]-1,_t[14]=-_t[14]):(_t[10]=-_t[10],_t[14]=1-_t[14])}(C),At.setValue(W,"projectionMatrix",C)):At.setValue(W,"projectionMatrix",$e.projectionMatrix),At.setValue(W,"viewMatrix",$e.matrixWorldInverse);let xn=At.map.cameraPosition;xn!==void 0&&xn.setValue(W,B.setFromMatrixPosition($e.matrixWorld)),te.logarithmicDepthBuffer&&At.setValue(W,"logDepthBufFC",2/(Math.log($e.far+1)/Math.LN2)),(Ve.isMeshPhongMaterial||Ve.isMeshToonMaterial||Ve.isMeshLambertMaterial||Ve.isMeshBasicMaterial||Ve.isMeshStandardMaterial||Ve.isShaderMaterial)&&At.setValue(W,"isOrthographic",$e.isOrthographicCamera===!0),O!==$e&&(O=$e,Ds=!0,Dl=!0)}if(Ne.isSkinnedMesh){At.setOptional(W,Ne,"bindMatrix"),At.setOptional(W,Ne,"bindMatrixInverse");let xn=Ne.skeleton;xn&&(xn.boneTexture===null&&xn.computeBoneTexture(),At.setValue(W,"boneTexture",xn.boneTexture,ne))}Ne.isBatchedMesh&&(At.setOptional(W,Ne,"batchingTexture"),At.setValue(W,"batchingTexture",Ne._matricesTexture,ne),At.setOptional(W,Ne,"batchingIdTexture"),At.setValue(W,"batchingIdTexture",Ne._indirectTexture,ne),At.setOptional(W,Ne,"batchingColorTexture"),Ne._colorsTexture!==null&&At.setValue(W,"batchingColorTexture",Ne._colorsTexture,ne));let Ul=Gt.morphAttributes;Ul.position===void 0&&Ul.normal===void 0&&Ul.color===void 0||ut.update(Ne,Gt,Ji),(Ds||Ze.receiveShadow!==Ne.receiveShadow)&&(Ze.receiveShadow=Ne.receiveShadow,At.setValue(W,"receiveShadow",Ne.receiveShadow)),Ve.isMeshGouraudMaterial&&Ve.envMap!==null&&(xi.envMap.value=wr,xi.flipEnvMap.value=wr.isCubeTexture&&wr.isRenderTargetTexture===!1?-1:1),Ve.isMeshStandardMaterial&&Ve.envMap===null&&en.environment!==null&&(xi.envMapIntensity.value=en.environmentIntensity),Ds&&(At.setValue(W,"toneMappingExposure",y.toneMappingExposure),Ze.needsLights&&(Un=Dl,(jn=xi).ambientLightColor.needsUpdate=Un,jn.lightProbe.needsUpdate=Un,jn.directionalLights.needsUpdate=Un,jn.directionalLightShadows.needsUpdate=Un,jn.pointLights.needsUpdate=Un,jn.pointLightShadows.needsUpdate=Un,jn.spotLights.needsUpdate=Un,jn.spotLightShadows.needsUpdate=Un,jn.rectAreaLights.needsUpdate=Un,jn.hemisphereLights.needsUpdate=Un),Ln&&Ve.fog===!0&&Ee.refreshFogUniforms(xi,Ln),Ee.refreshMaterialUniforms(xi,Ve,Z,q,g.state.transmissionRenderTarget[$e.id]),Kr.upload(W,xd(Ze),xi,ne));var jn,Un;if(Ve.isShaderMaterial&&Ve.uniformsNeedUpdate===!0&&(Kr.upload(W,xd(Ze),xi,ne),Ve.uniformsNeedUpdate=!1),Ve.isSpriteMaterial&&At.setValue(W,"center",Ne.center),At.setValue(W,"modelViewMatrix",Ne.modelViewMatrix),At.setValue(W,"normalMatrix",Ne.normalMatrix),At.setValue(W,"modelMatrix",Ne.matrixWorld),Ve.isShaderMaterial||Ve.isRawShaderMaterial){let xn=Ve.uniformsGroups;for(let $i=0,_t=xn.length;$i<_t;$i++){let Sd=xn[$i];Zi.update(Sd,Ji),Zi.bind(Sd,Ji)}}return Ji}(A,j,K,ee,Y);k.setMaterial(ee,ge);let Ae=K.index,Be=1;if(ee.wireframe===!0){if(Ae=De.getWireframeAttribute(K),Ae===void 0)return;Be=2}let ke=K.drawRange,Ie=K.attributes.position,Xe=ke.start*Be,St=(ke.start+ke.count)*Be;se!==null&&(Xe=Math.max(Xe,se.start*Be),St=Math.min(St,(se.start+se.count)*Be)),Ae!==null?(Xe=Math.max(Xe,0),St=Math.min(St,Ae.count)):Ie!=null&&(Xe=Math.max(Xe,0),St=Math.min(St,Ie.count));let ft=St-Xe;if(ft<0||ft===1/0)return;let Lt;Wn.setup(Y,ee,Me,K,Ae);let vt=Tr;if(Ae!==null&&(Lt=be.get(Ae),vt=Oa,vt.setIndex(Lt)),Y.isMesh)ee.wireframe===!0?(k.setLineWidth(ee.wireframeLinewidth*D()),vt.setMode(W.LINES)):vt.setMode(W.TRIANGLES);else if(Y.isLine){let $e=ee.linewidth;$e===void 0&&($e=1),k.setLineWidth($e*D()),Y.isLineSegments?vt.setMode(W.LINES):Y.isLineLoop?vt.setMode(W.LINE_LOOP):vt.setMode(W.LINE_STRIP)}else Y.isPoints?vt.setMode(W.POINTS):Y.isSprite&&vt.setMode(W.TRIANGLES);if(Y.isBatchedMesh)if(Y._multiDrawInstances!==null)vt.renderMultiDrawInstances(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount,Y._multiDrawInstances);else if(G.get("WEBGL_multi_draw"))vt.renderMultiDraw(Y._multiDrawStarts,Y._multiDrawCounts,Y._multiDrawCount);else{let $e=Y._multiDrawStarts,en=Y._multiDrawCounts,Gt=Y._multiDrawCount,Ve=Ae?be.get(Ae).bytesPerElement:1,Ne=J.get(ee).currentProgram.getUniforms();for(let Ln=0;Ln<Gt;Ln++)Ne.setValue(W,"_gl_DrawID",Ln),vt.render($e[Ln]/Ve,en[Ln])}else if(Y.isInstancedMesh)vt.renderInstances(Xe,ft,Y.count);else if(K.isInstancedBufferGeometry){let $e=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,en=Math.min(K.instanceCount,$e);vt.renderInstances(Xe,ft,en)}else vt.render(Xe,ft)},this.compile=function(A,j,K=null){K===null&&(K=A),g=pt.get(K),g.init(j),x.push(g),K.traverseVisible(function(Y){Y.isLight&&Y.layers.test(j.layers)&&(g.pushLight(Y),Y.castShadow&&g.pushShadow(Y))}),A!==K&&A.traverseVisible(function(Y){Y.isLight&&Y.layers.test(j.layers)&&(g.pushLight(Y),Y.castShadow&&g.pushShadow(Y))}),g.setupLights();let ee=new Set;return A.traverse(function(Y){if(!(Y.isMesh||Y.isPoints||Y.isLine||Y.isSprite))return;let se=Y.material;if(se)if(Array.isArray(se))for(let ge=0;ge<se.length;ge++){let Me=se[ge];pd(Me,K,Y),ee.add(Me)}else pd(se,K,Y),ee.add(se)}),x.pop(),g=null,ee},this.compileAsync=function(A,j,K=null){let ee=this.compile(A,j,K);return new Promise(Y=>{function se(){ee.forEach(function(ge){J.get(ge).currentProgram.isReady()&&ee.delete(ge)}),ee.size!==0?setTimeout(se,10):Y(A)}G.get("KHR_parallel_shader_compile")!==null?se():setTimeout(se,10)})};let Al=null;function fd(){Ki.stop()}function md(){Ki.start()}let Ki=new pf;function Rl(A,j,K,ee){if(A.visible===!1)return;if(A.layers.test(j.layers)){if(A.isGroup)K=A.renderOrder;else if(A.isLOD)A.autoUpdate===!0&&A.update(j);else if(A.isLight)g.pushLight(A),A.castShadow&&g.pushShadow(A);else if(A.isSprite){if(!A.frustumCulled||_e.intersectsSprite(A)){ee&&L.setFromMatrixPosition(A.matrixWorld).applyMatrix4(F);let se=et.update(A),ge=A.material;ge.visible&&m.push(A,se,ge,K,L.z,null)}}else if((A.isMesh||A.isLine||A.isPoints)&&(!A.frustumCulled||_e.intersectsObject(A))){let se=et.update(A),ge=A.material;if(ee&&(A.boundingSphere!==void 0?(A.boundingSphere===null&&A.computeBoundingSphere(),L.copy(A.boundingSphere.center)):(se.boundingSphere===null&&se.computeBoundingSphere(),L.copy(se.boundingSphere.center)),L.applyMatrix4(A.matrixWorld).applyMatrix4(F)),Array.isArray(ge)){let Me=se.groups;for(let Ae=0,Be=Me.length;Ae<Be;Ae++){let ke=Me[Ae],Ie=ge[ke.materialIndex];Ie&&Ie.visible&&m.push(A,se,Ie,K,L.z,ke)}}else ge.visible&&m.push(A,se,ge,K,L.z,null)}}let Y=A.children;for(let se=0,ge=Y.length;se<ge;se++)Rl(Y[se],j,K,ee)}function gd(A,j,K,ee){let Y=A.opaque,se=A.transmissive,ge=A.transparent;g.setupLightsView(K),ue===!0&&bt.setGlobalState(y.clippingPlanes,K),ee&&k.viewport(V.copy(ee)),Y.length>0&&Ba(Y,j,K),se.length>0&&Ba(se,j,K),ge.length>0&&Ba(ge,j,K),k.buffers.depth.setTest(!0),k.buffers.depth.setMask(!0),k.buffers.color.setMask(!0),k.setPolygonOffset(!1)}function vd(A,j,K,ee){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;g.state.transmissionRenderTarget[ee.id]===void 0&&(g.state.transmissionRenderTarget[ee.id]=new hi(1,1,{generateMipmaps:!0,type:G.has("EXT_color_buffer_half_float")||G.has("EXT_color_buffer_float")?_a:Pi,minFilter:li,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Ke.workingColorSpace}));let Y=g.state.transmissionRenderTarget[ee.id],se=ee.viewport||V;Y.setSize(se.z,se.w);let ge=y.getRenderTarget();y.setRenderTarget(Y),y.getClearColor(I),U=y.getClearAlpha(),U<1&&y.setClearColor(16777215,.5),y.clear(),w&&Ye.render(K);let Me=y.toneMapping;y.toneMapping=0;let Ae=ee.viewport;if(ee.viewport!==void 0&&(ee.viewport=void 0),g.setupLightsView(ee),ue===!0&&bt.setGlobalState(y.clippingPlanes,ee),Ba(A,K,ee),ne.updateMultisampleRenderTarget(Y),ne.updateRenderTargetMipmap(Y),G.has("WEBGL_multisampled_render_to_texture")===!1){let Be=!1;for(let ke=0,Ie=j.length;ke<Ie;ke++){let Xe=j[ke],St=Xe.object,ft=Xe.geometry,Lt=Xe.material,vt=Xe.group;if(Lt.side===2&&St.layers.test(ee.layers)){let $e=Lt.side;Lt.side=1,Lt.needsUpdate=!0,_d(St,K,ee,ft,Lt,vt),Lt.side=$e,Lt.needsUpdate=!0,Be=!0}}Be===!0&&(ne.updateMultisampleRenderTarget(Y),ne.updateRenderTargetMipmap(Y))}y.setRenderTarget(ge),y.setClearColor(I,U),Ae!==void 0&&(ee.viewport=Ae),y.toneMapping=Me}function Ba(A,j,K){let ee=j.isScene===!0?j.overrideMaterial:null;for(let Y=0,se=A.length;Y<se;Y++){let ge=A[Y],Me=ge.object,Ae=ge.geometry,Be=ee===null?ge.material:ee,ke=ge.group;Me.layers.test(K.layers)&&_d(Me,j,K,Ae,Be,ke)}}function _d(A,j,K,ee,Y,se){A.onBeforeRender(y,j,K,ee,Y,se),A.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,A.matrixWorld),A.normalMatrix.getNormalMatrix(A.modelViewMatrix),Y.onBeforeRender(y,j,K,ee,A,se),Y.transparent===!0&&Y.side===2&&Y.forceSinglePass===!1?(Y.side=1,Y.needsUpdate=!0,y.renderBufferDirect(K,j,ee,Y,A,se),Y.side=0,Y.needsUpdate=!0,y.renderBufferDirect(K,j,ee,Y,A,se),Y.side=2):y.renderBufferDirect(K,j,ee,Y,A,se),A.onAfterRender(y,j,K,ee,Y,se)}function Fa(A,j,K){j.isScene!==!0&&(j=N);let ee=J.get(A),Y=g.state.lights,se=g.state.shadowsArray,ge=Y.state.version,Me=je.getParameters(A,Y.state,se,j,K),Ae=je.getProgramCacheKey(Me),Be=ee.programs;ee.environment=A.isMeshStandardMaterial?j.environment:null,ee.fog=j.fog,ee.envMap=(A.isMeshStandardMaterial?de:fe).get(A.envMap||ee.environment),ee.envMapRotation=ee.environment!==null&&A.envMap===null?j.environmentRotation:A.envMapRotation,Be===void 0&&(A.addEventListener("dispose",dd),Be=new Map,ee.programs=Be);let ke=Be.get(Ae);if(ke!==void 0){if(ee.currentProgram===ke&&ee.lightsStateVersion===ge)return yd(A,Me),ke}else Me.uniforms=je.getUniforms(A),A.onBeforeCompile(Me,y),ke=je.acquireProgram(Me,Ae),Be.set(Ae,ke),ee.uniforms=Me.uniforms;let Ie=ee.uniforms;return(A.isShaderMaterial||A.isRawShaderMaterial)&&A.clipping!==!0||(Ie.clippingPlanes=bt.uniform),yd(A,Me),ee.needsLights=function(Xe){return Xe.isMeshLambertMaterial||Xe.isMeshToonMaterial||Xe.isMeshPhongMaterial||Xe.isMeshStandardMaterial||Xe.isShadowMaterial||Xe.isShaderMaterial&&Xe.lights===!0}(A),ee.lightsStateVersion=ge,ee.needsLights&&(Ie.ambientLightColor.value=Y.state.ambient,Ie.lightProbe.value=Y.state.probe,Ie.directionalLights.value=Y.state.directional,Ie.directionalLightShadows.value=Y.state.directionalShadow,Ie.spotLights.value=Y.state.spot,Ie.spotLightShadows.value=Y.state.spotShadow,Ie.rectAreaLights.value=Y.state.rectArea,Ie.ltc_1.value=Y.state.rectAreaLTC1,Ie.ltc_2.value=Y.state.rectAreaLTC2,Ie.pointLights.value=Y.state.point,Ie.pointLightShadows.value=Y.state.pointShadow,Ie.hemisphereLights.value=Y.state.hemi,Ie.directionalShadowMap.value=Y.state.directionalShadowMap,Ie.directionalShadowMatrix.value=Y.state.directionalShadowMatrix,Ie.spotShadowMap.value=Y.state.spotShadowMap,Ie.spotLightMatrix.value=Y.state.spotLightMatrix,Ie.spotLightMap.value=Y.state.spotLightMap,Ie.pointShadowMap.value=Y.state.pointShadowMap,Ie.pointShadowMatrix.value=Y.state.pointShadowMatrix),ee.currentProgram=ke,ee.uniformsList=null,ke}function xd(A){if(A.uniformsList===null){let j=A.currentProgram.getUniforms();A.uniformsList=Kr.seqWithValue(j.seq,A.uniforms)}return A.uniformsList}function yd(A,j){let K=J.get(A);K.outputColorSpace=j.outputColorSpace,K.batching=j.batching,K.batchingColor=j.batchingColor,K.instancing=j.instancing,K.instancingColor=j.instancingColor,K.instancingMorph=j.instancingMorph,K.skinning=j.skinning,K.morphTargets=j.morphTargets,K.morphNormals=j.morphNormals,K.morphColors=j.morphColors,K.morphTargetsCount=j.morphTargetsCount,K.numClippingPlanes=j.numClippingPlanes,K.numIntersection=j.numClipIntersection,K.vertexAlphas=j.vertexAlphas,K.vertexTangents=j.vertexTangents,K.toneMapping=j.toneMapping}Ki.setAnimationLoop(function(A){Al&&Al(A)}),typeof self<"u"&&Ki.setContext(self),this.setAnimationLoop=function(A){Al=A,Ht.setAnimationLoop(A),A===null?Ki.stop():Ki.start()},Ht.addEventListener("sessionstart",fd),Ht.addEventListener("sessionend",md),this.render=function(A,j){if(j!==void 0&&j.isCamera!==!0)return void console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");if(S===!0)return;if(A.matrixWorldAutoUpdate===!0&&A.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),Ht.enabled===!0&&Ht.isPresenting===!0&&(Ht.cameraAutoUpdate===!0&&Ht.updateCamera(j),j=Ht.getCamera()),A.isScene===!0&&A.onBeforeRender(y,A,j,T),g=pt.get(A,x.length),g.init(j),x.push(g),F.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),_e.setFromProjectionMatrix(F),P=this.localClippingEnabled,ue=bt.init(this.clippingPlanes,P),m=it.get(A,_.length),m.init(),_.push(m),Ht.enabled===!0&&Ht.isPresenting===!0){let se=y.xr.getDepthSensingMesh();se!==null&&Rl(se,j,-1/0,y.sortObjects)}Rl(A,j,0,y.sortObjects),m.finish(),y.sortObjects===!0&&m.sort(ae,pe),w=Ht.enabled===!1||Ht.isPresenting===!1||Ht.hasDepthSensing()===!1,w&&Ye.addToRenderList(m,A),this.info.render.frame++,ue===!0&&bt.beginShadows();let K=g.state.shadowsArray;xe.render(K,A,j),ue===!0&&bt.endShadows(),this.info.autoReset===!0&&this.info.reset();let ee=m.opaque,Y=m.transmissive;if(g.setupLights(),j.isArrayCamera){let se=j.cameras;if(Y.length>0)for(let ge=0,Me=se.length;ge<Me;ge++)vd(ee,Y,A,se[ge]);w&&Ye.render(A);for(let ge=0,Me=se.length;ge<Me;ge++){let Ae=se[ge];gd(m,A,Ae,Ae.viewport)}}else Y.length>0&&vd(ee,Y,A,j),w&&Ye.render(A),gd(m,A,j);T!==null&&(ne.updateMultisampleRenderTarget(T),ne.updateRenderTargetMipmap(T)),A.isScene===!0&&A.onAfterRender(y,A,j),Wn.resetDefaultState(),R=-1,O=null,x.pop(),x.length>0?(g=x[x.length-1],ue===!0&&bt.setGlobalState(y.clippingPlanes,g.state.camera)):g=null,_.pop(),m=_.length>0?_[_.length-1]:null},this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return b},this.getRenderTarget=function(){return T},this.setRenderTargetTextures=function(A,j,K){J.get(A.texture).__webglTexture=j,J.get(A.depthTexture).__webglTexture=K;let ee=J.get(A);ee.__hasExternalTextures=!0,ee.__autoAllocateDepthBuffer=K===void 0,ee.__autoAllocateDepthBuffer||G.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),ee.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(A,j){let K=J.get(A);K.__webglFramebuffer=j,K.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(A,j=0,K=0){T=A,M=j,b=K;let ee=!0,Y=null,se=!1,ge=!1;if(A){let Me=J.get(A);if(Me.__useDefaultFramebuffer!==void 0)k.bindFramebuffer(W.FRAMEBUFFER,null),ee=!1;else if(Me.__webglFramebuffer===void 0)ne.setupRenderTarget(A);else if(Me.__hasExternalTextures)ne.rebindTextures(A,J.get(A.texture).__webglTexture,J.get(A.depthTexture).__webglTexture);else if(A.depthBuffer){let ke=A.depthTexture;if(Me.__boundDepthTexture!==ke){if(ke!==null&&J.has(ke)&&(A.width!==ke.image.width||A.height!==ke.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");ne.setupDepthRenderbuffer(A)}}let Ae=A.texture;(Ae.isData3DTexture||Ae.isDataArrayTexture||Ae.isCompressedArrayTexture)&&(ge=!0);let Be=J.get(A).__webglFramebuffer;A.isWebGLCubeRenderTarget?(Y=Array.isArray(Be[j])?Be[j][K]:Be[j],se=!0):Y=A.samples>0&&ne.useMultisampledRTT(A)===!1?J.get(A).__webglMultisampledFramebuffer:Array.isArray(Be)?Be[K]:Be,V.copy(A.viewport),H.copy(A.scissor),X=A.scissorTest}else V.copy(Q).multiplyScalar(Z).floor(),H.copy(re).multiplyScalar(Z).floor(),X=ve;if(k.bindFramebuffer(W.FRAMEBUFFER,Y)&&ee&&k.drawBuffers(A,Y),k.viewport(V),k.scissor(H),k.setScissorTest(X),se){let Me=J.get(A.texture);W.framebufferTexture2D(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,W.TEXTURE_CUBE_MAP_POSITIVE_X+j,Me.__webglTexture,K)}else if(ge){let Me=J.get(A.texture),Ae=j||0;W.framebufferTextureLayer(W.FRAMEBUFFER,W.COLOR_ATTACHMENT0,Me.__webglTexture,K||0,Ae)}R=-1},this.readRenderTargetPixels=function(A,j,K,ee,Y,se,ge){if(!A||!A.isWebGLRenderTarget)return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=J.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ge!==void 0&&(Me=Me[ge]),Me){k.bindFramebuffer(W.FRAMEBUFFER,Me);try{let Ae=A.texture,Be=Ae.format,ke=Ae.type;if(!te.textureFormatReadable(Be))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");if(!te.textureTypeReadable(ke))return void console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");j>=0&&j<=A.width-ee&&K>=0&&K<=A.height-Y&&W.readPixels(j,K,ee,Y,Pn.convert(Be),Pn.convert(ke),se)}finally{let Ae=T!==null?J.get(T).__webglFramebuffer:null;k.bindFramebuffer(W.FRAMEBUFFER,Ae)}}},this.readRenderTargetPixelsAsync=async function(A,j,K,ee,Y,se,ge){if(!A||!A.isWebGLRenderTarget)throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Me=J.get(A).__webglFramebuffer;if(A.isWebGLCubeRenderTarget&&ge!==void 0&&(Me=Me[ge]),Me){let Ae=A.texture,Be=Ae.format,ke=Ae.type;if(!te.textureFormatReadable(Be))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!te.textureTypeReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");if(j>=0&&j<=A.width-ee&&K>=0&&K<=A.height-Y){k.bindFramebuffer(W.FRAMEBUFFER,Me);let Ie=W.createBuffer();W.bindBuffer(W.PIXEL_PACK_BUFFER,Ie),W.bufferData(W.PIXEL_PACK_BUFFER,se.byteLength,W.STREAM_READ),W.readPixels(j,K,ee,Y,Pn.convert(Be),Pn.convert(ke),0);let Xe=T!==null?J.get(T).__webglFramebuffer:null;k.bindFramebuffer(W.FRAMEBUFFER,Xe);let St=W.fenceSync(W.SYNC_GPU_COMMANDS_COMPLETE,0);return W.flush(),await function(ft,Lt,vt){return new Promise(function($e,en){setTimeout(function Gt(){switch(ft.clientWaitSync(Lt,ft.SYNC_FLUSH_COMMANDS_BIT,0)){case ft.WAIT_FAILED:en();break;case ft.TIMEOUT_EXPIRED:setTimeout(Gt,vt);break;default:$e()}},vt)})}(W,St,4),W.bindBuffer(W.PIXEL_PACK_BUFFER,Ie),W.getBufferSubData(W.PIXEL_PACK_BUFFER,0,se),W.deleteBuffer(Ie),W.deleteSync(St),se}throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")}},this.copyFramebufferToTexture=function(A,j=null,K=0){A.isTexture!==!0&&(qs("WebGLRenderer: copyFramebufferToTexture function signature has changed."),j=arguments[0]||null,A=arguments[1]);let ee=Math.pow(2,-K),Y=Math.floor(A.image.width*ee),se=Math.floor(A.image.height*ee),ge=j!==null?j.x:0,Me=j!==null?j.y:0;ne.setTexture2D(A,0),W.copyTexSubImage2D(W.TEXTURE_2D,K,0,0,ge,Me,Y,se),k.unbindTexture()},this.copyTextureToTexture=function(A,j,K=null,ee=null,Y=0){let se,ge,Me,Ae,Be,ke,Ie,Xe,St;A.isTexture!==!0&&(qs("WebGLRenderer: copyTextureToTexture function signature has changed."),ee=arguments[0]||null,A=arguments[1],j=arguments[2],Y=arguments[3]||0,K=null);let ft=A.isCompressedTexture?A.mipmaps[Y]:A.image;K!==null?(se=K.max.x-K.min.x,ge=K.max.y-K.min.y,Me=K.isBox3?K.max.z-K.min.z:1,Ae=K.min.x,Be=K.min.y,ke=K.isBox3?K.min.z:0):(se=ft.width,ge=ft.height,Me=ft.depth||1,Ae=0,Be=0,ke=0),ee!==null?(Ie=ee.x,Xe=ee.y,St=ee.z):(Ie=0,Xe=0,St=0);let Lt=Pn.convert(j.format),vt=Pn.convert(j.type),$e;j.isData3DTexture?(ne.setTexture3D(j,0),$e=W.TEXTURE_3D):j.isDataArrayTexture||j.isCompressedArrayTexture?(ne.setTexture2DArray(j,0),$e=W.TEXTURE_2D_ARRAY):(ne.setTexture2D(j,0),$e=W.TEXTURE_2D),W.pixelStorei(W.UNPACK_FLIP_Y_WEBGL,j.flipY),W.pixelStorei(W.UNPACK_PREMULTIPLY_ALPHA_WEBGL,j.premultiplyAlpha),W.pixelStorei(W.UNPACK_ALIGNMENT,j.unpackAlignment);let en=W.getParameter(W.UNPACK_ROW_LENGTH),Gt=W.getParameter(W.UNPACK_IMAGE_HEIGHT),Ve=W.getParameter(W.UNPACK_SKIP_PIXELS),Ne=W.getParameter(W.UNPACK_SKIP_ROWS),Ln=W.getParameter(W.UNPACK_SKIP_IMAGES);W.pixelStorei(W.UNPACK_ROW_LENGTH,ft.width),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,ft.height),W.pixelStorei(W.UNPACK_SKIP_PIXELS,Ae),W.pixelStorei(W.UNPACK_SKIP_ROWS,Be),W.pixelStorei(W.UNPACK_SKIP_IMAGES,ke);let Cl=A.isDataArrayTexture||A.isData3DTexture,Ls=j.isDataArrayTexture||j.isData3DTexture;if(A.isRenderTargetTexture||A.isDepthTexture){let wr=J.get(A),Il=J.get(j),Pl=J.get(wr.__renderTarget),Ll=J.get(Il.__renderTarget);k.bindFramebuffer(W.READ_FRAMEBUFFER,Pl.__webglFramebuffer),k.bindFramebuffer(W.DRAW_FRAMEBUFFER,Ll.__webglFramebuffer);for(let _i=0;_i<Me;_i++)Cl&&W.framebufferTextureLayer(W.READ_FRAMEBUFFER,W.COLOR_ATTACHMENT0,J.get(A).__webglTexture,Y,ke+_i),A.isDepthTexture?(Ls&&W.framebufferTextureLayer(W.DRAW_FRAMEBUFFER,W.COLOR_ATTACHMENT0,J.get(j).__webglTexture,Y,St+_i),W.blitFramebuffer(Ae,Be,se,ge,Ie,Xe,se,ge,W.DEPTH_BUFFER_BIT,W.NEAREST)):Ls?W.copyTexSubImage3D($e,Y,Ie,Xe,St+_i,Ae,Be,se,ge):W.copyTexSubImage2D($e,Y,Ie,Xe,St+_i,Ae,Be,se,ge);k.bindFramebuffer(W.READ_FRAMEBUFFER,null),k.bindFramebuffer(W.DRAW_FRAMEBUFFER,null)}else Ls?A.isDataTexture||A.isData3DTexture?W.texSubImage3D($e,Y,Ie,Xe,St,se,ge,Me,Lt,vt,ft.data):j.isCompressedArrayTexture?W.compressedTexSubImage3D($e,Y,Ie,Xe,St,se,ge,Me,Lt,ft.data):W.texSubImage3D($e,Y,Ie,Xe,St,se,ge,Me,Lt,vt,ft):A.isDataTexture?W.texSubImage2D(W.TEXTURE_2D,Y,Ie,Xe,se,ge,Lt,vt,ft.data):A.isCompressedTexture?W.compressedTexSubImage2D(W.TEXTURE_2D,Y,Ie,Xe,ft.width,ft.height,Lt,ft.data):W.texSubImage2D(W.TEXTURE_2D,Y,Ie,Xe,se,ge,Lt,vt,ft);W.pixelStorei(W.UNPACK_ROW_LENGTH,en),W.pixelStorei(W.UNPACK_IMAGE_HEIGHT,Gt),W.pixelStorei(W.UNPACK_SKIP_PIXELS,Ve),W.pixelStorei(W.UNPACK_SKIP_ROWS,Ne),W.pixelStorei(W.UNPACK_SKIP_IMAGES,Ln),Y===0&&j.generateMipmaps&&W.generateMipmap($e),k.unbindTexture()},this.copyTextureToTexture3D=function(A,j,K=null,ee=null,Y=0){return A.isTexture!==!0&&(qs("WebGLRenderer: copyTextureToTexture3D function signature has changed."),K=arguments[0]||null,ee=arguments[1]||null,A=arguments[2],j=arguments[3],Y=arguments[4]||0),qs('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(A,j,K,ee,Y)},this.initRenderTarget=function(A){J.get(A).__webglFramebuffer===void 0&&ne.setupRenderTarget(A)},this.initTexture=function(A){A.isCubeTexture?ne.setTextureCube(A,0):A.isData3DTexture?ne.setTexture3D(A,0):A.isDataArrayTexture||A.isCompressedArrayTexture?ne.setTexture2DArray(A,0):ne.setTexture2D(A,0),k.unbindTexture()},this.resetState=function(){M=0,b=0,T=null,k.reset(),Wn.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return is}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorspace=Ke._getDrawingBufferColorSpace(e),t.unpackColorSpace=Ke._getUnpackColorSpace()}},Gn=class r{constructor(e,t=1,n=1e3){this.isFog=!0,this.name="",this.color=new he(e),this.near=t,this.far=n}clone(){return new r(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}},ls=class extends xt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new kn,this.environmentIntensity=1,this.environmentRotation=new kn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}},cs=class{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=Kc,this.updateRanges=[],this.version=0,this.uuid=Mn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,s=this.stride;i<s;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);let t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=Mn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}},tn=new E,ur=class r{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyMatrix4(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.applyNormalMatrix(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)tn.fromBufferAttribute(this,t),tn.transformDirection(e),this.setXYZ(t,tn.x,tn.y,tn.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=Fn(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=lt(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=lt(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=Fn(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=Fn(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=Fn(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=Fn(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),i=lt(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,s){return e=e*this.data.stride+this.offset,this.normalized&&(t=lt(t,this.array),n=lt(n,this.array),i=lt(i,this.array),s=lt(s,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=s,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return new at(new this.array.constructor(t),this.itemSize,this.normalized)}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new r(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");let t=[];for(let n=0;n<this.count;n++){let i=n*this.data.stride+this.offset;for(let s=0;s<this.itemSize;s++)t.push(this.data.array[i+s])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}},ra=class extends qt{static get type(){return"SpriteMaterial"}constructor(e){super(),this.isSpriteMaterial=!0,this.color=new he(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.rotation=e.rotation,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},zs=new E,kr=new E,Gr=new E,Vr=new ie,ks=new ie,_f=new we,so=new E,Gs=new E,ao=new E,Mp=new ie,lc=new ie,bp=new ie,Oo=class extends xt{constructor(e=new ra){if(super(),this.isSprite=!0,this.type="Sprite",zr===void 0){zr=new Qe;let t=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new cs(t,5);zr.setIndex([0,1,2,0,2,3]),zr.setAttribute("position",new ur(n,3,0,!1)),zr.setAttribute("uv",new ur(n,2,3,!1))}this.geometry=zr,this.material=e,this.center=new ie(.5,.5)}raycast(e,t){e.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),kr.setFromMatrixScale(this.matrixWorld),_f.copy(e.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(e.camera.matrixWorldInverse,this.matrixWorld),Gr.setFromMatrixPosition(this.modelViewMatrix),e.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&kr.multiplyScalar(-Gr.z);let n=this.material.rotation,i,s;n!==0&&(s=Math.cos(n),i=Math.sin(n));let a=this.center;oo(so.set(-.5,-.5,0),Gr,a,kr,i,s),oo(Gs.set(.5,-.5,0),Gr,a,kr,i,s),oo(ao.set(.5,.5,0),Gr,a,kr,i,s),Mp.set(0,0),lc.set(1,0),bp.set(1,1);let o=e.ray.intersectTriangle(so,Gs,ao,!1,zs);if(o===null&&(oo(Gs.set(-.5,.5,0),Gr,a,kr,i,s),lc.set(0,1),o=e.ray.intersectTriangle(so,ao,Gs,!1,zs),o===null))return;let l=e.ray.origin.distanceTo(zs);l<e.near||l>e.far||t.push({distance:l,point:zs.clone(),uv:oi.getInterpolation(zs,so,Gs,ao,Mp,lc,bp,new ie),face:null,object:this})}copy(e,t){return super.copy(e,t),e.center!==void 0&&this.center.copy(e.center),this.material=e.material,this}};H_=new E,z_=new E,Ep=new E,Sp=new rt,Tp=new rt,tv=new E,wp=new we,lo=new E,cc=new an,Ap=new we,hc=new hr,dr=class extends ce{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Td,this.bindMatrix=new we,this.bindMatrixInverse=new we,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){let e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Vt),this.boundingBox.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,lo),this.boundingBox.expandByPoint(lo)}computeBoundingSphere(){let e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new an),this.boundingSphere.makeEmpty();let t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,lo),this.boundingSphere.expandByPoint(lo)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){let n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),cc.copy(this.boundingSphere),cc.applyMatrix4(i),e.ray.intersectsSphere(cc)!==!1&&(Ap.copy(i).invert(),hc.copy(e.ray).applyMatrix4(Ap),this.boundingBox!==null&&hc.intersectsBox(this.boundingBox)===!1||this._computeIntersections(e,t,hc)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){let e=new rt,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);let s=1/e.manhattanLength();s!==1/0?e.multiplyScalar(s):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Td?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===t0?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){let n=this.skeleton,i=this.geometry;Sp.fromBufferAttribute(i.attributes.skinIndex,e),Tp.fromBufferAttribute(i.attributes.skinWeight,e),Ep.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let s=0;s<4;s++){let a=Tp.getComponent(s);if(a!==0){let o=Sp.getComponent(s);wp.multiplyMatrices(n.bones[o].matrixWorld,n.boneInverses[o]),t.addScaledVector(tv.copy(Ep).applyMatrix4(wp),a)}}return t.applyMatrix4(this.bindMatrixInverse)}},pr=class extends xt{constructor(){super(),this.isBone=!0,this.type="Bone"}},Yn=class extends kt{constructor(e=null,t=1,n=1,i,s,a,o,l,c=1003,h=1003,u,d){super(null,a,o,l,c,h,i,s,u,d),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}},Rp=new we,nv=new we,hs=class r{constructor(e=[],t=[]){this.uuid=Mn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){let e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(16*e.length),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new we)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){let n=new we;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){let n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){let e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let s=0,a=e.length;s<a;s++){let o=e[s]?e[s].matrixWorld:nv;Rp.multiplyMatrices(o,t[s]),Rp.toArray(n,16*s)}i!==null&&(i.needsUpdate=!0)}clone(){return new r(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(4*this.bones.length);e=4*Math.ceil(e/4),e=Math.max(e,4);let t=new Float32Array(e*e*4);t.set(this.boneMatrices);let n=new Yn(t,e,e,zn,Hn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){let i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){let s=e.bones[n],a=t[s];a===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",s),a=new pr),this.bones.push(a),this.boneInverses.push(new we().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){let e={metadata:{version:4.6,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;let t=this.bones,n=this.boneInverses;for(let i=0,s=t.length;i<s;i++){let a=t[i];e.bones.push(a.uuid);let o=n[i];e.boneInverses.push(o.toArray())}return e}},fr=class extends at{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){let e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}},Wr=new we,Cp=new we,co=[],Ip=new Vt,iv=new we,Vs=new ce,Ws=new an,Bo=class extends ce{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new fr(new Float32Array(16*n),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,iv)}computeBoundingBox(){let e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Vt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Wr),Ip.copy(e.boundingBox).applyMatrix4(Wr),this.boundingBox.union(Ip)}computeBoundingSphere(){let e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new an),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Wr),Ws.copy(e.boundingSphere).applyMatrix4(Wr),this.boundingSphere.union(Ws)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,3*e)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,16*e)}getMorphAt(e,t){let n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,s=e*(n.length+1)+1;for(let a=0;a<n.length;a++)n[a]=i[s+a]}raycast(e,t){let n=this.matrixWorld,i=this.count;if(Vs.geometry=this.geometry,Vs.material=this.material,Vs.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ws.copy(this.boundingSphere),Ws.applyMatrix4(n),e.ray.intersectsSphere(Ws)!==!1))for(let s=0;s<i;s++){this.getMatrixAt(s,Wr),Cp.multiplyMatrices(n,Wr),Vs.matrixWorld=Cp,Vs.raycast(e,co);for(let a=0,o=co.length;a<o;a++){let l=co[a];l.instanceId=s,l.object=this,t.push(l)}co.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new fr(new Float32Array(3*this.instanceMatrix.count).fill(1),3)),t.toArray(this.instanceColor.array,3*e)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,16*e)}setMorphAt(e,t){let n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new Yn(new Float32Array(i*this.count),i,this.count,mi,Hn));let s=this.morphTexture.source.data.data,a=0;for(let c=0;c<n.length;c++)a+=n[c];let o=this.geometry.morphTargetsRelative?1:1-a,l=i*e;s[l]=o,s.set(n,l+1)}updateMorphTargets(){}dispose(){return this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null),this}},fh=class{constructor(){this.index=0,this.pool=[],this.list=[]}push(e,t,n,i){let s=this.pool,a=this.list;this.index>=s.length&&s.push({start:-1,count:-1,z:-1,index:-1});let o=s[this.index];a.push(o),this.index++,o.start=e,o.count=t,o.z=n,o.index=i}reset(){this.list.length=0,this.index=0}},k_=new we,G_=new he(1,1,1),V_=new as,W_=new Vt,j_=new an,X_=new E,q_=new E,Y_=new E,Z_=new fh,K_=new ce,sa=class extends qt{static get type(){return"LineBasicMaterial"}constructor(e){super(),this.isLineBasicMaterial=!0,this.color=new he(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}},Fo=new E,Ho=new E,Pp=new we,js=new hr,ho=new an,uc=new E,Lp=new E,us=class extends xt{constructor(e=new Qe,t=new sa){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[0];for(let i=1,s=t.count;i<s;i++)Fo.fromBufferAttribute(t,i-1),Ho.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=Fo.distanceTo(Ho);e.setAttribute("lineDistance",new Se(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Line.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),ho.copy(n.boundingSphere),ho.applyMatrix4(i),ho.radius+=s,e.ray.intersectsSphere(ho)===!1)return;Pp.copy(i).invert(),js.copy(e.ray).applyMatrix4(Pp);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=this.isLineSegments?2:1,h=n.index,u=n.attributes.position;if(h!==null){let d=Math.max(0,a.start),p=Math.min(h.count,a.start+a.count);for(let f=d,v=p-1;f<v;f+=c){let m=h.getX(f),g=h.getX(f+1),_=uo(this,e,js,l,m,g);_&&t.push(_)}if(this.isLineLoop){let f=h.getX(p-1),v=h.getX(d),m=uo(this,e,js,l,f,v);m&&t.push(m)}}else{let d=Math.max(0,a.start),p=Math.min(u.count,a.start+a.count);for(let f=d,v=p-1;f<v;f+=c){let m=uo(this,e,js,l,f,f+1);m&&t.push(m)}if(this.isLineLoop){let f=uo(this,e,js,l,p-1,d);f&&t.push(f)}}}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};Dp=new E,Up=new E,zo=class extends us{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,n=[];for(let i=0,s=t.count;i<s;i+=2)Dp.fromBufferAttribute(t,i),Up.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+Dp.distanceTo(Up);e.setAttribute("lineDistance",new Se(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}},ko=class extends us{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}},mr=class extends qt{static get type(){return"PointsMaterial"}constructor(e){super(),this.isPointsMaterial=!0,this.color=new he(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}},Np=new we,mh=new hr,po=new an,fo=new E,ds=class extends xt{constructor(e=new Qe,t=new mr){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){let n=this.geometry,i=this.matrixWorld,s=e.params.Points.threshold,a=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),po.copy(n.boundingSphere),po.applyMatrix4(i),po.radius+=s,e.ray.intersectsSphere(po)===!1)return;Np.copy(i).invert(),mh.copy(e.ray).applyMatrix4(Np);let o=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=o*o,c=n.index,h=n.attributes.position;if(c!==null)for(let u=Math.max(0,a.start),d=Math.min(c.count,a.start+a.count);u<d;u++){let p=c.getX(u);fo.fromBufferAttribute(h,p),Op(fo,p,l,i,e,t,this)}else for(let u=Math.max(0,a.start),d=Math.min(h.count,a.start+a.count);u<d;u++)fo.fromBufferAttribute(h,u),Op(fo,u,l,i,e,t,this)}updateMorphTargets(){let e=this.geometry.morphAttributes,t=Object.keys(e);if(t.length>0){let n=e[t[0]];if(n!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let i=0,s=n.length;i<s;i++){let a=n[i].name||String(i);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=i}}}}};fn=class extends kt{constructor(e,t,n,i,s,a,o,l,c){super(e,t,n,i,s,a,o,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}},Sn=class{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(e,t){let n=this.getUtoTmapping(e);return this.getPoint(n,t)}getPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return t}getSpacedPoints(e=5){let t=[];for(let n=0;n<=e;n++)t.push(this.getPointAt(n/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],n,i=this.getPoint(0),s=0;t.push(0);for(let a=1;a<=e;a++)n=this.getPoint(a/e),s+=n.distanceTo(i),t.push(s),i=n;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t){let n=this.getLengths(),i=0,s=n.length,a;a=t||e*n[s-1];let o,l=0,c=s-1;for(;l<=c;)if(i=Math.floor(l+(c-l)/2),o=n[i]-a,o<0)l=i+1;else{if(!(o>0)){c=i;break}c=i-1}if(i=c,n[i]===a)return i/(s-1);let h=n[i];return(i+(a-h)/(n[i+1]-h))/(s-1)}getTangent(e,t){let i=e-1e-4,s=e+1e-4;i<0&&(i=0),s>1&&(s=1);let a=this.getPoint(i),o=this.getPoint(s),l=t||(a.isVector2?new ie:new E);return l.copy(o).sub(a).normalize(),l}getTangentAt(e,t){let n=this.getUtoTmapping(e);return this.getTangent(n,t)}computeFrenetFrames(e,t){let n=new E,i=[],s=[],a=[],o=new E,l=new we;for(let p=0;p<=e;p++){let f=p/e;i[p]=this.getTangentAt(f,new E)}s[0]=new E,a[0]=new E;let c=Number.MAX_VALUE,h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),u<=c&&(c=u,n.set(0,1,0)),d<=c&&n.set(0,0,1),o.crossVectors(i[0],n).normalize(),s[0].crossVectors(i[0],o),a[0].crossVectors(i[0],s[0]);for(let p=1;p<=e;p++){if(s[p]=s[p-1].clone(),a[p]=a[p-1].clone(),o.crossVectors(i[p-1],i[p]),o.length()>Number.EPSILON){o.normalize();let f=Math.acos(Dt(i[p-1].dot(i[p]),-1,1));s[p].applyMatrix4(l.makeRotationAxis(o,f))}a[p].crossVectors(i[p],s[p])}if(t===!0){let p=Math.acos(Dt(s[0].dot(s[e]),-1,1));p/=e,i[0].dot(o.crossVectors(s[0],s[e]))>0&&(p=-p);for(let f=1;f<=e;f++)s[f].applyMatrix4(l.makeRotationAxis(i[f],p*f)),a[f].crossVectors(i[f],s[f])}return{tangents:i,normals:s,binormals:a}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}},aa=class extends Sn{constructor(e=0,t=0,n=1,i=1,s=0,a=2*Math.PI,o=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=n,this.yRadius=i,this.aStartAngle=s,this.aEndAngle=a,this.aClockwise=o,this.aRotation=l}getPoint(e,t=new ie){let n=t,i=2*Math.PI,s=this.aEndAngle-this.aStartAngle,a=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=i;for(;s>i;)s-=i;s<Number.EPSILON&&(s=a?0:i),this.aClockwise!==!0||a||(s===i?s=-i:s-=i);let o=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(o),c=this.aY+this.yRadius*Math.sin(o);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,p=c-this.aY;l=d*h-p*u+this.aX,c=d*u+p*h+this.aY}return n.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}},gh=class extends aa{constructor(e,t,n,i,s,a){super(e,t,n,n,i,s,a),this.isArcCurve=!0,this.type="ArcCurve"}};mo=new E,dc=new Yh,pc=new Yh,fc=new Yh,gr=class extends Sn{constructor(e=[],t=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=n,this.tension=i}getPoint(e,t=new E){let n=t,i=this.points,s=i.length,a=(s-(this.closed?0:1))*e,o,l,c=Math.floor(a),h=a-c;this.closed?c+=c>0?0:(Math.floor(Math.abs(c)/s)+1)*s:h===0&&c===s-1&&(c=s-2,h=1),this.closed||c>0?o=i[(c-1)%s]:(mo.subVectors(i[0],i[1]).add(i[0]),o=mo);let u=i[c%s],d=i[(c+1)%s];if(this.closed||c+2<s?l=i[(c+2)%s]:(mo.subVectors(i[s-1],i[s-2]).add(i[s-1]),l=mo),this.curveType==="centripetal"||this.curveType==="chordal"){let p=this.curveType==="chordal"?.5:.25,f=Math.pow(o.distanceToSquared(u),p),v=Math.pow(u.distanceToSquared(d),p),m=Math.pow(d.distanceToSquared(l),p);v<1e-4&&(v=1),f<1e-4&&(f=v),m<1e-4&&(m=v),dc.initNonuniformCatmullRom(o.x,u.x,d.x,l.x,f,v,m),pc.initNonuniformCatmullRom(o.y,u.y,d.y,l.y,f,v,m),fc.initNonuniformCatmullRom(o.z,u.z,d.z,l.z,f,v,m)}else this.curveType==="catmullrom"&&(dc.initCatmullRom(o.x,u.x,d.x,l.x,this.tension),pc.initCatmullRom(o.y,u.y,d.y,l.y,this.tension),fc.initCatmullRom(o.z,u.z,d.z,l.z,this.tension));return n.set(dc.calc(h),pc.calc(h),fc.calc(h)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new E().fromArray(i))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};Go=class extends Sn{constructor(e=new ie,t=new ie,n=new ie,i=new ie){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new ie){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set($s(e,i.x,s.x,a.x,o.x),$s(e,i.y,s.y,a.y,o.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},vh=class extends Sn{constructor(e=new E,t=new E,n=new E,i=new E){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=n,this.v3=i}getPoint(e,t=new E){let n=t,i=this.v0,s=this.v1,a=this.v2,o=this.v3;return n.set($s(e,i.x,s.x,a.x,o.x),$s(e,i.y,s.y,a.y,o.y),$s(e,i.z,s.z,a.z,o.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}},Vo=class extends Sn{constructor(e=new ie,t=new ie){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ie){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ie){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},_h=class extends Sn{constructor(e=new E,t=new E){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new E){let n=t;return e===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(e).add(this.v1)),n}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new E){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Wo=class extends Sn{constructor(e=new ie,t=new ie,n=new ie){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new ie){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Js(e,i.x,s.x,a.x),Js(e,i.y,s.y,a.y)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},jo=class extends Sn{constructor(e=new E,t=new E,n=new E){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=n}getPoint(e,t=new E){let n=t,i=this.v0,s=this.v1,a=this.v2;return n.set(Js(e,i.x,s.x,a.x),Js(e,i.y,s.y,a.y),Js(e,i.z,s.z,a.z)),n}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}},Xo=class extends Sn{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ie){let n=t,i=this.points,s=(i.length-1)*e,a=Math.floor(s),o=s-a,l=i[a===0?a:a-1],c=i[a],h=i[a>i.length-2?i.length-1:a+1],u=i[a>i.length-3?i.length-1:a+2];return n.set(Bp(o,l.x,c.x,h.x,u.x),Bp(o,l.y,c.y,h.y,u.y)),n}copy(e){super.copy(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,n=this.points.length;t<n;t++){let i=this.points[t];e.points.push(i.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,n=e.points.length;t<n;t++){let i=e.points[t];this.points.push(new ie().fromArray(i))}return this}},qo=Object.freeze({__proto__:null,ArcCurve:gh,CatmullRomCurve3:gr,CubicBezierCurve:Go,CubicBezierCurve3:vh,EllipseCurve:aa,LineCurve:Vo,LineCurve3:_h,QuadraticBezierCurve:Wo,QuadraticBezierCurve3:jo,SplineCurve:Xo}),xh=class extends Sn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let n=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new qo[n](t,e))}return this}getPoint(e,t){let n=e*this.getLength(),i=this.getCurveLengths(),s=0;for(;s<i.length;){if(i[s]>=n){let a=i[s]-n,o=this.curves[s],l=o.getLength(),c=l===0?0:1-a/l;return o.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let n=0,i=this.curves.length;n<i;n++)t+=this.curves[n].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let n=0;n<=e;n++)t.push(this.getPoint(n/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],n;for(let i=0,s=this.curves;i<s.length;i++){let a=s[i],o=a.isEllipseCurve?2*e:a.isLineCurve||a.isLineCurve3?1:a.isSplineCurve?e*a.points.length:e,l=a.getPoints(o);for(let c=0;c<l.length;c++){let h=l[c];n&&n.equals(h)||(t.push(h),n=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(i.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,n=this.curves.length;t<n;t++){let i=this.curves[t];e.curves.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,n=e.curves.length;t<n;t++){let i=e.curves[t];this.curves.push(new qo[i.type]().fromJSON(i))}return this}},oa=class extends xh{constructor(e){super(),this.type="Path",this.currentPoint=new ie,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,n=e.length;t<n;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let n=new Vo(this.currentPoint.clone(),new ie(e,t));return this.curves.push(n),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,n,i){let s=new Wo(this.currentPoint.clone(),new ie(e,t),new ie(n,i));return this.curves.push(s),this.currentPoint.set(n,i),this}bezierCurveTo(e,t,n,i,s,a){let o=new Go(this.currentPoint.clone(),new ie(e,t),new ie(n,i),new ie(s,a));return this.curves.push(o),this.currentPoint.set(s,a),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),n=new Xo(t);return this.curves.push(n),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,n,i,s,a){let o=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+o,t+l,n,i,s,a),this}absarc(e,t,n,i,s,a){return this.absellipse(e,t,n,n,i,s,a),this}ellipse(e,t,n,i,s,a,o,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,n,i,s,a,o,l),this}absellipse(e,t,n,i,s,a,o,l){let c=new aa(e,t,n,i,s,a,o,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}},Yo=class r extends Qe{constructor(e=[new ie(0,-.5),new ie(.5,0),new ie(0,.5)],t=12,n=0,i=2*Math.PI){super(),this.type="LatheGeometry",this.parameters={points:e,segments:t,phiStart:n,phiLength:i},t=Math.floor(t),i=Dt(i,0,2*Math.PI);let s=[],a=[],o=[],l=[],c=[],h=1/t,u=new E,d=new ie,p=new E,f=new E,v=new E,m=0,g=0;for(let _=0;_<=e.length-1;_++)switch(_){case 0:m=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,p.x=1*g,p.y=-m,p.z=0*g,v.copy(p),p.normalize(),l.push(p.x,p.y,p.z);break;case e.length-1:l.push(v.x,v.y,v.z);break;default:m=e[_+1].x-e[_].x,g=e[_+1].y-e[_].y,p.x=1*g,p.y=-m,p.z=0*g,f.copy(p),p.x+=v.x,p.y+=v.y,p.z+=v.z,p.normalize(),l.push(p.x,p.y,p.z),v.copy(f)}for(let _=0;_<=t;_++){let x=n+_*h*i,y=Math.sin(x),S=Math.cos(x);for(let M=0;M<=e.length-1;M++){u.x=e[M].x*y,u.y=e[M].y,u.z=e[M].x*S,a.push(u.x,u.y,u.z),d.x=_/t,d.y=M/(e.length-1),o.push(d.x,d.y);let b=l[3*M+0]*y,T=l[3*M+1],R=l[3*M+0]*S;c.push(b,T,R)}}for(let _=0;_<t;_++)for(let x=0;x<e.length-1;x++){let y=x+_*e.length,S=y,M=y+e.length,b=y+e.length+1,T=y+1;s.push(S,M,T),s.push(b,T,M)}this.setIndex(s),this.setAttribute("position",new Se(a,3)),this.setAttribute("uv",new Se(o,2)),this.setAttribute("normal",new Se(c,3))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.points,e.segments,e.phiStart,e.phiLength)}},ps=class r extends Yo{constructor(e=1,t=1,n=4,i=8){let s=new oa;s.absarc(0,-t/2,e,1.5*Math.PI,0),s.absarc(0,t/2,e,0,.5*Math.PI),super(s.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:e,length:t,capSegments:n,radialSegments:i}}static fromJSON(e){return new r(e.radius,e.length,e.capSegments,e.radialSegments)}},Tn=class r extends Qe{constructor(e=1,t=32,n=0,i=2*Math.PI){super(),this.type="CircleGeometry",this.parameters={radius:e,segments:t,thetaStart:n,thetaLength:i},t=Math.max(3,t);let s=[],a=[],o=[],l=[],c=new E,h=new ie;a.push(0,0,0),o.push(0,0,1),l.push(.5,.5);for(let u=0,d=3;u<=t;u++,d+=3){let p=n+u/t*i;c.x=e*Math.cos(p),c.y=e*Math.sin(p),a.push(c.x,c.y,c.z),o.push(0,0,1),h.x=(a[d]/e+1)/2,h.y=(a[d+1]/e+1)/2,l.push(h.x,h.y)}for(let u=1;u<=t;u++)s.push(u,u+1,0);this.setIndex(s),this.setAttribute("position",new Se(a,3)),this.setAttribute("normal",new Se(o,3)),this.setAttribute("uv",new Se(l,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.segments,e.thetaStart,e.thetaLength)}},We=class r extends Qe{constructor(e=1,t=1,n=1,i=32,s=1,a=!1,o=0,l=2*Math.PI){super(),this.type="CylinderGeometry",this.parameters={radiusTop:e,radiusBottom:t,height:n,radialSegments:i,heightSegments:s,openEnded:a,thetaStart:o,thetaLength:l};let c=this;i=Math.floor(i),s=Math.floor(s);let h=[],u=[],d=[],p=[],f=0,v=[],m=n/2,g=0;function _(x){let y=f,S=new ie,M=new E,b=0,T=x===!0?e:t,R=x===!0?1:-1;for(let V=1;V<=i;V++)u.push(0,m*R,0),d.push(0,R,0),p.push(.5,.5),f++;let O=f;for(let V=0;V<=i;V++){let H=V/i*l+o,X=Math.cos(H),I=Math.sin(H);M.x=T*I,M.y=m*R,M.z=T*X,u.push(M.x,M.y,M.z),d.push(0,R,0),S.x=.5*X+.5,S.y=.5*I*R+.5,p.push(S.x,S.y),f++}for(let V=0;V<i;V++){let H=y+V,X=O+V;x===!0?h.push(X,X+1,H):h.push(X+1,X,H),b+=3}c.addGroup(g,b,x===!0?1:2),g+=b}(function(){let x=new E,y=new E,S=0,M=(t-e)/n;for(let b=0;b<=s;b++){let T=[],R=b/s,O=R*(t-e)+e;for(let V=0;V<=i;V++){let H=V/i,X=H*l+o,I=Math.sin(X),U=Math.cos(X);y.x=O*I,y.y=-R*n+m,y.z=O*U,u.push(y.x,y.y,y.z),x.set(I,M,U).normalize(),d.push(x.x,x.y,x.z),p.push(H,1-R),T.push(f++)}v.push(T)}for(let b=0;b<i;b++)for(let T=0;T<s;T++){let R=v[T][b],O=v[T+1][b],V=v[T+1][b+1],H=v[T][b+1];(e>0||T!==0)&&(h.push(R,O,H),S+=3),(t>0||T!==s-1)&&(h.push(O,V,H),S+=3)}c.addGroup(g,S,0),g+=S})(),a===!1&&(e>0&&_(!0),t>0&&_(!1)),this.setIndex(h),this.setAttribute("position",new Se(u,3)),this.setAttribute("normal",new Se(d,3)),this.setAttribute("uv",new Se(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radiusTop,e.radiusBottom,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},Pt=class r extends We{constructor(e=1,t=1,n=32,i=1,s=!1,a=0,o=2*Math.PI){super(0,e,t,n,i,s,a,o),this.type="ConeGeometry",this.parameters={radius:e,height:t,radialSegments:n,heightSegments:i,openEnded:s,thetaStart:a,thetaLength:o}}static fromJSON(e){return new r(e.radius,e.height,e.radialSegments,e.heightSegments,e.openEnded,e.thetaStart,e.thetaLength)}},vr=class r extends Qe{constructor(e=[],t=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:e,indices:t,radius:n,detail:i};let s=[],a=[];function o(d,p,f,v){let m=v+1,g=[];for(let _=0;_<=m;_++){g[_]=[];let x=d.clone().lerp(f,_/m),y=p.clone().lerp(f,_/m),S=m-_;for(let M=0;M<=S;M++)g[_][M]=M===0&&_===m?x:x.clone().lerp(y,M/S)}for(let _=0;_<m;_++)for(let x=0;x<2*(m-_)-1;x++){let y=Math.floor(x/2);x%2==0?(l(g[_][y+1]),l(g[_+1][y]),l(g[_][y])):(l(g[_][y+1]),l(g[_+1][y+1]),l(g[_+1][y]))}}function l(d){s.push(d.x,d.y,d.z)}function c(d,p){let f=3*d;p.x=e[f+0],p.y=e[f+1],p.z=e[f+2]}function h(d,p,f,v){v<0&&d.x===1&&(a[p]=d.x-1),f.x===0&&f.z===0&&(a[p]=v/2/Math.PI+.5)}function u(d){return Math.atan2(d.z,-d.x)}(function(d){let p=new E,f=new E,v=new E;for(let m=0;m<t.length;m+=3)c(t[m+0],p),c(t[m+1],f),c(t[m+2],v),o(p,f,v,d)})(i),function(d){let p=new E;for(let f=0;f<s.length;f+=3)p.x=s[f+0],p.y=s[f+1],p.z=s[f+2],p.normalize().multiplyScalar(d),s[f+0]=p.x,s[f+1]=p.y,s[f+2]=p.z}(n),function(){let d=new E;for(let f=0;f<s.length;f+=3){d.x=s[f+0],d.y=s[f+1],d.z=s[f+2];let v=u(d)/2/Math.PI+.5,m=(p=d,Math.atan2(-p.y,Math.sqrt(p.x*p.x+p.z*p.z))/Math.PI+.5);a.push(v,1-m)}var p;(function(){let f=new E,v=new E,m=new E,g=new E,_=new ie,x=new ie,y=new ie;for(let S=0,M=0;S<s.length;S+=9,M+=6){f.set(s[S+0],s[S+1],s[S+2]),v.set(s[S+3],s[S+4],s[S+5]),m.set(s[S+6],s[S+7],s[S+8]),_.set(a[M+0],a[M+1]),x.set(a[M+2],a[M+3]),y.set(a[M+4],a[M+5]),g.copy(f).add(v).add(m).divideScalar(3);let b=u(g);h(_,M+0,f,b),h(x,M+2,v,b),h(y,M+4,m,b)}})(),function(){for(let f=0;f<a.length;f+=6){let v=a[f+0],m=a[f+2],g=a[f+4],_=Math.max(v,m,g),x=Math.min(v,m,g);_>.9&&x<.1&&(v<.2&&(a[f+0]+=1),m<.2&&(a[f+2]+=1),g<.2&&(a[f+4]+=1))}}()}(),this.setAttribute("position",new Se(s,3)),this.setAttribute("normal",new Se(s.slice(),3)),this.setAttribute("uv",new Se(a,2)),i===0?this.computeVertexNormals():this.normalizeNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.vertices,e.indices,e.radius,e.details)}},la=class r extends vr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2,i=1/n;super([-1,-1,-1,-1,-1,1,-1,1,-1,-1,1,1,1,-1,-1,1,-1,1,1,1,-1,1,1,1,0,-i,-n,0,-i,n,0,i,-n,0,i,n,-i,-n,0,-i,n,0,i,-n,0,i,n,0,-n,0,-i,n,0,-i,-n,0,i,n,0,i],[3,11,7,3,7,15,3,15,13,7,19,17,7,17,6,7,6,15,17,4,8,17,8,10,17,10,6,8,0,16,8,16,2,8,2,10,0,12,1,0,1,18,0,18,16,6,10,2,6,2,13,6,13,15,2,16,18,2,18,3,2,3,13,18,1,9,18,9,11,18,11,3,4,14,12,4,12,0,4,0,8,11,9,5,11,5,19,11,19,7,19,5,14,19,14,4,19,4,17,1,12,14,1,14,5,1,5,9],e,t),this.type="DodecahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},go=new E,vo=new E,mc=new E,_o=new oi,yh=class extends Qe{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let i=Math.pow(10,4),s=Math.cos(Yr*t),a=e.getIndex(),o=e.getAttribute("position"),l=a?a.count:o.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},p=[];for(let f=0;f<l;f+=3){a?(c[0]=a.getX(f),c[1]=a.getX(f+1),c[2]=a.getX(f+2)):(c[0]=f,c[1]=f+1,c[2]=f+2);let{a:v,b:m,c:g}=_o;if(v.fromBufferAttribute(o,c[0]),m.fromBufferAttribute(o,c[1]),g.fromBufferAttribute(o,c[2]),_o.getNormal(mc),u[0]=`${Math.round(v.x*i)},${Math.round(v.y*i)},${Math.round(v.z*i)}`,u[1]=`${Math.round(m.x*i)},${Math.round(m.y*i)},${Math.round(m.z*i)}`,u[2]=`${Math.round(g.x*i)},${Math.round(g.y*i)},${Math.round(g.z*i)}`,u[0]!==u[1]&&u[1]!==u[2]&&u[2]!==u[0])for(let _=0;_<3;_++){let x=(_+1)%3,y=u[_],S=u[x],M=_o[h[_]],b=_o[h[x]],T=`${y}_${S}`,R=`${S}_${y}`;R in d&&d[R]?(mc.dot(d[R].normal)<=s&&(p.push(M.x,M.y,M.z),p.push(b.x,b.y,b.z)),d[R]=null):T in d||(d[T]={index0:c[_],index1:c[x],normal:mc.clone()})}}for(let f in d)if(d[f]){let{index0:v,index1:m}=d[f];go.fromBufferAttribute(o,v),vo.fromBufferAttribute(o,m),p.push(go.x,go.y,go.z),p.push(vo.x,vo.y,vo.z)}this.setAttribute("position",new Se(p,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}},fs=class extends oa{constructor(e){super(e),this.uuid=Mn(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let n=0,i=this.holes.length;n<i;n++)t[n]=this.holes[n].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(i.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,n=this.holes.length;t<n;t++){let i=this.holes[t];e.holes.push(i.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,n=e.holes.length;t<n;t++){let i=e.holes[t];this.holes.push(new oa().fromJSON(i))}return this}},rv=function(r,e,t=2){let n=e&&e.length,i=n?e[0]*t:r.length,s=Fp(r,0,i,t,!0),a=[];if(!s||s.next===s.prev)return a;let o,l,c,h,u,d,p;if(n&&(s=function(f,v,m,g){let _=[],x,y,S,M,b;for(x=0,y=v.length;x<y;x++)S=v[x]*g,M=x<y-1?v[x+1]*g:f.length,b=Fp(f,S,M,g,!1),b===b.next&&(b.steiner=!0),_.push(dv(b));for(_.sort(cv),x=0;x<_.length;x++)m=hv(_[x],m);return m}(r,e,s,t)),r.length>80*t){o=c=r[0],l=h=r[1];for(let f=t;f<i;f+=t)u=r[f],d=r[f+1],u<o&&(o=u),d<l&&(l=d),u>c&&(c=u),d>h&&(h=d);p=Math.max(c-o,h-l),p=p!==0?32767/p:0}return ca(s,a,t,o,l,p,0),a};Ci=class r{static area(e){let t=e.length,n=0;for(let i=t-1,s=0;s<t;i=s++)n+=e[i].x*e[s].y-e[s].x*e[i].y;return .5*n}static isClockWise(e){return r.area(e)<0}static triangulateShape(e,t){let n=[],i=[],s=[];zp(e),kp(n,e);let a=e.length;t.forEach(zp);for(let l=0;l<t.length;l++)i.push(a),a+=t[l].length,kp(n,t[l]);let o=rv(n,i);for(let l=0;l<o.length;l+=3)s.push(o.slice(l,l+3));return s}};Eh=class r extends Qe{constructor(e=new fs([new ie(.5,.5),new ie(-.5,.5),new ie(-.5,-.5),new ie(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let n=this,i=[],s=[];for(let o=0,l=e.length;o<l;o++)a(e[o]);function a(o){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled===void 0||t.bevelEnabled,p=t.bevelThickness!==void 0?t.bevelThickness:.2,f=t.bevelSize!==void 0?t.bevelSize:p-.1,v=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,g=t.extrudePath,_=t.UVGenerator!==void 0?t.UVGenerator:fv,x,y,S,M,b,T=!1;g&&(x=g.getSpacedPoints(h),T=!0,d=!1,y=g.computeFrenetFrames(h,!1),S=new E,M=new E,b=new E),d||(m=0,p=0,f=0,v=0);let R=o.extractPoints(c),O=R.shape,V=R.holes;if(!Ci.isClockWise(O)){O=O.reverse();for(let B=0,L=V.length;B<L;B++){let N=V[B];Ci.isClockWise(N)&&(V[B]=N.reverse())}}let H=Ci.triangulateShape(O,V),X=O;for(let B=0,L=V.length;B<L;B++){let N=V[B];O=O.concat(N)}function I(B,L,N){return L||console.error("THREE.ExtrudeGeometry: vec does not exist"),B.clone().addScaledVector(L,N)}let U=O.length,z=H.length;function q(B,L,N){let w,D,G,te=B.x-L.x,k=B.y-L.y,$=N.x-B.x,J=N.y-B.y,ne=te*te+k*k,fe=te*J-k*$;if(Math.abs(fe)>Number.EPSILON){let de=Math.sqrt(ne),be=Math.sqrt($*$+J*J),De=L.x-k/de,et=L.y+te/de,je=((N.x-J/be-De)*J-(N.y+$/be-et)*$)/(te*J-k*$);w=De+te*je-B.x,D=et+k*je-B.y;let Ee=w*w+D*D;if(Ee<=2)return new ie(w,D);G=Math.sqrt(Ee/2)}else{let de=!1;te>Number.EPSILON?$>Number.EPSILON&&(de=!0):te<-Number.EPSILON?$<-Number.EPSILON&&(de=!0):Math.sign(k)===Math.sign(J)&&(de=!0),de?(w=-k,D=te,G=Math.sqrt(ne)):(w=te,D=k,G=Math.sqrt(ne/2))}return new ie(w/G,D/G)}let Z=[];for(let B=0,L=X.length,N=L-1,w=B+1;B<L;B++,N++,w++)N===L&&(N=0),w===L&&(w=0),Z[B]=q(X[B],X[N],X[w]);let ae=[],pe,Q=Z.concat();for(let B=0,L=V.length;B<L;B++){let N=V[B];pe=[];for(let w=0,D=N.length,G=D-1,te=w+1;w<D;w++,G++,te++)G===D&&(G=0),te===D&&(te=0),pe[w]=q(N[w],N[G],N[te]);ae.push(pe),Q=Q.concat(pe)}for(let B=0;B<m;B++){let L=B/m,N=p*Math.cos(L*Math.PI/2),w=f*Math.sin(L*Math.PI/2)+v;for(let D=0,G=X.length;D<G;D++){let te=I(X[D],Z[D],w);_e(te.x,te.y,-N)}for(let D=0,G=V.length;D<G;D++){let te=V[D];pe=ae[D];for(let k=0,$=te.length;k<$;k++){let J=I(te[k],pe[k],w);_e(J.x,J.y,-N)}}}let re=f+v;for(let B=0;B<U;B++){let L=d?I(O[B],Q[B],re):O[B];T?(M.copy(y.normals[0]).multiplyScalar(L.x),S.copy(y.binormals[0]).multiplyScalar(L.y),b.copy(x[0]).add(M).add(S),_e(b.x,b.y,b.z)):_e(L.x,L.y,0)}for(let B=1;B<=h;B++)for(let L=0;L<U;L++){let N=d?I(O[L],Q[L],re):O[L];T?(M.copy(y.normals[B]).multiplyScalar(N.x),S.copy(y.binormals[B]).multiplyScalar(N.y),b.copy(x[B]).add(M).add(S),_e(b.x,b.y,b.z)):_e(N.x,N.y,u/h*B)}for(let B=m-1;B>=0;B--){let L=B/m,N=p*Math.cos(L*Math.PI/2),w=f*Math.sin(L*Math.PI/2)+v;for(let D=0,G=X.length;D<G;D++){let te=I(X[D],Z[D],w);_e(te.x,te.y,u+N)}for(let D=0,G=V.length;D<G;D++){let te=V[D];pe=ae[D];for(let k=0,$=te.length;k<$;k++){let J=I(te[k],pe[k],w);T?_e(J.x,J.y+x[h-1].y,x[h-1].x+N):_e(J.x,J.y,u+N)}}}function ve(B,L){let N=B.length;for(;--N>=0;){let w=N,D=N-1;D<0&&(D=B.length-1);for(let G=0,te=h+2*m;G<te;G++){let k=U*G,$=U*(G+1);P(L+w+k,L+D+k,L+D+$,L+w+$)}}}function _e(B,L,N){l.push(B),l.push(L),l.push(N)}function ue(B,L,N){C(B),C(L),C(N);let w=i.length/3,D=_.generateTopUV(n,i,w-3,w-2,w-1);F(D[0]),F(D[1]),F(D[2])}function P(B,L,N,w){C(B),C(L),C(w),C(L),C(N),C(w);let D=i.length/3,G=_.generateSideWallUV(n,i,D-6,D-3,D-2,D-1);F(G[0]),F(G[1]),F(G[3]),F(G[1]),F(G[2]),F(G[3])}function C(B){i.push(l[3*B+0]),i.push(l[3*B+1]),i.push(l[3*B+2])}function F(B){s.push(B.x),s.push(B.y)}(function(){let B=i.length/3;if(d){let L=0,N=U*L;for(let w=0;w<z;w++){let D=H[w];ue(D[2]+N,D[1]+N,D[0]+N)}L=h+2*m,N=U*L;for(let w=0;w<z;w++){let D=H[w];ue(D[0]+N,D[1]+N,D[2]+N)}}else{for(let L=0;L<z;L++){let N=H[L];ue(N[2],N[1],N[0])}for(let L=0;L<z;L++){let N=H[L];ue(N[0]+U*h,N[1]+U*h,N[2]+U*h)}}n.addGroup(B,i.length/3-B,0)})(),function(){let B=i.length/3,L=0;ve(X,L),L+=X.length;for(let N=0,w=V.length;N<w;N++){let D=V[N];ve(D,L),L+=D.length}n.addGroup(B,i.length/3-B,1)}()}this.setAttribute("position",new Se(i,3)),this.setAttribute("uv",new Se(s,2)),this.computeVertexNormals()}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return function(t,n,i){if(i.shapes=[],Array.isArray(t))for(let s=0,a=t.length;s<a;s++){let o=t[s];i.shapes.push(o.uuid)}else i.shapes.push(t.uuid);return i.options=Object.assign({},n),n.extrudePath!==void 0&&(i.options.extrudePath=n.extrudePath.toJSON()),i}(this.parameters.shapes,this.parameters.options,e)}static fromJSON(e,t){let n=[];for(let s=0,a=e.shapes.length;s<a;s++){let o=t[e.shapes[s]];n.push(o)}let i=e.options.extrudePath;return i!==void 0&&(e.options.extrudePath=new qo[i.type]().fromJSON(i)),new r(n,e.options)}},fv={generateTopUV:function(r,e,t,n,i){let s=e[3*t],a=e[3*t+1],o=e[3*n],l=e[3*n+1],c=e[3*i],h=e[3*i+1];return[new ie(s,a),new ie(o,l),new ie(c,h)]},generateSideWallUV:function(r,e,t,n,i,s){let a=e[3*t],o=e[3*t+1],l=e[3*t+2],c=e[3*n],h=e[3*n+1],u=e[3*n+2],d=e[3*i],p=e[3*i+1],f=e[3*i+2],v=e[3*s],m=e[3*s+1],g=e[3*s+2];return Math.abs(o-h)<Math.abs(a-c)?[new ie(a,1-l),new ie(c,1-u),new ie(d,1-f),new ie(v,1-g)]:[new ie(o,1-l),new ie(h,1-u),new ie(p,1-f),new ie(m,1-g)]}},Di=class r extends vr{constructor(e=1,t=0){let n=(1+Math.sqrt(5))/2;super([-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1],e,t),this.type="IcosahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},da=class r extends vr{constructor(e=1,t=0){super([1,0,0,-1,0,0,0,1,0,0,-1,0,0,0,1,0,0,-1],[0,2,4,0,4,3,0,3,5,0,5,2,1,2,5,1,5,3,1,3,4,1,4,2],e,t),this.type="OctahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},pa=class r extends Qe{constructor(e=.5,t=1,n=32,i=1,s=0,a=2*Math.PI){super(),this.type="RingGeometry",this.parameters={innerRadius:e,outerRadius:t,thetaSegments:n,phiSegments:i,thetaStart:s,thetaLength:a},n=Math.max(3,n);let o=[],l=[],c=[],h=[],u=e,d=(t-e)/(i=Math.max(1,i)),p=new E,f=new ie;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){let g=s+m/n*a;p.x=u*Math.cos(g),p.y=u*Math.sin(g),l.push(p.x,p.y,p.z),c.push(0,0,1),f.x=(p.x/t+1)/2,f.y=(p.y/t+1)/2,h.push(f.x,f.y)}u+=d}for(let v=0;v<i;v++){let m=v*(n+1);for(let g=0;g<n;g++){let _=g+m,x=_,y=_+n+1,S=_+n+2,M=_+1;o.push(x,y,M),o.push(y,S,M)}}this.setIndex(o),this.setAttribute("position",new Se(l,3)),this.setAttribute("normal",new Se(c,3)),this.setAttribute("uv",new Se(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.innerRadius,e.outerRadius,e.thetaSegments,e.phiSegments,e.thetaStart,e.thetaLength)}},fa=class r extends Qe{constructor(e=new fs([new ie(0,.5),new ie(-.5,-.5),new ie(.5,-.5)]),t=12){super(),this.type="ShapeGeometry",this.parameters={shapes:e,curveSegments:t};let n=[],i=[],s=[],a=[],o=0,l=0;if(Array.isArray(e)===!1)c(e);else for(let h=0;h<e.length;h++)c(e[h]),this.addGroup(o,l,h),o+=l,l=0;function c(h){let u=i.length/3,d=h.extractPoints(t),p=d.shape,f=d.holes;Ci.isClockWise(p)===!1&&(p=p.reverse());for(let m=0,g=f.length;m<g;m++){let _=f[m];Ci.isClockWise(_)===!0&&(f[m]=_.reverse())}let v=Ci.triangulateShape(p,f);for(let m=0,g=f.length;m<g;m++){let _=f[m];p=p.concat(_)}for(let m=0,g=p.length;m<g;m++){let _=p[m];i.push(_.x,_.y,0),s.push(0,0,1),a.push(_.x,_.y)}for(let m=0,g=v.length;m<g;m++){let _=v[m],x=_[0]+u,y=_[1]+u,S=_[2]+u;n.push(x,y,S),l+=3}}this.setIndex(n),this.setAttribute("position",new Se(i,3)),this.setAttribute("normal",new Se(s,3)),this.setAttribute("uv",new Se(a,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return function(t,n){if(n.shapes=[],Array.isArray(t))for(let i=0,s=t.length;i<s;i++){let a=t[i];n.shapes.push(a.uuid)}else n.shapes.push(t.uuid);return n}(this.parameters.shapes,e)}static fromJSON(e,t){let n=[];for(let i=0,s=e.shapes.length;i<s;i++){let a=t[e.shapes[i]];n.push(a)}return new r(n,e.curveSegments)}},Le=class r extends Qe{constructor(e=1,t=32,n=16,i=0,s=2*Math.PI,a=0,o=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:e,widthSegments:t,heightSegments:n,phiStart:i,phiLength:s,thetaStart:a,thetaLength:o},t=Math.max(3,Math.floor(t)),n=Math.max(2,Math.floor(n));let l=Math.min(a+o,Math.PI),c=0,h=[],u=new E,d=new E,p=[],f=[],v=[],m=[];for(let g=0;g<=n;g++){let _=[],x=g/n,y=0;g===0&&a===0?y=.5/t:g===n&&l===Math.PI&&(y=-.5/t);for(let S=0;S<=t;S++){let M=S/t;u.x=-e*Math.cos(i+M*s)*Math.sin(a+x*o),u.y=e*Math.cos(a+x*o),u.z=e*Math.sin(i+M*s)*Math.sin(a+x*o),f.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),m.push(M+y,1-x),_.push(c++)}h.push(_)}for(let g=0;g<n;g++)for(let _=0;_<t;_++){let x=h[g][_+1],y=h[g][_],S=h[g+1][_],M=h[g+1][_+1];(g!==0||a>0)&&p.push(x,y,M),(g!==n-1||l<Math.PI)&&p.push(y,S,M)}this.setIndex(p),this.setAttribute("position",new Se(f,3)),this.setAttribute("normal",new Se(v,3)),this.setAttribute("uv",new Se(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.widthSegments,e.heightSegments,e.phiStart,e.phiLength,e.thetaStart,e.thetaLength)}},Sh=class r extends vr{constructor(e=1,t=0){super([1,1,1,-1,-1,1,-1,1,-1,1,-1,-1],[2,1,0,0,3,2,1,3,0,2,3,1],e,t),this.type="TetrahedronGeometry",this.parameters={radius:e,detail:t}}static fromJSON(e){return new r(e.radius,e.detail)}},Yt=class r extends Qe{constructor(e=1,t=.4,n=12,i=48,s=2*Math.PI){super(),this.type="TorusGeometry",this.parameters={radius:e,tube:t,radialSegments:n,tubularSegments:i,arc:s},n=Math.floor(n),i=Math.floor(i);let a=[],o=[],l=[],c=[],h=new E,u=new E,d=new E;for(let p=0;p<=n;p++)for(let f=0;f<=i;f++){let v=f/i*s,m=p/n*Math.PI*2;u.x=(e+t*Math.cos(m))*Math.cos(v),u.y=(e+t*Math.cos(m))*Math.sin(v),u.z=t*Math.sin(m),o.push(u.x,u.y,u.z),h.x=e*Math.cos(v),h.y=e*Math.sin(v),d.subVectors(u,h).normalize(),l.push(d.x,d.y,d.z),c.push(f/i),c.push(p/n)}for(let p=1;p<=n;p++)for(let f=1;f<=i;f++){let v=(i+1)*p+f-1,m=(i+1)*(p-1)+f-1,g=(i+1)*(p-1)+f,_=(i+1)*p+f;a.push(v,m,_),a.push(m,g,_)}this.setIndex(a),this.setAttribute("position",new Se(o,3)),this.setAttribute("normal",new Se(l,3)),this.setAttribute("uv",new Se(c,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.radialSegments,e.tubularSegments,e.arc)}},Th=class r extends Qe{constructor(e=1,t=.4,n=64,i=8,s=2,a=3){super(),this.type="TorusKnotGeometry",this.parameters={radius:e,tube:t,tubularSegments:n,radialSegments:i,p:s,q:a},n=Math.floor(n),i=Math.floor(i);let o=[],l=[],c=[],h=[],u=new E,d=new E,p=new E,f=new E,v=new E,m=new E,g=new E;for(let x=0;x<=n;++x){let y=x/n*s*Math.PI*2;_(y,s,a,e,p),_(y+.01,s,a,e,f),m.subVectors(f,p),g.addVectors(f,p),v.crossVectors(m,g),g.crossVectors(v,m),v.normalize(),g.normalize();for(let S=0;S<=i;++S){let M=S/i*Math.PI*2,b=-t*Math.cos(M),T=t*Math.sin(M);u.x=p.x+(b*g.x+T*v.x),u.y=p.y+(b*g.y+T*v.y),u.z=p.z+(b*g.z+T*v.z),l.push(u.x,u.y,u.z),d.subVectors(u,p).normalize(),c.push(d.x,d.y,d.z),h.push(x/n),h.push(S/i)}}for(let x=1;x<=n;x++)for(let y=1;y<=i;y++){let S=(i+1)*(x-1)+(y-1),M=(i+1)*x+(y-1),b=(i+1)*x+y,T=(i+1)*(x-1)+y;o.push(S,M,T),o.push(M,b,T)}function _(x,y,S,M,b){let T=Math.cos(x),R=Math.sin(x),O=S/y*x,V=Math.cos(O);b.x=M*(2+V)*.5*T,b.y=M*(2+V)*R*.5,b.z=M*Math.sin(O)*.5}this.setIndex(o),this.setAttribute("position",new Se(l,3)),this.setAttribute("normal",new Se(c,3)),this.setAttribute("uv",new Se(h,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new r(e.radius,e.tube,e.tubularSegments,e.radialSegments,e.p,e.q)}},wh=class r extends Qe{constructor(e=new jo(new E(-1,-1,0),new E(-1,1,0),new E(1,1,0)),t=64,n=1,i=8,s=!1){super(),this.type="TubeGeometry",this.parameters={path:e,tubularSegments:t,radius:n,radialSegments:i,closed:s};let a=e.computeFrenetFrames(t,s);this.tangents=a.tangents,this.normals=a.normals,this.binormals=a.binormals;let o=new E,l=new E,c=new ie,h=new E,u=[],d=[],p=[],f=[];function v(m){h=e.getPointAt(m/t,h);let g=a.normals[m],_=a.binormals[m];for(let x=0;x<=i;x++){let y=x/i*Math.PI*2,S=Math.sin(y),M=-Math.cos(y);l.x=M*g.x+S*_.x,l.y=M*g.y+S*_.y,l.z=M*g.z+S*_.z,l.normalize(),d.push(l.x,l.y,l.z),o.x=h.x+n*l.x,o.y=h.y+n*l.y,o.z=h.z+n*l.z,u.push(o.x,o.y,o.z)}}(function(){for(let m=0;m<t;m++)v(m);v(s===!1?t:0),function(){for(let m=0;m<=t;m++)for(let g=0;g<=i;g++)c.x=m/t,c.y=g/i,p.push(c.x,c.y)}(),function(){for(let m=1;m<=t;m++)for(let g=1;g<=i;g++){let _=(i+1)*(m-1)+(g-1),x=(i+1)*m+(g-1),y=(i+1)*m+g,S=(i+1)*(m-1)+g;f.push(_,x,S),f.push(x,y,S)}}()})(),this.setIndex(f),this.setAttribute("position",new Se(u,3)),this.setAttribute("normal",new Se(d,3)),this.setAttribute("uv",new Se(p,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON();return e.path=this.parameters.path.toJSON(),e}static fromJSON(e){return new r(new qo[e.path.type]().fromJSON(e.path),e.tubularSegments,e.radius,e.radialSegments,e.closed)}},Ah=class extends Qe{constructor(e=null){if(super(),this.type="WireframeGeometry",this.parameters={geometry:e},e!==null){let t=[],n=new Set,i=new E,s=new E;if(e.index!==null){let a=e.attributes.position,o=e.index,l=e.groups;l.length===0&&(l=[{start:0,count:o.count,materialIndex:0}]);for(let c=0,h=l.length;c<h;++c){let u=l[c],d=u.start;for(let p=d,f=d+u.count;p<f;p+=3)for(let v=0;v<3;v++){let m=o.getX(p+v),g=o.getX(p+(v+1)%3);i.fromBufferAttribute(a,m),s.fromBufferAttribute(a,g),Gp(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}}else{let a=e.attributes.position;for(let o=0,l=a.count/3;o<l;o++)for(let c=0;c<3;c++){let h=3*o+c,u=3*o+(c+1)%3;i.fromBufferAttribute(a,h),s.fromBufferAttribute(a,u),Gp(i,s,n)===!0&&(t.push(i.x,i.y,i.z),t.push(s.x,s.y,s.z))}}this.setAttribute("position",new Se(t,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};J_=Object.freeze({__proto__:null,BoxGeometry:tt,CapsuleGeometry:ps,CircleGeometry:Tn,ConeGeometry:Pt,CylinderGeometry:We,DodecahedronGeometry:la,EdgesGeometry:yh,ExtrudeGeometry:Eh,IcosahedronGeometry:Di,LatheGeometry:Yo,OctahedronGeometry:da,PlaneGeometry:En,PolyhedronGeometry:vr,RingGeometry:pa,ShapeGeometry:fa,SphereGeometry:Le,TetrahedronGeometry:Sh,TorusGeometry:Yt,TorusKnotGeometry:Th,TubeGeometry:wh,WireframeGeometry:Ah}),Ui=class extends qt{static get type(){return"MeshStandardMaterial"}constructor(e){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.color=new he(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}},rn=class extends Ui{static get type(){return"MeshPhysicalMaterial"}constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ie(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Dt(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new he(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new he(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new he(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}},Ni=class extends qt{static get type(){return"MeshToonMaterial"}constructor(e){super(),this.isMeshToonMaterial=!0,this.defines={TOON:""},this.color=new he(16777215),this.map=null,this.gradientMap=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.alphaMap=null,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.gradientMap=e.gradientMap,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.alphaMap=e.alphaMap,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}},Zo=class extends qt{static get type(){return"MeshLambertMaterial"}constructor(e){super(),this.isMeshLambertMaterial=!0,this.color=new he(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new he(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=0,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new kn,this.combine=0,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};Oi=class{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,n=this._cachedIndex,i=t[n],s=t[n-1];t:{e:{let a;n:{i:if(!(e<i)){for(let o=n+2;;){if(i===void 0){if(e<s)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===o)break;if(s=i,i=t[++n],e<i)break e}a=t.length;break n}if(e>=s)break t;{let o=t[1];e<o&&(n=2,s=o);for(let l=n-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=s,s=t[--n-1],e>=s)break e}a=n,n=0}}for(;n<a;){let o=n+a>>>1;e<t[o]?a=o:n=o+1}if(i=t[n],s=t[n-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,s,i)}return this.interpolate_(n,s,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i;for(let a=0;a!==i;++a)t[a]=n[s+a];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}},Rh=class extends Oi{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:wd,endingEnd:wd}}intervalChanged_(e,t,n){let i=this.parameterPositions,s=e-2,a=e+1,o=i[s],l=i[a];if(o===void 0)switch(this.getSettings_().endingStart){case Ad:s=e,o=2*t-n;break;case Rd:s=i.length-2,o=t+i[s]-i[s+1];break;default:s=e,o=n}if(l===void 0)switch(this.getSettings_().endingEnd){case Ad:a=e,l=2*n-t;break;case Rd:a=1,l=n+i[1]-i[0];break;default:a=e-1,l=t}let c=.5*(n-t),h=this.valueSize;this._weightPrev=c/(t-o),this._weightNext=c/(l-n),this._offsetPrev=s*h,this._offsetNext=a*h}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,p=this._weightNext,f=(n-t)/(i-t),v=f*f,m=v*f,g=-d*m+2*d*v-d*f,_=(1+d)*m+(-1.5-2*d)*v+(-.5+d)*f+1,x=(-1-p)*m+(1.5+p)*v+.5*f,y=p*m-p*v;for(let S=0;S!==o;++S)s[S]=g*a[h+S]+_*a[c+S]+x*a[l+S]+y*a[u+S];return s}},Ch=class extends Oi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=e*o,c=l-o,h=(n-t)/(i-t),u=1-h;for(let d=0;d!==o;++d)s[d]=a[c+d]*u+a[l+d]*h;return s}},Ih=class extends Oi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}},bn=class{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Mo(t,this.TimeBufferType),this.values=Mo(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:Mo(e.times,Array),values:Mo(e.values,Array)};let i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Ih(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ch(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Rh(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case ts:t=this.InterpolantFactoryMethodDiscrete;break;case ns:t=this.InterpolantFactoryMethodLinear;break;case Nl:t=this.InterpolantFactoryMethodSmooth}if(t===void 0){let n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0){if(e===this.DefaultInterpolation)throw new Error(n);this.setInterpolation(this.DefaultInterpolation)}return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return ts;case this.InterpolantFactoryMethodLinear:return ns;case this.InterpolantFactoryMethodSmooth:return Nl}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){let n=this.times,i=n.length,s=0,a=i-1;for(;s!==i&&n[s]<e;)++s;for(;a!==-1&&n[a]>t;)--a;if(++a,s!==0||a!==i){s>=a&&(a=Math.max(a,1),s=a-1);let o=this.getValueSize();this.times=n.slice(s,a),this.values=this.values.slice(s*o,a*o)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!=0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let n=this.times,i=this.values,s=n.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let a=null;for(let o=0;o!==s;o++){let l=n[o];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,o,l),e=!1;break}if(a!==null&&a>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,o,l,a),e=!1;break}a=l}if(i!==void 0&&mv(i))for(let o=0,l=i.length;o!==l;++o){let c=i[o];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,o,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Nl,s=e.length-1,a=1;for(let o=1;o<s;++o){let l=!1,c=e[o];if(c!==e[o+1]&&(o!==1||c!==e[0]))if(i)l=!0;else{let h=o*n,u=h-n,d=h+n;for(let p=0;p!==n;++p){let f=t[h+p];if(f!==t[u+p]||f!==t[d+p]){l=!0;break}}}if(l){if(o!==a){e[a]=e[o];let h=o*n,u=a*n;for(let d=0;d!==n;++d)t[u+d]=t[h+d]}++a}}if(s>0){e[a]=e[s];for(let o=s*n,l=a*n,c=0;c!==n;++c)t[l+c]=t[o+c];++a}return a!==e.length?(this.times=e.slice(0,a),this.values=t.slice(0,a*n)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),n=new this.constructor(this.name,e,t);return n.createInterpolant=this.createInterpolant,n}};bn.prototype.TimeBufferType=Float32Array,bn.prototype.ValueBufferType=Float32Array,bn.prototype.DefaultInterpolation=ns;wi=class extends bn{constructor(e,t,n){super(e,t,n)}};wi.prototype.ValueTypeName="bool",wi.prototype.ValueBufferType=Array,wi.prototype.DefaultInterpolation=ts,wi.prototype.InterpolantFactoryMethodLinear=void 0,wi.prototype.InterpolantFactoryMethodSmooth=void 0;Ko=class extends bn{};Ko.prototype.ValueTypeName="color";ui=class extends bn{};ui.prototype.ValueTypeName="number";Ph=class extends Oi{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=(n-t)/(i-t),c=e*o;for(let h=c+o;c!==h;c+=4)pn.slerpFlat(s,0,a,c-o,a,c,l);return s}},di=class extends bn{InterpolantFactoryMethodLinear(e){return new Ph(this.times,this.values,this.getValueSize(),e)}};di.prototype.ValueTypeName="quaternion",di.prototype.InterpolantFactoryMethodSmooth=void 0;Ai=class extends bn{constructor(e,t,n){super(e,t,n)}};Ai.prototype.ValueTypeName="string",Ai.prototype.ValueBufferType=Array,Ai.prototype.DefaultInterpolation=ts,Ai.prototype.InterpolantFactoryMethodLinear=void 0,Ai.prototype.InterpolantFactoryMethodSmooth=void 0;pi=class extends bn{};pi.prototype.ValueTypeName="vector";Jo=class{constructor(e="",t=-1,n=[],i=2500){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=Mn(),this.duration<0&&this.resetDuration()}static parse(e){let t=[],n=e.tracks,i=1/(e.fps||1);for(let a=0,o=n.length;a!==o;++a)t.push(vv(n[a]).scale(i));let s=new this(e.name,e.duration,t,e.blendMode);return s.uuid=e.uuid,s}static toJSON(e){let t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let s=0,a=n.length;s!==a;++s)t.push(bn.toJSON(n[s]));return i}static CreateFromMorphTargetSequence(e,t,n,i){let s=t.length,a=[];for(let o=0;o<s;o++){let l=[],c=[];l.push((o+s-1)%s,o,(o+1)%s),c.push(0,1,0);let h=gv(l);l=Vp(l,1,h),c=Vp(c,1,h),i||l[0]!==0||(l.push(s),c.push(c[0])),a.push(new ui(".morphTargetInfluences["+t[o].name+"]",l,c).scale(1/n))}return new this(e,-1,a)}static findByName(e,t){let n=e;if(!Array.isArray(e)){let i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){let i={},s=/^([\w-]*?)([\d]+)$/;for(let o=0,l=e.length;o<l;o++){let c=e[o],h=c.name.match(s);if(h&&h.length>1){let u=h[1],d=i[u];d||(i[u]=d=[]),d.push(c)}}let a=[];for(let o in i)a.push(this.CreateFromMorphTargetSequence(o,i[o],t,n));return a}static parseAnimation(e,t){if(!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;let n=function(h,u,d,p,f){if(d.length!==0){let v=[],m=[];Mf(d,v,m,p),v.length!==0&&f.push(new h(u,v,m))}},i=[],s=e.name||"default",a=e.fps||30,o=e.blendMode,l=e.length||-1,c=e.hierarchy||[];for(let h=0;h<c.length;h++){let u=c[h].keys;if(u&&u.length!==0)if(u[0].morphTargets){let d={},p;for(p=0;p<u.length;p++)if(u[p].morphTargets)for(let f=0;f<u[p].morphTargets.length;f++)d[u[p].morphTargets[f]]=-1;for(let f in d){let v=[],m=[];for(let g=0;g!==u[p].morphTargets.length;++g){let _=u[p];v.push(_.time),m.push(_.morphTarget===f?1:0)}i.push(new ui(".morphTargetInfluence["+f+"]",v,m))}l=d.length*a}else{let d=".bones["+t[h].name+"]";n(pi,d+".position",u,"pos",i),n(di,d+".quaternion",u,"rot",i),n(pi,d+".scale",u,"scl",i)}}return i.length===0?null:new this(s,l,i,o)}resetDuration(){let e=0;for(let t=0,n=this.tracks.length;t!==n;++t){let i=this.tracks[t];e=Math.max(e,i.times[i.times.length-1])}return this.duration=e,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){let e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}};Ri={enabled:!1,files:{},add:function(r,e){this.enabled!==!1&&(this.files[r]=e)},get:function(r){if(this.enabled!==!1)return this.files[r]},remove:function(r){delete this.files[r]},clear:function(){this.files={}}},Lh=class{constructor(e,t,n){let i=this,s,a=!1,o=0,l=0,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.itemStart=function(h){l++,a===!1&&i.onStart!==void 0&&i.onStart(h,o,l),a=!0},this.itemEnd=function(h){o++,i.onProgress!==void 0&&i.onProgress(h,o,l),o===l&&(a=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(h){i.onError!==void 0&&i.onError(h)},this.resolveURL=function(h){return s?s(h):h},this.setURLModifier=function(h){return s=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let p=c[u],f=c[u+1];if(p.global&&(p.lastIndex=0),p.test(h))return f}return null}}},Zh=new Lh,fi=class{constructor(e){this.manager=e!==void 0?e:Zh,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let n=this;return new Promise(function(i,s){n.load(e,i,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}};fi.DEFAULT_MATERIAL_NAME="__DEFAULT";si={},Dh=class extends Error{constructor(e,t){super(e),this.response=t}},ma=class extends fi{constructor(e){super(e)}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=Ri.get(e);if(s!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(s),this.manager.itemEnd(e)},0),s;if(si[e]!==void 0)return void si[e].push({onLoad:t,onProgress:n,onError:i});si[e]=[],si[e].push({onLoad:t,onProgress:n,onError:i});let a=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin"}),o=this.mimeType,l=this.responseType;fetch(a).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;let h=si[e],u=c.body.getReader(),d=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),p=d?parseInt(d):0,f=p!==0,v=0,m=new ReadableStream({start(g){(function _(){u.read().then(({done:x,value:y})=>{if(x)g.close();else{v+=y.byteLength;let S=new ProgressEvent("progress",{lengthComputable:f,loaded:v,total:p});for(let M=0,b=h.length;M<b;M++){let T=h[M];T.onProgress&&T.onProgress(S)}g.enqueue(y),_()}},x=>{g.error(x)})})()}});return new Response(m)}throw new Dh(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(h=>new DOMParser().parseFromString(h,o));case"json":return c.json();default:if(o===void 0)return c.text();{let h=/charset="?([^;"\s]*)"?/i.exec(o),u=h&&h[1]?h[1].toLowerCase():void 0,d=new TextDecoder(u);return c.arrayBuffer().then(p=>d.decode(p))}}}).then(c=>{Ri.add(e,c);let h=si[e];delete si[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onLoad&&p.onLoad(c)}}).catch(c=>{let h=si[e];if(h===void 0)throw this.manager.itemError(e),c;delete si[e];for(let u=0,d=h.length;u<d;u++){let p=h[u];p.onError&&p.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}},Uh=class extends fi{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Ri.get(e);if(a!==void 0)return s.manager.itemStart(e),setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a;let o=ta("img");function l(){h(),Ri.add(e,this),t&&t(this),s.manager.itemEnd(e)}function c(u){h(),i&&i(u),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){o.removeEventListener("load",l,!1),o.removeEventListener("error",c,!1)}return o.addEventListener("load",l,!1),o.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(o.crossOrigin=this.crossOrigin),s.manager.itemStart(e),o.src=e,o}},Bi=class extends fi{constructor(e){super(e)}load(e,t,n,i){let s=new kt,a=new Uh(this.manager);return a.setCrossOrigin(this.crossOrigin),a.setPath(this.path),a.load(e,function(o){s.image=o,s.needsUpdate=!0,t!==void 0&&t(s)},n,i),s}},ms=class extends xt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new he(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}},gs=class extends ms{constructor(e,t,n){super(e,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.groundColor=new he(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}},gc=new we,Wp=new E,jp=new E,ga=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ie(512,512),this.map=null,this.mapPass=null,this.matrix=new we,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new as,this._frameExtents=new ie(1,1),this._viewportCount=1,this._viewports=[new rt(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,n=this.matrix;Wp.setFromMatrixPosition(e.matrixWorld),t.position.copy(Wp),jp.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(jp),t.updateMatrixWorld(),gc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(gc),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(gc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),this.mapSize.x===512&&this.mapSize.y===512||(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}},Nh=class extends ga{constructor(){super(new Ut(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1}updateMatrices(e){let t=this.camera,n=2*rs*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height,s=e.distance||t.far;n===t.fov&&i===t.aspect&&s===t.far||(t.fov=n,t.aspect=i,t.far=s,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}},$o=class extends ms{constructor(e,t,n=0,i=Math.PI/3,s=0,a=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.distance=n,this.angle=i,this.penumbra=s,this.decay=a,this.map=null,this.shadow=new Nh}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Xp=new we,Xs=new E,vc=new E,Oh=class extends ga{constructor(){super(new Ut(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ie(4,2),this._viewportCount=6,this._viewports=[new rt(2,1,1,1),new rt(0,1,1,1),new rt(3,1,1,1),new rt(1,1,1,1),new rt(3,0,1,1),new rt(1,0,1,1)],this._cubeDirections=[new E(1,0,0),new E(-1,0,0),new E(0,0,1),new E(0,0,-1),new E(0,1,0),new E(0,-1,0)],this._cubeUps=[new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,1,0),new E(0,0,1),new E(0,0,-1)]}updateMatrices(e,t=0){let n=this.camera,i=this.matrix,s=e.distance||n.far;s!==n.far&&(n.far=s,n.updateProjectionMatrix()),Xs.setFromMatrixPosition(e.matrixWorld),n.position.copy(Xs),vc.copy(n.position),vc.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(vc),n.updateMatrixWorld(),i.makeTranslation(-Xs.x,-Xs.y,-Xs.z),Xp.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Xp)}},Qo=class extends ms{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Oh}get power(){return 4*this.intensity*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}},Bh=class extends ga{constructor(){super(new os(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}},Fi=class extends ms{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(xt.DEFAULT_UP),this.updateMatrix(),this.target=new xt,this.shadow=new Bh}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}},Hi=class{static decodeText(e){if(console.warn("THREE.LoaderUtils: decodeText() has been deprecated with r165 and will be removed with r175. Use TextDecoder instead."),typeof TextDecoder<"u")return new TextDecoder().decode(e);let t="";for(let n=0,i=e.length;n<i;n++)t+=String.fromCharCode(e[n]);try{return decodeURIComponent(escape(t))}catch{return t}}static extractUrlBase(e){let t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}},el=class extends fi{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"}}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,a=Ri.get(e);if(a!==void 0)return s.manager.itemStart(e),a.then?void a.then(c=>{t&&t(c),s.manager.itemEnd(e)}).catch(c=>{i&&i(c)}):(setTimeout(function(){t&&t(a),s.manager.itemEnd(e)},0),a);let o={};o.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",o.headers=this.requestHeader;let l=fetch(e,o).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(s.options,{colorSpaceConversion:"none"}))}).then(function(c){return Ri.add(e,c),t&&t(c),s.manager.itemEnd(e),c}).catch(function(c){i&&i(c),Ri.remove(e),s.manager.itemError(e),s.manager.itemEnd(e)});Ri.add(e,l),s.manager.itemStart(e)}},$_=new we,Q_=new we,ex=new we,tl=class{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=qp(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){let t=qp();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}};tx=new E,nx=new pn,ix=new E,rx=new E,sx=new E,ax=new pn,ox=new E,lx=new E,Kh="\\[\\]\\.:\\/",_v=new RegExp("["+Kh+"]","g"),_c="[^"+Kh+"]",xv="[^"+Kh.replace("\\.","")+"]",yv=new RegExp("^"+/((?:WC+[\/:])*)/.source.replace("WC",_c)+/(WCOD+)?/.source.replace("WCOD",xv)+/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",_c)+/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",_c)+"$"),Mv=["material","materials","bones","map"],mt=class r{constructor(e,t,n){this.path=t,this.parsedPath=n||r.parseTrackName(t),this.node=r.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new r.Composite(e,t,n):new r(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(_v,"")}static parseTrackName(e){let t=yv.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){let s=n.nodeName.substring(i+1);Mv.indexOf(s)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=s)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){let n=function(s){for(let a=0;a<s.length;a++){let o=s[a];if(o.name===t||o.uuid===t)return o;let l=n(o.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let n=this.resolvedProperty;for(let i=0,s=n.length;i!==s;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,n=t.objectName,i=t.propertyName,s=t.propertyIndex;if(e||(e=r.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e)return void console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.materials)return void console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);e=e.material.materials;break;case"bones":if(!e.skeleton)return void console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material)return void console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);if(!e.material.map)return void console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);e=e.material.map;break;default:if(e[n]===void 0)return void console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);e=e[n]}if(c!==void 0){if(e[c]===void 0)return void console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);e=e[c]}}let a=e[i];if(a===void 0){let c=t.nodeName;return void console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e)}let o=this.Versioning.None;this.targetObject=e,e.needsUpdate!==void 0?o=this.Versioning.NeedsUpdate:e.matrixWorldNeedsUpdate!==void 0&&(o=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);if(!e.geometry.morphAttributes)return void console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=a,this.propertyIndex=s}else a.fromArray!==void 0&&a.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=a):Array.isArray(a)?(l=this.BindingType.EntireArray,this.resolvedProperty=a):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][o]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};mt.Composite=class{constructor(r,e,t){let n=t||mt.parseTrackName(e);this._targetGroup=r,this._bindings=r.subscribe_(e,n)}getValue(r,e){this.bind();let t=this._targetGroup.nCachedObjects_,n=this._bindings[t];n!==void 0&&n.getValue(r,e)}setValue(r,e){let t=this._bindings;for(let n=this._targetGroup.nCachedObjects_,i=t.length;n!==i;++n)t[n].setValue(r,e)}bind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].bind()}unbind(){let r=this._bindings;for(let e=this._targetGroup.nCachedObjects_,t=r.length;e!==t;++e)r[e].unbind()}},mt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3},mt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2},mt.prototype.GetterByBindingType=[mt.prototype._getValue_direct,mt.prototype._getValue_array,mt.prototype._getValue_arrayElement,mt.prototype._getValue_toArray],mt.prototype.SetterByBindingTypeAndVersioning=[[mt.prototype._setValue_direct,mt.prototype._setValue_direct_setNeedsUpdate,mt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_array,mt.prototype._setValue_array_setNeedsUpdate,mt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_arrayElement,mt.prototype._setValue_arrayElement_setNeedsUpdate,mt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[mt.prototype._setValue_fromArray,mt.prototype._setValue_fromArray_setNeedsUpdate,mt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];cx=new Float32Array(1),Yp=new we,nl=class{constructor(e,t,n=0,i=1/0){this.ray=new hr(e,t),this.near=n,this.far=i,this.camera=null,this.layers=new na,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Yp.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Yp),this}intersectObject(e,t=!0,n=[]){return Fh(e,this,n,t),n.sort(Zp),n}intersectObjects(e,t=!0,n=[]){for(let i=0,s=e.length;i<s;i++)Fh(e[i],this,n,t);return n.sort(Zp),n}};hx=new ie,ux=new E,dx=new E,px=new E,fx=new E,mx=new we,gx=new we,vx=new E,_x=new he,xx=new he,yx=new E,Mx=new E,bx=new E,Ex=new E,Sx=new ia,Tx=new Vt,wx=new E;typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:xc}})),typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=xc)});function ll(r,e=!1){let t=r[0].index!==null,n=new Set(Object.keys(r[0].attributes)),i=new Set(Object.keys(r[0].morphAttributes)),s={},a={},o=r[0].morphTargetsRelative,l=new Qe,c=0;for(let h=0;h<r.length;++h){let u=r[h],d=0;if(t!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(let p in u.attributes){if(!n.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+p+'" attribute exists among all geometries, or in none of them.'),null;s[p]===void 0&&(s[p]=[]),s[p].push(u.attributes[p]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(o!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(let p in u.morphAttributes){if(!i.has(p))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;a[p]===void 0&&(a[p]=[]),a[p].push(u.morphAttributes[p])}if(e){let p;if(t)p=u.index.count;else if(u.attributes.position!==void 0)p=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,p,h),c+=p}}if(t){let h=0,u=[];for(let d=0;d<r.length;++d){let p=r[d].index;for(let f=0;f<p.count;++f)u.push(p.getX(f)+h);h+=r[d].attributes.position.count}l.setIndex(u)}for(let h in s){let u=bf(s[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,u)}for(let h in a){let u=a[h][0].length;if(u===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let d=0;d<u;++d){let p=[];for(let v=0;v<a[h].length;++v)p.push(a[h][v][d]);let f=bf(p);if(!f)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(f)}}return l}function bf(r){let e,t,n,i=-1,s=0;for(let c=0;c<r.length;++c){let h=r[c];if(e===void 0&&(e=h.array.constructor),e!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(t===void 0&&(t=h.itemSize),t!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;s+=h.count*t}let a=new e(s),o=new at(a,t,n),l=0;for(let c=0;c<r.length;++c){let h=r[c];if(h.isInterleavedBufferAttribute){let u=l/t;for(let d=0,p=h.count;d<p;d++)for(let f=0;f<t;f++){let v=h.getComponent(d,f);o.setComponent(d+u,f,v)}}else a.set(h.array,l);l+=h.count*t}return i!==void 0&&(o.gpuType=i),o}function Jh(r,e){if(e===cf)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),r;if(e===xa||e===rl){let t=r.getIndex();if(t===null){let a=[],o=r.getAttribute("position");if(o!==void 0){for(let l=0;l<o.count;l++)a.push(l);r.setIndex(a),t=r.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),r}let n=t.count-2,i=[];if(e===xa)for(let a=1;a<=n;a++)i.push(t.getX(0)),i.push(t.getX(a)),i.push(t.getX(a+1));else for(let a=0;a<n;a++)a%2===0?(i.push(t.getX(a)),i.push(t.getX(a+1)),i.push(t.getX(a+2))):(i.push(t.getX(a+2)),i.push(t.getX(a+1)),i.push(t.getX(a)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");let s=r.clone();return s.setIndex(i),s.clearGroups(),s}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),r}var $h=sn(()=>{Zn()});function bv(){let r={};return{get:function(e){return r[e]},add:function(e,t){r[e]=t},remove:function(e){delete r[e]},removeAll:function(){r={}}}}function Tv(r){return r.DefaultMaterial===void 0&&(r.DefaultMaterial=new Ui({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Hh})),r.DefaultMaterial}function xr(r,e,t){for(let n in t.extensions)r[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function gi(r,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(r.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function wv(r,e,t){let n=!1,i=!1,s=!1;for(let c=0,h=e.length;c<h;c++){let u=e[c];if(u.POSITION!==void 0&&(n=!0),u.NORMAL!==void 0&&(i=!0),u.COLOR_0!==void 0&&(s=!0),n&&i&&s)break}if(!n&&!i&&!s)return Promise.resolve(r);let a=[],o=[],l=[];for(let c=0,h=e.length;c<h;c++){let u=e[c];if(n){let d=u.POSITION!==void 0?t.getDependency("accessor",u.POSITION):r.attributes.position;a.push(d)}if(i){let d=u.NORMAL!==void 0?t.getDependency("accessor",u.NORMAL):r.attributes.normal;o.push(d)}if(s){let d=u.COLOR_0!==void 0?t.getDependency("accessor",u.COLOR_0):r.attributes.color;l.push(d)}}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l)]).then(function(c){let h=c[0],u=c[1],d=c[2];return n&&(r.morphAttributes.position=h),i&&(r.morphAttributes.normal=u),s&&(r.morphAttributes.color=d),r.morphTargetsRelative=!0,r})}function Av(r,e){if(r.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)r.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){let t=e.extras.targetNames;if(r.morphTargetInfluences.length===t.length){r.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)r.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function Rv(r){let e,t=r.extensions&&r.extensions[qe.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+tu(t.attributes):e=r.indices+":"+tu(r.attributes)+":"+r.mode,r.targets!==void 0)for(let n=0,i=r.targets.length;n<i;n++)e+=":"+tu(r.targets[n]);return e}function tu(r){let e="",t=Object.keys(r).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+r[t[n]]+";";return e}function wu(r){switch(r){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function Cv(r){return r.search(/\.jpe?g($|\?)/i)>0||r.search(/^data\:image\/jpeg/)===0?"image/jpeg":r.search(/\.webp($|\?)/i)>0||r.search(/^data\:image\/webp/)===0?"image/webp":r.search(/\.ktx2($|\?)/i)>0||r.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}function Pv(r,e,t){let n=e.attributes,i=new Vt;if(n.POSITION!==void 0){let o=t.json.accessors[n.POSITION],l=o.min,c=o.max;if(l!==void 0&&c!==void 0){if(i.set(new E(l[0],l[1],l[2]),new E(c[0],c[1],c[2])),o.normalized){let h=wu(xs[o.componentType]);i.min.multiplyScalar(h),i.max.multiplyScalar(h)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;let s=e.targets;if(s!==void 0){let o=new E,l=new E;for(let c=0,h=s.length;c<h;c++){let u=s[c];if(u.POSITION!==void 0){let d=t.json.accessors[u.POSITION],p=d.min,f=d.max;if(p!==void 0&&f!==void 0){if(l.setX(Math.max(Math.abs(p[0]),Math.abs(f[0]))),l.setY(Math.max(Math.abs(p[1]),Math.abs(f[1]))),l.setZ(Math.max(Math.abs(p[2]),Math.abs(f[2]))),d.normalized){let v=wu(xs[d.componentType]);l.multiplyScalar(v)}o.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(o)}r.boundingBox=i;let a=new an;i.getCenter(a.center),a.radius=i.min.distanceTo(i.max)/2,r.boundingSphere=a}function wf(r,e,t){let n=e.attributes,i=[];function s(a,o){return t.getDependency("accessor",a).then(function(l){r.setAttribute(o,l)})}for(let a in n){let o=Tu[a]||a.toLowerCase();o in r.attributes||i.push(s(n[a],o))}if(e.indices!==void 0&&!r.index){let a=t.getDependency("accessor",e.indices).then(function(o){r.setIndex(o)});i.push(a)}return Ke.workingColorSpace!==Zt&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Ke.workingColorSpace}" not supported.`),gi(r,e),Pv(r,e,t),Promise.all(i).then(function(){return e.targets!==void 0?wv(r,e.targets,t):r})}var cl,qe,nu,iu,ru,su,au,ou,lu,cu,hu,uu,du,pu,fu,mu,gu,vu,_u,xu,Af,ya,Ef,yu,Mu,bu,Eu,hl,Ev,Su,Rn,xs,Sf,Tf,Qh,Tu,zi,Sv,eu,Iv,Au,Rf=sn(()=>{Zn();$h();cl=class extends fi{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new su(t)}),this.register(function(t){return new au(t)}),this.register(function(t){return new mu(t)}),this.register(function(t){return new gu(t)}),this.register(function(t){return new vu(t)}),this.register(function(t){return new lu(t)}),this.register(function(t){return new cu(t)}),this.register(function(t){return new hu(t)}),this.register(function(t){return new uu(t)}),this.register(function(t){return new ru(t)}),this.register(function(t){return new du(t)}),this.register(function(t){return new ou(t)}),this.register(function(t){return new fu(t)}),this.register(function(t){return new pu(t)}),this.register(function(t){return new nu(t)}),this.register(function(t){return new _u(t)}),this.register(function(t){return new xu(t)})}load(e,t,n,i){let s=this,a;if(this.resourcePath!=="")a=this.resourcePath;else if(this.path!==""){let c=Hi.extractUrlBase(e);a=Hi.resolveURL(c,this.path)}else a=Hi.extractUrlBase(e);this.manager.itemStart(e);let o=function(c){i?i(c):console.error(c),s.manager.itemError(e),s.manager.itemEnd(e)},l=new ma(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{s.parse(c,a,function(h){t(h),s.manager.itemEnd(e)},o)}catch(h){o(h)}},n,o)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let s,a={},o={},l=new TextDecoder;if(typeof e=="string")s=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Af){try{a[qe.KHR_BINARY_GLTF]=new yu(e)}catch(u){i&&i(u);return}s=JSON.parse(a[qe.KHR_BINARY_GLTF].content)}else s=JSON.parse(l.decode(e));else s=e;if(s.asset===void 0||s.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}let c=new Au(s,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let h=0;h<this.pluginCallbacks.length;h++){let u=this.pluginCallbacks[h](c);u.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),o[u.name]=u,a[u.name]=!0}if(s.extensionsUsed)for(let h=0;h<s.extensionsUsed.length;++h){let u=s.extensionsUsed[h],d=s.extensionsRequired||[];switch(u){case qe.KHR_MATERIALS_UNLIT:a[u]=new iu;break;case qe.KHR_DRACO_MESH_COMPRESSION:a[u]=new Mu(s,this.dracoLoader);break;case qe.KHR_TEXTURE_TRANSFORM:a[u]=new bu;break;case qe.KHR_MESH_QUANTIZATION:a[u]=new Eu;break;default:d.indexOf(u)>=0&&o[u]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+u+'".')}}c.setExtensions(a),c.setPlugins(o),c.parse(n,i)}parseAsync(e,t){let n=this;return new Promise(function(i,s){n.parse(e,t,i,s)})}};qe={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"},nu=class{constructor(e){this.parser=e,this.name=qe.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){let e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){let s=t[n];s.extensions&&s.extensions[this.name]&&s.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,s.extensions[this.name].light)}}_loadLight(e){let t=this.parser,n="light:"+e,i=t.cache.get(n);if(i)return i;let s=t.json,l=((s.extensions&&s.extensions[this.name]||{}).lights||[])[e],c,h=new he(16777215);l.color!==void 0&&h.setRGB(l.color[0],l.color[1],l.color[2],Zt);let u=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new Fi(h),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Qo(h),c.distance=u;break;case"spot":c=new $o(h),c.distance=u,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),c.decay=2,gi(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){let t=this,n=this.parser,s=n.json.nodes[e],o=(s.extensions&&s.extensions[this.name]||{}).light;return o===void 0?null:this._loadLight(o).then(function(l){return n._getNodeRef(t.cache,o,l)})}},iu=class{constructor(){this.name=qe.KHR_MATERIALS_UNLIT}getMaterialType(){return He}extendParams(e,t,n){let i=[];e.color=new he(1,1,1),e.opacity=1;let s=t.pbrMetallicRoughness;if(s){if(Array.isArray(s.baseColorFactor)){let a=s.baseColorFactor;e.color.setRGB(a[0],a[1],a[2],Zt),e.opacity=a[3]}s.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",s.baseColorTexture,st))}return Promise.all(i)}},ru=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name].emissiveStrength;return s!==void 0&&(t.emissiveIntensity=s),Promise.resolve()}},su=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:rn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];if(a.clearcoatFactor!==void 0&&(t.clearcoat=a.clearcoatFactor),a.clearcoatTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatMap",a.clearcoatTexture)),a.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=a.clearcoatRoughnessFactor),a.clearcoatRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"clearcoatRoughnessMap",a.clearcoatRoughnessTexture)),a.clearcoatNormalTexture!==void 0&&(s.push(n.assignTexture(t,"clearcoatNormalMap",a.clearcoatNormalTexture)),a.clearcoatNormalTexture.scale!==void 0)){let o=a.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new ie(o,o)}return Promise.all(s)}},au=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_DISPERSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:rn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.dispersion=s.dispersion!==void 0?s.dispersion:0,Promise.resolve()}},ou=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:rn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.iridescenceFactor!==void 0&&(t.iridescence=a.iridescenceFactor),a.iridescenceTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceMap",a.iridescenceTexture)),a.iridescenceIor!==void 0&&(t.iridescenceIOR=a.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),a.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=a.iridescenceThicknessMinimum),a.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=a.iridescenceThicknessMaximum),a.iridescenceThicknessTexture!==void 0&&s.push(n.assignTexture(t,"iridescenceThicknessMap",a.iridescenceThicknessTexture)),Promise.all(s)}},lu=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SHEEN}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:rn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[];t.sheenColor=new he(0,0,0),t.sheenRoughness=0,t.sheen=1;let a=i.extensions[this.name];if(a.sheenColorFactor!==void 0){let o=a.sheenColorFactor;t.sheenColor.setRGB(o[0],o[1],o[2],Zt)}return a.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=a.sheenRoughnessFactor),a.sheenColorTexture!==void 0&&s.push(n.assignTexture(t,"sheenColorMap",a.sheenColorTexture,st)),a.sheenRoughnessTexture!==void 0&&s.push(n.assignTexture(t,"sheenRoughnessMap",a.sheenRoughnessTexture)),Promise.all(s)}},cu=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:rn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.transmissionFactor!==void 0&&(t.transmission=a.transmissionFactor),a.transmissionTexture!==void 0&&s.push(n.assignTexture(t,"transmissionMap",a.transmissionTexture)),Promise.all(s)}},hu=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_VOLUME}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:rn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.thickness=a.thicknessFactor!==void 0?a.thicknessFactor:0,a.thicknessTexture!==void 0&&s.push(n.assignTexture(t,"thicknessMap",a.thicknessTexture)),t.attenuationDistance=a.attenuationDistance||1/0;let o=a.attenuationColor||[1,1,1];return t.attenuationColor=new he().setRGB(o[0],o[1],o[2],Zt),Promise.all(s)}},uu=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_IOR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:rn}extendMaterialParams(e,t){let i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=i.extensions[this.name];return t.ior=s.ior!==void 0?s.ior:1.5,Promise.resolve()}},du=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_SPECULAR}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:rn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];t.specularIntensity=a.specularFactor!==void 0?a.specularFactor:1,a.specularTexture!==void 0&&s.push(n.assignTexture(t,"specularIntensityMap",a.specularTexture));let o=a.specularColorFactor||[1,1,1];return t.specularColor=new he().setRGB(o[0],o[1],o[2],Zt),a.specularColorTexture!==void 0&&s.push(n.assignTexture(t,"specularColorMap",a.specularColorTexture,st)),Promise.all(s)}},pu=class{constructor(e){this.parser=e,this.name=qe.EXT_MATERIALS_BUMP}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:rn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return t.bumpScale=a.bumpFactor!==void 0?a.bumpFactor:1,a.bumpTexture!==void 0&&s.push(n.assignTexture(t,"bumpMap",a.bumpTexture)),Promise.all(s)}},fu=class{constructor(e){this.parser=e,this.name=qe.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){let n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:rn}extendMaterialParams(e,t){let n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();let s=[],a=i.extensions[this.name];return a.anisotropyStrength!==void 0&&(t.anisotropy=a.anisotropyStrength),a.anisotropyRotation!==void 0&&(t.anisotropyRotation=a.anisotropyRotation),a.anisotropyTexture!==void 0&&s.push(n.assignTexture(t,"anisotropyMap",a.anisotropyTexture)),Promise.all(s)}},mu=class{constructor(e){this.parser=e,this.name=qe.KHR_TEXTURE_BASISU}loadTexture(e){let t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;let s=i.extensions[this.name],a=t.options.ktx2Loader;if(!a){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,s.source,a)}},gu=class{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_WEBP,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: WebP required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},vu=class{constructor(e){this.parser=e,this.name=qe.EXT_TEXTURE_AVIF,this.isSupported=null}loadTexture(e){let t=this.name,n=this.parser,i=n.json,s=i.textures[e];if(!s.extensions||!s.extensions[t])return null;let a=s.extensions[t],o=i.images[a.source],l=n.textureLoader;if(o.uri){let c=n.options.manager.getHandler(o.uri);c!==null&&(l=c)}return this.detectSupport().then(function(c){if(c)return n.loadTextureImage(e,a.source,l);if(i.extensionsRequired&&i.extensionsRequired.indexOf(t)>=0)throw new Error("THREE.GLTFLoader: AVIF required by asset but unsupported.");return n.loadTexture(e)})}detectSupport(){return this.isSupported||(this.isSupported=new Promise(function(e){let t=new Image;t.src="data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAABcAAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAEAAAABAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQAMAAAAABNjb2xybmNseAACAAIABoAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAAB9tZGF0EgAKCBgABogQEDQgMgkQAAAAB8dSLfI=",t.onload=t.onerror=function(){e(t.height===1)}})),this.isSupported}},_u=class{constructor(e){this.name=qe.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){let t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){let i=n.extensions[this.name],s=this.parser.getDependency("buffer",i.buffer),a=this.parser.options.meshoptDecoder;if(!a||!a.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return s.then(function(o){let l=i.byteOffset||0,c=i.byteLength||0,h=i.count,u=i.byteStride,d=new Uint8Array(o,l,c);return a.decodeGltfBufferAsync?a.decodeGltfBufferAsync(h,u,d,i.mode,i.filter).then(function(p){return p.buffer}):a.ready.then(function(){let p=new ArrayBuffer(h*u);return a.decodeGltfBuffer(new Uint8Array(p),h,u,d,i.mode,i.filter),p})})}else return null}},xu=class{constructor(e){this.name=qe.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){let t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;let i=t.meshes[n.mesh];for(let c of i.primitives)if(c.mode!==Rn.TRIANGLES&&c.mode!==Rn.TRIANGLE_STRIP&&c.mode!==Rn.TRIANGLE_FAN&&c.mode!==void 0)return null;let a=n.extensions[this.name].attributes,o=[],l={};for(let c in a)o.push(this.parser.getDependency("accessor",a[c]).then(h=>(l[c]=h,l[c])));return o.length<1?null:(o.push(this.parser.createNodeMesh(e)),Promise.all(o).then(c=>{let h=c.pop(),u=h.isGroup?h.children:[h],d=c[0].count,p=[];for(let f of u){let v=new we,m=new E,g=new pn,_=new E(1,1,1),x=new Bo(f.geometry,f.material,d);for(let y=0;y<d;y++)l.TRANSLATION&&m.fromBufferAttribute(l.TRANSLATION,y),l.ROTATION&&g.fromBufferAttribute(l.ROTATION,y),l.SCALE&&_.fromBufferAttribute(l.SCALE,y),x.setMatrixAt(y,v.compose(m,g,_));for(let y in l)if(y==="_COLOR_0"){let S=l[y];x.instanceColor=new fr(S.array,S.itemSize,S.normalized)}else y!=="TRANSLATION"&&y!=="ROTATION"&&y!=="SCALE"&&f.geometry.setAttribute(y,l[y]);xt.prototype.copy.call(x,f),this.parser.assignFinalMaterial(x),p.push(x)}return h.isGroup?(h.clear(),h.add(...p),h):p[0]}))}},Af="glTF",ya=12,Ef={JSON:1313821514,BIN:5130562},yu=class{constructor(e){this.name=qe.KHR_BINARY_GLTF,this.content=null,this.body=null;let t=new DataView(e,0,ya),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Af)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");let i=this.header.length-ya,s=new DataView(e,ya),a=0;for(;a<i;){let o=s.getUint32(a,!0);a+=4;let l=s.getUint32(a,!0);if(a+=4,l===Ef.JSON){let c=new Uint8Array(e,ya+a,o);this.content=n.decode(c)}else if(l===Ef.BIN){let c=ya+a;this.body=e.slice(c,c+o)}a+=o}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}},Mu=class{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=qe.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){let n=this.json,i=this.dracoLoader,s=e.extensions[this.name].bufferView,a=e.extensions[this.name].attributes,o={},l={},c={};for(let h in a){let u=Tu[h]||h.toLowerCase();o[u]=a[h]}for(let h in e.attributes){let u=Tu[h]||h.toLowerCase();if(a[h]!==void 0){let d=n.accessors[e.attributes[h]],p=xs[d.componentType];c[u]=p.name,l[u]=d.normalized===!0}}return t.getDependency("bufferView",s).then(function(h){return new Promise(function(u,d){i.decodeDracoFile(h,function(p){for(let f in p.attributes){let v=p.attributes[f],m=l[f];m!==void 0&&(v.normalized=m)}u(p)},o,c,Zt,d)})})}},bu=class{constructor(){this.name=qe.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}},Eu=class{constructor(){this.name=qe.KHR_MESH_QUANTIZATION}},hl=class extends Oi{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){let t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,s=e*i*3+i;for(let a=0;a!==i;a++)t[a]=n[s+a];return t}interpolate_(e,t,n,i){let s=this.resultBuffer,a=this.sampleValues,o=this.valueSize,l=o*2,c=o*3,h=i-t,u=(n-t)/h,d=u*u,p=d*u,f=e*c,v=f-c,m=-2*p+3*d,g=p-d,_=1-m,x=g-d+u;for(let y=0;y!==o;y++){let S=a[v+y+o],M=a[v+y+l]*h,b=a[f+y+o],T=a[f+y]*h;s[y]=_*S+x*M+m*b+g*T}return s}},Ev=new pn,Su=class extends hl{interpolate_(e,t,n,i){let s=super.interpolate_(e,t,n,i);return Ev.fromArray(s).normalize().toArray(s),s}},Rn={FLOAT:5126,FLOAT_MAT3:35675,FLOAT_MAT4:35676,FLOAT_VEC2:35664,FLOAT_VEC3:35665,FLOAT_VEC4:35666,LINEAR:9729,REPEAT:10497,SAMPLER_2D:35678,POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,UNSIGNED_BYTE:5121,UNSIGNED_SHORT:5123},xs={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},Sf={9728:It,9729:dn,9984:zh,9985:Ys,9986:Xr,9987:li},Tf={33071:or,33648:lr,10497:Ii},Qh={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},Tu={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},zi={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},Sv={CUBICSPLINE:void 0,LINEAR:ns,STEP:ts},eu={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};Iv=new we,Au=class{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new bv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,s=!1,a=-1;if(typeof navigator<"u"){let o=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(o)===!0;let l=o.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,s=o.indexOf("Firefox")>-1,a=s?o.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||s&&a<98?this.textureLoader=new Bi(this.options.manager):this.textureLoader=new el(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new ma(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){let n=this,i=this.json,s=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(a){return a._markDefs&&a._markDefs()}),Promise.all(this._invokeAll(function(a){return a.beforeRoot&&a.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(a){let o={scene:a[0][i.scene||0],scenes:a[0],animations:a[1],cameras:a[2],asset:i.asset,parser:n,userData:{}};return xr(s,o,i),gi(o,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(o)})).then(function(){for(let l of o.scenes)l.updateMatrixWorld();e(o)})}).catch(t)}_markDefs(){let e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,s=t.length;i<s;i++){let a=t[i].joints;for(let o=0,l=a.length;o<l;o++)e[a[o]].isBone=!0}for(let i=0,s=e.length;i<s;i++){let a=e[i];a.mesh!==void 0&&(this._addNodeRef(this.meshCache,a.mesh),a.skin!==void 0&&(n[a.mesh].isSkinnedMesh=!0)),a.camera!==void 0&&this._addNodeRef(this.cameraCache,a.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;let i=n.clone(),s=(a,o)=>{let l=this.associations.get(a);l!=null&&this.associations.set(o,l);for(let[c,h]of a.children.entries())s(h,o.children[c])};return s(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){let t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){let i=e(t[n]);if(i)return i}return null}_invokeAll(e){let t=Object.values(this.plugins);t.unshift(this);let n=[];for(let i=0;i<t.length;i++){let s=e(t[i]);s&&n.push(s)}return n}getDependency(e,t){let n=e+":"+t,i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(s){return s.loadNode&&s.loadNode(t)});break;case"mesh":i=this._invokeOne(function(s){return s.loadMesh&&s.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(s){return s.loadBufferView&&s.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(s){return s.loadMaterial&&s.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(s){return s.loadTexture&&s.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(s){return s.loadAnimation&&s.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(s){return s!=this&&s.getDependency&&s.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){let n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(s,a){return n.getDependency(e,a)})),this.cache.add(e,t)}return t}loadBuffer(e){let t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[qe.KHR_BINARY_GLTF].body);let i=this.options;return new Promise(function(s,a){n.load(Hi.resolveURL(t.uri,i.path),s,void 0,function(){a(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){let t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){let i=t.byteLength||0,s=t.byteOffset||0;return n.slice(s,s+i)})}loadAccessor(e){let t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){let a=Qh[i.type],o=xs[i.componentType],l=i.normalized===!0,c=new o(i.count*a);return Promise.resolve(new at(c,a,l))}let s=[];return i.bufferView!==void 0?s.push(this.getDependency("bufferView",i.bufferView)):s.push(null),i.sparse!==void 0&&(s.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),s.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(s).then(function(a){let o=a[0],l=Qh[i.type],c=xs[i.componentType],h=c.BYTES_PER_ELEMENT,u=h*l,d=i.byteOffset||0,p=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,f=i.normalized===!0,v,m;if(p&&p!==u){let g=Math.floor(d/p),_="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+g+":"+i.count,x=t.cache.get(_);x||(v=new c(o,g*p,i.count*p/h),x=new cs(v,p/h),t.cache.add(_,x)),m=new ur(x,l,d%p/h,f)}else o===null?v=new c(i.count*l):v=new c(o,d,i.count*l),m=new at(v,l,f);if(i.sparse!==void 0){let g=Qh.SCALAR,_=xs[i.sparse.indices.componentType],x=i.sparse.indices.byteOffset||0,y=i.sparse.values.byteOffset||0,S=new _(a[1],x,i.sparse.count*g),M=new c(a[2],y,i.sparse.count*l);o!==null&&(m=new at(m.array.slice(),m.itemSize,m.normalized)),m.normalized=!1;for(let b=0,T=S.length;b<T;b++){let R=S[b];if(m.setX(R,M[b*l]),l>=2&&m.setY(R,M[b*l+1]),l>=3&&m.setZ(R,M[b*l+2]),l>=4&&m.setW(R,M[b*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}m.normalized=f}return m})}loadTexture(e){let t=this.json,n=this.options,s=t.textures[e].source,a=t.images[s],o=this.textureLoader;if(a.uri){let l=n.manager.getHandler(a.uri);l!==null&&(o=l)}return this.loadTextureImage(e,s,o)}loadTextureImage(e,t,n){let i=this,s=this.json,a=s.textures[e],o=s.images[t],l=(o.uri||o.bufferView)+":"+a.sampler;if(this.textureCache[l])return this.textureCache[l];let c=this.loadImageSource(t,n).then(function(h){h.flipY=!1,h.name=a.name||o.name||"",h.name===""&&typeof o.uri=="string"&&o.uri.startsWith("data:image/")===!1&&(h.name=o.uri);let d=(s.samplers||{})[a.sampler]||{};return h.magFilter=Sf[d.magFilter]||dn,h.minFilter=Sf[d.minFilter]||li,h.wrapS=Tf[d.wrapS]||Ii,h.wrapT=Tf[d.wrapT]||Ii,h.generateMipmaps=!h.isCompressedTexture&&h.minFilter!==It&&h.minFilter!==dn,i.associations.set(h,{textures:e}),h}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){let n=this,i=this.json,s=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(u=>u.clone());let a=i.images[e],o=self.URL||self.webkitURL,l=a.uri||"",c=!1;if(a.bufferView!==void 0)l=n.getDependency("bufferView",a.bufferView).then(function(u){c=!0;let d=new Blob([u],{type:a.mimeType});return l=o.createObjectURL(d),l});else if(a.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");let h=Promise.resolve(l).then(function(u){return new Promise(function(d,p){let f=d;t.isImageBitmapLoader===!0&&(f=function(v){let m=new kt(v);m.needsUpdate=!0,d(m)}),t.load(Hi.resolveURL(u,s.path),f,void 0,p)})}).then(function(u){return c===!0&&o.revokeObjectURL(l),gi(u,a),u.userData.mimeType=a.mimeType||Cv(a.uri),u}).catch(function(u){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),u});return this.sourceCache[e]=h,h}assignTexture(e,t,n,i){let s=this;return this.getDependency("texture",n.index).then(function(a){if(!a)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(a=a.clone(),a.channel=n.texCoord),s.extensions[qe.KHR_TEXTURE_TRANSFORM]){let o=n.extensions!==void 0?n.extensions[qe.KHR_TEXTURE_TRANSFORM]:void 0;if(o){let l=s.associations.get(a);a=s.extensions[qe.KHR_TEXTURE_TRANSFORM].extendTexture(a,o),s.associations.set(a,l)}}return i!==void 0&&(a.colorSpace=i),e[t]=a,a})}assignFinalMaterial(e){let t=e.geometry,n=e.material,i=t.attributes.tangent===void 0,s=t.attributes.color!==void 0,a=t.attributes.normal===void 0;if(e.isPoints){let o="PointsMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new mr,qt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(o,l)),n=l}else if(e.isLine){let o="LineBasicMaterial:"+n.uuid,l=this.cache.get(o);l||(l=new sa,qt.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(o,l)),n=l}if(i||s||a){let o="ClonedMaterial:"+n.uuid+":";i&&(o+="derivative-tangents:"),s&&(o+="vertex-colors:"),a&&(o+="flat-shading:");let l=this.cache.get(o);l||(l=n.clone(),s&&(l.vertexColors=!0),a&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(o,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Ui}loadMaterial(e){let t=this,n=this.json,i=this.extensions,s=n.materials[e],a,o={},l=s.extensions||{},c=[];if(l[qe.KHR_MATERIALS_UNLIT]){let u=i[qe.KHR_MATERIALS_UNLIT];a=u.getMaterialType(),c.push(u.extendParams(o,s,t))}else{let u=s.pbrMetallicRoughness||{};if(o.color=new he(1,1,1),o.opacity=1,Array.isArray(u.baseColorFactor)){let d=u.baseColorFactor;o.color.setRGB(d[0],d[1],d[2],Zt),o.opacity=d[3]}u.baseColorTexture!==void 0&&c.push(t.assignTexture(o,"map",u.baseColorTexture,st)),o.metalness=u.metallicFactor!==void 0?u.metallicFactor:1,o.roughness=u.roughnessFactor!==void 0?u.roughnessFactor:1,u.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(o,"metalnessMap",u.metallicRoughnessTexture)),c.push(t.assignTexture(o,"roughnessMap",u.metallicRoughnessTexture))),a=this._invokeOne(function(d){return d.getMaterialType&&d.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(d){return d.extendMaterialParams&&d.extendMaterialParams(e,o)})))}s.doubleSided===!0&&(o.side=wn);let h=s.alphaMode||eu.OPAQUE;if(h===eu.BLEND?(o.transparent=!0,o.depthWrite=!1):(o.transparent=!1,h===eu.MASK&&(o.alphaTest=s.alphaCutoff!==void 0?s.alphaCutoff:.5)),s.normalTexture!==void 0&&a!==He&&(c.push(t.assignTexture(o,"normalMap",s.normalTexture)),o.normalScale=new ie(1,1),s.normalTexture.scale!==void 0)){let u=s.normalTexture.scale;o.normalScale.set(u,u)}if(s.occlusionTexture!==void 0&&a!==He&&(c.push(t.assignTexture(o,"aoMap",s.occlusionTexture)),s.occlusionTexture.strength!==void 0&&(o.aoMapIntensity=s.occlusionTexture.strength)),s.emissiveFactor!==void 0&&a!==He){let u=s.emissiveFactor;o.emissive=new he().setRGB(u[0],u[1],u[2],Zt)}return s.emissiveTexture!==void 0&&a!==He&&c.push(t.assignTexture(o,"emissiveMap",s.emissiveTexture,st)),Promise.all(c).then(function(){let u=new a(o);return s.name&&(u.name=s.name),gi(u,s),t.associations.set(u,{materials:e}),s.extensions&&xr(i,u,s),u})}createUniqueName(e){let t=mt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){let t=this,n=this.extensions,i=this.primitiveCache;function s(o){return n[qe.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(o,t).then(function(l){return wf(l,o,t)})}let a=[];for(let o=0,l=e.length;o<l;o++){let c=e[o],h=Rv(c),u=i[h];if(u)a.push(u.promise);else{let d;c.extensions&&c.extensions[qe.KHR_DRACO_MESH_COMPRESSION]?d=s(c):d=wf(new Qe,c,t),i[h]={primitive:c,promise:d},a.push(d)}}return Promise.all(a)}loadMesh(e){let t=this,n=this.json,i=this.extensions,s=n.meshes[e],a=s.primitives,o=[];for(let l=0,c=a.length;l<c;l++){let h=a[l].material===void 0?Tv(this.cache):this.getDependency("material",a[l].material);o.push(h)}return o.push(t.loadGeometries(a)),Promise.all(o).then(function(l){let c=l.slice(0,l.length-1),h=l[l.length-1],u=[];for(let p=0,f=h.length;p<f;p++){let v=h[p],m=a[p],g,_=c[p];if(m.mode===Rn.TRIANGLES||m.mode===Rn.TRIANGLE_STRIP||m.mode===Rn.TRIANGLE_FAN||m.mode===void 0)g=s.isSkinnedMesh===!0?new dr(v,_):new ce(v,_),g.isSkinnedMesh===!0&&g.normalizeSkinWeights(),m.mode===Rn.TRIANGLE_STRIP?g.geometry=Jh(g.geometry,rl):m.mode===Rn.TRIANGLE_FAN&&(g.geometry=Jh(g.geometry,xa));else if(m.mode===Rn.LINES)g=new zo(v,_);else if(m.mode===Rn.LINE_STRIP)g=new us(v,_);else if(m.mode===Rn.LINE_LOOP)g=new ko(v,_);else if(m.mode===Rn.POINTS)g=new ds(v,_);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+m.mode);Object.keys(g.geometry.morphAttributes).length>0&&Av(g,s),g.name=t.createUniqueName(s.name||"mesh_"+e),gi(g,s),m.extensions&&xr(i,g,m),t.assignFinalMaterial(g),u.push(g)}for(let p=0,f=u.length;p<f;p++)t.associations.set(u[p],{meshes:e,primitives:p});if(u.length===1)return s.extensions&&xr(i,u[0],s),u[0];let d=new Ue;s.extensions&&xr(i,d,s),t.associations.set(d,{meshes:e});for(let p=0,f=u.length;p<f;p++)d.add(u[p]);return d})}loadCamera(e){let t,n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ut(An.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new os(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),gi(t,n),Promise.resolve(t)}loadSkin(e){let t=this.json.skins[e],n=[];for(let i=0,s=t.joints.length;i<s;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){let s=i.pop(),a=i,o=[],l=[];for(let c=0,h=a.length;c<h;c++){let u=a[c];if(u){o.push(u);let d=new we;s!==null&&d.fromArray(s.array,c*16),l.push(d)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new hs(o,l)})}loadAnimation(e){let t=this.json,n=this,i=t.animations[e],s=i.name?i.name:"animation_"+e,a=[],o=[],l=[],c=[],h=[];for(let u=0,d=i.channels.length;u<d;u++){let p=i.channels[u],f=i.samplers[p.sampler],v=p.target,m=v.node,g=i.parameters!==void 0?i.parameters[f.input]:f.input,_=i.parameters!==void 0?i.parameters[f.output]:f.output;v.node!==void 0&&(a.push(this.getDependency("node",m)),o.push(this.getDependency("accessor",g)),l.push(this.getDependency("accessor",_)),c.push(f),h.push(v))}return Promise.all([Promise.all(a),Promise.all(o),Promise.all(l),Promise.all(c),Promise.all(h)]).then(function(u){let d=u[0],p=u[1],f=u[2],v=u[3],m=u[4],g=[];for(let _=0,x=d.length;_<x;_++){let y=d[_],S=p[_],M=f[_],b=v[_],T=m[_];if(y===void 0)continue;y.updateMatrix&&y.updateMatrix();let R=n._createAnimationTracks(y,S,M,b,T);if(R)for(let O=0;O<R.length;O++)g.push(R[O])}return new Jo(s,void 0,g)})}createNodeMesh(e){let t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(s){let a=n._getNodeRef(n.meshCache,i.mesh,s);return i.weights!==void 0&&a.traverse(function(o){if(o.isMesh)for(let l=0,c=i.weights.length;l<c;l++)o.morphTargetInfluences[l]=i.weights[l]}),a})}loadNode(e){let t=this.json,n=this,i=t.nodes[e],s=n._loadNodeShallow(e),a=[],o=i.children||[];for(let c=0,h=o.length;c<h;c++)a.push(n.getDependency("node",o[c]));let l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([s,Promise.all(a),l]).then(function(c){let h=c[0],u=c[1],d=c[2];d!==null&&h.traverse(function(p){p.isSkinnedMesh&&p.bind(d,Iv)});for(let p=0,f=u.length;p<f;p++)h.add(u[p]);return h})}_loadNodeShallow(e){let t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];let s=t.nodes[e],a=s.name?i.createUniqueName(s.name):"",o=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&o.push(l),s.camera!==void 0&&o.push(i.getDependency("camera",s.camera).then(function(c){return i._getNodeRef(i.cameraCache,s.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){o.push(c)}),this.nodeCache[e]=Promise.all(o).then(function(c){let h;if(s.isBone===!0?h=new pr:c.length>1?h=new Ue:c.length===1?h=c[0]:h=new xt,h!==c[0])for(let u=0,d=c.length;u<d;u++)h.add(c[u]);if(s.name&&(h.userData.name=s.name,h.name=a),gi(h,s),s.extensions&&xr(n,h,s),s.matrix!==void 0){let u=new we;u.fromArray(s.matrix),h.applyMatrix4(u)}else s.translation!==void 0&&h.position.fromArray(s.translation),s.rotation!==void 0&&h.quaternion.fromArray(s.rotation),s.scale!==void 0&&h.scale.fromArray(s.scale);return i.associations.has(h)||i.associations.set(h,{}),i.associations.get(h).nodes=e,h}),this.nodeCache[e]}loadScene(e){let t=this.extensions,n=this.json.scenes[e],i=this,s=new Ue;n.name&&(s.name=i.createUniqueName(n.name)),gi(s,n),n.extensions&&xr(t,s,n);let a=n.nodes||[],o=[];for(let l=0,c=a.length;l<c;l++)o.push(i.getDependency("node",a[l]));return Promise.all(o).then(function(l){for(let h=0,u=l.length;h<u;h++)s.add(l[h]);let c=h=>{let u=new Map;for(let[d,p]of i.associations)(d instanceof qt||d instanceof kt)&&u.set(d,p);return h.traverse(d=>{let p=i.associations.get(d);p!=null&&u.set(d,p)}),u};return i.associations=c(s),s})}_createAnimationTracks(e,t,n,i,s){let a=[],o=e.name?e.name:e.uuid,l=[];zi[s.path]===zi.weights?e.traverse(function(d){d.morphTargetInfluences&&l.push(d.name?d.name:d.uuid)}):l.push(o);let c;switch(zi[s.path]){case zi.weights:c=ui;break;case zi.rotation:c=di;break;case zi.position:case zi.scale:c=pi;break;default:switch(n.itemSize){case 1:c=ui;break;case 2:case 3:default:c=pi;break}break}let h=i.interpolation!==void 0?Sv[i.interpolation]:ns,u=this._getArrayFromAccessor(n);for(let d=0,p=l.length;d<p;d++){let f=new c(l[d]+"."+zi[s.path],t.array,u,h);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(f),a.push(f)}return a}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){let n=wu(t.constructor),i=new Float32Array(t.length);for(let s=0,a=t.length;s<a;s++)i[s]=t[s]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){let i=this instanceof di?Su:hl;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}});var oe,ys,ki,ul,Ru,Gi=sn(()=>{oe={corail:"#ff696a",rose:"#f8a0ab",rosePale:"#f5cacc",bleu:"#9bb3d6",creme:"#F1E6D0",marine:"#243447"},ys={sas:{nom:"Cl\xE9 du Sas",fichier:"sas_cle.glb",icone:"\u{1F511}"},multimedia:{nom:"Cam\xE9ra \xE0 micro et haut-parleur",fichier:"multimedia_camera.glb",icone:"\u{1F4F7}"},design:{nom:"R\xE8gle tranchante comme un cutter",fichier:"design_regle-cutter.glb",icone:"\u{1F4D0}"},informatique:{nom:"Raspberry Pi",fichier:"informatique_raspberry-pi.glb",icone:"\u{1F4BB}"},marketing:{nom:"Parchemin aux puissantes statistiques",fichier:"marketing_parchemin.glb",icone:"\u{1F4DC}"},admin:{nom:"Bouteille Ga\xEFa",fichier:"admin_bouteille-gaia.glb",icone:"\u{1F9C3}"}},ki={sas:{titre:"Le Sas",lieu:"For\xEAt de bambous \u2014 Kyoto",biome:"bambou",jouable:!0,ciel:"#628d34",brume:"#628d34",sol:"#bd8a4c",chemin:oe.creme,accent:oe.corail,fond:"../fonds/sas_bambous.jpg",miniJeu:"demo",suivant:"multimedia",boss:{nom:"Cl\xE9o Forclaz",titre:"Gardienne du Sas (d\xE9mo)",pv:45,pa:6,pm:3,apparence:{espece:"humain",coiffure:"longs",cheveux:"#7a4a25",tenue:"miko",masque:"kitsune"},portrait:"../portraits/cleo_miko.png",sorts:[{nom:"Pichenette",pa:3,portee:[1,1],degats:[5,8]},{nom:"Feuille de bambou",pa:4,portee:[2,4],degats:[4,7]}]}},multimedia:{titre:"Multim\xE9dia",lieu:"Sayo \u2014 champs de tournesols",biome:"tournesol",jouable:!0,ciel:"#82ccfa",brume:"#7aa852",sol:"#77ab52",chemin:oe.creme,accent:"#f2b632",fond:"../fonds/multimedia_tournesols.jpg",miniJeu:"video",suivant:"design",videos:[{titre:"Making-of d\u2019un clip",duree:12,icone:"\u{1F3AC}"},{titre:"Le montage en 3 minutes",duree:12,icone:"\u2702\uFE0F"},{titre:"Prise de son en ext\xE9rieur",duree:12,icone:"\u{1F399}\uFE0F"},{titre:"Lumi\xE8re : la r\xE8gle des 3 points",duree:12,icone:"\u{1F4A1}"}],boss:{nom:"M. Graber",titre:"Boss Multim\xE9dia",pv:85,pa:6,pm:3,apparence:{espece:"humain",tenue:"veste",lunettes:!0,tetePhoto:{texture:"../portraits/graber_tete.png",cadre:[95,75,415,455],nez:285,cheveux:"#b39a7c",peau:"#d3a58e",hauteur:.6,decalage:.07,contour:[[193,84],[250,82],[293,92],[358,108],[390,135],[400,185],[398,250],[390,310],[372,360],[335,405],[295,435],[258,442],[215,428],[170,400],[132,350],[110,300],[105,240],[113,195],[150,122],[172,96]]}},portrait:"../portraits/graber.png",defi:"Ah, te voil\xE0 ! Silence sur le plateau\u2026 moteur\u2026 action ! Voyons si tu tiens la lumi\xE8re.",sorts:[{nom:"Coupe franche",pa:3,portee:[1,1],degats:[9,13]},{nom:"Flash aveuglant",pa:4,portee:[2,5],degats:[7,11]}]}},design:{titre:"Design",lieu:"Parc national de Daisetsuzan",biome:"automne",jouable:!0,ciel:"#f4b98a",brume:"#f2c29a",sol:"#c9884e",chemin:oe.creme,accent:"#e8672c",miniJeu:"7-differences",suivant:"informatique",boss:{nom:"Mme Nicolier",titre:"Boss Design",pv:85,pa:6,pm:3,apparence:{espece:"panda",coiffure:"chignon",cheveux:"#a8643a",kimono:"#e8672c",geta:oe.creme},sorts:[{nom:"Trait de cutter",pa:3,portee:[1,1],degats:[9,13]},{nom:"Palette de couleurs",pa:4,portee:[2,5],degats:[7,11]}]}},informatique:{titre:"Informatique",lieu:"Le Ciel \u2014 \xEEles flottantes",biome:"ciel",jouable:!0,ciel:"#92a3b7",brume:"#a8b8cb",sol:"#bccad8",chemin:oe.creme,accent:oe.corail,fond:"../fonds/informatique_fuji.jpg",miniJeu:"quiz",suivant:"marketing",boss:{nom:"M. Kiner",titre:"Boss Informatique",pv:90,pa:6,pm:3,apparence:{espece:"panda",genre:"homme",coiffure:"chonmage",cheveux:"#2a2a2e",kimono:oe.marine},sorts:[{nom:"Erreur 404",pa:3,portee:[1,2],degats:[9,13]},{nom:"\xC9cran bleu",pa:4,portee:[2,5],degats:[7,11]}]}},marketing:{titre:"Marketing",lieu:"Nara \u2014 glycines",biome:"glycine",jouable:!0,ciel:"#d9b3e0",brume:"#dcbde3",sol:"#9db56a",chemin:oe.creme,accent:"#a44c94",miniJeu:"etapes-projet",suivant:"admin",etapes:["Analyser le march\xE9 et la concurrence","D\xE9finir la cible (persona)","Fixer des objectifs mesurables","Choisir la strat\xE9gie et le positionnement","Construire le plan d\u2019action et le budget","Lancer la campagne","Mesurer les r\xE9sultats et ajuster"],boss:{nom:"M. Droz",titre:"Boss Marketing",pv:90,pa:6,pm:3,apparence:{espece:"shiba",coiffure:"tresses",cheveux:"#5a3a2a",kimono:"#a44c94",geta:oe.corail},sorts:[{nom:"Argument choc",pa:3,portee:[1,1],degats:[10,14]},{nom:"Campagne virale",pa:4,portee:[2,5],degats:[8,12]}]}},admin:{titre:"Admin & gestion",lieu:"Tokyo \u2014 sakura",biome:"sakura",jouable:!0,ciel:"#e2c9ec",brume:"#e6d0ef",sol:"#b49ac8",chemin:oe.creme,accent:"#8a5fb4",miniJeu:"stand-gaia",suivant:"final",codeGaia:"GAIA",boss:{nom:"M. Forestier",titre:"Boss Admin",pv:95,pa:6,pm:3,apparence:{espece:"panda",coiffure:"chonmage",cheveux:"#2a2a2e",kimono:"#8a5fb4",geta:oe.marine},sorts:[{nom:"Facture surprise",pa:3,portee:[1,1],degats:[10,14]},{nom:"Pile de dossiers",pa:4,portee:[2,5],degats:[8,12]}]}},final:{titre:"Boss final \u2014 M\xE9dia global",lieu:"Matsue \u2014 ch\xE2teau au bord du lac",biome:"final",jouable:!0,ciel:"#bfdcf0",brume:"#cfe6f5",sol:"#9fc4dc",chemin:oe.creme,accent:oe.corail,miniJeu:"combat-final",suivant:null,gain:"Passe au stand M\xE9diaventure : ton gain t\u2019attend (goodies, print sp\xE9cial PO ou rabais sur une Ga\xEFa) !",boss:{nom:"M. Denervaud ou M. Haensler",titre:"Boss final",pv:150,pa:7,pm:3,apparence:{espece:"shiba",coiffure:"chonmage",cheveux:"#e8d2a6",kimono:oe.marine,katana:!0,geta:oe.corail},sorts:[{nom:"Coup de ma\xEEtre",pa:3,portee:[1,1],degats:[12,16]},{nom:"Onde m\xE9diatique",pa:4,portee:[2,5],degats:[9,13]}]}}},ul=["sas","multimedia","design","informatique","marketing","admin","final"],Ru=[{id:"katana",nom:"Coup de katana",pa:3,portee:[1,1],degats:[14,19],touche:"1"},{id:"shuriken",nom:"Shuriken",pa:4,portee:[2,5],degats:[9,13],touche:"2"},{id:"matcha",nom:"Th\xE9 matcha",pa:3,portee:[0,0],soin:[12,16],parTour:1,touche:"3"}]});var yr,Cf=sn(()=>{yr=[{q:"Que signifie \xAB CPU \xBB ?",r:["Central Processing Unit","Computer Power Unit","Central Program Utility","Core Peripheral Unit"],ok:0},{q:"Combien de bits contient un octet ?",r:["4","8","16","32"],ok:1},{q:"Quel langage sert \xE0 structurer une page web ?",r:["Python","CSS","HTML","SQL"],ok:2},{q:"Que fait un pare-feu (firewall) ?",r:["Il refroidit le processeur","Il filtre le trafic r\xE9seau","Il compresse les fichiers","Il sauvegarde le disque"],ok:1},{q:"Quelle m\xE9moire est effac\xE9e quand on \xE9teint l\u2019ordinateur ?",r:["Le SSD","La RAM","Le disque dur","La cl\xE9 USB"],ok:1},{q:"Le Raspberry Pi est\u2026",r:["un nano-ordinateur \xE0 carte unique","un syst\xE8me d\u2019exploitation","un langage de programmation","une imprimante 3D"],ok:0},{q:"Quelle adresse est une adresse IPv4 valide ?",r:["192.168.1.300","10.0.0.1","256.1.1.1","fe80::1"],ok:1},{q:"Que veut dire \xAB HTTPS \xBB par rapport \xE0 \xAB HTTP \xBB ?",r:["Plus rapide","Chiffr\xE9 et s\xE9curis\xE9","R\xE9serv\xE9 aux images","Sans connexion internet"],ok:1},{q:"En binaire, 1010 vaut en d\xE9cimal\u2026",r:["8","10","12","5"],ok:1},{q:"Quel est le r\xF4le d\u2019un syst\xE8me d\u2019exploitation ?",r:["G\xE9rer le mat\xE9riel et les programmes","Dessiner des logos","Remplacer le processeur","H\xE9berger des sites web uniquement"],ok:0}]});function Ms(r){return r.traverse(e=>{e.isMesh&&(e.castShadow=!0,e.receiveShadow=!0)}),r}function Lf(r,e,t){let n=[],i=[],s=new Ue;r.add(s),r.background=new he(e.ciel),r.fog=new Gn(e.brume,45,230);let a=new gs("#ffffff",e.sol,1.4),o=new Fi("#fff4e6",2.4);o.position.set(18,30,12),o.castShadow=!0;let l=matchMedia("(pointer: coarse)").matches;o.shadow.mapSize.set(l?1024:2048,l?1024:2048),Object.assign(o.shadow.camera,{left:-30,right:30,top:30,bottom:-30,near:1,far:90}),o.shadow.bias=-5e-4,s.add(a,o);let c=new ce(new We(on+2,on+1,1.2,64),yt(e.sol));c.position.y=-.6,c.receiveShadow=!0,s.add(c);let h=new tt(1.4,.08,.9),u=yt(e.chemin,{roughness:.95});for(let S=19;S>-22;S-=1.3){if(Math.abs(S-Rt.centre.z)<6)continue;let M=new ce(h,u);M.position.set(Math.sin(S*.4)*.4,.02,S),M.rotation.y=Math.sin(S)*.15,M.receiveShadow=!0,s.add(M)}let d=new Ue,p=Rt.cases*Rt.taille,f=new ce(new tt(p+.6,.16,p+.6),yt(oe.creme,{roughness:.9}));f.position.y=0,f.receiveShadow=!0;let v=new ce(new tt(p+1,.12,p+1),yt(oe.marine));v.position.y=-.03,d.add(v,f),d.position.copy(Rt.centre),s.add(d);let m=new ce(new We(p*.72,p*.72,3,48,1,!0),new He({color:e.accent,transparent:!0,opacity:.22,side:wn,depthWrite:!1}));m.position.copy(Rt.centre).setY(1.5),s.add(m);let g={x:Rt.centre.x,z:Rt.centre.z,r:p*.72+.4};n.push(g),i.push((S,M)=>{m.material.opacity=.16+Math.sin(M*2)*.06});let _=Cu(e.accent);_.position.set(0,0,12),s.add(_),n.push({x:-2.1,z:12,r:.45},{x:2.1,z:12,r:.45});let x=Uv(e.accent);return x.position.copy(Ma.portail),x.visible=!1,s.add(x),i.push((S,M)=>{x.visible&&(x.userData.disque.rotation.z-=S*1.5,x.userData.disque.material.opacity=.75+Math.sin(M*3)*.15)}),({bambou:Nv,ciel:Ov,tournesol:Fv,automne:Hv,glycine:zv,sakura:kv,final:Gv}[e.biome]??Bv)({groupe:s,scene:r,niveau:e,colliders:n,animations:i,chargeurTexture:t}),{groupe:s,colliders:n,animations:i,portail:x,ouvrirArene(){m.visible=!1,n.splice(n.indexOf(g),1)},detruire(){r.remove(s),s.traverse(S=>{S.geometry?.dispose(),S.material&&[].concat(S.material).forEach(M=>{M.map?.dispose(),M.dispose()})})}}}function Cu(r=oe.corail,e=1){let t=new Ue,n=yt(r,{roughness:.5}),i=yt(oe.marine,{roughness:.6});for(let c of[-1,1]){let h=new ce(new We(.22,.26,4.6,16),n);h.position.set(2.1*c,2.3,0);let u=new ce(new We(.32,.32,.4,16),i);u.position.set(2.1*c,.2,0),t.add(h,u)}let s=new ce(new tt(5.4,.3,.3),n);s.position.y=3.6;let a=new ce(new tt(6.4,.4,.6),n);a.position.y=4.55;let o=new ce(new tt(6.8,.22,.75),i);o.position.y=4.85;let l=new ce(new tt(.6,.8,.12),yt(oe.creme));return l.position.y=4.05,t.add(s,a,o,l),t.scale.setScalar(e),Ms(t)}function Uv(r){let e=Cu(r,1.1),t=document.createElement("canvas");t.width=t.height=256;let n=t.getContext("2d"),i=n.createRadialGradient(128,128,10,128,128,128);i.addColorStop(0,"#ffffff"),i.addColorStop(.35,oe.rosePale),i.addColorStop(.7,r),i.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=i,n.fillRect(0,0,256,256),n.strokeStyle="rgba(255,255,255,0.7)",n.lineWidth=6;for(let o=0;o<5;o++)n.beginPath(),n.arc(128,128,30+o*18,o,o+2.4),n.stroke();let s=new fn(t);s.colorSpace=st;let a=new ce(new Tn(1.9,48),new He({map:s,transparent:!0,side:wn,depthWrite:!1}));return a.position.y=2,e.add(a),e.userData.disque=a,e}function Iu(r,e,t,{rayon:n,repetitions:i,bas:s}){let a=t.load(e);a.colorSpace=st,a.wrapS=lr,a.repeat.x=i;let o=2*Math.PI*n/i*.75,l=new ce(new We(n,n,o,96,1,!0),new He({map:a,side:va,fog:!1}));return l.position.y=s+o/2,i%2===0&&(l.rotation.y=Math.PI/i),r.add(l),l}function Re(r,e){let t=new he(e),n=r.attributes.position.count,i=new Float32Array(n*3);for(let s=0;s<n;s++)i.set([t.r,t.g,t.b],s*3);return r.setAttribute("color",new at(i,3)),r}function Kt(r){If??(If=yt("#ffffff",{vertexColors:!0}));let e=r.map(n=>n.index?n.toNonIndexed():n),t=new ce(ll(e),If);return r.forEach(n=>n.dispose()),Ms(t)}function dl(r,e,t,n=140){let i=document.createElement("canvas");i.width=i.height=256;let s=i.getContext("2d"),a=s.createRadialGradient(128,128,0,128,128,128);a.addColorStop(0,e),a.addColorStop(.3,e),a.addColorStop(1,t),s.fillStyle=a,s.fillRect(0,0,256,256);let o=new fn(i);o.colorSpace=st;let l=new ce(new Tn(n,64),yt("#ffffff",{map:o}));l.rotation.x=-Math.PI/2,l.position.y=-.05,l.receiveShadow=!0,r.add(l)}function Df(r=1,e=.95){let t=new Ue,n=new Zo({color:"#ffffff",transparent:e<1,opacity:e}),i=5+Math.floor(Math.random()*4);for(let s=0;s<i;s++){let a=new ce(new Le(1,14,10),n),o=.8+Math.random()*.9;a.scale.set(o*1.3,o*.8,o),a.position.set((s-i/2)*1.1,Math.random()*.5,(Math.random()-.5)*1.4),t.add(a)}return t.scale.setScalar(r),t}function Pf(){let r=new Ue,e=yt("#fbf7f0",{roughness:.4}),t=yt(oe.corail,{roughness:.4}),n=new ce(new Le(.3,16,12),e);n.scale.set(.55,.5,1.4);let i=new ce(new Le(.3,12,10),t);i.scale.set(.5,.42,.7),i.position.set(0,.05,.12);let s=new ce(new Pt(.2,.35,4),t);return s.rotation.x=-Math.PI/2,s.scale.x=.25,s.position.z=-.5,r.add(n,i,s),r.userData.queue=s,r}function Nv({groupe:r,scene:e,niveau:t,colliders:n,animations:i,chargeurTexture:s}){t.fond&&Iu(r,t.fond,s,{rayon:75,repetitions:4,bas:-9}),e.fog=new Gn("#628d34",30,105);let a=document.createElement("canvas");a.width=a.height=256;let o=a.getContext("2d"),l=o.createRadialGradient(128,128,0,128,128,128);l.addColorStop(0,"#bd8a4c"),l.addColorStop(.45,"#b37f45"),l.addColorStop(.85,"#8a5732"),l.addColorStop(1,"#6e4226"),o.fillStyle=l,o.fillRect(0,0,256,256);let c=new fn(a);c.colorSpace=st;let h=new ce(new Tn(76,64),yt("#ffffff",{map:c,fog:!1}));h.rotation.x=-Math.PI/2,h.position.y=-.05,h.receiveShadow=!0,r.add(h);let u=["#81b14d","#709d40","#628d34","#7aaa45"],d=yt("#ffffff",{vertexColors:!0}),p=(M,b)=>{let T=10+Math.random()*8,R=.1+Math.random()*.13,O=[Re(new We(R,R*1.06,T,12).translate(0,T/2,0),u[Math.floor(Math.random()*u.length)])],V=1.1+R*3;for(let X=.6+Math.random()*V;X<T;X+=V)O.push(Re(new We(R*1.04,R*1.04,.035,12).translate(0,X,0),"#53782e")),O.push(Re(new Yt(R*1.03,.012,3,12,Math.PI*.75).rotateX(Math.PI/2).rotateY(Math.random()*6.28).translate(0,X-.16,0),"#c6ef8e"));let H=new ce(ll(O),d);return O.forEach(X=>X.dispose()),H.position.set(M,0,b),H.rotation.z=(Math.random()-.5)*.1,H.userData.phase=Math.random()*6,r.add(Ms(H)),H},f=[],v=(M,b)=>Math.abs(M)>4.5&&!(Math.abs(M)<8&&b>-17&&b<-3),m=(M,b,T)=>{f.push(p(M,b)),T&&n.push({x:M,z:b,r:.35})};for(let M=0;M<560;M++){let b=Math.random()*Math.PI*2,T=on+.5+Math.random()**.8*30;m(Math.cos(b)*T,Math.sin(b)*T,!1)}for(let M=0;M<90;M++){let b=Math.random()*Math.PI*2,T=16.5+Math.random()*5,R=Math.cos(b)*T,O=Math.sin(b)*T;v(R,O)&&m(R,O,!0)}for(let[M,b]of[[-11,6],[12,4],[-13,-6],[13,-13],[-9,16],[10,15],[-8,-1],[9,-3],[-14,11],[15,9],[-10,-19],[11,-19]])for(let T=0;T<7;T++){let R=M+(Math.random()-.5)*3.4,O=b+(Math.random()-.5)*3.4;v(R,O)&&m(R,O,!0)}i.push((M,b)=>{for(let T of f)T.rotation.x=Math.sin(b*.8+T.userData.phase)*.015});let g=yt("#a7a49b",{roughness:1});for(let[M,b]of[[-2.6,8],[2.6,8],[-2.6,-2],[2.6,-2],[-2.6,-17],[2.6,-17]]){let T=new Ue,R=new ce(new We(.35,.45,.3,8),g);R.position.y=.15;let O=new ce(new We(.15,.18,.9,8),g);O.position.y=.75;let V=new ce(new tt(.5,.4,.5),yt("#fff1c9",{emissive:"#ffc867",emissiveIntensity:.8}));V.position.y=1.4;let H=new ce(new Pt(.55,.4,4),g);H.position.y=1.8,H.rotation.y=Math.PI/4,T.add(R,O,V,H),T.position.set(M,0,b),r.add(Ms(T)),n.push({x:M,z:b,r:.5})}let _=120,x=new Float32Array(_*3);for(let M=0;M<_;M++)x.set([(Math.random()-.5)*40,.5+Math.random()*4,(Math.random()-.5)*40],M*3);let y=new Qe;y.setAttribute("position",new at(x,3));let S=new ds(y,new mr({color:"#fff3b0",size:.12,transparent:!0,opacity:.9}));r.add(S),i.push((M,b)=>{S.position.y=Math.sin(b*.7)*.3,S.rotation.y=b*.02})}function Ov({groupe:r,scene:e,niveau:t,colliders:n,animations:i,chargeurTexture:s}){e.fog=new Gn("#a8b8cb",70,290),t.fond&&Iu(r,t.fond,s,{rayon:300,repetitions:3,bas:2*Math.PI*300/3*.75*-.38-4});let a=new ce(new Tn(300,64),new He({color:"#e9eef5",fog:!1}));a.rotation.x=-Math.PI/2,a.position.y=-60,r.add(a);let o=new ce(new Pt(on+1.5,16,32,3),yt("#4f7295"));o.rotation.x=Math.PI,o.position.y=-9.2,r.add(o);let l=[];for(let f=0;f<40;f++){let v=Math.random()*Math.PI*2,m=30+Math.random()*110,g=Df(1.5+Math.random()*3,.9);g.position.set(Math.cos(v)*m,-6-Math.random()*18,Math.sin(v)*m),g.userData.v=.3+Math.random()*.6,r.add(g),l.push(g)}i.push(f=>{for(let v of l)v.position.x+=v.userData.v*f,v.position.x>140&&(v.position.x=-140)});let c=[];for(let[f,v,m,g]of[[-34,4,-18,4],[32,7,-26,5],[-28,-2,22,3.5],[36,1,14,3],[0,12,-52,7],[-48,9,-40,5]]){let _=new Ue,x=new ce(new We(g,g*.9,.8,20),yt(t.sol)),y=new ce(new Pt(g*.9,g*1.8,10),yt("#4f7295"));if(y.rotation.x=Math.PI,y.position.y=-g*.9-.4,_.add(x,y),g>4){let S=Cu(t.accent,g/9);S.position.y=.4,_.add(S)}_.position.set(f,v,m),_.userData={y:v,phase:Math.random()*6},r.add(Ms(_)),c.push(_)}let h=new rn({color:"#7fb3e6",transparent:!0,opacity:.42,roughness:.05,clearcoat:1,depthWrite:!1}),u=[],d=[[13,2.6,2,5],[-14,3.4,-4,4],[-22,6,-30,6],[24,9,-40,7],[-8,14,-34,3.5]];for(let[f,v,m,g]of d){let _=new ce(new tt(g,g*.8,g),h);_.position.set(f,v,m),_.userData={y:v,phase:Math.random()*6},r.add(_),c.push(_);for(let x=0;x<2;x++){let y=Pf();y.userData={...y.userData,bloc:_,rayon:g*.28,vitesse:.6+Math.random()*.5,phase:x*Math.PI,dy:(x-.5)*g*.25},r.add(y),u.push(y)}}n.push({x:13,z:2,r:3.3},{x:-14,z:-4,r:2.8});for(let f=0;f<6;f++){let v=Pf();v.scale.setScalar(2.2),v.userData={...v.userData,centre:new E(0,7+f*1.6,-6),rayon:26+f*4,vitesse:.12+f*.02,phase:f},r.add(v),u.push(v)}i.push((f,v)=>{for(let m of c)m.position.y=m.userData.y+Math.sin(v*.6+m.userData.phase)*.4;for(let m of u){let g=m.userData,_=v*g.vitesse+g.phase,x=g.bloc?g.bloc.position:g.centre;m.position.set(x.x+Math.cos(_)*g.rayon,x.y+(g.dy??0)+Math.sin(_*2)*.1,x.z+Math.sin(_)*g.rayon),m.rotation.y=-_,g.queue.rotation.y=Math.sin(v*8+g.phase)*.5}});let p=yt(oe.rosePale,{emissive:oe.rose,emissiveIntensity:.7});for(let f=0;f<14;f++){let v=new ce(new We(.22,.22,.45,10),p),m=f/14*Math.PI*2;v.position.set(Math.cos(m)*19,3+f%3,Math.sin(m)*19),v.userData={y:v.position.y,phase:f},r.add(v),c.push(v)}}function Bv({groupe:r,niveau:e,colliders:t}){let n=yt("#6b4a33"),i=yt(e.accent,{flatShading:!0});for(let a=0;a<18;a++){let o=a/18*Math.PI*2+.2,l=15+a%3*2,c=Math.cos(o)*l,h=Math.sin(o)*l;if(Math.abs(c)<4)continue;let u=new Ue,d=new ce(new We(.2,.3,2.4,8),n);d.position.y=1.2;let p=new ce(new Di(1.6,1),i);p.position.y=3.2,u.add(d,p),u.position.set(c,0,h),r.add(Ms(u)),t.push({x:c,z:h,r:.6})}let s=new ce(new Pt(on+1.5,14,20,2),yt("#8a7f76",{flatShading:!0}));s.rotation.x=Math.PI,s.position.y=-8.2,r.add(s)}function Fv({groupe:r,scene:e,niveau:t,colliders:n,animations:i,chargeurTexture:s}){t.fond&&Iu(r,t.fond,s,{rayon:90,repetitions:8,bas:-11}),e.fog=new Gn("#7aa852",30,115),dl(r,"#77ab52","#5f9244",91);let a=(l,c)=>{let h=Pe(1.4,2.6),u=[];u.push(Re(new We(.05,.07,h,6).translate(0,h/2,0),"#5f9244"));for(let v of[-1,1])u.push(Re(new Le(.22,8,6).scale(1,.25,.55).rotateZ(v*.6).translate(v*.2,h*.45,0),"#679b4c"));let d=[Re(new We(.2,.22,.08,16).rotateX(Math.PI/2),"#733b0d")];for(let v=0;v<14;v++){let m=v/14*Math.PI*2;d.push(Re(new Le(.11,6,4).scale(1,2.2,.35).translate(0,.3,0).rotateZ(m),v%2?"#fed76b":"#ffdd80"))}let p=ll(d.map(v=>v.toNonIndexed()));p.rotateY(Math.atan2(-l,-c)).translate(0,h+.05,0),u.push(p);let f=Kt(u);return f.position.set(l,0,c),f.userData.phase=Math.random()*6,r.add(f),f},o=[];for(let l=0;l<420;l++){let c=Math.random()*Math.PI*2,h=on+1+Math.random()**.7*26;o.push(a(Math.cos(c)*h,Math.sin(c)*h))}for(let[l,c]of[[-11,6],[12,4],[-13,-6],[13,-12],[-10,15],[10,15]])for(let h=0;h<9;h++){let u=l+Pe(-2,2),d=c+Pe(-2,2);Pu(u,d)&&(o.push(a(u,d)),n.push({x:u,z:d,r:.25}))}i.push((l,c)=>{for(let h of o)h.rotation.z=Math.sin(c*1.2+h.userData.phase)*.03})}function Hv({groupe:r,scene:e,colliders:t,animations:n}){e.fog=new Gn("#f2c29a",40,170),dl(r,"#c9884e","#9a6a44");for(let o=0;o<11;o++){let l=o/11*Math.PI*2+.3,c=Pe(25,45),h=Kt([Re(new Pt(c*.9,c,7).translate(0,c/2,0),o%2?"#b8714a":"#9f6a52"),Re(new Pt(c*.25,c*.28,7).translate(0,c*.86,0),"#f3e6d6")]);h.position.set(Math.cos(l)*120,-2,Math.sin(l)*120),r.add(h)}let i=["#e8672c","#d9482b","#f2a33a","#c9542f","#f0b54a"],s=(o,l,c=1)=>{let h=Pe(2.2,3.4)*c,u=[Re(new We(.15*c,.25*c,h,7).translate(0,h/2,0),"#6b4a33")],d=i[Math.floor(Math.random()*i.length)];for(let f=0;f<6;f++){let v=Pe(.9,1.4)*c;u.push(Re(new Di(v,2).translate(Pe(-1,1)*c,h+Pe(-.3,.9)*c,Pe(-1,1)*c),f%3?d:i[(f+2)%i.length]))}let p=Kt(u);return p.position.set(o,0,l),r.add(p),p};for(let o=0;o<150;o++){let l=Math.random()*Math.PI*2,c=on+2+Math.random()*40;Lu(Math.cos(l)*c,Math.sin(l)*c)&&s(Math.cos(l)*c,Math.sin(l)*c,Pe(1,1.6))}for(let[o,l]of[[-12,6],[12,3],[-13,-7],[13,-13],[-15,13],[15,12]])Pu(o,l)&&(s(o,l,1.1),t.push({x:o,z:l,r:.6}));let a=[];for(let o=0;o<260;o++){let l=Math.random()*Math.PI*2,c=Math.random()*30;a.push(Re(new Tn(.12,5).rotateX(-Math.PI/2).rotateY(Math.random()*6).translate(Math.cos(l)*c,.02,Math.sin(l)*c),i[o%i.length]))}r.add(Kt(a)),Du(r,n,["#e8672c","#f2a33a","#d9482b"],140)}function zv({groupe:r,scene:e,colliders:t,animations:n}){e.fog=new Gn("#dcbde3",35,150),dl(r,"#8fa860","#7c9a56");let i="#6b4a33",s=["#a44c94","#b56bc4","#c99ad8","#8f4fa8"],a=(u,d,p)=>{let f=Pe(.6,1.1),v=[];for(let m=0;m<4;m++)v.push(Re(new Pt(.16-m*.03,f/3,7).rotateX(Math.PI).translate(u,d-m*f*.22,p),s[(m+Math.floor(u*7))%s.length]));return v},o=[];for(let u of[14,6,-2]){let d=[];for(let f of[-1,1])for(let v of[-2,2])d.push(Re(new tt(.2,3,.2).translate(f*2.4,1.5,v),i));for(let f of[-2,2])d.push(Re(new tt(5.4,.2,.25).translate(0,3.05,f),i));for(let f=-2;f<=2;f++)d.push(Re(new tt(.15,.15,4.6).translate(f*1.1,3.2,0),i));for(let f=0;f<26;f++)d.push(...a(Pe(-2.4,2.4),3.1,Pe(-2.2,2.2)));let p=Kt(d);p.position.z=u,r.add(p),o.push(p);for(let f of[-1,1])for(let v of[-2,2])t.push({x:f*2.4,z:u+v,r:.25})}for(let u=0;u<120;u++){let d=Math.random()*Math.PI*2,p=on+2+Math.random()*35;if(!Lu(Math.cos(d)*p,Math.sin(d)*p))continue;let f=Pe(2.5,4),v=[Re(new We(.15,.25,f,7).translate(0,f/2,0),i)];for(let g=0;g<4;g++)v.push(Re(new Di(Pe(.8,1.2),1).translate(Pe(-1,1),f+Pe(-.2,.6),Pe(-1,1)),"#7a9a55"));for(let g=0;g<10;g++)v.push(...a(Pe(-1.4,1.4),f-.2,Pe(-1.4,1.4)));let m=Kt(v);m.position.set(Math.cos(d)*p,0,Math.sin(d)*p),r.add(m)}let l=[];for(let u=0;u<5;u++){let d=7-u*.9,p=u*3.2;l.push(Re(new tt(d*.6,2.4,d*.6).translate(0,p+1.2,0),"#c9583a")),l.push(Re(new Pt(d*.8,1.2,4).rotateY(Math.PI/4).translate(0,p+2.9,0),"#3a3a44"))}l.push(Re(new We(.15,.15,4,6).translate(0,18,0),"#e2b552"));let c=Kt(l);c.position.set(-35,0,-70),r.add(c);let h=[];for(let[u,d,p]of[[-10,3,.8],[11,-2,-2.2],[-12,13,2.4],[13,11,-.6]]){let f="#b9834f",v="#f1dcc0",m=[Re(new Le(.5,12,10).scale(1.4,.8,.8).translate(0,1,0),f)];for(let[y,S]of[[-.45,-.25],[-.45,.25],[.45,-.25],[.45,.25]])m.push(Re(new We(.06,.05,.8,6).translate(y,.4,S),f));for(let y=0;y<10;y++)m.push(Re(new Le(.05,6,4).translate(Pe(-.5,.4),1.15+Pe(0,.15),Pe(-.3,.3)),v));m.push(Re(new Le(.12,8,6).translate(-.72,1.05,0),v));let g=Kt(m),_=Kt([Re(new We(.13,.16,.6,8).rotateZ(.6).translate(.18,.15,0),f),Re(new Le(.22,10,8).scale(1.3,.9,.9).translate(.4,.42,0),f),Re(new Le(.06,6,5).translate(.65,.4,0),"#2b2222"),Re(new Pt(.07,.22,6).rotateZ(-.5).translate(.32,.62,.15),f),Re(new Pt(.07,.22,6).rotateZ(-.5).translate(.32,.62,-.15),f)]);_.position.set(.55,1.05,0);let x=new Ue;x.add(g,_),x.position.set(u,0,d),x.rotation.y=p,x.userData={tete:_,phase:Math.random()*6},r.add(x),h.push(x),t.push({x:u,z:d,r:.8})}n.push((u,d)=>{for(let p of h)p.userData.tete.rotation.z=-.6+Math.max(0,Math.sin(d*.6+p.userData.phase))*.9}),Du(r,n,["#c99ad8","#b56bc4"],90)}function kv({groupe:r,scene:e,colliders:t,animations:n}){e.fog=new Gn("#e6d0ef",40,170),dl(r,"#a99bb8","#8f8aa4");let i=["#f8b7c9","#f5cacc","#f39cb6","#fbd7e2"],s=(c,h,u=1)=>{let d=Pe(2.2,3)*u,p=[];p.push(Re(new We(.14*u,.26*u,d,7).translate(0,d/2,0),"#5a3a34"));for(let v of[-1,1])p.push(Re(new We(.06,.1,1.4*u,6).rotateZ(v*.8).translate(v*.45*u,d*.9,0),"#5a3a34"));for(let v=0;v<8;v++)p.push(Re(new Di(Pe(.7,1.1)*u,2).translate(Pe(-1.3,1.3)*u,d+Pe(-.2,1)*u,Pe(-1.3,1.3)*u),i[v%i.length]));let f=Kt(p);f.position.set(c,0,h),r.add(f)};for(let c=0;c<140;c++){let h=Math.random()*Math.PI*2,u=on+2+Math.random()*38;Lu(Math.cos(h)*u,Math.sin(h)*u)&&s(Math.cos(h)*u,Math.sin(h)*u,Pe(1,1.5))}for(let[c,h]of[[-12,6],[-13,-7],[13,-13],[-15,12]])s(c,h,1.1),t.push({x:c,z:h,r:.5});let a=[];for(let c=0;c<300;c++){let h=Math.random()*Math.PI*2,u=Pe(9,21),d=Math.cos(h)*u,p=Math.sin(h)*u;Pu(d,p)&&a.push(Re(new Le(.12,6,4).translate(d,.12,p),c%3?"#8a5fb4":"#b48ad6"))}r.add(Kt(a));let o=[];for(let c=0;c<60;c++){let h=Pe(-2.6,-.5),u=Pe(95,120),d=Pe(8,30),p=Pe(4,9);o.push(Re(new tt(p,d,p).translate(Math.cos(h)*u,d/2,Math.sin(h)*u),c%3?"#9d8fb8":"#b3a6cc"))}for(let c=0;c<6;c++){let h=c*7,u=6-c*.95;o.push(Re(new We(u-.9,u,7,4).rotateY(Math.PI/4).translate(-20,h+3.5,-100),c%2?"#ffffff":"#ff6a3d"))}r.add(Kt(o));let l=Kt([Re(new tt(3,1.1,1.2).translate(0,.55,0),"#c98a4b"),Re(new tt(3.2,.12,1.4).translate(0,1.15,0),"#8a5a32"),...[-1.45,1.45].map(c=>Re(new tt(.12,2.6,.12).translate(c,1.3,-.5),"#8a5a32")),...Array.from({length:6},(c,h)=>Re(new tt(.55,.08,1.7).rotateX(.35).translate(-1.375+h*.55,2.6,0),h%2?"#fbf8f2":"#f28a2e")),...Array.from({length:5},(c,h)=>Re(new We(.09,.1,.32,10).translate(-.9+h*.4,1.38,.1),h%2?"#f28a2e":"#f7c948"))]);l.position.set(9,0,7),l.rotation.y=-.6,r.add(l),t.push({x:9,z:7,r:1.7}),Du(r,n,i,220)}function Gv({groupe:r,scene:e,colliders:t,animations:n}){e.fog=new Gn("#cfe6f5",50,230);let i=new ce(new Tn(200,64),yt("#8fc3e3"));i.rotation.x=-Math.PI/2,i.position.y=-.4,r.add(i);let s=[];for(let u=0;u<120;u++){let d=Math.random()*Math.PI*2,p=Pe(26,90);s.push(Re(new En(Pe(1,3),.12).rotateX(-Math.PI/2).translate(Math.cos(d)*p,-.35,Math.sin(d)*p),"#e4f2fb"))}let a=Kt(s);r.add(a),n.push((u,d)=>{a.position.x=Math.sin(d*.3)*.6});let o=[Re(new We(16,20,8,4).rotateY(Math.PI/4).translate(0,4,0),"#8f8f96")];for(let u=0;u<4;u++){let d=18-u*3.6,p=8+u*6;o.push(Re(new tt(d,4.2,d*.75).translate(0,p+2.1,0),"#f3efe6")),o.push(Re(new tt(d,2.2,d*.75).translate(0,p+1.1,.02),"#2b2b33")),o.push(Re(new Pt(d*.85,2.6,4).rotateY(Math.PI/4).scale(1,1,.78).translate(0,p+5.2,0),"#2b2b33"))}o.push(Re(new tt(1.4,1.2,.4).translate(0,33.5,0),"#e2b552"));let l=Kt(o);l.position.set(0,-.4,-95),r.add(l);let c=(u,d,p=1)=>{let f=[Re(new We(.15*p,.25*p,2.5*p,7).translate(0,1.25*p,0),"#6b4a33")];for(let m=0;m<3;m++)f.push(Re(new Le((1.3-m*.3)*p,10,6).scale(1,.35,1).translate(Pe(-.3,.3),(2.2+m*.8)*p,0),m%2?"#2f5d4a":"#3d6e56"));let v=Kt(f);v.position.set(u,0,d),r.add(v)};for(let[u,d]of[[-13,6],[13,4],[-14,-8],[14,-12],[-11,16],[11,16],[-17,-2],[17,9]])c(u,d,1.2),t.push({x:u,z:d,r:.5});for(let u=0;u<60;u++){let d=Math.random()*Math.PI*2,p=Pe(60,110);c(Math.cos(d)*p,Math.sin(d)*p,Pe(1.5,2.5))}let h=new ce(new We(on+2.5,on+4,1,48),yt("#8f8f96"));h.position.y=-.9,r.add(h);for(let u=0;u<20;u++)r.add(Df(Pe(3,6)).translateX(Pe(-150,150)).translateY(Pe(30,55)).translateZ(Pe(-150,-60)))}function Du(r,e,t,n){let i=new En(.16,.1),s=l=>{l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
varying float vDistance;`).replace("#include <project_vertex>",`#include <project_vertex>
vDistance = -mvPosition.z;`),l.fragmentShader=l.fragmentShader.replace("#include <common>",`#include <common>
varying float vDistance;`).replace("void main() {",`void main() {
  if (vDistance < 2.5) discard;`)},a=t.map(l=>{let c=new He({color:l,side:wn});return c.onBeforeCompile=s,c.customProgramCacheKey=()=>"feuille",c}),o=[];for(let l=0;l<n;l++){let c=new ce(i,a[l%a.length]);c.position.set(Pe(-24,24),Pe(0,10),Pe(-24,24)),c.userData={v:Pe(.4,.9),phase:Math.random()*6},r.add(c),o.push(c)}e.push((l,c)=>{for(let h of o){let u=h.userData;h.position.y-=u.v*l,h.position.x+=Math.sin(c+u.phase)*l*.4,h.rotation.set(c*1.3+u.phase,c*.8,u.phase),h.position.y<0&&(h.position.y=10)}})}var on,Rt,Ma,Lv,Dv,yt,If,Pu,Pe,Lu,Uu=sn(()=>{Zn();$h();Gi();on=22,Rt={centre:new E(0,0,-10),cases:9,taille:1.2},Ma={depart:new E(0,0,19.5),pnj:new E(0,0,4),portail:new E(0,0,-19)},Lv=(()=>{let r=new Yn(new Uint8Array([175,222,255]),3,1,mi);return r.minFilter=r.magFilter=It,r.needsUpdate=!0,r})(),Dv=r=>{r.vertexShader=r.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vPosMonde;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vPosMonde = (modelMatrix * vec4(position, 1.0)).xyz;`),r.fragmentShader=r.fragmentShader.replace("#include <common>",`#include <common>
      varying vec3 vPosMonde;
      float hashP(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
      float bruitP(vec3 x) {
        vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
        return mix(mix(mix(hashP(i), hashP(i + vec3(1,0,0)), f.x), mix(hashP(i + vec3(0,1,0)), hashP(i + vec3(1,1,0)), f.x), f.y),
                   mix(mix(hashP(i + vec3(0,0,1)), hashP(i + vec3(1,0,1)), f.x), mix(hashP(i + vec3(0,1,1)), hashP(i + vec3(1,1,1)), f.x), f.y), f.z);
      }`).replace("#include <color_fragment>",`#include <color_fragment>
      diffuseColor.rgb *= 0.93 + 0.07 * bruitP(vPosMonde * 9.0) + 0.05 * bruitP(vPosMonde * 55.0);`)},yt=(r,e={})=>{let{roughness:t,metalness:n,...i}=e,s=new Ni({color:r,gradientMap:Lv,...i});return s.onBeforeCompile=Dv,s.customProgramCacheKey=()=>"dessin",s};If=null;Pu=(r,e)=>Math.abs(r)>4.5&&!(Math.abs(r)<8&&e>-17&&e<-3),Pe=(r,e)=>r+Math.random()*(e-r),Lu=(r,e)=>!(e>12&&Math.abs(r)<13)});function Cn(r,e,t,n,i,s){let a=2*Math.PI*i/4,o=Math.max(s-2*i,0),l=Math.PI/4;ba.copy(e),ba[n]=0,ba.normalize();let c=.5*a/(a+o),h=1-ba.angleTo(r)/l;return Math.sign(ba[t])===1?h*c:o/(a+o)+c+c*(1-h)}var ba,Kn,Uf=sn(()=>{Zn();ba=new E;Kn=class extends tt{constructor(e=1,t=1,n=1,i=2,s=.1){if(i=i*2+1,s=Math.min(e/2,t/2,n/2,s),super(1,1,1,i,i,i),i===1)return;let a=this.toNonIndexed();this.index=null,this.attributes.position=a.attributes.position,this.attributes.normal=a.attributes.normal,this.attributes.uv=a.attributes.uv;let o=new E,l=new E,c=new E(e,t,n).divideScalar(2).subScalar(s),h=this.attributes.position.array,u=this.attributes.normal.array,d=this.attributes.uv.array,p=h.length/6,f=new E,v=.5/i;for(let m=0,g=0;m<h.length;m+=3,g+=2)switch(o.fromArray(h,m),l.copy(o),l.x-=Math.sign(l.x)*v,l.y-=Math.sign(l.y)*v,l.z-=Math.sign(l.z)*v,l.normalize(),h[m+0]=c.x*Math.sign(o.x)+l.x*s,h[m+1]=c.y*Math.sign(o.y)+l.y*s,h[m+2]=c.z*Math.sign(o.z)+l.z*s,u[m+0]=l.x,u[m+1]=l.y,u[m+2]=l.z,Math.floor(m/p)){case 0:f.set(1,0,0),d[g+0]=Cn(f,l,"z","y",s,n),d[g+1]=1-Cn(f,l,"y","z",s,t);break;case 1:f.set(-1,0,0),d[g+0]=1-Cn(f,l,"z","y",s,n),d[g+1]=1-Cn(f,l,"y","z",s,t);break;case 2:f.set(0,1,0),d[g+0]=1-Cn(f,l,"x","z",s,e),d[g+1]=Cn(f,l,"z","x",s,n);break;case 3:f.set(0,-1,0),d[g+0]=1-Cn(f,l,"x","z",s,e),d[g+1]=1-Cn(f,l,"z","x",s,n);break;case 4:f.set(0,0,1),d[g+0]=1-Cn(f,l,"x","y",s,e),d[g+1]=1-Cn(f,l,"y","x",s,t);break;case 5:f.set(0,0,-1),d[g+0]=Cn(f,l,"x","y",s,e),d[g+1]=1-Cn(f,l,"y","x",s,t);break}}}});function Mt(r,e,t,n,i){let s=(r-n[0])/i[0],a=(e-n[1])/i[1],o=(t-n[2])/i[2],l=Math.hypot(s,a,o),c=Math.hypot(s/i[0],a/i[1],o/i[2]);return c===0?-Math.min(...i):l*(l-1)/c}function nt(r,e,t,n,i,s,a){let o=i[0]-n[0],l=i[1]-n[1],c=i[2]-n[2],h=o*o+l*l+c*c,u=s-a,d=h-u*u,p=1/h,f=r-n[0],v=e-n[1],m=t-n[2],g=f*o+v*l+m*c,_=g-h,x=f*h-o*g,y=v*h-l*g,S=m*h-c*g,M=x*x+y*y+S*S,b=g*g*h,T=_*_*h,R=Math.sign(u)*u*u*M;return Math.sign(_)*d*T>R?Math.sqrt(M+T)*p-a:Math.sign(g)*d*b<R?Math.sqrt(M+b)*p-s:(Math.sqrt(M*d*p)+g*u)*p-s}function Ea(r,e,t,n,i){let s=i[0]-n[0],a=i[1]-n[1],o=i[2]-n[2];return((r-n[0])*s+(e-n[1])*a+(t-n[2])*o)/(s*s+a*a+o*o)}function Wt(r,e,t,n){let i=Math.ceil((t[0]-e[0])/n)+1,s=Math.ceil((t[1]-e[1])/n)+1,a=Math.ceil((t[2]-e[2])/n)+1,o=new Float32Array(i*s*a),l=(b,T,R)=>b+i*(T+s*R);for(let b=0;b<a;b++)for(let T=0;T<s;T++)for(let R=0;R<i;R++)o[l(R,T,b)]=r(e[0]+R*n,e[1]+T*n,e[2]+b*n);let c=i-1,h=s-1,u=a-1,d=(b,T,R)=>b+c*(T+h*R),p=new Int32Array(c*h*u).fill(-1),f=[],v=[[0,0,0],[1,0,0],[0,1,0],[1,1,0],[0,0,1],[1,0,1],[0,1,1],[1,1,1]],m=[];for(let b=0;b<8;b++)for(let T of[1,2,4])b&T||m.push([b,b|T]);let g=new Float32Array(8);for(let b=0;b<u;b++)for(let T=0;T<h;T++)for(let R=0;R<c;R++){let O=0;for(let U=0;U<8;U++)g[U]=o[l(R+v[U][0],T+v[U][1],b+v[U][2])],g[U]<0&&(O|=1<<U);if(O===0||O===255)continue;let V=0,H=0,X=0,I=0;for(let[U,z]of m){if(g[U]<0==g[z]<0)continue;let q=g[U]/(g[U]-g[z]);V+=v[U][0]+q*(v[z][0]-v[U][0]),H+=v[U][1]+q*(v[z][1]-v[U][1]),X+=v[U][2]+q*(v[z][2]-v[U][2]),I++}p[d(R,T,b)]=f.length/3,f.push(e[0]+(R+V/I)*n,e[1]+(T+H/I)*n,e[2]+(b+X/I)*n)}let _=new Float32Array(f.length),x=n*.5;for(let b=0;b<f.length;b+=3){let T=f[b],R=f[b+1],O=f[b+2],V=r(T+x,R,O)-r(T-x,R,O),H=r(T,R+x,O)-r(T,R-x,O),X=r(T,R,O+x)-r(T,R,O-x),I=Math.hypot(V,H,X)||1;_[b]=V/I,_[b+1]=H/I,_[b+2]=X/I}let y=[],S=(b,T,R,O)=>{if(b<0||T<0||R<0||O<0)return;let V=f[T*3]-f[b*3],H=f[T*3+1]-f[b*3+1],X=f[T*3+2]-f[b*3+2],I=f[R*3]-f[b*3],U=f[R*3+1]-f[b*3+1],z=f[R*3+2]-f[b*3+2],q=H*z-X*U,Z=X*I-V*z,ae=V*U-H*I;q*(_[b*3]+_[R*3])+Z*(_[b*3+1]+_[R*3+1])+ae*(_[b*3+2]+_[R*3+2])>0?y.push(b,T,R,b,R,O):y.push(b,R,T,b,O,R)};for(let b=1;b<u;b++)for(let T=1;T<h;T++)for(let R=0;R<c;R++)o[l(R,T,b)]<0!=o[l(R+1,T,b)]<0&&S(p[d(R,T-1,b-1)],p[d(R,T,b-1)],p[d(R,T,b)],p[d(R,T-1,b)]);for(let b=1;b<u;b++)for(let T=0;T<h;T++)for(let R=1;R<c;R++)o[l(R,T,b)]<0!=o[l(R,T+1,b)]<0&&S(p[d(R-1,T,b-1)],p[d(R,T,b-1)],p[d(R,T,b)],p[d(R-1,T,b)]);for(let b=0;b<u;b++)for(let T=1;T<h;T++)for(let R=1;R<c;R++)o[l(R,T,b)]<0!=o[l(R,T,b+1)]<0&&S(p[d(R-1,T-1,b)],p[d(R,T-1,b)],p[d(R,T,b)],p[d(R-1,T,b)]);let M=new Qe;return M.setAttribute("position",new Se(f,3)),M.setAttribute("normal",new at(_,3)),M.setIndex(y),M}function ln(r,e,{douceur:t=.014,surcharge:n}={}){let i=r.attributes.position,s=i.count,a=new Uint16Array(s*4),o=new Float32Array(s*4),l=new Float32Array(e.length);for(let c=0;c<s;c++){let h=i.getX(c),u=i.getY(c),d=i.getZ(c),p=1/0;e.forEach((g,_)=>{let x=Math.min(1,Math.max(0,Ea(h,u,d,g.a,g.b))),y=g.a[0]+x*(g.b[0]-g.a[0]),S=g.a[1]+x*(g.b[1]-g.a[1]),M=g.a[2]+x*(g.b[2]-g.a[2]);l[_]=Math.hypot(h-y,u-S,d-M)-g.r,p=Math.min(p,l[_])});let f=new Map;e.forEach((g,_)=>{let x=Math.exp(-(l[_]-p)/t);x>.001&&f.set(g.os,(f.get(g.os)??0)+x)});let v=[...f.entries()];n&&(v=n(h,u,d,v)),v.sort((g,_)=>_[1]-g[1]),v=v.slice(0,4);let m=v.reduce((g,_)=>g+_[1],0);v.forEach(([g,_],x)=>{a[c*4+x]=g,o[c*4+x]=_/m})}return r.setAttribute("skinIndex",new at(a,4)),r.setAttribute("skinWeight",new at(o,4)),r}var Te,Nf=sn(()=>{Zn();Te=(r,e,t)=>{let n=Math.max(t-Math.abs(r-e),0)/t;return Math.min(r,e)-n*n*t*.25}});function bs(r){let e=[];r.traverse(t=>{t.isMesh&&!t.isSkinnedMesh&&!t.userData.sansContour&&e.push(t)});for(let t of e){let n=new ce(t.geometry,fl);n.userData.sansContour=!0,n.raycast=()=>{},t.add(n),t.castShadow=!0}}function ye(r,e,t=0,n=0,i=0){let s=new ce(r,e);return s.position.set(t,n,i),s}function Nu(r,e,t,n,{affiner:i=!0}={}){let s=new gr(r),a=14,o=8,l=[],c=[],h=[],u=new E,d=new E;for(let g=0;g<=a;g++){let _=g/a,x=s.getPointAt(_),y=s.getTangentAt(_);u.copy(n).addScaledVector(y,-n.dot(y)).normalize(),d.crossVectors(y,u).normalize();let S=i?(1-Math.pow(_,1.5)*.9)*Math.min(1,.6+_*5):1;for(let M=0;M<o;M++){let b=M/o*Math.PI*2,T=Math.cos(b)*e*S,R=Math.sin(b)*t*S;l.push(x.x+u.x*T+d.x*R,x.y+u.y*T+d.y*R,x.z+u.z*T+d.z*R),h.push(M/o,1-_)}}for(let g=0;g<a;g++)for(let _=0;_<o;_++){let x=g*o+_,y=g*o+(_+1)%o,S=x+o,M=y+o;c.push(x,y,S,y,M,S)}let p=s.getPointAt(0),f=s.getPointAt(1).addScaledVector(s.getTangentAt(1),.004),v=l.length/3;l.push(p.x,p.y,p.z,f.x,f.y,f.z),h.push(.5,1,.5,0);for(let g=0;g<o;g++)c.push(v,g,(g+1)%o),c.push(v+1,a*o+(g+1)%o,a*o+g);let m=new Qe;return m.setAttribute("position",new Se(l,3)),m.setAttribute("uv",new Se(h,2)),m.setIndex(c),m.computeVertexNormals(),m}var Vv,Wv,pl,fl,Of=sn(()=>{Zn();Gi();Vv="#2b2333",Wv=(()=>{let r=new Yn(new Uint8Array([150,215,255]),3,1,mi);return r.minFilter=r.magFilter=It,r.needsUpdate=!0,r})(),pl=(r,e={})=>new Ni({color:r,gradientMap:Wv,...e}),fl=new He({color:Vv,side:va});fl.onBeforeCompile=r=>{r.vertexShader=r.vertexShader.replace("#include <begin_vertex>","vec3 transformed = position + normal * 0.0045;")}});function Bt(r,{vertexColors:e=!1,motif:t="",liser\u00E9:n=.3,cle:i=""}={}){let s=new Ni({color:r,vertexColors:e,gradientMap:Xv});return s.onBeforeCompile=a=>{a.vertexShader=a.vertexShader.replace("#include <common>",`#include <common>
varying vec3 vPosObj;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vPosObj = position;`),a.fragmentShader=a.fragmentShader.replace("#include <common>",`#include <common>
varying vec3 vPosObj;`+Zf).replace("#include <color_fragment>",`#include <color_fragment>
`+t).replace("#include <opaque_fragment>",`
        float bord = pow(1.0 - clamp(dot(normalize(normal), normalize(vViewPosition)), 0.0, 1.0), 2.6);
        // liser\xE9 teint\xE9 par la couleur du pelage : duveteux sur le clair, discret sur le noir
        outgoingLight += mix(diffuseColor.rgb, vec3(1.0, 0.97, 0.92), 0.35) * bord * ${n.toFixed(2)};
        #include <opaque_fragment>`)},s.customProgramCacheKey=()=>"mediaventure-"+i,s}function r_(){return Gf??(Gf={haut:ln(Wt(t_,[-.36,.1,-.23],[.36,.55,.27],Mr),mn,{surcharge:ju}),bandes:ln(Wt(i_,[-.38,.1,-.2],[.38,.35,.25],.004),mn,{surcharge:ju}),hakama:ln(Wt(n_,[-.33,.04,-.27],[.33,.33,.28],Mr),mn,{surcharge:Wu})}),Gf}function h_(){return Wf??(Wf={chemise:ln(Wt(s_,[-.22,.18,-.2],[.22,.55,.22],Mr),mn),veste:ln(Wt(a_,[-.33,.15,-.23],[.33,.56,.26],Mr),mn,{surcharge:ju}),revers:ln(Wt(o_,[-.2,.38,0],[.2,.55,.24],.004),mn),pantalon:ln(Wt(l_,[-.24,.06,-.2],[.24,.28,.2],Mr),mn,{surcharge:Vf}),chaussures:ln(Wt(c_,[-.22,-.01,-.11],[.22,.13,.19],.006),mn,{surcharge:Vf})}),Wf}function Xf(){return jf??(jf={kimono:ln(Wt(Jv,[-.33,.04,-.26],[.33,.55,.27],Mr),mn,{surcharge:Wu}),ourlet:ln(Wt(e_,[-.27,.04,-.26],[.27,.1,.27],.004),mn,{surcharge:Wu}),col:ln(Wt($v,[-.13,.22,0],[.13,.54,.25],.004),mn),obi:ln(Wt(Qv,[-.25,.22,-.24],[.25,.32,.24],.005),mn)}),jf}function d_(r){let[e,t,n,i]=r.cadre,s=r.contour,a=Math.min(...s.map(x=>x[1])),o=Math.max(...s.map(x=>x[1])),l=(Math.min(...s.map(x=>x[0]))+Math.max(...s.map(x=>x[0])))/2,c=r.hauteur/(o-a),h=(a+o)/2,u=x=>{let y=[];for(let S=0;S<s.length;S++){let[M,b]=s[S],[T,R]=s[(S+1)%s.length];(b<=x&&R>x||R<=x&&b>x)&&y.push(M+(x-b)/(R-b)*(T-M))}return y.length?[Math.min(...y),Math.max(...y)]:null},d=56,p=72,f=[],v=[],m=[],g=[];for(let x=0;x<=d;x++){let y=x/d,S=a+(o-a)*(1-Math.cos(Math.PI*y))/2,M=x===0||x===d?null:u(S),b=M?Math.min(Math.max(r.nez,M[0]+1),M[1]-1):r.nez,T=M?b-M[0]:0,R=M?M[1]-b:0,O=(T+R)/2*1.08;for(let V=0;V<=p;V++){let H=-Math.PI+2*Math.PI*V/p,X=Math.sin(H),I=b+(X<0?T:R)*X;f.push((I-l)*c,(h-S)*c,(Math.cos(H)*O-O*.12)*c),v.push((I-e)/(n-e),1-(S-t)/(i-t)),m.push(Math.cos(H))}}for(let x=0;x<d;x++)for(let y=0;y<p;y++){let S=x*(p+1)+y,M=S+p+1;g.push(S,M,S+1,S+1,M,M+1)}let _=new Qe;return _.setAttribute("position",new Se(f,3)),_.setAttribute("uv",new Se(v,2)),_.setAttribute("avant",new Se(m,1)),_.setIndex(g),_.computeVertexNormals(),_}function p_(r){if(!Fu.has(r.texture)){let i=new Bi().load(r.texture);i.colorSpace=st,i.anisotropy=4;let s=new He({map:i}),a=new he(r.cheveux),o=new he(r.peau??"#d9a88f");s.onBeforeCompile=l=>{l.uniforms.couleurCheveux={value:a},l.uniforms.couleurPeau={value:o},l.vertexShader=l.vertexShader.replace("#include <common>",`#include <common>
attribute float avant;
varying float vAvant;
varying vec3 vPosObj;`).replace("#include <begin_vertex>",`#include <begin_vertex>
vAvant = avant;
vPosObj = position;`),l.fragmentShader=l.fragmentShader.replace("#include <common>",`#include <common>
uniform vec3 couleurCheveux;
uniform vec3 couleurPeau;
varying float vAvant;
varying vec3 vPosObj;`+Zf).replace("#include <map_fragment>",`#include <map_fragment>
          // m\xE8ches sur l'arri\xE8re du cr\xE2ne, un peu plus sombres vers la nuque
          float meches = fbm(vPosObj * vec3(150.0, 30.0, 150.0));
          vec3 dos = couleurCheveux * (0.8 + 0.3 * meches) * (0.85 + 0.25 * smoothstep(-0.25, 0.25, vPosObj.y));
          // sur les c\xF4t\xE9s, sous la ligne des cheveux : la peau (joues, oreilles), puis les cheveux vers l'arri\xE8re
          float cote = (1.0 - smoothstep(-0.11, -0.03, vPosObj.y)) * smoothstep(-0.5, 0.0, vAvant);
          vec3 tour = mix(dos, couleurPeau * (0.93 + 0.07 * fbm(vPosObj * 60.0)), cote);
          diffuseColor.rgb = mix(tour, diffuseColor.rgb, smoothstep(0.3, 0.62, vAvant));`)},s.customProgramCacheKey=()=>"tete-photo",Fu.set(r.texture,{geo:d_(r),mat:s})}let{geo:e,mat:t}=Fu.get(r.texture),n=new ce(e,t);return n.position.y=r.decalage??0,n}function m_(r){if(!qf[r])return null;if(!zu.has(r)){let e=Wt(qf[r],[-.4,r==="longs"?-.5:-.42,-.4],[.4,.36,.33],.0055);if(r==="longs"){let t=e.attributes.position,n=new Float32Array(t.count*3),i=new he("#5a2f14"),s=new he("#c48a52"),a=new he;for(let o=0;o<t.count;o++)a.copy(i).lerp(s,Math.min(1,Math.max(0,(.1-t.getY(o))/.5))),n.set([a.r,a.g,a.b],o*3);e.setAttribute("color",new at(n,3))}zu.set(r,e)}return zu.get(r)}function g_(r){let e=Ra[r];return r==="humain"?(t,n)=>Ss(e.base,e.clair,ot(.13,.1,n)):r==="shiba"?(t,n,i)=>{let s=ot(.125,.095,n),a=ot(.35,.32,n)*ot(.17,.2,Math.abs(t)),o=(t/.12)**2+((n-.3)/.2)**2,l=ot(1.12,.88,o)*ot(.02,.07,i);return Ss(e.base,e.clair,Math.max(s,a,l))}:(t,n,i)=>{let s=ot(.225,.195,n)*ot(.02,.04,Math.abs(t)),a=ot(.135,.16,Math.abs(t))*ot(.17,.2,n),o=ot(.34,.38,n)*Math.max(ot(.06,.02,i),ot(.09,.12,Math.abs(t)));return Ss(e.base,e.noir,Math.max(s,a,o))}}function v_(r){let e=Ra[r];return r==="humain"?()=>gl(e.base):r==="shiba"?(t,n,i)=>{let s=ot(.005,-.025,n-Math.abs(t)*.05)*ot(.03,.08,i),a=ot(.16,.2,Math.abs(t))*ot(-.005,-.04,n)*ot(-.07,-.03,i),o=0;for(let h of[-1,1])o=Math.max(o,ot(.028,.02,Math.hypot(t-h*.1,n-.085))*ot(.1,.13,i));let l=Ss(e.base,e.clair,Math.max(s,a,o)),c=ot(.15,.18,n)*ot(-.04,-.025,i)*ot(.06-(n-.16)*.3,.045-(n-.16)*.3,Math.abs(Math.abs(t)-(.16+(n-.16)*.28)));return l.lerp(gl(e.oreille),c)}:(t,n,i)=>{let s=ot(.12,.14,n)*ot(.11,.14,Math.abs(t));for(let a of[-1,1]){let o=t-a*.105,l=n+.01,c=a*.6,h=o*Math.cos(c)+l*Math.sin(c),u=-o*Math.sin(c)+l*Math.cos(c);s=Math.max(s,ot(1.15,.9,(h/.052)**2+(u/.072)**2)*ot(.08,.12,i))}return Ss(e.base,e.noir,s)}}function __(){let r=Ra.shiba,e=new E(.02,.15,-.085),t=new E,n=new E,i=new E;return(s,a,o)=>{t.set(s,a,o);let l=wa[0];for(let u of wa)u.v.distanceToSquared(t)<l.v.distanceToSquared(t)&&(l=u);n.copy(t).sub(l.v).normalize(),i.copy(e).sub(l.v).normalize();let c=ot(-.15,.35,n.dot(i))*ot(.08,.2,l.t),h=ot(.8,.94,l.t);return Ss(r.base,r.clair,Math.max(c,h))}}function ku(r,e){let t=r.attributes.position,n=new Float32Array(t.count*3);for(let i=0;i<t.count;i++){let s=e(t.getX(i),t.getY(i),t.getZ(i));n[i*3]=s.r,n[i*3+1]=s.g,n[i*3+2]=s.b}return r.setAttribute("color",new at(n,3)),r}function x_(r){if(Gu.has(r))return Gu.get(r);let e={corps:ku(ln(Wt(Yv,[-.32,-.005,-.2],[.32,.56,.24],Mr),mn),g_(r)),tete:ku(Wt(u_[r],[-.34,-.24,-.29],[.34,.38,.31],jv),v_(r))};return r==="shiba"&&(e.queue=ku(Wt(Kv,[-.07,-.06,-.21],[.14,.3,.09],.004),__())),Gu.set(r,e),e}function y_(){let r=document.createElement("canvas");r.width=r.height=512;let e=r.getContext("2d");e.fillStyle="#fbf8f2",e.beginPath(),e.moveTo(256,18),e.bezierCurveTo(430,18,488,150,486,270),e.bezierCurveTo(482,400,380,500,256,502),e.bezierCurveTo(132,500,30,400,26,270),e.bezierCurveTo(24,150,82,18,256,18),e.fill(),e.save(),e.clip(),e.lineCap="round",e.strokeStyle="#d9474b",e.lineWidth=14;for(let[n,i,s]of[[-36,70,-26],[0,96,0],[36,70,26]])e.beginPath(),e.moveTo(256+n*.5,185),e.bezierCurveTo(256+n-s,185-i*.4,256+n+s,185-i*.7,256+n*.8,185-i),e.stroke();for(let n of[-1,1]){let i=256+n*100,s=238;e.fillStyle="#ffffff",e.beginPath(),e.ellipse(i,s,30,34,0,0,Math.PI*2),e.fill(),e.fillStyle="#1f1a24",e.beginPath(),e.ellipse(i+n*2,s+4,24,30,0,0,Math.PI*2),e.fill(),e.fillStyle="#ffffff",e.beginPath(),e.arc(i-n*6,s-6,9,0,Math.PI*2),e.fill(),e.beginPath(),e.arc(i+n*9,s+14,4.5,0,Math.PI*2),e.fill(),e.strokeStyle="#1f1a24",e.lineWidth=7,e.beginPath(),e.moveTo(i-n*36,s-14),e.quadraticCurveTo(i,s-46,i+n*40,s-24),e.lineTo(i+n*52,s-34),e.stroke(),e.strokeStyle="#d9474b",e.lineWidth=12;for(let a=0;a<2;a++)e.beginPath(),e.moveTo(i+n*(18+a*10),s+50+a*26),e.quadraticCurveTo(i+n*(52+a*8),s+40+a*26,i+n*(82+a*4),s+54+a*26),e.stroke()}e.strokeStyle="#2b2333",e.lineWidth=8,e.beginPath(),e.moveTo(196,372),e.quadraticCurveTo(226,414,256,384),e.quadraticCurveTo(286,414,316,372),e.stroke(),e.restore();let t=new fn(r);return t.colorSpace=st,t}function M_(r){let e=new Ue;Yf??(Yf=y_());let t=pl("#ffffff",{map:Yf,side:wn,alphaTest:.5}),n=.305,i=ye(new Le(n,44,34,Math.PI/2-.85,1.7,Math.PI/2-.78,1.6),t,0,0,0);i.scale.set(1,1.02,1);let s=ye(new Le(.062,20,14),r("#fbf8f2"),0,-.05,.3);s.scale.set(1,.72,.85);let a=ye(new Le(.017,12,8),r("#ec7b86"),0,-.03,.352);a.scale.set(1.3,.8,.7),e.add(i,s,a);for(let o of[-1,1]){let l=new Ue,c=ye(new Pt(.068,.17,16),r("#fbf8f2"));c.scale.z=.45;let h=ye(new Pt(.042,.115,16),r("#c8383d"),0,-.012,.017);h.scale.z=.3,l.add(c,h),l.position.set(o*.15,.26,.18),l.rotation.set(-.35,0,-o*.35),e.add(l)}return e}function Ia(r=Aa){let e={...Aa,...r},t=Ra[e.espece]?e.espece:"shiba",n=Ra[t],i=x_(t),s=new Ue,a=new Ue;s.add(a);let o={};for(let I of Xu){let U=new pr;U.name=I;let z=ml[I]?Ta[ml[I]]:[0,0,0],q=Ta[I];U.position.set(q[0]-z[0],q[1]-z[1],q[2]-z[2]),(ml[I]?o[ml[I]]:a).add(U),o[I]=U}s.updateMatrixWorld(!0);let l=new hs(Xu.map(I=>o[I])),c=t==="humain"?Bt("#ffffff",{vertexColors:!0,motif:"diffuseColor.rgb *= 0.97 + 0.04 * bruit(vPosObj * 300.0);",liser\u00E9:.2,cle:"peau"}):Bt("#ffffff",{vertexColors:!0,motif:Sa,liser\u00E9:.32,cle:"fourrure"}),h=[[i.corps,c]],u=e.kimono?new he(e.kimono).getHSL({}).l:0,d=u>.75?oe.marine:oe.creme,p=u<.3?oe.corail:oe.marine,f="#c8383d";if(e.tenue==="miko"){let I=Xf(),U=r_();h.push([U.haut,Bt("#fbf8f2",{liser\u00E9:.12,cle:"uni"})],[U.hakama,Bt(f,{liser\u00E9:.12,cle:"uni"})],[U.bandes,Bt(f,{liser\u00E9:.1,cle:"uni"})],[I.col,Bt(f,{liser\u00E9:.1,cle:"uni"})],[I.obi,Bt(f,{liser\u00E9:.1,cle:"uni"})])}else if(e.tenue==="veste"){let I=h_(),U=Bt("#9a7048",{motif:Sa,liser\u00E9:.15,cle:"daim"});h.push([I.chemise,Bt("#b8323a",{liser\u00E9:.12,cle:"uni"})],[I.veste,U],[I.revers,U],[I.pantalon,Bt("#2e3346",{liser\u00E9:.12,cle:"uni"})],[I.chaussures,Bt("#4a3226",{liser\u00E9:.2,cle:"uni"})])}else if(e.kimono){let I=Xf();h.push([I.kimono,Bt(e.kimono,{motif:qv,liser\u00E9:.12,cle:"kimono"})],[I.col,Bt(d,{liser\u00E9:.1,cle:"uni"})],[I.ourlet,Bt(d,{liser\u00E9:.1,cle:"uni"})],[I.obi,Bt(p,{liser\u00E9:.1,cle:"uni"})])}for(let[I,U]of h){let z=new dr(I,U);z.castShadow=!0,z.frustumCulled=!1,s.add(z),z.bind(l);let q=new dr(I,fl);q.frustumCulled=!1,s.add(q),q.bind(l,z.bindMatrix)}let v=new He({color:n.truffe}),m=new He({color:"#ffffff"}),g=pl(Bf),_=I=>(I.userData.sansContour=!0,I),x=(I,U,z,q,Z)=>(U.position.set(z-Ta[I][0],q-Ta[I][1],Z-Ta[I][2]),o[I].add(U),bs(U),U),y=I=>Bt(I,{liser\u00E9:.15,cle:"uni"}),S=y(oe.corail),M=y("#e2b552");if(e.kimono||e.tenue==="miko"){let I=new Ue,U=y(e.tenue==="miko"?f:p);I.add(ye(new Kn(.045,.045,.03,2,.01),U));for(let[z,q]of[[-.012,.25],[.014,-.2]]){let Z=ye(new Kn(.026,.09,.012,2,.005),U,z,-.055,-.004);Z.rotation.z=q,I.add(Z)}e.tenue==="miko"?(I.scale.setScalar(1.4),x("colonne",I,0,.27,.21)):x("colonne",I,.07,.27,.205)}if(e.geta){let I=y("#9a6a44"),U=y(e.geta);["G","D"].forEach((z,q)=>{let Z=new Ue;Z.add(ye(new Kn(.15,.022,.24,2,.007),I));for(let pe of[.065,-.065])Z.add(ye(new tt(.13,.028,.026),I,0,-.024,pe));let ae=ye(new Yt(.084,.009,8,20,Math.PI),U,0,.011,.02);ae.scale.y=1.2,Z.add(ae,ye(new Le(.012,10,8),U,0,.03,.1)),x("cheville"+z,Z,me.orteil[q][0],-.012,.05)})}if(e.lunettes){let I=new Ue,U=new He({color:"#1e2128"});for(let z of[-1,1]){let q=ye(new Le(.024,14,10),U,z*.027,0,0);q.scale.set(1,1.05,.25),I.add(_(q),ye(new Yt(.024,.003,6,18),M,z*.027,0,.002))}I.add(ye(new We(.0025,.0025,.012,6),M,0,.012,.002)),I.rotation.set(-.3,0,.05),x("poitrine",I,0,.37,.19)}if(e.accessoire==="sac"){let I=y(oe.marine),U=new Ue;U.add(ye(new Kn(.2,.19,.085,3,.03),I)),U.add(ye(new Kn(.205,.08,.09,3,.025),S,0,.065,.002)),U.add(ye(new tt(.03,.035,.01),M,0,.03,-.047)),x("poitrine",U,0,.375,-.205);for(let z of[-1,1]){let q=[[.07,.45,-.17],[.1,.515,-.05],[.11,.48,.1],[.12,.37,.176],[.145,.28,.1],[.09,.3,-.17]].map(([ae,pe,Q])=>new E(z*ae-me.poitrine[0],pe-me.poitrine[1],Q-me.poitrine[2])),Z=ye(Nu(q,.016,.005,new E(1,0,0),{affiner:!1}),I);o.poitrine.add(Z),bs(Z)}}else if(e.accessoire==="sacoche"){let I=y(oe.marine),U=[[.11,.5,0],[.05,.445,.16],[-.05,.33,.185],[-.14,.24,.155],[-.19,.19,.07]].map(([Z,ae,pe])=>new E(Z-me.poitrine[0],ae-me.poitrine[1],pe-me.poitrine[2])),z=ye(Nu(U,.014,.005,new E(.6,.6,0),{affiner:!1}),I);o.poitrine.add(z),bs(z);let q=new Ue;q.add(ye(new Kn(.11,.085,.045,3,.015),I)),q.add(ye(new Kn(.112,.045,.048,3,.015),S,0,.022,0)),q.add(ye(new Le(.008,8,6),M,0,.002,.025)),q.rotation.y=-1,x("hanches",q,-.21,.15,.07)}if(e.katana){let I=new Ue;I.add(ye(new ps(.013,.3,4,10),y("#1d1f2a"),0,-.17,0)),I.add(ye(new We(.015,.015,.015,10),M,0,-.33,0)),I.add(ye(new We(.03,.03,.008,18),M,0,.005,0)),I.add(ye(new We(.012,.013,.12,10),S,0,.07,0));for(let U=0;U<4;U++){let z=ye(new Yt(.013,.0035,4,10),y(oe.creme),0,.025+U*.026,0);z.rotation.x=Math.PI/2,I.add(z)}I.add(ye(new Le(.015,10,8),M,0,.135,0)),I.rotation.set(1.3,0,-.3),x("hanches",I,e.kimono?-.225:-.17,.27,e.kimono?.1:.07)}t!=="humain"&&["G","D"].forEach((I,U)=>{let z=U?1:-1,q=new Ue;q.position.set(-z*.03,-.02,.07),q.rotation.y=-z*.5;let Z=ye(new Le(.022,12,10),g);Z.scale.set(1.2,1,.45),q.add(_(Z));for(let[ae,pe]of[[-.022,.028],[0,.036],[.022,.028]]){let Q=ye(new Le(.009,10,8),g,ae,pe,.002);Q.scale.z=.5,q.add(_(Q))}o["poignet"+I].add(q)});let b=new Ue;b.position.set(Ou[0]-me.tete[0],Ou[1]-me.tete[1],Ou[2]-me.tete[2]),o.tete.add(b);let T=!!e.tetePhoto;b.add(T?p_(e.tetePhoto):new ce(i.tete,c));let R=[];if(e.masque==="kitsune")b.add(M_(y));else if(!T)for(let I of[-1,1]){let U=new Ue;if(U.rotation.y=I*.42,t==="shiba"){U.position.set(I*.1,.02,.232);let Z=ye(new Le(.022,16,12),v);Z.scale.set(.9,1.15,.4),U.add(_(Z),_(ye(new Le(.0075,10,8),m,-I*.006,.01,.009)))}else if(t==="humain"){U.position.set(I*.095,0,.238);let Z=ye(new Le(.03,18,14),m);Z.scale.set(1,.72,.3);let ae=ye(new Le(.021,16,12),new He({color:"#5d7896"}),0,-.002,.005);ae.scale.set(.95,.95,.3);let pe=ye(new Le(.011,12,10),new He({color:"#1b2230"}),0,-.002,.008);pe.scale.z=.3;let Q=ye(new Yt(.031,.0045,6,18,Math.PI),new He({color:"#4a3226"}),0,-.002,.006);Q.scale.set(1.05,.75,1);let re=ye(new ps(.006,.04,4,8),new He({color:"#8a6a45"}),I*.004,.05,.004);re.rotation.z=Math.PI/2-I*.18,U.add(_(Z),_(ae),_(pe),_(Q),_(re),_(ye(new Le(.0065,10,8),m,-I*.006,.006,.011)))}else{U.position.set(I*.1,0,.236);let Z=ye(new Le(.02,16,12),new He({color:"#000000"}));Z.scale.set(1,1.15,.4),U.add(_(Z),_(ye(new Le(.0085,10,8),m,-I*.004,.009,.009)),_(ye(new Le(.004,8,6),m,I*.006,-.008,.009)))}b.add(U),R.push(U);let z=new Ue;z.position.set(I*.19,-.07,.19),z.rotation.y=I*.75;let q=ye(new Le(.035,14,10),new He({color:Bf,transparent:!0,opacity:.75}));if(q.scale.set(1.3,.75,.2),z.add(_(q)),t!=="humain")for(let Z of[-1,0,1]){let ae=ye(new tt(.003,.016,.003),new He({color:"#e7788a"}),Z*.015,0,.008);ae.rotation.z=.5,z.add(_(ae))}b.add(z)}if(!e.masque&&t==="humain"&&!T){let I=ye(new Le(.012,10,8),pl("#e9b89c"),0,-.05,.262);I.scale.set(1,.8,.6),b.add(_(I));let U=ye(new Yt(.04,.0045,6,20,Math.PI*.8),new He({color:"#7a3a32"}),.006,-.075,.248);U.rotation.z=Math.PI+Math.PI*.1-.12,U.scale.set(1,.6,1),U.rotation.x=-.25,b.add(_(U))}if(!e.masque&&t!=="humain"){let U=ye(new Le(.02,16,12),v,0,-.045,.282);U.scale.set(1.25,.8,.6),b.add(_(U));let z=ye(new Le(.006,10,8),new He({color:"#ffffff",transparent:!0,opacity:.8}),-.008,-.038,.282+.01);z.scale.set(1.4,.7,.5),b.add(_(z));for(let q of[-1,1]){let Z=ye(new Yt(.014,.003,6,14,Math.PI),v,q*.014,-.07,.26999999999999996);Z.rotation.z=Math.PI,b.add(_(Z))}}let O=new Ue;t==="shiba"?(O.add(new ce(i.queue,c)),O.position.set(Bu[0]-me.hanches[0],Bu[1]-me.hanches[1],Bu[2]-me.hanches[2]),O.scale.setScalar(1.35)):t==="panda"&&(O.add(ye(new Le(.045,16,12),Bt(n.base,{motif:Sa,cle:"fourrure-uni"}))),O.position.set(0,.2-me.hanches[1],-.17)),o.hanches.add(O);let V=Bt(e.cheveux,{motif:Sa,liser\u00E9:.25,cle:"cheveux"}),H=new Ue,X=m_(e.coiffure);if(X&&H.add(new ce(X,X.attributes.color?Bt("#ffffff",{vertexColors:!0,motif:Sa,liser\u00E9:.25,cle:"cheveux-degrade"}):V)),e.coiffure==="tresses"){for(let z of[-1,1])H.add(ye(new Le(.02,12,10),S,z*.28,-.35,.075));let I=new Ue,U=y("#ffffff");for(let[z,q,Z]of[[-.035,-.03,.9],[.035,-.035,-.9]]){let ae=ye(new Le(.03,10,8),y("#6aa845"),z,q,-.01);ae.scale.set(1.6,.6,.3),ae.rotation.z=Z,I.add(ae)}for(let z=0;z<16;z++){let q=z/16*Math.PI*2,Z=z%2?.042:.03,ae=ye(new Le(.02,10,8),U,Math.cos(q)*Z,Math.sin(q)*Z,z%2*-.008);ae.scale.set(1.25,.8,.5),ae.rotation.z=q,I.add(ae)}I.add(ye(new Le(.02,12,10),y("#f3cf6a"),0,0,.01)),I.position.set(.18,.195,.165),I.rotation.set(-.6,.75,0),I.scale.setScalar(1.3),H.add(I)}else if(e.coiffure==="chignon"){let I=y("#c9a46a");for(let U of[-1,1]){let z=new Ue;z.add(ye(new We(.0065,.005,.32,8),I));for(let q=0;q<3;q++)z.add(ye(new Le(.008,8,6),S,0,.1+q*.02,0));z.position.set(0,-.05,-.335),z.rotation.set(.25,0,U*.75),H.add(z)}}else if(e.coiffure==="carre"||e.coiffure==="longs")for(let I of[-1,1]){let U=e.coiffure==="longs",z=ye(new We(U?.06:.03,U?.058:.03,.04,16),y("#3a2a24"),I*(U?.268:.255),U?-.13:-.09,U?.064:.04);z.rotation.z=U?I*.12:0,H.add(z)}else if(e.coiffure==="chonmage"){let I=ye(new Yt(.03,.009,8,16),S,0,.2,-.22);I.rotation.y=Math.PI/2,I.rotation.z=.3,H.add(I)}return b.add(H),bs(b),bs(O),a.position.y=e.geta?.05:0,s.userData={os:o,yeux:R,queue:O,yHanches:me.hanches[1],phase:Math.random()*6,clignement:1+Math.random()*3},s}function ws(r,e,t){let n=r.userData,i=n.os,s=Math.min(t/4,1),a=1-s;n.phase+=e*(3+t*2.6);let o=Math.sin(n.phase);[["G",1],["D",-1]].forEach(([c,h])=>{i["cuisse"+c].rotation.x=-o*.55*s*h,i["genou"+c].rotation.x=0,i["epaule"+c].rotation.x=o*.6*s*h,i["epaule"+c].rotation.z=(h>0?-1:1)*(.05+Math.sin(n.phase*.4)*.04*a)}),i.hanches.position.y=n.yHanches+Math.abs(Math.cos(n.phase))*.035*s,i.hanches.rotation.z=o*.08*s,i.colonne.rotation.x=Math.sin(n.phase*.6)*.02*a,i.tete.rotation.z=Math.sin(n.phase*.5)*.05*a-o*.05*s,n.queue.rotation.y=Math.sin(n.phase*(s?1:2.5))*.4,n.clignement-=e;let l=n.clignement<0;for(let c of n.yeux)c.scale.y=l?.12:1;n.clignement<-.12&&(n.clignement=2+Math.random()*3)}var In,Aa,Ts,Mr,jv,Ra,Bf,Xv,Zf,Sa,qv,me,Ou,Jn,Ff,Hf,Yv,Bu,Zv,wa,zf,Kv,Vu,Ca,qu,Jv,kf,$v,Qv,e_,Wu,Kf,t_,n_,i_,ju,Gf,s_,a_,o_,l_,c_,Vf,Wf,jf,u_,Fu,Es,f_,Hu,qf,zu,gl,ot,Ss,Xu,ct,ml,Ta,mn,Gu,Yf,vl=sn(()=>{Zn();Gi();Uf();Nf();Of();In={espece:[{id:"shiba",nom:"Shiba"},{id:"panda",nom:"Panda"}],genre:[{id:"homme",nom:"Homme"},{id:"femme",nom:"Femme"},{id:"neutre",nom:"Neutre"}],coiffure:[{id:"aucune",nom:"Au naturel"},{id:"tresses",nom:"Franges et tresses"},{id:"chignon",nom:"Chignon et baguettes"},{id:"chonmage",nom:"Chonmage moderne"},{id:"frange",nom:"Courte \xE0 frange"}],kimono:[oe.corail,oe.rose,oe.bleu,oe.marine,oe.creme,"#3f8f7a"],cheveux:["#2a2a2e","#5a3a2a","#a8643a","#e8d2a6","#f8a0ab"],yeux:["#3b6fd1","#6b4a33","#3f8f7a","#c0506a","#7a5bc4"],accessoire:[{id:"sac",nom:"Sac \xE0 dos"},{id:"sacoche",nom:"Sacoche"},{id:"aucun",nom:"Aucun"}],geta:[oe.corail,oe.marine,oe.creme]},Aa={espece:"shiba",genre:"neutre",coiffure:"aucune",kimono:null,cheveux:"#5a3a2a",yeux:"#3b6fd1",accessoire:"aucun",katana:!1,geta:null},Ts=["espece","coiffure","cheveux","kimono","geta","accessoire","arme","prenom"],Mr=.006,jv=.0045,Ra={shiba:{base:"#eba04e",clair:"#fbf1e2",oreille:"#f6bfae",truffe:"#3a2a26"},panda:{base:"#fbfaf6",noir:"#1f1f24",truffe:"#1f1f24"},humain:{base:"#f6d5bf",clair:"#fbf8f2",truffe:"#3a2a26"}},Bf="#f7a8b2",Xv=(()=>{let r=new Yn(new Uint8Array([120,178,225,255]),4,1,mi);return r.minFilter=r.magFilter=It,r.needsUpdate=!0,r})(),Zf=`
float hash3(vec3 p) { p = fract(p * 0.3183099 + 0.1); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
float bruit(vec3 x) {
  vec3 i = floor(x), f = fract(x); f = f * f * (3.0 - 2.0 * f);
  return mix(mix(mix(hash3(i), hash3(i + vec3(1,0,0)), f.x), mix(hash3(i + vec3(0,1,0)), hash3(i + vec3(1,1,0)), f.x), f.y),
             mix(mix(hash3(i + vec3(0,0,1)), hash3(i + vec3(1,0,1)), f.x), mix(hash3(i + vec3(0,1,1)), hash3(i + vec3(1,1,1)), f.x), f.y), f.z);
}
float fbm(vec3 p) { return 0.5 * bruit(p) + 0.3 * bruit(p * 2.07) + 0.2 * bruit(p * 4.13); }`;Sa=`
  float meches = fbm(vPosObj * vec3(160.0, 38.0, 160.0));
  float grain = bruit(vPosObj * 420.0);
  diffuseColor.rgb *= 0.86 + 0.2 * meches + 0.06 * grain;`,qv=`
  vec2 q = vPosObj.xy * vec2(24.0, 24.0);
  q.x += mod(floor(q.y), 2.0) * 0.5;
  vec2 g = vec2(fract(q.x) - 0.5, fract(q.y));
  float r = length(g);
  float vagues = (1.0 - smoothstep(0.03, 0.09, abs(fract(r * 3.2) - 0.5))) * step(r, 0.95);
  diffuseColor.rgb = mix(diffuseColor.rgb, diffuseColor.rgb * 1.25 + 0.06, vagues * 0.45);
  diffuseColor.rgb *= 0.95 + 0.07 * bruit(vPosObj * 500.0);`,me=(()=>{let r=(e,t,n)=>[[-e,t,n],[e,t,n]];return{hanches:[0,.22,0],colonne:[0,.3,0],poitrine:[0,.4,0],cou:[0,.48,0],tete:[0,.52,0],epaule:r(.155,.44,0),coude:r(.2,.37,.03),poignet:r(.225,.3,.06),cuisse:r(.095,.2,0),genou:r(.105,.13,.015),cheville:r(.11,.07,.025),orteil:r(.115,.03,.12)}})(),Ou=[0,.74,0],Jn=(r,e,t)=>Te(Mt(r,e,t,[0,.3,0],[.19,.2,.17]),Mt(r,e,t,[0,.42,-.005],[.15,.1,.13]),.08),Ff=(r,e,t,n)=>Te(nt(r,e,t,me.epaule[n],me.poignet[n],.07,.066),Mt(r,e,t,[me.poignet[n][0],me.poignet[n][1]-.012,me.poignet[n][2]+.01],[.072,.07,.07]),.03),Hf=(r,e,t,n)=>Te(nt(r,e,t,me.cuisse[n],me.cheville[n],.085,.075),Mt(r,e,t,[me.orteil[n][0],.05,.05],[.08,.055,.1]),.04),Yv=(r,e,t)=>{let n=Jn(r,e,t);return Math.abs(r)>.06&&e>.18&&(n=Te(n,Math.min(Ff(r,e,t,0),Ff(r,e,t,1)),.05)),e<.3&&(n=Te(n,r<0?Hf(r,e,t,0):Hf(r,e,t,1),.05)),Math.max(n,-e)},Bu=[0,.25,-.185],Zv=new gr([[0,0,.025],[0,.05,-.07],[0,.13,-.13],[.01,.2,-.13],[.03,.228,-.085],[.05,.198,-.05],[.07,.15,-.055]].map(r=>new E(...r))),wa=Zv.getSpacedPoints(48).map((r,e,t)=>({v:r,t:e/(t.length-1)})),zf=r=>r<.35?.04+r/.35*.014:r<.7?.054-(r-.35)/.35*.008:.046-(r-.7)/.3*.03,Kv=(r,e,t)=>{let n=1/0;for(let i=1;i<wa.length;i++){let s=wa[i-1],a=wa[i];n=Te(n,nt(r,e,t,s.v.toArray(),a.v.toArray(),zf(s.t),zf(a.t)),.012)}return n},Vu=.3,Ca=.06,qu=(r,e,t,n=0)=>{let i=Math.min(1,Math.max(0,(Vu-e)/(Vu-Ca))),s=(.195+i*.045)*(1+.025*i*Math.abs(Math.sin(Math.atan2(t,r)*9)))+n;return Math.hypot(r,t/.92)-s},Jv=(r,e,t)=>{let n=Math.max(Jn(r,e,t)-.014,.2-e);n=Te(n,Math.max(qu(r,e,t),Ca-e,e-Vu),.04);for(let i=0;i<2;i++){let s=me.epaule[i],a=s.map((l,c)=>l+(me.poignet[i][c]-l)*.55),o=Math.hypot(a[0]-s[0],a[1]-s[1],a[2]-s[2]);n=Te(n,Math.max(nt(r,e,t,s,a,.078,.095),(Ea(r,e,t,s,a)-1)*o),.02)}return Math.max(n,e-.53)},kf=(r,e,t,n)=>{let i=n[0]-t[0],s=n[1]-t[1],a=Math.min(1,Math.max(0,((r-t[0])*i+(e-t[1])*s)/(i*i+s*s)));return Math.hypot(r-t[0]-a*i,e-t[1]-a*s)},$v=(r,e,t)=>Math.min(Math.max(Jn(r,e,t)-.018,kf(r,e,[-.09,.51],[.065,.25])-.018,.03-t),Math.max(Jn(r,e,t)-.0172,kf(r,e,[.09,.51],[-.015,.34])-.018,.03-t)),Qv=(r,e,t)=>Math.max(Jn(r,e,t)-.023,Math.abs(e-.27)-.03),e_=(r,e,t)=>Math.max(qu(r,e,t,.004),Ca-.002-e,e-(Ca+.028)),Wu=(r,e,t,n)=>{if(e>.24)return n;let i=Math.min(1,(.24-e)/.18)*.65,s=Math.min(1,Math.max(0,.5-r/.12));return[[ct.hanches,1-i],[ct.cuisseG,i*s],[ct.cuisseD,i*(1-s)]].filter(a=>a[1]>0)},Kf=(r,e,t,n,i=0)=>{let s=n?1:-1,a=me.epaule[n],o=[me.poignet[n][0]+s*.025,.17,me.poignet[n][2]+.03];return{d:nt(r,e,t,a,o,.072+i,.125+i),t:Ea(r,e,t,a,o)}},t_=(r,e,t)=>{let n=Math.max(Jn(r,e,t)-.015,.25-e,e-.53);for(let i=0;i<2;i++)n=Te(n,Kf(r,e,t,i).d,.02);return n},n_=(r,e,t)=>Math.max(qu(r,e,t,.008),Ca-e,e-.31),i_=(r,e,t)=>{let n=1/0;for(let i=0;i<2;i++){let s=Kf(r,e,t,i,.004);n=Math.min(n,Math.max(s.d,Math.abs(s.t-.86)-.025))}return n},ju=(r,e,t,n)=>{let i=[ct.cuisseG,ct.genouG,ct.chevilleG,ct.cuisseD,ct.genouD,ct.chevilleD],s=n.filter(([a])=>!i.includes(a));return s.length?s:[[r<0?ct.poignetG:ct.poignetD,1]]},Gf=null;s_=(r,e,t)=>Math.max(Jn(r,e,t)-.01,.2-e,e-.53),a_=(r,e,t)=>{let n=Math.max(Jn(r,e,t)-.024,.17-e);for(let s=0;s<2;s++){let a=me.epaule[s],o=a.map((c,h)=>c+(me.poignet[s][h]-c)*.8),l=Math.hypot(o[0]-a[0],o[1]-a[1],o[2]-a[2]);n=Te(n,Math.max(nt(r,e,t,a,o,.082,.078),(Ea(r,e,t,a,o)-1)*l),.02)}let i=.012+Math.max(0,e-.28)*.42;return n=Math.max(n,-Math.max(Math.abs(r)-i,.02-t)),Math.max(n,e-.535)},o_=(r,e,t)=>{let n=.012+Math.max(0,e-.28)*.42;return Math.max(Jn(r,e,t)-.03,Math.abs(Math.abs(r)-n-.03)-.03,.4-e,e-.53,.04-t)},l_=(r,e,t)=>{let n=Math.max(Jn(r,e,t)-.012,e-.26);for(let i=0;i<2;i++)n=Te(n,nt(r,e,t,me.cuisse[i],[me.cheville[i][0],.075,me.cheville[i][2]],.094,.084),.03);return Math.max(n,.075-e)},c_=(r,e,t)=>{let n=1/0;for(let i=0;i<2;i++)n=Math.min(n,Mt(r,e,t,[me.orteil[i][0],.05,.04],[.09,.066,.13]));return Math.max(n,-e)},Vf=(r,e,t,n)=>{let i=[ct.hanches,ct.colonne,ct.cuisseG,ct.genouG,ct.chevilleG,ct.cuisseD,ct.genouD,ct.chevilleD],s=n.filter(([a])=>i.includes(a));return s.length?s:[[ct.hanches,1]]},Wf=null;jf=null;u_={humain:(r,e,t)=>Te(Mt(r,e,t,[0,.02,0],[.27,.25,.25]),Mt(r,e,t,[0,-.1,.06],[.17,.13,.17]),.08),shiba:(r,e,t)=>{let n=Mt(r,e,t,[0,.02,0],[.29,.24,.25]);for(let i of[-1,1])n=Te(n,Mt(r,e,t,[i*.15,-.08,.08],[.14,.11,.13]),.06);n=Te(n,Mt(r,e,t,[0,-.07,.2],[.085,.06,.07]),.05);for(let i of[-1,1])n=Te(n,nt(r,e,t*2.4,[i*.15,.17,-.02],[i*.2,.33,-.05],.095,.014)/2.4,.04);for(let i of[-1,1])n=Te(n,nt(r,e,t,[i*.24,-.07,.03],[i*.315,-.115,.02],.035,.005),.02),n=Te(n,nt(r,e,t,[i*.22,-.13,.05],[i*.28,-.195,.045],.03,.005),.02),n=Te(n,nt(r,e,t,[i*.255,-.01,0],[i*.315,-.035,-.01],.03,.005),.02);return n},panda:(r,e,t)=>{let n=Mt(r,e,t,[0,.01,0],[.3,.24,.26]);for(let i of[-1,1])n=Te(n,Mt(r,e,t,[i*.15,-.08,.08],[.15,.11,.13]),.06);n=Te(n,Mt(r,e,t,[0,-.075,.2],[.07,.05,.06]),.05);for(let i of[-1,1])n=Te(n,Mt(r,e,t,[i*.2,.19,-.03],[.085,.08,.06]),.04);for(let[i,s,a]of[[-.03,.06,.05],[0,.08,.06],[.03,.05,.045]])n=Te(n,nt(r,e,t,[i,.22,s],[i*1.6,.22+a,s+.02],.016,.003),.012);return n}},Fu=new Map;Es=(r,e,t)=>Mt(r,e,t,[0,.015,0],[.295,.24,.255]),f_=r=>-.1+.26*Math.max(0,r/.255)**1.5,Hu=(r,e,t,n=.022)=>Math.max(Es(r,e,t)-n,f_(t)-e),qf={longs:(r,e,t)=>{let n=.012*Math.sin(e*28+Math.atan2(r,-t)*3),i=Math.max(Es(r,e,t)-.026,-.12-e);i=Te(i,Math.max(Mt(r,e,t,[0,-.13,-.05],[.31,.3,.25])-n,-.44-e,t-.12),.05);for(let a of[-1,1])i=Te(i,nt(r,e,t,[a*.25,-.02,.06],[a*.3,-.4,.07],.055,.035)-n,.03);let s=Math.max(.1-t,e-.12,(Math.hypot(r/.21,Math.max(0,e)/.14)-1)*.15);return Math.max(i,-s)},carre:(r,e,t)=>{let n=Math.max(Es(r,e,t)-.024,-.15-e),i=Math.max(.1-t,e-.1,(Math.hypot(r/.2,Math.max(0,e)/.125)-1)*.15);n=Math.max(n,-i);for(let s of[-1,1])n=Te(n,Mt(r,e,t,[s*.255,-.11,.04],[.045,.06,.06]),.03);return n},tresses:(r,e,t)=>{let n=Hu(r,e,t),i=.075+.01*Math.abs(Math.sin(r*55)),s=.2-Math.max(0,.13-e)*.5;n=Te(n,Math.max(Es(r,e,t)-.028,i-e,(Math.abs(r)-s)*.7,.06-t),.03);for(let a of[-1,1])n=Te(n,nt(r,e,t,[a*.2,.1,.13],[a*.235,-.1,.12],.03,.012),.02);if(Math.abs(r)>.17&&e<.06){let a=Math.sign(r);for(let o=0;o<=7;o++){let l=o/7,c=.036-.012*l,h=[a*(.245+.03*l+(o%2?.012:-.012)),-.02-.36*l,-.02+.11*l];n=Te(n,Mt(r,e,t,h,[c,c*1.3,c]),.008)}}return n},chignon:(r,e,t)=>{let n=Hu(r,e,t);return n=Te(n,Mt(r,e,t,[0,-.05,-.27],[.12,.095,.085]),.04),n=Te(n,Mt(r,e,t,[.04,-.02,-.325],[.065,.055,.045]),.02),n=Te(n,Mt(r,e,t,[-.045,-.085,-.322],[.065,.05,.045]),.02),n},frange:(r,e,t)=>{let n=Math.max(Es(r,e,t)-.024,-.08+.2*Math.max(0,t/.255)**1.5-e);n=Te(n,Mt(r,e,t,[0,.17,-.03],[.26,.11,.24]),.05);for(let s=0;s<7;s++){let a=-.4+s/6*3.9,o=[Math.cos(a)*.11,.25,Math.sin(a)*.08-.05];n=Te(n,nt(r,e,t,o,[o[0]*1.4,.275,o[2]-.08],.045,.008),.025)}for(let[s,a,o]of[[.13,.12,11],[.02,.12,10]])for(let l=0;l<o;l++){let c=1.75+l/(o-1)*2.8+(s<.1?.12:0),h=Math.sin(c),u=Math.cos(c),d=[h*.29,s-a-l%2*.02,u*.27];n=Te(n,nt(r,e,t,[h*.265,s,u*.245],d,.046,.006),.01)}for(let s=0;s<6;s++){let a=s/6*Math.PI*2;n=Te(n,nt(r,e,t,[0,.245,-.11],[Math.cos(a)*.1,.235-Math.abs(Math.sin(a))*.02,-.11+Math.sin(a)*.08-.02],.03,.006),.015)}for(let s of[-1,1])for(let a of[0,.06])n=Te(n,nt(r,e,t,[s*.27,.08,a],[s*.285,-.03-a*.3,a+.02],.035,.005),.01);let i=.035;for(let s=0;s<9;s++){let a=-.15+s*.0375,o=a<i?-1:1,l=Math.abs(a-i),c=[a,.23,.12],h=[a+o*.015,.15,.228],u=[a+o*(.03+l*.25),.04+l*.15+s%2*.02,.262];n=Te(n,nt(r,e,t,c,h,.04,.032),.012),n=Te(n,nt(r,e,t,h,u,.032,.004),.006)}return n},rejetes:(r,e,t)=>{let n=-.1+.3*Math.max(0,t/.255)**1.5-.07*Math.min(1,(r/.25)**2),i=.004+.02*Math.min(1,Math.max(0,(e-n)/.1)),s=Math.max(Es(r,e,t)-i,n-e);s=Te(s,Mt(r,e,t,[0,.17,-.09],[.22,.09,.18]),.05);for(let a=0;a<7;a++){let o=-.15+a*.05,l=a%3*.012,c=[o,.15-l,.205-Math.abs(o)*.3],h=[o*1.1,.262+l-o*o*2.4,.02];s=Te(s,nt(r,e,t,c,h,.008,.038),.008),s=Te(s,nt(r,e,t,h,[o*1.3,.16,-.27],.04,.008),.012)}for(let a of[-1,1])for(let[o,l]of[[.12,.08],[.04,.02],[.07,-.08]])s=Te(s,nt(r,e,t,[a*(.265-Math.max(0,o-.05)*.9),o+.04,l+.05],[a*.29,o-.09,l-.08],.026,.005),.01);for(let a=0;a<9;a++){let o=2+a/8*2.3,l=Math.sin(o),c=Math.cos(o);s=Te(s,nt(r,e,t,[l*.26,.05,c*.24],[l*.29,-.12-a%2*.03,c*.27],.04,.007),.01)}return s=Te(s,nt(r,e,t,[.15,.22,.15],[.2,.09,.225],.022,.004),.01),s=Te(s,nt(r,e,t,[-.18,.21,.13],[-.235,.1,.18],.02,.004),.01),s},chonmage:(r,e,t)=>{let n=Hu(r,e,t,.026);for(let i=0;i<14;i++){let s=-2.6+i/13*5.2;if(Math.abs(s)<.75)continue;let a=Math.sin(s),o=Math.cos(s),l=Math.max(0,-o);n=Te(n,nt(r,e,t,[a*.265,.1,o*.23],[a*.345,-.03-l*.08,o*.3],.05,.006),.015),Math.abs(s)>1.6&&(n=Te(n,nt(r,e,t,[a*.255,.19,o*.225],[a*.31,.06-i%2*.02,o*.285],.048,.007),.012)),Math.abs(s)>1.9&&(n=Te(n,nt(r,e,t,[a*.24,-.02,o*.22],[a*.29,-.22+i%2*.03,o*.275],.045,.008),.015))}for(let i of[-.05,0,.05])n=Te(n,nt(r,e,t,[i,.24,-.04],[i*1.5,.33,-.12],.035,.005),.012);n=Te(n,nt(r,e,t,[0,.19,-.2],[0,.23,-.34],.042,.01),.015);for(let i=0;i<6;i++){let s=-.125+i*.05;n=Te(n,nt(r,e,t,[s,.22,.14],[s*1.05,.06+i%3*.018,.245],.03,.005),.01)}return n}},zu=new Map;gl=r=>new he(r),ot=(r,e,t)=>{let n=Math.min(1,Math.max(0,(t-r)/(e-r)));return n*n*(3-2*n)},Ss=(r,e,t)=>gl(r).lerp(gl(e),t);Xu=["hanches","colonne","poitrine","cou","tete","epauleG","coudeG","poignetG","epauleD","coudeD","poignetD","cuisseG","genouG","chevilleG","cuisseD","genouD","chevilleD"],ct=Object.fromEntries(Xu.map((r,e)=>[r,e])),ml={hanches:null,colonne:"hanches",poitrine:"colonne",cou:"poitrine",tete:"cou",epauleG:"poitrine",coudeG:"epauleG",poignetG:"coudeG",epauleD:"poitrine",coudeD:"epauleD",poignetD:"coudeD",cuisseG:"hanches",genouG:"cuisseG",chevilleG:"genouG",cuisseD:"hanches",genouD:"cuisseD",chevilleD:"genouD"},Ta={hanches:me.hanches,colonne:me.colonne,poitrine:me.poitrine,cou:me.cou,tete:me.tete,epauleG:me.epaule[0],coudeG:me.coude[0],poignetG:me.poignet[0],epauleD:me.epaule[1],coudeD:me.coude[1],poignetD:me.poignet[1],cuisseG:me.cuisse[0],genouG:me.genou[0],chevilleG:me.cheville[0],cuisseD:me.cuisse[1],genouD:me.genou[1],chevilleD:me.cheville[1]},mn=(()=>{let r=[{os:ct.hanches,a:[0,.12,0],b:[0,.26,0],r:.17},{os:ct.colonne,a:[0,.26,0],b:[0,.36,0],r:.17},{os:ct.poitrine,a:[0,.36,0],b:[0,.5,0],r:.14}];return["G","D"].forEach((e,t)=>{r.push({os:ct["epaule"+e],a:me.epaule[t],b:me.coude[t],r:.065}),r.push({os:ct["coude"+e],a:me.coude[t],b:me.poignet[t],r:.065}),r.push({os:ct["poignet"+e],a:me.poignet[t],b:[me.poignet[t][0]+.01,me.poignet[t][1]-.04,me.poignet[t][2]+.03],r:.068}),r.push({os:ct["cuisse"+e],a:me.cuisse[t],b:me.genou[t],r:.08}),r.push({os:ct["genou"+e],a:me.genou[t],b:me.cheville[t],r:.078}),r.push({os:ct["cheville"+e],a:me.cheville[t],b:me.orteil[t],r:.06})}),r})(),Gu=new Map;Yf=null});var Jf,$f,Qf,As,Rs,em,Tt,Yu,Zu,tm,_l,nm=sn(()=>{Zn();Uu();Gi();vl();Jf=60,$f=6,Qf=3,As=Rt.cases,Rs=Rt.taille,em=[[2,3],[6,3],[3,5],[5,5]],Tt=r=>`${r.i},${r.j}`,Yu=(r,e)=>Math.abs(r.i-e.i)+Math.abs(r.j-e.j),Zu=r=>new Promise(e=>setTimeout(e,r)),tm=([r,e])=>r+Math.floor(Math.random()*(e-r+1)),_l=class{constructor({scene:e,camera:t,canvas:n,joueur:i,boss:s,def:a,tutoriel:o,onFin:l}){Object.assign(this,{scene:e,camera:t,canvas:n,joueur:i,boss:s,def:a,tutoriel:o,onFin:l}),this.ui={racine:document.getElementById("combat"),pvJ:document.getElementById("pv-joueur"),pvB:document.getElementById("pv-boss"),nomB:document.getElementById("nom-boss"),pa:document.getElementById("pa"),pm:document.getElementById("pm"),sorts:document.getElementById("sorts"),finTour:document.getElementById("fin-tour"),journal:document.getElementById("journal"),tour:document.getElementById("tour"),bulles:document.getElementById("bulles")},this.groupe=new Ue,e.add(this.groupe),this.raycaster=new nl,this.souris=new ie,this.anims=[],this.obstacles=new Set(em.map(([c,h])=>`${c},${h}`)),this.j={c:{i:4,j:7},pv:Jf,max:Jf,pa:$f,pm:Qf,mesh:i,vitesse:0},this.b={c:{i:4,j:1},pv:a.pv,max:a.pv,pa:a.pa??6,pm:a.pm??3,mesh:s,vitesse:0},this.placer(this.j),this.placer(this.b),this.orienter(this.j,this.b.c),this.orienter(this.b,this.j.c),this.construireGrille(),this.construireUI(),this.ecouter(),this.cadrerCamera(),this.ui.racine.hidden=!1,this.log(`\u2694\uFE0F Combat contre ${a.nom} !`),o&&(this.log("Cases bleues : clique pour te d\xE9placer (PM). Choisis un sort puis clique sur la cible (PA)."),this.log("Touches 1, 2, 3 pour les sorts, Entr\xE9e pour finir le tour."),this.log("Abrite-toi derri\xE8re les pierres : elles arr\xEAtent les shurikens et les sorts \xE0 distance.")),this.debutTourJoueur()}monde(e,t=0){return new E(Rt.centre.x+(e.i-(As-1)/2)*Rs,t,Rt.centre.z+(e.j-(As-1)/2)*Rs)}placer(e){e.mesh.position.copy(this.monde(e.c,.08))}orienter(e,t){let n=this.monde(t).sub(this.monde(e.c));n.lengthSq()>0&&(e.mesh.rotation.y=Math.atan2(n.x,n.z))}construireGrille(){this.cases=[];let e=new En(Rs*.92,Rs*.92);for(let n=0;n<As;n++)for(let i=0;i<As;i++){let s=new ce(e,new He({color:oe.marine,transparent:!0,opacity:.12,depthWrite:!1}));s.rotation.x=-Math.PI/2,s.position.copy(this.monde({i:n,j:i},.1)),s.userData.c={i:n,j:i},this.groupe.add(s),this.cases.push(s)}let t=new Ui({color:"#8b93a3",roughness:1,flatShading:!0});for(let[n,i]of em){let s=new ce(new la(Rs*.42),t);s.position.copy(this.monde({i:n,j:i},Rs*.3)),s.castShadow=!0,this.groupe.add(s)}}vue(e,t){let n=Math.max(Math.abs(t.i-e.i),Math.abs(t.j-e.j))*4;for(let i=1;i<n;i++){let s={i:Math.round(e.i+(t.i-e.i)*i/n),j:Math.round(e.j+(t.j-e.j)*i/n)};if(Tt(s)!==Tt(e)&&Tt(s)!==Tt(t)&&this.obstacles.has(Tt(s)))return!1}return!0}atteint(e,t,n){let i=Yu(t,n);return i>=e.portee[0]&&i<=e.portee[1]&&(e.portee[1]<=1||this.vue(t,n))}colorer(){let e=this.etat==="joueur",t=new Map;if(e&&this.sort)for(let n of this.cases){let i=n.userData.c;!this.obstacles.has(Tt(i))&&this.atteint(this.sort,this.j.c,i)&&t.set(Tt(i),oe.corail)}else if(e){for(let n of this.accessibles().keys())t.set(n,oe.bleu);this.survol&&this.chemin(this.survol)?.forEach(i=>t.set(Tt(i),"#ffffff"))}for(let n of this.cases){let i=Tt(n.userData.c);n.material.color.set(t.get(i)??oe.marine),n.material.opacity=t.has(i)?.7:.12}}bloque(e,t=!1){if(e.i<0||e.j<0||e.i>=As||e.j>=As||this.obstacles.has(Tt(e)))return!0;let n=t?this.j.c:this.b.c;return e.i===n.i&&e.j===n.j}parcours(e,t,n=!1){let i=new Map([[Tt(e),{c:e,prev:null,d:0}]]),s=[e];for(;s.length;){let a=s.shift(),o=i.get(Tt(a)).d;if(!(o>=t))for(let[l,c]of[[1,0],[-1,0],[0,1],[0,-1]]){let h={i:a.i+l,j:a.j+c};i.has(Tt(h))||this.bloque(h,n)||(i.set(Tt(h),{c:h,prev:a,d:o+1}),s.push(h))}}return i}accessibles(){let e=this.parcours(this.j.c,this.j.pm);return e.delete(Tt(this.j.c)),e}remonter(e,t){let n=[];for(let i=e.get(Tt(t));i&&i.prev;i=e.get(Tt(i.prev)))n.unshift(i.c);return n}chemin(e){let t=this.parcours(this.j.c,this.j.pm);return t.has(Tt(e))?this.remonter(t,e):null}construireUI(){this.ui.nomB.textContent=`${this.def.nom} \u2014 ${this.def.titre}`,this.ui.sorts.innerHTML="",this.boutons=Ru.map(e=>{let t=document.createElement("button");return t.className="sort",t.innerHTML=`<kbd>${e.touche}</kbd><span>${e.nom}</span><small>${e.pa} PA \xB7 ${e.soin?`soin ${e.soin.join("\u2013")}`:`${e.degats.join("\u2013")} d\xE9g\xE2ts \xB7 port\xE9e ${e.portee.join("\u2013")}`}</small>`,t.onclick=()=>this.choisirSort(e),this.ui.sorts.append(t),{s:e,b:t}}),this.ui.finTour.onclick=()=>this.finTourJoueur()}majUI(){let e=(t,n)=>{t.style.setProperty("--pct",`${Math.max(0,n.pv/n.max*100)}%`),t.dataset.texte=`${Math.max(0,n.pv)} / ${n.max} PV`};e(this.ui.pvJ,this.j),e(this.ui.pvB,this.b),this.ui.pa.textContent=this.j.pa,this.ui.pm.textContent=this.j.pm,this.ui.tour.textContent=this.etat==="joueur"?"\xC0 toi de jouer":this.etat==="boss"?`Tour de ${this.def.nom}`:"";for(let{s:t,b:n}of this.boutons)n.disabled=this.etat!=="joueur"||t.pa>this.j.pa||t.parTour&&this.utilises[t.id]>=t.parTour,n.classList.toggle("actif",this.sort===t);this.ui.finTour.disabled=this.etat!=="joueur",this.colorer()}log(e){let t=document.createElement("p");for(t.textContent=e,this.ui.journal.append(t);this.ui.journal.children.length>6;)this.ui.journal.firstChild.remove()}bulle(e,t,n){let i=e.mesh.position.clone().setY(2.2).project(this.camera),s=document.createElement("div");s.className=`bulle ${n}`,s.textContent=t,s.style.left=`${(i.x*.5+.5)*innerWidth}px`,s.style.top=`${(-i.y*.5+.5)*innerHeight}px`,this.ui.bulles.append(s),setTimeout(()=>s.remove(),1200)}ecouter(){this.surMouvement=e=>{let t=this.caseSous(e);Tt(t??{})!==Tt(this.survol??{})&&(this.survol=t,this.colorer())},this.surAppui=e=>{e.button>0||(this.appui={x:e.clientX,y:e.clientY,id:e.pointerId,glisse:!1})},this.surGlisse=e=>{let t=this.appui;if(!t||e.pointerId!==t.id)return;let n=e.clientX-t.x,i=e.clientY-t.y;!t.glisse&&Math.hypot(n,i)<8||(t.glisse=!0,this.orbite.yaw-=n*.008,this.orbite.pitch=An.clamp(this.orbite.pitch+i*.005,.45,1.4),t.x=e.clientX,t.y=e.clientY,this.cadrerCamera())},this.surLacher=e=>{let t=this.appui;!t||e.pointerId!==t.id||(this.appui=null,t.glisse||this.cliquer(this.caseSous(e)))},this.surMolette=e=>{this.orbite.dist=An.clamp(this.orbite.dist+e.deltaY*.02,9,30),this.cadrerCamera()},this.surTouche=e=>{let t=Ru.find(n=>n.touche===e.key);t&&this.choisirSort(t),e.key==="Enter"&&this.finTourJoueur(),e.key==="Escape"&&(this.sort=null,this.majUI()),(e.key==="ArrowLeft"||e.key==="ArrowRight")&&(this.orbite.yaw+=e.key==="ArrowLeft"?.4:-.4,this.cadrerCamera())},this.canvas.addEventListener("pointermove",this.surMouvement),this.canvas.addEventListener("pointerdown",this.surAppui),addEventListener("pointermove",this.surGlisse),addEventListener("pointerup",this.surLacher),this.canvas.addEventListener("wheel",this.surMolette,{passive:!0}),addEventListener("keydown",this.surTouche)}caseSous(e){let t=this.canvas.getBoundingClientRect();return this.souris.set((e.clientX-t.left)/t.width*2-1,-((e.clientY-t.top)/t.height)*2+1),this.raycaster.setFromCamera(this.souris,this.camera),this.raycaster.intersectObjects(this.cases)[0]?.object.userData.c??null}choisirSort(e){if(!(this.etat!=="joueur"||e.pa>this.j.pa)&&!(e.parTour&&this.utilises[e.id]>=e.parTour)){if(e.portee[1]===0){this.lancer(this.j,e,this.j);return}this.sort=this.sort===e?null:e,this.majUI()}}async cliquer(e){if(this.etat!=="joueur"||!e)return;if(this.sort){let n=Yu(e,this.j.c);if(n<this.sort.portee[0]||n>this.sort.portee[1])return;if(!this.atteint(this.sort,this.j.c,e)){this.log("\u{1FAA8} Une pierre bloque la ligne de vue.");return}let i=Tt(e)===Tt(this.b.c)?this.b:null,s=this.sort;this.sort=null,await this.lancer(this.j,s,i,e);return}let t=this.chemin(e);t?.length&&(this.etat="anim",this.majUI(),await this.deplacer(this.j,t),this.etat="joueur",this.majUI())}async deplacer(e,t){for(let n of t){this.orienter(e,n);let i=e.mesh.position.clone(),s=this.monde(n,.08);await this.tween(220,a=>{e.mesh.position.lerpVectors(i,s,a),e.vitesse=5}),e.c=n,e.pm--}e.vitesse=0}async lancer(e,t,n,i=n?.c){let s=this.etat;this.etat="anim",e.pa-=t.pa,t.parTour&&(this.utilises[t.id]=(this.utilises[t.id]??0)+1),this.majUI();let a=e===this.j?"Tu":this.def.nom;if(t.soin){let o=Math.min(tm(t.soin),e.max-e.pv);e.pv+=o,this.bulle(e,`+${o}`,"soin"),this.log(`\u{1F375} ${a} ${e===this.j?"bois":"boit"} un ${t.nom} : +${o} PV.`)}else if(this.orienter(e,i),t.portee[1]<=1?await this.fente(e):await this.projectile(e,i,e===this.j?oe.creme:oe.corail),n){let o=tm(t.degats);n.pv-=o,this.bulle(n,`-${o}`,"degat"),await this.tween(160,l=>{n.mesh.position.y=.08+Math.sin(l*Math.PI)*.25}),this.log(`${e===this.j?"\u{1F5E1}\uFE0F":"\u{1F4A5}"} ${a} ${e===this.j?"lances":"lance"} ${t.nom} : ${o} d\xE9g\xE2ts.`)}else this.log(`${a} ${e===this.j?"lances":"lance"} ${t.nom}\u2026 dans le vide.`);this.verifierFin()||(this.etat=s,this.majUI())}async fente(e){let t=e.mesh.position.clone(),n=new E(Math.sin(e.mesh.rotation.y),0,Math.cos(e.mesh.rotation.y)).multiplyScalar(.5);await this.tween(260,i=>e.mesh.position.copy(t).addScaledVector(n,Math.sin(i*Math.PI)))}async projectile(e,t,n){let i=new ce(new da(.18),new He({color:n}));this.groupe.add(i);let s=e.mesh.position.clone().setY(1.1),a=this.monde(t,1);await this.tween(320,o=>{i.position.lerpVectors(s,a,o),i.rotation.y+=.4,i.rotation.x+=.3}),this.groupe.remove(i),i.geometry.dispose()}tween(e,t){return new Promise(n=>this.anims.push({t:0,ms:e,f:t,fin:n}))}verifierFin(){if(this.b.pv>0&&this.j.pv>0)return!1;this.etat="fin";let e=this.b.pv<=0;return this.majUI(),this.log(e?`\u{1F3C6} ${this.def.nom} est vaincu\xB7e !`:"\u{1F4AB} Tu es K.O.\u2026"),e&&(this.boss.rotation.z=Math.PI/2),setTimeout(()=>this.terminer(e),1400),!0}terminer(e){this.canvas.removeEventListener("pointermove",this.surMouvement),this.canvas.removeEventListener("pointerdown",this.surAppui),removeEventListener("pointermove",this.surGlisse),removeEventListener("pointerup",this.surLacher),this.canvas.removeEventListener("wheel",this.surMolette),removeEventListener("keydown",this.surTouche),this.ui.racine.hidden=!0,this.ui.journal.innerHTML="",this.scene.remove(this.groupe),this.groupe.traverse(t=>{t.geometry?.dispose(),t.material?.dispose?.()}),this.onFin(e)}debutTourJoueur(){Object.assign(this.j,{pa:$f,pm:Qf}),this.utilises={},this.sort=null,this.etat="joueur",this.majUI()}finTourJoueur(){this.etat==="joueur"&&(this.etat="boss",this.sort=null,this.majUI(),this.tourBoss())}async tourBoss(){let e=this.b;e.pa=this.def.pa??6,e.pm=this.def.pm??3,await Zu(500);let t=this.def.sorts??[],n=()=>t.filter(i=>i.pa<=e.pa&&this.atteint(i,e.c,this.j.c)).sort((i,s)=>s.degats[1]-i.degats[1])[0];for(let i=0;i<4&&this.etat==="boss";i++){let s=n();if(s){await this.lancer(e,s,this.j),await Zu(250);continue}if(e.pm<=0)break;let a=this.parcours(e.c,30,!0),o=null;for(let c of a.values()){let h=Yu(c.c,this.j.c),d=t.some(p=>p.pa<=e.pa&&this.atteint(p,c.c,this.j.c))?c.d:100+h;(!o||d<o.score)&&(o={c:c.c,score:d})}let l=o?this.remonter(a,o.c).slice(0,e.pm):[];if(!l.length)break;await this.deplacer(e,l),this.orienter(e,this.j.c)}this.etat!=="fin"&&(await Zu(300),this.debutTourJoueur())}cadrerCamera(){if(!this.orbite){let n=this.camera.aspect<1;this.orbite=n?{yaw:0,pitch:.97,dist:23,decale:2.6}:{yaw:0,pitch:.84,dist:14.2,decale:.6}}let e=this.orbite,t=Rt.centre.clone().add(new E(Math.sin(e.yaw)*e.decale,0,Math.cos(e.yaw)*e.decale));this.camera.position.copy(t).add(new E(Math.sin(e.yaw)*Math.cos(e.pitch)*e.dist,Math.sin(e.pitch)*e.dist,Math.cos(e.yaw)*Math.cos(e.pitch)*e.dist)),this.camera.lookAt(t)}update(e){for(let t of[...this.anims]){t.t+=e*1e3;let n=Math.min(t.t/t.ms,1);t.f(n),n>=1&&(this.anims.splice(this.anims.indexOf(t),1),t.fin())}for(let t of[this.j,this.b])ws(t.mesh,e,t.vitesse),this.anims.length||(t.vitesse=0)}}});function yl(r,e){br("minijeu").hidden=!1,br("minijeu-titre").textContent=r,br("minijeu-sous-titre").textContent=e;let t=br("minijeu-contenu");return t.innerHTML="",t}function Pa(){br("minijeu").hidden=!0,br("minijeu-contenu").innerHTML=""}function rm(r){return new Promise(e=>{let t=yl("La biblioth\xE8que","Choisis une vid\xE9o et regarde-la jusqu\u2019au bout."),n=document.createElement("div");n.className="mj-videos";for(let s of r){let a=document.createElement("button");a.className="mj-video",a.innerHTML=`<span class="mj-video-icone">${s.icone}</span><span>${s.titre}</span><small>${s.duree} s</small>`,a.onclick=()=>i(s),n.append(a)}t.append(n);function i(s){t.innerHTML="";let a=document.createElement("div");a.className="mj-ecran";let o=document.createElement("div");o.className="mj-progression";let l=document.createElement("div");o.append(l);let c=s.duree,h=0,u=null;s.src?(u=Object.assign(document.createElement("video"),{src:s.src,autoplay:!0,playsInline:!0}),u.onloadedmetadata=()=>{c=u.duration},a.append(u)):a.innerHTML=`<div class="mj-lecture"><span>${s.icone}</span><strong>${s.titre}</strong><em>Lecture\u2026</em></div>`,t.append(a,o);let d=performance.now(),p=()=>{if(!br("minijeu").hidden){if(h=u?u.currentTime:(performance.now()-d)/1e3,l.style.width=`${Math.min(100,h/c*100)}%`,h>=c-.05||u?.ended){let f=Vi("J\u2019ai tout vu !");f.onclick=()=>{Pa(),e(!0)},t.append(f);return}requestAnimationFrame(p)}};requestAnimationFrame(p)}})}function im(r,e){let i=r.createLinearGradient(0,0,0,290);i.addColorStop(0,"#9bb3d6"),i.addColorStop(1,"#f5cacc"),r.fillStyle=i,r.fillRect(0,0,380,290),r.fillStyle=e?"#f6c66a":oe.corail,r.beginPath(),r.arc(80,60,24,0,Math.PI*2),r.fill(),r.fillStyle="#fbf8f2";let s=(a,o)=>{for(let[l,c]of[[-18,12],[0,16],[18,12]])r.beginPath(),r.arc(a+l,o,c,0,Math.PI*2),r.fill()};s(200,50),e||s(300,70),r.fillStyle="#4f7295",r.beginPath(),r.moveTo(40,230),r.lineTo(160,120),r.lineTo(280,230),r.fill(),e||(r.fillStyle="#fbf8f2",r.beginPath(),r.moveTo(135,143),r.lineTo(160,120),r.lineTo(185,143),r.lineTo(172,152),r.lineTo(160,142),r.lineTo(148,152),r.fill()),r.fillStyle="#7fb3e6",r.fillRect(0,232,380,58),r.strokeStyle="rgba(255,255,255,0.6)",r.lineWidth=2;for(let a=10;a<380;a+=40)r.beginPath(),r.arc(a,250,10,Math.PI,0),r.stroke();r.fillStyle=oe.corail,r.fillRect(222,185,8,50),r.fillRect(262,185,8,50),r.fillRect(214,196,64,6),e||(r.fillStyle=oe.marine,r.fillRect(208,182,76,7)),r.fillStyle="#6b4a33",r.fillRect(56,205,8,30),r.fillStyle=e?"#e8672c":"#7aaa45",r.beginPath(),r.arc(60,200,22,0,Math.PI*2),r.fill(),e||(r.fillStyle="#a7a49b",r.fillRect(326,215,8,20),r.fillRect(318,210,24,6),r.fillStyle="#fff1c9",r.fillRect(321,200,18,10),r.fillStyle="#a7a49b",r.beginPath(),r.moveTo(314,200),r.lineTo(330,190),r.lineTo(346,200),r.fill()),e||(r.fillStyle=oe.corail,r.beginPath(),r.ellipse(205,262,14,6,0,0,Math.PI*2),r.fill(),r.beginPath(),r.moveTo(219,262),r.lineTo(229,255),r.lineTo(229,269),r.fill())}function sm(){return new Promise(r=>{let e=yl("Les 7 diff\xE9rences","Clique sur les diff\xE9rences, sur l\u2019une ou l\u2019autre image."),t=document.createElement("p");t.className="mj-compteur";let n=document.createElement("div");n.className="mj-images";let i=new Set,s=[!1,!0].map(o=>{let l=document.createElement("canvas");return l.width=380,l.height=290,im(l.getContext("2d"),o),n.append(l),l}),a=()=>{t.textContent=`${i.size} / ${xl.length} diff\xE9rences trouv\xE9es`;for(let o of s){let l=o.getContext("2d");im(l,o===s[1]),l.strokeStyle="#2fbf5a",l.lineWidth=4;for(let c of i){let h=xl[c];l.beginPath(),l.arc(h.x,h.y,h.r,0,Math.PI*2),l.stroke()}}if(i.size===xl.length){let o=Vi("Bravo, toutes trouv\xE9es !");o.onclick=()=>{Pa(),r(!0)},e.append(o)}};for(let o of s)o.onclick=l=>{let c=o.getBoundingClientRect(),h=(l.clientX-c.left)/c.width*o.width,u=(l.clientY-c.top)/c.height*o.height;xl.forEach((d,p)=>{Math.hypot(h-d.x,u-d.y)<d.r+6&&i.add(p)}),a()};e.append(t,n),a()})}function am(r){return new Promise(e=>{let t=yl("Le projet marketing","Clique sur les \xE9tapes dans le bon ordre, de la premi\xE8re \xE0 la derni\xE8re."),n=[...r].sort(()=>Math.random()-.5),i=[],s=document.createElement("ol");s.className="mj-ordre";let a=document.createElement("div");a.className="mj-reserve";let o=document.createElement("p");o.className="mj-compteur";let l=document.createElement("div");l.className="mj-actions";let c=Vi("V\xE9rifier"),h=Vi("Recommencer","bouton secondaire");l.append(h,c);let u=()=>{s.innerHTML="",i.forEach((d,p)=>{let f=document.createElement("li");f.textContent=d,f.title="Retirer cette \xE9tape",f.onclick=()=>{i.splice(p,1),u()},s.append(f)}),a.innerHTML="";for(let d of n.filter(p=>!i.includes(p))){let p=Vi(d,"mj-etape");p.onclick=()=>{i.push(d),u()},a.append(p)}c.disabled=i.length!==r.length};c.onclick=()=>{let d=i.filter((p,f)=>p===r[f]).length;if(d===r.length){o.textContent="Parfait : ton projet est bien construit !",l.innerHTML="";let p=Vi("Continuer");p.onclick=()=>{Pa(),e(!0)},l.append(p)}else o.textContent=`${d} \xE9tape${d>1?"s":""} sur ${r.length} \xE0 la bonne place. Retire les autres et r\xE9essaie.`},h.onclick=()=>{i.length=0,o.textContent="",u()},t.append(s,a,o,l),u()})}function om(r){return new Promise(e=>{let t=yl("Le stand Ga\xEFa","Va au stand Ga\xEFa des portes ouvertes : la vendeuse te donnera un code."),n=Object.assign(document.createElement("input"),{className:"mj-code",placeholder:"Code du stand",maxLength:16,autocomplete:"off"}),i=document.createElement("p");i.className="mj-compteur";let s=Vi("Valider"),a=Vi("Plus tard","bouton secondaire"),o=document.createElement("div");o.className="mj-actions",o.append(a,s);let l=()=>{n.value.trim().toUpperCase()===r.toUpperCase()?(Pa(),e(!0)):(i.textContent="Ce n\u2019est pas le bon code. Demande-le au stand Ga\xEFa !",n.select())};s.onclick=l,n.onkeydown=c=>{c.stopPropagation(),c.key==="Enter"&&l()},a.onclick=()=>{Pa(),e(!1)},t.append(n,i,o),n.focus()})}var br,Vi,xl,lm=sn(()=>{Gi();br=r=>document.getElementById(r);Vi=(r,e="bouton")=>Object.assign(document.createElement("button"),{className:e,textContent:r});xl=[{x:80,y:60,r:26},{x:300,y:70,r:26},{x:160,y:150,r:24},{x:245,y:205,r:26},{x:60,y:210,r:24},{x:330,y:228,r:22},{x:205,y:262,r:22}]});function E_(r){return{tenue:[{id:"kimono",titre:"Haut \u2013 Kimono",icone:dt.kimono("currentColor"),champ:"kimono",info:"Kimono traditionnel. Sa couleur peut changer \xE0 tout moment dans le Sas.",cartes:[{valeur:null,nom:"Sans kimono",etoiles:1,visuel:dt.aucun},...In.kimono.map((e,t)=>({valeur:e,nom:Ml[e],etoiles:b_[t],visuel:dt.kimono(e)}))]},{id:"geta",titre:"Chaussures \u2013 Geta",icone:dt.geta("currentColor"),champ:"geta",info:"Sandales japonaises en bois \xE0 deux dents. Choisis la couleur de la lani\xE8re.",cartes:[{valeur:null,nom:"Pieds nus",etoiles:1,visuel:dt.aucun},...In.geta.map((e,t)=>({valeur:e,nom:`Lani\xE8re ${Ml[e].toLowerCase()}`,etoiles:2-(t>1),visuel:dt.geta(e)}))]},{id:"accessoire",titre:"Accessoire \u2013 Sac",icone:dt.sac,champ:"accessoire",info:"Sac \xE0 dos ou sacoche pour ranger tes objets de qu\xEAte.",cartes:In.accessoire.map(e=>({valeur:e.id,nom:e.nom,etoiles:e.id==="aucun"?1:2,visuel:dt[e.id]}))},{id:"arme",titre:"Arme \u2013 Katana",icone:dt.katana,champ:"katana",info:"Le katana sert pendant les combats contre les boss de niveau.",cartes:[{valeur:!0,nom:"Katana",etoiles:3,visuel:dt.katana},{valeur:!1,nom:"Sans arme",etoiles:1,visuel:dt.aucun}]}],visage:[{id:"espece",titre:"Silhouette \u2013 Esp\xE8ce",icone:dt[r.espece]??dt.shiba,champ:"espece",info:"Shiba roux au ventre cr\xE8me, ou panda noir et blanc.",cartes:In.espece.map(e=>({valeur:e.id,nom:e.nom,etoiles:3,visuel:dt[e.id]}))},{id:"genre",titre:"Silhouette \u2013 Genre",icone:dt.neutre,champ:"genre",info:"Homme, femme ou neutre : change la silhouette et les coupes propos\xE9es.",cartes:In.genre.map(e=>({valeur:e.id,nom:e.nom,etoiles:2,visuel:dt[e.id]}))},{id:"coiffure",titre:"Coiffure \u2013 Coupe de cheveux",icone:dt.tete(r.cheveux,"chignon",r.espece),champ:"coiffure",info:"Franges et tresses, chignon et baguettes, chonmage moderne ou coupe courte \xE0 frange.",cartes:(Array.isArray(In.coiffure)?In.coiffure:In.coiffure[r.genre]).map(e=>({valeur:e.id,nom:e.nom,etoiles:3,visuel:dt.tete(r.cheveux,e.id,r.espece)}))},{id:"cheveux",titre:"Coiffure \u2013 Couleur",icone:dt.tete(r.cheveux,"tresses",r.espece),champ:"cheveux",info:"Couleur de la touffe coiff\xE9e.",cartes:In.cheveux.map((e,t)=>({valeur:e,nom:Ml[e],etoiles:t<2?1:t<4?2:3,visuel:dt.tete(e,r.coiffure==="aucune"?"tresses":r.coiffure,r.espece)}))},{id:"yeux",titre:"Visage \u2013 Yeux",icone:dt.oeil("currentColor"),champ:"yeux",info:"Couleur des yeux.",cartes:In.yeux.map((e,t)=>({valeur:e,nom:Ml[e],etoiles:[2,1,2,3,3][t],visuel:dt.oeil(e)}))}],identite:[{id:"prenom",titre:"Identit\xE9 \u2013 Pr\xE9nom",icone:dt.identite,champ:null,info:"Le pr\xE9nom sous lequel les gardiens t\u2019appelleront."}]}}function cm({partie:r,surChangement:e,surEntrer:t,surReprendre:n}){let i=Ts?"visage":"tenue",s=Ts?Ts[0]:"kimono",a=()=>r.apparence;function o(c,h){a()[c]!==h&&(a()[c]=h,e(),l())}function l(){let c=E_(a());if(Ts)for(let f of Object.keys(c))c[f]=c[f].filter(v=>Ts.includes(v.id));for(let f of document.querySelectorAll("#onglets button"))f.dataset.onglet==="visage"&&(f.innerHTML=dt[a().espece]??dt.visage),f.classList.toggle("actif",f.dataset.onglet===i),f.hidden=!c[f.dataset.onglet].length;Jt("badge-identite").hidden=!!r.prenom;let h=c[i];h.some(f=>f.id===s)||(s=h[0].id);let u=Jt("categories");u.innerHTML="";for(let f of h){let v=document.createElement("button");v.className=`categorie${f.id===s?" actif":""}`,v.title=f.titre,v.innerHTML=f.icone,v.onclick=()=>{s=f.id,Jt("info-texte").hidden=!0,l()},u.append(v)}let d=h.find(f=>f.id===s);Jt("cat-titre").textContent=d.titre,Jt("info-texte").textContent=d.info;let p=Jt("cartes");if(p.innerHTML="",Jt("champ-prenom").hidden=d.id!=="prenom",d.cartes){for(let f of d.cartes){let v=document.createElement("button"),m=a()[d.champ]===f.valeur;v.className=`carte-objet etoiles-${f.etoiles}${m?" choisie":""}`,v.title=f.nom,v.innerHTML=`${f.visuel}<span class="nom">${f.nom}</span><span class="etoiles">${"\u2605".repeat(f.etoiles)}</span>`,v.onclick=()=>o(d.champ,f.valeur),p.append(v)}if(d.id==="kimono"){let f=!!a().kimono&&!In.kimono.includes(a().kimono),v=document.createElement("label");v.className=`carte-objet etoiles-3 carte-libre${f?" choisie":""}`,v.title="Couleur libre";let m=a().kimono??oe.corail;v.innerHTML=`${dt.kimono(m)}<span class="nom">Couleur libre</span><span class="etoiles">\u{1F3A8}</span>`;let g=document.createElement("input");g.type="color",g.value=m.length===7?m.toLowerCase():"#ff696a",g.oninput=_=>o("kimono",_.target.value),v.append(g),p.append(v)}}}for(let c of document.querySelectorAll("#onglets button"))c.innerHTML=dt[c.dataset.onglet],c.onclick=()=>{i=c.dataset.onglet,Jt("info-texte").hidden=!0,l()};return Jt("info").onclick=()=>{Jt("info-texte").hidden=!Jt("info-texte").hidden},Jt("prenom").value=r.prenom,Jt("prenom").oninput=c=>{r.prenom=c.target.value.trim(),Jt("badge-identite").hidden=!!r.prenom},Jt("commencer").onclick=t,Jt("reprendre").onclick=n,l(),{rendre:l}}var Jt,Ml,$t,dt,b_,hm=sn(()=>{vl();Gi();Jt=r=>document.getElementById(r),Ml={[oe.corail]:"Corail",[oe.rose]:"Rose sakura",[oe.bleu]:"Bleu ciel",[oe.marine]:"Marine",[oe.creme]:"Cr\xE8me","#3f8f7a":"Jade","#3b6fd1":"Saphir","#6b4a33":"Noisette","#c0506a":"Grenat","#7a5bc4":"Am\xE9thyste","#2a2a2e":"Encre","#5a3a2a":"Ch\xE2tain","#a8643a":"Roux","#e8d2a6":"Blond","#f8a0ab":"Rose"},$t=(r,e="0 0 64 64")=>`<svg viewBox="${e}" aria-hidden="true">${r}</svg>`,dt={tenue:$t('<path d="M24 10h16l3 6-11 6-11-6z" fill="currentColor"/><path d="M21 16l11 6 11-6 3 2-4 8v28H22V26l-4-8z" fill="currentColor"/>'),visage:$t('<circle cx="32" cy="32" r="19" fill="none" stroke="currentColor" stroke-width="4"/><path d="M23 31q3 3 6 0M35 31q3 3 6 0M27 41q5 4 10 0" stroke="currentColor" stroke-width="3" fill="none" stroke-linecap="round"/>'),identite:$t('<circle cx="30" cy="20" r="9" fill="currentColor"/><path d="M14 52q2-18 16-18t16 18z" fill="currentColor"/><path d="M50 8l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" fill="currentColor"/>'),kimono:r=>$t(`<path d="M20 8h24l14 14-8 8-6-6v34H20V24l-6 6-8-8z" fill="${r}" stroke="#243447" stroke-width="2"/><path d="M26 8l6 16 6-16" fill="none" stroke="${r===oe.creme?oe.marine:oe.creme}" stroke-width="3"/><rect x="20" y="34" width="24" height="6" fill="${r===oe.marine?oe.corail:oe.marine}"/>`),geta:r=>$t(`<rect x="12" y="30" width="40" height="8" rx="3" fill="#7a5236"/><rect x="16" y="38" width="6" height="10" fill="#5c3c26"/><rect x="42" y="38" width="6" height="10" fill="#5c3c26"/><path d="M22 30q10-16 20 0" fill="none" stroke="${r}" stroke-width="4"/>`),sac:$t(`<rect x="16" y="14" width="32" height="40" rx="8" fill="${oe.marine}"/><rect x="20" y="32" width="24" height="12" rx="3" fill="${oe.corail}"/><path d="M24 14q8-10 16 0" stroke="${oe.marine}" stroke-width="4" fill="none"/>`),sacoche:$t(`<path d="M10 6l38 30" stroke="${oe.marine}" stroke-width="4"/><rect x="30" y="32" width="26" height="20" rx="4" fill="${oe.marine}"/><rect x="30" y="32" width="26" height="8" rx="3" fill="${oe.corail}"/>`),aucun:$t('<circle cx="32" cy="32" r="18" fill="none" stroke="#9bb3d6" stroke-width="4"/><path d="M19 45l26-26" stroke="#9bb3d6" stroke-width="4"/>'),katana:$t(`<path d="M10 54L46 18" stroke="#1d1f24" stroke-width="5" stroke-linecap="round"/><path d="M42 14l8 8" stroke="#c9a24a" stroke-width="4"/><path d="M48 16l8-8" stroke="${oe.corail}" stroke-width="5" stroke-linecap="round"/>`),homme:$t('<circle cx="32" cy="18" r="9" fill="currentColor"/><path d="M18 56V38q0-10 14-10t14 10v18z" fill="currentColor"/>'),femme:$t('<circle cx="32" cy="18" r="9" fill="currentColor"/><path d="M32 28q-12 0-12 10l-4 18h32l-4-18q0-10-12-10z" fill="currentColor"/>'),neutre:$t('<circle cx="32" cy="18" r="9" fill="currentColor"/><path d="M19 56l2-18q1-10 11-10t11 10l2 18z" fill="currentColor"/>'),tete:(r,e,t="shiba")=>{let n=t==="panda"?'<circle cx="15" cy="20" r="7" fill="#1f1f24"/><circle cx="49" cy="20" r="7" fill="#1f1f24"/><ellipse cx="32" cy="38" rx="20" ry="17" fill="#fbfaf6"/><ellipse cx="24.5" cy="38" rx="4.5" ry="6" transform="rotate(25 24.5 38)" fill="#1f1f24"/><ellipse cx="39.5" cy="38" rx="4.5" ry="6" transform="rotate(-25 39.5 38)" fill="#1f1f24"/><circle cx="25" cy="37" r="1.4" fill="#fff"/><circle cx="39" cy="37" r="1.4" fill="#fff"/><ellipse cx="32" cy="44" rx="2.6" ry="1.8" fill="#1f1f24"/>':'<path d="M14 26l6-16 10 10M50 26l-6-16-10 10" fill="#eba04e"/><ellipse cx="32" cy="38" rx="20" ry="17" fill="#eba04e"/><ellipse cx="32" cy="45" rx="12" ry="8" fill="#fbf1e2"/><circle cx="25" cy="37" r="2.4" fill="#3a2a26"/><circle cx="39" cy="37" r="2.4" fill="#3a2a26"/><ellipse cx="32" cy="43" rx="2.6" ry="1.8" fill="#3a2a26"/>',i={chonmage:`<path d="M12 40l2-14q4-12 18-12t18 12l2 14-5-6-1 8-4-9-3 7-3-9-3 7-3-9-4 9-1-8z" fill="${r}"/><path d="M40 16l12-6-4 8z" fill="${r}"/><path d="M26 14l2-8 3 7 3-8 2 9z" fill="${r}"/>`,chignon:`<path d="M13 32q2-18 19-18t19 18q-6-8-19-8t-19 8z" fill="${r}"/><circle cx="32" cy="58" r="7" fill="${r}"/><path d="M20 50l24 14M44 50L20 64" stroke="#c9a46a" stroke-width="2.4"/><circle cx="21" cy="51" r="2" fill="${oe.corail}"/><circle cx="43" cy="51" r="2" fill="${oe.corail}"/>`,frange:`<path d="M13 32q0-20 19-21t19 21q-2-5-5-8l-2 9-3-10-3 11-3-11-3 11-3-11-2 10-3-9q-3 3-5 8z" fill="${r}"/><path d="M26 10l3-5 3 5 3-5 2 6z" fill="${r}"/>`,tresses:`<path d="M13 34q2-20 19-20t19 20h-4q0-8-15-8t-15 8z" fill="${r}"/><path d="M18 30h28v5H18z" fill="${r}"/><circle cx="10" cy="42" r="4" fill="${r}"/><circle cx="11" cy="50" r="3.6" fill="${r}"/><circle cx="12" cy="57" r="3" fill="${r}"/><circle cx="54" cy="42" r="4" fill="${r}"/><circle cx="53" cy="50" r="3.6" fill="${r}"/><circle cx="52" cy="57" r="3" fill="${r}"/><circle cx="48" cy="20" r="4" fill="#fbf8f2"/>`}[e]??"";return $t(n+i)},shiba:$t('<path d="M14 8l12 14M50 8L38 22" stroke="#e48a3c" stroke-width="10" stroke-linecap="round"/><circle cx="32" cy="34" r="22" fill="#e48a3c"/><path d="M14 40q18 22 36 0q-6 14-18 14t-18-14z" fill="#f7ead8"/><ellipse cx="32" cy="44" rx="10" ry="8" fill="#f7ead8"/><circle cx="24" cy="32" r="4" fill="#2b2224"/><circle cx="40" cy="32" r="4" fill="#2b2224"/><ellipse cx="32" cy="40" rx="4" ry="2.6" fill="#2b2224"/><circle cx="23" cy="31" r="1.4" fill="#fff"/><circle cx="39" cy="31" r="1.4" fill="#fff"/>'),panda:$t('<circle cx="15" cy="14" r="8" fill="#2a2a30"/><circle cx="49" cy="14" r="8" fill="#2a2a30"/><circle cx="32" cy="34" r="22" fill="#f6f5f0"/><ellipse cx="23" cy="33" rx="6" ry="8" transform="rotate(25 23 33)" fill="#2a2a30"/><ellipse cx="41" cy="33" rx="6" ry="8" transform="rotate(-25 41 33)" fill="#2a2a30"/><circle cx="24" cy="32" r="3" fill="#fff"/><circle cx="40" cy="32" r="3" fill="#fff"/><circle cx="24" cy="32" r="2" fill="#1f1f24"/><circle cx="40" cy="32" r="2" fill="#1f1f24"/><ellipse cx="32" cy="42" rx="4" ry="2.6" fill="#1f1f24"/>'),oeil:r=>$t(`<path d="M8 34q24-26 48 0q-24 22-48 0z" fill="#fff" stroke="#2b2333" stroke-width="3"/><ellipse cx="32" cy="33" rx="10" ry="12" fill="${r}"/><ellipse cx="32" cy="32" rx="4" ry="6" fill="#1d1830"/><circle cx="28" cy="28" r="3" fill="#fff"/><path d="M6 30q26-30 52 0" fill="none" stroke="#2b2333" stroke-width="5" stroke-linecap="round"/>`)},b_=[3,2,2,3,1,3]});function um({surSauter:r,surAction:e}){if(!La)return;document.body.classList.add("tactile");let t=document.createElement("div");t.id="joystick",t.innerHTML='<div id="joystick-bouton"></div>';let n=Object.assign(document.createElement("button"),{id:"bouton-sauter",textContent:"\u2912",title:"Sauter"}),i=Object.assign(document.createElement("button"),{id:"bouton-action",textContent:"Parler",title:"Interagir"});document.getElementById("hud").append(t,n,i);let s=t.firstElementChild,a=48,o=null,l=null,c=u=>{let d=u.clientX-l.x,p=u.clientY-l.y,f=Math.min(1,Math.hypot(d,p)/a),v=Math.atan2(p,d);cn.x=Math.cos(v)*f,cn.y=-Math.sin(v)*f,s.style.transform=`translate(${cn.x*a}px, ${-cn.y*a}px)`};t.addEventListener("pointerdown",u=>{o=u.pointerId;let d=t.getBoundingClientRect();l={x:d.left+d.width/2,y:d.top+d.height/2};try{t.setPointerCapture(u.pointerId)}catch{}cn.actif=!0,c(u),u.stopPropagation()}),t.addEventListener("pointermove",u=>{u.pointerId===o&&c(u)});let h=u=>{u.pointerId===o&&(o=null,cn.x=cn.y=0,cn.actif=!1,s.style.transform="")};t.addEventListener("pointerup",h),t.addEventListener("pointercancel",h);for(let[u,d]of[[n,r],[i,e]])u.addEventListener("pointerdown",p=>{p.stopPropagation(),p.preventDefault(),d()})}function dm(r){let e=document.getElementById("bouton-action");e&&(e.hidden=!r,r&&(e.textContent=r))}var La,cn,pm=sn(()=>{La=matchMedia("(pointer: coarse)").matches||"ontouchstart"in window,cn={x:0,y:0,actif:!1}});var O_=Pm(()=>{Zn();Rf();Gi();Cf();Uu();vl();nm();lm();hm();pm();var Oe=r=>document.getElementById(r),S_="../objets-quete/",gm="mediaventure";function vm(){try{return JSON.parse(localStorage.getItem(gm))}catch{return null}}function Sl(){try{localStorage.setItem(gm,JSON.stringify(gt))}catch{}}var gt=vm()??{prenom:"",apparence:{...Aa},objets:[],niveau:"sas"};gt.apparence={...Aa,...gt.apparence};var Cs=Oe("scene"),Yi=new No({canvas:Cs,antialias:!0});Yi.setPixelRatio(Math.min(devicePixelRatio,La?1.5:2));Yi.shadowMap.enabled=!0;Yi.shadowMap.type=Kp;Yi.toneMapping=Jp;Yi.toneMappingExposure=1.05;var vn=new Ut(55,1,.1,800);Zh.setURLModifier(r=>window.RESSOURCES?.[r]??r);var T_=new Bi,w_=new cl,Qu=new tl;function _m(){Yi.setSize(innerWidth,innerHeight),vn.aspect=innerWidth/innerHeight,vn.updateProjectionMatrix()}addEventListener("resize",_m);_m();var ze="creation",A_={quiz:"Gardien\xB7ne du R\xE9seau",video:"Projectionniste","7-differences":"Esprit des couleurs","etapes-projet":"Strat\xE8ge de Nara","stand-gaia":"Gardien\xB7ne du stand","combat-final":"Esprit du ch\xE2teau"},Sr=()=>A_[Ce.miniJeu]??"Esprit du biome",vi=new ls,$n=new ls;$n.background=new he("#1b2763");var xm=[];{let r=document.createElement("canvas");r.width=1024,r.height=768;let e=r.getContext("2d"),t=e.createLinearGradient(0,0,0,768);t.addColorStop(0,"#141d55"),t.addColorStop(.45,"#26399a"),t.addColorStop(.62,"#4a6fd6"),t.addColorStop(.7,"#3352b8"),t.addColorStop(1,"#1d2c7a"),e.fillStyle=t,e.fillRect(0,0,1024,768);for(let f=0;f<12;f++){let v=60+f*85,m=520-f*32,g=e.createRadialGradient(v,m,0,v,m,150);g.addColorStop(0,"rgba(170,195,255,0.28)"),g.addColorStop(1,"rgba(170,195,255,0)"),e.fillStyle=g,e.fillRect(0,0,1024,768)}for(let f=0;f<900;f++){e.fillStyle=`rgba(255,250,230,${Math.random()*.85})`;let v=Math.random()<.1?2.5:1.4;e.fillRect(Math.random()*1024,Math.random()*768,v,v)}let n=new fn(r);n.colorSpace=st;let i=new ce(new En(64,48),new He({map:n}));i.position.set(0,4,-16),i.rotation.x=-.12,$n.add(i);let s=document.createElement("canvas");s.width=s.height=256;let a=s.getContext("2d"),o=a.createRadialGradient(128,128,0,128,128,128);o.addColorStop(0,"rgba(140,200,255,0.75)"),o.addColorStop(.35,"rgba(90,150,255,0.35)"),o.addColorStop(1,"rgba(60,100,220,0)"),a.fillStyle=o,a.fillRect(0,0,256,256);let l=new fn(s),c=new ce(new Tn(3.2,64),new He({map:l,transparent:!0,depthWrite:!1}));c.rotation.x=-Math.PI/2,$n.add(c);for(let[f,v]of[[.75,.6],[1.1,.3],[1.5,.15]]){let m=new ce(new pa(f-.04,f,64),new He({color:"#bfe0ff",transparent:!0,opacity:v,side:wn,depthWrite:!1}));m.rotation.x=-Math.PI/2,m.position.y=.01,$n.add(m)}let h=new fs;for(let f=0;f<10;f++){let v=f%2?.04:.1,m=f/10*Math.PI*2+Math.PI/2;f?h.lineTo(Math.cos(m)*v,Math.sin(m)*v):h.moveTo(Math.cos(m)*v,Math.sin(m)*v)}let u=new fa(h),d=new He({color:"#ffd77a",side:wn});for(let f=0;f<14;f++){let v=new ce(u,d);v.position.set(-4+Math.random()*8,.3+Math.random()*3,-3+Math.random()*3),v.scale.setScalar(.6+Math.random()),v.userData={y:v.position.y,phase:Math.random()*6},$n.add(v),xm.push(v)}$n.add(new gs("#dfe8ff","#243447",1.1));let p=new Fi("#fff4ea",1.9);p.position.set(1.5,4,6),$n.add(p)}var Xi=null,Ua=-.35,fm=!1,ym=!0,ed=!1,El=0,Tl=0;Cs.addEventListener("wheel",r=>{ze==="creation"&&(Tl=An.clamp(Tl-r.deltaY*.0015,0,1))},{passive:!0});function ad(){Xi&&$n.remove(Xi),Xi=Ia(gt.apparence),Xi.rotation.y=Ua,$n.add(Xi)}{let r=null;Cs.addEventListener("pointerdown",e=>{ze==="creation"&&(r=e.clientX,ed=!0)}),addEventListener("pointerup",()=>{r=null,ed=!1}),addEventListener("pointermove",e=>{ze!=="creation"||r===null||(Ua+=(e.clientX-r)*.01,r=e.clientX)})}var Ku=vm();Ku&&Ku.niveau!=="sas"&&(Oe("reprendre").hidden=!1,Oe("reprendre").textContent=`Reprendre : ${ki[Ku.niveau].titre}`);cm({partie:gt,surChangement:()=>{ad(),Sl()},surEntrer:()=>{gt.prenom||(gt.prenom="Voyageur\xB7se"),gt.niveau="sas",gt.objets=[],Sl(),td(),Is("sas")},surReprendre:()=>{td(),Is(gt.niveau)}});function td(){Oe("creation").hidden=!0,vn.clearViewOffset()}var Ce=null,_n=null,Je=null,Vn=null,Ft=null,qi=null,Da=[],wl=null,Er={miniJeuReussi:!1,bossVaincu:!1};function mm(r,e=oe.marine){let t=document.createElement("canvas"),n=t.getContext("2d");n.font='bold 44px "Zen Maru Gothic", sans-serif',t.width=Math.ceil(n.measureText(r).width)+48,t.height=72,n.font='bold 44px "Zen Maru Gothic", sans-serif',n.fillStyle="rgba(241,230,208,0.92)",n.beginPath(),n.roundRect(0,0,t.width,t.height,36),n.fill(),n.fillStyle=e,n.textAlign="center",n.textBaseline="middle",n.fillText(r,t.width/2,t.height/2+2);let i=new fn(t);i.colorSpace=st;let s=new Oo(new ra({map:i,depthTest:!1}));return s.scale.set(t.width/160,t.height/160,1),s.position.y=1.4,s.renderOrder=10,s}function R_(r){return{pa:6,pm:3,apparence:{genre:"neutre",coiffure:"courte",cheveux:"#2a2a2e",kimono:ki[gt.niveau].accent},sorts:[{nom:"Coup de ma\xEEtre",pa:3,portee:[1,1],degats:[8,12]},{nom:"Onde",pa:4,portee:[2,5],degats:[6,10]}],...r}}async function Is(r){ze="transition",await rd(!0),_n?.detruire(),vi=new ls,gt.niveau=r,Sl(),Ce=ki[r],Ce.id=r,Ce.boss=R_(Ce.boss),Object.assign(Er,{miniJeuReussi:!1,bossVaincu:!1}),_n=Lf(vi,Ce,T_),Je=Ia(gt.apparence),Je.position.copy(Ma.depart),Je.rotation.y=Math.PI,Je.userData.vy=0,vi.add(Je),wt.yaw=0,wt.pitch=.38,wt.dist=8,sd=!0,Ft=Ia(Ce.boss.apparence),Ft.scale.setScalar(1.12),Ft.add(mm(Ce.boss.nom,oe.corail)),vi.add(Ft),qi=null,Da=[],Ce.miniJeu==="demo"?(Vn=Ft,Ft.position.copy(Ma.pnj)):(Vn=Ia({genre:"neutre",coiffure:"courte",kimono:oe.bleu,cheveux:"#e8d2a6",accessoire:"sacoche",katana:!1}),Vn.add(mm(Sr())),Vn.position.copy(Ma.pnj),vi.add(Vn),Ft.position.copy(Rt.centre).add(new E(0,0,-2))),Vn.rotation.y=0,Ft.rotation.y=0,_n.colliders.push({objet:Vn,r:.6}),Vn!==Ft&&_n.colliders.push({objet:Ft,r:.6}),Da.push({objet:Vn,rayon:2.6,actif:()=>!Er.miniJeuReussi,texte:()=>`Parler \xE0 ${Vn===Ft?Ce.boss.nom:Sr()}`,action:C_}),Da.push({objet:Ft,rayon:2.8,actif:()=>Er.miniJeuReussi&&!Er.bossVaincu,texte:()=>`D\xE9fier ${Ce.boss.nom}`,action:()=>Ce.boss.defi?Qt([{nom:Ce.boss.nom,texte:Ce.boss.defi}],nd):nd()}),Oe("hud-titre").textContent=Ce.titre,Oe("hud-lieu").textContent=Ce.lieu,bm(),Oe("hud").hidden=!1,ze="exploration",await rd(!1);let e=[{nom:Ce.titre,texte:`${Ce.lieu}. Va au centre de l\u2019\xEEle : le chemin commence l\xE0.`}];La&&r==="sas"&&e.push({nom:Ce.titre,texte:"Joystick en bas \xE0 gauche pour te d\xE9placer (pousse-le \xE0 fond pour courir), glisse l\u2019\xE9cran pour tourner la cam\xE9ra, \u2912 pour sauter."}),Qt(e)}function C_(){let r=Ce.boss.nom;if(Ce.miniJeu==="demo")Qt([{nom:r,texte:`Bienvenue dans M\xE9diaventure, ${gt.prenom} ! Je suis la gardienne du Sas.`},{nom:r,texte:"Chaque \xEEle suit le m\xEAme parcours : une \xE9preuve au milieu, un boss, un objet de qu\xEAte, puis le portail."},{nom:r,texte:"Les six objets de qu\xEAte sont obligatoires pour affronter le boss final. Garde-les pr\xE9cieusement !"},{nom:r,texte:"Montre-moi ce que tu vaux : rejoins-moi dans l\u2019ar\xE8ne pour un combat d\u2019entra\xEEnement."}],()=>{Na(),Ft.position.copy(Rt.centre).add(new E(0,0,-2))});else if(Ce.miniJeu==="quiz")Qt([{nom:"Gardien\xB7ne du R\xE9seau",texte:`Pour atteindre ${r}, r\xE9ponds \xE0 mon quiz : ${yr.length} questions, ${7} bonnes r\xE9ponses minimum.`}],I_);else if(Ce.miniJeu==="combat-final"){let e=ul.slice(0,-1).filter(t=>!gt.objets.includes(t));e.length?Qt([{nom:Sr(),texte:`Il te manque encore : ${e.map(t=>ys[t].nom).join(", ")}.`}]):Qt([{nom:Sr(),texte:"Tu as r\xE9uni les six objets de qu\xEAte. Le boss final t\u2019attend !"}],Na)}else Ce.miniJeu==="video"?bl("Bienvenue au cin\xE9ma des tournesols ! Choisis une vid\xE9o dans la biblioth\xE8que et regarde-la jusqu\u2019au bout.",()=>rm(Ce.videos),`Belle s\xE9ance ! ${r} t\u2019attend dans l\u2019ar\xE8ne.`,"Reviens quand tu veux finir ta vid\xE9o."):Ce.miniJeu==="7-differences"?bl("Un bon designer a l\u2019\u0153il : trouve les 7 diff\xE9rences entre ces deux paysages.",sm,`Quel regard ! ${r} t\u2019attend dans l\u2019ar\xE8ne.`,"Reviens me voir pour r\xE9essayer."):Ce.miniJeu==="etapes-projet"?bl("Un projet marketing se construit dans l\u2019ordre. Remets ses \xE9tapes dans le bon ordre.",()=>am(Ce.etapes),`Strat\xE9gie valid\xE9e ! ${r} t\u2019attend dans l\u2019ar\xE8ne.`,"Reviens quand ton plan sera pr\xEAt."):Ce.miniJeu==="stand-gaia"&&bl("Passe au stand Ga\xEFa des portes ouvertes : la vendeuse te donnera un code. Entre-le ici pour ouvrir l\u2019ar\xE8ne.",()=>om(Ce.codeGaia),`Le code est bon ! ${r} t\u2019attend dans l\u2019ar\xE8ne.`,"Reviens avec le code du stand Ga\xEFa.")}function bl(r,e,t,n){Qt([{nom:Sr(),texte:r}],async()=>{ze="epreuve",Qn(null);let i=await e();Qn(!1),ze="exploration",i?Qt([{nom:Sr(),texte:t}],Na):Qt([{nom:Sr(),texte:n}])})}function Na(){Er.miniJeuReussi=!0,_n.ouvrirArene()}function I_(){ze="quiz";let r=0,e=0,t=Oe("quiz");t.hidden=!1,Qn(null);let n=()=>{let s=yr[r];Oe("quiz-compteur").textContent=`Question ${r+1} / ${yr.length} \xB7 ${e} bonne${e>1?"s":""} r\xE9ponse${e>1?"s":""}`,Oe("quiz-question").textContent=s.q;let a=Oe("quiz-reponses");a.innerHTML="",s.r.forEach((o,l)=>{let c=document.createElement("button");c.textContent=o,c.onclick=()=>{a.dataset.verrou||(a.dataset.verrou="1",l===s.ok&&e++,c.classList.add(l===s.ok?"juste":"faux"),a.children[s.ok].classList.add("juste"),setTimeout(()=>{delete a.dataset.verrou,++r<yr.length?n():i()},900))},a.append(c)})},i=()=>{t.hidden=!0,Qn(!1),ze="exploration",e>=7?Qt([{nom:"Gardien\xB7ne du R\xE9seau",texte:`${e} / ${yr.length} ! L\u2019ar\xE8ne de ${Ce.boss.nom} est ouverte.`}],Na):Qt([{nom:"Gardien\xB7ne du R\xE9seau",texte:`${e} / ${yr.length}\u2026 Il en faut ${7}. Reviens me parler pour r\xE9essayer.`}])};n()}function nd(){ze="combat",document.body.classList.add("en-combat"),Oe("invite").hidden=!0,Oe("aide").hidden=!0,wl=new _l({scene:vi,camera:vn,canvas:Cs,joueur:Je,boss:Ft,def:Ce.boss,tutoriel:Ce.id==="sas",onFin:r=>{wl=null,document.body.classList.remove("en-combat"),ze="exploration",Oe("aide").hidden=!1,Je.position.copy(Rt.centre).add(new E(0,0,Rt.cases*Rt.taille*.5+1)),Je.rotation.y=Math.PI,wt.yaw=0,r?(Er.bossVaincu=!0,Ft.visible=!1,_n.colliders.splice(_n.colliders.findIndex(e=>e.objet===Ft),1),Ce.id==="final"?P_():L_(),Qt([{nom:Ce.boss.nom,texte:"Bien jou\xE9\u2026 Prends cet objet de qu\xEAte, tu l\u2019as m\xE9rit\xE9."}])):(Ft.rotation.set(0,0,0),Ft.position.copy(Rt.centre).add(new E(0,0,-2)),Qt([{nom:Ce.boss.nom,texte:"Pas encore\u2026 Reprends ton souffle et d\xE9fie-moi \xE0 nouveau !"}]))}})}function Mm(){if(ze!=="exploration")return;ze="carte";let r=Oe("liste-iles");r.innerHTML="";for(let e of ul){let t=ki[e],n=document.createElement("button");n.className=`ile${e===Ce.id?" actuelle":""}`;let i=ys[e],s=i?gt.objets.includes(e)?`${i.icone} obtenu`:"objet \xE0 gagner":"boss final";n.innerHTML=`<strong>${t.titre}</strong><span>${t.lieu}</span><small>${s}</small>`,n.onclick=()=>{Oe("carte-iles").hidden=!0,ze="exploration",e!==Ce.id&&Is(e)},r.append(n)}Oe("carte-iles").hidden=!1}Oe("ouvrir-carte").onclick=Mm;Oe("fermer-carte").onclick=()=>{Oe("carte-iles").hidden=!0,ze="exploration"};function P_(){Oe("obtenu-icone").textContent="\u{1F3C6}",Oe("obtenu-nom").textContent="M\xE9diaventure termin\xE9e !",Oe("obtenu-texte").textContent=Ce.gain,Oe("obtenu").hidden=!1,Qn(null),ze="dialogue",Oe("obtenu-ok").onclick=()=>{Oe("obtenu").hidden=!0,Oe("obtenu-texte").textContent="Il rejoint ton inventaire, en haut \xE0 droite.",Qn(!1),ze="exploration",Qt([{nom:"Cl\xE9o Forclaz",texte:`Bravo ${gt.prenom}, tu as vaincu le boss final et termin\xE9 M\xE9diaventure !`}])}}async function L_(){let r=ys[Ce.id],e=new Ue;e.position.copy(Rt.centre).setY(1.1);let t=new ce(new Yt(.7,.04,8,48),new He({color:Ce.accent}));if(t.rotation.x=Math.PI/2,t.position.y=-.9,e.add(t),vi.add(e),qi=e,r){let i=(await w_.loadAsync(S_+r.fichier)).scene,s=new Vt().setFromObject(i).getSize(new E);i.scale.setScalar(.9/Math.max(s.x,s.y,s.z));let a=new Vt().setFromObject(i).getCenter(new E);i.position.sub(a),i.traverse(o=>{o.isMesh&&(o.castShadow=!0)}),e.add(i)}Da.push({objet:e,rayon:2.4,actif:()=>qi===e,texte:()=>`Ramasser : ${r?.nom??"objet"}`,action:()=>D_(r)})}function D_(r){vi.remove(qi),qi=null,gt.objets.includes(Ce.id)||gt.objets.push(Ce.id),Sl(),bm(),Oe("obtenu-icone").textContent=r?.icone??"\u2728",Oe("obtenu-nom").textContent=r?.nom??"",Oe("obtenu").hidden=!1,Qn(null),ze="dialogue",Oe("obtenu-ok").onclick=()=>{Oe("obtenu").hidden=!0,Qn(!1),ze="exploration",Ce.suivant?(_n.portail.visible=!0,Qt([{nom:Ce.titre,texte:`Le portail vers \xAB ${ki[Ce.suivant].titre} \xBB s\u2019est ouvert au nord.`}])):Qt([{nom:"M\xE9diaventure",texte:"Bravo, tu as termin\xE9 M\xE9diaventure ! Passe au stand r\xE9cup\xE9rer ton gain."}])}}function bm(){let r=Oe("inventaire");r.innerHTML="";for(let e of ul.slice(0,-1)){let t=document.createElement("div"),n=gt.objets.includes(e);t.className=`case-inv${n?" acquis":""}`,t.textContent=n?ys[e].icone:"",t.title=n?ys[e].nom:`${ki[e].titre} \u2014 pas encore obtenu`,r.append(t)}}var Em=[],id=null,Sm="exploration";function Qt(r,e=null){ze!=="dialogue"&&(Sm=ze==="transition"?"exploration":ze),Em=[...r],id=e,ze="dialogue",Oe("dialogue").hidden=!1,od()}function od(){let r=Em.shift();if(!r){Oe("dialogue").hidden=!0,Qn(!1),ze=Sm;let e=id;id=null,e?.();return}Oe("dialogue-nom").textContent=r.nom,Oe("dialogue-texte").textContent=r.texte,Qn(r.nom===Ce?.boss?.nom?Ce.boss.portrait:null)}var U_="../portraits/cleo_miko.png";function Qn(r){let e=Oe("dialogue-portrait");if(r===!1){e.hidden=!0,document.body.classList.remove("avec-portrait");return}let t=r??U_;e.src.endsWith(t.replace("../",""))||(e.src=t),e.hidden=!1,document.body.classList.add("avec-portrait")}Oe("dialogue").addEventListener("click",od);function rd(r){return Oe("chargement").classList.toggle("visible",r),new Promise(e=>setTimeout(e,450))}var gn=new Set,wt={yaw:0,pitch:.38,dist:8},sd=!0;addEventListener("keydown",r=>{if(gn.add(r.code),ze==="dialogue"&&["Space","Enter","KeyE"].includes(r.code)&&!Oe("dialogue").hidden){r.preventDefault(),od();return}ze==="exploration"&&r.code==="KeyE"&&wm(),(r.key==="m"||r.key==="M")&&(ze==="carte"?Oe("fermer-carte").click():Mm()),ze==="exploration"&&r.code==="Space"&&(r.preventDefault(),Tm())});addEventListener("keyup",r=>gn.delete(r.code));addEventListener("blur",()=>gn.clear());{let r=null;Cs.addEventListener("pointerdown",e=>{ze==="exploration"&&(r={x:e.clientX,y:e.clientY,id:e.pointerId})}),addEventListener("pointerup",e=>{e.pointerId===r?.id&&(r=null)}),addEventListener("pointermove",e=>{!r||ze!=="exploration"||e.pointerId!==r.id||(wt.yaw-=(e.clientX-r.x)*.006,wt.pitch=An.clamp(wt.pitch+(e.clientY-r.y)*.004,-.3,1.2),r.x=e.clientX,r.y=e.clientY)}),Cs.addEventListener("wheel",e=>{ze==="exploration"&&(wt.dist=An.clamp(wt.dist+e.deltaY*.01,3.5,14))},{passive:!0})}um({surSauter:()=>{ze==="exploration"&&Tm()},surAction:()=>{ze==="exploration"&&wm()}});La&&(document.querySelector("#dialogue small").textContent="Touche la bulle pour continuer");function Tm(){Je.position.y<=.001&&(Je.userData.vy=6.2)}var ji=null;function wm(){ji?.action()}var Wi=new E;function N_(r){let e=(gn.has("KeyW")||gn.has("ArrowUp")?1:0)-(gn.has("KeyS")||gn.has("ArrowDown")?1:0)+cn.y,t=(gn.has("KeyD")||gn.has("ArrowRight")?1:0)-(gn.has("KeyA")||gn.has("ArrowLeft")?1:0)+cn.x,n=Math.hypot(cn.x,cn.y),i=new E(-Math.sin(wt.yaw)*e+Math.cos(wt.yaw)*t,0,-Math.cos(wt.yaw)*e-Math.sin(wt.yaw)*t),s=0;if(i.lengthSq()>0&&ze==="exploration"){i.normalize(),s=gn.has("ShiftLeft")||gn.has("ShiftRight")||n>.95?8:4.5*(cn.actif?Math.max(.35,n):1),Je.position.addScaledVector(i,s*r);let u=Math.atan2(i.x,i.z)-Je.rotation.y;u=Math.atan2(Math.sin(u),Math.cos(u)),Je.rotation.y+=u*Math.min(1,r*12)}Je.userData.vy-=18*r,Je.position.y=Math.max(0,Je.position.y+Je.userData.vy*r),Je.position.y===0&&(Je.userData.vy=0);for(let h of _n.colliders){let u=h.objet?h.objet.position.x:h.x,d=h.objet?h.objet.position.z:h.z;Wi.set(Je.position.x-u,0,Je.position.z-d);let p=Wi.length(),f=h.r+.35;p<f&&p>1e-4&&Je.position.addScaledVector(Wi.normalize(),f-p)}if(Wi.set(Je.position.x,0,Je.position.z),Wi.length()>on-.8&&(Wi.setLength(on-.8),Je.position.x=Wi.x,Je.position.z=Wi.z),ws(Je,r,Je.position.y>0?0:s),_n.portail.visible&&Je.position.distanceTo(_n.portail.position)<1.8&&ze==="exploration"){Is(Ce.suivant);return}ji=null;let a=1/0;for(let h of Da){if(!h.actif()||!h.objet.visible)continue;let u=Math.hypot(h.objet.position.x-Je.position.x,h.objet.position.z-Je.position.z);u<h.rayon&&u<a&&(a=u,ji=h)}let o=Oe("invite");o.hidden=!ji||ze!=="exploration",ji&&(o.innerHTML=`<kbd>E</kbd> ${ji.texte()}`),dm(ji&&ze==="exploration"?ji.texte().split(" ")[0]:null);for(let h of[Vn,Ft])if(h?.visible){if(h.position.distanceTo(Je.position)<6){let u=Math.atan2(Je.position.x-h.position.x,Je.position.z-h.position.z),d=Math.atan2(Math.sin(u-h.rotation.y),Math.cos(u-h.rotation.y));h.rotation.y+=d*Math.min(1,r*4)}ws(h,r,0)}qi&&(qi.rotation.y+=r*1.2,qi.position.y=1.1+Math.sin(Qu.elapsedTime*2)*.12);let l=Je.position.clone().add(new E(0,.85,0)),c=l.clone().add(new E(Math.sin(wt.yaw)*Math.cos(wt.pitch)*wt.dist,Math.sin(wt.pitch)*wt.dist,Math.cos(wt.yaw)*Math.cos(wt.pitch)*wt.dist));c.y=Math.max(c.y,.5),sd?(vn.position.copy(c),sd=!1):vn.position.lerp(c,1-Math.exp(-r*10)),vn.lookAt(l)}function Am(){requestAnimationFrame(Am);let r=Math.min(Qu.getDelta(),.05),e=Qu.elapsedTime;if(ze==="creation"){Xi||ad(),ym&&!ed&&(Ua+=r*.6),Xi.rotation.y=Ua,ws(Xi,r,0);for(let i of xm)i.position.y=i.userData.y+Math.sin(e+i.userData.phase)*.15,i.rotation.z=e*.5+i.userData.phase;let t=innerWidth>760;vn.setViewOffset(innerWidth,innerHeight,t?-innerWidth*.24:0,t?0:innerHeight*.25,innerWidth,innerHeight),El+=(Tl-El)*Math.min(1,r*8);let n=El;vn.position.set(0,An.lerp(.75,.82,n),An.lerp(t?2.3:3.6,1.05,n)),vn.lookAt(0,An.lerp(.55,.74,n),0),Yi.render($n,vn),!fm&&ze==="creation"&&(fm=!0,rd(!1));return}if(_n){for(let t of _n.animations)t(r,e);ze==="combat"?wl?.update(r):N_(r),Yi.render(vi,vn)}}Am();var Ju=new URLSearchParams(location.search);Ju.has("niveau")&&ki[Ju.get("niveau")]&&(td(),gt.prenom||(gt.prenom="Testeur\xB7se"),Is(Ju.get("niveau")));window.jeu={partie:gt,tourner:r=>{Ua=r,ym=!1},essayer:r=>{Object.assign(gt.apparence,r),ad()},zoom:r=>{Tl=El=r},get mode(){return ze},get combat(){return wl},etatNiveau:Er,lancerNiveau:Is,ouvrirArene:Na,lancerCombat:nd,joueur:()=>Je,camera:vn,cam:wt}});O_();})();
/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
