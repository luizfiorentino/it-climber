import React, { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import TextArea from "@/components/atoms/TextArea/TextArea";
import Tag from "@/components/atoms/Tag/Tag";
import styles from "./Form.module.css";
import FormLabel from "../atoms/FormLabel/FormLabel";

interface FormProps {
  onSubmit: (data: FormData) => void;
}

interface FormData {
  applicationDate: string;
  title: string;
  company: string;
  description: string;
  link: string;
  location: string;
  recruiter: string;
  language: string;
  tags: string[];
  feedback: string;
}

const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<FormData>({
    applicationDate: "",
    title: "",
    company: "",
    description: "",
    link: "",
    location: "",
    recruiter: "",
    language: "",
    tags: [],
    feedback: "",
  });

  const [openForm, setOpenForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [company, setCompany] = useState("");
  const [link, setLink] = useState("");
  const [feedback, setFeedback] = useState("");
  const [applicationDate, setApplicationDate] = useState("");
  const [location, setLocation] = useState("");
  const [recruiter, setRecruiter] = useState("");
  const [language, setLanguage] = useState("");
  const [addTag, setAddTag] = useState(false);
  const [tag, setTag] = useState("");
  const [tags, setTags] = useState([]);

  const addNewTag = () => {
    setFormData((prevData) => ({
      ...prevData,
      tags: [...prevData.tags, tag],
    }));
    setTag("");
    setAddTag(false);
  };

  const removeTag = (index: number) => {
    setFormData((prevData) => {
      const updatedTags = [...prevData.tags];
      updatedTags.splice(index, 1);
      return {
        ...prevData,
        tags: updatedTags,
      };
    });
  };

  
    const submitApplication = async () => {
        try {
          const response = await axios.post(`/api/vacancies`, data);
    
          window.location.reload();
          setCompany("");
          setTitle("");
          setFeedback("");
          setDescription("");
          setLink("");
          setApplicationDate("");
          setLanguage("");
          setRecruiter("");
          setLocation("");
          setTag("");
          setTags([]);
          console.log("New application added:", response);
        } catch (error) {
          console.log(`Error submitting the application: ${error}`);
        }
      };
    onSubmit(formData);
  };

  return (
    <div>
      <div className={styles.formButton}>
        {!openForm && (
          <Button
            onClick={() => setOpenForm(!openForm)}
            variant={"displayForm"}
          >
            + New Vacancy
          </Button>
        )}
      </div>
      {openForm && (
        <div className={styles.formContainer}>
          <div className={styles.formButtonHide}>
            {openForm && (
              <Button
                onClick={() => setOpenForm(!openForm)}
                variant={"hideForm"}
              >
                Hide form
              </Button>
            )}
          </div>
          <div className={styles.formBody}>
            <FormLabel>submitted</FormLabel>
            <Input
              type="date"
              value={applicationDate}
              onChange={(e) => setApplicationDate(e.target.value)}
              id="applicationDate"
              name="applicationDate"
            />
            <FormLabel>title</FormLabel>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <FormLabel>company</FormLabel>
            <Input
              type="text"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <FormLabel>description</FormLabel>
            <TextArea
              // type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <FormLabel>link</FormLabel>
            <Input
              type="text"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <FormLabel>location</FormLabel>
            <Input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <FormLabel>recruiter</FormLabel>
            <Input
              type="text"
              value={recruiter}
              onChange={(e) => setRecruiter(e.target.value)}
            />
            <FormLabel>language</FormLabel>
            <Input
              type="text"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
            />
          </div>
          <div className={styles.formTagsContainer}>
            <div className={styles.formTags}>
              {formData.tags.map((tag, i) => (
                <div key={i} className={styles.removeButton}>
                  <Tag>{tag}</Tag>
                  <Button variant="tagForm" onClick={() => removeTag(i)}>
                    remove
                  </Button>
                </div>
              ))}
            </div>

            {addTag && (
              <Input
                type="text"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
            )}

            <div className={addTag ? styles.addTagButton : undefined}>
              <Button
                variant="tagForm"
                onClick={addTag ? addNewTag : () => setAddTag(!addTag)}
              >
                {addTag ? "add" : "toggle add"}
              </Button>
            </div>
          </div>
          <FormLabel>feedback</FormLabel>
          <TextArea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          />

          <div className={styles.submitButton}>
            <Button onClick={submitApplication}>Add vacancy</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
