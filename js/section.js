

class SectionComponent {
  /**
     *
     * @costructor
     * @param {parentNode} Html Node where the section is going to be appended
     * @param {config} Object Configuration object for each section
     * @param {index} Number index of the section (optional)
     */
  constructor(parentNode, { title, content, url }, index) {
    // reference to the parent node
    this.parentNode = parentNode;

    // index of the section on the parent node
    this.index = index;

    // the URL to fetch content from
    this.url = url;

    // track the state of the section
    this.isOpened = false;

    // reference to the content node
    this.contentNode = undefined;

    // reference to the section header node
    this.sectionHeaderNode = undefined;

    this.renderSectionComponent(content, title);

    this.setEventListeners();
  }

  /**
     *
     * @desc Renders the Section Component. It creates each DOM element needed and
     * add corresponding clases.
     * Then attach the section to its Parent Component
     * @param {content} String String with the content of the section
     * @param {title} String String with the title of the section
     *
     */
  renderSectionComponent(content, title) {
    // creates elements based on given markup
    const dtNode = document.createElement('dt');
    dtNode.innerText = title;
    const ddNode = document.createElement('dd');
    const pNode = document.createElement('p');
    const contentNode = document.createTextNode(content);

    // appends elements
    pNode.appendChild(contentNode);
    ddNode.appendChild(pNode);
    // store references
    this.contentNode = ddNode;
    this.sectionHeaderNode = dtNode;

    // addClasses
    this.sectionHeaderNode.classList.add('AccordionComponent-sectionTitle');
    this.contentNode.classList.add('AccordionComponent-sectionContent');
    this.contentNode.classList.add('AccordionComponent-sectionContent--hideContent');

    this.parentNode.appendChild(this.sectionHeaderNode);
    this.parentNode.appendChild(this.contentNode);
  }

  /**
     *
     * @desc Handle the click event on the section header
     * It check if we need to fetch data from the URL,
     * then toggle the content and triggers the event
     */

  setEventListeners() {
    this.sectionHeaderNode.addEventListener('click', () => {
      if (this.url && !this.asyncContentLoaded) {
        this.fetchContentData();
      }
      this.toggleContentDisplay();
      this.dispatchCustomEvent();
    });
  }

  /**
     *
     * @desc Fetch data from the URL and updates the content based on the response
     *
     */

  fetchContentData() {
    const loadingText = document.createTextNode('Loading content...');
    this.contentNode.appendChild(loadingText);

    fetch(this.url)
      .then(response => response.json())
      .then((json) => {
        const asyncContent = document.createTextNode(json.title);
        this.contentNode.removeChild(loadingText);
        this.contentNode.appendChild(asyncContent);
        this.asyncContentLoaded = true;
      });
  }

  /**
     *
     * @desc Add the corresponding classes to hide the content
     * of the section and update the section header.
     * Also updates the isOpened property
     *
     */

  toggleContentDisplay() {
    if (this.isOpened) {
      this.contentNode.classList.add('AccordionComponent-sectionContent--hideContent');
      this.sectionHeaderNode.classList.remove('AccordionComponent-sectionTitle--active');
      this.isOpened = false;
    } else {
      this.sectionHeaderNode.classList.add('AccordionComponent-sectionTitle--active');
      this.contentNode.classList.remove('AccordionComponent-sectionContent--hideContent');
      this.isOpened = true;
    }
  }

  /**
     *
     * @desc Dispatch a custom event on the parent element to notify of changes on the section
     *
     */

  dispatchCustomEvent() {
    const sectionClickedEvent = new CustomEvent('sectionClickedEvent', {
      detail: {
        sectionIndex: this.index,
        opened: this.isOpened,
      },
    });

    this.parentNode.dispatchEvent(sectionClickedEvent);
  }
}

export default SectionComponent;
