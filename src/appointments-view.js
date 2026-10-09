import './appointments-view.css';
export function mountAppointments(root, images) {
  let filter = 'all';
  const items = [
    {name:'Extensão de Cílios',image:images[0],date:'2026-10-20',time:'10:30',status:'Confirmado'},
    {name:'Manutenção de Cílios',image:images[1],date:'2026-10-12',time:'14:00',status:'Concluído'},
    {name:'Design de Sobrancelhas',image:images[2],date:'2026-09-18',time:'14:00',status:'Concluído'}
  ];
  const svg = kind => '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">'+({person:'<circle cx="12" cy="7" r="3"/><path d="M5 21v-3a7 7 0 0 1 14 0v3"/>',calendar:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M7 3v4m10-4v4M3 11h18"/>',check:'<circle cx="12" cy="12" r="9"/><path d="m7 12 3 3 7-7"/>',confirmed:'<rect x="4" y="5" width="16" height="16" rx="2"/><path d="M8 3v4m8-4v4m-8 6 3 3 5-5"/>',history:'<path d="M3 10a9 9 0 1 1 2 9M3 4v6h6m3-4v6l3 2"/>',payment:'<path d="M12 3v18m4-14c-1-3-9-3-9 1s10 3 10 7-8 4-10 1"/>',cancel:'<path d="m6 6 12 12M18 6 6 18"/>',arrow:'<path d="m9 5 7 7-7 7"/>'}[kind])+'</svg>';
  function render() {
    root.className = 'appointments-view';
    root.innerHTML = '<div class="ap-heading"><h1>Meus agendamentos</h1><p>Seu olhar sempre em dia</p><span aria-hidden="true">♥</span></div><div class="ap-tabs" role="group" aria-label="Filtrar agendamentos"><button data-filter="all" aria-pressed="'+(filter==='all')+'">Todos</button><button data-filter="upcoming" aria-pressed="'+(filter==='upcoming')+'">Próximos</button></div><p class="ap-demo">Agendamentos de demonstração</p><div class="ap-list"></div>';
    const list = root.querySelector('.ap-list');
    const visible = items.filter(item => filter==='all'||(item.status==='Confirmado'&&new Date(item.date+'T'+item.time)>new Date()));
    let month = '';
    for (const item of visible) {
      const key = item.date.slice(0,7);
      if (key!==month) {const title=document.createElement('h2');title.className='ap-month';title.textContent=new Date(item.date+'T12:00:00').toLocaleDateString('pt-BR',{month:'long',year:'numeric'}).replace(' de ',' ');list.append(title);month=key;}
      const card=document.createElement('button');card.className='ap-card';card.type='button';card.setAttribute('aria-label','Ver detalhes de '+item.name);
      const image=document.createElement('img');image.src=item.image;image.alt=item.name;
      const content=document.createElement('div');content.className='ap-card-content';
      const title=document.createElement('h3');title.textContent=item.name;
      const professional=document.createElement('p');professional.innerHTML=svg('person')+'<span>Bella Lash</span>';
      const date=document.createElement('p');date.innerHTML=svg('calendar')+'<span>'+item.date.split('-').reverse().join('/')+' · '+item.time+'</span>';
      const status=document.createElement('span');status.className='ap-status '+(item.status==='Confirmado'?'ap-confirmed':'ap-completed');status.innerHTML=svg(item.status==='Confirmado'?'confirmed':'check')+item.status;
      content.append(title,professional,date,status);const arrow=document.createElement('span');arrow.className='ap-arrow';arrow.innerHTML=svg('arrow');card.append(image,content,arrow);list.append(card);
      const detailId = 'ap-detail-' + item.date + '-' + item.time.replace(':', '');
      card.setAttribute('aria-expanded', 'false');
      card.setAttribute('aria-controls', detailId);
      card.onclick = () => {
        const existing = document.getElementById(detailId);
        if (existing) { existing.remove(); card.setAttribute('aria-expanded', 'false'); return; }
        const dialog = document.createElement('section');
        dialog.className = 'ap-detail ap-detail-menu ap-detail-inline';
        dialog.id = detailId;
        dialog.setAttribute('aria-labelledby', detailId + '-title');
        const legend = document.createElement('span');
        legend.className = 'ap-detail-date';
        legend.textContent = item.date.slice(8,10) + '/' + item.date.slice(5,7);
        const heading = document.createElement('h2');
        heading.id = detailId + '-title';
        heading.innerHTML = '<span class="ap-info-icon" aria-hidden="true">ℹ</span>';
        const name = document.createElement('span'); name.textContent = item.name; heading.append(name);
        const when = document.createElement('p');
        when.innerHTML = svg('calendar');
        const dateText = document.createElement('span');
        const weekday = new Date(item.date + 'T12:00:00').toLocaleDateString('pt-BR', { weekday: 'long' });
        dateText.textContent = weekday.charAt(0).toUpperCase() + weekday.slice(1) + ' ' + legend.textContent + ' às ' + item.time;
        when.append(dateText);
        const professional = document.createElement('p');
        professional.innerHTML = svg('person');
        const professionalText = document.createElement('span'); professionalText.textContent = 'Profissional Bella Lash'; professional.append(professionalText);
        const note = document.createElement('small'); note.className = 'ap-detail-note'; note.textContent = 'Registro demonstrativo';
        const close = document.createElement('button');
        close.type = 'button'; close.className = 'ap-detail-close';
        close.setAttribute('aria-label', 'Fechar detalhes do agendamento');
        close.textContent = '×'; close.onclick = () => { dialog.remove(); card.setAttribute('aria-expanded', 'false'); card.focus(); };
        const summary = document.createElement('div');
        summary.className = 'ap-detail-summary';
        summary.append(heading, when, professional);
        const processes = document.createElement('ol');
        processes.className = 'ap-process';
        processes.setAttribute('aria-label', 'Processos do agendamento — demonstração');
        [['history', 'Agendamento', 'Cadastrado'], ['payment', 'Aguardando', 'Pagamento'], ['cancel', 'Agendamento', 'Cancelado']].forEach(([icon, first, second]) => {
          const step = document.createElement('li');
          step.innerHTML = '<span class="ap-process-icon">' + svg(icon) + '</span><span class="ap-process-label">' + first + '<br>' + second + '</span>';
          processes.append(step);
        });
        dialog.append(summary, processes, note, close);
        card.after(dialog);
        card.setAttribute('aria-expanded', 'true');
      };
    }
    if(!visible.length){const empty=document.createElement('p');empty.className='ap-empty';empty.textContent='Nenhum próximo agendamento.';list.append(empty);}
    root.querySelectorAll('[data-filter]').forEach(button=>button.onclick=()=>{filter=button.dataset.filter;render();root.querySelector('[data-filter="'+filter+'"]').focus({preventScroll:true});});
  }
  render();
  return ()=>root.replaceChildren();
}
