import AccordionComponent from '../js/accordion';
import SectionComponent from '../js/section';


describe('AccordionComponent', () => {

    const sections = [
        {
            title: 'title',
            content: 'content'
        },
        {
            title: 'title',
            content: 'content'
        }
    ]

    let instance;
    let parentNode;

    beforeEach(() => {
        
        parentNode = document.createElement('div');
        instance = new AccordionComponent(parentNode, sections);

    });

    it('should append the Section component to his parent element', () => {

        expect(parentNode).toContainElement(instance.accordionNode);

    });

    it('should store references of the sections', () => {

        expect(instance.sections.length).toBe(2);
        expect(instance.sections[0]).toBeInstanceOf(SectionComponent);

    });  

    it('should update openedSection when the sectionClickedEvent its triggered', () => {
        
        let detailObject = {
            detail: {
                sectionIndex: 0,
                opened: true
            } 
        }
        
        var sectionClickedEvent = new CustomEvent('sectionClickedEvent', detailObject);

        instance.accordionNode.dispatchEvent(sectionClickedEvent);

        expect(instance.openedSection).toBe(0);

        detailObject.detail.opened = false;

        sectionClickedEvent = new CustomEvent('sectionClickedEvent', detailObject);

        instance.accordionNode.dispatchEvent(sectionClickedEvent);

        expect(instance.openedSection).toBe(undefined);

        detailObject.detail.sectionIndex = 1;
        detailObject.detail.opened = true;

        sectionClickedEvent = new CustomEvent('sectionClickedEvent', detailObject);

        instance.accordionNode.dispatchEvent(sectionClickedEvent);

        expect(instance.openedSection).toBe(1);

    });  

})