(() => {
'use strict';
const homes=[["1 bed / 1 bath",1000,119,219,249,149],["2 bed / 2 bath",1500,149,269,299,179],["3 bed / 2 bath",2000,179,329,379,219],["4 bed / 3 bath",2500,229,399,449,279],["5 bed / 3 bath",3000,289,499,549,349]],services=[["Jasmine Essential","Standard housekeeping","Housekeeping"],["Jasmine Signature","Deep cleaning","Deep Cleaning"],["Jasmine Fresh Start","Move-in / move-out","Move-In / Move-Out Cleaning"],["Jasmine Hospitality","Vacation rental turnover","Vacation Rental Turnover"]],extras=[["Inside refrigerator",35,"appliance",50],["Inside oven",40,"appliance",50],["Inside kitchen cabinets",65,"starting price",1],["Interior windows",8,"window",50],["Laundry and folding",25,"load",50],["Bed linen change",15,"bed",50],["Excessive pet hair",35,"starting price",1],["Lanai cleaning",45,"starting price",1],["Home organization",55,"hour",50],["Additional bathroom",35,"bathroom",50],["Short-notice appointment",40,"if available",1]];
function calculate(home,service,frequency,condition,quantities,homes,extras){
 if(!Number.isInteger(home)||home<0||home>=homes.length||!Number.isInteger(service)||service<0||service>3||condition==="custom")return null;
 const base=homes[home][2+service],discount=service===0&&[0,.05,.1,.15].includes(frequency)?frequency:0,adjustment=[0,.15,.3].includes(condition)?condition:0;
 const add=extras.reduce((sum,x,i)=>sum+x[1]*Math.min(x[3],Math.max(0,Math.floor(Number(quantities[i])||0))),0);
 return {base,saving:Math.round(base*discount*100)/100,adjustment:Math.round(base*adjustment*100)/100,add,total:Math.round(base*(1-discount+adjustment)+add)};
}
const byId=id=>document.getElementById(id);
const home=byId('estimate-home'), service=byId('estimate-service'), freq=byId('estimate-frequency'), condition=byId('estimate-condition');
if(!home||!service||!freq||!condition)return;
const inputs=Array.from(document.querySelectorAll('[data-extra]'));
const fmt=new Intl.NumberFormat('en-US',{style:'currency',currency:'USD'});
const set=(id,t)=>{byId(id).textContent=t;};
function refresh(){
 const h=Number(home.value),s=Number(service.value);
 freq.disabled=s!==0;if(s!==0)freq.value='0';
 const qs=inputs.map(el=>Math.min(Number(el.max),Math.max(0,Math.floor(Number(el.value)||0))));
 const value=calculate(h,s,Number(freq.value),condition.value==='custom'?'custom':Number(condition.value),qs,homes,extras);
 const pick=services[s];if(!pick)return;
 set('estimate-total',value?'From '+fmt.format(value.total).replace(/\.00$/,''):'Personalized quote');
 set('estimate-base',value?fmt.format(value.base):'—');
 set('estimate-saving',value?'−'+fmt.format(value.saving):'—');
 set('estimate-adjustment',value?fmt.format(value.adjustment):'—');
 set('estimate-addons-total',value?fmt.format(value.add):'—');
 const detail=[pick[1],h<homes.length?homes[h][0]+'; up to '+homes[h][1]+' sq. ft.':'Custom property', 'Frequency: '+freq.options[freq.selectedIndex].text,'Condition: '+condition.options[condition.selectedIndex].text,'Extras: '+(qs.map((q,i)=>q?extras[i][0]+' x '+q:'').filter(Boolean).join(', ')||'None'),value?'Preliminary online estimate: '+fmt.format(value.total)+' (not final)':'Custom quote requested'].join('\n');
 const params=new URLSearchParams({service:pick[2],package:pick[0],estimate:detail});
 byId('estimate-request').href='contact.html?'+params.toString();
}
[home,service,freq,condition,...inputs].forEach(el=>{el.addEventListener('input',refresh);el.addEventListener('change',refresh);});
refresh();
})();