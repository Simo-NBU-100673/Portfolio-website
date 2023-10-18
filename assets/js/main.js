/*========================== THEME ===========================*/
const DARK_MODE = 'dark_mode';
let darkMode = localStorage.getItem(DARK_MODE);
const darkModeToggle = document.querySelector('#dark__mode__toggle__button');
const darkModeIcon = darkModeToggle.querySelector('i');

const enableDarkMode = () => {
    document.body.classList.add(DARK_MODE);
    localStorage.setItem(DARK_MODE, 'enabled');
    darkModeIcon.classList.replace('uil-sun', 'uil-moon')
}

const disableDarkMode = () => {
    document.body.classList.remove(DARK_MODE);
    localStorage.setItem(DARK_MODE, null);
    darkModeIcon.classList.replace('uil-moon', 'uil-sun')
}

window.onload = () => {
    if (darkMode === 'enabled') {
        enableDarkMode();
    }
}
darkModeToggle.addEventListener('click', () => {
    darkMode = localStorage.getItem(DARK_MODE);
    if (darkMode !== 'enabled') {
        enableDarkMode();
    } else {
        disableDarkMode();
    }
});


/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/*===== MENU SHOW =====*/
/* Validate if constant exists */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/*===== MENU HIDDEN =====*/
/* Validate if constant exists */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}

navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== ACCORDION SKILLS ====================*/
const skillGroups = document.querySelectorAll('.skills__content');

window.onload = () => {
    const lastOpenedSkillGroupName = localStorage.getItem('open_skill_group');

    skillGroups.forEach((skillsGroup) => {
        let skillsProficiencyMap = generateSkillsProficiencyMap(skillsGroup);
        let skillsGroupName = getSkillsGroupName(skillsGroup);

        if(lastOpenedSkillGroupName !== null && lastOpenedSkillGroupName === skillsGroupName){
            openSkillsGroup(skillsGroup, skillsProficiencyMap);
        }

        let skillsGroupHeader = getSkillsGroupHeader(skillsGroup);

        skillsGroupHeader.addEventListener('click',()=>{
            let isOpen = isGroupOpen(skillsGroup)

            skillGroups.forEach((group)=>{
                let skillsProficiencyMap = generateSkillsProficiencyMap(group);
                closeSkillsGroup(group, skillsProficiencyMap);
            })

            if(!isOpen){
                openSkillsGroup(skillsGroup, skillsProficiencyMap);
            }


        })

    });
}

//MapBuilding method
//Must be given one SkillGroup
function generateSkillsProficiencyMap(skillsGroup) {
    const skills = skillsGroup.querySelectorAll('.skills__data');
    const skillsProficiencyMap = new Map();

    skills.forEach((skill) => {
        const percentageBar = skill.querySelector('.skills__percentage');
        const percent = parseInt(skill.querySelector('.skills__number').textContent.replace('%', ''));
        skillsProficiencyMap.set(percentageBar, percent);
    });

    return skillsProficiencyMap;
}

//function that return whether the group is open
function isGroupOpen(skillsGroup){
    return skillsGroup.classList.contains('skills__open');
}

//function that opens a Group of skills
// 1. Sets in the local storage the state of the group to 'open'
// 2. Changes the class of the group to 'skills__open'
// 3. Sets the width of the percentage bar to the value of the percentage
function openSkillsGroup(skillsGroup, skillsProficiencyMap) {
    let skillsGroupName = getSkillsGroupName(skillsGroup);

    localStorage.setItem('open_skill_group', skillsGroupName);

    skillsGroup.classList.remove('skills__close');
    skillsGroup.classList.add('skills__open');

    setPercentageBarWidth(skillsProficiencyMap);
}

//function that closes a Group of skills
// 1. Sets in the local storage the state of the group to 'close'
// 2. Changes the class of the group to 'skills__close'
// 3. Sets the width of the percentage bar to 0
function closeSkillsGroup(skillsGroup, skillsProficiencyMap) {
    localStorage.setItem('open_skill_group', null);

    skillsGroup.classList.add('skills__close');
    skillsGroup.classList.remove('skills__open');

    resetPercentageBarWidth(skillsProficiencyMap);
}

//function that STARTS the ANIMATION
// 1. (sets the width of the percentage bar to the value of the percentage)
function setPercentageBarWidth(skillsProficiencyMap) {
    skillsProficiencyMap.forEach((value, key) => {
        key.style.width = value + '%';
    });
}

//function that RESETS the ANIMATION
// 1. sets the width of the percentage bar to 0
function resetPercentageBarWidth(skillsProficiencyMap) {
    skillsProficiencyMap.forEach((value, key) => {
        key.style.width = 0 + '%';
    });
}

//function that gets the skillsGroup HTML element which name is passes as parameter
function getSkillsGroupByName(groupName){
    let skillGroup;

    skillGroups.forEach((skillsGroup)=>{
        let skillsGroupName = getSkillsGroupName(skillsGroup);

        if(groupName === skillsGroupName){
            skillGroup = skillsGroup;
        }
    })

    return skillGroup;
}

//function that return skillGroupName as parameter accepts a skillsGroup
function getSkillsGroupName(skillsGroup){
    let skillsGroupHeader = getSkillsGroupHeader(skillsGroup);
    return skillsGroupHeader.textContent;
}

//gets the header of skillsGroup
function getSkillsGroupHeader(skillsGroup){
    return skillsGroup.querySelector('.skills__header');
}

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}

window.addEventListener('scroll', scrollActive)

/*==================== CHANGE BACKGROUND HEADER ====================*/
function scrollHeader() {
    const nav = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) nav.classList.add('scroll-header'); else nav.classList.remove('scroll-header')
}

window.addEventListener('scroll', scrollHeader)

/*==================== SHOW SCROLL UP ====================*/
function scrollUp() {
    const scrollUp = document.getElementById('scroll-up');
    // When the scroll is higher than 650 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if (this.scrollY >= 650) scrollUp.classList.add('show-scroll'); else scrollUp.classList.remove('show-scroll')
}

window.addEventListener('scroll', scrollUp)
