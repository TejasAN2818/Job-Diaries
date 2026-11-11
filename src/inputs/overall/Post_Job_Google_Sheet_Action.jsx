// ============================================================
// GOOGLE SHEET API
// ============================================================

// Paste your NEW Google Apps Script Web App URL here
export const POST_JOB_GOOGLE_SHEET_API_URL =
  'https://script.google.com/macros/s/AKfycby7Nvl0_9V6R2Ba_bmlBNEuyLcXb29Qm8jn-y3ZCcbHUQ6hoTw0ObCF3hklpHpgDlt0/exec'


// ============================================================
// SEND JOB POST TO GOOGLE SHEET
// ============================================================

export const sendJobPostToGoogleSheet = async (
  jobData
) => {

  try {

    // ----------------------------------------------------------
    // SEND DATA
    // ----------------------------------------------------------

    const response =
      await fetch(
        POST_JOB_GOOGLE_SHEET_API_URL,
        {
          method: 'POST',

          headers: {
            'Content-Type':
              'text/plain;charset=utf-8',
          },

          body: JSON.stringify({

            action: 'job_post',

            job: {

              companyName:
                String(
                  jobData?.companyName || ''
                ).trim(),

              designation:
                String(
                  jobData?.designation || ''
                ).trim(),

              salary:
                String(
                  jobData?.salary || ''
                ).trim(),

              location:
                String(
                  jobData?.location || ''
                ).trim(),

              vacancy:
                String(
                  jobData?.vacancy || ''
                ).trim(),

              contactPersonName:
                String(
                  jobData?.contactPersonName || ''
                ).trim(),

              contactPersonNumber:
                String(
                  jobData?.contactPersonNumber || ''
                ).trim(),

            },

          }),

        }
      )


    // ----------------------------------------------------------
    // READ RESPONSE
    // ----------------------------------------------------------

    const responseText =
      await response.text()


    let result


    try {

      result =
        JSON.parse(responseText)

    } catch {

      result = {

        success:
          response.ok,

        message:
          responseText,

      }

    }


    // ----------------------------------------------------------
    // HTTP ERROR
    // ----------------------------------------------------------

    if (!response.ok) {

      return {

        success: false,

        error:
          result?.error ||
          'Google Sheet request failed.',

      }

    }


    // ----------------------------------------------------------
    // SUCCESS
    // ----------------------------------------------------------

    return {

      success:
        result?.success !== false,

      ...result,

    }

  } catch (error) {

    console.error(
      'Google Sheet job post error:',
      error
    )


    return {

      success: false,

      error:
        error?.message ||
        'Unable to connect to Google Sheet.',

    }

  }

}