import AccordionComponent from './accordion'
import '../fonts/index.css';
import '../styles/app.scss';

window.addEventListener('DOMContentLoaded', (e) => {
    
    const parentNode = document.getElementById('parentNode');
    const sections = [{
        title: 'Panel 1',
        content: 'Content Panel 1'
    },
    {
        title: 'Panel 2',
        content: 'Content Panel 2'
    },
    {
        title: 'Panel 3',
        content: 'Content Panel 3'
    },
    {
        title: 'Panel 4',
        content: 'Content Panel 4',
        url: 'https://jsonplaceholder.typicode.com/todos/1' 
    }]

    new AccordionComponent(parentNode, sections);

});