import{k as m}from"./chunk-V7OKUKTK.js";import{ha as i}from"./chunk-VQU5OLAI.js";var e=function(r){return r.ShortTerm="short_term",r.MediumTerm="medium_term",r.LongTerm="long_term",r}(e||{}),n=function(r){return r.ShortTerm="Last 4 weeks",r.MediumTerm="Last 6 months",r.LongTerm="Last year",r}(n||{}),u={[e.ShortTerm]:n.ShortTerm,[e.MediumTerm]:n.MediumTerm,[e.LongTerm]:n.LongTerm},a=function(r){return r.TopTracks="top-tracks",r.TopArtists="top-artists",r.TopGenres="top-genres",r}(a||{}),t=function(r){return r.Index="index",r.Image="image",r.Name="name",r.Artists="artists",r.Link="link",r.Expand="expand",r}(t||{}),x={[t.Index]:"No.",[t.Image]:"Album",[t.Name]:"Info",[t.Link]:"Link"},c={[t.Index]:"No.",[t.Image]:"Album",[t.Name]:"Name",[t.Artists]:"Artists",[t.Link]:"Link"};var p=r=>o=>Object.values(r).includes(o),S=r=>o=>p(e)(o.params.timeRange)?!0:i(m).parseUrl(`${r}/${e.ShortTerm}`),_=()=>0;export{e as a,u as b,a as c,t as d,x as e,c as f,S as g,_ as h};
//# sourceMappingURL=chunk-UASX3DSY.js.map
