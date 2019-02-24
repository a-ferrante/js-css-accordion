import SectionComponent from '../js/section';

describe('SectionComponent', () => {

    const configObject = {
        title: 'title',
        content: 'content'
    };

    let instance;
    let parentNode;

    beforeEach(() => {
        
        parentNode = document.createElement('div');
        instance = new SectionComponent(parentNode, configObject, 0);

    });

    it('should append the Section component to his parent element', () => {

        expect(parentNode).toContainElement(instance.sectionHeaderNode);
        expect(parentNode).toContainElement(instance.contentNode);

    });    

    it('should update state on click', () => {

        instance.isOpened = false;
        instance.sectionHeaderNode.click();
        expect(instance.isOpened).toBe(true);

    });  

    it('should toggle content based on state', () => {

        instance.isOpened = false;
        instance.toggleContentDisplay();
        expect(instance.contentNode).not.toHaveClass('AccordionComponent-sectionContent--hideContent');

        instance.isOpened = true;
        instance.toggleContentDisplay();
        expect(instance.contentNode).toHaveClass('AccordionComponent-sectionContent--hideContent');

    });  

    it('should send an SectionClicked event when the header is clicked', () => {

        instance.sectionHeaderNode.click();
        instance.parentNode.addEventListener('sectionClickedEvent', (e) => {
            expect(e.details.sectionIndex).toBe(0)
        })

    });  

})