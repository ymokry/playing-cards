const accumulateElements = <Content, ContentKey extends keyof Content>(
  content: Content,
  elementType: ContentKey,
  newElement: Content[ContentKey]
): Content => {
  if (!content[elementType]) {
    content[elementType] = newElement;
  } else if (Array.isArray(content[elementType])) {
    content[elementType].push(newElement);
  } else {
    content[elementType] = [
      content[elementType],
      newElement,
    ] as Content[ContentKey];
  }

  return content;
};

export default accumulateElements;
