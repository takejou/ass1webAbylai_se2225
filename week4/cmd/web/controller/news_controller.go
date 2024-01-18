package main


import (
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"strconv"
	"week4/cmd/web/models"
	"week4/cmd/web/services"
)

func GetAllNews(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodGet {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	news := services.GetAll()

	teachers := []models.News{}
	students := []models.News{}
	applicants := []models.News{}

	for i := range news {
		if news[i].Category == "TEACHER" {
			teachers = append(teachers, news[i])
		}
		if news[i].Category == "STUDENT" {
			students = append(students, news[i])
		}
		if news[i].Category == "APPLICANT" {
			applicants = append(applicants, news[i])
		}
	}

	data := map[string]interface{}{
		"Teachers":   teachers,
		"Students":   students,
		"Applicants": applicants,
	}

	ts, err := template.ParseFiles("ui/html/index.html")
	if err != nil {
		log.Fatal(err)
	}

	err = ts.Execute(w, data)
	if err != nil {
		log.Fatal(err)
	}
}

func SendNews(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var news models.News

	err := json.NewDecoder(r.Body).Decode(&news)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	services.Send(news)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("The news added successfully!"))
}

func UpdateNews(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPut {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var news models.News

	err := json.NewDecoder(r.Body).Decode(&news)

	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		log.Fatal(err.Error())
		return
	}

	paramId := r.URL.Query().Get("id")

	id, err := strconv.Atoi(paramId)

	if err != nil {
		http.Error(w, "We can't change the value type", http.StatusInternalServerError)
		log.Fatal(err)
		return
	}

	log.Println(id, news)
	services.Update(news, id)

	w.WriteHeader(http.StatusOK)
	w.Write([]byte("The news updated successfully!"))
}

func DeleteNews(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodDelete {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	paramId := r.URL.Query().Get("id")

	id, err := strconv.Atoi(paramId)
	if err != nil {
		http.Error(w, "We can't change the value type", http.StatusInternalServerError)
		log.Fatal(err)
		return
	}

	services.Delete(id)
	log.Println("The news deleted successfully! ID: ", id)
	w.WriteHeader(http.StatusOK)
	w.Write([]byte("The news deleted successfully!"))
}
