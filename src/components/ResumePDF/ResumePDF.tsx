import { Document, Page, Text, View } from "@react-pdf/renderer";

import ResumeStyles from "./ResumeStyles";
import { defaultTemplate } from "@constants/Templates";

const ResumePDF = ({
  data: {
    personalDetails,
    objective,
    experience,
    education,
    skills,
    projects,
    languages,
    references,
  },
  fontSize = 10,
  pageMargin = 14,
  template = defaultTemplate,
}: {
  data: LocalStorageDataMap;
  fontSize?: number;
  pageMargin?: number;
  template?: TemplateStyle;
}) => {
  const styles = ResumeStyles({ fontSize, pageMargin, template });

  return (
    <Document>
      <Page size="A4" style={[styles?.page]}>
        {/* personal info */}
        {personalDetails?.length > 0 && (
          <View style={[styles?.section, styles?.personalDetail]}>
            <Text style={styles?.name}>{personalDetails[0]?.name}</Text>
            {/* other personal Details */}
            <View style={styles?.flex_row}>
              {personalDetails[0]?.phone && (
                <Text style={styles?.text}>{personalDetails[0]?.phone}</Text>
              )}
              {personalDetails[0]?.email && (
                <Text style={styles?.text}>{personalDetails[0]?.email}</Text>
              )}
            </View>
            {personalDetails[0]?.address && (
              <Text style={styles?.text}>{personalDetails[0]?.address}</Text>
            )}
            {personalDetails[0]?.linkedin && (
              <Text style={styles?.text}>{personalDetails[0]?.linkedin}</Text>
            )}
            {personalDetails[0]?.github && (
              <Text style={styles?.text}>{personalDetails[0]?.github}</Text>
            )}
          </View>
        )}

        {/* objective */}
        {objective?.length > 0 && (
          <View style={[styles?.section]}>
            <Text style={styles?.sectionHeading}>Objective</Text>
            <Text style={[styles?.text, styles?.sectionData]}>
              {objective[0]?.objective}
            </Text>
          </View>
        )}

        {/* experience */}
        {experience?.length > 0 && (
          <View style={[styles?.section]}>
            <Text style={styles?.sectionHeading}>Experience</Text>
            <View style={styles?.sectionData}>
              {experience?.map(
                ({
                  id,
                  companyName,
                  jobTitle,
                  description,
                  endDate,
                  startDate,
                }) => (
                  <View key={id}>
                    <View style={styles?.flex_row_between}>
                      <View style={[styles?.bulletContent]}>
                        <Text style={styles?.bulletPoint}>•</Text>
                        <Text style={styles?.subHeading}>{companyName}</Text>
                      </View>
                      <View style={styles?.time}>
                        {startDate && (
                          <Text style={styles?.text}>{startDate}</Text>
                        )}
                        {startDate && endDate && (
                          <Text style={styles?.text}>-</Text>
                        )}
                        {endDate && <Text style={styles?.text}>{endDate}</Text>}
                      </View>
                    </View>
                    <View style={[styles?.bulletContentSibling]}>
                      <Text style={styles?.text}>{jobTitle}</Text>
                      {description && (
                        <Text style={styles?.text}>{description}</Text>
                      )}
                    </View>
                  </View>
                )
              )}
            </View>
          </View>
        )}

        {/* education */}
        {education?.length > 0 && (
          <View style={[styles?.section]}>
            <Text style={styles?.sectionHeading}>Education</Text>
            <View style={styles?.sectionData}>
              {education?.map(({ course, id, institution, score, year }) => (
                <View key={id}>
                  <View style={styles?.flex_row_between}>
                    <View style={[styles?.bulletContent]}>
                      <Text style={styles?.bulletPoint}>•</Text>
                      <Text style={styles?.subHeading}>{institution}</Text>
                    </View>
                    {year && <Text style={styles?.text}>{year}</Text>}
                  </View>
                  <View style={[styles?.bulletContentSibling]}>
                    <Text style={styles?.text}>{course}</Text>
                    {score && <Text style={styles?.text}>{score}</Text>}
                  </View>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* skills */}
        {skills?.length > 0 && (
          <View style={[styles?.section]}>
            <Text style={styles?.sectionHeading}>Skills</Text>
            <View style={[styles?.sectionData, styles?.skillsData]}>
              {skills?.map(({ id, skill }) => (
                <View
                  key={id}
                  style={[styles?.bulletContent, styles?.skillsItem]}
                >
                  <Text style={styles?.bulletPoint}>•</Text>
                  <Text style={styles?.text}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* projects */}
        {projects?.length > 0 && (
          <View style={[styles?.section]}>
            <Text style={styles?.sectionHeading}>Projects</Text>
            <View style={[styles?.sectionData]}>
              {projects?.map(({ id, projectTitle, description }) => (
                <View key={id}>
                  <View style={[styles?.bulletContent]}>
                    <Text style={styles?.bulletPoint}>•</Text>
                    <Text style={styles?.subHeading}>{projectTitle}</Text>
                  </View>
                  {description && (
                    <Text style={[styles?.text, styles?.bulletContentSibling]}>
                      {description}
                    </Text>
                  )}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* languages */}
        {languages?.length > 0 && (
          <View style={[styles?.section]}>
            <Text style={styles?.sectionHeading}>Languages</Text>
            <View style={styles?.sectionData}>
              {languages?.map(({ id, languageTitle }) => (
                <View key={id} style={[styles?.bulletContent]}>
                  <Text style={styles?.bulletPoint}>•</Text>
                  <Text style={styles?.text}>{languageTitle}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* references */}
        {references?.length > 0 && (
          <View style={[styles?.section]}>
            <Text style={styles?.sectionHeading}>Reference</Text>
            <View style={styles?.sectionData}>
              {references?.map(
                ({
                  id,
                  referenceName,
                  companyName,
                  jobTitle,
                  email,
                  phone,
                }) => (
                  <View key={id}>
                    <View key={id} style={[styles?.bulletContent]}>
                      <Text style={styles?.bulletPoint}>•</Text>
                      <Text style={styles?.subHeading}>{referenceName}</Text>
                    </View>
                    <View style={[styles?.bulletContentSibling]}>
                      <View style={[styles?.flex_row, { columnGap: 4 }]}>
                        {companyName && (
                          <Text style={styles?.text}>{companyName}</Text>
                        )}
                        {companyName && jobTitle && (
                          <Text style={[styles?.text]}>-</Text>
                        )}
                        {jobTitle && (
                          <Text style={styles?.text}>{jobTitle}</Text>
                        )}
                      </View>
                      <View style={[styles?.flex_row, { columnGap: 4 }]}>
                        {phone && <Text style={styles?.text}>{phone}</Text>}
                        {phone && email && <Text style={styles?.text}>-</Text>}
                        {email && <Text style={styles?.text}>{email}</Text>}
                      </View>
                    </View>
                  </View>
                )
              )}
            </View>
          </View>
        )}
      </Page>
    </Document>
  );
};

export default ResumePDF;
