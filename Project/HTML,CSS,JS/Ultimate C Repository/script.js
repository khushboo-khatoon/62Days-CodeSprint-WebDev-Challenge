// Primary framework configuration pairing UI layouts to curriculum folders
const topicsData = {
    "Core Foundations": {
        mdFile: "Core Foundations Overview.md",
        subtopics: [
            { name: "Variables", path: "Variables" },
            { name: "Input and Output Functions", path: "Input and Output Functions" },
            { name: "Operators", path: "Operators", preferredOrder: ["Bitwise Operators", "Conditional Operator", "Logical Operators", "Examples", "addressof (&) Operator.c", "Comma (,) Operator.c", "Relational Operators.c", "sizeof() Operator.c"] },
            { name: "Type Conversion", path: "Type Conversion" },
            { name: "Preprocessor Directives and Macros", path: "Preprocessor Directives and Macros" }
        ]
    },
    "Control Flow": {
        mdFile: "Control Flow Overview.md",
        subtopics: [
            { name: "Conditional Statements", path: "Conditional Statements", preferredOrder: ["Examples", "if-else statement.c", "Nested if statement.c", "switch-case statement.c"] },
            { name: "Looping Statements", path: "Looping Statements", preferredOrder: ["Examples", "for loop.c", "while loop.c", "do-while loop.c", "Nested loop.c"] },
            { name: "Jumping Statements", path: "Jumping Statements" }
        ]
    },
    "Data Structures and Memory": {
        mdFile: "Data Structures and Memory Overview.md",
        subtopics: [
            { name: "Arrays", path: "Arrays" },
            { name: "Strings", path: "Strings", preferredOrder: ["Examples", "Arrays of strings.c", "Print strings.c", "strcat() - Concatenates strings.c", "strcmp() - Compares strings.c", "strcpy() - Copies 2nd string to 1st.c", "strlen() - Returns length of string.c", "strlwr() - Converts string to lower case.c", "strrev() - Reverses string.c", "strupr() - Converts string to upper case.c"] },
            { name: "Functions", path: "Functions", preferredOrder: ["Recursion", "Examples", "Functions.c", "Call by value.c", "Call by reference.c", "Call array by value.c", "Function with arguments and no return values.c", "Function with arguments and return values.c", "Nested Functions.c", "Passing direct values in function call.c"] },
            { name: "Pointers", path: "Pointers", preferredOrder: ["Pointer Arithmetic", "Pointers and Arrays", "Pointers and Strings", "Pointers.c", "Accessing variables using pointers.c", "Double pointer.c", "Incrementing a Pointer.c", "Modifying variables using pointers.c", "Pointer pointing to another pointer.c"] },
            { name: "Dynamic Memory Allocation", path: "Dynamic Memory Allocation", preferredOrder: ["Examples", "malloc().c", "calloc().c", "realloc().c"] },
            { name: "File Handling", path: "File Handling" }
        ]
    },
    "Advanced Data Structures and Algorithms": {
        mdFile: "Advanced Data Structures and Algorithms Overview.md",
        subtopics: [
            { name: "Structures", path: "Structures", preferredOrder: ["Arrays of Structures", "Passing Structures to Functions", "Structures with Pointers", "Structures.c", "Copying elements of structure to another structure.c", "Create structure using typedef keyword.c", "Nested Structures.c"] },
            { name: "Unions", path: "Unions" },
            { name: "Linked Lists", path: "Linked Lists", preferredOrder: ["Singly Linked List", "Doubly Linked List", "Circular Linked List"] },
            { name: "Stacks", path: "Stacks", preferredOrder: ["Examples", "Stack Representation using Array.c", "Stack Representation Using Structures with typedef.c", "push().c", "pop().c", "peek().c", "isFull() - isEmpty().c", "Print elements of stack.c"] },
            { name: "Queues", path: "Queues", preferredOrder: ["Simple Queue", "Circular Queues", "Priority Queue.c"] },
            { name: "Trees", path: "Trees", preferredOrder: ["Binary Tree", "Binary Search Tree", "Trees.md"] },
            { name: "Graphs", path: "Graphs" },
            { name: "Searching and Sorting", path: "Searching and Sorting" }
        ]
    },
    "General Examples": {
        mdFile: "Examples Overview.md",
        subtopics: [
            { name: "General Examples", path: "Examples" }
        ]
    }
};

const subtopicTitle = document.getElementById('current-subtopic-title');
const programsContainer = document.getElementById('programs-container');
const sidebarTreeWrapper = document.getElementById('sidebar-tree-wrapper');

let globalRepositoryTreeFlatArray = [];

document.addEventListener('DOMContentLoaded', async () => {
    buildDropdownMenus();
    setupInlineContentLinks();
    setupParentTopicLinks();
    await initializeRepositoryTreeMap();
    checkUrlHashRoute();
});

async function initializeRepositoryTreeMap() {
    try {
        const response = await fetch('tree_manifest.json');
        if (!response.ok) throw new Error("Could not find tree_manifest.json");
        globalRepositoryTreeFlatArray = await response.json();
    } catch (err) {
        console.error("Blueprint layout generation loading exception:", err);
    }
}

function buildDropdownMenus() {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        const topicKey = menu.getAttribute('data-topic');
        const topic = topicsData[topicKey];
        if (!topic) return;
        const subList = topic.subtopics || [];

        subList.forEach(sub => {
            const li = document.createElement('li');
            li.className = 'dropdown-item';
            li.textContent = sub.name;
            li.addEventListener('click', (e) => {
                e.stopPropagation();
                window.location.hash = `${encodeURIComponent(topicKey)}:${encodeURIComponent(sub.path)}`;
            });
            menu.appendChild(li);
        });
    });
}

function setupInlineContentLinks() {
    document.querySelectorAll('.page-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const parentTopic = link.getAttribute('data-parent');
            const targetPath = link.getAttribute('data-path');
            window.location.hash = `${encodeURIComponent(parentTopic)}:${encodeURIComponent(targetPath)}`;
        });
    });
}

function setupParentTopicLinks() {
    document.querySelectorAll('.nav-topic-title').forEach(titleSpan => {
        titleSpan.addEventListener('click', () => {
            const topicKey = titleSpan.getAttribute('data-topic');
            window.location.hash = `${encodeURIComponent(topicKey)}:all`;
        });
    });
}

function updateBrowserTabTitle(viewName) {
    document.title = `${viewName} | ⚙️ Ultimate C Repository`;
}

async function checkUrlHashRoute() {
    const currentHash = window.location.hash.replace('#', '');
    if (!currentHash) {
        document.title = "Ultimate C Repository";
        return; 
    }

    if (currentHash.startsWith('section_')) {
        const element = document.getElementById(currentHash);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        } else {
            setTimeout(() => {
                const retryElement = document.getElementById(currentHash);
                if (retryElement) retryElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 300);
        }
        return;
    }

    const segments = currentHash.split(':');
    if (segments.length !== 2) return;

    const topicKey = decodeURIComponent(segments[0]);
    const routeTarget = decodeURIComponent(segments[1]);

    if (!topicsData[topicKey]) return;

    if (routeTarget === 'all') {
        await triggerParentTopicLoad(topicKey);
    } else {
        const sub = topicsData[topicKey].subtopics.find(s => s.path === routeTarget);
        if (sub) {
            // Ensure Overview.md renders first (and is labeled as Overview in the sidebar)
            await triggerContentLoad(topicKey, sub);
        }
    }
}

window.addEventListener('hashchange', checkUrlHashRoute);

async function triggerParentTopicLoad(topicKey) {
    updateBrowserTabTitle(topicKey);
    document.getElementById('main-split-layout').classList.remove('home-view');
    subtopicTitle.textContent = topicKey;
    programsContainer.innerHTML = '<p class="placeholder-text">Rendering overview streams...</p>';
    sidebarTreeWrapper.innerHTML = '';

    const parentObj = topicsData[topicKey];
    const rootUL = document.createElement('ul');
    rootUL.className = 'sidebar-list';
    sidebarTreeWrapper.appendChild(rootUL);

    if (parentObj.mdFile) {
        const safeId = generateSafeElementId(parentObj.mdFile);
        const sideLI = document.createElement('li');
        sideLI.className = 'sidebar-item';
        sideLI.innerHTML = `<a href="#${safeId}" class="sidebar-sub-link" style="color: #f5d742;">📖 ${topicKey} Overview</a>`;
        rootUL.appendChild(sideLI);

        programsContainer.innerHTML = ''; 
        await fetchAndRenderCode(parentObj.mdFile, parentObj.mdFile, programsContainer, safeId);
    } else {
        programsContainer.innerHTML = '';
    }

    for (const sub of parentObj.subtopics) {
        const parentSafeId = generateSafeElementId(sub.path);
        const masterLI = document.createElement('li');
        masterLI.className = 'sidebar-item';
        masterLI.style.marginTop = "1rem";

        const headerRow = document.createElement('div');
        headerRow.className = 'sidebar-header-row';

        // Left sidebar label requirement:
        // For each subtopic's md overview file, show: "(md filename) Overview".
        const folderOverviewMdName = `${sub.path}.md`;
        const folderOverviewCleanName = cleanDisplayName(folderOverviewMdName);
        // Ensure the divider is the folder overview content/header, not the subfolder label.
            headerRow.innerHTML = `<span class="arrow-icon expanded">▼</span><a href="#${parentSafeId}" class="sidebar-link" style="color: #ffffff;">📚 ${folderOverviewCleanName}</a>`;



        const subUL = document.createElement('ul');
        subUL.className = 'sidebar-nested-sublist show';

        headerRow.addEventListener('click', (e) => {
            const arrow = headerRow.querySelector('.arrow-icon');
            if (arrow) arrow.classList.toggle('expanded');
            subUL.classList.toggle('show');
            window.location.hash = parentSafeId;
        });

        const interiorLink = headerRow.querySelector('.sidebar-link');
        if (interiorLink) {
            interiorLink.addEventListener('click', (e) => {
                e.preventDefault();
            });
        }

        masterLI.appendChild(headerRow);
        masterLI.appendChild(subUL);
        rootUL.appendChild(masterLI);

        const subTopicDivider = document.createElement('h2');
        subTopicDivider.id = parentSafeId;
        subTopicDivider.className = 'nested-folder-title';
        subTopicDivider.style.fontSize = '1.6rem';
        subTopicDivider.style.borderBottom = '3px solid #f5d742';
        subTopicDivider.textContent = `${sub.name}`;
        programsContainer.appendChild(subTopicDivider);

        const containerWrapper = document.createElement('div');
        programsContainer.appendChild(containerWrapper);

        await resolveAndBuildContent(sub.path, containerWrapper, subUL, sub.preferredOrder || []);
    }
}

async function triggerContentLoad(topicKey, subtopicObj) {
    updateBrowserTabTitle(subtopicObj.name);
    document.getElementById('main-split-layout').classList.remove('home-view');
    subtopicTitle.textContent = `${topicKey} ➔ ${subtopicObj.name}`;
    programsContainer.innerHTML = '<p class="placeholder-text">Rendering resources...</p>';
    sidebarTreeWrapper.innerHTML = '';
    
    const rootUL = document.createElement('ul');
    rootUL.className = 'sidebar-list';
    sidebarTreeWrapper.appendChild(rootUL);

    programsContainer.innerHTML = '';
    await resolveAndBuildContent(subtopicObj.path, programsContainer, rootUL, subtopicObj.preferredOrder || []);
}

function cleanDisplayName(rawName) {
    return rawName.replace(/\.(c|md|png|jpg|jpeg)$/i, '').replace(/^\d+_/g, '');
}

function getSectionHeadingForFile(filePath, fileName) {
    const cleanName = cleanDisplayName(fileName);
    return cleanName;
}

function generateSafeElementId(rawString) {
    return 'section_' + rawString.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
}

async function resolveAndBuildContent(folderPath, targetContainer, currentSidebarUL, preferredOrder = []) {
    const prefix = folderPath + "/";

    // Immediate children inside this folder (excluding nested folders)
    let immediateContents = globalRepositoryTreeFlatArray.filter(item => {
        if (!item.path.startsWith(prefix)) return false;
        const relativePart = item.path.substring(prefix.length);
        return !relativePart.includes('/');
    });

    // Ensure the folder-level overview markdown (e.g., Queues/Queues.md) is always rendered.
    // Some folders contain many .c files and the current flattening/grouping heuristics can cause the
    // folder overview md to not appear consistently in the visible stream.
    const folderOverviewMd = `${folderPath}.md`;
    const overviewItem = immediateContents.find(i => i.type === 'blob' && i.path === `${prefix}${folderOverviewMd}`);
    if (overviewItem) {
        // Move overview markdown to the front so it consistently renders first.
        immediateContents = [overviewItem, ...immediateContents.filter(i => i !== overviewItem)];

        // Also bias sorting if preferredOrder is provided.
        if (!preferredOrder.length) preferredOrder = [];
        const overviewCleanName = cleanDisplayName(overviewItem.path.split('/').pop());
        if (!preferredOrder.includes(folderOverviewMd) && !preferredOrder.includes(overviewCleanName)) {
            preferredOrder = [folderOverviewMd, overviewCleanName, ...preferredOrder];
        }
    }


    if (preferredOrder.length > 0) {
        immediateContents.sort((a, b) => {
            const nameA = a.path.split('/').pop();
            const nameB = b.path.split('/').pop();
            const cleanA = cleanDisplayName(nameA);
            const cleanB = cleanDisplayName(nameB);

            let idxA = preferredOrder.findIndex(r => r === nameA || r === cleanA);
            let idxB = preferredOrder.findIndex(r => r === nameB || r === cleanB);

            if (idxA !== -1 && idxB !== -1) return idxA - idxB;
            if (idxA !== -1) return -1;
            if (idxB !== -1) return 1;
            return nameA.localeCompare(nameB);
        });
    }

    // If there's a .md file in this folder, skip standalone .png blobs (they're embedded in the markdown)
    const hasMarkdown = immediateContents.some(i => i.type === "blob" && i.path.toLowerCase().endsWith('.md'));
    
    // Ensure folder-level overview `.md` files always appear before other items (dropdown + contents stream).
    // This applies to nested subfolders too.
    immediateContents = immediateContents.slice().sort((a, b) => {
        const aName = a.path.split('/').pop();
        const bName = b.path.split('/').pop();
        const aIsMd = a.type === 'blob' && aName.toLowerCase().endsWith('.md');
        const bIsMd = b.type === 'blob' && bName.toLowerCase().endsWith('.md');
        if (aIsMd && !bIsMd) return -1;
        if (!aIsMd && bIsMd) return 1;
        return 0;
    });

    // Reorder: if a folder has a folder-level Overview md (e.g. Arrays/Arrays Overview.md)
    // then render any `.c` files containing the keyword `Initialization` immediately after it.
    // This affects both the sidebar list order and the main body render order for that folder.
    const initKeywordC = immediateContents.filter(i => i.type === 'blob' && i.path.toLowerCase().endsWith('.c') && i.hasInitialization === true);
    if (initKeywordC.length > 0) {
        const folderOverviewItem = immediateContents.find(i => i.type === 'blob' && i.path === `${prefix}${folderOverviewMd}`);
        const fallbackOverviewItem = immediateContents.find(i => i.type === 'blob' && i.path.toLowerCase().endsWith('.md'));
        const overviewMd = folderOverviewItem || fallbackOverviewItem;

        if (overviewMd) {
            const overviewMdIndex = immediateContents.findIndex(i => i === overviewMd);
            const before = immediateContents.slice(0, overviewMdIndex + 1);
            const after = immediateContents
                .slice(overviewMdIndex + 1)
                .filter(i => !(i.type === 'blob' && i.path.toLowerCase().endsWith('.c') && i.hasInitialization === true));

            // Ensure all Initialization-* .c files move right after the Overview
            // without dropping any non-init items.
            immediateContents = [...before, ...initKeywordC, ...after];
        }
    }

    // If we have any Initialization .c files, ensure they are present in BOTH:
    // 1) the sidebar list for this folder
    // 2) the main programs container render stream
    //
    // The loop below already renders items into BOTH containers based on `immediateContents`.
    // So by reordering `immediateContents` above, we guarantee correct placement across
    // both containers for topic pages and nested subtopic pages.


    for (const item of immediateContents) {

        const itemRealName = item.path.split('/').pop();
        const safeId = generateSafeElementId(item.path);
        const displayName = cleanDisplayName(itemRealName);


        if (item.type === "blob") { 
            const lowerName = itemRealName.toLowerCase();
            if (lowerName.endsWith('.c') || lowerName.endsWith('.md') || lowerName.endsWith('.png')) {
                
                // Skip PNGs if there's a markdown file in the same folder (images are embedded in MD)
                if (lowerName.endsWith('.png') && hasMarkdown) continue;

                const li = document.createElement('li');
                li.className = 'sidebar-item';
                li.innerHTML = `<a href="#${safeId}" class="sidebar-sub-link">📄 ${displayName}</a>`;
                currentSidebarUL.appendChild(li);

                if (lowerName.endsWith('.c') || lowerName.endsWith('.md')) {
                    await fetchAndRenderCode(itemRealName, item.path, targetContainer, safeId);
                } else if (lowerName.endsWith('.png')) {
                    renderImageBlock(itemRealName, item.path, targetContainer, safeId);
                }
            }
        } 
        else if (item.type === "tree") { 
            const internalChildren = globalRepositoryTreeFlatArray.filter(child => child.path.startsWith(item.path + "/"));
            
            // Determine if this folder has a markdown file (PNGs alongside it are embedded, so skip them)
            const hasMd = internalChildren.some(c => c.type === "blob" && c.path.toLowerCase().endsWith('.md'));
            const nonPngBlobs = internalChildren.filter(c => c.type === "blob" && !c.path.toLowerCase().endsWith('.png'));

            const shouldFlatten = 
                !item.path.endsWith('/Event Handling') &&
                ((internalChildren.length === 1 && internalChildren[0].type === "blob") ||
                (hasMd && nonPngBlobs.length === 1 && nonPngBlobs[0].type === "blob"));

            if (shouldFlatten) {
                const singleItem = hasMd ? nonPngBlobs[0] : internalChildren.find(c => c.type === "blob");
                const singleRealName = singleItem.path.split('/').pop();
                const singleSafeId = generateSafeElementId(singleItem.path);
                const singleDisplayName = cleanDisplayName(singleRealName);

                const li = document.createElement('li');
                li.className = 'sidebar-item';
                li.innerHTML = `<a href="#${singleSafeId}" class="sidebar-sub-link">📄 ${singleDisplayName}</a>`;
                currentSidebarUL.appendChild(li);

                const singleFileHeading = document.createElement('h3');
                singleFileHeading.className = 'nested-folder-title';
                singleFileHeading.id = singleSafeId;
                singleFileHeading.textContent = getSectionHeadingForFile(singleItem.path, singleRealName);
                targetContainer.appendChild(singleFileHeading);

                if (singleRealName.toLowerCase().endsWith('.c') || singleRealName.toLowerCase().endsWith('.md')) {
                    await fetchAndRenderCode(singleRealName, singleItem.path, targetContainer, singleSafeId);
                } else {
                    renderImageBlock(singleRealName, singleItem.path, targetContainer, singleSafeId);
                }
            } else {
                // Multi-program dropdown folder layout
                const masterLI = document.createElement('li');
                masterLI.className = 'sidebar-item';
                
                const headerRow = document.createElement('div');
                headerRow.className = 'sidebar-header-row';
                headerRow.style.cursor = 'pointer'; 
                headerRow.innerHTML = `<span class="arrow-icon">▶</span><a href="#${safeId}" class="sidebar-link">📁 ${displayName}</a>`;
                
                const subUL = document.createElement('ul');
                subUL.className = 'sidebar-nested-sublist';
                
                headerRow.addEventListener('click', (e) => {
                    const arrow = headerRow.querySelector('.arrow-icon');
                    if (arrow) arrow.classList.toggle('expanded');
                    subUL.classList.toggle('show');
                    window.location.hash = safeId;
                });

                const interiorLink = headerRow.querySelector('.sidebar-link');
                if (interiorLink) {
                    interiorLink.addEventListener('click', (e) => {
                        e.preventDefault();
                    });
                }

                masterLI.appendChild(headerRow);
                masterLI.appendChild(subUL);
                currentSidebarUL.appendChild(masterLI);

                const subHeading = document.createElement('h3');
                subHeading.className = 'nested-folder-title';
                subHeading.id = safeId;
                subHeading.textContent = `📁 ${displayName}`;
                targetContainer.appendChild(subHeading);

                const nestedGroupContainer = document.createElement('div');
                nestedGroupContainer.className = 'nested-group-container';
                targetContainer.appendChild(nestedGroupContainer);

                await resolveAndBuildContent(item.path, nestedGroupContainer, subUL, []);
            }
        }
    }
}

async function fetchAndRenderCode(fileName, downloadUrl, containerElement, elementId) {
    try {
        const response = await fetch(downloadUrl);
        if (!response.ok) throw new Error("File content mismatch.");
        const textData = await response.text();

        const block = document.createElement('div');
        block.className = 'program-block';
        block.id = elementId; 

    const header = document.createElement('div');
        header.className = 'program-header';

        // For markdown pages, label them in the UI as: "<md filename> Overview"
        // (This is applied to all rendered .md files.)
        if (fileName.toLowerCase().endsWith('.md')) {
            header.style.display = 'block';
            header.textContent = `${cleanDisplayName(fileName)}`;
        } else {
            header.textContent = cleanDisplayName(fileName);
        }
        block.appendChild(header);

        if (fileName.toLowerCase().endsWith('.md')) {
            const mdWrapper = document.createElement('div');
            mdWrapper.className = 'markdown-body-render';
            mdWrapper.innerHTML = marked.parse(textData);
            block.appendChild(mdWrapper);
        } else {
            const pre = document.createElement('pre');
            pre.className = "language-c"; 
            
            const code = document.createElement('code');
            code.className = "language-c";
            code.textContent = textData; 

            pre.appendChild(code);
            block.appendChild(pre);
            
            Prism.highlightElement(code);
        }

        containerElement.appendChild(block);
    } catch (err) {
        console.error(err);
    }
}

function renderImageBlock(fileName, downloadUrl, containerElement, elementId) {
    const block = document.createElement('div');
    block.className = 'program-block repo-image-block';
    block.id = elementId;
    block.style.padding = '1.5rem';
    block.style.display = 'flex';
    block.style.flexDirection = 'column';
    block.style.gap = '1rem';
    block.style.alignItems = 'center';
    block.style.borderRadius = '0';

    const header = document.createElement('div');
    header.className = 'program-header';
    header.style.width = '100%';
    header.style.margin = '-1.5rem -1.5rem 0 -1.5rem';
    header.style.padding = '0.85rem 1.5rem';
    header.textContent = cleanDisplayName(fileName);

    const img = document.createElement('img');
    img.src = downloadUrl;
    img.alt = fileName;
    img.style.maxWidth = '100%';
    img.style.height = 'auto';
    img.style.borderRadius = '0';
    img.style.border = '1px solid #1c2541';

    block.appendChild(header);
    block.appendChild(img);
    containerElement.appendChild(block);
}

// --- To Top Button ---
const toTopBtn = document.getElementById('to-top');

toTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        toTopBtn.classList.add('visible');
    } else {
        toTopBtn.classList.remove('visible');
    }
});
