const fs = require('fs');
const path = 'c:\\Users\\hp\\Desktop\\hemolink\\HEMOLINK\\src\\app\\search\\page.tsx';
let content = fs.readFileSync(path, 'utf8');

const target = `               {filteredDonors.length > 0 ? (
                 <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                 {filteredDonors.map((donor, idx) => (`;

const replaceWith = `               {filteredDonors.length > 0 ? (
                 <div className="space-y-12">
                   {(['donor', 'hospital', 'bloodbank'] as const).map(roleType => {
                     const roleResults = filteredDonors.filter(d => d.role === roleType);
                     if (roleResults.length === 0) return null;
                     
                     const roleTitles = { donor: 'Nearby Donors', hospital: 'Nearby Hospitals', bloodbank: 'Nearby Blood Banks' };
                     return (
                       <div key={roleType} className="space-y-6">
                         <h3 className="text-3xl font-black italic tracking-tighter text-foreground">{roleTitles[roleType]}</h3>
                         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                           {roleResults.map((donor, idx) => (`;

const targetEnd = `                     {/* Animated Shine */}
                     <div className="absolute -inset-x-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:animate-[shine_1.5s_infinite]" />
                   </Card>
                 ))}
              </div>`;

const replaceEndWith = `                               {/* Animated Shine */}
                               <div className="absolute -inset-x-full top-0 h-full w-1/2 bg-gradient-to-r from-transparent via-white/5 to-transparent skew-x-[-25deg] group-hover:animate-[shine_1.5s_infinite] pointer-events-none" />
                             </Card>
                           ))}
                         </div>
                       </div>
                     );
                   })}
                 </div>`;

content = content.replace(target, replaceWith);
content = content.replace(targetEnd, replaceEndWith);

// Now for the middle badge replacement:
const badgeTarget = `                     {/* Blood Group Badge */}
                     <div className="absolute top-0 right-0 p-8">
                       <div className="w-16 h-16 bg-primary rounded-[1.25rem] flex items-center justify-center shadow-2xl shadow-primary/50 transform -rotate-12 group-hover:rotate-0 transition-transform duration-700 border-4 border-white/10">
                         <span className="text-3xl font-black italic">{donor.bloodGroup}</span>
                       </div>
                     </div>`;
const badgeReplace = `                               {/* Badges for roles overlay */}
                               <div className="absolute top-0 right-0 p-8 z-10">
                                 <div className={\`w-16 h-16 rounded-[1.25rem] flex items-center justify-center shadow-2xl transform -rotate-12 group-hover:rotate-0 transition-transform duration-700 border-4 border-white/10 \${
                                   donor.role === 'hospital' ? 'bg-blue-600 shadow-blue-500/50' : donor.role === 'bloodbank' ? 'bg-green-600 shadow-green-500/50' : 'bg-primary shadow-primary/50'
                                 }\`}>
                                   <span className="text-2xl font-black italic">{donor.bloodGroup}</span>
                                 </div>
                               </div>`;

content = content.replace(badgeTarget, badgeReplace);

const headerTarget = `                     <CardHeader className="pt-10 pb-6 px-8">
                       <div className="flex items-center gap-5 mb-4">
                          <div className="w-16 h-16 rounded-3xl bg-white/10 flex items-center justify-center border border-white/10 group-hover:bg-primary/20 transition-colors duration-500">
                             <User className="h-8 w-8 text-primary shadow-lg" />
                          </div>
                          <div className="space-y-1">
                             <CardTitle className="text-2xl font-black tracking-tight">{donor.name}</CardTitle>
                             <div className="flex items-center gap-1.5 text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                                <CheckCircle2 className="h-3.5 w-3.5 fill-primary text-slate-900" />
                                Elite Donor
                             </div>
                          </div>
                       </div>
                     </CardHeader>`;
                     
const headerReplace = `                               <CardHeader className="pt-10 pb-6 px-8 relative z-10">
                                 <div className="flex items-center gap-5 mb-4 pr-16">
                                    <div className={\`w-14 h-14 shrink-0 rounded-3xl bg-white/10 flex items-center justify-center border border-white/10 transition-colors duration-500 \${
                                      donor.role === 'hospital' ? 'group-hover:bg-blue-500/20' : donor.role === 'bloodbank' ? 'group-hover:bg-green-500/20' : 'group-hover:bg-primary/20'
                                    }\`}>
                                       <User className={\`h-7 w-7 shadow-lg \${
                                         donor.role === 'hospital' ? 'text-blue-400' : donor.role === 'bloodbank' ? 'text-green-400' : 'text-primary'
                                       }\`} />
                                    </div>
                                    <div className="space-y-1 overflow-hidden">
                                       <CardTitle className="text-2xl font-black tracking-tight truncate">{donor.name}</CardTitle>
                                       <div className={\`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.2em] \${
                                         donor.role === 'hospital' ? 'text-blue-400' : donor.role === 'bloodbank' ? 'text-green-400' : 'text-primary'
                                       }\`}>
                                          <CheckCircle2 className={\`h-3.5 w-3.5 text-slate-900 \${
                                         donor.role === 'hospital' ? 'fill-blue-400' : donor.role === 'bloodbank' ? 'fill-green-400' : 'fill-primary'
                                       }\`} />
                                          {donor.role === 'hospital' ? 'Registered Hospital' : donor.role === 'bloodbank' ? 'Verified Blood Bank' : 'Elite Donor'}
                                       </div>
                                    </div>
                                 </div>
                               </CardHeader>`;
                               
content = content.replace(headerTarget, headerReplace);

const contentTarget = `                     <CardContent className="px-8 pb-8 space-y-6">
                       <div className="space-y-4 p-6 bg-white/5 rounded-[2rem] border border-white/10 group-hover:bg-white/[0.08] transition-colors">
                         <div className="flex items-center gap-4 text-base font-bold text-slate-300">
                           <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center"><MapPin className="h-4 w-4 text-primary" /></div>
                           {donor.city}
                         </div>
                         <div className="flex items-center gap-4 text-base font-bold text-slate-300">
                           <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center"><Phone className="h-4 w-4 text-primary" /></div>
                           <span className="tracking-widest">{donor.phone.replace(/(\\d{6})(\\d+)/, '$1XXXX')}</span>
                         </div>
                       </div>
                       
                       <Button className="w-full h-16 bg-white text-slate-900 hover:bg-primary hover:text-white font-black text-lg rounded-[1.5rem] transition-all shadow-xl hover:shadow-primary/40 group-hover:scale-105 active:scale-95 uppercase tracking-tighter">
                          REQUEST CONTACT
                       </Button>
                     </CardContent>`;
                     
const contentReplace = `                               <CardContent className="px-8 pb-8 space-y-6 relative z-10">
                                 <div className="space-y-4 p-6 bg-white/5 rounded-[2rem] border border-white/10 group-hover:bg-white/[0.08] transition-colors">
                                   <div className="flex items-center gap-4 text-base font-bold text-slate-300">
                                     <div className={\`w-8 h-8 rounded-xl flex items-center justify-center \${
                                       donor.role === 'hospital' ? 'bg-blue-500/10' : donor.role === 'bloodbank' ? 'bg-green-500/10' : 'bg-primary/10'
                                     }\`}><MapPin className={\`h-4 w-4 \${
                                       donor.role === 'hospital' ? 'text-blue-400' : donor.role === 'bloodbank' ? 'text-green-400' : 'text-primary'
                                     }\`} /></div>
                                     {donor.city}
                                   </div>
                                   <div className="flex items-center gap-4 text-base font-bold text-slate-300">
                                     <div className={\`w-8 h-8 rounded-xl flex items-center justify-center \${
                                       donor.role === 'hospital' ? 'bg-blue-500/10' : donor.role === 'bloodbank' ? 'bg-green-500/10' : 'bg-primary/10'
                                     }\`}><Phone className={\`h-4 w-4 \${
                                       donor.role === 'hospital' ? 'text-blue-400' : donor.role === 'bloodbank' ? 'text-green-400' : 'text-primary'
                                     }\`} /></div>
                                     <span className="tracking-widest">{donor.phone.replace(/(\\d{6})(\\d+)/, '$1XXXX')}</span>
                                   </div>
                                 </div>
                                 
                                 <Button className={\`w-full h-16 bg-white text-slate-900 font-black text-lg rounded-[1.5rem] transition-all shadow-xl group-hover:scale-105 active:scale-95 uppercase tracking-tighter \${
                                    donor.role === 'hospital' ? 'hover:bg-blue-500 hover:text-white hover:shadow-blue-500/40' : donor.role === 'bloodbank' ? 'hover:bg-green-500 hover:text-white hover:shadow-green-500/40' : 'hover:bg-primary hover:text-white hover:shadow-primary/40'
                                  }\`}>
                                    CONTACT {donor.role.toUpperCase()}
                                 </Button>
                               </CardContent>`;

content = content.replace(contentTarget, contentReplace);
fs.writeFileSync(path, content);
console.log("Replaced");
