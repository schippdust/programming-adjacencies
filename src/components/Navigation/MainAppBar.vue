<script setup lang="ts">
import { useIoStore } from "@/stores/ioStore";
import { saveAs } from "file-saver";
const ioStore = useIoStore();

function saveStateAsJson() {
  console.log("trying to save state");
  let saveData = ioStore.getSaveDataAsJson();
  let blob = new Blob([saveData], { type: "application/json" });
  saveAs(blob, "test save.json");
}

//load file detects when the visible button was clicked and clicks the invisible input
function loadFile() {
  console.log(document.getElementById("file-input"));
  document.getElementById("file-input")?.click();
  console.log("load files was clicked");
}

//when the input changes this function will be called
function activateOpenedFiles(event: any) {
  try {
    if (event.target.files.length > 0) {
      let file = event.target.files[0] as File;
      console.log("activating opened files", event);
      let reader = new FileReader();
      reader.addEventListener("load", function () {
        let result = reader.result as string;
        ioStore.readSaveDataFromJson(JSON.parse(result));
      });
      reader.readAsText(file);
    }
  } catch {
    console.log("failed to read the file");
  }
}

// function activateOpenedFiles(){
//   console.log('activate opened files called');
//   let reader = new FileReader();

// }
</script>

<template>
  <v-app-bar
    color=""
    density="compact"
    flat
    style="border-bottom: solid 0.5px lightgrey"
  >
    <v-toolbar-title>Programming and Adjacencies</v-toolbar-title>

    <p class="text-caption mb-n3 mr-4">v0.1</p>

    <v-btn variant="outlined" class="mx-1" @click="saveStateAsJson()">
      <v-icon size="x-large" class="mx-n5 px-n4"
        >mdi-content-save-outline</v-icon
      >
    </v-btn>
    <v-btn variant="outlined" class="mx-1" @click="loadFile()">
      <v-icon size="x-large">mdi-folder-open-outline</v-icon>
    </v-btn>
    <input
      @change="activateOpenedFiles($event)"
      id="file-input"
      type="file"
      name="name"
      style="display: none"
    />
  </v-app-bar>
</template>
