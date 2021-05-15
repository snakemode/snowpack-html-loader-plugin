const loader = (fileContents) => {
    const container = document.createElement("div");
    container.innerHTML = fileContents;

    const templateMerge = (dataObject, sourceNode, bindingAttribute) => {
        const targetNode = sourceNode.cloneNode(true);
        const props = Object.getOwnPropertyNames(dataObject);

        props.forEach(prop => {
            targetNode.querySelectorAll(`[${bindingAttribute}="${prop}"]`).forEach(ele => {
                ele.innerHTML = dataObject[prop];
            });
        });

        return targetNode;
    }

    const asModules = [...container.childNodes].map(template => {
        const markup = (template.innerHTML || "").trim();
        const content = template.content;
        const merge = (dataObject, bindingAttribute = "data-bind") => {
            return templateMerge(dataObject, content, bindingAttribute);
        };

        return { markup, template, content, merge };
    }).filter(item => item.markup != "");

    asModules.getById = (templateId) => {
        return asModules.filter(mod => { return mod.template.id === templateId })[0];
    }

    return asModules.length === 1 ? asModules[0] : asModules;
}

module.exports = loader;