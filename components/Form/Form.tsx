import React, { useState } from "react";
import Button from "@/components/atoms/Button/Button";
import Input from "@/components/atoms/Input/Input";
import TextArea from "@/components/atoms/TextArea/TextArea";
import Tag from "@/components/atoms/Tag/Tag";
import styles from "./Form.module.css";
import FormLabel from "../atoms/FormLabel/FormLabel";
import axios from "axios";

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
  const [addTag, setAddTag] = useState(false);
  const [tag, setTag] = useState("");

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
      onSubmit(formData);
      const response = await axios.post(`/api/vacancies`, formData);

      window.location.reload();
      setTag("");

      console.log("New application added:", response);
    } catch (error) {
      console.log(`Error submitting the application: ${error}`);
    }
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
              value={formData.applicationDate}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  applicationDate: e.target.value,
                })
              }
              id="applicationDate"
              name="applicationDate"
            />
            <FormLabel>title</FormLabel>
            <Input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  title: e.target.value,
                })
              }
            />
            <FormLabel>company</FormLabel>
            <Input
              type="text"
              value={formData.company}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  company: e.target.value,
                })
              }
            />
            <FormLabel>description</FormLabel>
            <TextArea
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
            />
            <FormLabel>link</FormLabel>
            <Input
              type="text"
              value={formData.link}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  link: e.target.value,
                })
              }
            />
            <FormLabel>location</FormLabel>
            <Input
              type="text"
              value={formData.location}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  location: e.target.value,
                })
              }
            />
            <FormLabel>recruiter</FormLabel>
            <Input
              type="text"
              value={formData.recruiter}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  recruiter: e.target.value,
                })
              }
            />
            <FormLabel>language</FormLabel>
            <Input
              type="text"
              value={formData.language}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  language: e.target.value,
                })
              }
            />
            <div
              className={formData.tags.length ? styles.tagsLabel : undefined}
            >
              <FormLabel>tags</FormLabel>
            </div>

            <div className={styles.formTagsContainer}>
              <div
                className={`${styles.formTags} ${
                  formData.tags.length && styles.tagSpace
                }`}
              >
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
                  {!addTag ? "add tag" : "confirm"}
                </Button>
              </div>
              <FormLabel>feedback</FormLabel>
              <TextArea
                value={formData.feedback}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    feedback: e.target.value,
                  })
                }
              />
            </div>
          </div>

          <div className={styles.submitButton}>
            <Button onClick={submitApplication}>Add vacancy</Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Form;
