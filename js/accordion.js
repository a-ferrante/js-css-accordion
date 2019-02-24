

import SectionComponent from './section';

class AccordionComponent {
  /**
     *
     * @costructor
     * @param {parentNode} Html node to append the Accordion to
     * @param {sections} Array Array that contains the config obejct for
     * each seaction to be contained in the accordion
     */

  constructor(parentNode, sections) {
    // store the references to each Section component
    this.sections = [];

    // index of the opened section at the moment
    this.openedSection = undefined;

    // parent node where the accordion component is going to be appended
    this.parent = parentNode;

    this.accordionNode = undefined;

    this.renderAccordionComponent(sections);

    this.setEventListeners();
  }

  /**
     *
     * @desc Renders the Accordion Component.
     * Creates the need DOM element
     * if sections werer provided to the accordion store a reference for each one
     * Append the accordion to the parent element provided
     * @param {sections} Array Array that contains the config
     * obejct for each seaction to be contained in the accordion
     */
  renderAccordionComponent(sections) {
    const accordionNode = document.createElement('dl');

    sections.forEach((sectionConfig, index) => {
      this.sections.push(new SectionComponent(accordionNode, sectionConfig, index));
    });

    accordionNode.classList.add('AccordionComponent');

    this.accordionNode = accordionNode;

    this.parent.appendChild(accordionNode);
  }

  /**
     *
     * @desc set Event listener to custom event sectionClickedEvent.
     * Check if the event is triggered because of a section is
     * opened or closed and update the sectionIndex property if needed.
     */

  setEventListeners() {
    this.accordionNode.addEventListener('sectionClickedEvent', (e) => {
      const { sectionIndex, opened } = e.detail;

      if (opened) {
        if (this.openedSection !== undefined) {
          this.sections[this.openedSection].toggleContentDisplay();
        }

        this.openedSection = sectionIndex;
      } else if (this.openedSection === sectionIndex) {
        this.openedSection = undefined;
      }
    }, false);
  }
}

export default AccordionComponent;
