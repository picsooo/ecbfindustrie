(function(){
var D=window.ECBF,C=D.contact;
var A='<svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg>';
document.querySelectorAll('.ia').forEach(function(e){e.outerHTML=A});
function byId(id){for(var i=0;i<D.range.length;i++)if(D.range[i].id===id)return D.range[i]}
function img(n){return '../assets/img/p/'+n+'.webp'}

/* header + burger */
var hd=document.getElementById('hd');
function onS(){hd.classList.toggle('solid',scrollY>40);
 var h=document.documentElement.scrollHeight-innerHeight;var p=h>0?scrollY/h:0;
 document.getElementById('beadFill').setAttribute('stroke-dashoffset',String(1000-1000*p));}
addEventListener('scroll',onS,{passive:true});onS();
var nav=document.getElementById('nav');
document.getElementById('burger').onclick=function(){nav.classList.toggle('open')};
nav.querySelectorAll('a').forEach(function(a){a.addEventListener('click',function(){nav.classList.remove('open')})});

/* marquee */
var mq=D.metiers.map(function(m){return '<span>'+m.nom+'</span>'}).join('');
document.getElementById('marq').innerHTML=mq+mq;

/* modal */
var md=document.createElement('div');md.className='modal';md.innerHTML='<div class="box"><button class="x" aria-label="Fermer">×</button><div class="mpic"><img alt=""></div><div class="mtx"></div></div>';document.body.appendChild(md);
md.addEventListener('click',function(e){if(e.target===md||e.target.className==='x')md.classList.remove('on')});
function openP(id){var p=byId(id);if(!p)return;md.querySelector('img').src=img(p.img);md.querySelector('img').alt=p.nom;
 var sp=Object.keys(p.specs).map(function(k){return '<tr><td>'+k+'</td><td>'+p.specs[k]+'</td></tr>'}).join('');
 md.querySelector('.mtx').innerHTML='<small>COSMO® '+p.ref+' · '+p.type+'</small><h3>'+p.nom+'</h3><p>'+p.accroche+'</p><ul>'+p.points.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul>'+(sp?'<table>'+sp+'</table>':'')+(p.labels.length?'<div class="lbl">'+p.labels.map(function(x){return '<span>'+x+'</span>'}).join('')+'</div>':'')+'<p style="font-size:14px;color:#9AA4B2">Conditionnement : '+p.cond+'</p><a class="cta" href="#contact" data-p="'+p.nom+' '+p.ref+'">Demander un devis '+A+'</a>';
 md.querySelector('.mtx .cta').onclick=function(){document.getElementById('besoin').value='COSMO® '+this.getAttribute('data-p');md.classList.remove('on')};
 md.classList.add('on')}
var lb=document.createElement('div');lb.className='lb';lb.innerHTML='<img alt="">';document.body.appendChild(lb);lb.onclick=function(){lb.classList.remove('on')};
document.addEventListener('keydown',function(e){if(e.key==='Escape'){md.classList.remove('on');lb.classList.remove('on')}});

/* metiers */
var chips=document.getElementById('chips'),cur=null;
chips.innerHTML=D.metiers.map(function(m,i){return '<button class="chip'+(i?'':' on')+'" data-i="'+i+'">'+m.nom+'</button>'}).join('');
function showM(i){var m=D.metiers[i];cur=m;var im=document.getElementById('metImg');im.classList.add('fade');
 setTimeout(function(){im.src='../assets/img/apps/'+m.id+'-scene.webp';im.alt=m.nom;im.onload=function(){im.classList.remove('fade')};},220);
 document.getElementById('metNom').textContent=m.nom;
 document.getElementById('metN').textContent=m.apps.length+' applications du HD 100.400';
 document.getElementById('metApps').innerHTML=m.apps.map(function(a,k){return '<li style="animation-delay:'+(k*60)+'ms">'+a+'</li>'}).join('');
 document.getElementById('metReco').innerHTML=m.produits.map(function(id){var p=byId(id);return p?'<button data-id="'+id+'"><img src="'+img(p.img)+'" alt="'+p.nom+'"><b>'+p.nom+'</b><small>'+p.ref+'</small></button>':''}).join('');
 document.querySelectorAll('#metReco button').forEach(function(b){b.onclick=function(){openP(b.getAttribute('data-id'))}});
 chips.querySelectorAll('.chip').forEach(function(c){c.classList.toggle('on',+c.getAttribute('data-i')===i)});}
chips.addEventListener('click',function(e){var b=e.target.closest('.chip');if(b)showM(+b.getAttribute('data-i'))});
showM(0);
document.getElementById('metZoom').onclick=function(){lb.querySelector('img').src='../assets/img/apps/'+cur.id+'.webp';lb.classList.add('on')};

/* adhesion test */
var mats=[['Aluminium',1],['Acier / métal',1],['Bois',1],['Béton',1],['Verre',1],['Miroir',1],['Pierre naturelle',1],['Céramique',1],['PVC',1],['Polycarbonate',1],['PMMA (acrylique)',1],['Plâtre',1],['Polypropylène (PP)',0],['Polyéthylène (PE)',0],['Téflon (PTFE)',0]];
var mz=document.getElementById('mats'),rig=document.getElementById('rig'),vd=document.getElementById('verdict');
mz.innerHTML=mats.map(function(m,i){return '<button class="mat" data-i="'+i+'">'+m[0]+'</button>'}).join('');
mz.addEventListener('click',function(e){var b=e.target.closest('.mat');if(!b)return;var m=mats[+b.getAttribute('data-i')];
 mz.querySelectorAll('.mat').forEach(function(x){x.classList.toggle('on',x===b)});
 document.getElementById('blkA').textContent=m[0];
 rig.classList.remove('go','fail');void rig.offsetWidth;rig.classList.add('go');
 if(m[1]){vd.className='verdict ok';vd.innerHTML='<div class="ic">✓</div><div><b>Adhérence forte sur '+m[0].toLowerCase()+'</b><p>Le HD 100.400 Multi Talent colle et rend étanche ce support, en intérieur comme en extérieur.</p></div>';}
 else{setTimeout(function(){rig.classList.add('fail')},500);vd.className='verdict no';vd.innerHTML='<div class="ic">!</div><div><b>Support non recommandé</b><p>Le support « '+m[0]+' » fait partie des exceptions du HD 100.400. Notre service technique vous oriente vers la bonne solution COSMO®.</p></div>';}
});

/* comparatif */
var cmp=[
 {t:'Acrylique',s:'Mastic',p:['Peut être peint','Économique','Adapté aux travaux intérieurs'],m:['Faible élasticité','Faible résistance à l\'eau','Supporte mal les mouvements','Peu adapté à l\'extérieur']},
 {t:'Silicone',s:'Mastic',p:['Grande élasticité','Résiste aux UV','Résiste à l\'eau et à l\'humidité','Durable en extérieur'],m:['Adhérence moyenne sur certains matériaux','Peut retenir la saleté avec le temps','Ne se peint pas']},
 {t:'PU',s:'Polyuréthane',p:['Forte adhérence','Résistance mécanique','Adapté à la construction'],m:['Sensible aux UV','Séchage plus long','Peut durcir avec le temps']},
 {t:'HD',s:'Polymère hybride · COSMO® HD',best:1,p:['Adhérence très forte sur presque tous les matériaux','Résiste aux UV et à l\'humidité','Peut être peint','Sans odeur, sans solvant','Application facile et rapide'],m:['Prix plus élevé que l\'acrylique, pour une performance supérieure']}
];
document.getElementById('cmp').innerHTML=cmp.map(function(c){return '<article class="rv'+(c.best?' best':'')+'">'+(c.best?'<span class="badge">Recommandé</span>':'')+'<span class="tp">'+c.s+'</span><h3>'+c.t+'</h3><ul class="p">'+c.p.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul><ul class="m">'+c.m.map(function(x){return '<li>'+x+'</li>'}).join('')+'</ul></article>'}).join('');

/* rail */
var rail=document.getElementById('rail');
rail.innerHTML=D.range.map(function(p){return '<button class="pc" data-id="'+p.id+'"><span class="ty">'+p.type+'</span><div class="glow"></div><div class="pic"><img src="'+img(p.img)+'" alt="'+p.nom+'" loading="lazy"></div><small>COSMO® '+p.ref+'</small><h3>'+p.nom+'</h3><p>'+p.accroche+'</p></button>'}).join('');
rail.addEventListener('click',function(e){var b=e.target.closest('.pc');if(b)openP(b.getAttribute('data-id'))});
document.getElementById('rn').onclick=function(){rail.scrollBy({left:280,behavior:'smooth'})};
document.getElementById('rp').onclick=function(){rail.scrollBy({left:-280,behavior:'smooth'})};

/* calculator */
function calc(){var L=+document.getElementById('L').value,W=+document.getElementById('W').value,P=+document.getElementById('P').value;
 document.getElementById('oL').textContent=L+' m';document.getElementById('oW').textContent=W+' mm';document.getElementById('oP').textContent=P+' mm';
 var ml=L*W*P*1.1,n=Math.max(1,Math.ceil(ml/310));
 document.getElementById('nb').textContent=n;
 document.getElementById('vol').textContent=(ml/1000).toFixed(1).replace('.',',')+' litres de mastic · 10 % de perte inclus';
 var k=Math.min(n,60);document.getElementById('carts').innerHTML=new Array(k+1).join('<i></i>')+(n>60?'<span style="font-size:13px;align-self:center">+'+(n-60)+'</span>':'');}
['L','W','P'].forEach(function(i){document.getElementById(i).oninput=calc});calc();

/* catalogues */
document.getElementById('cats').innerHTML=D.catalogues.map(function(c){return '<a class="cv rv" href="'+c.url+'" target="_blank" rel="noopener"><div class="c"><img src="../assets/img/cat/'+c.id+'.webp" alt="" loading="lazy"></div><h4>'+c.titre+'</h4><div class="m"><span>PDF · '+c.pages+' p · '+c.langue+'</span><b>Ouvrir</b></div></a>'}).join('');

/* contact */
var pin='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/></svg>',
 tel='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M5 3h4l2 5-2.5 1.5a11 11 0 0 0 6 6L16 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>',
 mail='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="5" width="18" height="14"/><path d="m3 6 9 7 9-7"/></svg>';
document.getElementById('coord').innerHTML='<div>'+pin+'<span><small>Adresse</small><b>'+C.adresse+', '+C.ville+'</b></span></div><a href="tel:'+C.telHref+'">'+tel+'<span><small>Téléphone</small><b>'+C.tel+'</b></span></a><a href="mailto:'+C.email+'">'+mail+'<span><small>E-mail</small><b>'+C.email+'</b></span></a>';
document.getElementById('map').src=C.map;
document.getElementById('fAdr').innerHTML=C.adresse+'<br>'+C.ville+'<br><br>';
var ft=document.getElementById('fTel');ft.href='tel:'+C.telHref;ft.textContent=C.tel;
var fm=document.getElementById('fMail');fm.href='mailto:'+C.email;fm.textContent=C.email;
var w=["Adrar","Chlef","Laghouat","Oum El Bouaghi","Batna","Béjaïa","Biskra","Béchar","Blida","Bouira","Tamanrasset","Tébessa","Tlemcen","Tiaret","Tizi Ouzou","Alger","Djelfa","Jijel","Sétif","Saïda","Skikda","Sidi Bel Abbès","Annaba","Guelma","Constantine","Médéa","Mostaganem","M'Sila","Mascara","Ouargla","Oran","El Bayadh","Illizi","Bordj Bou Arreridj","Boumerdès","El Tarf","Tindouf","Tissemsilt","El Oued","Khenchela","Souk Ahras","Tipaza","Mila","Aïn Defla","Naâma","Aïn Témouchent","Ghardaïa","Relizane","Timimoun","Bordj Badji Mokhtar","Ouled Djellal","Béni Abbès","In Salah","In Guezzam","Touggourt","Djanet","El M'Ghair","El Meniaa"];
document.getElementById('wil').innerHTML=w.map(function(x,i){return '<option'+(x==='Blida'?' selected':'')+'>'+String(i+1).padStart(2,'0')+' · '+x+'</option>'}).join('');
var f=document.getElementById('form');f.addEventListener('submit',function(e){e.preventDefault();f.querySelector('.okm').style.display='block';f.reset();document.getElementById('wil').value=document.querySelector('#wil option[selected]').value});

/* chrome */
document.body.insertAdjacentHTML('beforeend','<a class="vswitch" href="../index.html"><i></i>Découvrir la version corporate</a><div class="demo-bar">Maquette de démonstration réalisée par Webminds · aucun formulaire n\'est enregistré</div>');
var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.12});
document.querySelectorAll('.rv').forEach(function(el){io.observe(el)});
})();
