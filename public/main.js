const electron = require("electron");
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const path = require("path");
const isDev = require("electron-is-dev");
var url = require('url');
const ipcMain = electron.ipcMain;
let mainWindow;


const storage = require("electron-json-storage");

function main() {
  createWindow();
  run_alarms();
}
var last_ran = 0;
var rung_alarms = {};

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 425,
    height: 700,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  mainWindow.loadURL(
    isDev ?
    "http://localhost:3000" :
    `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.setMenuBarVisibility(false);
  mainWindow.setTitle("Note Taker");
  mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", main);
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
  // run_alarms();
});

ipcMain.on("make-new-note", (event, arg) => {
  var current_date = new Date().getTime();
  if (last_ran != 0 && current_date - last_ran < 100) return;
  var test1 = new BrowserWindow({
    width: 525,
    // height: 520,
    height: 500,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      enableRemoteModule: true,
    },
  });
  // test1.loadURL(
  //   isDev ?
  //   "http://localhost:3000/make-note" :
  //   `file://${path.join(__dirname, "../build/index.html")}`
  // );
  var note_url = '';
  if (isDev) {
    note_url = url.format({
      protocol: 'http:',
      host: `localhost:3000/?make-note`,
      slashes: true
    })
  } else {
    // note_url = url.format({
    //   protocol: 'file',
    //   pathname: `file://${path.join(__dirname, "../build/index.html")}`,
    //   slashes: false
    // }) + '#note-taker';
    note_url = `file://${path.join(__dirname, "../build/index.html")}#=make-note`;
  }
  console.log(note_url)
  test1.loadURL(
    note_url
    // isDev ?
    //  :
    // `file://${path.join(__dirname, "../build/index.html")}`
  );
  test1.setMenuBarVisibility(false);
  test1.setTitle("Note Taker");
  test1.on("closed", () => (test1 = null));
  last_ran = current_date;
});

function run_alarms() {
  clearInterval();
  const storage = require("electron-json-storage");
  const {
    Notification
  } = require("electron");
  const format_time = (date) => {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    return strTime;
  };
  setInterval(() => {
    storage.get("alarms", function (error, data) {
      if (error) throw error;
      let current_time = new Date();
      if (data.alarms !== undefined) {
        data.alarms.forEach((item) => {
          var date = new Date(item);
          var set_formatted_date = format_time(date);
          var current_formatted_date = format_time(current_time);
          if (
            set_formatted_date == current_formatted_date &&
            !rung_alarms[set_formatted_date]
          ) {
            var caps = set_formatted_date.toUpperCase();
            const notification_js = {
              title: caps,
              body: `You have an alarm set for ${caps}`,
            };
            new Notification(notification_js).show();
            rung_alarms[set_formatted_date] = true;
          } else if (
            set_formatted_date != current_formatted_date &&
            run_alarms[set_formatted_date]
          ) {
            rung_alarms[set_formatted_date] = false;
          }
        });
      }
    });
  }, 1000);
}