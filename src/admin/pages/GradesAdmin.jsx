import React from "react";
import { useTranslation } from "react-i18next";
import GenericCrudPage from "../components/GenericCrudPage.jsx";

const GradesAdmin = () => {
  const { t } = useTranslation("admin");
  return (
    <GenericCrudPage
      title={t("grades.title")}
      resource="grades"
      description={t("grades.description")}
      fields={[
        { name: "code", label: t("grades.code"), required: true, placeholder: "A" },
        { name: "name", label: t("grades.name"), required: true, placeholder: "Grade A" },
        {
          name: "condition",
          label: t("grades.condition"),
          type: "select",
          options: [
            { value: "Refurbished", label: t("products.refurbished") },
            { value: "To Repair", label: t("products.toRepair") },
          ],
        },
        { name: "description", label: t("grades.descriptionField"), type: "textarea", required: true },
        { name: "features", label: t("grades.features"), type: "textarea", placeholder: t("grades.featuresPlaceholder") },
        { name: "sortOrder", label: t("grades.sortOrder"), type: "number" },
        { name: "isActive", label: t("fields.active"), type: "checkbox" },
        { name: "translations.fr.name", label: t("fields.nameFr"), section: "French Translation" },
        { name: "translations.fr.description", label: t("grades.descriptionFr"), type: "textarea" },
        { name: "translations.fr.features", label: t("grades.featuresFr"), type: "textarea" },
      ]}
      columns={[
        { key: "code", label: t("grades.code") },
        { key: "name", label: t("grades.name") },
        { key: "condition", label: t("grades.condition") },
        { key: "isActive", label: t("fields.active"), render: (row) => (row.isActive ? t("yes") : t("no")) },
      ]}
    />
  );
};

export default GradesAdmin;
