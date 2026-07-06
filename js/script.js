
const projectsData = {
    'optimizador': {
        title: 'Digitalization of Operational Checklists',
        tags: ['HTML5', 'CSS3', 'Javascript'],
        images: [
            
        ],
        htmlContent: `
            <p><strong>Challenge:</strong> The production floor relied heavily on paper checklists, leading to delayed data entry, high risk of transcription errors, and a total lack of real-time visibility into operational compliance.</p>
            <p><strong>Solution:</strong> Developed a lightweight, responsive web application from scratch using vanilla JavaScript. Features included dynamic input validation to eliminate errors at the source and local storage capabilities to prevent data loss during network drops.</p>
            <p><strong>Impact:</strong></p>
            <ul>
                <li>Completely eliminated paperwork, reduced overall data entry time by 40%, and provided management with instant, real-time visibility into floor operations.</li>
            </ul>
        `
    },
    'calidad': {
        title: 'Quality Portal',
        tags: ['Python', 'Power BI'],
        images: [
            
        ],
        htmlContent: `
            <p><strong>Challenge:</strong> Quality metrics and data were scattered across multiple manufacturing plants in different formats, making it impossible for management to get a unified view or identify global systemic defects.</p>
            <p><strong>Solution:</strong> Built an automated ETL data pipeline using Python (Pandas/NumPy) to extract, clean, and consolidate disparate data sources. Modeled this unified data structure into interactive Power BI dashboards.</p>
            <p><strong>Impact:</strong></p>
            <ul>
                <li>Centralized cross-plant quality metrics into a single source of truth, enabling data-driven decision-making that ultimately reduced global defect rates by 15%.</li>
            </ul>
        `
    },
    'reporting': {
        title: 'Quality App',
        tags: ['Python', 'Power Apps'],
        images: [
            
        ],
        htmlContent: `
            <p><strong>Challenge:</strong> Reporting non-conformances and defect materials on the production line was a slow, manual process, causing critical delays in incident mitigation and containment.</p>
            <p><strong>Solution:</strong> Designed and deployed a native mobile canvas application using Power Apps. The app enables inspectors to instantly scan product barcodes, upload photographic evidence, and triggers automated alert workflows via Power Automate.</p>
            <p><strong>Impact:</strong></p>
            <ul>
                <li>Streamlined incident reporting from days to minutes, significantly reducing response times and preventing non-conforming material from advancing.</li>
            </ul>
        `
    },
    'inventario': {
        title: 'Project Management',
        tags: ['Power Apps', 'SharePoint'],
        images: [
            
        ],
        htmlContent: `
            <p><strong>Challenge:</strong> Internal projects suffered from missed deadlines and miscommunication due to fragmented tracking methods, manual approvals, and a lack of standardized workflows across departments.</p>
            <p><strong>Solution:</strong> Built an enterprise-grade Model-Driven Power App dedicated to full project lifecycle management. Integrated centralized milestone tracking, resource/budget allocation, and hierarchical Microsoft 365 approval workflows.</p>
            <p><strong>Impact:</strong></p>
            <ul>
                <li>Standardized internal project execution, significantly enhanced cross-departmental collaboration, and boosted the organization’s overall on-time project delivery rate.</li>
            </ul>
        `
    },
    'mantenimiento': {
        title: 'Training Score Card',
        tags: ['Power BI', 'SharePoint'],
        images: [
            
        ],
        htmlContent: `
            <p><strong>Challenge:</strong> Management struggled to track mandatory compliance certifications and skill matrices for a large workforce, leading to unexpected operational bottlenecks and compliance risks.</p>
            <p><strong>Solution:</strong> Developed an advanced analytical Power BI dashboard using complex DAX formulas to calculate real-time compliance percentages. Implemented conditional "traffic light" formatting to flag upcoming training expirations.</p>
            <p><strong>Impact:</strong></p>
            <ul>
                <li>Elevated mandatory staff certification compliance to 98% and empowered team leaders to proactively address skills gaps before they could negatively impact production.</li>
            </ul>
        `
    },
    'training': {
        title: 'Quality Restrains',
        tags: ['HTML5', 'CSS3', 'Javascript'],
        images: [
            
        ],
        htmlContent: `
            <p><strong>Challenge:</strong> The lack of a strict digital barrier allowed quarantined or non-conforming batches to occasionally move forward in the supply chain, creating substantial financial and quality leak risks.</p>
            <p><strong>Solution:</strong> Engineered an intuitive, high-performance web interface utilizing pure JavaScript logic to manage and lock product hold statuses. Leveraged CSS for high-visibility critical alerts and built fast-filtering features for instant batch lookups.</p>
            <p><strong>Impact:</strong></p>
            <ul>
                <li>Successfully mitigated financial risks associated with quality leaks by ensuring zero quarantined products could bypass supply chain checkpoints without a digital authorization.</li>
            </ul>
        `
    }
};

const skillsData = {
    'python': {
        title: 'Microsoft Excel',
        image: 'https://raw.githubusercontent.com/fgbonilla99-oss/portfolio-javier.github.io/refs/heads/main/img/new/excel.png',
        description: 'Proficient in leveraging Excel as a core analytical and data manipulation tool within manufacturing environments. Experienced in managing large datasets, executing complex formulas, and designing advanced Pivot Tables to track operational metrics. Skilled in transforming raw production data into clean, structured formats ready for database integration or advanced business intelligence modeling.'
    },
    'powerplatform': {
        title: 'Python',
        image: 'https://raw.githubusercontent.com/fgbonilla99-oss/portfolio-javier.github.io/refs/heads/main/img/new/colab.png',
        description: 'Experienced in using Python to bridge the gap between industrial systems and modern software solutions. Strong background in developing automated scripts and lightweight APIs to extract, clean, and transform large datasets using libraries like Pandas and NumPy. Proven capability in automating ETL processes, handling data integration pipelines, and deploying web-based tools like Streamlit to optimize manufacturing workflows and eliminate manual data handling.'
    },
    'javascript': {
        title: 'JavaScript',
        image: 'https://raw.githubusercontent.com/fgbonilla99-oss/portfolio-javier.github.io/refs/heads/main/img/new/js.png',
        description: 'Skilled in utilizing vanilla JavaScript to build responsive, dynamic, and high-performance user interfaces for industrial web applications. Experienced in developing custom logic from scratch, implementing real-time data validations, and managing client-side application states. Focused on creating clean, intuitive user experiences that streamline floor operations and ensure seamless data entry on manufacturing lines.'
    },
    'apis': {
        title: 'Power BI',
        image: 'https://raw.githubusercontent.com/fgbonilla99-oss/portfolio-javier.github.io/refs/heads/main/img/new/pbi.png',
        description: 'Expert in transforming complex, fragmented operational data into intuitive, executive-ready analytical dashboards. Highly proficient in advanced data modeling, data consolidation from multiple sources, and writing complex DAX measures to calculate real-time key performance indicators (KPIs). Experienced in delivering actionable insights that empower management to identify bottlenecks, track workforce compliance, and reduce defect rates.'
    },
    'hardware': {
        title: 'Power Automate',
        image: 'https://raw.githubusercontent.com/fgbonilla99-oss/portfolio-javier.github.io/refs/heads/main/img/new/automate.png',
        description: 'Strong track record of designing and deploying automated workflows to eliminate administrative overhead and accelerate incident response times. Experienced in connecting cloud services, databases, and custom applications to trigger instant notifications, orchestrate hierarchical approval processes, and sync data seamlessly across the Microsoft 365 ecosystem to ensure critical manufacturing events are addressed in minutes.'
    },
    'sql': {
        title: 'Github',
        image: 'https://raw.githubusercontent.com/fgbonilla99-oss/portfolio-javier.github.io/refs/heads/main/img/new/github.png',
        description: 'Proficient in utilizing GitHub for version control, code management, and collaborative software development. Experienced in applying standard Git workflows—such as branching, committing, merging, and handling pull requests—to maintain code integrity across custom web applications and automation scripts. Focused on ensuring clean, documented repositories and maintaining stable codebases for internal digital tools.'
    }
};


const projectModal = document.getElementById('project-modal');
const skillModal = document.getElementById('skill-modal');
const projectCards = document.querySelectorAll('.project-card');
const skillButtons = document.querySelectorAll('.skill-interactive-btn');

const modalProjCategory = document.getElementById('modal-project-category');
const modalProjTitle = document.getElementById('modal-project-title');
const modalProjTags = document.getElementById('modal-project-tags');
const modalProjGallery = document.getElementById('modal-project-gallery');
const modalProjDescription = document.getElementById('modal-project-description');

projectCards.forEach(card => {
    card.addEventListener('click', () => {
        const projectId = card.getAttribute('data-project');
        const data = projectsData[projectId];

        if (data) {
            modalProjCategory.textContent = data.category;
            modalProjTitle.textContent = data.title;
            modalProjDescription.innerHTML = data.htmlContent;

            modalProjTags.innerHTML = '';
            data.tags.forEach(tag => {
                const span = document.createElement('span');
                span.textContent = tag;
                modalProjTags.appendChild(span);
            });

            modalProjGallery.innerHTML = '';
            data.images.forEach(url => {
                const img = document.createElement('img');
                img.src = url;
                img.alt = `Vista de ${data.title}`;
                modalProjGallery.appendChild(img);
            });

            projectModal.classList.remove('hidden');
            projectModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    });
});


const modalSkillImg = document.getElementById('modal-skill-img');
const modalSkillTitle = document.getElementById('modal-skill-title');
const modalSkillDescription = document.getElementById('modal-skill-description');

skillButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const skillId = btn.getAttribute('data-skill');
        const data = skillsData[skillId];

        if (data) {
            modalSkillImg.src = data.image;
            modalSkillImg.alt = data.title;
            modalSkillTitle.textContent = data.title;
            modalSkillDescription.textContent = data.description;


            skillModal.classList.remove('hidden');
            skillModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        }
    });
});


const closeAllModales = () => {
    projectModal.classList.add('hidden');
    projectModal.setAttribute('aria-hidden', 'true');
    skillModal.classList.add('hidden');
    skillModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = ''; 
};


document.querySelectorAll('.modal-close').forEach(btn => {
    btn.addEventListener('click', closeAllModales);
});


document.querySelectorAll('.modal-overlay').forEach(overlay => {
    overlay.addEventListener('click', closeAllModales);
});


document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModales();
    }
});