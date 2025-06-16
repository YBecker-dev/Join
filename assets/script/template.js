//test
let contacts = [
  { name: 'John Doe', initials: 'JD' },
  { name: 'Jane Smith', initials: 'JS' },
  { name: 'Alice Johnson', initials: 'AJ' },
  { name: 'Bob Brown', initials: 'BB' },
];

function renderJoinFramework(){// test 
  document.body.innerHTML =      
        `

         <header>
            <div class="header-content">
              <p>Kanban Project Management Tool</p>
              <div class="header-user">
                <img src="../img/icon/header_user_interface/help.png" alt="help" />
                <p class="user">SM</p>
              </div>
            </div>
          </header> 

           <main id="main-content" class="main-content"></main>

        <div class="sidebar">
          <div class="sidebar-links-section">
            <div class="sidebar-logo">
              <img src="../img/Logo/Logo_white.png" alt="Logo" />
            </div>
            <a class="sidebar-links" href="#" onclick="loadContent('summary_user.html')">
              <img src="../img/icon/tasks_icon/summary.png" alt="" />Summary</a
            >
            <a class="sidebar-links" href="#" onclick="loadContent('add_task.html')">
              <img src="../img/icon/tasks_icon/add_task.png" alt="" />Add Task</a
            >
            <a class="sidebar-links" href="#" onclick="loadContent('board.html')">
              <img src="../img/icon/tasks_icon/board.png" alt="" />Board</a
            >
            <a class="sidebar-links" href="#" onclick="loadContent('contacts.html')">
              <img src="../img/icon/tasks_icon/contacts.png" alt="" />Contacts</a
            >
          </div>
          <div class="sidebar-legal-stuff">
            <a href="#" onclick="loadContent('privacy-policy.html')">Prvacy Police</a>
            <a href="#" onclick="loadContent('legal-notice.html')">Legal Notice</a>
          </div>
        </div>

        <script src="../script/template.js"></script>
        <script src="../script/templates.js"></script>
        <script src="../script/main.js"></script>
        <script src="../script/add_task.js"></script>
        <script src="../script/contacts.js"></script>
  
  `
}