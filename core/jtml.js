const testData = '[{"html":{"children":[{"head":{"children":[{"title":"Test Page"}]}},{"body":{"id":"root","children":[{"h1":{"class":"title","text":"Hello World!"}}]}}]}}]'

function convertToObject(str) {
  try {
    return(JSON.parse(str))
  } catch {
    throw new Error("String isn't valid JSON file!")
  }
}

function createTag(obj) {
  const [tag, content] = Object.entries(obj)[0]
  if (!tag) return

  const el = document.createElement(tag)

  if (typeof content === "string") {
    el.innerText = content
  } else {
    for (const attr of Object.keys(content)) {
      if (attr === "children") {
        for (const child of content[attr])
        el.appendChild(createTag(child))
      } else if (attr === "text") {
        el.innerText = content[attr]
      } else {
        el.setAttribute(attr, content[attr])
      }
    }
  }

  return el
}

function updatePage() {
  const data = convertToObject(testData)
  const root = data.map(el => createTag(el))
  document.documentElement.replaceWith(root[0])
}