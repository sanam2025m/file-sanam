
    document.getElementById("reportForm").addEventListener("submit", async function(e) {
      e.preventDefault();

      const formData = new FormData();
      formData.append("location", document.getElementById("location").value);
      formData.append("fullName", document.getElementById("fullName").value);
      formData.append("incidentDate", document.getElementById("incidentDate").value);
      formData.append("startTime", document.getElementById("startTime").value);
      formData.append("description", document.getElementById("description").value);
      formData.append("endTime", document.getElementById("endTime").value);
      formData.append("clientNotified", document.getElementById("clientNotified").value);
      formData.append("clientInstruction", document.getElementById("clientInstruction").value);

      const files = document.getElementById("attachments").files;
      formData.append("fileCount", files.length);

      const readFileAsBase64 = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(",")[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      };

      for (let i = 0; i < files.length; i++) {
        const base64 = await readFileAsBase64(files[i]);
        formData.append("file" + i, base64);
        formData.append("name" + i, files[i].name);
        formData.append("type" + i, files[i].type);
      }

      const response = await fetch("https://script.google.com/macros/s/AKfycbxoPbgexRFG32Yk9s8daQ0bgTV-45_wkiyqaF8IuQv7TXHF6-RlsQOEAcxJtBCLdqz3/exec", {
        method: "POST",
        body: formData
      });

      const result = await response.text();
      document.getElementById("response").innerText = result;
      document.getElementById("reportForm").reset();
    });
  